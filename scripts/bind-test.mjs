import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync } from 'node:fs';
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
  const run = () => spawnSync('python3', [script, story, '1'], { cwd: root, encoding: 'utf8' });
  return { root, put, run };
}

for (const source of [page, 'src/data/example-a-story.mjs', 'data/sources/example/input.csv',
  'data/state/events.json', 'src/components/ReadingModes.astro', 'src/lib/state.mjs']) {
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
