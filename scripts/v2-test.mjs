import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { canonical, readV2, v1EventId, v2Story } from '../src/lib/v2.mjs';
import { pullV2 } from './pull-v2.mjs';
import { pullState } from './pull-state.mjs';

const sha256 = (data) => createHash('sha256').update(data).digest('hex');
const TEXT = 'Intro 🗳️ then: Counties rejected 2.6% of ballots.';
const QUOTE = 'Counties rejected 2.6% of ballots.';

function temp(t, prefix) {
  const root = mkdtempSync(join(tmpdir(), prefix));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
}

function snapshot(source, { label = 'Ballot rejections', quote = QUOTE, text = TEXT } = {}) {
  const textHash = sha256(TEXT);
  const start = Array.from(TEXT).indexOf('C');
  const view = {
    format: 'sai-news-view/1', id: 'subject-a', kind: 'development', label, evaluated_at: '2026-11-02T00:00:00Z',
    claims: [{ id: 'claim-a', attribute: 'rejection rate', kind: 'fact', state: 'established', level: 'reported', value: { type: 'quantity', amount: '2.6', unit: 'percent', dimension: 'share' }, as_of: '2026-10-20', statements: ['mention-a'] }],
    statements: [{ id: 'mention-a', speaker: 'State Board', status: 'live', quote, span: { text: textHash, start, end: start + Array.from(QUOTE).length }, claims: ['claim-a'], as_of: '2026-10-20' }],
    sources: [{ artifact: 'artifact-a', source: null, published_at: '2026-10-21', statements: 1 }], related: [],
  };
  const viewBytes = canonical(view);
  const body = { format: 'sai-news-view/1', head: { seq: 1, sha: 'sha256:x' }, evaluated_at: view.evaluated_at, policies: 'p', views: { 'subject-a': { path: `views/${sha256('subject-a').slice(0, 24)}.json`, sha256: sha256(viewBytes) } }, texts: { [textHash]: `texts/${textHash}.txt` } };
  const id = sha256(canonical(body)).slice(0, 24);
  const folder = join(source, 'snapshots', id);
  mkdirSync(join(folder, 'views'), { recursive: true });
  mkdirSync(join(folder, 'texts'), { recursive: true });
  writeFileSync(join(folder, body.views['subject-a'].path), viewBytes);
  writeFileSync(join(folder, `texts/${textHash}.txt`), text);
  writeFileSync(join(folder, 'manifest.json'), canonical({ id, ...body }));
  writeFileSync(join(source, 'CURRENT'), `${id}\n`);
  return id;
}

test('a pull copies the current snapshot, checks it whole, flips CURRENT and drops older snapshots', (t) => {
  const source = temp(t, 'v2-source-');
  const destination = temp(t, 'v2-site-');
  const first = snapshot(source);
  assert.deepEqual(pullV2({ source, destination }), { source, snapshot: first, views: 1 });
  const second = snapshot(source, { label: 'Ballot rejections, updated' });
  pullV2({ source, destination });
  assert.equal(readFileSync(join(destination, 'CURRENT'), 'utf8').trim(), second);
  assert.deepEqual(readdirSync(join(destination, 'snapshots')), [second]);
  assert.equal(readV2(destination).views.get('subject-a').label, 'Ballot rejections, updated');
  assert.deepEqual(pullV2({ destination }), { source: 'committed', snapshot: second, views: 1 });
});

test('spans count code points, so a quote after an emoji still lands on its text', (t) => {
  const source = temp(t, 'v2-source-');
  snapshot(source);
  assert.equal(readV2(source).views.get('subject-a').statements[0].quote, QUOTE);
});

test('a bad snapshot is refused and the site keeps the snapshot it had', (t) => {
  const destination = temp(t, 'v2-site-');
  const good = temp(t, 'v2-source-');
  const kept = snapshot(good);
  pullV2({ source: good, destination });
  for (const [options, message] of [[{ label: 'b1', text: TEXT.replace('2.6', '9.9') }, /text hash mismatch/], [{ label: 'b2', quote: 'Counties rejected 9.9% of ballots.' }, /quote is not at its span/]]) {
    const source = temp(t, 'v2-bad-');
    snapshot(source, options);
    assert.throws(() => pullV2({ source, destination }), message);
    assert.equal(readFileSync(join(destination, 'CURRENT'), 'utf8').trim(), kept);
    assert.deepEqual(readdirSync(join(destination, 'snapshots')), [kept]);
  }
  const forged = temp(t, 'v2-forged-');
  const id = snapshot(forged, { label: 'b3' });
  const manifestPath = join(forged, 'snapshots', id, 'manifest.json');
  writeFileSync(manifestPath, readFileSync(manifestPath, 'utf8').replace('"seq":1', '"seq":2'));
  assert.throws(() => pullV2({ source: forged, destination }), /does not hash to its id/);
});

test('a v2 story names subjects the snapshot holds, and its route maps to the v1 view it replaces', (t) => {
  const destination = temp(t, 'v2-site-');
  const source = temp(t, 'v2-source-');
  snapshot(source);
  pullV2({ source, destination });
  const manifests = temp(t, 'v2-manifests-');
  const route = '/events/ballots/2026-10-21-counties-reject-ballots/';
  writeFileSync(join(manifests, 'a.json'), JSON.stringify({ story: route, v2_subjects: ['subject-a'] }));
  assert.equal(v2Story(route, destination, manifests).views[0].claims[0].id, 'claim-a');
  assert.equal(v1EventId(route), 'event-ballots-2026-10-21-counties-reject-ballots');
  writeFileSync(join(manifests, 'a.json'), JSON.stringify({ story: route, v2_subjects: ['subject-b'] }));
  assert.throws(() => v2Story(route, destination, manifests), /no view for subject-b/);
  writeFileSync(join(manifests, 'a.json'), JSON.stringify({ story: route, v2_subjects: ['subject-a'], state_event_id: 'event-x' }));
  assert.throws(() => v2Story(route, destination, manifests), /either v1 state or v2 subjects/);
});

test('the v1 pull leaves out the story and chain views of v2 stories', (t) => {
  const source = temp(t, 'v1-source-');
  const destination = temp(t, 'v1-site-');
  const manifests = temp(t, 'v1-manifests-');
  const route = '/events/ballots/2026-10-21-counties-reject-ballots/';
  writeFileSync(join(manifests, 'a.json'), JSON.stringify({ story: route, v2_subjects: ['subject-a'] }));
  for (const id of ['event-kept', v1EventId(route)]) {
    const event = { id, label: id, period: '2026-10', status: 'published' };
    writeFileSync(join(source, `${id}.json`), JSON.stringify({ event, status: 'published', root_id: id, edges: [], evidence: [] }));
    writeFileSync(join(source, `chain-${id}.json`), JSON.stringify({ id, root: event, events: [{ ...event, slots: [] }], outlet_count: 1, tracked: [] }));
  }
  assert.equal(pullState({ source, destination, manifests }).events, 1);
  assert.deepEqual(readdirSync(destination).sort(), ['chain-event-kept.json', 'event-kept.json']);
  writeFileSync(join(destination, `${v1EventId(route)}.json`), '{}');
  assert.throws(() => pullState({ source: join(source, 'absent'), destination, manifests }), /Committed v1 views remain for v2 stories/);
});

test('the committed snapshot written by the sai-core renderer reads and checks in the site', () => {
  const committed = join(process.cwd(), 'data/v2');
  if (!existsSync(join(committed, 'CURRENT'))) assert.fail('data/v2 has no committed snapshot');
  const { views } = readV2(committed);
  assert.ok(views.size >= 1);
});
