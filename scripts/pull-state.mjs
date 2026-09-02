import { cpSync, mkdirSync } from "node:fs";
const root = new URL("..", import.meta.url).pathname;
const source = "/Volumes/4/CF/catch-state/views";
const ids = ["event-fed-rate-june-2026", "event-fed-rate-july-2026", "event-jobs-july-2026"];
mkdirSync(`${root}/data/state`, { recursive: true });
for (const id of ids) cpSync(`${source}/${id}.json`, `${root}/data/state/${id}.json`);
