# Jobs, October 2 record build

Turn: one, record only. Candidate: `cand-066a054608f29a45`. Event: `event-jobs-2026-10-02-september-payrolls-rise-29000`. Cutoff: 2026-10-03.

## Candidate preflight

The accepted candidate row names nine items, and every one is this release. Six are the October 2 afternoon sweep: Associated Press, PBS NewsHour, UPI, USA Today, the Washington Post, and the Wall Street Journal. Three are the morning sweep, saved before 8:30 a.m. Eastern: the ABC preview, the CNBC preview, and the Reuters preview. The declined sibling `cand-2c06491099e0d30a` is the same cluster, and its four rows (The Hill, CBS News, CNBC, NPR) are in the coverage list. The morning Associated Press body at the same URL is a preview and is not the post-release dispatch.

## Step 1 census, one line per search

1. Financing behind packages: not this event. Searched the September release and the bureau newsroom page saved October 3; no appropriation, contract, or disbursement.
2. Recipient legal exposure: not this event. No actor receives money, equity, or a contract in the release.
3. Predecessor proceedings: the predecessor is the August Employment Situation, already pinned at `data/sources/bls-empsit-2026-08.txt`. This release revises July from +21,000 to -10,000 and August from +162,000 to +133,000.
4. Executed deal instruments: none. No contract in the release or the coverage.
5. Headline-number denominator: payrolls are seasonally adjusted establishment counts, in thousands on the series file. The unemployment rate is unemployed people divided by the labor force (7.1 million unemployed, rate 4.2 percent). The prior-twelve average is the release's own 45,000; the series file divides 543 thousand by 12 and gets 45,250. The establishment significance bar is about 122,000 and the household bar is about 650,000.
6. Changed package components: the two revised months. July -31,000 and August -29,000, combined 60,000 lower. No other package.
7. Announcement state: published statistics, not a proposal. Embargo lifted 8:30 a.m. Eastern, Friday, October 2, 2026. The next publication is named, not yet issued.
8. Policy lineage: no new mandate. The technical note restates the two standing surveys. The commissioner's statement series ended January 6, 2023; the page at that address says it is the final one.
9. Claimed consequences: the release does not state a consequence beyond the counts. Coverage compares 29,000 with surveys of 84,000 and 90,000. No causal chain beyond that comparison is in the pins.
10. Official statistics: Employment Situation, September 2026, tables A and B and table A-9, seasonally adjusted unless a footnote says otherwise. Vintage of the payroll file is the October 2 ALFRED extract, which matches the October 3 FRED extract at 159,044 thousand. Revisions: two monthly revisions, then the annual benchmark, as the release's own question 3 states.
11. Legal claims: none in the release. The technical note says neither survey identifies legal status, so an immigrant count is not available from this release.
12. Regulated-system harm: not this event. No site-specific compliance finding.
13. Ground-level actors: the release's own groups are on the page (Black workers 7.0 percent, adult men 3.9, adult women 3.6, teenagers 14.5, White 3.6, Asian 2.9, Hispanic 4.7, long-term unemployed 1.9 million, part time for economic reasons 4.5 million). No separate union, city, or tribal record in the span.
14. Company relationships: none. Industry changes are establishment-survey aggregates, not named firms.
15. Market or price reaction: `capture search "payrolls" --since 2026-10-01` returned a CNBC note that Treasury yields inched higher as investors awaited the report, and a Wall Street Journal card that the dollar eased ahead of the data. Both are before the release. No post-release price record was in that search. Neither is admitted.
16. Forecast denominators: Dow Jones via CNBC, 84,000 jobs and a 4.1 percent rate, published October 1 and repeated October 2. Reuters survey, 90,000 jobs, range 35,000 to 180,000, and a 4.1 percent rate, published before 8:30 a.m. Eastern. FactSet via CBS, 90,000. Associated Press, about 90,000. ABC preview, 84,000. These are surveys of economists, not bureau figures, and they are not in the KPI strip.
17. Repeated-record lineage: the PBS page is bylined Paul Wiseman, Associated Press, and matches the AP dispatch. One lineage, two pins. The other outlets are their own accounts.
18. Uncapturable documents: the Wall Street Journal live card returned 535 characters and The Washington Post story returned 582. Both are subscription stubs. A force fetch on October 3 did not return a body. The September commissioner's statement does not exist; the address still titled Commissioner's Statement is the January 6, 2023 final statement.
19. Forward search: the release and the calendar both name the October Employment Situation for Friday, November 6, 2026, at 8:30 a.m. Eastern. No later release was out by the October 3 cutoff.
19b. Legislature search: `capture search "Employment Situation" --since 2026-10-01` returned one GovInfo item, a Joint Economic Committee hearing record from an earlier sweep on September 10, not a vote in this span. A request to congress.gov on October 3 returned HTTP 403, a challenge page, so no roll call was read there. No October 2 vote on this release was found.
19c. Issuer live pages: the bureau newsroom page `https://www.bls.gov/bls/newsrels.htm`, saved in `capture-oneoff-20261003T055113Z`, leads its latest-releases list with the sentence that payroll employment rose by 29,000 and the unemployment rate was 4.2 percent. The release calendar was saved the same morning.
19d. Standing doctrine and baseline: the technical note in the September release is the standing description of the household survey (about 60,000 households) and the establishment survey (about 119,000 businesses and agencies). The baseline the release changes is the August release, pinned earlier. No separate third-party assessment dated before October 2 was added beyond the three previews.
20. Browser-visible page: checked by `finish.sh` after the build.

Every-time registry search: `capture search "September jobs report" --since 2026-10-01 --limit 20` returned two items, the October 1 CNBC preview (admitted) and a Wall Street Journal "what to watch" card from October 1 (not admitted; the Journal does not let its pages be saved). The release-day stories were already in `quarry-wire-scheduled-20261002T160027Z` and are admitted from that sweep or from the October 3 refetch.
Every-time article-index search: `leann search news-articles-clean-v1` for the September 2026 release returned five hits, all July or August preview and reaction pieces, the newest indexed September 7, 2026. The October 2 release is not in that index. The registry is the coverage list.
Every-time issuer listing search: newsroom page and the Employment Situation calendar, both saved October 3. The newsroom repeats the September sentence. The calendar lists September on October 2 at 8:30 a.m. and October on November 6 at 8:30 a.m.
Every-time next-series search: PAYEMS, UNRATE, U6RATE, LNS11300060, and CES0500000003 saved October 3, each through September 2026. The next Employment Situation is November 6, 2026.

## Admitted records

bls-empsit-2026-09, bls-empsit-t09-2026-09, bls-empsit-schedule-2026-10-03, bls-empsit-2026-08, fred-payems-2026-10-03, fred-unrate-2026-10-03, fred-u6-2026-10-03, fred-prime-age-2026-10-03, fred-ahe-2026-10-03, alfred-payems-2026-10-02, cnbc-september-jobs-preview, reuters-september-jobs-preview, abc-september-jobs-preview, ap-september-jobs, pbs-september-jobs, usatoday-september-jobs, cbs-september-jobs, cnbc-september-jobs, npr-september-jobs, upi-september-jobs, thehill-september-jobs.

