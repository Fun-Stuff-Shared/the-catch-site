// Every date and count here is printed on an admitted record.
// Injunction: dnh-orders-appendix-2026 (order of October 2, 2026). Stay: scotus-26a512-order-2026-10-22 ("[October 22, 2026]").
// Election day: cod-opposition-2026-10-19 ("The general election is November 3.").
const DAY = 86400000;
const daysBetween = (start, end) => Math.round((Date.parse(end) - Date.parse(start)) / DAY);

// Expert estimate: dnh-orders-appendix-2026 (Dr. Herron, credited by the district court).
export const computed = {
  daysInjunctionToElection: daysBetween("2026-10-02", "2026-11-03"),
  daysInjunctionToStay: daysBetween("2026-10-02", "2026-10-22"),
  daysStayToElection: daysBetween("2026-10-22", "2026-11-03"),
  youngLackingId: "7,747",
  youngLackingIdShare: "6.56",
  primaryTurnedAway: 2,
  primaryTurnedAwayWord: "two",
};

export const event = {
  slug: "election-administration/2026-10-22-supreme-court-lets-new-hampshire-bar-student-ids",
  title: "Supreme Court lets New Hampshire tell poll workers to ignore student IDs on Nov. 3",
  dek: "A state law took student IDs off the list of accepted voter IDs in June. A Supreme Court order now brings back the Secretary of State's instruction that officials may not consider one even as backup evidence of who a voter is.",
  name: "Stay of the New Hampshire student-ID injunction",
  date: "2026-10-22",
  updated: "2026-10-24",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "Student IDs and the vote in New Hampshire",
    entries: [
      { date: "June 2, 2026", title: "Law drops student IDs from the list" },
      { date: "Oct. 2, 2026", title: "Judge says they may count as backup" },
      { date: "Oct. 22, 2026", title: "Supreme Court pauses the judge", current: true },
      { date: "Nov. 3, 2026", title: "Election day" },
    ],
  },
};

export const chronology = [
  { date: "2012", title: "New Hampshire's voter ID law accepts student IDs.", cites: [{ c: "student-ids-since-2012" }] },
  { date: "Apr. 3, 2026", title: "Gov. Kelly Ayotte signs HB 323; it takes effect June 2.", cites: [{ c: "hb323-what-it-did" }] },
  { date: "Apr. 23", title: "The Secretary of State says that from June 2 student IDs cannot be used to register, vote absentee or check in.", cites: [{ c: "april-directive" }] },
  { date: "Aug. 11", title: "The Coalition for Open Democracy sues.", cites: [{ c: "suit-filed" }] },
  { date: "Sept. 1", title: "The judge refuses to change anything for the September 8 primary.", cites: [{ c: "primary-no-relief" }] },
  { date: "Oct. 2 and 5", title: "The judge leaves the law in place and orders new guidance.", cites: [{ c: "hb323-not-enjoined" }, { c: "injunction-terms" }] },
  { date: "Oct. 7 and 14", title: "The judge and the First Circuit, 2 to 1, refuse to pause his order.", cites: [{ c: "lower-courts-refused" }] },
  { date: "Oct. 22", title: "The Supreme Court pauses it.", current: true, cites: [{ c: "stay-granted" }] },
  { date: "Oct. 23", title: "The state goes back to the primary's rules.", cites: [{ c: "state-reverts-oct23" }] },
];

export const timing = {
  points: [
    { label: "Judge's order", date: "Oct. 2" },
    { label: "Supreme Court pause", date: "Oct. 22" },
    { label: "Election day", date: "Nov. 3" },
  ],
  intervals: [{ days: computed.daysInjunctionToStay }, { days: computed.daysStayToElection }],
  highlight: { label: "From the judge's order to the election", days: computed.daysInjunctionToElection },
};

export const figures = [
  { value: computed.youngLackingId, label: `Eligible voters aged 18 to 24 without a qualifying ID, as estimated by the challengers' expert (${computed.youngLackingIdShare}%)` },
  { value: String(computed.primaryTurnedAway), label: "Reports of students turned away in the September primary" },
  { value: "None", label: "Counts of young voters who relied on student IDs before the law" },
];
