// U.S. on-orbit space control weapons confirmation, September 14, 2026.
// Figures trace to pinned Air Force and Space Force records, the Space Force FY2027
// budget release, the UN press release on the April 2024 Security Council vote, the
// Defense Department's April 2022 remarks, and SpacePolicyOnline's report of the CBO
// Golden Dome estimate (the CBO PDF refused capture).

// Space Force FY2027 budget release, April 21, 2026
// (data/sources/space-weapons/ussf-fy2027-budget-2026-04-21.txt).
export const spaceControlFy2027 = {
  billions: 21.6, // "The proposal requests $21.6 billion- a 158% increase from FY26-"
  increasePct: 158,
  ussfTotalBillions: 71.1, // "$71.1 billion for the Space Force"
};

// UN press release SC/15678, April 24, 2024, Internet Archive copy
// (data/sources/space-weapons/un-sc15678-2024-04-24-archive.txt).
// "By a vote of 7 in favour ... to 7 against ..., with 1 abstention (Switzerland), the Council rejected the amendment"
// "By a vote of 13 in favour to 1 against (Russian Federation), with 1 abstention (China), the Council then rejected the draft resolution"
export const unVote2024 = {
  amendmentFor: 7,
  amendmentAgainst: 7,
  amendmentAbstain: 1,
  resolutionFor: 13,
  resolutionAgainst: 1,
  resolutionAbstain: 1,
};

// Deputy Defense Secretary Hicks, April 18, 2022, as prepared
// (data/sources/space-weapons/dod-hicks-asat-pledge-2022-04-18.txt):
// "Russia conducted a November 2021 anti-satellite missile test, which created over 1,500 pieces of trackable debris."
export const russiaAsatTest2021 = {
  debrisPieces: 1500,
};

// Space Force growth panel, September 15, 2026
// (data/sources/space-weapons/ussf-growth-space-control-2026-09-15.txt).
export const spaceForceGrowth = {
  doubleYears: 5, // "must double in size over the next five years"
  combatForcesShare: "two-thirds", // "two-thirds of the growth is into Combat Forces Command"
};

export const event = {
  slug: "space-weapons/2026-09-14-on-orbit-weapons-confirmed",
  title: "The U.S. says it has on-orbit space control weapons",
  dek: "Air Force Secretary Troy Meink said it on September 14 at a conference in Maryland, and the Space Force chief repeated it the next day. Neither said what the weapons are, how many there are, or when they went up. The 1967 treaty that governs space bans only nuclear and other mass-destruction weapons in orbit.",
  name: "On-orbit space control weapons",
  span: "September 14, 2026",
  date: "2026-09-14",
  updated: "2026-09-19",
  kpis: [
    { value: "Sept 14", unit: "2026", label: "Air Force secretary: the U.S. has weapons in orbit" },
    { value: "Sept 15", unit: "2026", label: "Space Force chief repeats it" },
    { value: `$${spaceControlFy2027.billions}`, unit: "billion", label: "asked for space control programs in the 2027 budget request" },
    { value: "1967", unit: "", label: "treaty bans nuclear and mass-destruction weapons in orbit" },
  ],
};

// Iron Dome for America EO signed January 27, 2025
// (data/sources/space-weapons/eo-iron-dome-2025-01-27.txt) to Meink confirmation
// September 14, 2026 (data/sources/space-weapons/afns-meink-2026-09-14.txt).
// date_difference_days: 2026-09-14 minus 2025-01-27 = 595 days.
export const eoToConfirmationDays = 595;

// SpacePolicyOnline report of the CBO May 12, 2026 estimate
// (data/sources/space-weapons/spo-cbo-golden-dome-2026-05.txt).
// CBO PDF https://www.cbo.gov/system/files/2026-05/62379-golden-dome.pdf refused (403).
export const cboGoldenDome = {
  totalTrillion: 1.2,
  sbiBillions: 720,
  sbiSatellites: 7800,
  years: 20,
  icbmRaid: 10,
  replacementPerYear: 1600, // spo-cbo-golden-dome-2026-05.txt: "plus nearly 1,600 each year thereafter"
  fy2027ComptrollerBillions: 17.9, // same pin: Comptroller Budget Overview
  ombDiscretionaryMillions: 398, // same pin
  ombMandatoryBillions: 17.1, // same pin
};

export const chronology = {
  rows: [
    ["1967-10-10", "Outer Space Treaty in force; Article IV bans nuclear and other mass-destruction weapons in orbit"],
    ["2022-04-18", "United States pledges not to test ground-launched missiles that destroy satellites"],
    ["2023-04-18", "Saltzman tells Senate appropriators: a substantial on-orbit capability by 2026"],
    ["2024-04-24", `Russia vetoes the U.S. and Japan Security Council resolution restating the treaty ban, ${unVote2024.resolutionFor} to ${unVote2024.resolutionAgainst}`],
    ["2025-01-27", "Iron Dome for America order calls for space-based interceptors"],
    ["2025-03", "Saltzman defines space control as kinetic and non-kinetic means"],
    ["2025-04-10", "Space Force planning framework lists orbital strike among offensive counterspace actions"],
    ["2025-05-20", "Saltzman tells Senate Armed Services: counter-space systems designed to defeat hostile use of space"],
    ["2025-12-18", "Executive Order 14369: counter threats from very low Earth orbit through cislunar space"],
    ["2026-04-21", `Budget request: $${spaceControlFy2027.billions} billion for space control inside a $${spaceControlFy2027.ussfTotalBillions} billion Space Force total`],
    ["2026-06-12", "Secure World Foundation: the U.S. has the building-block technologies, no acknowledged program"],
    ["2026-09-08", "Space Command announces the Apollo Maneuvers exercise"],
    ["2026-09-14", "Meink: the U.S. has on-orbit space control weapons"],
    ["2026-09-15", "Schiess: Guardians operate on-orbit weapons; China and Russia respond"],
    ["2026-09-15", `Space Force panel: must double in size over the next ${spaceForceGrowth.doubleYears} years; ${spaceForceGrowth.combatForcesShare} of the growth into Combat Forces Command`],
    ["2026-09-16", "Whiting: the joint force retains on-orbit space control weapons"],
  ],
};

