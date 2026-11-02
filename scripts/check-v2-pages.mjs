import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "parse5";
import { readV2, storySubjects, v2Manifests } from "../src/lib/v2.mjs";

const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const text = (node) => node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(text).join("");
const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
function* nodes(node) { yield node; for (const child of node.childNodes ?? []) yield* nodes(child); }

// Every v2 story page shows the current snapshot's subjects whole: each claim, and each statement with its exact quote.
export function checkV2Pages(dist, directory, manifests) {
  const failures = [], checked = [];
  const rows = v2Manifests(manifests);
  if (!rows.length) return { failures, checked };
  const snapshot = readV2(directory);
  for (const { route, story } of rows) {
    let subjects;
    try { subjects = storySubjects(snapshot, story); } catch (error) { failures.push(`${route}: ${error.message}`); continue; }
    const path = join(dist, route, "index.html");
    if (!existsSync(path)) { failures.push(`v2 story page missing: ${route}`); continue; }
    const all = [...nodes(parse(readFileSync(path, "utf8")))];
    const marked = (name) => all.filter((node) => attr(node, name) !== undefined);
    const shown = marked("data-v2-snapshot").map((node) => attr(node, "data-v2-snapshot"));
    if (shown.length !== 1 || shown[0] !== snapshot.id) failures.push(`${route}: renders v2 snapshot ${shown.join(",") || "none"}, current is ${snapshot.id}`);
    const pageSubjects = marked("data-v2-subject").map((node) => attr(node, "data-v2-subject"));
    if (JSON.stringify(pageSubjects) !== JSON.stringify(subjects)) failures.push(`${route}: renders subjects ${pageSubjects.join(",")}, snapshot names ${subjects.join(",")}`);
    const claims = new Set(marked("data-v2-claim").map((node) => attr(node, "data-v2-claim")));
    const statements = new Map(marked("data-v2-statement").map((node) => [attr(node, "data-v2-statement"), node]));
    for (const subject of subjects) {
      const view = snapshot.views.get(subject);
      if (!view) { failures.push(`${route}: snapshot has no subject ${subject}`); continue; }
      for (const claim of view.claims) if (!claims.has(claim.id)) failures.push(`${route}: claim ${claim.id} not rendered`);
      for (const statement of view.statements) {
        const node = statements.get(statement.id);
        if (!node) failures.push(`${route}: statement ${statement.id} not rendered`);
        else if (!normalize(text(node)).includes(normalize(statement.quote))) failures.push(`${route}: statement ${statement.id} quote differs`);
      }
    }
    checked.push(route);
  }
  return { failures, checked };
}
