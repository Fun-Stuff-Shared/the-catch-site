I read the complete page, all 32 pinned records, the reader model, and relevant external records. I found seven Major findings and one Minor finding. No finding reaches Critical.

Page offsets below are 0-based offsets in the one-line [built HTML](</Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:1>).

1. **Major: The headline states the exact wrong reading the article later corrects.**

   - Page bytes 3716 onward: `Macklemore removed from Ed Sheeran&#39;s tour; the remaining opening acts quit`
   - Record bytes: [AP, line 6](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/ap-support-acts-2026-09-15.txt:6>) says, `Rowe and Lukas Graham would have been replacements for Macklemore on Sheeran’s remaining U.S. dates`. [Beoga, line 7](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/beoga-withdrawal-2026-09-15.txt:7>) identifies itself as Sheeran’s band. Finneas was assigned later South American dates.
   - Correct account: Four supporting artists left different roles. They were not all remaining opening acts, and the article itself acknowledges that at page byte 26872. The reader model grades this headline defect B at [line 120](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:120>), making it Major under the requested rule.

2. **Major: The story view withholds the full-tour denominator.**

   - Page bytes 7015 onward say `of 10 remaining dates had booked Macklemore`. The only full denominator appears at byte 14732: `There were 27 North American shows... Ten of those dates fall after September 14.`
   - That sentence is inside `class="sourced-block detail"` and is hidden in story mode by [ReadingModes.astro, line 50](</Volumes/4/GitHub/the-catch-site-wt-mack/src/components/ReadingModes.astro:50>).
   - Record bytes: the official schedule runs from `June 13, 2026` at [line 105](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/loop-tour-north-america-faq.txt:105>) through `November 7, 2026` at line 135, with 27 dated rows.
   - Correct account: The tour had 27 scheduled North American shows. Seventeen had passed and 10 remained after September 14; Macklemore had been booked for eight of those 10. The reader model grades the 27-date passage A at [line 46](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:46>).

3. **Major: Sheeran’s exercised approval at the start is omitted from the authority account.**

   - Page bytes 11337 onward reduce Sheeran’s first slide to: `Sheeran said support acts chose their own setlists.`
   - Record bytes: [Sheeran statement, line 7](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/ed-sheeran-response-2026-09-15.txt:7>) says, `Last year Macklemore asked to join my tour and I agreed, because I respect him as an artist.`
   - Correct account: Sheeran says he personally agreed to Macklemore joining and allowed him to select his set. That establishes exercised headliner approval at entry, although it does not establish who held final removal authority. The reader model grades this passage B at [line 33](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:33>).

4. **Major: Kraft’s rationale is reduced to an accusation while its limiting qualifications disappear.**

   - Page bytes 19281 onward give only `what Kraft described as a broader history of antisemitic rhetoric and imagery.`
   - Record bytes: Kraft’s carried statement says `This decision is not about diminishing the suffering of innocent Palestinians` and that advocacy should not harm the Jewish community. See [USA Today pin, lines 23 to 25](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/usa-today-kraft-2026-09-14.txt:23>).
   - Correct account: Kraft characterized the material as hate speech but also said Palestinian advocacy was legitimate, objected to what he considered selective treatment of Hamas, and said support for Palestinians and opposition to antisemitism were compatible. Omitting those boundaries changes the reader’s understanding of his stated rationale, so this is B material affecting the easiest-wrong-reading answer.

5. **Major: Beoga’s stated target is generalized away.**

   - Page bytes 29176 onward say only that Beoga would not play venues that silence artists for saying “Free Palestine.”
   - Record bytes: [Beoga, line 7](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/beoga-withdrawal-2026-09-15.txt:7>) attributes the removal to `zionist lobbies`. At [line 10](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/beoga-withdrawal-2026-09-15.txt:10>) it tells readers to research Kraft, his relationship with Israel, and the Boycott, Divestment and Sanctions movement.
   - Correct account: Beoga did not describe only generic venue censorship. It expressly blamed what it called Zionist lobbies and named Kraft, Israel and BDS as the context readers should examine. The reader model grades those particulars B at [line 43](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:43>).

6. **Major: The public-venue discussion omits the directly relevant Raymond James predecessor and legal instrument.**

   - Page bytes 21605 onward say the Tampa Sports Authority was not involved in the lineup change. Bytes 23179 onward distinguish privately and publicly owned venues, but never explain why that distinction matters.
   - Record bytes: [Rolling Stone pin, lines 18 to 20](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/rolling-stone-removal-2026-09-14.txt:18>) reports two earlier Kanye West concerts at Raymond James Stadium and a contractual clause `prohibiting Raymond James Stadium from canceling the gigs based on the rapper’s past public statements or viewpoints`.
   - Correct account: The same publicly owned venue had recently hosted a challenged artist under a reported viewpoint-protection clause, with lawyers raising First Amendment concerns. No Sheeran contract is public, so that precedent does not prove Macklemore had the same protection, but it materially explains the mechanism and legal uncertainty. This is B material affecting answer 4.

7. **Major: Macklemore’s opening qualification that the artists were not victims is omitted.**

   - Page bytes 7607 onward foreground Macklemore’s claim that Sheeran and his team made the decision, without his immediately following limitation.
   - Record bytes: [Macklemore statement, line 9](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/macklemore-removal-statement-2026-09-14.txt:9>) says, `I am not a victim. Ed Sheeran is not a victim. Pink is not a victim.`
   - Correct account: Macklemore coupled his accusation with an explicit statement that the artists retained careers, money, safety and audiences and were not the victims of the underlying conflict. The reader model grades that combined opening A at [line 21](</Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:21>).

8. **Minor: The roles table converts a conditional report into an established scheduled role.**

   - Page bytes 30623 and 30725 label Aaron Rowe and Lukas Graham categorically as `Replacement U.S. support act`.
   - Record bytes: AP uses the conditional phrase `would have been replacements` at [line 6](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/ap-support-acts-2026-09-15.txt:6>). Rowe’s primary statement calls him simply `a support act` at [line 7](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/aaron-rowe-withdrawal-2026-09-15.txt:7>); Lukas Graham says only that it was withdrawing from the remaining dates at [line 7](</Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/lukas-graham-withdrawal-2026-09-15.txt:7>).
   - Correct account: The record supports a prospective replacement function, not a categorical executed replacement booking. The narrative at byte 26929 correctly preserves that conditional; the table does not.

VERDICT: NO-SHIP