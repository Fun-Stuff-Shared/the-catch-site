// Every count here is printed on an admitted record; the claim each comes from is named.
// Inactive registrants 2016-2024: eavs-2018-report, eavs-2024-report (claim eavs-series).
// 2026 inactive count: mt-2026-11-10-column, mpb-2026-10-29 (claim inactive-230107).
// Affidavits and acceptance: sos-column-2026-11-16 (affidavits-21484, affidavits-73).
// Senate result: clarion-2026-11-17 (senate-result). Hinds: mfp-hinds-2026-11-11 (hinds-817).
export const n = {
  inactive2016: 183962,
  inactive2018: 199535,
  inactive2020: 160517,
  inactive2022: 159292,
  inactive2024: 165778,
  inactive2024Ap: 171000,
  inactive2026: 230107,
  flagged2025: 113000,
  addressConflicts: 50000,
  desoto: 15000,
  desotoAffidavits2022: 275,
  desotoAffidavits2026: 2100,
  affidavits2026: 21484,
  affidavits2024: 21321,
  acceptedPct: 75,
  hindsAccepted: 817,
  hindsCast: 2426,
  hindsPct2024: 60,
  colom: 480153,
  hydeSmith: 472122,
  contractUsd: 50000,
};

const fmt = (x) => x.toLocaleString("en-US");

export const computed = {
  riseFederal: n.inactive2026 - n.inactive2024,
  riseAp: n.inactive2026 - n.inactive2024Ap,
  rise1618: n.inactive2018 - n.inactive2016,
  rise2022: n.inactive2022 - n.inactive2020,
  margin: n.colom - n.hydeSmith,
  rejected: Math.round((n.affidavits2026 * (100 - n.acceptedPct)) / 100 / 100) * 100,
  hindsPct: Math.round((n.hindsAccepted / n.hindsCast) * 100),
  fmt,
};

export const event = {
  slug: "election-administration/2026-11-18-mississippi-inactive-voter-spike",
  title: "Mississippi's inactive voter list grew by about 60,000 in two years as the state turned to credit data",
  dek: `Democratic lawmakers want an investigation. ${fmt(n.inactive2026)} voters were listed as inactive before the Nov. 3 election; the state reported ${fmt(n.inactive2024)} inactive voters to the federal government for 2024.`,
  name: "Mississippi's inactive voter list and the Experian data",
  date: "2026-11-18",
  updated: "2026-11-19",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "Mississippi's inactive voter list",
    entries: [
      { date: "Nov. 2024", title: "165,778 voters inactive" },
      { date: "July 2025", title: "Counties get Experian address lists" },
      { date: "Oct. 2026", title: "230,107 voters inactive" },
      { date: "Nov. 19, 2026", title: "Democrats ask for an investigation", current: true },
    ],
  },
};

// Inactive registrants. 2016-2024 are the state's reports to the U.S. Election Assistance
// Commission after each November election; 2026 is the state's own count before the election.
export const counts = [
  { label: "2016", value: n.inactive2016, c: "eavs-series", note: "federal survey" },
  { label: "2018", value: n.inactive2018, c: "eavs-series", note: "federal survey" },
  { label: "2020", value: n.inactive2020, c: "eavs-series", note: "federal survey" },
  { label: "2022", value: n.inactive2022, c: "eavs-series", note: "federal survey" },
  { label: "2024", value: n.inactive2024, c: "eavs-series", note: "federal survey" },
  { label: "2026", value: n.inactive2026, c: "inactive-230107", note: "the state's own count, before the election" },
];

export const chronology = [
  { date: "Jan. 1, 2024", title: "A 2023 state law takes effect, letting counties act on \"reliable information\" that a voter moved.", cites: [{ c: "reliable-information" }] },
  { date: "Late Dec. 2024", title: "The secretary of state signs a $50,000, one-year Experian contract, Mississippi Today reports.", cites: [{ c: "contract-50000" }] },
  { date: "July 2025", title: "The state announces county commissioners will get Experian's address data.", cites: [{ c: "experian-partnership" }, { c: "watson-upload-2026" }] },
  { date: "July 2025 to March 2026", title: "At least 50,000 voters are made inactive over address conflicts, by Mississippi Today's count.", cites: [{ c: "fifty-thousand-address" }] },
  { date: "Oct. 2026", title: "230,107 voters are inactive before the election.", cites: [{ c: "inactive-230107" }] },
  { date: "Nov. 19, 2026", title: "The Legislative Black Caucus asks for an investigation.", cites: [{ c: "caucus-request" }], current: true },
];
