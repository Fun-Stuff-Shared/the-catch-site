import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const manifestDir = join(process.cwd(), "checks/manifests");
export const manifests = readdirSync(manifestDir).filter((name) => name.endsWith(".json")).map((name) => JSON.parse(readFileSync(join(manifestDir, name), "utf8")));
export const records = manifests.flatMap((manifest) => (manifest.records ?? []).map((record) => ({ ...record, subject: manifest.subject, event: manifest.event, story: manifest.story ?? `/events/${manifest.event}/`, subEvents: (manifest.sub_events ?? []).filter((subEvent) => subEvent.records.includes(record.id)) })));
export const recordById = new Map(records.map((record) => [record.id, record]));
