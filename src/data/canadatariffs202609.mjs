// Canada counter-tariffs, September 2026.
// Figures from pinned Finance Canada release and product lists, Order in Council
// PC 2026-0785, CBSA Customs Notice 26-23, White House proclamations and annex PDFs,
// Bank of Canada FXUSDCAD for August 25, Census c1220, Statistics Canada Daily for
// December 2025, and USTR Canada page.

export const event = {
  slug: "canada-tariffs/september-2026",
  title: "Canada's counter-tariffs on C$27.6 billion (about US$20 billion) of U.S. goods took effect September 8",
  dek: "The United States signed three 50 percent proclamations on July 20 under Section 338 of the Tariff Act of 1930. Canada answered on August 22. Finance Canada said the countermeasures would be effective as of 12:01 a.m. on September 8. The Canadian order names that date.",
  name: "Canada tariffs",
  span: "July 20 to September 8, 2026",
  date: "2026-09-08",
  updated: "2026-09-09",
  kpis: [
    { value: "C$27.6", unit: "billion", label: "U.S. imports covered, Finance Canada" },
    { value: "15 / 25 / 50", unit: "percent", label: "matching rates on listed goods" },
    { value: "17", unit: "days", label: "from U.S. duties in force to Canada's" },
    { value: "629", unit: "tariff items", label: "Finance list, union of the two orders" },
  ],
};

// Finance Canada news release, August 25, 2026. Canadian dollars.
export const financeCoveredCad = 27.6; // billion
export const supportPackage = 7.5; // billion
export const supportRda = 1.5;
export const supportBdc = 0.5;
export const supportDiversification = 2;
export const supportWorkers = 3.5;
export const priorSupports = 25; // "nearly $25 billion"

// Bank of Canada valet FXUSDCAD, daily average, August 25, 2026.
// Daily value of the U.S. dollar expressed in Canadian dollars.
export const fxUsdCad20260825 = 1.3839;

// Finance product list, Internet Archive copy of August 25, 2026.
// Counted unique codes with regex \b(\d{4}\.\d{2}\.\d{2})\b on
// data/sources/canada-tariffs/finance-product-list-2026-08-25.txt.
export const listItemsAug25 = 874;

// Finance product list, updated August 26, 2026. Same regex on
// data/sources/canada-tariffs/finance-product-list-2026-08-26.txt.
export const listItems = 629;
export const listRate50 = 413;
export const listRate25 = 195;
export const listRate15 = 21;
event.kpis[3].value = String(listItems);

// Set difference of those two unique-code sets. Every removed code is
// HS chapter 03 (fish and crustaceans). Added codes, in table order:
// 4402.90.10, 4402.90.90 (charcoal), 4911.91.00 (printed pictures),
// 6809.11.00 (gypsum board), 7010.90.00 (glass containers),
// 7408.11.10, 7408.11.20, 7408.11.30, 7408.19.00 (copper wire).
// 874 - 254 + 9 = 629.
export const removedCodes = 254;
export const removedChapter03 = 254;
export const addedCodes = 9;
export const addedCodeList = [
  "4402.90.10",
  "4402.90.90",
  "4911.91.00",
  "6809.11.00",
  "7010.90.00",
  "7408.11.10",
  "7408.11.20",
  "7408.11.30",
  "7408.19.00",
];
export const listCountDrop = listItemsAug25 - listItems; // 874 - 629 = 245

// White House July 20 Annex I PDFs. Same regex, unique HTSUS 8-digit lines.
// annex-i-dairy-2026-07-20.txt = 52; annex-i-alcohol-2026-07-20.txt = 63;
// annex-i-motor-2026-07-20.txt = 440; pairwise overlap 0; union 555.
export const annexJulyDairyItems = 52;
export const annexJulyAlcoholItems = 63;
export const annexJulyMotorItems = 440;
export const annexJulyItems = annexJulyDairyItems + annexJulyAlcoholItems + annexJulyMotorItems; // 555

// White House fact sheet, September 8, 2026. Claimed scale of a GSA direction.
export const gsaDirectedUsd = 50; // billion U.S. dollars as printed

