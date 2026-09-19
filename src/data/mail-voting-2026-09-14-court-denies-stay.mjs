// Mail-voting stay denial, September 14, 2026.
// Day counts are calendar days at UTC midnight from dates in the
// September 14 order, the September 4 injunction, 2 U.S.C. 7, and
// the 26A305 docket. Named-opinion counts are from the order PDF.

export const event = {
  slug: "mail-voting/2026-09-14-court-denies-stay",
  title: "The Supreme Court leaves the mail-ballot rule blocked",
  dek: "",
  name: "Supreme Court leaves the Postal Service rule blocked",
  span: "March 31 to September 18, 2026",
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
  steiner: "2026-09-17",
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
  daysDenialToSteiner: daysBetween(dates.denial, dates.steiner), // 3
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

event.dek = `The Postal Service's new rule told election offices to mail ballots in approved envelopes with a barcode for every voter and to register voters in an online portal, and said mailings that did not comply would not be accepted. On September 14 the Supreme Court refused the government's request to lift a judge's block on those requirements, so they stay blocked for elections through November 3, ${computed.daysDenialToElection} days later. The Court did not rule on the March executive order behind the rule, and the one justice who explained his vote wrote that the Postal Service may well have the power to issue such a rule for a later election.`;
event.kpis = [
  { value: "Blocked", unit: "", label: "the rule's envelope, barcode and portal requirements, through November 3" },
  { value: String(computed.daysDenialToElection), unit: "days", label: "from the Court's refusal to November 3" },
  { value: String(computed.namedPublicDissents), unit: "justices", label: "dissented in public: Alito, joined by Thomas" },
  { value: "Stopped", unit: "", label: "work on the portal, the Postmaster General said September 17" },
];

event.visual = {
  kind: "timeline",
  title: "From the block to the Court's refusal",
  note: "Talwani's block, the First Circuit, Nichols, the Supreme Court, the Postal Service",
  entries: [
    { date: "2026-09-04", title: "Talwani blocks the rule's mandatory requirements through November 3", current: false },
    { date: "2026-09-10", title: "First Circuit refuses to pause the block", current: false },
    { date: "2026-09-13", title: "Nichols blocks the whole rule in a second case", current: false },
    { date: "2026-09-14", title: "Supreme Court refuses to lift the block", current: true },
    { date: "2026-09-17", title: "Postmaster General says work on the portal has stopped", current: false },
  ],
};

export const dateLine = {
  points: [
    { date: "Sep 4", label: "Block" },
    { date: "Sep 6", label: "Request" },
    { date: "Sep 10", label: "First Circuit" },
    { date: "Sep 13", label: "Nichols" },
    { date: "Sep 14", label: "Refused" },
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
  { date: "Mar 31", title: "Executive order signed", sub: "Directs the Postal Service to write a rule on mail-in and absentee ballots" },
  { date: "Aug 21", title: "Postal Service issues the rule", sub: "Effective the same day; published August 26" },
  { date: "Aug 24", title: "Court pauses the earlier block of the executive order", sub: "Courts review final rules, and there was no final rule yet" },
  { date: "Sep 1", title: "Postal Service says it is finalizing the portal", sub: "To open soon for officials who want to try it voluntarily" },
  { date: "Sep 4", title: "Talwani blocks the rule's mandatory requirements", sub: "For elections on or before November 3; voluntary compliance stays open" },
  { date: "Sep 6", title: "Government asks the Court to lift the block", sub: "Request presented to Justice Jackson, who referred it to the full Court" },
  { date: "Sep 10", title: "First Circuit refuses to pause the block", sub: "Judges Gelpí, Rikelman and Aframe" },
  { date: "Sep 13", title: "Nichols blocks the whole rule", sub: "Second case, in Washington; no election-date limit" },
  { date: "Sep 14", title: "Supreme Court refuses to lift the block", sub: "Unsigned order; Kavanaugh concurring; Alito joined by Thomas dissenting", current: true },
  { date: "Sep 17", title: "Postmaster General: portal work has stopped", sub: "Told the Associated Press the agency is not enforcing the rule this year" },
  { date: "Nov 3", title: "Federal election day", sub: "The Tuesday after the first Monday in November" },
];

export const opinionsTable = [
  ["Unsigned order", "The Court", "Request refused; the government is unlikely to succeed; the factors for emergency relief do not favor a pause"],
  ["Concurrence", "Kavanaugh", "Fair prospect the rule is within the Postal Service's legal power; forcing it on the 2026 elections would be arbitrary and capricious"],
  ["Dissent", "Alito, joined by Thomas", "Would have granted the pause; some plaintiffs likely lack standing; the states' claim is a Hail Mary pass"],
];

export const applicationsTable = [
  ["July 27", "Pause the block of the executive order", "Granted August 24"],
  ["September 3", "Pause the August 27 temporary order against the rule", "Withdrawn September 6"],
  ["September 6", "Pause the September 4 block of the rule", "Refused September 14"],
];
