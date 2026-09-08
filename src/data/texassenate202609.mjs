// Texas Senate MAGA Inc. independent expenditures, September 2026.
// Figures trace to pinned FEC, Texas Secretary of State, poll, and coverage files in data/sources/texas-senate/.
// $5,000,000 + $5,000,000 = $10,000,000 from FEC Form 24 file 2010907 Schedule E.
// Days from dissemination date 2026-09-05 to general election 2026-11-03: 59.
// 10,000,000 / 403,450,026.85 MAGA Inc. cash on hand July 31 = 2.48 percent.
// Talarico receipts 68,555,930.42 / Paxton receipts 9,248,698.53 = 7.4 (FEC summary windows differ: Talarico 2025-09-08 to 2026-06-30, Paxton 2025-04-01 to 2026-06-30).
// Tribune tracker 72.0 / 16.8 = 4.2857 -> 4.3.
// Talarico unitemized 36,717,034.10 / individual 65,585,741.88 = 56.0 percent.
// Paxton unitemized 1,764,118.03 / individual 9,020,177.98 = 19.6 percent.
// Republican approve strongly 29 + somewhat 32 = 61 (UT/Texas Politics Project Q8D, August 2026).
// Statewide approve 14 + 19 = 33; disapprove 7 + 40 = 47 (same crosstabs).
// Trial ballot 42 - 39 = 3 points (same poll Q19).
// Independent-expenditure bulk file (15,363 rows, saved 2026-09-08): general-election (ele_type G)
// totals by committee for S6TX00479 and S6TX00388, keeping the highest file_num per
// (spe_id, cand_id, tran_id). Dedup dropped 5 of 263 Texas rows; G committee totals were unchanged.
// Texans for a Conservative Majority P 13,689,777.52 + R 11,580,380.19 = 25,270,157.71 opposing Paxton.
// MAGA Inc. Del Ray Media LLC, November 2025 Tennessee House special: eight rows sum to 1,211,668.00.
// CLF four Del Ray rows dated 31-AUG-26 sum to 1,134,768.75.

export const event = {
  slug: "texas-senate/september-2026",
  title: "MAGA Inc. files $10 million in Texas Senate ads, split against Talarico and for Paxton",
  dek: "The Saturday 48-hour notice to the Federal Election Commission is two $5 million independent expenditures to Del Ray Media LLC for connected TV and digital ads in the race for Sen. John Cornyn's seat. That $10 million is the filing, not an ad-tracking estimate, and it is not a contribution to Ken Paxton's campaign.",
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
  electionCode: "G2026",
  electionLabel: "2026 general election",
  talaricoId: "S6TX00479",
  paxtonId: "S6TX00388",
};

export const marchNotice = {
  fileNumber: 1952643,
  signed: "2026-03-11",
  payee: "ELECTORAL COMMUNICATIONS GROUP, LLC",
  purpose: "TEXT MESSAGES",
  candidate: "CLAY FULLER",
  office: "House, Georgia 14th district",
  electionCode: "S2026",
  electionLabel: "Special-General",
  line: 8950.44,
  total: 17900.88,
};

export const grahamNotice = {
  fileNumber: 2009583,
  signed: "2026-08-24",
  ytd: 827711.11,
};

export const magaCash = {
  coverageStart: "2026-07-01",
  coverageEnd: "2026-07-31",
  cashOnHandEnd: 403450026.85,
  receiptsPeriod: 3021896.04,
  disbursementsPeriod: 131658.17,
};

