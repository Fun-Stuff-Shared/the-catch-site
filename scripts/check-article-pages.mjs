import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { parse } from 'parse5';
import { articleRegistrations, articleOutput, filesUnder, projectFile } from './article-pages.mjs';
import { REQUIRED_STEPS, recordManifestFindings, layerFindings, citationFindings, publicCopyFindings } from './article-checks.mjs';
import { emptyFactsSections, checkAuthoredSections } from './check-state-pages.mjs';
import { storyFindings } from './story-copy-rules.mjs';
import { sourceContext } from '../src/lib/evidence-context.mjs';

const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
function* walk(node) { yield node; for (const child of node.childNodes ?? []) yield* walk(child); }
const routeOf = (dist, file) => `/${relative(dist, file).replace(/index\.html$/, '')}`;

function declaresArticle(html) {
  // Saved source pages can quote reading-mode CSS/HTML. Avoid building their
  // large DOMs unless a real opening tag might declare article controls.
  for (const [tag] of html.matchAll(/<[a-z](?:"[^"]*"|'[^']*'|[^'">])*?>/gi)) {
    if (/story-root|mode-switcher|data-mode/i.test(tag) || tag.includes('&') && /\b(?:id|class)\s*=/i.test(tag)) {
      return [...walk(parse(html))].some(n => attr(n, 'id') === 'story-root' || (attr(n, 'class') ?? '').split(/\s+/).includes('mode-switcher') || ['story', 'facts', 'work'].includes(attr(n, 'data-mode')));
    }
  }
  return false;
}

function fixturePresentation(html, route) {
  const nodes = [...walk(parse(html))];
  const fail = [];
  const visible = node => {
    for (let n = node; n; n = n.parentNode) {
      if (['head', 'script', 'style'].includes(n.tagName) || attr(n, 'hidden') !== undefined || attr(n, 'aria-hidden') === 'true' || /display\s*:\s*none|visibility\s*:\s*hidden/i.test(attr(n, 'style') ?? '') || ['narrative', 'proof', 'claims'].includes(attr(n, 'data-layer'))) return false;
    }
    return true;
  };
  const notices = nodes.filter(n => attr(n, 'data-fixture-notice') !== undefined || (attr(n, 'class') ?? '').split(/\s+/).includes('sample-notice'));
  const notice = notices.map(n => [...walk(n)].filter(child => child.nodeName === '#text' && visible(child)).map(child => child.value).join(' ')).join(' ');
  if (!nodes.some(n => n.tagName === 'meta' && attr(n, 'name')?.toLowerCase() === 'robots' && /\bnoindex\b/i.test(attr(n, 'content') ?? ''))) fail.push(`${route}: fixture must be noindex`);
  if (!/\b(fictional|synthetic)\b/i.test(notice)) fail.push(`${route}: fixture needs a visible fictional-content notice`);
  return fail;
}

// These existing episode pages predate the article contract and remain under the
// official-page gate. Do not turn this into a prefix exclusion for future articles.
const legacyEpisodes = new Set([
  '/officials/marco-rubio/immigration-2013/', '/officials/marco-rubio/zika-2016/',
  '/officials/marco-rubio/cuba/', '/officials/marco-rubio/iran/',
]);

