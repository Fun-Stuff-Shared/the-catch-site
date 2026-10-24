#!/usr/bin/env node
// A record cited more than once in one run of citations renders once, where it first appears:
// "5, 4, 1" instead of "5, 4, 5, 1". The merged anchor keeps its first passage and carries the others in data-passages for the
// evidence reader; when the citations name different claims, data-claim lists every one,
// space-separated, for Just the facts and the claim checks. A citation that directly follows another, with only space between, is
// marked src-ref-more so the comma separating them is drawn there and nowhere else (a CSS
// sibling selector cannot see the sentence text between two citations). Runs on the built
// pages after astro build.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] || join(process.cwd(), "dist", "events");
const sup = /<sup class="src-ref(?: src-ref-more)?"><a href="#src-(\d+)"([^>]*)>\d+<\/a><\/sup>/g;
const attr = (s, name) => (s.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];

export function mergeCites(html) {
  const parts = [...html.matchAll(sup)];
  if (!parts.length) return html;
  let out = "", cursor = 0, i = 0;
  while (i < parts.length) {
    let j = i + 1;
    while (j < parts.length && /^\s*$/.test(html.slice(parts[j - 1].index + parts[j - 1][0].length, parts[j].index))) j++;
    const records = new Map();
    for (const part of parts.slice(i, j)) {
      const rec = records.get(part[1]) || records.set(part[1], { first: part, passages: [], claims: [], count: 0 }).get(part[1]);
      const p = attr(part[2], "data-passage");
      if (p && !rec.passages.includes(p)) rec.passages.push(p);
      const c = attr(part[2], "data-claim");
      if (c && !rec.claims.includes(c)) rec.claims.push(c);
      rec.count++;
    }
    out += html.slice(cursor, parts[i].index);
    if (records.size === j - i) out += html.slice(parts[i].index, parts[j - 1].index + parts[j - 1][0].length);
    else out += [...records.values()].map(anchorFor).join("");
    cursor = parts[j - 1].index + parts[j - 1][0].length;
    i = j;
  }
  return markRuns(out + html.slice(cursor));
}

function anchorFor({ first, passages, claims, count }) {
  if (count === 1) return first[0];
  const extra = passages.length > 1 ? ` data-passages="${passages.slice(1).join("&#10;")}"` : "";
  const anchor = claims.length > 1 ? first[0].replace(/ data-claim="[^"]*"/, ` data-claim="${claims.join(" ")}"`) : first[0];
  return anchor.replace(/(<a href="#src-\d+"[^>]*)>/, (m, open) => `${open}${extra}>`);
}

function markRuns(html) {
  const parts = [...html.matchAll(sup)];
  let out = "", cursor = 0;
  parts.forEach((part, k) => {
    const prev = parts[k - 1];
    const joined = prev && /^\s*$/.test(html.slice(prev.index + prev[0].length, part.index));
    const plain = part[0].replace('<sup class="src-ref src-ref-more">', '<sup class="src-ref">');
    out += html.slice(cursor, part.index) + (joined ? plain.replace('<sup class="src-ref">', '<sup class="src-ref src-ref-more">') : plain);
    cursor = part.index + part[0].length;
  });
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
