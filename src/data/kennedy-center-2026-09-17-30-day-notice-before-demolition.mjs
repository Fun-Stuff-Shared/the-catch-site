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
  { date: "May 29", title: "The court denies preliminary relief in the preservation case.", sub: "The ruling relies on sworn representations that the main building would not be demolished and no new structure would be built." },
  { date: "Aug. 13", title: "The board votes 23 to 3 to close the main building for renovation.", sub: "Programming would continue at the REACH and off site." },
  { date: "Aug. 28", title: "The parties file a joint status report.", sub: "The defendants again say the building will not be demolished and no new structure will be constructed." },
  { date: "Sept. 15", title: "The board votes again to close the main building.", sub: "Its chairman says renovation is to wait while an appeal proceeds." },
  { date: "Sept. 16", title: "The main building closes temporarily.", sub: "The executive director says the initial safety closure will last seven days unless extended." },
  { date: "Sept. 17", title: "The judge denies an emergency hearing and orders advance notice.", sub: "Covered project-scope changes require written notice more than 30 days before implementation.", current: true },
  { date: "Sept. 23", title: "Status report due.", sub: "The court requires a sworn declaration addressing the temporary closure and emergency repairs." },
];

export const coverageChecks = [
  {
    outlet: "Associated Press via PBS NewsHour",
    claim: "reported that the order required 30 days' notice before any major physical change, including demolition.",
    verdict: "Too broad. The reproduced order says more than 30 days and ties the requirement to changes in the scope of the project plans previously presented to the court.",
    status: "warn",
    chip: "too broad",
    source: "pbs-ap-kennedy-center-2026-09-17",
    passage: "provide 30 days' notice before making any major physical changes",
  },
  {
    outlet: "UPI",
    claim: "reproduced the operative sentence tying advance notice to project-scope changes, including demolition.",
    verdict: "Checks out against the same language reproduced by the parties' counsel and the surrounding filings.",
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