## Not admitted this run

- 2026-10-02, Wall Street Journal live card: captured, 535 characters. The Journal does not let its pages be saved.
- 2026-10-02, Washington Post story: captured, 582 characters. The Post does not let its pages be saved.
- 2023-01-06, Commissioner's Statement at the old address: captured in `capture-oneoff-20261003T055113Z`. It says it is the final statement. It is not a September 2026 statement.
- 2026-10-02, 10:13 UTC, the morning Associated Press body at the same URL: a preview written before the release. The post-release dispatch, saved later the same day, is the admitted AP record.
- 2026-09-30, ADP National Employment Report: not admitted. USA Today mentions a private count of 90,000; the ADP release is not in this capture. Audit finding 5, https://mediacenter.adp.com/2026-09-30-ADP-National-Employment-Report-Private-Sector-Employment-Increased-by-90,000-Jobs-in-September, checks/audits/jobs--2026-10-02-september-payrolls-rise-29000-2026-10-03-record-audit.md.
- 2026-10-02, CNBC "Treasury yields inch higher as investors await": pre-release market note. Not an account of the 29,000 figure.
- 2026-10-02, Wall Street Journal "Dollar eases ahead of payrolls": pre-release, and the Journal does not let its pages be saved.
- 2026-10-01, Wall Street Journal "what to watch" card naming the jobs report: the Journal does not let its pages be saved.
- 2026-09-29, BLS Job Openings and Labor Turnover for August: not admitted. Audit finding 4, https://www.bls.gov/news.release/archives/jolts_09292026.pdf, checks/audits/jobs--2026-10-02-september-payrolls-rise-29000-2026-10-03-record-audit.md. The audit's account is that August hires changed little at 5.2 million and that September gross hiring is scheduled for November 3.
- 2026-10, St. Louis Fed flash report on the September unemployment rate: not admitted. Audit finding 2, https://www.stlouisfed.org/on-the-economy/2026/oct/flash-report-unemployment-rises-slightly-job-growth-slows-september, checks/audits/jobs--2026-10-02-september-payrolls-rise-29000-2026-10-03-record-audit.md. The audit's account is an unrounded rate of 4.1413 percent in August and 4.1754 percent in September.
- 2026-09-16, Federal Reserve policy statement: not admitted. Audit finding 6, https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm, checks/audits/jobs--2026-10-02-september-payrolls-rise-29000-2026-10-03-record-audit.md. The audit's account is that the committee raised the policy-rate range by a quarter point.
- 2026, Federal Reserve FOMC calendar: not admitted. Audit finding 6, https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm, checks/audits/jobs--2026-10-02-september-payrolls-rise-29000-2026-10-03-record-audit.md. The audit's account is that the next meeting is October 27–28.
- 2026-08, BEA personal income and outlays: not admitted. Audit finding 6, https://www.bea.gov/news/2026/personal-income-and-outlays-august-2026, checks/audits/jobs--2026-10-02-september-payrolls-rise-29000-2026-10-03-record-audit.md. The audit's account is 3.4 percent annual PCE inflation.
- 2026-03-31, Dallas Fed estimate of payroll growth that holds unemployment steady: not admitted. Audit finding 5, https://www.dallasfed.org/research/economics/2026/0331, checks/audits/jobs--2026-10-02-september-payrolls-rise-29000-2026-10-03-record-audit.md. The audit says the estimate approached zero in late 2025 and is not a verified September 2026 threshold.
- 2026-09, Glassdoor employee confidence index: not admitted. Named in the audit's source check, https://api.glassdoor.com/blog/glassdoor-employee-confidence-index-september-2026/, checks/audits/jobs--2026-10-02-september-payrolls-rise-29000-2026-10-03-record-audit.md. A confidence index, not a payroll or unemployment count.
- 2026, BLS preliminary benchmark notice: not admitted. Named in the audit's remaining unknowns, https://www.bls.gov/news.release/prebmk.htm, checks/audits/jobs--2026-10-02-september-payrolls-rise-29000-2026-10-03-record-audit.md. The audit says the notice's −79,000 is a March estimate, not a September revision.

## Primary passage tables

### `bls-empsit-2026-09`: 24 passages

| Passage | Disposition |
|---|---|
| Embargo until 8:30 a.m. (ET) Friday, October 2, 2026 | Used: opening block and chronology. |
| Both nonfarm payroll employment (+29,000) and the unemployment rate (4.2 percent) changed little | Used: dek, KPI, opening block. |
| Employment in all major industries changed little over the month | Used: industry block. |
| Unemployment rate 4.2 percent and 7.1 million unemployed, changed little; rate in a 4.1 to 4.3 range since March | Used: opening block. |
| Black unemployment rate 7.0 percent increased; adult men 3.9, adult women 3.6, teenagers 14.5, White 3.6, Asian 2.9, Hispanic 4.7 showed little change | Used: household block. |
| Long-term unemployed essentially unchanged at 1.9 million, 27.1 percent of unemployed | Used: household block. |
| Participation 61.8 percent and employment-population ratio 59.2 percent changed little; little net change since January | Used: household block. The "since January" clause is in the same sentence and is not given its own line. |
| Part time for economic reasons changed little at 4.5 million | Used: household block. |
| People not in the labor force who want a job changed little at 5.8 million | Held unused: the page carries the unemployed count and the marginally attached count instead. |
| Marginally attached decreased by 236,000 to 1.5 million; discouraged workers little changed at 414,000 | Used: household block. |
| Payrolls +29,000 following an average monthly gain of 45,000 over the prior 12 months | Used: where-the-month-sits block. |
| Health care +17,000, prior average +33,000; ambulatory +13,000; hospitals +12,000; nursing and residential care -9,000 | Used: industry block. |
| Construction +11,000, prior average 10,000; nonresidential specialty trade contractors +12,000 | Held unused for the prior average and the specialty-trade line. September's +11,000 is used. |
| Manufacturing +9,000, up 72,000 since December 2025; plastics and rubber +5,000; machinery +5,000 | Held unused for the December comparison and the two product lines. September's +9,000 is used. |
| Financial activities -7,000, down 129,000 since May 2025, insurance carriers -90,000 | Used for the -7,000 and the 129,000. The insurance split is held unused. |
| Other major industries little changed, including mining, wholesale, retail, transportation, information, professional and business services, social assistance, leisure and hospitality, other services, and government | Used as the "every major industry" sentence. The named list is not repeated. |
| Hourly earnings up 5 cents, 0.1 percent, to $37.81; 3.0 percent over the year; production workers up 7 cents to $32.60 | Used for all employees. Production workers held unused. |
| Workweek remained at 34.4 hours; manufacturing 40.6 and overtime 3.0; production workers 33.8 | Used for 34.4. The other two workweeks held unused. |
| July revised down 31,000, from +21,000 to -10,000; August revised down 29,000, from +162,000 to +133,000; combined 60,000 lower | Used: revision block and the proof table. |
| October Employment Situation scheduled Friday, November 6, 2026, 8:30 a.m. Eastern | Used: chronology. |
| Establishment change of about 122,000 is statistically significant; household threshold about 650,000 | Used: earnings block. |
| Summary table B: private +46, government -17, information -10, temporary help -10.9, diffusion private 49.0 after 57.6, three-month nonfarm average 51 | Used: diffusion block and the three-month line. |
| Table A-15 U-6 row ends 7.7 then 7.6 | Used: U-6 block. |
| Questions on undocumented immigrants, revisions, births and deaths, unemployment insurance, and weather | Held unused: definitions. The page uses only the two significance thresholds from that section. |

