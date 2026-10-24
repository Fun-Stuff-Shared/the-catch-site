import { figures } from "../california-voter-list-2026-10-19-doj-seeks-to-block-20000-california-ballots.mjs";

export const subject = {
  title: "California's voter list",
  dek: "The Justice Department has asked a federal appeals court to make California set aside the mail ballots of about 20,000 voters it calls likely noncitizens, before the trial judge rules.",
  current: [
    { label: "Voters on DOJ's California list", value: `Over ${figures.listed}`, unit: "", as_of: "2026-10-21", record_id: "mcloughlin-decl-2026-10-21", source_value: figures.listed, source_unit: "", source_sentence: "over 20,000 individuals remaining on the list." },
    { label: "Sampled LA names mailed no ballot", value: `${figures.notMailed} of ${figures.sample}`, unit: "", as_of: "2026-10-20", record_id: "flores-decl-2026-10-20", source_value: String(figures.notMailed), source_unit: "", source_sentence: "112 of the 200 records correspond to registrations that are canceled or inactive, so that no General Election ballot was mailed to the person" },
    { label: "Judge Carter's hearing", value: "October 27", unit: "2026", as_of: "2026-10-23", record_id: "carter-order-2026-10-23", source_value: "October 27", source_unit: "2026", source_sentence: "one week before the United States’ requested date of relief" },
  ],
};
