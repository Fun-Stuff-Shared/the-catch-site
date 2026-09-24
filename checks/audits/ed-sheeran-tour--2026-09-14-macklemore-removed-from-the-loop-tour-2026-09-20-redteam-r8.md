I found three verified defects, ranked by reader harm.

1. **Major: The headline falsely collapses four different roles into “remaining opening acts.”**

   **Page bytes:** “Macklemore removed from Ed Sheeran's tour; the remaining opening acts quit.” ([built page](/Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:2))

   **Record bytes:** AP says, “Rowe and Lukas Graham would have been replacements for Macklemore on Sheeran’s remaining U.S. dates,” while Finneas “was due to tour with Sheeran in South America later this year.” ([AP pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/ap-support-acts-2026-09-15.txt:6)) Beoga says, “depart as Ed Sheeran's band on the remaining US Loop tour.” ([Beoga pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/beoga-withdrawal-2026-09-15.txt:7)) The reader model itself grades this exact defect B. ([reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:125))

   **Correct account:** Macklemore was removed from eight remaining U.S. appearances. Rowe and Lukas Graham were prospective replacement openers, Beoga was Sheeran’s band, and Finneas was booked for later South American dates.

2. **Minor: The central contract comparison cites coverage instead of the existing executed agreement.**

   **Page bytes:** “A publicly owned venue on Sheeran's tour had already shown what a negotiated contract could do,” followed by the liability and payment terms. ([built page](/Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:2))

   **Record bytes:** The pinned report says, “The 38-page contract features a specific clause” and identifies its source as “the formal contract between Ikon Global and the Tampa Sports Authority.” ([FOX 13 pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/fox13-raymond-james-west-contract-2026-06-18.txt:9), [source disclosure](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/fox13-raymond-james-west-contract-2026-06-18.txt:22)) The manifest pins only FOX 13’s coverage, not that agreement. ([manifest](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/manifests/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.json:625))

   **Correct account:** These are FOX 13’s reported contract terms until the executed 38-page agreement is pinned. Because the comparison supplies the page’s concrete example of venue power, the agreement should directly support the clause, liability allocation, and payment figures.

3. **Minor: The public-venue premise is credited to Rolling Stone although primary ownership and operating records are available.**

   **Page bytes:** “Rolling Stone identified Bank of America Stadium and Gillette Stadium as privately owned. It said the other five were owned or operated by cities, states or other public bodies.” ([built page](/Volumes/4/GitHub/the-catch-site-wt-mack/dist/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour/index.html:2))

   **Record bytes:** Official records say Mercedes-Benz Stadium is “owned by the GWCCA” but operated by the Falcons organization ([GWCCA](https://www.gwcca.org/gwcaa-atlantas-eco-hub-of-events-and-entertainment/)); AT&T Stadium is “City-owned,” while the team operates it ([City of Arlington](https://www.arlingtontx.gov/News-Articles/2026/April/City-Council-Approves-Agreement-to-Extend-Dallas-Cowboys-Lease)); Indiana’s authority owns Lucas Oil Stadium and the county board operates it ([Indiana ISCBA](https://www.in.gov/iscba/)); Hillsborough County owns Raymond James Stadium while the Tampa Sports Authority manages it ([Tampa Sports Authority](https://www.tampasportsauthority.com/timeline)).

   **Correct account:** The broad public-status classification is supported, but ownership and operation are distinct and should not rest solely on secondary coverage. The page should pin the official records and identify each owner-operator split because that distinction bears on its public-authority analysis.

VERDICT: NO-SHIP

