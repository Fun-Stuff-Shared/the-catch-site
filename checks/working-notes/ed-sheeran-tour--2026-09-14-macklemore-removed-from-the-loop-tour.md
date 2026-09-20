# Ed Sheeran's Loop Tour, September 14 record build

Turn: one, record only. Candidate: `cand-002c86d99fefc8e7`. Event: `event-ed-sheeran-tour-2026-09-14-macklemore-removed-from-the-loop-tour`. Cutoff: 2026-09-20.

## Candidate preflight

All 10 references in `candidates-2026-09-20.jsonl` name the same removal-and-withdrawals moment. The 10 references in `cand-9ab48413de32f13e` and the 10 in `cand-3fcfa1c3b5e6a4e5` were also checked from their saved bodies; they cover the September 14 removal, September 15 supporting-act withdrawals, or immediate follow-up to the same cluster. No candidate reference belongs to another event. Repeated AP, USA Today, Washington Post, BBC, Fox and Al Jazeera rows were treated as duplicate editions or coverage, not separate primary lineages.

## Step 1 census, one line per search

1. Financing behind packages: searched the six statements, promoter coverage, official tour pages and registry results; no financing package governs the recorded lineup change, and no financing record was admitted.
2. Recipient legal exposure: searched the same record for payments, recipients, penalties and liabilities; no transfer or recipient legal exposure is part of the lineup decision.
3. Predecessor proceedings: searched the registry from September 1 and the earlier candidate rows; no court, agency or formal predecessor proceeding was found.
4. Executed deal instruments: searched artist, promoter and venue routes plus AP's tour-control report; no executed artist, promoter or venue contract is public, so the authority clauses remain unavailable.
5. Headline-number denominator: admitted the official North America FAQ; its 27 dated rows produce 10 dates after September 14 in eight cities.
6. Changed package components: compared the removal statement, Sheeran response and four withdrawal statements; Macklemore left the remaining support dates, then Finneas, Aaron Rowe, Lukas Graham and Beoga left their scheduled roles.
7. Announcement state: the promoter statement says Macklemore would not perform on remaining support dates; the four later statements say withdrew or departed; no statement says the tour itself was cancelled.
8. Policy lineage: searched venue policies, official pages and coverage; no standing lineup-speech policy was published, and Gillette's event page only states management may prohibit signs or banners based on message content.
9. Claimed consequences: searched through September 20; admitted the September 19 Philadelphia continuation and the $1 million relief pledge, while keeping later opinion and reaction pieces out.
10. Official statistics: no government or regulated official-statistics series measures this private concert-lineup event.
11. Legal claims: Rolling Stone raised possible First Amendment questions for publicly owned venues, but no filed legal claim or ruling was found or used.
12. Regulated-system harm: not applicable to the private tour lineup; no regulated-service interruption or safety finding was claimed.
13. Ground-level actors: admitted the six artists' own statements and the official Philadelphia and Foxborough venue listings.
14. Company relationships: searched Messina Touring Group, the Kraft Group, Gillette Stadium and the venue list; coverage identifies Messina as promoter and Kraft Group as Gillette's owner, but no public contract is available.
15. Market or price reaction: found a CNBC resale-price report; it was not admitted because asking prices lack a complete sales denominator and are outside this lineup record.
16. Forecast/count denominators: computed all schedule counts from the 27 official dated rows and all departure counts from the four named statements, not from prose estimates.
17. Repeated-record lineage: AP English and Spanish versions and syndicated copies are one AP lineage; duplicate Washington Post and USA Today captures were not counted again.
18. Uncapturable documents: no selected URL was refused; Instagram text extraction omitted carousel slides, so each raw HTML capture was retained and each slide was transcribed into its text sibling.
19. Forward search: searched through September 20; admitted AP's September 17 control report and September 19 Philadelphia and donation follow-ups.
19b. Legislature search: not applicable; no legislature or legislative record controls this private tour lineup.
19c. Issuer live pages: captured Ed Sheeran's main, North America and past-dates pages, Messina Touring, Kraft Group, Gillette Stadium and Lincoln Financial Field; only the fixed FAQ, past dates and two venue listings supplied usable event records.
19d. Standing doctrine and baseline: AP's September 17 interviews provide a general promoter/venue/headliner control baseline, explicitly not this tour's contract.
20. Browser-visible page: checked by `finish.sh` after the build.

Every-time registry search: `capture search Macklemore`, dates 2026-09-01 to 2026-09-20: 98 results, spanning the removal, four departures, Sheeran and Kraft responses, donations and the first later show.
Every-time registry search: `capture search Ed Sheeran`, dates 2026-09-01 to 2026-09-20: 84 results; selected records matched the same cluster.
Every-time registry search: `capture search Robert Kraft`, dates 2026-09-01 to 2026-09-20: 15 results; the full response was carried by USA Today rather than a Kraft first-party page.
Every-time registry search: `capture search Lukas Graham`, `capture search Aaron Rowe`, and `capture search Beoga`, dates 2026-09-01 to 2026-09-20: one, zero and two results respectively; direct statement URLs were then captured through `capture news`.
Every-time article-index search: three `leann search news-articles-clean-v1` queries for the event, supporting acts and venue pressure returned no usable event record; the index reported a 2026-09-07 vintage.
Every-time issuer listing search: official Ed Sheeran North America FAQ, past dates through September 5, Lincoln Financial Field September 19, and Gillette Stadium September 25-26: the fixed schedule records were admitted.
Every-time next-series search: no pinned series exists for this new subject; forward registry search was captured through 2026-09-20 and the next observable concert record is the September 19 Philadelphia date.

## Admitted records

Primary and official records, in admission order:

1. `macklemore-removal-statement-2026-09-14`
2. `ed-sheeran-response-2026-09-15`
3. `finneas-withdrawal-2026-09-15`
4. `aaron-rowe-withdrawal-2026-09-15`
5. `lukas-graham-withdrawal-2026-09-15`
6. `beoga-withdrawal-2026-09-15`
7. `loop-tour-north-america-faq`
8. `ed-sheeran-past-tour-dates-2026-09-20`
9. `gillette-loop-tour-2026-09-20`
10. `lincoln-field-loop-tour-2026-09-20`

Coverage, in admission order:

