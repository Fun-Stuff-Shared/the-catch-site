import { computed } from "../immigration-detention-2026-10-01-supreme-court-takes-up-bond-hearings.mjs";

export const subject = {
  title: "Immigration detention",
  dek: "For three decades immigrants who entered without inspection could ask for release on bond. In July 2025 the Trump administration said the law forbids it, nine federal appeals courts have said it does not, and on October 1 the Supreme Court took the case.",
  current: [
    { label: "Days Barbosa da Cunha spent in custody", value: String(computed.daysDetained), unit: "days", as_of: "2025-10-29", record_id: "doj-petition-26-104", source_value: String(computed.daysDetained), source_unit: "days", source_sentence: "Petitioner’s counsel has confirmed that Petitioner was released on bond as of October 29, 2025." },
  ],
};