### `bls-empsit-t09-2026-09`: 2 passages

| Passage | Disposition |
|---|---|
| Total multiple jobholders, seasonally adjusted September column 8,986 thousand, 5.5 percent of the employed; August 8,805 | Used: multiple-jobholder block. |
| Other rows (age groups, class of worker, self-employed) | Held unused: not the comparison this page makes. The August story used this same table for multiple jobholders. |

### `bls-empsit-schedule-2026-10-03`: 2 passages

| Passage | Disposition |
|---|---|
| September 2026, Oct. 02, 2026, 08:30 AM | Used: opening block. |
| October 2026, Nov. 06, 2026, 08:30 AM | Used: chronology. |

### `bls-empsit-2026-08`: 2 passages

| Passage | Disposition |
|---|---|
| Total nonfarm payroll employment increased by 162,000 in August, and the unemployment rate was unchanged at 4.1 percent | Used: revision block, as the figure this release revises. |
| The rest of the August release | Held unused: that release has its own story. This page uses it only for the number being revised. |

### `fred-payems-2026-10-03`: 3 passages

| Passage | Disposition |
|---|---|
| 2026-08-01,159015 and 2026-09-01,159044 | Used: the chart and the computed block. The difference is 29, matching the release. |
| Changes from October 2025 through September 2026, including four declines, sum 496 thousand | Used: data module and the proof receipt. Twelve-month average 41,333 jobs. Prior twelve, September 2025 through August 2026, sum 543 thousand, average 45,250. Calendar 2026 sums 612 thousand, average 68,000. |
| Observations before October 2025 | Held unused: outside the chart window. |

### `fred-unrate-2026-10-03`: 2 passages

| Passage | Disposition |
|---|---|
| 2026-09-01,4.2 | Used: confirms the release rate. The page cites the release for the rate. |
| Earlier months | Held unused: the page's rate history is the release's "4.1 to 4.3 since March," not this file's full run. |

### `fred-u6-2026-10-03`: 2 passages

| Passage | Disposition |
|---|---|
| 2026-08-01,7.7 and 2026-09-01,7.6 | Used: U-6 block, with table A-15. |
| Earlier months | Held unused. |

### `fred-prime-age-2026-10-03`: 2 passages

| Passage | Disposition |
|---|---|
| 2026-07-01,83.4, 2026-08-01,83.4, 2026-09-01,83.7 | Used: prime-age block for September and August. July is in the data module and not given its own sentence. |
| Earlier months | Held unused. |

### `fred-ahe-2026-10-03`: 2 passages

| Passage | Disposition |
|---|---|
| 2025-09-01,36.70 and 2026-09-01,37.81 | Used: the computed year-over-year change is 3.02 percent. The release states 3.0 percent. |
| Earlier months in the wage-growth array | Held unused on the page. They are in the data module as arithmetic on this file and are not sentences. |

### `alfred-payems-2026-10-02`: 1 passage

| Passage | Disposition |
|---|---|
| 2026-09-01,159044, the release-day vintage, matching the October 3 series | Used: records list. The page's levels cite the October 3 series, which matches this vintage. |

## Gap list (`pin_gaps.mjs`)

`node skills/catch-record/scripts/pin_gaps.mjs jobs/2026-10-02-september-payrolls-rise-29000` printed the lines below. `bls-empsit-2026-08` printed zero lines. Counts before the cap: release 3,557, table A-9 366, calendar 3, payroll series 424, unemployment rate 13, U-6 42, prime-age participation 158, hourly earnings 234, release-day payroll vintage 424.

