import { spawnSync } from "node:child_process";
import { closeSync, mkdtempSync, openSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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

export function parseTimeOutput(output, kind) {
  const match = kind === "gnu"
    ? output.match(/Maximum resident set size \(kbytes\):\s*(\d+)/)
    : kind === "bsd" ? output.match(/(\d+)\s+maximum resident set size/) : null;
  return match ? Number(match[1]) / (kind === "bsd" ? 1024 : 1) : null;
}

export function detectTime(run = spawnSync) {
  for (const [kind, flag] of [["gnu", "-v"], ["bsd", "-l"]]) {
    const result = run("/usr/bin/time", [flag, "/usr/bin/true"], { encoding: "utf8" });
    if (result.status === 0 && parseTimeOutput(result.stderr ?? "", kind) !== null) return { kind, flag };
  }
  return null;
}

export function runBuild({ steps = stages, reportPath = ".build-report.json", env = process.env, timer = detectTime() } = {}) {
  const temporary = mkdtempSync(join(tmpdir(), "catch-build-"));
  const started = performance.now();
  const rows = [];
  let exitCode = 0;
  try {
    for (const [stage, command, args, overrides] of steps) {
      const usagePath = join(temporary, "usage");
      const start = performance.now();
      const fd = timer ? openSync(usagePath, "w") : null;
      let result;
      try {
        result = timer
          ? spawnSync("/usr/bin/time", [timer.flag, "/bin/sh", "-c", 'exec "$@" 2>&3', "build-stage", command, ...args], {
            env: { ...env, ...overrides }, stdio: ["inherit", "inherit", fd, 2],
          })
          : spawnSync(command, args, { env: { ...env, ...overrides }, stdio: "inherit" });
      } finally {
        if (fd !== null) closeSync(fd);
      }
      const wallMs = performance.now() - start;
      let peakRssKiB = null;
      try {
        peakRssKiB = parseTimeOutput(readFileSync(usagePath, "utf8"), timer?.kind);
      } catch {}
      exitCode = result.status ?? 1;
      rows.push({ stage, wallMs, peakRssKiB, exitCode, signal: result.signal });
      if (result.error) console.error(result.error.message);
      if (exitCode) break;
    }
  } finally {
    const report = {
      stages: rows,
      total: { wallMs: performance.now() - started, peakRssKiB: rows.some((row) => row.peakRssKiB !== null) ? Math.max(...rows.map((row) => row.peakRssKiB ?? 0)) : null, exitCode },
      rssMethod: timer ? `${timer.kind} time maxRSS normalized to KiB, including waited-for children; maximum high-water mark, not concurrent RSS sum` : "unavailable (timing only)",
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
