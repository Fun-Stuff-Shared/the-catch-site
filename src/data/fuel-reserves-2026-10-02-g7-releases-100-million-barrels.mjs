// Diesel prices are read as integer thousandths from the pinned rows and written as a reader says them.
// data/sources/fuel-reserves/eia-diesel-price-2026-10-06.txt
//   02/23 3.809  09/21 6.529  10/05 6.199
const dieselFeb23 = 3809;
const dieselSep21 = 6529;
const dieselOct5 = 6199;

const dollars = (n) => `$${(Math.round(n / 10) / 100).toFixed(2)}`;

export const prices = {
  beforeWar: dollars(dieselFeb23),
  record: dollars(dieselSep21),
  oct5: dollars(dieselOct5),
};

// G7 statement of October 2 and the March pledge as the Energy Department announced it.
// data/sources/fuel-reserves/govuk-g7-statement-2026-10-02.txt, doe-spr-release-2026-03-11.txt
export const release = {
  barrels: "100 million",
  months: "four months",
  dieselDays: "20 days",
  members: 32,
  marchTotal: "400 million",
  usMarch: "172 million",
};

// IEA account of October 2 and statement of October 7: barrels of the March action released,
// and the pledged barrels not yet released.
// data/sources/fuel-reserves/iea-g7-meeting-2026-10-02.txt, iea-member-meeting-2026-10-07.txt
export const marchSoFar = {
  released: "325 million",
  unreleased: "100 million",
};

// Politico's account of October 7: Germany's March promise and release, France's remainder.
// data/sources/coverage/politico-eu-france-germany-2026-10-07.txt
export const shortfalls = {
  germanyPromised: "2.65 million tonnes",
  germanyReleased: "600,000 tonnes",
  franceLeft: "8 million barrels",
  franceExtra: "2 million barrels",
};

// U.S. exchange awards, in thousands of barrels, from the DOE award notices, and the
// September 29 offer. doe-spr-award-2026-03-20 (45.2 million), -04-10 (8.5 million),
// -04-17 (26 million), -05-11 (53.3 million), -06-22 (500,000); doe-spr-exchange-2026-09-29.
const awardedThousand = [45200, 8500, 26000, 53300, 500].reduce((sum, n) => sum + n, 0);
const usShareThousand = 172000;
const millions = (thousand) => `${(thousand / 1000).toFixed(1).replace(/\.0$/, "")} million`;

export const usShare = {
  awarded: millions(awardedThousand),
  left: millions(usShareThousand - awardedThousand),
  offer: "40 million",
};

// France's announcement of October 7; Hormuz crossings of October 6; Gulf shut-ins of October 8.
// reuters-france-10m-2026-10-07, reuters-hormuz-transits-2026-10-08, reuters-oil-jumps-2026-10-08
export const next = {
  france: "10 million barrels",
  hormuzVessels: "Seven",
  gulfShutIn: "62.9 percent",
};

export const ledgerRows = [
  ["Pledged by the agency's 32 members, March 11", `${release.marchTotal} barrels`],
  ["Released by October 2, the agency's count", `about ${marchSoFar.released} barrels`],
  ["Pledged and not yet released, the agency's count of October 7", `about ${marchSoFar.unreleased} barrels`],
  ["U.S. share of the March pledge", `${release.usMarch} barrels`],
  ["U.S. exchange awards, March 20 to June 22", `${usShare.awarded} barrels`],
  ["U.S. offer of September 29", `up to ${usShare.offer} barrels`],
];

export const event = {
  slug: "fuel-reserves/2026-10-02-g7-releases-100-million-barrels",
  title: "The G7's 100 million barrels of emergency oil were already promised in March",
  dek: "In March, governments pledged 400 million barrels to ease the war's oil shock, and about 100 million of them have not been released.",
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
      { date: "Sep 29", title: "U.S. offers up to 40 million more barrels" },
      { date: "Oct 2", title: "G7: 100 million barrels over four months", current: true },
      { date: "Oct 7", title: "Agency members back finishing the March release, diesel first" },
    ],
    note: "G7 statement, International Energy Agency, Energy Department",
  },
};
