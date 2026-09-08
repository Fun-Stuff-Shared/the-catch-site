// Texas Senate MAGA Inc. independent expenditures, September 2026.
// Figures trace to pinned FEC, Texas Secretary of State, poll, and coverage files in data/sources/texas-senate/.
// $5,000,000 + $5,000,000 = $10,000,000 from FEC Form 24 file 2010907 Schedule E.
// Days from dissemination date 2026-09-05 to general election 2026-11-03: 59.
// 10,000,000 / 403,450,026.85 MAGA Inc. cash on hand July 31 = 2.48 percent.
// Talarico receipts 68,555,930.42 / Paxton receipts 9,248,698.53 = 7.4.
// Talarico unitemized 36,717,034.10 / individual 65,585,741.88 = 56.0 percent.
// Paxton unitemized 1,764,118.03 / individual 9,020,177.98 = 19.6 percent.
// Republican approve strongly 29 + somewhat 32 = 61 (UT/Texas Politics Project Q8D, August 2026).
// Trial ballot 42 - 39 = 3 points (same poll Q19).

export const event = {
  slug: "texas-senate/september-2026",
  title: "MAGA Inc. files $10 million in Texas Senate ads, split against Talarico and for Paxton",
  dek: "The Saturday 48-hour notice to the Federal Election Commission is two $5 million independent expenditures to Del Ray Media LLC for connected TV and digital ads. That $10 million is the filing, not an ad-tracking estimate, and it is not a contribution to Ken Paxton's campaign.",
  name: "Texas Senate ads",
  span: "September 5, 2026",
  date: "2026-09-05",
  updated: "2026-09-08",
  kpis: [
    { value: "$10", unit: "million", label: "independent expenditures, FEC 48-hour notice" },
    { value: "$5m / $5m", unit: "", label: "oppose Talarico / support Paxton" },
    { value: "$403.5", unit: "million", label: "MAGA Inc. cash on hand, July 31" },
    { value: "Nov. 3", unit: "", label: "Texas general election, 59 days from the ads" },
  ],
};

export const filing = {
  committee: "MAGA INC.",
  committeeId: "C00892471",
  fileNumber: 2010907,
  reportType: "48-hour notice",
  treasurer: "CHARLES GANTT",
  signed: "2026-09-05",
  payee: "DEL RAY MEDIA LLC",
  purpose: "PLACED MEDIA: CONNECTED TV & DIGITAL ADVERTISING",
  opposeTalarico: 5000000,
  supportPaxton: 5000000,
  total: 10000000,
  obligation: "2026-09-04",
  dissemination: "2026-09-05",
  election: "G2026",
  talaricoId: "S6TX00479",
  paxtonId: "S6TX00388",
};

export const magaCash = {
  coverageStart: "2026-07-01",
  coverageEnd: "2026-07-31",
  cashOnHandEnd: 403450026.85,
  receiptsPeriod: 3021896.04,
  disbursementsPeriod: 131658.17,
};

export const talarico = {
  receipts: 68555930.42,
  contributions: 65929150.12,
  individual: 65585741.88,
  unitemized: 36717034.10,
  disbursements: 47007775.34,
  cashOnHand: 21548155.08,
  coverageStart: "2025-09-08",
  coverageEnd: "2026-06-30",
};

export const paxton = {
  receipts: 9248698.53,
  contributions: 9239677.98,
  individual: 9020177.98,
  unitemized: 1764118.03,
  disbursements: 7492915.18,
  cashOnHand: 1755783.35,
  coverageStart: "2025-04-01",
  coverageEnd: "2026-06-30",
};

export const computed = {
  daysDisseminationToElection: 59, // 2026-11-03 minus 2026-09-05
  daysObligationToElection: 60, // 2026-11-03 minus 2026-09-04
  shareOfMagaCashPct: 2.48, // 100 * 10000000 / 403450026.85
  receiptsRatio: 7.4, // 68555930.42 / 9248698.53
  talaricoUnitemizedPct: 56.0, // 100 * 36717034.10 / 65585741.88
  paxtonUnitemizedPct: 19.6, // 100 * 1764118.03 / 9020177.98
  gopApprovePaxtonPct: 61, // 29 + 32
  pollGapPoints: 3, // 42 - 39
};

export const poll = {
  sponsor: "University of Texas / Texas Politics Project",
  fieldStart: "2026-08-05",
  fieldEnd: "2026-08-13",
  n: 1200,
  moeSample: 2.83,
  moeWeighted: 3.58,
  talarico: 42,
  paxton: 39,
  brown: 3,
  someoneElse: 1,
  noOpinion: 14,
};

export const calendar = {
  dissemination: "2026-09-05",
  obligation: "2026-09-04",
  certifyBy: "2026-08-28",
  earlyVotingStart: "2026-10-19",
  earlyVotingEnd: "2026-10-30",
  election: "2026-11-03",
};
