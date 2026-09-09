import { computed, financeCoveredCad, listItems } from "../canadatariffs202609.mjs";

export const subject = {
  title: "Canada tariffs",
  dek: "Canada's counter-tariffs on C$27.6 billion (about US$20 billion) of U.S. goods took effect September 8, 17 days after the U.S. 50 percent Section 338 duties took effect.",
  current: [
    { label: "Covered U.S. imports, Finance Canada", value: `C$${financeCoveredCad}`, unit: "billion", as_of: "2026-08-25", record_id: "finance-countermeasures-2026-08-25", source_value: "27.6", source_unit: "billion Canadian dollars", source_sentence: "Canada's counter tariffs will apply to products covering $27.6 billion in imports from the U.S." },
    { label: "Tariff items on the August 26 list", value: String(listItems), unit: "items", as_of: "2026-08-26", record_id: "finance-product-list-2026-08-26", source_value: "629", source_unit: "tariff items", source_sentence: "List updated as of August 26, 2026" },
    { label: "Days from U.S. duties in force to Canada's", value: String(computed.daysUsInForceToCanada), unit: "days", as_of: "2026-09-08", record_id: "oic-pc-2026-0785", source_value: "17", source_unit: "days", source_sentence: "This Order comes into force on September 8, 2026" },
  ],
};
