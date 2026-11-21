#!/usr/bin/env python3
"""Replay `claims.py lint` against past check rounds: python3 -I scripts/claims-lint-replay.py [-v]

For each past claims report (checks/records/*-claims-r*.md) and bind report (checks/reads/*-bind.md), lint the
ledger as it stood when the report was committed and count the report's short-form findings the lint flags.
False positives: short forms the lint flags on claims that later held (checks/reads/<story>-claims-held.json).
"""
import glob
import importlib.util
import json
import os
import re
import subprocess
import sys

sys.path.insert(0, "skills/catch-record/scripts")
spec = importlib.util.spec_from_file_location("claims", "skills/catch-record/scripts/claims.py")
C = importlib.util.module_from_spec(spec)
spec.loader.exec_module(C)
VERBOSE = "-v" in sys.argv


def git(*a):
    r = subprocess.run(["git", *a], capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


_common = {}


def common(story):
    if story not in _common:
        try:
            _common[story] = C.lowercase_words(C.record_texts(story)[1].values())
        except (OSError, KeyError, ValueError):
            _common[story] = frozenset()
    return _common[story]


def ledger_then(report, story):
    added = (git("log", "--diff-filter=A", "--format=%H", "--", report) or "").split()
    if not added:
        return None
    led = git("show", f"{added[-1]}^:checks/claims/{story}.json") or git("show", f"{added[-1]}:checks/claims/{story}.json")
    return {c.get("id"): c for c in json.loads(led).get("claims", [])} if led else None


def flagged(story, by_id):
    return {i for i, c in by_id.items() if (c.get("short") or "").strip()
            and C.short_drift(c["short"], c.get("says", ""), common(story))}


# Claims reports: a finding is a short-form finding when its section names a claim and faults its short form.
CLEARED = re.compile(r"short forms? (also )?(holds?|is (also )?(accurate|supported|faithful|fine)|does not independently|"
                     r"carr(y|ies) no)|both short forms hold|short forms? .{0,40}(hold|are supported)", re.I)
reports = fails = found = caught = 0
for f in sorted(glob.glob("checks/records/*-claims-r*.md")):
    story = re.sub(r"-claims-r\d+\.md$", "", os.path.basename(f))
    text = open(f).read()
    lines = [l for l in text.splitlines() if l.strip()]
    by_id = ledger_then(f, story)
    if not lines or by_id is None:
        continue
    reports += 1
    if lines[-1].strip("*` ") != "CLAIMS DO NOT HOLD":
        continue
    fails += 1
    flags = flagged(story, by_id)
    ids = set()
    for section in re.split(r"\n(?=\s*(?:#+\s*)?\**\s*C\d+\b)", text):
        if not re.search(r"short form", section, re.I):
            continue
        if all(CLEARED.search(m.group(0) + section[m.end():m.end() + 80]) for m in re.finditer(r"short forms?", section, re.I)):
            continue
        named = [i for i in re.findall(r"\[([a-z0-9]+(?:-[a-z0-9]+)+)\]", section) if i in by_id]
        if named:
            ids.add(named[0])
    found += len(ids)
    caught += len(ids & flags)
    if VERBOSE:
        for i in sorted(ids):
            print("claims", "CAUGHT" if i in flags else "missed", f, i)
print(f"claims reports: {reports}, failing: {fails}; short-form findings in failing reports: {found}, "
      f"flagged by the lint: {caught}")

# Bind reports: a finding is about a short form when its quoted block holds a cited claim's short form.
reports = fails = found = caught = 0
for f in sorted(glob.glob("checks/reads/*-bind.md")):
    story = re.sub(r"-r\d+-bind\.md$", "", os.path.basename(f))
    text = open(f).read()
    by_id = ledger_then(f, story)
    if by_id is None:
        continue
    reports += 1
    if [l for l in text.splitlines() if l.strip()][-1].strip("*` ") != "NOT BOUND" or "## Must be fixed" not in text:
        continue
    fails += 1
    flags = flagged(story, by_id)
    shorts = {i: c["short"].strip() for i, c in by_id.items() if len((c.get("short") or "").strip()) > 8}
    for line in text.split("## Must be fixed", 1)[1].splitlines():
        m = re.match(r'- "(.*?)" \(', line)
        if not m:
            continue
        block = m.group(1)
        hit = [i for i, s in shorts.items() if s in block or (len(block) > 110 and block.startswith(s[:110]))]
        cited = [i for i in hit if f"claim {i}" in line] or hit
        if not cited:
            continue
        found += 1
        caught += bool(set(cited) & flags)
        if VERBOSE:
            print("bind", "CAUGHT" if set(cited) & flags else "missed", f, cited[0])
print(f"bind reports: {reports}, NOT BOUND: {fails}; findings on a block holding a short form: {found}, "
      f"flagged by the lint: {caught}")

held = flags = 0
for f in sorted(glob.glob("checks/claims/*.json")):
    story = os.path.basename(f)[:-5]
    passed = C.read_json(C.held_path(story), {})
    for c in json.load(open(f))["claims"]:
        if (c.get("short") or "").strip() and passed.get(c["id"]) == C.claim_hash(c):
            held += 1
            if C.short_drift(c["short"], c.get("says", ""), common(story)):
                flags += 1
                if VERBOSE:
                    print("held", "FLAGGED", story, c["id"], "|", c["short"])
print(f"short forms on claims that held: {held}, flagged by the lint: {flags} ({flags / max(held, 1):.1%})")
