// S&P 500 closes from AP's daily index tables (ap-indexes-2026-11-03 through -13); the claim each comes from is named.
// Nov. 11 has no admitted table: its close is Nov. 12's close plus Nov. 12's 26.98-point fall (claim sp-nov12).
export const closes = [
  { date: "2026-11-03", label: "Tue 3", value: 7568.92, c: "sp-election-day-close" },
  { date: "2026-11-04", label: "Wed 4", value: 7688.62, c: "wednesday-best-day" },
  { date: "2026-11-05", label: "Thu 5", value: 7353.73, c: "sp-thursday-fall" },
  { date: "2026-11-06", label: "Fri 6", value: 7376.86, c: "sp-friday" },
  { date: "2026-11-09", label: "Mon 9", value: 7549.94, c: "sp-monday-nov9" },
  { date: "2026-11-10", label: "Tue 10", value: 7520.93, c: "sp-nov10" },
  { date: "2026-11-11", label: "Wed 11", value: Math.round((7592.4 + 26.98) * 100) / 100, c: "sp-nov12" },
  { date: "2026-11-12", label: "Thu 12", value: 7592.4, c: "sp-nov12" },
  { date: "2026-11-13", label: "Fri 13", value: 7561.67, c: "sp-nov13" },
];

// Marks on the chart: where each falls between trading days (index into closes, fractional for a weekend).
export const marks = [
  { at: 0, text: "Election Day", c: "sp-election-day-close" },
  { at: 2, text: "Trump: “crashed today because the Dumocrats”", c: "trump-dumocrats" },
  { at: 3.5, text: "Trump: “one day, 3 Trillion Dollar loss”", c: "trump-nov8-post" },
];

const pct = (a, b) => Math.round(((b - a) / a) * 1000) / 10;

export const n = {
  thursdayPct: 4.4,
  dowPoints: "1,833",
  sp500Loss: "2.9",
  sp1500Loss: "3.2",
  wilshirePct: pct(76621.02, 73264.75) * -1,
  wedPct: 1.6,
  nvidiaWed: 3.1,
  micronWed: 7,
  cloudWed: 6,
  texasShare: 27,
  ballotFor: 40,
  ballotAll: 41,
  qualcommThu: 9,
  chipIndexThu: 12,
  etfSold: 60,
  etfTech: 90,
  chipSinceOct: 30,
  electionClose: "7,568.92",
  nov13Close: "7,561.67",
  nov13Gap: Math.abs(pct(7568.92, 7561.67)),
};

export const event = {
  slug: "midterms-2026/2026-11-07-trump-election-3-trillion-market-loss",
  title: "Stocks did lose $3 trillion after the election, led by AI data-center stocks",
  dek: "Trump blamed Democrats. The stocks that fell most were tied to AI data centers, which some winners, including Texas's governor-elect, had promised to pause or restrict.",
  name: "Trump's $3 trillion election stock loss",
  date: "2026-11-07",
  updated: "2026-11-15",
  kpis: [],
};
