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
        publication_dates = set()
        if re.search(r"\bpublication\b", says, re.I):
            for e in evidence:
                published = (records or {}).get(e.get("record"), {}).get("date", "") or ""
                context += " " + published
                publication_dates.update(dates(published))

        def reference_date(choices, interval):
            reference = re.sub(r"^\s*(?:(?:the|a|an|scheduled|proposed|original|revised|expected|final|effective)\s+)*",
                               "", context[interval.end():], flags=re.I)
            if re.match(r"publication\b", reference, re.I):
                return next(iter(publication_dates)) if len(publication_dates) == 1 else None
            token = DATE.match(reference)
            if token is None:
                return None
            parsed = dates(token[0], choices[0].year)
            candidates = [d for d in choices if parsed and (d.month, d.day) == (parsed[0].month, parsed[0].day)
                          and (not (token[1] or token[6]) or d.year == parsed[0].year)]
            return candidates[0] if len(candidates) == 1 else None
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
            if re.search(r"\bwithin\s*$", says[:interval.start()], re.I):
                expected_days = 0
            variants = []
            for year in (anchor.year - 1, anchor.year, anchor.year + 1):
                try:
                    choices = [d.replace(year=year) if d != anchor else d for d in inferred]
                except ValueError:
                    continue
                direction = interval[3].lower()
                reference = reference_date(choices, interval)
                if direction in {"before", "after"} and reference is not None:
                    event = next((d for d in choices if d != reference), reference)
                    if (event > reference) != (direction == "after"):
                        continue
                variants.append(choices)
            inferred = min(variants, key=lambda pair: abs(abs((pair[1] - pair[0]).days) - expected_days)) if variants else []
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
                if m[3].lower() in {"before", "after"}:
                    reference = reference_date(ds, m)
                    if reference is None:
                        out.pop()
                        continue
                    event = b if reference == a else a
                    if (event > reference) != (m[3].lower() == "after"):
                        out[-1] = (out[-1][0], out[-1][1] + f"; {event} is not {m[3]} {reference}", False)
                out[-1] = (f'"{m[1]} {m[2]}"', out[-1][1], out[-1][2])

    # Explicit operands keep unrelated numbers in a passage out of calculations.
    sum_operands = rf"{NUM}(?:,\s*{NUM})*,?\s+and\s+{NUM}"

    def sum_inputs(match, source, total):
        operands = []
        date_spans = [d.span() for d in DATE.finditer(source)]
        for token in re.finditer(NUM, match["operands"], re.I):
            start = match.start("operands") + token.start()
            if any(a <= start < b for a, b in date_spans):
                continue
            if re.fullmatch(r"\d{4},?", token[0]) and re.search(r"\b(?:in|during|since|for|year)\s*$", source[:start], re.I):
                continue
            if token[0].startswith("$") != total.startswith("$"):
                return None
            operands.append(number(token[0]))
        return tuple(operands) if len(operands) >= 2 else None

    patterns = [
        (rf"(?P<operands>{sum_operands}),?\s+(?:a\s+)?total\s+of\s+(?P<c>{NUM})", "sum"),
        (rf"from\s+(?P<a>{NUM})\s+to\s+(?P<b>{NUM}),?\s+(?:an?\s+)?(?P<direction>increase\s+of|decrease\s+of|up|down)\s+(?P<c>{NUM})(?![\d%]|\.\d)", "difference"),
        (rf"(?P<a>{NUM})\s+of\s+(?P<b>{NUM}),?\s+or\s+(?P<c>\d+(?:\.\d+)?)%", "share"),
        (rf"(?P<a>{NUM})\s+[a-z]+\s+of\s+(?P<b>{NUM})\s+[a-z]+\s+\((?P<c>\d+(?:\.\d+)?)%\)", "share"),
        (rf"(?P<direction>up|down)\s+(?P<c>\d+(?:\.\d+)?)%\s+from\s+(?P<a>{NUM})\s+to\s+(?P<b>{NUM})", "change"),
        (rf"(?P<a>{NUM})(?:,|\s+is)\s+(?P<c>\d+(?:\.\d+)?)%\s+of\s+(?P<b>{NUM})", "share"),
    ]
    for pattern, kind in patterns:
        for m in re.finditer(pattern, says, re.I):
            if kind == "sum":
                operands = sum_inputs(m, says, m["c"])
                if operands is None:
                    continue
                add(m["c"], sum(operands), f"{' + '.join(map(str, operands))} = {sum(operands)}")
                out[-1] = (f'"{m["c"]}"', out[-1][1], out[-1][2])
                continue
            a, b = number(m["a"]), number(m["b"])
            if kind in {"share", "change"} and not (b if kind == "share" else a):
                continue
            if kind == "difference":
                sign = -1 if m["direction"].lower().startswith(("decrease", "down")) else 1
                actual, formula = (b - a) * sign, f"({b} - {a}) × {sign}"
            elif kind == "share":
                actual, formula = a / b * 100, f"{a} / {b} × 100"
            else:
                sign = -1 if m["direction"].lower() == "down" else 1
                actual, formula = (b - a) / a * 100 * sign, f"({b} - {a}) / {a} × {100 * sign}"
            suffix = "%" if kind in {"share", "change"} else ""
            add(m["c"], actual, f"{formula} = {actual:.8f}".rstrip("0").rstrip(".") + suffix)
            if kind == "difference" and actual <= 0:
                out[-1] = (out[-1][0], out[-1][1] + "; direction does not match", False)
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
        totals = list(re.finditer(rf"(?:a\s+)?total\s+of\s+({NUM})", says, re.I))
        operand_lists = {operands for m in re.finditer(rf"(?P<operands>{sum_operands})", passages, re.I)
                         if len(totals) == 1 and (operands := sum_inputs(m, passages, totals[0][1])) is not None}
        if len(operand_lists) == len(totals) == 1:
            operands = operand_lists.pop()
            add(totals[0][1], sum(operands), f"{' + '.join(map(str, operands))} = {sum(operands)}")
        for operand_pattern, result_pattern, operation, symbol in [
            (rf"from\s+({NUM})\s+to\s+({NUM})", rf"(?:increase|decrease)\s+of\s+({NUM})(?![\d%]|\.\d)", lambda a, b: b - a, "difference"),
        ]:
            pairs = {(number(p[1]), number(p[2])) for p in re.finditer(operand_pattern, passages, re.I)}
            results = list(re.finditer(result_pattern, says, re.I))
            if len(pairs) == 1 and len(results) == 1:
                a, b = pairs.pop()
                actual = operation(a, b)
                if results[0][0].lower().startswith("decrease"):
                    actual = -actual
                add(results[0][1], actual, f"{a} {symbol} {b} = {actual}")
                if actual <= 0:
                    out[-1] = (out[-1][0], out[-1][1] + "; direction does not match", False)
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
