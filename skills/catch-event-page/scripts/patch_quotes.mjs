#!/usr/bin/env node
// Before a patch list goes to the author: every span the list puts in quotation marks is
// found, word for word, in a saved record of the story, or in the page, its data module,
// the reader model or the working note. A span found nowhere is the reviewer's own wording
// in quotation marks, and the author will write it onto the page as if a record said it.
// Usage: node skills/catch-event-page/scripts/patch_quotes.mjs <subject>/<story> <patch list> [more text files]
// A record the list asks the author to admit is not pinned yet: save its text to a scratch
// file and pass it as an extra file, so its quotes are checked against the bytes too.
// A quotation with an elision ("...") is checked as its parts; a closing full stop or comma
// inside the marks is not part of the span. Letter case is not compared: a span that opens a sentence in
// the list is the same words.
// The lines outside the numbered items (an opening note, a closing one) are checked the same way.
// Exit 1 when a quoted span, of any length, is found nowhere.
import fs from "node:fs";
import path from "node:path";

const [story, listPath, ...extras] = process.argv.slice(2);
if (!story || !story.includes("/") || !listPath) { console.error("usage: patch_quotes.mjs <subject>/<story> <patch list> [more text files]"); process.exit(2); }
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const [subject, slug] = story.split("/");
const read = (p) => { try { return fs.readFileSync(p, "utf8"); } catch { return null; } };
const fold = (s) => s
  .replace(/<Cite\s+[^>]*\/>/g, " ").replace(/<[^>]+>/g, " ")
  .replace(/&ldquo;|&rdquo;|&quot;/g, '"').replace(/&rsquo;|&lsquo;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&nbsp;|&middot;/g, " ")
  .replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/[‐‑‒–]/g, "-")
  .replace(/\s+/g, " ").trim();

const manifestPath = path.join(root, "checks/manifests", `${subject}--${slug}.json`);
const manifest = JSON.parse(read(manifestPath) ?? (console.error(`manifest missing: ${manifestPath}`), process.exit(2)));
const corpora = [];
for (const r of manifest.records ?? []) {
  const text = read(path.join(root, r.text_path || r.pinned_path || ""));
  if (text !== null) corpora.push({ where: `record ${r.id}`, record: true, text: fold(text) });
}
const pagePath = path.join(root, "src/pages/events", subject, `${slug}.astro`);
const page = read(pagePath);
const own = [
  ["the page", pagePath], ["the built page", path.join(root, "dist/events", story, "index.html")],
  ["the reader model", path.join(root, "checks/reader-models", `${subject}--${slug}.md`)],
  ["the working note", path.join(root, "checks/working-notes", `${subject}--${slug}.md`)],
  ...[...(page ?? "").matchAll(/from\s+["']([^"']*\/data\/[^"']+)["']/g)].map((m) => ["the data module", path.join(path.dirname(pagePath), m[1])]),
];
for (const [where, p] of own) { const text = read(p); if (text !== null) corpora.push({ where, record: false, text: fold(text) }); }
for (const p of extras) {
  const text = read(p);
  if (text === null) { console.error(`cannot read ${p}`); process.exit(2); }
  corpora.push({ where: `the file ${path.basename(p)}`, record: true, text: fold(text) });
}

for (const c of corpora) c.lower = c.text.toLowerCase();

const list = read(listPath);
if (list === null) { console.error(`cannot read ${listPath}`); process.exit(2); }
const items = [];
for (const line of list.split("\n")) {
  const m = line.match(/^\s*(\d+)\.\s+\S/);
  if (m) items.push({ n: m[1], text: line });
  else if (items.length && line.trim()) items[items.length - 1].text += "\n" + line;
  else if (!items.length || !line.trim()) items.push({ n: null, text: line });
}
const numbered = items.filter((i) => i.n !== null);
const outside = items.filter((i) => i.n === null).map((i) => i.text).join("\n");
if (!numbered.length) { console.error("the patch list has no numbered item (a line that starts \"1. \")"); process.exit(2); }

let missing = 0;
for (const item of [...(outside.trim() ? [{ n: null, text: outside }] : []), ...numbered]) {
  const spans = [...fold(item.text).matchAll(/"([^"]+)"/g)]
    .flatMap((m) => m[1].split(/\.\.\.|…/)).map((part) => part.trim().replace(/[.,;:]+$/, "")).filter(Boolean);
  const lines = []; let fromRecord = 0;
  for (const span of spans) {
    const low = span.toLowerCase();
    const hit = corpora.find((c) => c.record && c.lower.includes(low)) ?? corpora.find((c) => c.lower.includes(low));
    if (!hit) { missing++; lines.push(`  NOT FOUND  "${span}"`); continue; }
    if (hit.record) fromRecord++;
    lines.push(`  ${hit.where}: "${span.length > 90 ? span.slice(0, 87) + "..." : span}"`);
  }
  if (item.n === null && !spans.length) continue;
  console.log(`${item.n === null ? "outside the numbered items" : `item ${item.n}`}: ${spans.length} quoted span(s), ${fromRecord} from a record`);
  for (const l of lines) console.log(l);
}
console.log(`${numbered.length} item(s); ${missing} quoted span(s) found nowhere`);
if (missing) console.log("A span found nowhere is your wording, not a record's. Quote the record's own words with its file and line, or take the quotation marks off and say only the class and the place.");
process.exit(missing ? 1 : 0);
