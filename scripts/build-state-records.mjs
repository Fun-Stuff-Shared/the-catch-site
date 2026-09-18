import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join, relative, resolve, isAbsolute, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { citedDocuments } from "../src/lib/state.mjs";

const insideRoot = (root, path) => {
  if (!existsSync(path)) return false;
  const rel = relative(realpathSync(root), realpathSync(path));
  return rel !== "" && rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
};

// A view may name its text by the absolute path of the machine that wrote it. The hosted build
// only has the repository, so a path is used only where it lands inside the repository root:
// as written, or by the part after `data/sources/` when the checkout lived elsewhere.
export function savedTextSource(root, textPath, destination) {
  const candidates = [];
  if (textPath) {
    const pinned = String(textPath).split("/data/sources/");
    if (pinned.length > 1) candidates.push(join(root, "data/sources", pinned.at(-1)));
    candidates.push(resolve(root, textPath));
  }
  candidates.push(destination);
  return candidates.find((path) => insideRoot(root, path)) ?? null;
}

export function buildStateRecords(state, root = fileURLToPath(new URL("..", import.meta.url))) {
  return citedDocuments(state).map((document) => {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_:-]*$/.test(document.id)) throw new Error(`Invalid record id: ${document.id}`);
    const pin = `data/sources/news-state/${document.id}.txt`;
    const destination = join(root, pin);
    const source = savedTextSource(root, document.text_path, destination);
    if (!source) throw new Error(`Cited document has no saved text inside the repository: ${document.id}`);
    const text = readFileSync(source, "utf8");
    const hash = createHash("sha256").update(text).digest("hex");
    if (hash !== String(document.text_sha256 ?? "").replace(/^sha256:/, "")) throw new Error(`Cited document text hash mismatch: ${document.id}`);
    if (!document.publisher || !document.url) throw new Error(`Cited document metadata missing: ${document.id}`);
    const passages = document.passages.map((passage) => {
      const check = text.includes(passage.text) ? 'byte_exact' : text.replace(/\s+/g, ' ').includes(passage.text.replace(/\s+/g, ' ')) ? 'normalized' : null;
      if (!check) throw new Error(`Cited passage is absent from saved document: ${passage.occurrence_id}`);
      return {...passage, span_check: check};
    });
    mkdirSync(join(root, "data/sources/news-state"), { recursive: true });
    writeFileSync(destination, text);
    return {
      id: document.id, title: document.title?.trim() || document.url, publisher: document.publisher,
      date: document.asserted_at?.slice(0, 10) ?? null, url: document.url,
      record_kind: "cited_document", quote: passages[0]?.text ?? text.slice(0, 1600),
      excerpt_kind: passages.length ? 'cited_passages' : 'document_opening',
      passages,
      pinned_path: pin, text_path: pin, text_sha256: `sha256:${hash}`,
      pin_capture: { kind: "body_capture" }, quote_span_check: passages[0]?.span_check ?? "byte_exact",
      citations: document.citations,
    };
  });
}
