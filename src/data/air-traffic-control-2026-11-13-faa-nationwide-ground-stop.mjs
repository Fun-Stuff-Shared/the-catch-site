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
  title: "Old switches failed and grounded U.S. flights nationwide. Why on Friday is still unknown.",
  dek: "Transportation Secretary Sean Duffy blamed old equipment on the FAA's network and asked Congress for $50 billion. The one trigger named on the record is new equipment going in.",
  name: "The FAA's nationwide ground stop",
  date: "2026-11-13",
  updated: "2026-11-13",
  kpis: [],
};

export const subjectFigure = { label: "Length of the November 13 nationwide ground stop", value: "4 hr 23 min", unit: "" };

export const chronology = [
  { date: "3:10 p.m.", c: "sequence-chicago", title: "O'Hare ground-stopped for communications issues; Midway follows at 3:17" },
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
    summary: ["No evidence of one has surfaced; investigators are still looking.", c("mullin-zero-evidence")],
    claim: [["Reporters asked whether overloaded routers could be the work of a cyberattack. Mullin said earlier that nothing was ruled out.", c("mullin-rules-nothing-out")]],
    evidenceFor: [["An overload and bad data could in principle be caused from outside. In 2001 the Transportation Department's inspector general warned that the planned network would put air traffic control on the same network as administrative systems connected to the internet.", c("oig-2001-warning")]],
    evidenceAgainst: [["Mullin says investigators have seen zero evidence of one and that it appears to have been mechanical. A person familiar told Bloomberg the FBI does not believe it was a cyberattack or a crime.", c("mullin-zero-evidence"), c("fbi-software-inquiry")]],
    conclusion: [["Nothing in the record shows an attack, and the officials say they are still looking. Their finding would settle it.", c("mullin-zero-evidence")]],
  },
  {
    id: "cut",
    name: "A cut line",
    holders: "Comparisons with the September outage",
    verdict: "untestable",
    summary: ["No record supports it; the only account of the failure is the officials', and their investigation is not finished.", c("duffy-switches-overloaded")],
    claim: [["In September a contractor cut a backup fiber line serving Philadelphia, after L3Harris had the FAA switch to it.", c("sept-2026-backup-cut")]],
    evidenceFor: [["A cut takes out the lines along its path, and the September outage started that way.", c("sept-2026-backup-cut")]],
    evidenceAgainst: [["Duffy describes an overload, not a cut: switches and routers flooded with data, brought back by fixes that reduced the load.", c("duffy-switches-overloaded"), c("duffy-fix-load")]],
    conclusion: [["No record points to a cut. The officials' account points elsewhere, and the FAA has not finished its investigation.", c("duffy-still-working")]],
  },
  {
    id: "carrier",
    name: "A phone company's network",
    holders: "Guesses from the word 'telecommunications'",
    verdict: "untestable",
    summary: ["Verizon says its network was working. The FAA's network also leases lines from other carriers, and none of them has been tested.", c("verizon-fine"), c("fti-multi-carrier")],
    claim: [["The FAA first called it a telecommunications outage.", c("faa-telecom-outage")]],
    evidenceFor: [["The FAA's network runs over several local carriers, and in 2025 the FAA blamed a Dallas outage on one of them.", c("fti-multi-carrier"), c("dallas-2025")]],
    evidenceAgainst: [["Verizon says its network was fully functioning. The switches and routers Duffy says failed are the FAA's own.", c("verizon-fine"), c("duffy-switches-overloaded")]],
    conclusion: [["Verizon's denial covers Verizon. No other carrier has said anything, and no record ties one to Friday.", c("verizon-fine")]],
  },
  {
    id: "old-network",
    name: "The FAA's old network gave out",
    holders: "Duffy",
    verdict: "supported",
    summary: ["This is the officials' own account of what broke; the newer digital equipment held.", c("duffy-switches-overloaded"), c("duffy-new-held")],
    claim: [["Duffy says the FAA's old analog switches and routers were overloaded with data and began giving inconsistent data, so the FAA shut the system down.", c("duffy-switches-overloaded")]],
    evidenceFor: [["The command center called it a nationwide communications failure. Duffy says the upgraded digital switches, and the centers already upgraded, did not have the problem, and that reducing the load on the old switches brought the networks back.", c("nationwide-comms-failure"), c("duffy-new-held"), c("duffy-fix-load")]],
    evidenceAgainst: [["It does not say why the overload came on Friday; Duffy says the FAA is still working that out.", c("duffy-still-working")]],
    conclusion: [["On the record, this is what broke. It is the officials' account, and the FAA's investigation is not finished.", c("duffy-switches-overloaded"), c("duffy-still-working")]],
  },
  {
    id: "change",
    name: "A change made on Friday set it off",
    holders: "Mullin; sources to CBS and MS NOW",
    verdict: "partly",
    summary: ["The only trigger named on the record; Mullin says it 'appears' so, and Duffy has not confirmed it.", c("mullin-patches-appears"), c("duffy-did-not-confirm-patching")],
    claim: [["Mullin says that what it appears to be is that new equipment and patches the FAA was putting in were overwhelming the older system.", c("mullin-patches-appears")]],
    evidenceFor: [["Multiple sources told CBS an update to the network made it reboot and crash. A federal official told MS NOW a software update caused the stop, and a person familiar told Bloomberg the FBI is looking at a software update. The network was halfway through a rebuild done while it ran, L3Harris said in May.", c("cbs-update-crash"), c("msnow-software-update"), c("fbi-software-inquiry"), c("fti-half-rebuilt")]],
    evidenceAgainst: [["Asked whether the FAA's patching caused it, Duffy described the old system being overloaded and did not say what overloaded it. No one has named the change, who made it, or what it touched.", c("duffy-did-not-confirm-patching")]],
    conclusion: [["Fits everything on the record, but rests on one official's 'appears' and on unnamed sources. The FAA's finding would settle it.", c("mullin-patches-appears"), c("duffy-still-working")]],
  },
  {
    id: "smart",
    name: "SMART, the new AI planning tool",
    holders: "Timing: expanded to every center three days earlier",
    verdict: "not",
    summary: ["Denied by Duffy and by its maker; no record links it.", c("duffy-smart-disconnected"), c("asi-denial")],
    claim: [["The FAA said on November 10 that SMART would cover the airspace of all 22 en-route centers, and Mullin said earlier on Friday that DHS was looking at it.", c("smart-22-centers"), c("dhs-examining-smart")]],
    evidenceFor: [["The timing: the outage came three days after the expansion.", c("smart-22-centers")]],
    evidenceAgainst: [["SMART sends recommendations that FAA staff review; it cannot control an aircraft. Duffy says it is not connected to the radar and automation systems, and Air Space Intelligence, which makes it, says it had no part.", c("smart-recommends-only"), c("duffy-smart-disconnected"), c("asi-denial")]],
    conclusion: [["Ruled out by the Transportation Department and the company, and the outage hit radio and radar, which SMART does not carry.", c("duffy-smart-disconnected"), c("asi-denial")]],
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
    conclusion: [["No record links them.", c("microsoft-separate")]],
  },
  {
    id: "staffing",
    name: "Staffing and cuts",
    holders: "Rep. Delia Ramirez's question",
    verdict: "untestable",
    summary: ["No record supports it; the officials describe an equipment failure, and their investigation is not finished.", c("duffy-switches-overloaded")],
    claim: [["Ramirez asked whether the administration's cuts and changes to the FAA were responsible.", c("ramirez-cuts-question")]],
    evidenceFor: [["None in the record."]],
    evidenceAgainst: [["Every advisory gives communications failure as the reason, and the command center's plan lists staffing limits at four facilities only.", c("stop-kept-0400"), c("staffing-triggers-few")]],
    conclusion: [["No record supports it as the trigger. Whether staffing slowed the recovery is not in the record.", c("staffing-triggers-few")]],
  },
];
