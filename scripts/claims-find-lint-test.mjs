import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const claimsPy = resolve("skills/catch-record/scripts/claims.py");
const story = "fixture--2026-11-01-story";

const record = [
  "The Army said Thursday it would postpone tomorrow’s controlled  detonation until Monday, Nov. 23.",
  "Officials expect about 4,042 flights to be delayed. The agency fined three carriers a total of $12.26 billion.",
].join("\n");

const ledger = (claims) => JSON.stringify({ story, claims }, null, 2) + "\n";

function fixture(claims = []) {
  const dir = mkdtempSync(join(tmpdir(), "claims-find-lint-"));
  for (const d of ["home", "checks/claims", "checks/manifests", "records"]) mkdirSync(join(dir, d), { recursive: true });
  writeFileSync(join(dir, "home/.gitconfig"), "");
  writeFileSync(join(dir, "records/army.txt"), record);
  writeFileSync(join(dir, "records/other.txt"), "Elsewhere, nobody would postpone tomorrow's controlled detonation.");
  writeFileSync(join(dir, `checks/manifests/${story}.json`), JSON.stringify({
    records: [{ id: "army-2026-11-19", text_path: "records/army.txt" }, { id: "other-2026-11-19", text_path: "records/other.txt" }],
  }));
  writeFileSync(join(dir, `checks/claims/${story}.json`), ledger(claims));
  return dir;
}

function claims(dir, ...args) {
  const env = { PATH: process.env.PATH, HOME: join(dir, "home"), GIT_CONFIG_GLOBAL: join(dir, "home/.gitconfig") };
  const r = spawnSync("python3", ["-I", claimsPy, ...args], { cwd: dir, env, encoding: "utf8" });
  return { status: r.status, out: r.stdout + r.stderr };
}

const readLedger = (dir) => JSON.parse(readFileSync(join(dir, `checks/claims/${story}.json`), "utf8"));
const claim = (id, says, short, extra = {}) => ({
  id, says, short, status: "fact", load: [],
  evidence: [{ record: "army-2026-11-19", passage: "Officials expect about 4,042 flights to be delayed." }], ...extra,
});