export function articleHtmlFindings(page, html, root, dist = join(root, 'dist')) {
  const { route, manifest, claims } = page;
  const fail = [];
  const nodes = [...walk(parse(html))];
  const main = nodes.find(n => n.tagName === 'main' && attr(n, 'id') === 'story-root');
  if (!main || nodes.filter(n => n.tagName === 'main').length !== 1 || !html.includes('mode-switcher')) fail.push(`${route}: article needs one story-root main and all three reading modes`);
  for (const mode of ['story', 'facts', 'work']) if (!nodes.some(n => attr(n, 'data-mode') === mode)) fail.push(`${route}: missing reading mode ${mode}`);
  for (const node of nodes.filter(n => attr(n, 'data-layer') !== undefined)) {
    if (!['fact', 'narrative', 'proof', 'claims'].includes(attr(node, 'data-layer'))) fail.push(`${route}: unknown data-layer ${attr(node, 'data-layer')}`);
  }
  const records = new Map((manifest.records ?? []).map(record => [record.id, record]));
  const readerPath = id => page.fixture ? records.get(id)?.reader_path : `/records/${id}/`;
  fail.push(...layerFindings(html, route), ...storyFindings(html, route));
  fail.push(...publicCopyFindings(html, route, new Set(records.keys()), readerPath));
  for (const heading of emptyFactsSections(html)) fail.push(`${route}: "${heading}" is empty in Just the facts; cite its fact sentences one by one`);
  // Ordinary record links receive the very same saved-passage check as event pages.
  fail.push(...citationFindings(html, route, records, root));
  // Preview-local readers are not /records/ URLs. Check their work-mode links too,
  // not only the footnotes from which the postprocessor generated them.
  if (page.fixture) {
    const readers = new Map([...records.values()].map(record => [readerPath(record.id), record]));
    for (const link of nodes.filter(n => n.tagName === 'a' && attr(n, 'data-record-href') !== undefined)) {
      const record = readers.get(attr(link, 'data-record-href'));
      if (!record) { fail.push(`${route}: link names a record outside this fixture`); continue; }
      const text = readFileSync(join(root, record.text_path), 'utf8');
      for (const passage of [attr(link, 'data-passage'), ...(attr(link, 'data-passages') ?? '').split('\n')].filter(Boolean)) {
        if (!sourceContext(text, passage)) fail.push(`${route}: preview reader passage is absent from ${record.id}`);
      }
    }
  }
  if (manifest.authored_sections) {
    try { checkAuthoredSections(html, manifest.authored_sections); }
    catch (error) { fail.push(`${route}: ${error.message}`); }
  }
  const groups = ['primary', 'official', 'coverage'];
  const sources = [...(manifest.story_sources ?? [])].sort((a, b) => groups.indexOf(a.group) - groups.indexOf(b.group));
  if (!sources.length) fail.push(`${route}: story_sources is required`);
  if (new Set(sources.map(s => s.id)).size !== sources.length) fail.push(`${route}: duplicate story source`);
  sources.forEach((source, i) => {
    if (!records.has(source.id) || !groups.includes(source.group)) { fail.push(`${route}: invalid story source ${source.id}`); return; }
    const expected = readerPath(source.id);
    const item = nodes.find(n => attr(n, 'id') === `src-${i + 1}`);
    if (!item || ![...walk(item)].some(n => n.tagName === 'a' && attr(n, 'href') === expected)) fail.push(`${route}: source ${i + 1} does not link to its record`);
    if (!expected || !existsSync(articleOutput(dist, expected))) fail.push(`${route}: source ${i + 1} reader page is missing`);
  });
  const citations = nodes.filter(n => n.tagName === 'a' && /^#src-\d+$/.test(attr(n, 'href') ?? ''));
  if (!citations.length) fail.push(`${route}: article has no source citations`);
  for (const link of citations) {
    const number = Number(attr(link, 'href').slice(5));
    const source = sources[number - 1];
    const record = source && records.get(source.id);
    const href = attr(link, 'data-record-href');
    const expected = source && readerPath(source.id);
    if (!record || href !== expected) { fail.push(`${route}: citation ${number} is outside this page's numbered sources`); continue; }
    const passages = [attr(link, 'data-passage'), ...(attr(link, 'data-passages') ?? '').split('\n')].filter(Boolean);
    if (!passages.length) fail.push(`${route}: citation ${number} needs an exact passage`);
    const text = record.text_path && existsSync(join(root, record.text_path)) ? readFileSync(join(root, record.text_path), 'utf8') : '';
    for (const passage of passages) if (!sourceContext(text, passage)) fail.push(`${route}: citation ${number} passage is absent from its text pin`);
    const claimIds = (attr(link, 'data-claim') ?? '').split(' ').filter(Boolean);
    if (claims && !claimIds.length) fail.push(`${route}: ledger citation needs a claim`);
    const normalize = text => String(text ?? '').replace(/\s+/g, ' ').trim();
    const claimPassages = [];
    for (const id of claimIds) {
      const claim = claims?.find(c => c.id === id);
      const evidence = claim?.evidence?.filter(e => e.record === record.id) ?? [];
      claimPassages.push(...evidence.map(e => normalize(e.passage)));
      if (!evidence.some(e => passages.some(p => normalize(p) === normalize(e.passage)))) fail.push(`${route}: claim ${id} has no matching passage in cited record ${record.id}`);
    }
    if (claims && passages.some(p => !claimPassages.includes(normalize(p)))) fail.push(`${route}: citation passage is outside its claims' evidence`);
  }
  if (page.fixture) fail.push(...fixturePresentation(html, route));
  return fail;
}

export function checkArticlePages({ root = process.cwd(), dist = join(root, 'dist'), preview = process.env.CATCH_DESIGN_PREVIEW === '1' } = {}) {
  const fail = [];
  let pages;
  try { pages = articleRegistrations(root); }
  catch (error) { return [error.message]; }
  const registered = new Map(pages.map(page => [page.route, page]));
  const ready = new Set();
  for (const file of filesUnder(join(root, 'checks/manifests')).filter(f => f.endsWith('.json'))) {
    const manifest = JSON.parse(readFileSync(file, 'utf8'));
    if ((manifest.records ?? []).some(r => r.id?.startsWith('fixture-'))) fail.push(relative(root, file) + ': production manifest contains a fictional record');
  }
  for (const page of pages) {
    const { route, manifest, fixture } = page;
    const file = articleOutput(dist, route);
    const sourcePrefix = fixture ? page.fixtureRoot : 'data/sources/';
    try {
      fail.push(...recordManifestFindings(root, page.manifestFile, manifest, sourcePrefix));
      if (!manifest.records?.length || !manifest.sub_events?.length) fail.push(route + ': records and sub_events must be nonempty');
      for (const record of manifest.records ?? []) {
        for (const key of ['pinned_path', 'text_path']) projectFile(root, record[key], sourcePrefix);
        if (fixture && (!record.id.startsWith('fixture-') || !record.reader_path?.startsWith(route) || !/^\/(?:[a-z0-9-]+\/)+$/.test(record.reader_path) || record.reader_path.includes('/../'))) fail.push(route + ': fixture record needs a fixture- ID and a preview-local reader path');
      }
      if (!fixture) {
        if (!manifest.completed_by || !manifest.date) fail.push(route + ': completed_by and date are required');
        for (const step of REQUIRED_STEPS) {
          const value = manifest.steps?.[step];
          if (value?.done !== true || typeof value.evidence !== 'string' || value.evidence.trim().length < 10) fail.push(route + ': step "' + step + '" needs completion and real evidence');
        }
      }
      const source = readFileSync(page.sourceFile, 'utf8');
      source.split('\n').forEach((line, i) => { if (/<td[^>]*>\s*(?:[-−+]|\$|&minus;|&plus;)?\d/.test(line)) fail.push(page.source + ':' + (i + 1) + ': number typed into a table cell; render it from the data module'); });
      if (fixture && !preview) {
        if (existsSync(file)) fail.push(route + ': preview fixture was emitted in a normal build');
      } else if (!existsSync(file)) fail.push(route + ': article output is missing');
      ready.add(route);
    } catch (error) { fail.push(route + ': ' + error.message); }
  }

  const fixtures = pages.filter(page => page.fixture);
  const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  const fixtureFiles = new Set(fixtures.flatMap(page => filesUnder(join(root, page.fixtureRoot))));
  const fixtureHashes = new Set([...fixtureFiles].map(file => hash(readFileSync(file))));
  const tokens = new Set(fixtures.flatMap(page => [page.route, ...(page.sentinels ?? []), ...page.manifest.records.flatMap(r => [r.id, r.title, r.quote].filter(t => t && t.length >= 12))]));
  const tokenPattern = tokens.size ? new RegExp([...tokens].map(token => token.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')).join('|')) : null;
  const textFile = /\.(?:html|json|xml|js|mjs|css|txt|csv|svg|webmanifest|map)$/i;

  // All output checks share one traversal and one read per file. Byte hashes
  // still cover non-text downloads; a combined pattern covers every fixture.
  for (const file of filesUnder(dist)) {
    const route = routeOf(dist, file);
    const inPreview = preview && route.startsWith('/design/');
    const htmlFile = file.endsWith('.html');
    if (!preview && route.startsWith('/design/')) fail.push(route + ': design preview output in normal build');
    if (/^\/records\/(?:pins\/)?fixture-[a-z0-9-]+\//.test(route)) fail.push(route + ': fictional record in production record library');
    const needsLeakCheck = !inPreview && (fixtureHashes.size || tokenPattern && textFile.test(file));
    if (!htmlFile && !needsLeakCheck) continue;
    const bytes = readFileSync(file);
    const text = htmlFile || tokenPattern && textFile.test(file) ? bytes.toString('utf8') : null;
    if (htmlFile) {
      const page = registered.get(route);
      if (page && ready.has(route) && (!page.fixture || preview)) {
        try { fail.push(...articleHtmlFindings(page, text, root, dist)); }
        catch (error) { fail.push(route + ': ' + error.message); }
      } else if (inPreview && fixtures.some(fixture => route.startsWith(fixture.route))) {
        fail.push(...fixturePresentation(text, route));
      }
      if (!route.startsWith('/events/') && !legacyEpisodes.has(route) && !page && declaresArticle(text)) fail.push(route + ': reading-mode article has no registration');
    }
    if (!inPreview) {
      if (fixtureHashes.size && fixtureHashes.has(hash(bytes))) fail.push(route + ': fixture bytes leaked outside preview');
      if (tokenPattern && text !== null && tokenPattern.test(text)) fail.push(route + ': fictional fixture content leaked outside preview');
    }
  }
  for (const file of filesUnder(join(root, 'src/data')).filter(file => file.endsWith('.mjs'))) {
    const text = readFileSync(file, 'utf8');
    const route = relative(root, file);
    if (/(?:from\s*|import\s*\()["'][^"']*fixtures\//.test(text)) fail.push(route + ': discovery data must not import fixtures');
    if (tokenPattern && tokenPattern.test(text)) fail.push(route + ': fictional fixture content leaked outside preview');
  }
  return fail;
}
