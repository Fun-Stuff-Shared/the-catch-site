export const event = {
  slug: "kennedy-center/2026-09-17-30-day-notice-before-demolition",
  title: "The judge required notice before a Kennedy Center demolition",
  dek: "The September 17 order denied an emergency hearing but required written notice more than 30 days before the defendants implement a change to the project plans previously presented to the court, including demolition of the main building. It did not decide whether demolition would be lawful.",
  name: "Advance notice before a project-scope change",
  date: "2026-09-17",
  updated: "2026-09-19",
  kpis: [
    { value: ">30", unit: "days", label: "Notice before a covered change" },
    { value: "Sept. 23", unit: "", label: "Court-ordered status report" },
    { value: "seven days", unit: "", label: "Initial temporary closure" },
  ],
  visual: {
    kind: "timeline",
    title: "The order added notice to an existing case",
    entries: [
      { date: "May 29", title: "No preliminary injunction" },
      { date: "Aug. 28", title: "No-demolition position restated" },
      { date: "Sept. 17", title: "Advance notice ordered", current: true },
    ],
  },
};

export const timeline = [
  { date: "Sept. 2025", title: "The Center says renovation work has begun.", sub: "It announces work on the building's columns; the court later says staff apparently sought no federal planning-agency input for that work." },
  { date: "Feb. 1", title: "Trump announces a two-year closure proposal.", sub: "He says the main building would close for construction starting in July, subject to board approval." },
  { date: "March 16", title: "The board votes on the closure proposal.", sub: "The May opinion later enjoins implementation of this vote." },
  { date: "May 29", title: "The court denies preliminary relief in the preservation case.", sub: "The ruling relies on sworn representations that the main building would not be demolished and no new structure would be built." },
  { date: "Aug. 13", title: "The board votes 23 to 3 to close the main building for renovation.", sub: "Programming would continue at the Center's expansion campus, known as the REACH, and off site." },
  { date: "Aug. 28", title: "The parties file a joint status report.", sub: "The defendants again say the building will not be demolished and no new structure will be constructed." },
  { date: "Sept. 15", title: "The board votes again to close the main building.", sub: "Its chairman says renovation is to wait while an appeal proceeds." },
  { date: "Sept. 16", title: "The main building closes temporarily.", sub: "The executive director says the initial safety closure will last seven days unless extended." },
  { date: "Sept. 17", title: "The judge denies an emergency hearing and orders advance notice.", sub: "Covered project-scope changes require written notice more than 30 days before implementation.", current: true },
  { date: "Sept. 23", title: "Status report due.", sub: "The court requires a sworn declaration addressing the temporary closure and emergency repairs." },
];

const dollarsInMillions = (value) => `$${value / 1_000_000} million`;
const appropriation = 256_657_000;

export const funding = {
  appropriation,
  appropriationLabel: dollarsInMillions(Math.round(appropriation / 1_000_000) * 1_000_000),
  availabilityDeadline: "September 30, 2029",
  partialOperationShortfall: 124_000_000,
  partialOperationShortfallLabel: dollarsInMillions(124_000_000),
  closureEstimate: 285_000_000,
  closureEstimateLabel: dollarsInMillions(285_000_000),
  phasedClosureClaim: 300_000_000,
  phasedClosureClaimLabel: dollarsInMillions(300_000_000),
  fullClosureShortfallClaim: 30_000_000,
  fullClosureShortfallClaimLabel: dollarsInMillions(30_000_000),
};

export const financialFiling = {
  totalRevenueLabel: "more than $516 million",
  badDebtExpenseLabel: dollarsInMillions(48_000_000),
  priorProgramRevenueLabel: "nearly $105 million",
  currentProgramRevenueLabel: "about $89 million",
};

export const affectedPeople = {
  closureEstimateLow: 75,
  closureEstimateHigh: 175,
  employeeEstimateTotal: 300,
  layoffTranches: 2,
  remainingProgrammingStaff: 10,
  preservationPlaintiffOrganizations: 8,
};

export const closureDispute = {
  incidentDateLabel: "September 4",
  closureDateLabel: "September 16",
  daysOpenAfterIncident: 12,
  assessmentMonthsLabel: "June and July",
};

export const boardReview = {
  slidesReceived: 2,
  daysBeforeMeeting: 2,
  requestedAnalyses: 6,
  missingComparisonYearsLabel: "four-year",
  deltaDistributionDateLabel: "August 31",
  managementPacketDateLabel: "September 13",
  reconsiderationDateLabel: "September 15",
};

export const boardVote = {
  votesCast: 26,
  inFavor: 23,
  opposed: 3,
  presentNotVoting: 2,
};

export const recognition = {
  fundingThresholdLabel: dollarsInMillions(100_000_000),
};

export const coverageChecks = [
  {
    outlet: "Associated Press via PBS NewsHour",
    claim: `reported that the order required 30 days' notice before any major physical change. It identified the recognition proposals as an inscription crediting Trump with the renovation and restoration, a second inscription conditional on the Trump Kennedy Center Fund reaching ${recognition.fundingThresholdLabel}, and President Donald J. Trump Plaza, then said all three were shot down.`,
    verdict: "The notice description is too broad: the order says more than 30 days and follows the project scope presented to the court. The recognition account is wrong: two proposals were enjoined, while the endowment inscription request was denied as unripe.",
    status: "warn",
    chip: "mislabeled",
    source: "pbs-ap-kennedy-center-2026-09-17",
    passage: "provide 30 days' notice before making any major physical changes",
    secondPassage: "All of those proposals were shot down Tuesday by Cooper",
    proposalSource: "board-resolution-66-2-2026-08-13",
    proposalPassage: "in any or all of the following ways",
    recordSource: "beatty-opinion-77-2026-09-15",
    recordPassage: "However, the Court denies as unripe",
  },
  {
    outlet: "UPI",
    claim: "reproduced the operative sentence tying advance notice to project-scope changes, including demolition.",
    verdict: "Checks out against the full sentence UPI reproduces. Beatty's counsel quotes only part of it and describes the period as 30 days.",
    status: "ok",
    chip: "checks out",
    source: "upi-kennedy-center-2026-09-17",
    passage: "more than 30 days before the implementation of any changes to the scope of the project plans presented to the Court",
  },
  {
    outlet: "USA Today",
    claim: "reported that the order blocked immediate demolition rather than deciding whether demolition could ever occur.",
    verdict: "Checks out. The mechanism is advance notice; the order did not decide the legality of a future demolition plan.",
    status: "ok",
    chip: "checks out",
    source: "usa-today-kennedy-center-order-2026-09-17",
    passage: "blocked President Donald Trump from taking immediate action to demolish the Kennedy Center",
  },
];

export const coverageRecordCount = 6;
export const coverageVerdictCount = coverageChecks.length;
export const laterCoverageRecordCount = 2;
