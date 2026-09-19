// CBO letter 62756, September 15, 2026: Estimating the Cost of Combat Operations Against Iran.
// Table 1 and the letter body: data/sources/iran-war/cbo-62756-iran.pdf (text sibling .txt).
// OMB June 24 supplemental: data/sources/iran-war/omb-supplemental-2026-06-24.pdf.
// DoD IG Q3 report: data/sources/iran-war/dod-ig-oef-q3-2026-09-09.pdf.
// CENTCOM September 3 estimate as AP reported it: data/sources/iran-war/ap-centcom-43-6b-2026-09-18.txt.

export const event = {
  slug: "iran-war/2026-09-15-cbo-estimates-38-billion-war-cost",
  title: "CBO estimates the Iran war has added $38.1 billion to Defense Department costs through August 1",
  dek: "The estimate counts what it will take to replace the munitions fired, the extra flying hours, fuel, lost equipment, and other operations. It leaves out damaged bases, veterans' care, and other agencies. The Defense Department did not answer CBO's requests for its own numbers, and by June 30 had paid out $4.9 billion of the $7.4 billion it had committed.",
  name: "Iran war cost",
  span: "February 28 to September 18, 2026",
  date: "2026-09-15",
  updated: "2026-09-18",
  kpis: [
    { value: "$38.1", unit: "billion", label: "CBO's estimate of the added Defense Department cost through August 1" },
    { value: "$2 to $3", unit: "billion", label: "each further month, quiet or as intense as July" },
    { value: "0.5", unit: "points", label: "added to inflation by early 2027, against CBO's February forecast" },
    { value: "$21.7", unit: "billion", label: "to replace the munitions fired" },
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

// Fuel: DLA surcharge $835 million plus the $1,822 million loss the Government Accountability Office expected.
// Story rounds 1,822 million to $1.8 billion; exact millions stay here.
export const fuel = {
  surchargeMillion: 835,
  dlaLossMillion: 1822,
  dlaLossBillion: 1.8, // 1822 / 1000, rounded in the story
  totalBillion: 2.7,
  surchargePerBarrel: 42,
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
  fuelShareOfLevelChangePct: 40,
};

// Interceptor unit prices from the letter body, millions of dollars each.
export const interceptorPrices = {
  patriotSm6Million: 4,
  thaadMillion: 12,
  sm3Million: 28,
  orderLagYearsLow: 3,
  orderLagYearsHigh: 5,
  rebuildYearsAtLeast: 5,
};

// Force package in the first phase, from the letter body.
export const force = {
  tacticalAircraft: 250,
  carrierStrikeGroups: 2,
};

export const admin = {
  supplementalTotal: 87.6,
  dodRequest: 67.1,
  directRelated: 42.3,
  otherDod: 24.8,
  otherDepartments: 20.5,
  agriculture: 11.1,
  agricultureCropAssistance: 10,
  homelandSecurity: 2.0,
  state: 3.4,
  munitionsRequest: 21.0,
  operationalRequest: 17.3,
  hegseth: 37.5,
  hegsethMunitionsJuly: 25,
  hegsethMunitionsAugust: 27.7,
  pennStation: 1,
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

// U.S. Central Command estimate as of September 3, as AP reported it on September 18.
// The Washington Post page served only a subscription stub; the AP dispatch is the record.
export const centcom = {
  total: 43.6,
  asOf: "2026-09-03",
  munitions: 28.1,
  deadPerDcas: 18,
  woundedPerDcas: 830,
};

// Washington Post count of service-member deaths as Reuters reported it on September 18.
export const postDeaths = {
  atLeast: 22,
  aboveDatabase: 4,
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

// Derived in this module from the figures above.
export const computed = {
  munitionsSharePct: 57.0, // 21.7 / 38.1 * 100
  q2EnergySharePct: 43.4, // 2.3 / 5.3 * 100
  daysFeb28ToAug1: 154, // 2026-08-01 minus 2026-02-28
  daysFeb28ToSep15: 199, // 2026-09-15 minus 2026-02-28
  daysMar5ToSep15: 194, // 2026-09-15 minus 2026-03-05
  daysJun29ToAug1: 33, // 2026-08-01 minus 2026-06-29
  daysAug1ToSep3: 33, // 2026-09-03 minus 2026-08-01
  table1RoundedSum: 38.2, // 21.7+1.9+10.4+1.5+2.7; CBO prints 38.1
  directMinusCbo: 4.2, // 42.3 - 38.1
  cboMinusIg: 4.7, // 38.1 - 33.4
  centcomMinusCbo: 5.5, // 43.6 - 38.1
  centcomMunitionsMinusCbo: 6.4, // 28.1 - 21.7
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
  ["Defense Department estimate quoted by its inspector general, as of June 29", `$${ig.total} billion`, "Money committed, munitions fired, equipment lost; no base repairs"],
  ["Hegseth to the Senate Appropriations Committee, July 21", `$${admin.hegseth} billion`, "The war as of that day plus what he expected through September 30"],
  ["CBO letter, through August 1", `$${table1.total} billion`, "Added Defense Department cost: munitions, flying hours, fuel, equipment, other operations"],
  ["Central Command to Congress, as of September 3", `$${centcom.total} billion`, "Munitions, ships, planes, bases in use, equipment losses, medical support; no base repairs"],
  ["June 24 request, the part CBO ties to the fighting", `$${admin.directRelated} billion`, "What the White House asked Congress for, in the categories that match the war"],
  ["June 24 request, all agencies", `$${admin.supplementalTotal} billion`, "The whole request, including farm aid, State, and other accounts"],
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
  { date: "Feb 28", title: "U.S. strikes on Iran begin", sub: "Central Command: strikes at 1:15 am ET" },
  { date: "Mar 5", title: "Boyle asks CBO for a cost estimate", sub: "Operating costs, other costs, what the war crowds out, prices" },
  { date: "Apr 8", title: "A ceasefire begins", sub: "CBO: the first intense phase lasted just over a month" },
  { date: "Jun 3", title: "House votes to end U.S. involvement", sub: `${votes.hconres86HouseYea} to ${votes.hconres86HouseNay}` },
  { date: "Jun 23", title: "Senate agrees", sub: `${votes.hconres86SenateYea} to ${votes.hconres86SenateNay}` },
  { date: "Jun 24", title: "White House asks Congress for $87.6 billion", sub: `$${admin.dodRequest} billion of it for the Defense Department` },
  { date: "Jul 10", title: "The president says the ceasefire is over", sub: "After Iranian attacks on tankers in the Strait of Hormuz" },
  { date: "Jul 21", title: "Hegseth tells senators the war has cost $37.5 billion", sub: "Senate Appropriations Committee" },
  { date: "Jul 22", title: "House passes a budget resolution", sub: `${votes.hconres113HouseYea} to ${votes.hconres113HouseNay}` },
  { date: "Aug 1", title: "CBO's cost cutoff", sub: `Estimate $${table1.total} billion` },
  { date: "Sep 14", title: "Inspector general report is posted", sub: `Quotes a $${ig.total} billion department estimate as of June 29` },
  { date: "Sep 15", title: "CBO's letter to Boyle", sub: "Nineteen pages, three tables", current: true },
  { date: "Sep 15", title: "House votes again to end U.S. involvement", sub: `${votes.hconres93HouseYea} to ${votes.hconres93HouseNay}` },
  { date: "Sep 18", title: "AP reports Central Command's $43.6 billion", sub: "As of September 3, in a one-page breakdown to lawmakers" },
];

export const homeTable = [
  [`$${table1.total} billion`, "CBO's estimate of the added Defense Department cost through August 1"],
  [`$${monthly.low} to $${monthly.july} billion`, "Each further month, quiet or as intense as July"],
  [`${inflation.pce2027q1Pp} points`, "Added to inflation by early 2027, against CBO's February forecast"],
];

event.visual = {
  kind: "table",
  title: "CBO's Iran-war cost letter, September 15",
  note: "An estimate of added Defense Department cost through August 1; bases, veterans, and other agencies not counted",
  rows: homeTable,
};
