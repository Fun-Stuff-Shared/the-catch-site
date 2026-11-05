import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { publishedDevelopments, subjectSlug } from "./v2-brief.mjs";

export const v2Directory = join(process.cwd(), "data/v2");
export const FORMAT = "sai-news-view/5";
const SNAPSHOT = /^[0-9a-f]{24}$/;
const sha256 = (data) => createHash("sha256").update(data).digest("hex");

export function snapshotId(directory) {
  const id = readFileSync(join(directory, "CURRENT"), "utf8").trim();
  if (!SNAPSHOT.test(id)) throw new Error(`Invalid v2 snapshot pointer in ${directory}: ${id}`);
  return id;
}

// Spans count code points. A text with no surrogate pairs has one code unit per code point, so only a text with
// them pays for an array, which keeps a snapshot's hundreds of megabytes of text from holding gigabytes of heap.
function spanReader(text) {
  if (!/[\uD800-\uDFFF]/.test(text)) return (start, end) => text.slice(start, end);
  const points = Array.from(text);
  return (start, end) => points.slice(start, end).join("");
}

// A snapshot is named by the hash of its manifest's bytes and read whole: every file against the hash its
// manifest names, every statement's quote against the code points its span names in the shipped text, and
// its story index against its views. A development may be indexed under several stories; every view is
// under at least one, and every subject a story lists exists. Within a view, a claim's statements are exactly
// the live statements that name it, so the brief and the claim's page draw on the same evidence.
export function readSnapshot(folder, id) {
  if (!SNAPSHOT.test(id)) throw new Error(`Invalid v2 snapshot id: ${id}`);
  const manifestBytes = readFileSync(join(folder, "manifest.json"));
  if (sha256(manifestBytes).slice(0, 24) !== id) throw new Error(`v2 snapshot manifest does not hash to its id: ${id}`);
  const manifest = JSON.parse(manifestBytes);
  if (manifest.format !== FORMAT) throw new Error(`Unknown v2 snapshot format: ${manifest.format}`);
  if (manifest.moved === null || typeof manifest.moved !== "object" || Array.isArray(manifest.moved)) throw new Error("v2 manifest has no moved map");
  const texts = new Map();
  for (const [hash, path] of Object.entries(manifest.texts)) {
    if (path !== `texts/${hash}.txt`) throw new Error(`v2 text path differs from its hash: ${path}`);
    const bytes = readFileSync(join(folder, path));
    if (sha256(bytes) !== hash) throw new Error(`v2 text hash mismatch: ${hash}`);
    texts.set(hash, spanReader(bytes.toString("utf8")));
  }
  const views = new Map();
  for (const [subject, entry] of Object.entries(manifest.views)) {
    if (!/^views\/[0-9a-f]{24}\.json$/.test(entry.path)) throw new Error(`v2 view path is not a view file: ${entry.path}`);
    const bytes = readFileSync(join(folder, entry.path));
    if (sha256(bytes) !== entry.sha256) throw new Error(`v2 view hash mismatch: ${subject}`);
    const view = JSON.parse(bytes);
    if (view.format !== FORMAT || view.id !== subject) throw new Error(`v2 view differs from its manifest entry: ${subject}`);
    const statements = new Set(view.statements.map((statement) => statement.id));
    for (const statement of view.statements) {
      if (!statement.span) throw new Error(`v2 statement has no text span: ${statement.id}`);
      const text = texts.get(statement.span.text);
      if (!text) throw new Error(`v2 statement names a text the snapshot lacks: ${statement.id}`);
      if (text(statement.span.start, statement.span.end) !== statement.quote) throw new Error(`v2 statement quote is not at its span: ${statement.id}`);
    }
    const claims = new Set(view.claims.map((claim) => claim.id));
    for (const claim of view.claims) {
      if (claim.statements.some((id) => !statements.has(id))) throw new Error(`v2 claim cites a statement the view lacks: ${claim.id}`);
      const own = new Set(claim.statements);
      const naming = view.statements.filter((statement) => statement.status === "live" && statement.claims.includes(claim.id)).map((statement) => statement.id);
      if (own.size !== claim.statements.length || naming.length !== own.size || naming.some((id) => !own.has(id))) throw new Error(`v2 claim's statements are not the live statements that name it: ${claim.id}`);
      if ([...claim.heads, ...claim.basis].some((id) => !own.has(id))) throw new Error(`v2 claim's heads or basis are not among its statements: ${claim.id}`);
      if (!Array.isArray(claim.merged) || claim.merged.some((id) => typeof id !== "string" || claims.has(id))) throw new Error(`v2 claim's merged claims are not folded ids: ${claim.id}`);
    }
    for (const statement of view.statements) if (statement.claims.some((id) => !claims.has(id))) throw new Error(`v2 statement names a claim the view does not hold: ${statement.id}`);
    if (!Array.isArray(view.related) || view.related.some((op) => !Array.isArray(op) || op.length !== 3 || op.some((part) => typeof part !== "string" || !part))) throw new Error(`v2 view related is not a list of (op, target, other): ${subject}`);
    views.set(subject, view);
  }
  if (!manifest.stories || typeof manifest.stories !== "object" || Array.isArray(manifest.stories)) throw new Error(`v2 snapshot has no story index: ${id}`);
  for (const [story, subjects] of Object.entries(manifest.stories)) {
    if (!Array.isArray(subjects) || !subjects.length) throw new Error(`v2 story lists no subjects: ${story}`);
    for (const subject of subjects) if (!views.has(subject)) throw new Error(`v2 story names a subject the snapshot lacks: ${story} ${subject}`);
    if (new Set(subjects).size !== subjects.length) throw new Error(`v2 story lists a subject twice: ${story}`);
  }
  const indexed = new Set(Object.values(manifest.stories).flat());
  for (const subject of views.keys()) if (!indexed.has(subject)) throw new Error(`v2 view is under no story: ${subject}`);
  return { id, manifest, views };
}

