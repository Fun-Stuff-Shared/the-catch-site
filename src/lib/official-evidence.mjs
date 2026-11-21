import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";

const sourceClasses = new Set(["primary", "official", "coverage", "fixture"]);

// Only the trusted record registry supplies paths; a dataset supplies record IDs.
export function createOfficialEvidence({ records, root = process.cwd(), readText } = {}) {
  if (!(records instanceof Map)) throw new Error("official_evidence: records must be a Map");
  const cache = new Map();
  const read = readText ?? ((record) => {
    if (!record.text_path) throw new Error(`official_evidence: no saved text for ${record.id}`);
    const base = realpathSync(root);
    const path = realpathSync(resolve(base, record.text_path));
    const fromRoot = relative(base, path);
    if (fromRoot === ".." || fromRoot.startsWith("../") || isAbsolute(fromRoot)) {
      throw new Error(`official_evidence: saved text outside repository for ${record.id}`);
    }
    return readFileSync(path, "utf8");
  });
  return (reference, { allowFixture = false } = {}) => {
    if (!reference || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(reference.record_id ?? "") ||
        !reference.passage?.trim() || !sourceClasses.has(reference.source_class)) {
      throw new Error("official_evidence: invalid evidence reference");
    }
    const record = records.get(reference.record_id);
    if (!record || record.id !== reference.record_id) throw new Error(`official_evidence: unknown record ${reference.record_id}`);
    if (record.source_class !== reference.source_class) throw new Error(`official_evidence: source class differs for ${record.id}`);
    if (!allowFixture && (record.source_class === "fixture" || record.synthetic === true)) {
      throw new Error(`official_evidence: fixture record ${record.id} is not publishable`);
    }
    if (!cache.has(record.id)) {
      const text = read(record);
      if (typeof text !== "string" || !/^sha256:[a-f0-9]{64}$/.test(record.text_sha256 ?? "") ||
          `sha256:${createHash("sha256").update(text).digest("hex")}` !== record.text_sha256) {
        throw new Error(`official_evidence: saved text fingerprint differs for ${record.id}`);
      }
      cache.set(record.id, text);
    }
    const text = cache.get(record.id);
    const start = text.indexOf(reference.passage);
    if (start < 0) throw new Error(`official_evidence: passage missing from ${record.id}`);
    // The reader searches by passage, not offsets; ambiguous snippets can open the wrong occurrence.
    if (text.indexOf(reference.passage, start + 1) >= 0) throw new Error(`official_evidence: ambiguous passage in ${record.id}`);
    return { record, passage: reference.passage, href: `/records/${record.id}/` };
  };
}

// Spread on an Astro anchor; no event manifest or page-local footnote number is needed.
export function officialEvidenceLink(reference, resolveEvidence, options) {
  const { href, passage } = resolveEvidence(reference, options);
  return { href, "data-record-href": href, "data-passage": passage };
}
