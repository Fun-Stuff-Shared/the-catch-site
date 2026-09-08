# Dispositions (keystone, 2026-09-08 20:20Z)

Each finding below was re-read at the pinned bytes before its disposition. Rework order: /Volumes/4/scratch-fable-profile/grok-authoring/prompt-mailvoting-rework2.txt (queued behind the Texas rework; grok runs one at a time).

| # | Finding | Verified at | Disposition |
|---:|---|---|---|
| 1 | UOCAVA deadline used as a rule-impact date | rule lines 5152, 5187 ("express exclusion of UOCAVA ballots", "no change") | Admitted, fix: rewrite the day-count sentence and "Who feels it"; September 19 stays only as context with the exclusion stated. |
| 2 | Return ballots read as facing the acceptance screen | rule 24.5.3 (5915-5935) returns mail to the "authorized ballot mailer"; 24.5.4 "does not apply to Return Federal Ballot Mail" | Admitted, fix: the reader sentence now says outbound mailings from election offices; return envelopes keep design rules only. |
| 3 | August 26 stands in for the August 21 effective date | rule line 73 "Effective August 21, 2026"; Talwani 309, 365, 382 | Admitted, fix: state issued and effective August 21, published August 26; add the 74-day effective-to-election count to the data module beside the 69. |
| 4 | "Acceptance screen" understates the enjoined relief | Talwani 2503-2551 | Admitted, fix: list what the injunction reaches in reader words. |
| 5 | Brown's "25" called a different total | Brown release lines 1382-1390 (23 states incl. Washington, D.C., Pennsylvania governor) | Admitted, fix: same coalition, loose label because D.C. is not a state. |
| 6 | Society for the Rule of Law filing cited only to the congressional brief | docket pin lines 145-176 | Admitted, fix: cite the docket pin. |
| 7 | Why the injunction issued is missing | Talwani 1292-1304, 1400-1460, 1462-1570, 1572-1646, 2368-2439; application 798-835 | Admitted, fix: one section giving the court's three preliminary holdings and the government's answer, both cited. |
| 8 | Federal-database treatment backwards and self-contradicting | page L161 ("smaller slip") vs L225 (chip "consistent"); SORN FR-2026-07-17 2026-14508 not yet pinned | Admitted, fix from new pins: admit the system-of-records notice and the September 1 response; NBC's wording checks out; rewrite both lines. |
| 9 | Portal-readiness dispute reduced to one sentence | Talwani 1994-2024; Blumenthal release and USPS statement not yet pinned | Admitted, fix from new pins: allegations, USPS response, court findings stated separately and labeled. |
| - | "First check of this story's sources has not run yet" | src/components/story/RevisionTimeline.astro:21 | No page change: the line fills when the story read (pid 59286) completes; rerun stage-story after the rework. |
| - | No video record in the manifest | manifest, 29 records | No action: the story has no admitted video; the CBS embed is not a record. |

