# Dispositions (keystone, 2026-09-08, rework commit 513b37ec)

Each finding checked at the pinned bytes before any edit. Verified = the record says what the auditor said it says.

| # | Finding | Verified at the bytes | Disposition |
|---|---|---|---|
| L1-1 | "Only a U.S. Supreme Court stay" narrows the live litigation | Yes: reply lines 276 to 288 name Onder v. Missouri 4:26-cv-1424 and Berry v. Hoskins 4:26-cv-1419; the court's September 4 filing list shows Onder's PI/TRO motion and a show-cause order to Berry | Fixed: dek, three-things item, reply block, watching line, unknowns; relief sought typed unknown (complaints not saved) |
| L1-2 | Certification stale | Yes: SoS page lists Proposition A with a certificate link; the certificate PDF is a scan, read by OCR, dated "this 8th day of September 2026" | Fixed: new official block, KPI, catch 4; OCR text disclosed as machine-read in the record note |
| L1-3 | 5 days / 28 days presented as settled | Yes: application lines 1780 to 1790 (two to three weeks, 7 to 10 days on emergency hours, 14, 7); Lennon affidavit at 907a, paragraphs 14 to 18, read on the rendered page image and in layout text | Fixed: catch retitled, data-module comment corrected (7 + 14 + 7), paragraph rewritten with both sworn accounts; UOCAVA phrased as ballots validly requested |
| L1-4 | Maggard characterized incompletely | Yes: maggard pin "simply filing a referendum petition does not automatically suspend a legislative act" and relation-back | Fixed: both halves stated |
| L1-5 | Amicus sides unchased; ABC/AP counted twice | Yes: four brief covers (two IN OPPOSITION / IN SUPPORT OF RESPONDENT, two IN SUPPORT OF APPLICANT); manifest already typed ABC as an AP dispatch | Fixed: sides on the page from the covers; "ABC and AP both wrote" rewritten as one dispatch |
| L1-6 | Statute pin obsolete | Yes: revisor shows "Effective - 28 Aug 2026" with the eighth-Tuesday line intact | Fixed: new record cited alongside the 2018 pin |
| Other | 300,000 is a raw count; AG superlative untested | Yes: opinion "purporting to contain more than 300,000 signatures"; conceded points | Fixed: raw-versus-valid stated; superlative labeled as the attorney general's claim, not tested by us |
| L2-7 | Litigation sequence omitted | Yes: Luther 3/24, WD88795 4/30, Healey 5/12, NAACP 5/27 at Justia pins; federal dismissal 12/8 and denial 5/11 in the vol1 table of contents | Fixed: new paragraph; the federal case is cited to the appendix table of contents only (orders not read) |
| L2-8 | The map itself undescribed | Yes: Healey passages on counties (5 vs 9), municipalities (2 vs 22), Clay County/Northland, District 4 rural to urban, Troost Avenue | Fixed: new record block; the auditor's "13 vs 31" was not in the pin, the pin says 2 vs 22 for municipalities wholly within one county, so the page uses the pin's numbers |
| L2-9 | 1922 referendum omitted | Yes: vol2 official return, Proposition 17, 240,340 yes; the no figure reads "386 522" in the extraction (comma lost) | Fixed: new sentence in the AG block, computed share from the data module, typed as a map referendum rather than a post-primary court order |

Not done this pass: the Onder and Berry complaints and any later orders; AP's 59 percent method (typed as unpublished in that story); nominee allocation under the 2022 districts; a nationwide test of the "never before" claim. The story-state footer ("has not yet read this story's sources") is the shared state pipeline, pending the Luna read, not page copy.

---

What is missing first: the story omits two live federal district court cases that could affect the governing map, even though the article’s own saved Supreme Court reply identifies them. That makes its central claim that “Only a U.S. Supreme Court stay” could restore House Bill 1 materially false as a description of the available procedural routes.

The core Missouri Supreme Court holding is accurately reported. The full published account is not complete.

## Layer 1: Verification

### 1. CRITICAL: The story falsely narrows the live litigation to one court

