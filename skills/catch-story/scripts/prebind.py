#!/usr/bin/env python3
"""Fast advisory checks, never a binding decision.

Usage: prebind.py <story> [--strict] [--all]
By default checks exactly bind's changed, bindable blocks; --all checks all bindable
blocks. --strict exits 1 on findings. Missing inputs are errors, not clean results.
Quotes: extract curly or straight double quotes (not single quotes). Map curly
double/single quotes and apostrophes to straight, collapse whitespace and trim.
Match case-sensitive exact substrings of cited passages or quoted text in says.
Ellipses (… or ...) split a quote into segments which must match in order within
one source. Numbers ignore thousands commas and insignificant decimal zeroes;
percent and money units remain significant. Names skip sentence-initial words.
"""

import argparse
from decimal import Decimal
import re
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "catch-record/scripts"))
import claims as ledger

QUOTES = str.maketrans({'“': '"', '”': '"', '‘': "'", '’': "'"})
STOP = set('the a an this that these those it its he she they we i in on at by for from to of and or but as what why how when where who which after before just according'.split())
MONTH = r'(?:January|February|March|April|May|June|July|August|September|October|November|December)'
NUMBER = re.compile(r'(?<![\w.])\$?\d+(?:,\d{3})*(?:\.\d+)?(?:\s*(?:%|percent\b|million\b|billion\b|trillion\b))?', re.I)
DATE = re.compile(r'\b' + MONTH + r'\s+\d{1,2}(?:,?\s+\d{4})?\b')
NAME = re.compile(r"\b[A-Z][a-zA-Z]*(?:[-'][A-Za-z]+)*(?:\s+[A-Z][a-zA-Z]*(?:[-'][A-Za-z]+)*)*\b")
VERB = re.compile(r'\b(?:said|says?|told|according to|alleged|alleges|accused|claims?|claimed|stated|states|wrote|writes|argued|argues|announced|testified|warned|warns)\b', re.I)


def normalize(text):
    return ' '.join(text.translate(QUOTES).split())


def canonical(text):
    text = normalize(text).casefold()
    text = re.sub(r"'s\b", '', text)
    text = re.sub(r'(?<=\d),(?=\d)', '', text)
    text = re.sub(r'\d+(?:\.\d+)?', lambda m: format(Decimal(m[0]).normalize(), 'f'), text)
    return re.sub(r'\s*(%|\bpercent\b)', '%', text)


def contains(text, token):
    return re.search(r'(?<!\w)' + re.escape(token) + r'(?!\w)', text) is not None


def tokens(text):
    out = [m[0] for m in NUMBER.finditer(text)] + [m[0] for m in DATE.finditer(text)]
    for m in NAME.finditer(text):
        prefix = text[:m.start()].rstrip(' \t\n“"(')
        if not prefix or prefix[-1] in '.!?':
            continue
        for name in re.sub(r"'s\b", '', m[0]).split():
            if len(name) > 1 and name.casefold() not in STOP:
                out.append(name)
    return list(dict.fromkeys(out))


def quoted(text):
    return re.findall(r'"([^"\n]*(?:\n[^"\n]*)*)"', normalize(text))


def quote_matches(quote, sources):
    segments = [s.strip() for s in re.split(r'…|\.{3}', normalize(quote)) if s.strip()]
    if not segments:
        return False
    for source in sources:
        pos = 0
        for segment in segments:
            hit = source.find(segment, pos)
            if hit < 0:
                break
            pos = hit + len(segment)
        else:
            return True
    return False


def check_block(block):
    text, claims = block['text'], block['claims']
    passages = [e['passage'] for c in claims for e in c.get('evidence', [])]
    support = [canonical(s) for s in passages + [c['says'] for c in claims]]
    missing = [t for t in tokens(text) if not any(contains(s, canonical(t)) for s in support)]
    issues = []
    if missing:
        issues.append({'lint': 'tokens', 'missing': missing})
    for c in claims:
        if c.get('status') not in {'said', 'alleged'}:
            continue
        by = re.sub(r"'s\b", '', normalize(c.get('by', '')).casefold())
        distinctive = [w for w in re.findall(r'\w+', by) if w not in STOP and len(w) > 2]
        named = bool(by) and (contains(canonical(text), by) or any(contains(canonical(text), w) for w in distinctive))
        if not named or not VERB.search(text):
            issues.append({'lint': 'attribution', 'claim': c['id'], 'missing': [f"name {c.get('by', '')!r} and an attribution verb"]})
    sources = [normalize(p) for p in passages] + [q for c in claims for q in quoted(c['says'])]
    bad_quotes = [q for q in quoted(text) if not quote_matches(q, sources)]
    if bad_quotes:
        issues.append({'lint': 'quotes', 'missing': bad_quotes})
    return issues


def candidates(token, texts):
    found = []
    needle = canonical(token)
    pattern = re.compile(r'(?<!\w)' + re.escape(needle) + r'(?!\w)')
    for rid, lines in texts.items():
        for line, normalized in lines:
            hit = pattern.search(normalized)
            if hit:
                at = hit.start()
                found.append(f"{rid}: {line[max(0, at - 100):at + 200].strip()}")
                break
        if len(found) == 3:
            break
    return found


def lint(story, all=False, todo=None):
    started = time.perf_counter()
    if todo is None:
        bound = set(ledger.read_json(ledger.bound_path(story), []))
        todo = [b for b in ledger.blocks(story) if ledger.bindable(b) and (all or b['hash'] not in bound)]
    failures = []
    texts = None
    candidate_cache = {}
    lines = ['## Pre-bind lint', '']
    for n, block in enumerate(todo, 1):
        issues = check_block(block)
        if not issues:
            continue
        failures.append({'block': block, 'issues': issues})
        lines.extend([f"B{n}. {block['text']}", ''])
        for issue in issues:
            lines.append(f"- {issue['lint']}: " + '; '.join(issue['missing']))
            if issue['lint'] == 'tokens':
                if texts is None:
                    _, raw = ledger.record_texts(story)
                    texts = {rid: [(line, canonical(line)) for line in re.split(r'\n|(?<=[.!?])\s+', text)] for rid, text in raw.items()}
                for token in issue['missing']:
                    key = canonical(token)
                    if key not in candidate_cache:
                        candidate_cache[key] = candidates(token, texts)
                    hits = candidate_cache[key]
                    lines.extend(f'  - {token}: {hit}' for hit in hits)
                    if not hits:
                        lines.append(f'  - {token}: no admitted-record candidate')
        lines.extend(f"  claim {c['id']}: {c['says']}" for c in block['claims'])
        if not block['claims']:
            lines.append('  claims: none')
        lines.append('')
    lines.append(f"{len(todo)} blocks checked; {len(failures)} failing; {time.perf_counter() - started:.3f}s. Advisory only; no blocks recorded as bound.")
    return failures, '\n'.join(lines)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('story')
    parser.add_argument('--strict', action='store_true')
    parser.add_argument('--all', action='store_true')
    args = parser.parse_args()
    failures, report = lint(args.story, all=args.all)
    print(report)
    sys.exit(1 if args.strict and failures else 0)
