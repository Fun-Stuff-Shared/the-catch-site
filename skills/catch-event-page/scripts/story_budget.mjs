#!/usr/bin/env node
// Tests the story view against the reader model's grades, passage by passage. Every A or B row
// in the Grades table opens with the words the story cites; a story-view paragraph is inside the
// budget when at least one of its Cites quotes a run of at least three words from an A or B row
// of its record. Every Cite is a literal; the lint refuses one it cannot read.
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
const wordCount = (s) => s.split(" ").filter(Boolean).length;
const citesRow = (rowWords, passage) => wordCount(passage) >= 3 && rowWords.includes(passage);

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
  const quoted = cell.trim().match(/^["“]([^"”]+)["”]/);
  const row = { id, grade, words: quoted ? normal(quoted[1]) : null, serves: serves.trim(), line: line.trim().slice(0, 100) };
  rows.push(row);
  if (grade === "A" || grade === "B") {
    if (!row.words) defects.push(`${model}: ${grade} row for ${id} does not open its passage cell with the words the story cites, in double quotes: ${row.line}`);
    if (!/^\d+(\s*,\s*\d+)*\s*,\s*[^\d\s,]/.test(row.serves)) defects.push(`${model}: ${grade} row for ${id} must name the answer and the clause it changes in the Serves column ("1, who decided"): ${row.line}`);
  }
}
if (rows.length === 0) { console.error(`story_budget: no graded rows under "## Grades" in ${model}`); process.exit(2); }

const graded = new Set(rows.map((r) => r.id));
const storyRows = rows.filter((r) => (r.grade === "A" || r.grade === "B") && r.words);
const inBudget = (id, passage) => storyRows.some((r) => r.id === id && citesRow(r.words, normal(passage)));

const source = readFileSync(page, "utf8");
const lineOf = (index) => source.slice(0, index).split("\n").length;
const citeRe = /<Cite\b([^>]*)>/g;
const UNREADABLE = Symbol("unreadable");
// A literal attribute, written s="..." or s={"..."}; any other expression is unreadable here.
const attr = (attrs, name) => {
  const m = attrs.match(new RegExp(`\\b${name}=(?:"([^"]*)"|\\{\\s*"([^"]*)"\\s*\\}|\\{\\s*'([^']*)'\\s*\\}|(\\{))`));
  if (!m) return null;
  return m[4] ? UNREADABLE : (m[1] ?? m[2] ?? m[3]);
};

const ungraded = new Set();
for (const c of source.matchAll(citeRe)) {
  const id = attr(c[1], "s"), passage = attr(c[1], "passage");
  if (id === UNREADABLE || passage === UNREADABLE) { defects.push(`${page}:${lineOf(c.index)}: Cite the lint cannot read (an attribute is an expression); write the record id and the passage as literals: ${c[0].slice(0, 80)}`); continue; }
  if (id && !graded.has(id)) ungraded.add(id);
}
if (manifest) {
  const m = JSON.parse(readFileSync(manifest, "utf8"));
  for (const r of m.records ?? []) if (r.id && !graded.has(r.id)) ungraded.add(r.id);
}

let listed = 0;
for (const p of source.matchAll(/<p\b[^>]*data-layer="narrative"[^>]*>([\s\S]*?)<\/p>/g)) {
  const cites = [...p[1].matchAll(citeRe)].map((c) => ({ id: attr(c[1], "s"), passage: attr(c[1], "passage") })).filter((c) => c.id && c.id !== UNREADABLE && c.passage !== UNREADABLE);
  if (cites.length === 0) continue;
  if (cites.some((c) => c.passage && inBudget(c.id, c.passage))) continue;
  listed += 1;
  const why = cites.map((c) => {
    if (!graded.has(c.id)) return `${c.id} (ungraded)`;
    if (!c.passage) return `${c.id} (Cite has no passage=)`;
    if (wordCount(normal(c.passage)) < 3) return `${c.id} (passage under three words cannot identify a graded passage)`;
    const best = rows.filter((r) => r.id === c.id).map((r) => r.grade).sort()[0];
    return storyRows.some((r) => r.id === c.id) ? `${c.id} (cited words are not a run inside any A or B row's quoted words; best grade ${best})` : `${c.id} (${best})`;
  });
  const preview = p[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 90);
  console.log(`${page}:${lineOf(p.index)}: story-view paragraph outside the budget: ${why.join(", ")}: ${preview}`);
}
for (const id of ungraded) console.log(`${model}: record on the page or in the manifest with no Grades row: ${id}`);
for (const d of defects) console.log(d);

const total = listed + ungraded.size + defects.length;
console.log(total === 0 ? "story_budget: clean" : `story_budget: ${listed} paragraph(s) outside the budget, ${ungraded.size} record(s) ungraded, ${defects.length} row(s) or Cite(s) the lint refuses`);
process.exit(total === 0 ? 0 : 1);
