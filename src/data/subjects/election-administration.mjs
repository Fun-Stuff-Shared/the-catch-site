export const subject = {
  title: "Election administration",
  dek: "Mississippi listed 230,107 voters as inactive before the Nov. 3 election, against 165,778 after the 2024 election, and on Nov. 19 Democratic lawmakers asked the Legislature to investigate how credit data was used on the rolls. In Alaska, the Justice Department sued on Oct. 22 to stop the state certifying its Senate result.",
  current: [
    { label: "Inactive voters, Mississippi", value: "230,107", unit: "before Nov. 3, 2026", as_of: "2026-11-10", record_id: "mt-2026-11-10-column", source_value: "230,107", source_unit: "registered voters", source_sentence: "Before the election, Mississippi marked 230,107 registered voters inactive." },
    { label: "Inactive voters, Mississippi, 2024", value: "165,778", unit: "federal survey", as_of: "2025-06-13", record_id: "eavs-2024-report", source_value: "165,778", source_unit: "", source_sentence: "2024   2,222,109    2,131,726    1,965,948     88.5%    92.2%    165,778      7.8%" },
    { label: "Alaska lawsuit filed", value: "October 22", unit: "2026", as_of: "2026-10-22", record_id: "doj-complaint-2026-10-22", source_value: "10/22/26", source_unit: "", source_sentence: "Case 3:26-cv-00376-SLG Document 1 Filed 10/22/26" },
  ],
};

// How the series is listed on the homepage and /events/; lower rank lists first.
export const listing = {
  title: "Election administration",
  topic: "Elections",
  keywords: "Mississippi inactive voters Experian Watson affidavit ballots Black Caucus Alaska Senate Sullivan Peltola certification Justice Department ranked choice NVRA lawsuit",
  description: "How the 2026 midterms are run and certified: Mississippi's inactive voter list and the credit data behind it, and the Justice Department's suit to stop Alaska certifying its Senate result if Sen. Dan Sullivan loses and would have won with every vote for a second Dan Sullivan.",
  rank: 24,
};
