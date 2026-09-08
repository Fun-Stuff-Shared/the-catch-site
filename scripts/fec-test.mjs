import test from "node:test";
import assert from "node:assert/strict";
import { parseCsvLine, fecRecords, receiptExclusion, scheduleAReceipts, independentExpendituresByCommittee, fecDateToIso, SA } from "../src/lib/fec.mjs";

const MAGA = "data/sources/texas-senate/fec-maga-inc-f3x";
const SNAPSHOT = "data/sources/texas-senate/fec-independent-expenditure-2026-snapshot-2026-09-08.csv";

test("quoted fields keep their commas and a record can span lines", () => {
  assert.deepEqual(parseCsvLine('"SA17","C1","JP MORGAN CHASE BANK, N.A.",""'), ["SA17", "C1", "JP MORGAN CHASE BANK, N.A.", ""]);
  const rows = [...fecRecords('"A","line one\nline two"\n"B","x"')];
  assert.equal(rows.length, 2);
  assert.equal(rows[0][1], "line one\nline two");
});

test("memo rows, interest, and the exchange are excluded; givers are kept", () => {
  const row = (over) => { const r = Array(45).fill(""); r[SA.formType] = "SA17"; Object.assign(r, over); return r; };
  assert.equal(receiptExclusion(row({ [SA.orgName]: "GEMINI TRUST COMPANY", [SA.description]: "NON-CONTRIBUTION: BITCOINS SOLD VIA GEMINI TRUST - PURCHASER UNKNOWN" })), "exchange");
  assert.equal(receiptExclusion(row({ [SA.orgName]: "JP MORGAN CHASE BANK, N.A.", [SA.description]: "NON-CONTRIBUTION: INTEREST" })), "interest");
  assert.equal(receiptExclusion(row({ [SA.lastName]: "WINKLEVOSS", [SA.firstName]: "CAMERON", [SA.description]: "NON-CONTRIBUTION: 79.28 BITCOINS SEE [SA17:5422]", [SA.memoCode]: "X" })), "memo");
  assert.equal(receiptExclusion(row({ [SA.lastName]: "WINKLEVOSS", [SA.firstName]: "CAMERON", [SA.description]: "NON-CONTRIBUTION: 79.28 BITCOINS LIQUIDATED" })), null);
  assert.equal(receiptExclusion(row({ [SA.lastName]: "ADELSON", [SA.firstName]: "MIRIAM", [SA.description]: "NON-CONTRIBUTION" })), null);
});

test("MAGA Inc. receipts from the pinned filings: the Winklevoss gifts count once, Gemini and JP Morgan never", () => {
  const { list, excluded, givers } = scheduleAReceipts(MAGA);
  const by = Object.fromEntries(list.map((r) => [r.name, r.amount]));
  assert.equal(Math.round(by["TYLER WINKLEVOSS"] * 100) / 100, 5011860.44);
  assert.equal(Math.round(by["CAMERON WINKLEVOSS"] * 100) / 100, 5006604.47);
  assert.equal(by["GEMINI TRUST COMPANY"], undefined);
  assert.equal(by["JP MORGAN CHASE BANK, N.A."], undefined);
  assert.equal(by["MIRIAM ADELSON"], 25000000);
  assert.equal(Math.round(excluded.interest * 100) / 100, 6800003.01);
  assert.equal(Math.round(excluded.exchange * 100) / 100, 11518449.91);
  assert.ok(excluded.memo > 20000000, "memo cross-references are large and must be excluded");
  assert.equal(givers, 95);
});

test("independent expenditures: amendments replace originals and the notice date bounds the universe", () => {
  assert.equal(fecDateToIso("19-AUG-26"), "2026-08-19");
  const before = independentExpendituresByCommittee(SNAPSHOT, { office: "S", state: "TX", candidateIds: ["S6TX00479", "S6TX00388"], receivedBefore: "2026-09-05", exclude: (n) => n.toUpperCase().includes("MAGA INC") });
  assert.equal(before.count, 17);
  assert.equal(Math.round(before.total * 100) / 100, 16254658.26);
  const all = independentExpendituresByCommittee(SNAPSHOT, { office: "S", state: "TX", candidateIds: ["S6TX00479", "S6TX00388"] });
  assert.equal(Object.fromEntries(all.committees)["MAGA INC."], 10000000);
});
