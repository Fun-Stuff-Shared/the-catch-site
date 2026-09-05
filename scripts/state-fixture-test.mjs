import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readState, frontChains, deskEvents, citedDocuments } from '../src/lib/state.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'catch-state-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (name, value) => writeFileSync(join(root, `${name}.json`), JSON.stringify(value));
  const event = { id: 'event-a', label: 'Report', period: '2026-07', status: 'published' };
  const view = { event, status: 'published', root_id: event.id, desk: 'Economy', edges: [], evidence: [] };
  write(event.id, view);
  write(`chain-${event.id}`, { id: event.id, root: event, events: [event], outlet_count: 1, tracked: [] });
  return { root, write, view, event };
}

test('one-story one-outlet chains stay in their desk, outside the front', (t) => {
  const { root } = fixture(t);
  const state = readState(root);
  assert.equal(frontChains(state).length, 0);
  assert.equal(deskEvents(state)[0][1][0].event.id, 'event-a');
});

test('citations publish documents and retain distinct roles across stories', (t) => {
  const { root, write, view } = fixture(t);
  view.evidence = [{ id: 'doc', source_kind: 'document', title: 'Source report' }];
  view.edges = [{ id: 'cite', label: 'cites', to_evidence_id: 'doc', role: 'reference' }];
  write('event-a', view);
  assert.equal(citedDocuments(readState(root))[0].citations[0].role, 'reference');
  view.edges[0].retire = true;
  write('event-a', view);
  assert.equal(citedDocuments(readState(root)).length, 0);
});

test('incomplete projections refuse a build instead of silently dropping a story', (t) => {
  const { root, write, view } = fixture(t);
  view.root_id = 'event-missing';
  write('event-a', view);
  assert.throws(() => readState(root), /Missing chain/);
});

import { pullState } from './pull-state.mjs';

test('pull replaces same-time copies and rejects an incomplete source before replacing destination', (t) => {
  const source = fixture(t);
  const destination = fixture(t);
  source.view.event.label = 'Changed report title';
  source.write('event-a', source.view);
  pullState({ source: source.root, destination: destination.root });
  assert.equal(readState(destination.root).events.get('event-a').event.label, 'Changed report title');
  source.view.root_id = 'event-missing';
  source.write('event-a', source.view);
  assert.throws(() => pullState({ source: source.root, destination: destination.root }), /Missing chain/);
  assert.equal(readState(destination.root).events.get('event-a').event.root_id, undefined);
  assert.equal(readState(destination.root).events.get('event-a').root_id, 'event-a');
});
