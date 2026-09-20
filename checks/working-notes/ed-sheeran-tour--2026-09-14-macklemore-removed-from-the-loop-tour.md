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
