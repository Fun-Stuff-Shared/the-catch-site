// Every number here is printed on an admitted record; the claim each comes from is named.
// FEC: fec-addison-2022, fec-addison-2024, fec-adison-2024, fec-pov-pac-2022-* (claims pov-300k, vance-campaign-direct,
// pov-thiel-share, household-7m, trump-named-5-95m). KPMG and the Times: two-firms-61pct, kpmg-public-report, beneficiaries-unknown.
// Prices: reuters-valero-prices-2026-01-21 (first-sale-prices); margin: margin-estimate.
export const n = {
  povTotal: "19.8",
  povSpent: 16,
  thiel: 15_000_000,
  addisonPov: 300_000,
  addisonPovPct: "1.5",
  jfc: "10,800",
  toCampaign: "5,800",
  household: "7.1",
  trumpNamed: "5.95",
  maga: 5_000_000,
  trump47: 950_000,
  turnout: 1_000_000,
  highPlains: 100_000,
  advance: 50_000,
  share: 61,
  deposits: "12.26",
  depositors: 20,
  paidOutPct: "98.7",
  remaining: "168.56",
  auctions: "11.7",
  boughtUnder: 15,
  soldUnder: "8.50 to $9.50",
  margin: "3 to $3.50",
  firstSales: 500,
  trafiguraTotal: "6,400",
  likes: "18,000",
};

export const event = {
  slug: "venezuela-oil/2026-11-11-vitol-trader-vance-venezuela-oil-contract",
  title: "A Vance backer got the call to market Venezuela's oil, with no tender",
  dek: "Two days after U.S. forces captured Nicolás Maduro, Energy Secretary Chris Wright called John Addison of the trading house Vitol. Addison had given $300,000 to the super PAC behind JD Vance's 2022 Senate run.",
  name: "How Vitol got the job of selling Venezuela's oil",
  date: "2026-11-11",
  updated: "2026-11-12",
  kpis: [],
};

export const subjectFigure = { label: "Vitol and Trafigura's share of deposits into the U.S.-held Venezuela account, January to September", value: n.share, unit: "%" };

const money = (v) => (v >= 1_000_000 ? `$${(v / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 2 })} million` : `$${v.toLocaleString("en-US")}`);

// Protect Ohio Values PAC, the super PAC behind Vance's 2022 primary: its five largest donors, from the FEC receipts.
export const povBars = [
  { label: "Peter Thiel", value: n.thiel, shown: money(n.thiel), c: "pov-thiel-share" },
  { label: "Walter W. Buckley Jr.", value: 1_200_000, shown: money(1_200_000), c: "pov-top-donors" },
  { label: "David O. Sacks", value: 1_000_000, shown: money(1_000_000), c: "pov-top-donors" },
  { label: "Per Aspera Policy Inc.", value: 400_000, shown: money(400_000), c: "pov-top-donors" },
  { label: "John Addison", value: n.addisonPov, shown: money(n.addisonPov), c: "pov-300k", highlight: true },
];

// The Addison household's 2024 gifts to political committees, from the FEC rows at their Houston address.
export const householdBars = [
  { label: "MAGA Inc.", value: n.maga, shown: money(n.maga), c: "maga-5m" },
  { label: "Turnout for America", value: n.turnout, shown: money(n.turnout), c: "turnout-for-america" },
  { label: "Trump 47 Committee", value: n.trump47, shown: money(n.trump47), c: "household-7m" },
  { label: "High Plains PAC", value: n.highPlains, shown: money(n.highPlains), c: "household-7m" },
  { label: "Advance the Senate", value: n.advance, shown: money(n.advance), c: "household-7m" },
];

// The dated chain; each label is its claim's short form.
export const chronology = [
  { date: "Dec. 16, 2025", c: "blockade-dec16" },
  { date: "Dec. 27, 2025", c: "planes-bozeman" },
  { date: "Jan. 5, 2026", c: "wright-called-addison-jan5" },
  { date: "Jan. 9", c: "licenses-by-jan9" },
  { date: "Jan. 28", c: "rubio-short-term" },
  { date: "Jan. 29", c: "gl46-opened" },
  { date: "Feb. 13", c: "pdvsa-licensed-only" },
  { date: "July 20", c: "addison-retired-board" },
  { date: "Through Sept.", c: "two-firms-61pct" },
];

