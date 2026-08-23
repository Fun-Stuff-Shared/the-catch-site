// Event-page gate. Runs after astro build; a failure blocks the deploy (Workers git
// build runs `npm run build`). Two layers:
//   1. Manifest: every story page must have a filled attestation manifest in
//      checks/manifests/ covering the judgment steps of docs/EVENT-PAGE-STANDARD.md.
//   2. Mechanical: language and route checks the script runs itself on dist output,
//      so the gate is not attestation alone.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

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
  if (!m.completed_by || !m.date) fail.push(`${mPath}: completed_by and date are required`);
  for (const step of REQUIRED_STEPS) {
    const s = m.steps?.[step];
    if (!s || s.done !== true) fail.push(`${mPath}: step "${step}" is not attested done`);
    else if (!s.evidence || s.evidence.trim().length < 10) fail.push(`${mPath}: step "${step}" needs a real evidence line, not a stub`);
  }
}

// ---- 2. Mechanical checks on dist -------------------------------------------------
const dist = join(ROOT, "dist");
const SCOPE = ["events", "claims"].map((d) => join(dist, d)).concat(join(dist, "index.html"));
const INTERNAL = ["byte-captured", "capture debt", "operator review", "signed export",
  "retrieval", "automated", "staging", "sha256", "checked into"];

function* htmlFiles(p) {
  if (!existsSync(p)) return;
  if (statSync(p).isFile()) { if (p.endsWith(".html")) yield p; return; }
  for (const f of readdirSync(p)) yield* htmlFiles(join(p, f));
}

for (const base of SCOPE) {
  for (const f of htmlFiles(base)) {
    const html = readFileSync(f, "utf8");
    const rel = f.slice(dist.length);
    if (html.includes("—")) fail.push(`${rel}: em dash in public copy`);
    // strip tags to check visible text only for internal vocabulary
    const text = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
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
