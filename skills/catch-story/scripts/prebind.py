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
percent and money units remain significant. Spelled cardinal numbers through
ninety, hundred and thousand (including compounds) equal digits. Dates accept
full/abbreviated months and require month plus day, with year optional; their
components are not checked separately. Weekdays are not names. Names are whole
capitalized runs, skipping sentence-initial runs and title-only runs. A name is
supported by its full run, acronym (in either direction), or last distinctive
word, including cited claims' by fields. US, U.S. and United States are equivalent.
No metadata blocks are skipped without structural information.
Uncited blocks use says, passages and by from every claim cited on the page for
token support, but not quote support. Bare years can also use page-wide support
or the manifest date's year, even in cited blocks. In uncited blocks only, bare
integers 1-9 are skipped unless immediately followed by a word (a conservative
proxy for a unit or noun of measure). Cited blocks still check those integers.
Attribution accepts a named speaker followed directly by a colon, reporting
verbs, by-speaker count/estimate phrases, and statement/post phrases.
"""

import argparse
from decimal import Decimal
from functools import lru_cache
import re
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "catch-record/scripts"))
import claims as ledger

QUOTES = str.maketrans({'“': '"', '”': '"', '‘': "'", '’': "'"})
STOP = set('the a an this that these those it its he she they we i in on at by for from to of and or but as what why how when where who which after before just according'.split())
MONTHS = 'January February March April May June July August September October November December'.split()
MONTH = '(?:' + '|'.join(m + '|' + m[:3] + r'\.?' for m in MONTHS) + r'|Sept\.?)'
MONTH_ABBREVIATIONS = {m[:3].lower(): m.lower() for m in MONTHS}
MONTH_ABBREVIATIONS['sept'] = 'september'
MONTH_ABBREVIATION = re.compile(r'\b(?:' + '|'.join(MONTH_ABBREVIATIONS) + r')(?:\.|\b)')
NUMBER = re.compile(r'(?<![\w.])\$?\d+(?:,\d{3})*(?:\.\d+)?(?:\s*(?:%|percent\b|million\b|billion\b|trillion\b))?', re.I)
DATE = re.compile(r'\b' + MONTH + r'\s+\d{1,2}(?:,?\s+\d{4})?\b', re.I)
NAME_WORD = r"(?:U\.S\.|[A-Z][a-zA-Z0-9]*(?:[-'][A-Za-z0-9]+)*)"
NAME = re.compile(r'\b' + NAME_WORD + r'(?:\s+' + NAME_WORD + r')*')
TITLES = set('secretary administrator senator senators rep representative representatives president vice department agency minister ministry director acting deputy chief former governor general transportation federal administration national the'.split())
WEEKDAYS = set('monday tuesday wednesday thursday friday saturday sunday'.split())
SMALL = dict(zip('zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'.split(), range(21)))
SMALL.update(dict(zip('thirty forty fifty sixty seventy eighty ninety'.split(), range(30, 100, 10))))
NUMBER_WORD = r'(?:' + '|'.join([*SMALL, 'hundred', 'thousand']) + r')'
WORD_NUMBERS = re.compile(r'\b' + NUMBER_WORD + r'(?:(?:[ -]+|\s+and\s+)' + NUMBER_WORD + r')*\b', re.I)
LOWER_WORD_NUMBERS = re.compile(WORD_NUMBERS.pattern)
VERB = re.compile(r'\b(?:said|says?|told|according to|alleged|alleges|accused|claims?|claimed|stated|states|wrote|writes|argued|argues|announced|testified|warned|warns)\b', re.I)
ATTRIBUTION = re.compile(r"\b(?:blamed|acknowledged|tied|posted|posting|called|insisted|denied|contended|asserted|noted|added|described|cited|reported|estimated|counted|in a statement|in a post)\b|\bby\s+[^.!?:]+?['’]s\s+(?:count|estimate)\b", re.I)


def normalize(text):
    return ' '.join(text.translate(QUOTES).split())


def number_words(match):
    total = current = 0
    for word in re.findall(r'[a-z]+', match[0].lower()):
        if word == 'hundred':
            current = (current or 1) * 100
        elif word == 'thousand':
            total += (current or 1) * 1000
            current = 0
        elif word != 'and':
            current += SMALL[word]
    return str(total + current)


@lru_cache(maxsize=16384)
def canonical(text):
    text = normalize(text).casefold()
    text = re.sub(r'(?<!\w)(?:united states|u\.s\.|us)(?!\w)', 'us', text)
    text = LOWER_WORD_NUMBERS.sub(number_words, text)
    text = MONTH_ABBREVIATION.sub(lambda m: MONTH_ABBREVIATIONS[m[0].rstrip('.')], text)
    text = re.sub(r"'s\b", '', text)
    text = re.sub(r'(?<=\d),(?=\d)', '', text)
    text = re.sub(r'\d+(?:\.\d+)?', lambda m: format(Decimal(m[0]).normalize(), 'f'), text)
    return re.sub(r'\s*(%|\bpercent\b)', '%', text)


def contains(text, token):
    return re.search(r'(?<!\w)' + re.escape(token) + r'(?!\w)', text) is not None


def tokens(text):
    text = WORD_NUMBERS.sub(number_words, normalize(text))
    dates = list(DATE.finditer(text))
    masked = list(text)
    for date in dates:
        masked[date.start():date.end()] = ' ' * len(date[0])
    masked = ''.join(masked)
    out = [m[0] for m in NUMBER.finditer(masked)] + [m[0] for m in dates]
    for m in NAME.finditer(masked):
        prefix = text[:m.start()].rstrip(' \t\n“"(')
        if not prefix or prefix[-1] in '.!?':
            continue
        name = re.sub(r"'s\b", '', m[0])
        if distinctive(name):
            out.append(name)
    return list(dict.fromkeys(out))


def distinctive(name):
    return [w for w in re.findall(r'\w+', canonical(name))
            if len(w) > 1 and w not in STOP | TITLES | WEEKDAYS]


@lru_cache(maxsize=8192)
def source_acronyms(source):
    return {''.join(w[0] for w in re.findall(r'\w+', canonical(run[0])) if w not in STOP)
            for run in NAME.finditer(source)}


def name_supported(name, sources):
    words = distinctive(name)
    if not words:
        return True
    acronym = ''.join(w[0] for w in re.findall(r'\w+', canonical(name)) if w not in STOP)
    for source in sources:
        normalized = canonical(source)
        if contains(normalized, canonical(name)) or contains(normalized, words[-1]):
            return True
        if len(acronym) > 1 and contains(normalized, acronym):
            return True
        if len(canonical(name)) > 1 and canonical(name) in source_acronyms(source):
            return True
    return False


def token_supported(token, support, name_support):
    if DATE.fullmatch(token):
        month_day = re.sub(r',?\s+\d{4}$', '', canonical(token))
        return any(contains(canonical(s), month_day) for s in support)
    if NUMBER.fullmatch(token):
        return any(canonical(token) == canonical(m[0])
                   for s in support for m in NUMBER.finditer(canonical(s)))
    return name_supported(token, name_support)


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


def claim_support(claims):
    return [value for c in claims for value in
            [c['says'], c.get('by', ''), *(e['passage'] for e in c.get('evidence', []))]]


def check_block(block, page_support=(), story_year=None):
    text, claims = block['text'], block['claims']
    passages = [e['passage'] for c in claims for e in c.get('evidence', [])]
    support = passages + [c['says'] for c in claims]
    name_support = support + [c.get('by', '') for c in claims]
    if not claims:
        support = name_support = page_support
    missing = []
    for token in tokens(text):
        if re.fullmatch(r'\d{4}', token) and (token == story_year or any(contains(canonical(s), token) for s in page_support)):
            continue
        if not claims and re.fullmatch(r'[1-9]', token):
            numbered = WORD_NUMBERS.sub(number_words, normalize(text))
            uses = list(re.finditer(r'(?<!\w)' + token + r'(?!\w)', numbered))
            if uses and not any(re.match(r'\s+[A-Za-z]', numbered[m.end():]) for m in uses):
                continue
        if not token_supported(token, support, name_support):
            missing.append(token)
    issues = []
    if missing:
        issues.append({'lint': 'tokens', 'missing': missing})
    for c in claims:
        if c.get('status') not in {'said', 'alleged'}:
            continue
        by = re.sub(r"'s\b", '', normalize(c.get('by', '')).casefold())
        distinctive = [w for w in re.findall(r'\w+', by) if w not in STOP and len(w) > 2]
        named = bool(by) and (contains(canonical(text), by) or any(contains(canonical(text), w) for w in distinctive))
        colon = any(re.search(r'(?<!\w)' + re.escape(w) + r'\s*:', canonical(text)) for w in [by, *distinctive] if w)
        if not named or not (VERB.search(text) or ATTRIBUTION.search(text) or colon):
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
            if needle not in normalized:
                continue
            hit = pattern.search(normalized)
            if hit:
                at = hit.start()
                found.append(f"{rid}: {line[max(0, at - 100):at + 200].strip()}")
                break
        if len(found) == 3:
            break
    return found


def candidate_lines(text):
    lines = re.split(r'\n|(?<=[.!?])\s+', text)
    normalized = canonical('\0'.join(lines)).split('\0')
    return list(zip(lines, normalized))


def lint(story, all=False, todo=None, page=None):
    started = time.perf_counter()
    if page is None:
        page = ledger.blocks(story)
    if todo is None:
        bound = set(ledger.read_json(ledger.bound_path(story), []))
        todo = [b for b in page if ledger.bindable(b) and (all or b['hash'] not in bound)]
    page_claims = {c['id']: c for b in page for c in b['claims']}
    page_support = claim_support(page_claims.values())
    manifest = ledger.read_json(Path('checks/manifests') / f'{story}.json', {})
    story_year = str(manifest.get('date', ''))[:4]
    failures = []
    texts = None
    candidate_cache = {}
    lines = ['## Pre-bind lint', '']
    for n, block in enumerate(todo, 1):
        issues = check_block(block, page_support, story_year)
        if not issues:
            continue
        failures.append({'block': block, 'issues': issues})
        lines.extend([f"B{n}. {block['text']}", ''])
        for issue in issues:
            lines.append(f"- {issue['lint']}: " + '; '.join(issue['missing']))
            if issue['lint'] == 'tokens':
                if texts is None:
                    _, raw = ledger.record_texts(story)
                    texts = {rid: candidate_lines(text) for rid, text in raw.items()}
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
