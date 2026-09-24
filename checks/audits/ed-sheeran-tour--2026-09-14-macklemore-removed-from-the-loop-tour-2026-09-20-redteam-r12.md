I found two Major findings, ranked by reader harm. No Critical findings.

1. **Major: The headline falsely describes all four departures as remaining opening acts.**

   **Page bytes:**  
   `<h1 data-layer="fact">Macklemore removed from Ed Sheeran&#39;s tour; the remaining opening acts quit</h1>`  
   [Built page](/Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:2)

   **Record bytes:**

   - AEG lists Macklemore, Lukas Graham and Aaron Rowe together as support on each of Macklemore’s eight remaining dates. [AEG schedule](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/aeg-loop-tour-support-schedule-2026-09-21.txt:25)
   - Beoga: `We have made the decision to depart as Ed Sheeran's band on the remaining US Loop tour` [Beoga statement](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/beoga-withdrawal-2026-09-15.txt:7)
   - AP: `Finneas, who is Billie Eilish’s brother and musical collaborator, was due to tour with Sheeran in South America later this year.` [AP record](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/ap-support-acts-2026-09-15.txt:6)

   **Correct account:** Aaron Rowe and Lukas Graham were already advertised support on Macklemore’s remaining eight dates. Beoga was Sheeran’s in-set band, and Finneas was booked for later South American dates. The headline creates exactly the wrong reading that the author’s reader model grades B and warns against. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:129)

2. **Major: The Raymond James comparison presents a pre-concert financial forecast as the completed revenue split and omits the actual result available before the page cutoff.**

   **Page bytes:**  
   `the authority collected those fees while West's team kept the remaining revenue, which could exceed $20 million.`  
   [Built page](/Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:2)

   **Record bytes:**

   - The pinned June 18 record describes concerts still scheduled for June 26 and 28, then says: `While the TSA collects these fees, West's team keeps the remaining revenue, which could exceed $20 million.` [FOX 13 pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/fox13-raymond-james-west-contract-2026-06-18.txt:6)
   - The August 7 Tampa Bay Times follow-up, reporting from documents presented to the authority’s board, says the agency `made an estimated $3.44 million from two Ye concerts` and that `Every cent they spent on food, drinks and parking` went to the authority. It also reports authority shares of merchandise and ticket revenue. [Republished Tampa Bay Times record](https://www.arcamax.com/entertainment/entertainmenttoday/s-4270652)

   **Correct account:** The June figure was a forecast, not the completed allocation. By August, records showed the authority received additional revenue streams and approximately $3.44 million in profit, so the page’s claim that West’s team kept everything beyond the stated fees is materially incomplete. This changes reader-model answer 4, the tour-financing and contract mechanism, which the model treats as B material. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:75)

VERDICT: NO-SHIP