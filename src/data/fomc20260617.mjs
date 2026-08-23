// June 17, 2026 FOMC event: analysis content.
// Every figure traces to a source in data/sources/SOURCES.md.
// Computed values derive from the FRED series checked into data/sources/.

export const event = {
  slug: "fed-rate-hold",
  title: "Warsh's first unanimous vote, with half the committee penciling in a hike",
  dek: "The June 17 decision looked like calm: a 12–0 hold, a four-paragraph statement. The projections underneath flipped from a cut to a hike, and six weeks later the dissents arrived.",
  name: "The 2026 rate hold",
  span: "Ongoing since December 2025",
  date: "2026-06-17",
  updated: "2026-08-23",
  kpis: [
    { value: "3.50–3.75", unit: "%", label: "target range, unchanged" },
    { value: "188", unit: "days", label: "held at this level (at the meeting)", live: true },
    { value: "12–0", unit: "", label: "the vote" },
    { value: "48th", unit: "pctile", label: "of 44 years of policy" },
  ],
};

// Rate path: upper bound of the target range, change points only.
// Derived from FRED DFEDTARU (daily, checked into data/sources/DFEDTARU.csv).
export const ratePath = {
  start: { date: "2024-01-01", value: 5.5 },
  changes: [
    { date: "2024-09-19", value: 5.0 },
    { date: "2024-11-08", value: 4.75 },
    { date: "2024-12-19", value: 4.5 },
    { date: "2025-09-18", value: 4.25 },
    { date: "2025-10-30", value: 4.0 },
    { date: "2025-12-11", value: 3.75 },
  ],
  end: { date: "2026-06-17", value: 3.75 },
};

export const sources = [
  { id: "s1", name: "FOMC statement, June 17, 2026", url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm", kind: "primary" },
  { id: "s2", name: "FOMC minutes, June 17, 2026 (released July 8)", url: "https://www.federalreserve.gov/monetarypolicy/fomcminutes20260617.htm", kind: "primary" },
  { id: "s3", name: "Summary of Economic Projections, June 17, 2026", url: "https://www.federalreserve.gov/monetarypolicy/fomcprojtabl20260617.htm", kind: "primary" },
  { id: "s4", name: "Fed target range daily history, 1982–2026 (FRED DFEDTAR + DFEDTARU)", url: "https://fred.stlouisfed.org/series/DFEDTARU", kind: "official-data" },
  { id: "s5", name: "PCE price index (FRED PCEPI)", url: "https://fred.stlouisfed.org/series/PCEPI", kind: "official-data" },
  { id: "s6", name: "30-year mortgage average (Freddie Mac PMMS via FRED)", url: "https://fred.stlouisfed.org/series/MORTGAGE30US", kind: "official-data" },
  { id: "s7", name: "Unemployment rate (BLS via FRED UNRATE)", url: "https://fred.stlouisfed.org/series/UNRATE", kind: "official-data" },
  { id: "s8", name: "CNBC, decision-day report", url: "https://www.cnbc.com/2026/06/17/fed-interest-rate-decision-june-2026.html", kind: "outlet" },
  { id: "s9", name: "Fox Business, decision-day report", url: "https://www.foxbusiness.com/economy/federal-reserve-interest-rate-decision-june-17-2026", kind: "outlet" },
  { id: "s10", name: "TradingKey analysis, June 17", url: "https://www.tradingkey.com/analysis/economic/central-banks/261973912-fed-federal-fomc-2-economic-projections-decision-rates-tradingkey", kind: "outlet" },
  { id: "s11", name: "StockTitan, updated preview/report (June 16, updated June 22)", url: "https://www.stocktitan.net/articles/fed-rate-decision-june-17-2026", kind: "outlet" },
  { id: "s12", name: "CNBC, minutes report (July 8)", url: "https://www.cnbc.com/2026/07/08/fed-minutes-june-2026-.html", kind: "outlet" },
];
