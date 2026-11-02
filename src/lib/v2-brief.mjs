import { createHash } from "node:crypto";

export const BRIEF_CLAIMS = 12;
export const BEST_STATEMENTS = 2;
export const V2_SECTION_BUDGET = 40 * 1024;
export const BRIEF_COMPETING = 3;

const recency = (item) => item?.as_of ?? item?.asserted_at ?? "";
const byRecency = (a, b) => recency(b).localeCompare(recency(a)) || a.id.localeCompare(b.id);

// A source is named by the publisher and title its artifact carries; the artifact id stands in only when both are missing.
export function sourceLabel(source) {
  const publisher = typeof source.attributes?.publisher === "string" && source.attributes.publisher.trim() ? source.attributes.publisher.trim() : null;
  const title = typeof source.attributes?.title === "string" && source.attributes.title.trim() ? source.attributes.title.trim() : null;
  return { publisher, title, fallback: !publisher && !title, text: [publisher, title].filter(Boolean).join(", ") || source.artifact };
}

// Claim ids become path segments; an id that is not already a plain slug is named by its hash.
export function claimSlug(id) {
  return /^[a-z0-9][a-z0-9_-]*$/i.test(id) ? id : `h-${createHash("sha256").update(id).digest("hex").slice(0, 24)}`;
}

export function storyPaths(route) {
  return { claims: `${route}claims/`, claim: (claim) => `${route}claims/${claimSlug(claim.id)}/` };
}

function index(view) {
  const statements = new Map(view.statements.map((statement) => [statement.id, statement]));
  const sources = new Map(view.sources.map((source) => [source.artifact, source]));
  const latest = (claim) => claim.statements.map((id) => recency(statements.get(id))).sort().at(-1) ?? "";
  return { statements, sources, latest };
}

const PRIORITY = { disputed: 2, unjudged: 1 };

// Disputed claims first, then claims whose sources are not yet compared, then by the core's count of independent units,
// then by how recent the claim is.
export function rankClaims(view) {
  const { latest } = index(view);
  const when = (claim) => claim.as_of ?? latest(claim);
  const priority = (claim) => PRIORITY[claim.state] ?? 0;
  return [...view.claims].sort((a, b) =>
    priority(b) - priority(a) || b.independent - a.independent || when(b).localeCompare(when(a)) || a.id.localeCompare(b.id));
}

function grouped(claims) {
  const groups = new Map();
  for (const claim of claims) {
    if (!groups.has(claim.attribute)) groups.set(claim.attribute, []);
    groups.get(claim.attribute).push(claim);
  }
  return [...groups];
}

// The brief's ranked top claims, grouped by attribute in the order each attribute first ranks.
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
