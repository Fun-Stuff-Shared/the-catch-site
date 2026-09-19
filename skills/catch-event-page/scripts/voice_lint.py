"""Voice lint for a built story page: sentences a stranger reads as machine voice.

Usage: voice_lint.py dist/events/<subject>/<story>/index.html [more pages]
Exit 1 when a check trips. Proof-layer text and the state ledger rows are not judged.

Four rules are read by regex and fail the page: the page names or addresses its reader ("a
reader", "readers", "you"); the page speaks about itself as "this page" (a document's page is
named as the document); the page speaks in the first person outside a quotation; the page
timestamps an absence ("as of <date> ... had not", "at the time of writing"), where the due
date or the page's own date is the sentence. There is no list of banned phrases: a phrase
list matches last week's sentence, never next week's.

The rest is one Jev call per batch of twenty sentences, seven questions each, listed for a reread
with the highest score first: does the sentence describe the page, the site or the writer's own
work instead of the event; mirrored antithesis; section wrap-up; reader gloss; a document as the
subject where the fact could stand alone; an explanation no reader question prompted; a
dictionary definition in place of the term's consequence. Thresholds come from --calibrate on our own labels (design/aispeak-labels.jsonl in
grok-authoring, the codex AI-speak scan of 2,596 sentences built 2026-09-19, plus the
self-description positives cut on 2026-09-19); a reread hit is a sentence to reread, never a
failure on its own. The records section's own lede and "How we check" line are component
chrome, skipped by position (p.section-lede and p.sources-line inside section#records); the
unknowns section title is chrome by its exact text.
"""
import json, os, re, subprocess, sys
from html.parser import HTMLParser

BLOCK = {"p", "li", "h1", "h2", "h3", "h4", "figcaption", "td", "th", "dt", "dd", "summary"}
has_cls = lambda a, name: name in (a.get("class") or "").split()
ABBR = re.compile(r"\b(Rep|Sen|U\.S|U\.N|Sept|Aug|Oct|Nov|Dec|Jan|Feb|Mr|Ms|Dr|Gen|Lt|Col|No|v|H\.Con\.Res|S\.Con\.Res|Inc|Co)\.\s")
norm = lambda x: re.sub(r"\s+", " ", x.replace("“", '"').replace("”", '"').replace("’", "'")).strip()
def strip_q(t, inside=False):
    """Quoted speech is not the page's own voice. A quotation the sentence splitter cut in two leaves
    one quote mark: an opener drops what follows it, a closer drops what came before it. A sentence that
    starts inside a quotation (inside=True: the block's quote marks before it are unbalanced) is treated
    as if it opened with one, so the middle sentences of a long quotation are not judged."""
    if inside: t = '"' + t
    t = re.sub(r'"[^"]{3,}"', "[quotation]", t)
    i = t.find('"')
    if i >= 0 and t.count('"') == 1:
        opener = i + 1 < len(t) and not t[i + 1].isspace() and t[i + 1] not in ",.;:"
        t = t[:i] + "[quotation]" if opener else "[quotation]" + t[i + 1:]
    return t
