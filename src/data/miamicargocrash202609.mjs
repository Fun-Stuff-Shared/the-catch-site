// Miami cargo crash, September 2026.
// Figures trace to pinned official posts and coverage in data/sources/.
// 1,300 feet to meters: 1300 * 0.3048 = 396.24, rounded to 396.

export const event = {
  slug: "miami-cargo-crash/september-2026",
  title: "A cargo jet overran Miami's runway, struck vehicles, and killed five people on the ground",
  dek: "The FAA named the flight 21 Air 7598, a Boeing 767-300 arriving from San Juan. Fire crews found the plane beyond the airport boundary on fire. The National Transportation Safety Board is investigating and has not given a cause.",
  name: "Miami cargo crash",
  span: "September 6, 2026",
  date: "2026-09-06",
  updated: "2026-09-08",
  kpis: [
    { value: "5", unit: "dead", label: "all in one van, named by the sheriff Tuesday" },
    { value: "5", unit: "injured", label: "two pilots released, three still in hospital Tuesday" },
    { value: "7598", unit: "", label: "21 Air flight, from San Juan" },
    { value: "2 of 4", unit: "runways", label: "open Sunday evening" },
  ],
};

export const overrunDistance = {
  feet: 1300,
  meters: 396, // 1300 * 0.3048, rounded
};

// FAA Aeronautical Information Publication, Florida, Miami Intl, Runway 30 (data/sources/miami-cargo-crash/faa-aip-florida.txt)
export const runway30 = {
  lengthFeet: 9360,
  landingDistanceAvailableFeet: 7913,
  accelerateStopFeet: 8853,
};
// Half the pavement minus half the landing distance: (9360 - 7913) / 2 = 723.5, rounded to the nearest hundred.
export const halfwayGapFeet = Math.round((runway30.lengthFeet - runway30.landingDistanceAvailableFeet) / 2 / 100) * 100;

// FAA Safety Briefing, March/April 2026 (data/sources/miami-cargo-crash/faa-safety-briefing-2026-03.txt)
// and the FAA's own blog post, which counts the same 122 by runway end
// (data/sources/miami-cargo-crash/faa-blog-runway-safety.txt).
export const emasCount = { installations: 122, airports: 70 };

// FAA newsroom page (data/sources/miami-cargo-crash/faa-newsroom-emas.txt): the design condition
// and the arrest count; the FAA blog gives a different arrest count, carried here as blogArrests.
export const emasDesign = { stopKnots: 70, stopMph: 80, arrests: 26, arrestsAboard: 497, blogArrests: 22, blogAboard: 432 };

// Flightradar24 post and the FAA registry: manufactured 1994, cargo conversion 2015.
// Age at the accident: 2026 - 1994 = 32, which matches the Reuters dispatch and Flightradar24.
export const aircraft = { mfrYear: 1994, convertedYear: 2015, ageYears: 2026 - 1994 };

// Sunday's injured count, resolved by Tuesday: 2 pilots + 3 people on the ground = 5.
export const injured = { pilots: 2, ground: 3, total: 2 + 3 };

// Flightradar24 incident post (data/sources/fr24-21air-7598-miami.txt), provisional ADS-B speeds
export const adsb = { exitKnots: 112, lastKnots: 69 };

