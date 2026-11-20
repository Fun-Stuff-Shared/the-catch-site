// Every number here is printed on an admitted record; the claim each comes from is named.
// Votes: icj-myanmar-press-release-2026-11-19, operative clause (ruling-* claims).
// Counts: icj-myanmar-judgment-2026-11-19 and icj-myanmar-summary-2026-11-19 (deaths, fled-2017, targeted-815000, min-gyi-750, fled-2016, expulsions-1978-1992).
// Refugees now: ap-icj-myanmar-genocide-2026-11-19 (refugees-now). Villages: icj-myanmar-joint-dissent-2026-11-19 (dissent-509).
export const n = {
  deadAtLeast: 10000,
  fled2017: 700000,
  targeted: 815000,
  refugeesNowMillions: 1.2,
  minGyiDead: 750,
  villages: 509,
  fled2016: 87000,
  earlierExpulsion: 200000,
  outposts: 30,
  reportYears: 2,
  pardonMonths: 8,
  sentenceYears: 10,
  oicMembers: 57,
  judges: 15,
  findingYear: 2017,
  serbiaYear: 2007,
  majority: 9,
  minority: 6,
};

const fmt = (x) => x.toLocaleString("en-US");

export const computed = { fmt };

export const event = {
  slug: "myanmar-genocide-case/2026-11-19-icj-rules-myanmar-committed-genocide",
  title: "UN court rules 9 to 6 that Myanmar committed genocide against the Rohingya",
  dek: "Nine judges found that Myanmar's security forces acted in 2017 with intent to destroy the Rohingya of northern Rakhine State; six said the evidence did not prove it.",
  name: "The Gambia v. Myanmar at the International Court of Justice",
  date: "2026-11-19",
  updated: "2026-11-20",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "The Gambia v. Myanmar",
    entries: [
      { date: "Aug. 2017", title: "Clearance operations in northern Rakhine" },
      { date: "Nov. 2019", title: "The Gambia sues" },
      { date: "Jan. 2026", title: "Hearings" },
      { date: "Nov. 19, 2026", title: "Genocide finding, 9 to 6", current: true },
    ],
  },
};

export const votes = [
  { c: "ruling-genocide", vote: "9 to 6" },
  { c: "ruling-prevent", vote: "9 to 6" },
  { c: "ruling-punish", vote: "11 to 4" },
  { c: "ruling-legislate", vote: "14 to 1" },
  { c: "ruling-evidence-order", vote: "11 to 4" },
  { c: "compensation-vote", vote: "10 to 5" },
  { c: "ruling-incite", vote: "14 to 1", forMyanmar: true },
];

export const chronology = [
  { date: "1978 and 1991-92", title: "Two military operations each drive about 200,000 Rohingya into Bangladesh; most later return.", cites: [{ c: "expulsions-1978-1992" }] },
  { date: "1982", title: "Burma adopts a new citizenship law; the court finds Rohingya were given access to citizenship in a discriminatory way.", cites: [{ c: "citizenship-law" }] },
  { date: "2016", title: "A first clearance operation; about 87,000 Rohingya flee to Bangladesh.", cites: [{ c: "fled-2016" }] },
  { date: "Aug. 25, 2017", title: "The Arakan Rohingya Salvation Army attacks at least 30 security posts; the clearance operations begin the same day.", cites: [{ c: "arsa-attacks" }] },
  { date: "Nov. 11, 2019", title: "The Gambia sues Myanmar at the court.", cites: [{ c: "gambia-filed" }] },
  { date: "Jan. 23, 2020", title: "The court orders Myanmar to prevent genocidal acts and preserve evidence.", cites: [{ c: "order-2020" }] },
  { date: "May 2020", title: "The remains of at least five Rohingya villages are burned, the court later finds.", cites: [{ c: "breach-may-2020" }] },
  { date: "Feb. 1, 2021", title: "The military seizes power, led by Min Aung Hlaing.", cites: [{ c: "coup-2021" }] },
  { date: "July 2022", title: "The court rules it can hear the case.", cites: [{ c: "jurisdiction-2022" }] },
  { date: "Jan. 12-29, 2026", title: "Hearings on the merits.", cites: [{ c: "hearings-2026" }] },
  { date: "Apr. 2026", title: "Min Aung Hlaing is declared president.", cites: [{ c: "mah-president" }] },
  { date: "Nov. 3, 2026", title: "The court announces it will rule on Nov. 19.", cites: [{ c: "date-set" }] },
  { date: "Nov. 19, 2026", title: "The court finds Myanmar committed genocide, 9 to 6.", cites: [{ c: "ruling-genocide" }], current: true },
];
