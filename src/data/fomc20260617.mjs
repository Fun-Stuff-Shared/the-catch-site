// June 17, 2026 FOMC event: analysis content.
// Every figure traces to a source in data/sources/SOURCES.md.
// Computed values derive from the FRED series checked into data/sources/.

export const event = {
  slug: "fed-rate/june-2026",
  title: "Warsh's first unanimous vote, with half the committee penciling in a hike",
  dek: "The June 17 decision looked like calm: a 12–0 hold, a four-paragraph statement. The projections underneath flipped from a cut to a hike, and six weeks later the dissents arrived.",
  name: "The 2026 rate hold",
  span: "Ongoing since December 2025",
  date: "2026-06-17",
  updated: "2026-08-23",
  kpis: [
    { value: "3.50–3.75", unit: "%", label: "target range, unchanged" },
    { value: "188", unit: "days", label: "held at this level (at the meeting)", live: true },
    { value: "12–0", unit: "", label: "the vote" },
    { value: "48th", unit: "pctile", label: "of 44 years of policy" },
  ],
};

// Rate path: upper bound of the target range, change points only.
// Derived from FRED DFEDTARU (daily, checked into data/sources/DFEDTARU.csv).
export const ratePath = {
  start: { date: "2024-01-01", value: 5.5 },
  changes: [
    { date: "2024-09-19", value: 5.0 },
    { date: "2024-11-08", value: 4.75 },
    { date: "2024-12-19", value: 4.5 },
    { date: "2025-09-18", value: 4.25 },
    { date: "2025-10-30", value: 4.0 },
    { date: "2025-12-11", value: 3.75 },
  ],
  end: { date: "2026-06-17", value: 3.75 },
};

