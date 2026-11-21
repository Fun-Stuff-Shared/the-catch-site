import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { assertOfficialRecords, publishedOfficials, previewOfficials, validateOfficialRecords } from "../src/lib/official-records.mjs";
import { createOfficialEvidence, officialEvidenceLink } from "../src/lib/official-evidence.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (name) => JSON.parse(readFileSync(new URL(`./fixtures/official-records/${name}`, import.meta.url), "utf8"));
const fixture = () => read("complete.json");
const context = () => ({
  root,
  records: new Map(read("records.json").map((record) => [record.id, record])),
  // This set models the gallery's synthetic story registry, never the production catalog.
  publishedStories: new Set(["/events/sample-fixture/2026-01-01-sample-record/"]),
});
const rejects = (change, expected) => {
  const data = fixture();
  change(data);
  assert.match(validateOfficialRecords(data, context()).join("\n"), expected);
};

test("complete fixture validates all six record families without rewriting evidence", () => {
  const data = fixture(), before = structuredClone(data);
  assert.deepEqual(validateOfficialRecords(data, context()), []);
  assert.deepEqual(assertOfficialRecords(data, context()), before);
  assert.deepEqual(data, before);
});

for (const row of read("invalid-cases.json")) test(`negative fixture: ${row.name}`, () => {
  rejects((data) => {
    const parts = row.path.slice(1).split("/");
    const key = parts.pop();
    const target = parts.reduce((value, part) => value[part], data);
    if (row.operation === "remove") delete target[key];
    else target[key] = row.value;
  }, new RegExp(row.expected));
});

test("duplicate stable IDs, aliases and external identifiers are rejected", () => {
  rejects((d) => d.officials.push(structuredClone(d.officials[0])), /duplicate id|duplicate slug|duplicate identifier/);
  rejects((d) => d.roll_calls[0].members.push(structuredClone(d.roll_calls[0].members[0])), /duplicate member_id/);
  rejects((d) => d.officials[0].statements.push(structuredClone(d.officials[0].statements[0])), /duplicate id/);
});

test("office and dataset periods cannot run backwards or beyond the as-of date", () => {
  rejects((d) => d.officials[0].offices[0].period.end = "2019-01-01", /reversed period/);
  rejects((d) => d.coverage.end = "2027-01-01", /out of order/);
  rejects((d) => d.coverage.start = "2026-01-31", /outside dataset coverage/);
  rejects((d) => d.finance[0].period.end = "2025-01-01", /reversed period/);
});

test("an empty section needs an explicit unavailable reason, not an invented zero", () => {
  const data = fixture();
  data.officials[0].statements = [];
  assert.match(validateOfficialRecords(data, context()).join("\n"), /unavailable section/);
  data.coverage.completeness = "partial";
  data.coverage.missing.push({ section: "statements", subject_id: "example-member-a", reason: "No admitted statement records." });
  assert.deepEqual(validateOfficialRecords(data, context()), []);
  assert.equal(data.officials[0].statements.length, 0);
  rejects((d) => d.coverage.completeness = "partial", /missing-data reasons/);
  rejects((d) => d.finance[0].receipts = [], /fewer than 1/);
});

test("quote text and secondary attribution cannot be silently changed", () => {
  rejects((d) => d.officials[0].statements[0].quote = "A fabricated substitute.", /quote is not in its cited passages/);
  rejects((d) => d.officials[0].statements[0].evidence[0].source_class = "coverage", /secondary quotation needs quoted_via/);
});

test("actions refer to the same official and date as their roll call", () => {
  rejects((d) => d.officials[0].actions[0].roll_call_id = "missing-vote", /unknown roll call/);
  rejects((d) => d.officials[0].actions[0].date = "2026-01-03", /action date differs/);
  rejects((d) => delete d.roll_calls[0].members[0].official_id, /does not include this official/);
  rejects((d) => d.roll_calls[0].number = 2, /identity differs/);
});

test("partial membership is explicit and cannot manufacture absent members", () => {
  const data = fixture();
  data.roll_calls[0].members.pop();
  assert.match(validateOfficialRecords(data, context()).join("\n"), /present total/);
  Object.assign(data.roll_calls[0], { membership: "partial", missing_reason: "One member row has not arrived." });
  data.coverage.completeness = "partial";
  data.coverage.missing.push({ section: "roll_calls", reason: "One member row has not arrived." });
  assert.deepEqual(validateOfficialRecords(data, context()), []);
  rejects((d) => d.roll_calls[0].missing_reason = "Not actually complete", /membership completeness/);
  rejects((d) => d.roll_calls[0].totals.nay = -1, />= 0/);
});

