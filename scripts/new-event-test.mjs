import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const script = new URL('./new-event.mjs', import.meta.url).pathname;
const recipes = new URL('../recipes', import.meta.url).pathname;

function scratch() {
  const root = mkdtempSync(join(tmpdir(), 'catch-scaffold-'));
  cpSync(recipes, join(root, 'recipes'), { recursive: true });
  for (const dir of ['src/data', 'src/pages/events', 'checks/manifests']) mkdirSync(join(root, dir), { recursive: true });
  return root;
}
const run = (root, args, env = {}) => spawnSync(process.execPath, [script, ...args], { env: { ...process.env, ...env, CATCH_SITE_ROOT: root }, encoding: 'utf8' });
const files = (root) => [...readdirSync(join(root, 'src/data')), ...readdirSync(join(root, 'src/pages/events')), ...readdirSync(join(root, 'checks/manifests'))];
const checks = (path) => spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' }).status === 0;

test('a story scaffold is one dated moment with its own page, module, and manifest', () => {
  const root = scratch();
  try {
    const result = run(root, ['--recipe', 'coverage-only', '--slug', 'a-b', '--date', '2028-02-29', '--moment', 'First Thing!', '--title', 'Officials say "hold"\\ twice']);
    assert.equal(result.status, 0, result.stderr);
    const page = join(root, 'src/pages/events/a-b/2028-02-29-first-thing.astro');
    const module = join(root, 'src/data/a-b-2028-02-29-first-thing.mjs');
    assert.ok(existsSync(page) && existsSync(module) && existsSync(join(root, 'checks/manifests/a-b--2028-02-29-first-thing.json')));
    assert.ok(checks(module));
    assert.match(readFileSync(module, 'utf8'), /slug: "a-b\/2028-02-29-first-thing"/);
    assert.match(readFileSync(module, 'utf8'), /title: "Officials say \\"hold\\"\\\\ twice"/);
    assert.match(readFileSync(page, 'utf8'), /data\/a-b-2028-02-29-first-thing\.mjs/);
    assert.match(readFileSync(page, 'utf8'), /February 29, 2028/);
    // a second subject that only differs by a hyphen gets its own module
    assert.equal(run(root, ['--recipe', 'coverage-only', '--slug', 'ab', '--date', '2028-02-29', '--moment', 'first-thing']).status, 0);
    assert.match(readFileSync(join(root, 'src/pages/events/ab/2028-02-29-first-thing.astro'), 'utf8'), /data\/ab-2028-02-29-first-thing\.mjs/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('the date label is the calendar day regardless of timezone', () => {
  const root = scratch();
  try {
    assert.equal(run(root, ['--recipe', 'coverage-only', '--slug', 'tz', '--date', '2027-01-01', '--moment', 'new-year'], { TZ: 'America/New_York' }).status, 0);
    assert.match(readFileSync(join(root, 'src/pages/events/tz/2027-01-01-new-year.astro'), 'utf8'), /January 1, 2027/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('bad input exits nonzero before any file is written', () => {
  const root = scratch();
  try {
    const bad = [
      ['--recipe', 'coverage-only', '--slug', '../escape', '--date', '2027-03-01', '--moment', 'm'],
      ['--recipe', 'coverage-only', '--slug', 'a/../../b', '--date', '2027-03-01', '--moment', 'm'],
      ['--recipe', 'coverage-only', '--slug', 'A_b', '--date', '2027-03-01', '--moment', 'm'],
      ['--recipe', 'coverage-only', '--slug', 'ok', '--date', '2027-02-31', '--moment', 'm'],
      ['--recipe', 'coverage-only', '--slug', 'ok', '--date', '2027-3-1', '--moment', 'm'],
      ['--recipe', 'coverage-only', '--slug', 'ok', '--date', '2027-03-01', '--moment', '--title'],
      ['--recipe', 'coverage-only', '--slug', 'ok', '--date', '2027-03-01', '--moment', '2027-03-01-again'],
      ['--recipe', 'coverage-only', '--slug', 'ok', '--date', '2027-03-01'],
    ];
    for (const args of bad) assert.notEqual(run(root, args).status, 0, args.join(' '));
    assert.deepEqual(files(root), []);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('recipe strings that cannot land in generated source are refused', () => {
  const root = scratch();
  try {
    const recipe = JSON.parse(readFileSync(join(root, 'recipes/coverage-only.json'), 'utf8'));
    writeFileSync(join(root, 'recipes/broken-name.json'), JSON.stringify({ ...recipe, name: 'two\nlines' }));
    writeFileSync(join(root, 'recipes/broken-id.json'), JSON.stringify({ ...recipe, sections: [{ id: 'what happened', kicker: 'x' }] }));
    writeFileSync(join(root, 'recipes/broken-kicker.json'), JSON.stringify({ ...recipe, sections: [{ id: 'what-happened', kicker: 'a\nb' }] }));
    for (const name of ['broken-name', 'broken-id', 'broken-kicker']) assert.notEqual(run(root, ['--recipe', name, '--slug', 'ok', '--date', '2027-03-01', '--moment', 'm']).status, 0, name);
    assert.deepEqual(files(root), []);
    writeFileSync(join(root, 'recipes/quoted.json'), JSON.stringify({ ...recipe, sections: [{ id: 'what-happened', kicker: 'She said "so" \\ done' }] }));
    assert.equal(run(root, ['--recipe', 'quoted', '--slug', 'ok', '--date', '2027-03-01', '--moment', 'm']).status, 0);
    assert.match(readFileSync(join(root, 'src/pages/events/ok/2027-03-01-m.astro'), 'utf8'), /text=\{"She said \\"so\\" \\\\ done"\}/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
