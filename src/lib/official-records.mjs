import { readFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { createOfficialEvidence } from "./official-evidence.mjs";

export const officialRecordsSchema = JSON.parse(readFileSync(new URL("../../schemas/official-records-v1.json", import.meta.url), "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateShape = ajv.compile(officialRecordsSchema);
const collections = ["officials", "roll_calls", "finance", "registrations", "maintenance", "elections"];
const sections = ["identifiers", "offices", "statements", "actions", "money", "appearances"];

export function validateOfficialRecords(dataset, { records, readText, root, publishedStories = new Set() } = {}) {
  if (!validateShape(dataset)) return validateShape.errors.map((error) => `${error.instancePath || "/"}: ${error.message}${error.params.additionalProperty ? ` (${error.params.additionalProperty})` : ""}`);
  const errors = [];
  const check = (condition, message) => { if (!condition) errors.push(message); };
  const index = (rows, label, key = "id") => {
    const found = new Map();
    for (const row of rows) {
      check(!found.has(row[key]), `${label}: duplicate ${key} ${row[key]}`);
      found.set(row[key], row);
    }
    return found;
  };
  const missing = (section, subject) => dataset.coverage.missing.some((row) => row.section === section && row.subject_id === subject);
  const withinCoverage = (date, label) => check(date >= dataset.coverage.start && date <= dataset.coverage.end, `${label}: date outside dataset coverage`);
  const period = (value, label) => check(value.end === null || value.start <= value.end, `${label}: reversed period`);
  const coverage = dataset.coverage;
  check(coverage.start <= coverage.end && coverage.end <= coverage.as_of, "coverage: start/end/as_of are out of order");
  check(coverage.completeness === "partial" ? coverage.missing.length > 0 : coverage.missing.length === 0, "coverage: completeness disagrees with missing-data reasons");
  const maps = Object.fromEntries(collections.map((name) => [name, index(dataset[name], name)]));
  for (const name of collections) check(dataset[name].length > 0 || missing(name), `${name}: empty collection needs a missing-data reason`);
  index(dataset.officials, "officials", "slug");
  const identifiers = new Set();
  for (const official of dataset.officials) {
    for (const name of sections) {
      check(official[name].length > 0 || missing(name, official.id), `${official.id}.${name}: unavailable section needs a missing-data reason`);
      if (["offices", "statements", "actions"].includes(name)) index(official[name], `${official.id}.${name}`);
    }
    for (const identifier of official.identifiers) {
      const key = `${identifier.scheme}:${identifier.value}`;
      check(!identifiers.has(key), `officials: duplicate identifier ${key}`);
      identifiers.add(key);
    }
    for (const office of official.offices) period(office.period, `${official.id}.${office.id}`);
    for (const statement of official.statements) {
      withinCoverage(statement.date, statement.id);
      check(statement.evidence.some((ref) => ref.passage.includes(statement.quote)), `${statement.id}: quote is not in its cited passages`);
      if (statement.evidence.some((ref) => ref.source_class === "coverage")) check(Boolean(statement.quoted_via), `${statement.id}: secondary quotation needs quoted_via`);
    }
    for (const action of official.actions) {
      withinCoverage(action.date, action.id);
      if (action.roll_call_id) {
        const vote = maps.roll_calls.get(action.roll_call_id);
        check(Boolean(vote), `${action.id}: unknown roll call ${action.roll_call_id}`);
        if (vote) {
          check(vote.date === action.date, `${action.id}: action date differs from roll call`);
          check(vote.members.some((member) => member.official_id === official.id), `${action.id}: roll call does not include this official`);
        }
      }
    }
    check(new Set(official.money).size === official.money.length, `${official.id}: duplicate finance reference`);
    for (const financeId of official.money) check(maps.finance.get(financeId)?.official_id === official.id, `${official.id}: unknown or mismatched finance ${financeId}`);
    index(official.appearances, `${official.id}.appearances`, "story_url");
    for (const appearance of official.appearances) check(publishedStories.has(appearance.story_url), `${official.id}: appearance is not a published story: ${appearance.story_url}`);
  }
  for (const row of coverage.missing) if (row.subject_id) check(maps.officials.has(row.subject_id), `coverage: unknown official ${row.subject_id}`);
  for (const vote of dataset.roll_calls) {
    check(vote.id === `${vote.chamber}-${vote.congress}-${vote.session}-${vote.number}`, `${vote.id}: roll-call identity differs`);
    withinCoverage(vote.date, vote.id);
    check(vote.membership === "partial" ? Boolean(vote.missing_reason) : vote.missing_reason === null, `${vote.id}: membership completeness needs the matching missing-data reason`);
    index(vote.members, `${vote.id}.members`, "member_id");
    index(vote.members.filter((m) => m.official_id), `${vote.id}.officials`, "official_id");
    const counts = { yea: 0, nay: 0, not_voting: 0, present: 0 };
    for (const member of vote.members) {
      counts[member.cast]++;
      if (member.official_id) {
        const official = maps.officials.get(member.official_id);
        check(Boolean(official), `${vote.id}: unknown official ${member.official_id}`);
        if (official) check(official.offices.some((office) => office.chamber === vote.chamber && office.jurisdiction.state === member.state && office.party === member.party && office.period.start <= vote.date && (!office.period.end || office.period.end > vote.date)), `${vote.id}: member party/state/chamber has no matching dated office for ${official.id}`);
      }
    }
    for (const cast of Object.keys(counts)) check(vote.membership === "complete" ? counts[cast] === vote.totals[cast] : counts[cast] <= vote.totals[cast], `${vote.id}: ${cast} total disagrees with member rows`);
  }
  const transactions = new Set();
  for (const finance of dataset.finance) {
    check(maps.officials.get(finance.official_id)?.money.includes(finance.id), `${finance.id}: finance must be linked by its official`);
    period(finance.period, finance.id);
    const receipts = index(finance.receipts, `${finance.id}.receipts`);
    for (const receipt of finance.receipts) {
      withinCoverage(receipt.date, receipt.id);
      const key = JSON.stringify([finance.committee_id, receipt.report_id, receipt.schedule, receipt.transaction_id]);
      check(!transactions.has(key), `${finance.id}: transaction ${receipt.transaction_id} is repeated; amendments must replace originals`);
      transactions.add(key);
      check(receipt.date >= finance.period.start && receipt.date <= finance.period.end, `${receipt.id}: receipt outside reporting period`);
    }
    index(finance.industry_classifications, `${finance.id}.industry_classifications`, "receipt_id");
    for (const classification of finance.industry_classifications) check(receipts.has(classification.receipt_id), `${finance.id}: unknown classified receipt ${classification.receipt_id}`);
    const classified = new Set(finance.industry_classifications.map((row) => row.receipt_id));
    const unclassified = finance.receipts.some((row) => row.kind === "contribution" && row.exclusion === null && !classified.has(row.id));
    check(!unclassified || missing("industries", finance.official_id), `${finance.id}: unclassified contributions need an industries missing-data reason`);
  }
  for (const row of [...dataset.registrations, ...dataset.maintenance]) withinCoverage(row.date, row.id);
  for (const election of dataset.elections) {
    withinCoverage(election.date, election.id);
    check(election.reported_at.slice(0, 10) >= election.date && election.reported_at.slice(0, 10) <= coverage.as_of, `${election.id}: reporting date outside election/as_of dates`);
    index(election.candidates, `${election.id}.candidates`);
    const total = election.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
    check(election.denominator.kind === "valid_candidate_votes" ? total === election.denominator.value : total <= election.denominator.value, `${election.id}: candidate votes disagree with denominator`);
    for (const candidate of election.candidates) if (candidate.official_id) check(maps.officials.has(candidate.official_id), `${election.id}: unknown candidate official ${candidate.official_id}`);
  }
  let resolveEvidence;
  try { resolveEvidence = createOfficialEvidence({ records, readText, root }); } catch (error) { errors.push(error.message); }
  const walk = (value, path = "") => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) { value.forEach((row, i) => walk(row, `${path}/${i}`)); return; }
    if (value.evidence && resolveEvidence) for (const reference of value.evidence) {
      try { resolveEvidence(reference, { allowFixture: dataset.kind === "fixture" }); }
      catch (error) { errors.push(`${path}: ${error.message}`); }
    }
    for (const [key, child] of Object.entries(value)) if (key !== "evidence") walk(child, `${path}/${key}`);
  };
  walk(dataset);
  return errors;
}

export function assertOfficialRecords(dataset, context) {
  const errors = validateOfficialRecords(dataset, context);
  if (errors.length) throw new Error(`official_records_invalid:\n${errors.join("\n")}`);
  return dataset;
}

// The production selector never consults the design flag and never imports fixtures.
export function publishedOfficials(dataset, context) {
  if (dataset?.kind === "fixture") return [];
  return assertOfficialRecords(dataset, context).officials;
}

export function previewOfficials(dataset, context, env = process.env) {
  if (env.CATCH_DESIGN_PREVIEW !== "1") return [];
  if (dataset?.kind !== "fixture") throw new Error("official_preview_needs_fixture_dataset");
  return assertOfficialRecords(dataset, context).officials;
}