// July 20 to August 19 is 30 days. September 8 to September 15 is 7 days.
export const daysJulyProcToOriginalEffective = 30;
export const daysSeptModifyToEffective = 7;

// United States Surtax Order (2026), PC 2026-0785, English schedules.
// Counted with regex \d{4}.\d{2}.\d{2} on oic-pc-2026-0785.txt:
// Schedule 1 offsets 7090-7397 = 21; Schedule 2 7397-9365 = 172;
// Schedule 3 9365-11003 = 142; union 335. Schedule 4 from 11003 (14 codes)
// is the Chapter 98/99 exception list, not covered goods.
export const oic0785Schedule1 = 21;
export const oic0785Schedule2 = 172;
export const oic0785Schedule3 = 142;
export const oic0785Schedule4 = 14;
export const oicRate15 = oic0785Schedule1;
export const oicRate25 = oic0785Schedule2;
export const oicRate50 = oic0785Schedule3;
export const oic0785Items = oic0785Schedule1 + oic0785Schedule2 + oic0785Schedule3; // 335
export const oicItems = oic0785Items;

// Order Amending the United States Surtax Order (Steel and Aluminum 2025),
// PC 2026-0786, English schedules. Counted with the same regex on
// oic-pc-2026-0786.txt offsets 3038-9151:
// Schedule 1 = 2, 1.1 = 27, 2 = 21, 2.1 = 244; unique 294.
export const oic0786Schedule1 = 2;
export const oic0786Schedule11 = 27;
export const oic0786Schedule2 = 21;
export const oic0786Schedule21 = 244;
export const oic0786Items = oic0786Schedule1 + oic0786Schedule11 + oic0786Schedule2 + oic0786Schedule21; // 294
export const oicOverlap = 0;
export const oicUnionItems = oic0785Items + oic0786Items; // 629
// Finance August 26 HTML table, last-column rate versus the schedule each
// code sits in: 629 unique codes, 0 codes in only one set, 0 rate mismatches.
export const financeRateMismatches = 0;

// White House annex PDFs of September 8, 2026. Counted HTSUS lines.
export const annexDairyBanItems = 14;
export const annexMotorBanItems = 1;
export const annexAlcoholBanItems = 53;
export const annexAutoAddItems = 76; // Annex I Part A of the motor-vehicles scope modification
export const annexAutoRemoveItems = 8; // Annex I Part B
// Alcohol-scope annex I, September 8. Counted HTSUS product lines the same way as the auto-scope annex: a line that opens with a product code.
export const annexAlcoholScopeAddItems = 34; // Annex I Part A
export const annexAlcoholScopeRemoveItems = 2; // Annex I Part B (2208.30.6085, 2208.70.0060)

// Census Bureau, Trade in Goods with Canada, millions of U.S. dollars, not seasonally adjusted.
export const census2025 = {
  exports: 333619.7,
  imports: 381922.1,
  balance: -48302.3,
};
export const census2024 = {
  exports: 350605.6,
  imports: 411771.6,
  balance: -61166.0,
};

