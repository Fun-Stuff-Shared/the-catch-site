The page has three Major findings and one Minor finding. The reader model exists. Finding 1 matches its explicit B grade; findings 2 and 3 are ungraded records that change its answers 4, 5, and 6, making them B material under the supplied rubric.

1. **Major: The headline falsely turns four different supporting roles into “remaining opening acts.”**

   - **Page bytes:** 0-based bytes 134 and 3716 of [index.html](</Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:1>): `Macklemore removed from Ed Sheeran&#39;s tour; the remaining opening acts quit`
   - **Record bytes:** [AP support-acts pin](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/ap-support-acts-2026-09-15.txt:6>): `Rowe and Lukas Graham would have been replacements for Macklemore on Sheeran’s remaining U.S. dates`; [Beoga statement](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/beoga-withdrawal-2026-09-15.txt:7>): `depart as Ed Sheeran's band on the remaining US Loop tour`
   - **Correct account:** Four supporting performers withdrew, but only Rowe and Lukas Graham were replacement U.S. openers. Beoga was Sheeran’s backing band and Finneas was booked for the later South American leg. The body admits this at bytes 23109 and 24602, but that does not cure the headline. The reader model already grades this B at [line 120](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:120>).

2. **Major: The venue list leaves Raymond James Stadium looking like an objector after its public operator denied involvement.**

   - **Page bytes:** byte 20542: `Messina said venue objections threatened cancellations.` Byte 20598 then includes Raymond James among venues `that allegedly objected; most did not explain their position to the outlet.`
   - **Record bytes:** Tampa Sports Authority board member Alan Clendenin said the change `doesn’t have anything to do with the Tampa Sports Authority.` [Tampa Bay Times, September 15](https://www.tampabay.com/culture/entertainment/music/2026/09/15/macklemore-ed-sheeran-tampa-sports-authority-raymond-james-concert/). The page’s own pinned source also says the non-Gillette and non-Charlotte venues `are owned and, in many cases, operated by cities, states, or other government entities` in [Rolling Stone pin, line 17](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/rolling-stone-removal-2026-09-14.txt:17>).
   - **Correct account:** Gillette’s refusal is confirmed, Tampa’s public operator denied participating, and the other listed venues remained alleged or unconfirmed. Public ownership also changes the legal and contractual mechanism, so this omission changes reader-model answers 4 and 6 and should be graded B.

3. **Major: The causal timeline omits a first-party account of venue intervention between the two MetLife shows, including the consequence for ticket holders.**

   - **Page bytes:** byte 15812 moves directly from the first MetLife performance to the second; byte 16605 then moves to the Israeli American Council petition.
   - **Record bytes:** AJC says `AJC New Jersey immediately contacted the Meadowlands to express our community’s outrage` and that the stadium `offered refunds to ticket holders before the second show who chose not to attend.` [AJC first-party post](https://www.linkedin.com/posts/american-jewish-committee_while-opening-for-ed-sheeran-at-metlife-stadium-activity-7503112129827237888-ZtkS)
   - **Correct account:** Attributed to AJC, attendee complaints prompted its contact with Meadowlands, after which AJC says stadium administrators raised concerns with the tour and artists and offered refunds before the second show. This interested-party account requires attribution, but omitting it removes an earlier venue action, a concrete fan consequence, and part of the unresolved communications chain, changing answers 4, 5, and 6.

4. **Minor: The records section presents a CAIR press release as the filed records request itself.**

   - **Page bytes:** byte 29493: `CAIR-Philadelphia filed on September 17`; byte 40158 labels the source `CAIR-Philadelphia records request`.
   - **Record bytes:** The manifest URL is a press release at [manifest lines 378 to 388](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/manifests/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.json:378>). Its text says CAIR `announced that it has submitted a Pennsylvania Right-to-Know Law request` in [the pin, line 4](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/cair-philadelphia-records-request-2026-09-17.txt:4>).
   - **Correct account:** The pinned record is CAIR’s announcement and description of the request, not the filed instrument. The filing claim is supportable with attribution, but the actual request should be pinned before readers are told they can inspect its exact wording, recipients, and filing metadata.

VERDICT: NO-SHIP

