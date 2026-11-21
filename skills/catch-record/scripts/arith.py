"""Conservative, report-only checks of explicitly stated computations."""

import calendar
import re
from datetime import date
from decimal import Decimal, ROUND_HALF_UP

NUM = r"\$?\d[\d,]*(?:\.\d+)?(?:\s+(?:million|billion|thousand))?"
MONTHS = {name.lower(): i for i in range(1, 13)
          for name in (calendar.month_name[i], calendar.month_abbr[i])}
DATE = re.compile(r"\b(?:(\d{4})-(\d{2})-(\d{2})|(" +
                  "|".join(sorted(MONTHS, key=len, reverse=True)) +
                  r")\.?\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s+(\d{4}))?)\b", re.I)
WORDS = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
WORD_NUMBERS = {word: i for i, word in enumerate(WORDS)}
for tens, word in enumerate("twenty thirty forty fifty sixty seventy eighty ninety".split(), 2):
    WORD_NUMBERS[word] = tens * 10
    for ones in range(1, 10):
        WORD_NUMBERS[f"{word} {WORDS[ones]}"] = tens * 10 + ones
WORD_PATTERN = re.compile(r"\b(" + "|".join(sorted(WORD_NUMBERS, key=len, reverse=True)).replace(" ", "[ -]") +
                          r")(?=\s+(?:days?|weeks?|months?|percent)\b)", re.I)


def normalized(text):
    text = WORD_PATTERN.sub(lambda m: str(WORD_NUMBERS[m[0].lower().replace("-", " ")]), text)
    return re.sub(r"\s+percent\b", "%", text, flags=re.I)


def nearby(claim, texts):
    chunks = []
    for evidence in claim.get("evidence", []):
        passage = " ".join(evidence.get("passage", "").split())
        if not passage:
            continue
        body = " ".join((texts or {}).get(evidence.get("record"), "").split())
        start = body.lower().find(passage.lower())
        if start >= 0:
            chunks.append(body[max(0, start - 2000):start + len(passage) + 2000])
    return " ".join(chunks)


def number(text):
    value = re.search(r"[\d,]+(?:\.\d+)?", text).group().replace(",", "")
    scale = next((n for word, n in (("billion", 10**9), ("million", 10**6),
                                   ("thousand", 1000)) if word in text.lower()), 1)
    return Decimal(value) * scale


def rounded_equal(stated, actual):
    digits = re.search(r"\d[\d,]*(?:\.(\d+))?", stated)
    places = len(digits[1] or "")
    scale = number(stated) / Decimal(digits[0].replace(",", "")) if number(stated) else 1
    return (actual / scale).quantize(Decimal(10) ** -places, rounding=ROUND_HALF_UP) == Decimal(digits[0].replace(",", ""))


def dates(text, year=None):
    out = []
    for m in DATE.finditer(text):
        y, mo, day = (int(m[1]), int(m[2]), int(m[3])) if m[1] else (int(m[6]) if m[6] else year, MONTHS[m[4].lower()], int(m[5]))
        if y is not None:
            try:
                out.append(date(y, mo, day))
            except ValueError:
                pass
    return list(dict.fromkeys(out))