export const computed = {
  daysSignToCarney: 33, // 2026-08-22 minus 2026-07-20
  daysUsInForceToCanada: 17, // 2026-09-08 minus 2026-08-22
  daysSignToCanadaInForce: 50, // 2026-09-08 minus 2026-07-20
  listItems,
  listItemsAug25,
  listSum: listRate50 + listRate25 + listRate15, // 413 + 195 + 21
  oic0785Schedule1,
  oic0785Schedule2,
  oic0785Schedule3,
  oic0785Items,
  oicItems,
  oic0786Schedule1,
  oic0786Schedule11,
  oic0786Schedule2,
  oic0786Schedule21,
  oic0786Items,
  oicOverlap,
  oicUnionItems,
  financeRateMismatches,
  supportSum: 7.5, // 1.5 + 0.5 + 2 + 3.5
  censusExports2025Rounded: 333.6, // 333619.7 million
  censusImports2025Rounded: 381.9,
  censusTwoWay2025: 715.5, // (333619.7 + 381922.1) / 1000
  share20OfUsExportsPct: 6.0, // 20 / 333.6197 * 100 = 5.995
  share20OfUsImportsPct: 5.2, // 20 / 381.9221 * 100 = 5.236
  usdCoveredExact: 19.94363754606547, // 27.6 / 1.3839
  usdCovered: 19.94,
  usdCoveredRounded: 20, // story rounding of 19.94
  usdSupportExact: 5.419466724474312, // 7.5 / 1.3839
  usdSupport: 5.42,
  fxUsdCad20260825: 1.3839,
  annexDairyBanItems: 14,
  annexMotorBanItems: 1,
  annexAlcoholBanItems: 53,
  annexAutoAddItems: 76,
  annexAutoRemoveItems: 8,
  annexAlcoholScopeAddItems: 34,
  annexAlcoholScopeRemoveItems: 2,
  removedCodes,
  removedChapter03,
  addedCodes,
  listCountDrop,
  annexJulyDairyItems,
  annexJulyAlcoholItems,
  annexJulyMotorItems,
  annexJulyItems,
  gsaDirectedUsd,
  daysJulyProcToOriginalEffective,
  daysSeptModifyToEffective,
};

export const rateBars = [
  { label: "50 percent", value: listRate50 },
  { label: "25 percent", value: listRate25 },
  { label: "15 percent", value: listRate15 },
];

export const orderCountRows = [
  [`${oic0785Schedule1}`, "PC 2026-0785 Schedule 1, 15 percent", "English schedule"],
  [`${oic0785Schedule2}`, "PC 2026-0785 Schedule 2, 25 percent", "English schedule"],
  [`${oic0785Schedule3}`, "PC 2026-0785 Schedule 3, 50 percent", "English schedule"],
  [`${oic0785Items}`, "PC 2026-0785 Schedules 1 to 3, unique", `${oic0785Schedule1} + ${oic0785Schedule2} + ${oic0785Schedule3}`],
  [`${oic0786Schedule1}`, "PC 2026-0786 Schedule 1, aluminum 25 percent", "English schedule"],
  [`${oic0786Schedule11}`, "PC 2026-0786 Schedule 1.1, aluminum 50 percent", "English schedule"],
  [`${oic0786Schedule2}`, "PC 2026-0786 Schedule 2, steel 25 percent", "English schedule"],
  [`${oic0786Schedule21}`, "PC 2026-0786 Schedule 2.1, steel 50 percent", "English schedule"],
  [`${oic0786Items}`, "PC 2026-0786 Schedules 1 to 2.1, unique", `${oic0786Schedule1} + ${oic0786Schedule11} + ${oic0786Schedule2} + ${oic0786Schedule21}`],
  [`${oicOverlap}`, "Codes on both orders", "unique-code overlap"],
  [`${oicUnionItems}`, "Union of the two orders, Canadian tariff items", `${oic0785Items} + ${oic0786Items}`],
  [`${listItems}`, "Finance August 26 table, unique Canadian tariff items", "saved table"],
  [`${annexJulyItems}`, "U.S. July 20 Annex I, unique HTSUS 8-digit lines", `${annexJulyDairyItems} dairy + ${annexJulyAlcoholItems} alcohol + ${annexJulyMotorItems} motor-vehicles basket`],
  [`${financeRateMismatches}`, "Finance last-column rate differs from its schedule", "saved table versus the two orders"],
];

export const bbcCovered = "nearly C$28bn ($20bn; £15bn)";
export const bbcSupport = "C$7.5bn";
export const detroitCovered = "C$27.6 billion ($19.94 billion)";

