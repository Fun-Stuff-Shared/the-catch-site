// Candidates for a new story: the pinned snapshot's developments the core counts three independent sources behind,
// newest first, optionally narrowed by words in the label. A development a published story already draws on is still
// listed, with that story and how many of its sources came out after the story's manifest was last committed: those are leads
// for a follow-up, and a development with none is already told. A development under another subject that shares at least two
// sources, and at least a quarter of the smaller one's, with a told one is listed the same way, as the same event:
// roundup articles alone tie unrelated subjects together.
// usage: node scripts/v2-candidates.mjs [--days 7] [--limit 40] [words...]
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { readV2 } from "../src/lib/v2.mjs";
import { developmentEntry, latestSource, selectedDevelopments, shownClaims } from "../src/lib/v2-brief.mjs";

const args = process.argv.slice(2);
const option = (name, fallback) => { const at = args.indexOf(name); return at < 0 ? fallback : Number(args.splice(at, 2)[1]); };
const days = option("--days", 7), limit = option("--limit", 40);
const words = args.map((word) => word.toLowerCase());
const since = new Date(Date.now() - days * 86_400_000).toISOString();

const told = new Map();
for (const file of readdirSync("checks/manifests").filter((name) => name.endsWith(".json"))) {
  const manifest = JSON.parse(readFileSync(`checks/manifests/${file}`, "utf8"));
  const committed = execFileSync("git", ["log", "-1", "--format=%cs", "--", `checks/manifests/${file}`], { encoding: "utf8" }).trim();
  const story = { id: file.slice(0, -5), through: committed || manifest.date_completed || manifest.date || "" };
  for (const subject of manifest.v2_subjects ?? []) told.set(subject, [...(told.get(subject) ?? []), story]);
}

const snapshot = readV2();
const uris = (view) => new Set(view.sources.map((source) => source.uri));
const toldViews = [...told.keys()].map((id) => snapshot.views.get(id)).filter(Boolean).map((view) => ({ id: view.id, uris: uris(view) }));
const rows = selectedDevelopments(snapshot)
  .filter((view) => latestSource(view) >= since && words.every((word) => view.label.toLowerCase().includes(word)))
  .slice(0, limit);
for (const view of rows) {
  const entry = developmentEntry(view);
  console.log(`${entry.date}  ${view.id}\n  ${view.label}\n  ${entry.summary}; most independent sources behind a claim: ${Math.max(...shownClaims(view).map((claim) => claim.independent))}`);
  const mine = uris(view);
  const same = toldViews.filter((other) => other.id !== view.id).map((other) => ({ ...other, shared: [...mine].filter((uri) => other.uris.has(uri)).length })).filter((other) => other.shared >= 2 && other.shared * 4 >= Math.min(mine.size, other.uris.size));
  for (const [via, stories] of [[null, told.get(view.id) ?? []], ...same.map((other) => [other, told.get(other.id)])]) {
    for (const story of stories) {
      const after = view.sources.filter((source) => (source.published_at ?? "").slice(0, 10) > story.through).length;
      const how = via ? `same event as ${via.id} (${via.shared} shared sources), told in` : "told in";
      console.log(`  ${how} ${story.id} (through ${story.through}); ${after ? `${after} ${after === 1 ? "source" : "sources"} since, a follow-up lead` : "no source since"}`);
    }
  }
}
