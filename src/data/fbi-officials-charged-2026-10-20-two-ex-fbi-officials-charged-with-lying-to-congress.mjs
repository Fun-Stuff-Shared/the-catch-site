// Every date and count here is printed on an admitted record.
// Filing and unsealing: floris-docket-2026-10-23 ("SEALED COMPLAINT", Oct. 20; "Case unsealed", Oct. 23).
// Election day: ap-2026-10-23 ("before the Nov. 3 elections").
// Limitations period: usc-18-3282 ("within five years"); statements on July 19 and Sept. 28, 2023 (floris-complaint-2026-10-20).
const DAY = 86400000;
const daysBetween = (start, end) => Math.round((Date.parse(end) - Date.parse(start)) / DAY);

export const computed = {
  daysUnsealedToElection: daysBetween("2026-10-23", "2026-11-03"),
  daysFiledToElection: daysBetween("2026-10-20", "2026-11-03"),
  limitYear: 2023 + 5,
  maxYears: 5,
  indictmentDays: 30,
};

export const event = {
  slug: "fbi-officials-charged/2026-10-20-two-ex-fbi-officials-charged-with-lying-to-congress",
  title: "Two ex-FBI officials charged with lying to Congress about involvement in Hunter Biden investigations",
  dek: "Nikki Floris and Bradley Benavides led the FBI's Foreign Influence Task Force in 2020. They surrendered on October 23, and a hearing on the evidence is set for October 27.",
  name: "Ex-FBI officials charged over Hunter Biden testimony",
  date: "2026-10-20",
  updated: "2026-10-24",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "From the 2023 interviews to the charges",
    entries: [
      { date: "July and Sept. 2023", title: "House Judiciary interviews Floris, then Benavides" },
      { date: "Aug. 12, 2026", title: "FBI says it is investigating the task force" },
      { date: "Oct. 20, 2026", title: "Complaint filed under seal" },
      { date: "Oct. 23, 2026", title: "Both surrender; case unsealed", current: true },
    ],
  },
};

export const timeline = [
  { date: "Dec. 9, 2019", c: "laptop-obtained" },
  { date: "July 19 and Sept. 28, 2023", c: "forum" },
  { date: "Aug. 12 to Sept. 15, 2026", c: "fbi-review-round-river" },
  { date: "Oct. 2026", c: "witnesses-oct-2026" },
  { date: "Oct. 20, 2026", c: "sealed-oct-20" },
  { date: "Oct. 23, 2026", c: "surrendered-oct-23", current: true },
  { date: "Oct. 27, 2026", c: "prelim-oct-27" },
];

export const sideBySide = {
  floris: [
    ["floris-said-no-involvement", "floris-truth-contact"],
    ["floris-said-no-discussion", "floris-sportsman-message"],
    ["floris-said-no-report", "floris-truth-report"],
    ["floris-said-no-laptop", "floris-truth-laptop"],
    ["floris-round-river-denial", "floris-truth-round-river"],
  ],
  benavides: [
    ["benavides-said-prep", "benavides-truth-day-it-broke"],
    ["benavides-said-wikipedia", "benavides-truth-receipt"],
    ["benavides-said-no-cid", "benavides-truth-meeting"],
    ["benavides-said-no-social", "benavides-truth-twitter"],
  ],
};
