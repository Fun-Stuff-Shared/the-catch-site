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
  title: "Army blows up lead azide in Iowa at 9 a.m.; EPA says its monitors detect no airborne lead",
  dek: `The Army says the threat of an uncontrolled explosion is gone. Iowa's health department says that, from the Army's information and the air data it has reviewed so far, the risk of breathing in harmful amounts of lead from the blast is low; it will review soil samples as results come in.`,
  name: "The Army's lead azide detonation in Iowa",
  date: "2026-11-20",
  updated: "2026-11-25",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "The lead azide detonation",
    entries: [
      { date: "Nov. 22", title: "EPA asks the court to lift the pause; Army moves the blast to Nov. 25" },
      { date: "Nov. 23", title: "Trump orders a hold; court lifts the pause; Army sets Wednesday morning" },
      { date: "Nov. 24", title: "Army sets about 9 a.m.; FEMA supports a recommended relocation from Middletown" },
      { date: "Nov. 25", title: "Army detonates the lead azide at 9 a.m.; EPA reports no airborne lead detected", current: true },
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
