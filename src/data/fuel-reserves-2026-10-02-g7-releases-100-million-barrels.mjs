// Prices are read as integer thousandths or cents from the pinned rows, then subtracted.
// Diesel: data/sources/fuel-reserves/eia-diesel-price-2026-10-06.txt
//   10/05 6.199  09/28 6.382  09/21 6.529  03/02 3.897
// Brent: data/sources/fuel-reserves/DCOILBRENTEU-2026-10-03.csv
//   2026-09-29,113.96  2026-02-27,71.32
// WTI: data/sources/fuel-reserves/DCOILWTICO-2026-10-03.csv
//   2026-09-29,96.16  2026-02-27,66.96

const dieselOct5 = 6199;
const dieselSep28 = 6382;
const dieselSep21 = 6529;
const dieselMar2 = 3897;
const brentSep29 = 11396;
const brentFeb27 = 7132;
const wtiSep29 = 9616;
const wtiFeb27 = 6696;

const thousandths = (n) => (n / 1000).toFixed(3);
const cents = (n) => (n / 100).toFixed(2);
const percent = (from, to) => (Math.round(((to - from) / from) * 1000) / 10).toFixed(1);

export const prices = {
  dieselOct5: thousandths(dieselOct5),
  dieselSep28: thousandths(dieselSep28),
  dieselSep21: thousandths(dieselSep21),
  dieselMar2: thousandths(dieselMar2),
  dieselFromMarchPercent: percent(dieselMar2, dieselOct5),
  brentSep29: cents(brentSep29),
  brentFeb27: cents(brentFeb27),
  brentFromFebruaryPercent: percent(brentFeb27, brentSep29),
  wtiSep29: cents(wtiSep29),
  wtiFeb27: cents(wtiFeb27),
  wtiFromFebruaryPercent: percent(wtiFeb27, wtiSep29),
};

export const release = {
  barrels: "100 million",
  months: "four months",
  dieselDays: "20 days",
  marchTotal: "400 million",
  usMarch: "172 million",
  exchange: "40 million",
  premium: "25 percent",
};

// IEA account of October 2 and statement of October 7: barrels of the March action released.
// data/sources/fuel-reserves/iea-g7-meeting-2026-10-02.txt, iea-member-meeting-2026-10-07.txt
export const marchSoFar = {
  barrels: "325 million",
  remaining: "100 million",
};

// U.S. exchange awards, in thousands of barrels, from the DOE award notices.
// doe-spr-award-2026-03-20 (45.2 million), -04-10 (8.5 million), -04-17 (26 million),
// -05-11 (53.3 million, award sheet 53,330,000), -06-22 (500,000).
const awards = [
  { date: "Mar 20", thousand: 45200, record: "doe-spr-award-2026-03-20" },
  { date: "Apr 10", thousand: 8500, record: "doe-spr-award-2026-04-10" },
  { date: "Apr 17", thousand: 26000, record: "doe-spr-award-2026-04-17" },
  { date: "May 11", thousand: 53300, record: "doe-spr-award-2026-05-11" },
  { date: "Jun 22", thousand: 500, record: "doe-spr-award-2026-06-22" },
];
const awardedThousand = awards.reduce((sum, a) => sum + a.thousand, 0);
const usShareThousand = 172000;
const millions = (thousand) => `${(thousand / 1000).toFixed(1).replace(/\.0$/, "")} million`;

// Weekly crude in the reserve, thousand barrels.
// data/sources/fuel-reserves/eia-spr-stocks-2026-10-07.txt: 03/20 415,442 and 10/02 282,983.
const sprMar20 = 415442;
const sprOct2 = 282983;

export const usShare = {
  awarded: millions(awardedThousand),
  left: millions(usShareThousand - awardedThousand),
  sprMar20: millions(sprMar20),
  sprOct2: millions(sprOct2),
  sprDrop: millions(sprMar20 - sprOct2),
};