| Record | Line | Disposition |
|---|---|---|
| bls-empsit-2026-09 | L74 name `Export Price Indexes` `Export Price Indexes` | Out of scope: a link in the bureau website menu, not a figure in the release. |
| bls-empsit-2026-09 | L108 name `Workplace Injuries` `Workplace Injuries` | Out of scope: a link in the bureau website menu, not a figure in the release. |
| bls-empsit-2026-09 | L126 name `Data Tools` `Data Tools` | Out of scope: a link in the bureau website menu, not a figure in the release. |
| bls-empsit-2026-09 | L248 number `2.9 percent` `2.9 percent` | Used: the household paragraph names the Asian rate as 2.9 percent. |
| bls-empsit-2026-09 | L249 number `4.7 percent` `4.7 percent` | Used: the household paragraph names the Hispanic rate as 4.7 percent. |
| bls-empsit-2026-09 | L264 number `5.8 million` `5.8 million` | Held unused: people who want a job but were not counted as unemployed. The page carries the 7.1 million unemployed and the drop in the marginally attached. |
| bls-empsit-2026-09 | L265 number `4 weeks` `4 weeks` | Out of scope: the survey's definition of active job search, not a new count. |
| bls-empsit-2026-09 | L287 number `10,000 jobs` `10,000 jobs` | Held unused: construction's average over the prior 12 months. The page carries September's construction change of 11,000. |
| bls-empsit-2026-09 | L290 number `72,000` `72,000` | Held unused: manufacturing's gain since December 2025. The page carries September's change of 9,000. |
| bls-empsit-2026-09 | L306 number `0.2 percent` `0.2 percent` | Held unused: the production-worker hourly raise. The page carries the all-employee raise of 5 cents to $37.81. |
| bls-empsit-2026-09 | L306 number `$32.60` `$32.60` | Held unused: production and nonsupervisory hourly earnings. The page carries all-employee earnings of $37.81. |
| bls-empsit-2026-09 | L309 number `40.6 hours` `40.6 hours` | Held unused: the manufacturing workweek. The page carries the all-employee workweek of 34.4 hours. |
| bls-empsit-2026-09 | L310 number `3.0 hours` `3.0 hours` | Held unused: manufacturing overtime. The page's 3.0 percent is the all-employee wage change, not this hours figure. |
| bls-empsit-2026-09 | L311 number `33.8 hours` `33.8 hours` | Held unused: the production-worker workweek. The page carries 34.4 hours for all employees. |
| bls-empsit-2026-09 | L333 number `274,226` `274,226` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L333 number `275,282` `275,282` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L333 number `275,415` `275,415` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L333 number `275,554` `275,554` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L334 number `171,261` `171,261` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L334 number `169,094` `169,094` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L334 number `169,777` `169,777` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L334 number `170,262` `170,262` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L335 number `62.5` `62.5` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L335 number `61.4` `61.4` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L335 number `61.6` `61.6` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L336 number `163,656` `163,656` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L336 number `162,177` `162,177` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L336 number `162,746` `162,746` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L336 number `163,152` `163,152` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L337 number `58.9` `58.9` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L337 number `59.1` `59.1` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L338 number `7,605` `7,605` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L338 number `6,916` `6,916` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L338 number `7,031` `7,031` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L340 number `102,964` `102,964` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L340 number `106,189` `106,189` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L340 number `105,638` `105,638` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L340 number `105,292` `105,292` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L343 number `16 years` `16 years` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L346 number `19 years` `19 years` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L346 number `13.3` `13.3` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L346 number `12.1` `12.1` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L346 number `14.1` `14.1` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L348 number `6.3` `6.3` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L359 number `3,524` `3,524` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L359 number `3,309` `3,309` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L359 number `3,245` `3,245` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L359 number `3,200` `3,200` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L361 number `2,336` `2,336` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L361 number `2,123` `2,123` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L361 number `2,137` `2,137` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L361 number `2,289` `2,289` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L365 number `5 weeks` `5 weeks` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L365 number `2,232` `2,232` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L365 number `1,960` `1,960` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L365 number `2,098` `2,098` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L366 number `14 weeks` `14 weeks` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L366 number `2,356` `2,356` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L366 number `2,049` `2,049` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L366 number `2,077` `2,077` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L366 number `1,956` `1,956` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L367 number `26 weeks` `26 weeks` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L367 number `1,286` `1,286` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L367 number `1,157` `1,157` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L367 number `1,147` `1,147` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L367 number `1,189` `1,189` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L368 number `1,815` `1,815` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L368 number `1,944` `1,944` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L371 number `4,594` `4,594` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L371 number `4,804` `4,804` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L371 number `4,390` `4,390` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L371 number `4,501` `4,501` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L372 number `3,129` `3,129` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L372 number `2,815` `2,815` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L372 number `2,896` `2,896` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L373 number `1,428` `1,428` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L373 number `1,263` `1,263` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L373 number `1,267` `1,267` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L374 number `22,728` `22,728` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | L374 number `22,770` `22,770` | Held unused: a summary-table cell for an earlier month or a category the page does not carry (reasons for unemployment, duration bands, part-time splits, population levels). The page carries the September prose figures. |
| bls-empsit-2026-09 | and 3477 more in this record; a transcript is read whole, these are the lines the page does not carry | Held unused: the rest of the release is earlier-month columns, detailed industry rows, and technical-note material beyond the two significance thresholds the page quotes. |
| bls-empsit-t09-2026-09 | L74 name `Export Price Indexes` `Export Price Indexes` | Out of scope: a link in the bureau website menu, not a figure in the release. |
| bls-empsit-t09-2026-09 | L108 name `Workplace Injuries` `Workplace Injuries` | Out of scope: a link in the bureau website menu, not a figure in the release. |
| bls-empsit-t09-2026-09 | L126 name `Data Tools` `Data Tools` | Out of scope: a link in the bureau website menu, not a figure in the release. |
| bls-empsit-t09-2026-09 | L225 number `16 years` `16 years` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L225 number `163,894` `163,894` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L225 number `162,667` `162,667` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L225 number `163,439` `163,439` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L225 number `163,656` `163,656` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L225 number `162,771` `162,771` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L225 number `162,264` `162,264` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L225 number `162,177` `162,177` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L225 number `162,746` `162,746` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L225 number `163,152` `163,152` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L226 number `19 years` `19 years` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L226 number `5,744` `5,744` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L226 number `5,317` `5,317` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L226 number `5,609` `5,609` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L226 number `5,350` `5,350` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L226 number `5,313` `5,313` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L226 number `5,380` `5,380` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L226 number `5,373` `5,373` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L226 number `5,535` `5,535` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L227 number `17 years` `17 years` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L227 number `2,162` `2,162` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L227 number `2,062` `2,062` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L227 number `2,035` `2,035` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L227 number `2,111` `2,111` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L227 number `1,850` `1,850` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L227 number `1,856` `1,856` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L228 number `3,201` `3,201` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L228 number `3,682` `3,682` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L228 number `3,282` `3,282` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L228 number `3,471` `3,471` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L228 number `3,510` `3,510` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L228 number `3,464` `3,464` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L228 number `3,594` `3,594` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L228 number `3,499` `3,499` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L229 number `158,530` `158,530` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L229 number `156,922` `156,922` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L229 number `158,121` `158,121` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L229 number `158,047` `158,047` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L229 number `157,421` `157,421` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L229 number `156,951` `156,951` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L229 number `156,797` `156,797` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L229 number `157,373` `157,373` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L229 number `157,617` `157,617` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L230 number `24 years` `24 years` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L230 number `14,044` `14,044` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L230 number `14,657` `14,657` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L230 number `14,384` `14,384` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L230 number `14,183` `14,183` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L230 number `14,463` `14,463` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L230 number `14,507` `14,507` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L230 number `14,433` `14,433` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L230 number `14,573` `14,573` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L230 number `14,540` `14,540` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L231 number `144,486` `144,486` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L231 number `142,265` `142,265` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L231 number `143,737` `143,737` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L231 number `143,872` `143,872` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L231 number `142,936` `142,936` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L231 number `142,421` `142,421` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L231 number `142,405` `142,405` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L231 number `142,752` `142,752` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L231 number `143,126` `143,126` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L232 number `54 years` `54 years` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L232 number `106,214` `106,214` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L232 number `104,304` `104,304` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L232 number `105,450` `105,450` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L232 number `105,879` `105,879` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L232 number `105,089` `105,089` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L232 number `104,401` `104,401` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L232 number `104,674` `104,674` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L232 number `104,668` `104,668` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L232 number `105,101` `105,101` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L233 number `34 years` `34 years` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L233 number `36,095` `36,095` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L233 number `36,267` `36,267` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L233 number `36,506` `36,506` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | L233 number `36,057` `36,057` | Held unused: another row of table A-9. The page uses the multiple-jobholder row, 8,986 thousand in September and 5.5 percent of the employed. |
| bls-empsit-t09-2026-09 | and 286 more in this record; a transcript is read whole, these are the lines the page does not carry | Held unused: the rest of table A-9 is age and class-of-worker rows. The page uses the multiple-jobholder row. |
| bls-empsit-schedule-2026-10-03 | L74 name `Export Price Indexes` `Export Price Indexes` | Out of scope: a link in the bureau website menu, not a figure in the release. |
| bls-empsit-schedule-2026-10-03 | L108 name `Workplace Injuries` `Workplace Injuries` | Out of scope: a link in the bureau website menu, not a figure in the release. |
| bls-empsit-schedule-2026-10-03 | L126 name `Data Tools` `Data Tools` | Out of scope: a link in the bureau website menu, not a figure in the release. |
| fred-payems-2026-10-03 | L4 number `01,302` `01,302` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L5 number `01,300` `01,300` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L7 number `01,305` `01,305` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L8 number `01,304` `01,304` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L9 number `01,306` `01,306` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L10 number `01,310` `01,310` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L11 number `01,314` `01,314` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L13 number `01,315` `01,315` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L14 number `01,316` `01,316` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L15 number `01,317` `01,317` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L16 number `01,318` `01,318` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L19 number `01,319` `01,319` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L21 number `01,323` `01,323` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L22 number `01,328` `01,328` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L23 number `01,332` `01,332` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L24 number `01,336` `01,336` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L25 number `01,341` `01,341` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L26 number `01,344` `01,344` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L27 number `01,348` `01,348` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L28 number `01,350` `01,350` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L29 number `01,354` `01,354` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L30 number `01,361` `01,361` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L31 number `01,366` `01,366` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L32 number `01,371` `01,371` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L33 number `01,375` `01,375` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L34 number `01,378` `01,378` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L35 number `01,379` `01,379` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L36 number `01,380` `01,380` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L37 number `01,381` `01,381` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L38 number `01,383` `01,383` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L39 number `01,385` `01,385` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L40 number `01,389` `01,389` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L41 number `01,393` `01,393` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L42 number `01,397` `01,397` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L43 number `01,400` `01,400` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L44 number `01,404` `01,404` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L45 number `01,409` `01,409` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L46 number `01,412` `01,412` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L47 number `01,415` `01,415` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L48 number `01,416` `01,416` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L49 number `01,419` `01,419` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L50 number `01,421` `01,421` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L51 number `01,423` `01,423` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L52 number `01,425` `01,425` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L53 number `01,426` `01,426` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L55 number `01,427` `01,427` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L58 number `01,424` `01,424` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L60 number `01,428` `01,428` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L64 number `01,422` `01,422` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L65 number `01,420` `01,420` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L69 number `01,418` `01,418` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L71 number `01,417` `01,417` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L77 number `01,414` `01,414` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L78 number `01,413` `01,413` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L79 number `01,411` `01,411` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L80 number `01,408` `01,408` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L83 number `01,386` `01,386` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L85 number `01,391` `01,391` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L86 number `01,398` `01,398` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L87 number `01,392` `01,392` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L88 number `01,401` `01,401` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L94 number `01,429` `01,429` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L95 number `01,430` `01,430` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L96 number `01,433` `01,433` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L98 number `01,435` `01,435` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L100 number `01,436` `01,436` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L101 number `01,434` `01,434` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L103 number `01,438` `01,438` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L104 number `01,437` `01,437` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L105 number `01,439` `01,439` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L106 number `01,442` `01,442` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L107 number `01,444` `01,444` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L109 number `01,445` `01,445` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L110 number `01,446` `01,446` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L113 number `01,443` `01,443` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L114 number `01,447` `01,447` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L115 number `01,450` `01,450` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L116 number `01,451` `01,451` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L118 number `01,452` `01,452` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | L132 number `01,432` `01,432` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-payems-2026-10-03 | and 344 more in this record; a transcript is read whole, these are the lines the page does not carry | Out of scope: the rest of the file is earlier monthly observations. The page uses October 2025 through September 2026 for payrolls and the September 2026 point for the other series. |
| fred-unrate-2026-10-03 | L26 number `6.5` `6.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L28 number `6.3` `6.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L63 number `2.6` `2.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L159 number `6.9` `6.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L333 number `8.4` `8.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L413 number `9.3` `9.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L416 number `9.8` `9.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L418 number `10.1` `10.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L420 number `10.8` `10.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L424 number `10.3` `10.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L425 number `10.2` `10.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L869 number `14.8` `14.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-unrate-2026-10-03 | L870 number `13.2` `13.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L4 number `11.5` `11.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L8 number `10.8` `10.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L9 number `10.6` `10.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L12 number `10.1` `10.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L22 number `10.2` `10.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L26 number `9.8` `9.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L39 number `9.3` `9.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L48 number `8.4` `8.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L77 number `6.9` `6.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L115 number `10.3` `10.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L176 number `10.5` `10.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L179 number `11.8` `11.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L180 number `12.7` `12.7` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L181 number `13.6` `13.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L182 number `14.1` `14.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L184 number `15.8` `15.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L185 number `15.9` `15.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L186 number `16.5` `16.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L188 number `16.4` `16.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L189 number `16.7` `16.7` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L194 number `16.6` `16.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L195 number `17.0` `17.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L202 number `16.9` `16.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L206 number `16.1` `16.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L207 number `16.0` `16.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L216 number `15.6` `15.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L217 number `15.2` `15.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L219 number `15.0` `15.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L220 number `14.6` `14.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L221 number `14.7` `14.7` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L222 number `14.8` `14.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L231 number `14.3` `14.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L232 number `13.9` `13.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L233 number `14.0` `14.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L235 number `14.2` `14.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L238 number `13.5` `13.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L242 number `12.6` `12.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L245 number `12.3` `12.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L247 number `12.0` `12.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L248 number `12.1` `12.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L317 number `22.9` `22.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-u6-2026-10-03 | L322 number `12.8` `12.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L4 number `64.3` `64.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L5 number `64.8` `64.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L7 number `65.0` `65.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L8 number `65.4` `65.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L12 number `64.9` `64.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L13 number `65.1` `65.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L18 number `65.3` `65.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L23 number `65.7` `65.7` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L29 number `65.5` `65.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L31 number `66.1` `66.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L32 number `65.8` `65.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L35 number `65.9` `65.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L40 number `66.2` `66.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L44 number `66.4` `66.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L45 number `66.3` `66.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L47 number `66.7` `66.7` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L48 number `66.5` `66.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L49 number `66.8` `66.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L51 number `67.0` `67.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L54 number `66.6` `66.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L58 number `66.9` `66.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L62 number `67.3` `67.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L64 number `67.4` `67.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L72 number `67.2` `67.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L75 number `67.5` `67.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L92 number `67.8` `67.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L95 number `67.9` `67.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L97 number `68.2` `68.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L98 number `68.4` `68.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L106 number `68.3` `68.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L107 number `68.1` `68.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L116 number `68.6` `68.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L119 number `68.5` `68.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L128 number `68.8` `68.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L129 number `69.1` `69.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L149 number `68.9` `68.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L153 number `69.2` `69.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L154 number `69.4` `69.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L155 number `69.0` `69.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L156 number `69.3` `69.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L163 number `69.6` `69.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L185 number `69.5` `69.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L192 number `69.8` `69.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L197 number `69.9` `69.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L199 number `69.7` `69.7` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L211 number `70.1` `70.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L222 number `70.2` `70.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L225 number `70.3` `70.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L226 number `70.6` `70.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L227 number `70.7` `70.7` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L228 number `70.8` `70.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L232 number `70.5` `70.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L236 number `70.9` `70.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L237 number `71.0` `71.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L248 number `71.2` `71.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L255 number `71.5` `71.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L256 number `71.4` `71.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L261 number `71.8` `71.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L264 number `71.7` `71.7` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L265 number `71.9` `71.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L268 number `72.2` `72.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L269 number `72.3` `72.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L271 number `72.1` `72.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L292 number `72.4` `72.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L303 number `72.6` `72.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L305 number `72.7` `72.7` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L307 number `72.9` `72.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L308 number `73.0` `73.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L309 number `72.8` `72.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L311 number `73.1` `73.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L312 number `73.3` `73.3` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L314 number `73.5` `73.5` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L316 number `73.4` `73.4` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L319 number `73.6` `73.6` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L320 number `73.8` `73.8` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L322 number `73.7` `73.7` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L326 number `73.9` `73.9` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L330 number `74.0` `74.0` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L331 number `74.2` `74.2` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | L332 number `74.1` `74.1` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-prime-age-2026-10-03 | and 78 more in this record; a transcript is read whole, these are the lines the page does not carry | Out of scope: the rest of the file is earlier monthly observations. The page uses October 2025 through September 2026 for payrolls and the September 2026 point for the other series. |
| fred-ahe-2026-10-03 | L4 number `20.13` `20.13` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L5 number `20.22` `20.22` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L6 number `20.29` `20.29` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L7 number `20.32` `20.32` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L8 number `20.40` `20.40` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L9 number `20.42` `20.42` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L10 number `20.49` `20.49` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L11 number `20.58` `20.58` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L12 number `20.59` `20.59` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L13 number `20.68` `20.68` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L14 number `20.72` `20.72` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L15 number `20.79` `20.79` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L16 number `20.84` `20.84` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L17 number `20.95` `20.95` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L18 number `20.94` `20.94` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L19 number `21.00` `21.00` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L20 number `21.04` `21.04` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L21 number `21.06` `21.06` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L22 number `21.12` `21.12` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L23 number `21.16` `21.16` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L24 number `21.19` `21.19` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L25 number `21.27` `21.27` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L26 number `21.36` `21.36` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L27 number `21.38` `21.38` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L28 number `21.47` `21.47` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L29 number `21.52` `21.52` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L30 number `21.60` `21.60` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L31 number `21.70` `21.70` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L32 number `21.73` `21.73` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L33 number `21.76` `21.76` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L34 number `21.86` `21.86` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L35 number `21.95` `21.95` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L36 number `21.96` `21.96` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L37 number `21.98` `21.98` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L38 number `22.05` `22.05` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L39 number `22.10` `22.10` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L40 number `22.12` `22.12` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L41 number `22.14` `22.14` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L42 number `22.18` `22.18` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L43 number `22.23` `22.23` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L44 number `22.27` `22.27` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L45 number `22.31` `22.31` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L46 number `22.34` `22.34` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L47 number `22.37` `22.37` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L48 number `22.40` `22.40` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L49 number `22.46` `22.46` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L51 number `22.49` `22.49` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L52 number `22.51` `22.51` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L53 number `22.53` `22.53` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L54 number `22.59` `22.59` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L55 number `22.62` `22.62` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L56 number `22.67` `22.67` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L57 number `22.73` `22.73` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L59 number `22.76` `22.76` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L60 number `22.87` `22.87` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L63 number `22.91` `22.91` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L64 number `22.97` `22.97` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L65 number `23.00` `23.00` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L66 number `23.11` `23.11` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L67 number `23.06` `23.06` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L69 number `23.18` `23.18` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L70 number `23.19` `23.19` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L71 number `23.22` `23.22` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L72 number `23.26` `23.26` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L73 number `23.28` `23.28` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L74 number `23.36` `23.36` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L75 number `23.39` `23.39` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L76 number `23.41` `23.41` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L77 number `23.46` `23.46` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L78 number `23.49` `23.49` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L79 number `23.48` `23.48` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L80 number `23.57` `23.57` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L81 number `23.56` `23.56` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L82 number `23.63` `23.63` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L83 number `23.72` `23.72` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L84 number `23.74` `23.74` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L85 number `23.78` `23.78` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L86 number `23.80` `23.80` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L87 number `23.87` `23.87` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | L88 number `23.89` `23.89` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| fred-ahe-2026-10-03 | and 154 more in this record; a transcript is read whole, these are the lines the page does not carry | Out of scope: the rest of the file is earlier monthly observations. The page uses October 2025 through September 2026 for payrolls and the September 2026 point for the other series. |
| alfred-payems-2026-10-02 | L4 number `01,302` `01,302` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L5 number `01,300` `01,300` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L7 number `01,305` `01,305` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L8 number `01,304` `01,304` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L9 number `01,306` `01,306` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L10 number `01,310` `01,310` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L11 number `01,314` `01,314` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L13 number `01,315` `01,315` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L14 number `01,316` `01,316` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L15 number `01,317` `01,317` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L16 number `01,318` `01,318` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L19 number `01,319` `01,319` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L21 number `01,323` `01,323` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L22 number `01,328` `01,328` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L23 number `01,332` `01,332` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L24 number `01,336` `01,336` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L25 number `01,341` `01,341` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L26 number `01,344` `01,344` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L27 number `01,348` `01,348` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L28 number `01,350` `01,350` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L29 number `01,354` `01,354` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L30 number `01,361` `01,361` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L31 number `01,366` `01,366` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L32 number `01,371` `01,371` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L33 number `01,375` `01,375` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L34 number `01,378` `01,378` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L35 number `01,379` `01,379` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L36 number `01,380` `01,380` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L37 number `01,381` `01,381` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L38 number `01,383` `01,383` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L39 number `01,385` `01,385` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L40 number `01,389` `01,389` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L41 number `01,393` `01,393` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L42 number `01,397` `01,397` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L43 number `01,400` `01,400` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L44 number `01,404` `01,404` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L45 number `01,409` `01,409` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L46 number `01,412` `01,412` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L47 number `01,415` `01,415` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L48 number `01,416` `01,416` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L49 number `01,419` `01,419` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L50 number `01,421` `01,421` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L51 number `01,423` `01,423` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L52 number `01,425` `01,425` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L53 number `01,426` `01,426` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L55 number `01,427` `01,427` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L58 number `01,424` `01,424` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L60 number `01,428` `01,428` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L64 number `01,422` `01,422` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L65 number `01,420` `01,420` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L69 number `01,418` `01,418` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L71 number `01,417` `01,417` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L77 number `01,414` `01,414` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L78 number `01,413` `01,413` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L79 number `01,411` `01,411` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L80 number `01,408` `01,408` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L83 number `01,386` `01,386` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L85 number `01,391` `01,391` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L86 number `01,398` `01,398` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L87 number `01,392` `01,392` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L88 number `01,401` `01,401` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L94 number `01,429` `01,429` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L95 number `01,430` `01,430` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L96 number `01,433` `01,433` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L98 number `01,435` `01,435` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L100 number `01,436` `01,436` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L101 number `01,434` `01,434` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L103 number `01,438` `01,438` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L104 number `01,437` `01,437` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L105 number `01,439` `01,439` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L106 number `01,442` `01,442` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L107 number `01,444` `01,444` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L109 number `01,445` `01,445` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L110 number `01,446` `01,446` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L113 number `01,443` `01,443` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L114 number `01,447` `01,447` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L115 number `01,450` `01,450` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L116 number `01,451` `01,451` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L118 number `01,452` `01,452` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | L132 number `01,432` `01,432` | Out of scope: a historical observation, or a date fragment the gap list split out of a YYYY-MM-01 row. The chart window is October 2025 to September 2026. |
| alfred-payems-2026-10-02 | and 344 more in this record; a transcript is read whole, these are the lines the page does not carry | Out of scope: the rest of the file is earlier monthly observations. The page uses October 2025 through September 2026 for payrolls and the September 2026 point for the other series. |

