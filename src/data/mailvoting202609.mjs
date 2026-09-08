// Mail-voting Supreme Court applications, September 2026.
// Days counted from calendar dates in the pinned filings, the September 4
// injunction, 2 U.S.C. 7, and 52 U.S.C. 20302. Plaintiff and intervenor
// counts are the named parties in the September 6 stay application.

export const event = {
  slug: "mail-voting/september-2026",
  title: "The administration asks the Supreme Court to lift a new block on mail-ballot rules",
  dek: "On Sunday the solicitor general filed application 26A305, asking the justices to pause a September 4 injunction of Postal Service ballot-mail rules. That injunction covers elections on or before November 3. Sunday's filing is 58 days before that election.",
  name: "Mail-voting stay applications",
  span: "March 31 to September 8, 2026",
  date: "2026-09-06",
  updated: "2026-09-08",
  kpis: [
    { value: "26A305", unit: "", label: "Sunday stay application, filed September 6" },
    { value: "58", unit: "days", label: "from that filing to November 3" },
    { value: "23", unit: "states", label: "plus D.C. and Pennsylvania's governor, as plaintiffs" },
    { value: "Nov. 3", unit: "", label: "federal election the injunction names" },
  ],
};

export const dates = {
  eo: "2026-03-31",
  rulePublished: "2026-08-26",
  scotusStay: "2026-08-24",
  tro: "2026-08-27",
  app297: "2026-09-03",
  pi: "2026-09-04",
  app305: "2026-09-06",
  jacksonDeadline: "2026-09-09",
  alabamaMail: "2026-09-09",
  uocava: "2026-09-19",
  election: "2026-11-03",
};

function daysBetween(from, to) {
  const a = Date.parse(`${from}T00:00:00Z`);
  const b = Date.parse(`${to}T00:00:00Z`);
  return Math.round((b - a) / 86400000);
}

export const computed = {
  daysFilingToElection: daysBetween(dates.app305, dates.election), // 58
  daysPiToElection: daysBetween(dates.pi, dates.election), // 60
  days297ToElection: daysBetween(dates.app297, dates.election), // 61
  daysRuleToElection: daysBetween(dates.rulePublished, dates.election), // 69
  daysEoToElection: daysBetween(dates.eo, dates.election), // 217
  daysFilingToUocava: daysBetween(dates.app305, dates.uocava), // 13
  daysFilingToJackson: daysBetween(dates.app305, dates.jacksonDeadline), // 3
  uocavaDaysBeforeElection: daysBetween(dates.uocava, dates.election), // 45
  plaintiffStates: 23,
  plaintiffJurisdictions: 25, // 23 states + D.C. + Pennsylvania's governor
  intervenorStates: 12,
  applicationsToCourt: 3,
};

export const plaintiffs = [
  "California", "Massachusetts", "Nevada", "Washington", "Arizona", "Colorado",
  "Connecticut", "Delaware", "Hawaii", "Illinois", "Maine", "Maryland",
  "Michigan", "Minnesota", "New Jersey", "New Mexico", "New York",
  "North Carolina", "Oregon", "Rhode Island", "Vermont", "Virginia", "Wisconsin",
];

export const plaintiffOther = [
  "the District of Columbia",
  "Josh Shapiro, Governor of Pennsylvania",
];

export const intervenors = [
  "Alabama", "Florida", "Indiana", "Kansas", "Louisiana", "Missouri",
  "Montana", "Nebraska", "Oklahoma", "South Carolina", "South Dakota", "Texas",
];

export const orgPlaintiffs = [
  "League of Women Voters of Massachusetts",
  "League of Women Voters Lotte E. Scharfman Memorial Education Fund",
  "League of Women Voters of the United States",
  "League of Women Voters Education Fund",
  "Association of Americans Resident Overseas",
  "U.S. Vote Foundation",
  "OCA-Asian Pacific American Advocates",
  "Delta Sigma Theta Sorority, Inc.",
];

export const daysBars = [
  { label: "EO, Mar 31", value: computed.daysEoToElection },
  { label: "USPS rule, Aug 26", value: computed.daysRuleToElection },
  { label: "26A297, Sep 3", value: computed.days297ToElection },
  { label: "Injunction, Sep 4", value: computed.daysPiToElection },
  { label: "26A305, Sep 6", value: computed.daysFilingToElection },
];

export const applicationsTable = [
  ["26A124", "July 27", "Stay the injunction of Executive Order 14399", "Granted August 24"],
  ["26A297", "September 3", "Stay the August 27 temporary restraining order of the USPS rule", "Withdrawn September 6"],
  ["26A305", "September 6", "Stay the September 4 preliminary injunction of the USPS rule", "Response due September 9, 4 p.m."],
];

export const timeline = [
  { date: "Mar 31", title: "Executive Order 14399", sub: "Directs a Postal Service rulemaking on mail-in and absentee ballots" },
  { date: "Jul 27", title: "Application 26A124 filed", sub: "Stay of the district court's injunction of the order" },
  { date: "Aug 24", title: "The Court grants 26A124", sub: "Unsigned opinion: the States' challenge to the order was not ripe" },
  { date: "Aug 26", title: "USPS final rule published", sub: "Ballot Mail for Federal Elections, 91 Fed. Reg. 54,966" },
  { date: "Aug 27", title: "Temporary restraining order", sub: "Judge Talwani pauses mandatory parts of the rule for 14 days" },
  { date: "Sep 3", title: "Application 26A297 filed", sub: "Stay of that temporary order, submitted to Justice Jackson" },
  { date: "Sep 4", title: "Preliminary injunction", sub: "Talwani enjoins named sections of the rule through November 3" },
  { date: "Sep 6", title: "26A297 withdrawn; 26A305 filed", sub: "Stay of the September 4 injunction; response due September 9", current: true },
  { date: "Nov 3", title: "Federal election day", sub: "The Tuesday after the first Monday in November" },
];
