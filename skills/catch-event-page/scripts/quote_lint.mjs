#!/usr/bin/env node
// Every quoted span on a story page must be a contiguous substring of a record the same
// element cites, and an outlet's quoted words must come from that outlet's own pin.
// Usage: node skills/catch-event-page/scripts/quote_lint.mjs src/pages/events/<subject>/<story>.astro
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pagePath = process.argv[2];
if (!pagePath) { console.error("usage: quote_lint.mjs <page.astro>"); process.exit(2); }
const page = fs.readFileSync(pagePath, "utf8");

const m = pagePath.match(/src\/pages\/events\/([^/]+)\/([^/]+)\.astro$/) || pagePath.match(/src\/pages\/officials\/([^/]+)\/([^/]+)\.astro$/);
const manifestPath = m && fs.existsSync(path.join(root, "checks/manifests", `${m[1]}--${m[2]}.json`))
  ? path.join(root, "checks/manifests", `${m[1]}--${m[2]}.json`)
  : path.join(root, "checks/manifests", `${m[1]}--${m[2].replace(/-\d{4}$/, "")}.json`);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const norm = (s) => s
  .replace(/&ldquo;|&rdquo;|&quot;/g, '"').replace(/&rsquo;|&lsquo;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
  .replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
  .replace(/­/g, "").replace(/\s+/g, " ").trim();

const records = new Map();
for (const r of manifest.records) {
  const tp = path.join(root, r.text_path || r.pinned_path);
  let text = "";
  try { text = fs.readFileSync(tp, "utf8"); } catch { text = ""; }
  if (/\.html?$/i.test(tp)) text = text.replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
  records.set(r.id, { ...r, text: norm(text), rawHas: text.length > 0 });
}

const stripTags = (s) => s.replace(/<Cite[^>]*\/>/g, "").replace(/<[^>]+>/g, " ");
const citesOf = (s) => [...s.matchAll(/<Cite\s+s="([^"]+)"(?:\s+passage="([^"]*)")?/g)].map((x) => ({ s: x[1], passage: x[2] }));
const spansOf = (s) => {
  const out = [];
  for (const mm of norm(stripTags(s)).matchAll(/"([^"]{8,}?)"/g)) {
    const span = mm[1].replace(/[.,;:!?]+$/, "");
    if (/[{}]/.test(span) || /^\s*\)/.test(span)) continue;
    out.push(span);
  }
  return out;
};
const outletMatches = (outlet, publisher) => {
  const a = outlet.toLowerCase().replace(/^the\s+/, ""), b = (publisher || "").toLowerCase().replace(/^the\s+/, "");
  return a && b && (a.includes(b) || b.includes(a) || (a === "ap" && b.startsWith("associated")) || (a.startsWith("associated") && b === "ap"));
};

const has = (rec, span) => !!rec && (rec.text.includes(span) || rec.text.toLowerCase().includes(span.toLowerCase()));
const findings = [];
const lineOf = (idx) => page.slice(0, idx).split("\n").length;

// 1. Cite passages exist in their record.
for (const mm of page.matchAll(/<Cite\s+s="([^"]+)"\s+passage="([^"]*)"/g)) {
  const rec = records.get(mm[1]);
  if (!rec) { findings.push(`L${lineOf(mm.index)} cite: record ${mm[1]} is not in the manifest`); continue; }
  if (!rec.rawHas) { findings.push(`L${lineOf(mm.index)} cite: record ${mm[1]} has no readable text pin`); continue; }
  if (!rec.text.includes(norm(mm[2]))) findings.push(`L${lineOf(mm.index)} cite passage absent from ${mm[1]}: "${mm[2]}"`);
}

// 2. Quote cards: the whole body is one contiguous substring of a cited record.
for (const mm of page.matchAll(/<QuoteCard\b([^>]*)>([\s\S]*?)<\/QuoteCard>/g)) {
  const body = mm[2];
  const cites = citesOf(body);
  let text = norm(stripTags(body));
  const quoted = text.match(/^"([^"]+)"/);
  text = (quoted ? quoted[1] : text).replace(/^["']+|["']+$/g, "").replace(/\.$/, "");
  if (!cites.length) { findings.push(`L${lineOf(mm.index)} quote card has no Cite`); continue; }
  const ok = cites.some((c) => records.get(c.s)?.text.includes(text));
  if (!ok) findings.push(`L${lineOf(mm.index)} quote card is not a contiguous substring of ${cites.map((c) => c.s).join(",")}: "${text.slice(0, 90)}"`);
}

// 3. Outlet checks: quoted words come from that outlet's own cited pin.
for (const mm of page.matchAll(/<OutletCheck\b([\s\S]*?)>([\s\S]*?)<\/OutletCheck>/g)) {
  const attrs = mm[1], inner = mm[2];
  const outlet = (attrs.match(/outlet="([^"]+)"/) || [])[1] || "";
  const claim = (attrs.match(/claim=\{`([\s\S]*?)`\}/) || attrs.match(/claim="([^"]*)"/) || [])[1] || "";
  const verdict = (attrs.match(/verdict="([^"]*)"/) || [])[1] || "";
  const cites = citesOf(inner);
  const own = cites.map((c) => records.get(c.s)).filter((r) => r && outletMatches(outlet, r.publisher));
  if (outlet && !own.length) findings.push(`L${lineOf(mm.index)} outlet check "${outlet}" cites no record published by ${outlet} (cites: ${cites.map((c) => c.s).join(",") || "none"})`);
  for (const span of spansOf(claim)) {
    const inOwn = own.some((r) => has(r, span));
    const inAny = cites.some((c) => has(records.get(c.s), span));
    if (!inOwn) findings.push(`L${lineOf(mm.index)} outlet check "${outlet}" quotes words not in its own pin${inAny ? " (found only in another cited record)" : ""}: "${span.slice(0, 80)}"`);
  }
  for (const span of spansOf(verdict)) {
    if (!cites.some((c) => has(records.get(c.s), span))) findings.push(`L${lineOf(mm.index)} outlet verdict quotes words absent from cited records: "${span.slice(0, 80)}"`);
  }
}

// 4. Every other quoted span sits in a record its element cites (a SourcedBlock's source counts as a cite).
const sourced = [...page.matchAll(/<SourcedBlock\b([^>]*)>([\s\S]*?)<\/SourcedBlock>/g)];
const inSourced = (idx) => sourced.find((sb) => idx > sb.index && idx < sb.index + sb[0].length);
const blocks = [...page.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)];
for (const mm of blocks) {
  const body = mm[2];
  if (/<QuoteCard|<OutletCheck/.test(body)) continue;
  const cites = citesOf(body);
  const sb = inSourced(mm.index);
  if (sb) { const src = (sb[1].match(/source="([^"]+)"/) || [])[1]; if (src) cites.push({ s: src }); }
  for (const span of spansOf(body)) {
    if (!cites.length) { findings.push(`L${lineOf(mm.index)} quoted span with no Cite in its element: "${span.slice(0, 80)}"`); continue; }
    if (!cites.some((c) => has(records.get(c.s), span))) findings.push(`L${lineOf(mm.index)} quoted span absent from cited records ${cites.map((c) => c.s).join(",")}: "${span.slice(0, 80)}"`);
  }
}

if (findings.length) { console.log(`quote_lint: ${findings.length} finding(s) in ${pagePath}`); for (const f of findings) console.log("  " + f); process.exit(1); }
console.log(`quote_lint: clean (${pagePath})`);
