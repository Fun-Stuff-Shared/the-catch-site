// Every number here is printed on an admitted record; the claim each comes from is named.
// Rule: fr-pi-2026-23529 (claims data-center-license, existing-90-days, about-100-licenses); fr-2026-23529 (effective-on-publication, comments-60-days).
// Chip equivalent: mcguire-x-2026-11-16 (threshold-in-chips), his conversion, not BIS's.
export const n = {
  threshold: "12 million",
  h100: "800",
  blackwell: "200",
  graceDays: 90,
  licenses: 100,
  countries: 5,
};

export const event = {
  slug: "ai-chip-exports/2026-11-16-commerce-requires-licenses-for-chips-at-china-serving-data-centers",
  title: "Commerce will require licenses to ship AI chips to data centers serving Chinese firms at scale",
  dek: "The rule took effect on November 19, when it was published, and applies to chips exported to such data centers abroad, above a set amount of computing power.",
  name: "Commerce's rule on AI chips at data centers serving Chinese firms",
  date: "2026-11-16",
  updated: "2026-11-19",
  kpis: [],
};

export const subjectFigure = { label: "Countries newly needing a license for advanced AI chips", value: n.countries, unit: "countries" };

// The dated chain; each label is its claim's short form, date prefix dropped because the date column carries it.
export const chronology = [
  { date: "Oct. 2022", c: "direct-ban-2022" },
  { date: "May 2025", c: "replacement-promised" },
  { date: "May 2026", c: "may-31-tolerance" },
  { date: "Oct. 2026", c: "october-signoff" },
  { date: "Nov. 12", c: "megaspeed-scandal" },
  { date: "Nov. 13", c: "bessent-has-the-pen" },
  { date: "Nov. 13", c: "blunt-rochester-curtis" },
  { date: "Nov. 16", c: "rule-issued", current: true },
  { date: "Nov. 19", c: "effective-on-publication" },
];

// What the headlines said against what the rule says; each cell cites its claim.
export const headlinesVsRule = [
  { said: "\"U.S. closes loophole\"", saidC: "nbc-headline", rule: "Licenses for chips sent to data centers abroad above 12 million TPP; McGuire says U.S. data centers are left out", ruleC: ["data-center-license", "abroad-only", "us-data-centers-gap"] },
  { said: "Remote access \"will be banned\"", saidC: "nbc-banned", rule: "A license requirement: data-center licenses are reviewed case by case", ruleC: ["case-by-case"] },
  { said: "\"Took effect immediately\"", saidC: "ap-immediately", rule: "Took effect on Federal Register publication, November 19", ruleC: ["effective-on-publication"] },
  { said: "\"Goes into effect in 90 days\"", saidC: "nyt-90-days", rule: "The 90 days is the deadline for data centers already serving Chinese firms at that scale", ruleC: ["existing-90-days"] },
  { said: "\"New proposed rule\"", saidC: "wsj-proposed", rule: "An interim final rule: in effect on publication, with comments taken after", ruleC: ["not-a-proposal", "effective-on-publication", "comments-60-days"] },
];

// What comes next, in order; each step cites its claim.
export const steps = [
  { when: "Nov. 19 (done)", what: "Published in the Federal Register; the rule took effect", c: ["effective-on-publication"] },
  { when: "Jan. 19, 2027", what: "Public comments close", c: ["comments-60-days"] },
  { when: "90 days after", what: "Data centers already serving Chinese firms at that scale must hold a license", c: ["existing-90-days"] },
  { when: "December", what: "Lutnick and Jensen Huang summoned before the Senate Banking Committee", c: ["lutnick-december"] },
  { when: "Pending", what: "The Remote Access Security Act, passed by the House, awaits the Senate", c: ["rasa"] },
];

