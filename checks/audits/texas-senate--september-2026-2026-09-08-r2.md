# Dispositions (keystone, 2026-09-08 23:50Z, main 124b65d0)

| # | Finding | Verified at the bytes | Disposition |
|---|---|---|---|
| V1 | Donor table mixed bank interest, the Gemini exchange, and memo cross-references; Winklevoss amounts doubled | Yes: 2000587.csv rows SA17.5422-5425 are Gemini sale proceeds, SA17.5451-5454 carry memo code X, 2009096.csv SA17.5477 is JP Morgan interest. My own earlier recount summed the same rows, so the page and the check agreed with each other and both were wrong | Admitted and fixed: the table is now read from the nine CSVs at build time, memo rows, interest, and exchange rows excluded; Winklevoss $5.0 million each once; proof paragraph states every exclusion with dollars |
| V2 | Rural-hospital check said the study was not a Texas count; the study's Scenario 3 table lists TX 30, 25.6 percent | Yes: navigant-rural-pdf-2019-08.txt line 597, a pin the previous rework already held | Admitted and fixed: the check now says the number traces to a model result and names what the ad drops (the scenario, the word risk, Talarico's unspecified payment rates) |
| V3 | "Two 2019 votes" omits final House passage May 1 | Yes: hjrnl-86r-86RDAY56FINAL.txt line 281 Record 839, Talarico in the nays at line 300 | Admitted and fixed: three votes, table and prose, with the May 1 cite |
| V4 | Status block says the source check has not run | Yes: the Luna read for this story (pid 59286) has not finished | Typed on the page: the line fills when the read completes; rerun stage-story --luna-read after |
| C1 | Texas Public Opinion Research poll (48 to 42, margin 3.3) excluded | Yes: fetched and pinned tpor-poll-2026-08-27; 1,000 likely voters, August 21 to 24, published August 27 | Admitted and fixed: third row in the poll table and the lead visual, typed as a self-published tracking series; "every poll" wording corrected to two of three |
| C2 | "Cost thousands in more taxes" claim unchecked; Hoover paper retrievable | Yes: PDF fetched from americashealthcarefuture.org; abstract lines 27-30 and sponsor line 36 | Admitted and fixed: new claim check with the paper's 2050 financing scenarios and its sponsor line; open-questions bullet removed |
| C3 | "Other five committees" presented as the universe | Yes: recount under the page's own method gives 17 committees, $16,254,658.26, matching the auditor | Admitted and fixed: computed from the snapshot at build time; page states 17 committees and that the chart shows the five largest |
| C4 | Story starts at the filing | AP September 1 fetched and pinned; the "leadership asked" claim is not in that text and is not used | Fixed from the pins: one paragraph on the tested ad and the digital plan, cited to AP |
| C5 | Maxwell ad endpoint quotes an accusation unexamined | Yes: transcript line 4 carries further accusations | Fixed by narrowing: the ad is described, its accusations typed as unchecked and overlapping the impeachment case that ended in acquittal |

The story is materially incomplete. Its core filing account is sound, but its donor table is misleading, its rural-hospital fact check contradicts the cited study, and its polling and outside-spending universes omit records that change the reader’s understanding.

Audit target: [published HTML](/Volumes/4/GitHub/the-catch-site/dist/events/texas-senate/september-2026/index.html:1), 140,132 bytes, SHA-256 `a3dc6bc31274d470cfb4e0dad0b5004253d12a1efbc532225ad9b07e94fddf3b`. I read the complete article, manifest, source module, transcripts, and all 120 one-second frames from the three saved MP4s.

## 1. Verification

### V1. High: “Who pays MAGA Inc.” mixes donors with bank interest, an exchange, and duplicate memo entries

- Page bytes 58,369-60,590 label the table “Who pays MAGA Inc.” and report:
  - “Gemini Trust Company $11,518,449.91.”
  - “Tyler Winklevoss $10,023,720.88; Cameron Winklevoss $10,013,208.94.”
  - “JP Morgan Chase Bank, N.A. $6,800,003.01.”