// How Washington has handled other countries' oil sales; each cell is its claim's short form.
export const precedents = [
  { place: "Libya, 2011", seller: "Libya's rebel council", buyers: "Treasury license named Vitol and Qatar Petroleum; any U.S. person could apply to trade the oil", c: ["libya-gl5"] },
  { place: "Venezuela, 2022", seller: "Chevron's Venezuelan joint ventures", buyers: "Treasury license named Chevron alone, for its own oil", c: ["gl41-chevron"] },
  { place: "Iraq, 2003", seller: "Iraq's state marketer, SOMO, with the money in an audited fund", buyers: "First post-war sale by tender: six refiners out of 52 bidders", c: ["iraq-2003-tender"] },
  { place: "Venezuela, 2026", seller: "PDVSA, with the money in a U.S.-controlled account", buyers: "Wright called Vitol's Addison; Vitol and Trafigura licensed by January 9; Reuters reports bidding was skipped", c: ["wright-called-addison-jan5", "licenses-by-jan9", "no-tender", "two-firms-61pct"] },
];

const c = (id) => ({ c: id });
export const explanations = [
  {
    id: "vance-word",
    name: "Vance's word opened the door",
    holders: "Addison",
    verdict: "partly",
    summary: ["A U.S. official confirms Vance vouched for Addison to Wright, at least a year before; the Energy Department says it chose Vitol for its size.", c("addison-vance-vouched"), c("official-vouching-a-year-before"), c("doe-picked-largest")],
    claim: [["Addison told Reuters that Vance had told Wright he was trustworthy, which paved the way for the January 5 call.", c("addison-vance-vouched")]],
    evidenceFor: [["A U.S. official confirmed to Reuters that Vance had vouched for Addison to Wright.", c("official-vouching-a-year-before"), " The call went to a gasoline trader, not to Vitol's crude desk or its regional chief, and Vitol says he lacked the expertise for a crude deal.", c("addison-who"), c("vitol-addison-lacked-expertise")]],
    evidenceAgainst: [["The same official dates the vouching at least a year before the call. The Energy Department says Vance and Wright never discussed the oil sales and that it picked Vitol because it is the largest trader.", c("official-vouching-a-year-before"), c("doe-picked-largest")]],
    conclusion: [["Addison says, and an official confirmed, that Vance vouched for him to Wright. Whether the vouching decided the call rests on Addison's word against the Energy Department's; no public record shows how Vitol was chosen.", c("addison-vance-vouched"), c("official-vouching-a-year-before"), c("doe-picked-largest")]],
  },
  {
    id: "size",
    name: "Vitol was picked for its size and speed",
    holders: "Energy Department, Wright, Rubio",
    verdict: "partly",
    summary: ["Fits the firm; Vitol says the man called was not its crude negotiator.", c("doe-picked-largest"), c("vitol-addison-lacked-expertise")],
    claim: [["The Energy Department says it picked Vitol as the world's largest trader, and Rubio says Venezuela was running out of storage and needed money at once.", c("doe-picked-largest"), c("storage-under-quarantine"), c("rubio-short-term")]],
    evidenceFor: [["Vitol and Trafigura were among the most active traders of Venezuelan oil before 2019 and could put tankers there fast.", c("traders-past-venezuela")]],
    evidenceAgainst: [["Vitol says Addison, the man Wright called, lacked the expertise to negotiate a crude contract; Addison says Vance's word paved the way.", c("vitol-addison-lacked-expertise"), c("addison-vance-vouched")]],
    conclusion: [["Size fits the choice of Vitol, but Vitol itself says the man Wright called was not its crude negotiator. The Energy Department's account and Addison's both stand, and they disagree.", c("doe-picked-largest"), c("vitol-addison-lacked-expertise"), c("addison-vance-vouched")]],
  },
  {
    id: "donors",
    name: "The oil was handed to megadonors",
    holders: "Viral posts on X",
    verdict: "not",
    summary: ["Not for both firms: Trafigura was offered a license too, a source says, with no large donor in the filings searched. Whether Addison's ties helped Vitol is the first explanation.", c("trafigura-days-later"), c("trafigura-no-donor")],
    claim: [["A Spanish-language post with more than 18,000 likes says the marketing was handed to campaign megadonors without public bidding.", c("viral-post")]],
    evidenceFor: [["Addison gave $300,000 to the super PAC behind Vance's 2022 primary, and his household gave about $7.1 million to political committees in 2024.", c("pov-300k"), c("household-7m")]],
    evidenceAgainst: [["Trafigura was offered its license days after Vitol, a source told Reuters. FEC filings from 2024 through 2026 show about $6,400 from people who list Trafigura as their employer.", c("trafigura-days-later"), c("trafigura-no-donor")]],
    conclusion: [["Wright's call went to a man who, with his wife, gave about $7.1 million to political committees in 2024; people listing Trafigura as employer gave about $6,400 in 2024 to 2026 filings, and Trafigura was offered a license too, a source told Reuters. The post says the oil went to megadonors; of the two firms, only Vitol's caller is one in the filings searched.", c("wright-called-addison-jan5"), c("pov-300k"), c("household-7m"), c("trafigura-days-later"), c("trafigura-no-donor")]],
  },
  {
    id: "before-raid",
    name: "The sale was arranged before the raid",
    holders: "Reuters' source, viral posts",
    verdict: "untestable",
    summary: ["One secondhand source; Addison and Vance's office deny it.", c("meeting-reported"), c("meeting-denied")],
    claim: [["A person given Addison's account told Reuters the two men met at the Yellowstone Club on December 27 and Vance asked how fast Venezuelan crude could be sold.", c("meeting-reported")]],
    evidenceFor: [["Flight records show Addison's jet and Vance's plane at Bozeman's airport that day.", c("planes-bozeman")]],
    evidenceAgainst: [["Addison and Vance's office deny the meeting, and Addison says he expected a market update when Wright called on January 5.", c("meeting-denied"), c("addison-expected-market-update")]],
    conclusion: [["The flight records place the planes, not the men. Rep. Mike Levin, a Democrat, has asked for the testimony and records that would settle it.", c("planes-bozeman"), c("levin-testimony")]],
  },
  {
    id: "warned",
    name: "The traders were warned of the operation",
    holders: "Garcia (a question)",
    verdict: "untestable",
    summary: ["Both firms say they were given no advance knowledge.", c("no-advance-knowledge")],
    claim: [["In January, Garcia asked Vitol and Trafigura whether they had advance notice of the military action.", c("garcia-advance-notice")]],
    evidenceFor: [],
    evidenceAgainst: [["Both firms told Reuters they had been given no advance knowledge of U.S. military operations.", c("no-advance-knowledge")]],
    conclusion: [["No public record answers it either way.", c("no-advance-knowledge")]],
  },
  {
    id: "monopoly",
    name: "A no-bid monopoly",
    holders: "Viral posts, Rep. Mike Levin",
    verdict: "partly",
    summary: ["No bidding, and a head start after the trade opened on January 29, buyers say.", c("no-tender"), c("pdvsa-licensed-only"), c("gl46-opened")],
    claim: [["Critics say two firms were handed Venezuela's oil without a tender.", c("viral-post"), c("levin-testimony")]],
    evidenceFor: [["The administration skipped competitive bidding and defends doing so, Reuters reports. On February 13, four would-be buyers told Reuters that since General License 46 let established U.S. firms trade, on conditions, PDVSA had refused to sell to companies without individual U.S. licenses. In January, people familiar told Bloomberg that Vitol's and Trafigura's own licenses run to June 2027.", c("no-tender"), c("gl46-opened"), c("pdvsa-licensed-only"), c("licenses-run-2027")]],
    evidenceAgainst: [["From January 29, established U.S. firms could legally market the oil, and by September 30 the account had 20 registered depositors.", c("gl46-opened"), c("kpmg-public-report")]],
    conclusion: [["Reuters reports the administration skipped bidding. General License 46 let established U.S. firms market the oil from January 29, on conditions, but four would-be buyers told Reuters on February 13 that PDVSA had since refused companies without individual U.S. licenses. Vitol and Trafigura paid in 61 percent of the account's deposits through September, by KPMG's count as the Times describes it.", c("no-tender"), c("licenses-by-jan9"), c("licenses-run-2027"), c("gl46-opened"), c("pdvsa-licensed-only"), c("two-firms-61pct")]],
  },
  {
    id: "routine",
    name: "Routine practice, a short-term fix",
    holders: "Rubio",
    verdict: "partly",
    summary: ["Naming firms in a license has precedent; choosing them by phone is not how Iraq's oil was sold.", c("libya-gl5"), c("iraq-2003-tender")],
    claim: [["Rubio told senators the arrangement was a short-term mechanism, not the permanent one, and called the traders a short-term fix.", c("rubio-short-term")]],
    evidenceFor: [["In 2011 the Treasury named Vitol itself in a license for rebel-held Libya's oil, and in 2022 it named Chevron alone.", c("libya-gl5"), c("gl41-chevron")]],
    evidenceAgainst: [["In occupied Iraq in 2003, only the state marketer sold the oil, with proceeds in an audited fund; the British government told Parliament in 2004 that it sold by spot sale, tender and long-term agreement.", c("iraq-2003-tender"), c("iraq-three-ways")]],
    conclusion: [["The Treasury's licenses follow precedent, but how the firms were chosen matches neither case: the Libya license named the firms trading the rebel council's oil and invited others to apply, and Iraq's oil was sold by its own marketer.", c("libya-gl5"), c("iraq-2003-tender")]],
  },
];
