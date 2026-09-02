// July 2026 jobs report: analysis content.
// Every figure traces to a source in data/sources/SOURCES.md: the pinned BLS release
// (bls-empsit-2026-07.html), the FRED PAYEMS and UNRATE series, or the admitted CNBC
// article identified in the records section.

export const event = {
  slug: "jobs/july-2026",
  title: "The job market goes into reverse: payrolls fall by 23,000",
  dek: "Forecasters expected a gain of 83,000. Instead the economy lost jobs, the two prior months were revised down by a combined 103,000, and the unemployment rate fell for the wrong reason: fewer people working or looking.",
  name: "The July 2026 jobs report",
  span: "Reported August 7, 2026",
  date: "2026-08-07",
  updated: "2026-08-31",
  kpis: [
    { value: "-23,000", unit: "", figure_unit: "jobs", period: "2026-07", label: "payrolls in July" },
    { value: "4.1", unit: "%", period: "2026-07", label: "unemployment rate" },
    { value: "-103,000", unit: "", figure_unit: "jobs", period: "2026-05..2026-06", label: "May + June, revised away" },
    { value: "5", unit: "of 12", label: "months negative in the past year" },
  ],
};

// Monthly change in total nonfarm payrolls, thousands, seasonally adjusted.
// Recomputed 2026-08-25 from data/sources/PAYEMS.csv (current vintage: values
// reflect BLS revisions through the July 2026 release).
export const payrollChanges = [
  { month: "2025-06", change: -20 },
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
  { month: "2026-06", change: 20 },
  { month: "2026-07", change: -23 },
];

// Payroll changes as FIRST PUBLISHED for each 2026 month versus the current
// estimate. First prints recomputed from data/sources/alfred-payems-vintages-2026.csv
// (ALFRED vintages dated just after each monthly release); current column from the
// 2026-08-11 vintage, which matches the July release and PAYEMS.csv.
export const revisionHistory = [
  { month: "January", first: 130, current: 160 },
  { month: "February", first: -92, current: -156 },
  { month: "March", first: 178, current: 214 },
  { month: "April", first: 115, current: 148 },
  { month: "May", first: 172, current: 63 },
  { month: "June", first: 57, current: 20 },
  { month: "July", first: -23, current: -23 },
];
