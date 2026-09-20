const tourDates = [
  ["2026-06-13", "Glendale, AZ", "State Farm Stadium"],
  ["2026-06-20", "Nashville, TN", "Nissan Stadium"],
  ["2026-06-25", "Milwaukee, WI", "American Family Insurance Amphitheater"],
  ["2026-06-27", "Chicago, IL", "Soldier Field"],
  ["2026-07-04", "Denver, CO", "Empower Field at Mile High"],
  ["2026-07-18", "Las Vegas, NV", "Allegiant Stadium"],
  ["2026-07-21", "San Diego, CA", "Petco Park"],
  ["2026-07-25", "Santa Clara, CA", "Levi's Stadium"],
  ["2026-08-01", "Seattle, WA", "Lumen Field"],
  ["2026-08-08", "Los Angeles, CA", "SoFi Stadium"],
  ["2026-08-15", "Minneapolis, MN", "U.S. Bank Stadium"],
  ["2026-08-20", "Toronto, ON", "Rogers Centre"],
  ["2026-08-21", "Toronto, ON", "Rogers Centre"],
  ["2026-08-22", "Toronto, ON", "Rogers Centre"],
  ["2026-08-29", "Detroit, MI", "Ford Field"],
  ["2026-09-04", "East Rutherford, NJ", "MetLife Stadium"],
  ["2026-09-05", "East Rutherford, NJ", "MetLife Stadium"],
  ["2026-09-19", "Philadelphia, PA", "Lincoln Financial Field"],
  ["2026-09-25", "Foxborough, MA", "Gillette Stadium"],
  ["2026-09-26", "Foxborough, MA", "Gillette Stadium"],
  ["2026-10-03", "Atlanta, GA", "Mercedes-Benz Stadium"],
  ["2026-10-10", "Indianapolis, IN", "Lucas Oil Stadium"],
  ["2026-10-17", "Charlotte, NC", "Bank of America Stadium"],
  ["2026-10-24", "Arlington, TX", "AT&T Stadium"],
  ["2026-10-29", "Hollywood, FL", "Hard Rock Live"],
  ["2026-10-30", "Hollywood, FL", "Hard Rock Live"],
  ["2026-11-07", "Tampa, FL", "Raymond James Stadium"],
].map(([date, city, venue]) => ({ date, city, venue }));

const cutoff = "2026-09-14";
const remainingDates = tourDates.filter((row) => row.date > cutoff);
const metLifeDates = tourDates.filter((row) => row.venue === "MetLife Stadium");
const withdrawingActs = [
  ["Finneas", "South American support dates", "Withdrew"],
  ["Aaron Rowe", "Replacement U.S. support act", "Withdrew"],
  ["Lukas Graham", "Replacement U.S. support act", "Withdrew"],
  ["Beoga", "Band during Sheeran's set", "Departed"],
];

export const computed = {
  northAmericaShows: tourDates.length,
  remainingShows: remainingDates.length,
  remainingCities: new Set(remainingDates.map((row) => row.city)).size,
  metLifeShows: metLifeDates.length,
  withdrawingActs: withdrawingActs.length,
};

const displayDate = (date) => new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
}).format(new Date(`${date}T00:00:00Z`));

export const event = {
  slug: "ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour",
  title: "Macklemore removed from Ed Sheeran's tour; the remaining opening acts quit",
  dek: "Macklemore said venue pressure led to his removal. Ed Sheeran said the promoter made the decision. Finneas, Aaron Rowe, Lukas Graham and Beoga left the tour the next day.",
  name: "Macklemore removed from the Loop Tour",
  date: cutoff,
  updated: "2026-09-20",
  kpis: [
    { value: computed.remainingShows, label: "North American shows after Sept. 14" },
    { value: computed.remainingCities, label: "cities on those dates" },
    { value: computed.withdrawingActs, label: "supporting acts that left" },
    { value: computed.metLifeShows, label: "MetLife shows with Macklemore" },
  ],
  visual: {
    kind: "table",
    title: "The lineup change",
    rows: [
      [String(computed.remainingShows), "shows remained after Sept. 14"],
      [String(computed.withdrawingActs), "supporting acts withdrew"],
      [String(computed.metLifeShows), "MetLife shows already played"],
    ],
    note: "Artist statements and official tour records",
  },
};

export const remainingDateRows = remainingDates.map(({ date, city, venue }) => [
  displayDate(date),
  city,
  venue,
]);

export const lineupRows = withdrawingActs;

export const chronologyRows = [
  ["Sept. 4–5", "Macklemore performs at both MetLife Stadium dates."],
  ["Sept. 14", "Macklemore posts that Ed Sheeran's team removed him from the remaining support dates; Messina Touring Group says venues would not accept him on the lineup."],
  ["Sept. 15", "Sheeran posts that the removal was the promoter's decision. Finneas, Aaron Rowe, Lukas Graham and Beoga announce their departures."],
  ["Sept. 17", "Associated Press publishes its account of how artists, promoters and venues divide control of stadium tours."],
  ["Sept. 19", "The Philadelphia date remains listed by the venue; AP reports the tour is set to resume after the departures."],
];

export const seriesReceipt = {
  recordId: "loop-tour-north-america-faq",
  sourceRows: tourDates.length,
  cutoff,
  remainingShows: computed.remainingShows,
  remainingCities: computed.remainingCities,
  metLifeShows: computed.metLifeShows,
  formula: "Official show dates later than 2026-09-14; distinct remaining city labels; MetLife Stadium rows.",
};
