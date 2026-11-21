#!/usr/bin/env python3
"""Replay historical Must-be-fixed lines and measure current bound-block alerts.

Run from the repository root after npm run build. Output is JSON on stdout.
History approximations: use the commit that last changed each report, ledger at
that commit, truncated block text, and only the finding's named claim. Unnamed
findings are treated as uncited. Counts are finding instances, not unique bugs.
FP means a lint alert on a currently bound hash, not an editorial adjudication.
"""
import collections
import json
from pathlib import Path
import re
import subprocess
import time

import prebind


def git(*args):
    return subprocess.run(['git', *args], check=True, capture_output=True, text=True).stdout


def main():
    totals = collections.Counter()
    caught = collections.Counter()
    by_lint = collections.defaultdict(collections.Counter)
    named_totals = collections.Counter()
    named_caught = collections.Counter()
    named_lints = collections.defaultdict(collections.Counter)
    skipped = []
    cache = {}
    pattern = re.compile(r'^- "(.*)" \((beyond|status|scope|actor)(?:, claim ([^)]+))?\):', re.M)
    for report in sorted(Path('checks/reads').glob('*-r*-bind.md')):
        content = report.read_text()
        if 'NOT BOUND' not in content or '## Must be fixed' not in content:
            continue
        story = re.sub(r'-r\d+-bind$', '', report.stem)
        section = content.split('## Must be fixed', 1)[1].split('\n## ', 1)[0]
        findings = pattern.findall(section)
        if not findings:
            continue
        commit = git('log', '-1', '--format=%H', '--', str(report)).strip()
        key = commit, story
        if key not in cache:
            result = subprocess.run(['git', 'show', f'{commit}:checks/claims/{story}.json'], capture_output=True, text=True)
            if result.returncode:
                skipped.append(str(report))
                continue
            cache[key] = {c['id']: c for c in json.loads(result.stdout)['claims']}
        for text, kind, cid in findings:
            totals[kind] += 1
            claims = [cache[key][cid]] if cid in cache[key] else []
            issues = prebind.check_block({'text': text, 'claims': claims})
            if issues:
                caught[kind] += 1
            for lint in {i['lint'] for i in issues}:
                by_lint[lint][kind] += 1
            if cid:
                named_totals[kind] += 1
                if issues:
                    named_caught[kind] += 1
                for lint in {i['lint'] for i in issues}:
                    named_lints[lint][kind] += 1
    bound_count = 0
    fps = collections.Counter()
    runtimes = {}
    for path in sorted(Path('checks/reads').glob('*-bound.json')):
        story = path.name.removesuffix('-bound.json')
        if not prebind.ledger.ledger_path(story).exists():
            continue
        started = time.perf_counter()
        bound = set(json.loads(path.read_text()))
        blocks = prebind.ledger.blocks(story)
        failures, _ = prebind.lint(story, all=True)
        runtimes[story] = round(time.perf_counter() - started, 4)
        bound_count += sum(b['hash'] in bound and prebind.ledger.bindable(b) for b in blocks)
        for failure in failures:
            if failure['block']['hash'] in bound:
                fps.update({i['lint'] for i in failure['issues']})
    print(json.dumps({
        'approximations': __doc__, 'historical_totals_by_kind': totals,
        'caught_by_kind': caught, 'caught_by_lint_and_kind': by_lint,
        'named_claim_findings': {'totals_by_kind': named_totals, 'caught_by_kind': named_caught, 'caught_by_lint_and_kind': named_lints},
        'skipped_reports_missing_historical_ledger': skipped,
        'bound_blocks': bound_count,
        'false_positives': {k: {'blocks': fps[k], 'rate': fps[k] / bound_count if bound_count else None} for k in ('tokens', 'attribution', 'quotes')},
        'runtime_seconds_per_story': runtimes, 'max_runtime_seconds': max(runtimes.values(), default=0),
    }, indent=2))


if __name__ == '__main__':
    main()
