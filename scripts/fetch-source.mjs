import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";

const url = process.argv[2];
if (!url) throw new Error("usage: node scripts/fetch-source.mjs <url>");
const response = await fetch(url, { redirect: "follow" });
if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
const body = Buffer.from(await response.arrayBuffer());
const sha256 = createHash("sha256").update(body).digest("hex");
const directory = new URL("../data/sources/officials/", import.meta.url);
mkdirSync(directory, { recursive: true });
const prefix = sha256.slice(0, 16);
writeFileSync(new URL(`${prefix}.html`, directory), body);
writeFileSync(new URL(`${prefix}.json`, directory), `${JSON.stringify({ url, archived_url: response.url, fetched_at: new Date().toISOString(), sha256: `sha256:${sha256}`, status: response.status }, null, 2)}\n`);
console.log(JSON.stringify({ path: `data/sources/officials/${prefix}.html`, sha256: `sha256:${sha256}`, url: response.url }));
