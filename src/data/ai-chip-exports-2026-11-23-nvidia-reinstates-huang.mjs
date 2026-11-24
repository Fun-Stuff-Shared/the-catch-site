// Every number here is printed on an admitted record or counted from one.
// Dates: nvidia-8k-2026-11-12 (resignation accepted Nov. 11), nvidia-8k-2026-11-23 (vote Nov. 22).
// Stock: cnbc-stock-2026-11-23. Entity List: fr-pi-2026-23999.

const day = (s) => Date.UTC(...s.split("-").map((v, i) => (i === 1 ? Number(v) - 1 : Number(v))));
const resigned = "2026-11-11";
const voted = "2026-11-22";
const daysOut = Math.round((day(voted) - day(resigned)) / 86400000);
if (daysOut !== 11) throw new Error("days between resignation and vote do not match the 8-Ks");

export const n = {
  daysOut,
  stockUp: "31%",
  stockDown: "nearly 33%",
  listed: 7,
  trades: 103,
  ballroom: "$25 million",
};

export const event = {
  slug: "ai-chip-exports/2026-11-23-nvidia-reinstates-huang",
  title: "Nvidia brings Jensen Huang back as CEO; Trump says he 'convinced' the board",
  dek: "The board cites input from senior government officials, which it does not describe, and says its own investigation of whether Huang was targeted by a foreign intelligence effort continues.",
  name: "Nvidia's reinstatement of Jensen Huang as chief executive",
  date: "2026-11-23",
  updated: "2026-11-24",
  kpis: [
    { value: String(daysOut), unit: "days", label: "From the board accepting Huang's resignation to its vote to bring him back", cites: [{ c: "resigned-nov-12" }, { c: "board-vote-nov-22" }] },
    { value: n.stockUp, label: "Change in Nvidia's stock in Monday's trading, November 23, the day of the announcement", cites: [{ c: "stock-up-31" }] },
    { value: String(n.listed), unit: "companies", label: "Added to the Entity List that afternoon, Megaspeed among them", cites: [{ c: "entity-list" }] },
  ],
};

export const subjectFigure = { label: "Days from Huang's resignation to the board's vote to reinstate him", value: String(daysOut), unit: "days" };

// The dated chain; each label is its claim's short form with any date prefix dropped.
export const chronology = [
  { date: "Nov. 8", c: "board-opened-nov-8" },
  { date: "Nov. 11", c: "resigned-nov-12" },
  { date: "Nov. 17", c: "huang-offer" },
  { date: "Nov. 17", c: "jones-no-reinstate" },
  { date: "Nov. 21", c: "wsj-not-target" },
  { date: "Nov. 22", c: "trump-post-nov-22" },
  { date: "Nov. 22", c: "board-vote-nov-22" },
  { date: "Nov. 23", c: "announced-nov-23" },
  { date: "Nov. 23", c: "trump-exonerated" },
  { date: "Nov. 23", c: "entity-list", current: true },
];

// Who said what about Huang's legal exposure, in their own words.
export const words = [
  { who: "Trump, on CNBC, asked what the attorney general told him", on: "On the record", said: "\"they felt that he himself was was exonerated. I don't know what word you want to use.\"", c: "trump-exonerated" },
  { who: "Trump's post, the morning of the announcement", on: "On the record", said: "The attorney general \"has confirmed that the U.S. Government does not possess evidence that he has engaged in any unlawful conduct.\"", c: "trump-post-no-evidence" },
  { who: "Attorney General Todd Blanche, on Fox News, asked whether the investigation was closed", on: "On the record", said: "\"That assumes there’s an investigation that’s open.\" \"And that’s never been discussed publicly.\"", c: "blanche-fox" },
  { who: "U.S. officials, to The Wall Street Journal", on: "Anonymous", said: "Blanche told Trump and Vance that Huang \"wasn't the target or the subject of any Justice Department investigation.\"", c: "wsj-not-target" },
  { who: "A law-enforcement source, to the Washington Examiner", on: "Anonymous", said: "The department \"never opened an investigation into Jensen Huang or Nvidia as part of the Megaspeed case.\"", c: "examiner-never-opened" },
];

// What is still open, and into what.
export const inquiries = [
  { who: "Justice Department", into: "A criminal investigation of Megaspeed, which it took over after Commerce's 2024 export-control investigation; \"still going strong,\" a law-enforcement source told the Examiner", c: ["doj-megaspeed-case", "examiner-never-opened"] },
  { who: "Nvidia's board", into: "Whether Huang was the target of a foreign intelligence effort; it will \"proceed to conclusion\"", c: ["board-probe-continues"] },
  { who: "Securities and Exchange Commission", into: "Nvidia's accounting, according to two people cited by Reuters", c: ["sec-probe"] },
  { who: "California attorney general", into: "Whether Nvidia's chips or confidential information went to China, and whether it misled investors", c: ["california-probe"] },
  { who: "Missouri attorney general", into: "Whether Huang's actions harmed state pension funds", c: ["missouri-probe"] },
];

// The dates ahead.
export const steps = [
  { when: "Dec. 1", what: "Huang sits for a transcribed interview with three House committees", href: "/events/ai-chip-exports/2026-11-19-house-committee-releases-china-chip-license-data/", c: ["house-interviews"] },
  { when: "Dec. 2", what: "Nvidia's general counsel does the same", c: ["house-interviews"] },
  { when: "Dec. 3", what: "Huang testifies publicly before the Senate Banking Committee, the only witness", c: ["senate-hearing"] },
  { when: "No date", what: "Nvidia's search for a chief compliance officer who reports to the board's Nominating and Corporate Governance Committee", c: ["cco"] },
];

