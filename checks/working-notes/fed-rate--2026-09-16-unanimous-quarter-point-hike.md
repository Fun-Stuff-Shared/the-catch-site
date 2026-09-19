# Federal funds rate, September 16 record build

Turn: one, record only. Candidate: `cand-1162f11149f5f28a`. Event: `event-fed-rate-2026-09-16-unanimous-quarter-point-hike`. Cutoff: 2026-09-19. The accepted state view links this event after `event-fed-rate-2026-07-29-three-dissents-for-a-hike`; no state command was run.

## Candidate preflight

The ten candidate references all name the September 16 Federal Reserve decision, its advance expectation or its immediate political reaction. The ABC, AP, France 24, Washington Post and The Hill titles and named entities agree on the Federal Reserve, Kevin Warsh, Donald Trump, inflation and the September 16 meeting. No foreign cluster or second dated event was mixed into the seed. The story was therefore minted as one dated moment with `node scripts/new-event.mjs --recipe fomc --date 2026-09-16 --moment unanimous-quarter-point-hike --title 'Federal Reserve raises rates by a quarter point in a unanimous vote'`.

## Step 1 census, one line per search

1. Financing behind packages: searched the statement, implementation note and Federal Reserve listings; no fiscal package or outside financing exists here, while the implementation note supplies the operating decisions.
2. Recipient legal exposure: searched the records for a recipient of money, rights, equity, control, data access or a contract; none is created by this policy-rate decision.
3. Predecessor proceedings: searched the June/July chain and current state view; the July 29 statement is admitted as the operative predecessor, and no court or enforcement proceeding applies.
4. Executed deal instruments: searched the statement and implementation note; there is no deal, while the implementation note is the controlling operational instrument.
5. Headline-number denominator: admitted the statement for the quarter point and 12 to 0 vote, the two FRED daily series for the 16,064-observation history, and the full projection table for participant medians.
6. Changed package components: compared the July and September statements line by line and admitted the full projection table with June comparison rows; the data module exposes the statement redline and September medians.
7. Announcement state: the statement is the committee decision and the implementation note makes the settings effective September 17; the page keeps decision and effective date separate.
8. Policy lineage: admitted the 2025 longer-run goals statement, July policy statement and both daily target series; no new statutory mandate or enforcement system was announced.
9. Claimed consequences: searched statement, transcript and coverage; official records establish the policy mechanism, while consumer and market consequences remain attributed to coverage and are not promoted to primary facts.
10. Official statistics: admitted the 17-page Summary of Economic Projections, its release, both FRED series and both metadata pages; table, unit, frequency, vintage and comparison period are recorded.
11. Legal claims: searched for a statute, rule, order, docket or effective-date dispute; none is part of the rate decision, and the implementation note supplies the only operative effective date.
12. Regulated-system harm: searched the statement, implementation note and framework; no site-specific harm or compliance determination is in this event.
13. Ground-level actors: searched for records from workers, local governments, vendors and affected communities; no institutional primary record was issued, and the AP consumer-effects report is admitted only as coverage.
14. Company relationships: searched for owners, controllers, operators, customers and contractors; no company relationship determines the committee action.
15. Market or price reaction: searched the registry through September 19; ABC's advance FedWatch odds and CNBC's later market interpretation are admitted as attributed market coverage, not as committee causation.
16. Forecast/count denominators: admitted the full projections; 18 participants submitted in September, the vote denominator is 12, and the rate-history denominator is 16,064 daily observations.
17. Repeated-record lineage: read bylines and metadata; the PBS item is Associated Press, candidate AP/ABC wire copies share lineages, and duplicates are not counted as independent records.
18. Uncapturable documents: all cited primaries were captured; the September minutes are not yet published, while the live calendar is pinned and shows the minutes slot blank.
19. Forward search: registry and official listings were searched through September 19; CNBC's September 18 follow-up is admitted, and no minutes, later implementation notice, audit or revised series release appeared.
19b. Legislature search: U.S. Senate and U.S. House official listings were searched from September 16 through September 19; no roll call, floor action, markup or hearing on this FOMC decision was found.
19c. Issuer live pages: the Federal Reserve's live calendar and press-release index were captured on September 19; the calendar is admitted, while the press-release index extraction contained only boilerplate and is typed below.
19d. Standing doctrine and baseline: the 2025 longer-run goals statement and July statement are admitted; ABC's release-morning preview is the third-party baseline.
20. Browser-visible page: deferred until after the record build, then checked by `finish.sh` against built HTML, source targets, labels, subject navigation and state rendering.

Every-time registry search: `capture search monetary20260916a`, `capture search Federal Reserve`, `capture search rate hike`, `capture search Warsh`, and date-bounded variants found the release-day statement, immediate coverage and September 18 follow-up; admitted records are listed in the manifest.

Every-time article-index search: LEANN was queried for the September 16 decision, projections, Warsh and consequences with the IQ endpoint; results were stale or pre-event and added no record beyond the registry census.

Every-time issuer listing search: the Federal Reserve calendar raw HTML names the statement, implementation note, press conference and projections for September 15-16 and has no minutes link; the current press-release page extracted only boilerplate.

Every-time next-series search: DFEDTARU and DFEDTAR were captured through September 19 with their live metadata pages; the next daily observations through the cutoff are present and no later vintage was used.

## Admitted records

Primary and official records, in admission order: September statement; implementation note; projections release; full projections PDF; press-conference transcript; July statement; current FOMC calendar; longer-run goals statement; DFEDTARU and DFEDTAR CSVs; both FRED metadata pages; the August CPI release; the second estimate of second-quarter GDP; the July meeting minutes; and Warsh's Jackson Hole remarks. Coverage: ABC preview; CBS result; Guardian result; The Hill result; Associated Press via PBS on consumers; The Hill on Trump's reaction; CNBC's September 18 follow-up; and the Associated Press next-day reconstruction. All 24 are in the manifest with registry routes and repository pins or an explicit capture-status limitation.

## Story-turn admissions

