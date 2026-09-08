// Mail-voting Supreme Court applications, September 2026.
// Days counted from calendar dates in the pinned filings, the September 4
// injunction, 2 U.S.C. 7, and 52 U.S.C. 20302. Plaintiff and intervenor
// counts are the named parties in the September 6 stay application.

export const event = {
  slug: "mail-voting/september-2026",
  title: "The administration asks the Supreme Court to lift a new block on mail-ballot rules",
  dek: "",
  name: "Mail-voting stay applications",
  span: "March 31 to September 8, 2026",
  date: "2026-09-06",
  updated: "2026-09-08",
  kpis: [],
};

export const dates = {
  eo: "2026-03-31",
  ruleEffective: "2026-08-21",
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
  daysRuleToElection: daysBetween(dates.rulePublished, dates.election), // 69, publication to election
  // Rule line 73: "DATES: Effective August 21, 2026."
  daysEffectiveToElection: daysBetween(dates.ruleEffective, dates.election), // 74
  daysEoToElection: daysBetween(dates.eo, dates.election), // 217
  daysFilingToUocava: daysBetween(dates.app305, dates.uocava), // 13
  daysFilingToJackson: daysBetween(dates.app305, dates.jacksonDeadline), // 3
  daysStayToRule: daysBetween(dates.scotusStay, dates.rulePublished), // 2, stay to publication
  daysEffectiveToStay: daysBetween(dates.ruleEffective, dates.scotusStay), // 3, issuance to Aug 24 opinion
  uocavaDaysBeforeElection: daysBetween(dates.uocava, dates.election), // 45
  plaintiffStates: 23,
  plaintiffJurisdictions: 25, // 23 states + D.C. + Pennsylvania's governor
  intervenorStates: 12,
  applicationsToCourt: 3, // filed by the solicitor general: 26A124, 26A297, 26A305
  stayApplicationsInFight: 4, // plus the intervenor states' 26A139, denied as moot August 24
  // EAVS 2022 report, page 22 and Table 4: mail ballots transmitted and returned, 2022 general election
  eavsTransmitted2022: 61460139,
  eavsReturned2022: 36683450,
  eavsReturnRatePct: Math.round((36683450 / 61460139) * 1000) / 10, // 59.7
  electionJurisdictions: 10000, // Talwani order, page 44, citing the Patrick declaration
};

event.dek = `On Sunday the solicitor general filed application 26A305, asking the justices to pause a September 4 injunction of Postal Service ballot-mail rules. That injunction covers elections on or before November 3. Sunday's filing is ${computed.daysFilingToElection} days before that election.`;
event.kpis = [
  { value: "26A305", unit: "", label: "Sunday stay application, filed September 6" },
  { value: String(computed.daysFilingToElection), unit: "days", label: "from that filing to November 3" },
  { value: String(computed.plaintiffStates), unit: "states", label: "plus D.C. and Pennsylvania's governor, as plaintiffs" },
  { value: "Nov. 3", unit: "", label: "federal election the injunction names" },
];

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
  { label: "Rule effective, Aug 21", value: computed.daysEffectiveToElection },
  { label: "Rule published, Aug 26", value: computed.daysRuleToElection },
  { label: "26A297, Sep 3", value: computed.days297ToElection },
  { label: "Injunction, Sep 4", value: computed.daysPiToElection },
  { label: "26A305, Sep 6", value: computed.daysFilingToElection },
];

export const applicationsTable = [
  ["26A124", "July 27", "Stay the injunction of Executive Order 14399", "Granted August 24"],
  ["26A139 (intervenor states)", "July 29", "Stay the same injunction", "Denied as moot August 24"],
  ["26A297", "September 3", "Stay the August 27 temporary restraining order of the USPS rule", "Withdrawn September 6"],
  ["26A305", "September 6", "Stay the September 4 preliminary injunction of the USPS rule", "Response due September 9, 4 p.m."],
];

