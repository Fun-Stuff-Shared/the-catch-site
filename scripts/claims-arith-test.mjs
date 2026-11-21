import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const cli = fileURLToPath(new URL("../skills/catch-record/scripts/claims.py", import.meta.url));
function fixture(t, says, passage = "", date = "2026-11-19", body = passage) {
  const root = mkdtempSync(join(tmpdir(), "catch-arith-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const dir of ["claims", "manifests", "records"]) mkdirSync(join(root, "checks", dir), { recursive: true });
  writeFileSync(join(root, "checks/claims/test.json"), JSON.stringify({ story: "test", claims: [{ id: "fixture", says, evidence: [{ record: "source", passage }] }] }));
  writeFileSync(join(root, "checks/manifests/test.json"), JSON.stringify({ records: [{ id: "source", date, text_path: "checks/records/source.txt" }] }));
  writeFileSync(join(root, "checks/records/source.txt"), body);
  const run = (...args) => spawnSync("python3", ["-I", cli, "arith", "test", ...args], { cwd: root, env: { ...process.env, HOME: root, GIT_CONFIG_GLOBAL: join(root, ".gitconfig") }, encoding: "utf8" });
  return { root, run };
}

for (const [name, says, passage, count, mismatches, body, date] of [
  ["real comments-60-days r14", "BIS takes public comments until January 19, 2027, 60 days after publication.", "Comments must be received no later than January 19, 2027.", 1, 1],
  ["correct day count", "61 days between Nov. 19, 2026 and Jan 19, 2027.", "", 1, 0],
  ["infer year", "There were 3 days from Nov 19 to Nov 23, 2026.", "", 1, 1],
  ["infer long interval year", "10 months from January 1 to November 1, 2026.", "", 1, 0],
  ["infer long interval mismatch", "9 months from January 1 to November 1, 2026.", "", 1, 1],
  ["ISO weeks", "It ended 2 weeks after 2026-11-01 on 2026-11-15.", "", 1, 0],
  ["calendar months", "It ended 2 months after Nov 19, 2026 on Jan 19, 2027.", "", 1, 0],
  ["dates from passage", "The deadline is 60 days after Nov 19, 2026.", "The deadline is Jan 19, 2027.", 1, 1],
  ["yearless across new year", "The deadline is Jan 19, 2027, 60 days after Nov 19.", "", 1, 1],
  ["sum scales", "$1 million and $2 million, a total of $4 million.", "", 1, 1],
  ["sum correct", "1,000 and 2,000, a total of 3,000.", "", 1, 0],
  ["sum complete list", "$1 million, $2 million and $3 million, a total of $6 million.", "", 1, 0],
  ["sum complete list mismatch", "$1 million, $2 million and $3 million, a total of $5 million.", "", 1, 1],
  ["sum Oxford comma list", "$1 million, $2 million, and $3 million, a total of $6 million.", "", 1, 0],
  ["sum cited inputs", "A total of $4 million.", "$1 million and $2 million.", 1, 1],
  ["sum cited complete list", "A total of $6 million.", "$1 million, $2 million and $3 million.", 1, 0],
  ["sum cited complete list mismatch", "A total of $5 million.", "$1 million, $2 million and $3 million.", 1, 1],
  ["difference cited inputs", "An increase of 5.", "From 10 to 20.", 1, 1],
  ["difference", "From $1 billion to $3 billion, an increase of $1 billion.", "", 1, 1],
  ["up difference", "From 10 to 20, up 10.", "", 1, 0],
  ["share", "1 of 3, or 33%.", "", 1, 0],
  ["share precision", "1 of 3, or 33.4%.", "", 1, 1],
  ["part percent base", "20 is 25% of 100.", "", 1, 1],
  ["passage part", "The share was 25% of 100.", "20 of 100 responded.", 1, 1],
  ["percent increase", "Up 40% from 100 to 150.", "", 1, 1],
  ["percent decrease", "Down 25% from 100 to 75.", "", 1, 0],
  ["missing date", "It ended 60 days after publication.", "", 0, 0],
  ["missing part", "It was 40% of 200.", "", 0, 0],
  ["ambiguous interval references", "The case was unsealed Oct. 23, 11 days before the Nov. 3 midterm elections, and filed 14 days before them.", "", 0, 0],
  ["zero denominator", "1 of 0, or 25%.", "", 0, 0],
  ["empty", "", "", 0, 0],
  ["unrelated numbers", "There were 40 people and 30 seats.", "", 0, 0],
  ["real NC parenthesized share", "Common Cause's 27-county count later showed 628 spoiled of 15,035 ballots (3.2%) on Oct. 21 and 4.22% on Oct. 23.", "628 spoiled ballots so far, out of 15,035 total ballots cast", 1, 1],
  ["correct parenthesized share", "628 spoiled of 15,035 ballots (4.18%).", "", 1, 0],
  ["real Rodriguez per hundred", "Rodríguez said 99 of every 100 dollars of oil and mining income from January to November went to public-sector wages and pensions: by her government's figures, $14.710 billion of $15.603 billion taken in, on a portal that covers two government funds.", "", 1, 1],
  ["per hundred missing operands", "Rodríguez said 99 of every 100 dollars went to pensions.", "", 0, 0],
  ["real BIS nearby denominator", "Returns without action are routine: BIS returned 4,706 applications, 11.8 percent of those it reviewed, in 2021.", "Return without action (RWA) totaled 4,706", 1, 1,
    "In 2021, BIS reviewed 40,843 license applications with a total value of $1.4 trillion. Of these, 942 were Deemed Export applications and 39,901 were applications for tangible items. Return without action (RWA) totaled 4,706."],
  ["BIS missing denominator", "BIS returned 4,706 applications, 11.8 percent of those it reviewed, in 2021.", "Return without action (RWA) totaled 4,706", 0, 0],
  ["BIS wrong year denominator", "BIS returned 4,706 applications, 11.8 percent of those it reviewed, in 2021.", "Return without action (RWA) totaled 4,706", 0, 0,
    "In 2020, BIS reviewed 40,843 license applications. Return without action (RWA) totaled 4,706."],
  ["real Reuters completion weekday", "In a Reuters/Ipsos poll completed Nov. 10, 71% of Americans wanted Congress to act.", "The four-day poll, completed on Monday, showed 71% of Americans", 1, 1, undefined, "2026-11-10"],
  ["correct completion weekday", "In a Reuters/Ipsos poll completed Nov. 9, 71% of Americans wanted Congress to act.", "The four-day poll, completed on Monday, showed 71% of Americans", 1, 0, undefined, "2026-11-10"],
  ["completion missing publication date", "A poll completed Nov. 10 found support.", "The poll, completed on Monday, showed support.", 0, 0, undefined, ""],
  ["real Marquette separate events", "Wedgewood's July 21 Wisconsin poll had Hong at 38% and Crowley at 9%; Marquette Law School's last poll, about two weeks before the Aug. 12 primary, had Hong at 38% and Crowley at 7%.", "July 21, 2026", 0, 0],
  ["real Iran spelled months missing input", "By October 30, 2025, four months before the war began, Rubio and Hegseth were living on Generals' Row.", "Both Secretary of State Marco Rubio and Defense Secretary Pete Hegseth live on Generals' Row at Fort McNair.", 0, 0],
  ["spelled months with endpoints", "By October 30, 2025, four months before February 28, 2026, they lived at Fort McNair.", "", 1, 0],
  ["real IFR within missing endpoint", "A data center must get a license within 90 days of the rule's effective date.", "Effective November 19, 2026.", 0, 0],
  ["within of endpoints", "The deadline is February 18, 2027, within 90 days of the effective date November 19, 2026.", "", 1, 1],
  ["within shorter than maximum", "The deadline is February 16, 2027, within 90 days of the effective date November 19, 2026.", "", 1, 0],
]) test(name, (t) => {
  const { root, run } = fixture(t, says, passage, date, body);
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, new RegExp(`1 claims checked, ${count} computations recomputed, ${mismatches} mismatches`));
  assert.equal(result.stdout.includes("MISMATCH claim fixture:"), !!mismatches);
  if (name === "real comments-60-days r14") {
    assert.match(result.stdout, /Nov 19, 2026 → Jan 19, 2027 is 61 days/);
    assert.match(result.stdout, /says: BIS/);
    assert.equal(run("--strict").status, 1);
  }
  if (!mismatches) assert.equal(run("--strict").status, 0);
  assert.equal(existsSync(join(root, "checks/reads")), false);
});

test("malformed ledger is an error, not a clean arithmetic report", (t) => {
  const { root, run } = fixture(t, "");
  writeFileSync(join(root, "checks/claims/test.json"), "{");
  assert.notEqual(run().status, 0);
});

test("replay follows renames and uses the parent's held hashes and historical HASHED fields", (t) => {
  const { root } = fixture(t, "1 and 2, a total of 4.");
  const env = { ...process.env, HOME: root, GIT_CONFIG_GLOBAL: join(root, ".gitconfig") };
  const git = (...args) => execFileSync("git", args, { cwd: root, env, encoding: "utf8" });
  git("init", "-q", "-b", "fixture");
  const commit = () => git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "-qm", "fixture");
  mkdirSync(join(root, "skills/catch-record/scripts"), { recursive: true });
  const hashSource = `import hashlib, json
HASHED = ("says",)
def claim_hash(claim):
    body = json.dumps({k: claim.get(k) for k in HASHED}, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(body.encode()).hexdigest()[:16]
`;
  writeFileSync(join(root, "skills/catch-record/scripts/claims.py"), hashSource);
  git("add", "checks/claims/test.json", "checks/manifests/test.json", "checks/records/source.txt", "skills/catch-record/scripts/claims.py");
  commit();
  writeFileSync(join(root, "checks/records/test-claims-r1.md"), "[fixture] total does not add up\nCLAIMS DO NOT HOLD\n");
  git("add", "checks/records/test-claims-r1.md");
  commit();
  const hash = execFileSync("python3", ["-I", "-c", `${hashSource}\nprint(claim_hash({"says": "1 and 2, a total of 4."}))`], { cwd: root, env, encoding: "utf8" }).trim();
  mkdirSync(join(root, "checks/reads"));
  writeFileSync(join(root, "checks/reads/test-claims-held.json"), JSON.stringify({ fixture: hash }));
  git("add", "checks/reads/test-claims-held.json");
  commit();
  writeFileSync(join(root, "checks/records/test-claims-r2.md"), "CLAIMS HOLD\n");
  git("add", "checks/records/test-claims-r2.md");
  commit();
  writeFileSync(join(root, "skills/catch-record/scripts/claims.py"), hashSource.replace('(\"says\",)', '(\"says\", \"short\")'));
  git("add", "skills/catch-record/scripts/claims.py");
  commit();
  writeFileSync(join(root, "checks/records/test-claims-r3.md"), "CLAIMS HOLD\n");
  git("add", "checks/records/test-claims-r3.md");
  commit();
  git("mv", "checks/records/test-claims-r1.md", "checks/records/renamed-claims-r1.md");
  git("mv", "checks/records/test-claims-r2.md", "checks/records/renamed-claims-r2.md");
  git("mv", "checks/records/test-claims-r3.md", "checks/records/renamed-claims-r3.md");
  commit();
  // Deliberately dirty input must not be used by the replay.
  writeFileSync(join(root, "checks/claims/test.json"), "invalid JSON");
  const replay = fileURLToPath(new URL("./claims-arith-replay.py", import.meta.url));
  const module = fileURLToPath(new URL("../skills/catch-record/scripts/arith.py", import.meta.url));
  const result = spawnSync("python3", ["-I", "-c", String.raw`
import importlib.util, json, sys
from pathlib import Path
def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module
replay, arith = load("replay", sys.argv[1]), load("arith", sys.argv[2])
labels = {"findings": {"renamed-claims-r1.md": [{"claim": "fixture", "says": "1 and 2, a total of 4."}]},
          "recomputation_reviews": [{"claim": "fixture", "stated": '"4"', "result": "1 + 2 = 3", "correct": True}]}
rows = replay.replay(Path.cwd(), labels, arith)
labels["recomputation_reviews"][0]["correct"] = False
reviewed_wrong = replay.replay(Path.cwd(), labels, arith)
assert reviewed_wrong[0]["mismatches"][0]["true_false_positive"] is True
assert reviewed_wrong[2]["mismatches"][0]["model_missed"] is False
labels["recomputation_reviews"] = []
assert replay.replay(Path.cwd(), labels, arith)[0]["mismatches"][0]["recomputation_correct"] is None
print(json.dumps(rows))
`, replay, module], { cwd: root, env, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const rows = JSON.parse(result.stdout);
  assert.equal(rows.length, 3);
  assert.equal(rows[0].historical_story, "test");
  assert.equal(rows[0].evaluated_findings[0].caught, true);
  assert.equal(rows[0].mismatches[0].true_false_positive, false);
  assert.equal(rows[0].mismatches[0].model_missed, false);
  assert.deepEqual(rows[1].packed_claim_ids, []);
  assert.deepEqual(rows[1].held_claim_ids, ["fixture"]);
  assert.deepEqual(rows[1].mismatches, []);
  assert.deepEqual(rows[2].packed_claim_ids, ["fixture"]);
  assert.equal(rows[2].mismatches[0].model_missed, true);
  assert.equal(rows[0].unavailable.length, 0);
});

test("replay reports missing parent inputs rather than substituting the added ledger", (t) => {
  const { root } = fixture(t, "1 and 2, a total of 4.");
  const env = { ...process.env, HOME: root, GIT_CONFIG_GLOBAL: join(root, ".gitconfig") };
  const git = (...args) => execFileSync("git", args, { cwd: root, env, encoding: "utf8" });
  git("init", "-q", "-b", "fixture");
  git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "--allow-empty", "-qm", "base");
  writeFileSync(join(root, "checks/records/test-claims-r1.md"), "CLAIMS DO NOT HOLD\n");
  git("add", "checks/claims/test.json", "checks/manifests/test.json", "checks/records/source.txt", "checks/records/test-claims-r1.md");
  git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "-qm", "round and ledger together");
  const replay = fileURLToPath(new URL("./claims-arith-replay.py", import.meta.url));
  const result = spawnSync("python3", ["-I", "-c", String.raw`
import importlib.util, json, sys
from pathlib import Path
spec = importlib.util.spec_from_file_location("replay", sys.argv[1])
replay = importlib.util.module_from_spec(spec)
spec.loader.exec_module(replay)
print(json.dumps(replay.replay(Path.cwd(), {}, None)))
`, replay], { cwd: root, env, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const [row] = JSON.parse(result.stdout);
  assert.deepEqual(row.unavailable, ["parent ledger or manifest absent"]);
  assert.deepEqual(row.mismatches, []);
});