def computations(claim, records=None, texts=None):
    """Return (stated, recomputation, matches) only when inputs are unambiguous.

    Record metadata supplies a publication date only for publication intervals.
    Only typed denominators near a cited passage supplement passage numbers.
    """
    says = normalized(claim.get("says", ""))
    evidence = claim.get("evidence", [])
    passages = normalized(" ".join(e.get("passage", "") for e in evidence))
    context = says + " " + passages
    out = []

    def add(stated, actual, explanation):
        out.append((stated, explanation, rounded_equal(stated, actual)))

    intervals = list(re.finditer(r"\b(\d+(?:\.\d+)?)\s+(days?|weeks?|months?)\s+(after|before|from|between|of)\b", says, re.I))
    # Separate clauses can describe separate events; two dates anywhere in the
    # claim are not sufficient to associate those events with an interval.
    if ";" in says:
        intervals = []
    if len(intervals) == 1:
        if re.search(r"\bpublication\b", says, re.I):
            for e in evidence:
                published = (records or {}).get(e.get("record"), {}).get("date", "") or ""
                context += " " + published
        explicit = dates(context)
        years = {d.year for d in explicit}
        if not years:
            years = {d.year for e in evidence for d in dates(
                (records or {}).get(e.get("record"), {}).get("date", "") or "")}
        inferred = dates(context, next(iter(years))) if len(years) == 1 else explicit
        if len(explicit) == 1 and len(inferred) == 2:
            anchor = explicit[0]
            interval = intervals[0]
            expected_days = float(interval[1]) * (7 if interval[2].lower().startswith("week") else
                                                365.2425 / 12 if interval[2].lower().startswith("month") else 1)
            inferred = [min((d.replace(year=y) for y in (anchor.year - 1, anchor.year, anchor.year + 1)
                             if not (d.month == 2 and d.day == 29 and not calendar.isleap(y))),
                            key=lambda candidate: abs(abs((candidate - anchor).days) - expected_days))
                        if d != anchor else d for d in inferred]
        ds = sorted(set(inferred))
        if len(ds) == 2:
            a, b = ds
            for m in intervals:
                days = (b - a).days
                unit = m[2].lower()
                if unit.startswith("day"):
                    actual = Decimal(days)
                elif unit.startswith("week"):
                    actual = Decimal(days) / 7
                else:
                    months = (b.year - a.year) * 12 + b.month - a.month
                    if b.day != min(a.day, calendar.monthrange(b.year, b.month)[1]):
                        continue
                    actual = Decimal(months)
                add(m[1], actual, f"{a:%b %d, %Y} → {b:%b %d, %Y} is {actual.normalize():f} {unit}")
                if re.search(r"\bwithin\s*$", says[:m.start()], re.I) and actual <= number(m[1]):
                    out[-1] = (out[-1][0], out[-1][1], True)
                out[-1] = (f'"{m[1]} {m[2]}"', out[-1][1], out[-1][2])

    # Explicit operands keep unrelated numbers in a passage out of calculations.
    sum_operands = rf"{NUM}(?:,\s*{NUM})*,?\s+and\s+{NUM}"
    patterns = [
        (rf"(?P<operands>{sum_operands}),?\s+(?:a\s+)?total\s+of\s+(?P<c>{NUM})", "sum"),
        (rf"from\s+(?P<a>{NUM})\s+to\s+(?P<b>{NUM}),?\s+(?:(?:an?\s+)?(?:increase|decrease)\s+of|up|down)\s+(?P<c>{NUM})(?![\d%]|\.\d)", "difference"),
        (rf"(?P<a>{NUM})\s+of\s+(?P<b>{NUM}),?\s+or\s+(?P<c>\d+(?:\.\d+)?)%", "share"),
        (rf"(?P<a>{NUM})\s+[a-z]+\s+of\s+(?P<b>{NUM})\s+[a-z]+\s+\((?P<c>\d+(?:\.\d+)?)%\)", "share"),
        (rf"(?P<direction>up|down)\s+(?P<c>\d+(?:\.\d+)?)%\s+from\s+(?P<a>{NUM})\s+to\s+(?P<b>{NUM})", "change"),
        (rf"(?P<a>{NUM})(?:,|\s+is)\s+(?P<c>\d+(?:\.\d+)?)%\s+of\s+(?P<b>{NUM})", "share"),
    ]
    for pattern, kind in patterns:
        for m in re.finditer(pattern, says, re.I):
            if kind == "sum":
                operands = [number(p[0]) for p in re.finditer(NUM, m["operands"], re.I)]
                add(m["c"], sum(operands), f"{' + '.join(map(str, operands))} = {sum(operands)}")
                out[-1] = (f'"{m["c"]}"', out[-1][1], out[-1][2])
                continue
            a, b = number(m["a"]), number(m["b"])
            if kind in {"share", "change"} and not (b if kind == "share" else a):
                continue
            if kind == "difference":
                actual, formula = abs(b - a), f"|{b} - {a}|"
            elif kind == "share":
                actual, formula = a / b * 100, f"{a} / {b} × 100"
            else:
                sign = -1 if m["direction"].lower() == "down" else 1
                actual, formula = (b - a) / a * 100 * sign, f"({b} - {a}) / {a} × {100 * sign}"
            suffix = "%" if kind in {"share", "change"} else ""
            add(m["c"], actual, f"{formula} = {actual:.8f}".rstrip("0").rstrip(".") + suffix)
            out[-1] = (f'"{m["c"]}{suffix}"', out[-1][1], out[-1][2])
    ratios = list(re.finditer(rf"(?P<a>\${NUM})\s+of\s+(?P<b>\${NUM})", says, re.I))
    per_hundred = list(re.finditer(r"\b(\d+(?:\.\d+)?) of every 100\b", says, re.I))
    if len(ratios) == len(per_hundred) == 1:
        a, b = number(ratios[0]["a"]), number(ratios[0]["b"])
        if b:
            add(per_hundred[0][1], a / b * 100, f"{a} / {b} × 100 = {a / b * 100:.4f}%")
            out[-1] = (f'"{per_hundred[0][1]} of every 100"', out[-1][1], out[-1][2])
    # A typed denominator and matching year avoid borrowing an adjacent subtotal.
    for m in re.finditer(rf"(?P<a>{NUM}) applications, (?P<c>\d+(?:\.\d+)?)% of those it reviewed, in (?P<year>\d{{4}})", says, re.I):
        denominators = {number(d[1]) for d in re.finditer(
            rf"In {m['year']}, [A-Za-z][A-Za-z ]{{0,60}} reviewed ({NUM}) license applications\b",
            nearby(claim, texts), re.I)}
        if len(denominators) == 1 and number(m["a"]) in {number(n[0]) for n in re.finditer(NUM, passages)}:
            denominator = denominators.pop()
            if denominator:
                actual = number(m["a"]) / denominator * 100
                add(m["c"], actual, f"{m['a']} / {denominator} reviewed applications = {actual:.4f}%")
                out[-1] = (f'"{m["c"]}%"', out[-1][1], out[-1][2])
    completion = re.search(r"\b(poll|survey|study) completed (.+?)(?:,|\.|;|$)", says, re.I)
    if completion:
        weekdays = re.findall(r"\b(?:poll|survey|study),? completed on (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b", passages, re.I)
        published = {d for e in evidence for d in dates((records or {}).get(e.get("record"), {}).get("date", "") or "")}
        if len(set(w.lower() for w in weekdays)) == 1 and len(published) == 1:
            publication = published.pop()
            # Read the original date token: abbreviations include a period.
            completion_dates = dates(says[completion.start():], publication.year)
            if len(completion_dates) == 1:
                day = completion_dates[0]
                weekday = list(calendar.day_name).index(weekdays[0].capitalize())
                if 0 <= (publication - day).days <= 7:
                    expected = date.fromordinal(publication.toordinal() - (publication.weekday() - weekday) % 7)
                    out.append((f'"completed {day.isoformat()}"', f"cited {weekdays[0]} before {publication} is {expected}", day == expected))
    if not out:
        operand_lists = {tuple(number(p[0]) for p in re.finditer(NUM, m[0], re.I))
                         for m in re.finditer(sum_operands, passages, re.I)}
        totals = list(re.finditer(rf"(?:a\s+)?total\s+of\s+({NUM})", says, re.I))
        if len(operand_lists) == len(totals) == 1:
            operands = operand_lists.pop()
            add(totals[0][1], sum(operands), f"{' + '.join(map(str, operands))} = {sum(operands)}")
        for operand_pattern, result_pattern, operation, symbol in [
            (rf"from\s+({NUM})\s+to\s+({NUM})", rf"(?:increase|decrease)\s+of\s+({NUM})(?![\d%]|\.\d)", lambda a, b: abs(b - a), "difference"),
        ]:
            pairs = {(number(p[1]), number(p[2])) for p in re.finditer(operand_pattern, passages, re.I)}
            results = list(re.finditer(result_pattern, says, re.I))
            if len(pairs) == 1 and len(results) == 1:
                a, b = pairs.pop()
                actual = operation(a, b)
                add(results[0][1], actual, f"{a} {symbol} {b} = {actual}")
    for m in re.finditer(rf"(?P<c>\d+(?:\.\d+)?)%\s+of\s+(?P<b>{NUM})", says, re.I):
        if any(stated == f'"{m["c"]}%"' for stated, _, _ in out):
            continue
        base = number(m["b"])
        parts = {number(p["a"]) for p in re.finditer(
            rf"(?P<a>{NUM})\s+(?:of|out of)\s+(?P<b>{NUM})", passages, re.I)
                 if number(p["b"]) == base}
        if base and len(parts) == 1:
            part = parts.pop()
            add(m["c"], part / base * 100, f"{part} / {base} × 100 = {part / base * 100:.8f}%")
            out[-1] = (f'"{m["c"]}%"', out[-1][1], out[-1][2])
    return out


def report(ledger, records, texts):
    total = mismatches = 0
    claims = ledger.get("claims", [])
    for claim in claims:
        for stated, result, matches in computations(claim, records, texts):
            total += 1
            if not matches:
                mismatches += 1
                print(f'MISMATCH claim {claim["id"]}: says {stated} but {result}')
                print(f'  says: {claim["says"]}')
    print(f"{len(claims)} claims checked, {total} computations recomputed, {mismatches} mismatches")
    return mismatches
