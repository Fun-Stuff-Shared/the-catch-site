import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import newsRecordData from "../data/news-records.json";

const manifestDir = join(process.cwd(), "checks/manifests");
export const manifests = readdirSync(manifestDir).filter((name) => name.endsWith(".json")).map((name) => JSON.parse(readFileSync(join(manifestDir, name), "utf8")));
const manifestRecords = manifests.flatMap((manifest) => (manifest.records ?? []).map((record) => ({ ...record, subject: manifest.subject, event: manifest.event, story: manifest.story ?? `/events/${manifest.event}/`, subEvents: (manifest.sub_events ?? []).filter((subEvent) => subEvent.records.includes(record.id)) })));
const outletRecords = newsRecordData.records.map((record) => ({ ...record, subject: "news", event: "news", story: "/news/", subEvents: [] }));
export const records = [...manifestRecords, ...outletRecords];
export const recordById = new Map(records.map((record) => [record.id, record]));
export const outletRecordByUrl = new Map(outletRecords.map((record) => [record.url, record]));
