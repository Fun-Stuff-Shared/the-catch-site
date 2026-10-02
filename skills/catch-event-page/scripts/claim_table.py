"""Every cited block on a built story page with the record and passage it cites, as one table:
the input to the entailment pass and the reviewer's claim read. The table is read from the
built page (dist/events/<subject>/<story>/index.html), so a row holds the words and numbers
the reader sees, whatever expression, data module, formatter or component produced them.
Usage: claim_table.py <subject>/<story> [--json] [--earlier <the page as an earlier commit built it>]
With --earlier, only the blocks that page did not show with the same words and the same
citations are listed, cited or not: a headline, a figure label or a table cell carries no
Cite and still changed. Build first; page_builds.sh builds the earlier page."""
import json
import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

BLOCK = {"p", "li", "h1", "h2", "h3", "h4", "figcaption", "td", "th", "tr", "dt", "dd", "summary", "blockquote", "div", "section", "figure", "table", "ul", "ol", "header", "footer", "text", "title", "caption", "article"}
# A list item, a card, a table cell or a caption is one row with everything inside it: a card's heading
# is part of the claim its paragraph cites for.
UNIT = {"li", "td", "th", "figcaption", "dd", "article"}
SPACE = {"span", "small", "a", "em", "strong", "tspan"}
VOID = {"br", "img", "hr", "input", "meta", "link", "wbr", "source", "col", "area", "embed", "track"}
DROP = {"script", "style", "noscript", "template", "nav"}
# What every story page shares or the site builds from the state or the manifest (the records
# list, whose numbers shift whenever a record is admitted): no sentence of the story.
FRAME = {("div", "mode-switcher"), ("details", "record-ledger"), ("details", "ledger-source-passage")}


class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.rows, self.skip, self.stack, self.main = [], 0, [], 0
        self.words, self.cites, self.sections, self.in_ref, self.unit, self.note = [], [], [], 0, 0, False

    def flush(self):
        text = " ".join("".join(self.words).split())
        if self.note and not self.cites:
            # An uncited rail note is the update stamp; a cited one is a revision notice, a claim.
            text = ""
        self.note = False
        if not text and self.cites and self.rows:
            # A line that holds only citations cites for the block above it.
            self.rows[-1]["cites"] = self.rows[-1]["cites"] + self.cites
        elif text or self.cites:
            self.rows.append({"at": self.sections[-1] if self.sections else "top", "text": text, "cites": self.cites})
        self.words, self.cites = [], []

    def boundary(self, tag):
        if tag not in BLOCK or self.skip or not self.main: return
        if self.unit: self.words.append(" ")
        else: self.flush()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in VOID:
            if tag == "br" and not self.skip: self.words.append(" ")
            return
        classes = set((a.get("class") or "").split())
        ref = tag == "sup" and "src-ref" in classes
        frame = any((tag, c) in FRAME for c in classes) or (tag == "section" and a.get("id") == "records")
        drop = tag in DROP or frame
        self.boundary(tag)
        if tag in UNIT and not self.skip and self.main: self.unit += 1
        if tag == "p" and "rail-note" in classes and not self.skip and self.main and not self.unit: self.note = True
        self.stack.append((drop, ref, tag == "section" and bool(a.get("id"))))
        if tag == "section" and a.get("id"): self.sections.append(a["id"])
        if drop: self.skip += 1
        if ref: self.in_ref += 1
        if tag == "main": self.main += 1
        if tag in SPACE and not self.skip: self.words.append(" ")
        if tag == "a" and self.in_ref and not self.skip and self.main:
            record = re.fullmatch(r"/records/(.+?)/?", a.get("data-record-href") or "")
            more = [p for p in (a.get("data-passages") or "").split("\n") if p.strip()]
            for passage in [a.get("data-passage") or ""] + more if record else []:
                self.cites.append({"record": record.group(1), "passage": " ".join(passage.split()) or None})

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID: self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag in VOID or not self.stack: return
        if tag in UNIT and not self.skip and self.main and self.unit: self.unit -= 1
        self.boundary(tag)
        drop, ref, section = self.stack.pop()
        if drop: self.skip -= 1
        if ref: self.in_ref -= 1
        if section: self.sections.pop()
        if tag == "main": self.main -= 1
        if tag in SPACE and not self.skip: self.words.append(" ")

    def handle_data(self, data):
        if not self.skip and self.main and not self.in_ref: self.words.append(data)


def blocks(path):
    parser = Blocks()
    parser.feed(Path(path).read_text(encoding="utf-8"))
    parser.flush()
    return parser.rows


def key(row):
    return (row["text"], tuple((c["record"], c["passage"]) for c in row["cites"]))


def main(argv):
    args = [a for a in argv[1:] if a != "--json"]
    earlier = None
    if "--earlier" in args:
        at = args.index("--earlier")
        if at + 1 >= len(args):
            print("--earlier needs the earlier built page", file=sys.stderr)
            return 2
        earlier = args[at + 1]
        del args[at:at + 2]
    if len(args) != 1 or "/" not in args[0]:
        print("usage: claim_table.py <subject>/<story> [--json] [--earlier <earlier built page>]", file=sys.stderr)
        return 2
    story = args[0]
    subject, slug = story.split("/", 1)
    root = Path(__file__).resolve().parents[3]
    page = root / "dist/events" / story / "index.html"
    if not page.is_file():
        print(f"build first: {page} is missing", file=sys.stderr)
        return 2
    records = {r["id"]: r for r in json.loads((root / "checks/manifests" / f"{subject}--{slug}.json").read_text(encoding="utf-8"))["records"]}
    rows = blocks(page)
    if earlier is None:
        rows = [r for r in rows if r["cites"]]
    else:
        # A block said twice now and once before changed once: each earlier block answers for one.
        held = Counter(key(r) for r in blocks(earlier)) if Path(earlier).stat().st_size else Counter()
        changed = []
        for row in rows:
            if held[key(row)]:
                held[key(row)] -= 1
            elif row["text"]:
                changed.append(row)
        rows = changed
    for n, row in enumerate(rows, 1):
        row["n"] = n
        for cite in row["cites"]:
            record = records.get(cite["record"]) or {}
            cite["text_path"] = record.get("text_path") or record.get("pinned_path")
            cite["publisher"] = record.get("publisher")
    if "--json" in argv:
        print(json.dumps({"story": story, "rows": rows}, ensure_ascii=False, indent=1))
        return 0
    scope = " that the earlier page did not show" if earlier is not None else ""
    print(f"# Blocks on /events/{story}/{scope} ({len(rows)} rows, {sum(len(r['cites']) for r in rows)} citations)\n")
    print("| # | section | block text | citations (record: passage; text pin) |")
    print("|---|---|---|---|")
    cell = lambda s: str(s if s is not None else "").replace("|", "\\|")
    for row in rows:
        cites = "<br>".join(f"{c['record']}: {cell(c['passage'] or '(record quote)')}; {cell(c['text_path'])}" for c in row["cites"])
        print(f"| {row['n']} | {row['at']} | {cell(row['text'])} | {cites or '(no Cite: text the page shows without a citation, which changed)'} |")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