export const sources = [
  { id: "s1", name: "FOMC statement, June 17, 2026", url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm", kind: "primary" },
  { id: "s2", name: "FOMC minutes, June 17, 2026 (released July 8)", url: "https://www.federalreserve.gov/monetarypolicy/fomcminutes20260617.htm", kind: "primary" },
  { id: "s3", name: "Summary of Economic Projections, June 17, 2026", url: "https://www.federalreserve.gov/monetarypolicy/fomcprojtabl20260617.htm", kind: "primary" },
  { id: "s4", name: "Fed target range daily history, 1982–2026 (FRED DFEDTAR + DFEDTARU)", url: "https://fred.stlouisfed.org/series/DFEDTARU", kind: "official-data" },
  { id: "s5", name: "PCE price index (FRED PCEPI)", url: "https://fred.stlouisfed.org/series/PCEPI", kind: "official-data" },
  { id: "s6", name: "30-year mortgage average (Freddie Mac PMMS via FRED)", url: "https://fred.stlouisfed.org/series/MORTGAGE30US", kind: "official-data" },
  { id: "s7", name: "Unemployment rate (BLS via FRED UNRATE)", url: "https://fred.stlouisfed.org/series/UNRATE", kind: "official-data" },
  { id: "s8", name: "CNBC, decision-day report", url: "https://www.cnbc.com/2026/06/17/fed-interest-rate-decision-june-2026.html", kind: "outlet" },
  { id: "s9", name: "Fox Business, decision-day report", url: "https://www.foxbusiness.com/economy/federal-reserve-interest-rate-decision-june-17-2026", kind: "outlet" },
  { id: "s10", name: "TradingKey analysis, June 17", url: "https://www.tradingkey.com/analysis/economic/central-banks/261973912-fed-federal-fomc-2-economic-projections-decision-rates-tradingkey", kind: "outlet" },
  { id: "s11", name: "StockTitan, updated preview/report (June 16, updated June 22)", url: "https://www.stocktitan.net/articles/fed-rate-decision-june-17-2026", kind: "outlet" },
  { id: "s12", name: "CNBC, minutes report (July 8)", url: "https://www.cnbc.com/2026/07/08/fed-minutes-june-2026-.html", kind: "outlet" },
];

// Summary of Economic Projections, Table 1, read from the pinned accessible version
// (data/sources/fomcprojtabl20260617.txt). Medians, central tendencies, and ranges for
// the June 2026 round and the March 2026 round, per variable and horizon.
import { readFileSync } from "node:fs";

const SEP_PIN = `${process.cwd()}/data/sources/fomcprojtabl20260617.txt`;
const SEP_VARIABLES = [
  { key: "gdp", name: "Change in real GDP", horizons: ["2026", "2027", "2028", "Longer run"] },
  { key: "unemployment", name: "Unemployment rate", horizons: ["2026", "2027", "2028", "Longer run"] },
  { key: "pce", name: "PCE inflation", horizons: ["2026", "2027", "2028", "Longer run"] },
  { key: "corePce", name: "Core PCE inflation", horizons: ["2026", "2027", "2028"] },
  { key: "fedFunds", name: "Federal funds rate", horizons: ["2026", "2027", "2028", "Longer run"] },
];
const CELL = /^\d\.\d(?:–\d\.\d)?$/;

function readSep() {
  const lines = readFileSync(SEP_PIN, "utf8").split(/\r?\n/).map((s) => s.trim());
  const start = lines.findIndex((l) => l.startsWith("Table 1. Economic projections"));
  if (start < 0) throw new Error("SEP pin: Table 1 not found");
  const cellsAfter = (i, count) => {
    const out = [];
    let j = i + 1;
    while (out.length < count) {
      const l = lines[j++];
      if (l === undefined) throw new Error(`SEP pin: ran out of cells after line ${i + 1}`);
      if (/^\d$/.test(l)) continue;
      if (!CELL.test(l)) throw new Error(`SEP pin: unexpected cell "${l}" at line ${j}`);
      out.push(l);
    }
    return { cells: out, next: j - 1 };
  };
  const round = (i, horizons) => {
    const k = horizons.length;
    const { cells } = cellsAfter(i, 3 * k);
    const pick = (offset) => Object.fromEntries(horizons.map((h, n) => [h, cells[offset + n]]));
    return { median: pick(0), centralTendency: pick(k), range: pick(2 * k) };
  };
  const out = {};
  for (const v of SEP_VARIABLES) {
    const i = lines.indexOf(v.name, start);
    if (i < 0) throw new Error(`SEP pin: variable "${v.name}" not found`);
    const m = lines.indexOf("March projection", i);
    out[v.key] = { name: v.name, june: round(i, v.horizons), march: round(m, v.horizons) };
  }
  return out;
}

export const sep = readSep();

const shift = (march, june) => {
  const d = Math.round((Number(june) - Number(march)) * 10) / 10;
  if (d === 0) return "unchanged";
  return `${d > 0 ? "+" : "−"}${Math.abs(d).toFixed(1)}`;
};
const sepRow = (label, key, horizon, note) => {
  const march = sep[key].march.median[horizon];
  const june = sep[key].june.median[horizon];
  const d = Math.round((Number(june) - Number(march)) * 10) / 10;
  return { label, march, june, shift: shift(march, june), note, highlight: Boolean(note) || Math.abs(d) >= 0.9 };
};

// The rows the story shows: medians, March round against June round.
export const sepTable = [
  sepRow("Fed funds rate, end of 2026", "fedFunds", "2026", "cut → hike"),
  sepRow("Fed funds rate, end of 2027", "fedFunds", "2027"),
  sepRow("Fed funds rate, end of 2028", "fedFunds", "2028"),
  sepRow("Fed funds rate, longer run", "fedFunds", "Longer run"),
  sepRow("PCE inflation, 2026", "pce", "2026"),
  sepRow("Core PCE inflation, 2026", "corePce", "2026"),
  sepRow("Real GDP growth, 2026", "gdp", "2026"),
  sepRow("Unemployment rate, 2026 Q4", "unemployment", "2026"),
];
