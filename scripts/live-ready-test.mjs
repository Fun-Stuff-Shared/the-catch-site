import assert from 'node:assert/strict';
import test from 'node:test';
import { buildId } from '../src/lib/build-id.mjs';
import { readiness, waitLive } from './live-ready.mjs';

const NEW = 'b'.repeat(40);
const OLD = 'a'.repeat(40);
const page = (build, extra = '') => `<html><head><meta name="catch-build" content="${build}"></head><body><h1>Same headline</h1>${extra}</body></html>`;

test('a page with the same headline from the old build is not live', () => {
  assert.equal(readiness(page(OLD), { build: NEW }), `build still ${OLD}`);
  assert.equal(readiness(page(NEW), { build: NEW }), null);
});

test('a page without exactly one build id is not live', () => {
  assert.match(readiness('<h1>Same headline</h1>', { build: NEW }), /0 build ids/);
  assert.match(readiness(page(NEW) + page(NEW), { build: NEW }), /2 build ids/);
});

test('a v2 story is live only when it shows the committed snapshot alone', () => {
  const v2 = (...ids) => page(NEW, ids.map((id) => `<details data-v2-snapshot="${id}"></details>`).join(''));
  assert.equal(readiness(v2('s1'), { build: NEW, snapshot: 's1' }), null);
  assert.match(readiness(v2('s0'), { build: NEW, snapshot: 's1' }), /v2 snapshot s0, want s1/);
  assert.match(readiness(v2('s1', 's0'), { build: NEW, snapshot: 's1' }), /v2 snapshot s1, s0/);
  assert.match(readiness(page(NEW), { build: NEW, snapshot: 's1' }), /absent/);
});

test('the poll waits through the old build and refuses when the new one never serves', async () => {
  const served = [page(OLD), page(OLD), page(NEW)];
  const fetchPage = async () => ({ ok: true, status: 200, text: async () => served.shift() ?? page(NEW) });
  assert.equal(await waitLive('u', { build: NEW }, { tries: 5, pause: 0, fetchPage }), page(NEW));
  const stale = async () => ({ ok: true, status: 200, text: async () => page(OLD) });
  await assert.rejects(waitLive('u', { build: NEW }, { tries: 3, pause: 0, fetchPage: stale }), /NOT LIVE after 3 tries: u; last seen: build still a+/);
  const missing = async () => ({ ok: false, status: 404, text: async () => page(NEW) });
  await assert.rejects(waitLive('u', { build: NEW }, { tries: 2, pause: 0, fetchPage: missing }), /status 404/);
});

test('the build id is the hosted commit or the local HEAD, and nothing else', () => {
  assert.equal(buildId({ WORKERS_CI_COMMIT_SHA: NEW }, () => { throw new Error('git not consulted'); }), NEW);
  assert.equal(buildId({}, () => `${OLD}\n`), OLD);
  assert.throws(() => buildId({}, () => 'HEAD'), /not a full commit sha/);
});
