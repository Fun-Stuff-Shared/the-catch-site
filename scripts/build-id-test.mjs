import test from 'node:test';
import assert from 'node:assert/strict';
import { buildId } from '../src/lib/build-id.mjs';

const LOCAL = 'a'.repeat(40);
const WORKER = 'b'.repeat(40);

test('local Git HEAD is resolved once while the Workers override remains live', () => {
  let calls = 0;
  const git = () => { calls++; return `${LOCAL}\n`; };
  assert.equal(buildId({}, git), LOCAL);
  assert.equal(buildId({}, git), LOCAL);
  assert.equal(calls, 1);
  assert.equal(buildId({ WORKERS_CI_COMMIT_SHA: WORKER }, git), WORKER);
  assert.equal(buildId({}, git), LOCAL);
  assert.equal(calls, 1);
  assert.throws(() => buildId({ WORKERS_CI_COMMIT_SHA: 'invalid' }, git), /not a full commit sha/);
});

test('failed and empty Git responses are not cached', () => {
  let value = '';
  const git = () => value;
  assert.throws(() => buildId({}, git), /not a full commit sha/);
  value = 'HEAD';
  assert.throws(() => buildId({}, git), /not a full commit sha/);
  value = LOCAL;
  assert.equal(buildId({}, git), LOCAL);
  assert.throws(() => buildId({}, () => { throw new Error('git failed'); }), /git failed/);
});
