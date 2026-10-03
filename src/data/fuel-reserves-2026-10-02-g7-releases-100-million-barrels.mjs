// Prices are read as integer thousandths or cents from the pinned rows, then subtracted.
// Diesel: data/sources/fuel-reserves/GASDESW-2026-10-03.csv
//   2026-09-28,6.382  2026-09-21,6.529  2026-03-02,3.897
// Brent: data/sources/fuel-reserves/DCOILBRENTEU-2026-10-03.csv
//   2026-09-29,113.96  2026-02-27,71.32
// WTI: data/sources/fuel-reserves/DCOILWTICO-2026-10-03.csv
//   2026-09-29,96.16  2026-02-27,66.96

const dieselSep28 = 6382;
const dieselSep21 = 6529;
const dieselMar2 = 3897;
const brentSep29 = 11396;
const brentFeb27 = 7132;
const wtiSep29 = 9616;
const wtiFeb27 = 6696;

const thousandths = (n) => (n / 1000).toFixed(3);
const cents = (n) => (n / 100).toFixed(2);
const signedThousandths = (n) => `${n < 0 ? "-" : ""}${thousandths(Math.abs(n))}`;
const signedCents = (n) => `${n < 0 ? "-" : ""}${cents(Math.abs(n))}`;

const dieselWeekChange = dieselSep28 - dieselSep21;
const dieselFromMarch = dieselSep28 - dieselMar2;
const dieselFromMarchPercent = (Math.round((dieselFromMarch / dieselMar2) * 1000) / 10).toFixed(1);
const brentFromFebruary = brentSep29 - brentFeb27;
const wtiFromFebruary = wtiSep29 - wtiFeb27;

export const prices = {
  dieselSep28: thousandths(dieselSep28),
  dieselSep21: thousandths(dieselSep21),
  dieselMar2: thousandths(dieselMar2),
  dieselWeekChange: signedThousandths(dieselWeekChange),
  dieselFromMarch: signedThousandths(dieselFromMarch),
  dieselFromMarchPercent,
  brentSep29: cents(brentSep29),
  brentFeb27: cents(brentFeb27),
  brentFromFebruary: signedCents(brentFromFebruary),
  wtiSep29: cents(wtiSep29),
  wtiFeb27: cents(wtiFeb27),
  wtiFromFebruary: signedCents(wtiFromFebruary),
};

export const release = {
  barrels: "100 million",
  months: "4 months",
  dieselDays: "20 days",
  marchTotal: "400 million",
  usMarch: "172 million",
  usMarchDays: "120 days",
  usReplacement: "200 million",
  exchange: "40 million",
  awarded: "133 million",
  premium: "25 percent",
  taxpayer: "$3 billion",
  members: "32 member",
  billTrigger: "$5",
  billEnd: "$4.50",
  germanyReserve: "20 Millionen Tonnen",
  germanyDays: "90 Tage",
  germanyTonnes: "54 Millionen Tonnen",
};

// EIA weekly distillate stocks, thousand barrels.
// data/sources/fuel-reserves/eia-distillate-2026-10-03.txt: headings 09/18/26 and 09/25/26, U.S. row 107,431 and 105,180.
export const distillate = {
  sep18: "107,431",
  sep25: "105,180",
  unit: "thousand barrels",
};

// March contributions workbook, sheet total. Not rounded.
// data/sources/fuel-reserves/iea-contributions-workbook-2026-03-19.txt
export const contributionsSheet = {
  totalIea: "426.03075080054771",
};

// September 2026 Oil Market Report, August flows, in the report's units.
// data/sources/fuel-reserves/iea-omr-2026-09.txt
export const gulfDiesel = {
  august: "390 kb/d",
  combinedShortfall: "1.6 mb/d",
};

// IEA account of the October 2 meeting: barrels of the March action released by then.
// data/sources/fuel-reserves/iea-g7-meeting-2026-10-02.txt
export const marchSoFar = {
  barrels: "325",
  share: "80%",
};

export const priceRows = [
  ["U.S. No. 2 diesel, retail", "Sep 28, 2026", prices.dieselSep28],
  ["U.S. No. 2 diesel, retail", "Sep 21, 2026", prices.dieselSep21],
  ["U.S. No. 2 diesel, retail", "Mar 2, 2026", prices.dieselMar2],
  ["Brent", "Sep 29, 2026", prices.brentSep29],
  ["Brent", "Feb 27, 2026", prices.brentFeb27],
  ["WTI", "Sep 29, 2026", prices.wtiSep29],
  ["WTI", "Feb 27, 2026", prices.wtiFeb27],
];

export const changeRows = [
  ["Diesel, week", prices.dieselWeekChange, "dollars per gallon"],
  ["Diesel, dollars from Mar 2", prices.dieselFromMarch, "dollars per gallon"],
  ["Diesel, percent from Mar 2", prices.dieselFromMarchPercent, "percent"],
  ["Brent, from Feb 27", prices.brentFromFebruary, "dollars per barrel"],
  ["WTI, from Feb 27", prices.wtiFromFebruary, "dollars per barrel"],
];

export const statementRows = [
  ["United Kingdom publication of the joint statement", "100 million barrels over 4 months, a substantial diesel release in the first 20 days"],
  ["Elysee readout of the same meeting", "jusqu'à 100 millions de barils sous 4 mois, diesel and crude"],
];

export const chronology = [
  { date: "Mar 11", title: "400 million barrels pledged", sub: "International Energy Agency members pledge a release. The United States says it will release 172 million barrels from the Strategic Petroleum Reserve.", current: false },
  { date: "Sep 29", title: "Exchange of up to 40 million barrels", sub: "Participating companies return the borrowed barrels later with extra barrels. This continues the March release. Several European countries had released only a fraction of the crude and products they pledged.", current: false },
  { date: "Sep 30", title: "A diesel export ban still under discussion", sub: "President Trump said he was thinking about banning diesel exports.", current: false },
  { date: "Oct 1", title: "Bessent asks Europe to move existing commitments", sub: "He says American farmers, truckers, and businesses should not carry the diesel shortage.", current: false },
  { date: "Oct 2", title: "100 million barrels over four months", sub: "The statement takes fulfilled commitments into account, includes a substantial diesel release in the first 20 days, and gives no number for the diesel. Trump says he will not authorize an export ban.", current: true },
];

export const event = {
  slug: "fuel-reserves/2026-10-02-g7-releases-100-million-barrels",
  title: "G7 will release 100 million barrels over four months and does not say how much is beyond its March commitments",
  dek: "The leaders' statement promises a substantial diesel release in the first 20 days and gives no number for it. Of the 400 million barrels International Energy Agency members pledged in March, about 325 million had been released.",
  name: "G7 release of 100 million barrels",
  date: "2026-10-02",
  updated: "2026-10-03",
  kpis: [
    { value: "100", unit: "million barrels", label: "coordinated release beginning immediately" },
    { value: "4", unit: "months", label: "the period named for that release" },
    { value: "20", unit: "days", label: "days named for the diesel release" },
    { value: "400", unit: "million barrels", label: "March coordinated release" },
  ],
  visual: {
    kind: "timeline",
    title: "From the March release to October 2",
    entries: [
      { date: "Mar 11", title: "Coordinated release of 400 million barrels" },
      { date: "Sep 29", title: "Exchange of up to 40 million barrels" },
      { date: "Oct 1", title: "Bessent asks Europe for more supply" },
      { date: "Oct 2", title: "100 million barrels, taking fulfilled commitments into account", current: true },
    ],
    note: "G7 statement, Energy Department, Treasury secretary",
  },
};
