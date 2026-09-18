#!/usr/bin/env node
// What a primary pin says that the page does not: every number and every capitalized name in a
// primary record's text that appears nowhere on the page. The author dispositions each line in
// the working note (used, held unused, out of scope) before drafting.
// Usage: node skills/catch-event-page/scripts/pin_gaps.mjs <subject>/<story> [--all] [--max N]
//   Primary records only unless --all; at most N lines per record (default 80), the rest counted.
//   Reads the manifest's text_path for each record.
import fs from "node:fs";
import path from "node:path";

const story = process.argv[2];
if (!story || !story.includes("/")) { console.error("usage: pin_gaps.mjs <subject>/<story> [--all]"); process.exit(2); }
const all = process.argv.includes("--all");
const maxArg = process.argv.indexOf("--max");
const max = maxArg > 0 ? Number(process.argv[maxArg + 1]) : 80;
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const [subject, slug] = story.split("/");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "checks/manifests", `${subject}--${slug}.json`), "utf8"));
const coverageIds = new Set((manifest.coverage_records ?? []).map((r) => (typeof r === "string" ? r : r.id)));
const page = fs.readFileSync(path.join(root, "src/pages/events", subject, `${slug}.astro`), "utf8");
const dataFiles = fs.readdirSync(path.join(root, "src/data")).filter((f) => f.endsWith(".mjs")).map((f) => fs.readFileSync(path.join(root, "src/data", f), "utf8"));
const pageText = [page, ...dataFiles].join("\n").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").toLowerCase();
const norm = (s) => s.replace(/[,$%]/g, "").replace(/\s+/g, " ").toLowerCase();
const onPage = (token) => pageText.includes(norm(token)) || pageText.replace(/[,$%]/g, "").includes(norm(token));

const units = "percent|%|million|billion|trillion|points?|pp|days?|weeks?|months?|years?|hours?|people|persons|members|personnel|troops|soldiers|sailors|airmen|marines|guardians|civilians|deaths?|killed|wounded|injured|dead|missing|satellites?|aircraft|ships?|missiles?|interceptors?|dollars?|barrels?|pages?|votes?|yeas?|nays?|jobs|workers|employees|countries|states|companies|items|products|tons?|tonnes?|flights?|sorties";
const words = "one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand";
const numberRe = new RegExp(`(?<![\\w.])(?:\\$\\d[\\d,]*(?:\\.\\d+)?(?:\\s?(?:million|billion|trillion))?|\\d[\\d,]*(?:\\.\\d+)?\\s?(?:${units})\\b|\\d+\\.\\d+|\\d{1,3}(?:,\\d{3})+|\\b(?:${words})(?:[- ](?:${words}))?\\s(?:(?:U\\.S\\.|US|American|additional|more|other)\\s)?(?:${units})\\b)`, "gi");
const titleRe = /\b(?:Gen\.|General|Sen\.|Senator|Rep\.|Representative|Secretary|Director|Chairman|Chair|Judge|Justice|Dr\.|Mr\.|Ms\.|Mrs\.|Adm\.|Admiral|Lt\.|Col\.|Maj\.|Sgt\.|Gov\.|Governor|Mayor|Ambassador|Spokesman|Spokeswoman|Spokesperson)\s+(?:[A-Z][a-z]+\.?\s){0,3}[A-Z][a-z]+\b/g;
const nameRe = /\b(?:[A-Z][a-z]+\s){1,3}[A-Z][a-z]+\b/g;
const stop = new Set("The This That These Those In On At For As By To Of And But If It We He She They Our Its A An From With When While After Before Since Under Over Between Through During Please Thank".split(" "));
let total = 0;
for (const record of manifest.records ?? []) {
  const primary = !coverageIds.has(record.id) && !/coverage|outlet/.test(record.role ?? "") && !(record.pinned_path ?? "").includes("/coverage/");
  if (!all && !primary) continue;
  const textPath = record.text_path || (record.pinned_path ?? "").replace(/\.(html|pdf)$/, ".txt");
  const abs = path.isAbsolute(textPath) ? textPath : path.join(root, textPath);
  if (!fs.existsSync(abs)) { console.log(`## ${record.id}: no text pin at ${textPath}`); continue; }
  const text = fs.readFileSync(abs, "utf8");
  const lines = text.split("\n");
  const count = (v) => (text.match(new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  const rows = [];
  lines.forEach((line, i) => {
    if (i < 3) return;
    for (const m of line.matchAll(numberRe)) {
      const v = m[0].trim();
      if (/^(19|20)\d{2}$/.test(v) || /^\d{5,}$/.test(v)) continue;
      if (!onPage(v)) rows.push({ line: i + 1, kind: "number", value: v, context: line.slice(Math.max(0, m.index - 70), m.index + v.length + 70).trim() });
    }
    for (const sentence of line.split(/(?<=[.!?:;])\s+/)) {
      const titled = [...sentence.matchAll(titleRe)].map((m) => m[0]);
      const plain = [...sentence.matchAll(nameRe)].map((m) => m[0]).filter((v) => !stop.has(v.split(/\s/)[0]) && count(v) >= 2);
      for (const v of new Set([...titled, ...plain])) {
        if (!onPage(v) && !onPage(v.replace(/^[^\s]+\.?\s/, ""))) rows.push({ line: i + 1, kind: "name", value: v, context: sentence.slice(0, 160).trim() });
      }
    }
  });
  const seen = new Set();
  const unique = rows.filter((r) => { const k = `${r.kind}:${norm(r.value)}`; if (seen.has(k)) return false; seen.add(k); return true; });
  total += unique.length;
  console.log(`\n## ${record.id} (${textPath}): ${unique.length} not on the page`);
  for (const r of unique.slice(0, max)) console.log(`- L${r.line} ${r.kind} \`${r.value}\`: ${r.context.replace(/\s+/g, " ")}`);
  if (unique.length > max) console.log(`- and ${unique.length - max} more in this record; a transcript is read whole, these are the lines the page does not carry`);
}
console.log(`\n${total} lines to disposition`);
