// Every number here is printed on an admitted record; the claim each comes from is named beside it.
// Times are Eastern. The command center's advisories give UTC: 2010Z is 3:10 p.m., 2053Z 3:53 p.m., 0116Z 8:16 p.m.
export const n = {
  airborne: "4,042", // airborne-4042
  diverted: 600, // diversions-600
  cancelled: "9,000", // friday-cancel-9000
  cancelledSat: "3,700", // sat-cancel-3700
  duffyAsk: 50, // duffy-wants-50b, billions
  requested: "30.1", // funding-30b, billions
  hours: 4, // stop-lifted: 3:53 p.m. to 8:16 p.m.
  minutes: 23,
};

export const event = {
  slug: "air-traffic-control/2026-11-13-faa-nationwide-ground-stop",
  title: "Duffy blamed old switches for grounding U.S. flights. Now he traces it to a contractor's job at one site.",
  dek: "The FAA held every departing flight in the country for more than four hours on Friday. On Saturday Transportation Secretary Sean Duffy said the FAA believes a router at a remote site, which he thinks was the only site involved, flooded the network while the contractor L3Harris was moving an old copper line there to fiber; he said the FAA has not determined whether the router or the work was at fault.",
  name: "The FAA's nationwide ground stop",
  date: "2026-11-13",
  updated: "2026-11-14",
  kpis: [],
};

export const subjectFigure = { label: "Length of the November 13 nationwide ground stop", value: "4 hr 23 min", unit: "" };

export const chronology = [
  { date: "3:10 p.m.", c: "sequence-chicago" },
  { date: "3:36 p.m.", c: "duffy-onset-336" },
  { date: "3:53 p.m.", c: "national-stop-order" },
  { date: "4:21 p.m.", c: "nationwide-comms-failure" },
  { date: "8:16 p.m.", c: "stop-lifted", current: true },
];

const c = (id) => ({ c: id });

