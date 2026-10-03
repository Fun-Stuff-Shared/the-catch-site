# Fuel reserves, October 2 record build

Turn: one, record only. Candidate: `cand-df4aae889a929745`. Event: `event-fuel-reserves-2026-10-02-g7-releases-100-million-barrels`. Cutoff: 2026-10-03.

## Candidate preflight

The kept row in `candidates-2026-10-03.jsonl` has ten URLs. Nine name the October 2 diesel and crude release or the export-ban pressure that day (Associated Press, The Hill, Al Jazeera, CNBC, France 24, NBC, two Reuters items, Wall Street Journal). One does not: the Guardian live blog `france-schools-protests-violence-ukraine-kallas-rome-pope-latest-news-updates`. That URL was not admitted. The sibling `cand-455abd4a0f3f2275` is the same cluster a day earlier; its row's reason is `same cluster as cand-df4aae889a929745`. Its ten URLs (Al Jazeera, CBS, DW, Reuters German, two USA Today, a Wall Street Journal live card, and three morning-run markdown paths) were read as the prior day's pressure, not as a second event. Admitted from that cluster: the Reuters proposal already held in `quarry-wire-scheduled-20261002T100043Z`.

## Step 1 census, one line per search

1. Financing behind packages: Energy Department March 11 release and September 29 exchange request, plus the German energy FAQ. Admitted. The March statement says replacement barrels at no cost to the taxpayer; the September request says a 25 percent premium and more than $3 billion. No appropriation, budget line, or signed contract for the October 6 bids was found on those pages.
2. Recipient legal exposure: no company is paid or given equity in the October 2 statement. The September 16 bills name the Secretary of Commerce. No company case file was admitted.
3. Predecessor proceedings: March 11 G7 communique, March 11 Energy Department statement, March 19 IEA contributions page. Admitted.
4. Executed deal instruments: the September 29 page is a request for bids due October 6, 2026, not an awarded contract. Admitted as the request. No award notice dated on or before October 3 was admitted.
5. Headline-number denominator: the October 2 statement says the 100 million barrels implements commitments "taking into account commitments that have already been fulfilled." It does not call 100 a share of 400. Germany's FAQ gives an IEA request of 2,6 million tonnes against a reserve of about 20 million tonnes. The IEA country table is not in the March 19 article text.
6. Changed package components: English statement, 100 million barrels over 4 months with diesel frontloaded in 20 days; French readout, up to 100 million barrels of diesel and crude over 4 months. Both admitted. Not added together.
7. Announcement state: the October 2 text is an agreement to release, beginning immediately, with a report due before 20 days and a further meeting on more diesel. The September 29 exchange is a solicitation. Neither page says the October volume has been delivered.
8. Policy lineage: March 11 commitment, September 16 House bills H.R. 10422 and H.R. 10423, September 29 exchange, September 30 CNBC account of the president still considering a ban, October 1 Treasury post. Admitted.
9. Claimed consequences: the price series are admitted without a cause. Outlet sentences that prices fell after the announcement stay in the coverage records and are not used as the series.
10. Official statistics: FRED GASDESW, DCOILBRENTEU, and DCOILWTICO, fetched 2026-10-03, last observations September 28 (diesel) and September 29 (Brent, WTI). Admitted. FRED WDISTUS1 returned http 404 and was not admitted.
11. Legal claims: H.R. 10422 and H.R. 10423, introduced September 16, 2026, referred to Foreign Affairs. The bill texts contain no roll call. Admitted from govinfo.
12. Regulated-system harm: no site-level safety determination is in the admitted records. Not found as a separate document.
13. Ground-level actors: Bessent's post names farmers, truckers, and businesses. The German FAQ is the member government's own page. No separate union or trucker filing was admitted.
14. Company relationships: the September 29 release names the Big Hill and Bryan Mound sites. No operator contract was published on that page.
15. Market or price reaction: the three price series above. They do not attribute a move to the announcement. RTÉ's price paragraph is coverage only.
16. Forecast and count denominators: the IEA page says this is the sixth collective action, after 1991, 2005, 2011, and twice in 2022. That counting rule is the agency's sentence. Chris Wright's "coming weeks" line in the September 30 CNBC piece is a forecast and is not a figure on the page.
17. Repeated-record lineage: one English statement, published by gov.uk and by the Elysee; the Elysee readout is a separate French account; the October 2 presidential post is admitted from trumpstruth.org because the Truth Social page that was fetched was a 12-character shell; AP, France 24, Al Jazeera, RTÉ, and the Wall Street Journal lede repeat the statement.
18. Uncapturable documents: IEA October 2 news page, direct 403 and Wayback 404; Truth Social shell; White House October 2 gaggle page with navigation and no transcript; FRED WDISTUS1 404. NBC, CNBC's October 2 story, and The Hill were named in the candidate and were not found as article text in `quarry-wire-scheduled-20261002T160027Z`.
19. Forward search through 2026-10-03: the pinned documents set the next dates themselves (bids October 6, a report before 20 days, another IEA meeting). No later award, report, or member share dated October 3 was admitted.
19b. Legislature search: govinfo H.R. 10422 and H.R. 10423, introduced in the House on September 16, 2026, by Mr. Burchett and Mr. Fuller, referred to Foreign Affairs. No floor vote is in either text. No other diesel-export bill from that week was admitted.
19c. Issuer live pages on the run date: gov.uk news page for the statement, Elysee statement and readout and the March communique, energy.gov March 11 and September 29, bundesregierung energy FAQ, IEA March 19 contributions page. The IEA October 2 news URL did not return an article. The White House gaggle URL returned no transcript.
19d. Standing baseline: the March 11 communique and the March 11 department statement are the commitment the October 2 text says it is implementing. The IEA page dates the agency to 1974 and lists the earlier collective actions.
20. Browser-visible page: checked by `finish.sh` after the build.

