import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const ROOT = new URL("..", import.meta.url).pathname;
const CAPTURE_ROOT = "/Volumes/4/CF/news-fqs-pilot";
const news = JSON.parse(readFileSync(`${ROOT}/src/data/news-data.json`, "utf8"));
const byUrl = new Map();
for (const row of news.rows) if (!byUrl.has(row.source_url)) byUrl.set(row.source_url, row);
const receiptFiles = execFileSync("fd", ["--hidden", "--no-ignore", "article_receipts.jsonl", CAPTURE_ROOT], { encoding: "utf8" }).trim().split("\n").filter(Boolean).sort();
const matches = new Map();
for (const receiptFile of receiptFiles) for (const line of readFileSync(receiptFile, "utf8").split("\n")) {
  if (!line) continue;
  const receipt = JSON.parse(line);
  if (receipt.typed_outcome !== "body_captured") continue;
  for (const url of [receipt.item_url, receipt.final_url]) if (byUrl.has(url)) {
    const candidate = { ...receipt, receipt_path: receiptFile, retrieved_at: receipt.completed_at ?? receipt.requested_at ?? receipt.captured_at ?? receipt.attempts?.[0]?.finished_at };
    const textPath = `${candidate.receipt_path.replace(/\/article_receipts\.jsonl$/, "")}/${candidate.text_path}`;
    if (!existsSync(textPath)) continue;
    const candidates = matches.get(url) ?? [];
    candidates.push(candidate);
    matches.set(url, candidates);
  }
}
const records = [...byUrl.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([url, row]) => {
  const candidates = matches.get(url);
  if (!candidates?.length) throw new Error(`missing body receipt for ${url}`);
  const quotes = news.rows.filter((claim) => claim.source_url === url).map((claim) => claim.quote.replace(/\s+/g, " "));
  const ranked = candidates.map((candidate) => {
    const textPath = `${candidate.receipt_path.replace(/\/article_receipts\.jsonl$/, "")}/${candidate.text_path}`;
    const rawText = readFileSync(textPath, "utf8");
    const text = rawText.replace(/\s+/g, " ");
    return { candidate, textPath, text, rawText, score: quotes.filter((quote) => text.includes(quote)).length };
  }).sort((a, b) => b.score - a.score || `${b.candidate.retrieved_at ?? ""}\0${b.candidate.receipt_path}`.localeCompare(`${a.candidate.retrieved_at ?? ""}\0${a.candidate.receipt_path}`));
  const { candidate: receipt, textPath, text, rawText } = ranked[0];
  if (`sha256:${createHash("sha256").update(rawText).digest("hex")}` !== receipt.text_sha256) throw new Error(`text hash mismatch for ${url}`);
  const id = `outlet-${createHash("sha256").update(url).digest("hex").slice(0, 16)}`;
  const retrievedAt = receipt.retrieved_at;
  if (!retrievedAt) throw new Error(`receipt has no retrieval time for ${url}`);
  return { id, url, publisher: row.publisher, title: row.article_title, quote: row.quote, date: retrievedAt.slice(0, 10), retrieved_at: retrievedAt, raw_sha256: receipt.raw_sha256, text_path: textPath, text_sha256: receipt.text_sha256, receipt_path: receipt.receipt_path };
});
writeFileSync(`${ROOT}/src/data/news-records.json`, JSON.stringify({ schema: "news_records_v1", source_sha256: news.source_sha256, count: records.length, records }, null, 2) + "\n");
console.log(`news records built: ${records.length}`);
