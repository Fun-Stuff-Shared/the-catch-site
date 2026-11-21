import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { detectTime, parseTimeOutput, runBuild, stages } from "./build.mjs";

test("GNU and BSD time output parsing and detection", () => {
  const gnu = "\tMaximum resident set size (kbytes): 12345\n";
  const bsd = "        0.01 real         0.00 user         0.00 sys\n  12641280  maximum resident set size\n";
  assert.equal(parseTimeOutput(gnu, "gnu"), 12345);
  assert.equal(parseTimeOutput(bsd, "bsd"), 12345);
  for (const output of ["", "invalid output", "maximum resident set size"]) {
    assert.equal(parseTimeOutput(output, "gnu"), null);
    assert.equal(parseTimeOutput(output, "bsd"), null);
  }
  assert.deepEqual(detectTime(() => ({ status: 0, stderr: gnu })), { kind: "gnu", flag: "-v" });
  assert.deepEqual(detectTime((command, [flag]) => flag === "-l" ? { status: 0, stderr: bsd } : { status: 1 }), { kind: "bsd", flag: "-l" });
  assert.equal(detectTime(() => ({ status: null, error: new Error("ENOENT") })), null);
  assert.equal(detectTime(() => ({ status: 0, stderr: "unsupported" })), null);
});

test("timing-only fallback runs the command and reports unavailable RSS", () => {
  const dir = mkdtempSync(join(tmpdir(), "build-fallback-"));
  try {
    const reportPath = join(dir, "report.json");
    assert.equal(runBuild({ steps: [["fallback", process.execPath, ["-e", "process.exit(0)"]]], reportPath, timer: null }), 0);
    const report = JSON.parse(readFileSync(reportPath, "utf8"));
    assert.equal(report.stages[0].peakRssKiB, null);
    assert.equal(report.total.peakRssKiB, null);
    assert.ok(report.total.wallMs > 0);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("resource reporting preserves stage stderr", () => {
  const dir = mkdtempSync(join(tmpdir(), "build-stderr-"));
  try {
    const code = `import {runBuild} from ${JSON.stringify(new URL('./build.mjs', import.meta.url).href)}; runBuild({ steps: [['stderr', process.execPath, ['-e', 'process.stderr.write("stage stderr stays visible")']]], reportPath: ${JSON.stringify(join(dir, 'report.json'))} });`;
    const result = spawnSync(process.execPath, ["--input-type=module", "-e", code], { encoding: "utf8" });
    assert.equal(result.status, 0);
    assert.match(result.stderr, /stage stderr stays visible/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

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
