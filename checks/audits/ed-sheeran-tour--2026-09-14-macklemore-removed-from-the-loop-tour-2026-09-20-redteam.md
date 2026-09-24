NO-SHIP. I found five Major and four Minor findings. No Critical finding was verified. The reviewed build remained stable at SHA-256 `38818669dcd56ea50f13c080112b640af7354fb35b1df9ccdea42e05f6e97703`; all 24 raw and text pins matched the manifest hashes.

## Ranked findings

1. **Major: The headline falsely classifies all four departures as remaining opening acts.**

   **Page bytes:** “Macklemore removed from Ed Sheeran's tour; the remaining opening acts quit.” The body later concedes: “Four artists left, but they were not four remaining openers.” [Title data](/Volumes/4/GitHub/the-catch-site-wt-mack/src/data/ed-sheeran-tour-2026-09-14-macklemore-removed-from-the-loop-tour.mjs:59), [page source](/Volumes/4/GitHub/the-catch-site-wt-mack/src/pages/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour.astro:109)

   **Record bytes:** AP says Rowe and Lukas Graham “would have been replacements,” Beoga performed during Sheeran’s set, and Finneas was due in South America. [AP pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/ap-support-acts-2026-09-15.txt:6) Beoga calls itself “Ed Sheeran's band.” [Beoga statement](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/beoga-withdrawal-2026-09-15.txt:7) The official MetLife listing also billed “special guests Macklemore, Lukas Graham, and BIIRD,” showing that Lukas Graham was already a billed guest before the removal. [MetLife Stadium event page](https://www.metlifestadium.com/events/detail/ed-sheeran-loop-tour-k7vgfbs6gcxif)

   **Correct account:** Macklemore was removed, then four artists in different roles withdrew. Lukas Graham had already been billed at MetLife and was subsequently described by AP as one of the artists who would cover Macklemore’s remaining U.S. dates. The reader model itself grades this headline defect B. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:120)

2. **Major: The story omits material parts of Sheeran’s first-person account of his own choices and interests.**

   **Page bytes:** “Sheeran said Macklemore's contract was with the promoter and that venue and promoter decisions were final.” [Page source](/Volumes/4/GitHub/the-catch-site-wt-mack/src/pages/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour.astro:63)

   **Record bytes:** Sheeran said support acts could choose their setlists; he “spoke with the venues at length all week,” including Kraft; touring personnel depended on him for work; and families “do not expect a political forum.” [Sheeran statement, slides 1 to 3](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/ed-sheeran-response-2026-09-15.txt:7), [slide 5](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/ed-sheeran-response-2026-09-15.txt:19)

   **Correct account:** Sheeran denied final responsibility, but he also described personally negotiating with venues, accepting Macklemore’s setlist choice, protecting dependent workers, and choosing a nonpolitical family-show model. Those claims do not settle contractual authority, but omitting them removes his stated mechanism and rationale. The reader model grades these passages A or B. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:33)

3. **Major: Macklemore’s explanation for why the same advocacy became disqualifying is omitted.**

   **Page bytes:** “Macklemore said Sheeran told him that Kraft had rallied other stadium owners and that the words ‘Free Palestine’ and the Palestinian flag had been described as hurtful.” [Page source](/Volumes/4/GitHub/the-catch-site-wt-mack/src/pages/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour.astro:87)

   **Record bytes:** Macklemore said Sheeran maintained an “I don't take sides” position. He also said he had made similar statements “for almost three years” and argued that the larger artist, stadium, and audience exposure made them newly risky. [Macklemore statement, slide 5](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/macklemore-removal-statement-2026-09-14.txt:21), [slide 7](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/macklemore-removal-statement-2026-09-14.txt:27)

   **Correct account:** Macklemore did not describe the words alone as the changed condition. His stated theory was that their association with Sheeran and major U.S. stadiums increased the commercial and political risk. Both passages are graded B and affect the easiest wrong reading. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:25)

4. **Major: The account of Sheeran’s first post-removal appearance omits his admission of mistakes and apology.**

   **Page bytes:** “Sheeran called the situation in Gaza ‘catastrophic and unjustifiable’ and said he worried about venues preapproving performances.” The detail block calls its selected quotations his “fuller remarks.” [Page source](/Volumes/4/GitHub/the-catch-site-wt-mack/src/pages/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour.astro:143), [detail block](/Volumes/4/GitHub/the-catch-site-wt-mack/src/pages/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour.astro:155)

   **Record bytes:** The Times pin says Sheeran “had made ‘mistakes’ during the week and apologized for disappointing fans,” before calling the conflict a humanitarian issue. [New York Times pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/nyt-philadelphia-outcome-2026-09-19.txt:5)

   **Correct account:** Sheeran’s Philadelphia remarks included both a substantive position on Gaza and an apology for unspecified mistakes. The omission changes the answer to what happened at the first show afterward, so it is Major against the reader model’s C grade. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:71)

