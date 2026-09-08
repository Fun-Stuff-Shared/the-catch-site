import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readState, selectPublishedState, readPublishedState, frontChains, deskEvents, citedDocuments } from '../src/lib/state.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'catch-state-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (name, value) => writeFileSync(join(root, `${name}.json`), JSON.stringify(value));
  const event = { id: 'event-a', label: 'Report', period: '2026-07', status: 'published' };
  const view = { event, status: 'published', root_id: event.id, desk: 'Economy', edges: [], evidence: [] };
  const sync = () => {
    write(event.id, view);
    const slots = Object.entries(view.current_state ?? {}).map(([slot_id, slot]) => ({slot_id, name: slot.slot, value: slot.figure?.value ?? null, unit: slot.figure?.unit ?? null, sentence: slot.quote_span ?? null, occurrence_id: slot.occurrence_id ?? null}));
    write(`chain-${event.id}`, { id: event.id, root: event, events: [{...event, slots}], outlet_count: 1, tracked: [] });
  };
  sync();
  return { root, write, view, event, sync };
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
  source.sync();
  pullState({ source: source.root, destination: destination.root });
  assert.equal(readState(destination.root).events.get('event-a').event.label, 'Changed report title');
  source.view.root_id = 'event-missing';
  source.write('event-a', source.view);
  assert.throws(() => pullState({ source: source.root, destination: destination.root }), /Missing chain/);
  assert.equal(readState(destination.root).events.get('event-a').event.root_id, undefined);
  assert.equal(readState(destination.root).events.get('event-a').root_id, 'event-a');
});

import { buildStateRecords } from './build-state-records.mjs';
import { createHash } from 'node:crypto';
test('a cited document is pinned from verified text and a changed body refuses publication', (t) => {
  const { root, write, view } = fixture(t);
  const text = 'The original report text.';
  const source = join(root, 'document.txt');
  writeFileSync(source, text);
  view.evidence = [{ id: 'doc', source_kind: 'document', title: 'Report', publisher: 'Agency', url: 'https://example.com/report', text_path: source, text_sha256: createHash('sha256').update(text).digest('hex') }];
  view.edges = [{ id: 'cite', label: 'cites', to_evidence_id: 'doc', role: 'primary_record' }];
  write('event-a', view);
  const rows = buildStateRecords(readState(root), root);
  assert.equal(rows[0].quote, text);
  delete view.evidence[0].title;
  write('event-a', view);
  assert.equal(buildStateRecords(readState(root), root)[0].title, 'https://example.com/report');
  writeFileSync(source, 'Different text');
  assert.throws(() => buildStateRecords(readState(root), root), /hash mismatch/);
});

test('a displayed figure must match an accepted occurrence and its evidence', (t) => {
  const { root, write, view, sync } = fixture(t);
  view.evidence = [{ id: 'doc', accepted: true }];
  view.occurrences = [{ id: 'o', evidence_id: 'doc', figure: { value: '105000', unit: 'jobs' }, accepted: true }];
  view.current_state = { payroll: { occurrence_id: 'o', figure: { value: '105000', unit: 'jobs' } } };
  sync();
  readState(root);
  view.current_state.payroll.figure.value = '120000';
  write('event-a', view);
  assert.throws(() => readState(root), /no matching accepted occurrence/);
  view.current_state.payroll.figure.value = '105000';
  view.evidence[0].accepted = false;
  write('event-a', view);
  assert.throws(() => readState(root), /no matching accepted occurrence/);
});

test('a stale chain label is rejected even when IDs and status agree', (t) => {
  const { root, write, view } = fixture(t);
  view.event.label = 'Changed title';
  write('event-a', view);
  assert.throws(() => readState(root), /Chain root differs/);
});

