// Every count here is printed on an admitted record; the claim each comes from is named.
// Board rates and counts: politifact-2026-10-23 (claims board-rate-2026, board-rate-2022-same-stage, nc-final-2022, national-2022, mail-volume-down).
// County counts: democracy-docket-2026-10-23 (Wake), wfae-2026-10-22 (Mecklenburg, Guilford).
export const n = {
  rate2026: "3.1",
  rate2022: "2.6",
  rate2022Final: "2.2",
  rateNational2022: "1.5",
  rateVolunteer: "3",
  rejected2026: "1,349",
  rejected2022: "1,829",
  mailDown: "38",
  wakeRejected: 277,
  wakeSeal: 147,
  wakeRevoted: 53,
  meckSeal: 259,
  meckRevoted: 60,
  guilfordSeal: 38,
  guilfordNewBallots: 13,
  guilfordEarly: 2,
  castAtHearing: "31,582",
};

export const computed = {
  sealTwoCounties: n.wakeSeal + n.meckSeal,
  guilfordRevoted: n.guilfordNewBallots + n.guilfordEarly,
  meckNotRevoted: n.meckSeal - n.meckRevoted,
};

export const event = {
  slug: "north-carolina-mail-ballots/2026-10-21-north-carolina-rejects-more-mail-ballots",
  title: "North Carolina's mail-ballot rejection rate is up, but it has not doubled as the governor says",
  dek: `Since Sept. 4 a mail ballot whose inner envelope arrives unsealed is spoiled, and the State Board puts this fall's rejection rate, for every reason, at ${n.rate2026}%, against ${n.rate2022}% at this point in 2022.`,
  name: "North Carolina's mail-ballot sealing rule and rejection rate",
  date: "2026-10-21",
  updated: "2026-10-24",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "North Carolina's sealing rule",
    entries: [
      { date: "Aug. 2, 2024", title: "Board says one sealed envelope is enough" },
      { date: "Feb. 2, 2026", title: "Board reverses itself" },
      { date: "Sept. 4, 2026", title: "Counties told to spoil unsealed ballots" },
      { date: "Oct. 21, 2026", title: "Board puts the rate at 3.1%", current: true },
    ],
  },
};

// Rejection rates, each bar labelled with its claim's short form.
export const rates = [
  { c: "cc-sample", value: Number(n.rateVolunteer), note: "volunteer reports, 27 of 100 counties" },
  { c: "board-rate-2026", value: Number(n.rate2026), note: "the State Board, statewide" },
  { c: "board-rate-2022-same-stage", value: Number(n.rate2022), note: "the State Board, statewide" },
  { c: "nc-final-2022", value: Number(n.rate2022Final), note: "Election Assistance Commission" },
  { c: "national-2022", value: Number(n.rateNational2022), note: "Election Assistance Commission" },
];

export const chronology = [
  { date: "Apr. 2023", title: "Photo ID takes effect; mail ballots go in an inner envelope inside an outer one.", cites: [{ c: "two-envelopes" }] },
  { date: "Aug. 2, 2024", title: "The Board refuses a Republican request and keeps counting ballots in a sealed outer envelope.", cites: [{ c: "board-2024-reaffirmed" }] },
  { date: "Dec. 4, 2025", title: "A consent judgment in the Republicans' suit makes the Board reconsider.", cites: [{ c: "consent-judgment" }] },
  { date: "Feb. 2, 2026", title: "The Board rules its earlier instruction was not correct.", cites: [{ c: "feb-ruling" }] },
  { date: "Sept. 4", title: "The Board, 3-2, tells counties to spoil ballots in an unsealed inner envelope; mail ballots go out.", cites: [{ c: "memo-vote" }, { c: "rule-2026" }] },
  { date: "Sept. 22", title: "Three advocacy groups and two voters sue.", cites: [{ c: "suit" }] },
  { date: "Oct. 19", title: "Judge Thomas Schroeder refuses to block the rule.", cites: [{ c: "ruling-denied" }] },
  { date: "Oct. 20", title: "Gov. Josh Stein says the rejection rate is twice 2022's.", cites: [{ c: "stein-claim" }] },
  { date: "Oct. 21", title: "The Board's figures are reported: 3.1%, against 2.6% at the same point in 2022.", current: true, cites: [{ c: "board-slight-increase" }] },
  { date: "Oct. 23", title: "PolitiFact publishes its rating of Stein's claim: Mostly False.", cites: [{ c: "politifact-rating" }] },
];

export const subjectFigure = { label: "Mail ballots rejected through Oct. 20, State Board", value: n.rate2026, unit: "%" };
