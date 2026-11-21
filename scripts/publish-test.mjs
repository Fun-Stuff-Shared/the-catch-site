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
  put(join(site, '.gitignore'), '.worktrees/\n');
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
  assert.match(r.stderr, /zsh .*publish.sh --merge publish-/);
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

const patterns = [
  ['Mapbox', 'pk.' + 'a'.repeat(30) + '.' + 'b'.repeat(22)],
  ['Mapbox', 'sk.' + 'a'.repeat(30) + '.' + 'b'.repeat(22)],
  ['AWS', 'AKIA' + 'A'.repeat(16)],
  ['GitHub', 'ghp_' + 'a'.repeat(36)],
  ['GitHub', 'github_pat_' + 'a'.repeat(40)],
  ['Slack', 'xoxb-' + '1234567890-'.repeat(2) + 'a'.repeat(24)],
  ['Google', 'AIza' + 'a'.repeat(35)],
  ['Stripe', 'sk_live_' + 'a'.repeat(24)],
  ['private key', '-----BEGIN RSA PRIVATE KEY-----'],
];

for (const [pattern, token] of patterns) {
  test(`source scan blocks ${pattern} before merging without logging source bytes`, (t) => {
    const f = fixture(t, { files: { 'data/sources/capture file.txt': `source\n${token}\n` } });
    const r = f.run();
    assert.notEqual(r.status, 0);
    assert.equal(f.git('rev-parse', 'main'), f.before);
    assert.equal(f.git('branch', '--list', 'publish-*'), '');
    assert.match(r.stderr, /data\/sources\/capture file.txt:2:/);
    assert.ok(r.stderr.includes(pattern), r.stderr);
    assert.ok(!r.stderr.includes(token), r.stderr);
    assert.match(r.stderr, /CATCH_SOURCE_SCAN_ALLOW=1/);
  });
}

test('source scan override reports modified capture and preserves exact bytes', (t) => {
  const capture = `first\n${patterns[0][1]}\r\n`;
  const f = fixture(t, { files: { 'data/sources/existing.txt': capture } });
  const r = f.run([], { CATCH_SOURCE_SCAN_ALLOW: '1' });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stderr, /data\/sources\/existing.txt:2: Mapbox/);
  assert.equal(readFileSync(join(f.site, 'data/sources/existing.txt'), 'utf8'), capture);
});

test('source scan ignores files outside sources and accepts clean changed captures', (t) => {
  const f = fixture(t, { files: { 'outside.txt': patterns[0][1], 'data/sources/clean.txt': 'ordinary text\n' } });
  const r = f.run();
  assert.equal(r.status, 0, r.stderr);
});

test('source scan catches a key removed from the branch tip and deduplicates findings', (t) => {
  const token = patterns[0][1];
  const f = fixture(t, { files: { 'data/sources/existing.txt': `source\n${token}\n` } });
  const introduced = f.git('rev-parse', '--short', 'story');
  f.git('switch', '-q', 'story');
  writeFileSync(join(f.site, 'data/sources/existing.txt'), `source\n${token}\nextra line\n`);
  f.git('commit', '-qam', 'change capture with same token');
  writeFileSync(join(f.site, 'data/sources/existing.txt'), 'ordinary source\n');
  f.git('commit', '-qam', 'remove token');
  f.git('switch', '-q', 'main');
  const r = f.run(['--merge', 'story']);
  assert.notEqual(r.status, 0);
  assert.equal(f.git('rev-parse', 'main'), f.before);
  assert.equal(f.git('branch', '--list', 'publish-*'), '');
  const findings = r.stderr.split('\n').filter((line) => line.includes('data/sources/existing.txt:2: Mapbox'));
  assert.equal(findings.length, 1, r.stderr);
  assert.ok(findings[0].includes(`commit ${introduced}`), r.stderr);
  assert.ok(!r.stderr.includes(token), r.stderr);
});
