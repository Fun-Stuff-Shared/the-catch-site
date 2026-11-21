import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runBuild, stages } from "./build.mjs";

test("build stages preserve the original order and NODE_OPTIONS scope", () => {
  assert.equal(stages.length, 9);
  assert.deepEqual(stages.map(([name]) => name), ["pull-state", "pull-v2", "build-news-records", "astro build", "merge-cites", "work-evidence", "facts-claims", "check-events", "check-shell"]);
  assert.deepEqual(stages[0][3], { NODE_OPTIONS: "--max-old-space-size=6144" });
  assert.ok(stages.slice(1).every((stage) => stage[3] === undefined));
});

for (const [name, steps, expected] of [
  ["success", [["node", process.execPath, ["-e", "require('node:child_process').execFileSync(process.execPath, ['-e', 'Buffer.alloc(16e6).fill(1)'])"]]], 0],
  ["empty", [], 0],
  ["failure stops later stages", [["fail", process.execPath, ["-e", "process.exit(7)"]], ["unreachable", process.execPath, ["-e", "process.exit(0)"]]], 7],
  ["missing command", [["missing", "/nonexistent/catch-command", []]], 127],
]) test(name, () => {
  const dir = mkdtempSync(join(tmpdir(), "build-test-"));
  try {
    const reportPath = join(dir, "report.json");
    assert.equal(runBuild({ steps, reportPath }), expected);
    const report = JSON.parse(readFileSync(reportPath, "utf8"));
    assert.equal(report.total.exitCode, expected);
    assert.equal(report.stages.length, Math.min(steps.length, 1));
    assert.ok(report.total.wallMs >= 0);
    if (name === "success") assert.ok(report.stages[0].peakRssKiB > 16000);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
