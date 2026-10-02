#!/usr/bin/env node
// patch_quotes on a throwaway story: record words pass, page words pass, the reviewer's own
// wording in quotation marks fails, an elided quotation is checked part by part.
// Usage: node skills/catch-event-page/scripts/patch_quotes_test.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const here = path.dirname(new URL(import.meta.url).pathname);
const root = fs.mkdtempSync(path.join(os.tmpdir(), "patch-quotes-"));
const write = (rel, text) => { fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true }); fs.writeFileSync(path.join(root, rel), text); };
fs.mkdirSync(path.join(root, "skills/catch-event-page/scripts"), { recursive: true });
fs.copyFileSync(path.join(here, "patch_quotes.mjs"), path.join(root, "skills/catch-event-page/scripts/patch_quotes.mjs"));
write("data/sources/subject/factcheck.txt", "The Obama administration reportedly tried to exclude Fox News\nfrom one interview pool. Scholars said the ban appears to be unprecedented, and one called it \u201csingular and unprecedented\u201d in scope.\n");
write("checks/manifests/subject--story.json", JSON.stringify({ records: [{ id: "factcheck", text_path: "data/sources/subject/factcheck.txt" }] }));
write("src/pages/events/subject/story.astro", `<p data-layer="narrative">The opinions read give no date<Cite s="factcheck" passage="x" /> for an earlier ban.</p>\n`);
write("scratch/order.txt", "It is ORDERED that the passes be restored within 24 hours.\n");
const run = (list, ...extra) => {
  write("list.txt", list);
  const r = spawnSync("node", ["skills/catch-event-page/scripts/patch_quotes.mjs", "subject/story", "list.txt", ...extra], { cwd: root, encoding: "utf8" });
  return { code: r.status, out: r.stdout + r.stderr };
};
const checks = [];
let r = run(`Intro line with no quotation.\n1. The article says the administration "reportedly tried to exclude Fox News from one interview pool." Report it with the hedge.\n2. The page says "The opinions read give no date for an earlier ban." Replace it.\n`);
checks.push(["record words across a line break and page words across a cite both pass", r.code === 0 && /item 1: 1 quoted span\(s\), 1 from a record/.test(r.out) && /item 2: 1 quoted span\(s\), 0 from a record/.test(r.out)]);
r = run(`1. The article says the administration "excluded Fox News from one interview pool" and calls the ban "unprecedented".\n`);
checks.push(["a hedge dropped inside quotation marks fails, and a one-word quote the record has passes", r.code === 1 && /NOT FOUND {2}"excluded Fox News from one interview pool"/.test(r.out) && /record factcheck: "unprecedented"/.test(r.out)]);
r = run(`1. The article says the administration "excluded" Fox News.\n`);
checks.push(["a one-word quote no record has fails", r.code === 1 && /NOT FOUND {2}"excluded"/.test(r.out)]);
r = run(`1. The scholars' words: "the ban appears to be unprecedented ... singular and unprecedented in scope".\n`);
checks.push(["an elided quotation is checked part by part", r.code === 1 && /record factcheck: "the ban appears to be unprecedented"/.test(r.out) && /NOT FOUND {2}"singular and unprecedented in scope"/.test(r.out)]);
r = run(`1. Admit the order; it says the passes are to "be restored within 24 hours".\n`);
checks.push(["a quote from a record not yet pinned fails without its text", r.code === 1]);
r = run(`1. Admit the order; it says the passes are to "be restored within 24 hours".\n`, "scratch/order.txt");
checks.push(["and passes when the fetched text is passed as an extra file", r.code === 0 && /the file order.txt/.test(r.out)]);
r = run(`The page should say the ban was "the first of its kind".\n1. The page says "The opinions read give no date for an earlier ban." Keep it.\n`);
checks.push(["the reviewer's wording in quotation marks above the first item fails", r.code === 1 && /outside the numbered items: 1 quoted span/.test(r.out) && /NOT FOUND {2}"the first of its kind"/.test(r.out)]);
r = run("No numbered item here.\n");
checks.push(["a list with no numbered item is refused", r.code === 2]);
fs.rmSync(root, { recursive: true, force: true });
for (const [name, ok] of checks) console.log(ok ? "ok  " : "FAIL", name);
process.exit(checks.every(([, ok]) => ok) ? 0 : 1);