export const monthlyPayees = {
  pfeifferPublicAffairs: 7500,
  trumpNationalGolfClub: 24132.75,
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

export const tracker = {
  talaricoSince2025: 72.0,
  paxtonSince2025: 16.8,
};

export const fecDates = {
  octoberQuarterlyClose: "2026-09-30",
  octoberQuarterlyDue: "2026-10-15",
  preGeneralClose: "2026-10-14",
  preGeneralDue: "2026-10-22",
};

export const ieGeneral = {
  fileRows: 15363,
  saved: "2026-09-08",
  texasRowsRaw: 263,
  texasRowsDedup: 258,
  gRows: 165,
  magaOpposeTalarico: 5000000,
  magaSupportPaxton: 5000000,
  loneStarLibertyOpposeTalarico: 7720655,
  loneStarLibertySupportPaxton: 1751220,
  truthAndCourageOpposeTalarico: 1751968,
  americaPacOpposeTalarico: 1487645.67,
  americaPacSupportPaxton: 124595,
  loneStarRisingOpposePaxton: 1416599.96,
  loneStarRisingSupportTalarico: 709564.75,
  protectingAmericasFutureOpposeTalarico: 301848.62,
};

export const tcm = {
  primaryOpposePaxton: 13689777.52,
  runoffOpposePaxton: 11580380.19,
  primaryAndRunoff: 25270157.71,
};

export const delRay = {
  magaTennesseeNov2025Rows: 8,
  magaTennesseeNov2025: 1211668,
  clfAug31Rows: 4,
  clfAug31: 1134768.75,
};

export const computed = {
  daysDisseminationToElection: 59, // 2026-11-03 minus 2026-09-05
  daysObligationToElection: 60, // 2026-11-03 minus 2026-09-04
  shareOfMagaCashPct: 2.48, // 100 * 10000000 / 403450026.85
  receiptsRatio: 7.4, // 68555930.42 / 9248698.53; FEC windows differ (see talarico.coverageStart vs paxton.coverageStart)
  trackerRatio: 4.3, // 72.0 / 16.8 from tribune-tracker-2026-07-20
  talaricoUnitemizedPct: 56.0, // 100 * 36717034.10 / 65585741.88
  paxtonUnitemizedPct: 19.6, // 100 * 1764118.03 / 9020177.98
  gopApprovePaxtonPct: 61, // 29 + 32
  paxtonApproveStatewidePct: 33, // 14 + 19
  paxtonDisapproveStatewidePct: 47, // 7 + 40
  pollGapPoints: 3, // 42 - 39
};

export const poll = {
  sponsor: "University of Texas / Texas Politics Project",
  fieldStart: "2026-08-05",
  fieldEnd: "2026-08-13",
  interviewed: 1218,
  n: 1200,
  moeSample: 2.83,
  moeWeighted: 3.58,
  talarico: 42,
  paxton: 39,
  brown: 3,
  someoneElse: 1,
  noOpinion: 14,
  demTalarico: 91,
  gopPaxton: 79,
  indTalarico: 37,
  indPaxton: 11,
  indNoOpinion: 43,
  approveStrong: 14,
  approveSomewhat: 19,
  disapproveSomewhat: 7,
  disapproveStrong: 40,
};

export const calendar = {
  dissemination: "2026-09-05",
  obligation: "2026-09-04",
  certifyBy: "2026-08-28",
  earlyVotingStart: "2026-10-19",
  earlyVotingEnd: "2026-10-30",
  election: "2026-11-03",
};

// General-election outside money on file before the MAGA Inc. notice (ieGeneral rows other than MAGA Inc.):
// 7,720,655 + 1,751,220 + 1,751,968 + 1,487,645.67 + 124,595 + 1,416,599.96 + 709,564.75 + 301,848.62 = 15,264,097.00.
// Weeks of ads at Thune's $8 million a week: 10 / 8 = 1.25.
export const outsideMoney = {
  generalBeforeNotice: 15264097,
  weeksAtThuneRate: 1.25,
  // Positive bars: for Paxton or against Talarico. Negative bars: for Talarico or against Paxton. Millions.
  bars: [
    { label: "MAGA Inc.", value: 10.0 },
    { label: "Lone Star Liberty PAC", value: 9.47 },
    { label: "Truth and Courage", value: 1.75 },
    { label: "America PAC", value: 1.61 },
    { label: "Protecting Am. Future", value: 0.30 },
    { label: "Lone Star Rising", value: -2.13 },
  ],
};

// SB 2, 86th Legislature (2019): the property tax bill the ad refers to. House Journal record votes.
export const sb2 = {
  caption: "Relating to ad valorem taxation; authorizing fees.",
  passage: { date: "2019-05-01", record: 839, yeas: 109, nays: 36, talarico: "no" },
  conference: { date: "2019-05-25", record: 1939, yeas: 88, nays: 50, talarico: "no" },
  signed: "2019-06-12",
};

export const propertyVotes = {
  columns: ["Vote", "Date", "Tally", "Talarico"],
  rows: [
    ["2019 SB 2, House", "April 30, 2019", "107-40", "No"],
    ["2023 SB 2, third reading", "July 13, 2023", "133-4", "Yes"],
    ["2025 SB 4, third reading", "May 21, 2025", "143-0", "Yes"],
  ],
};

export const pollEnsemble = {
  columns: ["Poll", "Field", "Sample", "Talarico", "Paxton", "Margin"],
  rows: [
    ["UT / Texas Politics Project", "Aug 5 to 13", "1,200 registered", "42", "39", "2.83 / 3.58"],
    ["TPPF / Overton", "Aug 24 to 26", "1,167 likely", "44.0", "43.4", "2.9"],
    ["TPPF / Overton, with leaners", "Aug 24 to 26", "1,167 likely", "50.0", "50.0", "2.9"],
  ],
};

// MAGA Inc. C00892471 Form 3X Schedule A line 17 receipts, summed across the nine 2025-26 CSV files in data/sources/texas-senate/fec-maga-inc-f3x/.
export const magaDonors = {
  columns: ["Name on the reports", "Line 17 total"],
  rows: [
    ["Miriam Adelson", "$25.0 million"],
    ["Diane Hendricks", "$25.0 million"],
    ["Greg Brockman", "$25.0 million"],
    ["Foris DAX, Inc.", "$25.0 million"],
    ["Konstantin Sokolov", "$12.0 million"],
    ["Gemini Trust Company", "$11.5 million"],
    ["Tyler Winklevoss", "$10.0 million"],
    ["Cameron Winklevoss", "$10.0 million"],
    ["Securing American Greatness, Inc.", "$7.5 million"],
    ["JP Morgan Chase Bank, N.A.", "$6.8 million"],
    ["RAI Services Company", "$6.0 million"],
    ["a16z Capital Management LLC", "$6.0 million"],
    ["GEO Reentry Services LLC", "$4.4 million"],
  ],
  adelson: 25000000,
  hendricks: 25000000,
  brockman: 25000000,
  foris: 25000000,
  sokolov: 12000000,
  gemini: 11518449.91,
  tyler: 10023720.88,
  cameron: 10013208.94,
  sag: 7500000,
  jpmorgan: 6800003.01,
  rai: 6000000,
  a16z: 6000000,
  geo: 4413000,
};

export const timeline = [
  { date: "Sep 4", title: "MAGA Inc. commits $10 million to Del Ray Media LLC for the ads", sub: "the obligation date on the notice; the same day Trump says he has close to a billion dollars in the super PAC" },
  { date: "Sep 5", title: "The 48-hour notice is signed and the two ads go public", sub: "MAGA Inc., Paxton and Talarico post; AP, CBS, Fox, NBC, USA Today report it" },
  { date: "Sep 6", title: "The Hill carries Gina Hinojosa welcoming the attention on Texas", sub: "" },
  { date: "Sep 8", title: "Talarico posts an ad with former Paxton aide David Maxwell", sub: "a one-minute YouTube spot; a New York Times writeup the same day did not let its page be saved" },
  { date: "Sep 30", title: "Books close for the candidates' next FEC reports", sub: "due October 15" },
  { date: "Oct 14", title: "Books close for the pre-election reports", sub: "due October 22" },
  { date: "Oct 19", title: "Early voting in person begins", sub: "" },
  { date: "Nov 3", title: "Election day", sub: "59 days after the ads went public", current: true },
];

export function millions(n) {
  const v = n / 1e6;
  const digits = v >= 100 ? 0 : 1;
  return `$${v.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })} million`;
}

export function usd(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

event.visual = { kind: "table", title: "Talarico to Paxton in the two August polls", note: "Registered voters in the UT poll, likely voters in the TPPF poll; neither lead clears its margin of error", rows: pollEnsemble.rows.slice(0, 2).map(([poll, field, , t, p, margin]) => [`${t} to ${p}`, `${poll}, ${field}, margin ${margin.split(" / ").pop()} points`]).concat([["No leader", "both results sit inside their margins"]]) };