test('document records show the cited passage even when it occurs beyond the opening', (t) => {
  const { root, write, view } = fixture(t);
  const quote = 'The revised estimate is 105,000 jobs.';
  const text = 'Cover information. '.repeat(150) + quote;
  const source = join(root, 'source.txt');
  writeFileSync(source, text);
  view.evidence = [{id:'doc', source_kind:'document', title:'Report', publisher:'Agency', url:'https://example.com/report',text_path:source,text_sha256:createHash('sha256').update(text).digest('hex')}];
  view.occurrences = [{id:'o', evidence_id:'doc', quote_span:quote}];
  view.edges = [{id:'cite', label:'cites',to_evidence_id:'doc',role:'primary_record'}];
  write('event-a',view);
  const [record] = buildStateRecords(readState(root), root);
  assert.equal(record.excerpt_kind, 'cited_passages');
  assert.equal(record.quote, quote);
  assert.equal(record.passages[0].occurrence_id,'o');
});

import { checkPageFigures } from './check-state-pages.mjs';
test('the rendered figure text is checked, not just its data attributes', () => {
  const state = {events:new Map([['event-a',{event:{id:'event-a'},status:'published',evidence:[{id:'doc'}],occurrences:[{id:'o',evidence_id:'doc',figure:{value:'105000',unit:'jobs'}}]}]])};
  const html='<strong data-state-figure="o" data-figure-value="105000" data-figure-unit="jobs">105,000 jobs</strong>';
  assert.equal(checkPageFigures(html,state,'event-a').length,1);
  assert.throws(()=>checkPageFigures(html.replace('>105,000 jobs','>120000 jobs'),state,'event-a'),/Visible figure differs/);
});

test('pinned evidence identifiers remain stable document record identifiers', (t) => {
  const {root, write, view} = fixture(t);
  const text = 'Original record.';
  const source = join(root, 'document.txt');
  writeFileSync(source, text);
  view.evidence = [{id:'pin-v2:abc123', source_kind:'document', title:'Report', publisher:'Agency', url:'https://example.com/report', text_path:source, text_sha256:createHash('sha256').update(text).digest('hex')}];
  view.edges = [{id:'cite', label:'cites',to_evidence_id:'pin-v2:abc123',role:'reference'}];
  write('event-a',view);
  const [record] = buildStateRecords(readState(root), root);
  assert.equal(record.id, 'pin-v2:abc123');
  assert.equal(record.pinned_path, 'data/sources/news-state/pin-v2:abc123.txt');
});

import { checkTimeline } from './check-state-pages.mjs';
test('confirmation quotes and sources cannot disappear from the rendered evidence', () => {
  const timeline = {confirmations:[{sentence:'Confirmed.', reports:[{url:'https://example.com/report'}], quotes:[{text:'The recorded quote.', reports:[{url:'https://example.com/quote'}]}]}], changes:[]};
  const html='<section class="revision-timeline"><li data-revision-confirmation>Confirmed. <a href="https://example.com/report">Report</a><li data-revision-quote>The recorded quote. <a href="https://example.com/quote">Quote</a></li></li><p data-revision-no-changes>No changes are recorded in this view. The first check of this story\'s sources has not run yet.</p></section>';
  const valid = html.replace('<li data-revision-quote>', '<ul><li data-revision-quote>').replace('</li></li>', '</li></ul></li>');
  checkTimeline(valid,timeline);
  assert.throws(()=>checkTimeline(valid.replace('data-revision-quote','missing-quote'),timeline),/quote count/);
  assert.throws(()=>checkTimeline(valid.replace('/quote','/wrong'),timeline),/quote source/);
  assert.throws(()=>checkTimeline(valid.replace('The recorded quote.','Wrong quote.'),timeline),/quote text/);
});

test('retired-only chains do not enter the home feature', () => {
  assert.equal(frontChains({chains:new Map([['a',{id:'a',events:[{status:'retired'}],outlet_count:2}]])}).length,0);
});

test('malformed revision check dates cannot be published', () => {
  for (const date of ['garbage','2026-99-99','2026-02-30']) assert.throws(()=>checkTimeline('',{changes_checked_at:date}),/check date is invalid/);
});


