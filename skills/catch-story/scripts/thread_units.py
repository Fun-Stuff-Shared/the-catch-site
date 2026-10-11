"""The story's paragraphs in reading order, each with the heading it sits under: <p> text inside
<main>, before the records section, without citation superscripts, proof-layer blocks or detail
blocks. Prints JSON lines {"heading": ..., "text": ...}.
Usage: thread_units.py page.html"""
import json, sys
from html.parser import HTMLParser

DROP = {"script", "style", "noscript", "svg", "template", "nav", "figure", "table", "details"}


class Units(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.skip, self.main, self.done = [], 0, 0, False
        self.heading, self.buf, self.kind, self.out = "", [], None, []

    def handle_starttag(self, tag, attrs):
        if tag in {"br", "img", "hr", "input", "meta", "link", "wbr"}: return
        a = dict(attrs)
        classes = set((a.get("class") or "").split())
        if tag == "section" and a.get("id") == "records": self.done = True
        drop = (tag in DROP or a.get("data-layer") == "proof" or (tag == "sup" and "src-ref" in classes)
                or (tag == "div" and {"sourced-block", "detail"} <= classes) or "mode-switcher" in classes)
        self.stack.append((tag, drop))
        if drop: self.skip += 1
        if tag == "main": self.main += 1
        if not self.skip and self.main and not self.done and tag in {"p", "h1", "h2", "h3"}:
            self.kind, self.buf = tag, []

    def handle_endtag(self, tag):
        while self.stack:
            t, drop = self.stack.pop()
            if drop: self.skip -= 1
            if t == "main": self.main -= 1
            if t == tag: break
        if tag == self.kind:
            text = " ".join("".join(self.buf).split())
            if text:
                if tag == "p": self.out.append({"heading": self.heading, "text": text})
                else: self.heading = text
            self.kind = None

    def handle_data(self, data):
        if self.kind and not self.skip: self.buf.append(data)


u = Units()
u.feed(open(sys.argv[1], encoding="utf-8").read())
for x in u.out: print(json.dumps(x, ensure_ascii=False))
