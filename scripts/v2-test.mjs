import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { copyFileSync, cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { readV2, v1EventId, v2Story, valueText } from '../src/lib/v2.mjs';
import { fetchPinned, pullV2 } from './pull-v2.mjs';
import { pullState } from './pull-state.mjs';

const sha256 = (data) => createHash('sha256').update(data).digest('hex');
const TEXT = 'Intro 🗳️ then: Counties rejected 2.6% of ballots.';
const QUOTE = 'Counties rejected 2.6% of ballots.';
const STORY = 'ballots--2026-10-21-counties-reject-ballots';

function temp(t, prefix) {
  const root = mkdtempSync(join(tmpdir(), prefix));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
}

function snapshot(source, { label = 'Ballot rejections', quote = QUOTE, text = TEXT, subject = 'subject-a', span = undefined, stories = undefined, sourceAttributes = {}, format = 'sai-news-view/5', related = [], claim = {}, statementClaims = ['claim-a'], status = 'live' } = {}) {
  const textHash = sha256(TEXT);
  const start = Array.from(TEXT).indexOf('C');
  const view = {
    format, id: subject, kind: 'development', label,
    claims: [{ id: 'claim-a', attribute: 'rejection rate', kind: 'fact', state: 'established', level: 'reported', value: { type: 'quantity', amount: '2.6', unit: 'percent', dimension: 'share' }, as_of: '2026-10-20', statements: ['mention-a'], independent: 1, heads: ['mention-a'], basis: ['mention-a'], transitions: [{ kind: 'first_value', mention: 'mention-a', as_of: '2026-10-20' }], merged: [], ...claim }],
    statements: [{ id: 'mention-a', speaker: 'State Board', status, quote, span: span === undefined ? { text: textHash, start, end: start + Array.from(QUOTE).length } : span, claims: statementClaims, as_of: '2026-10-20' }],
    sources: [{ artifact: 'artifact-a', source: null, root: 'root-a', published_at: '2026-10-21', statements: 1, attributes: sourceAttributes }], related,
  };
  const viewBytes = JSON.stringify(view);
  const manifest = JSON.stringify({ format, head: { seq: 1, sha: 'sha256:x' }, evaluated_at: '2026-11-02T00:00:00Z', policies: 'p', stories: stories === undefined ? { [STORY]: [subject] } : stories, views: { [subject]: { path: `views/${sha256(subject).slice(0, 24)}.json`, sha256: sha256(viewBytes) } }, texts: { [textHash]: `texts/${textHash}.txt` } });
  const id = sha256(manifest).slice(0, 24);
  const folder = join(source, 'snapshots', id);
  mkdirSync(join(folder, 'views'), { recursive: true });
  mkdirSync(join(folder, 'texts'), { recursive: true });
  writeFileSync(join(folder, 'views', `${sha256(subject).slice(0, 24)}.json`), viewBytes);
  writeFileSync(join(folder, `texts/${textHash}.txt`), text);
  writeFileSync(join(folder, 'manifest.json'), manifest);
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
  assert.deepEqual(pullV2({ destination }), { source: 'pinned', snapshot: second, views: 1 });
});

test('spans count code points, so a quote after an emoji still lands on its text', (t) => {
  const source = temp(t, 'v2-source-');
  snapshot(source);
  assert.equal(readV2(source).views.get('subject-a').statements[0].quote, QUOTE);
});

test('subject ids outside the basic plane do not disturb the snapshot id, which hashes manifest bytes', (t) => {
  for (const subject of ['\uE000-subject', '\u{10000}-subject']) {
    const source = temp(t, 'v2-source-');
    const destination = temp(t, 'v2-site-');
    const id = snapshot(source, { subject });
    assert.equal(pullV2({ source, destination }).snapshot, id);
    assert.ok(readV2(destination).views.has(subject));
  }
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
  const unanchored = temp(t, 'v2-unanchored-');
  snapshot(unanchored, { label: 'b4', span: null });
  assert.throws(() => pullV2({ source: unanchored, destination }), /has no text span: mention-a/);
  assert.equal(readFileSync(join(destination, 'CURRENT'), 'utf8').trim(), kept);
  assert.deepEqual(readdirSync(join(destination, 'snapshots')), [kept]);
});

