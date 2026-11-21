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
  const run = (script = 'prebind.py', args = [], mode = 'all') => spawnSync('python3', [dir + script, story, ...args, ...(mode ? ['--lint', mode] : [])], { cwd: root, env, encoding: 'utf8' });
  return { root, put, run };
}
const cite = '<a data-claim="c" data-passage="yes"></a>';
for (const [name, text, says, passage, status, expected] of [
  ['numbers dates money names pass', 'It cost $1200.5 million on October 7, 2026 in Paris.', undefined, undefined, 'fact', null],
  ['money decimal is indivisible', 'It cost $12.', 'It cost $12.5.', undefined, 'fact', 'tokens'],
  ['percent decimal is indivisible', 'It fell 5%.', 'It fell 0.5%.', undefined, 'fact', 'tokens'],
  ['money scale is indivisible', 'It cost $12.', 'It cost $12 million.', undefined, 'fact', 'tokens'],
  ['matching complete number', 'It cost $12 million.', 'It cost $12 million.', undefined, 'fact', null],
  ['expanded numeric scale', 'It cost $12000000.', 'It cost $12 million.', undefined, 'fact', null],
  ['scaled numeric form', 'It cost $12 million.', 'It cost $12000000.', undefined, 'fact', null],
  ['numeric ordinal', 'It was the 21st meeting.', 'It was meeting 21.', undefined, 'fact', null],
  ['spelled ordinal', 'It was the fifth meeting.', 'It was meeting 5.', undefined, 'fact', null],
  ['separate adjacent number words', 'It was two one-way flights.', 'It was 2 one-way flights.', undefined, 'fact', null],
  ['second time unit not ordinal', 'It took 1 second.', 'It took one second.', undefined, 'fact', null],
  ['ISO date support', 'It ended November 14, 2026.', 'It ended 2026-11-14.', undefined, 'fact', null],
  ['zero padded ISO date', 'It ended January 5, 2026.', 'It ended 2026-01-05.', undefined, 'fact', null],
  ['spelled source day', 'It ended November 14.', 'It ended November fourteen.', undefined, 'fact', null],
  ['spelled day on both sides', 'It ended November fourteen.', 'It ended November fourteen.', undefined, 'fact', null],
  ['day month support', 'It ended 14 November 2026.', 'It ended Nov. 14.', undefined, 'fact', null],
  ['name in passage', 'It was Jane Smith.', 'It happened.', 'Jane Smith witnessed it.', 'fact', null],
  ['demonym noun support', 'It was a Chinese company.', 'It was a company in China.', undefined, 'fact', null],
  ['named exact quote label', 'Jane Smith “it happened”.', 'It happened.', 'it happened', 'said', null],
  ['quote label wrong speaker', 'James Jones “it happened”.', 'It happened.', 'it happened', 'said', 'attribution'],
  ['present tense reporting', 'Smith blames the weather.', 'It happened.', undefined, 'said', null],
  ['masked number breaks name run', 'It was Boeing 737 MAX.', 'It was Airbus 737 MAX.', undefined, 'fact', 'tokens'],
  ['separate names around number supported', 'It was Boeing 737 MAX.', 'It was Boeing 737 MAX.', undefined, 'fact', null],
  ['masked date breaks name run', 'It was Boeing November 14, 2026 MAX.', 'It was Airbus November 14, 2026 MAX.', undefined, 'fact', 'tokens'],
  ['currency must match', 'It cost €12.', 'It cost £12.', undefined, 'fact', 'tokens'],
  ['yen not dollars', 'It cost ¥12.', 'It cost $12.', undefined, 'fact', 'tokens'],
  ['dollars not bare number', 'It cost $12.', 'It cost 12.', undefined, 'fact', 'tokens'],
  ['matching pounds', 'It cost £12.', 'It cost £12.', undefined, 'fact', null],
  ['matching yen', 'It cost ¥12.', 'It cost ¥12.', undefined, 'fact', null],
  ['USD code equivalent', 'It cost USD 12.', 'It cost $12.', undefined, 'fact', null],
  ['EUR code equivalent', 'It cost €12.', 'It cost EUR 12.', undefined, 'fact', null],
  ['currency codes differ', 'It cost EUR 12.', 'It cost USD 12.', undefined, 'fact', 'tokens'],
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
  ['spelled numbers to digits', 'It took four hours and twenty-one minutes.', 'It took 4 hours and 21 minutes.', undefined, 'fact', null],
  ['digits to spelled numbers', 'It took 4 hours and 1200 minutes.', 'It took four hours and one thousand two hundred minutes.', undefined, 'fact', null],
  ['different spelled number fails', 'It took five hours.', 'It took four hours.', undefined, 'fact', 'tokens'],
  ['independent number words', 'It took between one and two hours.', 'It took between 1 and 2 hours.', undefined, 'fact', null],
  ['independent words do not sum', 'It took 3 hours.', 'It took between one and two hours.', undefined, 'fact', 'tokens'],
  ['compound with and', 'It took one hundred and five hours.', 'It took 105 hours.', undefined, 'fact', null],
  ['compound followed by independent number', 'It took 105 hours and 6 minutes.', 'It took one hundred and five hours and six minutes.', undefined, 'fact', null],
  ['date optional year abbreviation', 'It ended November 14, 2026.', 'It ended Nov. 14.', undefined, 'fact', null],
  ['date abbreviated block', 'It ended Nov 14.', 'It ended November 14, 2026.', undefined, 'fact', null],
  ['date wrong day fails', 'It ended November 15, 2026.', 'It ended Nov. 14.', undefined, 'fact', 'tokens'],
  ['weekday not name', 'It ended Monday.', 'It ended.', undefined, 'fact', null],
  ['full agency to acronym', 'It was the Federal Aviation Administration.', 'It was the FAA.', undefined, 'fact', null],
  ['acronym to full agency', 'It was the FAA.', 'It was the Federal Aviation Administration.', undefined, 'fact', null],
  ['surname supports title run', 'It was Transportation Secretary Sean Duffy.', 'It was Duffy.', undefined, 'fact', null],
  ['title alone not support', 'It was Transportation Secretary Sean Duffy.', 'It was the Secretary.', undefined, 'fact', 'tokens'],
  ['title only skipped', 'It was the Secretary.', 'It happened.', undefined, 'fact', null],
  ['by supports name', 'It was Jane Smith.', 'It happened.', undefined, 'fact', null],
  ['United States to US', 'It was in the United States.', 'It was in the US.', undefined, 'fact', null],
  ['US to United States', 'It was in the U.S.', 'It was in the United States.', undefined, 'fact', null],
  ['colon attribution', 'Smith: “it happened”.', 'It happened.', 'it happened', 'said', null],
  ...['blamed', 'acknowledged', 'tied', 'posted', 'posting', 'called', 'insisted', 'denied', 'contended', 'asserted', 'noted', 'added', 'described', 'cited', 'reported', 'estimated', 'counted'].map(verb => [`attribution ${verb}`, `Smith ${verb} it.`, 'It happened.', undefined, 'said', null]),
  ['count attribution', "It happened, by Smith's count.", 'It happened.', undefined, 'said', null],
  ['estimate attribution', 'It happened, by Smith’s estimate.', 'It happened.', undefined, 'said', null],
  ['statement attribution', 'Smith, in a statement, disputed it.', 'It happened.', undefined, 'said', null],
  ['post attribution', 'Smith, in a post, disputed it.', 'It happened.', undefined, 'said', null],
]) {
  test(name, t => {
    const { run } = fixture(t, text + cite, says, passage, status);
    const result = run('prebind.py', ['--strict']);
    assert.equal(result.status, expected ? 1 : 0, result.stdout + result.stderr);
    if (expected) assert.ok(result.stdout.includes(`- ${expected}:`), result.stdout);
    if (name === 'missing tokens and candidates') assert.match(result.stdout, /record:.*London/);
    if (name === 'date wrong day fails') {
      assert.match(result.stdout, /- tokens: November 15, 2026\n/);
    }
    if (name === 'title alone not support') assert.match(result.stdout, /- tokens: Transportation Secretary Sean Duffy\n/);
    if (name === 'masked number breaks name run' || name === 'masked date breaks name run') assert.match(result.stdout, /- tokens: Boeing\n/);
  });
}
test('uncited and empty blocks; default advisory exit', t => {
  const { run, put } = fixture(t, 'It cost 999.');
  assert.equal(run().status, 0);
  assert.equal(run('prebind.py', ['--strict']).status, 1);
  put('dist/events/example/story/index.html', '<main></main>', 2000);
  assert.match(run().stdout, /0 blocks checked; 0 likely to fail bind/);
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

for (const [name, heading, cited, date, fails] of [
  ['uncited page fact', 'There were 47 flights.', 'There were 47 flights.', '', false],
  ['uncited unsupported fact', 'There were 48 flights.', 'There were 47 flights.', '', true],
  ['uncited by support', 'It was Jane Smith.', 'It happened.', '', false],
  ['manifest year', 'The date: 2026', 'It happened.', '2026-11-13', false],
  ['page supported year', 'The date: 2024', 'It happened in 2024.', '', false],
  ['unsupported year', 'The date: 2023', 'It happened.', '2026-11-13', true],
  ['bare rank', 'Rank: 3', 'It happened.', '', false],
  ['measured small integer', 'It took 3 hours.', 'It happened.', '', true],
]) test(name, t => {
  const { run, put } = fixture(t, '', cited);
  put(`checks/manifests/${story}.json`, JSON.stringify({ date, records: [] }));
  put('dist/events/example/story/index.html', `<main><h2>${heading}</h2><p>${cited}${cite}</p></main>`, 2000);
  const result = run('prebind.py', ['--strict']);
  assert.equal(result.status, fails ? 1 : 0, result.stdout + result.stderr);
});
test('small integer stays checked in cited block', t => {
  const { run } = fixture(t, 'Rank: 3' + cite, 'It happened.');
  assert.equal(run('prebind.py', ['--strict']).status, 1);
});
for (const text of ['The United States said it happened.', 'U.S. said it happened.', 'US: it happened.']) {
  test(`canonical speaker attribution: ${text}`, t => {
    const { run } = fixture(t, text + cite, 'It happened.', 'It happened.', 'said', 'United States');
    const result = run('prebind.py', ['--strict']);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  });
}
test('canonical speaker still requires attribution', t => {
  const { run } = fixture(t, 'The United States witnessed it.' + cite, 'It happened.', 'It happened.', 'said', 'United States');
  assert.equal(run('prebind.py', ['--strict']).status, 1);
});
test('pronoun us is not the United States speaker', t => {
  const { run } = fixture(t, 'They told us it happened.' + cite, 'It happened.', 'It happened.', 'said', 'United States');
  const result = run('prebind.py', ['--strict']);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /- attribution:/);
});
test('cited bare year uses page support, but other cited numbers do not', t => {
  const { run, put } = fixture(t, '', 'It happened.');
  put(`checks/claims/${story}.json`, JSON.stringify({ claims: [
    { id: 'c', says: 'It happened.', status: 'fact', evidence: [] },
    { id: 'other', says: 'In 2024 there were 47 flights.', status: 'fact', evidence: [] },
  ] }));
  put('dist/events/example/story/index.html', `<main><p>The date: 2024${cite}</p><p data-claims="other">In 2024 there were 47 flights.</p></main>`, 2000);
  assert.equal(run('prebind.py', ['--strict']).status, 0);
  put('dist/events/example/story/index.html', `<main><p>There were 47 flights.${cite}</p><p data-claims="other">In 2024 there were 47 flights.</p></main>`, 2000);
  assert.equal(run('prebind.py', ['--strict']).status, 1);
});
for (const script of ['prebind.py', 'bind.py']) {
  test(`${script} default quote-only versus lint all`, t => {
    const { run, put, root } = fixture(t, 'It cost 999.' + cite, 'It happened.', 'It happened.', 'said');
    const args = script === 'bind.py' ? ['1', '--strict'] : ['--strict', '--all'];
    const result = run(script, args, null);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /likely to fail bind/i);
    if (script === 'bind.py') put(`checks/reads/${story}-bound.json`, '[]');
    const all = run(script, args, 'all');
    assert.equal(all.status, 1, all.stdout + all.stderr);
    assert.match(all.stdout, /- tokens:/);
    assert.match(all.stdout, /- attribution:/);
    assert.ok(existsSync(join(root, 'checks/reads')));
  });
  test(`${script} default still checks quotes`, t => {
    const { run } = fixture(t, 'They said “invented words”.' + cite, 'It happened.');
    const result = run(script, script === 'bind.py' ? ['1', '--strict'] : ['--strict'], null);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stdout, /- quotes:/);
    assert.doesNotMatch(result.stdout, /- tokens:|- attribution:/);
  });
}
test('claim scope supports number and date', t => {
  const { run, put } = fixture(t, 'It took 47 hours on November 14, 2026.' + cite, 'It happened.');
  put(`checks/claims/${story}.json`, JSON.stringify({ claims: [{ id: 'c', says: 'It happened.', scope: '47 hours on 2026-11-14', status: 'fact', evidence: [] }] }));
  assert.equal(run('prebind.py', ['--strict']).status, 0);
});