Every-time registry search: `capture search` on the October 2 statement and on energy.gov, iea.org, and "100 million barrels" did not surface the member-government pages; those pages were then admitted with `capture news` in `capture-oneoff-20261003T054757Z` and `capture-oneoff-20261003T055909Z`. Quarry runs `quarry-wire-scheduled-20261002T160027Z`, `quarry-wire-scheduled-20261002T100043Z`, and `quarry-wire-scheduled-20261001T100034Z` already held the outlet texts that were pinned.
Every-time article-index search: the article index did not carry the October 2 gov.uk, Elysee, or energy.gov statements under those titles. Admission used the registry runs above, not the index.
Every-time issuer listing search: gov.uk, Elysee, energy.gov, and the German government FAQ for October 1 and October 2, read from the captured pages. The IEA news listing for October 2 did not yield an article.
Every-time next-series search: GASDESW, DCOILBRENTEU, and DCOILWTICO captured 2026-10-03. Last rows are 2026-09-28, 2026-09-29, and 2026-09-29. No later row is in the files.

## Admitted records

govuk-g7-statement-2026-10-02, elysee-g7-statement-2026-10-02, elysee-g7-readout-2026-10-02, elysee-g7-communique-2026-03-11, doe-spr-release-2026-03-11, doe-spr-exchange-2026-09-29, bessent-post-2026-10-01, bundesregierung-energy-faq-2026-10-01, gasdesw-2026-10-03, dcoilbrenteu-2026-10-03, dcoilwtico-2026-10-03, trumpstruth-post-2026-10-02, hr10422-diesel-export-2026-09-16, hr10423-diesel-export-2026-09-16, iea-contributions-2026-03-19, ap-g7-release-2026-10-02, france24-g7-release-2026-10-02, wsj-g7-release-2026-10-02, reuters-eu-proposal-2026-10-02, reuters-no-export-ban-2026-10-02, aljazeera-g7-release-2026-10-02, rte-von-der-leyen-2026-10-02, cnbc-export-ban-2026-09-30.

## Not admitted this run

