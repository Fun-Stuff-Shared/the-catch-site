import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readState } from "../src/lib/state.mjs";
import { v1EventId, v2Manifests } from "../src/lib/v2.mjs";

// v1 is frozen: the site keeps its v1 event and chain views committed in data/state, and this checks them before a build.
const root = fileURLToPath(new URL("..", import.meta.url));
// A story that reads v2 subjects no longer takes its v1 story or chain view.
export const replacedByV2 = (manifests) => new Set(v2Manifests(manifests).flatMap(({ route }) => [`${v1EventId(route)}.json`, `chain-${v1EventId(route)}.json`]));

// A v2 story owns its development, so the v1 events a fire published under its chain, and any that follow or
// merge into one of those, leave with it.
function underReplacedChains(folder, replaced) {
  const roots = new Set([...replaced].filter((name) => name.startsWith("chain-")).map((name) => name.slice("chain-".length, -".json".length)));
  const views = new Map(readdirSync(folder).filter((name) => /^event-.+\.json$/.test(name)).map((name) => [name.slice(0, -".json".length), JSON.parse(readFileSync(join(folder, name), "utf8"))]));
  const dropped = new Set([...views.keys()].filter((id) => roots.has(id)));
  for (let grew = true; grew;) {
    grew = false;
    for (const [id, view] of views) {
      if (dropped.has(id) || !(roots.has(view.root_id) || dropped.has(view.follows) || dropped.has(view.survivor))) continue;
      dropped.add(id);
      grew = true;
    }
  }
  return [...dropped].map((id) => `${id}.json`);
}

export function pullState({ destination = join(root, "data/state"), manifests = join(root, "checks/manifests") } = {}) {
  const replaced = replacedByV2(manifests);
  const stale = [...new Set([...readdirSync(destination).filter((name) => replaced.has(name)), ...underReplacedChains(destination, replaced)])];
  if (stale.length) throw new Error(`Committed v1 views remain for v2 stories: ${stale.join(", ")}`);
  const state = readState(destination);
  if (!state.events.size) throw new Error("No committed event views are available");
  return { source: "committed", events: state.events.size, chains: state.chains.size };
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) console.log(JSON.stringify(pullState()));
