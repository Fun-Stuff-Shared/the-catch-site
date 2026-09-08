#!/usr/bin/env node
// Lists the lens-rule violations the build gate does not check on a story page:
// narrative paragraphs without a citation, and proof-shaped content inside fact-layer figures.
// Usage: node lens_lint.mjs <page.astro> [more pages...]   (exit 1 when any violation is found)
import { readFileSync } from "node:fs";

const files = process.argv.slice(2);
if (files.length === 0 || files.includes("--help")) {
  console.error("usage: node lens_lint.mjs src/pages/events/<subject>/<story>.astro [...]");
  process.exit(files.length === 0 ? 2 : 0);
}
const PROOF_SHAPED = /later releases may revise|as captured|saved series dated|captured (january|february|march|april|may|june|july|august|september|october|november|december)/i;
let violations = 0;
for (const file of files) {
  const source = readFileSync(file, "utf8");
  const lines = source.split("\n");
  const lineOf = (index) => source.slice(0, index).split("\n").length;
  for (const match of source.matchAll(/<p\b[^>]*data-layer="narrative"[^>]*>([\s\S]*?)<\/p>/g)) {
    const text = match[1].replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, " ").trim();
    const openTag = match[0].slice(0, match[0].indexOf(">"));
    const isLabel = /kicker|label/.test(openTag) || (text.length < 60 && !/\d/.test(text));
    if (!/<Cite\b/.test(match[1]) && !isLabel) {
      violations += 1;
      console.log(`${file}:${lineOf(match.index)}: narrative paragraph without a citation: ${match[1].replace(/<[^>]+>/g, "").trim().slice(0, 90)}`);
    }
  }
  for (const match of source.matchAll(/<figure\b[^>]*data-layer="fact"[^>]*>([\s\S]*?)<\/figure>/g)) {
    const body = match[1];
    const proofFree = body.replace(/<[^>]+data-layer="proof"[^>]*>[\s\S]*?<\/(?:span|p|details|div|figcaption)>/g, "");
    if (PROOF_SHAPED.test(proofFree) || /<details\b(?![^>]*data-layer="proof")/.test(proofFree)) {
      violations += 1;
      console.log(`${file}:${lineOf(match.index)}: fact-layer figure carries proof-shaped content (vintage, capture date, or a values table) without data-layer="proof"`);
    }
  }
  lines.forEach((line, i) => { if (line.includes("\u2014")) { violations += 1; console.log(`${file}:${i + 1}: em dash`); } });
}
console.log(violations === 0 ? "lens_lint: clean" : `lens_lint: ${violations} violation(s)`);
process.exit(violations === 0 ? 0 : 1);
