NO-SHIP. The page is directionally correct, but four Major findings can materially change a reader’s understanding. I excluded unverified leads.

1. **Major: The headline falsely turns four different roles into “the remaining opening acts.”**

   - Page bytes 134-211 and 3716-3793 in the [built page](/Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:1): `Macklemore removed from Ed Sheeran&#39;s tour; the remaining opening acts quit`
   - Record bytes 673-773, 782-820, and 874-1047 in the [AP pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/ap-support-acts-2026-09-15.txt:6): “Rowe and Lukas Graham would have been replacements for Macklemore on Sheeran’s remaining U.S. dates”; “Beoga had been performing several songs”; Finneas “was due to tour with Sheeran in South America later this year.” [AP report](https://apnews.com/article/ed-sheeran-responds-macklemore-tour-3fd73815563039bea9b88f5efe745d62)
   - The reader model explicitly grades this B and says it creates answer 3’s easiest wrong reading. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:129)
   - Correct account: Four supporting artists withdrew, but only Rowe and Lukas Graham were replacement U.S. openers. Beoga was Sheeran’s band, while Finneas was booked for later South American dates.

2. **Major: The MetLife sentence extends CBS’s September 7 response boundary into an unattributed September 20 conclusion.**

   - Page bytes 21747-21900: `CBS New York said MetLife Stadium did not respond to its request for comment by September 7, and the stadium had made no public statement by September 20.`
   - Record bytes 4215-4302 in the [CBS pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/cbs-metlife-response-2026-09-07.txt:27): “CBS News New York also reached out to MetLife stadium for comment and did not hear back.” [CBS report](https://www.cbsnews.com/newyork/news/macklemore-pro-palestinian-comments-metlife-stadium-ed-sheeran/)
   - The reader model grades this boundary B: CBS does not establish whether the venue responded later. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:72) The manifest separately records a bounded search through September 20, but that lineage is not stated in the sentence. [Manifest](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/manifests/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.json:863)
   - Correct account: CBS established only that it received no response by September 7. The later statement must be separately attributed as The Catch’s finding from the venue statements and coverage checked through September 20.

3. **Major: The contract comparison omits who retained the money after the public authority’s fees.**

   - Page bytes 30925-31094: `The outlet also reported that West's team accepted lawsuit liability and the promoter agreed to pay more than $2 million in stadium expenses plus $5 for each ticket sold.`
   - Record bytes 1304-1628 in the [FOX 13 pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/fox13-raymond-james-west-contract-2026-06-18.txt:10): “While the TSA collects these fees, West's team keeps the remaining revenue, which could exceed $20 million.” [FOX 13 report](https://www.fox13news.com/news/kanye-west-tampa-concerts-why-bulletproof-contract-prevents-cancellation) A Tampa Bay Times contract account adds that TSA controlled receipts until settlement and Ikon Global retained net ticket revenue after fees. [Republished contract account](https://www.jpost.com/international/article-899822)
   - The reader model grades the Raymond James comparison B for answer 4, the tour-control mechanism. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:75)
   - Correct account: The deal paired noninterference protection and lawsuit exposure with a fee and revenue waterfall. TSA received fixed, per-ticket and ancillary payments and controlled receipts through settlement, while the promoter retained the residual net ticket revenue.

4. **Major: The story omits its B-grade predecessor boundary.**

   - Page bytes 45769-45868 begin the chronology with `<tr><td class>Sept. 4–5</td><td class>Macklemore performs at both MetLife Stadium dates.</td></tr>`. The complete built file contains no statement about an earlier comparable Loop Tour lineup change.
   - Record bytes 9453-9611 in the [reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:66): “No admitted record establishes an earlier comparable Loop Tour lineup change or elapsed time since one.” It is graded B for answer 5.
   - Correct account: The page should state that the admitted record supplies no earlier comparable Loop Tour lineup change. The event therefore cannot be described or implicitly framed as a first, an unprecedented change, or a change occurring after a calculable interval.

5. **Minor: The legal instrument used for the Raymond James comparison exists but is not pinned.**

   - Page bytes 30543-30637: `A publicly owned venue on Sheeran's tour had already shown what a negotiated contract could do.`
   - Record bytes 1063-1302 and 2747-3026 in the [FOX 13 pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/fox13-raymond-james-west-contract-2026-06-18.txt:9) identify a 38-page contract and say the reporting used “the formal contract between Ikon Global and the Tampa Sports Authority.”
   - The manifest confirms that no published copy of the executed agreement was found or pinned. [Manifest](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/manifests/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.json:867)
   - Correct account: Until the executed agreement is pinned, every clause and financial term should remain explicitly described as outlet-reported rather than independently inspected. The page already attributes the material to FOX 13, so this is a source-completeness defect rather than a false statement.

VERDICT: NO-SHIP

