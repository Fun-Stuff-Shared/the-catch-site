// Keeps data/sources/SOURCES.md true for a story's pins: a row (file, bytes, sha256 prefix)
// for every pinned_path and text_path the manifest names, added when missing and rewritten
// in place when the file's bytes no longer match the row. The prose above the table is
// left alone. With --all, every existing row is rechecked against its file.
// Usage: node skills/catch-event-page/scripts/sources_ledger.mjs checks/manifests/<subject>--<story>.json [--all]
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../../../", import.meta.url).pathname;
const manifestPath = process.argv[2];
if (!manifestPath) { console.error("usage: sources_ledger.mjs checks/manifests/<subject>--<story>.json [--all]"); process.exit(2); }
const all = process.argv.includes("--all");
const ledgerPath = join(root, "data/sources/SOURCES.md");
const lines = readFileSync(ledgerPath, "utf8").split("\n");
const rowAt = new Map();
lines.forEach((line, i) => { const m = /^\| (data\/sources\/\S+) \| \d+ \| [0-9a-f]+ \|$/.exec(line); if (m) rowAt.set(m[1], i); });

const row = (rel) => { const b = readFileSync(join(root, rel)); return `| ${rel} | ${b.length} | ${createHash("sha256").update(b).digest("hex").slice(0, 16)} |`; };
const wanted = new Set(all ? rowAt.keys() : []);
const manifest = JSON.parse(readFileSync(join(root, manifestPath), "utf8"));
for (const record of manifest.records ?? []) for (const key of ["pinned_path", "text_path"]) {
  const rel = record[key];
  if (rel && rel.startsWith("data/sources/")) wanted.add(rel);
}
let added = 0, refreshed = 0, missing = 0;
const appended = [];
for (const rel of wanted) {
  if (!existsSync(join(root, rel))) { console.error(`sources_ledger: missing file: ${rel}`); missing += 1; continue; }
  const fresh = row(rel);
  if (rowAt.has(rel)) { if (lines[rowAt.get(rel)] !== fresh) { lines[rowAt.get(rel)] = fresh; refreshed += 1; } }
  else { appended.push(fresh); added += 1; }
}
if (missing) process.exit(1);
let text = lines.join("\n");
if (appended.length) text = text.replace(/\n*$/, "\n") + appended.join("\n") + "\n";
if (added || refreshed) writeFileSync(ledgerPath, text);
console.log(`sources_ledger: ${added} row(s) added, ${refreshed} refreshed${all ? ` of ${rowAt.size} checked` : ""}`);
