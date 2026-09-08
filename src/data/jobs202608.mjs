// August 2026 jobs report: analysis content.
// Every figure traces to a source in data/sources/SOURCES.md: the pinned BLS release
// (bls-empsit-2026-08.txt, captured as served on September 4), the FRED PAYEMS, UNRATE,
// U6RATE, LNS11300060 and CES0500000003 series, the ALFRED first-print vintages, or the
// admitted coverage articles listed in the records section.

export const event = {
  slug: "jobs/august-2026",
  title: "Hiring snaps back: payrolls rise by 162,000, and July's loss becomes a gain",
  dek: "Forecasters expected about 53,000. The economy added three times that, restaurants and public schools led, and the July loss that opened this series was revised away to a gain of 21,000. The unemployment rate held at 4.1 percent.",
  name: "The August 2026 jobs report",
  span: "Reported September 4, 2026",
  date: "2026-09-04",
  updated: "2026-09-08",
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
