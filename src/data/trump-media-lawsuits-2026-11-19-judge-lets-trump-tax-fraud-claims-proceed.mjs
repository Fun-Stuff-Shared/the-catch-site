// Every number here is printed on an admitted record; the claim each comes from is named.
// Statement counts: sac-2026-08-27 paragraphs, order-2026-11-19 list (thirty-four-statements, dismissed-mostly-book).
// Damages: sac-2026-08-27 (fifteen-billion). Penalties: fincen-1998-01-28, ftc-1988-04-05.
export const n = {
  challenged: 34,
  dismissed: 27,
  surviving: 7,
  bookChallenged: 22,
  apprenticeChallenged: 9,
  bakerChallenged: 3,
  bookDismissed: 16,
  apprenticeDismissed: 9,
  bakerDismissed: 2,
  bookSurviving: 6,
  bakerSurviving: 1,
  damagesBillions: 15,
  answerDays: 28,
  pages: 100000,
  fincenPenalty: 477000,
  ftcPenalty: 750000,
};

const fmt = (x) => x.toLocaleString("en-US");

export const computed = { fmt };

export const event = {
  slug: "trump-media-lawsuits/2026-11-19-judge-lets-trump-tax-fraud-claims-proceed",
  title: "Judge lets Trump's defamation suit go forward over six statements in the book and one in The Times",
  dek: `Seven of the ${n.challenged} statements Trump challenged go forward; the one left against the Times itself says authorities looked into his ties with the Mafia and found violations of money laundering rules.`,
  name: "Trump's defamation suit against The New York Times and Penguin Random House",
  date: "2026-11-19",
  updated: "2026-11-20",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "Trump v. New York Times Co.",
    entries: [
      { date: "Sept. 2024", title: "Lucky Loser published" },
      { date: "Sept. 2025", title: "Trump sues in Tampa" },
      { date: "July 2026", title: "Hearing on the motion to dismiss" },
      { date: "Nov. 19, 2026", title: "7 of 34 statements go forward", current: true },
    ],
  },
};

export const publications = [
  {
    work: "Lucky Loser, the book (Penguin Random House, Sept. 17, 2024)",
    by: "Craig and Buettner",
    sued: "Penguin, Craig, Buettner",
    challenged: n.bookChallenged,
    surviving: n.bookSurviving,
    cites: ["book-counts-penguin-authors", "craig-buettner-who", "six-book-one-baker"],
  },
  {
    work: "\"The Star-Making Machine That Created 'Donald Trump'\" (Times, Sept. 14, 2024)",
    by: "Craig and Buettner",
    sued: "The Times, Craig, Buettner",
    challenged: n.apprenticeChallenged,
    surviving: 0,
    cites: ["apprentice-counts", "counts-kept-dismissed"],
  },
  {
    work: "\"For Trump, a Lifetime of Scandals Heads Toward a Moment of Judgment\" (Times, Oct. 20, 2024)",
    by: "Baker",
    sued: "The Times, Baker",
    challenged: n.bakerChallenged,
    surviving: n.bakerSurviving,
    cites: ["times-counts-baker", "baker-who"],
  },
];

export const statements = [
  { source: "Book, p. 5", c: "statement-400m", text: "Donald Trump had received the equivalent of more than $400 million from his father, much of it through fraudulent tax evasion schemes" },
  { source: "Book, p. 166", c: "statement-masquerading", text: "In the language of the tax code, Fred had given his son taxable gifts masquerading as loans, a likely tax fraud that went unnoticed" },
  { source: "Book, p. 300", c: "statement-sham-layer", text: "They would accomplish that goal by adding a sham layer to Fred’s business, one designed to evade the gift and estate taxes" },
  { source: "Book, p. 301", c: "statement-padded-bills", text: "So the Trumps began submitting the padded bills to request rent increases from state officials" },
  { source: "Book, p. 314", c: "statement-2m-tax-free", text: "Donald was already collecting almost $2 million a year from his father’s companies. His own business failures meant he kept that money tax-free" },
  { source: "Book, p. 444", c: "statement-aggressive", text: "Donald Trump had faced these moments before, periods when it seemed his failures could not be saved only by aggressive tax maneuvers or not paying his debts" },
  { source: "Baker, the Times", c: "statement-baker", text: "Federal, state and local authorities looked into his ties with the Mafia, found violations of money laundering rules and penalized him for skirting stock trade rules" },
];

export const chronology = [
  { date: "Oct. 2, 2018", title: "The Times publishes its investigation of Fred Trump's transfers to his children; New York's tax department says it is reviewing the allegations.", cites: [{ c: "nysc-no-dispute" }, { c: "ny-tax-review-2018" }] },
  { date: "Sept. 2024", title: "The Times runs the Apprentice article, and Penguin publishes Lucky Loser.", cites: [{ c: "apprentice-counts" }, { c: "craig-buettner-who" }] },
  { date: "Oct. 20, 2024", title: "The Times runs Baker's article.", cites: [{ c: "baker-who" }] },
  { date: "Sept. 15, 2025", title: "Trump sues in Tampa, alleging the authors knew a responsible tax judgment needed forensic auditing and expert advice.", cites: [{ c: "forensic-in-original" }] },
  { date: "Sept. 19, 2025", title: "Four days later, the judge throws out the complaint as written and gives Trump 28 days to refile in no more than 40 pages.", cites: [{ c: "strike-order" }] },
  { date: "Oct. 16, 2025", title: "Trump files a revised, 40-page complaint.", cites: [{ c: "fac-filed" }] },
  { date: "Dec. 15, 2025", title: "The defendants move to dismiss.", cites: [{ c: "deadline-motion-date" }] },
  { date: "July 22, 2026", title: "At a hearing, the judge asks whether a non-expert can judge tax fraud alone.", cites: [{ c: "hearing-question" }] },
  { date: "July 27, 2026", title: "The judge holds off on the motion to dismiss and lets Trump rewrite his complaint once more; the defendants may keep their motion or add to it.", cites: [{ c: "deferral-order" }] },
  { date: "Aug. 27, 2026", title: "Trump files a second amended complaint, the version the judge ruled on.", cites: [{ c: "sac-filed" }] },
  { date: "Sept. 17, 2026", title: "The defendants add to their motion to dismiss, applying it to the new complaint.", cites: [{ c: "supplement-filed" }] },
  { date: "Nov. 19, 2026", title: "Seven of 34 statements go forward.", cites: [{ c: "ruling-seven-survive" }], current: true },
];
