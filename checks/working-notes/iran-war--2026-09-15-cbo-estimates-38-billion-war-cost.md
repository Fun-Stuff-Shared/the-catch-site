# Working note: iran-war / 2026-09-15-cbo-estimates-38-billion-war-cost

Candidate: cand-f7f4f8f5b534e4aa
Headline: Iran war cost hits estimated $38 billion, Congressional Budget Office says
Subject: iran-war
Story: 2026-09-15-cbo-estimates-38-billion-war-cost
Event id: event-iran-war-2026-09-15-cbo-estimates-38-billion-war-cost
Site worktree: /Volumes/4/GitHub/the-catch-site-wt46
Ask: primary is the CBO document on cbo.gov plus the request it answers; coverage after.

Seed articles (titles vs headline): ABC, AP, The Hill (CBO), The Hill (Pentagon $42B), CBS live-updates (war hub, not this letter), CBS CBO story, CBS video stub (310 chars, skipped), CNBC, NBC, Reuters Portuguese. Graph label "Angela Alsobrooks blames Iran war for higher prices" is a different cluster; Alsobrooks is on the CBO letter cc list. Seed is this letter except CBS live-updates and the video stub. Coverage universe rebuilt from the registry plus Politico and English Reuters.

## Census searches (one line each)

1. capture search "Congressional Budget Office Iran" --since 2026-09-01: 0 (index lag).
2. capture search "cbo.gov": CBO RSS items, no 62756 body until force.
3. capture search "62756": Hill Max Miller hit, not the letter.
4. capture search "Iran" --since 2026-09-14: older Iran war items, not the letter.
5. capture search "136465149" / "b99089" / "6091340" / "cbo-iran-war-cost-pentagon": 0; seed receipts still hold those URLs in quarry-wire-scheduled-20260915T220005Z.
6. capture search "boyle": Fetterman item, not the request.
7. capture search "publication/62756": 0; later already-held in quarry-wire-scheduled-20260917T220025Z RSS item, body via --force --via-archive.
8. capture search "42 billion Iran": 0; Hill Pentagon story is in the seed.
9. capture news CBO PDF --via-archive: capture-oneoff-20260918T082434Z, Wayback 20260917092913, 19-page PDF.
10. capture news CBO landing --force --via-archive: capture-oneoff-20260918T083201Z, Wayback 20260916192100.
11. capture news Boyle March request, Sept 15 findings, June 24 supplemental statements: capture-oneoff-20260918T082511Z / 082521Z / 082530Z.
12. capture news Boyle March 5 letter PDF: capture-oneoff-20260918T082825Z.
13. capture news White House Epic Fury: capture-oneoff-20260918T082718Z, canonical /releases/2026/03/operation-epic-fury-decisive-american-power-to-crush-irans-terror-regime/.
14. capture news OMB tinyurl 5n7msmcz: capture-oneoff-20260918T083244Z, final whitehouse.gov/wp-content/uploads/2026/06/2026.06.24-Letter-to-the-Honorable-Mike-Johnson.pdf.
15. capture news DoD IG OEF Q3 PDF: capture-oneoff-20260918T083319Z.
16. capture news Politico iran-war-cbo-01077533: capture-oneoff-20260918T083113Z.
17. capture news English Reuters CBO URL: already held quarry-wire-scheduled-20260915T220005Z article_3632.
18. capture search Hegseth 37.5 / SASC July 22 transcript: 0; used CBO's own account of the testimony.
19. CBO RSS items_raw 62756 date: Tue, 15 Sep 2026 14:00:00 -0400.
20. SAI corrections / catch-state: Angela Alsobrooks Iran-prices event is a different id; no existing iran-war-cost story.

## Passage tables (primaries)

### cbo-62756-iran.pdf (letter, 19 pages, dated September 15, 2026)

