#!/usr/bin/env python3
USAGE = """The bind check: every block of the built page against the claims it cites, after every edit.
Only blocks that changed since they last passed are read. Sonnet reads every such block, and
Opus reads again each block that cites a strict claim; a finding from either counts. A finding
on a strict claim, or a fact no claim holds, blocks; one on a background claim is listed for the
author. Passing blocks are recorded in checks/reads/<story>-bound.json.
Usage: bind.py <subject>--<slug> <round>   (from the worktree root, after npm run build)"""

import json
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

here = Path(__file__).resolve().parent
sys.path.insert(0, str(here.parents[1] / "catch-record/scripts"))
import claims as ledger


def ask(model, prompt):
    for _ in range(3):
        out = subprocess.run(["claude", "-p", "--model", model], input=prompt, capture_output=True, text=True, check=False).stdout
        try:
            found = json.loads(out[out.index("["): out.rindex("]") + 1])
            if isinstance(found, list):
                return found
        except ValueError:
            pass
    sys.exit(f"bind: {model} gave no JSON answer")


def describe(n, block):
    lines = [f"B{n}. {block['text']}"]
    for c in block["claims"]:
        who = f", by {c['by']}" if c.get("by") else ""
        scope = f"; scope: {c['scope']}" if c.get("scope") else ""
        lines.append(f"    claim {c['id']}{' (strict)' if ledger.strict(c) else ''}: {c['says']} [status: {c['status']}{who}{scope}]")
    return "\n".join(lines)


def main(story, round_):
    page = ledger.blocks(story)
    bound = set(ledger.read_json(ledger.bound_path(story), []))
    todo = [b for b in page if b["hash"] not in bound and (b["claims"] or len(b["text"].split()) >= 8)]
    report = Path("checks/reads") / f"{story}-r{round_}-bind.md"
    if not todo:
        report.write_text("# Bind check\n\nEvery block has passed as it reads now.\n\nBOUND\n")
        print(f"{report}: nothing changed; BOUND")
        return
    template = (here.parent / "assets/bind-prompt.txt").read_text()
    numbered = list(enumerate(todo, 1))
    everything = template.replace("{BLOCKS}", "\n\n".join(describe(n, b) for n, b in numbered))
    strict_blocks = [(n, b) for n, b in numbered if any(ledger.strict(c) for c in b["claims"])]
    strict_only = template.replace("{BLOCKS}", "\n\n".join(describe(n, b) for n, b in strict_blocks))
    with ThreadPoolExecutor(2) as pool:
        runs = [pool.submit(ask, "sonnet", everything)]
        if strict_blocks:
            runs.append(pool.submit(ask, "opus", strict_only))
        findings = [f for r in runs for f in r.result()]
    by_n = dict(numbered)
    blocking, listed, seen = [], [], set()
    for f in findings:
        block = by_n.get(f.get("b"))
        if not block:
            continue
        key = (f.get("b"), f.get("claim"), f.get("kind"))
        if key in seen:
            continue
        seen.add(key)
        claim = next((c for c in block["claims"] if c["id"] == f.get("claim")), None)
        hard = (f.get("kind") == "beyond" and bool(block["claims"])) or (claim is not None and ledger.strict(claim))
        (blocking if hard else listed).append((block, f))
    failed = {b["hash"] for b, _ in blocking}
    bound |= {b["hash"] for b in todo if b["hash"] not in failed}
    ledger.bound_path(story).write_text(json.dumps(sorted(bound), indent=2) + "\n")

    def lines(items):
        return [f"- \"{b['text'][:120]}\" ({f.get('kind')}{', claim ' + f['claim'] if f.get('claim') else ''}): {f.get('problem')}"
                for b, f in items] or ["- none"]

    verdict = "NOT BOUND" if blocking else "BOUND"
    report.write_text("\n".join(["# Bind check", "", f"{len(todo)} changed blocks read.", "",
                                 "## Must be fixed", "", *lines(blocking), "",
                                 "## For the author to judge", "", *lines(listed), "", verdict, ""]))
    print(f"{report}: {len(todo)} blocks, {len(blocking)} to fix, {len(listed)} to judge; {verdict}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(USAGE)
    main(*sys.argv[1:])