// March country table, million barrels, total line.
// data/sources/fuel-reserves/iea-contributions-table-2026-03-19.txt
export const marchTable = {
  total: "426.0",
  publicStocks: "279.8",
  industryStocks: "118.6",
  production: "27.5",
};

export const ledgerRows = [
  ["Pledged by 32 agency members, March 11", `${release.marchTotal} barrels`],
  ["Country pledges listed by the IEA, March 19", `${marchTable.total} million barrels`],
  ["Released by October 2, the IEA's count", `about ${marchSoFar.barrels} barrels`],
  ["Pledged and not yet released, the IEA's count of October 7", `about ${marchSoFar.remaining} barrels`],
  ["U.S. share", `${release.usMarch} barrels`],
  ["U.S. exchange awards, March 20 to June 22", `${usShare.awarded} barrels`],
  ["U.S. share not covered by the March to June awards", `${usShare.left} barrels`],
  ["U.S. offer of September 29, bids due October 6", `up to ${release.exchange} barrels`],
];

export const awardRows = awards.map((a) => [a.date, millions(a.thousand)]);

export const marchTableRows = [
  ["Public stocks", `${marchTable.publicStocks} million`],
  ["Stocks companies are required to hold", `${marchTable.industryStocks} million`],
  ["Extra production (Canada, Mexico)", `${marchTable.production} million`],
  ["Total", `${marchTable.total} million`],
];

export const priceRows = [
  ["U.S. retail diesel, per gallon", "Oct 5, 2026", prices.dieselOct5],
  ["U.S. retail diesel, per gallon", "Sep 28, 2026", prices.dieselSep28],
  ["U.S. retail diesel, per gallon", "Sep 21, 2026", prices.dieselSep21],
  ["U.S. retail diesel, per gallon", "Mar 2, 2026", prices.dieselMar2],
  ["Brent crude, per barrel", "Sep 29, 2026", prices.brentSep29],
  ["Brent crude, per barrel", "Feb 27, 2026", prices.brentFeb27],
  ["WTI crude, per barrel", "Sep 29, 2026", prices.wtiSep29],
  ["WTI crude, per barrel", "Feb 27, 2026", prices.wtiFeb27],
];

export const statementRows = [
  ["G7 joint statement, October 2", "100 million barrels over four months, with a substantial diesel release in the first 20 days; no split between diesel and crude"],
  ["French presidency readout, October 2", "up to 100 million barrels within four months, of refined products, including diesel, and crude"],
  ["Energy Secretary Chris Wright, October 2", "a release by European nations, the majority diesel"],
  ["White House fact sheet, October 5", "100 million barrels of refined diesel from Europe's strategic reserves"],
];

export const event = {
  slug: "fuel-reserves/2026-10-02-g7-releases-100-million-barrels",
  title: "G7's 100 million barrels are meant to finish March's 400 million-barrel emergency oil release",
  dek: "In March the 32 member countries of the International Energy Agency pledged to release 400 million barrels of emergency oil; about 325 million had gone out by October 2. The agency counts the barrels pledged and not yet released at about 100 million. The White House calls the G7 release 100 million barrels of European diesel.",
  name: "G7 release of 100 million barrels",
  date: "2026-10-02",
  updated: "2026-10-08",
  updatedLabel: "October 8, 2026",
  kpis: [
    { value: "100", unit: "million barrels", label: "the G7 release" },
    { value: "400", unit: "million barrels", label: "pledged in March" },
    { value: "325", unit: "million barrels", label: "released by October 2" },
    { value: "4", unit: "months", label: "the period of the G7 release" },
  ],
  visual: {
    kind: "timeline",
    title: "From the March pledge to the October 7 meeting",
    entries: [
      { date: "Mar 11", title: "400 million barrels pledged" },
      { date: "Sep 29", title: "U.S. offers its last 40 million barrels" },
      { date: "Oct 2", title: "G7: 100 million barrels over four months", current: true },
      { date: "Oct 7", title: "Agency members back finishing the March release, diesel first" },
    ],
    note: "G7 statement, International Energy Agency, Energy Department",
  },
};
