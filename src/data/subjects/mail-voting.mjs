import { computed } from "../mail-voting-2026-09-14-court-denies-stay.mjs";

export const subject = {
  title: "Mail voting",
  dek: "On September 14 the Supreme Court denied a stay of a federal judge's block on Postal Service rules for mail ballots. The block covers elections on or before November 3.",
  current: [
    { label: "Stay application 26A305", value: "Denied", unit: "", as_of: "2026-09-14", record_id: "scotus-26a305-docket-2026-09-14", source_value: "Denied", source_unit: "", source_sentence: "Application (26A305) for stay presented to Justice Jackson and by her referred to the Court is denied" },
    { label: "Days to November 3", value: String(computed.daysDenialToElection), unit: "days", as_of: "2026-09-14", record_id: "scotus-26a305-order", source_value: String(computed.daysDenialToElection), source_unit: "days", source_sentence: "September 14, 2026" },
    { label: "Injunction through", value: "November 3", unit: "2026", as_of: "2026-09-04", record_id: "talwani-pi-2026-09-04", source_value: "November 3", source_unit: "2026", source_sentence: "elections occurring before or on November 3" },
  ],
};
