#!/usr/bin/env python3
USAGE = """A story's claim ledger: checks/claims/<subject>--<slug>.json. Run from the worktree root.

check:   claims.py check <story>                         the ledger's shape, and every passage in its record
pack:    claims.py pack <story> <pack.md> <records.md>   the claims not yet held, for the claim check
hold:    claims.py hold <story> <pack.md>                record the packed claims as held (CLAIMS HOLD)
blocks:  claims.py blocks <story>                        the built page's blocks and the claims each cites (JSON lines)
verify:  claims.py verify <story>                        every claim the page cites is held, every block that cites one is bound
lint:    claims.py lint <story>                          each short form states nothing its says does not (numbers,
                                                         dates, names, qualifiers); reports, before the claim check
add:     claims.py add <story> --find "<words>" [--record <id>] [--pick N]
                   [--id <id> --says "..." --status <status> [--by ...] [--scope ...] [--short ...] [--load a,b]]
                                                         list the passages in the admitted records that hold the words;
                                                         with --id, write the chosen one byte-exact as a new claim's
                                                         evidence, or as more evidence for an existing claim

A ledger is {"story": "<story>", "claims": [claim, ...]}. A claim:

  {"id": "france-2m-diesel",            kebab-case, unique in the ledger
   "says": "France signalled it could release 2 million more barrels of diesel.",
                                         the claim in plain words, as the page may state it, with
                                         the record's own status and scope in the words
   "short": "France: could add 2 million barrels",
                                         optional: the claim as a table cell or timeline label
   "status": "may",                      fact | said | plans | may | expected | alleged
   "by": "France's energy ministry",     who says it; required for said and alleged
   "scope": "as of October 7",           optional: what the claim holds for (one meeting, the
                                         referrals made public, as of a date)
   "load": ["catch"],                    what rests on it: spine (a deciding row of the matrix),
                                         catch, figure, person (what a named person or party did
                                         or did not do); empty for background
   "evidence": [{"record": "politico-eu-france-germany-2026-10-07",
                 "passage": "France on Wednesday signaled it could release 2 million barrels"}]}
"""

import hashlib
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

STATUSES = {"fact", "said", "plans", "may", "expected", "alleged"}
LOADS = {"spine", "catch", "figure", "person"}
ATTRIBUTED = {"said", "alleged"}
HASHED = ("says", "short", "status", "by", "scope", "load", "evidence")


def ledger_path(story):
    return Path("checks/claims") / f"{story}.json"


def held_path(story):
    return Path("checks/reads") / f"{story}-claims-held.json"


def bound_path(story):
    return Path("checks/reads") / f"{story}-bound.json"


def page_path(story):
    subject, slug = story.split("--", 1)
    return Path("dist/events") / subject / slug / "index.html"


def read_json(path, default=None):
    return json.loads(path.read_text()) if path.exists() else default


