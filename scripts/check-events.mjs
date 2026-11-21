// Event-page gate. Runs after astro build; a failure blocks the deploy (Workers git
// build runs `npm run build`). Two layers:
//   1. Manifest: every story page must have a filled attestation manifest in
//      checks/manifests/ covering the judgment steps of docs/EVENT-PAGE-STANDARD.md.
//   2. Mechanical: language and route checks the script runs itself on dist output,
//      so the gate is not attestation alone.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { readState, readPublishedState, eventPath } from "../src/lib/state.mjs";
import { checkStatePages, checkPageFigures, checkAuthoredSections, emptyFactsSections } from "./check-state-pages.mjs";
import { storyFindings } from "./story-copy-rules.mjs";
import { checkV2Pages, formatV2Report } from "./check-v2-pages.mjs";
import { REQUIRED_STEPS, recordManifestFindings, layerFindings, citationFindings, publicCopyFindings } from './article-checks.mjs';
import { articleRegistrations } from './article-pages.mjs';
import { checkArticlePages } from './check-article-pages.mjs';

const ROOT = new URL("..", import.meta.url).pathname;
const fail = [];
const stateViews = readPublishedState();
const articleRoutes = new Set(articleRegistrations(ROOT).map(page => page.route));

// ---- 1. Manifests for story pages -------------------------------------------------
const eventsDir = join(ROOT, "src/pages/events");
const storyPages = [];
for (const subject of readdirSync(eventsDir)) {
  const p = join(eventsDir, subject);
  if (!statSync(p).isDirectory() || subject.startsWith("[")) continue;
  for (const f of readdirSync(p)) {
    if (f.endsWith(".astro") && f !== "index.astro") storyPages.push({ subject, story: f.replace(/\.astro$/, "") });
  }
}

for (const name of readdirSync(join(ROOT, 'checks/manifests')).filter((name) => name.endsWith('.json'))) {
  const manifest = JSON.parse(readFileSync(join(ROOT, 'checks/manifests', name), 'utf8'));
  if (!manifest.state_event_id) continue;
  const route = eventPath(manifest.state_event_id).replace(/^\/events\//, '').replace(/\/$/, '');
  const parts = route.split('/');
  const story = parts.pop();
  const subject = parts.join('/');
  if (!storyPages.some((row) => row.subject === subject && row.story === story)) storyPages.push({subject, story, manifestPath: join(ROOT, 'checks/manifests', name)});
  // The figures block prints a figure's label; without one the reader sees the identifier.
  const unlabeled = (manifest.figures ?? []).filter((figure) => !figure.label).map((figure) => figure.figure);
  if (unlabeled.length) console.warn(`${name}: ${unlabeled.length} figure(s) without a reader label: ${unlabeled.join(', ')}`);
}

// A number in a story table is read from the data module, never typed into the page;
// a typed cell is a second copy of the figure and the copy the auditor cannot recompute.
for (const { subject, story } of storyPages) {
  const src = join(eventsDir, subject, `${story}.astro`);
  if (!existsSync(src)) continue;
  const lines = readFileSync(src, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/<td[^>]*>\s*(?:[-−+]|\$|&minus;|&plus;)?\d/.test(line)) fail.push(`src/pages/events/${subject}/${story}.astro:${i + 1}: number typed into a table cell; render it from the data module`);
  });
}

