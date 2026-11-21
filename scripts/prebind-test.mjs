import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync, readFileSync, existsSync, rmSync, utimesSync, chmodSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';

const dir = new URL('../skills/catch-story/scripts/', import.meta.url).pathname;
const story = 'example--story';
function fixture(t, text, says = 'It cost $1,200.50 million on October 7, 2026 in Paris.', passage = says, status = 'fact', by = 'Jane Smith') {
  const root = mkdtempSync(join(tmpdir(), 'prebind-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  function put(path, content, time = 1000) {
    const file = join(root, path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
    utimesSync(file, time, time);
  }
  put('src/pages/events/example/story.astro', 'source');
  put(`checks/claims/${story}.json`, JSON.stringify({ claims: [{ id: 'c', says, status, by, evidence: [{ record: 'record', passage }] }] }));
  put(`checks/manifests/${story}.json`, JSON.stringify({ records: [{ id: 'record', text_path: 'record.txt' }] }));
  put('record.txt', 'A payment of $999 million went to London.');
  mkdirSync(join(root, 'checks/reads'), { recursive: true });
  put('dist/events/example/story/index.html', `<main><p>${text}</p></main>`, 2000);
  put('bin/claude', '#!/usr/bin/env python3\nfrom pathlib import Path\nPath("called").touch()\nprint("[]")\n');
  chmodSync(join(root, 'bin/claude'), 0o755);
  const env = { ...process.env, HOME: root, GIT_CONFIG_GLOBAL: join(root, '.gitconfig'), PATH: `${root}/bin:${process.env.PATH}` };
  const run = (script = 'prebind.py', args = []) => spawnSync('python3', [dir + script, story, ...args], { cwd: root, env, encoding: 'utf8' });
  return { root, put, run };
}
const cite = '<a data-claim="c" data-passage="yes"></a>';
for (const [name, text, says, passage, status, expected] of [
  ['numbers dates money names pass', 'It cost $1200.5 million on October 7, 2026 in Paris.', undefined, undefined, 'fact', null],
  ['missing tokens and candidates', 'It cost $999 million in London.', undefined, undefined, 'fact', 'tokens'],
  ['attribution passes', 'Jane Smith said it happened.', 'It happened.', 'It happened.', 'said', null],
  ['missing speaker', 'It happened, they said.', 'It happened.', 'It happened.', 'said', 'attribution'],
  ['missing verb', 'Jane Smith witnessed it.', 'It happened.', 'It happened.', 'alleged', 'attribution'],
  ['curly whitespace quote', 'They said “we  won”.', 'They spoke.', 'They said "we\n won".', 'fact', null],
  ['straight quote from says', 'They said "we won".', 'They said “we won”.', 'Other words.', 'fact', null],
  ['ellipsis', 'They said “we … won”.', 'They spoke.', 'we really won', 'fact', null],
  ['reversed ellipsis', 'They said “won ... we”.', 'They spoke.', 'we really won', 'fact', 'quotes'],
  ['quote case sensitive', 'They said “We won”.', 'They spoke.', 'we won', 'fact', 'quotes'],
  ['unquoted says not quote evidence', 'They said “we won”.', 'we won', 'Other words.', 'fact', 'quotes'],
]) {
  test(name, t => {
    const { run } = fixture(t, text + cite, says, passage, status);
    const result = run('prebind.py', ['--strict']);
    assert.equal(result.status, expected ? 1 : 0, result.stdout + result.stderr);
    if (expected) assert.ok(result.stdout.includes(`- ${expected}:`), result.stdout);
    if (name === 'missing tokens and candidates') assert.match(result.stdout, /record:.*London/);
  });
}
test('uncited and empty blocks; default advisory exit', t => {
  const { run, put } = fixture(t, 'It cost 999.');
  assert.equal(run().status, 0);
  assert.equal(run('prebind.py', ['--strict']).status, 1);
  put('dist/events/example/story/index.html', '<main></main>', 2000);
  assert.match(run().stdout, /0 blocks checked; 0 failing/);
});
test('bound filter and --all', t => {
  const { run, put, root } = fixture(t, 'It cost 999.' + cite);
  assert.equal(run('bind.py', ['1']).status, 0);
  assert.ok(existsSync(join(root, `checks/reads/${story}-bound.json`)));
  assert.match(run().stdout, /0 blocks checked/);
  assert.equal(run('prebind.py', ['--all', '--strict']).status, 1);
  put(`checks/reads/${story}-bound.json`, '[]');
});
for (const strict of [true, false]) test(`bind strict=${strict}`, t => {
  const { run, root } = fixture(t, 'It cost 999.' + cite);
  const result = run('bind.py', ['1', ...(strict ? ['--strict'] : [])]);
  assert.equal(result.status, strict ? 1 : 0, result.stderr);
  assert.equal(existsSync(join(root, 'called')), !strict);
  assert.equal(existsSync(join(root, `checks/reads/${story}-bound.json`)), !strict);
  const report = readFileSync(join(root, `checks/reads/${story}-r1-bind.md`), 'utf8');
  assert.match(report, /## Pre-bind lint/);
  assert.match(report, strict ? /NOT BOUND/ : /\nBOUND\n/);
});
test('missing admitted inputs are errors, not clean', t => {
  const { run, root } = fixture(t, 'It cost 999.' + cite);
  rmSync(join(root, `checks/manifests/${story}.json`));
  assert.notEqual(run().status, 0);
});