test("find lists exact passages across records, ignoring quote style, case and whitespace", () => {
  const dir = fixture();
  const r = claims(dir, "add", story, "--find", "Postpone tomorrow's controlled detonation");
  assert.equal(r.status, 0, r.out);
  assert.match(r.out, /1\. army-2026-11-19 \(exact\): postpone tomorrow’s controlled  detonation/);
  assert.match(r.out, /2\. other-2026-11-19 \(exact\): postpone tomorrow's controlled detonation/);
  assert.equal(readLedger(dir).claims.length, 0, "listing does not write");
});

test("add writes a new claim with the saved text's own bytes", () => {
  const dir = fixture();
  const r = claims(dir, "add", story, "--find", "postpone tomorrow's controlled detonation", "--record", "army-2026-11-19",
    "--id", "army-postpones", "--says", "The Army said it would postpone the detonation.", "--status", "said", "--by", "the Army");
  assert.equal(r.status, 0, r.out);
  const [c] = readLedger(dir).claims;
  assert.deepEqual(c, {
    id: "army-postpones", says: "The Army said it would postpone the detonation.", status: "said", by: "the Army", load: [],
    evidence: [{ record: "army-2026-11-19", passage: "postpone tomorrow’s controlled  detonation" }],
  });
  assert.equal(claims(dir, "check", story).status, 0);
});

test("add needs --pick when several passages match, and adds evidence to an existing claim", () => {
  const dir = fixture([claim("flights", "Officials expect about 4,042 flights to be delayed.", "")]);
  const args = ["add", story, "--find", "postpone tomorrow's controlled detonation", "--id", "flights"];
  const many = claims(dir, ...args);
  assert.equal(many.status, 1);
  assert.match(many.out, /2 passages; choose one with --pick N/);
  const r = claims(dir, ...args, "--pick", "2");
  assert.equal(r.status, 0, r.out);
  assert.deepEqual(readLedger(dir).claims[0].evidence.at(-1),
    { record: "other-2026-11-19", passage: "postpone tomorrow's controlled detonation" });
});

test("add refuses a claim the ledger check would fail, and leaves the ledger as it was", () => {
  const dir = fixture();
  const before = readFileSync(join(dir, `checks/claims/${story}.json`), "utf8");
  const r = claims(dir, "add", story, "--find", "4,042 flights", "--id", "Bad Id", "--says", "No full stop", "--status", "fact");
  assert.equal(r.status, 1);
  assert.match(r.out, /FAIL claim Bad Id: id must be kebab-case/);
  assert.equal(readFileSync(join(dir, `checks/claims/${story}.json`), "utf8"), before);
});

test("find falls back to the sentences sharing most of the words, keeping abbreviations inside a sentence", () => {
  const dir = fixture();
  const r = claims(dir, "add", story, "--find", "army delays the detonation to monday nov 23");
  assert.equal(r.status, 0, r.out);
  assert.match(r.out, /no exact passage/);
  assert.match(r.out, /army-2026-11-19 \(near\): The Army said Thursday it would postpone tomorrow’s controlled  detonation until Monday, Nov\. 23\./);
});

test("lint flags numbers, dates, names and qualifiers the short form adds", () => {
  const dir = fixture([
    claim("number", "Officials expect about 4,042 flights to be delayed.", "About 4,100 flights delayed"),
    claim("date", "Officials expect about 4,042 flights to be delayed.", "Nov. 24: 4,042 flights delayed"),
    claim("name", "Officials expect about 4,042 flights to be delayed.", "FAA: about 4,042 flights delayed"),
    claim("qualifier", "Officials expect about 4,042 flights to be delayed.", "All 4,042 flights delayed"),
  ]);
  const r = claims(dir, "lint", story);
  assert.equal(r.status, 1);
  assert.match(r.out, /SHORT number: the short form states '4,100'/);
  assert.match(r.out, /SHORT date: the short form states 'Nov\.', '24'|SHORT date: the short form states '24'/);
  assert.match(r.out, /SHORT name: the short form states 'FAA'/);
  assert.match(r.out, /SHORT qualifier: the short form states 'All'/);
  assert.match(r.out, /4 short forms, 4 state more than their claim/);
});

test("lint passes short forms that restate, round or abbreviate what says holds", () => {
  const dir = fixture([
    claim("rounded", "The agency fined three carriers a total of $12.26 billion.", "$12.3 billion from 3 carriers"),
    claim("words", "Officials expect about 4,042 flights to be delayed on Monday, November 23.", "Nov. 23: about 4,042 flights late"),
    claim("kin", "Every one of the carriers paid by Thursday.", "All carriers paid"),
    claim("country", "The United States said China must pay.", "U.S.: Chinese must pay"),
    claim("none", "Officials expect about 4,042 flights to be delayed.", ""),
  ]);
  const r = claims(dir, "lint", story);
  assert.equal(r.status, 0, r.out);
  assert.match(r.out, /4 short forms, 0 state more than their claim/);
});

test("lint compares numbers by value, whatever their scale or spelling", () => {
  const dir = fixture([
    claim("scale", "France could release 2 million barrels.", "2 billion barrels"),
    claim("words", "France could release two million barrels.", "2,000,000 barrels"),
    claim("compound", "Twenty-one states sued.", "21 states"),
  ]);
  const r = claims(dir, "lint", story);
  assert.equal(r.status, 1);
  assert.match(r.out, /SHORT scale: the short form states '2 billion'/);
  assert.doesNotMatch(r.out, /SHORT (words|compound)/);
});

test("add finds passages after characters that lowercase to two, and reads a ledger with leading whitespace", () => {
  const dir = fixture();
  writeFileSync(join(dir, "records/army.txt"), "İstanbul: the Army said “the Plan” ends.");
  writeFileSync(join(dir, `checks/claims/${story}.json`), "\n" + ledger([]));
  const r = claims(dir, "add", story, "--find", 'said "the plan" ends', "--id", "plan-ends",
    "--says", "The Army said the plan ends.", "--status", "said", "--by", "the Army");
  assert.equal(r.status, 0, r.out);
  assert.equal(readLedger(dir).claims[0].evidence[0].passage, "said “the Plan” ends");
});
