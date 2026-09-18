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
const blocks = [...page.matchAll(/<(p|li|figcaption)\b[^>]*>([\s\S]*?)<\/\1>/g)];
const rows = [];
let n = 0;
for (const m of blocks) {
  const body = m[2];
  if (!/<Cite\b/.test(body)) continue;
  const line = page.slice(0, m.index).split("\n").length;
  // Split on Cite tags: each segment before a Cite is the text that Cite covers.
  const parts = body.split(/(<Cite\s+[^>]*\/>)/);
  let text = "", last = "";
  for (const part of parts) {
    const cite = part.match(/^<Cite\s+s="([^"]+)"(?:\s+passage="([^"]*)")?/);
    if (!cite) { text += part; continue; }
    const sentence = decode(text.replace(/<[^>]+>/g, " ")) || last;
    last = sentence;
    const record = records.get(cite[1]);
    rows.push({
      n: ++n, line, sentence,
      record: cite[1], passage: cite[2] ? decode(cite[2]) : null,
      text_path: record?.text_path || record?.pinned_path || null,
      publisher: record?.publisher || null,
    });
    text = "";
  }
}

if (asJson) { console.log(JSON.stringify({ story, rows }, null, 1)); process.exit(0); }
console.log(`# Cited sentences on /events/${story}/ (${rows.length} rows)\n`);
console.log("| # | line | sentence | record | passage | text pin |");
console.log("|---|---|---|---|---|---|");
const cell = (s) => String(s ?? "").replace(/\|/g, "\\|");
for (const r of rows) console.log(`| ${r.n} | ${r.line} | ${cell(r.sentence)} | ${r.record} | ${cell(r.passage ?? "(record quote)")} | ${cell(r.text_path)} |`);
