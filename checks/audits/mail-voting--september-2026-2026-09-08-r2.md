# Dispositions (keystone, 2026-09-09 01:35Z)

Each finding was re-read at held bytes before its disposition. Rework by keystone, not grok: commit da7858b5 on local main. Eight records admitted through capture (run capture-oneoff-20260908T222008Z; ProPublica already held from quarry-wire-scheduled-20260902T183409Z).

| # | Finding | Verified at | Disposition |
|---:|---|---|---|
| L1-4 | Voter-facing scope overbroad | rule 5691-5697 (no primaries), 5069-5071 (UOCAVA), 5946-5952 (return mail) | Admitted, fixed: "Who feels it" now bounds the dispute to outbound, non-UOCAVA, general/special/runoff federal ballot mail; primaries, return envelopes, state-only elections named as outside. |
| L1-5 | "Third stay request" wrong denominator | 26A139 docket raw bytes: filed Jul 29, "denied as moot by the Court" Aug 24 | Admitted, fixed: the caption now says the solicitor general's third and the fight's fourth; 26A139 row added to the applications table and timeline; kicker "Four stay applications". |
| L1-6 | Supreme Court holding overgeneralized | opinion 101-116 (two doctrines, provision by provision), 253-307 (Section 3 speculation) | Admitted, fixed in both places: jurisdiction, standing and ripeness per provision, "string of speculations" for Section 3 only; timeline sub rewritten. |
| L2-1 | June-to-August litigation omitted | Talwani 172-221, 277-305; CA1 order line 74; Doc 201 pages 1-5 | Admitted, fixed: three new paragraphs (proposed rule and 200,000 comments; June 25 / July 7 judgment; July 25 First Circuit refusal; August 11 nationwide injunction; rule issued with both injunctions in force; August 25 violation finding, no remedy). New catch row "Left out". Timeline has five new rows. |
| L2-2 | Operational dispute at an obsolete cutoff | 26A305 docket raw bytes (three amici); Whistleblower Aid brief lines 325-335, 470-525, 553-558; Steiner statement; ProPublica held text | Admitted, fixed: "Who feels it" now carries five labeled positions (whistleblower, ProPublica second account, Whistleblower Aid brief with the sampling table, USPS Sept 1, Postmaster General Sept 4) and a "What would settle it" line; What happened next lists three briefs. |
| L2-3 | "Millions" without a denominator | Talwani 1684-1752 (state forecasts), 2328-2372 (10,000 jurisdictions, 4-16 weeks); EAVS line 896 | Admitted, fixed: "How many ballots" paragraph, eight-state forecast table, 2022 survey baseline labeled as a different year. Figures registered to state (21 total). |
| RHC-1 | First Circuit dockets 26-2029/26-2031 | not captured | NOT DONE: unknowns row stands. |
| RHC-2 | September 9 filings and any stay | not yet filed at capture time (docket 22:20Z) | NOT DONE, typed on the page: no response, no stay order as of Monday evening. |
| RHC-3,4 | USPS production; test plans, defect ledger, sampling spec | no production on any held docket | NOT DONE: needs-ledger rows and unknowns say so. |
| RHC-5 | 2026 national denominator | none exists | Typed on the page as not existing; state forecasts and 2022 baseline instead. |
| RHC-6 | Preserve the Sept 4 USPS statement | captured 22:20Z, body_captured | Done. |
| RHC-7 | Canonical URL 404 | site not live; ship = git push | No action: expected while staged. |
| - | Society for the Rule of Law brief | docket entry only | NOT DONE: brief not captured; unknowns row. |

Mechanism note: both supremecourt.gov docket captures came back with only the counsel list in the text sibling (trafilatura_main_v1 drops the entries table). Text siblings for the two docket records are our own tag-stripped reading of the saved raw HTML, disclosed in each record's "about". Class: every docket page pin; sibling captures scotus-26A124/26A297/26A305-docket were pinned before the registry rule and have full text; check-events only reads the text sibling.

---

The story is materially incomplete. It omits the litigation that shaped the rule, a court finding that USPS violated an injunction, USPS’s substantive rebuttal to the whistleblower, a third September 8 amicus filing, and usable scale denominators. Several individual sentences are accurate but misleadingly bounded.

