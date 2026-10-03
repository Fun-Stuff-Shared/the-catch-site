import { computed } from "../immigration-detention-2026-10-01-supreme-court-takes-up-bond-hearings.mjs";

export const subject = {
  title: "Immigration detention",
  dek: "The Court's October 1 order takes the case and decides nothing yet. For about thirty years, people arrested inside the country who had entered without inspection and had not been admitted or paroled could ask an immigration judge for release on bond, unless they were apprehended while entering or shortly afterward or held on a criminal or terrorism ground. Since July 2025 the government has said they must be held, and the appeals courts have split.",
  current: [
    { label: "Days, decision to grant", value: String(computed.daysOpinionToGrant), unit: "days", as_of: "2026-10-01", record_id: "scotus-order-list-2026-10-01", source_value: String(computed.daysOpinionToGrant), source_unit: "days", source_sentence: "THURSDAY, OCTOBER 1, 2026" },
  ],
};
