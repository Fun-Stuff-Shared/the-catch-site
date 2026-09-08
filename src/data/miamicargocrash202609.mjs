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
    { value: "5", unit: "dead", label: "named by the county mayor Sunday evening" },
    { value: "5", unit: "taken to hospitals", label: "Miami-Dade Fire Rescue" },
    { value: "7598", unit: "", label: "21 Air flight, from San Juan" },
    { value: "2 of 4", unit: "runways", label: "open Sunday evening" },
  ],
};

export const overrunDistance = {
  feet: 1300,
  meters: 396, // 1300 * 0.3048, rounded
};