test('a v2 story takes its subjects from its manifest, and its route maps to the v1 view it replaces', (t) => {
  const destination = temp(t, 'v2-site-');
  const source = temp(t, 'v2-source-');
  snapshot(source);
  pullV2({ source, destination });
  const manifests = temp(t, 'v2-manifests-');
  const route = '/events/ballots/2026-10-21-counties-reject-ballots/';
  writeFileSync(join(manifests, `${STORY}.json`), JSON.stringify({ story: route, v2: true, v2_subjects: ['subject-a'] }));
  assert.equal(v2Story(route, destination, manifests).views[0].claims[0].id, 'claim-a');
  assert.equal(v1EventId(route), 'event-ballots-2026-10-21-counties-reject-ballots');
  rmSync(join(manifests, `${STORY}.json`));
  writeFileSync(join(manifests, 'other--2026-10-21-elsewhere.json'), JSON.stringify({ story: route, v2: true }));
  assert.throws(() => v2Story(route, destination, manifests), /v2_subjects must list its subjects/);
  writeFileSync(join(manifests, 'other--2026-10-21-elsewhere.json'), JSON.stringify({ story: route, v2: true, v2_subjects: ['subject-gone'] }));
  assert.throws(() => v2Story(route, destination, manifests), /lacks subjects of story other--2026-10-21-elsewhere: subject-gone/);
  writeFileSync(join(manifests, 'other--2026-10-21-elsewhere.json'), JSON.stringify({ story: route, v2: true, state_event_id: 'event-x' }));
  assert.throws(() => v2Story(route, destination, manifests), /either v1 state or v2/);
  writeFileSync(join(manifests, 'other--2026-10-21-elsewhere.json'), JSON.stringify({ story: route, v2: ['subject-a'] }));
  assert.throws(() => v2Story(route, destination, manifests), /v2 must be true/);
});

test('a snapshot whose story index leaves a view out, repeats a subject within a story or invents one is refused', (t) => {
  for (const [stories, message] of [[{}, /view is under no story: subject-a/], [{ a: ['subject-a', 'subject-a'] }, /lists a subject twice: a/], [{ a: ['subject-a', 'subject-b'] }, /lacks: a subject-b/], [{ a: [] }, /lists no subjects: a/], [null, /no story index/]]) {
    const source = temp(t, 'v2-stories-');
    snapshot(source, { stories });
    assert.throws(() => readV2(source), message);
  }
});

test('a view holds its claims whole: statements name only held claims, heads and basis are among the claim\'s statements, and merged names only folded ids', (t) => {
  const ok = temp(t, 'v2-claims-');
  snapshot(ok, { claim: { merged: ['claim-folded'] } });
  assert.deepEqual(readV2(ok).views.get('subject-a').claims[0].merged, ['claim-folded']);
  for (const [options, message] of [
    [{ statementClaims: ['claim-a', 'claim-folded'] }, /statement names a claim the view does not hold: mention-a/],
    [{ claim: { heads: ['mention-b'] } }, /heads or basis are not among its statements: claim-a/],
    [{ claim: { basis: ['mention-x'] } }, /heads or basis are not among its statements: claim-a/],
    [{ claim: { merged: ['claim-a'] } }, /merged claims are not folded ids: claim-a/],
    [{ claim: { merged: undefined } }, /merged claims are not folded ids: claim-a/],
    [{ claim: { statements: [], heads: [], basis: [] } }, /statements are not the live statements that name it: claim-a/],
    [{ statementClaims: [], claim: { heads: [], basis: [] } }, /statements are not the live statements that name it: claim-a/],
    [{ status: 'withdrawn', claim: { heads: [], basis: [] } }, /statements are not the live statements that name it: claim-a/],
    [{ claim: { statements: ['mention-a', 'mention-a'] } }, /statements are not the live statements that name it: claim-a/],
  ]) {
    const source = temp(t, 'v2-claims-bad-');
    snapshot(source, options);
    assert.throws(() => readV2(source), message);
    assert.throws(() => pullV2({ source, destination: temp(t, 'v2-claims-site-') }), message);
  }
  const withdrawn = temp(t, 'v2-claims-withdrawn-');
  snapshot(withdrawn, { status: 'withdrawn', claim: { statements: [], heads: [], basis: [] } });
  assert.deepEqual(readV2(withdrawn).views.get('subject-a').claims[0].statements, []);
});

test('a development may be indexed under several stories', (t) => {
  const source = temp(t, 'v2-stories-');
  snapshot(source, { stories: { a: ['subject-a'], b: ['subject-a'] } });
  assert.deepEqual(readV2(source).manifest.stories, { a: ['subject-a'], b: ['subject-a'] });
});

