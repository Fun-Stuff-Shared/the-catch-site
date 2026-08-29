import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE_DIR = new URL("../data/sources/officials/", import.meta.url).pathname;
const EPISODE_DIR = new URL("../src/data/officials/marco-rubio/episodes/", import.meta.url).pathname;
const normalize = (value) => value.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
const cache = readdirSync(SOURCE_DIR).filter((name) => name.endsWith(".json")).map((name) => ({ sidecar: JSON.parse(readFileSync(join(SOURCE_DIR, name), "utf8")), text: normalize(readFileSync(join(SOURCE_DIR, name.replace(/\.json$/, ".html")), "utf8")) }));
const errors = [];
for (const file of readdirSync(EPISODE_DIR).filter((name) => name.endsWith(".json"))) {
  const episode = JSON.parse(readFileSync(join(EPISODE_DIR, file), "utf8"));
  for (const statement of episode.statements) {
    const source = cache.find(({ sidecar }) => sidecar.url === statement.url || sidecar.archived_url === statement.url);
    if (!source) { errors.push(`${episode.slug}: unfetched:${statement.url}`); continue; }
    for (const segment of statement.quote.split(/…|\.\.\./).map(normalize).filter(Boolean)) if (!source.text.includes(segment)) errors.push(`${episode.slug}: quote miss ${JSON.stringify(segment)} in ${statement.url}`);
  }
}
if (errors.length) throw new Error(`statement check failed:\n${errors.join("\n")}`);
console.log("statement check passed");