- The saved FEC bytes say otherwise:
  - [2000587.csv](/Volumes/4/GitHub/the-catch-site/data/sources/texas-senate/fec-maga-inc-f3x/2000587.csv:7), bytes 2,175-2,496: `BITCOINS SOLD VIA GEMINI TRUST - PURCHASER UNKNOWN`.
  - The FEC explains that an exchange handling a sale to an unknown purchaser is not considered a contributor. [FEC bitcoin-liquidation guidance](https://www.fec.gov/help-candidates-and-committees/reporting-examples/liquidating-bitcoins/)
  - [2009096.csv](/Volumes/4/GitHub/the-catch-site/data/sources/texas-senate/fec-maga-inc-f3x/2009096.csv:6), bytes 1,948-2,215: `NON-CONTRIBUTION: INTEREST`.
  - [2000587.csv](/Volumes/4/GitHub/the-catch-site/data/sources/texas-senate/fec-maga-inc-f3x/2000587.csv:21), bytes 6,388-6,702 is a Cameron Winklevoss memo row marked `X`, referring back to the Gemini transaction. The equivalent Tyler memo row is line 25.
- The table doubles those memo-attributed amounts. The non-memo totals are $5,011,860.44 for Tyler and $5,006,604.47 for Cameron, not about $10 million each.
- Correct account: Schedule A line 17 includes more than contributions, including interest and liquidation proceeds. Gemini and JPMorgan should not appear as “who pays,” and memo entries must not be added to their corresponding cash entries. Actual contributors can be discussed as account funders, but none can be tied to this Texas invoice.

### V2. High: the rural-hospital fact check directly contradicts the underlying Navigant report

- Page bytes 75,509-75,592: “That is a national scenario under Medicare rates, not a count of 30 Texas hospitals.”
- The underlying study’s Scenario 3 state table says exactly: `TX 30 25.6%`. [Navigant/Guidehouse study, page 11](https://guidehouse.com/-/media/www/site/insights/healthcare/2019/rural-hospital-public-option.pdf)
- The study modeled a severe scenario in which 50 percent of employer-covered lives and 85 percent of individual-market lives shift to a Medicare-rate public option. It classified 30 Texas rural hospitals as high risk, not as certain to close.
- Talarico’s saved platform separately proposes an affordable public option and says it would “improve Medicaid and Medicare reimbursement rates” for hospitals. [Campaign source](/Volumes/4/GitHub/the-catch-site/data/sources/texas-senate/talarico-issue-health-care.txt:1)
- Correct account: the ad’s number is traceable to a real Texas-specific model result. The ad strips away the scenario and converts “high risk” into a simpler closure warning. The record does not establish that Talarico’s underspecified plan uses the study’s enrollment and reimbursement assumptions.

### V3. Moderate: “two 2019 votes” omits a third recorded no vote

- Page bytes 71,473-71,515: “Accurate as a description of two 2019 votes.”
- The page counts the April 30 second-reading vote and May 25 conference report, but omits final House passage on May 1.
- [House Journal](/Volumes/4/GitHub/the-catch-site/data/sources/texas-senate/hjrnl-86r-86RDAY56FINAL.txt:281), bytes 16,538-16,616: `SBi2 was passed by (Record 839): 109 Yeas, 36 Nays, 2 Present, not voting.`
- The nays list includes Talarico at bytes 17,899-17,970.
- Correct account: Talarico voted no at least three times during House consideration of the 2019 bill: April 30, May 1, and May 25. He later voted for the 2023 and 2025 property-tax measures. The ad remains selective about his later record, but the article is also selective about 2019.

### V4. Moderate publication-state conflict

- Page bytes 135,190-135,249: “The first check of this story’s sources has not run yet.”
- Elsewhere the page says the videos and sources were checked on September 8.
- Correct account: the page must distinguish article-level research from its automated source-revision check. As published, its own status block says that check remains unperformed, so the page cannot represent the source-history layer as complete.

## 2. Completeness discovery

### C1. High: the polling claim is literally bounded to selected holdings but misleading against the broader record

- Page bytes 45,004-45,158 say the saved tracker runs from Talarico +4 to Paxton +2 and concludes: “Within those margins, no leader.”
- Page bytes 46,967-47,005 add: “inside the margin in every poll we hold.”
- A publicly available August 27 poll, released before this article, reported Talarico 48 percent, Paxton 42 percent, with a stated margin of error of 3.3 points. [Texas Public Opinion Research](https://texaspublicopinionresearch.substack.com/p/new-poll-in-texas-general-election?r=plxs0)
- Correct account: polling remained mixed and no single poll established the race’s true leader, but the article’s selected universe excluded a six-point Talarico result that did not fit its stated “within the margin” convention. “Every poll we hold” is literally defensible and materially misleading.

### C2. High: an explicit ad claim and its retrievable source were left unchecked

- The health ad’s saved frame says “COST THOUSANDS IN MORE TAXES,” but the page’s claim-check section does not evaluate it.
- Page bytes 75,594-75,699 instead say the October 20, 2020 Hoover paper could not be retrieved.
- The paper is currently retrievable. Its abstract models middle-income increases above $2,000 under broad income-tax financing and typical-family increases above $3,900 under payroll-tax financing. [Hoover-affiliated paper](https://americashealthcarefuture.org/wp-content/uploads/2020/10/Study-The-Budget-and-Tax-Effects-of-a-Federal-Public-Option-After-COVID-19.pdf)
- It also states that the work was supported by the Partnership for America’s Health Care Future.
- Correct account: the source supports a conditional model result, not a demonstrated cost of Talarico’s proposal. The article should explain the assumptions and sponsorship instead of listing the source as unavailable and omitting the claim.

### C3. Moderate: the outside-money chart presents a selected top group as the committee universe

- Page bytes 37,585-37,645: “The other five committees had already reported $15.3 million.”
- Page bytes 38,648-38,711: “Sum of the five committees other than MAGA Inc.: $15,264,097.00.”
- Recomputing the saved original, general-election Texas Senate rows received before September 5 finds 17 non-MAGA committees totaling $16,254,658.26.
- The omitted $990,561.26 is 6.09 percent of non-MAGA outside spending. It includes committees such as Forward Blue and The Lowdown:
  - [FEC bulk row](/Volumes/4/GitHub/the-catch-site/data/sources/texas-senate/fec-independent-expenditure-2026-snapshot-2026-09-08.csv:5051): `Forward Blue PAC`, election `G`, Texas, $15,000 row and $50,000 aggregate.
  - [FEC bulk row](/Volumes/4/GitHub/the-catch-site/data/sources/texas-senate/fec-independent-expenditure-2026-snapshot-2026-09-08.csv:12914): `THE LOWDOWN`, election `G`, Texas, $9,006.17.
- Correct account: MAGA Inc.’s $10 million was the largest single filing. The displayed five were the largest selected peers, not all other committees.

### C4. Moderate: the story starts after the immediate precursor to the buy

- The narrative begins at page byte 13,588 with September 5.
- By September 1, reporting said MAGA Inc. had already tested the rural-hospital ad, had been asked by Senate Republican leadership to commit Texas resources, and was considering digital distribution amid expensive late television inventory. [Associated Press republication](https://www.local10.com/news/politics/2026/09/01/with-elections-nearing-battleground-republicans-still-waiting-for-trump-to-open-his-campaign-wallet/)
- Texas Tribune reporting also described Talarico’s prior advertising advantage and Paxton’s need for outside support. [August 20 context](https://www.texastribune.org/2026/08/20/texas-us-senate-race-donors-ken-paxton-james-talarico/)
- Correct account: the filing was the public commitment, not the beginning of the planning or the pressure that preceded it. The leadership-request claim is sourced reporting, not a verified motive, and should be labeled that way.

### C5. Moderate: the endpoint introduces another attack ad without checking its material claims

- Page bytes 80,753-80,820 introduce Talarico’s September 8 Maxwell ad, then quote Maxwell’s accusation at bytes 80,897-80,980.
- The saved full transcript also says Paxton traded favors with Nate Paul, Maxwell reported Paxton to the FBI, and Paxton fired him. [Transcript](/Volumes/4/GitHub/the-catch-site/data/sources/texas-senate/talarico-maxwell-ad-2026-09-08.txt:4)
- The Texas House’s Article VI alleged retaliation against whistleblowers, but those were impeachment allegations, and the Senate later acquitted Paxton. [Texas House Journal](https://journals.house.texas.gov/HJRNL/88R/HTML/88RDAY73FINAL.HTM)
- Correct account: either keep this as a narrowly described new campaign ad, or verify its accusations, state the impeachment outcome, and obtain Paxton’s response. Quoting one accusation while leaving the ad’s broader assertions unexamined is an unbounded endpoint.

## Reconstructed story

On September 4, MAGA Inc. committed $10 million to Del Ray Media for connected-TV and digital messages in the Texas Senate general election. Its September 5 Form 24 correctly reports $5 million opposing James Talarico and $5 million supporting Ken Paxton. This was independent expenditure spending, not a campaign donation, and the filing certifies no candidate coordination.

The filing was the first major public commitment by MAGA Inc., but not the beginning of the effort. Before it appeared, MAGA Inc. had reportedly tested the rural-hospital attack and had faced requests for Texas support while Talarico held a substantial advertising advantage. In the saved FEC universe, MAGA Inc. brought total reported general-election independent expenditures involving the two candidates to about $26.25 million across 18 committees. The other 17 accounted for about $16.25 million.

The ads combine supported facts with aggressive framing:

- Talarico voted against the 2019 property-tax bill on at least three recorded House votes. His later votes for 2023 and 2025 tax-relief bills make a one-year account selective.
- The trillion-dollar tax language is not tied to a Talarico bill. Its cited figures describe national revenue effects associated with federal tax legislation.
- His Social Security position would raise payroll-tax exposure on earnings above $400,000, not tax benefit checks.
- The 30-hospital figure exists in a sponsored Navigant model, but only under its severe Scenario 3. The ad does not establish that Talarico’s proposal matches that scenario.
- The “thousands in more taxes” statement likewise comes from a sponsored national model with specific future financing assumptions. It is not a cost estimate of Talarico’s published plan.
- Paxton publicly proposed the listed deductions and child credit, but the available plan did not state implementation mechanics, offsets, or a budget score.

The race was competitive, but the page’s poll set was incomplete. Available polls ranged from narrow Paxton advantages to a six-point Talarico lead. That supports “unsettled and competitive,” not “inside the margin in every public poll.”

MAGA Inc.’s account was well funded, but its Schedule A line 17 table cannot be called a donor table without classifying transactions. Interest is not a donation, Gemini was an exchange for unknown purchasers, and Winklevoss memo entries cannot be added a second time. No available record assigns any particular contributor’s dollars to the Texas buy.

## Remaining high-value checks

- Obtain the exact Punchbowl and Thomson Reuters items shown on the tax-ad slate.
- Build a complete poll inventory through the article’s publication timestamp, including original toplines, sponsors, samples, and field dates.
- Reconcile FEC obligations with AdImpact bookings and actual delivered impressions.
- Obtain Del Ray placement records showing markets, platforms, audiences, and delivery dates.
- Rebuild the MAGA Inc. receipt table using amendment status, transaction links, memo codes, and receipt type.
- Check the Maxwell ad against testimony, employment records, the whistleblower litigation, the Senate judgment, and a current Paxton response.
- Run and record the page’s source-revision check, which the published state currently says has not run.

VERDICT: INCOMPLETE