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
  title: "The Supreme Court agreed to decide whether the detention statute requires holding people who are already in the country and were not admitted",
  dek: "The October 1 grant is not a ruling and not a count of people. Under the bond statute the government may release someone. An immigration judge released a person who was already in the country and had not been admitted, after finding no danger and no flight risk.",
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
    ["March 6, 1997", "A Federal Register rule says people present without admission will be eligible for bond and bond redetermination."],
    ["July 8, 2025", "The appeals opinion cites immigration enforcement guidance on detention of applicants for admission."],
    ["July 10, 2025", "Customs and Border Protection says its commissioner issued detention guidance to every component."],
    ["Sept. 5, 2025", "The Board of Immigration Appeals decides judges lack authority to grant bond in this situation."],
    ["Sept. 26, 2025", "Officers arrested the man in this case while he was driving to work."],
    ["Apr. 6, 2026", "The Second Circuit heard argument."],
    ["Apr. 28, 2026", "The Second Circuit affirms the order requiring a bond hearing or release."],
    ["July 23, 2026", "The government asks the Supreme Court to review the case."],
    ["Sept. 10, 2026", "The Fourth Circuit names the appeals courts that require a bond hearing and the two that do not."],
    ["Sept. 25, 2026", "The Second Circuit denies rehearing by the full court."],
    ["Oct. 1, 2026", "The Supreme Court grants the petitions for review, including this one."],
  ],
};
