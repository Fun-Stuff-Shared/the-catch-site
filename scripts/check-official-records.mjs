import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { assertOfficialRecords } from "../src/lib/official-records.mjs";

export function checkOfficialRecords(datasetPath, registryPath, storiesPath, root = fileURLToPath(new URL("..", import.meta.url))) {
  const read = (path) => JSON.parse(readFileSync(path, "utf8"));
  const data = assertOfficialRecords(read(datasetPath), {
    root,
    records: new Map(read(registryPath).map((record) => [record.id, record])),
    publishedStories: new Set(read(storiesPath)),
  });
  return { kind: data.kind, officials: data.officials.length, roll_calls: data.roll_calls.length };
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  if (process.argv.length !== 5) throw new Error("Usage: node scripts/check-official-records.mjs DATASET.json TRUSTED_RECORD_REGISTRY.json PUBLISHED_STORY_PATHS.json");
  console.log(JSON.stringify(checkOfficialRecords(...process.argv.slice(2))));
}