5. **Major: “No response” is presented without the statutory clock or the public venue’s legal structure.**

   **Page bytes:** “As of September 20, no response or production is in the admitted record.” [Page source](/Volumes/4/GitHub/the-catch-site-wt-mack/src/pages/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour.astro:145)

   **Record bytes:** The request was filed September 17 and named the Eagles, stadium operator, City, PAID, and other parties. [CAIR pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/cair-philadelphia-records-request-2026-09-17.txt:4) Pennsylvania says, “An Agency has five business days to respond in writing.” [Office of Open Records guide](https://www.openrecords.pa.gov/RTKL/CitizensGuide.cfm) The City’s stadium financing record says, “The City has leased from the Authority a parcel of land in the City,” and describes the Authority leasing Eagles premises to the team. [Official bond and lease record](https://www.phila.gov/media/20201222120535/PAID-Multi-Model-Lease-Revenue-Refunding-Bonds-Series-2007-B.pdf)

   **Correct account:** September 20 was a Sunday, before the ordinary five-business-day response period could expire. The next expected record was an initial grant, denial, or extension notice; the City, Authority, and Eagles lease chain explains why public records were sought but does not prove any of them participated in the removal.

6. **Minor: The petition is credited through coverage and its requested actor scope is narrowed to Sheeran.**

   **Page bytes:** “The Israeli American Council started a petition asking Sheeran to remove Macklemore from the rest of the tour.” [Page source](/Volumes/4/GitHub/the-catch-site-wt-mack/src/pages/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour.astro:83)

   **Record bytes:** The live petition says, “We call on Ed Sheeran, tour leadership, and the leadership of all venues hosting the Tour.” It also asks whether the speech and performance were approved in advance. [IAC petition](https://forms.monday.com/forms/f163b4356de725b93cde321cf3f1e2d5?r=use1)

   **Correct account:** The campaign targeted Sheeran, tour leadership, and venue leadership, and sought prospective content boundaries. The page should cite this available primary record and preserve that scope.

7. **Minor: “24 records” is a document count, not an independent-source denominator.**

   **Page bytes:** “The 24 records admitted through September 20 contain no earlier comparable Loop Tour removal.” [Page source](/Volumes/4/GitHub/the-catch-site-wt-mack/src/pages/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour.astro:65)

   **Record bytes:** The manifest counts the pre-show and revised post-show versions of the same AP URL separately. [Preview](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/manifests/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.json:330), [outcome](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/manifests/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.json:362) Reuters attributes its core claims to Sheeran’s Instagram post and Messina’s Rolling Stone statement. [Reuters pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/coverage/reuters-sheeran-response-2026-09-15.txt:7)

   **Correct account:** Twenty-four is the number of captured documents, including revisions and derivative carriers. It should not be read as 24 independent searches or confirmations of the absence claim.

8. **Minor: Macklemore’s recorded response to the antisemitism allegation is absent from every reading mode.**

   **Page bytes:** Kraft’s allegation is reported as “a broader history of antisemitic rhetoric and imagery.” [Page source](/Volumes/4/GitHub/the-catch-site-wt-mack/src/pages/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour.astro:85)

   **Record bytes:** Macklemore said antisemitism is real but argued that criticism of Israel or Zionism should not be conflated with hatred of Jewish people. [Macklemore statement, slide 8](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/macklemore-removal-statement-2026-09-14.txt:30)

   **Correct account:** The page properly attributes Kraft’s characterization, but the full record also contains Macklemore’s direct rebuttal. The reader model grades this C, so its complete omission is Minor. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:28)

9. **Minor: A concrete Gillette content-control policy is omitted from every reading mode.**

   **Page bytes:** “A venue can refuse to host a lineup, while a stadium-level headliner generally has substantial approval.” [Page source](/Volumes/4/GitHub/the-catch-site-wt-mack/src/pages/events/ed-sheeran-tour/2026-09-14-macklemore-removed-from-the-loop-tour.astro:61)

   **Record bytes:** Gillette’s event page says, “Stadium/artist management reserves the right to prohibit signs or banners due to message content.” [Gillette pin](/Volumes/4/GitHub/the-catch-site-wt-mack/data/sources/ed-sheeran-tour/gillette-loop-tour-2026-09-20.txt:28)

   **Correct account:** This policy does not establish who removed Macklemore, but it is concrete evidence that content-based control was expressly reserved to stadium or artist management at a central venue. The reader model grades it C, making its complete omission Minor. [Reader model](/Volumes/4/GitHub/the-catch-site-wt-mack/checks/reader-models/ed-sheeran-tour--2026-09-14-macklemore-removed-from-the-loop-tour.md:54)

VERDICT: NO-SHIP

