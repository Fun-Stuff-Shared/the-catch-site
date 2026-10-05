// Day counts are differences of dates printed on the admitted records.
// Opinion date: data/sources/immigration-detention/ca2-cunha-opinion-2026-04-28.txt ("Decided: April 28, 2026").
// Grant date: data/sources/immigration-detention/scotus-order-list-2026-10-01.txt ("THURSDAY, OCTOBER 1, 2026").
// Guidance date named in that opinion: "July 8, 2025".
// Customs memorandum date: data/sources/immigration-detention/cbp-detention-notice-2025-09-18.txt ("July 10, 2025").
// Board decision date: data/sources/immigration-detention/bia-yajure-hurtado-2025-09-05.txt ("Decided September 5, 2025").
// Petition date: data/sources/immigration-detention/scotus-docket-rhoney-2026-10-02.txt ("Docketed: July 23, 2026").
const DAY = 86400000;
const daysBetween = (start, end) => Math.round((Date.parse(end) - Date.parse(start)) / DAY);

export const computed = {
  daysOpinionToGrant: daysBetween("2026-04-28", "2026-10-01"),
  daysGuidanceToGrant: daysBetween("2025-07-08", "2026-10-01"),
  daysCbpMemoToGrant: daysBetween("2025-07-10", "2026-10-01"),
  daysBoardToGrant: daysBetween("2025-09-05", "2026-10-01"),
  daysPetitionToGrant: daysBetween("2026-07-23", "2026-10-01"),
  // The April 28 opinion spells the length of the bond practice: "thirty".
  bondPracticeYears: 30,
};

export const event = {
  slug: "immigration-detention/2026-10-01-supreme-court-takes-up-bond-hearings",
  title: "The Supreme Court agreed to decide whether people already in the country who were never admitted must be held without a bond hearing",
  dek: "The Court's October 1 order takes the case and decides nothing yet. Since July 2025 the government has said people arrested inside the country who had entered without inspection must be held, and the appeals courts have split.",
  name: "Review of detention without a bond hearing",
  date: "2026-10-01",
  updated: "2026-10-05",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "From the detention guidance to review",
    entries: [
      { date: "July 10, 2025", title: "Customs memorandum" },
      { date: "Sept. 5, 2025", title: "Board decision" },
      { date: "Apr. 28, 2026", title: "Appeals court affirms" },
      { date: "Oct. 1, 2026", title: "Review granted", current: true },
    ],
  },
};

export const chronology = {
  rows: [
    ["March 6, 1997", "A Federal Register rule says people present without admission will be eligible for bond and bond redetermination."],
    ["July 10, 2025", "Customs and Border Protection says its commissioner issued detention guidance to every component."],
    ["Sept. 5, 2025", "The Board of Immigration Appeals decides judges lack authority to grant bond in this situation."],
    ["Sept. 26, 2025", "Officers arrested the man in this case while he was driving to work."],
    ["Apr. 28, 2026", "The Second Circuit affirms the order requiring a bond hearing or release."],
    ["Sept. 10, 2026", "The Fourth Circuit names the appeals courts that require a bond hearing and the two that do not."],
    ["Sept. 25, 2026", "The Second Circuit denies rehearing by the full court."],
    ["Oct. 1, 2026", "The Supreme Court grants review in this case."],
  ],
};