## What could not be admitted and why

The Wall Street Journal and The Washington Post each answered a fetch with a short subscription stub. A second fetch on October 3 did not return an article. The records list says so. Nothing those two stubs add is missing from the release or from the outlets that did return a body.

The bureau's commissioner's-statement address is the January 6, 2023 statement, and that statement says it is the last one. There is no September 2026 commissioner's statement to pin. The release itself is the bureau's account.

The article index, last built through September 7, does not contain this release. The registry sweep of October 2 does.

## Story turn, admissions

The six gap lines graded B were already in the registry. Each pin is a copy of that run's raw file, with the text sibling beside it.

1. `fomc-statement-2026-09-16`. Registry run `quarry-wire-scheduled-20260916T220017Z`, the release-day statement. The pin was already at `data/sources/fed-rate/fomc-statement-2026-09-16.txt`. Quote: "The Committee decided to raise the target range for the federal funds rate by 1/4 percentage point to 3-3/4 to 4 percent".
2. `fomc-calendar-2026-09-16`. Registry run `capture-oneoff-20260919T191321Z`. The HTML is the saved page. The text sibling lists the 2026 meetings in order, because the extracted text had split the year from the dates. Quote: "October 27-28", under "2026 FOMC Meetings", after "September 15-16*". Last update on the page: September 16, 2026.
3. `bea-pce-2026-08`. Registry run `capture-oneoff-20261003T065139Z`. The embargo line "EMBARGOED UNTIL RELEASE AT 8:30 a.m. EDT, Wednesday, September 30, 2026" is in the HTML and was added at the top of the text sibling. Quote: "From the same month one year ago, the PCE price index for August increased 3.4 percent."
4. `bls-jolts-2026-08`. The audit named the PDF. The release-day HTML is `quarry-wire-scheduled-20260929T160010Z`, `https://www.bls.gov/news.release/archives/jolts_09292026.htm`. Quotes: "Hires changed little at 5.2 million" and "The Job Openings and Labor Turnover news release for September 2026 is scheduled to be published on Tuesday, November 3, 2026, at 10:00 a.m. (ET)."
5. `adp-september-2026`. Registry run `capture-oneoff-20261003T065139Z`. Quote: "Private-sector employment increased by 90,000 jobs in September".
6. `stlouisfed-unrate-2026-10`. Registry run `capture-oneoff-20261003T065139Z`. Quote: "More precise data show the rate increased slightly from 4.141% to 4.175%." The note's date line is "St. Louis Fed On the Economy, Oct. 2, 2026."

