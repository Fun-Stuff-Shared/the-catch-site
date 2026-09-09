// Canada counter-tariffs, September 2026.
// Figures from pinned Finance Canada release and product list, Order in Council
// PC 2026-0785, CBSA Customs Notice 26-23, White House proclamations, Census c1220,
// Statistics Canada Daily for December 2025, and USTR Canada page.

export const event = {
  slug: "canada-tariffs/september-2026",
  title: "Canada's counter-tariffs on $27.6 billion of U.S. goods took effect September 8",
  dek: "The United States signed three 50 percent proclamations on July 20 under Section 338 of the Tariff Act of 1930. Canada answered on August 22. The Canadian order came into force at 12:01 a.m. on September 8.",
  name: "Canada tariffs",
  span: "July 20 to September 8, 2026",
  date: "2026-09-08",
  updated: "2026-09-09",
  kpis: [
    { value: "$27.6", unit: "billion", label: "U.S. imports covered, Finance Canada" },
    { value: "15 / 25 / 50", unit: "percent", label: "matching rates on listed goods" },
    { value: "17", unit: "days", label: "from U.S. duties in force to Canada's" },
    { value: "629", unit: "tariff items", label: "Finance list, updated August 26" },
  ],
};

// Finance Canada news release, August 25, 2026.
export const financeCoveredCad = 27.6; // billion, both the U.S. action and Canada's reply
export const supportPackage = 7.5; // billion
export const supportRda = 1.5;
export const supportBdc = 0.5;
export const supportDiversification = 2;
export const supportWorkers = 3.5;
export const priorSupports = 25; // "nearly $25 billion"

// Finance product list, updated August 26, 2026. Counted from the saved table.
export const listItems = 629;
export const listRate50 = 413;
export const listRate25 = 195;
export const listRate15 = 21;

// United States Surtax Order (2026), PC 2026-0785, English schedules 1-3.
export const oicRate15 = 21;
export const oicRate25 = 172;
export const oicRate50 = 142;
export const oicItems = 335; // 21 + 172 + 142

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
  listItems: 629,
  listSum: 629, // 413 + 195 + 21
  oicItems: 335, // 21 + 172 + 142
  supportSum: 7.5, // 1.5 + 0.5 + 2 + 3.5
  censusExports2025Rounded: 333.6, // 333619.7 million
  censusImports2025Rounded: 381.9,
  censusTwoWay2025: 715.5, // (333619.7 + 381922.1) / 1000
  share20OfUsExportsPct: 6.0, // 20 / 333.6197 * 100 = 5.995
  share20OfUsImportsPct: 5.2, // 20 / 381.9221 * 100 = 5.236
};

export const rateBars = [
  { label: "50 percent", value: listRate50 },
  { label: "25 percent", value: listRate25 },
  { label: "15 percent", value: listRate15 },
];

export const bbcCovered = "nearly C$28bn ($20bn; £15bn)";
export const bbcSupport = "C$7.5bn";
export const detroitCovered = "C$27.6 billion ($19.94 billion)";

export const moneyRows = [
  [`$${financeCoveredCad} billion`, "U.S. goods Canada says the new U.S. 50 percent duties cover, effective August 22; the release does not tag the currency", "Finance Canada, August 25"],
  [`$${financeCoveredCad} billion`, "U.S. imports Canada says its counter-tariffs cover, from September 8; same unlabeled figure", "Finance Canada, August 25"],
  [bbcCovered, "BBC conversion of the Canadian coverage figure on announcement day", "BBC, August 25"],
  [detroitCovered, "Detroit News conversion of the same figure", "Detroit News, August 25"],
  [`$${computed.censusExports2025Rounded} billion`, "U.S. goods exports to Canada, 2025, U.S. dollars", "Census Bureau c1220"],
  [`$${computed.censusImports2025Rounded} billion`, "U.S. goods imports from Canada, 2025, U.S. dollars", "Census Bureau c1220"],
];

export const timeline = [
  { date: "Jul 20", title: "Three U.S. proclamations signed", sub: "50 percent additional duty under Section 338, originally from August 19" },
  { date: "Aug 18", title: "Proclamation 11056 delays the duties three days", sub: "new effective time 12:01 a.m. eastern, August 22" },
  { date: "Aug 22", title: "U.S. duties take effect; Carney answers", sub: "match dollar for dollar; Canadian measures the Tuesday after Labour Day" },
  { date: "Aug 25", title: "Finance Canada names the list and the $27.6 billion", sub: "rates 15, 25, and 50 percent; $7.5 billion in supports" },
  { date: "Aug 26", title: "Product list updated", sub: `${listItems} tariff items in the saved table` },
  { date: "Sep 4", title: "Order in Council PC 2026-0785", sub: "United States Surtax Order (2026), in force September 8" },
  { date: "Sep 7", title: "CBSA Customs Notice 26-23", sub: "how the surtax is collected at the border" },
  { date: "Sep 8", title: "The Canadian order comes into force", sub: "12:01 a.m.; the United States also signs import-exclusion proclamations", current: true },
];

export const homeTimeline = [
  { date: "Jul 20", title: "U.S. signs three 50 percent proclamations" },
  { date: "Aug 22", title: "Those duties take effect; Canada says it will match" },
  { date: "Aug 25", title: "Finance Canada names $27.6 billion and the rates" },
  { date: "Sep 8", title: "Canada's order comes into force", current: true },
];

event.visual = {
  kind: "timeline",
  title: "From the U.S. proclamations to Canada's order",
  note: "July 20 signing, August 22 in force, August 25 Canadian list, September 8 Canadian order",
  entries: homeTimeline,
};
