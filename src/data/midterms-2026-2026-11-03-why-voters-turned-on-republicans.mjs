// Every number here is printed on an admitted record; the claim each comes from is named.
// Voter Poll shares: voter-poll-national-house (claims crucial-*, trump-factor, trump-approval, vote-2024-composition, trump-voters-switched).
// Kansas: voter-poll-kansas-senate (kansas-poll-top-issue); Cruz's list: cruz-x-post-2026-11-04 (cruz-kansas-list).
// YouGov: economist-yougov-2026-11-06, yougov-2026-11-independents. Gasoline: eia-gasoline-weekly (gas-prices). Seats: ap-uncalled-races-2026-11-10, ap-house-results-page.
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
  ygLoyalty: 25,
  ygOpposeTrump: 13,
  ygEconomy: 12,
  ygCandidates: 7,
  ygWar: 2,
  ygTrumpR: 65,
  ygTrumpD: 6,
  ygHarrisD: 80,
  ygHarrisR: 2,
  ygTrumpHome: 24,
  ygHarrisHome: 13,
  ygDemLoyal: 78,
  ygRepLoyal: 64,
  ygNonMagaHome: 34,
  ygNonMagaD: 8,
  rallies: 50,
  nsIran: 44,
  nsTariffs: 38,
  nsGas: 30,
  igaPrices: 56,
  ownInterests: 62,
  israelTooStrong: 51,
  norcNew: 15,
  flRep: 41,
  flDem: 30,
  endWar: 71,
  repealTariffs: 62,
  acaPremiums: 58,
  badEconomy: 75,
};

export const computed = {
  gasRise: (Number(n.gasNov) - Number(n.gasFeb)).toFixed(2),
  repLossAtLeast: n.repGoingIn - (435 - n.demHouse),
};

