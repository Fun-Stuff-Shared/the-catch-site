import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { articleRegistrations, readingPages } from './article-pages.mjs';
import { checkArticlePages } from './check-article-pages.mjs';
import { REQUIRED_STEPS, layerFindings, citationFindings, recordManifestFindings } from './article-checks.mjs';

const scripts = dirname(fileURLToPath(import.meta.url));
function put(root, name, content) {
  mkdirSync(dirname(join(root, name)), { recursive: true });
  writeFileSync(join(root, name), typeof content === 'string' ? content : JSON.stringify(content));
}
function fixture(t, preview = false) {
  const root = mkdtempSync(join(tmpdir(), 'catch-article-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'dist/events'), { recursive: true });
  const route = preview ? '/design/formats/council/' : '/trackers/council/';
  const prefix = preview ? 'src/fixtures/articles/council/' : 'data/sources/';
  const id = preview ? 'fixture-council-minutes' : 'council-minutes';
  const reader = preview ? `${route}records/${id}/` : `/records/${id}/`;
  const quote = 'The fictional Copper Council voted three to two.';
  const record = { id, title: 'Fictional Copper Council minutes', publisher: 'Fictional Copper Council', date: '2026-01-01', url: 'https://example.invalid/minutes', pinned_path: `${prefix}minutes.txt`, text_path: `${prefix}minutes.txt`, text_sha256: `sha256:${createHash('sha256').update(quote).digest('hex')}`, quote, quote_span_check: 'byte_exact', capture_status: 'Synthetic test only; not an admitted source', ...(preview ? { reader_path: reader } : {}) };
  const manifest = { subject: 'council', event: 'council-standing', story: route, date: '2026-01-01', completed_by: 'test', steps: Object.fromEntries(REQUIRED_STEPS.map(step => [step, { done: true, evidence: 'Synthetic regression-test attestation only.' }])), sub_events: [{ id: 'decision', date: '2026-01-01', label: 'The decision', section_anchor: 'decision', records: [id] }], records: [record], story_sources: [{ id, group: 'primary' }] };
  const descriptor = { route, source: 'src/components/Test.astro', manifest: preview ? `${prefix}manifest.json` : 'checks/manifests/council.json', claims: preview ? `${prefix}claims.json` : 'checks/claims/council.json' };
  const descriptorPath = preview ? `${prefix}article.json` : 'checks/article-pages/council.json';
  put(root, descriptorPath, descriptor);
  put(root, descriptor.manifest, manifest);
  put(root, descriptor.claims, { claims: [{ id: 'decision', says: quote, evidence: [{ record: id, passage: quote }] }] });
  put(root, record.text_path, quote);
  put(root, `dist${reader}index.html`, preview ? `<meta name="robots" content="noindex"><p data-fixture-notice>Fictional source: ${quote}</p>` : `<p>${quote}</p>`);
  put(root, descriptor.source, '<main><p>The test template.</p></main>');
  const cite = `<sup class="src-ref"><a href="#src-1" data-record-href="${reader}" data-passage="${quote}" data-claim="decision">1</a></sup>`;
  const html = `<!doctype html><html><head>${preview ? '<meta name="robots" content="noindex, nofollow">' : ''}</head><body><main id="story-root"><div class="mode-switcher"><a data-mode="story">Story</a><a data-mode="facts">Facts</a><a data-mode="work">Work</a></div>${preview ? '<p class="sample-notice" data-layer="fact">Fictional content for testing.</p>' : ''}<h2 id="decision" data-layer="fact">The decision</h2><p data-layer="narrative">${quote}${cite}${cite}</p><section data-layer="fact"><h2>The records</h2><ol><li id="src-1"><span class="src-n">1</span><a href="${reader}">Council minutes</a></li></ol></section></main></body></html>`;
  put(root, `dist${route}index.html`, html);
  return { root, route, descriptor, descriptorPath, manifest, record, html, file: `dist${route}index.html` };
}
function processPages(root, preview = false) {
  for (const script of ['merge-cites', 'work-evidence', 'facts-claims']) execFileSync(process.execPath, [join(scripts, `${script}.mjs`)], { cwd: root, env: { ...process.env, CATCH_DESIGN_PREVIEW: preview ? '1' : '0' } });
}
function findings(f, preview = false) { return checkArticlePages({ root: f.root, preview }); }

test('non-event routes get all three processors, their own ledger, and the gate', t => {
  const f = fixture(t);
  put(f.root, 'dist/events/example/2026-01-01-update/index.html', f.html);
  put(f.root, 'dist/unrelated/index.html', '<p>Unrelated page.</p>');
  assert.equal(readingPages({ root: f.root }).length, 2);
  processPages(f.root);
  const result = readFileSync(join(f.root, f.file), 'utf8');
  assert.match(result, /class="work-evidence"/);
  assert.match(result, /data-layer="claims"/);
  assert.equal((result.match(/href="#src-1"/g) ?? []).length, 2); // one story + one facts citation
  assert.match(readFileSync(join(f.root, 'dist/events/example/2026-01-01-update/index.html'), 'utf8'), /data-layer="claims"/);
  assert.deepEqual(findings(f), []);
  processPages(f.root);
  assert.equal(readFileSync(join(f.root, f.file), 'utf8'), result);
});

test('explicit legacy CLI directory still uses the event ledger', t => {
  const f = fixture(t);
  put(f.root, 'dist/events/council/2026-01-01/index.html', f.html);
  put(f.root, 'checks/claims/council--2026-01-01.json', { claims: [{ id: 'decision', says: 'The legacy ledger sentence.' }] });
  execFileSync(process.execPath, [join(scripts, 'facts-claims.mjs'), join(f.root, 'dist/events')], { cwd: f.root });
  assert.match(readFileSync(join(f.root, 'dist/events/council/2026-01-01/index.html'), 'utf8'), /The legacy ledger sentence/);
  assert.equal(readFileSync(join(f.root, f.file), 'utf8'), f.html);
});

test('unregistered routes and malformed route metadata fail closed', t => {
  const f = fixture(t);
  rmSync(join(f.root, f.descriptorPath));
  assert.match(findings(f).join('\n'), /no registration/);
  put(f.root, f.file, f.html.replace('id="story-root"', ''));
  assert.match(findings(f).join('\n'), /\/trackers\/council\/: reading-mode article has no registration/);
  put(f.root, f.file, f.html.replace('class="mode-switcher"', ''));
  assert.match(findings(f).join('\n'), /\/trackers\/council\/: reading-mode article has no registration/);
  put(f.root, 'dist/officials/new-person/new-episode/index.html', f.html);
  assert.match(findings(f).join('\n'), /\/officials\/new-person\/new-episode\/: reading-mode article has no registration/);
  for (const route of ['/events/not-a-standing-route/', '/trackers/../escape/', 'https://example.invalid/']) {
    put(f.root, f.descriptorPath, { ...f.descriptor, route });
    assert.throws(() => articleRegistrations(f.root), /article_route_invalid/);
  }
  put(f.root, f.descriptorPath, { ...f.descriptor, source: 'src/../secret.astro' });
  assert.throws(() => articleRegistrations(f.root), /article_path_invalid/);
  put(f.root, f.descriptorPath, f.descriptor);
  put(f.root, f.descriptor.manifest, { ...f.manifest, story: '/another/route/' });
  assert.throws(() => articleRegistrations(f.root), /route_mismatch/);
  put(f.root, f.descriptor.manifest, f.manifest);
  put(f.root, 'checks/article-pages/duplicate.json', f.descriptor);
  assert.throws(() => articleRegistrations(f.root), /route_duplicate/);
});

test('new routes cannot evade existing layer, facts, copy, citation and passage checks', t => {
  const f = fixture(t);
  processPages(f.root);
  const valid = readFileSync(join(f.root, f.file), 'utf8');
  const cases = [
    [valid.replace('data-layer="narrative"', ''), /untyped content/],
    [f.html, /empty in Just the facts/],
    [valid.replace('data-layer="narrative"', 'data-layer="unknown"'), /unknown data-layer/],
    [valid.replace('data-mode="work"', 'data-mode="missing"'), /missing reading mode work/],
    [valid.replace('id="src-1"', 'id="broken"'), /link to nothing/],
    [valid.replace('data-record-href="/records/council-minutes/"', 'data-record-href="/records/another-story/"'), /outside this page/],
    [valid.replace('data-passage="The fictional Copper Council voted three to two."', 'data-passage="A sentence not in the record."'), /passage .*absent|not in the saved text/],
    [valid.replace('data-claim="decision"', 'data-claim="unknown"'), /claim unknown/],
    [valid.replace('The decision</h2>', 'The decision — final</h2>'), /em dash/],
    [valid.replace('The decision</h2>', 'Our saved record</h2>'), /custody talk/],
  ];
  for (const [html, expected] of cases) {
    put(f.root, f.file, html);
    assert.match(findings(f).join('\n'), expected);
  }
});

test('source hashes, editorial attestations and typed table numbers remain mandatory', t => {
  const f = fixture(t);
  processPages(f.root);
  put(f.root, f.record.text_path, 'Changed source bytes.');
  assert.match(findings(f).join('\n'), /hash does not recompute/);
  put(f.root, f.record.text_path, f.record.quote);
  put(f.root, f.descriptor.manifest, { ...f.manifest, steps: {} });
  assert.match(findings(f).join('\n'), /step "sources_admitted"/);
  put(f.root, f.descriptor.manifest, f.manifest);
  put(f.root, f.descriptor.source, '<table><tr><td>123</td></tr></table>');
  assert.match(findings(f).join('\n'), /number typed into a table cell/);
  put(f.root, f.descriptor.source, '<p>Template.</p>');
  rmSync(join(f.root, `dist/records/${f.record.id}/index.html`));
  assert.match(findings(f).join('\n'), /reader page is missing/);
  put(f.root, f.descriptor.manifest, { ...f.manifest, records: [] });
  assert.match(findings(f).join('\n'), /records and sub_events must be nonempty/);
  rmSync(join(f.root, f.descriptor.manifest));
  assert.match(findings(f).join('\n'), /ENOENT/);
});

test('fixtures are excluded normally, processed in preview, labeled, and noindex', t => {
  const f = fixture(t, true);
  assert.equal(readingPages({ root: f.root, preview: false }).length, 0);
  assert.match(findings(f).join('\n'), /preview fixture was emitted/);
  processPages(f.root, true);
  assert.deepEqual(findings(f, true), []);
  const valid = readFileSync(join(f.root, f.file), 'utf8');
  put(f.root, f.file, valid.replace(/(<span class="we-body"><a[^>]*data-passage=")[^"]*/, '$1A passage not in the source.'));
  assert.match(findings(f, true).join('\n'), /preview reader passage is absent/);
  put(f.root, f.file, valid.replace('noindex, nofollow', 'index, follow'));
  assert.match(findings(f, true).join('\n'), /must be noindex/);
  put(f.root, f.file, valid.replace('class="sample-notice"', 'class="sample-notice" hidden'));
  assert.match(findings(f, true).join('\n'), /visible fictional-content notice/);
  put(f.root, f.file, valid.replaceAll('Fictional', 'Sample').replaceAll('fictional', 'sample'));
  assert.match(findings(f, true).join('\n'), /visible fictional-content notice/);
  put(f.root, f.file, valid);
  put(f.root, `dist${f.record.reader_path}index.html`, '<p>Fictional source.</p>');
  assert.match(findings(f, true).join('\n'), /fixture must be noindex/);
  rmSync(join(f.root, 'dist/design'), { recursive: true });
  assert.deepEqual(findings(f), []);
});

test('fixture identifiers, prose and assets never leak through discovery, sitemap, record pages or downloads', t => {
  const f = fixture(t, true);
  processPages(f.root, true);
  for (const [file, content] of [
    ['dist/index.html', f.record.quote], ['dist/sitemap.xml', f.route],
    ['dist/records/fixture-council-minutes/index.html', f.record.id],
    ['dist/exports/council.csv', f.record.title], ['dist/_astro/chunk.js', f.record.id],
    ['dist/downloads/renamed.bin', f.record.quote],
    ['src/data/leaked.mjs', `export const event = {title: '${f.record.title}'};`],
    ['src/data/imported.mjs', "export {event} from '../fixtures/articles/council/data.mjs';"],
  ]) {
    put(f.root, file, content);
    assert.match(findings(f, true).join('\n'), /leaked outside preview|must not import fixtures/, file);
    rmSync(join(f.root, file));
  }
  put(f.root, f.descriptorPath, { ...f.descriptor, manifest: 'src/data/fixture.json' });
  assert.throws(() => articleRegistrations(f.root), /article_path_invalid/);
  put(f.root, f.descriptorPath, f.descriptor);
  put(f.root, 'checks/manifests/leaked-fixture.json', f.manifest);
  assert.match(findings(f, true).join('\n'), /production manifest contains a fictional record/);
});

test('shared legacy checks still reject broken events without article registration', t => {
  const f = fixture(t);
  assert.match(layerFindings(f.html.replace('data-layer="narrative"', ''), '/events/example/date/').join('\n'), /untyped content/);
  assert.match(citationFindings(f.html.replace('id="src-1"', ''), '/events/example/date/', new Map(), f.root).join('\n'), /link to nothing/);
  assert.deepEqual(recordManifestFindings(f.root, 'manifest', f.manifest), []);
  const broken = structuredClone(f.manifest);
  broken.records[0].quote_span_check = 'quote_unverified';
  assert.match(recordManifestFindings(f.root, 'manifest', broken).join('\n'), /unverified quote/);
});
