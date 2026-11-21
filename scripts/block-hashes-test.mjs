import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const script = new URL('../skills/catch-record/scripts/claims.py', import.meta.url).pathname;

function fixture(t, code) {
  const root = mkdtempSync(join(tmpdir(), 'catch-block-hashes-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const result = spawnSync('python3', ['-c', `
import copy, importlib.util, json, sys
from pathlib import Path
spec = importlib.util.spec_from_file_location('claims', sys.argv[1])
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)
story = 'example--story'
for directory in ('checks/claims', 'checks/reads', 'dist/events/example/story'):
    Path(directory).mkdir(parents=True, exist_ok=True)
claim = dict(id='one', says='It happened.', short='Happened', status='fact',
             by='Reporter', scope='Today', load=['catch'],
             evidence=[dict(record='source', passage='It happened.')])
def page(current=claim, text='The event happened.'):
    c.ledger_path(story).write_text(json.dumps(dict(story=story, claims=[current])))
    c.page_path(story).write_text('<main><p data-claims="one">' + text + '</p><p>Unbound text.</p></main>')
    return c.blocks(story)[0]
page()
${code}
`, script], {
    cwd: root, encoding: 'utf8',
    env: { ...process.env, HOME: root, GIT_CONFIG_GLOBAL: join(root, '.gitconfig') },
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

test('only the claim fields bind judges reopen a block', (t) => fixture(t, `
original = page()
for field, value in [('short', 'New label'), ('evidence', []), ('load', ['spine', 'figure'])]:
    changed = copy.deepcopy(claim)
    changed[field] = value
    block = page(changed)
    assert block['hash'] == original['hash'], field
    assert block['legacy_hash'] != original['legacy_hash'], field
for field, value in [('says', 'Something else happened.'), ('status', 'may'),
                     ('by', 'Another reporter'), ('scope', 'Yesterday'), ('load', [])]:
    changed = copy.deepcopy(claim)
    changed[field] = value
    assert page(changed)['hash'] != original['hash'], field
assert page(text='Different text.')['hash'] != original['hash']
background = copy.deepcopy(claim)
background['load'] = []
assert page(background)['hash'] != page()['hash']
`));

test('migration preserves passes, not unbound blocks, and is idempotent', (t) => fixture(t, `
bound_block, unbound_block = c.blocks(story)
path = c.bound_path(story)
path.write_text(json.dumps([bound_block['legacy_hash'], 'older-pass']))
c.migrate_bound(story)
expected = sorted([bound_block['legacy_hash'], bound_block['hash'], 'older-pass'])
assert json.loads(path.read_text()) == expected
assert unbound_block['hash'] not in expected
before = path.stat().st_mtime_ns
c.migrate_bound(story)
assert path.stat().st_mtime_ns == before
assert json.loads(path.read_text()) == expected
`));

test('migration of an empty or missing bound set writes nothing', (t) => fixture(t, `
path = c.bound_path(story)
c.migrate_bound(story)
assert not path.exists()
path.write_text('[]\\n')
before = path.stat().st_mtime_ns
c.migrate_bound(story)
assert path.read_text() == '[]\\n'
assert path.stat().st_mtime_ns == before
`));

test('migration refuses a missing built page without changing passes', (t) => fixture(t, `
path = c.bound_path(story)
path.write_text('["previous-pass"]\\n')
c.page_path(story).unlink()
try:
    c.migrate_bound(story)
except FileNotFoundError:
    pass
else:
    raise AssertionError('missing page was accepted')
assert path.read_text() == '["previous-pass"]\\n'
`));
