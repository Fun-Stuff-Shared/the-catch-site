// Vote totals: data/sources/texas-senate/sos-results-2026-11-04.txt, updated 11/04/2026 04:59 PM, unofficial.
// Margins are shares of all votes in each race, write-ins and third parties included.
const races = [
  { race: "U.S. Senate", dem: "James Talarico", demVotes: 5444982, rep: "Ken Paxton", repVotes: 4249373, total: 9889704 },
  { race: "Governor", dem: "Gina Hinojosa", demVotes: 5230789, rep: "Greg Abbott", repVotes: 4524527, total: 9907381 },
  { race: "Railroad commissioner", dem: "Jon Rosenthal", demVotes: 5103177, rep: "Bo French", repVotes: 4426141, total: 9717302 },
  { race: "Attorney general", dem: "Nathan Johnson", demVotes: 5133629, rep: "Mayes Middleton", repVotes: 4502442, total: 9801621 },
  { race: "Lieutenant governor", dem: "Vikki Goodwin", demVotes: 5083581, rep: "Dan Patrick", repVotes: 4484652, total: 9828050 },
  { race: "Supreme Court, Place 7", dem: "Kristen Hawkins", demVotes: 5112073, rep: "Kyle Hawkins", repVotes: 4572758, total: 9684831 },
  { race: "Comptroller", dem: "Sarah Eckhardt", demVotes: 5014496, rep: "Don Huffines", repVotes: 4511185, total: 9774685 },
  { race: "Supreme Court, chief justice", dem: "Maggie Ellis", demVotes: 5102288, rep: "Jimmy Blacklock", repVotes: 4625886, total: 9728174 },
  { race: "Agriculture commissioner", dem: "Clayton Tucker", demVotes: 4991896, rep: "Nate Sheets", repVotes: 4538736, total: 9729656 },
  { race: "Court of Criminal Appeals, Place 9", dem: "Holly Taylor", demVotes: 5043094, rep: "John Messinger", repVotes: 4602681, total: 9645775 },
  { race: "Land commissioner", dem: "Benjamin Flores", demVotes: 5014714, rep: "Dawn Buckingham", repVotes: 4576883, total: 9747005 },
  { race: "Supreme Court, Place 2", dem: "Chari Kelly", demVotes: 5068047, rep: "James P. Sullivan", repVotes: 4631182, total: 9699229 },
  { race: "Supreme Court, Place 8", dem: "Gisela D. Triana", demVotes: 5033586, rep: "Brett Busby", repVotes: 4643375, total: 9676961 },
  { race: "15th Court of Appeals, Place 2", dem: "Tom Baker", demVotes: 4998619, rep: "Scott K. Field", repVotes: 4618116, total: 9616735 },
  { race: "15th Court of Appeals, chief justice", dem: "Jerry Zimmerer", demVotes: 4985001, rep: "Scott Brister", repVotes: 4636992, total: 9621993 },
  { race: "Court of Criminal Appeals, Place 4", dem: "Audra Riley", demVotes: 4996898, rep: "Kevin Patrick Yeary", repVotes: 4659299, total: 9656197 },
  { race: "15th Court of Appeals, Place 3", dem: "Marc M. Meyer", demVotes: 4950446, rep: "April Farris", repVotes: 4654820, total: 9605266 },
  { race: "Court of Criminal Appeals, Place 3", dem: "Okey Anyiam", demVotes: 4839230, rep: "Thomas Smith", repVotes: 4601878, total: 9672156 },
];
const n = (x) => x.toLocaleString("en-US");
const margin = (r) => (100 * (r.demVotes - r.repVotes)) / r.total;
const senate = races[0];
const abbott = races[1];
export const computed = {
  raceCount: races.length,
  talaricoVotes: n(senate.demVotes),
  paxtonVotes: n(senate.repVotes),
  talaricoPct: ((100 * senate.demVotes) / senate.total).toFixed(1),
  paxtonPct: ((100 * senate.repVotes) / senate.total).toFixed(1),
  margin: margin(senate).toFixed(1),
  abbottVotes: n(abbott.repVotes),
  behindAbbott: n(abbott.repVotes - senate.repVotes),
  otherLow: Math.min(...races.slice(1).map(margin)).toFixed(1),
  otherHigh: Math.max(...races.slice(1).map(margin)).toFixed(1),
  smallestGap: n(Math.min(...races.map((r) => r.demVotes - r.repVotes))),
  cruzGap: n(4260553 - senate.repVotes),
  demGain: n(senate.demVotes - 4045632),
};
export const ticket = {
  rows: [...races]
    .sort((a, b) => margin(b) - margin(a))
    .map((r) => [`${r.race}: ${r.rep}, ${n(r.repVotes)}`, `+${margin(r).toFixed(1)}`]),
};
export const swing = {
  bars: [
    { label: "Under 15%", value: 14.4 },
    { label: "15-30%", value: 22.8 },
    { label: "30-50%", value: 25.5 },
    { label: "50-75%", value: 26.8 },
    { label: "75% or more", value: 42.9 },
  ],
};
export const polls = {
  rows: [
    ["Sept.-Oct. 2025", "University of Houston/TSU", "Cornyn +3", ""],
    ["January", "Emerson", "Cornyn +3", "Tied"],
    ["January", "University of Houston", "Cornyn +1", ""],
    ["March", "Public Policy Polling, for Senate Majority PAC", "Talarico +1", "Talarico +2"],
    ["April", "Texas Public Opinion Research", "Talarico +3", "Talarico +5"],
    ["April", "University of Texas", "Talarico +7", ""],
    ["April-May", "TSU/YouGov", "Cornyn +1", ""],
  ],
};
export const money = {
  rows: [
    ["Aug. 21", "Musk's trust to Lone Star Liberty PAC", "$10 million"],
    ["Sept. 9", "Musk to Senate Leadership Fund", "$75 million"],
    ["Sept. 10", "Senate Leadership Fund to Texas PAC", "$75 million"],
    ["Sept. 23", "Musk to Senate Leadership Fund", "$83 million"],
    ["Sept. 24", "Senate Leadership Fund to Texas PAC", "$83 million"],
  ],
};
export const chronology = [
  { date: "Sept. 2025", title: "Talarico launches his campaign", cites: [{ c: "talarico-launch" }] },
  { date: "March 3", title: "Talarico beats Rep. Jasmine Crockett; Cornyn leads the Republican primary, short of a majority", cites: [{ c: "march-primary" }] },
  { date: "May", title: "Trump endorses Paxton; a week later Paxton wins the runoff 888,196 to 503,438", cites: [{ c: "trump-endorsed-paxton" }, { c: "runoff" }] },
  { date: "Aug.-Sept.", title: "Musk's money arrives, $168 million by Sept. 24", cites: [{ c: "trust-lone-star" }, { c: "musk-slf" }] },
  { date: "October", title: "Trump asks Cornyn's voters to unite, and says Cornyn and Rove will be to blame if Paxton loses", cites: [{ c: "trump-unite" }, { c: "trump-blame-before" }] },
  { date: "Final weeks", title: "Late polls listed by Newsweek run from Paxton +1 to Talarico +7", cites: [{ c: "late-polls" }] },
  { date: "Nov. 3", title: "Talarico wins by 12.1 points", current: true, cites: [{ c: "margin-12" }] },
];
export const event = {
  slug: "texas-senate/2026-11-03-talarico-wins-texas-senate",
  title: "Talarico beats Paxton by 12 points as Republicans lose every statewide race in Texas",
  dek: `Talarico took ${computed.talaricoPct} percent to Paxton's ${computed.paxtonPct}, in a seat Republicans had held since 1961.`,
  name: "Talarico wins the Texas Senate seat",
  date: "2026-11-03",
  updated: "2026-11-05",
  kpis: [],
};
