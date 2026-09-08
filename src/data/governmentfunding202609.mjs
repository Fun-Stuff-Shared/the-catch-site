// Government funding stopgap, September 2026.
// Vote totals from the House Clerk roll-call XML and the Senate roll-call XML.
// Calendar arithmetic from those dated records and the enrolled bill's December 11 date.

export const event = {
  slug: "government-funding/september-2026",
  title: "The House sent a stopgap funding bill to the president, 370 to 48; he signed it the next day",
  dek: "H.R. 6500 keeps most federal agencies at fiscal year 2026 rates through December 11, 2026. The Senate had passed the same text 90 to 6 on August 8. The president signed it September 2 as Public Law 119-103.",
  name: "Government funding",
  span: "August 8 to September 2, 2026",
  date: "2026-09-01",
  updated: "2026-09-08",
  kpis: [
    { value: "370-48", unit: "", label: "House vote, September 1 (two-thirds required)" },
    { value: "90-6", unit: "", label: "Senate vote, August 8" },
    { value: "Dec. 11", unit: "2026", label: "funding date in the enrolled bill" },
    { value: "119-103", unit: "", label: "public law, signed September 2" },
  ],
};

// House Clerk roll 286 party table, recounted from house-roll286.xml.
export const houseVote = {
  yeas: 370,
  nays: 48,
  notVoting: 14,
  republican: { yea: 193, nay: 19, notVoting: 6 },
  democratic: { yea: 176, nay: 29, notVoting: 8 },
  independent: { yea: 1, nay: 0, notVoting: 0 },
  republicanNays: [
    "Biggs (AZ)", "Biggs (SC)", "Brecheen", "Burlison", "Cloud", "Clyde", "Crane",
    "Davidson", "Harris (MD)", "Higgins (LA)", "Massie", "Norman", "Perry", "Rose",
    "Roy", "Schweikert", "Self", "Sessions", "Steube",
  ],
  democraticNays: [
    "Ansari", "Boyle (PA)", "Carson", "Casar", "Castro (TX)", "Dexter", "Espaillat",
    "Frost", "Garcia (CA)", "García (IL)", "Gomez", "Jayapal", "Khanna", "Lee (PA)",
    "Magaziner", "Matsui", "McGarvey", "McGovern", "Min", "Ocasio-Cortez", "Omar",
    "Pressley", "Ramirez", "Simon", "Thanedar", "Thompson (CA)", "Tlaib", "Tonko",
    "Underwood",
  ],
};

// House Clerk roll 288, recounted from house-roll288.xml.
export const ruleVote = {
  yeas: 210,
  nays: 208,
  republican: { yea: 207, nay: 5 },
  democratic: { yea: 2, nay: 203 },
  republicanNays: ["Harris (MD)", "Higgins (LA)", "Norman", "Roy", "Sessions"],
  democraticYeas: ["Golden (ME)", "Perez"],
};

// House Clerk roll 272, July 21, 2026, recounted from house-roll272.xml.
export const julyVote = {
  yeas: 220,
  nays: 205,
  republican: { yea: 213, nay: 1 },
  democratic: { yea: 6, nay: 204 },
  independent: { yea: 1, nay: 0 },
};

// House Clerk roll 14, January 12, 2026, recounted from house-roll014.xml.
export const januaryVote = {
  yeas: 340,
  nays: 54,
  republican: { yea: 149, nay: 43 },
  democratic: { yea: 191, nay: 11 },
};

// Senate vote 228, recounted from senate-vote-228.xml.
export const senateVote = {
  yeas: 90,
  nays: 6,
  present: 1,
  absent: 3,
};

// Senate vote 227, recounted from senate-vote-227.xml.
export const buddVote = {
  yeas: 61,
  nays: 32,
  republican: { yea: 26, nay: 21 },
  democratic: { yea: 34, nay: 11 },
  independent: { yea: 1, nay: 0 },
};

// Elapsed-day differences from dated records. September 1 to December 11 is 101 elapsed days.
export const calendar = {
  houseVote: "2026-09-01",
  senateVote: "2026-08-08",
  signed: "2026-09-02",
  election: "2026-11-03",
  expiry: "2026-12-11",
  fiscalYearStart: "2026-10-01",
  daysHouseVoteToExpiry: 101, // (2026-12-11) - (2026-09-01)
  daysHouseVoteToElection: 63, // (2026-11-03) - (2026-09-01)
  daysElectionToExpiry: 38, // (2026-12-11) - (2026-11-03)
  daysSenateToHouse: 24, // (2026-09-01) - (2026-08-08)
};

// Public Law 119-37 approved November 12, 2025. 365 days later is November 12, 2026.
// November 12, 2026 to December 11, 2026 is 29 elapsed days.
export const hemp = {
  publicLaw: "119-37",
  approved: "2025-11-12",
  fullEffect: "2026-11-12",
  delayUntil: "2026-12-11",
  daysAfterEnactment: 365,
  delayDays: 29,
};

