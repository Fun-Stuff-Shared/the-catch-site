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
const marchTotalMillion = 400;

export const release = {
  barrels: "100 million",
  months: "four months",
  dieselDays: "20 days",
  members: 32,
  marchTotal: `${marchTotalMillion} million`,
  usMarch: "172 million",
};

// IEA account of October 2 and statement of October 7: barrels of the March action released,
// and the pledged barrels not yet released.
// data/sources/fuel-reserves/iea-g7-meeting-2026-10-02.txt, iea-member-meeting-2026-10-07.txt
const releasedMillion = 325;

export const marchSoFar = {
  released: `${releasedMillion} million`,
  apparentGap: `${marchTotalMillion - releasedMillion} million`,
  unreleased: "100 million",
};

// Politico's account of October 7: Germany's March promise and release, France's remainder.
// data/sources/coverage/politico-eu-france-germany-2026-10-07.txt
const germanyPromisedTonnes = 2650000;
const germanyReleasedTonnes = 600000;

export const shortfalls = {
  germanyShare: germanyReleasedTonnes / germanyPromisedTonnes < 0.25 ? "less than a quarter" : "more than a quarter",
  franceLeft: "8 million barrels",
  franceExtra: "2 million barrels",
};

// U.S. exchange awards, in thousands of barrels, from the DOE award notices, and the
// September 29 offer. doe-spr-award-2026-03-20 (45.2 million), -04-10 (8.5 million),
// -04-17 (26 million), -05-11 (53.3 million), -06-22 (500,000); doe-spr-exchange-2026-09-29.
const awardedThousand = [45200, 8500, 26000, 53300, 500].reduce((sum, n) => sum + n, 0);
const millions = (thousand) => `${(thousand / 1000).toFixed(1).replace(/\.0$/, "")} million`;

export const usShare = {
  awarded: millions(awardedThousand),
  offer: "40 million",
};

export const ledgerRows = [
  ["Pledged by the agency's 32 members, March 11", `${release.marchTotal}`],
  ["Released by October 2", `about ${marchSoFar.released}`],
  ["Still owed by the countries that fell short, October 7", `about ${marchSoFar.unreleased}`],
  ["U.S. share of the pledge", `${release.usMarch}`],
  ["U.S. barrels awarded under exchange contracts, March to June", `${usShare.awarded}`],
  ["U.S. barrels offered again, September 29", `up to ${usShare.offer}`],
];

// The dated sequence the story's sections lean on; each row carries its own record.
export const timeline = [
  { date: "February 28", title: "The United States and Israel attack Iran.", cites: [{ s: "euronews-eu-document-2026-10-08", passage: "United States and Israeli military attacks against Iran on 28 February" }] },
  { date: "March 11", title: `The International Energy Agency's ${release.members} members pledge to release ${release.marchTotal} barrels.`, cites: [{ s: "doe-spr-release-2026-03-11", passage: "32 member nations of the International Energy Agency" }, { s: "doe-spr-release-2026-03-11", passage: "coordinated release of 400 million barrels" }] },
  { date: "June", title: `The United States offers to lend its last ${usShare.offer} barrels; companies agree to borrow about 500,000.`, cites: [{ s: "reuters-spr-limits-2026-09-29", passage: "In June, the US offered to loan the last 40 million barrels from that agreement, but later that month revealed that companies only agreed to borrow about 500,000 barrels." }] },
  { date: "September 18", title: "Macron says he will convene the G7 on oil stocks.", cites: [{ s: "elysee-macron-2026-09-18", passage: "je convoquerai un G7 pour avancer sur une meilleure coordination sur les niveaux de stock" }] },
  { date: "September 21", title: `U.S. diesel hits a record ${prices.record} a gallon.`, cites: [{ s: "eia-diesel-price-2026-10-06", passage: "09/21 6.529" }] },
  { date: "September 22", title: `Trump: "let's not send out the diesel."`, cites: [{ s: "rbc-diesel-strategy-2026-10-01", passage: "On September 22, he stated \"I've said let's not send out the diesel." }] },
  { date: "October 1", title: "Bessent asks Europe to deliver its March barrels faster and to add more.", cites: [{ s: "bessent-post-2026-10-01", passage: "Our European partners should accelerate delivery on their existing commitments and make additional supplies immediately available" }] },
  { date: "October 2", title: `The G7 agrees to release ${release.barrels} barrels. Trump posts that Europe "has just agreed," then rules out a ban on diesel exports.`, current: true, cites: [{ s: "govuk-g7-statement-2026-10-02", passage: "coordinated release through the IEA of 100 million barrels (MB) to begin immediately over 4 months" }, { s: "trumpstruth-post-2026-10-02", passage: "Europe has just agreed to release a massive amount of their heavily stocked Diesel Oil." }, { s: "reuters-no-export-ban-2026-10-02", passage: "he will not authorize an export ban on diesel, hours after G7 countries agreed to release diesel and crude oil from their emergency reserves." }] },
  { date: "October 5", title: "The White House says Trump got Europe to release 100 million barrels of diesel.", cites: [{ s: "whitehouse-diesel-fact-sheet-2026-10-05", passage: "President Trump successfully negotiated with Europe to release 100 million barrels of refined diesel" }] },
  { date: "October 7", title: `The agency says about ${marchSoFar.unreleased} March barrels are still to come. Germany says no barrels beyond March for now; EU officials wait on the agency's assessment.`, cites: [{ s: "iea-member-meeting-2026-10-07", passage: "would bring approximately 100 million barrels to the market" }, { s: "politico-eu-france-germany-2026-10-07", passage: "as of now, no additional quantities" }, { s: "politico-eu-iea-assessment-2026-10-07", passage: "pending a clearer IEA assessment of market conditions and security-of-supply risks" }] },
  { date: "October 14–15", title: "The agency's board is expected to settle who supplies the barrels.", cites: [{ s: "reuters-iea-board-2026-10-06", passage: "is expected to decide the details of the stocks release at an October 14-15 board meeting" }] },
];

export const event = {
  slug: "fuel-reserves/2026-10-02-g7-releases-100-million-barrels",
  title: "The G7's 100 million barrels of emergency oil were already promised in March",
  dek: "In March, governments pledged 400 million barrels to ease the oil shock of the war with Iran, and about 100 million of them have not been released.",
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
      { date: "Sep 29", title: "U.S. offers its last 40 million barrels again" },
      { date: "Oct 2", title: "G7: 100 million barrels over four months", current: true },
      { date: "Oct 7", title: "Agency members back finishing the March release, diesel first" },
    ],
    note: "G7 statement, International Energy Agency, Energy Department",
  },
};
