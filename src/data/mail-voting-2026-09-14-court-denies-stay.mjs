// Mail-voting stay denial, September 14, 2026.
// Day counts are calendar days at UTC midnight from dates in the
// September 14 order, the September 4 injunction, 2 U.S.C. 7, and
// the 26A305 docket. Named-opinion counts are from the order PDF.

export const event = {
  slug: "mail-voting/2026-09-14-court-denies-stay",
  title: "The Supreme Court leaves the mail-ballot rule blocked",
  dek: "",
  name: "Stay denied in 26A305",
  span: "March 31 to September 15, 2026",
  date: "2026-09-14",
  updated: "2026-09-18",
  kpis: [],
};

export const dates = {
  eo: "2026-03-31",
  ruleEffective: "2026-08-21",
  rulePublished: "2026-08-26",
  scotusStay: "2026-08-24",
  pi: "2026-09-04",
  app305: "2026-09-06",
  ca1: "2026-09-10",
  nichols: "2026-09-13",
  denial: "2026-09-14",
  election: "2026-11-03",
};

function daysBetween(from, to) {
  const a = Date.parse(`${from}T00:00:00Z`);
  const b = Date.parse(`${to}T00:00:00Z`);
  return Math.round((b - a) / 86400000);
}

export const computed = {
  daysDenialToElection: daysBetween(dates.denial, dates.election), // 50
  daysPiToElection: daysBetween(dates.pi, dates.election), // 60
  daysFilingToElection: daysBetween(dates.app305, dates.election), // 58
  daysCa1ToElection: daysBetween(dates.ca1, dates.election), // 54
  daysNicholsToElection: daysBetween(dates.nichols, dates.election), // 51
  daysPiToDenial: daysBetween(dates.pi, dates.denial), // 10
  daysFilingToDenial: daysBetween(dates.app305, dates.denial), // 8
  daysCa1ToDenial: daysBetween(dates.ca1, dates.denial), // 4
  daysNicholsToDenial: daysBetween(dates.nichols, dates.denial), // 1
  daysEoToDenial: daysBetween(dates.eo, dates.denial), // 167
  namedPublicDissents: 2, // Alito, joined by Thomas; order PDF
  namedConcurrences: 1, // Kavanaugh
  unsignedOrderSentences: 3, // denied; unlikely to succeed; equities
  plaintiffStates: 23,
  intervenorStates: 12,
  // League opposition pin: "Plaintiff States anticipate mailing over 50 million ballots"
  leagueStatesBallotsMillion: 50,
  // Nichols opinion: "delivered at least 54.4 million9 ballots to and from voters"
  uspsDelivered2022Million: 54.4,
  // Nichols opinion: "approximately 61 million ballots were transmitted to non-UOCAVA voters"
  eavsTransmitted2022Million: 61,
  // Nichols opinion: "36.6 million of those ballots were returned"
  eavsReturned2022Million: 36.6,
  // Talwani opinion: "10,000 different election jurisdictions"
  electionJurisdictions: 10000,
  // SORN pin: "Records are retained for 5 years."
  sornRetentionYears: 5,
  // DV amicus pin: "45 states and the District of Columbia have some type of ACP"
  acpStates: 45,
  // DV amicus pin: "at least 150,000 eligible but confidential Colorado voters"
  coloradoConfidentialVoters: 150000,
};

event.dek = `On September 14 the Court denied application 26A305. Judge Indira Talwani's September 4 injunction of named Postal Service ballot-mail rules stays in force for elections on or before November 3, ${computed.daysDenialToElection} days after the denial.`;
event.kpis = [
  { value: "Denied", unit: "", label: "application 26A305, September 14" },
  { value: String(computed.daysDenialToElection), unit: "days", label: "from that denial to November 3" },
  { value: String(computed.namedPublicDissents), unit: "justices", label: "named in dissent, Alito joined by Thomas" },
  { value: "Nov. 3", unit: "", label: "federal election the injunction names" },
];

event.visual = {
  kind: "timeline",
  title: "From the injunction to the denial",
  note: "Talwani PI, First Circuit stay denial, Nichols PI, Supreme Court denial",
  entries: [
    { date: "2026-09-04", title: "Talwani enjoins named rule sections through November 3", current: false },
    { date: "2026-09-10", title: "First Circuit denies a stay", current: false },
    { date: "2026-09-13", title: "Nichols enjoins the same rule in Washington", current: false },
    { date: "2026-09-14", title: "Supreme Court denies 26A305", current: true },
  ],
};

export const dateLine = {
  points: [
    { date: "Sep 4", label: "Injunction" },
    { date: "Sep 6", label: "26A305" },
    { date: "Sep 10", label: "First Circuit" },
    { date: "Sep 13", label: "Nichols" },
    { date: "Sep 14", label: "Denied" },
    { date: "Nov 3", label: "Election" },
  ],
  intervals: [
    { days: daysBetween(dates.pi, dates.app305) },
    { days: daysBetween(dates.app305, dates.ca1) },
    { days: daysBetween(dates.ca1, dates.nichols) },
    { days: daysBetween(dates.nichols, dates.denial) },
    { days: computed.daysDenialToElection },
  ],
};

export const timeline = [
  { date: "Mar 31", title: "Executive Order 14399", sub: "Directs a Postal Service rulemaking on mail-in and absentee ballots" },
  { date: "Aug 21", title: "USPS issues the final rule", sub: "Effective the same day; published August 26" },
  { date: "Aug 24", title: "Court grants 26A124", sub: "Stay of the injunction of the executive order, on standing and ripeness" },
  { date: "Sep 4", title: "Talwani preliminary injunction", sub: "Named sections of the rule enjoined for elections on or before November 3" },
  { date: "Sep 6", title: "Application 26A305 filed", sub: "Stay of that injunction, submitted to Justice Jackson" },
  { date: "Sep 10", title: "First Circuit denies a stay", sub: "Gelpí, Rikelman, and Aframe: motions denied; administrative stay moot" },
  { date: "Sep 13", title: "Nichols preliminary injunction", sub: "D.C. court: key parts of the rule are likely ultra vires" },
  { date: "Sep 14", title: "Court denies 26A305", sub: "Unsigned order; Kavanaugh concurring; Alito joined by Thomas dissenting", current: true },
  { date: "Nov 3", title: "Federal election day", sub: "The Tuesday after the first Monday in November" },
];

export const courtSteps = [
  { date: "Sep 4", title: "Talwani injunction", sub: "Named Domestic Mail Manual sections paused through November 3" },
  { date: "Sep 10", title: "First Circuit", sub: "Stay motions denied" },
  { date: "Sep 13", title: "Nichols injunction", sub: "Separate D.C. block of the same rule" },
  { date: "Sep 14", title: "Supreme Court denial", sub: "26A305 denied; Talwani injunction remains", current: true },
];

export const opinionsTable = [
  ["Unsigned order", "The Court", "Stay denied; government unlikely to succeed on the merits; equities do not favor a stay"],
  ["Concurrence", "Kavanaugh", "Fair prospect the rule is within Postal Service statutory authority; applying it in 2026 would be arbitrary and capricious"],
  ["Dissent", "Alito, joined by Thomas", "Would grant the stay; organizations likely lack standing; ultra vires claim is a Hail Mary pass"],
];

export const applicationsTable = [
  ["26A124", "July 27", "Stay the injunction of Executive Order 14399", "Granted August 24"],
  ["26A297", "September 3", "Stay the August 27 temporary restraining order", "Withdrawn September 6"],
  ["26A305", "September 6", "Stay the September 4 preliminary injunction of the USPS rule", "Denied September 14"],
];
