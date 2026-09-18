#!/usr/bin/env node
// Every number, quoted span and cite passage a commit adds to story pages and data modules,
// one row each, with the record the line cites: the reviewer recounts each row at its pin.
// Usage: node skills/catch-event-page/scripts/diff_table.mjs <commit> [<base>]
//   base defaults to <commit>~1. Reads src/pages/events/**/*.astro and src/data/*.mjs only.
import { execFileSync } from "node:child_process";
import path from "node:path";

const commit = process.argv[2];
if (!commit) { console.error("usage: diff_table.mjs <commit> [<base>]"); process.exit(2); }
const base = process.argv[3] || `${commit}~1`;
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const diff = execFileSync("git", ["-C", root, "diff", "--unified=0", base, commit, "--", "src/pages/events", "src/data"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const decode = (s) => s.replace(/&ldquo;|&rdquo;|&quot;/g, '"').replace(/&rsquo;|&lsquo;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");
const rows = [];
let file = null, line = 0;
for (const raw of diff.split("\n")) {
  if (raw.startsWith("+++ ")) { file = raw.slice(6); continue; }
  if (raw.startsWith("--- ") || raw.startsWith("diff ") || raw.startsWith("index ")) continue;
  const hunk = raw.match(/^@@ -\d+(?:,\d+)? \+(\d+)/);
  if (hunk) { line = Number(hunk[1]); continue; }
  if (!raw.startsWith("+")) { if (!raw.startsWith("-")) line++; continue; }
  const text = decode(raw.slice(1));
  if (/^\s*(?:import|export|throw|const|let|if|for|return)\b/.test(text) && !/<Cite\b|"[^"]{8,}"/.test(text)) { line++; continue; }
  if (/\bthrow new Error\b|^\s*\/\//.test(text)) { line++; continue; }
  const cites = [...text.matchAll(/<Cite\s+s="([^"]+)"(?:\s+passage="([^"]*)")?/g)];
  const record = cites.map((c) => c[1]).join(", ") || (text.match(/source:\s*"([^"]+)"/)?.[1] ?? "");
  const stripped = text.replace(/<[^>]+>/g, " ").replace(/\b(?:19|20)\d{2}-\d{2}-\d{2}\b/g, " ").replace(/\b[a-z0-9]+(?:-[a-z0-9]+)+\b/g, " ").replace(/[a-zA-Z_]+\d+[a-zA-Z_\d]*/g, " ");
  for (const m of stripped.matchAll(/(?<![\w.])[-−]?\$?\d[\d,]*(?:\.\d+)?(?:\s?(?:percent|%|million|billion|trillion|bn|m|k|days?|weeks?|months?|years?|points?|pp|barrels?|codes?|items?|lines?|products?|tonnes?|tons?))?/g)) {
    const value = m[0].trim();
    rows.push({ file, line, kind: "number", value, context: stripped.slice(Math.max(0, m.index - 50), m.index + value.length + 50).replace(/\s+/g, " ").trim(), record });
  }
  for (const m of stripped.matchAll(/"([^"]{8,}?)"/g)) if (/\s/.test(m[1]) && !/[{}=;]/.test(m[1])) rows.push({ file, line, kind: "quote", value: m[1], context: "", record });
  for (const c of cites) if (c[2]) rows.push({ file, line, kind: "passage", value: decode(c[2]), context: "", record: c[1] });
  line++;
}

console.log(`# Added numbers, quotes and passages in ${commit} against ${base} (${rows.length} rows)\n`);
console.log("| # | file:line | kind | value | context | record |");
console.log("|---|---|---|---|---|---|");
const cell = (s) => String(s ?? "").replace(/\|/g, "\\|");
rows.forEach((r, i) => console.log(`| ${i + 1} | ${r.file}:${r.line} | ${r.kind} | ${cell(r.value)} | ${cell(r.context)} | ${cell(r.record)} |`));
