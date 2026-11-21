export const subject = {
  title: "AI chip exports",
  dek: "How Washington limits China's access to advanced American AI chips. On November 16, 2026, Commerce began requiring licenses to ship them to data centers abroad that serve Chinese companies, and to five Southeast Asian and Latin American countries; data centers inside the United States are not covered. On November 19, a House committee released Commerce's license table for Nvidia's H200 and AMD's MI325X: 879,868 chips approved for Chinese companies as of May 11, 2026, none of them shipped by then.",
  current: [
    { label: "AI chips approved for Chinese companies, none shipped", value: "879,868", unit: "chips", as_of: "2026-05-11", record_id: "hfac-summary-2026-11-19", source_value: "879,868", source_unit: "covered integrated circuits", source_sentence: "BIS approved the export, re-export, or transfer (in-country) of 879,868 covered integrated" },
    { label: "Threshold for a data-center license", value: "12 million", unit: "aggregate TPP", as_of: "2026-11-16", record_id: "fr-pi-2026-23529", source_value: "12,000,000", source_unit: "aggregate TPP", source_sentence: "provide access to more than 12,000,000" },
    { label: "Countries newly needing a license", value: "5", unit: "countries", as_of: "2026-11-16", record_id: "fr-pi-2026-23529", source_value: "5", source_unit: "countries", source_sentence: "to or within Indonesia, Malaysia, Singapore, Brazil, and Thailand" },
    { label: "Days for existing data centers to get a license", value: "90", unit: "days", as_of: "2026-11-16", record_id: "fr-pi-2026-23529", source_value: "90", source_unit: "days", source_sentence: "must obtain a license with 90 days of the effective date of this IFR or face future export restrictions" },
  ],
};

// How the series is listed on the homepage and /events/; lower rank lists first.
export const listing = {
  title: "AI chip exports",
  topic: "Technology",
  keywords: "AI chips export controls Nvidia Megaspeed China data centers remote access BIS Commerce Lutnick Bessent license Malaysia Singapore Thailand Indonesia Brazil",
  description: "Commerce's licenses for H200-class chips to Chinese companies, released November 19, 2026, and its November 16, 2026 rule requires licenses to ship advanced AI chips to data centers abroad serving Chinese companies, and to five countries.",
  rank: 7,
};
