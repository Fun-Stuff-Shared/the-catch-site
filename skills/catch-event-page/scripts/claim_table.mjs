#!/usr/bin/env node
// Every cited sentence on a story page with the record and passage it cites, as one table:
// the input to the entailment pass and the reviewer's claim read.
// Usage: node skills/catch-event-page/scripts/claim_table.mjs <subject>/<story> [--json] [--since <commit>]
// With --since, only the blocks whose lines changed since that commit are listed, so an author
// can check the sentences it just wrote without re-judging the whole page.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const story = process.argv[2];
if (!story || !story.includes("/")) { console.error("usage: claim_table.mjs <subject>/<story> [--json] [--since <commit>]"); process.exit(2); }
const asJson = process.argv.includes("--json");
const sinceAt = process.argv.indexOf("--since");
const since = sinceAt > 0 ? process.argv[sinceAt + 1] : null;
if (sinceAt > 0 && !since) { console.error("--since needs a commit"); process.exit(2); }
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const [subject, slug] = story.split("/");
const pagePath = path.join("src/pages/events", subject, `${slug}.astro`);
const page = fs.readFileSync(path.join(root, pagePath), "utf8");

// Hunks of the working tree's page that differ from the page at `since`. A block is changed
// when one of its lines was added or rewritten, or when a deletion falls between two of its
// lines; a deletion just before or after a block only moves it and does not change it.
const hunks = (() => {
  if (!since) return null;
  const diff = execFileSync("git", ["diff", "-U0", since, "--", pagePath], { cwd: root, encoding: "utf8" });
  const out = [];
  for (const h of diff.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(h[1]); const count = h[2] === undefined ? 1 : Number(h[2]);
    out.push(count === 0 ? { deletedAfter: start } : { first: start, last: start + count - 1 });
  }
  return out;
})();
const touches = (first, last) => !hunks || hunks.some((h) =>
  h.deletedAfter !== undefined ? (first <= h.deletedAfter && h.deletedAfter < last) : (first <= h.last && last >= h.first));
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
  const last = line + (m[0].match(/\n/g) || []).length;
  if (!touches(line, last)) continue;
  const text = decode(body.replace(/<Cite\s+[^>]*\/>/g, " ").replace(/<[^>]+>/g, " "));
  const cites = [...body.matchAll(/<Cite\s+s="([^"]+)"(?:\s+passage="([^"]*)")?/g)].map((c) => {
    const record = records.get(c[1]);
    return { record: c[1], passage: c[2] ? decode(c[2]) : null, text_path: record?.text_path || record?.pinned_path || null, publisher: record?.publisher || null };
  });
  rows.push({ n: ++n, line, text, cites });
}

if (asJson) { console.log(JSON.stringify({ story, rows }, null, 1)); process.exit(0); }
console.log(`# Cited blocks on /events/${story}/${since ? ` changed since ${since}` : ""} (${rows.length} rows, ${rows.reduce((a, r) => a + r.cites.length, 0)} citations)\n`);
console.log("| # | line | block text | citations (record: passage; text pin) |");
console.log("|---|---|---|---|");
const cell = (s) => String(s ?? "").replace(/\|/g, "\\|");
for (const r of rows) console.log(`| ${r.n} | ${r.line} | ${cell(r.text)} | ${r.cites.map((c) => `${c.record}: ${cell(c.passage ?? "(record quote)")}; ${cell(c.text_path)}`).join("<br>")} |`);
