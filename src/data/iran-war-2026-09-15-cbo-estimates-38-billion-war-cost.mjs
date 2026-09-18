// CBO letter 62756, September 15, 2026: Estimating the Cost of Combat Operations Against Iran.
// Table 1 and the letter body: data/sources/iran-war/cbo-62756-iran.pdf (text sibling .txt).
// OMB June 24 supplemental: data/sources/iran-war/omb-supplemental-2026-06-24.pdf.
// DoD IG Q3 report: data/sources/iran-war/dod-ig-oef-q3-2026-09-09.pdf.

export const event = {
  slug: "iran-war/2026-09-15-cbo-estimates-38-billion-war-cost",
  title: "CBO estimates the Iran war has cost the Pentagon $38.1 billion through August 1",
  dek: "The September 15 letter to Rep. Brendan Boyle counts replacement munitions, extra flying hours, fuel, lost equipment, and other operations. It does not count damaged bases, veterans' care, or other agencies. Another month would add $2 billion or $3 billion, depending on how hard the fighting is.",
  name: "Iran war cost",
  span: "February 28 to September 15, 2026",
  date: "2026-09-15",
  updated: "2026-09-18",
  kpis: [
    { value: "38.1", unit: "USD billions", label: "DoD cost through August 1, CBO Table 1" },
    { value: "2 to 3", unit: "USD billions", label: "extra month, low or July intensity" },
    { value: "0.5", unit: "pp", label: "inflation, early 2027, above CBO's February path" },
    { value: "21.7", unit: "USD billions", label: "replace expended munitions" },
  ],
};

// CBO Table 1, billions of 2026 dollars, through August 1, 2026.
export const table1 = {
  munitions: 21.7,
  equipment: 1.9,
  flyingHours: 10.4,
  otherOps: 1.5,
  fuel: 2.7,
  total: 38.1,
};

// Munitions split from the letter body, billions of 2026 dollars.
export const munitions = {
  interceptors: 13.1,
  cruise: 7.3,
  other: 1.2,
  total: 21.7,
};

// Flying-hours split from the letter body, billions of 2026 dollars.
export const flyingHours = {
  airForceTactical: 3.4,
  bombersSupport: 4.6,
  navyTactical: 2.4,
  total: 10.4,
};

// Fuel: DLA surcharge $835 million plus $1,822 million expected loss.
// Story rounds 1,822 million to $1.8 billion; exact millions stay here.
export const fuel = {
  surchargeMillion: 835,
  dlaLossMillion: 1822,
  dlaLossBillion: 1.8, // 1822 / 1000, rounded in the story
  totalBillion: 2.7,
};

// Table 2 battle losses, millions of 2026 dollars.
export const battleLosses = {
  cboMillion: 1882,
  alternativeMillion: 3312,
  cboBillion: 1.9,
  alternativeBillion: 3.3,
  thaadRadarMillion: 500,
  f15eLost: 4,
};

export const monthly = {
  low: 2,
  july: 3,
};

export const inflation = {
  pce2027q1Pp: 0.5,
  corePce2027q1Pp: 0.3,
  pceLevel2027q1Pct: 0.6,
  q2EnergyAddPp: 2.3,
  q2PcePct: 5.3,
  tbill2026Pp: 0.2,
  brentQ4_2025: 64,
  brentQ2_2026: 103,
  brentEnd2026: 84,
  brentEnd2027: 76,
  brentThisYearPctHigher: 41,
};

export const admin = {
  supplementalTotal: 87.6,
  dodRequest: 67.1,
  directRelated: 42.3,
  otherDod: 24.8,
  otherDepartments: 20.5,
  agriculture: 11.1,
  munitionsRequest: 21.0,
  operationalRequest: 17.3,
  hegseth: 37.5,
};

export const ig = {
  total: 33.4,
  asOf: "2026-06-29",
  obligations: 7.4,
  munitions: 22.3,
  equipment: 3.7,
  diplomaticMillion: 184,
  stateContingencyMillion: 79.2,
  stateTotalMillion: 113,
  kiaThroughJune30: 7,
  nonHostileThroughJune30: 7,
  woundedThroughJune30: 417,
  kiaJuly: 4,
  deathsThroughJune30: 14, // 7 killed in action + 7 non-hostile, prose through June 30
  table4Kia: 11,
  table4NonHostile: 7,
  table4Total: 18,
  table4AsOf: "2026-08-26",
  deployed: 50000,
  disbursed: 4.9,
};

export const votes = {
  hconres86HouseYea: 215,
  hconres86HouseNay: 208,
  hconres86SenateYea: 50,
  hconres86SenateNay: 48,
  hconres93HouseYea: 220,
  hconres93HouseNay: 204,
  hconres113HouseYea: 216,
  hconres113HouseNay: 214,
};

export const brownEnergy = {
  extraFuelBillion: 40,
  householdDollars: 300,
};

export const unMission = {
  civilians: 178,
};

