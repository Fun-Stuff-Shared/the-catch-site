import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const ROOT = new URL("..", import.meta.url).pathname;
const claimRecords = JSON.parse(readFileSync(`${ROOT}/src/data/news-claim-records.json`, "utf8"));
const corroborationRecords = JSON.parse(readFileSync(`${ROOT}/src/data/news-corroboration-records.json`, "utf8"));
const capturePath = `${ROOT}/${corroborationRecords.source_path}`;
if (!existsSync(capturePath)) throw new Error(`missing corroboration capture store: ${corroborationRecords.source_path}`);
const captureRaw = readFileSync(capturePath, "utf8");
const captureSha256 = `sha256:${createHash("sha256").update(captureRaw).digest("hex")}`;
if (captureSha256 !== corroborationRecords.source_sha256) throw new Error("corroboration capture store hash mismatch");
const captureByUrl = new Map();
for (const line of captureRaw.trim().split("\n")) {
  const capture = JSON.parse(line);
  for (const result of capture.results ?? []) if (!captureByUrl.has(result.url)) captureByUrl.set(result.url, { claimId: capture.claim_id, result });
}
for (const record of corroborationRecords.records) {
  const captured = captureByUrl.get(record.url);
  if (!captured) throw new Error(`missing corroboration capture for ${record.url}`);
  if (record.capture_path !== corroborationRecords.source_path || record.capture_sha256 !== captureSha256) throw new Error(`invalid capture pointer for ${record.id}`);
  if (record.capture_locator?.claim_id !== captured.claimId || record.capture_locator?.result_url !== record.url || record.capture_locator?.result_field !== "relevant_text") throw new Error(`invalid capture locator for ${record.id}`);
  if (record.title !== captured.result.headline || record.quote !== captured.result.relevant_text.replace(/\s+/g, " ").trim()) throw new Error(`capture content mismatch for ${record.id}`);
}
const records = [...claimRecords.records, ...corroborationRecords.records]
  .sort((a, b) => a.url.localeCompare(b.url));
const duplicateUrls = records.filter((record, index) => index > 0 && record.url === records[index - 1].url);

if (claimRecords.count !== 1043) throw new Error(`expected 1,043 claim-source records, found ${claimRecords.count}`);
if (corroborationRecords.count !== 173) throw new Error(`expected 173 corroboration records, found ${corroborationRecords.count}`);
if (duplicateUrls.length) throw new Error(`duplicate news record URL: ${duplicateUrls[0].url}`);

const sourceSha256 = `sha256:${createHash("sha256")
  .update(`${claimRecords.source_sha256}\n${corroborationRecords.source_sha256}\n`)
  .digest("hex")}`;
writeFileSync(`${ROOT}/src/data/news-records.json`, JSON.stringify({
  schema: "news_records_v2",
  source_sha256: sourceSha256,
  count: records.length,
  source_counts: { claim_source: claimRecords.count, corroboration: corroborationRecords.count },
  records,
}, null, 2) + "\n");
console.log(`news records built: ${records.length} (${claimRecords.count} claim-source + ${corroborationRecords.count} corroboration)`);
