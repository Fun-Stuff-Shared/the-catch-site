import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const root = new URL("..", import.meta.url).pathname;
const source = "/Volumes/4/CF/catch-state/views";
const ids = ["event-fed-rate-june-2026", "event-fed-rate-july-2026", "event-jobs-july-2026"];
if (!existsSync(source)) {
  for (const id of ids) statSync(`${root}/data/state/${id}.json`);
  statSync(`${root}/data/state/derived-figures.json`);
  console.log(`state refresh: ${source} is not mounted on this host; building from the committed data/state copies`);
  process.exit(0);
}
mkdirSync(`${root}/data/state`, { recursive: true });
const copyNewer = (from, to) => {
  if (!statSync(from).isFile()) throw new Error(`state source missing: ${from}`);
  const sourceMtime = statSync(from).mtimeMs;
  const destinationMtime = statSync(to, { throwIfNoEntry: false })?.mtimeMs ?? 0;
  if (sourceMtime > destinationMtime) {
    cpSync(from, to);
    console.log(`state refresh: copied ${from}`);
  } else console.log(`state refresh: kept ${to}`);
};
for (const id of ids) copyNewer(`${source}/${id}.json`, `${root}/data/state/${id}.json`);
const exportsDir = "/Volumes/4/CF/catch-state/exports";
const derived = readdirSync(exportsDir)
  .filter((name) => /^derived-figures-\d{8}(?:\.\d{4}-\d{2}-\d{2})?\.json$/.test(name))
  .map((name) => join(exportsDir, name))
  .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)[0];
if (!derived) throw new Error("derived figures export missing");
copyNewer(derived, `${root}/data/state/derived-figures.json`);
