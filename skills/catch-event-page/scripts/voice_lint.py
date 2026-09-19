"""Voice lint for a built story page: sentences a stranger reads as machine voice.

Usage: voice_lint.py dist/events/<subject>/<story>/index.html [more pages]
Exit 1 when a script check trips. Proof-layer text and the state ledger rows are not judged.

Script checks (fail): reader address ("a reader", "readers"), process lines in the story
register ("Single outlet ...", "We read each ...", "among the records here").
Model checks (review, highest score first): mirrored antithesis, section wrap-up, reader gloss,
one Jev request per sentence at about 0.2 s. Thresholds hold specificity 0.95 per question on
the codex AI-speak scan of all 15 story pages built 2026-09-19 (design/aispeak-labels.jsonl in
grok-authoring, 2,596 sentences, 94 tells); stacked over three questions that still lists about
one own-voice sentence in six, so a model hit is a sentence to reread, never a failure on its own. Repetition is not
checked: the page restates its lede by design (summary box, catch cards, claim check).
"""
import json, os, re, subprocess, sys
from html.parser import HTMLParser

BLOCK = {"p", "li", "h1", "h2", "h3", "h4", "figcaption", "td", "th", "dt", "dd", "summary", "blockquote"}
ABBR = re.compile(r"\b(Rep|Sen|U\.S|U\.N|Sept|Aug|Oct|Nov|Dec|Jan|Feb|Mr|Ms|Dr|Gen|Lt|Col|No|v|H\.Con\.Res|S\.Con\.Res|Inc|Co)\.\s")
norm = lambda x: re.sub(r"\s+", " ", x.replace("“", '"').replace("”", '"').replace("’", "'")).strip()
strip_q = lambda t: re.sub(r'"[^"]{3,}"', "[quotation]", t)
READER = re.compile(r"\breaders?\b", re.I)
PROCESS = re.compile(r"^Single outlet\b|^We read\b|\bamong the records here\b", re.I)
THRESHOLDS = {"mirrored": 0.43, "outline_conclusion": 0.56, "reader_gloss": 0.67}
IGN = "Words inside quotation marks are someone else's speech and are not judged; judge only the page's own words."
QUESTIONS = {
    "mirrored": f"Is this sentence a mirrored antithesis or a does-and-does-not pair whose two halves balance each other instead of adding a fact? {IGN}",
    "outline_conclusion": f"Does this sentence close a section by summarizing or weighing what came before instead of adding a fact: a balanced tidy wrap-up such as 'the record shows X; it does not show Y' or 'what remains is Z'? {IGN}",
    "reader_gloss": f"Does this sentence tell the reader what to take from the facts (what it means for a reader, what to carry away, what the whole of it amounts to, what the numbers together show) instead of reporting a fact? {IGN}",
}
WHY = {"reader": "addresses the reader", "process": "process line in the story register", "mirrored": "mirrored antithesis",
       "outline_conclusion": "section wrap-up with no new fact", "reader_gloss": "tells the reader what to take away"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack = []; self.blocks = []; self.buf = None; self.skip = 0; self.inmain = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "main": self.inmain = True
        skipped = tag in ("script", "style", "nav", "svg") or (tag == "sup" and "src-ref" in (a.get("class") or "")) or "data-state-slot" in a
        if skipped: self.skip += 1
        self.stack.append((tag, a.get("data-layer"), skipped))
        if self.inmain and not self.skip and tag in BLOCK and self.buf is None:
            self.buf = []; self.layer = next((l for t, l, _ in reversed(self.stack) if l), None); self.tag = tag
            self.kicker = "sec-kicker" in (a.get("class") or "")
        elif self.buf is not None and tag in BLOCK: self.buf.append(" ")
    def handle_endtag(self, tag):
        if self.buf is not None and tag == self.tag:
            text = norm("".join(self.buf))
            if text: self.blocks.append({"layer": self.layer, "tag": "kicker" if self.kicker else tag, "text": text})
            self.buf = None
        elif self.buf is not None and tag in BLOCK: self.buf.append(" ")
        if tag == "main": self.inmain = False
        while self.stack:
            t, _, skipped = self.stack.pop()
            if skipped: self.skip -= 1
            if t == tag: break
    def handle_data(self, d):
        if self.buf is not None and not self.skip: self.buf.append(d)


def sentences(path):
    p = Page(); p.feed(open(path, encoding="utf-8").read()); out = []
    for b in p.blocks:
        if b["layer"] == "proof": continue
        text = ABBR.sub(lambda m: m.group(0).replace(". ", ".⁣"), b["text"])
        heading = b["tag"] in ("h1", "h2", "h3", "h4", "kicker")
        for sen in re.split(r"(?<=[.!?])\s+(?=[A-Z\"])", text):
            sen = sen.replace("⁣", " ")
            if (len(re.findall(r"[A-Za-z]+", sen)) >= 6 and re.search(r"[.!?]$", sen)) or (heading and len(sen.split()) >= 4):
                out.append((b["tag"], sen))
    return out


OWN_VOICE = {"p", "li", "figcaption", "td", "dd", "summary"}


def score(client, qs, sen, subject):
    r = client.system_one(state={"sentence": sen, "page_subject": subject}, questions=qs)
    return {k: round(r.nouls[k].noul, 3) for k in qs}


def lint(path, client):
    """Return (fails, reviews): script hits fail the page; model hits are sorted by score for a reread."""
    from typesafe_sdk import Noul
    qs = {k: Noul(instructions={"question": q}) for k, q in QUESTIONS.items()}
    fails, reviews = [], []
    subject = os.path.basename(os.path.dirname(path.rstrip("/")))
    for tag, sen in sentences(path):
        own = strip_q(sen)
        if READER.search(own): fails.append(("reader", 1.0, sen))
        if PROCESS.search(own): fails.append(("process", 1.0, sen))
        if tag not in OWN_VOICE or own.startswith("How we check"): continue
        for k, v in score(client, qs, sen, subject).items():
            if v >= THRESHOLDS[k]: reviews.append((k, v, sen))
    reviews.sort(key=lambda h: -h[1])
    return fails, reviews


def calibrate(labels_path):
    """Score a labelled sentence file (one JSON row per sentence: page, tag, text, label, shapes) the way
    lint() does and print, per question, the AUC and the highest threshold that keeps specificity 0.95."""
    from typesafe_sdk import TypeSafeClient, Noul
    key = os.environ.get("TYPESAFE_API_KEY") or subprocess.run(["security", "find-generic-password", "-s", "typesafe-api-key", "-w"], capture_output=True, text=True, check=True).stdout.strip()
    qs = {k: Noul(instructions={"question": q}) for k, q in QUESTIONS.items()}
    rows = [json.loads(l) for l in open(labels_path)]
    rows = [r for r in rows if r.get("tag") in OWN_VOICE and not strip_q(r["text"]).startswith("How we check")]
    with TypeSafeClient(api_key=key, model="jev-latest", timeout=60) as client:
        for r in rows: r["scores"] = score(client, qs, r["text"], r["page"])
    shape_for = {"mirrored": "ma", "outline_conclusion": "wu", "reader_gloss": "ra"}
    for k in QUESTIONS:
        sh = shape_for[k]
        sub = [r for r in rows if not r["label"] or sh in r.get("shapes", [])]
        pos = [r["scores"][k] for r in sub if r["label"]]; neg = [r["scores"][k] for r in sub if not r["label"]]
        auc = sum((p > n) + 0.5 * (p == n) for p in pos for n in neg) / (len(pos) * len(neg)) if pos and neg else float("nan")
        pick = None
        for t in sorted(set(neg + pos), reverse=True):
            fp = sum(1 for n in neg if n >= t)
            if fp / len(neg) <= 0.05: pick = (t, sum(1 for p in pos if p >= t), len(pos), fp, len(neg))
            else: break
        clean = max(neg) if neg else 0
        print(f"{k:20s} AUC {auc:.2f} on {sh} (n={len(pos)})  threshold {pick[0]:.2f}: recall {pick[1]}/{pick[2]}, false alarms {pick[3]}/{pick[4]};  zero-false-alarm threshold {clean:.2f} catches {sum(1 for p in pos if p > clean)}/{len(pos)}" if pick else f"{k}: no threshold at 0.95")
        for r in sorted((r for r in sub if not r["label"]), key=lambda r: -r["scores"][k])[:4]: print(f"    clean {r['scores'][k]:.2f} {r['text'][:110]}")


def main(paths):
    from typesafe_sdk import TypeSafeClient
    key = os.environ.get("TYPESAFE_API_KEY") or subprocess.run(["security", "find-generic-password", "-s", "typesafe-api-key", "-w"], capture_output=True, text=True, check=True).stdout.strip()
    total = 0
    with TypeSafeClient(api_key=key, model="jev-latest", timeout=60) as client:
        for path in paths:
            fails, reviews = lint(path, client); total += len(fails)
            print(f"{path}: {len(fails)} failing sentence(s), {len(reviews)} to reread")
            for k, score, sen in fails: print(f"  FAIL [{k}] {WHY[k]}: {sen}")
            for k, score, sen in reviews: print(f"  reread [{k} {score}] {WHY[k]}: {sen}")
    return 1 if total else 0


if __name__ == "__main__":
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    if sys.argv[1] == "--calibrate": calibrate(sys.argv[2]); sys.exit(0)
    sys.exit(main(sys.argv[1:]))
