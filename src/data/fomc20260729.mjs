// July 29, 2026 FOMC event: analysis content.
// Every figure traces to a source in data/sources/SOURCES.md.
// Computed values derive from the FRED series checked into data/sources/.

export const event = {
  slug: "fed-rate/july-2026",
  title: "The quiet hold breaks: three officials vote to raise rates",
  dek: "The statement changed by one verb. The vote changed everything: a 9–3 hold, with three regional presidents formally asking for a hike, the first time since 2016 that three dissenters pulled in the same direction.",
  name: "The 2026 rate hold",
  span: "Ongoing since December 2025",
  date: "2026-07-29",
  updated: "2026-08-23",
  kpis: [
    { value: "3.50–3.75", unit: "%", label: "target range, unchanged" },
    { value: "230", unit: "days", label: "held at this level (at the meeting)", live: true },
    { value: "9–3", unit: "", label: "the vote" },
    { value: "3", unit: "dissents", label: "each for a quarter-point hike" },
  ],
};
