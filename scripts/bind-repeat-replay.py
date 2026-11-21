#!/usr/bin/env python3
"""Estimate repeat links from committed report prefixes, not full page text.

The baseline calls an earlier flagged block repeated if a later flagged prefix
in that story is identical or has SequenceMatcher ratio >= 0.5. This is a
textual estimate, not a judgment that the same editorial problem persisted.
Reports omit cited claim sets and unflagged page blocks, so the replay uses
finding claim ids as a proxy and cannot enforce the full current-page exclusion.
"""
import re
import subprocess
import sys
from collections import defaultdict
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'skills/catch-story/scripts'))
from bind import REPEAT_THRESHOLD, match_previous


def main():
    stories = defaultdict(list)
    paths = subprocess.check_output(['git', 'ls-files', 'checks/reads/*-r*-bind.md'], text=True).splitlines()
    for name in paths:
        m = re.fullmatch(r'(.+)-r(\d+)-bind.md', name)
        if not m:
            continue
        blocks = {}
        for line in Path(name).read_text().split('## Previously flagged')[0].splitlines():
            f = re.match(r'^- "(.*)" \((beyond|status|scope|actor)(?:, claim ([^)]+))?\): (.*)', line)
            if not f:
                continue
            text, kind, claim, problem = f.groups()
            entry = blocks.setdefault(text, {'text': text, 'claims': set(), 'findings': [], 'round': m[2]})
            if claim:
                entry['claims'].add(claim)
            entry['findings'].append({'kind': kind, 'claim': claim, 'problem': problem})
        stories[m[1]].append((int(m[2]), blocks))
    total = repeated = linked = 0
    for rounds in stories.values():
        history = []
        linked_keys = set()
        baseline_keys = set()
        for round_, entries in sorted(rounds):
            blocks = [{'hash': f'{round_}:{i}', 'text': text,
                       'claims': [{'id': c} for c in sorted(entry['claims'])]}
                      for i, (text, entry) in enumerate(entries.items())]
            previous = dict(history)
            matches = match_previous(blocks, previous, {b['hash'] for b in blocks})
            linked_keys.update(matches.values())
            for key, old in history:
                if any(SequenceMatcher(None, old['text'], b['text']).ratio() >= 0.5 for b in blocks):
                    baseline_keys.add(key)
            history.extend((b['hash'], entries[b['text']]) for b in blocks)
        total += len(history)
        repeated += len(baseline_keys)
        linked += len(baseline_keys & linked_keys)
    print(f'Committed reports: {len(paths)}; stories: {len(stories)}')
    print(f'Flagged block-rounds (deduplicated within report): {total}')
    print(f'Estimated flagged again later (prefix similarity >= 0.5): {repeated}')
    print(f'Linked by one-to-one matcher (threshold {REPEAT_THRESHOLD}): {linked}/{repeated}')
    print('Estimate only: prefixes and finding claim ids cannot reconstruct full blocks or cited claim sets.')


if __name__ == '__main__':
    main()
