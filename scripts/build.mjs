import { spawnSync } from "node:child_process";
import { closeSync, mkdtempSync, openSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const stages = [
  ["pull-state", "node", ["scripts/pull-state.mjs"]],
  ["pull-v2", "node", ["scripts/pull-v2.mjs"]],
  ["build-news-records", "node", ["scripts/build-news-records.mjs"]],
  ["astro build", "astro", ["build"]],
  ["merge-cites", "node", ["scripts/merge-cites.mjs"]],
  ["work-evidence", "node", ["scripts/work-evidence.mjs"]],
  ["facts-claims", "node", ["scripts/facts-claims.mjs"]],
  ["check-events", "node", ["scripts/check-events.mjs"]],
  ["check-shell", "node", ["scripts/check-shell.mjs"]],
  ["check-design", "node", ["scripts/check-design.mjs"]],
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

export function runBuild({ steps = stages, reportPath = ".build-report.json", env = process.env, timer, temporaryRoot } = {}) {
  let warned = false;
  const reporting = (action, fallback = null) => {
    try { return action(); }
    catch (error) {
      if (!warned) {
        warned = true;
        try { console.warn(`Build reporting unavailable: ${error.message}`); } catch {}
      }
      return fallback;
    }
  };
  if (timer === undefined) timer = reporting(() => detectTime());
  const temporary = timer ? reporting(() => mkdtempSync(join(temporaryRoot ?? tmpdir(), "catch-build-"))) : null;
  if (!temporary) timer = null;
  const started = performance.now();
  const rows = [];
  let exitCode = 0;
  try {
    for (const [stage, command, args, overrides] of steps) {
      const usagePath = temporary ? join(temporary, "usage") : null;
      const start = performance.now();
      const fd = timer ? reporting(() => openSync(usagePath, "w")) : null;
      let result;
      try {
        result = fd !== null
          ? spawnSync("/usr/bin/time", [timer.flag, "/bin/sh", "-c", 'exec "$@" 2>&3', "build-stage", command, ...args], {
            env: { ...env, ...overrides }, stdio: ["inherit", "inherit", fd, 2],
          })
          : spawnSync(command, args, { env: { ...env, ...overrides }, stdio: "inherit" });
      } finally {
        if (fd !== null) reporting(() => closeSync(fd));
      }
      const wallMs = performance.now() - start;
      const peakRssKiB = fd !== null ? reporting(() => parseTimeOutput(readFileSync(usagePath, "utf8"), timer.kind)) : null;
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
    reporting(() => writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n"));
    reporting(() => console.table([...rows, { stage: "TOTAL", ...report.total }].map((row) => ({
      stage: row.stage, "wall (s)": (row.wallMs / 1000).toFixed(3),
      "peak RSS (MiB)": row.peakRssKiB === null ? "unavailable" : (row.peakRssKiB / 1024).toFixed(1), exit: row.exitCode,
    }))));
    if (temporary) reporting(() => rmSync(temporary, { recursive: true, force: true }));
  }
  return exitCode;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) process.exitCode = runBuild();
