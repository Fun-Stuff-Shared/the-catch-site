// September 2026 Employment Situation, published October 2, 2026.
// Levels and monthly changes are arithmetic on data/sources/PAYEMS-2026-10-03.csv
// (thousands of jobs, seasonally adjusted). The release's own sentences are quoted
// from data/sources/bls-empsit-2026-09.txt. Wage percents are arithmetic on
// data/sources/CES0500000003-2026-10-03.csv.

export const event = {
  slug: "jobs/2026-10-02-september-payrolls-rise-29000",
  title: "Payrolls rose by an estimated 29,000 in September, a change too small for the survey to tell from none",
  dek: "Economists surveyed by Reuters expected payrolls to rise by 90,000. The Bureau of Labor Statistics said payrolls and the 4.2 percent unemployment rate both changed little. July and August together are 60,000 lower than previously reported.",
  name: "The September 2026 jobs report",
  span: "Published October 2, 2026",
  date: "2026-10-02",
  updated: "2026-10-03",
  visual: {
    kind: "payrolls",
    source: "fred-payems-2026-10-03",
    from: "2025-10-01",
    to: "2026-09-01",
    latest: "September",
    range: "October 2025 to September 2026",
    rangeCompact: "March to September 2026",
  },
  kpis: [
    { value: "+29,000", unit: "", figure_unit: "jobs", period: "2026-09", label: "payrolls in September" },
    { value: "4.2", unit: "%", period: "2026-09", label: "unemployment rate" },
    { value: "60,000", unit: "lower", figure_unit: "jobs", period: "2026-07..2026-08", label: "July and August, revised" },
  ],
};

// Monthly change, thousands, seasonally adjusted. Each value is that month's
// PAYEMS level minus the previous month's level in PAYEMS-2026-10-03.csv.
export const payrollChanges = [
  { month: "2025-10", change: -140 },
  { month: "2025-11", change: 41 },
  { month: "2025-12", change: -17 },
  { month: "2026-01", change: 160 },
  { month: "2026-02", change: -156 },
  { month: "2026-03", change: 214 },
  { month: "2026-04", change: 148 },
  { month: "2026-05", change: 63 },
  { month: "2026-06", change: 31 },
  { month: "2026-07", change: -10 },
  { month: "2026-08", change: 133 },
  { month: "2026-09", change: 29 },
];

// 159,044 minus 159,015, the September and August levels in PAYEMS-2026-10-03.csv.
export const septemberPayrollChange = 29;

// Levels in thousands from PAYEMS-2026-10-03.csv.
export const payrollLevels = { august: 159015, september: 159044 };

// Sum of the twelve changes from October 2025 through September 2026, divided by 12.
// 496 / 12 = 41.333 thousand. The release's "prior 12 months" stops before September:
// September 2025 through August 2026 sums to 543, and 543 / 12 = 45.25 thousand.
// The release states that average as 45,000.
export const averages = {
  last12: 41.333,
  prior12: 45.25,
  prior12AsReleased: 45,
  last3: 50.667,
  last3AsReleased: 51,
  year2026: 68,
  negativeMonthsLast12: 4,
};

// July was revised by 31,000 and August by 29,000. 31 + 29 = 60. The release states
// the same combined figure. First-reported changes are the ones the September release
// names, not a separate vintage file.
export const revisions = {
  julyFrom: 21,
  julyTo: -10,
  julyRevision: -31,
  augustFrom: 162,
  augustTo: 133,
  augustRevision: -29,
  combined: -60,
};

export const revisionColumns = ["Month", "Previously reported", "September release"];
export const revisionRows = [
  ["July", "+21,000", "-10,000"],
  ["August", "+162,000", "+133,000"],
  ["Two months combined", "", "60,000 lower"],
];

// Household survey, summary table A of the September release. Counts are thousands.
export const household = {
  unemploymentRate: 4.2,
  unemployedThousands: 7109,
  laborForceChange: 485,
  employmentChange: 406,
  participation: 61.8,
  employmentPopulation: 59.2,
  blackRate: 7.0,
  longTermUnemployedMillions: 1.9,
  longTermShare: 27.1,
  partTimeEconomicMillions: 4.5,
  marginallyAttachedChange: -236,
  discouragedThousands: 414,
};

