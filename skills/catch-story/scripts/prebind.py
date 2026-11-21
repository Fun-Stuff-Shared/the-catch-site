#!/usr/bin/env python3
"""Fast advisory checks, never a binding decision.

Usage: prebind.py <story> [--strict] [--all] [--lint all]
Only quotes are checked by default. --lint all adds token and attribution checks.
By default checks exactly bind's changed, bindable blocks; --all checks all bindable
blocks. --strict exits 1 on findings. Missing inputs are errors, not clean results.
Quotes: extract curly or straight double quotes (not single quotes). Map curly
double/single quotes and apostrophes to straight, collapse whitespace and trim.
Match case-sensitive exact substrings of cited passages or quoted text in says.
Ellipses (… or ...) split a quote into segments which must match in order within
one source. Numbers ignore thousands commas and insignificant decimal zeroes;
percent, money scale and currency ($, €, £, ¥; USD/EUR equal $/€) remain
significant, and a numeric match must cover the whole number. Scaled amounts
equal their expanded values (12 million = 12000000), never their unscaled values.
Numeric/spelled ordinals equal cardinals. Claim scope is also token support.
Dates accept ISO and day-month forms as well as month-day forms.
Spelled cardinal numbers through
ninety, hundred and thousand (including compounds) equal digits. Join "and"
only after hundred or thousand, not between independent numbers. Dates accept
full/abbreviated months and require month plus day, with year optional; their
components are not checked separately. Weekdays are not names. Names are whole
capitalized runs, skipping sentence-initial runs and title-only runs. A name is
supported by its full run, acronym (in either direction), or last distinctive
word, including cited claims' by fields. US, U.S. and United States are equivalent
(case-sensitive before casefolding); the lowercase pronoun "us" is not.
Masked dates and numbers break name runs rather than joining adjacent names.
No metadata blocks are skipped without structural information.
Uncited blocks use says, passages and by from every claim cited on the page for
token support, but not quote support. Bare years can also use page-wide support
or the manifest date's year, even in cited blocks. In uncited blocks only, bare
integers 1-9 are skipped unless immediately followed by a word (a conservative
proxy for a unit or noun of measure). Cited blocks still check those integers.
Attribution accepts a named speaker followed directly by a colon, reporting
verbs, by-speaker count/estimate phrases, and statement/post phrases.
A named source labeling an exact supported quotation also counts as attribution.
Common nationality/party adjective variants are matched to their cited noun forms.
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
STOP = set('the a an this that these those it its he she they we i in on at by for from to of and or but as what why how when where who which after before just according alleged verdict said all partly supported industry'.split())
MONTHS = 'January February March April May June July August September October November December'.split()
MONTH = '(?:' + '|'.join(m + '|' + m[:3] + r'\.?' for m in MONTHS) + r'|Sept\.?)'
MONTH_ABBREVIATIONS = {m[:3].lower(): m.lower() for m in MONTHS}
MONTH_ABBREVIATIONS['sept'] = 'september'
MONTH_ABBREVIATION = re.compile(r'\b(?:' + '|'.join(MONTH_ABBREVIATIONS) + r')(?:\.|\b)')
NUMBER = re.compile(r'(?<![\w.])(?:[$€£¥]\s*|(?:USD|EUR)\s*)?\d+(?:,\d{3})*(?:\.\d+)?(?:st\b|nd\b|rd\b|th\b)?(?:\s*(?:%|percent\b|million\b|billion\b|trillion\b))?', re.I)
DATE = re.compile(r'\b(?:' + MONTH + r'\s+\d{1,2}(?:st|nd|rd|th)?(?:,?\s+\d{4})?|\d{1,2}(?:st|nd|rd|th)?\s+' + MONTH + r'(?:\s+\d{4})?|\d{4}-\d{2}-\d{2})\b', re.I)
NAME_WORD = r"(?:U\.S\.|[A-Z][a-zA-Z0-9]*(?:[-'][A-Za-z0-9]+)*)"
NAME = re.compile(r'\b' + NAME_WORD + r'(?:\s+' + NAME_WORD + r')*')
TITLES = set('secretary administrator senator senators sen sens rep representative representatives president vice department agency minister ministry director acting deputy chief former governor general transportation federal administration national the'.split())
WEEKDAYS = set('monday tuesday wednesday thursday friday saturday sunday'.split())
SMALL = dict(zip('zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'.split(), range(21)))
SMALL.update(dict(zip('thirty forty fifty sixty seventy eighty ninety'.split(), range(30, 100, 10))))
NUMBER_WORD = r'(?:' + '|'.join([*SMALL, 'hundred', 'thousand']) + r')'
WORD_NUMBERS = re.compile(r'\b' + NUMBER_WORD + r'(?:(?:[ -]+|(?:(?<=hundred)|(?<=thousand))\s+and\s+)' + NUMBER_WORD + r')*\b', re.I)
LOWER_WORD_NUMBERS = re.compile(WORD_NUMBERS.pattern)
VERB = re.compile(r'\b(?:said|says?|told|according to|alleged|alleges|accused|claims?|claimed|stated|states|wrote|writes|argued|argues|announced|testified|warned|warns)\b', re.I)
ATTRIBUTION = re.compile(r"\b(?:blamed|acknowledged|tied|posted|posting|called|insisted|denied|contended|asserted|noted|added|described|cited|reported|estimated|counted|in a statement|in a post)\b|\bby\s+[^.!?:]+?['’]s\s+(?:count|estimate)\b", re.I)
REPORTING = re.compile(r'\b(?:blames?|acknowledges?|calls?|reports?|estimates?|counts?|asks?|asked|urged|urges|credits?|credited|promised|promises|testifies|warns|warned|praised|praises|quoted|quoting|argues|describes|described|announces|announced|concludes|concluded|found|finds|by [^.!?]+ account)\b', re.I)
DEMONYMS = {'chinese': 'china', 'iranian': 'iran', 'american': 'unitedstates', 'republicans': 'republican', 'democrats': 'democrat', 'democratic': 'democrat'}
ORDINALS = dict(zip('first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth'.split(), range(1, 21)))
ORDINAL = re.compile(r'\b(?:' + '|'.join(ORDINALS) + r')\b', re.I)
LOWER_ORDINAL = re.compile(ORDINAL.pattern)


def normalize(text):
    return ' '.join(text.translate(QUOTES).split())


def number_words(match):
    total = current = 0
    previous = None
    separate = []
    for word in re.findall(r'[a-z]+', match[0].lower()):
        if word == 'hundred':
            current = (current or 1) * 100
            previous = None
        elif word == 'thousand':
            total += (current or 1) * 1000
            current = 0
            previous = None
        elif word != 'and':
            value = SMALL[word]
            if previous is not None and not (previous >= 20 and previous % 10 == 0 and value < 10):
                separate.append(str(total + current))
                total = current = 0
            current += value
            previous = value
    return ' '.join([*separate, str(total + current)])


def ordinal_words(match):
    if match[0].lower() == 'second' and re.search(r'(?:\d|per|each|a)\s+$', match.string[max(0, match.start() - 32):match.start()], re.I):
        return match[0]
    return str(ORDINALS[match[0].lower()])


@lru_cache(maxsize=16384)
def canonical(text):
    text = re.sub(r'(?<!\w)(?:United States|U\.S\.|US)(?!\w)', 'unitedstates', normalize(text)).casefold()
    text = re.sub(r'\b(usd|eur)\s*(?=\d)', lambda m: '$' if m[1] == 'usd' else '€', text)
    text = re.sub(r'([$€£¥])\s+(?=\d)', r'\1', text)
    text = LOWER_WORD_NUMBERS.sub(number_words, text)
    text = LOWER_ORDINAL.sub(ordinal_words, text)
    text = re.sub(r'(?<=\d)(?:st|nd|rd|th)\b', '', text)
    text = MONTH_ABBREVIATION.sub(lambda m: MONTH_ABBREVIATIONS[m[0].rstrip('.')], text)
    text = re.sub(r"'s\b", '', text)
    text = re.sub(r'(?<=\d),(?=\d)', '', text)
    text = re.sub(r'\d+(?:\.\d+)?', lambda m: format(Decimal(m[0]).normalize(), 'f'), text)
    return re.sub(r'\s*(%|\bpercent\b)', '%', text)


@lru_cache(maxsize=8192)
def numeric_values(text):
    values = set()
    for match in NUMBER.finditer(canonical(text)):
        amount = re.fullmatch(r'([$€£¥]?)(\d+(?:\.\d+)?)(?:\s*(%|million|billion|trillion))?', match[0])
        if amount:
            currency, number, scale = amount.groups()
            multiplier = {'million': 10**6, 'billion': 10**9, 'trillion': 10**12}.get(scale, 1)
            values.add((currency, Decimal(number) * multiplier, scale == '%'))
    return values


@lru_cache(maxsize=8192)
def date_values(text):
    values = set()
    for match in DATE.finditer(text):
        value = canonical(match[0])
        iso = re.fullmatch(r'\d{4}-(\d{1,2})-(\d{1,2})', value)
        if iso:
            values.add((int(iso[1]), int(iso[2])))
            continue
        month = next((i for i, name in enumerate(MONTHS, 1) if name.lower() in value), None)
        numbers = re.findall(r'\d+', value)
        if month and numbers:
            values.add((month, int(numbers[0])))
    return values


def contains(text, token):
    return re.search(r'(?<!\w)' + re.escape(token) + r'(?!\w)', text) is not None


def tokens(text):
    text = WORD_NUMBERS.sub(number_words, normalize(text))
    text = ORDINAL.sub(ordinal_words, text)
    dates = list(DATE.finditer(text))
    masked = list(text)
    for date in dates:
        masked[date.start():date.end()] = '\0' * len(date[0])
    masked = ''.join(masked)
    out = [m[0] for m in NUMBER.finditer(masked)] + [m[0] for m in dates]
    masked = NUMBER.sub(lambda m: '\0' * len(m[0]), masked)
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
        if len(words) == 1 and words[0] in DEMONYMS and contains(normalized, DEMONYMS[words[0]]):
            return True
        if contains(normalized, canonical(name)) or contains(normalized, words[-1]):
            return True
        if len(acronym) > 1 and contains(normalized, acronym):
            return True
        if len(canonical(name)) > 1 and canonical(name) in source_acronyms(source):
            return True
    return False


def token_supported(token, support, name_support):
    if DATE.fullmatch(token):
        return any(bool(date_values(token) & date_values(s)) for s in support)
    if NUMBER.fullmatch(token):
        return any(bool(numeric_values(token) & numeric_values(s)) for s in support)
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
            [c['says'], c.get('by', ''), c.get('scope', ''), *(e['passage'] for e in c.get('evidence', []))]]


def check_all(block, page_support=(), story_year=None):
    text, claims = block['text'], block['claims']
    passages = [e['passage'] for c in claims for e in c.get('evidence', [])]
    support = passages + [value for c in claims for value in (c['says'], c.get('scope', ''))]
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
        by = canonical(c.get('by', ''))
        distinctive = [w for w in re.findall(r'\w+', by) if w not in STOP and len(w) > 2]
        named = bool(by) and (contains(canonical(text), by) or any(contains(canonical(text), w) for w in distinctive))
        colon = any(re.search(r'(?<!\w)' + re.escape(w) + r'\s*:', canonical(text)) for w in [by, *distinctive] if w)
        labeled_quote = named and bool(quoted(text)) and bool(quote_matches(quoted(text)[0], [normalize(e['passage']) for e in c.get('evidence', [])] + quoted(c['says'])))
        if not named or not (VERB.search(canonical(text)) or ATTRIBUTION.search(text) or REPORTING.search(text) or colon or labeled_quote):
            issues.append({'lint': 'attribution', 'claim': c['id'], 'missing': [f"name {c.get('by', '')!r} and an attribution verb"]})
    sources = [normalize(p) for p in passages] + [q for c in claims for q in quoted(c['says'])]
    bad_quotes = [q for q in quoted(text) if not quote_matches(q, sources)]
    if bad_quotes:
        issues.append({'lint': 'quotes', 'missing': bad_quotes})
    return issues


def check_block(block, page_support=(), story_year=None, mode='quotes'):
    if mode == 'all':
        return check_all(block, page_support, story_year)
    claims = block['claims']
    sources = [normalize(e['passage']) for c in claims for e in c.get('evidence', [])]
    sources += [q for c in claims for q in quoted(c['says'])]
    missing = [q for q in quoted(block['text']) if not quote_matches(q, sources)]
    return [{'lint': 'quotes', 'missing': missing}] if missing else []


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


def lint(story, all=False, todo=None, page=None, mode='quotes'):
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
    lines = ['## Pre-bind lint', '', 'Likely to fail bind (advisory, not errors):', '']
    for n, block in enumerate(todo, 1):
        issues = check_block(block, page_support, story_year, mode=mode)
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
    lines.append(f"{len(todo)} blocks checked; {len(failures)} likely to fail bind; {time.perf_counter() - started:.3f}s. Advisory only; no blocks recorded as bound.")
    return failures, '\n'.join(lines)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('story')
    parser.add_argument('--strict', action='store_true')
    parser.add_argument('--all', action='store_true')
    parser.add_argument('--lint', choices=('quotes', 'all'), default='quotes')
    args = parser.parse_args()
    failures, report = lint(args.story, all=args.all, mode=args.lint)
    print(report)
    sys.exit(1 if args.strict and failures else 0)
