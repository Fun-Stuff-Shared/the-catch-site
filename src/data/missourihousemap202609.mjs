// Missouri House map, September 2026.
// Figures trace to pinned court, constitution, statute, and coverage files in data/sources/.
// Days from the September 3 ruling to the September 8 ballot deadline: 8 - 3 = 5.
// 52 U.S.C. 20302 requires overseas ballots 45 days before the election.
// November 3, 2026 minus 45 days is September 19, 2026.
// The eighth Tuesday before November 3, 2026 is September 8, 2026 (RSMo 115.125).
// Combined ballot work named in the stay application: 7 days to reassign voters + 14 days to design and test + 7 days to print = 28 days at best.

export const event = {
  slug: "missouri-house-map/september-2026",
  title: "Missouri's highest court says the new U.S. House map never became law and sends it to a November vote",
  dek: "The ruling is unanimous. The November 3 House election uses the 2022 districts whether or not voters approve House Bill 1. Only a U.S. Supreme Court stay could put the 2025 map in force for that election.",
  name: "Missouri House map",
  span: "September 3, 2026",
  date: "2026-09-03",
  updated: "2026-09-08",
  kpis: [
    { value: "Unanimous", unit: "", label: "Missouri Supreme Court, September 3" },
    { value: "2022", unit: "map", label: "for November, whatever the referendum" },
    { value: "Sept. 8", unit: "", label: "deadline to place the referendum on the ballot" },
    { value: "Sept. 19", unit: "", label: "45 days before November 3, overseas ballots" },
  ],
};

export const calendar = {
  ruling: "2026-09-03",
  stayDenied: "2026-09-04",
  scotusFiled: "2026-09-04",
  responseDue: "2026-09-07",
  ballotDeadline: "2026-09-08",
  requestedDecision: "2026-09-14",
  uocava: "2026-09-19",
  election: "2026-11-03",
  daysRulingToBallotDeadline: 5, // 2026-09-08 minus 2026-09-03
  daysRulingToUocava: 16, // 2026-09-19 minus 2026-09-03
  uocavaOffsetDays: 45, // 52 U.S.C. 20302
  ballotDesignDays: 14,
  ballotPrintDays: 7,
  combinedBallotDaysBest: 28,
};

export const hb1Votes = {
  senateYes: 21,
  senateNo: 11,
  houseYes: 90,
  houseNo: 65,
};

export const houseParty = {
  republicans: 218,
  democrats: 214,
  independent: 1,
  vacancies: 2,
  asOf: "2026-09-02",
};

export const district5 = {
  republican: "Rick Brattin",
  democrat: "Emanuel Cleaver, II",
  libertarian: "Randall (Randy) Langkraehr",
  certified: "2026-08-25",
};