const c = (id) => ({ c: id });
export const explanations = [
  {
    id: "ban",
    name: "The rule bans Chinese firms from renting U.S. chips",
    holders: "NBC",
    verdict: "not",
    summary: ["NBC said remote access would be banned; the rule requires licenses, and only for data centers abroad above a threshold.", c("nbc-banned"), c("case-by-case"), c("data-center-license")],
    claim: [["NBC reported that remote access \"will be banned when Monday’s rule change goes into effect.\"", c("nbc-banned")]],
    evidenceFor: [["Chips meant for a China-headquartered company itself face a presumption of denial.", c("presumption-of-denial")]],
    evidenceAgainst: [["The new data-center control is reviewed case by case, applies only above 12 million TPP, and covers data centers outside the United States.", c("case-by-case"), c("below-threshold"), c("data-center-license")]],
    conclusion: [["A license requirement, not a ban, on chips exported to data centers abroad.", c("case-by-case"), c("abroad-only")]],
  },
  {
    id: "scandal",
    name: "The Megaspeed scandal produced the rule",
    holders: "CNBC",
    verdict: "not",
    summary: ["A replacement was promised in May 2025 and approved in October, the Times' sources say, both before Jensen Huang stepped down.", c("replacement-promised"), c("october-signoff"), c("megaspeed-scandal")],
    claim: [["CNBC called the rule \"the first U.S. policy response to the scandal\" that led Jensen Huang to resign.", c("cnbc-first-response")]],
    evidenceFor: [["The rule came four days after Jensen Huang stepped down and three after Bessent blamed Commerce.", c("megaspeed-scandal"), c("bessent-has-the-pen"), c("rule-issued")]],
    evidenceAgainst: [["BIS promised a replacement for Biden's rule in May 2025, and people who described the talks to the Times say the president signed off on remote-access rules in October.", c("replacement-promised"), c("october-signoff")]],
    conclusion: [["BIS promised a replacement in May 2025, and the president approved one in October, the Times' sources say, both before Jensen Huang stepped down.", c("replacement-promised"), c("october-signoff"), c("megaspeed-scandal")]],
  },
  {
    id: "planned",
    name: "A long-planned rule",
    holders: "Commerce",
    verdict: "partly",
    summary: ["Planned since May 2025, but BIS credits Treasury and the NSC with writing it.", c("replacement-promised"), c("written-by-treasury-nsc")],
    claim: [["A Commerce spokeswoman said the department was actively considering new rules on remote access, along with other agencies.", c("commerce-considering")]],
    evidenceFor: [["BIS said in May 2025 it would issue a replacement rule.", c("replacement-promised")]],
    evidenceAgainst: [["BIS's own release says Treasury and the National Security Council wrote it.", c("written-by-treasury-nsc")]],
    conclusion: [["BIS promised a replacement in May 2025, and its own release credits Treasury and the NSC with writing this one.", c("replacement-promised"), c("written-by-treasury-nsc")]],
  },
  {
    id: "pushed",
    name: "Treasury and the White House pushed it past Commerce",
    holders: "BIS's release, Politico's sources, McGuire",
    verdict: "supported",
    summary: ["BIS credits Treasury and the NSC; Politico's sources say Bessent pushed it through.", c("written-by-treasury-nsc"), c("bessent-pushed")],
    claim: [["Politico's three sources say Bessent pushed the rule through, with Rubio's support.", c("bessent-pushed")]],
    evidenceFor: [["The release says it was written by and at the direction of Treasury and the NSC, and Lutnick had pushed for a leaner version, the Times reported.", c("written-by-treasury-nsc"), c("lutnick-leaner")]],
    evidenceAgainst: [["Commerce says it was considering remote-access rules with other agencies.", c("commerce-considering")]],
    conclusion: [["BIS's release credits Treasury and the NSC, three people told Politico that Bessent pushed it through, and the Times reported that Lutnick wanted it leaner.", c("written-by-treasury-nsc"), c("bessent-pushed"), c("lutnick-leaner")]],
  },
  {
    id: "congress",
    name: "Congress forced it",
    holders: "No camp; a plain alternative",
    verdict: "untestable",
    summary: ["The pressure is dated, but no record ties the rule to it.", c("blunt-rochester-curtis"), c("cantwell-letter")],
    claim: [["Senators wrote to Lutnick on November 13 and 15, and the House passed a remote-access bill in January.", c("blunt-rochester-curtis"), c("cantwell-letter"), c("rasa")]],
    evidenceFor: [["The letters came days before the rule.", c("blunt-rochester-curtis"), c("cantwell-letter")]],
    evidenceAgainst: [["The senators asked for limits not bound by geography, and the House bill would reach remote access to U.S. items; the rule covers data centers abroad.", c("blunt-rochester-curtis"), c("rasa"), c("abroad-only")]],
    conclusion: [["The letters came days before the rule, and the rule asks less than the senators did.", c("blunt-rochester-curtis"), c("cantwell-letter"), c("abroad-only")]],
  },
  {
    id: "xi-trip",
    name: "Timed as leverage for Trump's meeting with Xi",
    holders: "No camp; a plain alternative",
    verdict: "untestable",
    summary: ["The rule came the day Trump left for Asia; nothing on record shows the timing was chosen for it.", c("trump-trip")],
    claim: [["The rule came the day Trump left for Asia, where he is to meet Xi Jinping.", c("trump-trip")]],
    evidenceFor: [["China's commerce ministry tied it to the leaders' consensus and threatened countermeasures.", c("china-countermeasures")]],
    evidenceAgainst: [["Trump said Lutnick might have delayed action to avoid a blowup with China.", c("trump-two-views")]],
    conclusion: [["No public record shows why the rule was issued that day.", c("trump-trip")]],
  },
];
