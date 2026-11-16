import assert from "node:assert/strict";
import { test } from "node:test";
import { buildFor, waitDeployed } from "./deploy-wait.mjs";

const commit = "a".repeat(40);
const build = (fields) => ({ build_uuid: "u1", status: "stopped", build_outcome: "success", created_on: "2026-11-16T15:00:00.000Z", build_trigger_metadata: { commit_hash: commit }, ...fields });

function cloudflare({ builds, logs = () => ({ ok: true, body: { success: true, result: { lines: [[1, "Asset too large"]], truncated: false } } }) }) {
  let call = 0;
  globalThis.fetch = async (url) => {
    const respond = ({ ok, body }) => ({ ok, status: ok ? 200 : 503, json: async () => body });
    if (url.endsWith("/workers/scripts")) return respond({ ok: true, body: { success: true, result: [{ id: "the-catch-site", tag: "t" }] } });
    if (url.includes("/logs")) return respond(logs());
    return respond({ ok: true, body: { success: true, result: builds(call++) } });
  };
}
const quiet = { key: "k", pause: 0, log: () => {} };

test("an earlier attempt's success for the same commit does not count", async () => {
  assert.equal(buildFor([build({})], commit, ["u1"]), null);
  assert.equal(buildFor([build({}), build({ build_uuid: "u2", status: "running", build_outcome: null, created_on: "2026-11-16T15:00:30.000Z" })], commit, ["u1"]).build_uuid, "u2");
  cloudflare({ builds: (n) => [build({}), ...(n < 1 ? [] : [build({ build_uuid: "u2", created_on: "2026-11-16T15:01:00.000Z", ...(n < 3 ? { status: "running", build_outcome: null } : {}) })])] });
  const seen = [];
  assert.equal((await waitDeployed(commit, { ...quiet, ignore: ["u1"], log: (line) => seen.push(line) })).code, 0);
  assert.ok(seen.some((line) => line.endsWith("running")));
});

test("a build that deploys after running exits 0", async () => {
  cloudflare({ builds: (n) => [build(n < 2 ? { status: "running", build_outcome: null } : {})] });
  assert.equal((await waitDeployed(commit, quiet)).code, 0);
});

test("a failed build exits 1 with its log", async () => {
  cloudflare({ builds: () => [build({ build_outcome: "fail" })] });
  const result = await waitDeployed(commit, quiet);
  assert.equal(result.code, 1);
  assert.match(result.message, /Asset too large/);
});

test("a failed build whose log cannot be read still exits 1", async () => {
  cloudflare({ builds: () => [build({ build_outcome: "fail" })], logs: () => ({ ok: false, body: {} }) });
  const result = await waitDeployed(commit, quiet);
  assert.equal(result.code, 1);
  assert.match(result.message, /log is unavailable/);
});

test("a build that never appears exits 3", async () => {
  cloudflare({ builds: () => [] });
  assert.equal((await waitDeployed(commit, { ...quiet, unseenMinutes: 0 })).code, 3);
});

test("no token exits 3", async () => {
  assert.equal((await waitDeployed(commit, { ...quiet, key: null })).code, 3);
});

test("an unreadable pre-push baseline never counts an old success", async () => {
  cloudflare({ builds: () => [build({})] });
  assert.equal((await waitDeployed(commit, { ...quiet, ignore: ["unknown"] })).code, 3);
});