11. `rolling-stone-removal-2026-09-14`
12. `ap-removal-2026-09-14`
13. `usa-today-kraft-2026-09-14`
14. `ap-support-acts-2026-09-15`
15. `reuters-sheeran-response-2026-09-15`
16. `rte-support-acts-exit-2026-09-15`
17. `ap-tour-power-2026-09-17`
18. `ap-philadelphia-2026-09-19`
19. `ap-donations-2026-09-19`

## Not admitted this run

- 2026-09-20, Ed Sheeran main and North America pages: captured in `capture-oneoff-20260920T062845Z` and `capture-oneoff-20260920T063145Z`; their text layers did not expose the dated rows, so the fixed FAQ and past-dates records were used.
- 2026-09-20, Messina Touring homepages: captured in `capture-oneoff-20260920T062845Z` and `capture-oneoff-20260920T063145Z`; neither carried an event statement, so Rolling Stone remains the attributed carrier.
- 2026-09-20, Kraft Group overview and Israel philanthropy pages: captured in `capture-oneoff-20260920T063145Z`; neither carried Kraft's September 14 response, so USA Today remains the full-statement carrier.
- 2026-09-14 to 2026-09-20, AP Spanish copies and syndications, repeated Washington Post pages, and repeated USA Today reports: bodies saved in the candidate runs; not admitted because they repeat already admitted lineages.
- 2026-09-14 to 2026-09-20, BBC and Al Jazeera video pages: bodies saved in the candidate runs; not admitted because no distinct recoverable passage required a separate video record.
- 2026-09-18, CNBC ticket-price report: found in the forward census; not admitted because secondary resale asking prices have no complete sales denominator and do not establish a lineup fact.
- Undated, executed artist/promoter/venue contracts: not found on official or coverage routes; no contract term is inferred from the general AP mechanism report.
- `gap-ap-philadelphia-post-show-2026-09-19` — 2026-09-19, [current AP Philadelphia record](https://apnews.com/article/ed-sheeran-concert-macklemore-philadelphia-d452b6eadff285553b20c558191886bb): the record audit found that the live article had advanced beyond the manifest's pre-show pin and reported the completed concert, Sheeran opening without an opener, his remarks and the planned protest; not admitted in the structure turn because the revised document is not pinned in the manifest.
- `gap-cair-philadelphia-records-request` — By 2026-09-20, [CAIR-Philadelphia public-records request](https://pa.cair.com/pressrelease/macklemore-letter/): the record audit found a request for communications, policies, contracts and decision records involving the venue, city entities, promoter, artists, Kraft and advocacy groups; not admitted in the structure turn because the document is outside the manifest and the request does not establish what responsive records will show.
- `gap-prior-comparable-loop-lineup-change` — No admitted record establishes an earlier comparable Loop Tour removal-and-withdrawals change, so the elapsed time since the last change of this kind cannot be stated from this record.

## Primary passage tables

### `macklemore-removal-statement-2026-09-14`: 12 passages

| Passage | Disposition |
|---|---|
| Slide 1: Sheeran and his team decided to remove Macklemore; the artists are not the victims. | Used: removal line in the statements section. |
| Slide 2: Palestinian people are the victims; the slide states a child-death figure. | Held unused: contextual claim is outside the lineup record and would require its own denominator. |
| Slide 3: thirteen-year friendship and a fundamental disagreement. | Held unused: relationship duration does not change the lineup record. |
| Slide 4: Macklemore says Sheeran told him Kraft called, barred him at Gillette and rallied other owners. | Used: venue-pressure claim in the statements section. |
| Slide 5: Macklemore says Sheeran described the words and flag as hurtful and held an apolitical stance. | Held unused: motive account is preserved but not needed for the record-only page. |
| Slide 6: Macklemore lists costs of taking a side and rejects neutrality. | Out of scope: argument, not a lineup event or count. |
| Slide 7: he had made similar statements for almost three years and says the larger stage increased risk. | Held unused: advocacy duration is not a schedule fact. |
| Slide 8: he distinguishes antisemitism from criticism of Israel and Zionism. | Out of scope: argument, not a lineup event or count. |
| Slide 9: he hopes the friendship survives and leaves the door open. | Held unused: no operational change. |
| Slide 10: Arabic phrase and duty framing. | Out of scope: personal framing. |
| Slide 11: cancellation and stadium stakes compared with Gaza and the West Bank. | Out of scope: argument, not a lineup event or count. |
| Slide 12: two shows, 90,000 people and the cost of saying Free Palestine. | Used in part: the two-show count is computed from the official past-dates page; the 90,000 figure is held because no admitted attendance denominator verifies it. |

### `ed-sheeran-response-2026-09-15`: 6 passages

| Passage | Disposition |
|---|---|
| Slide 1: Sheeran says he is appalled by the conflict, invited Macklemore and lets support acts choose setlists. | Held unused: background, not the recorded decision. |
| Slide 2: venues said they would pull shows; Sheeran says he spoke with venues and Kraft and the venue/promoter decision was final. | Used: venue-warning and final-decision lines in the statements section. |
| Slide 3: Sheeran says the promoter made the decision and Macklemore's contract was with the promoter. | Used: promoter-attribution line in the statements section. |
| Slide 4: unity, personal views and “I am not complicit.” | Held unused: position statement, not a lineup event or count. |
| Slide 5: his audience and nonpolitical-forum explanation; respect for Macklemore and preference for diplomacy. | Held unused: rationale, not a lineup event or count. |
| Slide 6: he tried to build bridges and did not find a solution. | Held unused: preserved in the record, but the page already uses the more specific slide 2 line. |

### `finneas-withdrawal-2026-09-15`: 1 passage

| Passage | Disposition |
|---|---|
| One slide: artists should not be silenced; Finneas withdraws from upcoming Sheeran dates and stands with Palestinians. | Used: withdrawal line in the statements section and departure count. |

### `aaron-rowe-withdrawal-2026-09-15`: 1 passage

| Passage | Disposition |
|---|---|
| One slide: Rowe withdraws as a North American support act, explains the decision and says Free Palestine. | Used: withdrawal line in the statements section and departure count; political rationale held unused. |

### `lukas-graham-withdrawal-2026-09-15`: 1 passage

| Passage | Disposition |
|---|---|
| One slide: the band rejects wealth controlling speech and withdraws from remaining dates. | Used: withdrawal line in the statements section and departure count. |

### `beoga-withdrawal-2026-09-15`: 3 passages

| Passage | Disposition |
|---|---|
| Slide 1: Beoga departs as Sheeran's band on the remaining U.S. tour and describes its relationship with him. | Used: departure line in the statements section and departure count. |
| Slide 2: the band says it will not play venues that silence Free Palestine advocacy and names Kraft and BDS. | Held unused: rationale and advocacy claims do not change the lineup count. |
| Slide 3: Irish colonial history, Irish Artists for Palestine and a post-ceasefire death claim. | Out of scope: contextual claims require a separate denominator and do not change the lineup. |

### `loop-tour-north-america-faq`: 4 passages

| Passage | Disposition |
|---|---|
| Venue and official-ticketing-company table for 22 cities/venues. | Used: venue names in the admitted schedule array; ticketing companies held unused. |
| Twenty-seven dated rows from June 13 through November 7. | Used: complete schedule denominator, 10 remaining dates and eight remaining cities. |
| Six-ticket customer limit. | Out of scope: ticket-purchase rule, not a lineup event or count. |
| All sales final and customer-support routes. | Out of scope: ticket terms, not a lineup event or count. |

### `ed-sheeran-past-tour-dates-2026-09-20`: 2 passages

| Passage | Disposition |
|---|---|
| September 5, 2026, MetLife Stadium. | Used: second MetLife date and two-show computation. |
| September 4, 2026, MetLife Stadium. | Used: first MetLife date and two-show computation. |

### `gillette-loop-tour-2026-09-20`: 4 passages

| Passage | Disposition |
|---|---|
| September 25 and 26, 2026, Loop Tour dates. | Used: official remaining-date table and detail block. |
| The dates are Sheeran's eighth and ninth performances at Gillette. | Held unused: lifetime venue count does not change this event. |
| Event-day parking, gates and start times. | Out of scope: attendee logistics. |
| Stadium/artist management may prohibit signs or banners based on message content. | Held unused: a sign policy is not evidence of the artist-lineup decision. |

### `lincoln-field-loop-tour-2026-09-20`: 2 passages

| Passage | Disposition |
|---|---|
| The page marks the Loop Tour event as passed and gives September 19. | Used: first scheduled date after the departures and detail block. |
| Lincoln Financial Field address and Philadelphia Eagles organizer. | Held unused: venue logistics do not change the event. |

## Gap list (`pin_gaps.mjs`)

| Record | Line | Disposition |
|---|---|---|
| `macklemore-removal-statement-2026-09-14` | L15 `thirteen years` | Held unused: relationship duration does not affect the lineup record. |
| `macklemore-removal-statement-2026-09-14` | L27 `three years` | Held unused: advocacy duration does not affect the lineup record. |
| `macklemore-removal-statement-2026-09-14` | L42 `90,000 people` | Held unused: no admitted attendance denominator verifies the claim. |
| `beoga-withdrawal-2026-09-15` | L7 `10 years` | Held unused: friendship duration does not affect the lineup record. |
| `loop-tour-north-america-faq` | L27 `Official Ticketing Companies` | Out of scope: ticket seller identity does not affect the lineup event. |
| `loop-tour-north-america-faq` | L52 `Seminole Hard Rock Hotel` | Used: normalized as Hard Rock Live in the remaining-date table; hotel branding omitted for compact display. |
| `loop-tour-north-america-faq` | L55 `Official Ticketing Company` | Out of scope: app-access instruction. |
| `loop-tour-north-america-faq` | L76 `Artist Presale` | Out of scope: 2025 presale timing. |
| `loop-tour-north-america-faq` | L78 `Amex Presale Tickets` | Out of scope: 2025 presale timing. |
| `loop-tour-north-america-faq` | L80 `Spotify Fans First` | Out of scope: 2025 presale timing. |
| `loop-tour-north-america-faq` | L82 `Ticketmaster Presale` | Out of scope: 2025 presale timing. |
| `loop-tour-north-america-faq` | L86 `Radio Presales` | Out of scope: 2025 presale timing. |
| `loop-tour-north-america-faq` | L88 `General Onsale` | Out of scope: 2025 sale timing. |
| `loop-tour-north-america-faq` | L259 `Official Ticketing` | Out of scope: accessibility contact instruction. |
| `loop-tour-north-america-faq` | L260 `Accessibility Guide` | Out of scope: accessibility contact instruction. |
| `ed-sheeran-past-tour-dates-2026-09-20` | L34 `Photo Gallery` | Out of scope: gallery navigation, not a dated record. |
| `gillette-loop-tour-2026-09-20` | L19 `Patriot Place Plaza` | Out of scope: box-office location. |
| `gillette-loop-tour-2026-09-20` | L20 `Gillette Stadium App` | Out of scope: mobile-ticket instruction. |
| `gillette-loop-tour-2026-09-20` | L24 `6.5` | Out of scope: bag dimensions. |
| `gillette-loop-tour-2026-09-20` | L33 `General Seating` | Out of scope: entrance instruction. |
| `gillette-loop-tour-2026-09-20` | L46 `Back Bay` | Out of scope: transit stop. |
| `gillette-loop-tour-2026-09-20` | L46 `Dedham Corporate Center` | Out of scope: transit stop. |
| `gillette-loop-tour-2026-09-20` | L53 `Commuter Rail` | Out of scope: transit instruction. |
| `gillette-loop-tour-2026-09-20` | L63 `Cross Insurance Club` | Out of scope: restroom location. |
| `gillette-loop-tour-2026-09-20` | L65 `Sports Illustrated Pavilion` | Out of scope: restroom location. |
| `gillette-loop-tour-2026-09-20` | L75 `Tom Brady` | Out of scope: venue attraction. |
| `lincoln-field-loop-tour-2026-09-20` | L11 `Host Your Event` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L12 `Stadium Lighting Requests` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L18 `Ticket Transfers` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L19 `Premium Seating` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L20 `Club Level Seating` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L21 `Event Suite Rentals` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L22 `Firstrust Bank Club` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L24 `Single Game Packages` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L25 `Verified Tickets` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L27 `Pro Shop` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L29 `Pro Shop Parking` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L34 `Fan First Event` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L40 `Concert Floor Entry` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L42 `Waze Map Links` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L43 `Seating Bowl Diagram` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L45 `Medical Locations` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L49 `Account Manager` | Out of scope: site navigation. |
| `lincoln-field-loop-tour-2026-09-20` | L63 `Philadelphia Eagles` | Held unused: organizer label does not change the date or lineup. |

All 44 lines emitted by `pin_gaps.mjs` are dispositioned above.

## What could not be admitted and why

The executed contracts among the artists, Messina Touring Group and the venues were not published on any checked first-party or coverage route. That prevents this turn from establishing contractual final authority; it records Macklemore's, Sheeran's, Messina's and Kraft's attributed accounts separately. Messina's own site did not publish its event statement, so Rolling Stone is the carrier. Kraft's first-party pages did not publish his response, so USA Today is the full-statement carrier. The Instagram pages were capturable, but their normal extracted text omitted carousel slide contents; the raw HTML and images are pinned and every slide is transcribed into a paired text record. No selected record was refused or unreachable.

## Turn three A/B gap admissions and disproof searches

All four A/B gap lines from the reader model were handled before story drafting.

| Reader-model gap | Turn-three disposition |
|---|---|
| `gap-ap-philadelphia-post-show-2026-09-19` | Admitted as `ap-philadelphia-outcome-2026-09-19` from forced registry run `capture-oneoff-20260920T072513Z`; the forced capture was necessary because the canonical URL had previously deduplicated to the pre-show revision. |
| `gap-cair-philadelphia-records-request` | Admitted as `cair-philadelphia-records-request-2026-09-17` from registry run `capture-oneoff-20260920T072451Z`. |
| `gap-executed-contracts` | Retained as a bounded absence after official-route review and fresh registry searches for `Macklemore contract promoter Messina Loop Tour`, which returned no contract record. |
| `gap-prior-comparable-loop-lineup-change` | Retained as a bounded absence after fresh registry searches for `Ed Sheeran Loop Tour support act removed withdrew lineup`, which returned no earlier comparable event record. |

Additional registry searches for `CAIR Philadelphia Macklemore records response` and `Ed Sheeran Loop Tour replacement opener Philadelphia Gillette` returned no result record or rebuilt-lineup record. LEANN searches for contract authority and a prior comparable change returned no usable record from `news-articles-clean-v1`; that index reported a September 7 vintage, so it is supporting disproof only. No selected fetch was refused.

### Census line: `ap-philadelphia-outcome-2026-09-19`

- Canonical URL: `https://apnews.com/article/ed-sheeran-concert-macklemore-philadelphia-d452b6eadff285553b20c558191886bb`
- Registry run: `capture-oneoff-20260920T072513Z`
- Captured: `2026-09-20T07:25:14.066062Z`
- Raw pin: `data/sources/ed-sheeran-tour/coverage/ap-philadelphia-outcome-2026-09-19.html`, 967830 bytes, SHA-256 `e62c364d6f283258d3e44c4f624ae9e28cb5267d02730b057f6c60614eaa55fd`
- Text sibling: `data/sources/ed-sheeran-tour/coverage/ap-philadelphia-outcome-2026-09-19.txt`, 5007 bytes, SHA-256 `e7d4654728cb9f51b44c837f7ae4ac74570d8fe11a079d01bf8a84f3956c13bb`

| Passage | Disposition |
|---|---|
| The concert began with no opener and other musicians joined later. | Used: observed Philadelphia outcome. |
| Sheeran called the situation in Gaza “catastrophic and unjustifiable.” | Used: first-show remarks. |
| Sheeran said he worried about venues preapproving performances. | Used: consequence of the lineup dispute. |
| A small pro-Palestinian demonstration gathered outside before the show. | Used: observed outside response. |
| AP's statement that the removal came at Kraft's urging. | Held unused: the record does not establish the alleged broader coordination as settled fact. |
| Donation amounts and Pollstar earnings. | Held unused: graded C or outside this story's A/B reader path. |

### Census line: `cair-philadelphia-records-request-2026-09-17`

- Canonical URL: `https://pa.cair.com/pressrelease/macklemore-letter/`
- Registry run: `capture-oneoff-20260920T072451Z`
- Captured: `2026-09-20T07:25:01.501326Z`
- Raw pin: `data/sources/ed-sheeran-tour/cair-philadelphia-records-request-2026-09-17.html`, 122132 bytes, SHA-256 `cfb80fe5d13f5fd6fc59240861769393b544d736693341e60588d4ea31506ea5`
- Text sibling: `data/sources/ed-sheeran-tour/cair-philadelphia-records-request-2026-09-17.txt`, 6245 bytes, SHA-256 `97491530a91af3b0baa51616e63119850f42d78b6b381d54188058d2cd632131`

| Passage | Disposition |
|---|---|
| CAIR-Philadelphia filed a Pennsylvania Right-to-Know request concerning the Philadelphia removal. | Used: dated request. |
| The request seeks communications, decision participation and any policy, contract, safety consideration or other asserted authority. | Used: scope of the unresolved record. |
| The request asks whether the City of Philadelphia or PAID was involved. | Held unused: the story keeps the request scope compact. |
| The request does not presume what responsive records will show. | Used: explicit boundary against treating the request as a result. |
| The open-letter campaign and organizational mission. | Held unused: do not answer the reader model's questions. |

## Turn three independent interrogation admissions

The September 20 interrogation returned 20 numbered items. Registry run `capture-oneoff-20260920T074821Z` attempted 10 named public records, captured nine and found the Guardian article already held in `quarry-wire-scheduled-20260914T160000Z`. A second run, `capture-oneoff-20260920T075234Z`, captured the named JTA background and Gillette post; the cited USA Today and JTA petition records were already held. Six focused pre-capture registry searches returned no held record for the Wall Street Journal call, Aaron Rowe follow-up, Philadelphia pickup band, Pink, Alexandria Ocasio-Cortez or Ken Casey.

Three records added distinct, bounded detail and were admitted. The remaining captures were read and typed in the manifest needs ledger as already answered, contextual reaction, redundant coverage or a number without a complete denominator. The story view remains limited to the reader model's A and B material.

### Census line: `wsj-tour-phone-call-2026-09-16`

- Canonical URL: `https://www.wsj.com/arts-culture/music/the-40-minute-phone-call-that-left-ed-sheerans-tour-hanging-by-a-thread-99e07984`
- Registry run: `capture-oneoff-20260920T074821Z`
- Captured: `2026-09-20T07:48:45.809264Z`; credentialed browser recovery succeeded after the first request returned 401.
- Raw pin: `data/sources/ed-sheeran-tour/coverage/wsj-tour-phone-call-2026-09-16.html`, 782141 bytes, SHA-256 `4715050373b804633774848406e101f65250aa6304390c4e64f5942e14138a91`
- Text sibling: `data/sources/ed-sheeran-tour/coverage/wsj-tour-phone-call-2026-09-16.txt`, 9062 bytes, SHA-256 `1d4e0a1a0807be66124f8182cd6e48b840d6109d17cd7b71ec82a566e50a6589`

| Passage | Disposition |
|---|---|
| Several NFL owners were prepared to cancel dates while Macklemore remained on the bill. | Used in the detail layer as anonymous-source support for broader venue pressure. |
| David Tepper, Arthur Blank and Jeffrey Lurie were named in the account. | Used in the detail layer with the anonymous-source qualification. |
| The 40-minute Kraft-Sheeran call and the report of a prior assurance. | Held from the story view: neither supplies the underlying communications or contracts. |
| Donation amounts, tour gross and other artist comparisons. | Held unused: graded C or D against the reader model. |

### Census line: `rolling-stone-aaron-rowe-followup-2026-09-18`

- Canonical URL: `https://au.rollingstone.com/music/music-news/aaron-rowe-ed-sheeran-robert-kraft-101272/`
- Registry run: `capture-oneoff-20260920T074821Z`
- Captured: `2026-09-20T07:49:36.582545Z`
- Raw pin: `data/sources/ed-sheeran-tour/coverage/rolling-stone-aaron-rowe-followup-2026-09-18.html`, 105135 bytes, SHA-256 `e7ac5b8504c00487954125b3632ec58e667859ac54207eb33331358d416a9ca7`
- Text sibling: `data/sources/ed-sheeran-tour/coverage/rolling-stone-aaron-rowe-followup-2026-09-18.txt`, 2895 bytes, SHA-256 `f6464ccbe547ce353d83b5a2d3ecce6549580df7644a612429f43d9c13e38b08`

| Passage | Disposition |
|---|---|
| Rowe redirected criticism toward Kraft rather than Sheeran. | Used in the detail layer as a later qualification to the withdrawal. |
| Rowe maintained that Macklemore should not have been removed. | Used in the detail layer. |
| Rowe's broader political language and criticism of institutions. | Held unused: reaction does not change the withdrawal or tour authority record. |

### Census line: `nyt-philadelphia-outcome-2026-09-19`

- Canonical URL: `https://www.nytimes.com/2026/09/19/arts/music/ed-sheeran-macklemore-gaza-tour.html`
- Registry run: `capture-oneoff-20260920T074821Z`
- Captured: `2026-09-20T07:49:25.939931Z`
- Raw pin: `data/sources/ed-sheeran-tour/coverage/nyt-philadelphia-outcome-2026-09-19.html`, 268112 bytes, SHA-256 `44ca109b05cb10ba20d9d137a3cf4e0cf63ec375e8b6376551a376c90cfabecc`
- Text sibling: `data/sources/ed-sheeran-tour/coverage/nyt-philadelphia-outcome-2026-09-19.txt`, 3058 bytes, SHA-256 `05bc968720ed4c28df8f2ddf522fa6f5d6cdbe692d32c4c601d2340eea30f66c`

| Passage | Disposition |
|---|---|
| The Philadelphia show started two hours later without an opener. | Used in the detail layer. |
| Sheeran called the October 7 attack horrific and addressed Gaza and the West Bank. | Used in the detail layer to preserve the fuller scope of his remarks. |
| The venue-preapproval concern. | Already used from the admitted AP outcome. |

### Interrogation captures not admitted

| Record or route | Registry result | Reason not admitted |
|---|---|---|
| JTA background on “Hind's Hall” | `capture-oneoff-20260920T074821Z`, captured | Song history does not change the lineup event or authority dispute. |
| ADL post | `capture-oneoff-20260920T074821Z`, captured | Advocacy reaction does not establish the decision or contract. |
| Guardian Pink account | `quarry-wire-scheduled-20260914T160000Z`, already held | Reaction does not alter the lineup decision or four departures. |
| Rolling Stone Australia AOC account | `capture-oneoff-20260920T074821Z`, captured | Political reaction does not establish authority or a lineup change. |
| Rolling Stone Ken Casey account | `capture-oneoff-20260920T074821Z`, captured | Industry opinion from a nonparticipant does not establish this tour's contract. |
| IBTimes UK Beoga profile | `capture-oneoff-20260920T074821Z`, captured | Collaboration history does not change Beoga's recorded role or departure. |
| Digital Music News ticket account | `capture-oneoff-20260920T074821Z`, captured | Resale asking prices do not provide a complete sales or attendance denominator. |
| USA Today MetLife account | `quarry-wire-scheduled-20260917T100020Z`, already held | Additional stage remarks are below the reader model's A/B event path. |
| JTA petition account | `capture-oneoff-20260920T074133Z`, already held | The admitted Rolling Stone pin already establishes the petition and removal request. |
| JTA 2014-costume background | `capture-oneoff-20260920T075234Z`, captured | Historical background is outside the bounded 2026 lineup event and does not adjudicate Kraft's allegation. |
| Gillette 2025 lineup post | `capture-oneoff-20260920T075234Z`, captured | A pre-event promotional post does not displace AP's later report that Rowe and Lukas Graham were replacements for the remaining U.S. dates. |

Every numbered interrogation item has a separate needs-ledger row in the manifest and a keyed disposition in the interrogation file.

## Patch round 1 ledger

The patch is limited to the 18 reviewer items. Sibling counts state how many same-class instances were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| 1 | 1 principal-statement passage cluster | Patched. Sheeran's story-view account now includes support-act setlists, his week of venue talks including Kraft, the promoter contract, touring livelihoods, and his children-and-families rationale. It remains attributed to him and does not settle contractual authority. |
| 2 | 1 omitted B-grade explanation | Patched. Macklemore's account of Sheeran's stated neutrality and his argument about three years of similar remarks reaching a larger artist, stadiums and audience is in the story view. |
| 3 | 1 incomplete Philadelphia-remarks passage | Patched. Sheeran's apology for mistakes and disappointing fans appears beside the Gaza sentence without tying the apology to any particular decision. |
| 4 | 1 premature response-absence sentence | Patched. The story says the September 17 request was still inside Pennsylvania's five-business-day response period on Sunday, September 20. The saved city record also supports a proof-layer sentence about the public lease chain and expressly does not prove public-body participation in the removal. |
| 5 | 1 petition-scope passage | Patched. The live form is pinned and the story names Sheeran, tour leadership and all host venues as addressees, plus its advance-approval question. |
| 6 | 1 page-owned record-count sentence | Patched. The sentence about 24 saved documents and a comparable event was cut. |
| 7 | 1 omitted direct response to an allegation | Patched. Macklemore's distinction between antisemitism and criticism of Israel or Zionism appears where Kraft's characterization is reported. |
| 8 | 1 omitted venue-control mechanism | Patched. Gillette's reserved content control over signs and banners appears beside the general tour-control account, with a limit against treating it as proof of the removal decision. |
| 9 | 6 project-vocabulary occurrences | Patched. Every occurrence of `admitted` and every sentence that made the page's collection of records the acting subject was removed from the reader-facing story. |
| 10 | 1 out-of-order qualification | Patched. The AP tour-control piece is introduced before the nonparticipant qualification. |
| 11 | 2 number-production sentences | Patched. The story states the 10-show fact; the dated-row method sits in proof. |
| 12 | 1 unnamed-venue sentence | Patched. The seven venues attributed to Rolling Stone are named before the response limitation. |
| 13 | 1 underspecified pledge sentence | Patched. The proof layer says Macklemore pledged Loop Tour earnings on September 16 to six Palestinian relief nonprofits. |
| 14 | 1 vague stage reference | Patched. The page now says MetLife Stadium. |
| 15 | 1 causal-sounding dek sequence | Patched. The dek states that Macklemore played the two MetLife shows and then lost eight scheduled appearances. |
| 16 | 17 document-subject sentences | Patched. Event participants, actions and public facts now lead the sentences; schedule arithmetic and source-specific support remain in proof. |
| 17 | 3 repeated authority statements | Patched. The unresolved-authority formulation remains once in The catch; the dek and unknowns now carry the specific role and contract limits instead. |
| 18 | 1 first narrative mention | Patched. The first narrative mention identifies the Loop Tour as Sheeran's stadium tour. The held kicker was not changed. |

## Patch round 1 source admissions

### Census line: `iac-loop-tour-petition-2026-09`

- Canonical URL: `https://forms.monday.com/forms/f163b4356de725b93cde321cf3f1e2d5?r=use1`
- Registry run: `capture-oneoff-20260920T083749Z`
- Captured: `2026-09-20T08:38:01.848340Z`
- Raw pin: `data/sources/ed-sheeran-tour/iac-loop-tour-petition-2026-09.html`, 22931 bytes, SHA-256 `1047f71019330a661300a1ebc66863115963fbe835da6ec6cac7ce775bbf59a7`
- Text sibling: `data/sources/ed-sheeran-tour/iac-loop-tour-petition-2026-09.txt`, 668 bytes, SHA-256 `83b7643b699fd1960b5b9b6c0f090c10cc1280f71a4be56722297bc455a1b7fb`

| Passage | Disposition |
|---|---|
| The petition addresses Sheeran, tour leadership and all venues hosting the tour. | Used: scope of the request. |
| It calls for Macklemore's removal from remaining dates. | Used: requested action. |
| It asks whether his speech, visuals and performance of `Hind's Hall` were approved in advance. | Used: the petition's control question. |

The normal extractor returned only the form title. The readable sibling is a transcription of the petition text embedded in `window.form_data` in the paired raw HTML.

### Census line: `pa-open-records-citizens-guide-2026-09-20`

- Canonical URL: `https://www.openrecords.pa.gov/RTKL/CitizensGuide.cfm`
- Registry run: `capture-oneoff-20260920T084135Z`
- Captured: `2026-09-20T08:41:47.687006Z`
- Raw pin: `data/sources/ed-sheeran-tour/pa-open-records-citizens-guide-2026-09-20.html`, 26415 bytes, SHA-256 `49932e50f84571a695ab877dbfcfc615a606c5be9ba86621d68c8a628be46985`
- Text sibling: `data/sources/ed-sheeran-tour/pa-open-records-citizens-guide-2026-09-20.txt`, 9762 bytes, SHA-256 `a3aea0f75c12d2e8b095f4adc534cd206c58005426c7046d576a7f91ed0e097a`

| Passage | Disposition |
|---|---|
| Pennsylvania agencies have five business days to grant, deny or extend a Right-to-Know request. | Used: the September 20 response period had not run. |
| The clock starts the day after receipt during business hours. | Held from the story: the five-business-day rule is enough to bound the timing. |

### Census line: `philadelphia-stadium-lease-2007`

- Canonical URL: `https://www.phila.gov/media/20201222120535/PAID-Multi-Model-Lease-Revenue-Refunding-Bonds-Series-2007-B.pdf`
- Registry run: `capture-oneoff-20260920T084135Z`
- Captured: `2026-09-20T08:41:58.196231Z`
- Raw pin: `data/sources/ed-sheeran-tour/philadelphia-stadium-lease-2007.pdf`, 3247345 bytes, SHA-256 `154757fe47ba0c921dc5baf9e7547cf52332806f6a7976c2fe6ff11457d6a59a`
- Text sibling: `data/sources/ed-sheeran-tour/philadelphia-stadium-lease-2007.txt`, 1148 bytes, SHA-256 `a49d027fb55cf09def1a5c837f021819c71a1fd91605507a74a39819782b2aa8`

| Passage | Disposition |
|---|---|
| The City leases the stadium parcel to the Philadelphia Authority for Industrial Development. | Used in proof: public lease chain. |
| The Authority leases stadium premises to the Eagles. | Used in proof: why public bodies could hold responsive records. |
| Any role by either public body in Macklemore's removal. | Not established by the lease and not claimed. |

The text sibling transcribes the relevant lease definitions from pages C-3 to C-4 of the paired PDF.

## Patch round 2 source admissions

### Census line: `tampa-bay-times-raymond-james-response-2026-09-15`

- Canonical URL: `https://www.tampabay.com/culture/entertainment/music/2026/09/15/macklemore-ed-sheeran-tampa-sports-authority-raymond-james-concert/`
- Registry run: `capture-oneoff-20260920T191616Z`
- Captured: `2026-09-20T19:16:28.402160Z`
- Raw pin: `data/sources/ed-sheeran-tour/coverage/tampa-bay-times-raymond-james-response-2026-09-15.html`, 215079 bytes, SHA-256 `09227a5dba32cb40ff38aeb3fd52249d6872103e77c03d4d520bcb225f0bae1e`
- Text sibling: `data/sources/ed-sheeran-tour/coverage/tampa-bay-times-raymond-james-response-2026-09-15.txt`, 1681 bytes, SHA-256 `7af7537c9733b4824976be6bfa513c303867929c6630d89d7fcdfe904cd05619`

| Passage | Disposition |
|---|---|
| Tampa Sports Authority board member Alan Clendenin said the public agency managing Raymond James Stadium had nothing to do with the lineup change. | Used in the story view to separate Clendenin's account from the other venue accounts. |
| Alan Clendenin said the authority does not get involved in freedom-of-speech issues. | Held in the record because the denial itself supplies the needed boundary. |
| Joe Robinson contrasted publicly operated Raymond James Stadium with privately owned Gillette Stadium. | Held in the record because the ownership comparison is carried by the already pinned Rolling Stone passage. |

The fresh registry fetch succeeded. Its standard text extraction returned a subscriber and comments stub, but the fresh raw file contained the article body in page data. The readable sibling transcribes the relevant passages from that fresh raw file. The reviewer-supplied fallback copy was not used.

### Census line: `ajc-metlife-intervention-2026-09-08`

- Canonical URL: `https://www.linkedin.com/posts/american-jewish-committee_while-opening-for-ed-sheeran-at-metlife-stadium-activity-7503112129827237888-ZtkS`
- Registry run: `capture-oneoff-20260920T191639Z`
- Captured: `2026-09-20T19:16:48.279760Z`
- Raw pin: `data/sources/ed-sheeran-tour/ajc-metlife-intervention-2026-09-08.html`, 127467 bytes, SHA-256 `f2ca184bdf37a86f5b5ded2e58353795b860c9c55dd31675fe5de11403ce515e`
- Text sibling: `data/sources/ed-sheeran-tour/ajc-metlife-intervention-2026-09-08.txt`, 2635 bytes, SHA-256 `e02d7628b2390b9360aa24d7b56c41a8539b1f2df16ff022d0661e6c903cd764`

| Passage | Disposition |
|---|---|
| AJC New Jersey said it contacted the Meadowlands after the first show. | Used in the story view and attributed to AJC as an interested party. |
| AJC said stadium administrators raised its concerns directly with the tour and artists. | Used in the story view with the same attribution. |
| AJC said refunds were offered before the second show to ticket holders who chose not to attend. | Used in the story view with the same attribution. |

A registry search for `MetLife AJC refund Macklemore` from September 4 through September 20 returned no first-party MetLife result. The page therefore identifies AJC as the source and says MetLife had not published its own account by September 20.

## Patch round 2 ledger

The patch is limited to R1 through R4 and S1 through S13. Sibling counts state how many same-class instances were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---|---:|---|
| R1 | 1 held headline | Held with reason. The h1 is the accepted state label and the reviewer reserved it for the editor. No page sentence critiques it. |
| R2 | 1 seven-venue attribution cluster | Patched. Gillette's refusal is confirmed by its owner, Tampa Sports Authority board member Alan Clendenin says the public agency was not involved, and the other five venues remain supported by Messina's general statement and Rolling Stone's separate naming. A second cited sentence states that only Gillette and Bank of America Stadium were identified as privately owned. |
| R3 | 1 missing interval between the MetLife shows | Patched. AJC's interested-party account of its contact, the stadium raising concerns, and the refund offer now sits between the two performances. A bounded absence sentence says MetLife had not published its own account by September 20. |
| R4 | 4 CAIR request references across page, data and manifest | Patched. Each reference now identifies the pin as CAIR-Philadelphia's announcement that it submitted a request. Claims of exact request wording, recipients or filing metadata were removed. The record chip label was not changed. |
| S1 | 1 narrative signs-and-banners sentence | Patched. The sentence left the narrative and became one plain clause in a venue-authority detail block. |
| S2 | 1 uncited sentence boundary | Patched. The Sheeran statement citation now follows the setlist sentence directly. |
| S3 | 2 Kraft platform statements | Patched. The story-view statement remains; the duplicate detail statement was removed. |
| S4 | 1 document-subject sourcing clause | Patched. The detail now says the Wall Street Journal reported the owner-pressure account and names its anonymous sourcing. |
| S5 | 1 page-owned headline critique | Patched. The sentence now states only that the four departing artists held different roles. |
| S6 | 1 document-subject table caption | Patched. The caption names the four artists, their roles and what each did. |
| S7 | 2 response-period statements | Patched. The dated explanation remains once in What happened next and was removed from the unknowns. |
| S8 | 3 no-opener statements and 1 vague time phrase | Patched. The no-opener outcome appears once in the What happened narrative and once in the New York Times detail. The detail says the show began two hours later than scheduled. |
| S9 | 1 lease-chain hedge | Patched. The detail states only the city-to-authority-to-Eagles lease chain. |
| S10 | 2 KPI labels and 2 matching feature-table labels | Patched. The labels state that eight of ten remaining shows had booked Macklemore and that all ten dates stayed scheduled. |
| S11 | 2 project-worded source meta strings | Patched. They now read `2011 bond document` and `saved again on 2026-09-20`. |
| S12 | 1 missing eight-slot outcome | Patched. What happened says the tour continued without Macklemore and that the first post-removal date went ahead in Philadelphia with no support act. |
| S13 | 5 held section kickers | Held with reason. They are shared-component labels reserved by the reviewer and were not changed. |

## Patch round 3 source admissions

All four admitted records came from fresh registry run `capture-oneoff-20260920T200641Z`. The reviewer-supplied fallback files were not used.

### Census line: `boston-25-gillette-refund-complaints-2026-09-18`

- Canonical URL: `https://www.boston25news.com/news/local/ags-office-reviewing-two-dozen-refund-requests-after-ed-sheeran-concert-controversy/AEHZEDHUIZFHNLMSPNWKTCVZ24/`
- Registry run: `capture-oneoff-20260920T200641Z`
- Captured: `2026-09-20T20:06:42.440792Z`
- Raw pin: `data/sources/ed-sheeran-tour/coverage/boston-25-gillette-refund-complaints-2026-09-18.html`, 236702 bytes, SHA-256 `a84d1883349eef7098ac93f576fd01824cd65cc698b33b6a12c2540fc7f79dc1`
- Text sibling: `data/sources/ed-sheeran-tour/coverage/boston-25-gillette-refund-complaints-2026-09-18.txt`, 2144 bytes, SHA-256 `8c4cc609655bfc950b59b15d2065ca8e62045f3f9b63a54e2bd09e671f11e8c0`

| Passage | Disposition |
|---|---|
| The Massachusetts attorney general's office was reviewing at least 25 complaints requesting Ticketmaster refunds. | Grade A. Used in What happened next as a complaint count, not a purchaser count. |
| The office said lineup changes do not necessarily entitle purchasers to refunds. | Grade B. Used to bound the refund dispute. |
| Ticketmaster said organizers set refund policy. | Grade B. Used beside the tour FAQ's all-sales-final term. |

### Census line: `massachusetts-ticket-refund-law-185d-2026-09-20`

- Canonical URL: `https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter140/Section185D`
- Registry run: `capture-oneoff-20260920T200641Z`
- Captured: `2026-09-20T20:06:43.000036Z`
- Raw pin: `data/sources/ed-sheeran-tour/massachusetts-ticket-refund-law-185d-2026-09-20.html`, 76311 bytes, SHA-256 `a29a5365096810e1a794b6795d0ac84170c56583772666d92ac8d60abde5e9c4`
- Text sibling: `data/sources/ed-sheeran-tour/massachusetts-ticket-refund-law-185d-2026-09-20.txt`, 3263 bytes, SHA-256 `72f62855e2a61333dc19db1770f5bac2297d81f80213e3243b605d774db02605`

| Passage | Disposition |
|---|---|
| Licensed ticket sellers must guarantee refunds in listed circumstances. | Grade B. Used to identify the legal test without saying it has been met. |
| One circumstance is a ticket that fails to match its advertised description unless the purchaser approved a substitution. | Grade B. Used in What we do not know yet. |

### Census line: `guardian-sheeran-philadelphia-video-2026-09-20`

- Canonical URL: `https://www.theguardian.com/music/video/2026/sep/20/ed-sheeran-sorry-for-mistakes-as-tour-resumes-video`
- Registry run: `capture-oneoff-20260920T200641Z`
- Captured: `2026-09-20T20:06:44.798196Z`
- Raw pin: `data/sources/ed-sheeran-tour/coverage/guardian-sheeran-philadelphia-video-2026-09-20.html`, 289492 bytes, SHA-256 `3d17b4664e6ab4d4bc4e609f961129d5cf9e019e73d109d538a9b4b66f2f578f`
- Text sibling: `data/sources/ed-sheeran-tour/coverage/guardian-sheeran-philadelphia-video-2026-09-20.txt`, 617 bytes, SHA-256 `6ccb8321a6534c33276a6509f633c93ef3d5c03bc6ef7870c68ae6c57b7a70b7`

| Passage | Disposition |
|---|---|
| Sheeran called the situation in Gaza catastrophic and unjustifiable. | Grade B. Used for Sheeran's own words in the Philadelphia paragraph. |
| The Guardian identifies the video source as Ed Sheeran via Instagram. | Grade C. Used to establish the carrier relationship. |

### Census line: `ed-sheeran-philadelphia-reel-2026-09-19`

- Canonical URL: `https://www.instagram.com/reel/DdfY7JYirtn/`
- Registry run: `capture-oneoff-20260920T200641Z`
- Captured: `2026-09-20T20:06:44.324055Z`
- Raw pin: `data/sources/ed-sheeran-tour/ed-sheeran-philadelphia-reel-2026-09-19.html`, 808308 bytes, SHA-256 `fbdde9974ba3db85b842683e61804943fc98da19cf6c71d6db0d6081e9730745`
- Text sibling: `data/sources/ed-sheeran-tour/ed-sheeran-philadelphia-reel-2026-09-19.txt`, 467 bytes, SHA-256 `f1aae2df315d24f4f7ee4d082b693474cbf8200651b68545f70fff68bb7dcf9c`

| Passage | Disposition |
|---|---|
| The caption says `Tonight in Philadelphia`. | Grade C. The reel is pinned as Sheeran's original video post. |
| The page exposes no transcript of the spoken remarks. | The Guardian video page is used as the carrier for Sheeran's own Gaza words. |

## Patch round 3 ledger

The patch is limited to R1 through R4 and S1 through S12. Sibling counts state how many same-class instances were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline | Held with reason. The h1 is the accepted state label reserved for the editor. It was not changed or discussed on the page. |
| R2 | 1 missing refund-dispute thread | Patched. What happened next now carries the complaint count, attorney general review, the office's stated position, Ticketmaster's policy statement and the FAQ term. What we do not know yet carries the statutory test and the unresolved question. |
| R3 | 1 secondary-only remarks citation cluster | Patched. The fresh Instagram reel is pinned because it serves a caption, and the fresh Guardian video carrier is cited for Sheeran's own Gaza words because the reel page has no transcript. AP and the New York Times remain cited for observed concert facts. |
| R4 | 2 Kraft introductions | Patched. The first mention identifies Robert Kraft as owner of the New England Patriots and Gillette Stadium. The later introduction now uses only his surname. |
| S1 | 2 Kraft introductions | Patched with R4 at the first mention and later reference. |
| S2 | 2 KPI labels and 2 matching visual labels | Patched. The second count now says all 10 are the same 10 remaining dates named by the first count. |
| S3 | 1 arithmetic-method sentence | Patched. The proof block now says that 10 of the 27 dates fall after September 14. |
| S4 | 1 stacked-hedge venue sentence | Patched. Rolling Stone is named once as reporting the five other objections, followed by their lack of confirmation. |
| S5 | 1 disconnected lease sentence | Patched. The sentence now says CAIR tied its records effort to the stadium's public land before giving the lease chain. |
| S6 | 1 response-window explanation | Patched. Only the plain fact that the five-business-day period had not run remains. |
| S7 | 2 tour-control qualification paragraphs | Patched. The nonparticipant qualification is folded into the sentence that introduces AP's three sources. |
| S8 | 3 appearances of the Philadelphia remarks | Patched. The narrative and timeline retain the remarks; the detail block now carries only the delayed start, October 7 and West Bank material. |
| S9 | 3 out-of-order What happened next paragraphs | Patched. The two CAIR paragraphs are consecutive, followed by the September 18 refund review and September 19 remarks. |
| S10 | 2 AJC and MetLife paragraphs | Patched. MetLife's lack of comment is folded into the paragraph that attributes the contact and refund account to AJC. |
| S11 | 5 source-list metadata strings | Patched. Each now says `saved September 20, 2026`, including the Ed Sheeran source. |
| S12 | 5 shared-component classes: 11 record chips, 1 check label, 1 sources introduction, 1 reading-mode menu and 5 section kickers | Held with reason. The reviewer reserved all five classes and none was changed. |
