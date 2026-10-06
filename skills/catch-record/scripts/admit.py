#!/usr/bin/env python3
USAGE = """Admit captured sources into a story manifest, and check a story's record.

admit:  admit.py admit <subject>--<slug> <specs.json> [--posts DIR]
check:  admit.py check <subject>--<slug>

Run from the worktree root. A spec is one record:

  {"id": "ca2-opinion-2026-04-28",            stable slug, unique in the manifest
   "run": "capture-oneoff-20261006T193553Z",  capture run that holds it (omit for "post")
   "url": "ca2.uscourts.gov/decisions/...",   substring of the receipt's item_url
   "title": "...", "publisher": "...", "date": "YYYY-MM-DD",
   "quote": "...",                             byte-exact in the text
   "passages": ["...", "..."],                 whitespace-tolerant; every fact the brief uses
   "about": "what the record is, in a phrase",
   "group": "primary" | "official" | "coverage",
   "label": "how the records list names it", "meta": " · published YYYY-MM-DD",
   "usage": "what the story uses it for",
   "dehyphenate": true,                        optional: rejoin words broken across PDF lines
   "post": "file.txt", "post_url": "https://x.com/...",  optional: a post saved with bird
   "capture_status": "why it has no capture run"}        required with "post"

check verifies every record (pin exists, hash recomputes, quote present, registry route)
and every citation in the brief, written [record-id: "passage"], against that record's text.
Exit 1 on any failure.
"""

import hashlib
import json
import os
import re
import sys
from pathlib import Path

WT = Path.cwd()
RUNS = Path(os.environ.get("CAPTURE_RUNS", "/Volumes/4/CF/news-fqs-pilot/runs"))


def sha(b):
    return "sha256:" + hashlib.sha256(b).hexdigest()


def loose(q):
    return re.compile(r"\s+".join(map(re.escape, q.split())))


def paths(story):
    subject, slug = story.split("--", 1)
    return (subject, slug, WT / "checks/manifests" / f"{story}.json", WT / "checks/records" / f"{story}.md")


def load_manifest(story, path):
    if path.exists():
        return json.loads(path.read_text())
    subject, slug, _, _ = paths(story)
    return {"subject": subject, "event": f"{subject}/{slug}", "story": f"/events/{subject}/{slug}/",
            "date": slug[:10], "state_event_id": f"event-{subject}-{slug}",
            "sub_events": [], "records": [], "story_sources": []}


def receipt(run, url):
    found = None
    for line in (RUNS / run / "article_receipts.jsonl").read_text().splitlines():
        d = json.loads(line)
        if url in (d.get("item_url") or "") and d.get("text_path"):
            found = d
    return found


def admit(story, specs_path, posts):
    subject, _, man_path, _ = paths(story)
    m = load_manifest(story, man_path)
    for s in json.loads(Path(specs_path).read_text()):
        dest = WT / "data/sources" / ("coverage" if s["group"] == "coverage" else subject)
        dest.mkdir(parents=True, exist_ok=True)
        status = s.get("capture_status")
        if s.get("post"):
            if not status:
                sys.exit(f"{s['id']}: a post needs capture_status")
            text = (Path(posts) / s["post"]).read_text()
            raw, pinned, cap = text.encode(), dest / f"{s['id']}.post.txt", {}
            url = s["post_url"]
        else:
            rc = receipt(s["run"], s["url"])
            if not rc:
                sys.exit(f"{s['id']}: no receipt in {s['run']} matching {s['url']}")
            raw = (RUNS / s["run"] / rc["raw_path"]).read_bytes()
            text = (RUNS / s["run"] / rc["text_path"]).read_text()
            if not text.strip():
                sys.exit(f"{s['id']}: capture text is empty; OCR or re-capture before admitting")
            pinned = dest / f"{s['id']}.{'pdf' if raw[:5] == b'%PDF-' else 'html'}"
            cap = {"capture_run": s["run"], "capture_raw_sha256": rc.get("raw_sha256") or sha(raw),
                   "captured_at": rc.get("completed_at")}
            url = rc["item_url"]
        if s.get("dehyphenate"):
            text = re.sub(r"(\w)-\n\s*(\w)", r"\1\2", text)
            status = status or "the text sibling rejoins words broken across lines with a hyphen"
        if s["quote"] not in text:
            sys.exit(f"{s['id']}: quote not byte-exact: {s['quote']}")
        for p in s.get("passages", []):
            if not loose(p).search(text):
                sys.exit(f"{s['id']}: passage not found: {p}")
        textp = dest / f"{s['id']}.txt"
        pinned.write_bytes(raw)
        textp.write_text(text)
        rec = {"id": s["id"], "title": s["title"], "publisher": s["publisher"], "date": s["date"], "url": url,
               "pinned_path": str(pinned.relative_to(WT)), "text_path": str(textp.relative_to(WT)),
               "text_sha256": sha(textp.read_bytes()), "quote": s["quote"], "quote_span_check": "byte_exact",
               "about": s["about"], **cap}
        if status:
            rec["capture_status"] = status
        m["records"] = [r for r in m["records"] if r["id"] != s["id"]] + [rec]
        m["story_sources"] = [x for x in m.get("story_sources", []) if x["id"] != s["id"]] + [
            {"id": s["id"], "group": s["group"], "label": s["label"], "meta": s["meta"], "usage": s["usage"]}]
        print(f"admitted {s['id']} -> {pinned.relative_to(WT)}")
    man_path.parent.mkdir(parents=True, exist_ok=True)
    man_path.write_text(json.dumps(m, indent=2, ensure_ascii=False) + "\n")


def check(story):
    _, _, man_path, brief = paths(story)
    m = json.loads(man_path.read_text())
    fails, texts = [], {}
    for r in m["records"]:
        tp = WT / r["text_path"]
        if not tp.exists() or not (WT / r["pinned_path"]).exists():
            fails.append(f"{r['id']}: pin missing")
            continue
        if sha(tp.read_bytes()) != r["text_sha256"]:
            fails.append(f"{r['id']}: text hash does not recompute")
        texts[r["id"]] = tp.read_text()
        if r["quote"] not in texts[r["id"]]:
            fails.append(f"{r['id']}: quote absent from text")
        if not r.get("capture_run") and not r.get("capture_status"):
            fails.append(f"{r['id']}: no capture_run and no capture_status")
    cites = 0
    if brief.exists():
        for rid, passage in re.findall(r'\[([a-z0-9-]+): "([^"]+)"\]', brief.read_text()):
            cites += 1
            if rid not in texts:
                fails.append(f"brief cites {rid}, which is not an admitted record")
            elif not loose(passage).search(texts[rid]):
                fails.append(f'brief: "{passage}" not in {rid}')
    else:
        fails.append(f"no brief at {brief.relative_to(WT)}")
    for f in fails:
        print("FAIL", f)
    print(f"{len(m['records'])} records, {cites} brief citations, {len(fails)} failures")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) >= 3 and a[0] == "admit":
        admit(a[1], a[2], a[a.index("--posts") + 1] if "--posts" in a else ".")
    elif len(a) == 2 and a[0] == "check":
        check(a[1])
    else:
        sys.exit(USAGE)
