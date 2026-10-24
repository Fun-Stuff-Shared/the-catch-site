#!/usr/bin/env python3
USAGE = """A story's claim ledger: checks/claims/<subject>--<slug>.json. Run from the worktree root.

check:   claims.py check <story>                         the ledger's shape, and every passage in its record
pack:    claims.py pack <story> <pack.md> <records.md>   the claims not yet held, for the claim check
hold:    claims.py hold <story> <pack.md>                record the packed claims as held (CLAIMS HOLD)
blocks:  claims.py blocks <story>                        the built page's blocks and the claims each cites (JSON lines)
verify:  claims.py verify <story>                        every claim the page cites is held, every block that cites one is bound

A ledger is {"story": "<story>", "claims": [claim, ...]}. A claim:

  {"id": "france-2m-diesel",            kebab-case, unique in the ledger
   "says": "France signalled it could release 2 million more barrels of diesel.",
                                         the claim in plain words, as the page may state it, with
                                         the record's own status and scope in the words
   "short": "France: could add 2 million barrels",
                                         optional: the claim as a table cell or timeline label
   "status": "may",                      fact | said | plans | may | expected | alleged
   "by": "France's energy ministry",     who says it; required for said and alleged
   "scope": "as of October 7",           optional: what the claim holds for (one meeting, the
                                         referrals made public, as of a date)
   "load": ["catch"],                    what rests on it: spine (a deciding row of the matrix),
                                         catch, figure, person (what a named person or party did
                                         or did not do); empty for background
   "evidence": [{"record": "politico-eu-france-germany-2026-10-07",
                 "passage": "France on Wednesday signaled it could release 2 million barrels"}]}
"""

import hashlib
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

STATUSES = {"fact", "said", "plans", "may", "expected", "alleged"}
LOADS = {"spine", "catch", "figure", "person"}
ATTRIBUTED = {"said", "alleged"}
HASHED = ("says", "short", "status", "by", "scope", "load", "evidence")


def ledger_path(story):
    return Path("checks/claims") / f"{story}.json"


def held_path(story):
    return Path("checks/reads") / f"{story}-claims-held.json"


def bound_path(story):
    return Path("checks/reads") / f"{story}-bound.json"


def page_path(story):
    subject, slug = story.split("--", 1)
    return Path("dist/events") / subject / slug / "index.html"


def read_json(path, default=None):
    return json.loads(path.read_text()) if path.exists() else default


