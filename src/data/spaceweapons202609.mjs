// U.S. on-orbit space control weapons confirmation, September 14, 2026.
// Figures trace to pinned AFNS, Space Force remarks, the Iron Dome EO, and the
// SpacePolicyOnline carrier for the CBO Golden Dome estimate (CBO PDF refused).

export const event = {
  slug: "space-weapons/2026-09-14-on-orbit-weapons-confirmed",
  title: "The U.S. says it has on-orbit space control weapons",
  dek: "Air Force Secretary Troy Meink said so on September 14 at a Maryland conference. The next day the Space Force chief said Guardians already operate them. Neither named the weapons.",
  name: "On-orbit space control weapons",
  span: "September 14, 2026",
  date: "2026-09-14",
  updated: "2026-09-17",
  kpis: [
    { value: "Sept 14", unit: "2026", label: "First official acknowledgement they are already on orbit" },
    { value: "Sept 15", unit: "2026", label: "Schiess: Guardians operate them" },
    { value: "$21.6", unit: "billion", label: "FY2027 Space Control request" },
    { value: "1967", unit: "", label: "Outer Space Treaty WMD ban" },
  ],
};

// Iron Dome for America EO signed January 27, 2025
// (data/sources/space-weapons/eo-iron-dome-2025-01-27.txt) to Meink confirmation
// September 14, 2026 (data/sources/space-weapons/afns-meink-2026-09-14.txt).
// date_difference_days: 2026-09-14 minus 2025-01-27 = 595 days.
export const eoToConfirmationDays = 595;

// SpacePolicyOnline carrier for CBO May 12, 2026 report
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

// Space Force FY2027 budget release, April 21, 2026
// (data/sources/space-weapons/ussf-fy2027-budget-2026-04-21.txt).
export const spaceControlFy2027 = {
  billions: 21.6, // "The proposal requests $21.6 billion- a 158% increase from FY26-"
  increasePct: 158,
  ussfTotalBillions: 71.1, // "$71.1 billion for the Space Force"
};

export const chronology = {
  rows: [
    ["1967-10-10", "Outer Space Treaty in force; Article IV bans nuclear and other WMD in orbit"],
    ["2023-04-18", "Saltzman tells Senate appropriations: substantial on-orbit capability by 2026"],
    ["2025-01-27", "Iron Dome for America EO orders proliferated space-based interceptors"],
    ["2025-03", "CSO Saltzman defines Space Control as kinetic and non-kinetic means"],
    ["2025-05-20", "Saltzman tells SASC: counter-space systems designed to defeat hostile use of space"],
    ["2025-12-18", "EO 14369: counter threats from very low Earth orbit through cislunar space"],
    ["2026-04-21", "FY2027 request: $21.6 billion for Space Control inside a $71.1 billion Space Force total"],
    ["2026-05-12", "CBO notional Golden Dome cost about $1.2 trillion over 20 years"],
    ["2026-09-08", "Space Command announces Apollo Maneuvers live-fly exercise"],
    ["2026-09-14", "Meink: U.S. has on-orbit space control weapons"],
    ["2026-09-15", "Schiess: Guardians operate on-orbit weapons; China and Russia respond"],
    ["2026-09-15", "Space Force panel: field advanced offensive and defensive space control capabilities"],
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
  meinkDominance:
    "It is critically important that we maintain our dominance, not only in the air but in space",
  schiessOperate:
    "Today, Guardians\u00a0operate\u00a0on-orbit\u00a0weapons\u00a0that can\u00a0defend the Joint Force against\u00a0space-enabled attacks.",
  schiessBattlefield:
    "Space is both a\u00a0battlefield and the backbone of\u00a0our\u00a0Joint Force",
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
};
