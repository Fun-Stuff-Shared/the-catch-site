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
};

export const event = {
  slug: "immigration-detention/2026-10-01-supreme-court-takes-up-bond-hearings",
  title: "Supreme Court to weigh Trump's mandatory immigration detention policy",
  dek: "On October 1, 2026, the Supreme Court agreed to review the administration's policy of holding immigrants without a bond hearing.",
  name: "Review of detention without a bond hearing",
  date: "2026-10-01",
  updated: "2026-10-03",
  kpis: [
    { value: "Oct. 1", unit: "2026", label: "The Court granted review" },
    { value: "Apr. 28", unit: "2026", label: "The appeals court affirmed" },
    { value: "July 8", unit: "2025", label: "Detention guidance the opinion cites" },
    { value: String(computed.daysOpinionToGrant), unit: "days", label: "From that decision to the grant" },
  ],
  visual: {
    kind: "timeline",
    title: "From the detention guidance to review",
    entries: [
      { date: "July 8, 2025", title: "Detention guidance" },
      { date: "Sept. 5, 2025", title: "Board decision" },
      { date: "Apr. 28, 2026", title: "Appeals court affirms" },
      { date: "Oct. 1, 2026", title: "Review granted", current: true },
    ],
  },
};

export const chronology = {
  rows: [
    ["July 8, 2025", "The appeals opinion cites immigration enforcement guidance on detention of applicants for admission."],
    ["July 10, 2025", "Customs and Border Protection says its commissioner issued detention guidance to every component."],
    ["Sept. 5, 2025", "The Board of Immigration Appeals decides judges lack authority to grant bond in this situation."],
    ["Sept. 26, 2025", "Officers arrested the man in this case while he was driving to work."],
    ["Apr. 6, 2026", "The Second Circuit heard argument."],
    ["Apr. 28, 2026", "The Second Circuit affirms the order requiring a bond hearing or release."],
    ["July 23, 2026", "The government asks the Supreme Court to review the case."],
    ["Sept. 25, 2026", "The Second Circuit denies rehearing by the full court."],
    ["Oct. 1, 2026", "The Supreme Court grants the petitions for review, including this one."],
  ],
};
