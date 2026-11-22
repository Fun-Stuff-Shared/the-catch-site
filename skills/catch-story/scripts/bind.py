#!/usr/bin/env python3
USAGE = """The bind check: every block of the built page against the claims it cites, after every edit.
Only blocks that changed since they last passed are read. Sonnet reads every such block, and
Opus reads again each block that cites a strict claim; a finding from either counts. A finding
on a strict claim, or a fact no claim holds (cited or not), blocks; one on a background claim is
listed for the author. Passing blocks are recorded in checks/reads/<story>-bound.json; an answer
that is not well-formed records nothing.
Refuses stale builds; rebuild with npm run build before retrying.
Usage: bind.py <subject>--<slug> <round> [--strict] [--lint all]   (from the worktree root, after npm run build)
Quotes only by default; --lint all adds token and attribution checks.
--strict stops before model review on pre-bind lint findings."""

import json
import argparse
import os
import subprocess
import sys
from difflib import SequenceMatcher
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

here = Path(__file__).resolve().parent
sys.path.insert(0, str(here.parents[1] / "catch-record/scripts"))
import claims as ledger
import prebind

KINDS = {"beyond", "status", "scope", "actor"}
REPEAT_THRESHOLD = 0.5


def findings_path(story):
    return Path("checks/reads") / f"{story}-findings.json"


def match_previous(blocks, previous, current_hashes):
    matched = {b["hash"]: b["hash"] for b in blocks if b["hash"] in previous}
    available = set(previous) - set(current_hashes) - set(matched.values())
    candidates = []
    for b in blocks:
        if b["hash"] in matched:
            continue
        ids = {c["id"] for c in b["claims"]}
        for key in sorted(available):
            old = previous[key]
            ratio = SequenceMatcher(None, old["text"], b["text"]).ratio()
            if ratio >= REPEAT_THRESHOLD:
                candidates.append((set(old["claims"]) == ids, ratio, b["hash"], key))
    for _, _, block_hash, key in sorted(candidates, reverse=True):
        if block_hash not in matched and key in available:
            matched[block_hash] = key
            available.remove(key)
    return matched


def well_formed(f, by_n):
    if not isinstance(f, dict) or not {"b", "claim", "kind", "problem"} <= f.keys():
        return False
    if type(f["b"]) is not int or f["b"] not in by_n or f["kind"] not in KINDS:
        return False
    if not isinstance(f["problem"], str) or not f["problem"].strip():
        return False
    if f["claim"] is None:
        return f["kind"] == "beyond"
    return f["claim"] in {c["id"] for c in by_n[f["b"]]["claims"]}


def ask(model, prompt, by_n):
    for _ in range(3):
        out = subprocess.run(["claude", "-p", "--model", model], input=prompt, capture_output=True, text=True, check=False).stdout
        try:
            found = json.loads(out[out.index("["): out.rindex("]") + 1])
        except ValueError:
            continue
        if isinstance(found, list) and all(well_formed(f, by_n) for f in found):
            return found
    sys.exit(f"bind: {model} gave no well-formed answer; nothing was recorded as bound")


def describe(n, block, previous=None):
    lines = [f"B{n}. {block['text']}"]
    for c in block["claims"]:
        who = f", by {c['by']}" if c.get("by") else ""
        scope = f"; scope: {c['scope']}" if c.get("scope") else ""
        lines.append(f"    claim {c['id']}{' (strict)' if ledger.strict(c) else ''}: {c['says']} [status: {c['status']}{who}{scope}]")
    if previous:
        for f in previous["findings"]:
            claim = f", claim {f['claim']}" if f.get("claim") else ""
            lines.append(f"    previous finding (round r{previous['round']}, {f['kind']}{claim}): {f['problem']}")
    return "\n".join(lines)


def require_fresh_page(story):
    built = ledger.page_path(story)
    rebuild = "Run npm run build, then rerun bind. Nothing was recorded as bound."
    if not built.is_file():
        sys.exit(f"bind: missing built page {built}. {rebuild}")
    subject, slug = story.split("--", 1)
    base = Path("src/pages/events") / subject / slug
    pages = [base.with_suffix(ext) for ext in (".astro", ".mdx", ".md")]
    sources = {p for p in pages if p.is_file()}
    if not sources:
        sys.exit(f"bind: cannot find story source {base}.astro/.mdx/.md; refusing to bind.")
    # Conservative: shared modules can read data dynamically, beyond static imports.
    for directory in ("src/data", "src/components", "src/layouts", "src/lib",
                      "src/styles", "src/scripts", "data"):
        for root, dirs, files in os.walk(directory):
            if Path(root) == Path("data/v2") and "snapshots" in dirs:
                dirs.remove("snapshots")
            sources.update(Path(root) / name for name in files if (Path(root) / name).is_file())
    newer = sorted(str(p) for p in sources if p.stat().st_mtime_ns > built.stat().st_mtime_ns)
    if newer:
        sys.exit(f"bind: refusing stale built page {built}; newer source/data files:\n"
                 + "\n".join(f"  {p}" for p in newer) + f"\n{rebuild}")


