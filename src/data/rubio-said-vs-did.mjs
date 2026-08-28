// Marco Rubio, what he said vs. how he voted: the vote record behind the page.
// Every row links to the Senate's own roll-call file; dates and tallies were recounted
// from the Senate XML on 2026-08-23 (rubio-2025 commit 2f21b685). Statements come from
// the Congressional Record pages listed under records.

const rc113 = (n) => `https://www.senate.gov/legislative/LIS/roll_call_votes/vote1131/vote_113_1_00${n}.htm`;
const rc114 = (n) => `https://www.senate.gov/legislative/LIS/roll_call_votes/vote1142/vote_114_2_00${n}.htm`;

export const figure = {
  name: "Marco Rubio",
  title: "Marco Rubio: what he said vs. how he voted",
  dek: "Two episodes from the official record: what he said on the Senate floor, and every roll call he cast on the same bill.",
  updated: "2026-08-28",
  kpis: [
    { value: "2", label: "episodes" },
    { value: "34", label: "recorded Senate votes" },
    { value: "2", label: "floor statements" },
    { value: "10", label: "key votes" },
  ],
};

export const immigration = {
  id: "immigration",
  topic: "Immigration · The 2013 \"Gang of Eight\" bill (S.744)",
  billText: "https://www.congress.gov/113/bills/s744/BILLS-113s744es.htm",
  record: { label: "Congressional Record S5217", url: "https://www.govinfo.gov/content/pkg/CREC-2013-06-26/html/CREC-2013-06-26-pt1-PgS5205-2.htm", title: "Congressional Record, June 26, 2013, page S5217" },
  politifact: { label: "PolitiFact, Jun 2013", url: "https://www.politifact.com/factchecks/2013/jun/20/dana-rohrabacher/rep-dana-rohrabacher-says-sen-marco-rubios-claims-/" },
  stages: [
    { name: "Undocumented", gate: "Before anyone could apply for the first stage: the government had to submit its border-security and fencing plans to Congress and give notice it had <em>begun</em> carrying them out. Begun, not finished." },
    { name: "Provisional status (\"RPI\")", gate: "A new legal status: live and work in the country lawfully, valid six years and renewable. Not a green card, and not citizenship." },
    { name: "Green card", gate: "Before anyone could move up from provisional status: the government had to certify the border plan was <em>deployed and operational</em>, the fencing built, E-Verify running. The heavy requirements sat here." },
    { name: "Citizenship", gate: "Years later still, through the normal naturalization process." },
  ],
  keyVotes: [
    { date: "Jun 13, 2013", cast: "yes", rc: 148, url: rc113(148), text: "on a motion to table, meaning <strong>kill</strong>, an amendment that would have blocked provisional status until the border had been under \"effective control\" for six months. The kill vote succeeded, 57 to 43, so the amendment died." },
    { date: "Jun 18, 2013", cast: "no", rc: 151, url: rc113(151), text: "on the Thune amendment: 350 miles of double-layer fencing built before provisional status, and the full 700 miles built before green cards. It failed, 39 to 54." },
    { date: "Jun 18, 2013", cast: "no", rc: 152, url: rc113(152), text: "on the Vitter amendment: no legal status of any kind until a biometric check-in/check-out system was <em>fully operating at every land, sea, and air port of entry</em>, and Congress had passed a further resolution approving it. It failed, 36 to 58. (The vote was on that whole demanding package, not on whether biometric border checks are a good idea.)" },
    { date: "Jun 26, 2013", cast: "yes", rc: 163, url: rc113(163), text: "on the Corker-Hoeven \"border surge\" amendment, the source of the 700 miles of fence and 20,000 agents his speech cites, attached as conditions for green cards. It passed, 69 to 29, the same day as the speech." },
    { date: "Jun 27, 2013", cast: "yes", rc: 168, url: rc113(168), text: "on final passage. The bill passed the Senate, 68 to 32. (The House never took it up; it did not become law.)" },
  ],
  allVotes: [
    { date: "Jun 11", rc: 146, what: "End debate on starting work on the bill", rubio: "Yes", result: "Passed 82-15" },
    { date: "Jun 11", rc: 147, what: "Start work on the bill", rubio: "Yes", result: "Passed 84-15" },
    { date: "Jun 13", rc: 148, what: "Kill amendment: no provisional status until 6 months of border control", rubio: "Yes (kill)", result: "Passed 57-43", key: true },
    { date: "Jun 18", rc: 151, what: "Thune: 350 mi fencing before provisional status, 700 mi before green cards", rubio: "No", result: "Failed 39-54", key: true },
    { date: "Jun 18", rc: 152, what: "Vitter: full biometric entry-exit system + congressional approval before any status", rubio: "No", result: "Failed 36-58", key: true },
    { date: "Jun 18", rc: 153, what: "Add tribal officials to the border oversight task force", rubio: "Yes", result: "Passed 94-0" },
    { date: "Jun 19", rc: 154, what: "Kill amendment: stronger border metrics + congressional votes on security", rubio: "Yes (kill)", result: "Passed 61-37" },
    { date: "Jun 19", rc: 155, what: "Cap salaries of border-security contractors", rubio: "No", result: "Passed 72-26" },
    { date: "Jun 19", rc: 156, what: "Require fast-track congressional approval of border strategy", rubio: "No", result: "Failed 39-59" },
    { date: "Jun 19", rc: 157, what: "Add a Nevada representative to the border commission", rubio: "Yes", result: "Passed 89-9" },
    { date: "Jun 20", rc: 159, what: "Kill the \"RESULTS\" enforcement-and-trade amendment", rubio: "No (keep)", result: "Passed 54-43" },
    { date: "Jun 24", rc: 160, what: "End debate on the \"border surge\" amendment", rubio: "Yes", result: "Passed 67-27" },
    { date: "Jun 26", rc: 162, what: "Waive budget objections to the bill + border surge", rubio: "Yes", result: "Passed 68-30" },
    { date: "Jun 26", rc: 163, what: "Adopt the \"border surge\" (700 mi fence, ~20,000 agents, before green cards)", rubio: "Yes", result: "Passed 69-29", key: true },
    { date: "Jun 26", rc: 164, what: "End debate on the bill", rubio: "Yes", result: "Passed 67-31" },
    { date: "Jun 27", rc: 166, what: "Adopt the final amendment package", rubio: "Yes", result: "Passed 68-32" },
    { date: "Jun 27", rc: 167, what: "Final end-debate vote on the bill", rubio: "Yes", result: "Passed 68-32" },
    { date: "Jun 27", rc: 168, what: "Pass the bill", rubio: "Yes", result: "Passed 68-32", key: true },
  ].map((v) => ({ ...v, url: rc113(v.rc) })),
  allVotesNote: "\"Passed\" and \"Failed\" describe the motion, not Rubio's side. Marked rows are the votes the episode rests on. All 291 Senate roll calls of 2013 were scanned by measure; these 18 are every one on this bill.",
  gloss: [
    { term: "Motion to table", def: "a vote to kill an amendment without voting on it directly. Voting Yes on tabling means voting against the amendment." },
    { term: "Cloture, \"end debate\"", def: "a vote to cut off debate so something can move forward. It needs 60 votes, not a majority, which is why a 50-47 result can be a loss." },
    { term: "Motion to waive", def: "a vote to let a bill move forward despite an objection that it breaks budget rules." },
  ],
};

