// Appends a ledger row (file, bytes, sha256 prefix) to data/sources/SOURCES.md for every
// file a story's manifest pins (pinned_path and text_path) that has no row yet. Existing
// rows and the prose above the table are left alone.
// Usage: node skills/catch-event-page/scripts/sources_ledger.mjs checks/manifests/<subject>--<story>.json
import { createHash } from "node:crypto";
import { existsSync, readFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../../../", import.meta.url).pathname;
const manifestPath = process.argv[2];
if (!manifestPath) { console.error("usage: sources_ledger.mjs checks/manifests/<subject>--<story>.json"); process.exit(2); }
const ledger = join(root, "data/sources/SOURCES.md");
const listed = new Set([...readFileSync(ledger, "utf8").matchAll(/^\| (data\/sources\/\S+) \|/gm)].map((m) => m[1]));
const manifest = JSON.parse(readFileSync(join(root, manifestPath), "utf8"));
const rows = [];
for (const record of manifest.records ?? []) {
  for (const key of ["pinned_path", "text_path"]) {
    const rel = record[key];
    if (!rel || !rel.startsWith("data/sources/") || listed.has(rel)) continue;
    if (!existsSync(join(root, rel))) { console.error(`sources_ledger: ${record.id ?? "?"} names a missing file: ${rel}`); process.exitCode = 1; continue; }
    const bytes = readFileSync(join(root, rel));
    listed.add(rel);
    rows.push(`| ${rel} | ${bytes.length} | ${createHash("sha256").update(bytes).digest("hex").slice(0, 16)} |`);
  }
}
if (rows.length) appendFileSync(ledger, rows.join("\n") + "\n");
console.log(`sources_ledger: ${rows.length} row(s) added`);
