// DOJ's list of California voters it calls likely noncitizens, October 2026.
// Every count here is printed on an admitted record; day counts are calendar days between dates in the filings.
import { claim } from "../lib/claims.mjs";

const story = "election-administration--2026-10-19-doj-seeks-to-block-20000-california-ballots";
const short = (id) => claim(story, id).short;
const DAY = 86400000;
const daysBetween = (start, end) => Math.round((Date.parse(end) - Date.parse(start)) / DAY);

export const figures = {
  // bartell-decl-2026-10-21 and mcloughlin-decl-2026-10-21 ("just over 20,000")
  listed: "20,000",
  // dhs-mullin-letter-2026-07-16
  julyMayBe: "190,832",
  julyFourPoint: "81,336",
  // doj-tro-memo-2026-10-21 ("over 175,000")
  preliminary: "175,000",
  // bhullar-decl-2026-10-20
  inLa: "7,035",
  sample: 200,
  mailed: 86,
  // flores-decl-2026-10-20
  notMailed: 112,
  usBornReporting: "38.9",
  usBornAll: "25.8",
  noVotingHistory: "71.2",
  processed: "331,000",
  // logan-mtd-2026-10-21
  outsideLa: "13,000",
  // bartell-decl-2026-10-21
  discrepancies: 189,
  moreUnderReview: "17,000",
  // doj-release-2026-10-19
  charged: 28,
  arrested: 11,
  // nbc-counties-2026-10-23
  sanBernardino: "1,133",
  // ap-counties-2026-10-23
  countiesAtLeast: 18,
};

export const computed = {
  // FDNS received the roll on or around May 8 (bartell-decl-2026-10-21); the list went to LA County Oct. 13 (mccotter-letter-2026-10-13).
  daysRollToList: daysBetween("2026-05-08", "2026-10-13"),
  // Carter's hearing is Oct. 27; DOJ asked for relief by Nov. 3 (carter-order-2026-10-23, doj-tro-memo-2026-10-21).
  daysHearingToRequested: daysBetween("2026-10-27", "2026-11-03"),
};

export const event = {
  slug: "election-administration/2026-10-19-doj-seeks-to-block-20000-california-ballots",
  title: "DOJ asks appeals court to hold ballots of 20,000 California voters it calls likely noncitizens",
  dek: `The Justice Department went to the Ninth Circuit before the federal trial judge in Los Angeles, who hears the case Oct. 27, had ruled. It has also asked registrars in at least ${figures.countiesAtLeast} counties, by the Los Angeles County registrar's count, to set aside the ballots of anyone on its lists whose citizenship cannot be verified.`,
  name: "DOJ's bid to hold California ballots of voters it calls likely noncitizens",
  date: "2026-10-19",
  updated: "2026-10-24",
  kpis: [],
};

export const timeline = [
  { date: "May 8", title: short("may-8-roll"), cites: [{ c: "may-8-roll" }] },
  { date: "July 16", title: short("mullin-190832"), cites: [{ c: "mullin-190832" }] },
  { date: "Oct. 5", title: short("ballots-mailed"), cites: [{ c: "ballots-mailed" }] },
  { date: "Oct. 13", title: short("oct13-demand"), cites: [{ c: "oct13-demand" }] },
  { date: "Oct. 15", title: short("suit-filed"), cites: [{ c: "suit-filed" }] },
  { date: "Oct. 19", title: short("charged-28"), cites: [{ c: "charged-28" }] },
  { date: "Oct. 21", title: short("doj-asked-noon"), cites: [{ c: "doj-asked-noon" }] },
  { date: "Oct. 22", title: short("constructive-denial"), cites: [{ c: "constructive-denial" }] },
  { date: "Oct. 23", title: short("ca9-motion-filed"), cites: [{ c: "ca9-motion-filed" }] },
  { date: "Oct. 23", title: short("county-letters"), cites: [{ c: "county-letters" }] },
  { date: "Oct. 24", title: short("ca-ca9-opp"), cites: [{ c: "ca-ca9-opp" }], current: true },
];

export const listFigures = {
  doj: [
    ["Over 175,000", "The preliminary list USCIS and HSI started from, by DOJ's account"],
    ["Just over 20,000", "The list DOJ gave Los Angeles County on Oct. 13"],
  ],
  la: [
    [figures.inLa, "Listed records with a Los Angeles County address"],
    [String(figures.sample), "Of those, the records the county checked"],
    [`${figures.notMailed} of ${figures.sample}`, "Checked records with no ballot mailed: registration canceled or inactive"],
  ],
  july: [
    ["Up to 190,832", "Registrants DHS said \"may\" be noncitizens, in its first match"],
    [figures.julyFourPoint, "Registrants DHS matched on name, birth date, address and Social Security number"],
  ],
};

export const orderTable = [
  ["Which ballots", "Every mail ballot received from a person on DOJ's list"],
  ["How a voter clears", "Citizenship confirmed by more than the voter's own sworn registration"],
  ["If not a citizen", "The ballot is not counted"],
  ["If a citizen", "The ballot goes through California's provisional-ballot steps"],
  ["If never resolved", "The order names no step, and no deadline"],
];

export const timelineSpan = { from: "May 8", to: "Oct. 24" };