export const timeline = [
  { date: "Mar 31", title: "Executive Order 14399", sub: "Directs a Postal Service rulemaking on mail-in and absentee ballots" },
  { date: "Jun 2", title: "USPS proposes the rule", sub: "Notice of proposed rulemaking; more than 200,000 comments follow" },
  { date: "Jun 25", title: "Judgment for the states", sub: "Talwani rules for 23 states and D.C.; final judgment July 7, elections through November 3" },
  { date: "Jul 25", title: "First Circuit refuses a stay", sub: "Standing and ripeness arguments rejected" },
  { date: "Jul 27", title: "Applications 26A124 and 26A139 filed", sub: "The government, then the intervenor states on July 29, ask the Court to stay that judgment" },
  { date: "Aug 11", title: "Nationwide injunction", sub: "In the League of Women Voters case: no implementing Section 3, no completing the rulemaking" },
  { date: "Aug 21", title: "USPS issues the final rule", sub: "Effective the same day, while both injunctions stand" },
  { date: "Aug 24", title: "The Court grants 26A124", sub: "Unsigned opinion: standing and ripeness, provision by provision; 26A139 denied as moot" },
  { date: "Aug 25", title: "Violation found", sub: "Talwani: completing the rulemaking violated the August 11 injunction; no remedy beyond saying so" },
  { date: "Aug 26", title: "USPS final rule published", sub: "Federal Register, 91 Fed. Reg. 54,966" },
  { date: "Aug 27", title: "Temporary restraining order", sub: "Judge Talwani pauses mandatory parts of the rule for 14 days" },
  { date: "Sep 3", title: "Application 26A297 filed", sub: "Stay of that temporary order, submitted to Justice Jackson" },
  { date: "Sep 4", title: "Preliminary injunction", sub: "Talwani enjoins named sections of the rule through November 3" },
  { date: "Sep 6", title: "26A297 withdrawn; 26A305 filed", sub: "Stay of the September 4 injunction; response due September 9", current: true },
  { date: "Sep 8", title: "Three amicus briefs", sub: "Members of Congress, the Society for the Rule of Law, and Whistleblower Aid" },
  { date: "Nov 3", title: "Federal election day", sub: "The Tuesday after the first Monday in November" },
];

export const courtSteps = [
  { date: "Aug 27", title: "Temporary restraining order", sub: "Talwani pauses mandatory parts of the August 21 rule for 14 days" },
  { date: "Sep 3", title: "Application 26A297 filed", sub: "Stay of that temporary order, submitted to Justice Jackson" },
  { date: "Sep 4", title: "Preliminary injunction", sub: "Talwani enjoins named sections of the rule through November 3" },
  { date: "Sep 6", title: "Application 26A305 filed", sub: "26A297 withdrawn; stay of the September 4 injunction; response due September 9", current: true },
];

export const dmmRows = [
  ["705.24.3.1", "Outbound ballot envelopes must carry the official Election Mail logo, be automation-compatible, and bear the voter's unique Intelligent Mail barcode, and must be submitted for design review."],
  ["705.24.3.2", "The same envelope standards for return ballot envelopes."],
  ["705.24.4.1", "Each portal user must register. The state's chief election official authorizes users."],
  ["705.24.4.2", "States that intend to receive mail ballots through the Postal Service must enroll each voter: name, address, outbound barcode, return barcode, and originating election-office state."],
  ["705.24.5.1", "Before accepting an outbound mailing, the Postal Service reviews it against those enrollment records."],
  ["705.24.5.2, first two sentences", "Outbound federal ballot mail is verified when presented for acceptance, and must be entered at a business-mail facility or a retail counter."],
  ["705.24.5.3(a), (b), and (c)", "Outbound mailings that do not comply will not be accepted and will be returned to the authorized ballot mailer. The mailer may request further review. The Postal Service assumes no responsibility until a mailing is accepted."],
];

export const mailingRows = [
  ["North Carolina", "Already begun, as of the September 6 filing"],
  ["Alabama", "September 9"],
  ["At least five states", "Week of September 13"],
  ["Uniformed and overseas voters (UOCAVA)", "September 19 is the statutory mailing date for a validly requested absentee ballot. The Postal Service rule excludes UOCAVA ballots; that date is not a deadline under this rule."],
];

// State estimates quoted in the September 4 order, pages 32 and 33, from the declarations
// filed in California v. Trump II. Each is the state's own forecast, not a count.
export const stateEstimateRows = [
  ["California", "more than 23 million"],
  ["Washington", "about 5.1 million"],
  ["Colorado", "more than 4 million"],
  ["Arizona", "about 3.2 million"],
  ["Oregon", "about 3 million"],
  ["Nevada", "about 2.1 million"],
  ["Michigan", "at least 1.9 million"],
  ["Massachusetts", "about 1 million"],
];

// Whistleblower Aid amicus brief, page 11, quoting the disclosure: pieces scanned per batch.
export const sampleRows = [
  ["Under 1,000 ballots", "15"],
  ["1,000 to 10,000", "350"],
  ["More than 10,000", "400"],
];
