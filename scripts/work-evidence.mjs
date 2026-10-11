#!/usr/bin/env node
// Show the work lays each block's evidence open beneath it: for every paragraph, list item,
// figure or table that cites a record, the record's name and the exact passage the citation
// rests on. Built from the citations already on the page, so authors write nothing for it.
// Runs on the built pages after merge-cites; the evidence is typed proof, so it shows only
// in Show the work.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { parse } from "parse5";

const root = process.argv[2] || join(process.cwd(), "dist", "events");
const AFTER = new Set(["p", "blockquote", "figure", "table", "h2", "h3"]);

const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function* walk(node) {
  yield node;
  for (const child of node.childNodes ?? []) yield* walk(child);
}

function sourceList(html) {
  const list = new Map();
  for (const m of html.matchAll(/<li id="src-(\d+)"[^>]*><span class="src-n">\d+<\/span><a href="([^"]+)">([^<]*)<\/a>/g)) list.set(m[1], { href: m[2], label: m[3] });
  return list;
}

// The block a citation's evidence goes under: the nearest table, else the nearest list item
// (evidence goes inside it), else the nearest paragraph-like block (evidence goes after it).
function anchorFor(a, main) {
  const chain = [];
  for (let n = a.parentNode; n && n !== main; n = n.parentNode) chain.push(n);
  const table = chain.find((n) => n.tagName === "table");
  if (table) return { node: table, inside: false };
  for (const n of chain) {
    if (n.tagName === "li") return { node: n, inside: true };
    if (AFTER.has(n.tagName)) return { node: n, inside: false };
  }
  return null;
}

export function workEvidence(html) {
  if (html.includes('class="work-evidence"')) return html;
  const doc = parse(html, { sourceCodeLocationInfo: true });
  const main = [...walk(doc)].find((n) => n.tagName === "main" && attr(n, "id") === "story-root");
  if (!main) return html;
  const sources = sourceList(html);
  const groups = new Map();
  for (const a of walk(main)) {
    if (a.tagName !== "a" || a.parentNode?.tagName !== "sup" || !/^#src-\d+$/.test(attr(a, "href") ?? "")) continue;
    let skip = false;
    for (let n = a.parentNode; n && n !== main; n = n.parentNode) if (attr(n, "data-layer") === "proof" || attr(n, "id") === "records") skip = true;
    if (skip) continue;
    const anchor = anchorFor(a, main);
    if (!anchor) continue;
    const n = attr(a, "href").slice(5);
    const source = sources.get(n);
    if (!source) throw new Error(`work_evidence_unknown_source:${n}`);
    const passages = [attr(a, "data-passage"), ...(attr(a, "data-passages")?.split("\n") ?? [])].filter(Boolean);
    const loc = anchor.node.sourceCodeLocation;
    const at = anchor.inside ? loc.endTag.startOffset : loc.endOffset;
    if (!groups.has(at)) groups.set(at, new Map());
    const items = groups.get(at);
    if (!items.has(n)) items.set(n, { ...source, passages: [] });
    for (const p of passages) if (!items.get(n).passages.includes(p)) items.get(n).passages.push(p);
  }
  let out = html;
  for (const at of [...groups.keys()].sort((x, y) => y - x)) {
    const lis = [...groups.get(at)].map(([n, s]) =>
      `<li><span class="we-n">${n}</span><span class="we-body"><a href="${esc(s.href)}" data-record-href="${esc(s.href)}"${s.passages[0] ? ` data-passage="${esc(s.passages[0])}"` : ""}>${s.label}</a>${s.passages.map((p) => `<q>${esc(p)}</q>`).join("")}</span></li>`).join("");
    out = out.slice(0, at) + `<div class="work-evidence" data-layer="proof"><ul>${lis}</ul></div>` + out.slice(at);
  }
  return out;
}

function pages(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) pages(p, files); else if (name === "index.html") files.push(p);
  }
  return files;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let n = 0;
  for (const file of pages(root)) {
    const html = readFileSync(file, "utf8");
    const next = workEvidence(html);
    if (next !== html) { writeFileSync(file, next); n++; }
  }
  console.log(`work-evidence: ${n} page(s) carry their evidence in Show the work`);
}
