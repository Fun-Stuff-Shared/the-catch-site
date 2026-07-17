import fs from "node:fs";
import path from "node:path";

function loadVocabulary() {
  const pythonSourcePath = process.env.PORTICO_STATUS_SOURCE ?? path.resolve(process.cwd(), "../public_surface.py");
  if (fs.existsSync(pythonSourcePath)) {
    const pythonSource = fs.readFileSync(pythonSourcePath, "utf8");
    const vocabularyBlock = pythonSource.match(/STATUS_VOCABULARY = frozenset\(\s*\{([\s\S]*?)\}\s*\)/)?.[1];
    if (!vocabularyBlock) {
      throw new Error("python_status_vocabulary_missing");
    }
    return [...vocabularyBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  }
  const snapshotPath = path.resolve(process.cwd(), "data/status_vocabulary.json");
  if (fs.existsSync(snapshotPath)) {
    return JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  }
  throw new Error("python_status_vocabulary_missing");
}

export const STATUS_VOCABULARY = new Set(loadVocabulary());

export function statusLabelFor(record) {
  const label = record.verification_status ?? (record.publication_status === "pulled"
    ? "Withdrawn"
      : record.publication_status === "corrected"
        ? "Supported by reporting"
      : "Supported by original record");
  if (!STATUS_VOCABULARY.has(label)) {
    throw new Error("astro_status_not_in_python_vocabulary");
  }
  return label;
}
