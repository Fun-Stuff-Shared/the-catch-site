#!/usr/bin/env node
/**
 * new-event: scaffold a new event page from a recipe.
 *
 * Usage:
 *   node scripts/new-event.mjs --recipe fomc --date 2026-09-17
 *   node scripts/new-event.mjs --recipe jobs-report --date 2026-09-05
 *   node scripts/new-event.mjs --recipe coverage-only --slug ukraine-ceasefire --title "..."
 *
 * What it does:
 *   1. Reads the recipe JSON from recipes/<type>.json
 *   2. Creates data/sources/<event>/ directory for admitted sources
 *   3. Scaffolds the data module (src/data/<slug>.mjs) with empty fields from the recipe
 *   4. Scaffolds the story page (src/pages/events/<subject>/<story>.astro) with components
 *   5. Scaffolds the manifest (checks/manifests/<subject>--<story>.json) with all steps unattested
 *   6. Prints the dossier checklist: what to fetch, what to compute, what sections to write
 *
 * Does NOT:
 *   - Fetch any sources (that's the agent's dossier stage)
 *   - Write any prose (that's the synthesis turn)
 *   - Attest any manifest steps (that's the agent's job after verification)
 *   - Push or deploy anything
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const args = process.argv.slice(2);

function flag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : null;
}

const recipeType = flag("recipe");
const eventDate = flag("date");
const customSlug = flag("slug");
const customTitle = flag("title");

if (!recipeType) {
  console.error("Usage: node scripts/new-event.mjs --recipe <type> --date <YYYY-MM-DD> [--slug <slug>] [--title <title>]");
  console.error("Available recipes:");
  const { readdirSync } = await import("node:fs");
  for (const f of readdirSync(join(ROOT, "recipes")).filter((n) => n.endsWith(".json"))) {
    const recipe = JSON.parse(readFileSync(join(ROOT, "recipes", f), "utf8"));
    console.error(`  ${f.replace(".json", "").padEnd(20)} ${recipe.name}`);
  }
  process.exit(1);
}

const recipePath = join(ROOT, "recipes", `${recipeType}.json`);
if (!existsSync(recipePath)) {
  console.error(`Recipe not found: ${recipePath}`);
  process.exit(1);
}

const recipe = JSON.parse(readFileSync(recipePath, "utf8"));
const date = eventDate ? new Date(eventDate) : new Date();
const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const monthName = monthNames[date.getMonth()];
const year = date.getFullYear();
const dateStr = eventDate || date.toISOString().slice(0, 10);
const yyyymmdd = dateStr.replace(/-/g, "");

// Derive slugs
const subject = recipe.subject_slug || customSlug || recipeType;
const storySlug = customSlug || `${monthName}-${year}`;
const dataModuleName = customSlug || `${subject.replace(/-/g, "")}${yyyymmdd}`;

console.log(`\n  Recipe: ${recipe.name}`);
console.log(`  Date: ${dateStr}`);
console.log(`  Subject: ${subject}`);
console.log(`  Story: ${storySlug}`);
console.log(`  Data module: src/data/${dataModuleName}.mjs`);
console.log(`  Page: src/pages/events/${subject}/${storySlug}.astro`);
console.log(`  Manifest: checks/manifests/${subject}--${storySlug}.json`);
console.log();

// 1. Create source directory
const sourceDir = join(ROOT, "data/sources");
mkdirSync(sourceDir, { recursive: true });

// 2. Scaffold data module
const dataPath = join(ROOT, `src/data/${dataModuleName}.mjs`);
if (existsSync(dataPath)) {
  console.log(`  SKIP: data module already exists at ${dataPath}`);
} else {
  const kpis = recipe.type === "fomc"
    ? `[\n    { value: "TODO", unit: "%", label: "target range" },\n    { value: "TODO", unit: "days", label: "held at this level", live: true },\n    { value: "TODO", label: "the vote" },\n    { value: "TODO", unit: "pctile", label: "of 44 years of policy" },\n  ]`
    : recipe.type === "jobs-report"
    ? `[\n    { value: "TODO", label: "payrolls" },\n    { value: "TODO", unit: "%", label: "unemployment rate" },\n    { value: "TODO", label: "prior months revised" },\n    { value: "TODO", label: "negative months in past year" },\n  ]`
    : `[\n    // Fill from dossier\n  ]`;

  const sources = (recipe.primary_sources || []).map((s) => {
    const url = (s.url_template || "").replace("{YYYYMMDD}", yyyymmdd);
    return `  { id: "TODO", name: "${s.name}", url: "${url}", kind: "primary" },`;
  }).join("\n");

  const module = `// ${recipe.name}: ${dateStr}
// Every figure traces to a source in data/sources/SOURCES.md.
// Computed values derive from the pinned data series.

export const event = {
  slug: "${subject}/${storySlug}",
  title: "${customTitle || "TODO: headline"}",
  dek: "TODO: one-sentence summary",
  name: "TODO: short name",
  date: "${dateStr}",
  updated: "${new Date().toISOString().slice(0, 10)}",
  kpis: ${kpis},
};

${recipe.type === "fomc" ? `// Rate path: upper bound of the target range, change points only.
// Derived from FRED DFEDTARU (daily, checked into data/sources/DFEDTARU.csv).
export const ratePath = {
  start: { date: "2024-01-01", value: 5.5 },
  changes: [
    // TODO: fill from DFEDTARU
  ],
  end: { date: "${dateStr}", value: 0 }, // TODO
};
` : ""}
export const sources = [
${sources}
];
`;
  writeFileSync(dataPath, module);
  console.log(`  CREATED: ${dataPath}`);
}

// 3. Scaffold story page
const pageDir = join(ROOT, `src/pages/events/${subject}`);
mkdirSync(pageDir, { recursive: true });
const pagePath = join(pageDir, `${storySlug}.astro`);
if (existsSync(pagePath)) {
  console.log(`  SKIP: page already exists at ${pagePath}`);
} else {
  const depth = subject.includes("/") ? 4 : 3;
  const rel = "../".repeat(depth);
  const sections = (recipe.sections || []).filter((s) => s.required !== false);
  const tocEntries = sections.map((s) => `        { id: "${s.id}", label: "TODO" },`).join("\n");
  const sectionBlocks = sections.map((s) => `
      <section id="${s.id}">
        <SectionKicker text="${s.kicker}" />
        <h2>TODO: ${s.id}</h2>
        <!-- Fill from dossier -->
      </section>`).join("\n");

  const page = `---
import BaseLayout from "${rel}layouts/BaseLayout.astro";
import KpiStrip from "${rel}components/story/KpiStrip.astro";
import ThreeThings from "${rel}components/story/ThreeThings.astro";
import StoryToc from "${rel}components/story/StoryToc.astro";
import SectionKicker from "${rel}components/story/SectionKicker.astro";
${recipe.type === "fomc" ? `import StepChart from "${rel}components/story/StepChart.astro";\n` : ""}${recipe.type === "jobs-report" ? `import BarChart from "${rel}components/story/BarChart.astro";\nimport DataTable from "${rel}components/story/DataTable.astro";\n` : ""}import OutletCheck from "${rel}components/story/OutletCheck.astro";
import CheckedBlock from "${rel}components/story/CheckedBlock.astro";
import Chip from "${rel}components/story/Chip.astro";
import RailedParagraph from "${rel}components/story/RailedParagraph.astro";
import Receipt from "${rel}components/story/Receipt.astro";
import RecordsList from "${rel}components/story/RecordsList.astro";
import "${rel}styles/story.css";
import { event } from "${rel}data/${dataModuleName}.mjs";
---
<BaseLayout title={\`\${event.title} | The Catch\`} current="Events">
  <div slot="locator" class="locator">
    <span>EVENTS</span>
    <a href="/events/${subject}/" class="loc-event">TODO: subject name</a>
    <span>${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}</span>
  </div>
  <div class="content">
    <main class="story">
      <p class="story-kicker"><a href="/events/${subject}/">TODO: subject</a> &middot; ${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year} &middot; updated {event.updated}</p>
      <h1>{event.title}</h1>
      <p class="story-dek">{event.dek}</p>

      <KpiStrip kpis={event.kpis} />

      <ThreeThings items={[
        "TODO: first thing",
        "TODO: second thing",
        "TODO: third thing",
      ]} />

      <StoryToc sections={[
${tocEntries}
      ]} />
${sectionBlocks}
    </main>
  </div>
</BaseLayout>
`;
  writeFileSync(pagePath, page);
  console.log(`  CREATED: ${pagePath}`);
}

// 4. Scaffold manifest
const manifestPath = join(ROOT, `checks/manifests/${subject}--${storySlug}.json`);
if (existsSync(manifestPath)) {
  console.log(`  SKIP: manifest already exists at ${manifestPath}`);
} else {
  const steps = {};
  for (const step of recipe.manifest_template?.steps || []) {
    steps[step] = { done: false, evidence: "" };
  }
  const manifest = {
    story: `/events/${subject}/${storySlug}/`,
    subject,
    completed_by: "",
    date: dateStr,
    event: `${subject}/${storySlug}`,
    sub_events: [],
    records: [],
    steps,
  };
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`  CREATED: ${manifestPath}`);
}

// 5. Print dossier checklist
console.log("\n  ─── DOSSIER CHECKLIST ───\n");

if (recipe.primary_sources?.length) {
  console.log("  Primary sources to fetch:");
  for (const s of recipe.primary_sources) {
    const url = (s.url_template || "").replace("{YYYYMMDD}", yyyymmdd);
    console.log(`    □ ${s.name}`);
    if (url && !url.includes("{")) console.log(`      ${url}`);
    if (s.note) console.log(`      Note: ${s.note}`);
    console.log(`      Pin as: data/sources/${(s.pin_as || "TODO").replace("{YYYYMMDD}", yyyymmdd)}`);
  }
}

if (recipe.data_series?.length) {
  console.log("\n  Data series to pull:");
  for (const s of recipe.data_series) {
    console.log(`    □ ${s.name} (FRED ${s.fred_id})`);
    console.log(`      https://fred.stlouisfed.org/graph/fredgraph.csv?id=${s.fred_id}`);
    console.log(`      Pin as: data/sources/${s.pin_as}`);
  }
}

if (recipe.computations?.length) {
  console.log("\n  Computations:");
  for (const c of recipe.computations) {
    console.log(`    □ ${c.id}: ${c.description}`);
  }
}

if (recipe.grok_scope?.length) {
  console.log("\n  Grok-assisted search (specific gaps only):");
  for (const g of recipe.grok_scope) {
    console.log(`    □ ${g.purpose}: ${g.constraint}`);
  }
}

if (recipe.subject_page_updates?.length) {
  console.log("\n  Subject page updates:");
  for (const u of recipe.subject_page_updates) {
    console.log(`    □ ${u}`);
  }
}

console.log("\n  After synthesis: npm run build (gate must pass), then git push to deploy.\n");