### Passage table, story turn

| Passage | Disposition |
|---|---|
| The Committee decided to raise the target range for the federal funds rate by 1/4 percentage point to 3-3/4 to 4 percent | Used: why it matters, in What happened. |
| October 27-28 | Used: the meeting on the 2026 list, in What we do not know yet. |
| From the same month one year ago, the PCE price index for August increased 3.4 percent. | Used: why it matters. |
| EMBARGOED UNTIL RELEASE AT 8:30 a.m. EDT, Wednesday, September 30, 2026 | Used: the date of that release. |
| Hires changed little at 5.2 million | Used: August hiring. |
| published on Tuesday, November 3, 2026, at 10:00 a.m. (ET). | Used: the September hiring release is still ahead. |
| Private-sector employment increased by 90,000 jobs in September | Used: the catch, a second private count. |
| More precise data show the rate increased slightly from 4.141% to 4.175%. | Used: the catch, the rate before rounding. |

### Searches before the unknowns

`capture search "FOMC statement" --since 2026-09-17` returned no statement later than September 16. `capture search "monetary202610" --since 2026-09-16` returned nothing. The calendar pin, last updated September 16, shows a statement link for September 15-16 and none for October 27-28.

Cause of the 29,000 payroll change: the September employment release states the change and says it changed little. It does not give a reason for the size. The Associated Press says unemployment rose partly because 485,000 people entered the workforce. That sentence is about the rate, and the household table shows the same labor-force increase. The St. Louis Fed note gives flows behind the rate's few hundredths. CBS writes that the payroll figure signals businesses holding off amid energy prices and inflation. That is the outlet's characterization, not a reason the release states. The absence sentence names the September employment release.