def main(story, round_, strict=False, lint_mode='quotes'):
    require_fresh_page(story)
    ledger.migrate_bound(story)
    page = ledger.blocks(story)
    bound = set(ledger.read_json(ledger.bound_path(story), []))
    todo = [b for b in page if b["hash"] not in bound and ledger.bindable(b)]
    previous = ledger.read_json(findings_path(story), {})
    matches = match_previous(todo, previous, {b["hash"] for b in page})
    prior = {key: previous[value] for key, value in matches.items()}
    report = Path("checks/reads") / f"{story}-r{round_}-bind.md"
    lint_failures, lint_report = prebind.lint(story, todo=todo, page=page, mode=lint_mode)
    print(lint_report)
    if strict and lint_failures:
        report.write_text(f"# Bind check\n\n{lint_report}\n\nLint stopped bind before model review. Nothing recorded as bound.\n\nNOT BOUND\n")
        sys.exit(1)
    if not todo:
        report.write_text(f"# Bind check\n\n{lint_report}\n\nEvery block has passed as it reads now.\n\nBOUND\n")
        print(f"{report}: nothing changed; BOUND")
        return
    template = (here.parent / "assets/bind-prompt.txt").read_text()
    numbered = list(enumerate(todo, 1))
    everything = template.replace("{BLOCKS}", "\n\n".join(describe(n, b, prior.get(b["hash"])) for n, b in numbered))
    strict_blocks = [(n, b) for n, b in numbered if any(ledger.strict(c) for c in b["claims"])]
    strict_only = template.replace("{BLOCKS}", "\n\n".join(describe(n, b, prior.get(b["hash"])) for n, b in strict_blocks))
    by_n = dict(numbered)
    with ThreadPoolExecutor(2) as pool:
        runs = [pool.submit(ask, "sonnet", everything, by_n)]
        if strict_blocks:
            runs.append(pool.submit(ask, "opus", strict_only, dict(strict_blocks)))
        findings = [f for r in runs for f in r.result()]
    blocking, listed, seen = [], [], set()
    for f in findings:
        block = by_n[f["b"]]
        key = (f["b"], f.get("claim"), f["kind"])
        if key in seen:
            continue
        seen.add(key)
        claim = next((c for c in block["claims"] if c["id"] == f.get("claim")), None)
        hard = f["kind"] == "beyond" or (claim is not None and ledger.strict(claim))
        (blocking if hard else listed).append((block, f))
    failed = {b["hash"] for b, _ in blocking}
    bound |= {b["hash"] for b in todo if b["hash"] not in failed}
    ledger.bound_path(story).write_text(json.dumps(sorted(bound), indent=2) + "\n")
    saved = dict(previous)
    for b in todo:
        saved.pop(matches.get(b["hash"], b["hash"]), None)
        current = [{k: f[k] for k in ("kind", "claim", "problem")}
                   for block, f in blocking + listed if block["hash"] == b["hash"]]
        if current:
            saved[b["hash"]] = {"text": b["text"], "claims": sorted({c["id"] for c in b["claims"]}),
                                "round": round_, "findings": current}
    findings_path(story).write_text(json.dumps(saved, indent=2) + "\n")

    def repeat_note(b):
        old = prior.get(b["hash"])
        if not old:
            return ""
        return f" (again; flagged in r{old['round']}: " + "; ".join(f["problem"] for f in old["findings"]) + ")"

    def lines(items):
        return [f"- \"{b['text'][:120]}\" ({f.get('kind')}{', claim ' + f['claim'] if f.get('claim') else ''}): {f.get('problem')}{repeat_note(b)}"
                for b, f in items] or ["- none"]

    flagged = {b["hash"] for b, _ in blocking + listed}
    previously = [f"- \"{b['text'][:120]}\": flagged in r{prior[b['hash']]['round']}: "
                  + "; ".join(f["problem"] for f in prior[b["hash"]]["findings"])
                  + ("; still flagged" if b["hash"] in flagged else "; now resolved")
                  for b in todo if b["hash"] in prior]

    verdict = "NOT BOUND" if blocking else "BOUND"
    report.write_text("\n".join(["# Bind check", "", f"{len(todo)} changed blocks read.", "",
                                 lint_report, "", "## Must be fixed", "", *lines(blocking), "",
                                 "## For the author to judge", "", *lines(listed), "",
                                 "## Previously flagged", "", *(previously or ["- none"]), "", verdict, ""]))
    print(f"{report}: {len(todo)} blocks, {len(blocking)} to fix, {len(listed)} to judge, {len(prior)} previously flagged; {verdict}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=USAGE)
    parser.add_argument('story')
    parser.add_argument('round')
    parser.add_argument('--strict', action='store_true')
    parser.add_argument('--lint', choices=('quotes', 'all'), default='quotes')
    args = parser.parse_args()
    main(args.story, args.round, strict=args.strict, lint_mode=args.lint)
