import { table1, monthly, inflation } from "../iran-war-2026-09-15-cbo-estimates-38-billion-war-cost.mjs";

export const subject = {
  title: "Iran war cost",
  dek: "CBO's September 15 letter puts the Pentagon's incremental cost of the Iran war at $38.1 billion through August 1. Another month would add $2 billion or $3 billion. PCE inflation in early 2027 is 0.5 percentage points higher than CBO's February forecast. The Pentagon lists 23 U.S. service members dead since the war began, four of them killed in action in July, after the first war was declared over.",
  current: [
    { label: "U.S. troops killed in action, July 17 to 19", value: "4", unit: "deaths", as_of: "2026-11-13", record_id: "dcas-overseas-operations-2026-11-13", source_value: "4", source_unit: "deaths", source_sentence: "TOTAL HOSTILE DEATHS: Army 4, Navy 0, Marines 0, Air Force 0, Space Force 0, Total 4" },
    { label: "U.S. military deaths since Feb. 28", value: "23", unit: "deaths", as_of: "2026-11-13", record_id: "wapo-two-deaths-2026-10-29", source_value: "23", source_unit: "deaths", source_sentence: "In all, there have been 11 deaths from enemy fire and 12 nonhostile deaths, according to DCAS." },
    { label: "DoD cost through August 1", value: String(table1.total), unit: "USD billions", as_of: "2026-08-01", record_id: "cbo-62756-iran", source_value: "38.1", source_unit: "USD billions", source_sentence: "Comparing CBO’s estimate ($38.1 billion) with" },
    { label: "Extra month, low or July intensity", value: `${monthly.low} to ${monthly.july}`, unit: "USD billions", as_of: "2026-09-15", record_id: "cbo-62756-iran", source_value: "2", source_unit: "USD billions", source_sentence: "an additional month of conflict would cost $2 billion" },
    { label: "inflation, early 2027, above CBO's February path", value: String(inflation.pce2027q1Pp), unit: "pp", as_of: "2026-09-15", record_id: "cbo-62756-iran", source_value: "0.5", source_unit: "percentage points", source_sentence: "0.5 percentage points higher" },
    { label: "Replace expended munitions", value: String(table1.munitions), unit: "USD billions", as_of: "2026-08-01", record_id: "cbo-62756-iran", source_value: "21.7", source_unit: "USD billions", source_sentence: "$21.7 billion: $7.3 billion for the land-attack cruise" },
  ],
};