## Interrogation, October 3

The review is `checks/interrogations/jobs--2026-10-02-september-payrolls-rise-29000-2026-10-03.md`. Items already in a pin were written from that pin. Items that would add a section the reader model does not have were not admitted.

Fixed from pins already held: the Reuters range (29,000 is below 35,000); the household employment rise of 406,000 set against the 650,000 bar; the Black rate row's July 6.3 and August 6.0; table A-9's 8,986 thousand read as 8,986,000 people; summary table A on job losers, job leavers, reentrants, and new entrants; manufacturing up 72,000 since December 2025 and insurance carriers down 90,000; the Associated Press sentences on the smallest yearly wage gain since May 2021 and on midterm elections. Those last two, and the reason-for-unemployment rows, are in the facts view. The confidence interval of about 0.3 point is stated in the technical note at an unemployment rate of around 6.0 percent, so it was not applied to 4.2 percent.

The entailment check rejected the dek's "first reported." The September release says July and August together are 60,000 lower than previously reported. July's first published change, in the August release's predecessor, was a loss of 23,000, not the gain of 21,000 this release revises. The dek now says previously reported.

The entailment verdict of October 3 is ENTAILED, with two Moderate items left standing. The prime-age series file has no title, only the identifier and the values 83.4 and 83.7, so the age and the working-or-looking gloss are not in that pin. The payroll series file prints 159015 and 159044 with no unit label; the page reads them as thousands because their difference is the release's 29,000, and the proof block states the arithmetic. CNBC's 34.6-hour workweek is stated as not the release's 34.4-hour figure.

Not admitted: prediction-market odds, El-Erian's posts, the equity close and hike odds, the September 16 press conference and projections, Hassett, Warren, weekly claims, a Labor Day explanation of the payroll change, Timiraos's longer unrounded path, year-ago 4.4 percent as a story claim, a real-wage verdict, the August private-versus-government revision split, the birth-death forecast, the GDP revision, the October 14 price index, and outlets beyond the coverage set. The reader model has no section for reactions or for a next event other than the dates already on the page, and the September employment release still states no cause of the 29,000.

## Reader pass, October 5

Outside editor, no missing fact. Federal funds rate glossed from the goals statement: the committee's primary means of adjusting policy is changes in that target range. The price index glossed from the same statement: inflation measured by the annual change in the price index for personal consumption expenditures. Statistically significant left without a new definition. The employment note states the 122,000 and 650,000 thresholds and does not define the phrase. The pace sentence names the prior 12 months, 2026 so far, and 2025 as different months. The Associated Press chronology sentence now says the government reported the figures on Friday, quoting the midterm clause. The source-history cutoff at "following an average" is an older recorded span. The current passage is already the whole sentence, and the timeline is shared state, so the row stays.