test('copy checks separate quoted state wording from authored and interface copy', async () => {
  const { readerCopy } = await import('./check-state-pages.mjs');
  const html = '<head><title>A pipeline — news</title></head><body><h1>A pipeline — news</h1><p data-source-copy>Eligibility rules changed in the second wave.</p><section data-layer="narrative">Authored — copy</section><h2>Internal pipeline</h2><script>hidden</script></body>';
  assert.equal(readerCopy(html), 'A pipeline — news Authored — copy Internal pipeline');
  assert.equal(readerCopy('<p>Visible &mdash; punctuation</p>'), 'Visible — punctuation');
  assert.equal(readerCopy('<p data-source-copy="false">Source wording</p><p>Keep this</p>'), 'Keep this');
});


test('comparison and timeline quotes do not exempt surrounding copy', async () => {
  const { readerCopy } = await import('./check-state-pages.mjs');
  const html = '<p data-state-comparison>Payroll change: 4 jobs previously; 5 jobs in this story. <span data-source-copy>Employment rose — the source says.</span></p><p>New slot: first tracked in this story. <span data-source-copy>An automated pipeline updated.</span></p><li data-state-transition><span data-source-copy>The record reported “a second wave”.</span> <a>Earlier report</a>; <a>Later report</a>.</li>';
  assert.equal(readerCopy(html), 'Payroll change: 4 jobs previously; 5 jobs in this story. New slot: first tracked in this story. Earlier report ; Later report .');
});


test('timeline segmentation exempts exact quoted spans, keeping generated framing', async () => {
  const { quotedSegments } = await import('../src/lib/quoted-text.mjs');
  const sentence = 'On Monday, the office reported “Jobs rose — including “temporary” work”; on Tuesday it reported “Jobs fell”.';
  const parts = quotedSegments(sentence, ['Jobs rose — including “temporary” work', 'Jobs fell']);
  assert.equal(parts.map((part) => part.text).join(''), sentence);
  assert.equal(parts.filter((part) => !part.source).map((part) => part.text).join(''), 'On Monday, the office reported ; on Tuesday it reported .');
  assert.deepEqual(quotedSegments('Generated — prose', ['different quote']), [{text:'Generated — prose',source:false}]);
});


test('figure display preserves digits and avoids duplicate percent units', async () => {
  const { figureText } = await import('../src/lib/state.mjs');
  assert.equal(figureText(-23000, 'jobs'), '-23,000 jobs');
  assert.equal(figureText('9007199254740993', 'jobs'), '9,007,199,254,740,993 jobs');
  assert.equal(figureText('3.800', 'percent'), '3.800 percent');
  assert.equal(figureText('3.8%', 'percent'), '3.8%');
  assert.equal(figureText('3.5% to 3.75%', 'percent'), '3.5% to 3.75%');
  assert.equal(figureText('0.25', 'percentage point'), '0.25 percentage point');
});

test('backend acceptance does not publish an event, descendant, figure or cited record', (t) => {
  const { root, view, event, write } = fixture(t);
  const child = { id: 'event-private', label: 'Unselected forecast', status: 'published', period: '2051-12', follows: event.id };
  write(child.id, {event: child, status: 'published', root_id: event.id, follows: event.id, evidence: [{id:'private-doc', publisher:'Private source', source_kind:'document'}], edges:[{label:'cites',to_evidence_id:'private-doc',role:'reference'}]});
  write(`chain-${event.id}`, { id:event.id, root:event, events:[{...event,slots:[]},{...child,slots:[]}], outlet_count:20, tracked:[] });
  const raw = readState(root);
  const selected = selectPublishedState(raw, [event.id]);
  assert.deepEqual([...selected.events.keys()], [event.id]);
  assert.deepEqual(selected.chains.get(event.id).events.map((row)=>row.id), [event.id]);
  assert.equal(selected.chains.get(event.id).outlet_count, 0);
  assert.deepEqual(citedDocuments(selected), []);
  assert.equal(raw.events.size, 2);
  assert.throws(()=>selectPublishedState(raw,[child.id]), /unpublished chain root/);
});