1. `bls-cpi-2026-09-11`: `capture news` resolved the audit URL to `quarry-wire-scheduled-20260911T160043Z`. The raw HTML and whole extracted text are pinned. Gasoline rose 3.9 percent in August and accounted for more than one-third of the monthly all-items increase; the all-items-less-food-and-energy index rose 2.4 percent over the year. Grade A, answer 4.
2. `bea-gdp-q2-second-estimate-2026-08-26`: `capture news` recovered the release in `capture-oneoff-20260919T212611Z`. The raw HTML and whole extracted text are pinned. Real GDP increased at a 1.5 percent annual rate in the second quarter after 2.1 percent in the first, while real final sales to private domestic purchasers increased 4.2 percent. Grade B, answer 5. The live release is dated August 26; the reader-model gap line retained the audit's August 27 label and was not rewritten.
3. `fomc-minutes-2026-07-29`: `capture news` recovered the minutes in `capture-oneoff-20260919T212611Z`. The raw HTML and whole extracted text are pinned. Most participants supported holding the range and generally wanted more information; several favored a 25-basis-point increase. Grade B, answer 5.
4. `fed-warsh-jackson-hole-2026-08-28`: `capture news` resolved the speech to `quarry-wire-scheduled-20260830T100005Z`. The raw HTML and whole extracted text are pinned. Warsh said underlying inflation had to move toward the objective clearly and at sufficient speed. Grade B, answer 5.
5. `ap-reconstruction-2026-09-17`: `capture news` resolved the URL to `quarry-wire-scheduled-20260917T220025Z`. That run retained whole extracted text and markdown, both pinned here, but its body-receipt ledger has no raw article path. A `--via-archive` recovery on September 19 deduplicated back to the held item instead of producing a new raw receipt. The manifest records this limitation. The article says the gas-price shock could end before tighter borrowing costs slow the economy and reports that the 10-year Treasury yield slipped the next day. Grade B, answer 6.

Story-turn forward search: registry searches for “September 2026 FOMC minutes,” “Federal Reserve October rate hike Warsh,” and “Fed energy shock higher borrowing costs,” bounded from September 16, returned no additional records. Exact-URL registry searches reconfirmed the BLS, Warsh and AP holdings. The pinned official calendar still states the three-week minutes schedule and contains no September 2026 minutes link in its extracted text.

### Story-turn passage tables

| Record | Passage | Disposition |
|---|---|---|
| `bls-cpi-2026-09-11` | Gasoline rose 3.9 percent and accounted for over one-third of the monthly all-items increase. | Used in “What happened” and “What a rate hike can change.” |
| `bls-cpi-2026-09-11` | The all-items-less-food-and-energy index rose 2.4 percent over the year. | Used in “What happened.” |
| `bea-gdp-q2-second-estimate-2026-08-26` | Real GDP increased 1.5 percent annualized after 2.1 percent in the first quarter. | Used in “What happened.” |
| `bea-gdp-q2-second-estimate-2026-08-26` | Real final sales to private domestic purchasers increased 4.2 percent. | Used in “What happened.” |
| `fomc-minutes-2026-07-29` | Most participants supported maintaining the range and wanted more intermeeting information. | Used in “What happened.” |
| `fomc-minutes-2026-07-29` | Several participants favored a 25-basis-point increase. | Used in “What happened.” |
| `fed-warsh-jackson-hole-2026-08-28` | Underlying inflation must move toward the objective clearly and at sufficient speed. | Used in “What happened.” |
| `ap-reconstruction-2026-09-17` | The gas-price shock could be over before higher borrowing costs slowed the economy. | Used in the mechanism and unknowns sections. |
| `ap-reconstruction-2026-09-17` | The 10-year Treasury yield slipped the next day. | Used in “What happened next.” |

## Not admitted this run

