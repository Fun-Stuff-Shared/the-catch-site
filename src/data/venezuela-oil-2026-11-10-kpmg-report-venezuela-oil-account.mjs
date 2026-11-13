// Every number here is printed on an admitted record, or summed from one; the claim it comes from is named.
// The State Department report (state-custody-report-2026-11-12): deposits-total, paid-out-total, channels,
// held-sept30, recipients-split, sectors, vendor-*, five-banks, bdv-largest, kpmg-order (USAspending).
export const n = {
  deposits: "12.26",
  depositsExact: "12,263,715,308.36",
  paidOut: "12.11",
  paidOutPct: "98.7",
  left: "168.6",
  interest: "12.5",
  depositors: 20,
  banks: 20,
  auctions: "2.09",
  electronic: "9.32",
  banknotes: "549.8",
  banknotesPending: "192.9",
  dollarSales: "11.96",
  vendors: "133.1",
  heldAtBcv: "15.0",
  business: "9.37",
  individuals: "2.87",
  imf: 346,
  food: "3.35",
  services: "2.22",
  agriculture: "1.18",
  fiveBanksPct: 83,
  bdv: "2.88",
  kpmgPaid: "18.2",
  kpmgOrderAll: "84.4",
  kpmgObligated: "14.9",
  intlBodies: "10.4",
  paho: "8.7",
  mostlyNeeds: "66.6",
  bdo: "$155,000",
  costOfOps: "4.7",
  rodriguezIn: "15.603",
  rodriguezWages: "14.710",
  rodriguezSpent: "14.860",
  julyFigure: 13,
};

export const event = {
  slug: "venezuela-oil/2026-11-10-kpmg-report-venezuela-oil-account",
  title: "The U.S. took in $12 billion for Venezuela's oil. Nearly all of it went back to Venezuela.",
  dek: "Of the $12.26 billion buyers paid into the U.S.-held account through September, $12.11 billion went back out at the request of Venezuela's central bank, almost all of it as dollars sold through Venezuelan banks, a State Department report shows.",
  name: "Where the U.S.-held Venezuela oil money went",
  date: "2026-11-10",
  updated: "2026-11-13",
  kpis: [],
};

export const subjectFigure = { label: "Share of the U.S.-held Venezuela account's deposits paid out, January to September 2026", value: n.paidOutPct, unit: "%" };

// Where the $12.11 billion that left the account went, by channel (report, Section 8.2).
export const payouts = [
  { channel: "Currency auctions, January to March", amount: "$2.09 billion", how: "Dollars auctioned by the central bank", c: ["channels"] },
  { channel: "Electronic currency sales, from March 31", amount: "$9.32 billion", how: "Dollars sold to banks at a rate the central bank sets", c: ["channels", "rate-unpublished"] },
  { channel: "U.S. banknotes, from July", amount: "$549.8 million", how: "Cash shipped in by air; $192.9 million of it still awaiting release on September 30", c: ["channels", "held-sept30"] },
  { channel: "Payments to vendors", amount: "$133.1 million", how: "Paid directly for goods and services", c: ["channels"] },
  { channel: "Still in a central-bank account", amount: "$15.0 million", how: "Cannot be used without U.S. approval", c: ["held-sept30"] },
];

// What the $133.1 million in vendor payments bought, grouped from the report's 38-line ledger.
export const vendorGroups = [
  { group: "Medicines, dialysis and test supplies, and Venezuela's commitments to PAHO's vaccine and supply funds", amount: "$57.4 million", c: "vendor-health" },
  { group: "Oil, power, coal and fertilizer operations", amount: "$35.6 million", c: "vendor-energy" },
  { group: "KPMG, the law firm Greenberg Traurig, banknote handlers and other service providers", amount: "$28.8 million", c: "vendor-oversight" },
  { group: "Foreign central banks and international bodies, PAHO included", amount: "$10.4 million", c: "vendor-intl" },
];

// The dated chain; each label is its claim's short form.
export const chronology = [
  { date: "Jan. 7, 2026", c: "doe-both-peoples" },
  { date: "Jan. 9", c: "eo-venezuelan-property" },
  { date: "Mar. 11", c: "casten-march" },
  { date: "Apr. 10", c: "kpmg-order" },
  { date: "June 3", c: "rubio-june3-audited" },
  { date: "July 27", c: "trump-july27" },
  { date: "Sept. 16", c: "senators-letter" },
  { date: "Oct. 29", c: "report-dated" },
  { date: "Nov. 10", c: "nyt-confidential-copy" },
  { date: "Nov. 11", c: "trump-nov11" },
  { date: "Nov. 12", c: "report-posted" },
];

