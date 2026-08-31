// Generate src/data/officials/marco-rubio/patterns.json from the rubio-2025 pattern run.
// Run manually when the pattern artifact updates; the committed JSON is the build input.
import { readFileSync, writeFileSync } from "node:fs";

const RUN = "/Volumes/4/CF/public-figure-pilots/rubio-2025/runs-figures";
const final = JSON.parse(readFileSync(`${RUN}/pattern-discovery-20260831T090000Z/patterns_final.json`, "utf8"));
const bank = new Map();
for (const line of readFileSync(`${RUN}/pattern-bank-20260831T090000Z/bank.jsonl`, "utf8").split("\n")) {
  if (!line.trim()) continue;
  const row = JSON.parse(line);
  bank.set(row.handle, row);
}

const plainify = (t) => t
  .replace(/Voted (yes|no) on Motion to Invoke Cloture on (.+?): On the Cloture Motion/i, "Voted $1 on ending debate on $2")
  .replace(/Motion to Invoke Cloture on/gi, "a vote on ending debate on")
  .replace(/On the Cloture Motion/gi, "on ending debate")
  .replace(/cloture/gi, "ending debate")
  .replace(/\s*\u2014\s*/g, ", ");
const text = (row) => {
  const t = Array.isArray(row.text) ? row.text.join(" ") : row.text || "";
  return plainify(t.trim());
};
const url = (row) => {
  const sr = row.source_ref;
  return typeof sr === "string" && sr.startsWith("http") ? sr : null;
};
const sourceLabel = (row) => {
  const u = url(row) || "";
  if (row.layer === "vote") return "Senate roll call";
  if (u.includes("x.com") || u.includes("twitter.com")) return "Post on X";
  if (u.includes("govinfo.gov")) return "Congressional Record";
  if (u.includes("congress.gov")) return "Congress.gov";
  if (u.includes("senate.gov")) return "Senate.gov";
  if (u.includes("state.gov")) return "State.gov";
  if (u) return new URL(u).hostname.replace(/^www\./, "");
  return "checked archive";
};

const exampleFor = (h) => {
  const row = bank.get(h);
  if (!row) return null;
  const t = text(row);
  if (!t) return null;
  return {
    quote: t.length > 240 ? `${t.slice(0, 237)}…` : t,
    date: row.date || null,
    url: url(row),
    source: sourceLabel(row),
    side: row.side || (row.layer === "vote" ? "do" : "say"),
  };
};

const pickExamples = (handles, n) => {
  const seen = new Set();
  const out = [];
  // prefer linked, dated, layer-diverse examples
  const scored = handles
    .map((h) => ({ h, ex: exampleFor(h), prefix: h.split(":")[0] }))
    .filter((x) => x.ex)
    .sort((a, b) => (b.ex.url ? 1 : 0) + (b.ex.date ? 1 : 0) - ((a.ex.url ? 1 : 0) + (a.ex.date ? 1 : 0)));
  for (const x of scored) {
    if (out.length >= n) break;
    if (seen.has(x.prefix) && scored.some((y) => y.ex && !seen.has(y.prefix) && !out.includes(y.ex))) continue;
    if (out.some((e) => e.quote === x.ex.quote)) continue;
    seen.add(x.prefix);
    out.push(x.ex);
  }
  return out;
};

const tensionFor = (p) => {
  const entries = [];
  for (const kind of ["say_do_misalignments", "contradictions"]) {
    for (const t of p.contrast?.[kind] || []) {
      entries.push({
        kind: kind === "contradictions" ? "contradiction" : "say-do",
        explanation: plainify(t.explanation),
        evidence: t.handles.map(exampleFor).filter(Boolean).slice(0, 4),
      });
    }
  }
  return entries;
};

const keep = final.patterns.filter((p) => p.status === "confirmed" || p.status === "confirmed_with_tension");
const patterns = keep.map((p) => ({
  id: p.id,
  name: p.name,
  status: p.status,
  reader_note: p.reader_note,
  support_count: p.support.length,
  examples: pickExamples(p.support, 3),
  tension: tensionFor(p),
})).sort((a, b) => (b.tension.length - a.tension.length) || (b.support_count - a.support_count));

const out = {
  generated: new Date().toISOString().slice(0, 10),
  run: "pattern-discovery-20260831T090000Z",
  method: "Patterns were proposed from the evidence bank with no preset topic list, merged, then tested against the full bank - including all 4,612 Senate roll-call votes - for contradictions and say-do tension, then reviewed for evidence strength.",
  counts: { shown: patterns.length, confirmed: patterns.filter((p) => p.status === "confirmed").length, with_tension: patterns.filter((p) => p.status === "confirmed_with_tension").length, tentative_held_back: final.patterns.filter((p) => p.status === "tentative").length },
  patterns,
};
writeFileSync("src/data/officials/marco-rubio/patterns.json", `${JSON.stringify(out, null, 2)}\n`);
console.log("patterns.json:", patterns.length, "patterns;", patterns.filter((p) => p.tension.length).length, "with tension entries");
