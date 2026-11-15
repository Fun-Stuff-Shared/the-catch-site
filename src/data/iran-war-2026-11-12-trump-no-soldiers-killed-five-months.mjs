// Deaths and counts are from the Pentagon's casualty database as of November 13, 2026
// (dcas-overseas-operations-2026-11-13, dcas-epic-fury-2026-11-13) and the casualty releases.
export const n = {
  window: "five",
  killedInAction: 4,
  deathsInWindow: 9,
  nonHostileInWindow: 5,
  sinceJuly7: 8,
  woundedSinceJuly7: 450,
  epicFuryLastHostile: "March 8",
  total: 23,
  trumpCount: 18,
};

export const event = {
  slug: "iran-war/2026-11-12-trump-no-soldiers-killed-five-months",
  title: "Trump says no U.S. troops have been killed in five months. Four were killed in July.",
  dek: "The Pentagon's records list nine U.S. service members who died in those five months. Four were killed in action, in Jordan and Iraq, between July 17 and 19.",
  name: "Trump's claim that no U.S. troops were killed in five months",
  date: "2026-11-12",
  updated: "2026-11-15",
  kpis: [],
};

// The deaths from June 12 to November 12, in date order. Each label is its claim's short form.
export const deaths = [
  { date: "July 1", c: "edwards-july-1", hostile: false },
  { date: "July 17", c: "gonzales", hostile: true },
  { date: "July 17", c: "rampersad", hostile: true },
  { date: "July 18", c: "feehan", hostile: true },
  { date: "July 19", c: "swinton", hostile: true },
  { date: "September", c: "navy-september", hostile: false },
  { date: "Sept. 18", c: "wilkerson", hostile: false },
  { date: "October", c: "airmen-october", hostile: false },
];
