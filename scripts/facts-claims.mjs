#!/usr/bin/env node
// Just the facts lists the page's own claims: every sentence of the story prose that carries
// a citation, under the heading it sits in, without the sentences around it that carry none.
// Built from the narrative paragraphs and list items after astro build; the lists are typed
// "claims" and show only in Just the facts.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { parse } from "parse5";

const root = process.argv[2] || join(process.cwd(), "dist", "events");
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
const ABBREV = /(?:\b[A-Z]|\b(?:Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept?|Oct|Nov|Dec|Mr|Mrs|Ms|Dr|Gen|Lt|Sgt|Cpl|Col|Capt|Gov|Sen|Rep|St|No|Inc|Corp|Co|Jr|Sr|vs|U\.S|D\.C))\.$/;

function* walk(node) {
  yield node;
  for (const child of node.childNodes ?? []) yield* walk(child);
}

// Split an element's inner HTML into sentences at top level: a boundary is sentence-ending
// punctuation (with any closing quote and citation markers after it) followed by space and a
// capital or an opening quote. Text inside tags and attributes is never split.
export function sentences(html) {
  const parts = [];
  let start = 0;
  const re = /([.!?][”"’)]?)((?:<sup class="src-ref">[\s\S]*?<\/sup>)*)(\s+)(?=[A-Z“"(‘])/g;
  let m;
  while ((m = re.exec(html))) {
    const before = html.slice(start, m.index + 1).replace(/<[^>]+>/g, "");
    if (ABBREV.test(before.trimEnd())) continue;
    const head = html.slice(0, m.index);
    if (head.lastIndexOf("<") > head.lastIndexOf(">") || openTags(head) > 0) continue;
    parts.push(html.slice(start, m.index + m[1].length + m[2].length));
    start = m.index + m[0].length;
  }
  parts.push(html.slice(start));
  return parts.map((s) => s.trim()).filter(Boolean);
}

function openTags(html) {
  let depth = 0;
  for (const [t] of html.matchAll(/<\/?[a-zA-Z][^>]*>/g)) {
    if (/^<sup class="src-ref"/.test(t) || t === "</sup>" || /^<\/?a[\s>]/.test(t) || /\/>$/.test(t) || /^<(br|img|wbr)\b/i.test(t)) continue;
    depth += t.startsWith("</") ? -1 : 1;
  }
  return depth;
}

const cited = (s) => s.includes('<sup class="src-ref">');

export function factsClaims(html) {
  if (html.includes('data-layer="claims"')) return html;
  const doc = parse(html, { sourceCodeLocationInfo: true });
  const main = [...walk(doc)].find((n) => n.tagName === "main" && attr(n, "id") === "story-root");
  if (!main) return html;
  const inserts = [];
  for (const node of walk(main)) {
    if (!["p", "li"].includes(node.tagName) || attr(node, "data-layer") !== "narrative") continue;
    const loc = node.sourceCodeLocation;
    const inner = html.slice(loc.startTag.endOffset, loc.endTag.startOffset).replace(/<div class="work-evidence"[\s\S]*$/, "");
    const claims = sentences(inner).filter(cited);
    if (!claims.length) continue;
    const items = claims.map((s) => `<li>${s}</li>`).join("");
    inserts.push({
      at: loc.endOffset,
      text: node.tagName === "p"
        ? `<ul class="claim-list" data-layer="claims">${items}</ul>`
        : claims.map((s) => `<li class="claim" data-layer="claims">${s}</li>`).join(""),
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
    const next = factsClaims(html);
    if (next !== html) { writeFileSync(file, next); n++; }
  }
  console.log(`facts-claims: ${n} page(s) list their claims in Just the facts`);
}
