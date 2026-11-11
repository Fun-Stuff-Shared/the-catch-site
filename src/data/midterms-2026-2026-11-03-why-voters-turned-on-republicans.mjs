// Every number here is printed on an admitted record; the claim each comes from is named.
// Voter Poll shares: voter-poll-national-house (claims crucial-*, trump-factor, trump-approval, vote-2024-composition, trump-voters-switched).
// Kansas: voter-poll-kansas-senate (kansas-poll-top-issue); Cruz's list: cruz-x-post-2026-11-04 (cruz-kansas-list).
// Gasoline: eia-gasoline-weekly (gas-prices). Seats: ap-uncalled-races-2026-11-10, ap-house-results-page.
export const n = {
  corruption: 55,
  costOfLiving: 49,
  costMajor: 89,
  immigration: 36,
  iran: 34,
  iranMajor: 74,
  ai: 23,
  oppose: 44,
  support: 16,
  notFactor: 40,
  approve: 37,
  disapprove: 63,
  norcApprove: 39,
  hardship: 79,
  worse: 44,
  pricesTrump: 63,
  tariffsNational: 66,
  tariffsLocal: 64,
  iranWrong: 63,
  harris2024: 49,
  trump2024: 44,
  nonvoters2024: 4,
  trumpToDem: 7,
  trumpStayed: 91,
  harrisToRep: 2,
  trump2024Pop: "49.8",
  harris2024Pop: "48.3",
  respondents: "79,668",
  gasFeb: "2.94",
  gasNov: "4.15",
  demHouse: 255,
  repGoingIn: 219,
  demSenate: 54,
  houseMargin: 12,
  ksDemocracy: 34,
  ksEconomy: 33,
  ksImmigration: 18,
  ksRespondents: "1,023",
};

export const computed = {
  gasRise: (Number(n.gasNov) - Number(n.gasFeb)).toFixed(2),
  repLossAtLeast: n.repGoingIn - (435 - n.demHouse),
};

export const event = {
  slug: "midterms-2026/2026-11-03-why-voters-turned-on-republicans",
  title: "More midterm voters called corruption and prices crucial than the Iran war",
  dek: `In the largest survey of 2026 voters, ${n.corruption}% called government corruption crucial to their vote and ${n.iran}% said the same of the war.`,
  name: "Why voters turned on Republicans in the 2026 midterms",
  date: "2026-11-03",
  updated: "2026-11-11",
  kpis: [],
};

// The five factors the Voter Poll asked voters to rate; each bar is its claim's short form.
export const crucial = [
  { c: "crucial-corruption", value: n.corruption },
  { c: "crucial-cost", value: n.costOfLiving },
  { c: "crucial-immigration", value: n.immigration },
  { c: "crucial-iran", value: n.iran },
  { c: "crucial-ai", value: n.ai },
];

// How 2026 voters said they voted in 2024, against the 2024 result.
export const composition = [
  { label: "Said they voted for Harris in 2024", value: n.harris2024 },
  { label: "Said they voted for Trump in 2024", value: n.trump2024 },
  { label: "Did not vote in 2024", value: n.nonvoters2024 },
];

// Cruz's Kansas list and the Kansas Voter Poll's own top-issue question, side by side.
export const kansasCruz = [
  ["Cost of living, energy, and groceries", "30.6%"],
  ["Corruption", "18.5%"],
  ["The cost of the Iran war", "10.1%"],
  ["The candidates are terrible", "7.9%"],
  ["The Canada trade war", "7.6%"],
];
export const kansasPoll = [
  ["The state of democracy", `${n.ksDemocracy}%`],
  ["The economy", `${n.ksEconomy}%`],
  ["Immigration", `${n.ksImmigration}%`],
  ["Health care", "9%"],
  ["Foreign policy", "5%"],
  ["Crime", "2%"],
];

// The 2024 figure each outlet set against the same 2026 poll.
export const baselines = [
  { group: "Latino voters", outlet: "NBC News", c: "baseline-latino-nbc" },
  { group: "Hispanic voters", outlet: "Associated Press", c: "baseline-latino-ap" },
  { group: "Hispanic voters", outlet: "Fox News", c: "baseline-latino-fox" },
  { group: "Black men", outlet: "NBC News", c: "baseline-black-men-nbc" },
  { group: "Black men", outlet: "Associated Press", c: "baseline-black-men-ap" },
];

export const subjectFigure = { label: "Voters who called government corruption crucial to their vote", value: n.corruption, unit: "%" };