test('only format 5 reads, and its related ops are (op, target, other) triples', (t) => {
  const ok = temp(t, 'v2-related-');
  snapshot(ok, { related: [['merge', 'subject-a', 'subject-b'], ['restore', 'subject-a', 'subject-b']] });
  assert.equal(readV2(ok).views.get('subject-a').related.length, 2);
  for (const [options, message] of [[{ format: 'sai-news-view/4' }, /Unknown v2 snapshot format: sai-news-view\/4/], [{ related: [['merge', 'subject-a']] }, /related is not a list of \(op, target, other\)/], [{ related: [{ op: 'merge' }] }, /related is not/], [{ related: null }, /related is not/], [{ related: [['merge', '', 'subject-b']] }, /related is not/]]) {
    const source = temp(t, 'v2-related-bad-');
    snapshot(source, options);
    assert.throws(() => readV2(source), message);
  }
});

test('the v1 pull leaves out the story and chain views of v2 stories and the v1 events published under them', (t) => {
  const source = temp(t, 'v1-source-');
  const destination = temp(t, 'v1-site-');
  const manifests = temp(t, 'v1-manifests-');
  const route = '/events/ballots/2026-10-21-counties-reject-ballots/';
  writeFileSync(join(manifests, `${STORY}.json`), JSON.stringify({ story: route, v2: true, v2_subjects: ['subject-a'] }));
  for (const id of ['event-kept', v1EventId(route)]) {
    const event = { id, label: id, period: '2026-10', status: 'published' };
    writeFileSync(join(source, `${id}.json`), JSON.stringify({ event, status: 'published', root_id: id, edges: [], evidence: [] }));
    writeFileSync(join(source, `chain-${id}.json`), JSON.stringify({ id, root: event, events: [{ ...event, slots: [] }], outlet_count: 1, tracked: [] }));
  }
  const later = (id, extra) => writeFileSync(join(source, `${id}.json`), JSON.stringify({ event: { id, label: id, period: '2026-10', status: 'published' }, status: 'published', root_id: v1EventId(route), edges: [], evidence: [], ...extra }));
  later('event-under-v2');
  later('event-after-it', { root_id: 'event-elsewhere', follows: 'event-under-v2' });
  writeFileSync(join(source, 'event-folded.json'), JSON.stringify({ event: { id: 'event-folded', label: 'event-folded', period: '2026-10', status: 'merged' }, status: 'merged', survivor: 'event-under-v2', edges: [], evidence: [] }));
  assert.equal(pullState({ source, destination, manifests }).events, 1);
  assert.deepEqual(readdirSync(destination).sort(), ['chain-event-kept.json', 'event-kept.json']);
  const under = ['event-after-it.json', 'event-folded.json', 'event-under-v2.json'];
  for (const name of under) copyFileSync(join(source, name), join(destination, name));
  assert.throws(() => pullState({ source: join(source, 'absent'), destination, manifests }), (error) => under.every((name) => error.message.includes(name)));
  for (const name of under) rmSync(join(destination, name));
  writeFileSync(join(destination, `${v1EventId(route)}.json`), '{}');
  assert.throws(() => pullState({ source: join(source, 'absent'), destination, manifests }), /Committed v1 views remain for v2 stories/);
});

test('a snapshot written by the sai-core renderer reads and checks in the site', () => {
  const { views } = readV2(join(process.cwd(), 'scripts/fixtures/v2-rendered'));
  assert.ok(views.size >= 1);
});

function pageSite(t, id, dist) {
  const write = (path, html) => { mkdirSync(join(dist, path), { recursive: true }); writeFileSync(join(dist, path, 'index.html'), html); };
  const statementHtml = `<li data-v2-statement="mention-a"><blockquote>${QUOTE}</blockquote></li>`;
  return {
    write, statementHtml,
    story: (subject, home, { shown = subject, extra = '', statements = statementHtml, link = home.claim({ id: 'claim-a' }) } = {}) => `<details data-v2-snapshot="${id}"><section data-v2-subject="${shown}"><section data-v2-attribute="rejection rate"><article data-v2-claim="claim-a">${statements}<a data-v2-claim-link="claim-a" href="${link}">1 statement</a></article></section>${extra}<a data-v2-claims-link href="${home.claims}">All</a><li data-v2-source="artifact-a">root-a</li></section></details>`,
    claimsPage: (subject, claims = '<article data-v2-claim="claim-a"></article>') => `<main data-v2-claims-page="${id}" data-v2-subject="${subject}"><section data-v2-attribute="rejection rate">${claims}</section></main>`,
    homePage: (subject) => `<main data-v2-development="${subject}"></main>`,
    claimPage: (subject, statements = statementHtml) => `<main data-v2-claim-page="${id}" data-v2-subject="${subject}" data-v2-claim="claim-a">${statements}</main>`,
  };
}