export const moneyRows = [
  [`C$${financeCoveredCad} billion`, "U.S. goods Canada says the new U.S. 50 percent duties cover, effective August 22. Finance prints no currency tag. Canadian dollars, as converted by BBC and the Detroit News and checked against the Bank of Canada rate", "Finance Canada, August 25"],
  [`C$${financeCoveredCad} billion`, "U.S. imports Canada says its counter-tariffs cover, from September 8. Same figure", "Finance Canada, August 25"],
  [`US$${computed.usdCovered} billion`, `C$${financeCoveredCad} billion divided by the Bank of Canada USD/CAD daily average of ${fxUsdCad20260825} on August 25`, "Bank of Canada valet"],
  ["nearly US$20 billion", "USTR's July 20 figure for the goods the three Section 338 actions cover, as imports from Canada", "USTR, July 20"],
  [bbcCovered, "BBC conversion of the Canadian coverage figure on announcement day", "BBC, August 25"],
  [detroitCovered, "Detroit News conversion of the same figure", "Detroit News, August 25"],
  [`US$${computed.censusExports2025Rounded} billion`, "U.S. goods exports to Canada, 2025, U.S. dollars", "Census Bureau c1220"],
  [`US$${computed.censusImports2025Rounded} billion`, "U.S. goods imports from Canada, 2025, U.S. dollars", "Census Bureau c1220"],
];

export const timeline = [
  { date: "Feb 20", title: "Supreme Court holds IEEPA does not authorize tariffs", sub: "No. 24-1287, decided February 20, 2026" },
  { date: "Jul 1", title: "CUSMA joint review", sub: "Canada and Mexico asked for a 16-year renewal; the United States declined; the pact stays in force and is now reviewed every year" },
  { date: "Jul 20", title: "Three U.S. proclamations signed", sub: "50 percent additional duty under Section 338, originally from August 19" },
  { date: "Aug 18", title: "Proclamation 11056 delays the duties three days", sub: "new effective time 12:01 a.m. eastern, August 22" },
  { date: "Aug 21", title: "CBP guidance on the Section 338 headings", sub: "50 percent additional duty under 9903.03.12 to 9903.03.14; 0 percent additional under 9903.03.15 and 9903.03.16" },
  { date: "Aug 22", title: "U.S. duties take effect; Carney answers", sub: "match dollar for dollar; Canadian measures the Tuesday after Labour Day" },
  { date: "Aug 25", title: "Finance Canada names C$27.6 billion", sub: "rates 15, 25, and 50 percent; C$7.5 billion in supports; 12:01 a.m. on September 8" },
  { date: "Aug 26", title: "Seafood comes off the list", sub: `All ${removedCodes} fish and seafood lines removed; ${addedCodes} industrial lines added; ${listItems} lines remain; C$27.6 billion unchanged` },
  { date: "Sep 4", title: "Two Orders in Council", sub: `PC 2026-0785, ${oic0785Items} codes at 15/25/50 percent; PC 2026-0786, ${oic0786Items} steel and aluminum codes at 25/50 percent; union ${oicUnionItems}` },
  { date: "Sep 7", title: "CBSA Customs Notice 26-23", sub: "how the surtax is collected at the border" },
  { date: "Sep 8", title: "The Canadian order comes into force", sub: `Finance named 12:01 a.m.; the United States signs import-exclusion proclamations and directs GSA to take US$${gsaDirectedUsd} billion of Canadian-origin products off federal purchasing catalogues`, current: true },
  { date: "Sep 15", title: "U.S. motor-vehicles and alcohol baskets change", sub: `Autos: ${annexAutoAddItems} lines added at 50 percent, ${annexAutoRemoveItems} removed. Alcohol: ${annexAlcoholScopeAddItems} added, ${annexAlcoholScopeRemoveItems} removed` },
  { date: "Sep 29", title: "U.S. import bans take effect", sub: "dairy, motorcycles, and listed alcoholic beverages excluded from importation" },
];

export const homeTimeline = [
  { date: "Jul 20", title: "U.S. signs three 50 percent proclamations" },
  { date: "Aug 22", title: "Those duties take effect; Canada says it will match" },
  { date: "Aug 25", title: "Finance Canada names C$27.6 billion and the rates" },
  { date: "Sep 8", title: "Canada's order comes into force; U.S. signs bans", current: true },
];

event.visual = {
  kind: "timeline",
  title: "From the U.S. proclamations to Canada's order",
  note: "July 20 signing, August 22 in force, August 25 Canadian list, September 8 Canadian order and U.S. bans",
  entries: homeTimeline,
};
