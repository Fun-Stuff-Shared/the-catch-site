#!/usr/bin/env node
// Tests the story view against the reader model's grades, passage by passage. Every A or B row
// in the Grades table quotes the words the story cites; a story-view paragraph is inside the
// budget when at least one of its Cites matches an A or B row of its record by those words.
// Every record cited anywhere on the page, and every record in the manifest, has a Grades row.
// Usage: node story_budget.mjs <page.astro> <reader-model.md> [manifest.json]
// Exit 1 on any defect, 2 when the reader model cannot be judged (no ## Headline, no Grades rows).
import { readFileSync } from "node:fs";

const [page, model, manifest] = process.argv.slice(2);
if (!page || !model || process.argv.includes("--help")) {
  console.error("usage: node story_budget.mjs src/pages/events/<subject>/<story>.astro checks/reader-models/<subject>--<story>.md [checks/manifests/<subject>--<story>.json]");
  process.exit(page && model ? 0 : 2);
}

const normal = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim().toLowerCase();
const wordsMatch = (a, b) => a.length > 0 && b.length > 0 && (a.includes(b) || b.includes(a));

const text = readFileSync(model, "utf8");
if (!/^## Headline\s*$/m.test(text)) {
  console.error(`story_budget: ${model} has no "## Headline"; it predates skills 3.5. Rerun turn two (finish.sh <story> structure) before the story turn.`);
  process.exit(2);
}
const gradesBlock = text.match(/^## Grades\s*$([\s\S]*?)(?=^## |(?![\s\S]))/m);
if (!gradesBlock) { console.error(`story_budget: ${model} has no "## Grades" section`); process.exit(2); }

const rows = [];
const defects = [];
for (const line of gradesBlock[1].split("\n")) {
  const m = line.match(/^\|\s*`([^`]+)`\s*\|([^|]*)\|\s*([ABCD])\s*\|([^|]*)\|/);
  if (!m) continue;
  const [, id, cell, grade, serves] = m;
  const quoted = cell.match(/["“]([^"”]+)["”]/);
  const row = { id, grade, words: quoted ? normal(quoted[1]) : null, serves: serves.trim(), line: line.trim().slice(0, 100) };
  rows.push(row);
  if (grade === "A" || grade === "B") {
    if (!row.words) defects.push(`${model}: ${grade} row for ${id} quotes no passage words (the words the story cites, in double quotes, open the passage cell): ${row.line}`);
    if (!row.serves) defects.push(`${model}: ${grade} row for ${id} names no answer in the Serves column: ${row.line}`);
  }
}
if (rows.length === 0) { console.error(`story_budget: no graded rows under "## Grades" in ${model}`); process.exit(2); }

const graded = new Set(rows.map((r) => r.id));
const storyRows = rows.filter((r) => (r.grade === "A" || r.grade === "B") && r.words);
const inBudget = (id, passage) => storyRows.some((r) => r.id === id && wordsMatch(r.words, normal(passage)));

const source = readFileSync(page, "utf8");
const lineOf = (index) => source.slice(0, index).split("\n").length;
const citeRe = /<Cite\b([^>]*)>/g;
const attr = (attrs, name) => attrs.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? null;

const ungraded = new Set();
for (const c of source.matchAll(citeRe)) {
  const id = attr(c[1], "s");
  if (id && !graded.has(id)) ungraded.add(id);
}
if (manifest) {
  const m = JSON.parse(readFileSync(manifest, "utf8"));
  for (const r of m.records ?? []) if (r.id && !graded.has(r.id)) ungraded.add(r.id);
}

let listed = 0;
for (const p of source.matchAll(/<p\b[^>]*data-layer="narrative"[^>]*>([\s\S]*?)<\/p>/g)) {
  const cites = [...p[1].matchAll(citeRe)].map((c) => ({ id: attr(c[1], "s"), passage: attr(c[1], "passage") })).filter((c) => c.id);
  if (cites.length === 0) continue;
  if (cites.some((c) => c.passage && inBudget(c.id, c.passage))) continue;
  listed += 1;
  const why = cites.map((c) => {
    if (!graded.has(c.id)) return `${c.id} (ungraded)`;
    if (!c.passage) return `${c.id} (Cite has no passage=)`;
    const best = rows.filter((r) => r.id === c.id).map((r) => r.grade).sort()[0];
    return storyRows.some((r) => r.id === c.id) ? `${c.id} (cited words match no A or B row; best grade ${best})` : `${c.id} (${best})`;
  });
  const preview = p[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 90);
  console.log(`${page}:${lineOf(p.index)}: story-view paragraph outside the budget: ${why.join(", ")}: ${preview}`);
}
for (const id of ungraded) console.log(`${model}: record on the page or in the manifest with no Grades row: ${id}`);
for (const d of defects) console.log(d);

const total = listed + ungraded.size + defects.length;
console.log(total === 0 ? "story_budget: clean" : `story_budget: ${listed} paragraph(s) outside the budget, ${ungraded.size} record(s) ungraded, ${defects.length} A or B row(s) incomplete`);
process.exit(total === 0 ? 0 : 1);
