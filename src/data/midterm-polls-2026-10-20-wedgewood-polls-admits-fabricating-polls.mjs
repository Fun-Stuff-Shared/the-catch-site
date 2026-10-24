// Every date and count here is printed on an admitted record; each entry cites its claim.
// General-election rows: silver-table-2026-10-22, the Democratic margin in Wedgewood's "poll" and in Silver Bulletin's average.
// Primary rows: poliagg-wedgewood for Wedgewood's numbers; nyt-el-sayed-polls-2026-10-24, urbanmilwaukee-2026-08-19 for the real polls.

const silverRows = [
  { race: "Georgia governor", dates: "Oct. 2-3", wedgewood: -2, average: -0.4 },
  { race: "Georgia Senate", dates: "Oct. 2-3", wedgewood: 10, average: 8.3 },
  { race: "Iowa governor", dates: "Aug. 27-29", wedgewood: 5, average: 6.3 },
  { race: "Iowa Senate", dates: "Aug. 27-29", wedgewood: -2, average: -1.9 },
  { race: "Kansas governor", dates: "Sept. 22-24", wedgewood: -4, average: -6.8 },
  { race: "Kansas Senate", dates: "Sept. 22-24", wedgewood: 2, average: -1.5 },
  { race: "Maine Senate", dates: "July 4-6", wedgewood: 5, average: null },
  { race: "Maine Senate", dates: "Sept. 27-Oct. 1", wedgewood: 4, average: 2.7 },
  { race: "Michigan Senate", dates: "June 25-28", wedgewood: 5, average: 0.4 },
  { race: "Michigan governor", dates: "Oct. 8-9", wedgewood: 10, average: 7.9 },
  { race: "Michigan Senate", dates: "Oct. 8-9", wedgewood: 6, average: 3.5 },
  { race: "Mississippi Senate", dates: "Oct. 12-14", wedgewood: -4, average: null },
  { race: "Nebraska governor", dates: "Sept. 14-16", wedgewood: -17, average: null },
  { race: "Nebraska Senate", dates: "Sept. 14-16", wedgewood: -4, average: 2.3, note: "the poll Wedgewood says was real" },
  { race: "Nevada governor", dates: "July 9-12", wedgewood: -3, average: -4.4 },
  { race: "Nevada 2nd District", dates: "July 9-12", wedgewood: 2, average: null },
  { race: "Ohio governor", dates: "Aug. 11-13", wedgewood: 1, average: 0.5 },
  { race: "Ohio Senate", dates: "Aug. 11-13", wedgewood: 4, average: 1.4 },
  { race: "Texas governor", dates: "July 30-31", wedgewood: -6, average: -3.6 },
  { race: "Texas Senate", dates: "July 30-31", wedgewood: 2, average: 2.7 },
];

const round1 = (x) => Math.round(x * 10) / 10;
const signed = (x) => (x > 0 ? `D+${x}` : x < 0 ? `R+${-x}` : "Tied");
const compared = silverRows.filter((r) => r.average !== null).map((r) => ({ ...r, gap: round1(r.wedgewood - r.average) }));

export const lean = {
  total: silverRows.length,
  compared: compared.length,
  moreDemocratic: compared.filter((r) => r.gap > 0).length,
  moreRepublican: compared.filter((r) => r.gap < 0).length,
  rows: compared.map((r) => [`${r.race}, ${r.dates}${r.note ? ` (${r.note})` : ""}`, `${signed(r.wedgewood)} / ${signed(r.average)}`, r.gap > 0 ? `D ${r.gap}` : `R ${-r.gap}`]),
};

export const primaries = [
  { race: "Michigan Senate", dates: "June 25-28", wedgewood: "El-Sayed 46, Stevens 39, McMorrow 9", real: "El-Sayed ahead in most polls, mostly by single digits", c: "mi-primary-poll-vs-real" },
  { race: "Wisconsin governor", dates: "early July", wedgewood: "Hong 30, Barnes 28, Rodriguez 19", real: "Hong with \"far less of the vote,\" per Urban Milwaukee", c: "wi-early-poll-high" },
  { race: "Wisconsin governor", dates: "July 21", wedgewood: "Hong 38, Barnes 30, Crowley 9", real: "Marquette's last poll: Hong 38, Crowley 7", c: "wi-july21-vs-marquette" },
];

