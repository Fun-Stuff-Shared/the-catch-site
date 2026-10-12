"""The evidence for an entailment read, in two files. The pack: the page as the reader sees it,
block by block, each block naming the evidence it cites, then each cited passage once with its
record. The records: the full saved text of every cited record, for the reviewer to read around
a passage as far as it needs (who is speaking, what a number counts). Built from the rendered
page, so numbers are filled in and citations inside components (timeline rows, tables) are
included. With a base page (the one the previous round checked), only blocks whose text or
citations changed are included.
Usage: evidence_pack.py <story> <page.html> <pack.md> <records.md> [base.html]   (from the worktree root)"""
import json, re, sys
from html.parser import HTMLParser
from pathlib import Path

BLOCK = {"div", "p", "li", "h1", "h2", "h3", "figcaption", "tr", "dt", "dd", "blockquote"}
DROP = {"script", "style", "noscript", "svg", "template", "nav"}


class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.main = self.skip = self.done = 0
        self.stack, self.open, self.blocks = [], [], []

    def handle_starttag(self, tag, attrs):
        if tag in {"br", "img", "hr", "input", "meta", "link", "wbr"}: return
        a = dict(attrs)
        if tag == "section" and a.get("id") == "records": self.done = 1
        drop = tag in DROP or "mode-switcher" in (a.get("class") or "")
        self.stack.append((tag, drop))
        if drop: self.skip += 1
        if tag == "main": self.main += 1
        live = self.main and not self.skip and not self.done
        if tag == "a" and a.get("data-passage") is not None and live and self.open:
            rid = (a.get("data-record-href") or a.get("href", "")).strip("/").split("/")[-1]
            for passage in [a["data-passage"], *(a.get("data-passages") or "").split("\n")]:
                if passage: self.open[-1]["cites"].append((rid, passage))
            if len(self.stack) > 1 and self.stack[-2][0] == "sup":
                self.skip += 1; self.stack[-1] = (tag, True)
        elif tag in BLOCK and live:
            self.open.append({"text": [], "cites": []})
        elif tag in {"span", "td", "th"} and live and self.open:
            self.open[-1]["text"].append(" ")

    def handle_endtag(self, tag):
        while self.stack:
            t, drop = self.stack.pop()
            if drop: self.skip -= 1
            if t == "main": self.main -= 1
            if t in BLOCK and self.open and not drop and t == tag:
                b = self.open.pop()
                text = " ".join("".join(b["text"]).split())
                if text or b["cites"]: self.blocks.append((text, b["cites"]))
            if t == tag: break

    def handle_data(self, data):
        if self.open and not self.skip: self.open[-1]["text"].append(data)


def blocks(html):
    p = Blocks(); p.feed(Path(html).read_text(encoding="utf-8")); return p.blocks


def main(story, html, out, records_out, base=None):
    manifest = json.loads(Path(f"checks/manifests/{story}.json").read_text())
    records = {r["id"]: r for r in manifest["records"]}
    seen = {(t, tuple(c)) for t, c in blocks(base)} if base else set()
    page = [(t, c) for t, c in blocks(html) if (t, tuple(c)) not in seen]
    evidence, lines = {}, []
    for i, (text, cites) in enumerate(page, 1):
        refs = []
        for c in cites:
            evidence.setdefault(c, f"E{len(evidence) + 1}")
            refs.append(evidence[c])
        lines.append(f"B{i}. {text}" + (f"  [cites {', '.join(dict.fromkeys(refs))}]" if refs else ""))
    scope = "the blocks that changed since the last check" if base else "the whole page"
    parts = [f"# Evidence pack: {story}\n\n## The page ({scope}, as the reader sees it)\n\n" + "\n".join(lines),
             "\n\n## The evidence: each cited passage and its record\n"]
    texts = {}
    for (rid, passage), ref in evidence.items():
        r = records.get(rid, {})
        if rid not in texts:
            texts[rid] = Path(r["text_path"]).read_text() if r.get("text_path") else ""
        found = re.search(r"\s+".join(map(re.escape, passage.split())), texts[rid])
        parts.append(f"\n{ref}. RECORD {rid}: {r.get('publisher')}, {r.get('date')}, {r.get('title')}\n"
                     f"passage: {passage}" + ("" if found else "\n(PASSAGE NOT FOUND IN RECORD TEXT)") + "\n")
    Path(out).write_text("".join(parts))
    Path(records_out).write_text("".join(
        f"===== RECORD {rid}: {records.get(rid, {}).get('publisher')}, {records.get(rid, {}).get('date')}, "
        f"{records.get(rid, {}).get('title')} =====\n\n{text.strip()}\n\n===== END RECORD {rid} =====\n\n"
        for rid, text in texts.items()))
    print(f"{out}: {len(page)} blocks, {len(evidence)} passages, {Path(out).stat().st_size} bytes; "
          f"{records_out}: {len(texts)} records, {Path(records_out).stat().st_size} bytes")


if __name__ == "__main__":
    if len(sys.argv) not in (5, 6): sys.exit(__doc__)
    main(*sys.argv[1:])