## Reader pass, October 5, round 10

Admitted: Reuters post-release (`reuters-september-jobs`, capture-oneoff-20261005T222115Z), Hassett briefing (`hassett-briefing-2026-10-02`), Yahoo Finance on Phelan (`yahoo-phelan-2026-10-02`), and federal series CES9091000001 (`fred-federal-employment-2026-10-05`), the last three from capture-oneoff-20261005T222547Z. The Bloomberg sentence was not in a pin. Yahoo Finance states the same 40,000 as Phelan's calculation.

1. Taken differently. The range is Reuters's roughly 50,000, Yahoo Finance's account of Phelan's about 40,000, and the Associated Press's could-be-zero, down from 150,000. September's 29,000 is under the first two. The three-month pace of 51,000 sits next to the economists' 50,000. The zero stays inside the Associated Press's "could".
2. Taken. Hassett's 300,000 sentence is his. The series is 3,009,000 in December 2024 and 2,682,000 in September 2026, down 327,000, and down 1,000 from August. Reuters says the month's government contraction of 17,000 was mostly local, excluding education. The October 2 transcript does not name his office. A September 4 Yahoo Finance account, already pinned, calls him the director of the National Economic Council, and that sentence stands in front of the quote.
3. Taken, as what economists noted to Reuters, beside the release's silence on a cause. Reuters's separate line that the seasonal-adjustment model likely accounted for the gain and the revisions is not adopted.
4. Taken. The committee is named in the September 16 sentence. Reuters's "almost taking another interest rate hike off the table" is followed by the odds, 13 percent then about 23 percent, little changed from Thursday. The economists' "likely had no impact" line is not added. The odds are the check.
5. Taken. The standalone primary-means sentence is cut. Those words sit in the September 16 increase sentence.
6. Taken. "Individuals are counted only once" is cut. The two-survey sentence stays.
7. Taken. The rate rose from 4.1 to 4.2, and the summary's "changed little" is its own sentence. The gloss on the wording is cut.
8. Taken differently. The story comparison is September against the release's 45,000 prior-12-month average, then the bureau's own three-month line, 51,000 through September 2026 against 23,000 through September 2025. That 23,000 is the same figure Reuters states. The Associated Press's 68,000 and 9,700 stay in the facts view. The sentence explaining the labels is cut.
9. Taken, as its own sentence: the first bar is October 2025, a loss of 140,000, from the payroll series. The editor's earlier leave is this round's advice, and the bar was the thing a stranger stopped on.

## Reader pass, October 5, round 11

Admitted: the Federal Reserve's April 2 break-even note (`fed-breakeven-2026-04-02`, capture-oneoff-20261006T014406Z; the receipt date 2026-02-04 is the registry's, and the note says April 02, 2026), the Dallas Fed's March 31 note (`dallasfed-breakeven-2026-03-31`, same run), Governor Waller's February 23 speech (`fed-waller-2026-02-23`, same run; the PDF of the same speech was captured and not pinned), Vice Chair Jefferson's October 1 speech (`fed-jefferson-2026-10-01`, quarry-wire-scheduled-20261001T220038Z), and the BLS hires and separations rate chart (`bls-jolts-hires-rates-2026-10-05`, capture-oneoff-20261006T014406Z; the page states no publication date).

1. Taken differently. The primary-means clause and "The increase was in support of those goals" are cut. The goals statement's "considers a wide range of indicators" is its own sentence, because that statement does not name this report or the October meeting. The next sentence says this report's small payroll gain and little-changed unemployment are evidence the committee will weigh on October 27-28, and that the October decision is not known. No other policy fact is added. The September 16 increase, the November 6 date, August PCE, and the 3.0 percent earnings line stay.
2. Taken. The story view now sets the bureau's three months through September 2026 (51,000) against the three months through September 2025 (23,000), then the Associated Press's average so far this year (68,000) against every month of 2025 (9,700). The windows are named as different. The October 2025 bar sentence is cut. The chart arithmetic stays in the proof.
3. Taken. Phelan's reason is the Yahoo Finance sentence: the September increase was a mistake because inflation is already coming down. The Federal Open Market Committee's September 16 statement says "Inflation remains elevated." The page names the committee there so the sentence is not a bare "the September 16 statement." Jefferson's October 1 speech says he supported that decision, and that activity and the labor market look broadly solid while inflation remains above target. Each is its own sentence. His "no more hikes" line is not used. The Reuters odds paragraph still leaves the October decision open.
4. Taken. Hassett's title stands before the outlet. His argument is in his words: private employment is still booming, the jobs numbers are a little lower because federal employment is down 300,000, and half of job creation over the last two years was federal hiring. The transcript names Joe Biden in that sentence and does not give him an office, so the page does not. Jefferson is named as a vice chair of the Federal Reserve Board, and Waller as a governor of the Federal Reserve Board, from the speech headings. He did not name the months. The series shows a decline of 327,000 from December 2024 to September 2026, of which September is 1,000, so the longer decline does not account for this month. From January 2023 to January 2025, a window he did not name, federal payrolls rose 130,000 and total payrolls rose 3,492,000, about 3.7 percent, not half. September's private gain was 46,000. The 300,000 is not written as the 327,000, and the federal decline is not written as the cause of the 29,000.
5. Taken. Break-even is defined at first use from the April 2 note, then the fall from 155,000 in 2023-24 to an estimated 85,000 in 2025 as immigration slowed, and to less than 10,000 a month in 2026, with the note's uncertainty. The Dallas Fed dates the unauthorized-immigration decline to after early 2024, with net outflows beginning in February 2025. Waller supplies the limit: close to zero net job creation over 2025 indicates a weak, and fragile job market. The page says a low break-even means fewer jobs keep unemployment steady, not that hiring is healthy.
6. Taken differently. September's hiring change stays unknown, and the two-year rut is the Associated Press's sentence, with the bureau's August rates beside it: hires 4.2 percent in 2022, 3.3 in 2024, and 3.3 in 2026, and layoffs 1.0, 1.1, and 1.0. The audit's "between 1.0 and 1.2" is not what those three August readings are. November 3 is cut from the catch and kept in the unresolved section. August's 5.2 million hires stay.
7. Taken. Each pace is named with the question it answers. September's 29,000 is under Reuters's roughly 50,000 for the working-age population, and under Phelan's about 40,000 for a steady unemployment rate. The three-month average of 51,000 sits next to the roughly 50,000 working-age pace. September's 29,000 and the 51,000 average are each above the zero the Associated Press said the break-even could now be. No "first two," and no bare "both."
8. Taken differently on the 17,000. Hassett's title comes before Yahoo Finance. Phelan is the source of the 40,000 calculation and of the mistake argument, and Yahoo Finance is the outlet. The local-government qualifier moves to the private and government split. The 17,000 stays inside the Reuters sentence, because the dispatch attaches "mostly in local government, excluding education" to that number.
9. Taken. The two-survey mechanism is two sentences. The bureau's sentence on what each survey measures stays cited.
10. Declined. The stranger's repeats that the editor left standing stay as they are, including the held items.
