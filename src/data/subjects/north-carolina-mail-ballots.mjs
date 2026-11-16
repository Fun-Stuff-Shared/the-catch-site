import { n } from "../north-carolina-mail-ballots-2026-10-21-north-carolina-rejects-more-mail-ballots.mjs";

export const subject = {
  title: "North Carolina mail ballots",
  dek: "Since Sept. 4 North Carolina spoils any mail ballot whose inner envelope arrives unsealed. The State Board puts the rejection rate at 3.1%, against 2.6% at the same point in 2022, not double as Gov. Josh Stein says.",
  current: [
    { label: "Mail ballots rejected through Oct. 20, State Board", value: n.rate2026, unit: "%", as_of: "2026-10-20", record_id: "politifact-2026-10-23", source_value: n.rate2026, source_unit: "%", source_sentence: "or 3.1% of those cast through that date, Tyson said." },
    { label: "Same point in 2022, State Board", value: n.rate2022, unit: "%", as_of: "2026-10-20", record_id: "politifact-2026-10-23", source_value: n.rate2022, source_unit: "%", source_sentence: "At the same stage in the 2022 election, election officials had rejected 1,829 mail-in ballots, or 2.6% of those cast, Tyson said." },
  ],
};

// How the series is listed on the homepage and /events/; lower rank lists first.
export const listing = {
  title: "North Carolina mail ballots",
  topic: "Elections",
  keywords: "North Carolina mail ballots absentee rejected spoiled inner envelope seal State Board of Elections Stein Schroeder Common Cause rejection rate",
  description: "Since Sept. 4 North Carolina spoils any mail ballot whose inner envelope arrives unsealed. The State Board puts the rejection rate at 3.1%, against 2.6% at the same point in 2022, not double as Gov. Josh Stein says.",
  rank: 14,
};