**Page bytes:** “Only a U.S. Supreme Court stay could put House Bill 1 in force for November.” This appears in both the dek and the first summary item. [Data source](/Volumes/4/GitHub/the-catch-site/src/data/missourihousemap202609.mjs:11), [story source](/Volumes/4/GitHub/the-catch-site/src/pages/events/missouri-house-map/september-2026.astro:51)

**Record bytes:** Hoskins’s own reply says, “Multiple lawsuits have already been filed,” then identifies *Onder v. Missouri*, No. 4:26-cv-01424, and *Berry v. Hoskins*, No. 4:26-cv-01419. It says local officials were deciding whether to change maps or “hold out for a federal court order.” [Saved reply](/Volumes/4/GitHub/the-catch-site/data/sources/missouri-house-map/scotus-26A304-reply.txt:276)

The federal court’s official September 4 activity confirms that *Onder* included a “MOTION for Preliminary Injunction and TRO,” while *Berry* sought a three-judge panel and equitable relief. [Eastern District of Missouri docket activity](https://ecf.moed.uscourts.gov/documents/PressBox09042026.html)

**Correct account:** The Missouri judgment presently requires the 2022 map, but the live federal routes include the Supreme Court application and emergency proceedings in the Eastern District of Missouri. The article may say no federal court had yet displaced the Missouri order, but it cannot say the U.S. Supreme Court is the only possible route.

### 2. HIGH: The published endpoint is already stale about certification

**Page bytes:** “The secretary of state's own written certificate of sufficiency, if he has issued one since the order.” It adds that the saved page “does not list petition 2026-R004.” [Story source](/Volumes/4/GitHub/the-catch-site/src/pages/events/missouri-house-map/september-2026.astro:259)

**Record bytes:** The live Secretary of State page says the listed measures “have been certified for the November 3, 2026 general election.” It now lists “Proposition A,” “View Certificate of Sufficiency,” and the official and fair ballot language for HB1. [Missouri 2026 ballot measures](https://www.sos.mo.gov/petitions/2026BallotMeasures), [certificate PDF](https://www.sos.mo.gov/CMSImages/Elections/Petitions/2026-R004WebCert.pdf)

**Correct account:** The referendum is certified as Proposition A for November 3. A “yes” approves HB1; a “no” leaves the 2022 boundaries in place. The certificate is no longer an unknown. The PDF has no accessible text layer, so its signature, issuance time, and internal wording still require OCR or visual inspection.

### 3. HIGH: Contested election-administration evidence is presented as settled

**Page bytes:** “5 days to reset ballots” and, after listing 14 days for design/testing plus seven days for printing, “a combined 28 days at best.” [Story source](/Volumes/4/GitHub/the-catch-site/src/pages/events/missouri-house-map/september-2026.astro:116), [story source](/Volumes/4/GitHub/the-catch-site/src/pages/events/missouri-house-map/september-2026.astro:182)

**Record bytes supporting the state:** The application says manual voter reassignment would ordinarily take two to three weeks, or 7 to 10 days under emergency hours, followed by about 14 days for design/testing and seven for printing. [Application](/Volumes/4/GitHub/the-catch-site/data/sources/missouri-house-map/scotus-26A304-application.txt:1771)

**Counterevidence omitted:** Boone County Clerk Brianna Lennon’s sworn affidavit says all voters were already tied to both maps, the 2022 districts had not been overwritten, “no additional work needs to be done” to select them, and she had no technological concern about using them in November. [Supreme Court Appendix Volume 3](https://www.supremecourt.gov/DocketPDF/26/26A304/423214/20260904224938852_Appendix%20Vol%203.pdf), extracted pages 907a to 908a.

**Correct account:** Five days was the ruling-to-ballot-placement deadline, not a five-day ballot-reset window. Administrative burden was disputed. The state and Jackson County described manual work and a 28-day best case; Boone County said both maps were already loaded and selectable. Ballot composition, testing, printing, and nominee allocation remained separate problems.

The arithmetic is also internally incomplete: 14 plus 7 is 21. The data file reaches 28 only by including the unmentioned seven-day voter-reassignment stage. [Calculation comment](/Volumes/4/GitHub/the-catch-site/src/data/missourihousemap202609.mjs:7)

### 4. MEDIUM: Maggard is quoted accurately but characterized incompletely

**Page bytes:** “Maggard's own holding is this: if a legal, sufficient, and timely petition was filed December 9, House Bill 1 did not take effect.” [Story source](/Volumes/4/GitHub/the-catch-site/src/pages/events/missouri-house-map/september-2026.astro:83)

**Record bytes:** *Maggard* actually affirmed that filing alone “did not automatically suspend HB 1.” It separately explained that final certification and judicial review would relate back to the filing date if the petition proved sufficient. [Maggard opinion](https://law.justia.com/cases/missouri/supreme-court/2026/sc101581.html)

**Correct account:** *Maggard* initially allowed HB1 to operate while certification remained unresolved. Its relation-back rule later meant HB1 never took effect once sufficiency became final. Both parts are necessary to explain why the 2025 map was used for the August primary.

### 5. MEDIUM: The story stops citation chasing before the answers

**Page bytes:** The Supreme Court docket “does not, in the lines we saved, say which side each amicus took.” [Story source](/Volumes/4/GitHub/the-catch-site/src/pages/events/missouri-house-map/september-2026.astro:243)

**Record bytes:** The linked cover pages say:

- Maggard and Lombardi: “IN OPPOSITION.” [Brief](https://www.supremecourt.gov/DocketPDF/26/26A304/423232/20260907071817402_Hoskins%20v%20von%20Glahn%20Maggard%20%20Lombardi%20Amicus%20Brief%20FINAL.pdf)
- Campaign Legal Center and ACLU: “IN SUPPORT OF RESPONDENT.” [Brief](https://www.supremecourt.gov/DocketPDF/26/26A304/423230/20260907084907348_Hoskins%20SCOTUS%20Amicus%20FINAL%20File.pdf)
- ACLJ: “IN SUPPORT OF APPLICANT.” [Brief](https://www.supremecourt.gov/DocketPDF/26/26A304/423234/20260907113036756_Missouri%20Amicus%20Purcell%20Final.pdf)
- Florida, Texas, and 18 other states: “IN SUPPORT OF APPLICANT.” [Brief](https://www.supremecourt.gov/DocketPDF/26/26A304/423244/20260907162601252_Missouri%20SCOTUS%20Amicus%20Br%209.7%20File%20Ready.pdf)

**Correct account:** Two amicus groups opposed the stay and two supported it. The docket index alone was not the end of the citation chain.

A related lineage problem appears in “ABC and the Associated Press both wrote.” The manifest says the ABC item is itself an “Associated Press dispatch carried by ABC.” [Manifest](/Volumes/4/GitHub/the-catch-site/checks/manifests/missouri-house-map--september-2026.json:152) Those are not independent confirmations.

### 6. LOW: The statute pin is obsolete, although the result remains the same

**Page bytes:** “Missouri law sets a late-ballot deadline of 5:00 p.m. on the eighth Tuesday before the election.” [Story source](/Volumes/4/GitHub/the-catch-site/src/pages/events/missouri-house-map/september-2026.astro:179)

**Record bytes:** The pinned file is the version effective November 7, 2018. [Pinned statute](/Volumes/4/GitHub/the-catch-site/data/sources/missouri-house-map/rsmo-115-125.txt:1) The live Revisor shows a new version effective August 28, 2026, which still contains the eighth-Tuesday limit. [Current RSMo 115.125](https://revisor.mo.gov/main/OneSection.aspx?section=115.125)

**Correct account:** The deadline proposition survives, but the article should cite the law in force on September 3, 2026.

### Other material propositions

The following are supported: the September 3 date, unanimity, the referendum holding, the December 9 relation-back result, Hoskins’s August 4 rejection, the September 8 order, the 30-day post-vote effective date, the legislative vote totals, the September 19 UOCAVA date, the six-Republican/two-Democrat delegation, and the September 8 Supreme Court docket entries.

The “more than 300,000 signatures” figure is a raw-submission count, not a count of verified valid signatures. The court treated timeliness and minimum signatures as conceded because Hoskins omitted those objections from his certificate. [Missouri opinion](/Volumes/4/GitHub/the-catch-site/data/sources/missouri-house-map/sc101805-opinion.txt:158)

The attorney general’s “Never before in American history” statement is accurately attributed, but it is not independently established. It should remain labeled as an advocate’s superlative pending a nationwide precedent search.

## Layer 2: Completeness discovery

### 7. HIGH: The story omits the litigation sequence that defines what September 3 did and did not decide

**Page bytes:** Under “How the map got here,” the chronology moves from enactment and petition submission to the August 19 judgment, then discusses only the three September 3 ballot rulings. [Story source](/Volumes/4/GitHub/the-catch-site/src/pages/events/missouri-house-map/september-2026.astro:124)

**Record bytes:** The omitted sequence includes:

- March 24: *Luther* held Missouri’s constitution does not prohibit mid-decade congressional redistricting. [Luther opinion](https://law.justia.com/cases/missouri/supreme-court/2026/sc101412.html)
- April 30: the Court of Appeals found Hoskins’s ballot summary unfair and ordered further revisions. [WD88795 opinion](https://law.justia.com/cases/missouri/court-of-appeals/2026/wd88795.html)
- May 12: *Healey/Wise* upheld the map against compactness, contiguity, and population challenges. [Healey opinion](https://law.justia.com/cases/missouri/supreme-court/2026/sc101570.html)
- May 12: *Maggard* held submission alone did not automatically suspend HB1.
- May 27: *NAACP v. Kehoe* upheld the governor’s discretion to call the special session. [NAACP opinion](https://law.justia.com/cases/missouri/supreme-court/2026/sc101541.html)
- The General Assembly and state also sued in federal court to stop the petition process; that case was dismissed on December 8, with reconsideration denied May 11. [Appendix contents](/Volumes/4/GitHub/the-catch-site/data/sources/missouri-house-map/scotus-26A304-appendix-vol1.txt:72)

The article’s own AP pin summarizes this history at lines 25 to 27. [ABC/AP pin](/Volumes/4/GitHub/the-catch-site/data/sources/coverage/abc-missouri-house-map.txt:25)

**Correct account:** Courts had already upheld legislative authority, the special session, and the map under Missouri’s express districting criteria. September 3 did not invalidate the map’s geometry or decide partisan fairness. It held that a sufficient referendum prevented HB1 from taking effect.

### 8. HIGH: A story about a congressional map barely describes the map

**Page bytes:** The substantive account is limited to an AP estimate that about 59 percent of reshaped District 5’s voters were new and that Republicans sought another seat. [Story source](/Volumes/4/GitHub/the-catch-site/src/pages/events/missouri-house-map/september-2026.astro:160)

**Record bytes:** The *Healey* record says the 2025 map:

- Split five counties rather than nine.
- Split 13 municipalities rather than 31.
- Kept Kansas City divided among Districts 4, 5, and 6.
- Unified Clay County and the Northland in District 6.
- Shifted larger Kansas City and Jackson County populations into Districts 4 and 6.
- Changed District 4 from majority rural to majority urban.
- Drew through part of Troost Avenue, while the challengers did not plead racial discrimination.

[Healey opinion](https://law.justia.com/cases/missouri/supreme-court/2026/sc101570.html), [official 2025 map files](https://budplan.oa.mo.gov/redistricting-office/2025-us-congressional-house-maps)

**Correct account:** The political purpose and likely partisan effect belong in the story, but so do the actual geographic changes, the state’s compactness evidence, the challengers’ communities-of-interest objections, and district-by-district voter and demographic movement. AP’s 59 percent estimate needs its method and denominator.

### 9. MEDIUM: Missouri’s own referendum history is omitted

**Page bytes:** The article reproduces the attorney general’s historical superlative but supplies no Missouri congressional-map referendum precedent. [Story source](/Volumes/4/GitHub/the-catch-site/src/pages/events/missouri-house-map/september-2026.astro:231)

**Record bytes:** Missouri’s official 1922 election return identifies Proposition 17 as “Dividing State Into sixteen congressional districts,” with 240,340 yes and 386,522 no votes. [Official return in Appendix Volume 2](/Volumes/4/GitHub/the-catch-site/data/sources/missouri-house-map/scotus-26A304-appendix-vol2.txt:15090)

**Correct account:** Missouri voters rejected a congressional districting measure by referendum in 1922, about 61.7 percent to 38.3 percent. That does not disprove the narrower claim about a court-ordered post-primary change, but it materially changes the historical framing of congressional-map referenda in Missouri.

## Layer 3: Independent reconstruction and attempted disproof

Three central page propositions were actively tested against records outside the article’s admitted set:

1. **State-court holding:** Confirmed. The September 3 opinion supports the article’s account of referendum legality, relation back, the 2022 map, and the 30-day condition.

2. **Exclusive procedural route:** Disproved. The federal court’s own docket and the article’s saved reply establish other emergency proceedings.

3. **Necessary manual reset:** Disputed by sworn record evidence. Boone County’s clerk directly contradicted the claimed need to reassign voters before selecting the 2022 map.

4. **Certificate still unknown:** Disproved by the live Secretary of State page.

No video pins exist in the 38-record manifest. The deterministic check returned `video_pin_count=0`, so no frame extraction or transcript review was applicable.

## Reconstructed story

Missouri Republicans enacted HB1 in September 2025 after President Trump urged mid-decade redistricting aimed at improving the party’s House position. Opponents pursued a referendum and submitted more than 300,000 raw signatures in December.

The map and the process then traveled through several distinct lawsuits. Missouri courts upheld the legislature’s authority to redistrict mid-decade, upheld the governor’s special-session authority, and upheld the map against the state compactness, contiguity, and population claims presented. A separate ballot-title case forced revisions to Hoskins’s original partisan description. *Maggard* allowed HB1 to remain operational while certification was unresolved because submission alone did not suspend it.

Hoskins used the 2025 map for candidate filing and the August primary, then rejected the referendum in the final statutory hour on August 4. On September 3, the Missouri Supreme Court held that his sole stated constitutional objection was wrong. Because he had waived other objections and conceded the petition’s timing and minimum signatures, final sufficiency related back to December 9. HB1 therefore never took effect, and the court ordered the 2022 map used unless later federal relief changes that result.

Operational consequences are real but disputed. The state and Jackson County described weeks of manual and production work. Boone County said both maps were already assigned in the voter system and the 2022 map could simply be selected. Nominee placement, ballot testing, printing, and overseas-ballot transmission remain distinct unresolved tasks.

As of the audit, the Secretary of State lists the referendum as certified Proposition A. The U.S. Supreme Court stay application remains on its docket without a displayed stay order, and federal district court proceedings also remain part of the live procedural picture. If Proposition A passes, HB1 takes effect 30 days after the election, too late to govern that same election absent intervening federal relief.

## Remaining high-value checks

- OCR and visually verify the signed Proposition A certificate, including its issue time and operative language.
- Obtain every post-September 7 order in *Onder* and *Berry*, not merely docket summaries.
- Obtain direct readiness statements from multiple county election authorities and distinguish map selection from ballot production.
- Obtain AP’s method and denominator for the 59 percent District 5 estimate.
- Build an independent 2022-versus-2025 district comparison using official shapefiles, voter assignments, race, population, and prior-election results.
- Research the attorney general’s post-primary historical superlative nationally.
- Resolve nominee allocation under the 2022 districts from authoritative party and election-official records.
- Run and publish the story’s source-state ledger. The built page currently says the state record “has not yet read this story’s sources” and that its first source check has not run.

Audit completed in approximately 25 minutes 47 seconds. No repository files were edited.

VERDICT: INCOMPLETE