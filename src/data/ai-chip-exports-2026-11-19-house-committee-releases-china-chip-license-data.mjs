// Every number here is printed on an admitted record or summed from one.
// The BIS status table: bis-license-table-2026-05-11 (claims approvals-list, returned, pending, rejected-one, offshore-returned, alibaba-610k).
// The committee summary: hfac-summary-2026-11-19 (claims requested, approved, alibaba-asked, four-approved, tencent-445k).
// Nvidia: nvidia-cfo-q3-2026-11-17 (hopper-2-4b). Reuters, Nov. 5: reuters-hk-stockpile-2026-11-05 (hk-stockpile).

const fmt = (v) => v.toLocaleString("en-US");

// The 21 approved rows of the BIS table, as of May 11, 2026, grouped by buyer.
export const approvals = [
  { buyer: "ByteDance", maker: "Nvidia and AMD", chips: 150000 },
  { buyer: "Tencent", maker: "Nvidia and AMD", chips: 150000 },
  { buyer: "Alibaba Group", maker: "Nvidia", chips: 75000 },
  { buyer: "VNET Group", maker: "Nvidia", chips: 75000 },
  { buyer: "Linkwise Digital Tech", maker: "Nvidia", chips: 75000 },
  { buyer: "Kuaishou", maker: "AMD", chips: 75000 },
  { buyer: "Beijing DiDi", maker: "AMD", chips: 75000 },
  { buyer: "Shanghai Mihoyo", maker: "Nvidia", chips: 57810 },
  { buyer: "Baidu", maker: "Nvidia", chips: 43000 },
  { buyer: "JD", maker: "Nvidia", chips: 41300 },
  { buyer: "Beijing Didi Infinity Technology and Development", maker: "Nvidia", chips: 24780 },
  { buyer: "Ubiquant Investment", maker: "Nvidia", chips: 8660 },
  { buyer: "Li Auto", maker: "Nvidia", chips: 8260 },
  { buyer: "Great Wall Motor", maker: "Nvidia", chips: 4800 },
  { buyer: "Shanghai Yovole Cloud", maker: "Nvidia", chips: 4250 },
  { buyer: "Tesla (Shanghai)", maker: "Nvidia", chips: 4000 },
  { buyer: "BYD", maker: "Nvidia", chips: 4000 },
  { buyer: "Shanghai Jiatang", maker: "Nvidia", chips: 4000 },
  { buyer: "Nvidia itself", maker: "Nvidia", chips: 8 },
];

// Status totals, summed from the 54 rows of the table; they match the committee's 3,444,160 and 879,868.
const status = { approved: 879868, returned: 1888950, rejected: 75000, pending: 600342 };
const requested = status.approved + status.returned + status.rejected + status.pending;
const approvedSum = approvals.reduce((s, a) => s + a.chips, 0);
if (requested !== 3444160 || approvedSum !== status.approved) throw new Error("chip totals do not reconcile with the committee summary");

const four = 75000 + 150000 + 43000 + 4000;

export const n = {
  requested: fmt(requested),
  approved: fmt(status.approved),
  returned: fmt(status.returned),
  rejected: fmt(status.rejected),
  pending: fmt(status.pending),
  approvedLicenses: 21,
  pendingApps: 23,
  offshore: fmt(508000 + 203000 + 50500 + 203000 + 154000),
  alibabaAsked: fmt(948950),
  alibabaApproved: fmt(75000),
  alibaba610: fmt(610000),
  four: fmt(four),
  fourShare: Math.round((four / status.approved) * 1000) / 10,
  hopper: "$2.4 billion",
  hk: fmt(600000),
  tencent445: fmt(445000),
  rwa2021: 11.8,
  approvedShare: Math.round((status.approved / requested) * 100),
};

// The parts of the 3,444,160 requested chips, for the bar; plain-word labels.
export const statusBar = [
  { key: "approved", label: "Approved", value: status.approved, c: "approved" },
  { key: "returned", label: "Sent back without a decision", value: status.returned, c: "returned" },
  { key: "pending", label: "Still pending", value: status.pending, c: "pending" },
  { key: "rejected", label: "Rejected", value: status.rejected, c: "rejected-one" },
].map((s) => ({ ...s, display: fmt(s.value), pct: (s.value / requested) * 100 }));