Remaining high-value checks (auditor's list) go on the page as open questions where not already there: the September 9 response and any stay order, the First Circuit dockets 26-2029 and 26-2031, the whistleblower production due September 8.

---

Audit result: materially incomplete. The procedural spine is mostly accurate, but the page leaves readers with the wrong understanding of which voters and mailpieces the rule reaches, why the injunction issued, and what the portal records and operational dispute involve.

Byte offsets below are 0-based positions in the 77,938-byte [built article](/Volumes/4/GitHub/the-catch-site/dist/events/mail-voting/september-2026/index.html), audited at 3:54 p.m. EDT on September 8, 2026.

## Ranked findings

| Rank | Severity | Layer | Finding |
|---:|---|---|---|
| 1 | HIGH | Verification | The story uses the UOCAVA deadline as a rule-impact deadline even though UOCAVA ballots are expressly excluded. |
| 2 | HIGH | Verification | It implies returned voted ballots face the rule’s nonacceptance screen; that screen applies only to outbound mailings. |
| 3 | HIGH | Completeness | It omits the legal holdings that support the preliminary injunction. |
| 4 | HIGH | Completeness | Its “federal database” correction is backwards and omits the federal system of records. |
| 5 | HIGH | Completeness | It omits the whistleblower allegations and USPS’s response about the portal’s readiness. |
| 6 | MEDIUM | Verification | It substitutes the August 26 publication date for the August 21 issuance and effective date. |
| 7 | MEDIUM | Verification | It reduces the relief before the Supreme Court to an “acceptance screen,” omitting most enjoined requirements. |
| 8 | MEDIUM | Verification | It treats Nick Brown’s “25” as a different total when it is the same coalition under a loose label. |
| 9 | LOW | Verification | A September 8 docket claim is cited only to one amicus brief, which cannot support the other filing. |

## Layer 1: Verification

### 1. HIGH: The UOCAVA impact frame is false by omission

Page byte 37,453 says:

> “Sunday's stay request was filed 58 days before the election the injunction names, 13 days before the overseas-ballot date in the statute...”

The page also places September 19 under “Who feels it,” alongside the rule’s operational deadlines.

The arithmetic is correct. The relevance is not. The final rule says there is an “express exclusion of UOCAVA ballots from the rule’s scope” and that those voters should experience “no change” because of that exemption. It separately explains how exterior markings distinguish those ballots. See the [final rule at lines 5067-5071](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:5067), [lines 5143-5198](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:5143), and [lines 5212-5241](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:5212).

Correct account: September 19 is a real statutory UOCAVA mailing deadline, but it is not a date on which this rule’s portal, design, or acceptance requirements attach. The rule reaches non-UOCAVA federal ballot mail.

### 2. HIGH: The story confuses outbound and return ballot treatment

Page byte 11,698 says:

> “Mailings that do not comply ‘will not be accepted’ and ‘will be returned.’”

Byte 39,234 then says:

> “If you vote by mail this cycle, the injunction is what keeps the Postal Service from treating noncompliant envelopes as unaccepted mail...”

That generalization incorrectly reaches voted ballots returned by voters. The rule’s exact operative bytes say noncompliant mailings are returned to the “authorized ballot mailer,” and the next clause identifies them as “Outbound Federal Ballot Mail.” See [lines 5915-5935](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:5915).

The rule then states exactly:

> “705.24.5 does not apply to Return Federal Ballot Mail.”

See [lines 5944-5952](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:5944). USPS also explains that voters may still use a residential mailbox, retail counter, or another authorized method for return mail, at [lines 5435-5457](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:5435).

Correct account: the hard portal verification and batch nonacceptance mechanism applies to outbound ballots presented by election offices. Return envelopes still have design requirements, but voted return ballots are expressly outside section 705.24.5’s screening procedure.

### 3. MEDIUM: August 26 is publication, not the rule’s operative beginning

Page byte 11,311 says:

> “On August 26 the Postal Service published a final rule...”

That sentence alone is true. The misleading sequence appears at byte 36,511:

> “August 24 was a win on procedure, not on the rule... 2 days later the rule was in the Federal Register...”

The rule’s exact date line is:

> “DATES: Effective August 21, 2026.”

See [line 73](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/usps-final-rule-plain.txt:73). Talwani found that USPS issued it around 9 p.m. on August 21 and distinguished that date from its August 26 Federal Register publication. See [lines 307-326](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:307) and [lines 363-370](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:363).

The Supreme Court’s August 24 opinion measured standing “at the time this suit was filed,” not according to what was publicly known on August 24. See [opinion lines 254-307](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/scotus-26A124-opinion.txt:254).

Correct account: USPS issued and made the final rule effective on August 21, three days before the Supreme Court opinion. It was formally published August 26. The page’s 69-day number is publication-to-election; effective-date-to-election is 74 days.

### 4. MEDIUM: “Acceptance screen” understates what is before the Court

Page byte 50,841 says:

> “The restriction now before the Court is the rule's acceptance screen...”

Application 26A305 seeks a stay of the preliminary injunction, and that injunction reaches:

- mandatory outbound envelope standards and review;
- mandatory return-envelope standards and review;
- portal registration;
- voter enrollment with names, addresses, and barcodes;
- outbound verification;
- presentation-location requirements;
- nonacceptance and review provisions;
- preparatory implementation steps.

The complete list is in the [injunction at lines 2503-2551](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:2503).

Correct account: the acceptance screen is one component of the relief, not its full scope.

### 5. MEDIUM: Brown’s “25” is the same coalition, not a different total

Page byte 35,903 says:

> “Brown's ‘25’ is a different total.”

Brown’s release identifies 23 states, including Washington, plus the District of Columbia and Pennsylvania represented by its governor. That is the same 25 state-level plaintiffs or jurisdictions the page itself describes as “23 states plus D.C. and Pennsylvania’s governor.” See [Brown’s exact list at lines 1382-1390](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/brown-2026-09-04.txt:1382).

Correct account: “25 states” is an imprecise label because D.C. is not a state, but it is not a different total or coalition.

### 6. LOW: The Society for the Rule of Law filing lacks the cited support

Page byte 52,644 says both the congressional amici and the Society for the Rule of Law filed on September 8. The paragraph cites only the congressional brief. That brief cannot prove the Society filing.

The broader proposition is true. The pinned docket records both entries at [lines 145-176](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/scotus-26A305-docket.html:145), and the [live Supreme Court docket](https://www.supremecourt.gov/docket/docketfiles/html/public/26a305.html) still showed both at audit time. This is a citation-assignment defect, not a factual error.

### Material propositions that checked out

- Application 26A305 was filed September 6; Justice Jackson set responses for September 9 at 4 p.m. EDT; two amici appeared September 8. The live docket showed no response or stay order at audit time.
- Application 26A297 was withdrawn, and the August 24 disposition concerned 26A124.
- The 58, 60, 61, 69, 217, 13, 45, 3, and 2-day calculations are arithmetically correct. The 69 and 13-day uses are misleading for the reasons above.
- The 23 directly named states, D.C., Pennsylvania governor, and 12 intervenor states count correctly.
- The quoted Sauer and Talwani passages match the saved documents. In particular, Sauer’s mailing timeline appears at [application lines 416-446](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/scotus-26A305-application.txt:416), and Talwani’s record-bounded fraud finding appears at [lines 2400-2427](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:2400).
- I found no fabricated quotation in the material claims reviewed.

## Layer 2: Completeness discovery

### 7. HIGH: The story tells readers what the injunction does, but not why it issued

Page byte 13,299 offers only the generic explanation:

> “On September 4 Talwani issued a preliminary injunction. A preliminary injunction is a court order that forbids someone from doing something while a lawsuit continues.”

Across the complete built page, “ultra vires,” “Title 39,” and “nonmailable” occur zero times.

Those are central holdings:

- Plaintiffs established a substantial likelihood of success on their Elections Clause claim. [Order lines 1292-1304](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:1292)
- The court found Congress had not authorized USPS to make this election rule. [Lines 1400-1460](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:1400)
- It found the rule likely ultra vires under USPS’s statutory authority. [Lines 1462-1570](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:1462)
- It found the rule likely created a new conditionally nonmailable category contrary to Title 39. [Lines 1572-1646](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:1572)
- It found irreparable harm and that the record contained no mail-fraud evidence supporting rushed implementation, while allowing voluntary compliance. [Lines 2368-2439](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:2368)

These are preliminary findings, not a final merits judgment. The government contests them, arguing that USPS has ordinary statutory authority to set mail standards, states retain voter-eligibility control, and the rule is a modest mail regulation. See [application lines 798-835](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/scotus-26A305-application.txt:798).

Without both sides, the article reduces a substantive constitutional and statutory ruling to procedural scenery.

### 8. HIGH: The database treatment omits the federal record system

Page byte 30,592 calls NBC’s “federal database” wording a “smaller slip.” Byte 48,354 later says the opposite:

> “Calling that list a federal database is consistent with who runs the system...”

NBC’s wording was accurate. USPS 820.225 is a federal Privacy Act system located at USPS headquarters and a supplier cloud environment. It records names, addresses, issuing states, and outbound and return envelope barcodes. Its stated purpose includes helping determine adherence to federal law and facilitating law-enforcement efforts. Records are retrievable by name, address, state, and barcode and retained for five years. See the official [July 17 system-of-records notice](https://www.govinfo.gov/content/pkg/FR-2026-07-17/pdf/2026-14508.pdf).

The system became effective September 1, according to USPS’s official [response to comments](https://www.govinfo.gov/content/pkg/FR-2026-09-01/pdf/2026-17986.pdf).

Correct account: state and local officials supply the data, and the portal is not a federal citizenship database. It is nevertheless a federal database containing individual ballot-mail records, with five-year retention and an explicit law-enforcement purpose. That privacy and institutional context belongs in the story.

### 9. HIGH: The portal-readiness dispute is reduced to one sentence

Page byte 39,639 says only:

> “The plaintiff states' September 3 opposition said the portal ‘is not yet functional.’”

By publication, a substantially broader record existed:

- An anonymous USPS whistleblower alleged that the portal was rushed, siloed, lacked meaningful testing, and used a zero-percent batch-failure threshold under which one failed barcode could return an entire batch. Those remain allegations, not established facts. [Senator Blumenthal’s disclosure and letter](https://www.blumenthal.senate.gov/newsroom/press/release/following-new-whistleblower-disclosure-blumenthal-demands-usps-provide-documents-answers-about-shit-show-process-to-screen-ballots-and-potentially-catastrophic-impact-on-mail-in-voting)
- USPS responded that it had spent months developing the portal, acted consistently with court orders, was finalizing it for voluntary familiarization, and was not performing pre-acceptance verification. [USPS statement](https://about.usps.com/newsroom/statements/090126-statement-on-development-of-us-federal-ballot-mail-portal.htm)
- Talwani found that the portal was not operational, that no appeals or escalation process had been specified, and that the compressed approval and enrollment process supported irreparable harm. [Order lines 1994-2024](/Volumes/4/GitHub/the-catch-site/data/sources/mail-voting/talwani-pi-2026-09-04.txt:1994)

Correct account: the portal’s actual readiness was disputed. The article should present the whistleblower allegations, USPS’s response, and the court’s findings separately.

### Source independence, revisions, and video

- AP, PBS, and CNBC are explicitly one AP lineage. CBS’s live article is labeled “CBS/AP” and says AP contributed, so CBS is substantially the same lineage, not an independent confirmation. [CBS’s current article](https://www.cbsnews.com/news/trump-supreme-court-appeal-us-postal-service-mail-ballot-fight/)
- NBC and The Hill are separate Sunday writes. Repeated Sauer quotations across these outlets remain one primary-source proposition, not independent corroboration.
- The article says “Story updated 2026-09-08” at byte 9,975, but byte 73,963 says: “The first check of this story's sources has not run yet.” That means the reader-facing revision history does not substantiate systematic source-revision checking.
- I checked the live Supreme Court docket and the live CBS/AP page. Some AP, PBS, CNBC, NBC, and Hill pages resisted direct fetches, so later revisions on those pages remain an explicit access limit.
- The 29-record story manifest contains no video record or local video asset. Therefore there was no pinned story video on which to run the required `ffmpeg -vf fps=1` review. CBS’s live page embeds a clip, but that clip is not an admitted video pin in this story’s manifest.

## Layer 3: Independent reconstruction

The strongest current account is:

1. On March 31, Executive Order 14399 directed USPS to begin ballot-mail rulemaking and separately directed other federal activity concerning citizenship lists.

2. USPS proposed the ballot-mail rule June 2 and received more than 200,000 comments. It created a related federal Privacy Act system for voter names, addresses, issuing states, and outbound and return barcodes.

3. USPS issued the final rule on August 21, effective that day, and formally published it August 26. The related federal system of records became effective September 1.

4. The rule applies to non-UOCAVA federal ballot mail. It requires envelope design review, unique barcodes, portal registration and voter enrollment, and pre-acceptance verification of outbound mailings. UOCAVA ballots are expressly excluded. Voted return ballots are expressly excluded from the section 705.24.5 verification and nonacceptance procedure.

5. The government says these are lawful mail-preparation and data-reporting standards, that states retain exclusive authority over voter eligibility, and that the standards improve visibility, operations, election integrity, and law enforcement.

6. Plaintiffs say the rule is an election regulation USPS lacks authority to impose and that election offices cannot reprint envelopes, obtain approval, enroll millions of voters, and use an unfinished portal on the compressed timetable.

7. On September 4, Judge Talwani preliminarily agreed with the plaintiffs on the Elections Clause, ultra vires, and Title 39 theories. She found serious operational and disenfranchisement risks, denied the government’s requested stay, barred mandatory implementation and preparatory steps through November 3, and left voluntary compliance and later elections untouched.

8. The government appealed and filed First Circuit stay motions September 5. It filed Supreme Court application 26A305 on September 6 and withdrew 26A297. As of the audit time, the [Supreme Court docket](https://www.supremecourt.gov/docket/docketfiles/html/public/26a305.html) showed two September 8 amici, a September 9 response deadline, and no stay decision.

9. If the injunction is lifted, the immediate compliance burden falls on state and local election offices sending non-UOCAVA federal ballots and on voters awaiting those outbound ballots. The article should not tell readers that UOCAVA ballots or voters’ returned ballots face the same acceptance screen.

## Remaining high-value checks

- The respondents’ 26A305 filing due September 9 and any administrative or full stay order.
- The official First Circuit dockets for 26-2029 and 26-2031, including September 7 filings and any order. I found the September 5 stay motions but no authoritative public order.
- The underlying whistleblower disclosure, technical requirements, test records, barcode sampling rules, escalation procedures, and any USPS production due September 8.
- The district-court declarations and hearing record supporting state-by-state envelope counts, voter counts, confidentiality restrictions, portal burdens, and mailing dates.
- Current portal availability and independent test evidence, rather than planned or asserted readiness.
- State-by-state outbound ballot volumes divided into UOCAVA and non-UOCAVA mail, with actual mailing dates.
- Live revision comparison for the news pages that blocked direct access.

I made no file changes. The extensive pre-existing worktree modifications and untracked state were left untouched.

VERDICT: INCOMPLETE

