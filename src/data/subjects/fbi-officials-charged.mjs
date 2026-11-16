import { computed } from "../fbi-officials-charged-2026-10-20-two-ex-fbi-officials-charged-with-lying-to-congress.mjs";

export const subject = {
  title: "FBI officials charged",
  dek: "Two former leaders of the FBI's Foreign Influence Task Force are charged with lying to House Judiciary Committee staff in 2023 about their part in the FBI's Hunter Biden investigations. A probable-cause hearing is set for October 27.",
  current: [
    { label: "Days prosecutors have to indict after the arrest, before exceptions", value: String(computed.indictmentDays), unit: "days", as_of: "2026-10-23", record_id: "usc-18-3161", source_value: "30", source_unit: "days", source_sentence: "within thirty days from the date on which such individual was arrested" },
  ],
};

// How the series is listed on the homepage and /events/; lower rank lists first.
export const listing = {
  title: "FBI officials charged",
  topic: "Courts",
  keywords: "FBI Floris Benavides Foreign Influence Task Force Hunter Biden laptop false statements Congress House Judiciary Pirro Faruqui Round River",
  description: "Two former leaders of the FBI's Foreign Influence Task Force are charged with lying to House Judiciary Committee staff in 2023 about their part in the FBI's Hunter Biden investigations. A probable-cause hearing is set for October 27.",
  rank: 26,
};