// Snapshots are immutable and named by their content, so one verified read serves every page of a build.
const verified = new Map();
export function readV2(directory = v2Directory) {
  const id = snapshotId(directory);
  const folder = join(directory, "snapshots", id);
  if (!verified.has(folder)) verified.set(folder, readSnapshot(folder, id));
  return verified.get(folder);
}

// A story is tied to v2 when its manifest says so, and its manifest names the subjects it covers: which developments
// an authored story covers is the site's editorial record, not something the producer knows. Authors read them; the
// page shows none of it, because a machine list beside the story only repeats the page.
export function v2Manifests(manifests = join(process.cwd(), "checks/manifests")) {
  const rows = [];
  for (const name of readdirSync(manifests).filter((name) => name.endsWith(".json")).sort()) {
    const manifest = JSON.parse(readFileSync(join(manifests, name), "utf8"));
    if (manifest.v2 === undefined) continue;
    if (manifest.v2 !== true) throw new Error(`${name}: v2 must be true when present`);
    if (manifest.state_event_id) throw new Error(`${name}: a story reads either v1 state or v2, not both`);
    const subjects = manifest.v2_subjects;
    if (!Array.isArray(subjects) || !subjects.length || subjects.some((subject) => typeof subject !== "string" || !subject) || new Set(subjects).size !== subjects.length) throw new Error(`${name}: v2_subjects must list its subjects once each`);
    rows.push({ name, story: name.slice(0, -".json".length), route: manifest.story || `/events/${manifest.event}/`, subjects });
  }
  return rows;
}

// A subject folded into another has no view of its own; the manifest's moved map names the survivor.
export function storySubjects(snapshot, { story, subjects }) {
  const resolved = subjects.map((subject) => [subject, snapshot.views.has(subject) ? subject : snapshot.manifest.moved[subject]]);
  const missing = resolved.filter(([, kept]) => !snapshot.views.has(kept)).map(([subject]) => subject);
  if (missing.length) throw new Error(`v2 snapshot ${snapshot.id} lacks subjects of story ${story}: ${missing.join(", ")}`);
  return [...new Set(resolved.map(([, kept]) => kept))];
}

// Every development the build publishes, latest first, with its home's slug.
export function subjectHomes(directory = v2Directory) {
  const snapshot = readV2(directory);
  const homes = new Map(), slugs = new Map();
  for (const view of publishedDevelopments(snapshot)) {
    const name = subjectSlug(view.id);
    if (slugs.has(name)) throw new Error(`v2 subjects ${slugs.get(name)} and ${view.id} share the home ${name}`);
    slugs.set(name, view.id);
    homes.set(view.id, { subject: view.id, slug: name, view });
  }
  return { snapshot: snapshot.id, homes: [...homes.values()] };
}

// The v1 projection names a dated story event-<series>-<yyyy-mm-dd>-<moment>; a v2 story replaces that view.
export function v1EventId(route) {
  const match = /^\/events\/([a-z0-9-]+)\/(\d{4}-\d{2}-\d{2}-[a-z0-9-]+)\/$/.exec(route);
  if (!match) throw new Error(`v2 story route is not a dated story: ${route}`);
  return `event-${match[1]}-${match[2]}`;
}

export function hasV2(directory = v2Directory) {
  return existsSync(join(directory, "CURRENT"));
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// An instant reads at the precision the source gave it, so a year stated as 2027 does not read as January 1.
export function instantText({ at, precision }) {
  const [year, month, day] = at.split("-");
  if (precision === "year" || !month) return year;
  if (precision === "month" || !day) return `${MONTHS[Number(month) - 1]} ${year}`;
  return `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
}

const grouped = (amount) => String(amount).replace(/^(-?\d+)/, (whole) => whole.replace(/\B(?=(\d{3})+$)/g, ","));

export function valueText(value) {
  if (!value) return null;
  switch (value.type) {
    case "quantity": return value.upper == null ? `${grouped(value.amount)} ${value.unit}` : `${grouped(value.amount)}–${grouped(value.upper)} ${value.unit}`;
    case "date": return instantText(value.at);
    case "enum": return value.value;
    case "entity": return value.subject;
    case "proposition": return value.text;
    case "forecast": return `${valueText(value.outcome)} by ${instantText(value.horizon)}`;
    default: throw new Error(`Unknown v2 value type: ${value.type}`);
  }
}
