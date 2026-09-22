#!/usr/bin/env node
// Lists every story-view narrative paragraph whose cited records carry no passage graded A or B
// in the reader model, and every cited record the reader model does not grade at all.
// Usage: node story_budget.mjs <page.astro> <reader-model.md>   (exit 1 when either list is non-empty)
import { readFileSync } from "node:fs";

const [page, model] = process.argv.slice(2);
if (!page || !model || process.argv.includes("--help")) {
  console.error("usage: node story_budget.mjs src/pages/events/<subject>/<story>.astro checks/reader-models/<subject>--<story>.md");
  process.exit(page && model ? 0 : 2);
}
const rank = { A: 4, B: 3, C: 2, D: 1 };
const best = new Map();
for (const line of readFileSync(model, "utf8").split("\n")) {
  const m = line.match(/^\|\s*`([^`]+)`\s*\|[^|]*\|\s*([ABCD])\s*\|/);
  if (!m) continue;
  const [, id, grade] = m;
  if ((rank[best.get(id)] ?? 0) < rank[grade]) best.set(id, grade);
}
if (best.size === 0) { console.error(`story_budget: no graded rows found in ${model}`); process.exit(2); }
const source = readFileSync(page, "utf8");
const lineOf = (index) => source.slice(0, index).split("\n").length;
let listed = 0;
const ungraded = new Set();
for (const match of source.matchAll(/<p\b[^>]*data-layer="narrative"[^>]*>([\s\S]*?)<\/p>/g)) {
  const ids = [...match[1].matchAll(/<Cite\b[^>]*\bs="([^"]+)"/g)].map((c) => c[1]);
  if (ids.length === 0) continue;
  const grades = ids.map((id) => best.get(id) ?? null);
  ids.forEach((id, i) => { if (grades[i] === null) ungraded.add(id); });
  if (grades.some((g) => g === "A" || g === "B")) continue;
  listed += 1;
  const text = match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 90);
  console.log(`${page}:${lineOf(match.index)}: story-view paragraph cites only ${ids.map((id, i) => `${id} (${grades[i] ?? "ungraded"})`).join(", ")}: ${text}`);
}
for (const id of ungraded) console.log(`${model}: record cited on the page with no graded passage: ${id}`);
console.log(listed === 0 && ungraded.size === 0 ? "story_budget: clean" : `story_budget: ${listed} paragraph(s) outside the budget, ${ungraded.size} cited record(s) ungraded`);
process.exit(listed === 0 && ungraded.size === 0 ? 0 : 1);
