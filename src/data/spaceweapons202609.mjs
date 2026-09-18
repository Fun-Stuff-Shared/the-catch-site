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
  updated: "2026-09-15",
  kpis: [
    { value: "Sept 14", unit: "2026", label: "Meink's first public confirmation" },
    { value: "Sept 15", unit: "2026", label: "Schiess: Guardians operate them" },
    { value: "1967", unit: "", label: "Outer Space Treaty WMD ban" },
    { value: "$1.2", unit: "trillion", label: "CBO notional Golden Dome, 20 years" },
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
};

export const chronology = {
  rows: [
    ["1967-10-10", "Outer Space Treaty in force; Article IV bans nuclear and other WMD in orbit"],
    ["2025-01-27", "Iron Dome for America EO orders proliferated space-based interceptors"],
    ["2025-03", "CSO Saltzman defines Space Control as kinetic and non-kinetic means"],
    ["2026-05-12", "CBO notional Golden Dome cost about $1.2 trillion over 20 years"],
    ["2026-09-14", "Meink: U.S. has on-orbit space control weapons"],
    ["2026-09-15", "Schiess: Guardians operate on-orbit weapons; China and Russia respond"],
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
};