const c = (id) => ({ c: id });
export const explanations = [
  {
    id: "exonerated",
    name: "A government investigation cleared Huang",
    holders: "Trump, on CNBC; Forbes's headline",
    verdict: "not",
    summary: ["No Justice Department finding about Huang has been made public, and the attorney general, asked on air, described none.", c("no-doj-statement"), c("blanche-fox")],
    claim: [["Trump said they \"felt that he himself was was exonerated,\" adding \"I don't know what word you want to use.\"", c("trump-exonerated")]],
    evidenceFor: [["Trump's post says the attorney general confirmed the government does not possess evidence of unlawful conduct by Huang.", c("trump-post-no-evidence")]],
    evidenceAgainst: [["Blanche, asked whether the investigation was closed: \"That assumes there’s an investigation that’s open.\" U.S. officials told the Journal Huang was not a target or subject of any Justice Department investigation.", c("blanche-fox"), c("wsj-not-target")]],
    conclusion: [["Trump relays a statement about evidence the government does not have; no record holds a finding that cleared Huang.", c("trump-post-no-evidence"), c("no-doj-statement")]],
  },
  {
    id: "no-evidence",
    name: "The government says it has no evidence Huang broke the law",
    holders: "Trump's post; a Justice Department official",
    verdict: "supported",
    summary: ["That is the government's position as Trump and an unnamed department official relay it.", c("trump-post-no-evidence"), c("no-doj-statement")],
    claim: [["The attorney general \"has confirmed that the U.S. Government does not possess evidence that he has engaged in any unlawful conduct.\"", c("trump-post-no-evidence")]],
    evidenceFor: [["A Justice Department official told reporters the department has no evidence of wrongdoing by Huang or Nvidia.", c("no-doj-statement")]],
    evidenceAgainst: [["The department has published nothing of its own on Huang, and it declined to comment to Reuters.", c("no-doj-statement"), c("federal-status-unknown")]],
    conclusion: [["That is the government's position as relayed; it speaks of evidence held, not of innocence found.", c("trump-post-no-evidence"), c("no-doj-statement")]],
  },
  {
    id: "never-investigated",
    name: "There was never a Justice Department case against Huang to clear",
    holders: "U.S. officials, to The Wall Street Journal; a law-enforcement source, to the Washington Examiner",
    verdict: "partly",
    summary: ["Two anonymous accounts say so; the attorney general on the record neither confirms nor denies it.", c("wsj-not-target"), c("examiner-never-opened"), c("blanche-fox")],
    claim: [["Blanche told Trump and Vance that Huang was not the target or subject of any Justice Department investigation, according to U.S. officials.", c("wsj-not-target")]],
    evidenceFor: [["A law-enforcement source says the department never opened an investigation into Huang or Nvidia in the Megaspeed case.", c("examiner-never-opened")]],
    evidenceAgainst: [["Reuters could not determine the status of federal criminal probes, and the department declined to comment.", c("federal-status-unknown")]],
    conclusion: [["Two anonymous accounts say it and no record contradicts it; the attorney general has not said it on the record.", c("wsj-not-target"), c("examiner-never-opened"), c("federal-status-unknown")]],
  },
  {
    id: "still-investigated",
    name: "Huang himself is still under federal criminal investigation",
    holders: "No one claims it on the record; tested as an alternative",
    verdict: "untestable",
    summary: ["No record places Huang under investigation; the remark sometimes read that way was about Alice Huang.", c("blanche-alice-earlier")],
    claim: [["Earlier in November Blanche said \"of course DOJ is investigating or looking at it.\"", c("blanche-alice-earlier")]],
    evidenceFor: [["Blanche would not say on Fox whether any investigation was open or closed.", c("blanche-fox")]],
    evidenceAgainst: [["That remark was about whether Alice Huang was a Chinese spy, and officials told the Journal Huang was not a target or subject.", c("blanche-alice-earlier"), c("wsj-not-target")]],
    conclusion: [["No record supports it; no on-record government source rules it out.", c("blanche-alice-earlier"), c("federal-status-unknown")]],
  },
  {
    id: "cover",
    name: "The assurance was cover for Trump's own interests",
    holders: "Sen. Chuck Schumer",
    verdict: "untestable",
    summary: ["The board did rely on an assurance the administration arranged; no record shows why officials gave it beyond what they say.", c("board-govt-input"), c("board-needed-two"), c("schumer")],
    claim: [["Schumer: Trump is putting \"his own financial interests and the needs of his billionaire buddies before our national security.\"", c("schumer")]],
    evidenceFor: [["Trump's accounts have traded Nvidia shares at least 103 times from January 2025 through August 2026, by CNBC's count of his disclosures, and Nvidia, already a $1 million donor to his inaugural fund, went on to pledge $25 million to his planned ballroom.", c("trump-trades"), c("ballroom")]],
    evidenceAgainst: [["The White House says independent advisers manage Trump's portfolio without his input.", c("trump-trades")]],
    conclusion: [["Schumer says Trump is putting his own financial interests before national security; the board says input from senior levels of the government made it confident Huang's return poses no national security risk.", c("schumer"), c("board-govt-input")]],
  },
];
