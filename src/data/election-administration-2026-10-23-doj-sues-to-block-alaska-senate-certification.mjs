// Every date and count here is printed on an admitted record; each entry cites its claim.
// Primary shares and votes: doj-complaint-2026-10-22 and cnn-sues-2026-10-23.
// Senate rows: doj-complaint-sample-ballot-2026-10-22, in the order the ballot prints them.

export const primary = {
  peltola: 49.5,
  senator: 41.4,
  danielJ: 2.5,
  senatorVotes: "68,726",
  danielJVotes: "4,107",
};

export const poll = {
  finalPeltola: 51,
  finalSenator: 49,
};

export const event = {
  slug: "election-administration/2026-10-23-doj-sues-to-block-alaska-senate-certification",
  title: "Trump says he ordered suit to halt Alaska's Senate certification if a namesake's votes could flip it",
  dek: "A former teacher named Daniel J. Sullivan is also on the ballot. If his votes could have flipped a loss by Sen. Dan Sullivan, the Justice Department wants the result held until an investigation finds whether they were meant for the senator.",
  name: "Justice Department suit over Alaska's Senate certification",
  date: "2026-10-23",
  updated: "2026-10-24",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "From the ballot fight to the suit",
    entries: [
      { date: "June 15", title: "State removes the second Sullivan" },
      { date: "June 29", title: "Courts put him back" },
      { date: "Oct. 22", title: "Justice Department sues" },
      { date: "Nov. 25", title: "Target date to certify", current: true },
    ],
  },
};

export const ballotRows = [
  { name: "Heikes, Gerald L.", label: "(Registered Republican)" },
  { name: "Peltola, Mary", label: "(Registered Democrat)" },
  { name: "Sullivan, Daniel J. Jr.", label: "" },
  { name: "Sullivan, Dan S.", label: "(Registered Republican) Incumbent" },
];

export const timeline = [
  { date: "June 15", title: "On the Alaska Republican Party chair's complaints, the elections director removes Daniel J. Sullivan from the ballot.", cites: [{ c: "beecher-decertified" }] },
  { date: "June 26 and 29", title: "A state judge, then the Alaska Supreme Court, put him back.", cites: [{ c: "courts-restored" }] },
  { date: "Aug. 18", title: "The top-four primary. A source tells Reuters a federal grand jury has issued subpoenas about his candidacy.", cites: [{ c: "primary-shares" }, { c: "subpoenas-august" }] },
  { date: "Sept. 2", title: "Trump to Attorney General Todd Blanche: \"I think, Todd, you have a legal case on that.\"", cites: [{ c: "trump-sept2-blanche" }] },
  { date: "Oct. 13", title: "At a rally in Wasilla, Trump recounts having told Alaska's U.S. attorney, \"I hope you're going to make sure there's no cheating,\" adding, \"any place you have rank(ed) choice, you have damn bad cheating.\"", cites: [{ c: "trump-rally-heyman" }] },
  { date: "Oct. 21", title: "Trump says he is looking at \"powerful legal options\" to remove Daniel J. Sullivan from the ballot.", cites: [{ c: "trump-legal-options" }] },
  { date: "Oct. 22", title: "The department sues. Blanche: \"I'm not trying to not have an election certified.\"", cites: [{ c: "suit-filed" }, { c: "blanche-same-day" }] },
  { date: "Oct. 23", title: "Trump: \"I'm the one that said 'do it.'\"", cites: [{ c: "trump-ordered" }], current: true },
];

export const next = [
  { date: "Nov. 18", title: "Alaska plans to release its first ranked-choice count.", cites: [{ c: "tabulation-nov18" }] },
  { date: "Nov. 19", title: "The state review board is scheduled to begin its review.", cites: [{ c: "certify-target" }] },
  { date: "Nov. 25", title: "The state's target date to certify the election.", cites: [{ c: "certify-target" }], current: true },
];