for (const { subject, story, manifestPath } of storyPages) {
  const mPath = manifestPath || join(ROOT, "checks/manifests", `${subject}--${story}.json`);
  if (!existsSync(mPath)) {
    fail.push(`story /events/${subject}/${story}/ has no manifest at checks/manifests/${subject}--${story}.json`);
    continue;
  }
  let m;
  try { m = JSON.parse(readFileSync(mPath, "utf8")); }
  catch (e) { fail.push(`${mPath}: unreadable JSON (${e.message})`); continue; }
  if (m.state_event_id && stateViews.events.get(m.state_event_id)?.status === 'retired') continue;
  validateRecordManifest(mPath, m);
  if (m.authored_sections) {
    try { checkAuthoredSections(readFileSync(join(ROOT, 'dist', m.story || `/events/${m.event}/`, 'index.html'), 'utf8'), m.authored_sections); }
    catch (error) { fail.push(`${mPath}: ${error.message}`); }
  }
  if (m.schema === "event_dossier_v1") {
    const primary = m.primary_sources ?? [];
    const coverage = m.coverage_records ?? [];
    const needs = m.needs_ledger ?? [];
    if (!m.dossier_sha256) fail.push(`${mPath}: event dossier hash is required`);
    if (m.event_class === "coverage_only" && primary.length) fail.push(`${mPath}: coverage_only event cannot claim a pinned primary source`);
    if (m.event_class !== "coverage_only" && (!primary.length || primary.some((s) => !s.sha256 || !s.path))) fail.push(`${mPath}: every primary source needs a pinned path and sha256`);
    for (const source of primary) {
      if (!source.path || !existsSync(source.path)) { fail.push(`${mPath}: primary source is not present at ${source.path}`); continue; }
      const actual = `sha256:${createHash("sha256").update(readFileSync(source.path)).digest("hex")}`;
      if (actual !== source.sha256) fail.push(`${mPath}: primary source hash does not recompute for ${source.id}`);
    }
    if (!Number.isInteger(m.coverage_threshold) || m.coverage_threshold < 1) fail.push(`${mPath}: coverage_threshold must be recipe-defined positive integer`);
    if (coverage.length < m.coverage_threshold) fail.push(`${mPath}: coverage records ${coverage.length} below recipe threshold ${m.coverage_threshold}`);
    if (coverage.some((r) => !r.source_url || !r.admission_row_hash)) fail.push(`${mPath}: coverage must cite source_url plus admission_row_hash`);
    if (m.event_class === "coverage_only" && new Set(coverage.map((r) => r.publisher)).size < m.coverage_threshold) fail.push(`${mPath}: coverage_only needs ${m.coverage_threshold} independent admitted outlets`);
    if (!needs.length || needs.some((n) => !n.status || !n.plain || n.plain.trim().length < 10)) fail.push(`${mPath}: needs ledger requires typed, plain-language entries`);
    if (m.event_class === "coverage_only" && !needs.some((n) => n.status !== "have" && /primary/i.test(n.need || ""))) fail.push(`${mPath}: coverage_only needs an open plain-language primary-record need`);
    if ((m.model_claims ?? []).some((claim) => !claim.admitted_record_id)) fail.push(`${mPath}: model-generated claims require an admitted record id`);
    continue;
  }
  if (!m.completed_by || !m.date) fail.push(`${mPath}: completed_by and date are required`);
  for (const step of REQUIRED_STEPS) {
    const s = m.steps?.[step];
    if (!s || s.done !== true) fail.push(`${mPath}: step "${step}" is not attested done`);
    else if (!s.evidence || s.evidence.trim().length < 10) fail.push(`${mPath}: step "${step}" needs a real evidence line, not a stub`);
  }
}

function validateRecordManifest(mPath, manifest) {
  fail.push(...recordManifestFindings(ROOT, mPath, manifest));
}

const figuresDir = join(ROOT, "src/pages/officials");
if (existsSync(figuresDir)) {
  for (const figure of readdirSync(figuresDir)) {
    const page = join(figuresDir, figure, "index.astro");
    if (figure.startsWith("[") || !existsSync(page)) continue;
    const manifestPath = join(ROOT, "checks/manifests", `officials--${figure}.json`);
    if (!existsSync(manifestPath)) { fail.push(`figure /officials/${figure}/ has no manifest`); continue; }
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
      validateRecordManifest(manifestPath, manifest);
      if (manifest.schema !== "figure_page_v1" || manifest.status !== "staged_zain_review" || manifest.not_published !== true || manifest.plain_language_checked !== true) {
        fail.push(`${manifestPath}: staged figure manifest is incomplete`);
      }
    } catch (e) { fail.push(`${manifestPath}: unreadable JSON (${e.message})`); }
  }
}

