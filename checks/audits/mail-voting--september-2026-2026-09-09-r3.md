# Dispositions (keystone, 2026-09-09, main 1cedba68): audit r3 and Zain's external review, one rework

Two reviews arrived within an hour: the r3 completeness audit (VERDICT: INCOMPLETE, its text follows the table) and an external completeness verdict Zain pasted ("Accurate and unusually well reconstructed, but still materially incomplete"). Both were tested at the pinned bytes before any edit. Overlap: the NAACP settlement track, old-versus-new practice, the count of applications, the Society brief.

| # | Source | Finding | Verified at the bytes | Disposition |
|---|---|---|---|---|
| 1 | both | NAACP v. USPS settlement track omitted (2020 suit, 2021 settlement, July 1 D.D.C. enforcement order, July 17 D.C. Circuit stay, appeal pending) | Yes: September 4 order footnotes 8 and 9; final rule section M ("prioritizing monitoring and timely delivery of election mail through 2028"); USPS 2021 statement and LDF page admitted through capture | New What happened paragraph; two timeline rows; sub-event; unknowns row typing the two D.C. orders and the settlement text as not held |
| 2 | Zain | Inspector general review announced September 8 | Yes: Democracy Docket carries the office's words ("plan to conduct an independent review of these allegations"); Reuters via WKZO (reuters.com refuses capture) | New What happened next paragraph; What would settle it; timeline; watching line; unknowns row |
| 3 | Zain | NBC "to and from voters" marked checks out | Yes: rule "does not apply to Return Federal Ballot Mail"; "Voters themselves will not enroll" | Chip changed to mislabeled, card moved to the front; count line and catch-minor updated |
| 4 | both | Old practice versus new mandate not distinguished | Yes: Steiner "The USPS has recommended both aspects for years (see the USPS Kit 600)"; House 396 to 6; "matching a manifest ... not fundamentally new" | New Who feels it paragraph "What was old, what is new" |
| 5 | Zain | Batch refusal to disenfranchisement chain missing its middle | Yes: rule "may be temporarily rejected ... any errors may be corrected and the mailpieces will thereafter be accepted"; order "absence of an appeals or escalation process", "four to sixteen weeks" | New paragraph "What a refused batch means, step by step" |
| 6 | Zain | Nationwide scope under Trump v. CASA unexamined | Yes, and stronger than the review said: Sauer's application argues it ("California respondents alone are not entitled to universal relief against the Rule"; "cannot obtain relief nationwide", citing CASA). CASA opinion admitted | New Where this sits paragraph with both sides |
| 7 | Zain | August 24 timing needs a notification caveat | Searched: the 26A124 docket pin (captured after August 24) lists no entry between August 12 and August 24 | Sentence added to the August 24 paragraph; unknowns row |
| 8 | Zain | "Third trip" count | Agreed | Three things item reworded: third government application, fourth in the fight |
| 9 | Zain | Vendor access to the portal | Yes: rule defines a portal user to include "a mail service provider ... authorized by the chief election official" | Portal paragraph extended; the absent controls named as absent |
| 10 | Zain | OIG 2026 primary audit as baseline | Yes: "on-time processing scores ranging from 97.75 to 98.99 percent"; "we plan to cover allegations received at the end of August 2026 in subsequent work" | Admitted; used in What would settle it |
| 11 | r3 | August 26 vacatur of the League injunction and the new complaints (r3's top finding) | Yes: application "subsequently vacated its LWVMA injunction, see LWVMA D. Ct. Doc. 204 (Aug. 26, 2026)"; "the LWVMA respondents filed a supplemental complaint, and the California respondents filed a new action" | New What happened paragraph; timeline row rewritten; unknowns row typing the order itself as not held |
| 12 | r3 | Missed July 29 deadline; immediate effect; Title 39 exemption | Yes: EO "120 days from the date of this order" (March 31 plus 120 is July 29; August 21 is 23 days later, recounted); rule "Delaying the effective date would jeopardize implementation"; "Although exempt by 39 U.S.C. 410(a)" | Added to the March 31 and August 21 paragraphs; timeline sub-line; computed figure |
| 13 | r3 | USPS rationale absent | Yes: "Whether or not voter fraud is common or uncommon ..." | Paragraph added under Why the judge blocked it |
| 14 | r3 | Privacy conflict with state confidential-voter laws | Yes: order "directly conflicts with these state laws"; "no effort to explain how States can both comply" | Paragraph added |
| 15 | r3 | "The three stay applications" caption; "Monday evening"; stale sources line | Yes, all three | Fixed |
| 16 | r3 | Society brief now available | Yes, captured | Admitted; described in What happened next; unknowns item removed; ledger updated |
| 17 | r3 | "No sampling specification" too broad | Agreed | Unknowns wording: no Postal Service specification; the brief's numbers are the disclosure's |
| 18 | r3 | Live URL 404 | Expected: local main is not pushed; ship is Zain's decision | No change |
| 19 | Zain | Caption visual bug ("What eight states told the court they will mail" running into its note) | Yes: story.css had no rule for story-figure captions; two pages carried a local copy, this one did not | Rule added to story.css for all pages |

Not done, typed: the July 1 and July 17 D.C. orders, the August 26 vacatur order, the settlement text, the First Circuit dockets, September 9 filings, USPS production to Blumenthal, test records. Each is on the page in unknowns or the needs ledger.

Verification: quote_lint and lens_lint clean, zero em dashes in the edited files (one pre-existing in story.css untouched), full gate build in the worktree, deadline arithmetic recounted.

---

I audited the current **Mail voting — September 2026** story. The largest omission is the August 26 procedural hinge: the district court vacated the remaining executive-order injunction, the plaintiffs immediately redirected their cases toward the issued final rule, and the September injunction arose from those new pleadings. Without that step, the story’s central “rule, not order” correction is itself incomplete.

There is also a publication failure: the repository marks the event “published” ([state record](/Volumes/4/GitHub/the-catch-site/data/state/chain-event-mail-voting-september-2026.json:2)), but the canonical URL returned **HTTP 404 with zero body bytes** during this audit. The current local build exists and passes the event gate, but it is not presently available at the purported published URL.

## Layer 1 — Verification

| Material proposition | Cited record | Broader record | Finding |
|---|---|---|---|
| March 31 order, June 2 proposal, August 21 issuance/effective date, August 26 publication | Supports the dates and rule mechanics. | The order required a final rule within 120 days, July 29. Issuance on August 21 was 23 days late. ([EO](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/eo-14399.txt:147)) | **Accurate but materially incomplete.** |
| August 24 Supreme Court stay left the current dispute about the rule rather than the order | The cited opinion supports a jurisdictional stay of the states’ judgment. | A separate August 11 executive-order injunction remained until it was vacated August 26. New and supplemental complaints targeting the final rule followed that day. ([application](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/scotus-26A305-application.txt:650)) | **Materially misleading by omission.** The Court did not pause every operative EO injunction on August 24. |
| Four stay applications are discussed | The four docket dispositions are correctly listed in the data. ([table data](/Volumes/4/GitHub/the-catch-site/src/data/mailvoting202609.mjs:108)) | The rendered caption says “The three stay applications.” ([article](/Volumes/4/GitHub/the-catch-site/src/pages/events/mail-voting/september-2026.astro:205)) | **False internal label.** |
| September 8 added three amicus briefs; no response or stay had appeared | The current [Supreme Court docket](https://www.supremecourt.gov/docket/docketfiles/html/public/26a305.html) supports the filings and absence of an order at the checked time. | September 8, 2026 was Tuesday. | **Date error:** “as of Monday evening” must be “Tuesday evening.” ([article](/Volumes/4/GitHub/the-catch-site/src/pages/events/mail-voting/september-2026.astro:308)) |
| Rule applies to outbound federal general, special, and runoff ballot mail; return-mail verification and UOCAVA ballots are excluded | Supported. | No contradicting record found. | **Verified.** |
| Portal fields, five-year retention, federal system location, and law-enforcement purpose | Supported. | The broader record also presents unresolved First Amendment/privacy arguments and conflicts with state confidentiality laws protecting domestic-violence victims, stalking victims, judges, police, and others. ([order](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:2004), [rule response](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:941)) | **Literal description verified; legal and human stakes incomplete.** |
| Portal readiness is contested; USPS published no test results | Correctly attributed to the parties. | The docketed whistleblower brief does give a provisional sampling schedule, while noting that the rule itself omits sampling. ([brief](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/scotus-26A305-whistleblower-aid-amicus.txt:519)) | “No sampling specification” is **too broad**. It should say no USPS-authenticated specification or underlying disclosure is held. |
| State mailing forecasts, 10,000 jurisdictions, printing lead time, and 2022 national scale | Supported. The EAVS figure is explicitly non-UOCAVA and accurately labeled as a different-year baseline. ([EAVS](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/eavs-2022-report.txt:894)) | The 2024 EAVS is newer, though 2022 remains a defensible same-cycle baseline. | **Verified and properly bounded.** |
| Judge’s Elections Clause, ultra vires, nonmailable-material, and irreparable-harm findings | Supported and correctly described as preliminary. | Government arguments are included, but its substantive policy rationale is largely absent. | **Legally accurate; balance incomplete.** |
| Source note describes the proof base | It says “three Supreme Court applications” and that figures come from Federal Register PDFs. ([article](/Volumes/4/GitHub/the-catch-site/src/pages/events/mail-voting/september-2026.astro:69)) | The story uses four applications, a judicial order, EAVS data, press records, and computed date differences. | **Stale and false as written.** |
| Local article integrity | `node scripts/check-events.mjs` passed. Built artifact: 157,445 bytes, SHA-256 `6b5e7d…c745f13`. | Live URL returned 404. | **Local mechanical verification passed; publication verification failed.** |

The remaining numerical counts, quotations, day arithmetic, party counts, rule sections, withdrawal chronology, state forecasts, and media-claim corrections were supported by the cited records.

## Layer 2 — Completeness discovery

The major missing parts are:

1. **The August 26 change of legal object.**  
   After the August 24 Supreme Court stay, the August 11 League injunction still existed. It was vacated August 26; that same day the League plaintiffs filed a supplemental complaint and the California plaintiffs filed a new action targeting the final rule. The August 27 TRO and September 4 injunction followed. This belongs in the main chronology, not a footnote.

2. **The directly related 2020–2026 litigation chain.**  
   The story says the public record starts March 31. But the September order records a 2020 election-mail APA case, a 2021 USPS–NAACP settlement, a July 1, 2026 ruling that the proposed rule violated that settlement, and a July 17 D.C. Circuit stay. ([court history](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:251), [USPS settlement statement](https://about.usps.com/newsroom/statements/121721-statement-on-agreement-with-naacp-to-dismiss-election-mail-lawsuit.htm))  
   March 31 is a defensible start for the executive-order chapter, but not for the full institutional or litigation story.

3. **The missed presidential deadline and immediate-effect procedure.**  
   The article omits that the order required issuance by July 29, that USPS issued the rule 23 days later, and that USPS invoked its Title 39 APA exemption while choosing to solicit comments. USPS also made the rule effective immediately because it said delay would jeopardize November implementation. ([rule](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:115))

4. **What was old, what was new, and what became coercive.**  
   USPS had long recommended election-mail logos, automation-compatible envelopes, barcodes, and design review. Its Postmaster General also pointed to bipartisan House legislation adopting similar tracking ideas. The consequential changes were mandatory compliance, per-voter enrollment, acceptance verification, batch consequences, and the federal five-year data system. ([USPS statement](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-steiner-statement-2026-09-04.txt:5))  
   The current story makes the package sound more uniformly novel than the record supports.

5. **USPS’s stated rationale.**  
   The article gives the court’s “no evidence” finding and the government’s authority argument, but not USPS’s actual explanation: visibility for enforcement, fraud detection, and public confidence “whether or not voter fraud is common or uncommon.” ([final rule](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:696)) Reporting that rationale would not validate it; it would correctly bound what the agency claimed.

6. **The privacy conflict is larger than whether this is a citizenship list.**  
   The court found that mandatory portal enrollment directly conflicted with some state confidentiality laws and that the government had not explained how protected voters’ addresses could be uploaded lawfully. USPS, meanwhile, relied partly on a Privacy Act law-enforcement exception. Both sides of that dispute should be visible.

7. **The newly available Society for the Rule of Law brief.**  
   The article says the brief itself is not held. It is now available from the [Supreme Court](https://www.supremecourt.gov/DocketPDF/26/26A305/423352/20260908140821610_2026-9-8%20Amicus%20Brief.pdf). It opposes a stay and adds federalism, major-questions, state-authority, and Title 39 arguments. It reinforces rather than changes the story’s legal center.

## Layer 3 — Independently bounded account

The fuller chronology is:

- **2020–2021:** election-mail litigation leads to a USPS–NAACP settlement and continuing operational commitments.
- **March 31, 2026:** Executive Order 14399 orders proposed rulemaking within 60 days and a final rule within 120.
- **June–July:** USPS proposes the rule; Massachusetts litigation proceeds; parallel D.C. litigation finds the proposal inconsistent with the settlement, then the D.C. Circuit stays that ruling.
- **July 29:** the executive order’s final-rule deadline passes.
- **August 11:** a nationwide injunction bars Section 3 rulemaking.
- **August 21:** USPS nevertheless issues and immediately activates the final rule while promising not to implement it unless injunctions are lifted.
- **August 24:** the Supreme Court stays the states’ separate judgment on standing and ripeness.
- **August 25:** the district court finds USPS violated the August 11 injunction but imposes no additional remedy.
- **August 26:** the August 11 injunction is vacated; the rule is published; plaintiffs file new and supplemental challenges to the completed rule.
- **August 27–September 4:** mandatory rule provisions are restrained and then preliminarily enjoined.
- **September 6–8:** the government files 26A305; three amici file September 8.
- **At the audit cutoff:** responses were due September 9; no stay had yet appeared on the checked docket.

That account preserves the story’s strongest conclusion—the pending Supreme Court dispute concerns the final USPS rule—but supplies the missing legal mechanism, policy lineage, agency rationale, and privacy controversy.

## Remaining high-value checks

- Repair or identify the deployment responsible for the canonical 404.
- Capture the First Circuit dockets and orders in Nos. 26-2029 and 26-2031.
- Capture September 9 responses and any administrative or merits stay.
- Obtain the August 26 vacatur order, July 1 D.D.C. order, July 17 D.C. Circuit order, and operative settlement text as first-class story sources.
- Determine whether USPS produced the records requested by Senator Blumenthal.
- Obtain authenticated test reports, defect records, sampling instructions, portal-production logs, and any data-collection records.
- Establish what happened operationally during the August 26–27 interval and whether any protected voter data was uploaded.
- Replace the three erroneous/stale reader statements: “Monday evening,” “three stay applications,” and the current source-description sentence.

VERDICT: INCOMPLETE

