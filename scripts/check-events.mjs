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

const ROOT = new URL("..", import.meta.url).pathname;
const fail = [];

// ---- 1. Manifests for story pages -------------------------------------------------
const REQUIRED_STEPS = [
  "sources_admitted",        // every source saved under data/sources/, SOURCES.md regenerated
  "derived_numbers_computed",// each derived figure computed from admitted series, receipt in reader words
  "outlet_claims_verified",  // each outlet claim compared to the primary record before verdicts
  "section_grammar",         // fixed section order; sections dropped only when truly empty
  "chip_vocabulary",         // closed chip set only
  "live_elements_guarded",   // every live element carries last-checked date + correction promise
  "subject_page_updated",    // timeline row + KPI/chart refresh on the standing subject page
  "homepage_updated",        // homepage features the latest story
];

const eventsDir = join(ROOT, "src/pages/events");
const storyPages = [];
for (const subject of readdirSync(eventsDir)) {
  const p = join(eventsDir, subject);
  if (!statSync(p).isDirectory() || subject.startsWith("[")) continue;
  for (const f of readdirSync(p)) {
    if (f.endsWith(".astro") && f !== "index.astro") storyPages.push({ subject, story: f.replace(/\.astro$/, "") });
  }
}

for (const { subject, story } of storyPages) {
  const mPath = join(ROOT, "checks/manifests", `${subject}--${story}.json`);
  if (!existsSync(mPath)) {
    fail.push(`story /events/${subject}/${story}/ has no manifest at checks/manifests/${subject}--${story}.json`);
    continue;
  }
  let m;
  try { m = JSON.parse(readFileSync(mPath, "utf8")); }
  catch (e) { fail.push(`${mPath}: unreadable JSON (${e.message})`); continue; }
  validateRecordManifest(mPath, m);
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
  for (const field of ["subject", "event", "date", "sub_events", "records"]) {
    if (!(field in manifest)) fail.push(`${mPath}: records manifest requires ${field}`);
  }
  if (!Array.isArray(manifest.sub_events) || !Array.isArray(manifest.records)) return;
  const ids = new Set();
  for (const record of manifest.records) {
    for (const field of ["id", "title", "publisher", "date", "url", "pinned_path", "text_path", "text_sha256", "quote", "quote_span_check"]) {
      if (!record[field]) fail.push(`${mPath}: record needs ${field}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id ?? "")) fail.push(`${mPath}: record id ${record.id} is not a stable slug`);
    if (ids.has(record.id)) fail.push(`${mPath}: duplicate record id ${record.id}`);
    ids.add(record.id);
    if (record.quote_span_check === "quote_unverified") fail.push(`${mPath}: ${record.id} has an unverified quote`);
    if (!['byte_exact', 'normalized'].includes(record.quote_span_check)) fail.push(`${mPath}: ${record.id} has an unknown quote check`);
    const textPath = record.text_path && join(ROOT, record.text_path);
    if (!textPath || !existsSync(textPath)) { fail.push(`${mPath}: ${record.id} text pin is missing`); continue; }
    const actual = `sha256:${createHash("sha256").update(readFileSync(textPath)).digest("hex")}`;
    if (actual !== record.text_sha256) fail.push(`${mPath}: ${record.id} text hash does not recompute`);
    const text = readFileSync(textPath, "utf8");
    const contains = record.quote_span_check === "byte_exact"
      ? text.includes(record.quote)
      : text.replace(/\s+/g, " ").includes(record.quote.replace(/\s+/g, " "));
    if (!contains) fail.push(`${mPath}: ${record.id} quote is absent from its text pin`);
  }
  for (const subEvent of manifest.sub_events) {
    for (const field of ["id", "date", "label", "section_anchor", "records"]) {
      if (!(field in subEvent)) fail.push(`${mPath}: sub-event needs ${field}`);
    }
    if (!Array.isArray(subEvent.records)) continue;
    for (const id of subEvent.records) if (!ids.has(id)) fail.push(`${mPath}: sub-event ${subEvent.id} names unknown record ${id}`);
  }
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
    if (manifest.subject?.startsWith("officials/")) continue;
    const route = manifest.story || (manifest.event ? `/events/${manifest.event}/` : null);
    if (!route) fail.push(`checks/manifests/${filename}: event index requires story or event route`);
    else indexManifestRoutes.push(route);
  } catch (error) {
    fail.push(`checks/manifests/${filename}: unreadable JSON (${error.message})`);
  }
}

// ---- 2. Mechanical checks on dist -------------------------------------------------
const dist = join(ROOT, "dist");
const READER_EXCLUSIONS = [
  {
    route: "/news/",
    prefix: true,
    date: "2026-08-25",
    reason: "demoted internal export; noindex and absent from public navigation",
  },
];
const TODAY = new Date().toISOString().slice(0, 10);
for (const exclusion of READER_EXCLUSIONS) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(exclusion.date) || !exclusion.reason) fail.push(`reader exclusion ${exclusion.route} needs a date and reason`);
  if (exclusion.expires && (!/^\d{4}-\d{2}-\d{2}$/.test(exclusion.expires) || exclusion.expires < TODAY)) fail.push(`reader exclusion ${exclusion.route} expired on ${exclusion.expires}`);
}
const SCOPE = ["events", "claims", "officials"].map((d) => join(dist, d)).concat(join(dist, "index.html"));
const manifestRecordIds = new Set();
const manifestRecords = new Map();
for (const filename of readdirSync(join(ROOT, "checks/manifests")).filter((name) => name.endsWith(".json"))) {
  const manifest = JSON.parse(readFileSync(join(ROOT, "checks/manifests", filename), "utf8"));
  for (const record of manifest.records ?? []) { manifestRecordIds.add(record.id); manifestRecords.set(record.id, record); }
}
const newsData = JSON.parse(readFileSync(join(ROOT, "src/data/news-data.json"), "utf8"));
const outletRecordData = JSON.parse(readFileSync(join(ROOT, "src/data/news-records.json"), "utf8"));
const outletUrls = new Set(outletRecordData.records.map((record) => record.url));
const outletByUrl = new Map(outletRecordData.records.map((record) => [record.url, record]));
for (const url of new Set(newsData.rows.map((row) => row.source_url))) if (!outletUrls.has(url)) fail.push(`news citation has no outlet record: ${url}`);
for (const record of outletRecordData.records) {
  if (!record.text_path || !existsSync(record.text_path)) fail.push(`outlet record ${record.id} text pin is missing`);
  else if (`sha256:${createHash("sha256").update(readFileSync(record.text_path)).digest("hex")}` !== record.text_sha256) fail.push(`outlet record ${record.id} text hash does not recompute`);
}
for (const filename of ["fed-rate.mjs", "jobs.mjs"]) {
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
const INTERNAL = ["byte-captured", "capture debt", "operator review", "signed export",
  "retrieval", "automated", "staging", "sha256", "checked into", "admission row hash",
  "eligibility", "eligible claim", "manifested", "dossier", "pipeline", "staged", "zain review", "w7", "wave", "internal review"];

const eventsIndex = join(dist, "events", "index.html");
if (!existsSync(eventsIndex)) fail.push("/events/ index missing from dist");
else {
  const html = readFileSync(eventsIndex, "utf8");
  for (const route of indexManifestRoutes) {
    if (!html.includes(`href="${route}"`)) fail.push(`/events/ index missing manifested route ${route}`);
  }
}

const newsIndex = join(dist, "news", "index.html");
if (!existsSync(newsIndex)) fail.push("demoted /news/ index missing from dist");
else {
  const html = readFileSync(newsIndex, "utf8");
  if (!html.includes('<meta name="robots" content="noindex">')) fail.push("demoted /news/ needs noindex");
  if (!/Internal source export/.test(html)) fail.push("demoted /news/ needs an internal export label");
  for (const f of htmlFiles(join(dist, "news"))) {
    if (!readFileSync(f, "utf8").includes('<meta name="robots" content="noindex">')) fail.push(`${f.slice(dist.length)}: demoted news page needs noindex`);
  }
}
const homeNavigation = readFileSync(join(dist, "index.html"), "utf8").match(/<nav>[\s\S]*?<\/nav>/i)?.[0] ?? "";
if (homeNavigation.includes('href="/news/"')) fail.push("demoted /news/ remains in public navigation");

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
    const readerHtml = html.replace(/<table[\s\S]*?<\/table>/gi, "");
    for (const match of html.matchAll(/data-record="([^"]+)"/g)) {
      const id = match[1];
      if (!manifestRecordIds.has(id)) fail.push(`${rel}: record chip names unknown record ${id}`);
      else if (!html.includes(`href="/records/${id}/"`)) fail.push(`${rel}: record chip ${id} does not link to its record page`);
    }
    if (readerHtml.includes("—")) fail.push(`${rel}: em dash in public copy`);
    // Tables reproduce source-record language verbatim; scan authored reader copy only.
    const text = readerHtml.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
    for (const w of INTERNAL) {
      if (text.toLowerCase().includes(w)) fail.push(`${rel}: internal vocabulary "${w}" in visible text`);
    }
    // jammed text-to-inline-tag boundaries (rendered artifact of template line joins)
    const deEntitied = html.replace(/&[a-zA-Z#0-9]+;/g, " ");
    if (/[a-zA-Z0-9,.;:%)”]<(?:strong|em|a[ >]|span)/.test(deEntitied)) fail.push(`${rel}: text jammed against an inline tag (missing space)`);
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

if (fail.length) {
  console.error(`EVENT GATE FAILED (${fail.length}):`);
  for (const f of fail) console.error("  - " + f);
  process.exit(1);
}
console.log(`event gate passed: ${storyPages.length} story page(s) manifested, mechanical checks clean`);