const officialVoteStore = join(ROOT, "src/data/votes/marco-rubio.json");
for (const slug of ["immigration-2013", "zika-2016"]) {
  const episode = JSON.parse(readFileSync(join(ROOT, "src/data/officials/marco-rubio/episodes", `${slug}.json`), "utf8"));
  const ledgerPath = join(ROOT, "src/data/officials/marco-rubio/ledgers", `${slug}.json`);
  if (!Array.isArray(episode.source_ledger) || !episode.source_ledger.length) fail.push(`${slug}: source_ledger is required`);
  const manifest = JSON.parse(readFileSync(join(ROOT, "checks/manifests/officials--marco-rubio.json"), "utf8"));
  const subEvent = manifest.sub_events?.find((entry) => entry.id.endsWith(slug));
  const ids = new Set(manifest.records?.map((record) => record.id));
  for (const entry of episode.source_ledger ?? []) {
    const id = entry.record_id ?? entry;
    if (!ids.has(id)) fail.push(`${slug}: source_ledger names unknown record ${id}`);
    else if (!subEvent?.records?.includes(id)) fail.push(`${slug}: source_ledger record ${id} is outside its manifest sub-event`);
  }
  if (!existsSync(ledgerPath)) { fail.push(`${slug}: needs ledger is missing`); continue; }
  const ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
  if (!Array.isArray(ledger.classes) || ledger.classes.length !== 6) { fail.push(`${slug}: needs ledger requires six classes`); continue; }
  for (const entry of ledger.classes) {
    if (entry.status === "captured") {
      const record = entry.record;
      const path = record?.pinned_path && join(ROOT, record.pinned_path);
      if (!record?.pinned_path || !record?.text_sha256 || !path || !existsSync(path)) fail.push(`${slug}: captured needs class ${entry.class} lacks a pinned record`);
      else if (`sha256:${createHash("sha256").update(readFileSync(path)).digest("hex")}` !== record.text_sha256) fail.push(`${slug}: captured needs class ${entry.class} pin hash does not recompute`);
    } else if (entry.status !== "absent" || !entry.reason) fail.push(`${slug}: needs class ${entry.class} is unfilled`);
  }
}
if (!existsSync(officialVoteStore)) fail.push("official vote store missing");
else {
  try {
    const store = JSON.parse(readFileSync(officialVoteStore, "utf8"));
    const meta = store.meta ?? {};
    if (meta.rows_written !== store.rows?.length) fail.push("official vote store row count does not match meta");
    if (meta.files_scanned - meta.post_tenure_excluded !== meta.rows_written) fail.push("official vote store tenure accounting does not balance");
    for (const name of ["immigration-2013.json", "zika-2016.json"]) {
      const episode = JSON.parse(readFileSync(join(ROOT, "src/data/officials/marco-rubio/episodes", name), "utf8"));
      const rows = store.rows.filter((row) => row.congress === episode.congress && row.session === episode.session && episode.measures.includes(row.measure));
      for (const vote of episode.key_votes) if (!rows.some((row) => row.rc === vote.rc)) fail.push(`${episode.slug}: key roll call ${vote.rc} is not on its measures`);
      if ("source_ledger" in episode) {
        if (!Array.isArray(episode.source_ledger)) fail.push(`${episode.slug}: source_ledger must be an array`);
        else {
          const officialManifest = JSON.parse(readFileSync(join(ROOT, "checks/manifests/officials--marco-rubio.json"), "utf8"));
          const subEvent = (officialManifest.sub_events ?? []).find((entry) => entry.id.endsWith(episode.slug));
          if (!subEvent) fail.push(`${episode.slug}: no manifest sub-event for source ledger`);
          else for (const entry of episode.source_ledger) {
            if (!entry.record_id) fail.push(`${episode.slug}: source ledger entry needs record_id`);
            else if (!subEvent.records.includes(entry.record_id)) fail.push(`${episode.slug}: source ledger record ${entry.record_id} is not cited by its manifest sub-event`);
          }
        }
      }
    }
  } catch (error) { fail.push(`official vote store unreadable: ${error.message}`); }
}
try { execFileSync(process.execPath, [join(ROOT, "scripts/check-statements.mjs")], { stdio: "pipe" }); }
catch (error) { fail.push(`official statement check failed: ${error.stderr?.toString() || error.message}`); }

const indexManifestRoutes = [];
for (const filename of readdirSync(join(ROOT, "checks/manifests")).filter((name) => name.endsWith(".json"))) {
  try {
    const manifest = JSON.parse(readFileSync(join(ROOT, "checks/manifests", filename), "utf8"));
    if (!manifest.story && !manifest.event) continue;
    if (manifest.state_event_id && stateViews.events.get(manifest.state_event_id)?.status === 'retired') continue;
    if (manifest.subject?.startsWith("officials/")) continue;
    const route = manifest.story || (manifest.event ? `/events/${manifest.event}/` : null);
    if (articleRoutes.has(route)) continue; // Standing articles are not dated event-index entries.
    if (!route) fail.push(`checks/manifests/${filename}: event index requires story or event route`);
    else indexManifestRoutes.push(route);
  } catch (error) {
    fail.push(`checks/manifests/${filename}: unreadable JSON (${error.message})`);
  }
}