def claim_hash(claim):
    body = json.dumps({k: claim.get(k) for k in HASHED}, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(body.encode()).hexdigest()[:16]


def strict(claim):
    return bool(claim.get("load"))


def loose(passage):
    return re.compile(r"\s+".join(map(re.escape, passage.split())))


def record_texts(story):
    manifest = json.loads((Path("checks/manifests") / f"{story}.json").read_text())
    records = {r["id"]: r for r in manifest["records"]}
    return records, {rid: Path(r["text_path"]).read_text() for rid, r in records.items() if r.get("text_path")}


def problems(story):
    ledger = read_json(ledger_path(story))
    if ledger is None:
        return [f"no ledger at {ledger_path(story)}"], None
    found = []
    if ledger.get("story") != story:
        found.append(f'ledger "story" is {ledger.get("story")!r}, not {story!r}')
    _, texts = record_texts(story)
    seen = set()
    for c in ledger.get("claims", []):
        cid = c.get("id", "")
        where = f"claim {cid or '(no id)'}"
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", cid):
            found.append(f"{where}: id must be kebab-case")
        if cid in seen:
            found.append(f"{where}: id used twice")
        seen.add(cid)
        says = c.get("says", "")
        if not says.strip() or not re.search(r"[.!?][”\"’)]?$", says.strip()):
            found.append(f"{where}: says must be a sentence")
        for field in ("says", "short"):
            if "—" in (c.get(field) or ""):
                found.append(f"{where}: {field} holds an em dash")
        if c.get("status") not in STATUSES:
            found.append(f"{where}: status must be one of {', '.join(sorted(STATUSES))}")
        if c.get("status") in ATTRIBUTED and not (c.get("by") or "").strip():
            found.append(f"{where}: a {c.get('status')} claim names who says it in by")
        if not set(c.get("load", [])) <= LOADS:
            found.append(f"{where}: load may hold only {', '.join(sorted(LOADS))}")
        evidence = c.get("evidence") or []
        if not evidence:
            found.append(f"{where}: no evidence")
        for e in evidence:
            rid, passage = e.get("record"), e.get("passage") or ""
            if rid not in texts:
                found.append(f"{where}: {rid} is not an admitted record")
            elif not passage.strip() or not loose(passage).search(texts[rid]):
                found.append(f'{where}: "{passage}" not in {rid}')
    return found, ledger


def check(story):
    found, ledger = problems(story)
    for p in found:
        print("FAIL", p)
    n = len(ledger["claims"]) if ledger else 0
    print(f"{n} claims, {len(found)} failures")
    return not found


def pack(story, out, records_out):
    found, ledger = problems(story)
    if found:
        sys.exit(f"the ledger has failures; run claims.py check {story}")
    held = read_json(held_path(story), {})
    todo = [c for c in ledger["claims"] if held.get(c["id"]) != claim_hash(c)]
    records, texts = record_texts(story)
    lines, used = [], {}
    for i, c in enumerate(todo, 1):
        status = c["status"] + (f" (by {c['by']})" if c.get("by") else "")
        lines += [f"C{i}. [{c['id']}] {c['says']}",
                  f"    status: {status}; scope: {c.get('scope') or 'as stated'}; checked {'strictly' if strict(c) else 'for a reader’s takeaway'}"]
        if c.get("short"):
            lines.append(f"    short form: {c['short']}")
        for e in c["evidence"]:
            used.setdefault(e["record"], None)
            lines.append(f"    evidence: RECORD {e['record']}: {e['passage']}")
    Path(out).write_text(f"# Claims to check: {story}\n\n" + "\n".join(lines) + "\n")
    Path(out + ".ids.json").write_text(json.dumps({c["id"]: claim_hash(c) for c in todo}, indent=2) + "\n")
    Path(records_out).write_text("".join(
        f"===== RECORD {rid}: {records[rid].get('publisher')}, {records[rid].get('date')}, {records[rid].get('title')} =====\n\n"
        f"{texts[rid].strip()}\n\n===== END RECORD {rid} =====\n\n" for rid in used))
    print(f"{out}: {len(todo)} claims; {records_out}: {len(used)} records")
    return len(todo)


def hold(story, packed):
    held = read_json(held_path(story), {})
    held.update(json.loads(Path(packed + ".ids.json").read_text()))
    held_path(story).parent.mkdir(parents=True, exist_ok=True)
    held_path(story).write_text(json.dumps(dict(sorted(held.items())), indent=2) + "\n")
    print(f"{held_path(story)}: {len(held)} claims held")


BLOCK = {"div", "p", "li", "h1", "h2", "h3", "figcaption", "tr", "dt", "dd", "blockquote"}
DROP = {"script", "style", "noscript", "svg", "template", "nav"}


class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.main = self.skip = self.done = 0
        self.stack, self.open, self.blocks = [], [], []

    def handle_starttag(self, tag, attrs):
        if tag in {"br", "img", "hr", "input", "meta", "link", "wbr"}:
            return
        a = dict(attrs)
        if tag == "section" and a.get("id") == "records":
            self.done = 1
        cls = (a.get("class") or "").split()
        drop = tag in DROP or "mode-switcher" in cls or "work-evidence" in cls or a.get("data-layer") == "claims"
        self.stack.append((tag, drop))
        if drop:
            self.skip += 1
        if tag == "main":
            self.main += 1
        live = self.main and not self.skip and not self.done
        if tag == "a" and a.get("data-passage") is not None and live and self.open:
            if a.get("data-claim"):
                self.open[-1]["claims"].append(a["data-claim"])
            if len(self.stack) > 1 and self.stack[-2][0] == "sup":
                self.skip += 1
                self.stack[-1] = (tag, True)
        elif tag in BLOCK and live:
            self.open.append({"text": [], "claims": []})
        elif tag in {"span", "td", "th"} and live and self.open:
            self.open[-1]["text"].append(" ")

    def handle_endtag(self, tag):
        while self.stack:
            t, drop = self.stack.pop()
            if drop:
                self.skip -= 1
            if t == "main":
                self.main -= 1
            if t in BLOCK and self.open and not drop and t == tag:
                b = self.open.pop()
                text = " ".join("".join(b["text"]).split())
                if text:
                    self.blocks.append((text, list(dict.fromkeys(b["claims"]))))
            if t == tag:
                break

    def handle_data(self, data):
        if self.open and not self.skip:
            self.open[-1]["text"].append(data)


def blocks(story):
    ledger = read_json(ledger_path(story))
    by_id = {c["id"]: c for c in ledger["claims"]}
    p = Blocks()
    p.feed(page_path(story).read_text(encoding="utf-8"))
    out = []
    for text, ids in p.blocks:
        cited = [by_id[i] for i in ids]
        key = json.dumps([html.unescape(text), [(c["id"], claim_hash(c)) for c in cited]], ensure_ascii=False)
        out.append({"hash": hashlib.sha256(key.encode()).hexdigest()[:16], "text": text, "claims": cited})
    return out


def verify(story):
    ok = check(story)
    held = read_json(held_path(story), {})
    bound = set(read_json(bound_path(story), []))
    page = blocks(story)
    cited = {c["id"]: c for b in page for c in b["claims"]}
    unheld = [cid for cid, c in cited.items() if held.get(cid) != claim_hash(c)]
    unbound = [b["text"][:80] for b in page if b["claims"] and b["hash"] not in bound]
    for cid in unheld:
        print(f"FAIL claim {cid} is cited on the page but has not held in the claim check")
    for t in unbound:
        print(f'FAIL block "{t}..." has not passed the bind check as it reads now')
    print(f"{len(cited)} claims cited, {len(unheld)} not held; {sum(1 for b in page if b['claims'])} citing blocks, {len(unbound)} not bound")
    return ok and not unheld and not unbound


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) == 2 and a[0] == "check":
        sys.exit(0 if check(a[1]) else 1)
    elif len(a) == 4 and a[0] == "pack":
        pack(*a[1:])
    elif len(a) == 3 and a[0] == "hold":
        hold(a[1], a[2])
    elif len(a) == 2 and a[0] == "blocks":
        for b in blocks(a[1]):
            print(json.dumps(b, ensure_ascii=False))
    elif len(a) == 2 and a[0] == "verify":
        sys.exit(0 if verify(a[1]) else 1)
    else:
        sys.exit(USAGE)