export const event = {
  slug: "ai-chip-exports/2026-11-19-house-committee-releases-china-chip-license-data",
  title: "Commerce approved 879,868 AI chips for Chinese companies; none had shipped by May",
  dek: "Four of the approved buyers, Alibaba, Tencent, Baidu and BYD, are on the Pentagon's list of Chinese military companies; TikTok's owner, ByteDance, was approved for 150,000 chips.",
  name: "The House committee's release of Commerce's China chip-license table",
  date: "2026-11-19",
  updated: "2026-11-20",
  kpis: [],
};

export const subjectFigure = { label: "AI chips Commerce approved for Chinese companies, none shipped, as of May 11, 2026", value: n.approved, unit: "chips" };

// The dated chain; each label is its claim's short form with any date prefix dropped.
export const chronology = [
  { date: "Dec. 8, 2025", c: "trump-dec-8" },
  { date: "Dec. 2025", c: "meeks-warren-request" },
  { date: "Jan. 15, 2026", c: "january-rule" },
  { date: "Feb. 2026", c: "nvidia-feb-licenses" },
  { date: "May 11", c: "not-shipped" },
  { date: "July 14", c: "kessler-july" },
  { date: "Aug. 2026", c: "nvidia-fraction" },
  { date: "Aug. to Oct.", c: "hopper-2-4b" },
  { date: "Nov. 5", c: "hk-stockpile" },
  { date: "Nov. 17", c: "nvidia-stopped" },
  { date: "Nov. 19", c: "released-nov-19", current: true },
];

// What reports said against what the table says.
export const coverageVsTable = [
  { who: "The Hill", said: "\"The order was fulfilled\"; \"sending 75,000 to Alibaba\"", saidC: "hill-fulfilled", table: `All ${21} approvals marked "Approved, not shipped" as of May 11`, tableC: ["not-shipped"] },
  { who: "Chris McGuire, former U.S. official, quoted by Reuters", said: "\"over 30% of the AI chips sent to China were shipped to\" Pentagon-listed companies", saidC: "mcguire-sent", table: "That share is of approvals; none had shipped as of May 11", tableC: ["not-shipped"] },
  { who: "The Straits Times (summary)", said: "\"879,000 advanced AI chip shipments to China\"", saidC: "st-shipments", table: `${n.approved} chips approved, none shipped as of May 11`, tableC: ["approved", "not-shipped"] },
  { who: "The New York Times, as carried by The Business Times (subheadline)", said: "Commerce \"approved applications to sell more than 3.4 million chips\"", saidC: "bt-3-4m", table: `${n.requested} requested; ${n.approved} approved`, tableC: ["requested", "approved"] },
];

// What comes next; each step cites its claim.
export const steps = [
  { when: "Dec. 1", what: "Deadline Meeks and Rep. Sydney Kamlager-Dove of California set for Commerce to answer whether it let Nvidia interfere with its Megaspeed investigation", c: ["meeks-dec-1"] },
  { when: "Dec. 1 and 2", what: "Jensen Huang, Nvidia's former chief executive, and its general counsel due for transcribed interviews with three House committees", c: ["huang-dec-1"] },
  { when: "No date in the records", what: "Huang and Commerce Secretary Howard Lutnick have agreed to testify before the Senate Banking Committee", c: ["senate-banking"] },
  { when: "No date in the records", what: "Public hearings with Lutnick and BIS's Jeffrey Kessler, which Meeks is demanding", c: ["hearings-planned"] },
];

