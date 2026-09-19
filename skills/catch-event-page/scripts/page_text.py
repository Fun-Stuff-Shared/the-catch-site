"""The page as the story view reads it: the text inside <main>, block elements on their own lines,
proof-layer blocks, citation superscripts, scripts and styles dropped. Usage: page_text.py page.html"""
import sys
from html.parser import HTMLParser

BLOCK = {"p", "li", "h1", "h2", "h3", "h4", "figcaption", "td", "th", "tr", "dt", "dd", "summary", "blockquote", "div", "section", "figure", "table", "ul", "ol", "nav", "header", "footer"}
SPACE = {"span", "small", "a", "em", "strong"}
DROP = {"script", "style", "noscript", "svg", "template"}


class Text(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.skip, self.stack, self.main = [], 0, [], 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        drop = tag in DROP or a.get("data-layer") == "proof" or (tag == "sup" and "src-ref" in (a.get("class") or ""))
        self.stack.append(drop)
        if drop: self.skip += 1
        if tag == "main": self.main += 1
        if tag in BLOCK and not self.skip: self.out.append("\n")
        if tag in SPACE and not self.skip: self.out.append(" ")

    def handle_endtag(self, tag):
        if self.stack and self.stack.pop(): self.skip -= 1
        if tag == "main": self.main -= 1
        if tag in BLOCK and not self.skip: self.out.append("\n")
        if tag in SPACE and not self.skip: self.out.append(" ")

    def handle_data(self, data):
        if not self.skip and self.main: self.out.append(data)


p = Text()
p.feed(open(sys.argv[1], encoding="utf-8").read())
lines = [" ".join(l.split()) for l in "".join(p.out).split("\n")]
print("\n".join(l for l in lines if l))