- 2026-09-16, Federal Reserve press-release index: captured in `capture-oneoff-20260919T191321Z`, but its extracted text is 369 characters of page boilerplate with no release rows; the live calendar is the usable official listing.
- 2026-09-16, accessible SEP HTML: captured in `capture-oneoff-20260919T191321Z`, held as a duplicate rendering of the admitted 17-page SEP PDF; it supplied no distinct record claim.
- 2025-08-22, monetary-policy framework review overview: captured in `capture-oneoff-20260919T191321Z`, held as a duplicate landing page because the admitted longer-run goals PDF is the operative framework text.
- 2026-09-16, September meeting minutes: unavailable, not a fetch failure; the current official calendar says regular-meeting minutes arrive three weeks after the decision and its September slot was blank on September 19.
- 2026-09-16, ABC Politics/AP advance wire candidate: dedup metadata names the expected hike but has no admitted body in the candidate run; the whole ABC Business preview is admitted instead.
- 2026-09-16, AP English outcome candidate: dedup metadata only in the candidate run; the admitted PBS article carries an AP byline and a whole body.
- 2026-09-16, AP Spanish outcome candidate: dedup metadata only in the candidate run and the same AP decision lineage; not a second independent record.
- 2026-09-16, AP live blog candidate: dedup metadata only, multi-topic live page and no stable decision body in the candidate run.
- 2026-09-16, Washington Post Trump/Warsh candidate: dedup metadata and no article body receipt in the candidate run; The Hill's whole reaction report is admitted.
- 2026-09-16, France 24 items `article_2317` and `article_2433`: 742- and 812-character video-page summaries, below the 1,000-character body threshold and duplicate outcome framing.
- 2026-09-16, AP Spanish preview `article_6154`: whole body but the same AP lineage and pre-decision frame; ABC supplies the independent pre-decision baseline.
- 2026-09-16, CNBC statement-redline item `article_2507`: 611-character subscription stub, too thin to support a comparison; the two primary statements are compared directly.
- 2026-09-16, NBC and UPI previews: pre-decision duplicates found in the registry; held because ABC provides the admitted third-party baseline.
- 2026-09-16 to 2026-09-19, Reuters/CNBC market and prime-rate rows: found in registry searches but held because their causal claims rely on market participants and the page's record turn makes no market-causality claim.
- 2026-09-18, The Hill GOP-senator newsletter: registry receipt had no body path; no legislative action or primary statement was found to pair with it.
- 2026-09-19 audit search, [New York Fed standing-repo FAQ](https://www.newyorkfed.org/markets/repo-agreement-ops-faq): the record audit says it confirms the 4.00 percent standing-repo rate already established by the admitted implementation note; outside the manifest and not admitted in the record turn. **Structure grade: D.**

## Coverage checks

| Record | Check against primaries | Disposition |
|---|---|---|
| ABC preview | Predicted a quarter-point increase and first increase since 2023. The statement confirms the size; the series confirms the prior increase was July 2023. The 94 percent odds remain an attributed CME measure. | Checks on outcome; probability remains outlet-attributed. |
| CBS result | Quarter point, 3.75-4 percent and unanimous vote match the statement. Its line that policymakers expect to hold throughout 2027 overstates a 4.1 percent median and about half of individual projections. | Core result checks; 2027 wording is overbroad. |
| Guardian result | Unanimous quarter point and first since July 2023 match the statement and series. Its majority-one-more-hike line is consistent with the 12 of 18 dots visible in Figure 2. | Checks against primary records. |
| The Hill result | Result matches the statement; its 12 one-hike, four two-hike and two hold dot count matches the 18 circles on SEP page 4. Warsh's no-projection line matches the transcript. | Checks against statement, SEP and transcript. |
| AP via PBS | Decision size and range match the statement. Household effects are AP analysis and named-expert attribution, not committee findings. | Decision checks; effects remain attributed coverage. |
| The Hill reaction | Decision and timing match the release chronology. Trump quotations are reported by the outlet and have no admitted first-party post. | Policy facts check; reaction remains outlet-attributed. |
| CNBC follow-up | “A dose of accommodation,” stronger conditions and the rejection of neutral-rate operational use all appear in the press-conference transcript. Later market odds are attributed to CME. | Quoted policy framing checks; market interpretation remains attributed. |

## Primary passage tables

### `fomc-statement-2026-09-16` — 4 passages

| Passage | Disposition |
|---|---|
| Statement approved by a 12 to 0 vote. | Used: vote table, KPI and record detail. |
| Target range raised one-quarter point to 3.75 to 4 percent; ample-reserves policy continues. | Used: headline, KPI, redline and record detail. |
| Activity solid; uncertainty elevated; domestic spending resilient; productivity and investment strong; labor little changed. | Held unused: record turn has no narrative economic assessment. |
| Inflation elevated; action supports a timelier return to 2 percent; committee says it will deliver price stability. | Held unused: retained for turn-two explanation and gap disposition. |

### `fomc-implementation-2026-09-16` — 6 passages

| Passage | Disposition |
|---|---|
| Reserve-balance rate raised to 3.90 percent effective September 17. | Used: record detail and chronology. |
| New York Desk directed to maintain the 3.75 to 4 percent target range effective September 17. | Used: chronology and implementation record. |
| Standing overnight repo rate set at 4.0 percent. | Held unused: operational detail belongs in show-the-work material. |
| Reverse-repo rate set at 3.75 percent with a $160 billion per-counterparty daily limit. | Held unused: operational detail not needed by the record figures. |
| Treasury-bill purchases, rollovers and reinvestments are specified to maintain ample reserves. | Held unused: balance-sheet mechanics are unchanged supporting detail. |
| Primary-credit rate raised one-quarter point to 4.0 percent effective September 17 after requests from seven Reserve Banks. | Used: record detail; bank list held unused. |

### `fomc-sep-release-2026-09-16` — 1 passage

| Passage | Disposition |
|---|---|
| Attached tables and charts summarize participant projections from the September 15-16 meeting. | Used: provenance for the projections record. |

### `fomc-sep-2026-09-16` — 12 passages

| Passage | Disposition |
|---|---|
| Projections are individual participant views under each person's appropriate-policy path, not a committee forecast. | Held unused: necessary qualification for turn two. |
| September Table 1 real-GDP medians are 2.3, 2.4, 2.2, 2.1 and 2.0 percent. | Used: projections table. |
| Unemployment medians are 4.1 percent for 2026-29 and 4.2 percent longer run. | Used: projections table. |
| PCE inflation medians are 3.7, 2.3, 2.1, 2.0 and 2.0 percent. | Used: projections table and manifest figure. |
| Core PCE medians are 3.4, 2.5, 2.2 and 2.0 percent; no longer-run core projection is collected. | Used: projections table. |
| Federal-funds-rate medians are 4.1, 4.1, 3.9, 3.6 and 3.2 percent. | Used: dek, projections table and manifest figure. |
| June comparison rows give the prior medians for each Table 1 series. | Held unused: available for turn-two comparison. |
| Eighteen participants submitted in September; one omitted 2028 and 2029. | Used: record detail; omission held unused. |
| Figure 2 defines each circle as one participant's judgment of the appropriate rate midpoint. | Held unused: supports any later dot-count explanation. |
| Page 4 visually counts 12 year-end 2026 dots at 4.125, four at 4.375 and two at 3.875. | Held unused: verified visually and used only for the coverage verdict. |
| Figure 4 uncertainty bands are based on historical forecast errors and are not probability statements for a single outcome. | Held unused: no uncertainty-band figure in turn one. |
| Forecast-error discussion says uncertainty is substantial and policy may differ when risks are judged unbalanced. | Held unused: context for turn two, not a record-view figure. |

### `fomc-press-conference-2026-09-16` — 18 passages

| Passage | Disposition |
|---|---|
| Warsh announces a unanimous quarter-point increase and calls it removal of a dose of accommodation. | Held unused: statement carries the decision; framing retained for turn two and coverage check. |
| He says the economy strengthened and broad financial conditions were not restrictive. | Held unused: chair assessment, not a turn-one figure. |
| Labor-market indicators are described as consistent with full employment. | Held unused: no labor figure in this record build. |
| Inflation has been above target for more than five years and remains too high. | Held unused: requires a separate inflation series before use as a computed claim. |
| August estimates are 3.6 percent total PCE, 3.2 percent core PCE and 2.4 percent CPI. | Held unused: estimates in remarks, not the page's official projection table. |
| Warsh says the committee's standard for price stability has not been satisfied. | Held unused: retained for turn-two explanation. |
| Warsh has not offered his own projection and will report colleagues' medians. | Used: projections record detail. |
| He reports 2.3/2.4 GDP, 3.7/2.3 PCE, 4.1 unemployment and 4.1 year-end rates for 2026 and 2027. | Used: projections record detail; full figures come from SEP Table 1. |
| Supply shocks can change relative prices; policy aims to prevent broadening and keep expectations anchored. | Held unused: mechanism for turn two. |
| The committee is not providing forward guidance on the next meeting. | Held unused: no forward-looking narrative in turn one. |
| Warsh says the committee did not lead markets and that repricing is part of the adjustment. | Held unused: market interpretation requires attributed coverage. |
| He identifies lower-income households as especially affected by persistent inflation. | Held unused: chair characterization, pending turn-two reader model. |
| Since July, he says growth strengthened, inflation trends did not improve and geopolitics changed. | Held unused: comparison context for turn two. |
| He says broad financial conditions are not restrictive. | Held unused: policy framing, not a measured figure here. |
| He calls the neutral rate academically useful but not operational for current decisions. | Held unused: used only in the CNBC coverage check. |
| He describes Fed independence as a two-way street and says fiscal and trade officials should stay in their lanes. | Held unused: political-process context outside record-view figures. |
| He discusses foreign spillovers and possible reasons for the long-bond yield move without assigning one cause. | Held unused: no market-causality claim is made. |
| He says policy can restore price stability without harming labor markets and declines an AI-productivity forecast. | Held unused: forward-looking judgment outside turn-one record display. |

### `fomc-statement-2026-07-29` — 5 passages

| Passage | Disposition |
|---|---|
| Statement approved 9 to 3. | Used: redline and chronology. |
| Range held at 3.50 to 3.75 percent; ample-reserves policy continued. | Used: redline and chronology. |
| Activity solid amid Middle East uncertainty; productivity and investment strong; labor little changed. | Used: redline table. |
| Inflation elevated relative to 2 percent, partly from supply shocks; committee promises price stability. | Used: redline table. |
| Hammack, Kashkari and Logan dissent for a quarter-point increase. | Used: record detail and chronology. |

### `fomc-calendar-2026-09-19` — 4 passages

| Passage | Disposition |
|---|---|
| The FOMC holds eight regular meetings a year and others as needed. | Held unused: schedule background. |
| Minutes of regular meetings are released three weeks after the policy decision. | Used: record detail and unavailable-minutes disposition. |
| Raw September listing links statement, implementation note, press conference and projection materials. | Used: census and chronology provenance. |
| Raw September minutes container is blank as of the September 19 capture. | Used: unavailable-minutes disposition. |

### `fomc-longer-run-goals-2025` — 6 passages

| Passage | Disposition |
|---|---|
| The mandate is maximum employment and price stability. | Used: record detail. |
| Maximum employment is not directly measurable and is assessed broadly. | Held unused: framework context for turn two. |
| Two percent PCE inflation is most consistent with the mandate over the longer run. | Held unused: supports the goal referenced in the statement. |
| Policy actions work with lags, so decisions are forward-looking. | Held unused: mechanism for turn two. |
| Changes in the federal-funds target range are the primary means of adjusting stance. | Used: record detail. |
| When goals are not complementary, the committee uses a balanced approach based on shortfalls and time horizons. | Held unused: framework qualification for turn two. |

### `fred-dfedtaru-2026-09-19` — 8 passages

| Passage | Disposition |
|---|---|
| Series begins December 16, 2008 at a 0.25 percent upper limit. | Used: data-module history boundary; held from story view. |
| Upper limit is 5.50 percent through September 18, 2024. | Used: StepChart start. |
| Six reductions from September 19, 2024 through December 11, 2025 end at 3.75 percent. | Used: computed StepChart change points. |
| The upper limit stays 3.75 percent through September 16, 2026. | Used: 279-day computation. |
| Upper limit becomes 4.00 percent September 17. | Used: StepChart and effective chronology. |
| September 18 and 19 observations remain 4.00 percent. | Used: endpoint and fixed vintage. |
| The CSV contains 6,487 numeric daily observations. | Used: computation receipt. |
| All intervening daily values enter the percentile denominator. | Used: percentile computation; individual historical steps are held unused. |

### `fred-dfedtar-2026-09-19` — 5 passages

| Passage | Disposition |
|---|---|
| Series begins September 27, 1982. | Used: computation receipt. |
| The file records the single target through December 15, 2008. | Used: combined-series boundary. |
| December 15, 2008 target is 1.0000 percent. | Used: boundary verification. |
| The CSV contains 9,577 numeric daily observations. | Used: computation receipt and manifest input. |
| All 9,577 observations enter the historical percentile denominator; individual rate changes are not page chronology events. | Used for computation; old change rows held unused. |

### `fred-dfedtaru-metadata-2026-09-19` — 4 passages

| Passage | Disposition |
|---|---|
| Latest observation is 4.00 percent on September 19. | Used: record detail and endpoint check. |
| Units are percent, not seasonally adjusted; frequency is daily, seven days. | Used: record detail and census metadata. |
| Source is the Federal Reserve Board and release is FOMC Press Release. | Used: provenance in records list. |
| The series represents the upper limit and each daily update is effective that day. | Used: record definition. |

### `fred-dfedtar-metadata-2026-09-19` — 5 passages

| Passage | Disposition |
|---|---|
| Last observation is 1.0000 percent on December 15, 2008. | Used: combined-series boundary. |
| Units are percent, not seasonally adjusted; frequency is daily, seven days. | Used: census metadata. |
| Pre-1994 values come from the Thornton working paper and one April 1986 span was corrected manually. | Held unused: source-method detail does not change the figure. |
| Data from 1994 onward derive from FOMC transcripts and statements. | Held unused: source-method detail retained in record. |
| Effective December 16, 2008 the target is reported as a range and readers are directed to DFEDTARU/L. | Used: combined-series boundary. |

Primary passage-table total: 78 passages across 12 admitted primary or official records.

## Gap-list dispositions

The following list is the complete output of `node skills/catch-event-page/scripts/pin_gaps.mjs fed-rate/2026-09-16-unanimous-quarter-point-hike` after the record page and data module were built. Every printed line is dispositioned. Re-run date: 2026-09-19.

### fomc-statement-2026-09-16 (data/sources/fed-rate/fomc-statement-2026-09-16.txt): 1 not on the page
- L9 number `2 percent`: day's policy action will support a timelier return to the Committee's 2 percent goal. The Committee will deliver price stability. **Disposition: held unused: retained for the turn-two inflation explanation.**

### fomc-implementation-2026-09-16 (data/sources/fed-rate/fomc-implementation-2026-09-16.txt): 5 not on the page
- L9 name `Federal Reserve System`: The Board of Governors of the Federal Reserve System voted unanimously to raise the interest rate paid on reserve balances to 3.90 percent, effective September **Disposition: out of scope: institutional or account name, not a distinct event fact.**
- L10 name `Federal Reserve Bank`: - As part of its policy decision, the Federal Open Market Committee voted to direct the Open Market Desk at the Federal Reserve Bank of New York, until instruct **Disposition: out of scope: institutional or account name, not a distinct event fact.**
- L10 name `System Open Market Account`: - As part of its policy decision, the Federal Open Market Committee voted to direct the Open Market Desk at the Federal Reserve Bank of New York, until instruct **Disposition: out of scope: institutional or account name, not a distinct event fact.**
- L13 number `$160 billion`: an offering rate of 3.75 percent and with a per-counterparty limit of $160 billion per day. **Disposition: held unused: operating-tool detail is not needed by the turn-one figures.**
- L14 number `3 years`: nd, if needed, other Treasury securities with remaining maturities of 3 years or less to maintain an ample level of reserves. **Disposition: held unused: operating-tool detail is not needed by the turn-one figures.**

### fomc-sep-release-2026-09-16 (data/sources/fed-rate/fomc-sep-release-2026-09-16.txt): 1 not on the page
- L4 name `Federal Reserve Board`: Federal Reserve Board and Federal Open Market Committee release economic projections from the September 15-16 FOMC meeting **Disposition: used: record provenance and the projections source list.**

### fomc-sep-2026-09-16 (data/sources/fed-rate/fomc-sep-2026-09-16.txt): 29 not on the page
- L44 number `2.6`: real GDP 2.3 2.4 2.2 2.1 2.0 2.2–2.4 2.2–2.6 2.1–2.3 2.0–2.2 2.0–2.2 2.1–2.6 2.0–2.9 1.8–2.6 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L614 number `2.63`: 2.63− 2.88− 3.13− 3.38− 3.63− 3.88− 4 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L614 number `2.88`: 2.63− 2.88− 3.13− 3.38− 3.63− 3.88− 4.13− 4.38− **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L614 number `3.13`: 2.63− 2.88− 3.13− 3.38− 3.63− 3.88− 4.13− 4.38− **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L614 number `3.63`: 2.63− 2.88− 3.13− 3.38− 3.63− 3.88− 4.13− 4.38− **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L614 number `3.88`: 2.63− 2.88− 3.13− 3.38− 3.63− 3.88− 4.13− 4.38− **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L614 number `4.13`: 3− 2.88− 3.13− 3.38− 3.63− 3.88− 4.13− 4.38− **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L614 number `4.38`: 2.88− 3.13− 3.38− 3.63− 3.88− 4.13− 4.38− **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L615 number `2.87`: 2.87 3.12 3.37 3.62 3.87 4.12 4 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L615 number `3.12`: 2.87 3.12 3.37 3.62 3.87 4.12 4.37 4.62 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L615 number `3.37`: 2.87 3.12 3.37 3.62 3.87 4.12 4.37 4.62 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L615 number `3.62`: 2.87 3.12 3.37 3.62 3.87 4.12 4.37 4.62 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L615 number `3.87`: 2.87 3.12 3.37 3.62 3.87 4.12 4.37 4.62 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L615 number `4.12`: 2.87 3.12 3.37 3.62 3.87 4.12 4.37 4.62 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L615 number `4.37`: 7 3.12 3.37 3.62 3.87 4.12 4.37 4.62 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L615 number `4.62`: 3.12 3.37 3.62 3.87 4.12 4.37 4.62 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L760 name `Forecast Uncertainty`: definitions of uncertainty and risks in economic projections, see the box “Forecast Uncertainty.” **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L952 number `0.75`: 0.75 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L953 number `0.50`: 0.50 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L954 number `0.25`: 0.25 **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L1167 number `70 percent`: less than a 70 percent confidence interval if the confidence interval has been truncated at **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L1205 number `10.17016`: https://dx.doi.org/10.17016/FEDS.2017.020. **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L1251 number `2 percent`: respectively, 3 percent and 2 percent. If the uncertainty at- sistent with the projections for the fe **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L1256 number `4.4 percent`: within a range of 1.6 to 4.4 percent in the current year, 1.2 to sense of the uncertainty around the fu **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L1257 number `4.8 percent`: 4.8 percent in the second year, 0.9 to 5.1 percent in the third funds rate ge **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L1257 number `5.1 percent`: 4.8 percent in the second year, 0.9 to 5.1 percent in the third funds rate generated by the uncertainty about the ma **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L1258 number `5.3 percent`: year, and 0.7 to 5.3 percent in the fourth year. The corre- nomic variables as well as add **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L1260 number `3.0 percent`: tion would be 1.0 to 3.0 percent in the current year, 0.3 to shocks to the economy. **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**
- L1261 number `3.8 percent`: 3.7 percent in the second year, 0.2 to 3.8 percent in the third If at some point in the future the confidence **Disposition: held unused: range, axis, confidence-band or forecast-error detail outside the median projection table.**

### fomc-press-conference-2026-09-16 (data/sources/fed-rate/fomc-press-conference-2026-09-16.txt): 14 not on the page
- L29 number `2 percent`: Committee’s 2 percent goal. This Committee will deliver price stability. **Disposition: held unused: press-conference context reserved for the turn-two reader model.**
- L62 number `two days`: two days. **Disposition: held unused: press-conference context reserved for the turn-two reader model.**
- L84 number `3.6 percent`: likely was around 3.6 percent in August. Core PCE and CPI prices are running at about 3.2 **Disposition: held unused: press-conference context reserved for the turn-two reader model.**
- L86 number `2.4 percent`: percent and 2.4 percent respectively. Too many categories are still posting increases above 3 **Disposition: held unused: press-conference context reserved for the turn-two reader model.**
- L240 name `Edward Lawrence`: Edward Lawrence. **Disposition: out of scope: reporter name does not change the event record.**
- L268 name `Elizabeth Schulze`: Elizabeth Schulze. **Disposition: out of scope: reporter name does not change the event record.**
- L318 number `seven weeks`: first question, I think a more important one, what transpired in the seven weeks since we **Disposition: held unused: press-conference context reserved for the turn-two reader model.**
- L378 name `Steve Liesman`: Steve Liesman. **Disposition: out of scope: reporter name does not change the event record.**
- L447 name `Zach Halaschak`: Zach Halaschak. **Disposition: out of scope: reporter name does not change the event record.**
- L471 name `Brian Cheung`: Brian Cheung. **Disposition: out of scope: reporter name does not change the event record.**
- L567 name `Nick Timiraos`: Nick Timiraos. **Disposition: out of scope: reporter name does not change the event record.**
- L597 name `Neil Irwin`: Neil Irwin. **Disposition: out of scope: reporter name does not change the event record.**
- L672 number `two years`: achievement out to 2029, another two years. And I'm wondering how you can square those two **Disposition: held unused: press-conference context reserved for the turn-two reader model.**
- L742 name `Jennifer Schonberger`: Okay, for the last question we'll go to Jennifer Schonberger, in the **Disposition: out of scope: reporter name does not change the event record.**

### fomc-statement-2026-07-29 (data/sources/fed-rate/fomc-statement-2026-07-29.txt): 1 not on the page
- L9 number `2 percent`: Inflation remains elevated relative to the Committee's 2 percent goal, in part reflecting supply shocks that have driven price increas **Disposition: used: the July inflation line appears in the computed statement comparison.**

### fomc-calendar-2026-09-19 (data/sources/fed-rate/fomc-calendar-2026-09-19.txt): 0 not on the page

### fomc-longer-run-goals-2025 (data/sources/fed-rate/fomc-longer-run-goals-2025.txt): 2 not on the page
- L8 name `Monetary Policy Strategy`: Monetary Policy Strategy **Disposition: used: identifies the admitted framework record.**
- L40 number `2 percent`: that inflation at the rate of 2 percent, as measured by the annual change in the price index for **Disposition: held unused: the 2 percent framework passage supports turn-two context.**

### fred-dfedtaru-2026-09-19 (data/sources/fed-rate/DFEDTARU-2026-09-19.csv): 10 not on the page
- L4 number `0.25`: 2008-12-18,0.25 **Disposition: held unused: historical change point enters the full-series computation but not the 2024-26 chart window.**
- L2558 number `0.50`: 2015-12-16,0.50 **Disposition: held unused: historical change point enters the full-series computation but not the 2024-26 chart window.**
- L2922 number `0.75`: 2016-12-14,0.75 **Disposition: held unused: historical change point enters the full-series computation but not the 2024-26 chart window.**
- L3287 number `1.50`: 2017-12-14,1.50 **Disposition: held unused: historical change point enters the full-series computation but not the 2024-26 chart window.**
- L3469 number `2.00`: 2018-06-14,2.00 **Disposition: held unused: historical change point enters the full-series computation but not the 2024-26 chart window.**
- L3574 number `2.25`: 2018-09-27,2.25 **Disposition: held unused: historical change point enters the full-series computation but not the 2024-26 chart window.**
- L3658 number `2.50`: 2018-12-20,2.50 **Disposition: held unused: historical change point enters the full-series computation but not the 2024-26 chart window.**
- L5030 number `3.25`: 2022-09-22,3.25 **Disposition: held unused: historical change point enters the full-series computation but not the 2024-26 chart window.**
- L5114 number `4.50`: 2022-12-15,4.50 **Disposition: held unused: historical change point enters the full-series computation but not the 2024-26 chart window.**
- L5212 number `5.00`: 2023-03-23,5.00 **Disposition: held unused: historical change point enters the full-series computation but not the 2024-26 chart window.**

### fred-dfedtar-2026-09-19 (data/sources/fed-rate/DFEDTAR-2026-09-19.csv): 63 not on the page
- L4 number `10.2500`: 1982-09-29,10.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L6 number `10.0000`: 1982-10-01,10.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L12 number `9.5000`: 1982-10-07,9.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L55 number `9.0000`: 1982-11-19,9.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L80 number `8.5000`: 1982-12-14,8.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L187 number `8.6250`: 1983-03-31,8.6250 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L242 number `8.7500`: 1983-05-25,8.7500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L292 number `9.2500`: 1983-07-14,9.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L298 number `9.4375`: 1983-07-20,9.4375 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L320 number `9.5625`: 1983-08-11,9.5625 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L355 number `9.3750`: 1983-09-15,9.3750 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L551 number `10.5000`: 1984-03-29,10.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L649 number `11.0000`: 1984-07-05,11.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L663 number `11.2500`: 1984-07-19,11.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L684 number `11.5000`: 1984-08-09,11.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L821 number `8.1250`: 1984-12-24,8.1250 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L852 number `8.2500`: 1985-01-24,8.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L873 number `8.3750`: 1985-02-14,8.3750 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L968 number `7.7500`: 1985-05-20,7.7500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1020 number `7.6875`: 1985-07-11,7.6875 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1061 number `7.8125`: 1985-08-21,7.8125 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1077 number `8.0000`: 1985-09-06,8.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1259 number `7.2500`: 1986-03-07,7.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1285 number `7.3125`: 1986-04-02,7.3125 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1304 number `6.7500`: 1986-04-21,6.7500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1335 number `6.8125`: 1986-05-22,6.8125 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1349 number `6.8750`: 1986-06-05,6.8750 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1385 number `6.3750`: 1986-07-11,6.3750 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1426 number `5.8750`: 1986-08-21,5.8750 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1563 number `6.0000`: 1987-01-05,6.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1678 number `6.5000`: 1987-04-30,6.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L1741 number `6.6250`: 1987-07-02,6.6250 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L2053 number `7.0000`: 1988-05-09,7.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L2097 number `7.4375`: 1988-06-22,7.4375 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L2106 number `7.5000`: 1988-07-01,7.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L2245 number `8.3125`: 1988-11-17,8.3125 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L2273 number `8.6875`: 1988-12-15,8.6875 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L2329 number `9.1250`: 1989-02-09,9.1250 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L2334 number `9.3125`: 1989-02-14,9.3125 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L2344 number `9.7500`: 1989-02-24,9.7500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L2426 number `9.8125`: 1989-05-17,9.8125 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L2497 number `9.0625`: 1989-07-27,9.0625 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3051 number `6.2500`: 1991-02-01,6.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3139 number `5.7500`: 1991-04-30,5.7500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3237 number `5.5000`: 1991-08-06,5.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3275 number `5.2500`: 1991-09-13,5.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3323 number `5.0000`: 1991-10-31,5.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3329 number `4.7500`: 1991-11-06,4.7500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3359 number `4.5000`: 1991-12-06,4.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3373 number `4.0000`: 1991-12-20,4.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3484 number `3.7500`: 1992-04-09,3.7500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3568 number `3.2500`: 1992-07-02,3.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L3632 number `3.0000`: 1992-09-04,3.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L4196 number `3.5000`: 1994-03-22,3.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L4252 number `4.2500`: 1994-05-17,4.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L6947 number `2.5000`: 2001-10-02,2.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L6982 number `2.0000`: 2001-11-06,2.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L7017 number `1.7500`: 2001-12-11,1.7500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L7347 number `1.2500`: 2002-11-06,1.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L7578 number `1.0000`: 2003-06-25,1.0000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L7990 number `1.5000`: 2004-08-10,1.5000 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L8116 number `2.2500`: 2004-12-14,2.2500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**
- L8214 number `2.7500`: 2005-03-22,2.7500 **Disposition: held unused: historical daily target enters the 16,064-observation denominator but is not a chronology event.**

### fred-dfedtaru-metadata-2026-09-19 (data/sources/fed-rate/fred-DFEDTARU-2026-09-19.txt): 1 not on the page
- L12 name `Federal Reserve System`: Board of Governors of the Federal Reserve System (US) **Disposition: used: publisher provenance in the official-series record.**

### fred-dfedtar-metadata-2026-09-19 (data/sources/fed-rate/fred-DFEDTAR-2026-09-19.txt): 5 not on the page
- L4 number `1.0000`: 2008-12-15: 1.0000 | **Disposition: used: series boundary or publisher provenance in the admitted record.**
- L12 name `Federal Reserve System`: Board of Governors of the Federal Reserve System (US) **Disposition: used: series boundary or publisher provenance in the admitted record.**
- L16 number `7.3125`: values from April 2, 1986 - April 20, 1986 were adjusted manually to 7.3125%. Data from 1994 to the present are derived from FOMC meeting transcr **Disposition: held unused: metadata correction note does not change the displayed calculation.**
- L16 name `Federal Reserve Bank`: September 27, 1982 - December 31, 1993" (Thornton, Federal Reserve Bank of St. **Disposition: held unused: working-paper provenance remains in the record detail.**
- L18 name `Federal Funds Target Rate`: Board of Governors of the Federal Reserve System (US), Federal Funds Target Rate (DISCONTINUED) [DFEDTAR], retrieved from FRED, Federal Reserve Bank of St. **Disposition: held unused: working-paper provenance remains in the record detail.**
132 lines to disposition

Gap total: 132 lines, all dispositioned.

## Story patch round, 2026-09-19

This is the single patch round over story commit `b75257dd`. The reader-model answers and section order are unchanged. New passages are graded in the reader model before use.

### Patch census lines

1. New York Times DealBook, “Trump Looks Isolated on Interest Rates,” September 17: `capture news` resolved the credentialed URL to `capture-oneoff-20260919T222037Z`; the whole body and raw HTML are pinned as `nyt-dealbook-trump-fed-rates-2026-09-17`. Used for B-grade answer 7.
2. Reuters Breakingviews, “Warsh’s reluctant turn restarts Fed war,” September 16: `capture search` resolved the credentialed URL to `quarry-wire-scheduled-20260916T220017Z`; the whole body and raw HTML are pinned as `reuters-breakingviews-fed-war-2026-09-16`. Admitted as C-grade context, not story-view prose.
3. Reuters, “Fed hikes rates in search of 'timelier' drop in inflation, sees more tightening ahead,” September 16: `capture search` resolved the credentialed URL to `quarry-wire-scheduled-20260916T220017Z`; the whole body and raw HTML are pinned as `reuters-fed-decision-2026-09-16`. Admitted as C-grade market context, not story-view prose.
4. Dow Jones Newswires, “Bessent Outlines Reasons the Fed Might Want to Avoid a Rate Hike,” August 31: the registry did not return the WSJ live-card URL. `capture news` captured the complete syndicated item from Bitget in `capture-oneoff-20260919T230928Z`; the text identifies itself as part of a Wall Street Journal live-coverage event. It is pinned as `dow-jones-bessent-rate-hike-2026-08-31` and used for B-grade answers 4 and 7.
5. Bureau of Economic Analysis, “Personal Income and Outlays, July 2026”: `capture news` resolved the official URL to `capture-oneoff-20260919T214649Z`; the whole body and raw HTML are pinned as `bea-personal-income-outlays-july-2026`. Used for B-grade answer 6.
6. Congressional Budget Office, “Estimating the Cost of Combat Operations Against Iran”: the direct fetch in `capture-oneoff-20260918T083201Z` returned 403, then the capture registry recovered the September 16 Wayback body. The recovered raw HTML and whole text are pinned as `cbo-iran-cost-2026-09-15`. Used for B-grade answers 4, 5 and 6.
7. Financial Times, “Federal Reserve defies Donald Trump with first rate rise since 2023”: the September 19 fetch in `capture-oneoff-20260919T223809Z` returned HTTP 200 but extracted only a 1,068-character subscription offer headed “Subscribe to read.” **Dated refusal: 2026-09-19, fetch `capture-oneoff-20260919T223809Z`, `article body unavailable behind subscription shell`; not admitted.**
8. MarketScreener URL named by interrogation item 15: `capture news` fetched it in `capture-oneoff-20260919T230928Z`, but extraction produced only a 471-character Bloomberg-video description and none of the claimed gold, Canadian-dollar or shorter-yield moves. Not admitted; Reuters' whole decision report supplies the bounded same-day record.

### Patch passage tables

| Record | Passage | Disposition |
|---|---|---|
| `nyt-dealbook-trump-fed-rates-2026-09-17` | Trump said he told Warsh to vote with the board because it would not change the result. | Used in “The pressure around the decision.” |
| `nyt-dealbook-trump-fed-rates-2026-09-17` | Trump described Warsh as facing a “very tough board” and called the board hostile. | Used, attributed to DealBook, in the pressure section. |
| `reuters-breakingviews-fed-war-2026-09-16` | Breakingviews says Bessent had sought lower Treasury yields since August. | Held as C-grade commentary and record-list context. |
| `reuters-breakingviews-fed-war-2026-09-16` | Breakingviews says the policy dispute had renewed after the increase. | Held as C-grade commentary; the story uses direct statements for answer 7. |
| `reuters-fed-decision-2026-09-16` | The 10-year yield was 4.958 percent after exceeding 5 percent on September 14. | Held as C-grade market context. |
| `reuters-fed-decision-2026-09-16` | The dollar rose, Treasury yields were largely steady and stocks were mostly higher after the announcement. | Held as C-grade same-day market context. |
| `dow-jones-bessent-rate-hike-2026-08-31` | Bessent said a supply shock traditionally does not call for higher rates unless second- or third-order effects appear. | Used in the pressure section after the story first explains the Fed's mechanism. |
| `dow-jones-bessent-rate-hike-2026-08-31` | Bessent said core inflation remained restrained. | Used as his attributed side of the policy dispute. |
| `bea-personal-income-outlays-july-2026` | The next personal-income-and-outlays release, for August, was scheduled for September 30 at 8:30 a.m. EDT. | Used in “What we do not know yet.” |
| `bea-personal-income-outlays-july-2026` | BEA's national, industry and regional annual updates were scheduled to begin September 30. | Used to identify the GDP-revision date in unknowns. |
| `cbo-iran-cost-2026-09-15` | Lower oil and gas shipments, refining disruption and Red Sea shipping disruption raised energy and transport costs. | Used in the mechanism section. |
| `cbo-iran-cost-2026-09-15` | Energy added an estimated 2.3 percentage points to the annualized Q2 PCE inflation rate. | Used in the mechanism section. |
| `cbo-iran-cost-2026-09-15` | Core PCE inflation was estimated to remain elevated longer because energy costs pass into nonenergy prices more slowly. | Used in the mechanism section. |

### Re-dispositioned interrogation items

- Item 10: fixed. DealBook is admitted and its B-grade direct-pressure passage appears in the pressure section.
- Item 13: records admitted. Reuters' yield and Treasury-campaign context is C-grade and remains in the records rather than the story view.
- Item 15: bounded record admitted. Reuters' same-day report is retained, while the unsupported multi-asset details are held because the named MarketScreener fetch did not contain them and the reader model grades this context C.
- Item 21: fixed for A/B material. DealBook, Reuters and the Dow Jones/WSJ live-card text are admitted; the DealBook and Bessent passages appear in the story. The FT article is the dated refusal above. Additional Bloomberg and CNN bodies were not needed after the graded claims were supplied.

### Red-team finding dispositions

1. Major, gasoline denominator: fixed. The KPI now says the 3.9 percent increase is seasonally adjusted from July.
2. Major, PCE path hidden in detail: fixed. Story mode now states 3.7 percent for 2026, up from 3.6 in June, 2.3 percent for 2027 and 2 percent in 2029.
3. Major, lower-income household burden: fixed. “Who feels it” now includes the B-grade transcript passage about households without financial assets, home equity or retirement-plan equity living from paychecks.
4. Major, September 30 releases: fixed. The official BEA release is admitted and unknowns names August PCE and annual national-account updates, including GDP revisions.
5. Major, CBO mechanism: fixed. The archived CBO primary is admitted and the mechanism section traces oil, refining, shipping, the 2.3-point Q2 contribution and delayed core-PCE pass-through.
6. Minor, source authority: fixed. The projection distribution cites the SEP primary rather than The Hill, uses the SEP's end-of-year endpoint definition rather than turning dots into meeting-by-meeting promises, and the independence passage cites the press-conference transcript rather than The Hill. Both outlet records remain in the records list for their distinct coverage uses.

### Entailment correction

The first patch-scoped entailment run returned `NOT-ENTAILED` for the sentence that translated the 12/4/2 year-end dot distribution into “a single hike,” “two hikes” and “a pair of holds.” The SEP defines dots as individual end-of-year endpoints, not meeting sequences, and its text extraction does not preserve the visual count. The story now states only the entailed concept: Figure 2 contains several individual year-end endpoints around the median and does not establish a meeting-by-meeting path.

No Critical findings were reported. All five Major findings were fixed. The one Minor was fixed and is dispositioned here as required.
