NO-SHIP. I found three Major and three Minor findings. All 33 raw pins and text pins matched their manifest hashes.

1. **Major: The headline states the reader model’s “easiest wrong reading.”**

   **Page bytes 134 and 3716:** “Macklemore removed from Ed Sheeran’s tour; the remaining opening acts quit.” The body later contradicts it at byte 27173: “Four artists left, but they were not four remaining openers.” [Built page](</Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:1>)

   **Record bytes 673 and 918:** AP says Rowe and Lukas Graham were replacement U.S. openers, Beoga performed within Sheeran’s set, and Finneas was scheduled for South America. [AP record](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/ap-support-acts-2026-09-15.txt:6>)

   **Reader model:** It explicitly identifies “lose all remaining opening acts” as the easiest wrong reading and calls the headline formulation inaccurate. [Reader model](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:11>)

   **Correct account:** Macklemore was removed from eight remaining appearances. Four artists then withdrew from different roles: two replacement U.S. openers, Sheeran’s collaborating band, and a later South American support slot.

2. **Major: The refund account omits the specific ticket provision governing opening-act changes.**

   **Page bytes 34070 and 41771:** “Ticketmaster told Boston 25 that organizers set refund policy. The tour FAQ says, ‘All sales are final.’” The page then frames the only unresolved test as Massachusetts’s advertised-description rule. [Built page](</Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:1>)

   **Record byte 666:** The attorney general’s office said the ticket terms state “opening acts are subject to change” and lineup changes do not necessarily entitle purchasers to refunds. [Boston 25 record](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/boston-25-gillette-refund-complaints-2026-09-18.txt:7>) The official policy is more specific: “Opening Acts, as well as festival performers, are subject to change or cancelation at any time without notice,” followed by a no-refund provision. [Ticketmaster Standard Purchase Policy](https://legal.ticketmaster.com/purchase-policy/)

   The manifest pins only the outlet account and describes it as the “Ticketmaster policy statement”; it does not pin the primary Ticketmaster terms. [Manifest](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/manifests/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.json:625>)

   **Reader-model grade: B**, changing answer 6 about what remains unresolved.

   **Correct account:** For tickets subject to those terms, the contractual baseline specifically disclaims refunds for an opening-act change. Whether Massachusetts law overrides that provision because the event failed its advertised description remained unresolved.

3. **Major: The page omits that the pinned official venue record still advertised the removed and withdrawn artists.**

   **Page byte 8733:** The page says the Philadelphia concert “went ahead” with Sheeran beginning alone and no support act, but does not disclose the contradictory official listing. [Built page](</Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:1>)

   **Record bytes 2851, 3322 and 5124:** Lincoln Financial Field’s pinned HTML says Sheeran “will be joined” by Macklemore, Lukas Graham and Aaron Rowe. **Record byte 5066:** its structured metadata says it was modified on September 17, after Macklemore’s removal and the September 15 withdrawals. [Pinned official record](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/lincoln-field-loop-tour-2026-09-20.html:26>) The description also remained on the [official venue page](https://www.lincolnfinancialfield.com/events/ed-sheeran-loop-tour/).

   **Reader-model grade: B**, changing answer 5 about what changed. The model graded the event date but did not grade these raw metadata bytes because the text extraction omitted them.

   **Correct account:** The concert actually proceeded without an opener, while the captured official venue record still advertised three artists who did not appear. That conflict is material to what purchasers were officially told and to the refund dispute.

4. **Minor: AP and Reuters are labeled independent confirmation for a statement both attribute to Rolling Stone.**

   **Page bytes 47469 and 48160:** The source list calls AP a “same-day independent account” and Reuters “independent confirmation of the response and departures.” [Built page](</Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:1>)

   **Record bytes 1366 and 938:** AP says Messina’s statement was given “to Rolling Stone”; Reuters likewise says Messina “told Rolling Stone.” [AP record](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/ap-removal-2026-09-14.txt>) [Reuters record](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/reuters-sheeran-response-2026-09-15.txt>)

   **Correct account:** AP and Reuters are separate publishers, but their accounts of Messina’s central venue-objection statement share Rolling Stone’s lineage. They cannot provide independent corroboration of that statement.

5. **Minor: One evolving AP article is counted as two coverage lineages.**

   **Page bytes 48785 and 49264:** The source list separately presents an “Associated Press Philadelphia preview” and an “Associated Press Philadelphia outcome.” [Built page](</Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:1>)

   **Record bytes:** Both manifest entries use the identical AP URL, once for the preview and once for the revised outcome. [Preview entry](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/manifests/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.json:337>) [Outcome entry](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/manifests/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.json:369>)

   **Correct account:** These are two captures of one evolving AP article. They should be presented as revision history for one lineage, not as two coverage records.

6. **Minor: “CAIR-Philadelphia” appears before the page identifies the actor.**

   **Page byte 32069:** “CAIR-Philadelphia announced that it had submitted a Pennsylvania Right-to-Know request.” [Built page](</Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:1>)

   **Record byte 304:** The primary record identifies it as “The Philadelphia chapter of the Council on American-Islamic Relations (CAIR-Philadelphia).” [CAIR record](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/cair-philadelphia-records-request-2026-09-17.txt>)

   **Correct account:** Identify the Council on American-Islamic Relations and its Philadelphia chapter at first use. A stranger otherwise cannot tell whether the actor is a government body, advocacy organization or tour participant.

VERDICT: NO-SHIP

