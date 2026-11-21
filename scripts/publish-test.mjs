import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const source = readFileSync(new URL('../skills/catch-orchestrate/scripts/publish.sh', import.meta.url), 'utf8');
function fixture(t, { reject = false, files = {} } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'catch-publish-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const site = join(root, 'site');
  const put = (path, text, mode) => {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text, { mode });
  };
  const git = (...args) => {
    const r = spawnSync('git', ['-C', site, ...args], { encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr);
    return r.stdout.trim();
  };
  mkdirSync(site);
  git('init', '-b', 'main');
  git('config', 'user.name', 'Publish test');
  git('config', 'user.email', 'publish@example.invalid');
  put(join(site, 'checks/manifests/test--story.json'), '{"v2":true,"figures":[{}]}');
  put(join(site, 'src/data/news-records.json'), '{}');
  put(join(site, 'skills/catch-record/scripts/claims.py'), '');
  for (const name of ['deploy-wait', 'live-ready', 'live-audit']) put(join(site, `scripts/${name}.mjs`), '');
  put(join(site, 'data/sources/existing.txt'), 'ordinary source\n');
  git('add', '--all');
  git('commit', '-qm', 'base');
  const before = git('rev-parse', 'main');
  const origin = join(root, 'origin.git');
  assert.equal(spawnSync('git', ['init', '--bare', origin]).status, 0);
  git('remote', 'add', 'origin', origin);
  git('push', '-q', 'origin', 'main');
  if (reject) put(join(origin, 'hooks/pre-receive'), '#!/bin/sh\necho "fixture rejects push" >&2\nexit 1\n', 0o755);
  git('switch', '-qc', 'story');
  put(join(site, 'story.txt'), 'story\n');
  for (const [path, text] of Object.entries(files)) put(join(site, path), text);
  git('add', '--all');
  git('commit', '-qm', 'story');
  git('switch', '-q', 'main');
  const script = join(root, 'publish.sh');
  put(script, source.replace('site=/Volumes/4/GitHub/the-catch-site', `site=${site}`));
  put(join(root, 'fetch-pinned.sh'), 'exit 0\n');
  for (const name of ['npm', 'fd']) put(join(root, 'bin', name), '#!/bin/sh\nexit 0\n', 0o755);
  const run = (args = [], env = {}) => spawnSync('zsh', [script, '--merge', 'story', ...args, 'test--story'], {
    encoding: 'utf8', env: { ...process.env, CATCH_BASE: 'main', CATCH_SOURCE_SCAN_ALLOW: '', PATH: `${root}/bin:${process.env.PATH}`, ...env },
  });
  return { site, before, git, run };
}

test('a rejected push restores main and preserves the publish commit for retry', (t) => {
  const f = fixture(t, { reject: true });
  const r = f.run();
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /fixture rejects push/);
  assert.equal(f.git('rev-parse', 'main'), f.before);
  assert.equal(f.git('rev-parse', 'origin/main'), f.before);
  assert.equal(f.git('status', '--porcelain'), '');
  assert.match(r.stderr, /Retry after resolving the push rejection/);
  assert.match(r.stderr, /git -C .* merge --ff-only publish-/);
});

test('a successful publish pushes main', (t) => {
  const f = fixture(t);
  const r = f.run();
  assert.equal(r.status, 0, r.stderr);
  assert.notEqual(f.git('rev-parse', 'main'), f.before);
  assert.equal(f.git('rev-parse', 'main'), f.git('rev-parse', 'origin/main'));
});

test('--no-push keeps the local fast-forward without pushing', (t) => {
  const f = fixture(t, { reject: true });
  const r = f.run(['--no-push']);
  assert.equal(r.status, 0, r.stderr);
  assert.notEqual(f.git('rev-parse', 'main'), f.before);
  assert.equal(f.git('rev-parse', 'origin/main'), f.before);
});
