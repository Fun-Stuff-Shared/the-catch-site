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

const GROUP_ORDER = ["primary", "official", "coverage"];
function numberedSources(manifest) {
  const sources = manifest?.story_sources ?? [];
  for (const s of sources) if (!GROUP_ORDER.includes(s.group)) throw new Error(`story_source_group_unknown:${manifest.event}:${s.id}:${s.group}`);
  return sources
    .map((s, i) => ({ ...s, i }))
    .sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group) || a.i - b.i)
    .map(({ i, ...s }, k) => ({ ...s, n: k + 1 }));
}

export function storySources(event) {
  const manifest = manifests.find((m) => m.event === event);
  const list = manifest ? numberedSources(manifest).map((s) => ({ ...s, record: recordById.get(s.id) })) : [];
  return { list, num: Object.fromEntries(list.map((s) => [s.id, s.n])) };
}

export function citeNumber(sourceId, event) {
  const ordered = event ? [...manifests.filter((m) => m.event === event), ...manifests.filter((m) => m.event !== event)] : manifests;
  for (const manifest of ordered) {
    const hit = numberedSources(manifest).find((s) => s.id === sourceId);
    if (hit) return { n: hit.n, event: manifest.event };
  }
  return null;
}

export function figureLabel(storyPath, figureName) {
  const manifest = manifests.find((m) => `/events/${m.event}/` === storyPath);
  const figure = (manifest?.figures ?? []).find((f) => f.figure === figureName);
  return figure?.label ?? null;
}
