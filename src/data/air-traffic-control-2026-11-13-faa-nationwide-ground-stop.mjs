// Every number here is printed on an admitted record; the claim each comes from is named beside it.
// Times are Eastern. The command center's advisories give UTC: 2010Z is 3:10 p.m., 2053Z 3:53 p.m., 0116Z 8:16 p.m.
export const n = {
  airborne: "4,042", // airborne-4042
  diverted: 600, // diversions-600
  cancelled: "4,000", // flightaware-715
  duffyAsk: 50, // duffy-wants-50b, billions
  requested: "30.1", // funding-30b, billions
  hours: 4, // stop-lifted: 3:53 p.m. to 8:16 p.m.
  minutes: 23,
};

export const event = {
  slug: "air-traffic-control/2026-11-13-faa-nationwide-ground-stop",
  title: "Officials blame old switches for grounding U.S. flights. Why on Friday is still unknown.",
  dek: "The FAA held every departing flight in the country for more than four hours on Friday. Transportation Secretary Sean Duffy blames old switches on its network; Homeland Security Secretary Markwayne Mullin says new equipment going in appears to have set them off.",
  name: "The FAA's nationwide ground stop",
  date: "2026-11-13",
  updated: "2026-11-13",
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
    id: "attack",
    name: "A cyberattack",
    holders: "Questions to officials; social media",
    verdict: "untestable",
    summary: ["No evidence so far; officials are not ruling it out.", c("mullin-zero-evidence"), c("duffy-not-rule-out-nefarious")],
    claim: [["Mullin declined to rule out a cyberattack.", c("mullin-rules-nothing-out")]],
    evidenceFor: [["In 2001 the Transportation Department's inspector general warned that the planned network would put air traffic control on the same network as administrative systems connected to the internet.", c("oig-2001-warning")]],
    evidenceAgainst: [["Mullin says investigators have seen zero evidence of one and that it appears to have been mechanical. A person familiar told Bloomberg the FBI does not believe it was a cyberattack or a crime.", c("mullin-zero-evidence"), c("fbi-software-inquiry")]],
    conclusion: [["Investigators are still looking, Mullin says.", c("mullin-zero-evidence")]],
  },
  {
    id: "cut",
    name: "A cut line",
    holders: "Comparisons with the September outage",
    verdict: "untestable",
    summary: ["Only the officials' account bears on it, and it describes an overload.", c("duffy-switches-overloaded")],
    claim: [["In September a contractor cut a backup line serving a Philadelphia facility, after L3Harris had the FAA switch to it.", c("sept-2026-backup-cut")]],
    evidenceFor: [["A contractor did cut a backup line in September.", c("sept-2026-backup-cut")]],
    evidenceAgainst: [["Duffy describes an overload, not a cut: switches and routers flooded with data, brought back by fixes that reduced the load.", c("duffy-switches-overloaded"), c("duffy-fix-load")]],
    conclusion: [["Officials describe an overload, not a cut.", c("duffy-switches-overloaded")]],
  },
  {
    id: "carrier",
    name: "A phone company's network",
    holders: "Early speculation",
    verdict: "untestable",
    summary: ["Verizon says its network was working. The FAA's network also uses other carriers, and none of them has commented.", c("verizon-fine"), c("fti-multi-carrier")],
    claim: [["The FAA first called it a telecommunications outage.", c("faa-telecom-outage")]],
    evidenceFor: [["The FAA's network uses several local carriers, and in 2025 the FAA blamed a Dallas outage on one of them.", c("fti-multi-carrier"), c("dallas-2025")]],
    evidenceAgainst: [["Verizon says its network was fully functioning. The switches and routers Duffy says failed are the FAA's own.", c("verizon-fine"), c("duffy-switches-overloaded")]],
    conclusion: [["Verizon's denial covers only Verizon.", c("verizon-fine")]],
  },
  {
    id: "old-network",
    name: "The FAA's old network gave out",
    holders: "Duffy",
    verdict: "partly",
    summary: ["The command center's advisories record a nationwide communications failure; that the old analog switches caused it is Duffy's account.", c("nationwide-comms-failure"), c("duffy-switches-overloaded")],
    claim: [["Duffy says the FAA's old analog switches and routers were overloaded with data and began giving inconsistent data, so the FAA shut the system down.", c("duffy-switches-overloaded")]],
    evidenceFor: [["The command center called it a nationwide communications failure. Duffy says the upgraded digital switches, and the centers already upgraded, did not have the problem, and that reducing the load on the old switches brought the networks back.", c("nationwide-comms-failure"), c("duffy-new-held"), c("duffy-fix-load")]],
    evidenceAgainst: [["It does not say why the overload came on Friday; Duffy says the FAA is still working that out.", c("duffy-still-working")]],
    conclusion: [["The FAA's advisories confirm a communications failure. That it was the old switches is Duffy's account, and he says the FAA is still working out what went wrong.", c("nationwide-comms-failure"), c("duffy-switches-overloaded"), c("duffy-still-working")]],
  },
  {
    id: "change",
    name: "A change to the network set it off",
    holders: "Mullin; sources to CBS and MS NOW",
    verdict: "partly",
    summary: ["The only trigger named on the record; Mullin says it 'appears' so, and Duffy has not confirmed it.", c("mullin-patches-appears"), c("duffy-did-not-confirm-patching")],
    claim: [["Mullin says that what it appears to be is that new equipment and patches the FAA was putting in were overwhelming the older system.", c("mullin-patches-appears")]],
    evidenceFor: [["Multiple sources told CBS an update to the network made it reboot and crash. A federal official told MS NOW a software update caused the stop, and a person familiar told Bloomberg the FBI is looking at a software update. The network was halfway through a rebuild done while it ran, L3Harris said in May.", c("cbs-update-crash"), c("msnow-software-update"), c("fbi-software-inquiry"), c("fti-half-rebuilt")]],
    evidenceAgainst: [["Asked whether the FAA's patching caused it, Duffy described the old system being overloaded and did not say what overloaded it. No one has named the change, who made it, or what it touched.", c("duffy-did-not-confirm-patching")]],
    conclusion: [["It rests on Mullin's 'appears' and on unnamed sources; Duffy has not confirmed it.", c("mullin-patches-appears"), c("cbs-update-crash"), c("msnow-software-update"), c("duffy-did-not-confirm-patching")]],
  },
  {
    id: "smart",
    name: "SMART, the new AI planning tool",
    holders: "Timing: expanded to every center three days earlier",
    verdict: "not",
    summary: ["Denied by Duffy and by its maker.", c("duffy-smart-disconnected"), c("asi-denial")],
    claim: [["The FAA said on November 10 that SMART would cover the airspace of all 22 en-route centers, and Mullin said earlier on Friday that DHS was looking at it.", c("smart-22-centers"), c("dhs-examining-smart")]],
    evidenceFor: [["The timing: the outage came three days after the expansion.", c("smart-22-centers")]],
    evidenceAgainst: [["The FAA says SMART cannot control an aircraft and that FAA staff review all its recommendations. Duffy says it is not plugged into the FAA's STARS and ERAM systems and is \"completely disconnected\"; Air Space Intelligence, which makes it, says it had no part.", c("smart-recommends-only"), c("duffy-smart-disconnected"), c("asi-denial")]],
    conclusion: [["Duffy and the company both deny it.", c("duffy-smart-disconnected"), c("asi-denial")]],
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
    summary: ["Only the officials' account bears on it, and it describes an equipment failure.", c("duffy-switches-overloaded")],
    claim: [["Ramirez asked whether the administration's cuts and changes to the FAA were responsible.", c("ramirez-cuts-question")]],
    evidenceFor: [["None in the record."]],
    evidenceAgainst: [["The command center's 5:46 p.m. advisory gives communications failure as the reason, and its plan lists staffing limits at four facilities only.", c("stop-kept-0400"), c("staffing-triggers-few")]],
    conclusion: [["No record supports it as the trigger. Whether staffing slowed the recovery is not in the record.", c("staffing-triggers-few")]],
  },
];
