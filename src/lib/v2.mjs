import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const v2Directory = join(process.cwd(), "data/v2");
export const FORMAT = "sai-news-view/4";
const SNAPSHOT = /^[0-9a-f]{24}$/;
const sha256 = (data) => createHash("sha256").update(data).digest("hex");

export function snapshotId(directory) {
  const id = readFileSync(join(directory, "CURRENT"), "utf8").trim();
  if (!SNAPSHOT.test(id)) throw new Error(`Invalid v2 snapshot pointer in ${directory}: ${id}`);
  return id;
}

// A snapshot is named by the hash of its manifest's bytes and read whole: every file against the hash its
// manifest names, every statement's quote against the code points its span names in the shipped text, and
// its story index against its views, each view under exactly one story.
export function readSnapshot(folder, id) {
  if (!SNAPSHOT.test(id)) throw new Error(`Invalid v2 snapshot id: ${id}`);
  const manifestBytes = readFileSync(join(folder, "manifest.json"));
  if (sha256(manifestBytes).slice(0, 24) !== id) throw new Error(`v2 snapshot manifest does not hash to its id: ${id}`);
  const manifest = JSON.parse(manifestBytes);
  if (manifest.format !== FORMAT) throw new Error(`Unknown v2 snapshot format: ${manifest.format}`);
  const texts = new Map();
  for (const [hash, path] of Object.entries(manifest.texts)) {
    if (path !== `texts/${hash}.txt`) throw new Error(`v2 text path differs from its hash: ${path}`);
    const bytes = readFileSync(join(folder, path));
    if (sha256(bytes) !== hash) throw new Error(`v2 text hash mismatch: ${hash}`);
    texts.set(hash, Array.from(bytes.toString("utf8")));
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
      if (text.slice(statement.span.start, statement.span.end).join("") !== statement.quote) throw new Error(`v2 statement quote is not at its span: ${statement.id}`);
    }
    for (const claim of view.claims) if (claim.statements.some((id) => !statements.has(id))) throw new Error(`v2 claim cites a statement the view lacks: ${claim.id}`);
    views.set(subject, view);
  }
  if (!manifest.stories || typeof manifest.stories !== "object" || Array.isArray(manifest.stories)) throw new Error(`v2 snapshot has no story index: ${id}`);
  for (const [story, subjects] of Object.entries(manifest.stories)) {
    if (!Array.isArray(subjects) || !subjects.length) throw new Error(`v2 story lists no subjects: ${story}`);
    for (const subject of subjects) if (!views.has(subject)) throw new Error(`v2 story names a subject the snapshot lacks: ${story} ${subject}`);
  }
  const indexed = Object.values(manifest.stories).flat();
  if (indexed.length !== views.size || new Set(indexed).size !== views.size) throw new Error("v2 snapshot views are not each under exactly one story");
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

// A story renders from v2 when its manifest says so; the snapshot's story index, keyed by the manifest's name, names its subjects.
export function v2Manifests(manifests = join(process.cwd(), "checks/manifests")) {
  const rows = [];
  for (const name of readdirSync(manifests).filter((name) => name.endsWith(".json")).sort()) {
    const manifest = JSON.parse(readFileSync(join(manifests, name), "utf8"));
    if (manifest.v2 === undefined) continue;
    if (manifest.v2 !== true) throw new Error(`${name}: v2 must be true when present`);
    if (manifest.state_event_id) throw new Error(`${name}: a story reads either v1 state or v2, not both`);
    rows.push({ name, story: name.slice(0, -".json".length), route: manifest.story || `/events/${manifest.event}/` });
  }
  return rows;
}

export function storySubjects(snapshot, story) {
  const subjects = Object.hasOwn(snapshot.manifest.stories, story) ? snapshot.manifest.stories[story] : undefined;
  if (!subjects) throw new Error(`v2 snapshot ${snapshot.id} has no subjects for story ${story}`);
  return subjects;
}

// The v1 projection names a dated story event-<series>-<yyyy-mm-dd>-<moment>; a v2 story replaces that view.
export function v1EventId(route) {
  const match = /^\/events\/([a-z0-9-]+)\/(\d{4}-\d{2}-\d{2}-[a-z0-9-]+)\/$/.exec(route);
  if (!match) throw new Error(`v2 story route is not a dated story: ${route}`);
  return `event-${match[1]}-${match[2]}`;
}

export function v2Story(route, directory = v2Directory, manifests = join(process.cwd(), "checks/manifests")) {
  const row = v2Manifests(manifests).find((entry) => entry.route === route);
  if (!row) throw new Error(`No v2 manifest for ${route}`);
  const snapshot = readV2(directory);
  const views = storySubjects(snapshot, row.story).map((subject) => snapshot.views.get(subject));
  return { route, snapshot: snapshot.id, head: snapshot.manifest.head, evaluated_at: snapshot.manifest.evaluated_at, views };
}

export function hasV2(directory = v2Directory) {
  return existsSync(join(directory, "CURRENT"));
}

export function valueText(value) {
  if (!value) return null;
  switch (value.type) {
    case "quantity": return `${value.amount} ${value.unit}`;
    case "date": return value.at.at;
    case "enum": return value.value;
    case "entity": return value.subject;
    case "proposition": return value.text;
    case "forecast": return `${valueText(value.outcome)} by ${value.horizon.at}`;
    default: throw new Error(`Unknown v2 value type: ${value.type}`);
  }
}
