#!/usr/bin/env node
// Tests the story view against the reader model's grades, passage by passage. Every A or B row
// in the Grades table opens with the words the story cites, in double quotes; those words are
// the passage's identity. A story-view paragraph is inside the budget when one of its Cites
// quotes, word for word, the words of an A or B row for its record. Every Cite is a literal;
// the lint refuses one it cannot read. Every record cited anywhere on the page, and every
// record in the manifest, has a Grades row, and every A or B passage is carried by a Cite outside
// the proof layer.
// Usage: node story_budget.mjs <page.astro> <reader-model.md> [manifest.json]
// Exit 1 on any defect, 2 when the reader model cannot be judged (no ## Headline, no Grades rows).
import { readFileSync } from "node:fs";
import { readCites, lineOf } from "./cite_attrs.mjs";

const [page, model, manifest] = process.argv.slice(2);
if (!page || !model || process.argv.includes("--help")) {
  console.error("usage: node story_budget.mjs src/pages/events/<subject>/<story>.astro checks/reader-models/<subject>--<story>.md [checks/manifests/<subject>--<story>.json]");
  process.exit(page && model ? 0 : 2);
}

const normal = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim().toLowerCase();
// Comma-separated cells: every leading number is an answer and must be 1 to 7; what follows the
// last number is the clause, at least two words that each carry a letter.
const servesOk = (s) => {
  const parts = s.split(",").map((p) => p.trim());
  let i = 0;
  while (i < parts.length && /^\d+$/.test(parts[i])) i += 1;
  if (i === 0 || !parts.slice(0, i).every((p) => /^[1-7]$/.test(p))) return false;
  return parts.slice(i).join(",").split(/\s+/).filter((w) => /\p{L}/u.test(w)).length >= 2;
};

const text = readFileSync(model, "utf8");
if (!/^## Headline\s*$/m.test(text)) {
  console.error(`story_budget: ${model} has no "## Headline"; it predates skills 3.5. Rerun turn two (finish.sh <story> structure) before the story turn.`);
  process.exit(2);
}
const gradesBlock = text.match(/^## Grades\s*$([\s\S]*?)(?=^## |(?![\s\S]))/m);
if (!gradesBlock) { console.error(`story_budget: ${model} has no "## Grades" section`); process.exit(2); }

const rows = [];
const defects = [];
// A Markdown row: cells split on unescaped pipes, "\|" inside a cell reads as a pipe. The
// quoted runs open the passage cell between straight double quotes; quotation marks inside
// the run are written curly and fold to straight when compared.
const cellsOf = (line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, "|").trim());
for (const line of gradesBlock[1].split("\n")) {
  if (!/^\s*\|/.test(line)) continue;
  const cells = cellsOf(line);
  const idm = cells.length >= 4 ? cells[0].match(/^`([^`]+)`$/) : null;
  if (!idm || !/^[ABCD]$/.test(cells[2])) continue;
  const [id, cell, grade, serves] = [idm[1], cells[1], cells[2], cells[3]];
  const words = [];
  let rest = cell;
  for (let q; (q = rest.match(/^"([^"]*)"\s*/));) { words.push(normal(q[1])); rest = rest.slice(q[0].length); }
  const row = { id, grade, words, serves, line: line.trim().slice(0, 100) };
  rows.push(row);
  if (grade === "A" || grade === "B") {
    if (words.length === 0) defects.push(`${model}: ${grade} row for ${id} does not open its passage cell with the words the story cites, in double quotes: ${row.line}`);
    if (!servesOk(row.serves)) defects.push(`${model}: ${grade} row for ${id} must name an answer (1 to 7) and the clause it changes in the Serves column ("1, who decided"): ${row.line}`);
  }
}
if (rows.length === 0) { console.error(`story_budget: no graded rows under "## Grades" in ${model}`); process.exit(2); }

const graded = new Set(rows.map((r) => r.id));
const storyRows = rows.filter((r) => (r.grade === "A" || r.grade === "B") && r.words.length);
const inBudget = (id, passage) => storyRows.some((r) => r.id === id && r.words.includes(normal(passage)));

const source = readFileSync(page, "utf8");
const cites = readCites(source);
const ungraded = new Set();
for (const c of cites) {
  if (!c.readable) { defects.push(`${page}:${lineOf(source, c.index)}: Cite the lint cannot read; write the record id and the passage as literals (s="..." passage="..."): ${c.raw}`); continue; }
  if (!graded.has(c.s)) ungraded.add(c.s);
}
if (manifest) {
  const m = JSON.parse(readFileSync(manifest, "utf8"));
  for (const r of m.records ?? []) if (r.id && !graded.has(r.id)) ungraded.add(r.id);
}

// The other direction: every A or B passage is carried by a Cite in the story view or a fact
// block. A Cite inside a proof paragraph does not carry it.
const proofRanges = [...source.matchAll(/<p\b[^>]*data-layer="proof"[^>]*>[\s\S]*?<\/p>/g)].map((m) => [m.index, m.index + m[0].length]);
const carried = cites.filter((c) => c.readable && c.passage !== null && !proofRanges.some(([a, b]) => c.index >= a && c.index < b));
let missing = 0;
for (const r of storyRows) for (const w of r.words) {
  if (carried.some((c) => c.s === r.id && normal(c.passage) === w)) continue;
  missing += 1;
  console.log(`${page}: ${r.grade} passage of ${r.id} that no story-view or fact-block Cite carries: "${w}"`);
}

let listed = 0;
for (const p of source.matchAll(/<p\b[^>]*data-layer="narrative"[^>]*>([\s\S]*?)<\/p>/g)) {
  const end = p.index + p[0].length;
  const own = cites.filter((c) => c.readable && c.index >= p.index && c.index < end);
  if (own.length === 0) continue;
  if (own.some((c) => c.passage !== null && inBudget(c.s, c.passage))) continue;
  listed += 1;
  const why = own.map((c) => {
    if (!graded.has(c.s)) return `${c.s} (ungraded)`;
    if (c.passage === null) return `${c.s} (Cite has no passage=)`;
    const best = rows.filter((r) => r.id === c.s).map((r) => r.grade).sort()[0];
    return storyRows.some((r) => r.id === c.s) ? `${c.s} (the cited words are not the words of any A or B row; best grade ${best})` : `${c.s} (${best})`;
  });
  const preview = p[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 90);
  console.log(`${page}:${lineOf(source, p.index)}: story-view paragraph outside the budget: ${why.join(", ")}: ${preview}`);
}
for (const id of ungraded) console.log(`${model}: record on the page or in the manifest with no Grades row: ${id}`);
for (const d of defects) console.log(d);

const total = listed + ungraded.size + defects.length + missing;
console.log(total === 0 ? "story_budget: clean" : `story_budget: ${listed} paragraph(s) outside the budget, ${ungraded.size} record(s) ungraded, ${defects.length} row(s) or Cite(s) the lint refuses, ${missing} graded passage(s) the page does not carry`);
process.exit(total === 0 ? 0 : 1);
