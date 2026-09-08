// Venezuela oil deal details, September 2026.
// Figures from pinned White House, OFAC, EIA/FRED, STEO, and coverage files
// under data/sources/venezuela-oil/ and data/sources/coverage/.

export const event = {
  slug: "venezuela-oil/september-2026",
  title: "The White House named a private operator, a 35 percent stake, and 100-year rights to 17 Venezuelan oil fields",
  dek: "Monday's fact sheet said Venezuela's interim authorities granted the concessions to North American Blue Energy Partners. Two days later the White House said the deal was with a private company, not the interim government.",
  name: "Venezuela oil",
  span: "August 28 to September 2, 2026",
  date: "2026-08-31",
  updated: "2026-09-08",
  kpis: [
    { value: "17", unit: "fields", label: "100-year concessions, White House fact sheet" },
    { value: "35%", unit: "equity", label: "to the Department of War's Office of Strategic Capital" },
    { value: "20%", unit: "off-take", label: "State can buy at production cost" },
    { value: "1.15", unit: "million b/d", label: "Venezuela crude, EIA July 2026" },
  ],
};

// WTI Cushing spot, EIA via FRED DCOILWTICO saved 2026-09-08.
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

// EIA proved U.S. crude at year-end 2021, last figure on the saved annual table.
export const eiaUsProved2021Mmbbl = 41151;
export const eiaUsProved2021Billion = 41.151;
export const whUsProvedBillion = 46;