export const zika = {
  id: "zika",
  topic: "Public health · Zika emergency funding (2016)",
  record: { label: "Congressional Record S2838", url: "https://www.govinfo.gov/content/pkg/CREC-2016-05-17/html/CREC-2016-05-17-pt1-PgS2835-2.htm", title: "Congressional Record, May 17, 2016, page S2838" },
  keyVotes: [
    { date: "May 17, 2016", cast: "yes", rc: 73, url: rc114(73), text: "to advance the <strong>Nelson-Rubio $1.9 billion</strong> Zika amendment, the full amount he had urged that morning, on the amendment he co-sponsored. It got 50 of the 60 votes needed and failed, 50 to 47." },
    { date: "May 17, 2016", cast: "yes", rc: 75, url: rc114(75), text: "to advance the <strong>$1.1 billion Blunt-Murray compromise</strong>, minutes after the full-funding amendment failed. It cleared the 60-vote bar, 68 to 29. He kept the promise from the morning speech: better than nothing." },
    { date: "May 19, 2016", cast: "yes", rc: 77, url: rc114(77), extra: [{ rc: 82, url: rc114(82) }], text: "to adopt the $1.1 billion compromise into the spending bill (68 to 30), and then to pass the bill carrying it (89 to 8)." },
    { date: "Jun 8, 2016", cast: "yes", rc: 93, url: rc114(93), text: "on Senator Nelson's motion telling the Senate's negotiators to protect the <strong>Ebola</strong> money: reject taking back existing Ebola emergency funds, and restore $510 million already borrowed from Ebola accounts to pay for the Zika response. His May speech had objected to exactly that borrowing. The motion failed, 46 to 49." },
    { date: "Jun 28 to Sep 6", cast: "yes", castLabel: "Voted yes ×3", rc: 112, url: rc114(112), extra: [{ rc: 134, url: rc114(134) }, { rc: 135, url: rc114(135) }], text: "each of the three times the Senate tried to advance the final negotiated package carrying the Zika money. All three attempts fell short of the 60 votes needed (52-48, 52-44, 52-46). Rubio voted to advance every time." },
  ],
  allVotes: [
    { date: "May 17", rc: 73, what: "Advance the Nelson-Rubio $1.9 billion Zika amendment", rubio: "Yes", result: "Failed 50-47", key: true },
    { date: "May 17", rc: 74, what: "Advance a rival emergency-funding proposal (Amendment 3899)", rubio: "Yes", result: "Failed 52-45" },
    { date: "May 17", rc: 75, what: "Advance the Blunt-Murray $1.1 billion compromise", rubio: "Yes", result: "Passed 68-29", key: true },
    { date: "May 19", rc: 76, what: "Waive budget objections to the compromise", rubio: "Yes", result: "Passed 70-28" },
    { date: "May 19", rc: 77, what: "Adopt the $1.1 billion compromise", rubio: "Yes", result: "Passed 68-30", key: true },
    { date: "May 19", rc: 78, what: "End debate on the underlying spending package", rubio: "Yes", result: "Passed 88-10" },
    { date: "May 19", rc: 79, what: "Waive budget objections to a veterans health care amendment (not Zika)", rubio: "Yes", result: "Passed 84-14" },
    { date: "May 19", rc: 80, what: "Block funds for a housing-department rule (not Zika)", rubio: "Yes", result: "Passed 87-9" },
    { date: "May 19", rc: 81, what: "Kill a similar housing-rule amendment (not Zika)", rubio: "No (keep)", result: "Passed 60-37" },
    { date: "May 19", rc: 82, what: "Pass the spending bill carrying the $1.1 billion", rubio: "Yes", result: "Passed 89-8" },
    { date: "Jun 8", rc: 92, what: "End debate so the bill could go to House-Senate negotiations", rubio: "Yes", result: "Passed 93-2" },
    { date: "Jun 8", rc: 93, what: "Nelson motion: protect Ebola funds in the final deal", rubio: "Yes", result: "Failed 46-49", key: true },
    { date: "Jun 8", rc: 94, what: "Sullivan motion to the negotiators (not Zika-specific)", rubio: "Yes", result: "Failed 56-38" },
    { date: "Jun 28", rc: 112, what: "Advance the final negotiated package carrying the Zika money", rubio: "Yes", result: "Failed 52-48", key: true },
    { date: "Jul 14", rc: 134, what: "Advance the final negotiated package, second attempt", rubio: "Yes", result: "Failed 52-44" },
    { date: "Sep 6", rc: 135, what: "Advance the final negotiated package, third attempt", rubio: "Yes", result: "Failed 52-46" },
  ].map((v) => ({ ...v, url: rc114(v.rc) })),
  allVotesNote: "\"Passed\" and \"Failed\" describe the motion, not Rubio's side. Roll calls 73, 74, 75, 112, 134, and 135 were 60-vote cloture votes, which is why 50-47 and 52-48 lost while 68-29 won. All 163 Senate roll calls of 2016 were scanned by measure; these 16 are every one on this bill, including the non-Zika amendments that rode on it.",
  gloss: [
    { term: "Cloture, \"advance\"", def: "a vote to cut off debate so a proposal can get a final vote. It needs 60 votes. That is why the $1.9 billion amendment \"failed\" at 50-47: a majority said yes, but not sixty." },
    { term: "Motion to instruct conferees", def: "when the House and Senate pass different versions, negotiators (\"conferees\") work out the final one. This motion is the Senate telling its negotiators what to fight for. It is non-binding." },
  ],
};

