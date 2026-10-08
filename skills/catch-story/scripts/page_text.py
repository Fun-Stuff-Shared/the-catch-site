"""The page as the story view reads it: the text inside <main>, block elements on their own lines,
proof-layer blocks, detail blocks (shown only in the facts view), citation superscripts, scripts
and styles dropped. The frame every story page
shares is dropped too, so a reader of this text reports on the story and never on the site: the
reading-mode switcher, the "On this page" list, the state ledger of figures (a table the site
builds from the state, with its "Recorded passage" disclosures), and the records section's
fixed lede and "How we check" line.
Usage: page_text.py page.html"""
import sys
from html.parser import HTMLParser

BLOCK = {"p", "li", "h1", "h2", "h3", "h4", "figcaption", "td", "th", "tr", "dt", "dd", "summary", "blockquote", "div", "section", "figure", "table", "ul", "ol", "nav", "header", "footer"}
SPACE = {"span", "small", "a", "em", "strong"}
VOID = {"br", "img", "hr", "input", "meta", "link", "wbr", "source", "col", "area", "embed", "track"}
DROP = {"script", "style", "noscript", "svg", "template", "nav"}
FRAME = {("div", "mode-switcher"), ("details", "record-ledger"), ("details", "ledger-source-passage")}
RECORDS_FRAME = {"section-lede", "sources-line"}


class Text(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.skip, self.stack, self.main, self.records = [], 0, [], 0, 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in VOID:
            if tag == "br" and not self.skip: self.out.append("\n")
            return
        classes = set((a.get("class") or "").split())
        frame = any((tag, c) in FRAME for c in classes) or (self.records and tag == "p" and classes & RECORDS_FRAME)
        drop = tag in DROP or frame or a.get("data-layer") == "proof" or (tag == "sup" and "src-ref" in classes) or (tag == "div" and {"sourced-block", "detail"} <= classes)
        if tag == "section" and (self.records or a.get("id") == "records"): self.records += 1
        self.stack.append(drop)
        if drop: self.skip += 1
        if tag == "main": self.main += 1
        if tag in BLOCK and not self.skip: self.out.append("\n")
        if tag in SPACE and not self.skip: self.out.append(" ")

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID: self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag in VOID: return
        if self.stack and self.stack.pop(): self.skip -= 1
        if tag == "main": self.main -= 1
        if tag == "section" and self.records: self.records -= 1
        if tag in BLOCK and not self.skip: self.out.append("\n")
        if tag in SPACE and not self.skip: self.out.append(" ")

    def handle_data(self, data):
        if not self.skip and self.main: self.out.append(data)


p = Text()
p.feed(open(sys.argv[1], encoding="utf-8").read())
lines = [" ".join(l.split()) for l in "".join(p.out).split("\n")]
print("\n".join(l for l in lines if l))
