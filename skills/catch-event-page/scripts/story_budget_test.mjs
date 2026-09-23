#!/usr/bin/env node
// Fixtures for story_budget.mjs. Usage: node story_budget_test.mjs   (exit 1 on the first failed case)
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const script = join(dirname(fileURLToPath(import.meta.url)), "story_budget.mjs");
const dir = mkdtempSync(join(tmpdir(), "story-budget-"));
let n = 0;

const model = ({ headline = true, grades = "", extra = "" } = {}) =>
  `# Subject: story\n\n## Entering\n\nx\n\n## Exiting\n\n1. a\n\n${headline ? "## Headline\n\nA headline\n\nDek: two facts\n\n" : ""}## Grades\n\n| Record | Passage or gap or audit finding | Grade | Serves answer |\n|---|---|---|---|\n${grades}\n## Sections\n\n| Section | Question |\n|---|---|\n${extra}`;

const row = (id, words, rest, grade, serves) => `| \`${id}\` | ${words ? `"${words}" ` : ""}${rest} | ${grade} | ${serves} |\n`;
const narrative = (...cites) => `<p data-layer="narrative">Text. ${cites.map(([s, p]) => `<Cite s="${s}" passage="${p}" />`).join(" ")}</p>\n`;
const proof = (...cites) => `<p data-layer="proof">Receipt. ${cites.map(([s, p]) => `<Cite s="${s}" passage="${p}" />`).join(" ")}</p>\n`;

function run(name, { page, rm, manifest, exit, out = [], notOut = [] }) {
  n += 1;
  const p = join(dir, `${n}.astro`); writeFileSync(p, page);
  const m = join(dir, `${n}.md`); writeFileSync(m, rm);
  const args = [script, p, m];
  if (manifest) { const j = join(dir, `${n}.json`); writeFileSync(j, JSON.stringify(manifest)); args.push(j); }
  const r = spawnSync("node", args, { encoding: "utf8" });
  const all = r.stdout + r.stderr;
  const bad = [];
  if (r.status !== exit) bad.push(`exit ${r.status}, wanted ${exit}`);
  for (const s of out) if (!all.includes(s)) bad.push(`missing "${s}"`);
  for (const s of notOut) if (all.includes(s)) bad.push(`unwanted "${s}"`);
  if (bad.length) { console.log(`FAIL ${name}: ${bad.join("; ")}\n${all}`); process.exit(1); }
  console.log(`ok   ${name}`);
}

const A = row("rec-a", "Sheeran and his team decided", "Slide 1: the decision.", "A", "1, who decided");
const D = row("rec-a", null, "Slide 2: a child-death figure.", "D", "");

run("clean: narrative cites the A words", {
  page: narrative(["rec-a", "Ed Sheeran and his team decided to remove me."]),
  rm: model({ grades: A + D }), exit: 0, out: ["story_budget: clean"],
});
run("mixed record: citing the D passage is outside the budget", {
  page: narrative(["rec-a", "a child-death figure of many thousands"]),
  rm: model({ grades: A + D }), exit: 1, out: ["outside the budget", "cited words match no A or B row"],
});
run("cite outside narrative still needs a grade", {
  page: narrative(["rec-a", "Sheeran and his team decided"]) + proof(["rec-z", "some receipt"]),
  rm: model({ grades: A + D }), exit: 1, out: ["no Grades row: rec-z"], notOut: ["paragraph outside the budget"],
});
run("manifest record with no row", {
  page: narrative(["rec-a", "Sheeran and his team decided"]),
  rm: model({ grades: A }), manifest: { records: [{ id: "rec-a" }, { id: "rec-m" }] }, exit: 1, out: ["no Grades row: rec-m"],
});
run("rows outside ## Grades do not count", {
  page: narrative(["rec-a", "Sheeran and his team decided"]),
  rm: model({ grades: "", extra: "\n## Notes\n\n" + A }), exit: 2, out: ["no graded rows"],
});
run("four independent A rows on one answer all count", {
  page: narrative(["w1", "one withdraws"]) + narrative(["w4", "four withdraws"]),
  rm: model({ grades: row("w1", "one withdraws", "", "A", "1") + row("w2", "two withdraws", "", "A", "1") + row("w3", "three withdraws", "", "A", "1") + row("w4", "four withdraws", "", "A", "1") }),
  exit: 0, out: ["story_budget: clean"],
});
run("regex characters in a record id", {
  page: narrative(["rec.(a)+", "Sheeran and his team decided"]),
  rm: model({ grades: row("rec.(a)+", "Sheeran and his team decided", "", "A", "1") }), exit: 0, out: ["story_budget: clean"],
});
run("curly quotes and spacing normalize", {
  page: narrative(["rec-a", "Sheeran’s team  decided"]),
  rm: model({ grades: row("rec-a", "Sheeran's team decided", "", "B", "3") }), exit: 0, out: ["story_budget: clean"],
});
run("reader model without ## Headline is refused", {
  page: narrative(["rec-a", "Sheeran and his team decided"]),
  rm: model({ headline: false, grades: A }), exit: 2, out: ["Rerun turn two"],
});
run("A row without quoted words is incomplete", {
  page: narrative(["rec-a", "Sheeran and his team decided"]),
  rm: model({ grades: row("rec-a", null, "Slide 1: the decision.", "A", "1") }), exit: 1, out: ["quotes no passage words", "outside the budget"],
});
run("B row without an answer is incomplete", {
  page: narrative(["rec-a", "Sheeran and his team decided"]),
  rm: model({ grades: row("rec-a", "Sheeran and his team decided", "", "B", "") }), exit: 1, out: ["names no answer"],
});
run("Cite without passage cannot carry a paragraph", {
  page: `<p data-layer="narrative">Text. <Cite s="rec-a" /></p>\n`,
  rm: model({ grades: A }), exit: 1, out: ["Cite has no passage="],
});
console.log(`story_budget_test: ${n} cases pass`);
