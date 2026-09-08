// Government funding stopgap, September 2026.
// Vote totals from the House Clerk roll-call XML and the Senate roll-call XML.
// Calendar arithmetic from those dated records and the enrolled bill's December 11 date.

export const event = {
  slug: "government-funding/september-2026",
  title: "The House sent a stopgap funding bill to the president, 370 to 48; he signed it the next day",
  dek: "H.R. 6500 keeps most federal agencies at fiscal year 2026 rates through December 11, 2026. The Senate had passed the same text 90 to 6 on August 8. The president signed it September 2 as Public Law 119-103.",
  name: "Government funding",
  span: "August 8 to September 2, 2026",
  date: "2026-09-01",
  updated: "2026-09-08",
  kpis: [
    { value: "370-48", unit: "", label: "House vote, September 1 (two-thirds required)" },
    { value: "90-6", unit: "", label: "Senate vote, August 8" },
    { value: "Dec. 11", unit: "2026", label: "funding date in the enrolled bill" },
    { value: "119-103", unit: "", label: "public law, signed September 2" },
  ],
};

// House Clerk roll 286 party table, recounted from house-roll286.xml.
export const houseVote = {
  yeas: 370,
  nays: 48,
  notVoting: 14,
  republican: { yea: 193, nay: 19, notVoting: 6 },
  democratic: { yea: 176, nay: 29, notVoting: 8 },
  independent: { yea: 1, nay: 0, notVoting: 0 },
};

// Senate vote 228, recounted from senate-vote-228.xml.
export const senateVote = {
  yeas: 90,
  nays: 6,
  present: 1,
  absent: 3,
};

// Inclusive calendar from dated records. September 1 to December 11 is 101 days.
export const calendar = {
  houseVote: "2026-09-01",
  senateVote: "2026-08-08",
  signed: "2026-09-02",
  election: "2026-11-03",
  expiry: "2026-12-11",
  fiscalYearStart: "2026-10-01",
  daysHouseVoteToExpiry: 101, // (2026-12-11) - (2026-09-01)
  daysHouseVoteToElection: 63, // (2026-11-03) - (2026-09-01)
  daysElectionToExpiry: 38, // (2026-12-11) - (2026-11-03)
  daysSenateToHouse: 24, // (2026-09-01) - (2026-08-08)
};