export const timeline = [
  { date: "Jan 12", title: "H.R. 6500 passes the House as a trade bill", sub: `AGOA Extension Act, ${januaryVote.yeas} to ${januaryVote.nays}, on suspension` },
  { date: "Jul 21", title: "The House passes its own stopgap, H.R. 9770", sub: `Through December 4, ${julyVote.yeas} to ${julyVote.nays}; the Senate never votes on it` },
  { date: "Aug 2", title: "Collins releases the Senate stopgap", sub: "Written into H.R. 6500 as a Senate amendment" },
  { date: "Aug 3", title: "The White House backs the Senate text", sub: "Budget office policy statement: a clean, short-term continuing resolution" },
  { date: "Aug 8", title: `The Senate passes it ${senateVote.yeas} to ${senateVote.nays} at 3:37 a.m.`, sub: `An hour earlier it tables the Budd hemp amendment, ${buddVote.yeas} to ${buddVote.nays}` },
  { date: "Sep 1", title: `The House concurs, ${houseVote.yeas} to ${houseVote.nays}`, sub: "Suspension vote at 2:03 p.m.; the roll call still says AGOA", current: true },
  { date: "Sep 2", title: "Signed: Public Law 119-103", sub: "White House note; 140 Stat. 987" },
  { date: "Nov 3", title: "Federal election day", sub: `${calendar.daysElectionToExpiry} days before the money runs out` },
  { date: "Nov 12", title: "New hemp definition takes effect, in part", sub: "Only the lab-made-cannabinoid part until December 11" },
  { date: "Dec 11", title: "The stopgap ends", sub: "Or earlier, program by program, when a full-year act is signed" },
];

export const votesRows = [
  ["House roll 14, Jan 12", "Pass H.R. 6500 as the AGOA Extension Act", `${januaryVote.yeas} to ${januaryVote.nays}`, `R ${januaryVote.republican.yea} to ${januaryVote.republican.nay}`, `D ${januaryVote.democratic.yea} to ${januaryVote.democratic.nay}`],
  ["House roll 272, Jul 21", "Pass H.R. 9770, the House stopgap", `${julyVote.yeas} to ${julyVote.nays}`, `R ${julyVote.republican.yea} to ${julyVote.republican.nay}`, `D ${julyVote.democratic.yea} to ${julyVote.democratic.nay}`],
  ["Senate vote 227, Aug 8", "Table the Budd amendment to strike the hemp section", `${buddVote.yeas} to ${buddVote.nays}`, `R ${buddVote.republican.yea} to ${buddVote.republican.nay}`, `D ${buddVote.democratic.yea} to ${buddVote.democratic.nay}`],
  ["Senate vote 228, Aug 8", "Pass H.R. 6500 as amended", `${senateVote.yeas} to ${senateVote.nays}`, `${senateVote.present} present`, `${senateVote.absent} absent`],
  ["House roll 286, Sep 1", "Concur in the Senate amendments", `${houseVote.yeas} to ${houseVote.nays}`, `R ${houseVote.republican.yea} to ${houseVote.republican.nay}`, `D ${houseVote.democratic.yea} to ${houseVote.democratic.nay}`],
  ["House roll 288, Sep 1", "Adopt the rule for other bills, H. Res. 1499", `${ruleVote.yeas} to ${ruleVote.nays}`, `R ${ruleVote.republican.yea} to ${ruleVote.republican.nay}`, `D ${ruleVote.democratic.yea} to ${ruleVote.democratic.nay}`],
];

export const daysBars = [
  { label: "Senate vote to House vote", value: calendar.daysSenateToHouse },
  { label: "Hemp delay, Nov 12 to Dec 11", value: hemp.delayDays },
  { label: "Election to Dec 11", value: calendar.daysElectionToExpiry },
  { label: "House vote to election", value: calendar.daysHouseVoteToElection },
  { label: "House vote to Dec 11", value: calendar.daysHouseVoteToExpiry },
];

export const exceptionRows = [
  ["Sec. 101", "Continues the twelve 2026 appropriations acts at their rates, with listed exceptions"],
  ["Sec. 104", "No money to start or resume a project or activity not funded in 2026"],
  ["Secs. 109 and 110", "Programs that would front-load spending are held to the most limited funding action; no grants that would impinge on final funding decisions"],
  ["Sec. 112", "Civilian pay may be apportioned at the rate needed to avoid furloughs"],
  ["WIC", "May be apportioned at the rate needed to maintain participation"],
  ["Sec. 127", "Up to $2,853,000,000 of defense procurement money for National Security Systems"],
  ["Sec. 146", "Army, Navy, and Marine Corps military construction not otherwise authorized by law"],
  ["Sec. 156", "A Housing and Urban Development competition to retire certain housing loans, through 2029"],
  ["Sec. 157", "No Uniform Guidance rewrite for federal grants through December 11"],
  ["Sec. 2006", "Temporary Medicaid disaster relief for the Northern Mariana Islands"],
  ["Sec. 2008", "African Growth and Opportunity Act extended to 2028"],
  ["Sec. 2019", "Hemp definition change delayed to December 11, except for lab-made cannabinoids"],
  ["Sec. 4304", "$130,191,781 for supportive services for very low-income veteran families"],
];
