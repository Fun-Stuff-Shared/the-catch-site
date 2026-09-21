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
- `gap-ap-philadelphia-post-show-2026-09-19`: 2026-09-19, [current AP Philadelphia record](https://apnews.com/article/ed-sheeran-concert-macklemore-philadelphia-d452b6eadff285553b20c558191886bb): the record audit found that the live article had advanced beyond the manifest's pre-show pin and reported the completed concert, Sheeran opening without an opener, his remarks and the planned protest; not admitted in the structure turn because the revised document is not pinned in the manifest.
- `gap-cair-philadelphia-records-request`: By 2026-09-20, [CAIR-Philadelphia public-records request](https://pa.cair.com/pressrelease/macklemore-letter/): the record audit found a request for communications, policies, contracts and decision records involving the venue, city entities, promoter, artists, Kraft and advocacy groups; not admitted in the structure turn because the document is outside the manifest and the request does not establish what responsive records will show.
- `gap-prior-comparable-loop-lineup-change`: No admitted record establishes an earlier comparable Loop Tour removal-and-withdrawals change, so the elapsed time since the last change of this kind cannot be stated from this record.

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

## Patch round 4 record checks

### Ticketmaster Standard Purchase Policy

- Canonical URL: `https://legal.ticketmaster.com/purchase-policy/`
- Fresh registry run: `capture-oneoff-20260920T210637Z`
- Captured: `2026-09-20T21:06:38.534241Z`
- Result: HTTP 200, 77089 raw bytes, SHA-256 `b4165e998415682f335814b8c914d589b51b3abd7bfdfc0bcb75036fc076ab58`
- Extracted text SHA-256: `cc60d547a2391b8803394fa692849f1e3072d499e4ba76bc814fb83ca27c1e97`
- Disposition: The served raw bytes and extracted text contain no `opening acts`, `subject to change` or cancellation clause. The page was not pinned or cited. The Boston 25 record carries the attorney general's direct quotation of the ticket term. The reviewer-supplied copy was not used.

### Lincoln Financial Field listing addendum

- Existing raw pin: `data/sources/ed-sheeran-tour/lincoln-field-loop-tour-2026-09-20.html`, 120628 bytes, SHA-256 `bb88599bb915a809eb36f48134694bd694e61e7e0d2f67501a9eb72b7206d315`
- Updated readable sibling: `data/sources/ed-sheeran-tour/lincoln-field-loop-tour-2026-09-20.txt`, 2290 bytes, SHA-256 `8da8402f96babdf4f7f545162d4e84829146a60849dce7918398180b784ffc67`

| Passage | Disposition |
|---|---|
| `Ed Sheeran will be joined on his stop at Lincoln Financial Field by Macklemore, Lukas Graham, and Aaron Rowe!` | Grade B. Used beside the no-opener outcome to show what the official venue page still advertised on September 20. |
| `dateModified":"2026-09-17T16:45:03+00:00"` | Grade B. Used to date the venue page's last recorded change. |

The readable sibling now includes these exact passages from the existing raw HTML metadata. The raw pin itself did not change.

## Patch round 4 ledger

The patch is limited to R1 through R6 and S1 through S13. Sibling counts state how many same-class instances were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline | Held with reason. The h1 is the accepted state label reserved for the editor. It was not changed or discussed on the page. |
| R2 | 2 refund passages | Patched. The complaint paragraph now states the opening-act change term quoted by the attorney general's office. The unknowns section states that term and the Massachusetts advertised-description rule separately, then says the office's September 18 statement did not classify the removal under the law's test. The fresh Ticketmaster capture did not contain the clause, so it was not pinned or cited. |
| R3 | 1 Philadelphia outcome paragraph | Patched. The no-opener account now says Lincoln Financial Field still advertised Macklemore, Lukas Graham and Aaron Rowe on September 20 and that the page metadata dated its last change to September 17. |
| R4 | 2 misleading source-usage lines and 0 page sentences | Patched. The AP and Reuters usage lines now say each separately published Rolling Stone's Messina statement and identify the reporting each added. No story sentence relied on either as independent confirmation. |
| R5 | 2 records-list entries for 1 AP URL | Patched. The preview entry was removed from the public records list. The remaining AP Philadelphia entry identifies the September 19 preview and September 20 revision as two captures of one article. |
| R6 | 2 CAIR-Philadelphia story-view mentions | Patched. The first mention identifies the Philadelphia chapter of the Council on American-Islamic Relations as a civil-rights advocacy group; the later short name remains. |
| S1 | 2 renderings of the redundant 10-of-10 KPI | Patched. The KPI and its matching feature-table row were removed. |
| S2 | 1 section kicker | Held with reason under S13. `The lineup changed` is a section kicker, and the reviewer reserved section kickers from this patch. |
| S3 | 1 petition introduction | Patched. The sentence now says the Israeli American Council launched a petition after the first MetLife show, what it sought and whom it addressed. |
| S4 | 2 Gillette confirmation sentences | Patched with an entailment boundary. One sentence now says plainly that Kraft confirmed Gillette's refusal, and the later duplicate was removed. The word `only` was not retained because the cited Rolling Stone pin says most other venues did not respond, not all, and therefore does not establish a complete confirmation census. |
| S5 | 1 seven-venue ownership sentence | Patched. The sentence says the seven are the venues on Rolling Stone's alleged-objection list before dividing them into two privately owned venues and five publicly owned or operated venues. |
| S6 | 1 sign-control detail | Patched. The sentence names Gillette's event rules and says the clause is one kind of content control reserved at the venue. |
| S7 | 1 contextless Philadelphia remarks sentence | Patched. The sentence now opens with the September 19 Philadelphia stage. |
| S8 | 1 complaint-count aside | Patched. The distinction between complaints and ticket holders is folded into the complaint sentence. |
| S9 | 4 `by September 20` story-view phrases | Patched. The repeated date was removed from the MetLife comment, other-venue confirmation, response-period and rebuilt-lineup sentences. The dated unknown about public contracts remains once. |
| S10 | 4 repeated role summaries | Patched. The dek and one Catch heading retain the distinction. The opening paragraph now reports only the departures, the duplicate Catch introduction was removed, and the table caption now says what the table records. |
| S11 | 1 audit-note sentence | Patched. The sentence about what Kraft did not address was removed; the coordination allegation remains attributed to Macklemore and the unresolved communications remain in unknowns. |
| S12 | 2 contract-publication locations | Patched. A plain sentence beside Sheeran's contract claim says no executed Macklemore contract was public; the broader contract unknown remains in the unknowns section. |
| S13 | 5 held shared-component classes: 11 record chips, 1 check label, 1 reading-mode menu, 6 saved-date metadata lines and 5 section kickers | Held with reason. The reviewer reserved all five classes, and none was changed. |

## Patch round 5 ledger

The patch is limited to R1 through R8 and S1 through S11. Sibling counts state how many same-class locations were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline and state label | Held with reason. The reviewer reserved both for the editor. Neither was changed or discussed on the page. |
| R2 | 2 schedule-denominator locations | Patched with the pin's boundary. The narrative now renders 27 total North American dates, 17 scheduled through September 14 and 10 afterward from the data module, cited to the official FAQ. The FAQ does not establish that all 17 earlier dates were performed, so the page does not make that claim. The existing detail block remains. |
| R3 | 1 reduced Sheeran account of how Macklemore joined | Patched. Sheeran's statement that Macklemore asked to join the previous year and that he agreed now sits beside Sheeran's setlist account. |
| R4 | 1 Kraft rationale paragraph | Patched. Kraft's stated limits concerning Palestinian suffering, advocacy and Hamas's responsibility now follow his hate-speech rationale. |
| R5 | 1 Beoga rationale paragraph | Patched. Beoga's phrase `zionist lobbies` is quoted as the band's claim, followed by the band's request that people research Kraft, Israel and the Boycott, Divestment and Sanctions movement. |
| R6 | 1 unexplained public-versus-private venue distinction | Patched. The Raymond James precedent and its promoter contract clause now explain the distinction, followed by the unresolved Sheeran-tour contract question. |
| R7 | 1 Macklemore removal-attribution paragraph | Patched. Macklemore's statement that he, Sheeran and Pink were not victims, and his career, money, safety and audience explanation, now accompany his attribution. |
| R8 | 2 conditional support-role rows | Patched. Rowe and Lukas Graham are labeled as support acts whom AP named as Macklemore's would-be replacements. |
| S1 | 1 incomplete seven-venue list | Patched. The sentence names all seven venues in Rolling Stone's alleged-objection list. |
| S2 | 1 setlist sentence and 1 MetLife-performance paragraph | Patched. The first-show performance account now comes before Sheeran's account that Macklemore chose his setlist. The duplicate in the later section was removed. |
| S3 | 1 Philadelphia venue-page sentence | Patched. The sentence says in reader words that the venue page still listed the three artists on September 20 and had last been changed on September 17. |
| S4 | 2 Macklemore schedule labels | Patched. The KPI and feature-table row now say eight of the 10 remaining dates were to include Macklemore. |
| S5 | 2 sign-rule locations | Patched. The sign-and-banner detail was cut from the page, and the records-list usage line no longer advertises it. |
| S6 | 1 refund-count aside | Patched. The aside was removed; the paragraph states only that the office was reviewing at least 25 complaints. |
| S7 | 4 table action cells | Patched. All four actions now use `Withdrew`. |
| S8 | 3 public-contract sentences | Patched. The body occurrence now sits with the Raymond James comparison, the broader unknown remains in the unknowns section, and the other body and Catch repetitions were removed. |
| S9 | 2 request-presumption sentences | Patched. The narrative retains CAIR-Philadelphia's qualification; the detail block no longer repeats it. |
| S10 | 1 misplaced Philadelphia outcome paragraph | Patched. The show outcome and venue-page listing moved from the September 14 sequence to What happened next, after the September 18 development. |
| S11 | 1 missing public-stake sentence | Patched with the pins' allocation of authority. The Raymond James paragraph now states that venue refusals can lead a promoter to remove an act from a national tour while the public record does not show the governing clause or final decision-maker. |
| HELD | 7 reserved classes | Held with reason. Reading-mode labels, record chips, section kickers, `How we check .`, saved-date lines, the `Coverage checked` and `Official data` group names, and the `Story updated` line were not changed. |

## Patch round 6 record checks

### CBS New York MetLife response report

- Canonical URL: `https://www.cbsnews.com/newyork/news/macklemore-pro-palestinian-comments-metlife-stadium-ed-sheeran/`
- Fresh registry run: `capture-oneoff-20260920T225305Z`
- Captured: `2026-09-20T22:53:17.614529Z`
- Result: HTTP 200, 657076 raw bytes, SHA-256 `670559704ff6e81e4ddc4327e3f038110bbffdda9a63df97ff5e9a1dae1126e2`
- Extracted text: 4303 bytes, SHA-256 `1bc5f809e8afd6967b9104c63b51a8405ba552953cb8edbdfb46b3cfe67c5300`
- Fallback disposition: not used because the fresh fetch succeeded.

| Passage | Disposition |
|---|---|
| `CBS News New York also reached out to MetLife stadium for comment and did not hear back.` | Grade B. Used only to state that MetLife Stadium had not responded to CBS New York's request by September 7. |
| Audience reactions, refund requests and descriptions of the two MetLife performances | Grade C. Held because existing pins carry the performance, petition and refund passages used by the story. |

### Patch round 6 bounded-absence census

- MetLife statement: the 17 coverage records, AJC account, venue statements and official venue records in the manifest were checked through September 20. CBS New York records no response by September 7, and no saved record in that bounded set carries a MetLife Stadium statement.
- Earlier Loop Tour support-lineup change: the official 27-date schedule, artist statements, tour coverage and the prior fresh registry search recorded in `gap-prior-comparable-loop-lineup-change` identify no earlier support-lineup change on this tour. The page states only that no prior case appears in this bounded set.

## Patch round 6 ledger

The patch is limited to R1 through R5 and S1 through S12. Sibling counts state how many same-class locations were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline and state label | Held with reason. The reviewer reserved both for the editor. Neither was changed or discussed on the page. |
| R2 | 1 first-MetLife performance paragraph | Patched. The paragraph now quotes Macklemore's words to Jewish audience members and his stated peace, dignity, respect and equality message, attributed to the AP removal report. |
| R3 | 4 bounded-absence paragraphs in unknowns | Patched. A separate bounded-absence sentence says the schedule, artist statements and coverage identify no earlier Loop Tour support-lineup change, so this tour supplies no prior comparison. |
| R4 | 1 unsupported MetLife-comment clause | Patched from a fresh CBS New York capture. The page now says MetLife did not respond to that outlet by September 7 and separately bounds the absence of a MetLife statement to the venue statements and coverage gathered through September 20. The reviewer fallback was not used. |
| R5 | 1 unexplained first mention of Pink | Patched. The first paragraph now identifies Pink as a singer, says she amplified the StopAntisemitism post and records her later statement that she did not seek Macklemore's silencing or firing. |
| S1 | 2 narrative mentions of `Hind's Hall` | Patched. The first mention identifies it as Macklemore's Columbia protest song; the later petition reference remains a title only. |
| S2 | 1 Meadowlands reference in the AJC account | Patched. Reader-facing prose now ties the Meadowlands directly to the MetLife Stadium show. The citation retains AJC's exact wording. |
| S3 | 2 narrative statements of Messina's venue-objection account | Patched. The later repetition was removed; the opening account remains. |
| S4 | 2 statements that venue communications and contracts are private | Patched. The detail-layer repetition was removed; the specific unknowns paragraph remains. |
| S5 | 2 qualifications that AP's industry participants were outside this tour | Patched. The Catch repetition was removed; the earlier mechanism paragraph keeps the qualification. |
| S6 | 1 detached Philadelphia demonstration detail | Patched. The demonstration is now attached to the September 19 Philadelphia outcome paragraph. |
| S7 | 1 Philadelphia lease-chain sentence | Patched. The sentence now begins with CAIR-Philadelphia's City-land basis for the request and gives the lease chain in the same sentence. |
| S8 | 1 Raymond James comparison paragraph | Patched. The paragraph leads with why the earlier dispute at a publicly owned venue on this tour matters before giving the contract clause and First Amendment account. |
| S9 | 1 table header, 2 replacement-role cells and 1 caption | Patched. The header says what the artists announced, the cells state the roles without source narration, and the caption carries AP's would-be-replacement attribution. |
| S10 | 2 fragmentary KPI labels | Patched. Both labels are complete phrases stating that four acts left the next day and that Macklemore had already played two MetLife shows. |
| S11 | 1 schedule-denominator sentence | Patched. It states 27 North American shows and 10 after September 14 without introducing the unused count of 17. |
| S12 | 2 consecutive venue-list hedges | Patched. `Alleged` appears only in the sentence introducing Rolling Stone's list; the next sentence refers to those seven venues. |
| HELD | 7 reserved classes | Held with reason. Reading-mode labels, `In this story`, record chips, section kickers, `How we check .`, saved-date lines and the sources-list introduction were not changed. The visual title was also left unchanged. |

## Patch round 7 record checks

### Philadelphia Inquirer concert review

- Canonical URL: `https://www.inquirer.com/arts/ed-sheeran-the-loop-tour-review-lincoln-financial-field-philadelphia-20260920.html`
- Fresh registry run: `capture-oneoff-20260920T221924Z`
- Captured: `2026-09-20T22:19:48.056110Z`
- Result: HTTP 200, 1128461 raw bytes, SHA-256 `004645a2dddab5a4572942405b47f896bc059dcc3638026d16277639147a91da`
- Extracted text: 6227 bytes, SHA-256 `51a3654c1e69793f1fbad147794b1506689b9f072b6941406340e6d4cbcbd498`
- Fallback disposition: not used because the fresh fetch succeeded.

| Passage | Disposition |
|---|---|
| Sheeran said he had to make difficult decisions, was making mistakes and was sorry. | Grade A. Used for his exact apology in Philadelphia. |
| Sheeran introduced a five-member backup band assembled on three days' notice. | Grade A. Used to explain how musicians joined after he began alone. |
| Sheeran said he removed the secondary stage because he feared what could happen if he stood in the audience. | Grade A. Used as his stated reason, not as an independent finding about the risk. |

### FOX 13 Raymond James contract report

- Canonical URL: `https://www.fox13news.com/news/kanye-west-tampa-concerts-why-bulletproof-contract-prevents-cancellation`
- Fresh registry run: `capture-oneoff-20260920T232733Z`
- Captured: `2026-09-20T23:27:46.815010Z`
- Result: HTTP 200, 194798 raw bytes, SHA-256 `76bd734c691f42236de86bc7e5a04bc9d2d1f44b7dcd90c29e42ea02106dc58c`
- Extracted text: 3027 bytes, SHA-256 `6ac662bb90f1f8bab7da8fe9adb0c02a2a1863413021739705ae25d2c6d26f0d`
- Fallback disposition: not used because the fresh fetch succeeded.

| Passage | Disposition |
|---|---|
| West's promoter requested the clause barring cancellation based on identity, past statements or political views. | Grade B. Used as a precedent for what a negotiated Raymond James contract can do. |
| West's team accepted lawsuit liability and the promoter agreed to pay more than $2 million in stadium expenses plus $5 per ticket. | Grade B. Used to state the consideration and allocation that accompanied the clause. |
| The clause establishes Macklemore's contract terms. | Refused. The record concerns a different promoter and artist and cannot establish any Sheeran-tour term. |

### Gillette Stadium Ticketmaster terms

- Canonical URL: `https://am.ticketmaster.com/gillettestadium/terms`
- Fresh registry run: `capture-oneoff-20260920T232733Z`
- Captured: `2026-09-20T23:27:57.606505Z`
- Result: HTTP 200, 104295 raw bytes, SHA-256 `aa6ea302ca7bbc47b67b9cc1df7fe2467b9c25a5823038fdf76dead67e29be72`
- Extracted text: 62132 bytes, SHA-256 `f570f45e5f63aeee37dd34fcfba25c1d8788155b4dc40cef4a40ecf0379bb78f`
- Terms last updated: July 2, 2026.
- Fallback disposition: not used because the fresh fetch succeeded and the opening-act clause appears in the served text.

| Passage | Disposition |
|---|---|
| `No refund will be owed if an opening act or festival performer is changed or canceled.` | Grade B. Used as the primary Gillette ticket term against which the unresolved Massachusetts statutory question is stated. |

### Patch round 7 bounded-absence census

- MetLife statement: CBS New York recorded no response to its request by September 7. The 18 coverage records, AJC account, venue statements and official venue records in the manifest were checked through September 20, and no public MetLife Stadium statement appears in that bounded set.
- Earlier Loop Tour support-lineup change: the official 27-date schedule, artist statements, tour coverage and the existing fresh-search census identify no earlier support-lineup change on this tour. The page states only that no prior case is on record.

## Patch round 7 ledger

The patch is limited to R1 through R6 and S1 through S6. Sibling counts state how many same-class locations were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline and state label | Held with reason. The reviewer reserved both for the editor. Neither was changed or discussed on the page. |
| R2 | 2 MetLife performance paragraphs | Patched. The first-show paragraph now contains only the free-Palestine call, Gaza images and `Hind's Hall`. Macklemore's address to Jewish listeners and his peace, love, dignity, respect and equality message now appear at the second show, cited to Rolling Stone and the Wall Street Journal for that night's placement. |
| R3 | 1 between-show chronology gap | Patched. The story attributes to the Journal's unnamed source the owner representatives' contact with promoters and the assurance that Macklemore would omit the issue. It says the source does not identify who gave the assurance, then proceeds to the second show. |
| R4 | 3 Philadelphia outcome locations | Patched from a fresh Inquirer capture. The narrative quotes Sheeran's apology, identifies the five-member band and three days' notice, and gives his stated reason for removing the secondary stage. The timeline remains a shorter account. No fallback was used. |
| R5 | 1 Raymond James comparison paragraph | Patched from a fresh FOX 13 capture. The paragraph says the promoter requested the clause and states the liability and payment terms. It presents the episode only as a precedent for what a negotiated venue contract can do, not as evidence of Macklemore's terms. No fallback was used. |
| R6 | 2 refund-term locations | Patched from fresh Gillette Stadium Ticketmaster terms. The body retains the attorney general review and policy position. The unknowns section quotes the primary no-refund clause and keeps the Massachusetts advertised-description question open. No fallback was used. |
| S1 | 2 first-paragraph Pink references | Patched. The sentence identifying Pink and explaining her role now comes before Macklemore names her in his statement. |
| S2 | 2 MetLife response sentences | Patched. CBS New York's dated request remains cited, and the bounded data-absence sentence now says in reader words that MetLife Stadium had made no public statement by September 20. |
| S3 | 1 prior-comparison sentence | Patched. The sentence states as a tour fact that no earlier support-lineup change is on record, so there is no prior Loop Tour case to compare. |
| S4 | 2 seven-venue references | Patched. The first reference now says Rolling Stone named seven alleged objectors and names all seven; the next sentence refers back to those seven. The qualification follows the pin and the entailment finding. |
| S5 | 1 Kraft rationale block | Patched. One paragraph states Kraft's platform-for-hate-speech line. A second quotes the material and rhetoric he pointed to, then preserves his limits concerning Palestinian suffering, advocacy and Hamas. |
| S6 | 1 coverage event in the timeline and 3 CAIR references | Patched. The AP coverage event was removed from the timeline. The CAIR body and timeline entries remain; the detail-block repetition was removed, and the unresolved Philadelphia communications sought by CAIR were folded into the unknowns sentence. |
| HELD | 7 reserved classes | Held with reason. Reading-mode labels, the bare record chip, section kickers, `How we check .`, saved-date lines, the sources-list introduction and the `Story updated` line were not changed. |

## Patch round 8 record checks

### Official stadium ownership and operation records

- Fresh registry run: `capture-oneoff-20260921T002240Z`
- Fallback disposition: no fallback copy was used because all four fresh direct captures returned HTTP 200.

| Record | Capture result | Passage | Grade |
|---|---|---|---|
| `gwcca-mercedes-benz-stadium-ownership-2026-09-20` | 83089 raw bytes, SHA-256 `5c0e5da15108afbf793fdf480d80699fd29f92c7eacc692bb4608c5b306c83dc`; 7838 text bytes, SHA-256 `63af56f9ae0c2b3fceeb6109138d1dace0fa47ab85724e30b997f1ea99dd2b9f` | The Georgia World Congress Center Authority owns Mercedes-Benz Stadium, and the Falcons and Arthur Blank organization operates and manages it. | B |
| `arlington-att-stadium-lease-2026-04-21` | 92313 raw bytes, SHA-256 `55f0cf4d10d35d332174bb2bdfbf911b2f039d10d885baab212decbc7c53de49`; 4940 text bytes, SHA-256 `0122d98eede9db71302aa5c9592c6f8a2a6d45e9b5ed1deccfc911e3666ed0e8` | Arlington owns AT&T Stadium, and the Dallas Cowboys operate and maintain it. | B |
| `indiana-lucas-oil-stadium-authority-2026-09-20` | 23377 raw bytes, SHA-256 `78ea8363e80c57e1c4f5176cc0f13ba12e1c8a325319ecac67020002c2001c65`; 1966 text bytes, SHA-256 `3983dbbdf5893423c7b5a444b073b7c4ea20346b9798e1866ffd0d514dc420f2` | Indiana's stadium authority owns Lucas Oil Stadium, and the Capital Improvement Board of Managers of Marion County operates it. | B |
| `tampa-raymond-james-ownership-timeline-2026-09-20` | 216269 raw bytes, SHA-256 `880194b5f4c0b6044f05bcef9aeee375af62df942ab65bec605edce9e1e26b2e`; 8534 text bytes, SHA-256 `c5137ec2a948f2cb49f70595c3feb2c082ac317551e7b5fa671e25b023075640` | The Tampa Sports Authority transferred Raymond James Stadium ownership to Hillsborough County in 2003 and retained management responsibility. | B |

### Patch round 8 bounded checks

- Raymond James agreement: a fresh registry search and direct searches of Tampa Sports Authority pages found no published Ikon Global agreement. The page attributes the clause, liability and payment terms to FOX 13 and does not present the contract as independently inspected.
- MetLife statement: CBS New York reported no response by September 7. The 18 coverage records, AJC account, venue statements and official venue records checked through September 20 carry no public MetLife Stadium statement.
- Venue ownership: the four fresh official records above and the existing Philadelphia lease record were checked against Rolling Stone's seven-venue list. Rolling Stone remains the source for the two private venues.

## Patch round 8 ledger

The patch is limited to R1 through R3 and S1 through S8. Sibling counts state how many same-class locations were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline and state label | Held with reason. The reviewer reserved both for the editor. Neither was changed or discussed on the page. |
| R2 | 1 Raymond James contract-comparison paragraph | Patched. Every contract term, liability allocation and payment figure is now explicitly attributed to FOX 13. No official executed agreement was found, so none was pinned. |
| R3 | 2 venue-list and ownership paragraphs | Patched from four fresh official captures and the existing Philadelphia lease record. The page identifies all five public ownership interests and states whether the team or a public board operates each venue where the record supplies that distinction. The Tampa source places the ownership transfer in 2003, and no fallback copy was used. |
| S1 | 2 MetLife performance locations and 1 first Pink mention | Patched. The first MetLife actions now appear before Pink's criticism, so the criticism has a stated object. |
| S2 | 2 narrative mentions of `Hind's Hall` | Patched. The first mention says the song refers to Columbia University, was written after the 2024 campus protests and is named for five-year-old Hind Rajab, who was killed in Gaza. The later petition mention remains title-only. |
| S3 | 2 Raymond James and seven-venue-list paragraphs | Patched. Rolling Stone's alleged-objector list now comes first, followed in the same paragraph by the Tampa authority's denial of involvement and its role managing the county-owned stadium. |
| S4 | 2 MetLife response sentences | Patched. They are one bounded sentence stating that CBS got no reply by September 7 and the stadium had made no public statement by September 20. |
| S5 | 1 assurance-source sentence | Patched. The paragraph now says in reader words that the Journal did not identify who gave the assurance. |
| S6 | 2 schedule-denominator descriptions | Patched. The detail block identifies the schedule as the one published when tickets went on sale in September 2025 and says it still listed 27 shows on September 20. |
| S7 | 2 Philadelphia outcome locations | Patched. The narrative keeps the full outcome; the timeline row now says only that the show proceeded without an opener. |
| S8 | 1 prior-lineup-comparison sentence | Patched by deletion. It answered no active reader question and did not add to the unpublished-contract unknowns. |
| HELD | 7 reserved classes | Held with reason. Reading-mode labels, the bare record chip, section kickers, `How we check .`, saved-date lines, the sources-list introduction and the `Story updated` line were not changed. |

## Patch round 9 bounded checks

- MetLife statement: CBS New York recorded no response to its request by September 7. The 19 coverage records, AJC account, venue statements and official venue records in the manifest were checked through September 20, and no public MetLife Stadium statement appears in that bounded set.
- Earlier Loop Tour support-lineup change: the official 27-date schedule, artist statements, tour coverage and the existing fresh-search census identify no earlier support-lineup change on this tour.
- Concrete venue-control contract example: the official contract routes and admitted coverage contain no executed Sheeran-tour agreement. The West agreement at Raymond James Stadium is the only concrete contract example described in the public accounts, and its terms remain attributed to FOX 13 because the agreement itself is not pinned.

## Patch round 9 ledger

The patch is limited to R1 through R4 and S1 through S5. Sibling counts state how many same-class locations were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline and state label | Held with reason. The reviewer reserved the h1 and state label. Neither was changed. |
| R2 | 1 MetLife response paragraph | Patched. CBS New York is attributed only for the lack of response to its request by September 7. The separate September 20 absence is bounded to the venue statements and coverage checked. |
| R3 | 1 Raymond James contract paragraph | Patched. The FOX 13 account now says that the Tampa Sports Authority collected the stated fees while West's team kept the remaining revenue, which the report said could exceed $20 million. |
| R4 | 1 earlier-change boundary | Patched. A short bounded-absence sentence in the unknowns says the Loop Tour has no earlier support-lineup change on record and therefore no prior tour case to compare. |
| S1 | 1 aid-pledge detail paragraph | Patched. The AP Philadelphia outcome pin now carries the Kraft spokesperson's statement that Kraft and Sheeran had each agreed to donate $2 million without specifying where the money would go. |
| S2 | 1 first Pink and StopAntisemitism paragraph | Patched. StopAntisemitism is introduced as a pro-Israel campaign group, and Pink is said to have reposted its Instagram message. The BBC publication-day registry capture carries both points; Rolling Stone carries Pink's later statement. |
| S3 | 1 Aaron Rowe follow-up block | Patched. The September 18 follow-up block now sits immediately after Rowe's first withdrawal statement. |
| S4 | 1 September 19 timeline row | Patched. The row identifies the Philadelphia show as the first Loop Tour concert after the lineup change instead of repeating that it had no opener. |
| S5 | 1 Raymond James contract paragraph | Patched. The paragraph opens by identifying the West agreement as the only concrete contract example in the public accounts and says it concerned a different artist at the same stadium. The agreement itself remains unavailable, and every term stays attributed to FOX 13. |
| HELD | 11 reserved classes | Held with reason. The h1 and state label, `How we check .`, record chips, `Story updated`, per-record captured lines, captions, reading modes, section kickers, the `Coverage checked` group, the KPI position and the unpublished Ikon Global agreement were not changed. |

### Patch round 9 admitted passage

- `bbc-macklemore-dropped-2026-09-15`: registry run `quarry-wire-scheduled-20260915T220005Z`; raw SHA-256 `e2f6b9bf6c73112c3b2d93375447125a38ac0732c4d554b618c8978d3a99d112`; text SHA-256 `55a717e3b8a3d6f6cf7501baa47d77527c7bbed1aa47f0f631e53c87c44c86b6`; no fallback used.

| Passage | Grade | Disposition |
|---|---:|---|
| StopAntisemitism was described as a campaign group that accused Macklemore of ambushing fans, and Pink reposted its message on Instagram. | B | Used in What happened to identify the group and the action before Macklemore's reference to Pink. |

## Patch round 10 bounded checks

- Support-role wording: the page, data module, timeline, The catch and unknowns were searched for `replacement`, `replacements` and `would-be replacement`. The first-party AEG schedule controls over AP's paraphrase. The narrative and two module roles were corrected. The one remaining page use is the reviewer-held table caption, which expressly attributes the description to AP.
- MetLife public statement: CBS New York reported no response to its own request by September 7. The separate September 20 absence remains a bounded data-absence statement about MetLife Stadium.
- Earlier lineup changes: the official tour schedule and the admitted artist, venue and coverage records show no earlier support-lineup change on the Loop Tour.

## Patch round 10 ledger

The patch is limited to R1, R2 and S1 through S8. Sibling counts state how many same-class locations were checked across the page and data module before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline and state label | Held with reason. The reviewer reserved the h1 and state label. Neither was changed. |
| R2 | 4 replacement descriptions | Patched. The narrative and two module roles now follow AEG's first-party schedule: Rowe and Lukas Graham were billed alongside Macklemore, then would have been the remaining advertised support. The held table caption remains because it attributes the superseded description to AP. No timeline or unknowns sentence called them replacements. |
| S1 | 1 Macklemore quotation transition | Patched. The unsupported connective `added` was removed; the sentence directly attributes the quotation to Macklemore. |
| S2 | 2 first-use introductions | Patched. The Israeli American Council is introduced as an advocacy group, and AJC's claimed contact is described as contact with MetLife Stadium rather than using `the Meadowlands` without explanation. |
| S3 | 1 later Kraft reference | Patched. The later section briefly reintroduces Robert Kraft as the Gillette Stadium owner. |
| S4 | 1 schedule-vintage sentence | Patched. The September 2025 ticket-sale date and the schedule's September 20 status now appear in separate sentences. |
| S5 | 1 Raymond James contract paragraph | Patched. The paragraph opens with the event: Raymond James Stadium had booked a different artist under terms that FOX 13 reported limited the authority's cancellation power. All contract details remain attributed to FOX 13. |
| S6 | 1 seven-venue allegation sentence | Patched. The sentence identifies the venue objection as Messina's claim, as reported by Rolling Stone. |
| S7 | 2 method-voiced absence sentences | Patched. The story bounds MetLife Stadium's silence to the venue statements and coverage dated through September 20, and says this was the Loop Tour's first support-lineup change on record. Both retain `data-absence`. |
| S8 | 1 stakes sentence | Patched. A cited sentence near the top explains how venue, promoter and headliner power can shape what a stadium audience hears, using AP's `deals with venues` wording. |
| HELD | 10 reserved classes | Held with reason. The h1 and state label, `How we check .`, record chips, `Story updated`, captions, reading modes, per-record captured lines, section kickers, the `Coverage checked` group and KPI position were not changed. The Ye contract paragraph remains on the page. |

### Census line: `aeg-loop-tour-support-schedule-2026-09-21`

- URL: `https://amex.aegpresents.com/edsheeran/`
- Publisher: AEG Presents
- Registry run: `capture-oneoff-20260921T014715Z`
- Capture method and outcome: Scrapling browser-profile fetch, HTTP 200, `body_captured`
- Raw bytes: `120535`
- Raw SHA-256: `b0bfe56c136b7e16a9c62f94d23b7a19db02a43587d8a400b548898127133778`
- Repository text SHA-256: `ff312bc114955a50c54fb07dfbf616036d9879d3844679e8b8ce9dac9ed2f37c`
- Captured at: `2026-09-21T01:47:16.893661Z`
- HTTP Last-Modified checked fresh: `Mon, 06 Oct 2025 19:05:33 GMT`
- Fallback: not used

| Passage | Grade | Disposition |
|---|---:|---|
| AEG's schedule billed Macklemore, Lukas Graham and Aaron Rowe together on all eight remaining dates that included Macklemore, while the two Hollywood dates listed Aaron Rowe alone. | A | Used to correct the narrative and data table roles. AP's `would have been replacements` wording remains only in the held caption and is explicitly attributed to AP. |

### Patch round 10 pin-gap disposition

- The capture timestamp is provenance metadata, not part of the event narrative.
- Myles Smith and Ellie Banke appear on dates before the September 14 removal and do not bear on the corrected roles for the remaining dates.
- The full Seminole Hard Rock Hotel & Casino venue name does not change the two Hollywood dates or their Aaron Rowe-only support listing.

## Patch round 11 bounded checks

- Replacement wording: the story caption, data module rows and manifest `story_sources` usage lines were searched for `replacement`, `replacements` and `would-be replacement`. The caption had one current-page hit and was corrected. The module rows and records-list usage lines had no hits. Historical manifest and working-note entries retain the wording only to document earlier review dispositions.
- Refund terms: the Gillette Stadium terms govern its Account Manager ticket site. The saved standard Ticketmaster purchase policy does not carry the opening-act clause, so the story does not say the Account Manager terms governed every original Loop Tour ticket.
- Earlier comparison: the absence is bounded to an earlier comparable removal followed by supporting-artist departures in the tour records dated through September 20.

## Patch round 11 ledger

The patch is limited to R1 through R4, S1 through S4 and the two provenance notes. Sibling counts state how many same-class locations were checked across the page, data module and records-list usage lines before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline and state label | Held with reason. The reviewer reserved the h1 and state label. Neither was changed. |
| R2 | 1 caption hit, 0 module-row hits and 0 records-list usage hits | Patched. The caption now describes the artists' scheduled tour roles without repeating AP's superseded replacement characterization. AEG's first-party schedule remains controlling. |
| R3 | 1 unsupported superlative | Patched. The unknowns sentence no longer calls this the first lineup change. It states the narrower absence of an earlier comparable removal followed by supporting-artist departures in records dated through September 20. |
| R4 | 1 Account Manager clause and 1 general attorney-general statement | Patched. The clause is limited to the Gillette Account Manager ticket site, the records do not establish its coverage of every original ticket, and the attorney general's broader statement remains the account applying to ticket purchasers generally. The Massachusetts statutory question remains open. |
| S1 | 2 mechanism paragraphs | Patched. The AP attribution and the stakes now appear in one paragraph; the duplicate mechanism paragraph was removed. |
| S2 | 1 secondary-stage description | Patched. The sentence follows the Inquirer's description of a secondary stage used at other concert stops and does not call it smaller or place it among the crowd. |
| S3 | 1 MetLife performance paragraph | Patched. A September 4 bridge now identifies the first MetLife show as the event followed by the objections. |
| S4 | 1 near-top MetLife performance paragraph | Patched. It names the words, Gaza images and Macklemore's attributed account of the Palestinian-flag image, each from an existing pin. |
| Minor: FOX 13 provenance | 1 Raymond James contract paragraph | Confirmed, no patch. The paragraph already attributes the contract terms to FOX 13, and the executed agreement is not presented as public. |
| Minor: CAIR provenance | 1 CAIR filing paragraph | Confirmed, no patch. The story says CAIR-Philadelphia announced that it had submitted the request; it does not present the release as the request itself. |
| HELD | 12 reserved classes | Held with reason. The h1 and state label, `How we check .`, record chips, `Story updated`, captions other than the reviewed lineup caption, reading modes, per-record captured lines, section kickers, the `Coverage checked` group, KPI position and the Ye contract paragraph were not changed. |

## Patch round 12 source admission

### Tampa Bay Times Ye concert revenue result

- Original-route check: the Tampa Bay Times search route returned no matching article, and two likely direct article paths returned HTTP 404.
- Live republication: `https://www.arcamax.com/entertainment/entertainmenttoday/s-4270652`
- Fresh registry run: `capture-oneoff-20260921T030505Z`
- Result: HTTP 200, 40786 raw bytes, SHA-256 `8dbbc7479cbcf13b541b58e256eac9ebbdc783002005b85ad0ee270216fa2331`
- Repository text: 2783 bytes, SHA-256 `a8c69fddc8de1855e16051dbb5b2daaf0785b3fafe637e4d7db271c9696e907a`
- Carrier disclosure: ArcaMax identifies the article as Nina Moske's Tampa Bay Times report and displays the Tampa Bay Times copyright and Tribune Content Agency distribution notice.
- Fallback disposition: the reviewer-supplied copy was not used because the fresh ArcaMax fetch succeeded.

| Passage | Grade | Disposition |
|---|---:|---|
| The Tampa Sports Authority made an estimated $3.44 million from the two June Ye concerts. | B | Used to replace the pre-concert revenue forecast with the reported August outcome. |
| Food, drink and parking spending, plus part of merchandise and ticket sales, went to the authority. | B | Used to state the reported post-concert revenue streams. |

## Patch round 12 ledger

The patch is limited to R1, R2 and S1 through S4. Sibling counts state how many same-class locations were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline and state label | Held with reason. The reviewer reserved the h1 and state label. Neither was changed. |
| R2 | 1 forecast presented as an outcome | Patched. The FOX 13 figure is now explicitly a pre-concert forecast. A fresh live ArcaMax republication of the Tampa Bay Times report supplies the estimated $3.44 million post-concert result and the authority's reported revenue streams. The fallback copy was not used. |
| S1 | 1 unclear authority reference | Patched. The AP paragraph now names the authority divided among venue, promoter and headliner. |
| S2 | 1 three-clause summary in The catch | Patched. The paragraph is one sentence distinguishing the two claims about who made the removal decision from Messina's narrower statement that venues had rejected the lineup. |
| S3 | 1 venue-page edit-date clause | Patched. The narrative keeps the September 20 advertised lineup and removes the last-changed metadata. The records-list usage line now describes only the date and lineup still advertised. |
| S4 | 3 public-contract absence locations | Patched. A data-absence sentence near the dispute says the promoter contract has not been published and its content and removal terms are unknown. The later duplicate contract-party sentence was removed; the bounded unknowns statement and the Raymond James comparison remain for their separate functions. |
| HELD | 11 reserved classes | Held with reason. The h1 and state label, `How we check .`, record chips, `Story updated`, captions, reading modes, per-record captured lines, section kickers, the `Coverage checked` group, KPI position and the Ye comparison paragraph apart from R2 were not changed. |

## Patch round 13 bounded checks

- Tour FAQ refund scope: the official FAQ was read in full. It was searched for `lineup`, `opening act`, `support act`, `artist`, `removed`, `cancelled`, `canceled`, `refund` and `exchange`. The only refund answer at lines 238 to 240 addresses buyers who changed their minds. No passage addresses a refund request after an advertised act was removed.
- Raymond James agreement: the patch 8 direct and registry searches remain the bounded check. No published copy of the executed Ikon Global agreement was found through September 20, so every contract term remains FOX 13's account.
- Sheeran video chain: the Instagram reel pin identifies the post as `Tonight in Philadelphia` but contains no transcript. The Guardian raw page credits its clip to `Ed Sheeran via Instagram`, and the Guardian text pin carries `catastrophic and unjustifiable`.
- MetLife statement: CBS New York recorded no reply to its request by September 7. The venue statements and coverage checked through September 20 carry no public statement from MetLife Stadium.
- Earlier comparison: the official schedule, artist statements and tour coverage checked through September 20 identify no earlier comparable removal followed by supporting-artist departures.
- Gillette terms: the saved terms govern Gillette Stadium's Account Manager ticket site. The standard Ticketmaster purchase policy does not carry the opening-act clause, and the records do not establish whether the Account Manager terms covered every original Loop Tour ticket.
- Remaining support lineup: the official schedule and venue records checked through September 20 identify no announced support lineup for the September 25 through November 7 dates.

## Patch round 13 ledger

The patch is limited to R1 through R4 and S1 through S5. Sibling counts state how many same-class locations were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 held headline and state label | Held with reason. The reviewer reserved the h1 and state label. Neither was changed or discussed on the page. |
| R2 | 1 FAQ final-sale statement | Patched. The sentence now gives the changed-mind question answered by the FAQ and states the bounded absence of any FAQ line addressing removal of an advertised act. The official Loop Tour FAQ supports both the question and answer. |
| R3 | 1 Raymond James contract paragraph | Patched. The page tells readers that the contract itself had not been published by September 20 and that its terms remain FOX 13's account. The existing `official_agreement_not_found` receipt supplies the bounded absence. |
| R4 | 1 Sheeran Gaza quotation | Patched. The Instagram reel is cited only for Sheeran's Philadelphia post. The Guardian is named and cited as the publisher carrying his words, consistent with its raw credit to Ed Sheeran via Instagram. |
| S1 | 1 Wall Street Journal assurance sentence | Patched. The same sentence now identifies the unnamed person as the Journal's source before presenting the assurance. |
| S2 | 3 search-shaped absence sentences | Patched. The narrative states the dated public facts about MetLife Stadium, the absence of an earlier comparable Loop Tour case and uncertainty over the Account Manager terms. The search denominators remain in the bounded checks above and the proof records. |
| S3 | 1 first AEG mention | Patched. AEG Presents is introduced as the company whose published Loop Tour schedule lists the support acts. Its first-party schedule supports the role. |
| S4 | 4 appearances of the ten-show count | Patched in the editable narrative and detail layers. The KPI and first narrative use remain; the later detail repetition was removed. The remaining table caption is reviewer-held and was not changed. |
| S5 | 1 remaining-lineup absence | Patched. The dated sentence now appears in What happened next and tells readers that no support lineup had been announced for the remaining September 25 through November 7 dates. |
| HELD | 12 reserved classes | Held with reason. The h1 and state label, the Ye paragraph apart from R3, `How we check .`, record chips, `Story updated`, captions, reading modes, per-record captured lines, section kickers, the `Coverage checked` group and KPI position were not changed. |

## Patch round 14 ledger

The patch is limited to R1 and S1 through S5. Sibling counts state how many same-class locations were checked across the page before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 1 unsupported claim about all public statements | Patched. CBS remains limited to its unanswered September 7 request. A fresh rendered capture of MetLife Stadium's first-party news index supports the narrower statement that the news page, as saved September 21, carried no statement about the shows. The plain Chrome-user-agent request returned HTTP 406, the capture pipeline succeeded, and no fallback copy was used. |
| S1 | 4 artist-role descriptions | Patched. The departure paragraph now identifies Rowe and Lukas Graham as U.S. support billed alongside Macklemore, Beoga as performing inside Sheeran's set, and Finneas as booked for the South American dates. The AEG schedule and AP roles report support those descriptions. The later roles passage was reduced to its heading. |
| S2 | 2 repeated passages | Patched. The second telling of Sheeran's reported hurtful-words account was removed, and the three-way removal-authority recap was removed from The catch. The earlier cited accounts remain. |
| S3 | 1 isolated ticket-sales date | Patched. The standalone September 2025 ticket-sales sentence was cut. The detail block keeps the schedule fact it exists to prove. |
| S4 | 5 official ownership claims | Patched. Each public ownership or land-ownership claim now has its official authority or lease citation directly after the sentence it supports. |
| S5 | 1 prior-case absence sentence | Patched. The no-earlier-comparable-removal sentence was cut from the story view. Its bounded search receipt remains in the manifest as provenance, not narrative. |
| HELD | 11 reserved classes | Held with reason. The h1 and state label, Raymond James contract comparison paragraph, `How we check .`, record chips, `Story updated`, captions, reading modes, per-record captured lines, section kickers, the `Coverage checked` group, KPI position and Messina estimate were not changed. |

## Patch round 15 ledger

The patch is limited to R1 and R2. Sibling counts state how many same-class locations were checked across the story view before the patch.

| Item | Siblings checked | Disposition |
|---:|---:|---|
| R1 | 2 empty catch items | Patched. Each catch heading now has a two-sentence body. The authority item gives Macklemore's, Sheeran's and Messina's different accounts and says none resolves the conflict. The roles item distinguishes the two U.S. support acts, Beoga's work inside Sheeran's set and Finneas's South American booking. The Macklemore statement, Sheeran statement, Rolling Stone Messina passage, AEG schedule and AP roles report support the bodies. |
| R2 | 10 absence or nonanswer locations | Patched. The unsupported sentence about the reach of Gillette's Account Manager terms was cut. Four sibling claims now name the saved record set and date that bound the absence. Four already named the source, request or capture date and remain unchanged. The held Raymond James comparison paragraph remains unchanged. |

R2 sentence sweep:

- Page line 56 before the patch: patched. The Macklemore contract absence is limited to artist, promoter and venue records saved through September 20. The Sheeran statement supplies the contract-party claim.
- Page line 88 before the patch: checked, no change. The sentence says The Wall Street Journal did not identify who gave the assurance and cites the Journal pin.
- Page line 92 before the patch: checked, no change. The sentence limits CBS's unanswered request to September 7 and separately names the MetLife Stadium news-page capture saved September 21.
- Page line 108 before the patch: held with reason. The Raymond James contract comparison paragraph is reserved in the held list and was not changed.
- Page line 162 before the patch: checked, no change. The sentence limits the nonanswer to the tour FAQ and cites the changed-mind question and answer.
- Page line 168 before the patch: patched. The remaining support-lineup absence is limited to the official schedule and venue records saved through September 20.
- Page line 187 before the patch: patched. The executed-contract absence is limited to artist, promoter and venue records saved through September 20.
- Page line 189 before the patch: patched. The communications and decision-maker gaps are limited to statements and reports saved through September 20.
- Page line 191 before the patch: patched. The unsupported claim that the scope of the Gillette terms was not publicly known was cut. The pinned Account Manager terms and Massachusetts statute remain.
- Page line 193 before the patch: checked, no change. The sentence identifies the attorney general's September 18 statement as the record that did not answer the statutory question.
- HELD: the h1, state label and every item in the held list were not changed.

## Patch round 16 ledger

The page contains four patch 15 sentences whose absence is bounded to records saved through a date. Each named record set was reopened before this patch.

- R1, page line 170 before the patch: patched. Records opened: `loop-tour-north-america-faq`, `ed-sheeran-past-tour-dates-2026-09-20`, `gillette-loop-tour-2026-09-20`, `lincoln-field-loop-tour-2026-09-20`, `ap-support-acts-2026-09-15`, `macklemore-removal-statement-2026-09-14`, `lukas-graham-withdrawal-2026-09-15`, `aaron-rowe-withdrawal-2026-09-15` and `aeg-loop-tour-support-schedule-2026-09-21`. Result: the Lincoln Financial Field and AEG records do name supporting artists, but they still name Macklemore after his removal and Rowe and Lukas Graham after their withdrawals. The page now says that and limits the absence to anyone added to the remaining dates after those changes. The manifest's two stale absence receipts were corrected to the same boundary.
- Patch 15 page line 56: checked, no page change. Records opened: `macklemore-removal-statement-2026-09-14`, `ed-sheeran-response-2026-09-15`, `finneas-withdrawal-2026-09-15`, `beoga-withdrawal-2026-09-15`, `lukas-graham-withdrawal-2026-09-15`, `aaron-rowe-withdrawal-2026-09-15`, `loop-tour-north-america-faq`, `ed-sheeran-past-tour-dates-2026-09-20`, `gillette-loop-tour-2026-09-20`, `lincoln-field-loop-tour-2026-09-20`, `gillette-ticketmaster-terms-2026-09-20`, `philadelphia-stadium-lease-2007`, `rolling-stone-removal-2026-09-14`, `usa-today-kraft-2026-09-14` and `tampa-bay-times-raymond-james-response-2026-09-15`. Result: Sheeran identifies the promoter as Macklemore's contract party, but none of those records contains Macklemore's promoter contract or its content and removal terms.
- Patch 15 page line 187: patched at current line 189. Records opened: the same artist, promoter and venue set listed for line 56. Result: the Gillette record contains Account Manager ticket terms and the Philadelphia bond document describes stadium-land leases, so the unqualified phrase `no executed contract` was too broad. The page now limits the absence to an executed agreement assigning authority over the Loop Tour lineup.
- Patch 15 page line 189: patched at current line 191. Records opened: `macklemore-removal-statement-2026-09-14`, `ed-sheeran-response-2026-09-15`, `rolling-stone-removal-2026-09-14`, `usa-today-kraft-2026-09-14`, `ap-removal-2026-09-14`, `ap-support-acts-2026-09-15`, `reuters-sheeran-response-2026-09-15`, `rte-support-acts-exit-2026-09-15`, `wsj-tour-phone-call-2026-09-16`, `ajc-metlife-intervention-2026-09-08`, `tampa-bay-times-raymond-james-response-2026-09-15` and `cair-philadelphia-records-request-2026-09-17`. Result: several records describe calls or contacts, so the page now reports those accounts and limits the absence to the underlying communications and final decisions.
- Same-form sweep: 4 sentences found, the four listed above. No other story-view sentence says that records saved through a date do not contain something.
- HELD: the h1, state label, Raymond James comparison paragraph and every other item in the held list were not changed.
