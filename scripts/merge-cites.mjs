#!/usr/bin/env node
// Consecutive citations of the same record on one sentence render once: "1" instead of "1, 1".
// The merged anchor keeps its first passage and carries the others in data-passages for the
// evidence reader. Runs on the built pages after astro build.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] || join(process.cwd(), "dist", "events");
const sup = /<sup class="src-ref"><a href="#src-(\d+)"([^>]*)>\d+<\/a><\/sup>/g;
const attr = (s, name) => (s.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];

export function mergeCites(html) {
  const parts = [...html.matchAll(sup)];
  if (!parts.length) return html;
  let out = "", cursor = 0, i = 0;
  while (i < parts.length) {
    const first = parts[i];
    const passages = [attr(first[2], "data-passage")].filter(Boolean);
    let j = i + 1;
    while (j < parts.length && /^\s*$/.test(html.slice(parts[j - 1].index + parts[j - 1][0].length, parts[j].index)) && parts[j][1] === first[1]) {
      const p = attr(parts[j][2], "data-passage");
      if (p && !passages.includes(p)) passages.push(p);
      j++;
    }
    out += html.slice(cursor, first.index);
    if (j === i + 1) out += first[0];
    else {
      const extra = passages.length > 1 ? ` data-passages="${passages.slice(1).join("&#10;")}"` : "";
      out += first[0].replace(/(<a href="#src-\d+"[^>]*)>/, `$1${extra}>`);
    }
    cursor = parts[j - 1].index + parts[j - 1][0].length;
    i = j;
  }
  return out + html.slice(cursor);
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files); else if (name === "index.html") files.push(p);
  }
  return files;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let merged = 0;
  for (const file of walk(root)) {
    const html = readFileSync(file, "utf8");
    const next = mergeCites(html);
    if (next !== html) { writeFileSync(file, next); merged++; }
  }
  console.log(`merge-cites: ${merged} page(s) with consecutive same-record citations merged`);
}
