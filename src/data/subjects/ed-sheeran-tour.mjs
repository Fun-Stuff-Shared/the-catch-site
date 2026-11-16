import { computed } from "../ed-sheeran-tour-2026-09-14-macklemore-removed-from-the-loop-tour.mjs";

export const subject = {
  title: "Ed Sheeran's Loop Tour",
  dek: "The record of Macklemore's removal from the 2026 Loop Tour lineup, the supporting acts who withdrew, and the dates that remained on the North American schedule.",
  current: [
    {
      label: "Macklemore dates removed",
      value: String(computed.macklemoreScheduledRemainingShows),
      unit: "shows",
      as_of: "2026-09-14",
      record_id: "rolling-stone-removal-2026-09-14",
      source_value: String(computed.macklemoreScheduledRemainingShows),
      source_unit: "shows",
      source_sentence: "eight of the 10 shows left",
    },
    {
      label: "Supporting artists leaving",
      value: String(computed.withdrawingActs),
      unit: "acts",
      as_of: "2026-09-15",
      record_id: "ap-support-acts-2026-09-15",
      source_value: String(computed.withdrawingActs),
      source_unit: "acts",
      source_sentence: "four of his supporting acts abruptly quit",
    },
    {
      label: "MetLife dates played",
      value: String(computed.metLifeShows),
      unit: "shows",
      as_of: "2026-09-05",
      record_id: "ed-sheeran-past-tour-dates-2026-09-20",
      source_value: String(computed.metLifeShows),
      source_unit: "shows",
      source_sentence: "05 Sep 2026 MetLife Stadium",
    },
  ],
};

// How the series is listed on the homepage and /events/; lower rank lists first.
export const listing = {
  title: "Ed Sheeran's Loop Tour",
  topic: "Music",
  keywords: "Ed Sheeran Macklemore Loop Tour Finneas Aaron Rowe Lukas Graham Beoga",
  description: "Macklemore's removal from the 2026 Loop Tour lineup, the supporting acts who withdrew, and the remaining North American schedule.",
  rank: 20,
};