READER = re.compile(r"\breaders?\b|\b(you|your)\b", re.I)
FIRST_PERSON = re.compile(r"(?:(?:^|[,;:]\s+|\b(?:and|but|so|then|when|after|before|because|which|that)\s+)I|\b[Ww]e|\b[Mm]y|\b[Oo]urs?)\b(?!-\d)(?!\s+[A-Z])")
"""A first-person pronoun in the page's own voice is the site narrating its method. A pronoun followed by a
capitalized word is a proper name (Our World in Data); I before a hyphenated number is a route (I-95); a bare I
counts only where a sentence or clause starts, so Title I and Article I are not pronouns."""
SELF_PAGE = re.compile(r"\bthis page\b(?! of\b)", re.I)
TIMESTAMPED_ABSENCE = re.compile(r"\bat the time of (this )?writing\b|\bas of (the )?[A-Z]?[a-z]*\.? ?\d{0,2},? ?(\d{4})?[^.;]{0,80}\b(had|has|have|was|were|did|does|do) (not|no|yet)\b", re.I)
"""A dated news page's own date is its frame; "as of <date> X had not happened" is the record turn's note. When a
record gives the date X is due, the sentence is the due date."""
THRESHOLDS = {"self_description": 0.86, "mirrored": 0.43, "outline_conclusion": 0.56, "reader_gloss": 0.67, "source_subject": 0.65, "unprompted": 0.52, "dictionary": 0.33}
"""Reread thresholds at specificity 0.95 from --calibrate on 2026-09-19 (design/voice-calibrate-2026-09-19b.txt): source_subject
AUC 0.95, recall 8/10; dictionary AUC 1.00, recall 8/8, and the label file's highest-scoring "clean" rows are dictionary lines
labelled before the definition gate existed; unprompted AUC 0.84 with recall 1/8, so it is a weak question kept for the reread list only."""
FAIL_QUESTIONS = set()  # no model question fails a page: at specificity 0.95 the self-description question caught 12 of 25 known cases (calibrated 2026-09-19)
IGN = "Words inside quotation marks are someone else's speech and are not judged; judge only the page's own words."
QUESTIONS = {
    "self_description": f"Does this sentence describe the page, the site, the story or the writer's own work or method (what the page does, says, computes, treats, keeps, has checked, cannot say, will not guess) instead of describing the event and its record? {IGN}",
    "mirrored": f"Is this sentence a mirrored antithesis or a does-and-does-not pair whose two halves balance each other instead of adding a fact? {IGN}",
    "outline_conclusion": f"Does this sentence close a section by summarizing or weighing what came before instead of adding a fact: a balanced tidy wrap-up such as 'the record shows X; it does not show Y' or 'what remains is Z'? {IGN}",
    "reader_gloss": f"Does this sentence tell the reader what to take from the facts (what it means for a reader, what to carry away, what the whole of it amounts to, what the numbers together show) instead of reporting a fact? {IGN}",
    "source_subject": f"Is a document, table, figure, series, calendar or data release the grammatical subject of this sentence (it shows, says, plots, prints, records, lists) where the fact it carries could be stated on its own with the source left to a citation, so the sentence narrates a record rather than reporting the event? A sentence where the document's identity is the point (the wording of a statement, a quotation attributed to minutes, an outlet's claim, one record contradicting another) is not this. {IGN}",
    "unprompted": f"Does this sentence explain something a reader of the preceding text would not have asked about (how a statistic is computed in general, how a figure is drawn, what a document's layout is, which entries a table omits), so that it reads as the writer's note to themself rather than an answer to the reader's next question? {IGN}",
    "dictionary": f"Does this sentence define a term the way a glossary or encyclopedia would (\"an X is a Y that Z\") instead of saying what the term does in this story, or preserve a source's own technical vocabulary where an everyday phrase would carry the same fact? {IGN}",
}
WHY = {"reader": "addresses the reader", "self_page": "the page speaks about itself", "first_person": "the page speaks in the first person",
       "self_description": "describes the page or its method instead of the event", "mirrored": "mirrored antithesis",
       "outline_conclusion": "section wrap-up with no new fact", "reader_gloss": "tells the reader what to take away",
       "timestamped_absence": "timestamps an absence the page's date already frames", "source_subject": "a document is the subject where the fact could stand alone",
       "unprompted": "explains what no reader asked", "dictionary": "defines a term instead of saying what it does here"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack = []; self.blocks = []; self.buf = None; self.skip = 0; self.inmain = False; self.records_depth = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "main": self.inmain = True
        chrome = self.records_depth > 0 and tag == "p" and (has_cls(a, "section-lede") or has_cls(a, "sources-line"))
        skipped = tag in ("script", "style", "nav", "svg", "blockquote") or (tag == "sup" and has_cls(a, "src-ref")) or "data-state-slot" in a or chrome
        if tag == "section" and a.get("id") == "records": self.records_depth += 1
        if skipped: self.skip += 1
        self.stack.append((tag, a.get("data-layer"), skipped))
        if self.inmain and not self.skip and tag in BLOCK and self.buf is None:
            self.buf = []; self.layer = next((l for t, l, _ in reversed(self.stack) if l), None); self.tag = tag
            self.kicker = has_cls(a, "sec-kicker")
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
        if tag == "section" and self.records_depth and not any(t == "section" for t, _, _ in self.stack): self.records_depth = 0
    def handle_data(self, d):
        if self.buf is not None and not self.skip: self.buf.append(d)


def sentences(path):
    """Yield (tag, sentence, inside) for every judged block: inside is true when the sentence begins
    inside a quotation that an earlier sentence of the same block opened."""
    p = Page(); p.feed(open(path, encoding="utf-8").read()); out = []
    for b in p.blocks:
        if b["layer"] == "proof": continue
        text = ABBR.sub(lambda m: m.group(0).replace(". ", ".⁣"), b["text"])
        heading = b["tag"] in ("h1", "h2", "h3", "h4", "kicker")
        quotes = 0
        for sen in re.split(r"(?<=[.!?])\s+(?=[A-Z\"])", text):
            sen = sen.replace("⁣", " "); inside = quotes % 2 == 1; quotes += sen.count('"')
            if (len(re.findall(r"[A-Za-z]+", sen)) >= 6 and re.search(r"[.!?]$", sen)) or (heading and len(sen.split()) >= 4):
                out.append((b["tag"], sen, inside))
    return out


OWN_VOICE = {"p", "li", "figcaption", "td", "dd", "summary"}
SECTION_TITLE = "What we do not know yet"  # the toolkit's fixed heading for the unknowns section: site chrome, not the author's voice


BATCH = 20
REREAD = 10  # the ten highest-scoring sentences on a page are worth a reread, plus the top two of any question the ten leave out; a longer list is noise


def score(client, qs, sents, subject):
    """Score a batch of sentences in one request: the state is the numbered list, and every question is
    asked once per sentence. Returns one {question: score} per sentence, in order."""
    state = {"page_subject": subject, "sentences": [{"n": i + 1, "sentence": t} for i, t in enumerate(sents)]}
    questions = {f"{k}_{i + 1}": type(q)(instructions={"question": f"About sentence {i + 1}: {q.instructions['question']}"}) for i in range(len(sents)) for k, q in qs.items()}
    r = client.system_one(state=state, questions=questions)
    return [{k: round(r.nouls[f"{k}_{i + 1}"].noul, 3) for k in qs} for i in range(len(sents))]


def score_all(client, qs, sents, subject):
    out = []
    for i in range(0, len(sents), BATCH): out.extend(score(client, qs, sents[i:i + BATCH], subject))
    return out


def lint(path, client):
    """Return (fails, reviews): rule hits fail the page; model hits are sorted by score for a reread."""
    from typesafe_sdk import Noul
    qs = {k: Noul(instructions={"question": q}) for k, q in QUESTIONS.items()}
    fails, reviews, judged = [], [], []
    subject = os.path.basename(os.path.dirname(path.rstrip("/")))
    for tag, sen, inside in sentences(path):
        own = strip_q(sen, inside)
        if own == SECTION_TITLE: continue
        if READER.search(own): fails.append(("reader", 1.0, sen))
        if SELF_PAGE.search(own): fails.append(("self_page", 1.0, sen))
        if FIRST_PERSON.search(own): fails.append(("first_person", 1.0, sen))
        if TIMESTAMPED_ABSENCE.search(own): fails.append(("timestamped_absence", 1.0, sen))
        if tag in OWN_VOICE and not own.startswith("How we check"): judged.append((sen, own))
    for (sen, own), scores in zip(judged, score_all(client, qs, [o for _, o in judged], subject)):
        for k, v in scores.items():
            if v >= THRESHOLDS[k]: (fails if k in FAIL_QUESTIONS else reviews).append((k, v, sen))
    reviews.sort(key=lambda h: -h[1])
    return fails, reviews


def calibrate(labels_path, positives_path=None):
    """Score a labelled sentence file (one JSON row per sentence: page, tag, text, label, shapes) the way
    lint() does and print, per question, the AUC and the highest threshold that keeps specificity 0.95.
    For self_description the positives are the lines of positives_path (one sentence per line) and the
    negatives are every clean labelled row; the zero-false-alarm threshold is the one that fails a page."""
    from typesafe_sdk import TypeSafeClient, Noul
    key = os.environ.get("TYPESAFE_API_KEY") or subprocess.run(["security", "find-generic-password", "-s", "typesafe-api-key", "-w"], capture_output=True, text=True, check=True).stdout.strip()
    qs = {k: Noul(instructions={"question": q}) for k, q in QUESTIONS.items()}
    rows = [json.loads(l) for l in open(labels_path)]
    rows = [r for r in rows if r.get("tag") in OWN_VOICE and not strip_q(r["text"]).startswith("How we check")]  # label rows predate the chrome skip
    if positives_path:
        for t in open(positives_path):
            if not t.strip(): continue
            shape, _, text = t.partition("\t") if "\t" in t else ("sd", "", t)
            rows.append({"page": "cut", "tag": "p", "text": text.strip(), "label": 1, "shapes": [shape.strip()]})
    with TypeSafeClient(api_key=key, model="jev-latest", timeout=120) as client:
        by_page = {}
        for r in rows: by_page.setdefault(r["page"], []).append(r)
        for page, prs in by_page.items():
            for r, sc in zip(prs, score_all(client, qs, [strip_q(r["text"]) for r in prs], page)): r["scores"] = sc
    shape_for = {"self_description": "sd", "mirrored": "ma", "outline_conclusion": "wu", "reader_gloss": "ra", "source_subject": "ss", "unprompted": "ue", "dictionary": "dd"}
    for k in QUESTIONS:
        sh = shape_for[k]
        if not any(sh in r.get("shapes", []) for r in rows): print(f"{k}: no positives"); continue
        sub = [r for r in rows if not r["label"] or sh in r.get("shapes", [])]
        pos = [r["scores"][k] for r in sub if r["label"]]; neg = [r["scores"][k] for r in sub if not r["label"]]
        if not pos: print(f"{k}: no positives"); continue
        auc = sum((p > n) + 0.5 * (p == n) for p in pos for n in neg) / (len(pos) * len(neg))
        pick = None
        for t in sorted(set(neg + pos), reverse=True):
            fp = sum(1 for n in neg if n >= t)
            if fp / len(neg) <= 0.05: pick = (t, sum(1 for p in pos if p >= t), len(pos), fp, len(neg))
            else: break
        clean = max(neg)
        print(f"{k:20s} AUC {auc:.2f} on {sh} (n={len(pos)})  threshold {pick[0]:.2f}: recall {pick[1]}/{pick[2]}, false alarms {pick[3]}/{pick[4]};  zero-false-alarm threshold {clean:.2f} catches {sum(1 for p in pos if p > clean)}/{len(pos)}")
        for r in sorted((r for r in sub if not r["label"]), key=lambda r: -r["scores"][k])[:4]: print(f"    clean {r['scores'][k]:.2f} {r['text'][:110]}")
        if k == "self_description":
            for r in sorted((r for r in sub if r["label"]), key=lambda r: r["scores"][k])[:6]: print(f"    missed {r['scores'][k]:.2f} {r['text'][:110]}")


def main(paths):
    from typesafe_sdk import TypeSafeClient
    key = os.environ.get("TYPESAFE_API_KEY") or subprocess.run(["security", "find-generic-password", "-s", "typesafe-api-key", "-w"], capture_output=True, text=True, check=True).stdout.strip()
    total = 0
    with TypeSafeClient(api_key=key, model="jev-latest", timeout=120) as client:
        for path in paths:
            fails, reviews = lint(path, client); total += len(fails)
            print(f"{path}: {len(fails)} failing sentence(s), {min(len(reviews), REREAD)} to reread")
            for k, score, sen in fails: print(f"  FAIL [{k}] {WHY[k]}: {sen}")
            shown = reviews[:REREAD] + [h for q in QUESTIONS for h in [h for h in reviews[REREAD:] if h[0] == q][:2] if not any(h[0] == q for h in reviews[:REREAD])]
            for k, score, sen in shown: print(f"  reread [{k} {score}] {WHY[k]}: {sen}")
    return 1 if total else 0


if __name__ == "__main__":
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    if sys.argv[1] == "--calibrate": calibrate(sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None); sys.exit(0)
    sys.exit(main(sys.argv[1:]))
