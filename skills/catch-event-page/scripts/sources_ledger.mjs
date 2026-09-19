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
// A row is "| path | bytes | sha256 prefix |" with any further cells (a note column in some
// tables) kept as written; the first row for a path is the one that gets refreshed.
const ROW = /^\| (data\/sources\/\S+) \|([^|]*)\|([^|]*)\|(.*)$/;
const rowAt = new Map();
lines.forEach((line, i) => { const m = ROW.exec(line); if (m && !rowAt.has(m[1])) rowAt.set(m[1], i); });

const digest = (rel) => { const b = readFileSync(join(root, rel)); return [b.length, createHash("sha256").update(b).digest("hex").slice(0, 16)]; };
const row = (rel, existing) => {
  const [bytes, sha] = digest(rel);
  let tail = "";
  if (existing) {
    const m = ROW.exec(existing);
    const note = /^[0-9a-f]{16}$/.test(m[3].trim()) ? "" : m[3].trim();
    tail = m[4] || (note ? " |" : "");
    if (note) tail = tail.replace(/^ ?\|/, ` ${note} |`);
  }
  return `| ${rel} | ${bytes} | ${sha} |${tail}`;
};
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
  if (rowAt.has(rel)) {
    const i = rowAt.get(rel), fresh = row(rel, lines[i]);
    if (lines[i] !== fresh) { lines[i] = fresh; refreshed += 1; }
  } else { appended.push(row(rel)); added += 1; }
}
if (missing) process.exit(1);
let text = lines.join("\n");
if (appended.length) text = text.replace(/\n*$/, "\n") + appended.join("\n") + "\n";
if (added || refreshed) writeFileSync(ledgerPath, text);
console.log(`sources_ledger: ${added} row(s) added, ${refreshed} refreshed${all ? ` of ${rowAt.size} checked` : ""}`);
