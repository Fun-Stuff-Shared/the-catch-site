import { computed } from "../immigration-detention-2026-10-01-supreme-court-takes-up-bond-hearings.mjs";

export const subject = {
  title: "Immigration detention",
  dek: "The October 1 grant is not a ruling and not a count of people. Under the bond statute the government may release someone. An immigration judge released a person who was already in the country and had not been admitted, after finding no danger and no flight risk.",
  current: [
    { label: "Review granted", value: "October 1", unit: "2026", as_of: "2026-10-01", record_id: "scotus-order-list-2026-10-01", source_value: "October 1", source_unit: "2026", source_sentence: "THURSDAY, OCTOBER 1, 2026" },
    { label: "Appeals decision", value: "April 28", unit: "2026", as_of: "2026-04-28", record_id: "ca2-cunha-opinion-2026-04-28", source_value: "April 28", source_unit: "2026", source_sentence: "Decided: April 28, 2026" },
    { label: "Days, decision to grant", value: String(computed.daysOpinionToGrant), unit: "days", as_of: "2026-10-01", record_id: "scotus-order-list-2026-10-01", source_value: String(computed.daysOpinionToGrant), source_unit: "days", source_sentence: "THURSDAY, OCTOBER 1, 2026" },
  ],
};
