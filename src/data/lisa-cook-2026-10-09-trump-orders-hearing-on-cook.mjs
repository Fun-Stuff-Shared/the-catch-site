// Every date and count here is printed on an admitted record.
// Memo signed: fox-cook-2026-10-09 ("dated Wednesday, Oct. 7, 2026"). Hearing: wh-memo-2026-10-07 ("on November 5, 2026").
// Written statement deadline: wh-memo-2026-10-07 ("at least 3 days before the hearing").
const DAY = 86400000;
const daysBetween = (start, end) => Math.round((Date.parse(end) - Date.parse(start)) / DAY);
const daysBefore = (date, days) => new Date(Date.parse(date) - days * DAY).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" });

export const computed = {
  daysMemoToHearing: daysBetween("2026-10-07", "2026-11-05"),
  statementDue: daysBefore("2026-11-05", 3),
};

export const event = {
  slug: "lisa-cook/2026-10-09-trump-orders-hearing-on-cook",
  title: "Trump orders Fed Governor Lisa Cook to a closed hearing on firing her",
  dek: "It is his second try: the Supreme Court blocked the first in June because she had not been given a chance to answer. Cook denies the mortgage allegations.",
  name: "Committee of inquiry into Governor Cook",
  date: "2026-10-09",
  updated: "2026-10-11",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "From the referral to the hearing",
    entries: [
      { date: "June 29, 2026", title: "Supreme Court keeps her in office" },
      { date: "Aug. 5, 2026", title: "Written notice of removal" },
      { date: "Oct. 9, 2026", title: "Committee of inquiry announced", current: true },
      { date: "Nov. 5, 2026", title: "Hearing at the White House" },
    ],
  },
};

export const chronology = {
  rows: [
    ["June and July 2021", "Cook signs mortgages on a house in Ann Arbor and a condo in Atlanta, each promising to make it her main residence."],
    ["May 2022", "Cook joins the Fed's board."],
    ["Sept. 2022", "The Atlanta condo is listed for rent. Cook says she never rented it."],
    ["Aug. 15, 2025", "Bill Pulte sends a criminal referral to the Justice Department."],
    ["Aug. 20, 2025", "Pulte posts pages of the referral. Within thirty minutes Trump posts \"Cook must resign, now!!!\""],
    ["Aug. 25, 2025", "Trump sends Cook a letter firing her."],
    ["Aug. 28, 2025", "Cook sues."],
    ["Sept. 9, 2025", "Judge Jia Cobb keeps Cook in office."],
    ["Jan. 21, 2026", "The Supreme Court hears the case."],
    ["June 29, 2026", "The Court, 5 to 4, keeps her in office and says Trump may try again."],
    ["Aug. 5, 2026", "The White House sends Cook written notice and the evidence, with 21 days to answer."],
    ["Aug. 26, 2026", "Cook's lawyers answer in writing."],
    ["Sept. 16, 2026", "The Fed raises rates 12 to 0, with Cook in the majority."],
    ["Oct. 7, 2026", "Trump signs the memo creating the committee. The White House posts it October 9."],
    ["Nov. 5, 2026", "The hearing."],
  ],
};