Audit boundary: I reviewed the complete 127,490-byte [built article](/Volumes/4/GitHub/the-catch-site/dist/events/mail-voting/september-2026/index.html), SHA-256 `f26be3e3...a7019f`. The documented [canonical URL](https://thecatchengine.com/events/mail-voting/september-2026/) returned HTTP 404 at 22:11 UTC, so these findings concern the committed build, not confirmed live article bytes. The story inventory contains no video pin or transcript, so frame review was not applicable.

## Layer 1: Verification

Most core mechanics check out: the filing dates, 58-day calculation, September 9 deadline, party counts, September 4 injunction, August 21 effective date, August 26 publication, portal fields, nonacceptance provisions, return-ballot treatment, and UOCAVA exclusion are supported by the [September 4 order](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:2503) and [final rule](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:5639).

### 4. Medium: The voter-facing scope is overbroad

- **Page bytes 45835-46046:** “If you vote by mail this cycle, the injunction is what keeps...”
- **Controlling record:** The rule defines covered federal elections but says, “This definition does not include primary elections” ([lines 5691-5697](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:5691)). It expressly excludes UOCAVA ballots ([lines 5069-5071](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:5069)) and says its verification section “does not apply to Return Federal Ballot Mail” ([lines 5946-5952](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:5946)).
- **Correct account:** The immediate dispute concerns non-UOCAVA outbound ballots for covered federal general, special, and runoff elections on or before November 3. It does not govern voters’ return ballots, primaries, UOCAVA ballots, or state-only ballots.

### 5. Medium: “Third stay request in this fight” uses the wrong denominator

- **Page bytes 21960-22020:** “Sunday’s application is the third stay request in this fight.”
- **Controlling record:** The Court separately docketed 26A139 as an “Application ... for a stay” on July 29 and denied it as moot on August 24. See the [26A139 docket](https://www.supremecourt.gov/docket/docketfiles/html/public/26A139.html).
- **Correct account:** 26A305 was the federal applicants’ third Supreme Court stay application, but the fourth stay application in the litigation when the intervenor states’ 26A139 is counted.

### 6. Medium: The Supreme Court’s procedural holding is overgeneralized

- **Page bytes 20650-20718:** “the States’ challenge to the order was not ripe.”
- **Page bytes 42701-42833:** The Court acted because the states had to speculate about an unissued rule.
- **Controlling record:** The opinion says that two doctrines, standing and ripeness, blocked the suit and that each provision had to be examined separately ([lines 101-116](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/scotus-26A124-opinion.txt:101)). The hypothetical-rule analysis specifically addressed Section 3 ([lines 253-307](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/scotus-26A124-opinion.txt:253)).
- **Correct account:** The Court found the government likely to prevail on jurisdictional grounds. Standing and ripeness reasoning varied by provision; the speculative-final-rule analysis controlled the Section 3 claim. It was not a global holding that every challenge to the order was simply unripe.

## Layer 2: Completeness discovery

### 1. High: The story removes the litigation that explains how the rule reached the Court

- **Page bytes 11192-11845:** The narrative jumps from the March 31 order directly to the August 21 final rule.
- **Page bytes 43667-43729:** “The public record of this fight starts with the March 31 order.”
- **Controlling records:** USPS proposed the rule June 2 ([order lines 172-176](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:172)); the district court ruled June 25 and entered judgment July 7 ([lines 198-221](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:198)); the First Circuit denied stays July 25 ([official opinion](https://www.ca1.uscourts.gov/sites/ca1/files/opnfiles/26-1774O-01A.pdf)); and a nationwide injunction issued August 11 ([lines 277-305](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:277)).
- Most importantly, the August 25 court order found: “Defendants Have Violated the Preliminary Injunction” and concluded that USPS completed the rulemaking despite the prohibition. See [Document 201](https://storage.courtlistener.com/recap/gov.uscourts.mad.298449/gov.uscourts.mad.298449.201.0.pdf).
- **Correct account:** The final rule was the endpoint of a contested June-to-August rulemaking and injunction sequence. USPS received more than 200,000 comments, issued the rule while injunctions were active, and was then found by the district court to have violated one injunction. Omitting that sequence makes the August 21 issuance appear administratively ordinary.

### 2. High: The operational dispute is presented from an obsolete evidence cutoff

- **Page bytes 47294-47725:** The disclosure is labeled unestablished, followed only by USPS’s September 1 statement.
- **Page bytes 61739-61887:** The article lists two September 8 amici.
- **Controlling records:**
  - The current [26A305 docket](https://www.supremecourt.gov/docket/docketfiles/html/public/26A305.html) also says, “Amicus brief of Whistleblower Aid submitted.”
  - That [amicus brief](https://www.supremecourt.gov/DocketPDF/26/26A305/423445/20260908170416299_USPS%20Amicus%20FINAL.pdf) supplies alleged sampling rules, whole-batch rejection mechanics, and a second evidentiary lineage through contemporaneous reporting.
  - USPS issued a fuller September 4 response asserting: “Testing and validation have been continuous throughout the development lifecycle.” See the [official USPS statement](https://about.usps.com/newsroom/statements/090426-statement-from-usps-pmg-david-steiner-regarding-concerns-about-ballot-mail-for-federal-elections.htm).
  - [ProPublica](https://www.propublica.org/article/mail-voting-usps-officials-concerns-disenfranchisement) reported concerns from a source familiar with internal meetings, separately from the whistleblower, including election officials’ concerns about whole-batch rejection.
- **Correct account:** The operational facts remain disputed. The whistleblower and separate anonymous reporting describe rushed, insufficiently tested systems and whole-batch risks. USPS says testing was continuous, standards were not compromised, and deployment would be delayed for significant defects. No underlying test reports, defect ledger, sampling specification, or production evidence resolves that conflict. The article should present both positions and identify the missing receipts.

The docket omission is especially clear because the pinned docket has only two September 8 briefs, while the current docket has three. The sentence is literally true but materially misleading by omission.

### 3. High: “Millions” appears without a denominator

- **Page bytes 27091-27328:** The article reproduces the court’s “millions” language.
- **Page bytes 41734-41867:** It gives the plaintiff count, not the affected ballot volume.
- **Controlling records:** The district-court record gives concrete 2026 estimates, including more than 23 million ballots in California, 5.1 million in Washington, 4 million in Colorado, and 3 million in Oregon ([lines 1684-1752](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:1684)). It also identifies 10,000 election jurisdictions and vendor lead times of four to sixteen weeks ([lines 2328-2372](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:2328)).
- As a historical national baseline, the Election Assistance Commission reported 61,460,139 non-UOCAVA mail ballots transmitted in 2022, of which 36,683,450 were returned. See the [2022 EAVS report, page 22](https://www.eac.gov/sites/default/files/2024-11/2022_EAVS_Report_508c.pdf).
- **Correct account:** The exposure is nationwide and potentially reaches tens of millions of outbound ballot envelopes, but no verified 2026 national denominator is yet available. Historical data and heterogeneous state estimates should be labeled as context, not presented as a 2026 forecast.

## Layer 3: Independent reconstruction

- March 31: Executive Order 14399 directs USPS to propose ballot-mail rules.
- Early April: states and nonprofit organizations sue.
- June 2: USPS publishes the proposed rule. More than 200,000 comments follow before the July 2 close.
- June 25 and July 7: the district court rules for the plaintiff states and enters a limited judgment concerning elections through November 3.
- July 25: the First Circuit denies the government and intervenor stay motions.
- August 11: the district court enters a nationwide injunction against implementing Section 3 for elections through November 3.
- August 21: USPS issues and makes the final rule immediately effective while injunctions remain active.
- August 24: the Supreme Court stays the state-case injunction on jurisdictional grounds without deciding the final rule’s legality.
- August 25: the district court finds that defendants violated the nonprofit-case injunction by completing the rulemaking.
- August 26 and 27: challengers bring final-rule claims, and Talwani enters a temporary restraining order.
- September 1 to 4: the whistleblower disclosure, outside reporting, USPS’s two responses, and the preliminary-injunction record expose an unresolved factual conflict over readiness, testing, sampling, and whole-batch rejection.
- September 4: Talwani preliminarily enjoins specified mandatory provisions for elections on or before November 3. Voluntary preparation remains permitted; later elections are not enjoined.
- September 5 and 6: the government seeks First Circuit and Supreme Court stays, withdraws 26A297, and files 26A305.
- September 8: three amici appear on the Supreme Court docket, including Whistleblower Aid. As of 22:13 UTC, no respondent filing or stay order appears; responses are due September 9.

## Remaining high-value checks

1. Obtain the official First Circuit dockets and any orders in 26-2029 and 26-2031.
2. Capture the September 9 respondent filings and any administrative or full stay.
3. Obtain USPS’s answers and document production requested for September 4 and September 8.
4. Obtain the portal specification, sampling schedule, test plans and results, defect ledger, security assessment, contingency plan, and deployment decision record.
5. Verify actual 2026 ballot-mail volumes and mailing dates from election agencies, then construct a compatible national denominator.
6. Preserve the September 4 USPS statement, whose official URL was indexed during this audit but returned 404 to a direct request.
7. Resolve publication state: the repository’s documented canonical story URL currently returns 404.

VERDICT: INCOMPLETE

