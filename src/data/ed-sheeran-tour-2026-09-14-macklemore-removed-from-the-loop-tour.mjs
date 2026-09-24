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
const macklemoreScheduledRemainingShows = 8;
const withdrawingActs = [
  ["Finneas", "South American support dates", "Withdrew"],
  ["Aaron Rowe", "Support act billed alongside Macklemore", "Withdrew"],
  ["Lukas Graham", "Support act billed alongside Macklemore", "Withdrew"],
  ["Beoga", "Band during Sheeran's set", "Withdrew"],
];

export const computed = {
  northAmericaShows: tourDates.length,
  remainingShows: remainingDates.length,
  remainingCities: new Set(remainingDates.map((row) => row.city)).size,
  macklemoreScheduledRemainingShows,
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
  title: "Macklemore removed from Ed Sheeran's tour; four other acts quit",
  dek: "Macklemore played two MetLife Stadium shows, then lost eight scheduled appearances. Four later departures covered different tour roles.",
  name: "Macklemore removed from the Loop Tour",
  date: cutoff,
  updated: "2026-09-20",
  kpis: [
    { value: computed.macklemoreScheduledRemainingShows, label: "of 10 remaining dates were to include Macklemore" },
    { value: computed.withdrawingActs, label: "supporting acts left the tour the next day" },
    { value: computed.metLifeShows, label: "MetLife shows Macklemore had already played" },
  ],
  visual: {
    kind: "table",
    title: "The lineup change",
    rows: [
      [String(computed.macklemoreScheduledRemainingShows), "of 10 remaining dates were to include Macklemore"],
      [String(computed.withdrawingActs), "supporting artists left"],
      [String(computed.metLifeShows), "MetLife appearances already played"],
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
  ["Sept. 17", "CAIR-Philadelphia announces a public-records request about the Philadelphia decision."],
  ["Sept. 18", "The Massachusetts attorney general's office reviews at least 25 complaints requesting Gillette Stadium refunds."],
  ["Sept. 19", "The first Loop Tour concert after the lineup change takes place in Philadelphia."],
];

export const seriesReceipt = {
  recordId: "loop-tour-north-america-faq",
  sourceRows: tourDates.length,
  cutoff,
  remainingShows: computed.remainingShows,
  remainingCities: computed.remainingCities,
  macklemoreScheduledRemainingShows: computed.macklemoreScheduledRemainingShows,
  metLifeShows: computed.metLifeShows,
  formula: "Official show dates later than 2026-09-14; Rolling Stone's eight-of-10 Macklemore schedule; MetLife Stadium rows.",
};
