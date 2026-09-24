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

const A = row("rec-a", "Ed Sheeran and his team have made the decision to remove me", "Slide 1: the decision.", "A", "1, who decided");
const D = row("rec-a", null, "Slide 2: a child-death figure.", "D", "");

run("clean: narrative cites the A words", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]),
  rm: model({ grades: A + D }), exit: 0, out: ["story_budget: clean"],
});
run("mixed record: citing the D passage is outside the budget", {
  page: narrative(["rec-a", "a child-death figure of many thousands"]),
  rm: model({ grades: A + D }), exit: 1, out: ["outside the budget", "not the words of any A or B row"],
});
run("cite outside narrative still needs a grade", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]) + proof(["rec-z", "some receipt"]),
  rm: model({ grades: A + D }), exit: 1, out: ["no Grades row: rec-z"], notOut: ["paragraph outside the budget"],
});
run("manifest record with no row", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]),
  rm: model({ grades: A }), manifest: { records: [{ id: "rec-a" }, { id: "rec-m" }] }, exit: 1, out: ["no Grades row: rec-m"],
});
run("rows outside ## Grades do not count", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]),
  rm: model({ grades: "", extra: "\n## Notes\n\n" + A }), exit: 2, out: ["no graded rows"],
});
run("four independent A rows on one answer all count", {
  page: narrative(["w1", "one withdraws today"]) + narrative(["w4", "four withdraws today"]),
  rm: model({ grades: row("w1", "one withdraws today", "", "A", "1, the first name") + row("w2", "two withdraws today", "", "A", "1, the second name") + row("w3", "three withdraws today", "", "A", "1, the third name") + row("w4", "four withdraws today", "", "A", "1, the fourth name") }),
  exit: 0, out: ["story_budget: clean"],
});
run("regex characters in a record id", {
  page: narrative(["rec.(a)+", "Ed Sheeran and his team have made the decision to remove me"]),
  rm: model({ grades: row("rec.(a)+", "Ed Sheeran and his team have made the decision to remove me", "", "A", "1, who decided") }), exit: 0, out: ["story_budget: clean"],
});
run("curly quotes and spacing normalize", {
  page: narrative(["rec-a", "Sheeran’s team  decided today"]),
  rm: model({ grades: row("rec-a", "Sheeran's team decided today", "", "B", "3, the wrong reading") }), exit: 0, out: ["story_budget: clean"],
});
run("reader model without ## Headline is refused", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]),
  rm: model({ headline: false, grades: A }), exit: 2, out: ["Rerun turn two"],
});
run("A row without quoted words is incomplete", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]),
  rm: model({ grades: row("rec-a", null, "Slide 1: the decision.", "A", "1, who decided") }), exit: 1, out: ["does not open its passage cell", "outside the budget"],
});
run("B row without an answer is incomplete", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]),
  rm: model({ grades: row("rec-a", "Ed Sheeran and his team have made the decision to remove me", "", "B", "") }), exit: 1, out: ["must name an answer (1 to 7)"],
});
run("Cite without passage cannot carry a paragraph", {
  page: `<p data-layer="narrative">Text. <Cite s="rec-a" /></p>\n`,
  rm: model({ grades: A }), exit: 1, out: ["Cite has no passage="],
});
run("Serves with only an answer number is incomplete", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]),
  rm: model({ grades: row("rec-a", "Ed Sheeran and his team have made the decision to remove me", "", "A", "1") }), exit: 1, out: ["must name an answer (1 to 7)"],
});
run("quoted words must open the passage cell", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]),
  rm: model({ grades: `| \`rec-a\` | context first; "Ed Sheeran and his team have made the decision to remove me" | A | 1, who decided |\n` }), exit: 1, out: ["does not open its passage cell"],
});
run("a short A run inside an unrelated passage does not carry it", {
  page: narrative(["rec-a", "the accountant said the budget rose"]),
  rm: model({ grades: row("rec-a", "said", "", "A", "1, who spoke") + row("rec-a", null, "the budget line", "D", "") }), exit: 1, out: ["outside the budget"],
});
run("a negated passage containing the A words does not carry it", {
  page: narrative(["rec-a", "the report does not say the contract allows cancellation"]),
  rm: model({ grades: row("rec-a", "the contract allows cancellation", "", "A", "1, what the contract allows") + row("rec-a", null, "the report's denial", "D", "") }), exit: 1, out: ["not the words of any A or B row"],
});
run("a subspan of the A words is not the passage", {
  page: narrative(["rec-a", "the decision to remove me"]),
  rm: model({ grades: A }), exit: 1, out: ["not the words of any A or B row"],
});
run("a truncated negated passage sharing the A words does not carry it", {
  page: narrative(["rec-a", "the board approved the plan"]),
  rm: model({ grades: row("rec-a", "the board approved the plan on Monday", "", "A", "1, what was approved") + row("rec-a", null, "a later denial", "D", "") }), exit: 1, out: ["outside the budget"],
});
run("a two-word A passage carries its Cite", {
  page: narrative(["rec-a", "I resign"]),
  rm: model({ grades: row("rec-a", "I resign", "", "A", "1, who left") }), exit: 0, out: ["story_budget: clean"],
});
run("a second quoted run on the row carries a second Cite", {
  page: narrative(["rec-a", "I resign"]) + narrative(["rec-a", "effective at noon"]),
  rm: model({ grades: `| \`rec-a\` | "I resign" "effective at noon" the letter | A | 1, who left |\n` }), exit: 0, out: ["story_budget: clean"],
});
run("answers outside 1 to 7 and a bare punctuation clause are refused", {
  page: narrative(["rec-a", "I resign"]),
  rm: model({ grades: row("rec-a", "I resign", "", "A", "8, who left") + row("rec-b", "I stay", "", "B", "1, .") }), exit: 1, out: ["must name an answer (1 to 7)"],
});
run("a one-word clause padded with punctuation is refused", {
  page: narrative(["rec-a", "I resign"]),
  rm: model({ grades: row("rec-a", "I resign", "", "A", "1, a .") + row("rec-b", "I stay", "", "A", "1, who .") + row("rec-c", "I go", "", "B", "1, -- x") }), exit: 1, out: ["3 row(s) or Cite(s) the lint refuses"],
});
run("several answers and a clause pass", {
  page: narrative(["rec-a", "I resign"]),
  rm: model({ grades: row("rec-a", "I resign", "", "A", "1, 2, the names") }), exit: 0, out: ["story_budget: clean"],
});
run("spaced, spread and single-quoted Cites are refused", {
  page: narrative(["rec-a", "I resign"]) + `<p data-layer="proof"><Cite s = {item.s} passage = {item.p} /> <Cite {...item} /> <Cite s={'rec-a'} passage={'I resign'} /></p>\n`,
  rm: model({ grades: row("rec-a", "I resign", "", "A", "1, who left") }), exit: 1, out: ["3 row(s) or Cite(s) the lint refuses"],
});
run("brace-wrapped double-quoted literals are read", {
  page: `<p data-layer="narrative">Text. <Cite s={"rec-a"} passage={"I resign"} /></p>\n`,
  rm: model({ grades: row("rec-a", "I resign", "", "A", "1, who left") }), exit: 0, out: ["story_budget: clean"],
});
run("expression-valued D Cite in the story view is refused", {
  page: `<p data-layer="narrative">Text. <Cite s={"rec-a"} passage={"a child-death figure of many"} /></p>\n`,
  rm: model({ grades: A + D }), exit: 1, out: ["outside the budget"],
});
run("expression-valued ungraded Cite in any layer is refused", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]) + `<p data-layer="proof">Receipt. <Cite s={"rec-z"} passage={"some receipt words"} /></p>\n`,
  rm: model({ grades: A }), exit: 1, out: ["no Grades row: rec-z"],
});
run("a Cite the lint cannot read is refused", {
  page: narrative(["rec-a", "Ed Sheeran and his team have made the decision to remove me"]) + `<p data-layer="proof">{items.map((item) => <Cite s={item.source} passage={item.passage} />)}</p>\n`,
  rm: model({ grades: A }), exit: 1, out: ["Cite the lint cannot read"],
});
run("a backtick passage without interpolation is read", {
  page: "<p data-layer=\"narrative\">Text. <Cite s=\"rec-a\" passage={`he said \"I resign\" at noon`} /></p>\n",
  rm: model({ grades: row("rec-a", 'he said "I resign" at noon'.replace(/"/g, "\u201c"), "", "A", "1, who left") }), exit: 0, out: ["story_budget: clean"],
});
run("a backtick passage with interpolation is refused", {
  page: "<p data-layer=\"narrative\">Text. <Cite s=\"rec-a\" passage={`I resign ${x}`} /></p>\n",
  rm: model({ grades: row("rec-a", "I resign", "", "A", "1, who left") }), exit: 1, out: ["Cite the lint cannot read"],
});
console.log(`story_budget_test: ${n} cases pass`);
