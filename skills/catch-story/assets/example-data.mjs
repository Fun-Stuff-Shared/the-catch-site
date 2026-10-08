// Every date and count here is printed on an admitted record.
// Release on bond: data/sources/immigration-detention/doj-petition-26-104.txt ("released on bond the next day", after the October 28, 2025 hearing).
// Arrest: data/sources/immigration-detention/ca2-cunha-opinion-2026-04-28.txt ("On September 26, 2025").
const DAY = 86400000;
const daysBetween = (start, end) => Math.round((Date.parse(end) - Date.parse(start)) / DAY);

// Next immigration court date: ca2-cunha-opinion-2026-04-28.txt ("next hearing is scheduled for June 28, 2027").
const monthsBetween = (start, end) => {
  const [a, b] = [new Date(start), new Date(end)];
  return (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth()) - (b.getUTCDate() < a.getUTCDate() ? 1 : 0);
};

export const computed = {
  daysDetained: daysBetween("2025-09-26", "2025-10-29"),
  monthsArrestToNextHearing: monthsBetween("2025-09-26", "2027-06-28"),
};

export const event = {
  slug: "immigration-detention/2026-10-01-supreme-court-takes-up-bond-hearings",
  title: "The Supreme Court will decide whether immigrants who have lived here for years must be jailed for their whole deportation case without a bond hearing",
  dek: "For three decades they could ask for release. In July 2025 the Trump administration said the law forbids it. Nine federal appeals courts have said it does not.",
  name: "Review of detention without a bond hearing",
  date: "2026-10-01",
  updated: "2026-10-06",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "From bond hearings to the Supreme Court",
    entries: [
      { date: "July 8, 2025", title: "ICE ends bond hearings" },
      { date: "Sept. 26, 2025", title: "Barbosa da Cunha arrested" },
      { date: "Apr. 28, 2026", title: "Appeals court rules for him" },
      { date: "Oct. 1, 2026", title: "Supreme Court takes the case", current: true },
    ],
  },
};

export const chronology = {
  rows: [
    ["1997", "A government rule says people who entered without inspection can be released on bond."],
    ["Jan. 20, 2025", "Executive order to hold people arrested for immigration violations until their cases are decided."],
    ["July 4, 2025", "Budget law with $45 billion for detention space."],
    ["July 8, 2025", "ICE memo ends bond hearings for people who entered without inspection."],
    ["Sept. 5, 2025", "Board of Immigration Appeals makes the rule binding on immigration judges."],
    ["Sept. 26, 2025", "Barbosa da Cunha is arrested driving to work."],
    ["Oct. 29, 2025", "He is released on bond."],
    ["Apr. 28, 2026", "The Second Circuit rules for him."],
    ["Sept. 10, 2026", "The Fourth Circuit becomes the ninth appeals court against the rule."],
    ["Oct. 1, 2026", "The Supreme Court takes the case."],
  ],
};

export const split = {
  rows: [
    ["Against the administration", "First, Second, Third, Fourth, Sixth, Seventh, Ninth, Tenth, Eleventh"],
    ["For the administration", "Fifth, Eighth"],
  ],
};

export const counts = {
  rows: [
    ["tens of thousands", "CBS News, Oct. 1, 2026", "No source given"],
    ["millions", "Reuters, Oct. 1, 2026", "People the rule could cover, by the courts' estimates; not people detained"],
    ["six million", "Fourth Circuit opinion, Sept. 10, 2026", "The court's estimate of people who could be covered"],
    ["58,000+", "ICE data reported by CBS, July 15, 2025", "Everyone ICE held that day, for any reason"],
    ["73,000+", "Reuters, Oct. 1, 2026", "Federal lawsuits of this kind filed in 2026"],
    ["20,250+", "Politico tracker, read Oct. 6, 2026", "Federal court rulings against the administration on ICE detention since July 2025"],
  ],
};

export const readings = {
  rows: [
    ["The administration's", "Everyone in the country who was never legally admitted, however long they have lived here", "Held until his deportation case ends; release only if DHS grants parole"],
    ["Most courts'", "People caught entering the country or shortly after", "A hearing where an immigration judge decides on bond, which the judge can still deny"],
  ],
};
