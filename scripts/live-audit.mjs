// Post-deploy audit: every route in checks/routes.txt must return 200 from the live
// site, not just the routes the latest deploy touched.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const BASE = process.argv[2] || "https://thecatchengine.com";
const routes = readFileSync(join(ROOT, "checks/routes.txt"), "utf8")
  .split("\n").map((s) => s.trim()).filter(Boolean).filter((s) => !s.startsWith("#"));

const bad = [];
let done = 0;
const POOL = 12;
async function probe(route) {
  const url = BASE + route;
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (res.status !== 200) bad.push(`${res.status} ${route}`);
    else if (new URL(res.url).host !== new URL(BASE).host) bad.push(`OFFHOST ${route} -> ${res.url}`);
  } catch (e) {
    bad.push(`ERR ${route} (${e.message})`);
  }
  done++;
}
const queue = [...routes];
await Promise.all(Array.from({ length: POOL }, async () => {
  while (queue.length) await probe(queue.shift());
}));

console.log(`live audit: ${done} routes probed against ${BASE}, ${bad.length} not 200`);
if (bad.length) {
  for (const b of bad) console.error("  " + b);
  process.exit(1);
}
