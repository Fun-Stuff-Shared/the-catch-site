// Every date and amount here is printed on an admitted record.
// Directive 26-12 is dated Oct. 1 (directive-26-12-2026-10-01); the program was announced Oct. 20 (doj-release-2026-10-20).
// Trump's example is 1 percent of $1 billion (factbase-transcript-2026-10-20); Treasury's commitment is $25 million (doj-release-2026-10-20).
const DAY = 86400000;
const daysBetween = (start, end) => Math.round((Date.parse(end) - Date.parse(start)) / DAY);

export const computed = {
  daysDirectiveToLaunch: daysBetween("2026-10-01", "2026-10-20"),
  onePctOfBillionMillions: (1000 * 1) / 100,
  poolMillions: 25,
  capMillions: 3,
  maxAward: "$30,000",
};

export const event = {
  slug: "fraud-tip-program/2026-10-20-trump-launches-25-million-fraud-tip-program",
  title: "Trump says fraud tipsters get 1% with no limit. The written rules offer up to $30,000.",
  dek: "The Justice Department's $25 million program offers awards when a tip about health care or benefits fraud leads to criminal charges, and the department alone decides who gets one.",
  name: "Trump's 1% and the fraud tip program's written rules",
  date: "2026-10-20",
  updated: "2026-10-24",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "From the Minnesota charges to the program",
    entries: [
      { date: "2022", title: "Feeding Our Future charges begin" },
      { date: "Dec. 26, 2025", title: "Shirley posts his day care video" },
      { date: "Oct. 1, 2026", title: "Fraud division orders a whistleblower program" },
      { date: "Oct. 20, 2026", title: "Program announced; Trump describes 1% with no limit", current: true },
    ],
  },
};

export const versions = [
  { point: "How much", trump: "trump-1pct-no-limit", terms: "terms-amount-at-charging" },
  { point: "When it pays", trump: "trump-no-charges", terms: "terms-charges-defined" },
  { point: "Who decides", trump: "trump-arbitrator", terms: "terms-sole-discretion" },
];

export const triggers = [
  { who: "A White House official, before the event", c: "wh-official-preview" },
  { who: "Vance, at the Oval Office event, October 20", c: "vance-not-only-prosecutions" },
  { who: "Vance's office, October 21", c: "vance-post-conviction" },
  { who: "america.gov/fraud, the reporting site", c: "portal-charges-or-recovery" },
  { who: "Treasury's post, the evening of October 20", c: "treasury-repeats-range" },
  { who: "The Justice Department's written terms", c: "terms-charges-defined" },
];

export const timeline = [
  { date: "2022", c: "fof-charges-since-2022" },
  { date: "Feb. 2024", c: "abdi-2024-names-center" },
  { date: "Dec. 26, 2025", c: "shirley-video-date" },
  { date: "Feb. 2026", c: "mahamud-charged-feb" },
  { date: "May 20, 2026", c: "mahamud-indicted-may" },
  { date: "July 9, 2026", c: "mahamud-plea-july" },
  { date: "Oct. 20, 2026", c: "doj-launched-whip" },
  { date: "Oct. 20, 2026", c: "shirley-10k-announced", current: true },
];
