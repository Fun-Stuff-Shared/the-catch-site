import { computed } from "../mailvoting202609.mjs";

export const subject = {
  title: "Mail voting",
  dek: "The Trump administration asked the Supreme Court on September 6 to pause a federal judge's block on Postal Service rules for mail ballots. The block covers elections on or before November 3.",
  current: [
    { label: "Stay application", value: "26A305", unit: "", as_of: "2026-09-06", record_id: "scotus-26a305-docket", source_value: "26A305", source_unit: "", source_sentence: "No. 26A305" },
    { label: "Days to November 3", value: String(computed.daysFilingToElection), unit: "days", as_of: "2026-09-06", record_id: "scotus-26a305-application", source_value: String(computed.daysFilingToElection), source_unit: "days", source_sentence: "Ballots have already begun to be mailed in North Carolina" },
    { label: "Injunction through", value: "November 3", unit: "2026", as_of: "2026-09-04", record_id: "talwani-pi-2026-09-04", source_value: "November 3", source_unit: "2026", source_sentence: "elections occurring before or on November 3" },
  ],
};
