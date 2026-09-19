import { readFileSync } from "node:fs";
import { join } from "node:path";

const source = (name) => readFileSync(join(process.cwd(), "data/sources/fed-rate", name), "utf8");
const rows = (name, field) => source(name).trim().split(/\r?\n/).slice(1).flatMap((line) => {
  const [date, raw] = line.split(",");
  const value = Number(raw);
  return date && Number.isFinite(value) ? [{ date, value, field }] : [];
});
const daysBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

const oldTarget = rows("DFEDTAR-2026-09-19.csv", "DFEDTAR");
const upperTarget = rows("DFEDTARU-2026-09-19.csv", "DFEDTARU");
const history = [...oldTarget, ...upperTarget];
const decisionDate = "2026-09-16";
const effectiveDate = "2026-09-17";
const range = { lower: 3.75, upper: 4 };
const midpoint = (range.lower + range.upper) / 2;
const upperChanges = upperTarget.filter((row, index) => index > 0 && row.value !== upperTarget[index - 1].value);
const priorChange = [...upperChanges].reverse().find((row) => row.date < effectiveDate);
const below = history.filter((row) => row.value < midpoint).length;
const equal = history.filter((row) => row.value === midpoint).length;
const percentile = ((below + equal / 2) / history.length) * 100;

const pathRows = upperTarget.filter((row) => row.date >= "2024-01-01" && row.date <= "2026-09-19");
const startRow = pathRows[0];
const changes = upperChanges.filter((row) => row.date >= startRow.date && row.date <= "2026-09-19");

const statementLines = (name) => source(name).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
const july = statementLines("fomc-statement-2026-07-29.txt");
const september = statementLines("fomc-statement-2026-09-16.txt");
const line = (lines, prefix) => lines.find((entry) => entry.startsWith(prefix)) ?? "Not present";
const vote = line(september, "The Federal Open Market Committee approved").match(/(\d+)\s*[–-]\s*(\d+)/)?.slice(1).map(Number) ?? [];

export const computed = {
  observationCount: history.length,
  lowerThanCurrentMidpoint: below,
  equalToCurrentMidpoint: equal,
  currentMidpoint: midpoint,
  currentPercentile: Number(percentile.toFixed(1)),
  priorRangeDays: daysBetween(priorChange.date, decisionDate),
  priorRangeStart: priorChange.date,
  voteFor: vote[0],
  voteAgainst: vote[1],
};

export const event = {
  slug: "fed-rate/2026-09-16-unanimous-quarter-point-hike",
  title: "Fed raises rates a quarter point on a unanimous vote",
  dek: "The quarter-point increase cannot lower oil prices. It targets demand and the spread of the energy shock, with the quickest effects reaching variable-rate borrowers and savers.",
  name: "September 2026 rate increase",
  date: decisionDate,
  updated: "2026-09-19",
  kpis: [
    { value: `${range.lower}–${range.upper.toFixed(2)}`, unit: "%", label: "new target range" },
    { value: `${computed.voteFor}–${computed.voteAgainst}`, label: "committee vote" },
    { value: 3.9, unit: "%", label: "August gasoline increase" },
    { value: 4.1, unit: "%", label: "median 2026 rate projection" },
  ],
  visual: {
    kind: "table",
    title: "The September decision",
    rows: [
      [`${range.lower}–${range.upper.toFixed(2)}%`, "target range"],
      [`${computed.voteFor}–${computed.voteAgainst}`, "committee vote"],
      ["September 17", "effective date"],
    ],
    note: "Federal Reserve records",
  },
};

export const decision = {
  sizeBasisPoints: 25,
  range,
  effectiveDate,
  julyRange: { lower: 3.5, upper: 3.75 },
  julyVote: { forHold: 9, forIncrease: 3 },
};

export const inflation = {
  augustGasolineChange: 3.9,
  augustGasolineShare: "more than one-third",
  augustCoreCpiAnnual: 2.4,
};

export const growth = {
  secondQuarterGdp: 1.5,
  firstQuarterGdp: 2.1,
  secondQuarterPrivateDomesticSales: 4.2,
};

export const projections = {
  june2026Median: 3.8,
  september2026Median: 4.1,
  september2027Median: 4.1,
  participantCount: 18,
  oneMoreIncrease: 12,
  twoMoreIncreases: 4,
  noMoreIncrease: 2,
};

export const ratePath = {
  start: { date: startRow.date, value: startRow.value },
  changes: changes.map(({ date, value }) => ({ date, value })),
  end: { date: "2026-09-19", value: upperTarget.at(-1).value },
};

export const voteRows = [
  ["For the quarter-point increase", computed.voteFor],
  ["Against", computed.voteAgainst],
];

export const statementRows = [
  ["Vote", line(july, "The Federal Open Market Committee approved"), line(september, "The Federal Open Market Committee approved")],
  ["Rate decision", line(july, "The Committee decided"), line(september, "The Committee decided")],
  ["Economy", line(july, "Economic activity"), line(september, "Economic activity")],
  ["Inflation", line(july, "Inflation remains"), line(september, "Inflation remains")],
  ["Dissents", line(july, "Voting against"), line(september, "Voting against")],
];

// Table 1 medians in the September Summary of Economic Projections.
export const projectionRows = [
  ["Real GDP growth", 2.3, 2.4, 2.2, 2.1, 2.0],
  ["Unemployment rate", 4.1, 4.1, 4.1, 4.1, 4.2],
  ["PCE inflation", 3.7, 2.3, 2.1, 2.0, 2.0],
  ["Core PCE inflation", 3.4, 2.5, 2.2, 2.0, "not collected"],
  ["Federal funds rate", 4.1, 4.1, 3.9, 3.6, 3.2],
];

export const chronologyRows = [
  ["July 29", "The committee holds at 3.50–3.75 percent in a 9–3 vote; three members prefer a quarter-point increase."],
  ["September 16, 2 p.m.", "The committee raises the range to 3.75–4 percent in a 12–0 vote and releases new projections."],
  ["September 16, 2:30 p.m.", "Chair Kevin Warsh holds a press conference and says the committee is not providing forward guidance."],
  ["September 17", "The new target range, reserve-balance rate and primary-credit rate take effect."],
];

export const seriesReceipt = {
  oldCount: oldTarget.length,
  rangeCount: upperTarget.length,
  combinedCount: history.length,
  start: history[0].date,
  end: history.at(-1).date,
  priorRangeStart: priorChange.date,
  decisionDate,
  effectiveDate,
  formula: `(values below ${midpoint} + half of values equal to ${midpoint}) / ${history.length}`,
};
