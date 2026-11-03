import { execFileSync } from "node:child_process";

// The commit a build is made from. Every page carries it, so a poll can tell the build it pushed from the one
// still serving. Workers Builds names the commit it checked out; a local build reads its own HEAD.
export function buildId(env = process.env, git = () => execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" })) {
  const id = (env.WORKERS_CI_COMMIT_SHA || git()).trim();
  if (!/^[0-9a-f]{40}$/.test(id)) throw new Error(`build id is not a full commit sha: ${JSON.stringify(id)}`);
  return id;
}