const c = (id) => ({ c: id });
export const explanations = [
  {
    id: "shipped",
    name: "The approved chips were shipped to China",
    holders: "The Hill; McGuire, quoted by Reuters",
    verdict: "not",
    summary: ["As of May 11, all 21 approvals were marked \"Approved, not shipped.\"", c("not-shipped")],
    claim: [["The Hill wrote that the order \"was fulfilled\"; McGuire spoke of \"AI chips sent to China.\"", c("hill-fulfilled"), c("mcguire-sent")]],
    evidenceFor: [["Kessler said in July that H200 exports had been \"minimal,\" and Kress says the licensed H200s went to China in the quarter that ended October 25, when Nvidia's Hopper data center shipments to China were $2.4 billion.", c("kessler-july"), c("kress-h200-went"), c("hopper-2-4b")]],
    evidenceAgainst: [["The BIS table marks every approval \"Approved, not shipped\" as of May 11, and on July 14 Kessler said H200 exports to China so far had been \"minimal.\"", c("not-shipped"), c("kessler-july")]],
    conclusion: [["None of the approvals had been used by May 11; Kress says licensed H200s went to China later, in a quarter Nvidia reported in dollars, not chips.", c("not-shipped"), c("kress-h200-went"), c("hopper-2-4b"), c("nvidia-stopped")]],
  },
  {
    id: "beijing",
    name: "Beijing kept the licenses from being used",
    holders: "Nvidia",
    verdict: "partly",
    summary: ["China restricted the sales, Nvidia says, but Kress says the licensed H200s went to China in the quarter that ended October 25.", c("nvidia-feb-licenses"), c("kessler-july"), c("kress-h200-went")],
    claim: [["Nvidia says China restricted the sales and it could not sell all it was licensed for.", c("nvidia-feb-licenses")]],
    evidenceFor: [["Reuters reported about 600,000 H200s stored in Hong Kong awaiting Beijing's approval.", c("hk-stockpile")]],
    evidenceAgainst: [["Kress says the licensed H200s went to China in the quarter that ended October 25, when Nvidia shipped $2.4 billion of Hopper data center products there.", c("kress-h200-went"), c("hopper-2-4b")]],
    conclusion: [["Nvidia says China kept it from selling all it was licensed for, and Kress says the licensed H200s it did sell went to China in the quarter that ended October 25.", c("nvidia-feb-licenses"), c("hk-stockpile"), c("kress-h200-went"), c("hopper-2-4b")]],
  },
  {
    id: "conditions",
    name: "U.S. conditions held the shipments down",
    holders: "Nvidia",
    verdict: "partly",
    summary: ["The licenses came with U.S. inspection, a 25 percent tariff and a cap tied to U.S. sales; Nvidia names China's restrictions as why it could not sell all it was licensed for.", c("inspection-tariff"), c("january-rule"), c("nvidia-feb-licenses")],
    claim: [["Nvidia says the approvals were \"subject to strict conditions and limited volumes.\"", c("nvidia-strict")]],
    evidenceFor: [["H200s shipped under the licenses must go through an inspection process in the United States and pay a 25 percent U.S. tariff.", c("inspection-tariff")]],
    evidenceAgainst: [["Nvidia says China restricted the sales and it could not sell all it was licensed for.", c("nvidia-feb-licenses")]],
    conclusion: [["The conditions applied to every licensed shipment; Nvidia's filing names China's restrictions as the reason it could not sell all it was licensed for.", c("inspection-tariff"), c("january-rule"), c("nvidia-feb-licenses")]],
  },
  {
    id: "military",
    name: "Commerce approved chips for companies the Pentagon calls Chinese military companies",
    holders: "Mast; McGuire, quoted by Reuters",
    verdict: "supported",
    summary: ["Alibaba, Tencent, Baidu and BYD, all now on the Pentagon's list, were approved for 272,000 chips.", c("four-approved"), c("summary-june-list")],
    claim: [["The committee's release says BIS approved chips for Pentagon-designated Chinese military companies, naming Alibaba and Tencent.", c("summary-june-list")]],
    evidenceFor: [["Tencent has been listed since January 2025, and the Pentagon told Congress in October 2025 that the other three should be added, according to reports lawmakers cited and a federal court recounted, before the first application.", c("tencent-listed-2025"), c("pentagon-oct-2025")]],
    evidenceAgainst: [["The update listing Alibaba, Baidu and BYD was made public on June 8, 2026, after the May 11 status date, and the list is not an export ban.", c("three-listed-june"), c("list-effect")]],
    conclusion: [["Tencent was already on the Pentagon's list, and the Pentagon had moved to add Alibaba, Baidu and BYD, according to reports lawmakers cited and a federal court recounted; the list governs Pentagon contracts, not exports.", c("four-approved"), c("tencent-listed-2025"), c("pentagon-oct-2025"), c("list-effect")]],
  },
  {
    id: "offshore",
    name: "Commerce turned away the Southeast Asia data-center requests on purpose",
    holders: "No one claims it on the record; tested as an alternative",
    verdict: "untestable",
    summary: ["The table gives no reason for any return, and a return is not a denial.", c("no-reasons"), c("rwa-meaning")],
    claim: [["Requests for 1,118,500 chips for ByteDance and Alibaba units in Malaysia, Indonesia and Thailand were returned without action.", c("offshore-returned")]],
    evidenceFor: [["The January rule's case-by-case path covers exports to China or Macau; for Chinese-headquartered companies elsewhere it kept the presumption of denial.", c("offshore-presumption")]],
    evidenceAgainst: [["BIS also returns applications when the applicant asks, a license exception applies or documents are missing, and Alibaba's 610,000-chip request for China was returned too.", c("rwa-meaning"), c("alibaba-610k")]],
    conclusion: [["The table gives no reason for any return.", c("no-reasons"), c("returned")]],
  },
];