test("party matching uses the office term at the vote, with an exclusive end date", () => {
  rejects((d) => d.officials[0].offices[0].period.end = "2026-01-02", /matching dated office/);
  rejects((d) => d.roll_calls[0].members[0].state = "TX", /matching dated office/);
});

test("finance links are bidirectional and amendments replace the same report transaction", () => {
  rejects((d) => d.finance[0].official_id = "unknown-official", /finance must be linked/);
  rejects((d) => {
    const receipt = structuredClone(d.finance[0].receipts[0]);
    Object.assign(receipt, { id: "sample-amendment", filing_id: "SAMPLE-F99", amendment: 2 });
    d.finance[0].receipts.push(receipt);
  }, /amendments must replace originals/);
  const data = fixture();
  const receipt = structuredClone(data.finance[0].receipts[1]);
  Object.assign(receipt, { id: "sample-different-report", report_id: "SAMPLE-REPORT-Q2" });
  data.finance[0].receipts.push(receipt);
  assert.deepEqual(validateOfficialRecords(data, context()), []);
  assert.equal(data.finance[0].receipts[2].amount_cents, -1000);
});

test("finance receipts stay within declared coverage even when a report spans longer", () => {
  rejects((d) => {
    d.finance[0].period.start = "2019-01-01";
    d.finance[0].receipts[0].date = "2019-12-31";
  }, /outside dataset coverage/);
  rejects((d) => {
    d.finance[0].period.end = "2027-01-01";
    d.finance[0].receipts[0].date = "2026-02-02";
  }, /outside dataset coverage/);
  const data = fixture();
  data.finance[0].period.start = "2025-01-01";
  data.finance[0].period.end = "2027-01-01";
  assert.deepEqual(validateOfficialRecords(data, context()), []);
});

test("finance deduplication spans overlapping sets but preserves different committees", () => {
  const overlap = (d) => {
    const copy = structuredClone(d.finance[0]);
    copy.id = "overlapping-finance-set";
    copy.receipts[0].filing_id = "SAMPLE-F99";
    copy.receipts[0].amendment = 2;
    d.finance.push(copy);
    d.officials[0].money.push(copy.id);
    return copy;
  };
  rejects(overlap, /amendments must replace originals/);
  const distinct = fixture();
  overlap(distinct).committee_id = "SAMPLE-DIFFERENT-COMMITTEE";
  assert.deepEqual(validateOfficialRecords(distinct, context()), []);
});

test("industry classification requires evidence and unknown classifications stay unavailable", () => {
  rejects((d) => delete d.finance[0].industry_classifications[0].evidence, /required/);
  rejects((d) => d.finance[0].industry_classifications[0].receipt_id = "missing-receipt", /unknown classified receipt/);
  const data = fixture();
  data.finance[0].industry_classifications = [];
  assert.match(validateOfficialRecords(data, context()).join("\n"), /industries missing-data reason/);
  data.coverage.completeness = "partial";
  data.coverage.missing.push({ section: "industries", subject_id: "example-member-a", reason: "No supported classification dictionary." });
  assert.deepEqual(validateOfficialRecords(data, context()), []);
});

test("registration designations, notices and recorded removals remain distinct", () => {
  const data = fixture();
  assert.equal(data.maintenance.find((row) => row.kind === "notice").count, null);
  assert.equal(data.maintenance.find((row) => row.kind === "removal").count, 1);
  assert.deepEqual(validateOfficialRecords(data, context()), []);
  rejects((d) => d.maintenance[0].kind = "purge_inferred_from_delta", /allowed values/);
  rejects((d) => delete d.registrations[0].source_series, /required/);
});

test("election results reconcile against an explicit denominator and reporting date", () => {
  rejects((d) => d.elections[0].denominator.value = 101, /disagree with denominator/);
  rejects((d) => d.elections[0].reported_at = "2026-01-19T12:00:00Z", /reporting date/);
  const data = fixture();
  data.elections[0].denominator = { kind: "total_ballots", value: 101 };
  assert.deepEqual(validateOfficialRecords(data, context()), []);
});

test("counts and cents are bounded safe integers", () => {
  rejects((d) => d.registrations[0].count = Number.MAX_SAFE_INTEGER + 1, /<= 9007199254740991/);
  rejects((d) => d.finance[0].receipts[0].amount_cents = 1.1, /integer/);
});

test("production never publishes fixtures, even with the preview flag enabled", () => {
  const data = fixture();
  assert.deepEqual(publishedOfficials(data, context()), []);
  assert.deepEqual(previewOfficials(data, context(), {}), []);
  assert.deepEqual(previewOfficials(data, context(), { CATCH_DESIGN_PREVIEW: "true" }), []);
  assert.equal(previewOfficials(data, context(), { CATCH_DESIGN_PREVIEW: "1" }).length, 1);
  data.kind = "records";
  assert.throws(() => publishedOfficials(data, context()), /fixture record .* is not publishable/);
  assert.throws(() => previewOfficials(data, context(), { CATCH_DESIGN_PREVIEW: "1" }), /needs_fixture/);
});

