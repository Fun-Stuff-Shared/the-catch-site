import { appendFileSync, copyFileSync, existsSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const exportsDir = "/Volumes/4/CF/catch-state/exports";
const stop = "/tmp/catch-derived-figures.STOP";
const log = "/tmp/catch-derived-figures-poll.log";
const destination = join(root, "data/state/derived-figures.json");
const stamp = (message) => appendFileSync(log, `${new Date().toISOString()} ${message}\n`);
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

while (!existsSync(stop)) {
  const matches = existsSync(exportsDir) ? readdirSync(exportsDir).filter((name) => /^derived-figures-\d{4}-\d{2}-\d{2}\.json$/.test(name)).sort() : [];
  if (matches.length) {
    const source = join(exportsDir, matches.at(-1));
    copyFileSync(source, destination);
    stamp(`copied ${source}`);
    try {
      execFileSync("npm", ["run", "build"], { cwd: root, stdio: "pipe" });
      stamp("build passed");
    } catch (error) {
      stamp(`build failed: ${error.stderr?.toString().trim() || error.message}`);
    }
    break;
  }
  stamp("export absent; waiting 900 seconds");
  await sleep(900_000);
}
stamp(existsSync(stop) ? "stopped" : "finished");
