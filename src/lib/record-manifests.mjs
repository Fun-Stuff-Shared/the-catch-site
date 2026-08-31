import { readdirSync, readFileSync, realpathSync } from "node:fs";
import { join } from "node:path";
import newsRecordData from "../data/news-records.json";

const manifestDir = join(process.cwd(), "checks/manifests");
const seenManifestFiles = new Set();
export const manifests = readdirSync(manifestDir)
  .filter((name) => name.endsWith(".json"))
  .filter((name) => {
    const real = realpathSync(join(manifestDir, name));
    if (seenManifestFiles.has(real)) return false;
    seenManifestFiles.add(real);
    return true;
  })
  .map((name) => JSON.parse(readFileSync(join(manifestDir, name), "utf8")));
const manifestRecords = manifests.flatMap((manifest) => (manifest.records ?? []).map((record) => ({ ...record, subject: manifest.subject, event: manifest.event, story: manifest.story ?? `/events/${manifest.event}/`, subEvents: (manifest.sub_events ?? []).filter((subEvent) => subEvent.records.includes(record.id)) })));
const outletRecords = newsRecordData.records.map((record) => ({ ...record, subject: "news", event: "news", story: "/records/", subEvents: [] }));
export const records = [...manifestRecords, ...outletRecords];
export const recordById = new Map(records.map((record) => [record.id, record]));
export const outletRecordByUrl = new Map(outletRecords.map((record) => [record.url, record]));

export function storySources(event) {
  const manifest = manifests.find((m) => m.event === event);
  const list = (manifest?.story_sources ?? []).map((s, i) => ({ ...s, n: i + 1, record: recordById.get(s.id) }));
  return { list, num: Object.fromEntries(list.map((s) => [s.id, s.n])) };
}

export function citeNumber(sourceId) {
  for (const manifest of manifests) {
    const i = (manifest.story_sources ?? []).findIndex((s) => s.id === sourceId);
    if (i >= 0) return { n: i + 1, event: manifest.event };
  }
  return null;
}