// ---- 2. Mechanical checks on dist -------------------------------------------------
const dist = join(ROOT, "dist");
const READER_EXCLUSIONS = [];
const TODAY = new Date().toISOString().slice(0, 10);
for (const exclusion of READER_EXCLUSIONS) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(exclusion.date) || !exclusion.reason) fail.push(`reader exclusion ${exclusion.route} needs a date and reason`);
  if (exclusion.expires && (!/^\d{4}-\d{2}-\d{2}$/.test(exclusion.expires) || exclusion.expires < TODAY)) fail.push(`reader exclusion ${exclusion.route} expired on ${exclusion.expires}`);
}
const SCOPE = ["events", "chains", "claims", "officials"].map((d) => join(dist, d)).concat(join(dist, "index.html"));
const manifestRecordIds = new Set();
const manifestRecords = new Map();
for (const filename of readdirSync(join(ROOT, "checks/manifests")).filter((name) => name.endsWith(".json"))) {
  const manifest = JSON.parse(readFileSync(join(ROOT, "checks/manifests", filename), "utf8"));
  for (const record of manifest.records ?? []) { manifestRecordIds.add(record.id); manifestRecords.set(record.id, record); }
}
const outletRecordData = JSON.parse(readFileSync(join(ROOT, "src/data/news-records.json"), "utf8"));
const outletByUrl = new Map(outletRecordData.records.map((record) => [record.url, record]));
const outletById = new Map(outletRecordData.records.map((record) => [record.id, record]));
for (const record of outletRecordData.records) {
  if (!record.pinned_path || record.text_path !== record.pinned_path) fail.push(`outlet record ${record.id} requires a repository pinned_path`);
  const textPath = record.pinned_path && join(ROOT, record.pinned_path);
  if (!textPath || !existsSync(textPath)) fail.push(`outlet record ${record.id} repository pin is missing`);
  else if (`sha256:${createHash("sha256").update(readFileSync(textPath)).digest("hex")}` !== record.text_sha256) fail.push(`outlet record ${record.id} repository pin hash does not recompute`);
}
for (const filename of ["fed-rate.mjs", "jobs.mjs", "miami-cargo-crash.mjs", "missouri-house-map.mjs"]) {
  const subjectPath = join(ROOT, "src/data/subjects", filename);
  if (!existsSync(subjectPath)) continue;
  const { subject } = await import(pathToFileURL(subjectPath).href);
  for (const value of subject.current ?? []) {
    if (!value.record_id) continue;
    const record = manifestRecords.get(value.record_id);
    if (!record) { fail.push(`standing value ${value.label}: unknown record ${value.record_id}`); continue; }
    if (!value.source_sentence || !value.value) { fail.push(`standing value ${value.label}: needs value and source_sentence`); continue; }
    const text = readFileSync(join(ROOT, record.text_path), "utf8").replace(/\s+/g, " ");
    const sentence = value.source_sentence.replace(/\s+/g, " ");
    if (!text.includes(sentence)) fail.push(`standing value ${value.label}: source sentence is absent from ${value.record_id}`);
    const sourceValue = value.source_value ?? value.value;
    if (!sentence.includes(sourceValue)) fail.push(`standing value ${value.label}: source sentence does not contain ${sourceValue}`);
    const sourceUnit = value.source_unit ?? (value.unit === "%" ? "percent" : value.unit);
    if (sourceUnit && !sentence.toLowerCase().includes(sourceUnit.toLowerCase())) fail.push(`standing value ${value.label}: source sentence does not contain unit ${sourceUnit}`);
  }
}
const eventsIndex = join(dist, "events", "index.html");
if (!existsSync(eventsIndex)) fail.push("/events/ index missing from dist");
else {
  const html = readFileSync(eventsIndex, "utf8");
  for (const route of indexManifestRoutes) {
    if (!html.includes(`href="${route}"`)) fail.push(`/events/ index missing manifested route ${route}`);
  }
}
for (const file of htmlFiles(join(dist, "events"))) {
  const html = readFileSync(file, "utf8");
  const prose = html.replace(/<section[^>]*class="[^"]*revision-timeline[^"]*"[^>]*>[\s\S]*?<\/section>/g, "");
  for (const [url, record] of outletByUrl) if (prose.includes(`href="${url}`)) fail.push(`${file.slice(dist.length)}: outlet citation must link to /records/${record.id}/`);
}

for (const record of outletRecordData.records) {
  const page = join(dist, "records", record.id, "index.html");
  const savedCopy = join(dist, "records", "pins", record.id, "index.html");
  if (!existsSync(savedCopy)) fail.push(`outlet record ${record.id} saved-copy page is missing from dist`);
  else if (!existsSync(page) || !readFileSync(page, "utf8").includes(`href="/records/pins/${record.id}/"`)) fail.push(`outlet record ${record.id} does not link to its saved copy`);
}

