// Every row is a government record: the President's transcribed words, Central Command,
// the Pentagon's and the State Department's transcripts, Bahrain's foreign ministry.
// Each label is its claim's short form.
export const event = {
  slug: "iran-war/2026-11-09-trump-iran-war-effectively-over",
  title: "Trump says the Iran war is “effectively over.” He has not ended it",
  dek: "On November 7, Central Command said, a U.S. aircraft fired on a ship trying to run the blockade of Iran. On November 12, asked whether he would hesitate to use force to stop Iran from terrorizing U.S. allies and ships, Trump said “No. No hesitation.”",
  name: "Trump's “effectively over” remark on the Iran war",
  date: "2026-11-09",
  updated: "2026-11-15",
  kpis: [],
};

export const n = {
  redirected: 147,
  disabled: "five",
  bahrainDronesNov13: "two",
};

// The week around the remark: what the administration said, beside what forces did.
export const week = [
  { date: "Nov. 6", said: ["trump-minor-strikes-nov6", "trump-not-a-war-nov6"], did: [] },
  { date: "Nov. 7", said: [], did: ["centcom-huda", "centcom-iron-gate"] },
  { date: "Nov. 8", said: ["rubio-acts-defensively"], did: [] },
  { date: "Nov. 9", said: ["trump-effectively-over", "trump-declined-to-declare", "hegseth-end-is-president"], did: [] },
  { date: "Nov. 10", said: ["rubio-no-major-combat", "rubio-not-status-quo", "hegseth-would-take-it"], did: [] },
  { date: "Nov. 11", said: ["trump-arlington-when-end"], did: [] },
  { date: "Nov. 12", said: ["hewitt-no-hesitation", "hewitt-possible-right-now"], did: [] },
  { date: "Nov. 13", said: [], did: ["centcom-bahrain-drones"] },
  { date: "Nov. 15", said: [], did: ["bahrain-nov15"] },
];
