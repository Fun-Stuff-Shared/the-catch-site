#!/usr/bin/env python3
USAGE = """Admit captured sources into a story manifest, and check a story's record.

admit:  admit.py admit <subject>--<slug> <specs.json>
check:  admit.py check <subject>--<slug>

Run from the worktree root. A spec is one record:

  {"id": "ca2-opinion-2026-04-28",            stable slug, unique in the manifest
   "run": "capture-oneoff-20261006T193553Z",  capture run that holds it
   "url": "https://...",                      the receipt's item_url, or a part of it that
                                               matches exactly one article in the run
   "title": "...", "publisher": "...",
   "date": "YYYY-MM-DD",                       the date printed on the source
   "quote": "...",                             byte-exact in the text
   "passages": ["...", "..."],                 whitespace-tolerant; every fact the brief uses
   "about": "what the record is, in a phrase",
   "group": "primary" | "official" | "coverage",
   "label": "how the records list names it", "meta": " · published YYYY-MM-DD",
   "usage": "what the story uses it for",
   "dehyphenate": true}                        optional: rejoin words broken across PDF lines

A source capture cannot fetch (a post read with bird, an image OCR'd with Mistral) is
admitted from local files instead of "run" and "url":

   "file": "posts/watson-memo.jpg",            the bytes as published (post text, image, PDF)
   "text_file": "posts/watson-memo.txt",       its text; omit when "file" is itself text
   "source_url": "https://x.com/...",          where it was published
   "capture_status": "how it was obtained and why capture could not"

Every spec is validated before anything is written. check verifies every record (pin
exists, hash recomputes, quote present, registry route) and every brief citation,
written [record-id: "passage"] or, when the passage holds straight double quotes,
[record-id: “passage”], against that record's text. Exit 1 on any failure.
"""

import datetime
import hashlib
import json
import os
import re
import sys
from pathlib import Path

WT = Path.cwd()
RUNS = Path(os.environ.get("CAPTURE_RUNS", "/Volumes/4/CF/news-fqs-pilot/runs"))
CITE = re.compile(r'\[([a-z0-9-]+): (?:"([^"]+)"|“([^”]+)”)\]')


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
    rows = [json.loads(line) for line in (RUNS / run / "article_receipts.jsonl").read_text().splitlines()]
    rows = [d for d in rows if d.get("text_path")]
    exact = [d for d in rows if d.get("item_url") == url]
    if exact:
        return exact[-1], None
    hits = {d["item_url"]: d for d in rows if url in (d.get("item_url") or "")}
    if len(hits) == 1:
        return next(iter(hits.values())), None
    if not hits:
        return None, f"no receipt in {run} matching {url}"
    return None, f"{url} matches {len(hits)} articles in {run}; give the full url:\n  " + "\n  ".join(list(hits)[:10])


def prepare(s, subject):
    i = s.get("id", "?")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", i):
        return None, f"{i}: id is not a lowercase slug"
    try:
        if datetime.date.fromisoformat(s["date"]) > datetime.datetime.now(datetime.UTC).date():
            return None, f"{i}: date {s['date']} is in the future"
    except (KeyError, ValueError):
        return None, f"{i}: date must be YYYY-MM-DD"
    for k in ("title", "publisher", "quote", "about", "group", "label", "meta", "usage"):
        if not s.get(k):
            return None, f"{i}: missing {k}"
    dest = WT / "data/sources" / ("coverage" if s["group"] == "coverage" else subject)
    status = s.get("capture_status")
    if s.get("file"):
        if not status or not s.get("source_url"):
            return None, f"{i}: a local file needs source_url and capture_status"
        raw = Path(s["file"]).read_bytes()
        text = Path(s.get("text_file") or s["file"]).read_text()
        ext = Path(s["file"]).suffix or ".txt"
        pinned = dest / f"{i}.source{ext}" if ext == ".txt" else dest / f"{i}{ext}"
        cap, url = {}, s["source_url"]
    else:
        rc, err = receipt(s["run"], s["url"])
        if err:
            return None, f"{i}: {err}"
        raw = (RUNS / s["run"] / rc["raw_path"]).read_bytes()
        text = (RUNS / s["run"] / rc["text_path"]).read_text()
        pinned = dest / f"{i}.{'pdf' if raw[:5] == b'%PDF-' else 'html'}"
        cap = {"capture_run": s["run"], "capture_raw_sha256": rc.get("raw_sha256") or sha(raw),
               "captured_at": rc.get("completed_at")}
        url = rc["item_url"]
    if not text.strip():
        return None, f"{i}: text is empty; OCR or re-capture before admitting"
    if s.get("dehyphenate"):
        text = re.sub(r"(\w)-\n\s*(\w)", r"\1\2", text)
        status = status or "the text sibling rejoins words broken across lines with a hyphen"
    if s["quote"] not in text:
        return None, f"{i}: quote not byte-exact: {s['quote']}"
    missing = [p for p in s.get("passages", []) if not loose(p).search(text)]
    if missing:
        return None, f"{i}: passages not found: {missing}"
    rec = {"id": i, "title": s["title"], "publisher": s["publisher"], "date": s["date"], "url": url,
           "pinned_path": str(pinned.relative_to(WT)), "text_path": str((dest / f"{i}.txt").relative_to(WT)),
           "text_sha256": sha(text.encode()), "quote": s["quote"], "quote_span_check": "byte_exact",
           "about": s["about"], **cap}
    if status:
        rec["capture_status"] = status
    source = {"id": i, "group": s["group"], "label": s["label"], "meta": s["meta"], "usage": s["usage"]}
    return (rec, source, raw, text), None


def admit(story, specs_path):
    subject, _, man_path, _ = paths(story)
    specs = json.loads(Path(specs_path).read_text())
    ids = [s.get("id") for s in specs]
    dupes = {i for i in ids if ids.count(i) > 1}
    if dupes:
        sys.exit(f"duplicate ids in specs: {sorted(dupes)}")
    ready, errors = [], []
    for s in specs:
        item, err = prepare(s, subject)
        if err:
            errors.append(err)
        else:
            ready.append(item)
    if errors:
        sys.exit("nothing admitted:\n" + "\n".join(errors))
    m = load_manifest(story, man_path)
    for rec, source, raw, text in ready:
        (WT / rec["pinned_path"]).parent.mkdir(parents=True, exist_ok=True)
        (WT / rec["pinned_path"]).write_bytes(raw)
        (WT / rec["text_path"]).write_bytes(text.encode())
        m["records"] = [r for r in m["records"] if r["id"] != rec["id"]] + [rec]
        m["story_sources"] = [x for x in m.get("story_sources", []) if x["id"] != rec["id"]] + [source]
        print(f"admitted {rec['id']} -> {rec['pinned_path']}")
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
        for rid, straight, curly in CITE.findall(brief.read_text()):
            passage = straight or curly
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
    if len(a) == 3 and a[0] == "admit":
        admit(a[1], a[2])
    elif len(a) == 2 and a[0] == "check":
        check(a[1])
    else:
        sys.exit(USAGE)
