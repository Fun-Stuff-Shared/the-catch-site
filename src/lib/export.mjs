import fs from "node:fs";

const committedExport = `${process.cwd()}/data/export.json`;
const exportPath =
  process.env.PORTICO_EXPORT_PATH ?? (fs.existsSync(committedExport) ? committedExport : null);
if (!exportPath) {
  throw new Error("PORTICO_EXPORT_PATH is required (no committed data/export.json)");
}

const document = JSON.parse(fs.readFileSync(exportPath, "utf8"));
if (!document.payload || !Array.isArray(document.payload.claims)) {
  throw new Error("portico_export_payload_invalid");
}

export const exportDocument = document;
export const payload = document.payload;
export const records = payload.claims;

export function recordFor(id) {
  return records.find((record) => record.claim_id === id);
}
