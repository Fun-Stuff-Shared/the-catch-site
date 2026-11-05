import { createHash } from "node:crypto";

export const BRIEF_CLAIMS = 12;
export const BEST_STATEMENTS = 2;
export const V2_SECTION_BUDGET = 40 * 1024;
export const BRIEF_COMPETING = 3;

const recency = (item) => item?.as_of ?? item?.asserted_at ?? "";
const byRecency = (a, b) => recency(b).localeCompare(recency(a)) || a.id.localeCompare(b.id);

const named = (value) => typeof value === "string" && value.trim() ? value.trim() : null;

// A capture's root is the hash of its raw bytes, which names no one, so its address names the site instead.
function siteOf(source) {
  const root = named(source.root);
  if (root && !/^[0-9a-f]{64}$/.test(root)) return root.replace(/^www\./, "");
  try {
    return new URL(source.uri).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

// A source is named by the publisher and title the core gives it, then by the site it came from; the artifact id stands in only when it has none of them.
export function sourceLabel(source) {
  const publisher = named(source.publisher) ?? named(source.attributes?.source_name) ?? siteOf(source);
  const title = named(source.title) ?? named(source.attributes?.source_title);
  return { publisher, title, fallback: !publisher && !title, text: [publisher, title].filter(Boolean).join(", ") || source.artifact };
}

// Claim ids become path segments; an id that is not already a plain slug is named by its hash.
export function claimSlug(id) {
  return /^[a-z0-9][a-z0-9_-]*$/i.test(id) ? id : `h-${createHash("sha256").update(id).digest("hex").slice(0, 24)}`;
}

// A subject's id becomes its home's path segment: a plain lowercase slug stays as it is; any other id is lowercased,
// its other characters folded to hyphens, and a short hash of the whole id appended, so distinct ids keep distinct homes.
export function subjectSlug(id) {
  if (/^[a-z0-9][a-z0-9_-]*$/.test(id)) return id;
  const base = id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "subject";
  return `${base}-${createHash("sha256").update(id).digest("hex").slice(0, 8)}`;
}

// A subject's claim pages live once, under its home, whatever stories it appears on.
export function subjectPaths(subject) {
  const home = `/developments/${subjectSlug(subject)}/`;
  return { home, claims: `${home}claims/`, claim: (claim) => `${home}claims/${claimSlug(claim.id)}/` };
}

function index(view) {
  const statements = new Map(view.statements.map((statement) => [statement.id, statement]));
  const sources = new Map(view.sources.map((source) => [source.artifact, source]));
  const latest = (claim) => claim.statements.map((id) => recency(statements.get(id))).sort().at(-1) ?? "";
  return { statements, sources, latest };
}

const PRIORITY = { disputed: 2, unjudged: 1 };

// A claim the core holds no value for says nothing to a reader, so it has no place on a page.
export const shownClaims = (view) => view.claims.filter((claim) => claim.state !== "empty");

// Disputed claims first, then claims whose sources are not yet compared, then by the core's count of independent units,
// then by how recent the claim is.
export function rankClaims(view) {
  const { latest } = index(view);
  const when = (claim) => claim.as_of ?? latest(claim);
  const priority = (claim) => PRIORITY[claim.state] ?? 0;
  return shownClaims(view).sort((a, b) =>
    priority(b) - priority(a) || b.independent - a.independent || when(b).localeCompare(when(a)) || a.id.localeCompare(b.id));
}

// Ranked claims grouped by attribute within their priority band, so disputed claims stay ahead of claims whose sources
// are not yet compared, and those ahead of the rest; within a band, groups follow their best-ranked claim.
function grouped(claims) {
  const groups = new Map();
  for (const claim of claims) {
    const key = JSON.stringify([PRIORITY[claim.state] ?? 0, claim.attribute]);
    if (!groups.has(key)) groups.set(key, [claim.attribute, []]);
    groups.get(key)[1].push(claim);
  }
  return [...groups.values()];
}

// The brief's ranked top claims, grouped as `grouped` describes.
export function briefGroups(view) {
  return grouped(rankClaims(view).slice(0, BRIEF_CLAIMS));
}

// The statements that carry a claim's current value come first, one per independent root before any second from the same root.
export function bestStatements(view, claim, count = BEST_STATEMENTS) {
  const { statements, sources } = index(view);
  const tier = (id) => claim.heads.includes(id) ? 0 : claim.basis.includes(id) ? 1 : 2;
  const ordered = claim.statements.map((id) => statements.get(id)).sort((a, b) => tier(a.id) - tier(b.id) || byRecency(a, b));
  const root = (statement) => sources.get(statement.artifact)?.root ?? statement.artifact ?? statement.id;
  const seen = new Set(), first = [], rest = [];
  for (const statement of ordered) {
    if (seen.has(root(statement))) rest.push(statement);
    else { first.push(statement); seen.add(root(statement)); }
  }
  return [...first, ...rest].slice(0, count);
}

export function claimStatements(view, claim) {
  return view.statements.filter((statement) => statement.claims.includes(claim.id)).sort(byRecency);
}

export function competingValues(view, claim) {
  if (claim.state !== "disputed" && claim.state !== "unjudged") return [];
  const { statements } = index(view);
  return claim.heads.map((id) => statements.get(id)).filter((statement) => statement?.value);
}

export const changes = (claim) => claim.transitions.filter((transition) => transition.kind !== "first_value");

export function attributeGroups(view) {
  return grouped(rankClaims(view));
}

export function sourceFor(view, statement) {
  return view.sources.find((source) => source.artifact === statement.artifact);
}

// A development publishes on its own when the core counts at least this many independent sources behind one of
// its claims. The core's count discounts syndicated copies, so it holds up where a count of sites does not.
export const INDEPENDENT_SOURCES = 3;
export const DEVELOPMENTS_PER_PAGE = 50;

export const latestSource = (view) => view.sources.map((source) => source.published_at ?? "").sort().at(-1) ?? "";

export function selectedDevelopments(snapshot) {
  return [...snapshot.views.values()]
    .filter((view) => shownClaims(view).some((claim) => claim.independent >= INDEPENDENT_SOURCES))
    .sort((a, b) => latestSource(b).localeCompare(latestSource(a)) || a.id.localeCompare(b.id));
}

// Machine-made development pages stay out of the site unless a build asks for them.
export function publishedDevelopments(snapshot, env = process.env) {
  return env.CATCH_DEVELOPMENTS === "1" ? selectedDevelopments(snapshot) : [];
}

export const developmentPath = (subject) => `/developments/${subjectSlug(subject)}/`;

// One line for a list of developments: its label, its newest source, and what stands behind it.
export function developmentEntry(view) {
  const claims = shownClaims(view);
  const disputed = claims.filter((claim) => claim.state === "disputed").length;
  return {
    href: developmentPath(view.id), title: view.label, date: latestSource(view).slice(0, 10),
    summary: `${claims.length} ${claims.length === 1 ? "claim" : "claims"} from ${view.sources.length} ${view.sources.length === 1 ? "source" : "sources"}${disputed ? `; sources differ on ${disputed}` : ""}`,
  };
}

// The extractor's names for a source speaking in its own voice; the page names the source beside the quote already.
const OWN_VOICE = new Set(["outlet's own", "unattributed", "Article", "Report narrator"]);
export const statedBy = (statement) => OWN_VOICE.has(statement.speaker) ? null : statement.speaker;

const ATTRIBUTES = { count: "Counts and amounts", date: "Dates", statement: "Statements", rate: "Rates", status: "Status", relationship: "Relationships", rule: "Rules", poll_result: "Poll results", forecast: "Forecasts", legal_action: "Legal actions", fact_check_rating: "Fact-check ratings" };
export const attributeHeading = (attribute) => ATTRIBUTES[attribute] ?? `${attribute[0].toUpperCase()}${attribute.slice(1).replace(/_/g, " ")}`;
