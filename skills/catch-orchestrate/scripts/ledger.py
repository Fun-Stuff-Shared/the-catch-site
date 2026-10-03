#!/usr/bin/env python3
"""Clock of a story run, read from the started and finished markers in its dispatch directory.

Usage: ledger.py <dispatch dir> [more dispatch dirs] [--json]
Each step a run launches writes <name>.started and <name>.finished (UTC); a failed attempt keeps
its own markers (.started.dead-<time>, .finished.dead-<time>) and its own row; an attempt killed
with no end time has no minutes. The ledger lists the
steps in order with their minutes, the patch rounds, the time no step was running, and the
wall clock from CLOCK.txt to the last finished step."""
import json
import re
import sys
from datetime import datetime
from pathlib import Path


def stamp(path):
    return datetime.strptime(path.read_text().strip(), '%Y-%m-%dT%H:%M:%SZ')


def steps(directory):
    rows = []
    for started in sorted(directory.rglob('*.started')):
        finished = started.with_suffix('.finished')
        name = re.sub(r'^.*--\d{4}-\d{2}-\d{2}-[a-z0-9-]*?-(?=(record|structure|story|audit|entail|patch|editor|red|stranger|referent|reads))', '', started.stem)
        lane = '' if started.parent == directory else started.parent.name + '/'
        begin = stamp(started)
        failed = started.with_suffix('.failed')
        end = stamp(finished) if finished.exists() else stamp(failed) if failed.exists() else None
        if failed.exists() and not finished.exists():
            name += ' (failed)'
        rows.append({'step': lane + name, 'started': begin, 'finished': end,
                     'minutes': round((end - begin).total_seconds() / 60, 1) if end else None})
    for dead in directory.rglob('*.started.dead-*'):
        ended = dead.with_name(dead.name.replace('.started.dead-', '.finished.dead-'))
        begin = stamp(dead)
        end = stamp(ended) if ended.exists() else None
        rows.append({'step': dead.name.split('.started.dead-')[0][-40:] + ' (failed attempt)',
                     'started': begin, 'finished': end,
                     'minutes': round((end - begin).total_seconds() / 60, 1) if end else None})
    return sorted(rows, key=lambda row: row['started'])


def ledger(directory):
    rows = steps(directory)
    clock = stamp(directory / 'CLOCK.txt') if (directory / 'CLOCK.txt').exists() else (rows[0]['started'] if rows else None)
    done = [row for row in rows if row['finished']]
    last = max((row['finished'] for row in done), default=None)
    busy, cursor = 0.0, clock
    for row in sorted(done, key=lambda row: row['started']):
        begin = max(row['started'], cursor)
        if row['finished'] > begin:
            busy += (row['finished'] - begin).total_seconds() / 60
            cursor = row['finished']
    wall = (last - clock).total_seconds() / 60 if last and clock else None
    return {'run': directory.name, 'clock': clock, 'last_finished': last, 'steps': rows,
            'patch_rounds': len({re.search(r'patch(\d+)', row['step']).group(1) for row in rows if re.search(r'patch(\d+)', row['step'])}),
            'running': [row['step'] for row in rows if not row['finished'] and 'failed attempt' not in row['step']],
            'stopped': (directory / 'STOP').read_text().strip() if (directory / 'STOP').exists() else None,
            'wall_minutes': round(wall, 1) if wall is not None else None,
            'step_minutes': round(busy, 1), 'waiting_minutes': round(wall - busy, 1) if wall is not None else None}


def main(argv):
    as_json = '--json' in argv
    results = [ledger(Path(arg)) for arg in argv if arg != '--json']
    if as_json:
        print(json.dumps(results, default=lambda value: value.strftime('%Y-%m-%dT%H:%M:%SZ'), indent=1))
        return 0
    for result in results:
        print(f"{result['run']}: clock {result['clock']}  wall {result['wall_minutes']} min  "
              f"in steps {result['step_minutes']} min  waiting {result['waiting_minutes']} min  "
              f"patch rounds {result['patch_rounds']}  running {', '.join(result['running']) or 'nothing'}")
        if result['stopped']:
            print(f"  STOPPED (unfinished steps are not running): {result['stopped']}")
        for row in result['steps']:
            print(f"  {row['started']:%m-%d %H:%M}  {str(row['minutes']) if row['minutes'] is not None else 'open':>7}  {row['step']}")
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