export const explanations = [
  {
    id: "change",
    name: "A copper-to-fiber switch at a remote site set it off",
    holders: "Duffy, on Saturday",
    verdict: "partly",
    summary: ["Duffy says the FAA believes a router at a remote site, which he thinks was the only site involved, flooded the network while L3Harris was moving a line there from copper to fiber. He says whether the router or the work was at fault is not determined.", c("sat-duffy-believe-site"), c("sat-router-flood"), c("sat-fault-undetermined")],
    claim: [["Duffy says the FAA believes that at a remote FAA site, which he thinks was the only site involved, L3Harris was switching an old copper line to fiber, and the router being replaced flooded other routers with more than 1,000 connection attempts every four to five seconds.", c("sat-duffy-believe-site"), c("sat-router-flood")]],
    evidenceFor: [["Once the work at the site was isolated, all of the FAA's systems came back online, Duffy says. Homeland Security Secretary Markwayne Mullin had said what it appeared to be was new equipment going in overwhelming the older system.", c("sat-isolate-restored"), c("mullin-patches-appears")]],
    evidenceAgainst: [["In its updated story on Saturday, CBS News reported that sources were getting conflicting information about the cause. Duffy says the FAA has not determined whether the router or the work was at fault.", c("cbs-conflicting"), c("sat-fault-undetermined")]],
    conclusion: [["Duffy says the FAA believes it happened at a remote site, which he thinks was the only site involved. Which failed there, the router or the work, he says is not yet determined.", c("sat-duffy-believe-site"), c("sat-fault-undetermined")]],
  },
  {
    id: "old-network",
    name: "The FAA's old network gave out",
    holders: "Duffy, on Friday",
    verdict: "partly",
    summary: ["The old network spread the failure, by Bedford's account, but the officials now say one site started it.", c("sat-bedford-one-network"), c("sat-router-flood")],
    claim: [["On Friday Duffy said the FAA's old analog switches and routers were overloaded with data and began giving inconsistent data, so the FAA shut the system down.", c("duffy-switches-overloaded")]],
    evidenceFor: [["Bedford says the FAA has one telecommunications network, and the flood overwhelmed one center's routers and then spread to other centers' backups. The digital equipment held, Duffy said on Friday.", c("sat-bedford-one-network"), c("duffy-new-held")]],
    evidenceAgainst: [["On Saturday Duffy traced the overload to a router at one site, and Bedford said no facility went down.", c("sat-router-flood"), c("sat-bedford-nothing-down")]],
    conclusion: [["Bedford says the FAA has one network and the flood spread from one center to other centers' backups. What started it, on Duffy's account, was a router at one site.", c("sat-bedford-one-network"), c("sat-router-flood"), c("sat-duffy-believe-site")]],
  },
  {
    id: "attack",
    name: "A cyberattack",
    holders: "Questions to officials; social media",
    verdict: "not",
    summary: ["Officials say they found no sign of one and traced the failure to work at one site.", c("sat-bedford-zero"), c("sat-isolate-restored")],
    claim: [["On Friday Duffy said he did not want to rule out an attack.", c("duffy-not-rule-out-nefarious")]],
    evidenceFor: [["In 2001 the Transportation Department's inspector general warned that the planned network would put air traffic control on the same network as administrative systems connected to the internet.", c("oig-2001-warning")]],
    evidenceAgainst: [["Bedford says there is zero evidence of anything nefarious, and Duffy says officials do not believe it was a cyberattack. Duffy says the systems came back once the work at the site was isolated.", c("sat-bedford-zero"), c("sat-not-cyber"), c("sat-isolate-restored")]],
    conclusion: [["Officials say they do not believe it was one and see no evidence of one.", c("sat-not-cyber"), c("sat-bedford-zero")]],
  },
  {
    id: "cut",
    name: "A cut line",
    holders: "Comparisons with the September outage",
    verdict: "not",
    summary: ["The officials describe a router flooding the network, not a cut.", c("sat-router-flood")],
    claim: [["In September a contractor cut a backup line serving a Philadelphia facility, after L3Harris had the FAA switch to it.", c("sept-2026-backup-cut")]],
    evidenceFor: [["A contractor did cut a backup line in September.", c("sept-2026-backup-cut")]],
    evidenceAgainst: [["Duffy says a router flooded other routers with connection attempts, and Bedford says no facility went down.", c("sat-router-flood"), c("sat-bedford-nothing-down")]],
    conclusion: [["Duffy's account describes a flooding router, not a cut.", c("sat-router-flood")]],
  },
  {
    id: "carrier",
    name: "A phone company's network",
    holders: "Early speculation",
    verdict: "not",
    summary: ["The officials trace it to L3Harris's work on the FAA's own network.", c("sat-l3harris-owns"), c("sat-duffy-believe-site")],
    claim: [["The FAA first called it a telecommunications outage.", c("faa-telecom-outage")]],
    evidenceFor: [["The FAA's network uses several local carriers, and in 2025 the FAA blamed a Dallas outage on one of them.", c("fti-multi-carrier"), c("dallas-2025")]],
    evidenceAgainst: [["Verizon says its network was fully functioning. Duffy says the job that set it off was L3Harris's, on the network L3Harris owns.", c("verizon-fine"), c("sat-l3harris-owns")]],
    conclusion: [["The officials point to the FAA's contractor, not a phone company.", c("sat-l3harris-owns")]],
  },
  {
    id: "smart",
    name: "SMART, the new AI planning tool",
    holders: "Timing: expanded to every center three days earlier",
    verdict: "not",
    summary: ["Denied by Duffy, by Bedford and by its maker.", c("duffy-smart-disconnected"), c("sat-bedford-zero"), c("asi-denial")],
    claim: [["The FAA said on November 10 that SMART would cover the airspace of all 22 en-route centers, and Mullin said earlier on Friday that DHS was looking at it.", c("smart-22-centers"), c("dhs-examining-smart")]],
    evidenceFor: [["The timing: the outage came three days after the expansion.", c("smart-22-centers")]],
    evidenceAgainst: [["The FAA says SMART cannot control an aircraft and that FAA staff review all its recommendations. Duffy says it is not plugged into the FAA's STARS and ERAM systems and is \"completely disconnected\"; Bedford says there is zero evidence of anything AI-related; Air Space Intelligence, which makes it, says it had no part.", c("smart-recommends-only"), c("duffy-smart-disconnected"), c("sat-bedford-zero"), c("asi-denial")]],
    conclusion: [["Officials and the company all deny it.", c("duffy-smart-disconnected"), c("sat-bedford-zero"), c("asi-denial")]],
  },
  {
    id: "microsoft",
    name: "The Microsoft outage",
    holders: "Speculation linking two outages a day apart",
    verdict: "not",
    summary: ["Microsoft and the officials say they are separate.", c("microsoft-separate")],
    claim: [["Microsoft's outage started Thursday morning in the service that runs Outlook email for businesses, a day before the ground stop.", c("microsoft-outage-thursday")]],
    evidenceFor: [["The timing.", c("microsoft-outage-thursday")]],
    evidenceAgainst: [["Microsoft says it has no indication the two are related, and Mullin says there is no connection.", c("microsoft-separate"), c("mullin-no-microsoft")]],
    conclusion: [["Microsoft and Mullin both say they are separate.", c("microsoft-separate"), c("mullin-no-microsoft")]],
  },
  {
    id: "staffing",
    name: "Staffing and cuts",
    holders: "Rep. Delia Ramirez's question",
    verdict: "untestable",
    summary: ["Nothing in the record ties it to staffing; the officials describe an equipment failure.", c("sat-router-flood")],
    claim: [["Ramirez asked whether the administration's cuts and changes to the FAA were responsible.", c("ramirez-cuts-question")]],
    evidenceFor: [["None in the record."]],
    evidenceAgainst: [["The command center's 5:46 p.m. advisory gives communications failure as the reason, and its plan lists staffing limits at four facilities only.", c("stop-kept-0400"), c("staffing-triggers-few")]],
    conclusion: [["No record supports it as the trigger. Whether staffing slowed the recovery is not in the record.", c("staffing-triggers-few")]],
  },
];
