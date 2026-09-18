#!/usr/bin/env node
// Every cited sentence on a story page with the record and passage it cites, as one table:
// the input to the entailment pass and the reviewer's claim read.
// Usage: node skills/catch-event-page/scripts/claim_table.mjs <subject>/<story> [--json]
import fs from "node:fs";
import path from "node:path";

const story = process.argv[2];
if (!story || !story.includes("/")) { console.error("usage: claim_table.mjs <subject>/<story> [--json]"); process.exit(2); }
const asJson = process.argv.includes("--json");
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const [subject, slug] = story.split("/");
const page = fs.readFileSync(path.join(root, "src/pages/events", subject, `${slug}.astro`), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "checks/manifests", `${subject}--${slug}.json`), "utf8"));
const records = new Map(manifest.records.map((r) => [r.id, r]));

const decode = (s) => s
  .replace(/&ldquo;|&rdquo;|&quot;/g, '"').replace(/&rsquo;|&lsquo;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
  .replace(/\{`([^`]*)`\}/g, "$1").replace(/\s+/g, " ").trim();

// Blocks that carry reader copy: paragraphs, list items, figcaptions, chart-source lines.
// One row per block: its whole text and every passage it cites, because adjacent cites at
// the end of a paragraph cover the paragraph jointly, not one sentence each.
const blocks = [...page.matchAll(/<(p|li|figcaption)\b[^>]*>([\s\S]*?)<\/\1>/g)];
const rows = [];
let n = 0;
for (const m of blocks) {
  const body = m[2];
  if (!/<Cite\b/.test(body)) continue;
  const line = page.slice(0, m.index).split("\n").length;
  const text = decode(body.replace(/<Cite\s+[^>]*\/>/g, " ").replace(/<[^>]+>/g, " "));
  const cites = [...body.matchAll(/<Cite\s+s="([^"]+)"(?:\s+passage="([^"]*)")?/g)].map((c) => {
    const record = records.get(c[1]);
    return { record: c[1], passage: c[2] ? decode(c[2]) : null, text_path: record?.text_path || record?.pinned_path || null, publisher: record?.publisher || null };
  });
  rows.push({ n: ++n, line, text, cites });
}

if (asJson) { console.log(JSON.stringify({ story, rows }, null, 1)); process.exit(0); }
console.log(`# Cited blocks on /events/${story}/ (${rows.length} rows, ${rows.reduce((a, r) => a + r.cites.length, 0)} citations)\n`);
console.log("| # | line | block text | citations (record: passage; text pin) |");
console.log("|---|---|---|---|");
const cell = (s) => String(s ?? "").replace(/\|/g, "\\|");
for (const r of rows) console.log(`| ${r.n} | ${r.line} | ${cell(r.text)} | ${r.cites.map((c) => `${c.record}: ${cell(c.passage ?? "(record quote)")}; ${cell(c.text_path)}`).join("<br>")} |`);
