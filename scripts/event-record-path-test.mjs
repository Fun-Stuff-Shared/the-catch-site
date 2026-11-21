import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { eventRecordPath, eventRecordRoutes } from '../src/lib/state.mjs';

test('event record routes are indexed once per build, with fresh development reads', t => {
  const dir = mkdtempSync(join(tmpdir(), 'record-routes-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const put = route => writeFileSync(join(dir, 'story.json'), JSON.stringify({ state_event_id: 'event-story', event_record: route }));
  put('/events/one/');
  const routes = eventRecordRoutes(dir);
  assert.equal(eventRecordRoutes(dir), routes);
  assert.equal(eventRecordPath('event-story', dir), '/events/one/');
  put('/events/two/');
  assert.equal(eventRecordPath('event-story', dir), '/events/one/');
  assert.equal(eventRecordPath('event-story', dir, true), '/events/two/');
  assert.equal(eventRecordPath('event-missing', dir), null);
  put(null);
  assert.equal(eventRecordPath('event-story', dir, true), null);
  put('/invalid/');
  assert.throws(() => eventRecordPath('event-story', dir, true), /Invalid event record route: story.json/);
  writeFileSync(join(dir, 'story.json'), '{');
  assert.throws(() => eventRecordRoutes(dir, true), SyntaxError);
});

test('empty manifest directories yield no record route', t => {
  const dir = mkdtempSync(join(tmpdir(), 'record-routes-empty-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  assert.equal(eventRecordRoutes(dir).size, 0);
  assert.equal(eventRecordPath('event-story', dir), null);
});