test("a record-backed partial official can publish without inventing missing sections", () => {
  const manifest = JSON.parse(readFileSync(new URL("../checks/manifests/officials--marco-rubio.json", import.meta.url), "utf8"));
  const record = { ...manifest.records.find((row) => row.id === "rubio-cr-2013-06-26"), source_class: "official" };
  const data = {
    format: "catch-official-records-v1", kind: "records",
    coverage: { as_of: "2013-06-26", start: "2013-06-26", end: "2013-06-26", selection: "One already admitted Congressional Record passage; not a complete dossier.", completeness: "partial", missing: [] },
    officials: [{ id: "marco-rubio", slug: "marco-rubio", identity: { name: "Marco Rubio", evidence: [{ record_id: record.id, passage: "Mr. RUBIO. Mr. President, over the last few days I have received", source_class: "official" }] }, identifiers: [], offices: [], statements: [], actions: [], money: [], appearances: [] }],
    roll_calls: [], finance: [], registrations: [], maintenance: [], elections: [],
  };
  for (const section of ["identifiers", "offices", "statements", "actions", "money", "appearances"]) data.coverage.missing.push({ section, subject_id: "marco-rubio", reason: "Not adapted in this test." });
  for (const section of ["roll_calls", "finance", "registrations", "maintenance", "elections"]) data.coverage.missing.push({ section, reason: "No dataset supplied." });
  const officials = publishedOfficials(data, { root, records: new Map([[record.id, record]]) });
  assert.equal(officials[0].id, "marco-rubio");
  assert.deepEqual(officials[0].money, []);
  assert.equal(data.coverage.missing.find((row) => row.section === "money").reason, "Not adapted in this test.");
});

test("evidence adapter preserves exact Unicode and line breaks, caches text, and avoids footnotes", () => {
  const text = "Saved 🚀 exact\npassage & punctuation.";
  let reads = 0;
  const record = { id: "unicode-record", source_class: "primary", text_sha256: `sha256:${createHash("sha256").update(text).digest("hex")}` };
  const resolve = createOfficialEvidence({ records: new Map([[record.id, record]]), readText: () => { reads++; return text; } });
  const reference = { record_id: record.id, source_class: "primary", passage: "🚀 exact\npassage" };
  const expected = { href: "/records/unicode-record/", "data-record-href": "/records/unicode-record/", "data-passage": reference.passage };
  assert.deepEqual(officialEvidenceLink(reference, resolve), expected);
  assert.deepEqual(officialEvidenceLink(reference, resolve), expected);
  assert.equal(reads, 1);
  assert.throws(() => resolve({ ...reference, passage: "🚀 exact passage" }), /passage missing/);
  assert.throws(() => resolve({ ...reference, source_class: "coverage" }), /source class differs/);
});

test("evidence rejects changed bytes, ambiguous snippets and unknown record IDs", () => {
  const ctx = context();
  const ref = fixture().officials[0].identity.evidence[0];
  const resolve = createOfficialEvidence({ ...ctx, readText: () => "Changed text." });
  assert.throws(() => resolve(ref, { allowFixture: true }), /fingerprint differs/);
  assert.throws(() => createOfficialEvidence(ctx)({ ...ref, record_id: "unknown" }, { allowFixture: true }), /unknown record/);
  assert.throws(() => createOfficialEvidence(ctx)({ ...ref, record_id: "../escape" }), /invalid evidence reference/);
  const text = "Repeated. Repeated.";
  const record = { id: "repeat", source_class: "primary", text_sha256: `sha256:${createHash("sha256").update(text).digest("hex")}` };
  const reader = createOfficialEvidence({ records: new Map([[record.id, record]]), readText: () => text });
  assert.throws(() => reader({ record_id: "repeat", source_class: "primary", passage: "Repeated." }), /ambiguous passage/);
});

test("the trusted record registry cannot read outside its repository through a symlink", (t) => {
  const directory = mkdtempSync(join(tmpdir(), "official-evidence-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const outside = join(directory, "outside.txt"), repository = join(directory, "repo");
  writeFileSync(outside, "Outside text.");
  mkdirSync(repository);
  symlinkSync(outside, join(repository, "source.txt"));
  const record = { id: "escape", source_class: "primary", text_path: "source.txt" };
  const reader = createOfficialEvidence({ root: repository, records: new Map([[record.id, record]]) });
  assert.throws(() => reader({ record_id: "escape", source_class: "primary", passage: "Outside text." }), /outside repository/);
});
