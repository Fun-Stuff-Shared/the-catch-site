#!/usr/bin/env python3
"""Build an evidence pack for a story's entailment read: everything the reader needs, in one file.

usage: evidence_pack.py <subject>--<slug> [out.md]     (run from the worktree root)

The pack holds the page source and the data module in full, then every page block (p,
figcaption, h1-h3) that carries a <Cite>, its text without the cites, and for each cite the
record id, publisher, date and title, the cited passage, and the record's saved text
WINDOW characters before and after the passage. A passage not found in its record is
marked so. Out defaults to stdout.
"""
import json
import re
import sys
from pathlib import Path

WINDOW = 600


def main(story, out=None):
    subject, slug = story.split("--", 1)
    page = Path(f"src/pages/events/{subject}/{slug}.astro")
    data = Path(f"src/data/{subject}-{slug}.mjs")
    manifest = json.loads(Path(f"checks/manifests/{story}.json").read_text())
    records = {r["id"]: r for r in manifest["records"]}
    texts = {rid: Path(r["text_path"]).read_text() for rid, r in records.items()}
    src = page.read_text()
    parts = [
        f"# Evidence pack: {story}\n\nThe page source and data module in full, then each cited block with every "
        f"cited passage and {WINDOW} characters of the record's saved text on each side.\n\n"
        f"## Page source\n```\n{src}\n```\n\n## Data module\n```\n{data.read_text() if data.exists() else '(none)'}\n```\n\n"
        "## Blocks and their cited records\n"
    ]
    blocks = re.findall(r"<(p|figcaption|h1|h2|h3)\b[^>]*>(.*?)</\1>", src[src.index("<main"):], re.S)
    n = 0
    for _, block in blocks:
        cites = re.findall(r'<Cite s="([^"]+)" passage=(?:"([^"]*)"|\{`([^`]*)`\})', block)
        if not cites:
            continue
        n += 1
        parts.append(f"\n### Block {n}\n{re.sub(r'<Cite[^>]*/>', '', block).strip()}\n")
        for rid, straight, templated in cites:
            passage = straight or templated
            text = texts.get(rid, "")
            hit = re.search(r"\s+".join(map(re.escape, passage.split())), text)
            context = (text[max(0, hit.start() - WINDOW):hit.end() + WINDOW] if hit
                       else "(PASSAGE NOT FOUND IN RECORD TEXT)")
            r = records.get(rid, {})
            parts.append(f"- [{rid}] {r.get('publisher')}, {r.get('date')}, {r.get('title')}\n"
                         f"  passage: {passage}\n  context: <<<{context}>>>\n")
    pack = "".join(parts)
    if out:
        Path(out).write_text(pack)
    else:
        sys.stdout.write(pack)


if __name__ == "__main__":
    if len(sys.argv) not in (2, 3):
        sys.exit(__doc__)
    main(*sys.argv[1:])