| Passage | What it supports |
|---|---|
| approximately $38 billion | Summary rounding of Table 1 |
| Comparing CBO's estimate ($38.1 billion) with | Table 1 total vs the supplemental |
| $21.7 billion: $7.3 billion for the land-attack cruise | Munitions split |
| an additional month of conflict would cost $2 billion | Monthly low |
| through September 2026 would be $37.5 billion | Hegseth, as CBO recounts it |
| DoD did not respond to CBO's requests for information | Method |
| 0.5 percentage points higher | PCE 2027 Q1 |
| added 2.3 percentage points | Q2 energy add |
| not directly comparable or summable | Four categories are separate analyses |
| February 28, 2026 / April 8, 2026 / On July 10, 2026 | Campaign chronology |
| between one-half and two-thirds | Interceptor inventory |
| at least five years | Rebuild time |
| CBO is unable to estimate the cost | Bases |
| CBO was unable to estimate potential | Diplomacy / foreign aid |
| $42.3 billion / $67.1 billion / $87.6 billion | Supplemental comparison |
| $11.1 billion for the Department of Agriculture | Farmers in the request, not Table 1 |

### boyle-letter-to-cbo-2026-03-05.pdf

| Passage | What it supports |
|---|---|
| March 5, 2026 | Request date |
| February 28, 2026 | War start in the request |
| The operational, logistical, and sustainment costs of the war in Iran | Question 1 |
| deploying U.S. troops on the ground in Iran | Scenario CBO did not price separately |

### omb-supplemental-2026-06-24.pdf

| Passage | What it supports |
|---|---|
| a request for $87.6 billion in | Total request |
| $67.1 billion for the Department of War | DoD slice |
| $11.1 billion to support | Agriculture |

### dod-ig-oef-q3-2026-09-09.pdf

| Passage | What it supports |
|---|---|
| $33.4 billion as of June 29 | Department clock |
| but does not include costs | Infrastructure excluded |
| seven U.S. Service members were killed | Casualties through June 30 |
| approximately $184 million | Diplomatic damage |
| incurred $113 million in costs related to the | State total through June 2 |
| More than 50,000 U.S. Service members were deployed | Force size |
| strategic inventory shortfalls | Munitions |

### wh-epic-fury-2026-03-12

| Passage | What it supports |
|---|---|
| obliterate Iran's ballistic missile arsenal and production capacity | Stated aims; CBO cites this release |

## Patch list (cbo-patch.md, 2026-09-18)

1. Department of War: one sentence at first use in the catch; record's word in quotes, Defense Department elsewhere.
2. Figure labels on all 18; `hegeseth_37_5` renamed `hegseth_37_5`.
3. Fuel: $1.8 billion from $1,822 million; sum with $835 million is CBO's $2.7 billion.
4. Unit string `billion USD` in KPIs and figures.
5/9/17. Casualties: 7 KIA and 7 non-hostile through June 30, 417 wounded, 4 more KIA in July; Table 4 total 18 as of August 26; prose and table disagree.
6. CBS monthly-range sentence cites CBS.
7. "That money has not been enacted" cites AP.
8. $42.3 billion sentence cites CBO.
10. SAC hearing captured (capture-oneoff-20260918T093309Z); Reuters July 21 checks out; CBO still July 22 Armed Services.
11/18. Clerk 2026307, 2026199, Senate floor 06_23_2026, Senate wrap-up 09-16 admitted; Boyle War Powers sentence; three chronology rows; What happened next votes.
12. IG base-budget sentence; House Budget H.Con.Res. 113 admitted (216-214).
13. DoD IG listing admitted: Sept. 14, 2026. AP Monday. September 9 is not in the report text pin (PDF modification date Sep 9 only).
14. NBC share checks out; dropped from the list of what coverage got wrong.
15. CENTCOM Feb 28 admitted; opening cites 1:15 am ET.
16. KPI label reworded; PCE gloss kept in Three things.
19. Brown May 18 admitted; Who feels it names it as a separate consumer estimate.
20. AP UN Sep 17 force-captured (capture-oneoff-20260918T093839Z); dated paragraphs.
21. Incremental vs disbursed/obligated near the top.
22. Reuters row: June 19 and $184 million.
23. CBO names CSIS; Last Rounds admitted; current-war vs future-war sentence.
DCAS: captured, title only; capture history, not cited.

## Open questions after disproof search

- Hegseth Senate Armed Services transcript for July 22: CBO's letter still gives that date; the Appropriations page is July 21.
- August 13 Pentagon $42 billion table: Hill aide only.
- Ground-force cost case Boyle asked for: not in the letter.
- White House Kelly / Pentagon Parnell: coverage quotes, no primary pages.
- DCAS monthly table: capture served only the title.
