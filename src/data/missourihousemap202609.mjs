// Missouri House map, September 2026.
// Figures trace to pinned court, constitution, and coverage files in data/sources/.
// Days from the September 3 ruling to the September 8 ballot deadline: 8 - 3 = 5.
// Days from September 3 to the September 19 overseas-ballot date named in the stay application: 19 - 3 = 16.

export const event = {
  slug: "missouri-house-map/september-2026",
  title: "Missouri's highest court says the new U.S. House map never became law and sends it to a November vote",
  dek: "The ruling is unanimous. The 2022 districts govern November unless voters approve House Bill 1. The secretary of state has until September 8 to put that question on the ballot.",
  name: "Missouri House map",
  span: "September 3, 2026",
  date: "2026-09-03",
  updated: "2026-09-08",
  kpis: [
    { value: "Unanimous", unit: "", label: "Missouri Supreme Court, September 3" },
    { value: "2022", unit: "map", label: "in force for the November election" },
    { value: "Sept. 8", unit: "", label: "deadline to place the referendum on the ballot" },
    { value: "Sept. 19", unit: "", label: "overseas and military ballots, per the state's filing" },
  ],
};

export const calendar = {
  ruling: "2026-09-03",
  stayDenied: "2026-09-04",
  scotusFiled: "2026-09-04",
  responseDue: "2026-09-07",
  ballotDeadline: "2026-09-08",
  uocava: "2026-09-19",
  election: "2026-11-03",
  daysRulingToBallotDeadline: 5, // 2026-09-08 minus 2026-09-03
  daysRulingToUocava: 16, // 2026-09-19 minus 2026-09-03
};

export const hb1Votes = {
  senateYes: 21,
  senateNo: 11,
  houseYes: 90,
  houseNo: 65,
};