test('a subject id with a space reads, maps to its story and passes the page check at its home', async (t) => {
  const { checkV2Pages } = await import('./check-v2-pages.mjs');
  const { subjectPaths } = await import('../src/lib/v2-brief.mjs');
  const subject = 'development-ncse absentee-ballot guidance';
  const destination = temp(t, 'v2-site-');
  const source = temp(t, 'v2-source-');
  const id = snapshot(source, { subject });
  pullV2({ source, destination });
  const manifests = temp(t, 'v2-manifests-');
  const route = '/events/ballots/2026-10-21-counties-reject-ballots/';
  writeFileSync(join(manifests, `${STORY}.json`), JSON.stringify({ story: route, v2: true, v2_subjects: [subject] }));
  assert.equal(v2Story(route, destination, manifests).views[0].id, subject);
  const home = subjectPaths(subject);
  assert.match(home.claims, /^\/developments\/development-ncse-absentee-ballot-guidance-[0-9a-f]{8}\/claims\/$/);
  const dist = temp(t, 'v2-dist-');
  const site = pageSite(t, id, dist);
  site.write(route, site.story(subject, home));
  site.write(home.claims, site.claimsPage(subject));
  site.write(home.claim({ id: 'claim-a' }), site.claimPage(subject));
  const passed = checkV2Pages(dist, destination, manifests);
  assert.deepEqual(passed.failures, []);
  assert.deepEqual(passed.checked, [route]);
  assert.equal(passed.report[0].sourceFallbacks, 0);
  site.write(route, site.story(subject, home, { shown: 'development-ncse' }));
  assert.match(checkV2Pages(dist, destination, manifests).failures[0], /renders subjects development-ncse, snapshot names development-ncse absentee-ballot guidance/);
  site.write(route, site.story(subject, home, { extra: `<p>${'x'.repeat(41 * 1024)}</p>` }));
  assert.match(checkV2Pages(dist, destination, manifests).failures[0], /v2 section is \d+ bytes, budget 40960/);
  site.write(route, site.story(subject, home, { statements: site.statementHtml + site.statementHtml.replace('mention-a', 'mention-x') }));
  assert.match(checkV2Pages(dist, destination, manifests).failures[0], /renders statements mention-a,mention-x, expected mention-a/);
  site.write(route, site.story(subject, home, { link: `${route}claims/claim-a/` }));
  assert.match(checkV2Pages(dist, destination, manifests).failures[0], /brief links claims to \/events\/.*claims\/claim-a\/, their homes are \/developments\//);
  site.write(route, site.story(subject, home));
  site.write(home.claims, site.claimsPage(subject, '<article data-v2-claim="claim-a"></article><article data-v2-claim="claim-z"></article>'));
  assert.match(checkV2Pages(dist, destination, manifests).failures[0], /lists claims 2, expected 1/);
  site.write(home.claims, site.claimsPage(subject));
  site.write(home.claim({ id: 'claim-a' }), site.claimPage(subject, ''));
  assert.match(checkV2Pages(dist, destination, manifests).failures[0], /claims\/claim-a\/: statement mention-a not rendered/);
});

test('a subject listed under two stories has one set of claim pages, at its home, and both briefs link there', async (t) => {
  const { checkV2Pages } = await import('./check-v2-pages.mjs');
  const { subjectPaths } = await import('../src/lib/v2-brief.mjs');
  const { subjectHomes } = await import('../src/lib/v2.mjs');
  const subject = 'subject-a';
  const other = 'ballots--2026-10-22-counties-count-again';
  const destination = temp(t, 'v2-site-');
  const source = temp(t, 'v2-source-');
  const id = snapshot(source, { subject, stories: { [STORY]: [subject], [other]: [subject] } });
  pullV2({ source, destination });
  const manifests = temp(t, 'v2-manifests-');
  const routes = ['/events/ballots/2026-10-21-counties-reject-ballots/', '/events/ballots/2026-10-22-counties-count-again/'];
  writeFileSync(join(manifests, `${STORY}.json`), JSON.stringify({ story: routes[0], v2: true, v2_subjects: [subject] }));
  writeFileSync(join(manifests, `${other}.json`), JSON.stringify({ story: routes[1], v2: true, v2_subjects: [subject] }));
  const homes = subjectHomes(destination, manifests).homes;
  assert.deepEqual(homes.map((home) => [home.subject, home.slug, home.stories]), [[subject, subject, routes]]);
  const home = subjectPaths(subject);
  const dist = temp(t, 'v2-dist-');
  const site = pageSite(t, id, dist);
  for (const route of routes) site.write(route, site.story(subject, home));
  site.write(home.claims, site.claimsPage(subject));
  site.write(home.claim({ id: 'claim-a' }), site.claimPage(subject));
  const passed = checkV2Pages(dist, destination, manifests);
  assert.deepEqual(passed.failures, []);
  assert.deepEqual(passed.checked, routes);
  assert.deepEqual(passed.report.filter((row) => row.subject).map((row) => [row.subject, row.stories, row.claimPages]), [[subject, 2, 1]]);
  site.write(`${routes[1]}claims/claim-a/`, site.claimPage(subject));
  assert.deepEqual(checkV2Pages(dist, destination, manifests).failures, [`${routes[1]}claims/claim-a/: renders claim claim-a of ${subject}, whose one home is ${home.claim({ id: 'claim-a' })}`]);
  rmSync(join(dist, routes[1], 'claims'), { recursive: true });
  site.write(`${routes[0]}claims/`, site.claimsPage(subject));
  assert.deepEqual(checkV2Pages(dist, destination, manifests).failures, [`${routes[0]}claims/: renders the claims of ${subject}, whose one home is ${home.claims}`]);
});

test('subject homes are plain ids where they can be and otherwise readable and distinct', async () => {
  const { subjectSlug } = await import('../src/lib/v2-brief.mjs');
  assert.equal(subjectSlug('development-doj-california-voter-list-analysis'), 'development-doj-california-voter-list-analysis');
  const spaced = subjectSlug('development-ncse absentee-ballot-guidance-2026-09-04');
  assert.match(spaced, /^development-ncse-absentee-ballot-guidance-2026-09-04-[0-9a-f]{8}$/);
  assert.notEqual(subjectSlug('A b'), subjectSlug('a-b'));
  assert.notEqual(subjectSlug('a b'), subjectSlug('a_b'));
  assert.equal(subjectSlug('a b'), subjectSlug('a b'));
  assert.match(subjectSlug('\u{10000}'), /^subject-[0-9a-f]{8}$/);
});

test('the brief ranks disputed claims first, then unjudged ones, then by independent sources, then by recency, and picks one statement per root first', async () => {
  const { bestStatements, claimSlug, competingValues, rankClaims, sourceLabel } = await import('../src/lib/v2-brief.mjs');
  const claim = (id, state, independent, as_of, statements = [], heads = []) => ({ id, state, independent, as_of, statements, heads, basis: heads, transitions: [] });
  const statement = (id, artifact, as_of, value = null) => ({ id, artifact, as_of, value, claims: [], quote: id, speaker: 's', status: 'live' });
  const view = {
    claims: [claim('old-two', 'established', 2, '2026-10-01'), claim('new-one', 'established', 1, '2026-10-20'), claim('disputed', 'disputed', 1, '2026-09-01', ['m1', 'm2', 'm3'], ['m1', 'm3']), claim('new-two', 'established', 2, '2026-10-10'), claim('unjudged', 'unjudged', 3, '2026-10-30')],
    statements: [statement('m1', 'a1', '2026-09-01', { type: 'enum', value: 'open' }), statement('m2', 'a2', '2026-09-03'), statement('m3', 'a3', '2026-09-02', { type: 'enum', value: 'closed' })],
    sources: [{ artifact: 'a1', root: 'r1' }, { artifact: 'a2', root: 'r1' }, { artifact: 'a3', root: 'r2' }],
  };
  assert.deepEqual(rankClaims(view).map((c) => c.id), ['disputed', 'unjudged', 'new-two', 'old-two', 'new-one']);
  assert.deepEqual(bestStatements(view, view.claims[2]).map((s) => s.id), ['m3', 'm1']);
  assert.deepEqual(bestStatements(view, view.claims[2], 3).map((s) => s.id), ['m3', 'm1', 'm2']);
  assert.deepEqual(competingValues(view, view.claims[2]).map((s) => s.value.value), ['open', 'closed']);
  assert.equal(claimSlug('claim-6d59f6f7'), 'claim-6d59f6f7');
  assert.match(claimSlug('claim with space'), /^h-[0-9a-f]{24}$/);
  assert.deepEqual(sourceLabel({ artifact: 'artifact-a', attributes: {} }), { publisher: null, title: null, fallback: true, text: 'artifact-a' });
  assert.equal(sourceLabel({ artifact: 'artifact-a', attributes: { publisher: 'AP', title: 'Counties reject ballots' } }).text, 'AP, Counties reject ballots');
  assert.equal(sourceLabel({ artifact: 'artifact-a', attributes: { title: 'Counties reject ballots' } }).fallback, false);
});

test('claims are grouped by attribute within their priority band, in the order each group first ranks', async () => {
  const { attributeGroups, briefGroups, rankClaims } = await import('../src/lib/v2-brief.mjs');
  const claim = (id, attribute, state, independent) => ({ id, attribute, state, independent, as_of: '2026-10-01', statements: [], heads: [], basis: [], transitions: [] });
  const view = { claims: [claim('rate-settled', 'rate', 'established', 3), claim('rate-disputed', 'rate', 'disputed', 1), claim('count-unjudged', 'count', 'unjudged', 1), claim('date-two', 'date', 'established', 2), claim('rate-one', 'rate', 'established', 1)], statements: [], sources: [] };
  const shape = (groups) => groups.map(([attribute, claims]) => [attribute, claims.map((c) => c.id)]);
  assert.deepEqual(shape(attributeGroups(view)), [['rate', ['rate-disputed']], ['count', ['count-unjudged']], ['rate', ['rate-settled', 'rate-one']], ['date', ['date-two']]]);
  const band = (id) => ({ d: 2, u: 1 })[view.claims.find((c) => c.id === id).state[0]] ?? 0;
  const flat = attributeGroups(view).flatMap(([, claims]) => claims.map((c) => c.id));
  assert.deepEqual(flat.map(band), rankClaims(view).map((c) => band(c.id)));
  assert.deepEqual(shape(briefGroups(view)), shape(attributeGroups(view)));
});

test('a quantity renders as a point or as a range between its bounds', () => {
  assert.equal(valueText({ type: 'quantity', amount: '2.6', unit: 'percent', dimension: 'share' }), '2.6 percent');
  assert.equal(valueText({ type: 'quantity', amount: '3.50', upper: '3.75', unit: 'percent', dimension: 'rate' }), '3.50–3.75 percent');
  assert.equal(valueText({ type: 'forecast', outcome: { type: 'quantity', amount: '1', upper: '2', unit: 'cuts', dimension: 'n' }, horizon: { at: '2026-12-31' } }), '1–2 cuts by December 31, 2026');
});

const packedFixture = (t) => {
  const source = temp(t, 'v2-source-');
  const id = snapshot(source);
  const archive = join(temp(t, 'v2-store-'), `${id}.tgz`);
  execFileSync('tar', ['-czf', archive, '-C', join(source, 'snapshots', id), 'manifest.json', 'views', 'texts']);
  return { id, archive, store: dirname(archive) };
};

async function serve(t, store) {
  const server = createServer((request, response) => {
    const path = join(store, request.url);
    if (!existsSync(path)) { response.writeHead(404); response.end(); return; }
    response.writeHead(200); response.end(readFileSync(path));
  });
  await new Promise((done) => server.listen(0, '127.0.0.1', done));
  t.after(() => server.close());
  return `http://127.0.0.1:${server.address().port}`;
}

test('a build fetches the snapshot git pins, checks it against the pin and keeps only it', async (t) => {
  const { id, store } = packedFixture(t);
  const destination = temp(t, 'v2-site-');
  writeFileSync(join(destination, 'CURRENT'), `${id}\n`);
  mkdirSync(join(destination, 'snapshots', 'older'), { recursive: true });
  await fetchPinned({ destination, store: await serve(t, store), accessKeyId: undefined });
  assert.deepEqual(readdirSync(join(destination, 'snapshots')), [id]);
  assert.equal(readV2(destination).views.get('subject-a').label, 'Ballot rejections');
  await fetchPinned({ destination, store: 'http://127.0.0.1:1', accessKeyId: undefined });
});

test('a pin with no snapshot, an unset store or an archive of other bytes fails and leaves nothing behind', async (t) => {
  const { id, archive, store } = packedFixture(t);
  const destination = temp(t, 'v2-site-');
  writeFileSync(join(destination, 'CURRENT'), `${id}\n`);
  await assert.rejects(fetchPinned({ destination, store: undefined, accessKeyId: undefined }), /SAI_SNAPSHOTS_URL is not set/);
  const url = await serve(t, store);
  const other = temp(t, 'v2-other-');
  const otherId = snapshot(other, { label: 'Other bytes' });
  const swapped = temp(t, 'v2-swapped-');
  cpSync(join(other, 'snapshots', otherId), join(swapped, 'snapshots', id), { recursive: true });
  execFileSync('tar', ['-czf', archive, '-C', join(swapped, 'snapshots', id), 'manifest.json', 'views', 'texts']);
  await assert.rejects(fetchPinned({ destination, store: url, accessKeyId: undefined }));
  assert.deepEqual(readdirSync(join(destination, 'snapshots')), []);
  rmSync(archive);
  await assert.rejects(fetchPinned({ destination, store: url, accessKeyId: undefined }), /answered 404/);
  assert.deepEqual(readdirSync(join(destination, 'snapshots')), []);
});

test('a source is named by its site when it carries no publisher or title, and by its artifact only when it has nothing else', async () => {
  const { sourceLabel } = await import('../src/lib/v2-brief.mjs');
  assert.deepEqual(sourceLabel({ artifact: 'a1', root: 'www.foxnews.com', attributes: { custody: 'missing' } }), { publisher: 'foxnews.com', title: null, fallback: false, text: 'foxnews.com' });
  assert.equal(sourceLabel({ artifact: 'a1', root: 'www.bls.gov', attributes: { source_title: 'Employment Situation' } }).text, 'bls.gov, Employment Situation');
  assert.equal(sourceLabel({ artifact: 'a1', root: 'x.com', attributes: { publisher: 'BLS', title: 'Jobs' } }).text, 'BLS, Jobs');
  assert.deepEqual(sourceLabel({ artifact: 'a1', root: null, attributes: {} }), { publisher: null, title: null, fallback: true, text: 'a1' });
});

test('a date reads at the precision its source gave it', () => {
  assert.equal(valueText({ type: 'date', at: { at: '2027-01-01', precision: 'year' } }), '2027');
  assert.equal(valueText({ type: 'date', at: { at: '2026-10-01', precision: 'month' } }), 'October 2026');
  assert.equal(valueText({ type: 'date', at: { at: '2026-10-09', precision: 'day' } }), 'October 9, 2026');
});

test('a development publishes on three independent sources behind a claim with a value, newest first', async () => {
  const { developmentEntry, rankClaims, selectedDevelopments } = await import('../src/lib/v2-brief.mjs');
  const claim = (id, independent, state = 'established') => ({ id, attribute: 'count', state, independent, statements: [], heads: [], basis: [] });
  const view = (id, published_at, claims) => ({ id, label: id, claims, statements: [], sources: [{ artifact: id, published_at }] });
  const views = [view('older', '2026-10-01T00:00:00Z', [claim('a', 3)]), view('newer', '2026-11-01T00:00:00Z', [claim('b', 4), claim('c', 1, 'disputed')]), view('thin', '2026-11-02T00:00:00Z', [claim('d', 2)]), view('emptied', '2026-11-02T00:00:00Z', [claim('e', 9, 'empty')])];
  const selected = selectedDevelopments({ views: new Map(views.map((item) => [item.id, item])) });
  assert.deepEqual(selected.map((item) => item.id), ['newer', 'older']);
  assert.deepEqual(rankClaims(views[3]), []);
  assert.deepEqual(developmentEntry(views[1]), { href: '/developments/newer/', title: 'newer', date: '2026-11-01', summary: '2 claims from 1 source; sources differ on 1' });
});

test('with development pages on, the page gate requires a selected development to have its home and its place on the list', async (t) => {
  process.env.CATCH_DEVELOPMENTS = '1';
  t.after(() => { delete process.env.CATCH_DEVELOPMENTS; });
  const { checkV2Pages } = await import('./check-v2-pages.mjs');
  const { subjectPaths } = await import('../src/lib/v2-brief.mjs');
  const source = temp(t, 'v2-source-');
  const destination = temp(t, 'v2-site-');
  const id = snapshot(source, { claim: { independent: 3 } });
  pullV2({ source, destination });
  const manifests = temp(t, 'v2-manifests-');
  const dist = temp(t, 'v2-dist-');
  const site = pageSite(t, id, dist);
  const home = subjectPaths('subject-a');
  site.write(home.claims, site.claimsPage('subject-a'));
  site.write(home.claim({ id: 'claim-a' }), site.claimPage('subject-a'));
  assert.deepEqual(checkV2Pages(dist, destination, manifests).failures, ['subject-a: development page missing at /developments/subject-a/', 'developments list page missing: /developments/']);
  site.write(home.home, site.homePage('subject-a'));
  site.write('/developments/', '<a data-v2-development-link href="/developments/other/"></a>');
  assert.match(checkV2Pages(dist, destination, manifests).failures[0], /\/developments\/: lists 1 developments, not the selection's page in order/);
  site.write('/developments/', `<a data-v2-development-link href="${home.home}"></a>`);
  assert.deepEqual(checkV2Pages(dist, destination, manifests).failures, []);
});

test('a story naming a subject that folded into another shows the survivor once, through a chain of merges', async () => {
  const { storySubjects } = await import('../src/lib/v2.mjs');
  const view = (id, related = []) => [id, { id, related }];
  const snapshot = { id: 's', views: new Map([view('kept', [['merge', 'kept', 'middle'], ['merge', 'middle', 'first']])]) };
  assert.deepEqual(storySubjects(snapshot, { story: 'a', subjects: ['kept', 'middle', 'first'] }), ['kept']);
  assert.throws(() => storySubjects(snapshot, { story: 'a', subjects: ['gone'] }), /lacks subjects of story a: gone/);
});

test('amounts group their thousands, including a range and a decimal', () => {
  assert.equal(valueText({ type: 'quantity', amount: '20000', unit: 'ballots' }), '20,000 ballots');
  assert.equal(valueText({ type: 'quantity', amount: '1250000.5', upper: '2000000', unit: 'dollars' }), '1,250,000.5–2,000,000 dollars');
  assert.equal(valueText({ type: 'quantity', amount: '950', unit: 'people' }), '950 people');
});

test('a source speaking in its own voice has no speaker on the page, and attributes read as headings', async () => {
  const { attributeHeading, statedBy } = await import('../src/lib/v2-brief.mjs');
  assert.equal(statedBy({ speaker: "outlet's own" }), null);
  assert.equal(statedBy({ speaker: 'Liz Landers' }), 'Liz Landers');
  assert.equal(attributeHeading('poll_result'), 'Poll results');
  assert.equal(attributeHeading('new_thing'), 'New thing');
});

test('development pages are off unless the build asks, and the gate refuses one that appears anyway', async (t) => {
  const { checkV2Pages } = await import('./check-v2-pages.mjs');
  const { publishedDevelopments, subjectPaths } = await import('../src/lib/v2-brief.mjs');
  const source = temp(t, 'v2-source-');
  const destination = temp(t, 'v2-site-');
  const id = snapshot(source, { claim: { independent: 3 } });
  pullV2({ source, destination });
  const read = readV2(destination);
  assert.deepEqual(publishedDevelopments(read, {}), []);
  assert.equal(publishedDevelopments(read, { CATCH_DEVELOPMENTS: '1' }).length, 1);
  const manifests = temp(t, 'v2-manifests-');
  const dist = temp(t, 'v2-dist-');
  const site = pageSite(t, id, dist);
  assert.deepEqual(checkV2Pages(dist, destination, manifests).failures, []);
  site.write(subjectPaths('subject-a').home, site.homePage('subject-a'));
  site.write('/developments/', '');
  const failures = checkV2Pages(dist, destination, manifests).failures;
  assert.ok(failures.some((failure) => failure.includes('list page exists with development pages off')));
  site.write('/', '<div data-latest-developments></div>');
  writeFileSync(join(dist, 'search-index.json'), JSON.stringify([{ href: '/developments/subject-a/' }]));
  const shown = checkV2Pages(dist, destination, manifests).failures;
  assert.ok(shown.some((failure) => failure.includes('home page lists developments')));
  assert.ok(shown.some((failure) => failure.includes('search-index.json: lists developments')));
});