test('only an explicit matching publication manifest admits a state event', (t) => {
  const { root, event } = fixture(t);
  const manifests = mkdtempSync(join(tmpdir(), 'catch-manifests-'));
  t.after(()=>rmSync(manifests,{recursive:true,force:true}));
  writeFileSync(join(manifests,'candidate.json'),JSON.stringify({event:event.id}));
  assert.equal(readPublishedState(root, manifests).events.size,0);
  writeFileSync(join(manifests,'story.json'),JSON.stringify({state_event_id:event.id,event:event.id}));
  assert.equal(readPublishedState(root, manifests).events.size,1);
  writeFileSync(join(manifests,'story.json'),JSON.stringify({state_event_id:event.id,event:'wrong'}));
  assert.throws(()=>readPublishedState(root, manifests),/route differs/);
});

import { checkAuthoredSections } from './check-state-pages.mjs';
test('publication refuses retired stories despite an existing manifest', (t) => {
  const {root, view, event, sync} = fixture(t);
  view.status = event.status = 'retired'; sync();
  assert.throws(() => selectPublishedState(readState(root), [event.id]), /retired event/);
});
test('headline and dek cannot replace an authored story body', () => {
  const html = '<main class="story"><h1>Report</h1><p>Introduction.</p><section id="what-happened"><h2>The decision</h2><p>The board held its rate.</p></section></main>';
  checkAuthoredSections(html, ['what-happened']);
  assert.throws(() => checkAuthoredSections('<main><h1>Report</h1><p>Introduction.</p></main>', ['what-happened']), /body is missing/);
  assert.throws(() => checkAuthoredSections(html.replace('<p>The board held its rate.</p>', ''), ['what-happened']), /missing or empty/);
});


test('selected retired roots retain only stub navigation and never comparisons or figures', (t) => {
  const {root, event, view, write, sync} = fixture(t);
  event.status = view.status = 'retired';
  event.reason = view.reason = 'Record ended.';
  sync();
  const child = {id:'event-child', label:'Later report', period:'2026-08', status:'published', follows:event.id};
  write(child.id, {event:child,status:'published',root_id:event.id,follows:event.id,changed_since_previous:[{value:3}]});
  write(`chain-${event.id}`, {id:event.id,root:event,events:[{...event,slots:[]},{...child,slots:[]}],tracked:[],outlet_count:1});
  const selected = selectPublishedState(readState(root), [event.id,child.id]);
  assert.equal(selected.events.get(event.id).reason, 'Record ended.');
  assert.deepEqual(selected.events.get(event.id).selected_children, [child]);
  assert.equal(selected.events.get(child.id).follows,null);
  assert.deepEqual(selected.events.get(child.id).changed_since_previous,[]);
  assert.throws(()=>selectPublishedState(readState(root), [event.id]), /retired event/);
});

test('computed figures require each input source in the reader view', (t) => {
  const { root, view, sync } = fixture(t);
  view.evidence = [{id: 'a'}, {id: 'b'}];
  const figure = {kind: 'computed', value: '3', unit: 'items', formula: 'sum', inputs: [
    {evidence_id: 'a', value: '1', quote_span: 'One item'},
    {evidence_id: 'b', value: '2', quote_span: 'Two items'},
  ]};
  view.occurrences = [{id: 'sum', evidence_id: 'a', figure}];
  view.current_state = {slot: {slot: 'sum', figure, occurrence_id: 'sum'}};
  sync();
  assert.equal(readState(root).events.get('event-a').current_state.slot.figure.kind, 'computed');
  view.evidence.pop();
  sync();
  assert.throws(() => readState(root), /provenance is incomplete/);
});
