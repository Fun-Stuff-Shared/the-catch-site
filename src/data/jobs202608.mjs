// August 2026 jobs report: analysis content.
// Every figure traces to a source in data/sources/SOURCES.md: the pinned BLS release
// (bls-empsit-2026-08.txt, captured as served on September 4), the FRED PAYEMS, UNRATE,
// U6RATE, LNS11300060 and CES0500000003 series, the ALFRED first-print vintages, or the
// admitted coverage articles listed in the records section.

export const event = {
  slug: "jobs/august-2026",
  title: "Payrolls rise by 162,000 and July's loss becomes a gain, with two volatile categories supplying 101,000 of it",
  dek: "Forecasters expected 53,000 to 65,000. The employer survey estimated payrolls rose by 162,000, two and a half to three times those forecasts. Restaurants and public schools supplied 101,000 of the gain, and the July loss that opened this series was revised to a gain of 21,000. The unemployment rate held at 4.1 percent.",
  name: "The August 2026 jobs report",
  span: "Reported September 4, 2026",
  date: "2026-09-04",
  updated: "2026-09-08",
  visual: { kind: "payrolls", source: "fred-payems-2026-08", from: "2025-07-01", to: "2026-08-01", latest: "August", range: "July 2025–August 2026", rangeCompact: "February–August 2026" },
  kpis: [
    { value: "+162,000", unit: "", figure_unit: "jobs", period: "2026-08", label: "payrolls in August" },
    { value: "4.1", unit: "%", period: "2026-08", label: "unemployment rate" },
    { value: "+55,000", unit: "", figure_unit: "jobs", period: "2026-06..2026-07", label: "June + July, revised up" },
    { value: "3", unit: "of 12", label: "months negative in the past year" },
  ],
};

// Monthly change in total nonfarm payrolls, thousands, seasonally adjusted.
// Recomputed 2026-09-08 from data/sources/PAYEMS.csv (current vintage: values reflect
// BLS revisions through the August 2026 release).
export const payrollChanges = [
  { month: "2025-07", change: 64 },
  { month: "2025-08", change: -70 },
  { month: "2025-09", change: 76 },
  { month: "2025-10", change: -140 },
  { month: "2025-11", change: 41 },
  { month: "2025-12", change: -17 },
  { month: "2026-01", change: 160 },
  { month: "2026-02", change: -156 },
  { month: "2026-03", change: 214 },
  { month: "2026-04", change: 148 },
  { month: "2026-05", change: 63 },
  { month: "2026-06", change: 31 },
  { month: "2026-07", change: 21 },
  { month: "2026-08", change: 162 },
];

// Averages recomputed 2026-09-08 from data/sources/PAYEMS.csv (thousands per month).
export const averages = {
  last3: 71.3,
  last12: 50.2,
  year2026: 80.4,
  year2025: 9.7,
  years2023to2024: 165.6,
  year2021: 605.7,
  year2022: 377.2,
};

// Payroll changes as FIRST PUBLISHED for each 2026 month versus the current estimate.
// First prints from data/sources/alfred-payems-vintages-2026.csv (January to July) and
// data/sources/alfred-payems-2026-09-04.csv (August); current column from
// data/sources/PAYEMS.csv as of the August release.
export const revisionHistory = [
  { month: "January", first: 130, current: 160 },
  { month: "February", first: -92, current: -156 },
  { month: "March", first: 178, current: 214 },
  { month: "April", first: 115, current: 148 },
  { month: "May", first: 172, current: 63 },
  { month: "June", first: 57, current: 31 },
  { month: "July", first: -23, current: 21 },
  { month: "August", first: 162, current: 162 },
];

// Year-over-year change in average hourly earnings, all private employees, percent.
// Recomputed 2026-09-08 from data/sources/CES0500000003.csv.
export const wageGrowth = [
  { month: "2026-03", yoy: 3.43 },
  { month: "2026-04", yoy: 3.57 },
  { month: "2026-05", yoy: 3.34 },
  { month: "2026-06", yoy: 3.38 },
  { month: "2026-07", yoy: 3.24 },
  { month: "2026-08", yoy: 3.09 },
];

// Added after the external completeness review of 2026-09-09.

// How far the estimate ran past the published forecasts, from the same release day:
// 162 / 65 = 2.49 (FactSet), 162 / 56 = 2.89 (Reuters), 162 / 53 = 3.06 (Dow Jones and
// The Wall Street Journal). Rounded to one decimal for the page.
export const forecastMultiples = { low: 2.5, high: 3.1 };

// Share of the August payroll gain from restaurants and bars plus local government
// education: (59 + 42) / 162 = 0.6235, rounded to whole percent.
export const volatileShare = 62;

// People holding more than one job, from table A-9 of the August release
// (data/sources/bls-empsit-t09-2026-08.txt). Thousands. The percent is the release's own
// "Percent of total employed" line, not a recomputation.
export const multipleJobholders = { august: 8805, july: 8693, percentOfEmployed: 5.4, unadjustedAugust: 8505 };

// The two readings published on September 8, four days after the report.
// Employment Trends Index from data/sources/coverage/conference-board-eti-2026-08.txt;
// the survey figures from data/sources/nyfed-sce-2026-08.txt. The index change is
// 108.53 - 107.76 = 0.77.
export const sept8 = {
  etiJuly: 107.76,
  etiAugust: 108.53,
  etiChange: 0.77,
  unemploymentUp: 44.4,
  findJob: 45.4,
  loseJob: 13.8,
  quit: 19.5,
};
