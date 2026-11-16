// Waits for the Cloudflare Workers build of a pushed commit and reports how it ended. A queued build can wait behind
// another for many minutes, so this follows the build itself instead of guessing a time: it exits 0 when the build
// deployed, 1 with the end of its log when it failed or is still going at the deadline, and 3 when it cannot see the
// build at all (no token, no API, or no new build of the commit, as when a push changed nothing), and gives up at
// --minutes (60) with exit 1. A build of the same commit from an earlier attempt says nothing about this push, so the
// caller lists the commit's builds before pushing (`known <commit>`) and passes them as --ignore, or --ignore unknown
// when that list could not be read: then no build can be told apart from an earlier one, and it exits 3.
// usage: node scripts/deploy-wait.mjs known <commit>
//        node scripts/deploy-wait.mjs <commit> [--ignore <uuid,...>] [--minutes 60]
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { pathToFileURL } from "node:url";

const ACCOUNT = "212dd811a7eecb00d4e98febf085486e";
const WORKER = "the-catch-site";
const API = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}`;

export function token(env = process.env) {
  if (env.CATCH_CF_BUILDS_TOKEN) return env.CATCH_CF_BUILDS_TOKEN;
  try {
    const line = readFileSync(`${homedir()}/Documents/github/cf.env`, "utf8").split("\n").find((row) => row.startsWith("CF_DEPLOY_TOKEN_SCOPE_OPTIMIZER_USER="));
    return line?.slice(line.indexOf("=") + 1).trim() || null;
  } catch {
    return null;
  }
}

async function api(path, key) {
  const response = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${key}` } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.success) throw new Error(`${path}: status ${response.status} ${JSON.stringify(body.errors ?? []).slice(0, 200)}`);
  return body.result;
}

export async function workerTag(key) {
  const scripts = await api("/workers/scripts", key);
  const script = scripts.find((entry) => entry.id === WORKER);
  if (!script?.tag) throw new Error(`no worker named ${WORKER}`);
  return script.tag;
}

const ofCommit = (builds, commit) => builds.filter((build) => build.build_trigger_metadata?.commit_hash === commit);

// The newest build of the commit that was not there before the push.
export const buildFor = (builds, commit, ignore = []) => ofCommit(builds, commit)
  .filter((build) => !ignore.includes(build.build_uuid))
  .sort((a, b) => String(b.created_on).localeCompare(String(a.created_on)))[0] ?? null;

export async function knownBuilds(commit, key = token()) {
  if (!key) return [];
  return ofCommit(await api(`/builds/workers/${await workerTag(key)}/builds?per_page=25`, key), commit).map((build) => build.build_uuid);
}

// Where a build stands, in the words the publish step prints: null while it is still going.
export function outcome(build) {
  if (!build || build.status !== "stopped") return null;
  return build.build_outcome === "success" ? "deployed" : `build ${build.build_outcome ?? "ended without an outcome"}`;
}

export async function logTail(uuid, key, lines = 25) {
  let cursor = "", all = [];
  for (let page = 0; page < 200; page++) {
    const result = await api(`/builds/builds/${uuid}/logs${cursor ? `?cursor=${cursor}` : ""}`, key);
    all = all.concat(result.lines ?? []).slice(-lines);
    if (!result.truncated || !result.cursor) break;
    cursor = result.cursor;
  }
  return all.map(([, text]) => text).join("\n");
}

async function failureLog(uuid, key) {
  try {
    return `end of its log:\n${await logTail(uuid, key)}`;
  } catch (error) {
    return `its log is unavailable (${error.message})`;
  }
}

export async function waitDeployed(commit, { ignore = [], key = token(), minutes = 60, unseenMinutes = 10, pause = 15_000, log = console.log } = {}) {
  if (ignore.includes("unknown")) return { code: 3, message: "the commit's earlier builds could not be listed before the push, so its new build cannot be told apart" };
  if (!key) return { code: 3, message: "no Cloudflare token: CATCH_CF_BUILDS_TOKEN, or CF_DEPLOY_TOKEN_SCOPE_OPTIMIZER_USER in ~/Documents/github/cf.env" };
  const tag = await workerTag(key);
  const start = Date.now(), deadline = start + minutes * 60_000;
  let last = "";
  while (Date.now() < deadline) {
    const build = buildFor(await api(`/builds/workers/${tag}/builds?per_page=25`, key), commit, ignore);
    const state = build ? `${build.status}${build.build_outcome ? ` ${build.build_outcome}` : ""}` : "not started";
    if (state !== last) { log(`cloudflare build for ${commit.slice(0, 9)}: ${state}`); last = state; }
    const end = outcome(build);
    if (end === "deployed") return { code: 0, message: `cloudflare deployed ${commit.slice(0, 9)}` };
    if (end) return { code: 1, message: `cloudflare ${end} for ${commit.slice(0, 9)}; ${await failureLog(build.build_uuid, key)}` };
    if (!build && Date.now() - start >= unseenMinutes * 60_000) break;
    await new Promise((resolve) => setTimeout(resolve, pause));
  }
  if (last === "not started") return { code: 3, message: `no cloudflare build of ${commit.slice(0, 9)} appeared in ${Math.min(unseenMinutes, minutes)} minutes` };
  return { code: 1, message: `cloudflare build for ${commit.slice(0, 9)} still ${last} after ${minutes} minutes` };
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const args = process.argv.slice(2);
  const option = (name, fallback) => { const at = args.indexOf(name); return at < 0 ? fallback : args.splice(at, 2)[1]; };
  const minutes = Number(option("--minutes", 60)), ignore = option("--ignore", "").split(",").filter(Boolean);
  try {
    if (args[0] === "known") {
      console.log((await knownBuilds(args[1])).join(","));
      process.exit(0);
    }
    const { code, message } = await waitDeployed(args[0], { ignore, minutes });
    (code ? console.error : console.log)(message);
    process.exit(code);
  } catch (error) {
    console.error(`cannot follow the cloudflare build: ${error.message}`);
    process.exit(3);
  }
}