// Table A-9, seasonally adjusted September column. The table is in thousands.
export const multipleJobholders = { september: 8986, august: 8805, percentOfEmployed: 5.5 };

// Establishment survey sentences and summary table B.
export const establishment = {
  healthCare: 17,
  healthCarePriorAverage: 33,
  ambulatory: 13,
  hospitals: 12,
  nursing: -9,
  construction: 11,
  manufacturing: 9,
  financialActivities: -7,
  financialSinceMay2025: -129,
  private: 46,
  government: -17,
  information: -10,
  temporaryHelp: -10.9,
  diffusionPrivate: 49.0,
  diffusionAugust: 57.6,
  hourlyEarnings: 37.81,
  hourlyCents: 5,
  hourlyYearPercent: 3.0,
  workweek: 34.4,
  significanceThreshold: 122,
  prior12Average: 45,
  threeMonthAverage: 51,
};

// Year-over-year percent, CES0500000003-2026-10-03.csv.
// September: 100 * (37.81 / 36.70 - 1) = 3.0245, rounded to 3.02.
// The release states the same change as 3.0 percent.
export const wageGrowth = [
  { month: "2026-02", yoy: 3.7 },
  { month: "2026-03", yoy: 3.43 },
  { month: "2026-04", yoy: 3.57 },
  { month: "2026-05", yoy: 3.34 },
  { month: "2026-06", yoy: 3.38 },
  { month: "2026-07", yoy: 3.21 },
  { month: "2026-08", yoy: 3.11 },
  { month: "2026-09", yoy: 3.02 },
];

// LNS11300060-2026-10-03.csv, prime-age (25 to 54) labor force participation.
export const primeAgeParticipation = { september: 83.7, august: 83.4, july: 83.4 };

// Figures admitted with the story, each the number its pin states.
// householdSignificance: "about 650,000" in bls-empsit-2026-09.txt, in thousands here.
// adpSeptember: "90,000 jobs" in adp-september-2026.txt, in thousands here.
// apYear2025: "9,700 average new jobs" in coverage/ap-september-jobs.txt, in jobs.
// blackYearEarlier, blackJuly, blackAugust, and blackMonthChange: summary table A, Black or African American row.
// unemployedChange: summary table A, Unemployed row, change from August, in thousands.
export const admitted = {
  householdSignificance: 650,
  adpSeptember: 90,
  pceAugust: 3.4,
  joltsHiresMillions: 5.2,
  unroundedAugust: "4.141",
  unroundedSeptember: "4.175",
  apYear2025: 9700,
  reutersSurvey: 90000,
  reutersLow: 35000,
  reutersHigh: 180000,
  augustUnemployment: 4.1,
  blackYearEarlier: 7.6,
  blackJuly: 6.3,
  blackAugust: 6.0,
  blackMonthChange: 1.0,
  unemployedChange: 78,
};

// U6RATE-2026-10-03.csv. The release's table A-15 prints the same September rate.
export const u6 = { september: 7.6, august: 7.7 };

// Surveys named in coverage, not bureau figures.
export const surveys = {
  dowJonesJobs: 84,
  dowJonesRate: 4.1,
  reutersJobs: 90,
  factsetJobs: 90,
};

export const chronology = [
  {
    date: "September 4, 2026",
    title: "August report: payrolls up 162,000, unemployment rate 4.1 percent",
    link: "/events/jobs/2026-09-04-august-payrolls-rise-162000/",
  },
  {
    date: "October 1, 2026",
    title: "Before the release, economists surveyed by Dow Jones expected 84,000 jobs and a 4.1 percent rate",
  },
  {
    date: "October 2, 2026",
    title: "Before 8:30 a.m. Eastern, economists surveyed by Reuters expected 90,000 jobs and a 4.1 percent rate",
  },
  {
    date: "October 2, 2026, 8:30 a.m. Eastern",
    title: "The bureau publishes the September report: payrolls up 29,000, unemployment rate 4.2 percent",
    current: true,
  },
  {
    date: "November 6, 2026, 8:30 a.m. Eastern",
    title: "Next Employment Situation, for October",
  },
];