def claim_hash(claim):
    body = json.dumps({k: claim.get(k) for k in HASHED}, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(body.encode()).hexdigest()[:16]


def strict(claim):
    return bool(claim.get("load"))


def loose(passage):
    return re.compile(r"\s+".join(map(re.escape, passage.split())))


def record_texts(story):
    manifest = json.loads((Path("checks/manifests") / f"{story}.json").read_text())
    records = {r["id"]: r for r in manifest["records"]}
    return records, {rid: Path(r["text_path"]).read_text() for rid, r in records.items() if r.get("text_path")}


def problems(story):
    ledger = read_json(ledger_path(story))
    if ledger is None:
        return [f"no ledger at {ledger_path(story)}"], None
    found = []
    if ledger.get("story") != story:
        found.append(f'ledger "story" is {ledger.get("story")!r}, not {story!r}')
    _, texts = record_texts(story)
    seen = set()
    for c in ledger.get("claims", []):
        cid = c.get("id", "")
        where = f"claim {cid or '(no id)'}"
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", cid):
            found.append(f"{where}: id must be kebab-case")
        if cid in seen:
            found.append(f"{where}: id used twice")
        seen.add(cid)
        says = c.get("says", "")
        if not says.strip() or not re.search(r"[.!?][”\"’)]?$", says.strip()):
            found.append(f"{where}: says must be a sentence")
        for field in ("says", "short"):
            if "—" in (c.get(field) or ""):
                found.append(f"{where}: {field} holds an em dash")
        if c.get("status") not in STATUSES:
            found.append(f"{where}: status must be one of {', '.join(sorted(STATUSES))}")
        if c.get("status") in ATTRIBUTED and not (c.get("by") or "").strip():
            found.append(f"{where}: a {c.get('status')} claim names who says it in by")
        if not set(c.get("load", [])) <= LOADS:
            found.append(f"{where}: load may hold only {', '.join(sorted(LOADS))}")
        evidence = c.get("evidence") or []
        if not evidence:
            found.append(f"{where}: no evidence")
        for e in evidence:
            rid, passage = e.get("record"), e.get("passage") or ""
            if rid not in texts:
                found.append(f"{where}: {rid} is not an admitted record")
            elif not passage.strip() or not loose(passage).search(texts[rid]):
                found.append(f'{where}: "{passage}" not in {rid}')
    return found, ledger


def check(story):
    found, ledger = problems(story)
    for p in found:
        print("FAIL", p)
    n = len(ledger["claims"]) if ledger else 0
    print(f"{n} claims, {len(found)} failures")
    return not found


def pack(story, out, records_out):
    found, ledger = problems(story)
    if found:
        sys.exit(f"the ledger has failures; run claims.py check {story}")
    held = read_json(held_path(story), {})
    todo = [c for c in ledger["claims"] if held.get(c["id"]) != claim_hash(c)]
    records, texts = record_texts(story)
    lines, used = [], {}
    for i, c in enumerate(todo, 1):
        status = c["status"] + (f" (by {c['by']})" if c.get("by") else "")
        lines += [f"C{i}. [{c['id']}] {c['says']}",
                  f"    status: {status}; scope: {c.get('scope') or 'as stated'}; checked {'strictly' if strict(c) else 'for a reader’s takeaway'}"]
        if c.get("short"):
            lines.append(f"    short form: {c['short']}")
        for e in c["evidence"]:
            used.setdefault(e["record"], None)
            lines.append(f"    evidence: RECORD {e['record']}: {e['passage']}")
    Path(out).write_text(f"# Claims to check: {story}\n\n" + "\n".join(lines) + "\n")
    Path(out + ".ids.json").write_text(json.dumps({c["id"]: claim_hash(c) for c in todo}, indent=2) + "\n")
    Path(records_out).write_text("".join(
        f"===== RECORD {rid}: {records[rid].get('publisher')}, {records[rid].get('date')}, {records[rid].get('title')} =====\n\n"
        f"{texts[rid].strip()}\n\n===== END RECORD {rid} =====\n\n" for rid in used))
    print(f"{out}: {len(todo)} claims; {records_out}: {len(used)} records")
    return len(todo)


def hold(story, packed):
    held = read_json(held_path(story), {})
    held.update(json.loads(Path(packed + ".ids.json").read_text()))
    held_path(story).parent.mkdir(parents=True, exist_ok=True)
    held_path(story).write_text(json.dumps(dict(sorted(held.items())), indent=2) + "\n")
    print(f"{held_path(story)}: {len(held)} claims held")


BLOCK = {"div", "p", "li", "h1", "h2", "h3", "figcaption", "tr", "dt", "dd", "blockquote"}
DROP = {"script", "style", "noscript", "svg", "template", "nav"}


class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.main = self.skip = self.done = 0
        self.stack, self.open, self.blocks = [], [], []

    def handle_starttag(self, tag, attrs):
        if tag in {"br", "img", "hr", "input", "meta", "link", "wbr"}:
            return
        a = dict(attrs)
        if tag == "section" and a.get("id") == "records":
            self.done = 1
        cls = (a.get("class") or "").split()
        drop = (tag in DROP or "mode-switcher" in cls or "work-evidence" in cls or "story-kicker" in cls
                or a.get("data-layer") == "claims")
        self.stack.append((tag, drop))
        if drop:
            self.skip += 1
        if tag == "main":
            self.main += 1
        live = self.main and not self.skip and not self.done
        if tag == "a" and a.get("data-passage") is not None and live and self.open:
            self.open[-1]["claims"].extend((a.get("data-claim") or "").split())
            if len(self.stack) > 1 and self.stack[-2][0] == "sup":
                self.skip += 1
                self.stack[-1] = (tag, True)
        elif tag in BLOCK and live:
            self.open.append({"text": [], "claims": (a.get("data-claims") or "").split()})
        elif tag in {"span", "td", "th"} and live and self.open:
            self.open[-1]["text"].append(" ")

    def handle_endtag(self, tag):
        while self.stack:
            t, drop = self.stack.pop()
            if drop:
                self.skip -= 1
            if t == "main":
                self.main -= 1
            if t in BLOCK and self.open and not drop and t == tag:
                b = self.open.pop()
                text = " ".join("".join(b["text"]).split())
                if text:
                    self.blocks.append((text, list(dict.fromkeys(b["claims"]))))
            if t == tag:
                break

    def handle_data(self, data):
        if self.open and not self.skip:
            self.open[-1]["text"].append(data)


def blocks(story):
    ledger = read_json(ledger_path(story))
    by_id = {c["id"]: c for c in ledger["claims"]}
    p = Blocks()
    p.feed(page_path(story).read_text(encoding="utf-8"))
    out = []
    for text, ids in p.blocks:
        cited = [by_id[i] for i in ids]
        key = json.dumps([html.unescape(text), [(c["id"], claim_hash(c)) for c in cited]], ensure_ascii=False)
        out.append({"hash": hashlib.sha256(key.encode()).hexdigest()[:16], "text": text, "claims": cited})
    return out


def bindable(block):
    return bool(block["claims"]) or any(ch.isalnum() for ch in block["text"])


def verify(story):
    ok = check(story)
    held = read_json(held_path(story), {})
    bound = set(read_json(bound_path(story), []))
    page = blocks(story)
    cited = {c["id"]: c for b in page for c in b["claims"]}
    unheld = [cid for cid, c in cited.items() if held.get(cid) != claim_hash(c)]
    unbound = [b["text"][:80] for b in page if bindable(b) and b["hash"] not in bound]
    for cid in unheld:
        print(f"FAIL claim {cid} is cited on the page but has not held in the claim check")
    for t in unbound:
        print(f'FAIL block "{t}..." has not passed the bind check as it reads now')
    print(f"{len(cited)} claims cited, {len(unheld)} not held; {sum(1 for b in page if bindable(b))} blocks to bind, {len(unbound)} not bound")
    return ok and not unheld and not unbound


NUMBER_WORDS = {w: i for i, w in enumerate(
    "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen "
    "sixteen seventeen eighteen nineteen twenty".split())}
NUMBER_WORDS.update({"thirty": 30, "forty": 40, "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80,
                     "ninety": 90, "hundred": 100, "dozen": 12, "once": 1, "twice": 2})
SCALES = {"thousand": 1e3, "million": 1e6, "billion": 1e9, "trillion": 1e12,
          "k": 1e3, "m": 1e6, "mn": 1e6, "b": 1e9, "bn": 1e9, "tn": 1e12}
MONTHS = {m: i for i, names in enumerate(
    [("jan", "january"), ("feb", "february"), ("mar", "march"), ("apr", "april"), ("may",), ("jun", "june"),
     ("jul", "july"), ("aug", "august"), ("sep", "sept", "september"), ("oct", "october"),
     ("nov", "november"), ("dec", "december")], 1) for m in names}
WEEKDAYS = {d: i for i, names in enumerate(
    [("mon", "monday"), ("tue", "tues", "tuesday"), ("wed", "wednesday"), ("thu", "thur", "thurs", "thursday"),
     ("fri", "friday"), ("sat", "saturday"), ("sun", "sunday")]) for d in names}
QUALIFIERS = set("""all every each any entire whole only sole solely just never always none no not nobody nothing
    first last new most least more less fewer record nationwide worldwide permanent permanently total totally
    complete completely fully already still final finally officially confirmed will must unanimous unanimously
    except excepted unless without""".split())
# Qualifiers that say the same thing: "all 21" holds where says has "every one of the 21".
KIN = [{"all", "every", "each", "any", "entire", "whole"}, {"only", "sole", "solely", "just"},
       {"no", "not", "none", "nothing", "nobody", "never", "without"}, {"will", "would"}]
ALIASES = {"us": {"united states", "america"}, "uk": {"united kingdom", "britain"},
           "eu": {"european union"}, "un": {"united nations"}}
SUFFIXES = ("ians", "ian", "ese", "ings", "ing", "ly", "ed", "es", "ic", "s", "e", "a", "n")
SMALL = {"of", "the", "and", "for", "on", "in", "to", "a", "an", "&"}
NUMBER = re.compile(r"(?<![\w.])(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?(?:\s*(thousand|million|billion|trillion)\b|(k|m|mn|b|bn|tn)\b)?",
                    re.I)
WORD = re.compile(r"[A-Za-z](?:[A-Za-z]|\.(?=[A-Za-z])|['’](?=[a-z]))*")


def numbers(text):
    """Every value a number in the text can stand for: as written, and with its scale applied."""
    values = set()
    for m in NUMBER.finditer(text):
        n = float(m.group(1).replace(",", "") + (m.group(2) or ""))
        values.add(n)
        scale = (m.group(3) or m.group(4) or "").lower()
        if scale:
            values.add(n * SCALES[scale])
    for w in WORD.findall(text):
        if w.lower() in NUMBER_WORDS:
            values.add(float(NUMBER_WORDS[w.lower()]))
        elif w.lower() == "single":
            values.add(1.0)
    return values


def norm(word):
    word = re.sub(r"['’]s$", "", word).replace(".", "")
    if re.fullmatch(r"[A-Z]{2,}s", word):
        word = word[:-1]
    return word.lower()


def stem(word):
    for suffix in SUFFIXES:
        if word.endswith(suffix) and len(word) - len(suffix) >= 3:
            return word[:-len(suffix)]
    return word


def words(text):
    """(token, sentence-initial) for each word, with dots and possessives stripped."""
    out = []
    for m in WORD.finditer(text):
        before = text[:m.start()].rstrip(" \"“‘'(")
        out.append((m.group(), not before or before[-1] in ":.;!?—–"))
    return out


def vocabulary(text):
    vocab = set()
    caps = []
    for w, _ in words(text) + [("", False)]:
        n = norm(w)
        vocab.update({n, f"stem:{stem(n)}"})
        if re.search(r"n['’]t$", w) or n == "cannot":
            vocab.add("not")
        if n in {"a", "an", "single"}:
            vocab.add("one")
        if n in MONTHS and w[:1].isupper():
            vocab.add(f"month:{MONTHS[n]}")
        if n in WEEKDAYS:
            vocab.add(f"weekday:{WEEKDAYS[n]}")
        if w[:1].isupper() or (caps and n in SMALL):
            caps.append(n)
            continue
        while caps and caps[-1] in SMALL:
            caps.pop()
        for i in range(len(caps)):
            for j in range(i + 2, len(caps) + 1):
                run = caps[i:j]
                if run[0] in SMALL or run[-1] in SMALL:
                    continue
                vocab.add(" ".join(run))
                for letters in ("".join(c[0] for c in run), "".join(c[0] for c in run if c not in SMALL)):
                    # "Justice Department" and "Homeland Security Secretary" stand for DOJ and DHS
                    vocab.update({letters, "d" + letters, "do" + letters, "d" + letters[:-1], "do" + letters[:-1]})
        caps = []
    return vocab


def short_drift(short, says, common=frozenset()):
    """What a short form states that its claim's says does not: numbers, dates, names, qualifiers.

    A name is a capitalized word; at the start of the short form or after a colon it counts as a name
    only when the story's records never use it in lower case (`common`), so "License for ..." is a
    word and "Telle moves ..." a name. Matching ignores case, dots ("U.S." is "US"), possessives and
    a number's written form ("2 million", "2,000,000", "two million" agree)."""
    vocab, values = vocabulary(says), numbers(says)
    missing = []
    for m in NUMBER.finditer(short):
        n = float(m.group(1).replace(",", "") + (m.group(2) or ""))
        scale = SCALES.get((m.group(3) or m.group(4) or "").lower(), 1)
        places = len(m.group(2) or ".") - 1
        # "$12.26 billion" holds where says has the exact $12,263,715,308.36
        if not (n * scale in values or (scale > 1 and any(round(v / scale, places) == n for v in values))):
            missing.append(m.group().strip())
    for w, initial in words(short):
        n = norm(w)
        if n in NUMBER_WORDS and float(NUMBER_WORDS[n]) not in values:
            missing.append(w)
        elif n in MONTHS and w[:1].isupper():
            if f"month:{MONTHS[n]}" not in vocab:
                missing.append(w)
        elif n in WEEKDAYS and w[:1].isupper():
            if f"weekday:{WEEKDAYS[n]}" not in vocab:
                missing.append(w)
        elif n in QUALIFIERS or re.search(r"n['’]t$", w):
            q = "not" if re.search(r"n['’]t$", w) else n
            kin = next((k for k in KIN if q in k), {q})
            if not (kin & vocab or f"stem:{stem(q)}" in vocab):
                missing.append(w)
        elif (w[:1].isupper() and len(n) > 1 and n not in vocab and f"stem:{stem(n)}" not in vocab
              and not (ALIASES.get(n, set()) & vocab)):
            acronym = w.isupper() and len(w.replace(".", "")) > 1
            if not initial or acronym or not ({n, f"stem:{stem(n)}"} & common):
                missing.append(w)
    return list(dict.fromkeys(missing))


def lowercase_words(texts):
    found = {w for t in texts for w in re.findall(r"\b[a-z][a-z]+\b", t)}
    return frozenset(found | {f"stem:{stem(w)}" for w in found})


def lint(story):
    ledger = read_json(ledger_path(story))
    if ledger is None:
        print(f"FAIL no ledger at {ledger_path(story)}")
        return False
    _, texts = record_texts(story)
    common = lowercase_words(texts.values())
    shorts = [c for c in ledger.get("claims", []) if (c.get("short") or "").strip()]
    failed = 0
    for c in shorts:
        missing = short_drift(c["short"], c.get("says", ""), common)
        if missing:
            failed += 1
            print(f"SHORT {c.get('id')}: the short form states {', '.join(map(repr, missing))}, which says does not")
            print(f"    short: {c['short']}")
            print(f"    says:  {c.get('says', '')}")
    print(f"{len(shorts)} short forms, {failed} state more than their claim")
    return not failed


QUOTES = str.maketrans({"“": '"', "”": '"', "„": '"', "‘": "'", "’": "'", "‚": "'", "\u00a0": " "})


def folded(text):
    """The text case- and quote-folded with whitespace runs as one space, and each character's offset in the original."""
    out, where = [], []
    for i, ch in enumerate(text):
        if ch.isspace():
            if out and out[-1] == " ":
                continue
            ch = " "
        out.append(ch.translate(QUOTES).lower())
        where.append(i)
    return "".join(out), where


ABBREVIATIONS = set("jan feb mar apr jun jul aug sep sept oct nov dec mr mrs ms dr st sen rep gov gen lt sgt "
                    "no vs inc co jr mont".split())


def sentence_ends(t):
    """Offsets where sentences end, skipping abbreviations like Nov. and initials like U.S."""
    for m in re.finditer(r"[.!?][\"”’)]*(?=\s)|\n\s*\n", t):
        if t[m.start()] == ".":
            word = re.search(r"(\w+)$", t[:m.start()])
            if word and (word.group(1).lower() in ABBREVIATIONS or len(word.group(1)) == 1):
                continue
        yield m.end()


def find(story, text, only=None):
    """Passages in the story's admitted records for the text: exact ones (ignoring case, quote style and
    whitespace), else the record sentences sharing most of its words. Each passage is the saved text's own bytes."""
    _, texts = record_texts(story)
    texts = {rid: t for rid, t in texts.items() if not only or rid == only}
    needle = " ".join(text.translate(QUOTES).lower().split())
    exact = []
    for rid, t in texts.items():
        hay, where = folded(t)
        start = hay.find(needle) if needle else -1
        while start >= 0:
            exact.append({"record": rid, "passage": t[where[start]:where[start + len(needle) - 1] + 1],
                          "at": where[start], "match": "exact"})
            start = hay.find(needle, start + 1)
    if exact:
        return exact
    want = {w for w in re.findall(r"\w+", needle) if len(w) > 2}
    near = []
    for rid, t in texts.items():
        start = 0
        for end in [*sentence_ends(t), len(t)]:
            s = t[start:end]
            got = {w for w in re.findall(r"\w+", s.translate(QUOTES).lower())}
            score = len(want & got) / len(want) if want else 0
            if score >= 0.5 and s.strip():
                lead = len(s) - len(s.lstrip())
                near.append({"record": rid, "passage": s.strip(), "at": start + lead, "match": "near", "score": score})
            start = end
    near.sort(key=lambda p: -p["score"])
    return near[:5]


def show(story, found):
    _, texts = record_texts(story)
    for i, p in enumerate(found, 1):
        t, at, end = texts[p["record"]], p["at"], p["at"] + len(p["passage"])
        before = " ".join(t[max(0, at - 80):at].split())
        after = " ".join(t[end:end + 80].split())
        print(f"{i}. {p['record']} ({p['match']}): {p['passage']}")
        print(f"   …{before} [{' '.join(p['passage'].split())}] {after}…")


def json_end(text, i):
    """Index just past the JSON value starting at text[i]."""
    if text[i] in "[{":
        close, i = {"[": "]", "{": "}"}[text[i]], i + 1
        while True:
            while text[i] in " \t\r\n,:":
                i += 1
            if text[i] == close:
                return i + 1
            i = json_end(text, i)
    return json.JSONDecoder().raw_decode(text, i)[1]


def json_members(text, i):
    """(key or index, start, end) for each member of the JSON object or array at text[i]."""
    out, close, i, n = [], {"[": "]", "{": "}"}[text[i]], i + 1, 0
    while True:
        while text[i] in " \t\r\n,":
            i += 1
        if text[i] == close:
            return out
        key = n
        if close == "}":
            key, i = json.JSONDecoder().raw_decode(text, i)
            while text[i] in " \t\r\n:":
                i += 1
        end = json_end(text, i)
        out.append((key, i, end))
        i, n = end, n + 1


def append_to_array(text, start, value):
    """Insert a JSON value at the end of the array at text[start], keeping the file's own layout."""
    end = json_end(text, start) - 1
    items = json_members(text, start)
    body = json.dumps(value, ensure_ascii=False)
    if not items:
        return text[:end] + body + text[end:]
    last = items[-1][2]
    line_start = text.rfind("\n", 0, items[-1][1]) + 1
    indent = text[line_start:items[-1][1]]
    sep = ",\n" + indent if "\n" in text[start:end] and not indent.strip() else ", "
    return text[:last] + sep + body + text[last:]


def add(story, argv):
    import argparse
    ap = argparse.ArgumentParser(prog=f"claims.py add {story}", description="Find a passage in the story's admitted "
                                 "records and write it into the ledger as a claim's evidence, byte-exact.")
    ap.add_argument("--find", required=True, help="words to look for in the records")
    ap.add_argument("--record", help="search only this record")
    ap.add_argument("--pick", type=int, help="which listed passage to use, when more than one is found")
    ap.add_argument("--id", help="the claim to write; an existing claim gets the passage as more evidence")
    ap.add_argument("--says")
    ap.add_argument("--status", choices=sorted(STATUSES))
    ap.add_argument("--by")
    ap.add_argument("--scope")
    ap.add_argument("--short")
    ap.add_argument("--load", default="", help="comma-separated: " + ", ".join(sorted(LOADS)))
    o = ap.parse_args(argv)
    found = find(story, o.find, o.record)
    if not found:
        print(f'no passage in {o.record or "the admitted records"} holds "{o.find}" or most of its words')
        return False
    if found[0]["match"] == "near":
        print(f'no exact passage; the closest sentences:')
    show(story, found)
    if not o.id:
        return True
    if o.pick is None and len(found) > 1:
        print(f"{len(found)} passages; choose one with --pick N")
        return False
    if o.pick is not None and not 1 <= o.pick <= len(found):
        print(f"--pick must be 1 to {len(found)}")
        return False
    chosen = found[(o.pick or 1) - 1]
    evidence = {"record": chosen["record"], "passage": chosen["passage"]}
    path = ledger_path(story)
    before = path.read_text()
    ledger = json.loads(before)
    claims = next(s for k, s, _ in json_members(before, 0) if k == "claims")
    existing = {c.get("id"): i for i, c in enumerate(ledger["claims"])}
    if o.id in existing:
        if any(v is not None for v in (o.says, o.status, o.by, o.scope, o.short)) or o.load:
            print(f"claim {o.id} is already in the ledger; edit it there, or drop the other fields to add evidence")
            return False
        claim = ledger["claims"][existing[o.id]]
        if evidence in (claim.get("evidence") or []):
            print(f"claim {o.id} already cites that passage")
            return True
        member = json_members(before, claims)[existing[o.id]][1]
        ev = next((s for k, s, _ in json_members(before, member) if k == "evidence"), None)
        if ev is None:
            print(f"claim {o.id} has no evidence list to add to; edit it in the ledger")
            return False
        after = append_to_array(before, ev, evidence)
    else:
        if not (o.says and o.status):
            print("a new claim needs --says and --status")
            return False
        claim = {"id": o.id, "says": o.says}
        if o.short:
            claim["short"] = o.short
        claim["status"] = o.status
        for field in ("by", "scope"):
            if getattr(o, field):
                claim[field] = getattr(o, field)
        claim["load"] = [x for x in o.load.split(",") if x]
        claim["evidence"] = [evidence]
        after = append_to_array(before, claims, claim)
    old = set(problems(story)[0])
    path.write_text(after)
    new = [p for p in problems(story)[0] if p not in old]
    if new:
        path.write_text(before)
        for p in new:
            print("FAIL", p)
        print(f"{path}: unchanged")
        return False
    print(f'{path}: claim {o.id} cites {evidence["record"]}: "{evidence["passage"]}"')
    if o.short and o.id not in existing:
        _, texts = record_texts(story)
        missing = short_drift(o.short, o.says, lowercase_words(texts.values()))
        if missing:
            print(f"SHORT {o.id}: the short form states {', '.join(map(repr, missing))}, which says does not")
    return True


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) == 2 and a[0] == "check":
        sys.exit(0 if check(a[1]) else 1)
    elif len(a) == 4 and a[0] == "pack":
        pack(*a[1:])
    elif len(a) == 3 and a[0] == "hold":
        hold(a[1], a[2])
    elif len(a) == 2 and a[0] == "blocks":
        for b in blocks(a[1]):
            print(json.dumps(b, ensure_ascii=False))
    elif len(a) == 2 and a[0] == "verify":
        sys.exit(0 if verify(a[1]) else 1)
    elif len(a) == 2 and a[0] == "lint":
        sys.exit(0 if lint(a[1]) else 1)
    elif len(a) >= 2 and a[0] == "add":
        sys.exit(0 if add(a[1], a[2:]) else 1)
    else:
        sys.exit(USAGE)