// 21.7 / 38.1 from Table 1, percent, one decimal as in 57.0.
export const computed = {
  munitionsSharePct: 57.0, // 21.7 / 38.1 * 100
  q2EnergySharePct: 43.4, // 2.3 / 5.3 * 100
  daysFeb28ToAug1: 154, // 2026-08-01 minus 2026-02-28
  daysFeb28ToSep15: 199, // 2026-09-15 minus 2026-02-28
  daysMar5ToSep15: 194, // 2026-09-15 minus 2026-03-05
  daysJun29ToAug1: 33, // 2026-08-01 minus 2026-06-29
  table1RoundedSum: 38.2, // 21.7+1.9+10.4+1.5+2.7; CBO prints 38.1
  directMinusCbo: 4.2, // 42.3 - 38.1
  cboMinusIg: 4.7, // 38.1 - 33.4
  perDayInclusiveMillion: 245.8, // 38.1e9 / 155 days, Feb 28 through Aug 1 inclusive
};

export const costBars = [
  { label: "Munitions", value: table1.munitions },
  { label: "Flying hours", value: table1.flyingHours },
  { label: "Fuel", value: table1.fuel },
  { label: "Lost equipment", value: table1.equipment },
  { label: "Other operations", value: table1.otherOps },
];

export const munitionsBars = [
  { label: "Missile-defense interceptors", value: munitions.interceptors },
  { label: "Land-attack cruise missiles", value: munitions.cruise },
  { label: "Other munitions", value: munitions.other },
];

export const clocksRows = [
  ["DoD IG, as of June 29", `$${ig.total} billion`, "Obligations, expended munitions, equipment losses; not infrastructure"],
  ["Hegseth, July 21 Senate Appropriations", `$${admin.hegseth} billion`, "Military Times and the hearing page: to date. CBO dates the same figure July 22 before Armed Services"],
  ["CBO Table 1, through August 1", `$${table1.total} billion`, "DoD incremental: munitions, flying hours, fuel, equipment, other operations"],
  ["Administration request, June 24, direct DoD", `$${admin.directRelated} billion`, "CBO's reading of the categories that look tied to the conflict"],
  ["Administration request, June 24, all agencies", `$${admin.supplementalTotal} billion`, "OMB letter total, including Agriculture, State, and other accounts"],
];

export const table1Rows = [
  ["Replace expended munitions", table1.munitions],
  ["Replace equipment lost in battle", table1.equipment],
  ["Increased flying hours", table1.flyingHours],
  ["Other operations costs", table1.otherOps],
  ["Increased fuel costs", table1.fuel],
  ["Repair or rebuild bases", "not estimated"],
  ["Total", table1.total],
];

export const timeline = [
  { date: "Feb 28", title: "Operation Epic Fury begins", sub: "CENTCOM: strikes at 1:15 am ET" },
  { date: "Mar 5", title: "Boyle asks CBO for a cost estimate", sub: "Operational costs, extra costs, opportunity costs, prices" },
  { date: "Mar 12", title: "White House names the campaign's aims", sub: "Missiles, navy, proxies, nuclear weapons" },
  { date: "Apr 8", title: "A ceasefire begins", sub: "CBO: the first intense phase lasted just over a month" },
  { date: "Jun 3", title: "House passes H.Con.Res. 86", sub: `${votes.hconres86HouseYea} to ${votes.hconres86HouseNay}, directing removal from hostilities` },
  { date: "Jun 23", title: "Senate agrees to H.Con.Res. 86", sub: `${votes.hconres86SenateYea} to ${votes.hconres86SenateNay}` },
  { date: "Jun 24", title: "OMB asks for $87.6 billion", sub: `$67.1 billion of that is for the Department of War` },
  { date: "Jul 10", title: "The president says the ceasefire is over", sub: "After Iranian attacks on tankers in the Strait of Hormuz" },
  { date: "Jul 21", title: "Hegseth testifies: $37.5 billion", sub: "Senate Appropriations; CBO dates this July 22 before Armed Services" },
  { date: "Jul 22", title: "House passes H.Con.Res. 113", sub: `${votes.hconres113HouseYea} to ${votes.hconres113HouseNay}, a reconciliation path` },
  { date: "Aug 1", title: "CBO's cost cutoff", sub: `Table 1 total $${table1.total} billion` },
  { date: "Sep 14", title: "Inspector general quarterly listing", sub: `Defense Department estimate $${ig.total} billion as of June 29` },
  { date: "Sep 15", title: "CBO dates the letter to Boyle", sub: "Nineteen pages, three tables", current: true },
  { date: "Sep 15", title: "House passes H.Con.Res. 93", sub: `${votes.hconres93HouseYea} to ${votes.hconres93HouseNay}, another removal vote` },
];

export const homeTable = [
  [`$${table1.total} billion`, "DoD cost through August 1, CBO Table 1"],
  [`$${monthly.low} to $${monthly.july} billion`, "Extra month at May/June or July intensity"],
  [`${inflation.pce2027q1Pp} percentage points`, "PCE inflation in 2027 Q1 versus CBO's February forecast"],
];

event.visual = {
  kind: "table",
  title: "CBO's Iran-war cost letter, September 15",
  note: "DoD incremental cost through August 1, not bases, veterans, or other agencies",
  rows: homeTable,
};
