import { claim } from "../lib/claims.mjs";

// Every number here is printed on an admitted record; the claim each comes from is named.
// Drums: epa-emergency-permit-2026-11-13 (sixty-eight-drums). Pounds: lawmakers-letter-2026-11-19 (weight-9700).
// Map reach: nyt-toxic-cloud-2026-11-19 (air-reach-100-to-60); ej-emergency-motion-2026-11-19 (deposition-25-40).
// Map edge and schedule, weather limits: epa-emergency-permit-2026-11-13 and army-advisory-maps-2026-11-17.
// Exposure times: army-advisory-2026-11-15 (linger-one-hour), iowa-hhs-fact-sheet-2026-11-20 (hhs-24-48).
export const n = {
  drums: 68,
  pounds: 9700,
  airMilesNov15: 100,
  airMilesNov17: 60,
  dustMilesNov15: 40,
  dustMilesNov17: 25,
  edge: 0.18,
  noticeDays: 5,
  mapHoursBefore: 48,
  hourlyFromHours: 6,
  finalMapHours: 6,
  samplingHours: 24,
  lingerHours: 1,
  windowsLowHours: 24,
  windowsHighHours: 48,
  neutralizeLowDays: 7,
  neutralizeHighDays: 22,
  windLowMph: 1,
  windHighMph: 15,
};

const fmt = (x) => x.toLocaleString("en-US");

export const computed = { fmt };

export const event = {
  slug: "iowa-army-detonation/2026-11-20-army-detonates-lead-azide-in-iowa",
  title: "Government says the Army intends to blow up Iowa lead azide by Nov. 24 without the paused permit",
  dek: `The government told the appeals court an emergency exclusion lets the Army act without EPA's permit, which the court has put on hold. The Army says blowing up the ${n.drums} drums would send up a plume carrying lead.`,
  name: "The Army's lead azide detonation in Iowa",
  date: "2026-11-20",
  updated: "2026-11-22",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "The lead azide detonation",
    entries: [
      { date: "Nov. 15", title: "Army sets Nov. 20 and publishes plume maps" },
      { date: "Nov. 19", title: "Groups sue; Army moves the blast to Monday; court pauses the permit" },
      { date: "Nov. 21", title: "Government tells the court the Army intends to act by Nov. 24 without the permit" },
      { date: "Nov. 22", title: "EPA asks the court to lift the pause; groups file expert statements", current: true },
    ],
  },
};

export const maps = [
  { map: "First maps, Nov. 15", air: `about ${n.airMilesNov15} miles`, dust: `more than ${n.dustMilesNov15} miles long` },
  { map: "Updated maps, Nov. 18", air: `about ${n.airMilesNov17} miles`, dust: `about ${n.dustMilesNov17} miles long` },
];

const story = "iowa-army-detonation--2026-11-20-army-detonates-lead-azide-in-iowa";
const entry = (date, ids, current = false) => ({
  date,
  title: ids.map((id) => claim(story, id).short).join(" "),
  cites: ids.map((c) => ({ c })),
  ...(current ? { current } : {}),
});

export const warnings = [
  entry("March 19", ["march-no-danger"]),
  entry("Oct. 8", ["oct8-announced"]),
  entry("Oct. 15", ["faq-waited", "october-map-windows"]),
  entry("Oct. 23", ["plume-model-oct23"]),
  entry("Nov. 15", ["first-maps-nov15"]),
  entry("Nov. 16", ["governor-learned-monday"], true),
];
