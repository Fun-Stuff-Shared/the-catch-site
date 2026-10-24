import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// A story's claim ledger (checks/claims/<subject>--<slug>.json): every fact the page states,
// with its status, scope and evidence. Pages cite claims; the claim carries its records.
const ledgers = new Map();

export function storyId(pageEvent) {
  return pageEvent.replace("/", "--");
}

export function ledger(story) {
  if (!ledgers.has(story)) {
    const path = join(process.cwd(), "checks/claims", `${story}.json`);
    ledgers.set(story, existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null);
  }
  return ledgers.get(story);
}

export function claim(story, id) {
  const found = ledger(story)?.claims.find((c) => c.id === id);
  if (!found) throw new Error(`claim_unknown:${story}:${id}`);
  return found;
}