function* htmlFiles(p) {
  if (!existsSync(p)) return;
  if (statSync(p).isFile()) { if (p.endsWith(".html")) yield p; return; }
  for (const f of readdirSync(p)) yield* htmlFiles(join(p, f));
}

for (const base of SCOPE) {
  for (const f of htmlFiles(base)) {
    const html = readFileSync(f, "utf8");
    const rel = f.slice(dist.length);
    const route = `/${rel.replace(/^\//, "").replace(/index\.html$/, "")}`;
    const exclusion = READER_EXCLUSIONS.find((entry) => entry.prefix ? route.startsWith(entry.route) : route === entry.route);
    if (exclusion) continue;
    fail.push(...publicCopyFindings(html, rel, manifestRecordIds));
  }
}

// route regression: every route in checks/routes.txt must still resolve in dist
const routesFile = join(ROOT, "checks/routes.txt");
if (existsSync(routesFile)) {
  for (const r of readFileSync(routesFile, "utf8").split("\n").map((s) => s.trim()).filter(Boolean).filter((s) => !s.startsWith("#"))) {
    const p = r.endsWith("/") ? join(dist, r, "index.html") : join(dist, r);
    if (!existsSync(p)) fail.push(`route ${r} missing from dist (route regression)`);
  }
} else {
  fail.push("checks/routes.txt missing");
}

// ---- 3. Layer-typing check for three-projection pages -------------------------
// Any story page using the mode-switcher (data-layer system) must have every
// content element typed, either on itself or via an ancestor. Untyped blocks
// render in every mode, which is the rot vector. No class exemptions: a block
// that should always be visible is typed "fact", not skipped.
for (const { subject, story } of storyPages) {
  const storyFile = join(dist, "events", subject, story, "index.html");
  if (existsSync(storyFile)) fail.push(...layerFindings(readFileSync(storyFile, "utf8"), `/events/${subject}/${story}/`));
}
// ---- 3a. Just the facts never shows a heading with nothing under it -----------
// Just the facts lists each section's cited sentences; a section whose story has words but
// whose facts view has none was written with citations that do not sit on its sentences.
for (const { subject, story } of storyPages) {
  const storyFile = join(dist, "events", subject, story, "index.html");
  if (!existsSync(storyFile)) continue;
  const html = readFileSync(storyFile, "utf8");
  if (!html.includes("mode-switcher")) continue;
  for (const heading of emptyFactsSections(html)) fail.push(`/events/${subject}/${story}/: "${heading}" is empty in Just the facts; cite its fact sentences one by one`);
}

// ---- 3b. What the reader sees in The story and Just the facts ------------------
// Proof is excluded: the auditor register may name files and dates. Everything else
// is the page talking to a stranger. The rules and their fixtures live in
// scripts/story-copy-rules.mjs.
for (const { subject, story } of storyPages) {
  const storyFile = join(dist, "events", subject, story, "index.html");
  if (!existsSync(storyFile)) continue;
  fail.push(...storyFindings(readFileSync(storyFile, "utf8"), `/events/${subject}/${story}/`));
}

// Every source reference and saved passage is checked on event and article routes.
const citationRecords = new Map([...outletById, ...manifestRecords]);
for (const { subject, story } of storyPages) {
  const storyFile = join(dist, "events", subject, story, "index.html");
  if (existsSync(storyFile)) fail.push(...citationFindings(readFileSync(storyFile, "utf8"), `/events/${subject}/${story}/`, citationRecords, ROOT));
}

const allStateViews = readState();
fail.push(...checkArticlePages({ root: ROOT, dist }));

for (const id of allStateViews.events.keys()) {
  if (!stateViews.events.has(id) && existsSync(join(dist, eventPath(id), 'index.html'))) fail.push(`Unselected event has a public route: ${id}`);
}
const generated = checkStatePages(stateViews, dist);
fail.push(...generated.failures);
const v2Pages = checkV2Pages(dist, join(ROOT, "data/v2"), join(ROOT, "checks/manifests"));
fail.push(...v2Pages.failures);
if (v2Pages.report.length) console.log(formatV2Report(v2Pages.report));
try { checkPageFigures(readFileSync(join(dist, 'index.html'), 'utf8'), stateViews); }
catch (error) { fail.push(error.message); }

if (fail.length) {
  console.error(`EVENT GATE FAILED (${fail.length}):`);
  for (const f of fail) console.error("  - " + f);
  process.exit(1);
}
console.log(`event gate passed: ${storyPages.length} prose manifests; ${generated.checked.length} generated stories verified; ${v2Pages.checked.length} v2 stories verified; mechanical checks clean`);
