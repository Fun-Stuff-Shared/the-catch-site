import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, posix } from 'node:path';
import { sourceContext } from '../src/lib/evidence-context.mjs';
import { readerCopy } from './check-state-pages.mjs';
import { citedPassages } from './story-copy-rules.mjs';

export const REQUIRED_STEPS = [
  "sources_admitted",        // every source saved under data/sources/, SOURCES.md regenerated
  "derived_numbers_computed",// each derived figure computed from admitted series, receipt in reader words
  "outlet_claims_verified",  // each outlet claim compared to the primary record before verdicts
  "live_elements_guarded",   // every live element carries last-checked date + correction promise
  "subject_page_updated",    // timeline row + KPI/chart refresh on the standing subject page
];

export function recordManifestFindings(root, mPath, manifest, sourcePrefix = 'data/sources/') {
  const fail = [];
  for (const field of ["subject", "event", "date", "sub_events", "records"]) {
    if (!(field in manifest)) fail.push(`${mPath}: records manifest requires ${field}`);
  }
  if (!Array.isArray(manifest.sub_events) || !Array.isArray(manifest.records)) return fail;
  const ids = new Set();
  for (const record of manifest.records) {
    for (const field of ["id", "title", "publisher", "date", "url", "pinned_path", "text_path", "text_sha256", "quote", "quote_span_check"]) {
      if (!record[field]) fail.push(`${mPath}: record needs ${field}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id ?? "")) fail.push(`${mPath}: record id ${record.id} is not a stable slug`);
    if (!record.capture_run && !record.capture_status) fail.push(`${mPath}: ${record.id} has no registry route: run it through \`capture news\` and record capture_run, or type capture_status with the reason it could not be admitted`);
    if (record.capture_run && !/^capture-|^quarry-/.test(record.capture_run)) fail.push(`${mPath}: ${record.id} capture_run ${record.capture_run} is not a registry run id`);
    if (ids.has(record.id)) fail.push(`${mPath}: duplicate record id ${record.id}`);
    ids.add(record.id);
    if (record.quote_span_check === "quote_unverified") fail.push(`${mPath}: ${record.id} has an unverified quote`);
    if (!['byte_exact', 'normalized'].includes(record.quote_span_check)) fail.push(`${mPath}: ${record.id} has an unknown quote check`);
    for (const key of ["pinned_path", "text_path"]) {
      const rel = record[key];
      if (rel && !posix.normalize(rel).startsWith(sourcePrefix)) fail.push(`${mPath}: ${record.id} ${key} must be a repo-relative path under ${sourcePrefix}`);
    }
    const textPath = record.text_path && join(root, record.text_path);
    if (!textPath || !existsSync(textPath)) { fail.push(`${mPath}: ${record.id} text pin is missing`); continue; }
    const actual = `sha256:${createHash("sha256").update(readFileSync(textPath)).digest("hex")}`;
    if (actual !== record.text_sha256) fail.push(`${mPath}: ${record.id} text hash does not recompute`);
    const text = readFileSync(textPath, "utf8");
    const contains = record.quote_span_check === "byte_exact"
      ? text.includes(record.quote)
      : text.replace(/\s+/g, " ").includes(record.quote.replace(/\s+/g, " "));
    if (!contains) fail.push(`${mPath}: ${record.id} quote is absent from its text pin`);
  }
  for (const subEvent of manifest.sub_events) {
    for (const field of ["id", "date", "label", "section_anchor", "records"]) {
      if (!(field in subEvent)) fail.push(`${mPath}: sub-event needs ${field}`);
    }
    if (!Array.isArray(subEvent.records)) continue;
    for (const id of subEvent.records) if (!ids.has(id)) fail.push(`${mPath}: sub-event ${subEvent.id} names unknown record ${id}`);
  }
  return fail;
}

const INTERNAL = ["byte-captured", "capture debt", "operator review", "signed export",
  "retrieval", "automated", "staging", "sha256", "checked into", "admission row hash",
  "eligible claim", "manifested", "dossier", "extraction pipeline", "staged", "zain review", "w7", "internal review",
  "cloture", "perfecting nature", "voted not voting", "cloture motion", "quote card", "fact block", "sourced block"];
const wholeTerm = (term) => new RegExp(`\\b${term.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`, "i");


export function publicCopyFindings(html, route, recordIds, recordHref = id => `/records/${id}/`) {
  const fail = [];
  const text = readerCopy(html);
  for (const match of html.matchAll(/data-record="([^"]+)"/g)) {
    const id = match[1];
    if (!recordIds.has(id)) fail.push(`${route}: record chip names unknown record ${id}`);
    else if (!html.includes(`href="${recordHref(id)}"`)) fail.push(`${route}: record chip ${id} does not link to its record page`);
  }
  if (text.includes("—")) fail.push(`${route}: em dash in public copy`);
  for (const w of INTERNAL) {
    if (wholeTerm(w).test(text)) fail.push(`${route}: internal vocabulary "${w}" in visible text`);
  }
  // jammed text-to-inline-tag boundaries (rendered artifact of template line joins)
  const deEntitied = html.replace(/&[a-zA-Z#0-9]+;/g, " ");
  if (/[a-zA-Z0-9,.;:%)”]<(?:strong|em|a[ >]|span)/.test(deEntitied)) fail.push(`${route}: text jammed against an inline tag (missing space)`);
  return fail;
}

const CONTENT_TAGS = new Set(["p", "ul", "ol", "aside", "figure", "table", "details", "blockquote", "h2", "h3"]);
const VOID_TAGS = new Set(["br", "hr", "img", "input", "meta", "link", "source", "wbr", "col", "embed", "track", "area", "base"]);
export function layerFindings(html, route) {
  const fail = [];
  if (!html.includes("mode-switcher")) return fail;
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!mainMatch) return fail;
  const main = mainMatch[1];
  const untyped = [];
  const stack = []; // { tag, hasLayer }
  for (const m of main.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^"'>])*)>/g)) {
    const closing = m[1] === "/";
    const tag = m[2].toLowerCase();
    const attrs = m[3];
    if (closing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) { stack.length = i; break; }
      }
      continue;
    }
    const selfClosing = VOID_TAGS.has(tag) || attrs.endsWith("/");
    const hasLayer = attrs.includes("data-layer");
    const covered = hasLayer || stack.some((s) => s.hasLayer);
    if (CONTENT_TAGS.has(tag) && !covered) {
      untyped.push(`<${tag}> at offset ${m.index}${attrs.includes("class") ? " " + (attrs.match(/class="([^"]*)"/) || [])[1] : ""}`);
    }
    if (!selfClosing) stack.push({ tag, hasLayer });
  }
  if (untyped.length > 0) {
    fail.push(`${route}: ${untyped.length} untyped content element(s) in mode-switched page (layer-typing required): ${untyped.slice(0, 5).join(", ")}`);
  }
  return fail;
}

export function citationFindings(html, route, records, root) {
  const fail = [];
  const refs = [...html.matchAll(/href="#(src-\d+)"/g)].map((m) => m[1]);
  const ids = new Set([...html.matchAll(/id="(src-\d+)"/g)].map((m) => m[1]));
  const dangling = [...new Set(refs.filter((r) => !ids.has(r)))];
  if (dangling.length > 0) {
    fail.push(`${route}: citation(s) link to nothing: ${dangling.join(", ")}`);
  }
  // The evidence reader highlights data-passage inside the record's saved text; a passage
  // that is not in the text opens a reader with nothing marked.
  for (const { id, passage } of citedPassages(html)) {
    const record = records.get(id);
    if (!record) { fail.push(`${route}: citation names unknown record ${id}`); continue; }
    const textPath = record.text_path || record.pinned_path;
    if (!textPath || !existsSync(join(root, textPath))) { fail.push(`${route}: record ${id} has no saved text to cite`); continue; }
    if (!sourceContext(readFileSync(join(root, textPath), "utf8"), passage)) fail.push(`${route}: passage "${passage.slice(0, 80)}" is not in the saved text of ${id}`);
  }
  return fail;
}