event.visual = {
  kind: "timeline",
  title: "From the order to the confirmation",
  note: "Iron Dome EO, Meink, Schiess, foreign responses",
  entries: [
    { date: "2025-01-27", title: "Iron Dome EO orders space-based interceptors", current: false },
    { date: "2026-09-14", title: "Meink: U.S. has on-orbit space control weapons", current: true },
    { date: "2026-09-15", title: "Schiess: Guardians operate them", current: false },
    { date: "2026-09-15", title: "China and Russia respond", current: false },
  ],
};

// Byte-exact spans from pinned text (Schiess pin uses U+00A0 between words).
export const quotes = {
  meinkWeapons:
    "the United States has on-orbit space control weapons capable of defending the Joint Force against hostile adversary action",
  meinkFirstTime:
    "Meink also acknowledged for the first time that Space Force has weapons in space",
  meinkSbi:
    "our Space-Based Interceptor program, which moved from initial contract to flight-ready hardware in less than one year",
  meinkThoughtOut: "very well thought out",
  schiessOperate:
    "Today, Guardians operate on-orbit weapons that can defend the Joint Force against space-enabled attacks.",
  schiessBattlefield:
    "Space is both a battlefield and the backbone of our Joint Force",
  guoPeaceful:
    "China stands for peaceful use of outer space and keeping it safe, and opposes any arms race in outer space or any attempt to weaponize it and turn it into a warzone",
  guoUrge:
    "We urge the U.S. to stop expanding military build-up in outer space, and uphold global strategic stability with concrete actions",
  peskovFree:
    "We believe that space should be free from any weapons",
  ostWmd:
    "nuclear weapons or any other kinds of weapons of mass destruction",
  eoSbi:
    "Development and deployment of proliferated space-based interceptors capable of boost-phase intercept",
  saltzmanControl:
    "Space Control encapsulates the mission areas required to contest and control the space domain",
  hillLaunched:
    "The United States has launched a weapon into orbit",
  spoTotal:
    "total cost over 20 years is $1.2 trillion",
  spoSatellites: "constellation of 7,800 satellites",
  spoSbiCost: "about $720 billion",
  spoReplacement: "plus nearly 1,600 each year thereafter",
  spoFy2027: "DOD is requesting $17.9 billion for Golden Dome in FY2027",
  saltzmanOnOrbit:
    "a substantial on-orbit capability that allows us to com-",
  saltzmanCounterspace: "counter-space systems designed to defeat",
  apolloManeuvers:
    "conducting coordinated maneuvers across low Earth orbit (LEO), medium Earth orbit (MEO), and geosynchronous orbit (GEO)",
  whitingTargeting:
    "Targeting in the space domain is maturing, but it still has a long way to go",
  kendallLowDebris: "low-debris-causing weapons",
  zakharovaWeapons: "оружейным потенциалом космического базирования",
  saltzmanAccelerated: "we have accelerated the programs",
  testerUnfunded: "classified unfunded priorities",
  abcSpokesperson:
    "These capabilities can be employed for offensive and defensive purposes at the direction of combatant commands",
  sascGovernmental:
    "governmental control for those things in the kill chain",
  fy2027SpaceControl: "$21.6 billion- a 158% increase from FY26",
  fy2027UssfTotal: "$71.1 billion for the Space Force",
  eo14369Vleo: "from very low-Earth orbit and through cislunar space",
  growthOffensiveDefensive:
    "advanced offensive and defensive space control capabilities",
  growthMustDouble:
    "must double in size over the next five years",
  growthCombatForcesShare:
    "two-thirds of the growth is into Combat Forces Command",
  caineCislunar:
    "from the seabed to cislunar space",
  ostArticleIii:
    "in accordance with international law, including the Charter of the United Nations",
  ostArticleIx:
    "with due regard to the corresponding interests of all other States Parties to the Treaty",
  whAsatCommitment:
    "commits not to conduct destructive, direct-ascent anti-satellite (ASAT) missile testing",
  whDebris: "The long-lived debris created by these tests now threaten satellites",
  hicksDebris: "created over 1,500 pieces of trackable debris",
  unResolutionVote:
    "By a vote of 13 in favour to 1 against (Russian Federation), with 1 abstention (China), the Council then rejected the draft resolution",
  unAmendmentVote:
    "with 1 abstention (Switzerland), the Council rejected the amendment",
  unRussiaAnyKind:
    "a ban on weapons of any kind being placed in space, not just weapons of mass destruction",
  frameworkCounterspace:
    "Space control consists of offensive and defensive actions, referred to collectively as counterspace operations",
  frameworkOrbitalStrike:
    "Actions taken to destroy, disrupt, or degrade adversary space platforms in the space domain",
  swfNoProgram:
    "has developed many of the underlying technologies for co-orbital counterspace capabilities without maintaining an acknowledged dedicated program",
};
