#!/usr/bin/env node
// Lists narrative paragraphs a stranger cannot follow in one read:
// over 45 words, or carrying more than one quotation from the record.
// Usage: node prose_lint.mjs <page.astro> [more pages...]   (exit 1 when any violation is found)
import { readFileSync } from "node:fs";

const MAX_WORDS = 45;
const files = process.argv.slice(2);
if (files.length === 0 || files.includes("--help")) {
  console.error("usage: node prose_lint.mjs src/pages/events/<subject>/<story>.astro [...]");
  process.exit(files.length === 0 ? 2 : 0);
}
let violations = 0;
for (const file of files) {
  const source = readFileSync(file, "utf8");
  const lineOf = (index) => source.slice(0, index).split("\n").length;
  for (const match of source.matchAll(/<p\b[^>]*data-layer="narrative"[^>]*>([\s\S]*?)<\/p>/g)) {
    const openTag = match[0].slice(0, match[0].indexOf(">"));
    if (/kicker|label/.test(openTag)) continue;
    const text = match[1].replace(/<Cite\b[^>]*\/>/g, "").replace(/<[^>]+>/g, "").replace(/\{[^}]*\}/g, "0").replace(/&[a-z]+;/g, " ").trim();
    const words = text.split(/\s+/).filter(Boolean).length;
    const quotes = (text.match(/"[^"]{3,}"|“[^”]{3,}”/g) || []).length;
    const line = lineOf(match.index);
    if (words > MAX_WORDS) { violations += 1; console.log(`${file}:${line}: ${words} words in one paragraph (cap ${MAX_WORDS}); break where the idea changes: ${text.slice(0, 70)}`); }
    if (quotes > 1) { violations += 1; console.log(`${file}:${line}: ${quotes} quotations in one paragraph; quote the record once, then say what it means in the reader's words: ${text.slice(0, 70)}`); }
  }
}
console.log(violations === 0 ? "prose_lint: clean" : `prose_lint: ${violations} violation(s)`);
process.exit(violations === 0 ? 0 : 1);
