import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const script = new URL('../skills/catch-story/scripts/bind.py', import.meta.url).pathname;
const story = 'example--a-story';
const page = 'src/pages/events/example/a-story.astro';
const built = 'dist/events/example/a-story/index.html';
const report = `checks/reads/${story}-r1-bind.md`;

function fixture(t, extension = 'astro') {
  const root = mkdtempSync(join(tmpdir(), 'catch-bind-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const put = (file, content, time = 1000) => {
    const path = join(root, file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
    utimesSync(path, time, time);
  };
  put(page.replace('.astro', `.${extension}`), 'edited story');
  put(`checks/claims/${story}.json`, JSON.stringify({ claims: [] }));
  mkdirSync(join(root, 'checks/reads'), { recursive: true });
  put(built, '<main></main>', 2000);
  // An empty built page reaches the no-changed-blocks path without invoking claude.
  const run = (round = 1) => spawnSync('python3', [script, story, String(round)], {
    cwd: root, encoding: 'utf8', env: { ...process.env, HOME: root,
      GIT_CONFIG_GLOBAL: join(root, '.gitconfig'), PATH: `${root}/bin:${process.env.PATH}` },
  });
  return { root, put, run };
}

for (const source of [page, 'src/data/example-a-story.mjs', 'data/sources/example/input.csv',
  'data/state/events.json', 'data/v2/CURRENT', 'src/components/ReadingModes.astro', 'src/lib/state.mjs']) {
  test(`bind refuses a built page older than ${source}`, (t) => {
    const { root, put, run } = fixture(t);
    put(source, 'newer input', 3000);
    const result = run();
    assert.notEqual(result.status, 0, result.stdout);
    assert.match(result.stderr, /bind: refusing stale built page dist\/events\/example\/a-story\/index.html/);
    assert.ok(result.stderr.includes(source), result.stderr);
    assert.match(result.stderr, /Run npm run build, then rerun bind\. Nothing was recorded as bound\./);
    assert.equal(existsSync(join(root, report)), false);
    assert.equal(existsSync(join(root, `checks/reads/${story}-bound.json`)), false);
  });
}

test('bind ignores newer files in the pinned v2 snapshot', (t) => {
  const { root, put, run } = fixture(t);
  put('data/v2/CURRENT', 'snapshot-hash');
  put('data/v2/snapshots/snapshot-hash/records/example.json', '{}', 3000);
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /nothing changed; BOUND/);
  assert.match(readFileSync(join(root, report), 'utf8'), /BOUND/);
});

test('bind carries edited failures, reports repeats, and clears resolved findings without priming unrelated blocks', (t) => {
  const { root, put, run } = fixture(t);
  const finding = { b: 1, claim: null, kind: 'beyond', problem: 'No claim holds the announced date.' };
  put('bin/claude', '#!/usr/bin/python3\nimport pathlib, sys\np = pathlib.Path.cwd()\n(p / "prompt.txt").write_text(sys.stdin.read())\nprint((p / "answer.json").read_text())\n');
  chmodSync(join(root, 'bin/claude'), 0o755);
  const read = (file) => readFileSync(join(root, file), 'utf8');
  const saved = () => JSON.parse(read(`checks/reads/${story}-findings.json`));
  const check = (round) => {
    const result = run(round);
    assert.equal(result.status, 0, result.stderr);
  };
  put(built, '<main><p>The agency announced the launch date as Monday.</p></main>', 2000);
  put('answer.json', JSON.stringify([finding]));
  check(1);
  const [hash] = Object.keys(saved());
  assert.deepEqual(saved()[hash], { text: 'The agency announced the launch date as Monday.',
    claims: [], round: '1', findings: [{ claim: null, kind: 'beyond', problem: finding.problem }] });
  put(built, '<main><p>The agency announced the launch date as next Monday.</p><p>Zebras graze quietly.</p></main>', 2000);
  check(2);
  assert.match(read('prompt.txt'), /previous finding \(round r1, beyond\): No claim holds the announced date\./);
  assert.doesNotMatch(read('prompt.txt').split('B2.')[1], /previous finding/);
  assert.match(read(`checks/reads/${story}-r2-bind.md`), /again; flagged in r1/);
  assert.match(read(`checks/reads/${story}-r2-bind.md`), /## Previously flagged[\s\S]*still flagged/);
  assert.equal(Object.keys(saved()).length, 1);
  assert.equal(saved()[hash], undefined);
  put('answer.json', '[]');
  check(3);
  assert.match(read(`checks/reads/${story}-r3-bind.md`), /flagged in r2:[\s\S]*now resolved/);
  assert.deepEqual(saved(), {});
});

test('bind preserves unread advisory findings and does not save malformed answers', (t) => {
  const { root, put, run } = fixture(t);
  put(`checks/claims/${story}.json`, JSON.stringify({ claims: [
    { id: 'date', says: 'A date was offered.', status: 'may' },
  ] }));
  put(built, '<main><p data-claims="date">The date is fixed.</p></main>', 2000);
  put('bin/claude', '#!/usr/bin/python3\nimport pathlib\nprint((pathlib.Path.cwd() / "answer.json").read_text())\n');
  chmodSync(join(root, 'bin/claude'), 0o755);
  put('answer.json', '[{"b":1,"claim":"date","kind":"status","problem":"It was only offered."}]');
  assert.equal(run().status, 0);
  const path = join(root, `checks/reads/${story}-findings.json`);
  const before = readFileSync(path, 'utf8');
  assert.match(before, /It was only offered/);
  assert.equal(run(2).status, 0);
  assert.equal(readFileSync(path, 'utf8'), before);
  put(built, '<main><p data-claims="date">The date is definitely fixed.</p></main>', 2000);
  put('answer.json', 'not JSON');
  assert.notEqual(run(3).status, 0);
  assert.equal(readFileSync(path, 'utf8'), before);
});

test('repeat matching reserves exact hashes, excludes live entries and prefers cited claim sets', (t) => {
  const { root } = fixture(t);
  const result = spawnSync('python3', ['-c', `
import sys
sys.path.insert(0, ${JSON.stringify(dirname(script))})
from bind import match_previous
def block(key, text, claims=()):
    return {"hash": key, "text": text, "claims": [{"id": c} for c in claims]}
previous = {
    "exact": {"text": "An agency announced a Monday launch.", "claims": []},
    "live": {"text": "An agency announced a Tuesday launch.", "claims": []},
    "same-claims": {"text": "An agency offered a launch on Tuesday.", "claims": ["date"]},
    "other-claims": {"text": "An agency announced a Tuesday launch.", "claims": ["other"]},
}
blocks = [block("edited", "An agency announced a Tuesday launch.", ["date"]),
          block("exact", "An agency announced a Monday launch."),
          block("unrelated", "Zebras graze quietly.")]
matched = match_previous(blocks, previous, {"edited", "exact", "live", "unrelated"})
assert matched == {"exact": "exact", "edited": "same-claims"}, matched
twins = [block("a", previous["exact"]["text"]), block("b", previous["exact"]["text"])]
assert len(match_previous(twins, {"exact": previous["exact"]}, {"a", "b"})) == 1
`], { cwd: root, encoding: 'utf8', env: { ...process.env, HOME: root,
    GIT_CONFIG_GLOBAL: join(root, '.gitconfig') } });
  assert.equal(result.status, 0, result.stderr);
});

for (const extension of ['astro', 'mdx']) {
  test(`bind accepts a fresh ${extension} story with no changed blocks`, (t) => {
    const { root, run } = fixture(t, extension);
    const result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /nothing changed; BOUND/);
    assert.match(readFileSync(join(root, report), 'utf8'), /BOUND/);
  });
}

test('bind refuses a missing built page with a rebuild instruction', (t) => {
  const { root, run } = fixture(t);
  rmSync(join(root, built));
  const result = run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /bind: missing built page .*npm run build/);
  assert.equal(existsSync(join(root, report)), false);
});
