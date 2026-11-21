import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const stages = [
  ["pull-state", "node", ["scripts/pull-state.mjs"], { NODE_OPTIONS: "--max-old-space-size=6144" }],
  ["pull-v2", "node", ["scripts/pull-v2.mjs"]],
  ["build-news-records", "node", ["scripts/build-news-records.mjs"]],
  ["astro build", "astro", ["build"]],
  ["merge-cites", "node", ["scripts/merge-cites.mjs"]],
  ["work-evidence", "node", ["scripts/work-evidence.mjs"]],
  ["facts-claims", "node", ["scripts/facts-claims.mjs"]],
  ["check-events", "node", ["scripts/check-events.mjs"]],
  ["check-shell", "node", ["scripts/check-shell.mjs"]],
];

export function runBuild({ steps = stages, reportPath = ".build-report.json", env = process.env } = {}) {
  const temporary = mkdtempSync(join(tmpdir(), "catch-build-"));
  const started = performance.now();
  const rows = [];
  let exitCode = 0;
  try {
    for (const [stage, command, args, overrides] of steps) {
      const usagePath = join(temporary, "usage");
      const start = performance.now();
      // GNU time uses wait4 rusage: the stage and its waited-for descendants,
      // not the runner's cumulative child high-water mark. RSS is not additive.
      const result = spawnSync("/usr/bin/time", ["-f", "%M", "-o", usagePath, command, ...args], {
        env: { ...env, ...overrides }, stdio: "inherit",
      });
      const wallMs = performance.now() - start;
      let peakRssKiB = null;
      try {
        const lines = readFileSync(usagePath, "utf8").trim().split("\n");
        const value = Number(lines.at(-1));
        if (Number.isFinite(value)) peakRssKiB = value;
      } catch {}
      exitCode = result.status ?? 1;
      rows.push({ stage, wallMs, peakRssKiB, exitCode, signal: result.signal });
      if (result.error) console.error(result.error.message);
      if (exitCode) break;
    }
  } finally {
    const report = {
      stages: rows,
      total: { wallMs: performance.now() - started, peakRssKiB: Math.max(0, ...rows.map((row) => row.peakRssKiB ?? 0)), exitCode },
      rssMethod: "GNU time wait4 maxRSS (KiB), including waited-for children; maximum high-water mark, not concurrent RSS sum",
    };
    writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
    console.table([...rows, { stage: "TOTAL", ...report.total }].map((row) => ({
      stage: row.stage, "wall (s)": (row.wallMs / 1000).toFixed(3),
      "peak RSS (MiB)": row.peakRssKiB === null ? "unavailable" : (row.peakRssKiB / 1024).toFixed(1), exit: row.exitCode,
    })));
    rmSync(temporary, { recursive: true, force: true });
  }
  return exitCode;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) process.exitCode = runBuild();
