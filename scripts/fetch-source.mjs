import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";

const url = process.argv[2];
if (!url) throw new Error("usage: node scripts/fetch-source.mjs <url>");
const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36";
const request = async (target) => {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(target, { redirect: "follow", headers: { "user-agent": userAgent }, signal: AbortSignal.timeout(45_000) });
      if (response.ok) return response;
      lastError = new Error(`${target}: HTTP ${response.status}`);
    } catch (error) { lastError = error; }
  }
  throw lastError;
};
let response;
let archiveFallback = null;
try { response = await request(url); }
catch (canonicalError) {
  const snapshot = `http://web.archive.org/web/20260508113223/${url}`;
  response = await request(snapshot);
  archiveFallback = { archived_from: url, snapshot_timestamp: "20260508113223", type: "archive_fallback", canonical_error: canonicalError.message };
}
if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
const body = Buffer.from(await response.arrayBuffer());
const sha256 = createHash("sha256").update(body).digest("hex");
const directory = new URL("../data/sources/officials/", import.meta.url);
mkdirSync(directory, { recursive: true });
const prefix = sha256.slice(0, 16);
writeFileSync(new URL(`${prefix}.html`, directory), body);
writeFileSync(new URL(`${prefix}.json`, directory), `${JSON.stringify({ url, archived_url: response.url, fetched_at: new Date().toISOString(), sha256: `sha256:${sha256}`, status: response.status, ...archiveFallback }, null, 2)}\n`);
console.log(JSON.stringify({ path: `data/sources/officials/${prefix}.html`, sha256: `sha256:${sha256}`, url: response.url }));
