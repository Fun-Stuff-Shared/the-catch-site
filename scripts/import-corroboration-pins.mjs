import { createHash } from "node:crypto";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ROOT = new URL("..", import.meta.url).pathname;
const captureDir = process.argv[2];
if (!captureDir) throw new Error("usage: node scripts/import-corroboration-pins.mjs <capture-run-dir>");
const recordsPath = `${ROOT}/src/data/news-corroboration-records.json`;
const recordsData = JSON.parse(readFileSync(recordsPath, "utf8"));
const sourceRows = new Map();
for (const line of readFileSync(`${ROOT}/${recordsData.source_path}`, "utf8").trim().split("\n")) {
  const row = JSON.parse(line);
  for (const result of row.results ?? []) sourceRows.set(`${row.claim_id}\0${result.url}`, result);
}
const receipts = readFileSync(`${captureDir}/article_receipts.jsonl`, "utf8")
  .trim()
  .split("\n")
  .map((line) => JSON.parse(line));
if (receipts.length !== recordsData.records.length) throw new Error("capture receipt denominator does not match corroboration records");

const outcomes = {};
for (const [ordinal, record] of recordsData.records.entries()) {
  const receipt = receipts[ordinal];
  if (receipt.ordinal !== ordinal || receipt.item_url !== record.url) throw new Error(`capture receipt does not match ${record.id}`);
  outcomes[receipt.typed_outcome] = (outcomes[receipt.typed_outcome] ?? 0) + 1;
  const pinnedPath = `data/sources/outlets/${record.id}.txt`;
  let kind;
  let text;
  if (receipt.typed_outcome === "body_captured") {
    const source = `${captureDir}/${receipt.text_path}`;
    text = readFileSync(source);
    if (`sha256:${createHash("sha256").update(text).digest("hex")}` !== receipt.text_sha256) throw new Error(`capture text hash mismatch for ${record.id}`);
    cpSync(source, `${ROOT}/${pinnedPath}`);
    kind = "body_capture";
  } else {
    const result = sourceRows.get(`${record.capture_locator.claim_id}\0${record.url}`);
    if (!result || result.relevant_text.replace(/\s+/g, " ").trim() !== record.quote) throw new Error(`missing committed captured excerpt for ${record.id}`);
    text = Buffer.from(`${record.title}\n\n${record.quote}\n`);
    writeFileSync(`${ROOT}/${pinnedPath}`, text);
    kind = "captured_excerpt";
  }
  record.pinned_path = pinnedPath;
  record.text_path = pinnedPath;
  record.text_sha256 = `sha256:${createHash("sha256").update(text).digest("hex")}`;
  record.pin_capture = { kind, outcome: receipt.typed_outcome, captured_at: receipt.completed_at };
}
writeFileSync(recordsPath, JSON.stringify(recordsData, null, 2) + "\n");
writeFileSync(`${ROOT}/data/sources/corroboration-pin-outcomes.json`, JSON.stringify({
  schema: "corroboration_pin_outcomes_v1",
  capture_run: captureDir,
  count: recordsData.records.length,
  outcomes,
  records: recordsData.records.map((record) => ({ id: record.id, url: record.url, pinned_path: record.pinned_path, ...record.pin_capture })),
}, null, 2) + "\n");
console.log(`corroboration pins imported: ${recordsData.records.length} (${outcomes.body_captured ?? 0} full-body, ${recordsData.records.length - (outcomes.body_captured ?? 0)} saved excerpts)`);