export const event = {
  slug: "midterms-2026/2026-11-03-why-voters-turned-on-republicans",
  title: "More midterm voters called corruption and prices crucial than the Iran war",
  dek: `In the Voter Poll, the survey seven news organizations share, ${n.corruption}% called government corruption crucial to their vote and ${n.iran}% said the same of the war.`,
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

// How each group voted for the House in 2026, from the Voter Poll's national file (claim groups-detail).
export const groups = [
  { set: "Gender", rows: [["Men", 50, 48], ["Women", 59, 40]] },
  { set: "Age", rows: [["18 to 29", 73, 25], ["30 to 44", 62, 36], ["45 to 64", 52, 47], ["65 and older", 50, 50]] },
  { set: "Race and ethnicity", rows: [["White", 49, 49], ["Black", 90, 9], ["Latino", 64, 34], ["Asian", 71, 28]] },
  { set: "Education", rows: [["College graduate", 63, 35], ["No college degree", 48, 50]] },
  { set: "Family income", rows: [["Under $50,000", 57, 41], ["$50,000 to $99,999", 54, 45], ["$100,000 or more", 55, 43]] },
  { set: "Where they live", rows: [["Urban", 72, 27], ["Suburban", 59, 40], ["Small town", 44, 54], ["Rural", 37, 61]] },
];

// County types in the Post's returns: the Republican margin in 2024 and in 2026 Senate races (claim wapo-county-types).
export const countyTypes = [
  { label: "Majority-Hispanic counties", m24: 4.7, m26: -23.7 },
  { label: "Lower-income counties (under $60,000)", m24: 29.4, m26: 8.5 },
  { label: "Urban core counties", m24: -15.9, m26: -33.6 },
  { label: "Major suburbs", m24: 5.5, m26: -11.1 },
  { label: "Medium metros", m24: 11.1, m26: -6.3 },
  { label: "Small cities and rural areas", m24: 34.5, m26: 19.0 },
];

// Senate-race counties in the Post's returns, summed by state (claim wapo-state-swings); Colorado, Maine,
// Massachusetts, New Hampshire and Oregon are left out because only a few of their counties had reported.
export const stateCounts = [
  { state: "AL", region: "South", dem24: 759218, gop24: 1427704, tot24: 2216437, dem26: 746856, gop26: 897452, tot26: 1644308 },
  { state: "AR", region: "South", dem24: 396905, gop24: 759241, tot24: 1182676, dem26: 375596, gop26: 480526, tot26: 885600 },
  { state: "DE", region: "South", dem24: 289758, gop24: 214351, tot24: 512912, dem26: 240347, gop26: 137764, tot26: 378111 },
  { state: "FL", region: "South", dem24: 4683038, gop24: 6110125, tot24: 10935465, dem26: 3968811, gop26: 4207774, tot26: 8271114 },
  { state: "GA", region: "South", dem24: 2468217, gop24: 2559073, tot24: 5089916, dem26: 2387428, gop26: 1641887, tot26: 4029315 },
  { state: "IA", region: "Midwest", dem24: 672217, gop24: 884493, tot24: 1584347, dem26: 650863, gop26: 600203, tot26: 1291337 },
  { state: "ID", region: "West", dem24: 246626, gop24: 522385, tot24: 794502, dem26: 212795, gop26: 346254, tot26: 619435 },
  { state: "IL", region: "Midwest", dem24: 1337482, gop24: 1620137, tot24: 3030220, dem26: 1108671, gop26: 1077007, tot26: 2221325 },
  { state: "KS", region: "Midwest", dem24: 544853, gop24: 758802, tot24: 1335445, dem26: 556414, gop26: 503230, tot26: 1092578 },
  { state: "KY", region: "South", dem24: 704043, gop24: 1337494, tot24: 2076826, dem26: 611987, gop26: 784000, tot26: 1425852 },
  { state: "LA", region: "South", dem24: 766870, gop24: 1208505, tot24: 2006975, dem26: 720106, gop26: 745963, tot26: 1466069 },
  { state: "MI", region: "Midwest", dem24: 2669618, gop24: 2677357, tot24: 5465582, dem26: 2444594, gop26: 2062761, tot26: 4598765 },
  { state: "MN", region: "Midwest", dem24: 1656979, gop24: 1519032, tot24: 3253920, dem26: 1520299, gop26: 1232683, tot26: 2830382 },
  { state: "MS", region: "South", dem24: 456315, gop24: 742179, tot24: 1213518, dem26: 453159, gop26: 459729, tot26: 932654 },
  { state: "NC", region: "South", dem24: 2709184, gop24: 2894862, tot24: 5689298, dem26: 2463050, gop26: 1641017, tot26: 4196106 },
  { state: "NE", region: "Midwest", dem24: 164516, gop24: 347103, tot24: 520629, dem26: 150250, gop26: 232308, tot26: 405503 },
  { state: "NJ", region: "Northeast", dem24: 2142005, gop24: 1884889, tot24: 4123146, dem26: 1715857, gop26: 968386, tot26: 2755814 },
  { state: "NM", region: "West", dem24: 478802, gop24: 423391, tot24: 923403, dem26: 455165, gop26: 265557, tot26: 720722 },
  { state: "OH", region: "Midwest", dem24: 2533703, gop24: 3180122, tot24: 5800691, dem26: 2301042, gop26: 2077748, tot26: 4601571 },
  { state: "OK", region: "South", dem24: 486776, gop24: 1015390, tot24: 1531889, dem26: 428791, gop26: 626824, tot26: 1093985 },
  { state: "RI", region: "Northeast", dem24: 283750, gop24: 214291, tot24: 511816, dem26: 235679, gop26: 104636, tot26: 354381 },
  { state: "SC", region: "South", dem24: 1028452, gop24: 1483747, tot24: 2548140, dem26: 1042362, gop26: 951165, tot26: 2038780 },
  { state: "SD", region: "Midwest", dem24: 146859, gop24: 272081, tot24: 428922, dem26: 120484, gop26: 184571, tot26: 305055 },
  { state: "TN", region: "South", dem24: 1056265, gop24: 1966865, tot24: 3072624, dem26: 886911, gop26: 1138407, tot26: 2066755 },
  { state: "TX", region: "South", dem24: 4791729, gop24: 6297765, tot24: 11271016, dem26: 5382619, gop26: 4182153, tot26: 9752047 },
  { state: "VA", region: "South", dem24: 2320288, gop24: 2047878, tot24: 4463012, dem26: 2155061, gop26: 1358507, tot26: 3522873 },
  { state: "WV", region: "South", dem24: 179396, gop24: 449167, tot24: 641837, dem26: 143566, gop26: 223256, tot26: 381264 },
  { state: "WY", region: "West", dem24: 67523, gop24: 176627, tot24: 250706, dem26: 63075, gop26: 113063, tot26: 176138 },
];
const stateName = { AL: "Alabama", AR: "Arkansas", DE: "Delaware", FL: "Florida", GA: "Georgia", IA: "Iowa", ID: "Idaho", IL: "Illinois", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", NC: "North Carolina", NE: "Nebraska", NJ: "New Jersey", NM: "New Mexico", OH: "Ohio", OK: "Oklahoma", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", VA: "Virginia", WV: "West Virginia", WY: "Wyoming" };
const margin = (d, r, t) => (100 * (r - d)) / t;
export const stateSwings = stateCounts
  .map((s) => ({ ...s, name: stateName[s.state], swing: margin(s.dem26, s.gop26, s.tot26) - margin(s.dem24, s.gop24, s.tot24) }))
  .sort((a, b) => a.swing - b.swing);
