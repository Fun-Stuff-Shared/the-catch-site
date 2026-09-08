// Venezuela oil deal details, September 2026.
// Figures from pinned White House, OFAC, EIA/FRED, STEO, and coverage files
// under data/sources/venezuela-oil/ and data/sources/coverage/.

export const event = {
  slug: "venezuela-oil/september-2026",
  title: "The White House says 100-year rights to 17 Venezuelan oil fields. Caracas says 25 years, renewable.",
  dek: "Eight months after U.S. forces captured Maduro, the White House announced majority control of 65 billion barrels through a private operator. The instruments are a 35 percent stake, later called warrants, and a 20 percent purchase right. No contract has been published.",
  name: "Venezuela oil",
  span: "January 3 to September 8, 2026",
  date: "2026-08-31",
  updated: "2026-09-08",
  kpis: [
    { value: "17", unit: "fields", label: "100 years per the White House; 25, renewable, per PDVSA" },
    { value: "35%", unit: "stake", label: "warrants, per a U.S. official, September 4" },
    { value: "20%", unit: "off-take", label: "State can buy at production cost" },
    { value: "1.15", unit: "million b/d", label: "Venezuela crude, EIA July 2026" },
  ],
};

// WTI Cushing daily spot, EIA via FRED DCOILWTICO saved 2026-09-08.
// These are daily spot prices, not exchange closes.
export const wti = {
  aug28: 84.57,
  aug31: 87.03,
  sep1: 91.48,
  changeAug31ToSep1: 4.45, // 91.48 - 87.03
};

// EIA weekly retail gasoline, all grades, all formulations, FRED GASALLW.
export const gasoline = {
  aug24: 4.218,
  aug31: 4.207,
  change: -0.011, // 4.207 - 4.218
};

// STEO August 2026, table 3d, Venezuela crude, million barrels per day.
export const steoCrude = {
  jan2026: 0.8,
  jul2026: 1.15,
};

// White House September 2: NABEP "already produces 250K barrels of oil a day."
export const nabepCurrentBpd = 250000;
export const nabepShareOfJulCrudePct = 21.7; // 250000 / 1_150_000 * 100, rounded to 1 decimal

// Near-term production goals named on the records (barrels per day).
export const nabepGoalBpd = 1000000;
export const rodriguezGoalBpd = 1500000;

// EIA proved U.S. crude at year-end 2021, last figure on the saved annual table.
export const eiaUsProved2021Mmbbl = 41151;
export const eiaUsProved2021Billion = 41.151;
export const whUsProvedBillion = 46;

// EIA Country Analysis Brief: Venezuela (February 2024): 303 billion barrels of proved reserves in 2023.
export const eiaVenezuelaProvedBillion = 303;
export const whVenezuelaFieldsBillion = 65;
export const fieldsShareOfVenezuelaPct = Math.round((whVenezuelaFieldsBillion / eiaVenezuelaProvedBillion) * 1000) / 10; // 21.5