- 2026-10-02, IEA news "Executive Director participates in G7 Leaders' meeting": direct fetch 403, Wayback 404. Not admitted in the record turn. The March 19 contributions page is the agency text that was pinned. The record audit read the live page anyway: [IEA, October 2](https://www.iea.org/news/executive-director-participates-in-g7-leaders-meeting-on-energy-security-and-markets). Structure grades that page below; this line does not admit it.
- 2026-10-02 audit, [IEA account of the G7 meeting](https://www.iea.org/news/executive-director-participates-in-g7-leaders-meeting-on-energy-security-and-markets): around 325 million barrels of the March action already released, and crude exports described as recovered while refined-product flows stayed constrained, with attacks on Russian refineries. Outside the manifest. Not admitted. Structure grade: A for the 325 million tally (answer 1); the crude-versus-products sentence is the same concept as the September Oil Market Report and as Wright's admitted remark, so it is D rather than C, because the page is unpinned.
- 2026-09 audit, [IEA Oil Market Report, September 2026](https://www.iea.org/reports/oil-market-report-september-2026): August Gulf diesel and gasoil net exports about 390,000 barrels a day, just over a quarter of the prewar level, and combined Gulf and Russian diesel exports about 1.6 million barrels a day below February. Outside the manifest. Not admitted. Structure grade: B (answer 4, the size of the lost diesel flow).
- 2026-10-02 audit, [European Commission midday briefing, video I-295561](https://audiovisual.ec.europa.eu/en/media/video/I-295561): the spokesperson's rejection of a US diesel ban. Outside the manifest. Not admitted. The same rejection is already quoted from Anna-Kaisa Itkonen in `france24-g7-release-2026-10-02`. Structure grade: D, not C, because the briefing is unpinned and the clause is already that admitted quote.
- 2026-10-02 audit, [MarketScreener copy of the Trump export-ban remarks](https://ca.marketscreener.com/news/trump-says-us-will-not-be-doing-diesel-export-ban-ce785ddbda88f720): "we're not going to be doing the export ban." Outside the manifest. Not admitted. `reuters-no-export-ban-2026-10-02` already says he will not authorize an export ban on diesel. Structure grade: D, not C, because this copy is unpinned and that clause is already the admitted brief.
- 2026-10-02 audit, [MarketScreener copy of the pre-agreement diesel proposal](https://www.marketscreener.com/news/europe-weighs-new-diesel-stocks-release-after-us-pressure-sources-say-ce785ddadf8ef124): the audit says this account reports no product or country breakdown of the agreement. The pinned Reuters proposal does not contain that sentence. The English statement gives diesel no number, and `rte-von-der-leyen-2026-10-02` says the statement gave no breakdown. Structure grade: D, not C, because the copy is unpinned and the clause is already admitted.
- 2026-10-02 audit, [Energy Union task force](https://energy.ec.europa.eu/news/energy-union-task-force-meets-ensure-coordination-diesel-supplies-and-prices-europe-2026-10-02_en): EU diesel supply remained stable for the time being while prices were high. Outside the manifest. Not admitted. Structure grade: B (answer 2).
- 2026-09-30 audit, [EIA weekly distillate stocks](https://www.eia.gov/dnav/pet/PET_STOC_WSTK_A_EPD0_SAE_MBBL_W.htm): 105.180 million barrels on September 25, down from 107.431 million a week earlier. Outside the manifest. Not admitted. FRED WDISTUS1 was the failed series, not this table. Structure grade: B (answer 2).
- 2026-10-02 audit, live [Associated Press article](https://apnews.com/article/trump-europe-diesel-fuel-prices-774a360d1646d9ce8aba764fdd9959d2) at the same URL as `ap-g7-release-2026-10-02`: the audit says the live text is longer than the pin and raises whether October's barrels are additional to March. Those extra bytes are not the pin. Structure grade: D, not C. The October statement already opens that question and the live text, as described, adds no tally.
- 2026-03-19 audit, [IEA contributions workbook](https://iea.blob.core.windows.net/assets/ac6af7b5-3737-42c4-a448-b123d06ba25c/IEA-Collectiveaction-detailsofcontributions-11March2026.xlsx): the audit says the current rows total about 426 million barrels of listed contributions, a different measure from the 400 million barrel action and from barrels released. Outside the manifest. Not admitted. Structure grade: B (answer 3). The story turn admits it before any page arithmetic treats 426, 400 and barrels released as the same sum.
- 2026-09-29 audit, [SPR solicitation portal](https://www.spr.doe.gov/doeec/ActiveDocs.htm?type=exchange): the audit found no usable solicitation details. Outside the manifest. Not admitted. The bid deadline is already in `doe-spr-exchange-2026-09-29`. Structure grade: D, not C.
- 2026-10-03 audit, no October allocation or delivery ledger, no national release notice, no October 6 award, and the G7 report is not yet due: the record audit's remaining search, not a document in the manifest. Not admitted. Before the page says those records are absent, the story turn searches outside the registry for an IEA October allocation or delivery ledger, a member release notice dated through October 3, and an award on the October 6 exchange. The absence is not itself the page's sentence. Structure grade: B (answer 6). Bids due October 6 and the report due before 20 days stay next steps, because neither was due on the October 3 cutoff.
- 2026-10-02, Truth Social post page: fetched body was the words "Truth Social" only. Not admitted. The same post's words are admitted from trumpstruth.org.
- 2026-10-02, White House gaggle page: navigation and no transcript. Not admitted.
- 2026-10-03, FRED series WDISTUS1: http 404. Not admitted. No distillate-stocks figure is on the page.
- 2026-10-02, NBC, CNBC, and The Hill URLs in the candidate: not found as article text under `quarry-wire-scheduled-20261002T160027Z`. Not admitted.
- 2026-10-02, Guardian live blog in the candidate: a different running blog (schools, Ukraine, Rome). Not admitted.
- 2026-10-02, Reuters German wire and the sibling's CBS, DW, and USA Today URLs: same cluster, no additional primary figure beyond the admitted English wires. Not admitted as separate records.
- 2026-03-19, IEA country-by-country table: the article text does not contain the country volumes. Not used. No country share was invented.

## Primary passage tables

### `govuk-g7-statement-2026-10-02`: 8 passages

| Passage | Disposition |
|---|---|
| Virtual meeting on energy security and price volatility | Used: dek and release section, as the setting of the October 2 statement. |
| Coordinate refinery maintenance and ask other countries to raise diesel output | Held unused: no volume, and the page's figure is the stock release. |
| 100 million barrels over 4 months, diesel frontloaded in the first 20 days, counting commitments already fulfilled | Used: dek, KPI strip, release section. |
| Further meeting on additional diesel releases, and a report before 20 days | Used: release section. |
| No export restrictions between G7 countries | Used: release section. |
| Condemn Iran and restore navigation in the Strait of Hormuz | Held unused: the statement's security paragraph, no barrel figure. |
| Maintain sanctions on Russia | Held unused: no new energy volume. |
| Monitor prices and adjust measures | Held unused: no new number. |

### `elysee-g7-statement-2026-10-02`: 2 passages

| Passage | Disposition |
|---|---|
| Same English 100 million barrel sentence, including the first 20 days | Used: release section cites this publication for that clause. |
| Remaining paragraphs of the joint statement | Used on the UK publication, which is the same statement. Not repeated. |

### `elysee-g7-readout-2026-10-02`: 6 passages

| Passage | Disposition |
|---|---|
| October 2 videoconference, prices tied to the Middle East, France in the G7 presidency | Used: chronology and the readout block. |
| Executive director of the IEA associated with the meeting | Held unused: the English statement already names the agency as coordinator. |
| Hormuz and Yanbu volumes are increasing | Held unused: no number in the sentence. |
| Raise refinery runs; a letter to the Commission president | Held unused: no volume. |
| Up to 100 million barrels of diesel and crude over 4 months | Used: release section and the wording table. |
| No export limits between G7 members; watch the pump price | Held unused: the export line is the same decision as the English statement; the pump-price line has no figure. |

### `elysee-g7-communique-2026-03-11`: 4 passages

| Passage | Disposition |
|---|---|
| March 11 videoconference | Used: chronology. |
| Up to 400 million barrels of strategic reserves | Used: chronology and the March block. |
| Ship escorts, Gulf coordination, Russia sanctions, fertilizers, electrification | Held unused: no reserve volume. |
| Avoid export restrictions | Held unused: no volume; the October statement is the export line on the page. |

### `doe-spr-release-2026-03-11`: 4 passages

| Passage | Disposition |
|---|---|
| 32 members, 400 million barrels | Used: March block and chronology. |
| 172 million barrels from the Strategic Petroleum Reserve over about 120 days | Used: KPI strip and March block. |
| About 200 million barrels of replacement within the next year | Used: March block. |
| 47 years, Iran and its proxies | Held unused: not a figure of the release. See the gap line. |

### `doe-spr-exchange-2026-09-29`: 7 passages

| Passage | Disposition |
|---|---|
| Exchange of up to 40 million barrels | Used: release section, chronology, homepage timeline. |
| Continues the 172 million and 400 million commitments | Used: the March figures already on the page. |
| Several European countries have released only a fraction | Used: release section. |
| More than 133 million barrels awarded, 25 percent premium, more than $3 billion | Used: release section. |
| Oil from Big Hill and Bryan Mound | Used: release section. |
| Bids due October 6, 2026 | Used: release section. |
| Deliveries under awarded exchanges in November and December 2026 | Held unused: a schedule for earlier awards, not a new volume. |

### `bessent-post-2026-10-01`: 1 passage

| Passage | Disposition |
|---|---|
| European partners should deliver existing commitments and additional supplies now | Used: release section and homepage timeline. |

### `bundesregierung-energy-faq-2026-10-01`: 5 passages

| Passage | Disposition |
|---|---|
| Fuel-tax cut, cartel law, gas supply, power prices, kerosene, commuter allowance | Out of scope: other German measures on the same FAQ, not the October 2 stock release. |
| March agreement of 400 million barrels, about 54 million tonnes; Germany's release granted March 18 | Used: Germany block. |
| Reserve of about 20 million tonnes for about 90 days | Used: Germany block. |
| IEA asked Germany for 2,6 million tonnes | Used: Germany block. |
| A first tranche has been called; the market does not now want more | Held unused: no additional tonne figure. |

### `hr10422-diesel-export-2026-09-16`: 2 passages

| Passage | Disposition |
|---|---|
| Introduced September 16, 2026, by Mr. Burchett and Mr. Fuller, referred to Foreign Affairs | Used: release section and chronology. |
| Bar exports after fourteen consecutive days above $5 a gallon, lift after thirty consecutive days under $4.50 | Used: release section. |

### `hr10423-diesel-export-2026-09-16`: 1 passage

| Passage | Disposition |
|---|---|
| Temporary ban from enactment through December 31, 2026, same sponsors and referral | Used: release section. |

### `trumpstruth-post-2026-10-02`: 1 passage

| Passage | Disposition |
|---|---|
| Europe has agreed to release diesel and the process begins immediately | Used: release section. |

### `iea-contributions-2026-03-19`: 4 passages

| Passage | Disposition |
|---|---|
| Agreement announced 11 March for 400 million barrels; the page is dated 19 March 2026 | Used: chronology and the IEA block. |
| Overall release largely crude; Europe primarily refined products | Used: IEA block. |
| Sixth collective action since 1974, after 1991, 2005, 2011, and twice in 2022; largest supply disruption; Strait of Hormuz | Used: IEA block. |
| Country table of contributions | Out of scope for the page: the volumes are not in the article text, so no country share is stated. |

### `gasdesw-2026-10-03`: 2 passages

| Passage | Disposition |
|---|---|
| 2026-09-28, 2026-09-21, and 2026-03-02 rows, and the differences computed from them | Used: prices section. |
| Every earlier weekly row in the file | Out of scope: history outside the comparison the page computes. The file is one line, so the gap script printed none of those rows. |

### `dcoilbrenteu-2026-10-03`: 2 passages

| Passage | Disposition |
|---|---|
| 2026-09-29 and 2026-02-27, and the difference | Used: prices section. |
| Every other daily row | Out of scope: outside that comparison. |

### `dcoilwtico-2026-10-03`: 2 passages

| Passage | Disposition |
|---|---|
| 2026-09-29 and 2026-02-27, and the difference | Used: prices section. |
| Every other daily row | Out of scope: outside that comparison. |

## Gap list (`pin_gaps.mjs`)

Ran `node skills/catch-record/scripts/pin_gaps.mjs fuel-reserves/2026-10-02-g7-releases-100-million-barrels` after the page and manifest existed. 14 lines.

| Record | Line | Disposition |
|---|---|---|
| doe-spr-release-2026-03-11 | L8 number `47 years` | Held unused: Wright's sentence on Iran, not a volume or a date of the release. |
| bundesregierung-energy-faq-2026-10-01 | L6 name `Bundeskanzler Friedrich Merz` | Out of scope: quoted on the fuel-tax package, not on the stock release. |
| bundesregierung-energy-faq-2026-10-01 | L11 name `Die Steuersenkung` | Out of scope: the tax cut's start date. |
| bundesregierung-energy-faq-2026-10-01 | L13 name `Vorbild Luxemburgs` | Out of scope: a proposed price cap modeled on Luxembourg. |
| bundesregierung-energy-faq-2026-10-01 | L13 name `Die Versorgungssicherheit` | Out of scope: general supply sentence in the tax section. |
| bundesregierung-energy-faq-2026-10-01 | L15 name `Das Bundeskartellamt` | Out of scope: competition cases against refiners. |
| bundesregierung-energy-faq-2026-10-01 | L25 name `Die Versorgung` | Out of scope: a supply-status sentence, no reserve volume. |
| bundesregierung-energy-faq-2026-10-01 | L26 name `Nahen Osten` | Out of scope: the FAQ's crude-import share, a different statistic from the release. |
| bundesregierung-energy-faq-2026-10-01 | L40 name `Die Bundesnetzagentur` | Out of scope: gas-supply assessment. |
| bundesregierung-energy-faq-2026-10-01 | L41 name `Internationalen Energieagentur` | Held unused: the German name of the agency in a sentence about jet fuel already released. The page uses the English name and the 2,6 million tonne request from the next paragraph. |
| bundesregierung-energy-faq-2026-10-01 | L48 name `Die Gasversorgung` | Out of scope: gas supply. |
| bundesregierung-energy-faq-2026-10-01 | L51 name `Im Vergleich` | Out of scope: gas-price comparison with 2022. |
| bundesregierung-energy-faq-2026-10-01 | L54 name `Erneuerbaren Energien` | Out of scope: renewable buildout. |
| bundesregierung-energy-faq-2026-10-01 | L56 name `Anteil Erneuerbarer Energien` | Out of scope: renewable share of the power mix. |

## What could not be admitted and why

The IEA's October 2 news page returned 403 on a direct fetch and 404 on the Wayback copy tried in `capture-oneoff-20261003T055909Z`. The March 19 contributions page was admitted instead. Its article text confirms the March 11 total and the crude-versus-products split, and it does not contain the country table, so the page states no country share from that document. Truth Social's own URL returned a 12-character shell; the October 2 post is admitted from trumpstruth.org. The White House October 2 gaggle page had no transcript. FRED WDISTUS1 was a 404, so there is no distillate-stocks series. NBC, the October 2 CNBC story, and The Hill were in the candidate list and were not found as text in the October 2 quarry run, so they are not records. The Guardian live blog in that list is a different story.