export const caught = [
  { date: "The week before", title: "FiftyPlusOne says a trusted source tipped it that Wedgewood may be faking data.", cites: [{ c: "how-caught" }] },
  { date: "Oct. 15", title: "Wedgewood sends FiftyPlusOne raw survey data, which FiftyPlusOne later confirms was fraudulent.", cites: [{ c: "raw-data-fake" }] },
  { date: "Oct. 20, morning", title: "FiftyPlusOne asks Wedgewood to respond by midnight, ahead of publishing its findings.", cites: [{ c: "fiftyplusone-deadline" }, { c: "statement-time" }] },
  { date: "Oct. 20, 6:19 p.m. ET", title: "Wedgewood posts its statement on X.", cites: [{ c: "statement-time" }], current: true },
];

export const corrections = [
  { outlet: "The New York Times", ran: "15 polls on its tracking pages, and references in poll stories", after: "Removed the polls the night of Oct. 20; editors' notes on its Aug. 4 Michigan and Aug. 11 Wisconsin stories", cs: ["nyt-removed-15", "nyt-notes-stories"], fixed: true },
  { outlet: "USA Today", ran: "Wedgewood numbers in several stories", after: "Notes on its Sept. 18 and Oct. 5 stories; its Oct. 13 debate live blog still cites a Georgia poll, as fetched Oct. 24", cs: ["usatoday-all-removed-claim", "usatoday-live-blog-still-cites"], fixed: false },
  { outlet: "The Hill", ran: "A Nebraska poll in an Oct. 4 story; a July story on the Maine poll", after: "Removed the Nebraska poll Oct. 21, with a note; AOL's syndicated copy of the July Maine story still carries the poll, as fetched Oct. 24", cs: ["thehill-corrected", "thehill-maine-aol"], fixed: false },
  { outlet: "Newsweek", ran: "Several stories", after: "Says it retracted three and corrected others", cs: ["newsweek-retracted"], fixed: true },
  { outlet: "Washington Examiner", ran: "Three mentions in July", after: "Says it removed them", cs: ["examiner-removed"], fixed: true },
  { outlet: "Mediaite", ran: "The July Maine poll", after: "Removed it, with a note", cs: ["mediaite-maine-corrected"], fixed: true },
  { outlet: "The Daily Beast", ran: "Two stories", after: "Updated both", cs: ["dailybeast-updated"], fixed: true },
  { outlet: "Breitbart", ran: "An August Texas poll story", after: "Added a note", cs: ["breitbart-note"], fixed: true },
];

export const trackers = [
  { outlet: "Decision Desk HQ", after: "Removed 17 polls from its lists and averages; its data site hosts the Nebraska release", cs: ["ddhq-removed-17", "ddhq-still-hosts-nebraska"] },
  { outlet: "Silver Bulletin", after: "Removed the polls; banned Wedgewood permanently", cs: ["silver-banned"] },
  { outlet: "State Navigate", after: "Removed the polls from its governor forecasts in nine states", cs: ["statenavigate-removed"] },
  { outlet: "Scopes", after: "Removed the polls; withheld its Kansas Senate figure, which no longer had enough pollsters", cs: ["scopes-withheld"] },
  { outlet: "RealClearPolitics", after: "Says it never listed Wedgewood", cs: ["rcp-rejected"] },
  { outlet: "PollingSource", after: "Lists 23 Wedgewood polls as active; its Mississippi Senate average still includes Wedgewood's Oct. 12-14 poll, as read Oct. 24", cs: ["pollingsource-still-lists", "pollingsource-ms-in-average"] },
  { outlet: "Prediction Edge", after: "Its Georgia Senate page lists Wedgewood's Oct. 2-3 poll among its latest polls, as read Oct. 24", cs: ["predictionedge-still-lists"] },
];


export const event = {
  slug: "midterm-polls/2026-10-20-wedgewood-polls-admits-fabricating-polls",
  title: "Pollster admits faking midterm polls that news outlets and forecasters cited",
  dek: "USA Today says it removed every reference to the polls, but as of Oct. 24 its Oct. 13 Georgia debate live blog still cites one.",
  name: "Wedgewood Polls' fabricated polls",
  date: "2026-10-20",
  updated: "2026-10-24",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "How Wedgewood was caught",
    entries: [
      { date: "Oct. 15", title: "Sends FiftyPlusOne raw data" },
      { date: "Oct. 20, morning", title: "FiftyPlusOne asks for comment" },
      { date: "Oct. 20, evening", title: "Wedgewood admits it", current: true },
    ],
  },
};