export const records = [
  { url: immigration.record.url, title: "Congressional Record, Jun 26 2013", what: "Rubio floor speech on the immigration bill (pages S5217 to S5218)" },
  { url: immigration.billText, title: "S.744, Senate-passed text", what: "The immigration bill itself, including the trigger section (Sec. 3(c)) and provisional-status terms (six-year renewable status with work authorization)" },
  { url: rc113(148), title: "Senate roll call 148 (2013)", what: "Vote to kill the amendment requiring border control before provisional status" },
  { url: rc113(151), title: "Senate roll call 151 (2013)", what: "Thune amendment: fencing before each status stage" },
  { url: rc113(152), title: "Senate roll call 152 (2013)", what: "Vitter amendment: full biometric system plus congressional approval before any status" },
  { url: rc113(163), title: "Senate roll call 163 (2013)", what: "The Corker-Hoeven \"border surge\" amendment" },
  { url: rc113(168), title: "Senate roll call 168 (2013)", what: "Final passage of the immigration bill" },
  { url: immigration.politifact.url, title: "PolitiFact, Jun 20 2013", what: "Contemporaneous fact-check of the dispute over Rubio's English- and Spanish-language descriptions of the bill's sequence" },
  { url: zika.record.url, title: "Congressional Record, May 17 2016", what: "Rubio floor speech on Zika funding, including the Nelson-Rubio co-sponsorship and the Blunt-Murray fallback pledge (page S2838)" },
  { url: rc114(73), title: "Senate roll call 73 (2016)", what: "Vote to advance the Nelson-Rubio $1.9 billion Zika amendment" },
  { url: rc114(75), title: "Senate roll call 75 (2016)", what: "Vote to advance the Blunt-Murray $1.1 billion compromise" },
  { url: rc114(77), title: "Senate roll call 77 (2016)", what: "Adoption of the $1.1 billion compromise" },
  { url: rc114(82), title: "Senate roll call 82 (2016)", what: "Passage of the spending bill carrying the $1.1 billion" },
  { url: rc114(93), title: "Senate roll call 93 (2016)", what: "Nelson motion to instruct negotiators to protect Ebola funds" },
];