const c = (id) => ({ c: id });
export const explanations = [
  {
    id: "economy",
    name: "Into Venezuela's economy, through its banks",
    holders: "State Department",
    verdict: "supported",
    summary: ["Nearly all of it was sold as dollars through 20 Venezuelan banks; a small part was still held on September 30.", c("channels"), c("twenty-banks"), c("held-sept30")],
    claim: [["A State Department official said the report shows the process is working.", c("state-official-working")]],
    evidenceFor: [["The account paid out $12.11 billion of $12.26 billion, almost all of it through currency sales to Venezuelan banks, and every payout needed a request from the central bank and U.S. approval.", c("deposits-total"), c("paid-out-total"), c("channels"), c("approval")]],
    evidenceAgainst: [["On September 30, $15.0 million sat in a central-bank account and $192.9 million in banknotes awaited release.", c("held-sept30")]],
    conclusion: [["The money left the account for Venezuela's banks and vendors. Who in Venezuela ended up with the dollars is in data the State Department holds and has not published.", c("account-nothing-to-us"), c("no-names")]],
  },
  {
    id: "united-states",
    name: "To the United States",
    holders: "Trump",
    verdict: "not",
    summary: ["The account's money is Venezuela's and was paid out to Venezuela; no payment to the U.S. government is recorded.", c("eo-venezuelan-property"), c("no-record-billions-to-us")],
    claim: [["Trump said in July that the war was paid for many times over and the money could go to the military, and in November that the U.S. was \"taking out billions and billions of dollars of oil.\"", c("trump-july27"), c("trump-nov11")]],
    evidenceFor: [["The U.S. holds a 35% stake in NABEP's parent company, which the White House values at up to hundreds of billions, and can buy 20% of its oil at production cost.", c("nabep-stake")]],
    evidenceAgainst: [["Trump's own order makes the account's money Venezuela's property, and the report lists no payment from it to any U.S. agency. The October cargo Trump called a gift was bought at a discount, two people told The Washington Post.", c("eo-venezuelan-property"), c("account-nothing-to-us"), c("gift-cargo-bought")]],
    conclusion: [["The money Trump was asked about went back to Venezuela. The NABEP deal's terms record no payment to the U.S. either.", c("trump-july27"), c("no-record-billions-to-us")]],
  },
  {
    id: "payroll",
    name: "To Venezuela's public wages and pensions",
    holders: "Delcy Rodríguez",
    verdict: "untestable",
    summary: ["The report says the bolívars raised by the dollar sales fund government spending such as payrolls; nothing ties that to Rodríguez's figures.", c("bolivars-to-state"), c("rodriguez-99")],
    claim: [["Rodríguez says 99 of every 100 dollars of oil and mining income went to wages and pensions.", c("rodriguez-99")]],
    evidenceFor: [["When the central bank sells dollars it takes the banks' bolívars, and the report says it uses them for government spending such as public-sector payrolls.", c("how-intervention-works"), c("bolivars-to-state")]],
    evidenceAgainst: [["The report says none of the dollars sold through the banks went to government bodies. Rodríguez's figures come from a portal that covers two government funds, over a different period.", c("no-govt-recipients"), c("rodriguez-99")]],
    conclusion: [["The report says the central bank uses the bolívars for government spending such as payrolls. Rodríguez says 99 of every 100 dollars of oil and mining income from January to November went to wages and pensions; by her own figures that is 94% of income, on a portal that covers two government funds.", c("bolivars-to-state"), c("rodriguez-99")]],
  },
  {
    id: "few-buyers",
    name: "To a few well-placed firms buying cheap dollars",
    holders: "Ricardo Ríos, Primero Justicia",
    verdict: "untestable",
    summary: ["The report gives neither the buyers' names nor the rate of each sale.", c("no-names"), c("rate-unpublished")],
    claim: [["Ricardo Ríos, writing on X, asks who benefited most from the preferential-rate dollars.", c("rios-question")]],
    evidenceFor: [["Five of the 20 banks handled about 83% of the dollars, and since March 31 the central bank has sold them at a fixed rate it sets.", c("five-banks"), c("rate-unpublished")]],
    evidenceAgainst: [["Businesses and individuals both bought dollars, across sectors led by food and consumer goods.", c("recipients-split"), c("sectors")]],
    conclusion: [["Concentration among banks does not show concentration among buyers. The banks report each buyer by tax ID, the central bank passes that data to the State Department and KPMG, and the names are not published; and the rate of each sale is not published either.", c("five-banks"), c("no-names"), c("rate-unpublished")]],
  },
  {
    id: "connected-firms",
    name: "Steered to politically connected U.S. firms",
    holders: "Senate Democrats",
    verdict: "partly",
    summary: ["Direct vendor payments were $133.1 million, 1.1% of what left the account; other routes are untested.", c("channels")],
    claim: [["Senators Wyden, Warren and Whitehouse warned the money could be directed to politically favored insiders.", c("senators-letter")]],
    evidenceFor: [["The account paid KPMG $18.2 million and Greenberg Traurig $5 million.", c("vendor-kpmg"), c("vendor-oversight")]],
    evidenceAgainst: [["Most of the vendor money went to medicines and to energy and power equipment.", c("vendor-health"), c("vendor-energy")]],
    conclusion: [["No record shows billions in direct payments to U.S. firms. The senators' wider concern, about what Venezuela might be pressed to request, is not something this ledger can test.", c("channels"), c("senators-letter")]],
  },
];
