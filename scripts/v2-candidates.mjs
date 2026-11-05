// Candidates for a new story: the pinned snapshot's developments the core counts three independent sources behind,
// newest first, optionally narrowed by words in the label.
// usage: node scripts/v2-candidates.mjs [--days 7] [--limit 40] [words...]
import { readV2 } from "../src/lib/v2.mjs";
import { developmentEntry, latestSource, selectedDevelopments, shownClaims } from "../src/lib/v2-brief.mjs";

const args = process.argv.slice(2);
const option = (name, fallback) => { const at = args.indexOf(name); return at < 0 ? fallback : Number(args.splice(at, 2)[1]); };
const days = option("--days", 7), limit = option("--limit", 40);
const words = args.map((word) => word.toLowerCase());
const since = new Date(Date.now() - days * 86_400_000).toISOString();
const rows = selectedDevelopments(readV2())
  .filter((view) => latestSource(view) >= since && words.every((word) => view.label.toLowerCase().includes(word)))
  .slice(0, limit);
for (const view of rows) {
  const entry = developmentEntry(view);
  console.log(`${entry.date}  ${view.id}\n  ${view.label}\n  ${entry.summary}; most independent sources behind a claim: ${Math.max(...shownClaims(view).map((claim) => claim.independent))}`);
}
