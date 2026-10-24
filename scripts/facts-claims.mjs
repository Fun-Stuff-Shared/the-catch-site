#!/usr/bin/env node
// Just the facts lists the page's own claims: on a page with a claim ledger, each claim its
// paragraphs cite; otherwise each cited sentence of the story prose, under the heading it sits
// in, without the text after the last citation.
// Built from the narrative paragraphs and list items after astro build; the lists are typed
// "claims" and show only in Just the facts.
import { existsSync, readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { parse } from "parse5";

const root = process.argv[2] || join(process.cwd(), "dist", "events");
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;

function* walk(node) {
  yield node;
  for (const child of node.childNodes ?? []) yield* walk(child);
}

// Split an element's inner HTML into claims. A claim ends where sentence-ending punctuation
// (with any closing quote) is followed by its citation markers: the page cites each fact
// sentence where it ends, so the citation marks the boundary and no abbreviation has to be
// guessed at. Uncited sentences before a cited one stay with it; text after the last
// citation is not a claim. Punctuation inside a tag, attribute or nested markup never ends one.
export function claims(html) {
  const parts = [];
  let start = 0;
  const re = /([.!?][”"’)]?)((?:\s*<sup class="src-ref[^"]*">[\s\S]*?<\/sup>)+)/g;
  let m;
  while ((m = re.exec(html))) {
    const head = html.slice(0, m.index);
    if (head.lastIndexOf("<") > head.lastIndexOf(">") || openTags(head) > 0) continue;
    parts.push(html.slice(start, m.index + m[0].length).trim());
    start = m.index + m[0].length;
  }
  return parts.filter(Boolean);
}

function openTags(html) {
  let depth = 0;
  for (const [t] of html.matchAll(/<\/?[a-zA-Z][^>]*>/g)) {
    if (/^<sup class="src-ref[ "]/.test(t) || t === "</sup>" || /^<\/?a[\s>]/.test(t) || /\/>$/.test(t) || /^<(br|img|wbr)\b/i.test(t)) continue;
    depth += t.startsWith("</") ? -1 : 1;
  }
  return depth;
}

// On a page that cites a claim ledger, Just the facts lists the claims themselves, in the
// ledger's words with their status and scope, each with the citations the paragraph gave it.
export function ledgerClaims(inner, says) {
  const byClaim = new Map();
  for (const [sup] of inner.matchAll(/<sup class="src-ref[^"]*">[\s\S]*?<\/sup>/g)) {
    const ids = ((sup.match(/data-claim="([^"]*)"/) || [])[1] ?? "").split(" ").filter(Boolean);
    const plain = sup.replace('class="src-ref src-ref-more"', 'class="src-ref"');
    for (const id of ids) byClaim.set(id, [...(byClaim.get(id) ?? []), plain]);
  }
  const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return [...byClaim].map(([id, sups]) =>
    escape(says(id)) + sups.map((s, i) => (i ? s.replace('class="src-ref"', 'class="src-ref src-ref-more"') : s)).join(""));
}

export function factsClaims(html, says = null) {
  if (html.includes('data-layer="claims"')) return html;
  const doc = parse(html, { sourceCodeLocationInfo: true });
  const main = [...walk(doc)].find((n) => n.tagName === "main" && attr(n, "id") === "story-root");
  if (!main) return html;
  const inserts = [];
  for (const node of walk(main)) {
    if (!["p", "li"].includes(node.tagName) || attr(node, "data-layer") !== "narrative") continue;
    const loc = node.sourceCodeLocation;
    const inner = html.slice(loc.startTag.endOffset, loc.endTag.startOffset).replace(/<div class="work-evidence"[\s\S]*$/, "");
    const found = says ? ledgerClaims(inner, says) : claims(inner);
    if (!found.length) continue;
    const items = found.map((s) => `<li>${s}</li>`).join("");
    inserts.push({
      at: loc.endOffset,
      text: node.tagName === "p"
        ? `<ul class="claim-list" data-layer="claims">${items}</ul>`
        : found.map((s) => `<li class="claim" data-layer="claims">${s}</li>`).join(""),
    });
  }
  let out = html;
  for (const { at, text } of inserts.sort((a, b) => b.at - a.at)) out = out.slice(0, at) + text + out.slice(at);
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
    const [subject, slug] = relative(root, file).split(sep);
    const ledgerPath = join(process.cwd(), "checks/claims", `${subject}--${slug}.json`);
    const ledger = slug && existsSync(ledgerPath) ? JSON.parse(readFileSync(ledgerPath, "utf8")) : null;
    const says = ledger && ((id) => {
      const found = ledger.claims.find((c) => c.id === id);
      if (!found) throw new Error(`claim_unknown:${subject}--${slug}:${id}`);
      return found.says;
    });
    const next = factsClaims(html, says);
    if (next !== html) { writeFileSync(file, next); n++; }
  }
  console.log(`facts-claims: ${n} page(s) list their claims in Just the facts`);
}
