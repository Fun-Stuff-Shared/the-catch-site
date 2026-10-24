import { computed } from "../new-hampshire-student-ids-2026-10-22-supreme-court-lets-new-hampshire-bar-student-ids.mjs";

export const subject = {
  title: "New Hampshire student IDs",
  dek: "On October 22 the Supreme Court let New Hampshire forbid student IDs at the polls, even as backup proof, without ruling on the state's law.",
  current: [
    { label: "Days from the judge's order to the election", value: String(computed.daysInjunctionToElection), unit: "days", as_of: "2026-10-22", record_id: "nh-stay-application-2026-10-15", source_value: "32", source_unit: "days", source_sentence: "issued its order just 32 days before the general election." },
  ],
};
