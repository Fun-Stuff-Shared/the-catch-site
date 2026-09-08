# Dispositions (keystone, 2026-09-08, rework commit see git log "Government funding: the exceptions")

Each finding checked at the enrolled text or the registry-held statement before any edit.

| # | Finding | Verified at the bytes | Disposition |
|---|---|---|---|
| L1-1 | "No new programs, no front-loaded grant rounds" exceeds the law | Yes: sec. 146 line 533 (military construction not otherwise authorized), sec. 156 line 699 (first-come, first served competition), sec. 109 line 148 | Fixed: baseline stated as baseline, both exceptions named and cited |
| L1-2 | CBO estimate treated as unavailable, cited to the enrolled bill | Partly: cbo.gov returned 403 to the registry, to a browser-identified fetch, and via the archive this session; the auditor's copy was not reproducible here | Fixed: the false citation removed; the route failure typed; no CBO figure printed because none is held |
| L1-3 | Section 106 described as one global trigger | Yes: enrolled lines 128 to 136 (per project or activity); Senate section-by-section "a particular program or activity" | Fixed: block rewritten program by program; three-things item reworded |
| L2-4 | Most of what the act does is omitted | Yes: sec. 127 $2,853,000,000 (line 369), 146, 2006 (line 781), 4304 $130,191,781 (line 1192); Collins August 2 shipbuilding and Disaster Relief Fund | Fixed: new block naming five exceptions with the chair's list; not a full inventory (108 sections), and says so |
| L2-5 | Asymmetric account of opposition | Yes: Simon and Ramirez are Nay at roll286.xml lines 418 and 384; their statements admitted through the registry | Fixed: two new blocks; the hemp/abortion sentence scoped to the Republican side; two statements typed as two of 29 |
| L2-5b | H. Res. 1499 was unrelated to H.R. 6500 | Yes: cloakroom summary lists H.R. 1501, 9436, 4795, H. Res. 1490 | Fixed: one sentence added to the rule-vote block |
| L2-6 | Visible source numbers drift from citation numbers | Yes: StorySources restarted each group's <ol> at the first id and let the browser count | Fixed site-wide: each list item carries its own value attribute |
| L2-6b | State footer reports no completed source check | Shared state pipeline (Luna read) pending, not page copy | Not changed here |

Not done this pass: the CBO figures (no held copy), the remaining 27 Democratic and 17 Republican nays' reasons, Roll Call's "earliest completion" superlative, the PBS/Cole YouTube links. Pre-existing quote_lint findings on this page (line-wrapped quotes and short-quote spans) are untouched; they belong to the older-page sweep already on the board.

---

The missing center is the enacted law itself. The page accurately reports the vote and signature, but omits most of the measure’s funding exceptions, authorizing extensions, rescissions, direct appropriations, and CBO analysis. It also explains Republican opposition while leaving the larger group of Democratic nays substantially voiceless.

Audit basis: the 79,699-byte [built article](/Volumes/4/GitHub/the-catch-site/dist/events/government-funding/september-2026/index.html), SHA-256 `3c5029814a842db7b5dd3e00d7aa07d3b7c489edf354fe5790f3b355264a057a`. Byte offsets below are 0-based and inclusive. The manifest contains 43 entries representing 41 unique URLs and captures. It contains zero video pins or transcript files, so the required frame-by-frame denominator was zero. The expected live URL returned HTTP 404 at 4:11 p.m. EDT on September 8, so these are verified build bytes, not confirmed deployed bytes. No repository files were changed. Audit run: 29 minutes, 10 seconds.

## Layer 1: Verification

### 1. CRITICAL: “No new programs” and “no front-loaded grant rounds” exceed the cited law

Page bytes 45,444-45,533:

> `No new programs, no front-loaded grant rounds, and the Uniform Guidance rewrite postponed.`

The cited restrictions are qualified. Section 109 applies to particular programs and only prohibits grants that “would impinge on final funding prerogatives.” More importantly, later provisions expressly override the no-new-start restrictions:

- Section 146 permits the Army and Navy to carry out “military construction not otherwise authorized by law.” [Exact enrolled text, line 533](/Volumes/4/GitHub/the-catch-site/data/sources/government-funding/BILLS-119hr6500enr.txt:533)
- Section 156 authorizes, for fiscal years 2027 through 2029, a competition including “a first-come, first served competition” and appropriates $6,258,174.91. [Exact enrolled text, line 694](/Volumes/4/GitHub/the-catch-site/data/sources/government-funding/BILLS-119hr6500enr.txt:694)
- Section 109’s actual limitation is at [line 148](/Volumes/4/GitHub/the-catch-site/data/sources/government-funding/BILLS-119hr6500enr.txt:148).

The page correctly identifies the baseline rule but incorrectly presents that baseline as a categorical description of the whole act.

### 2. HIGH: The CBO estimate is treated as unavailable and cited to a record that cannot support the claim

Page bytes 64,628-64,762:

> `CBO published an estimate of the Senate text in August; its site blocked our saves on September 8, so its figures are not on this page.`

The accompanying citation is the enrolled bill. That bill proves neither CBO publication nor machine-access failure.

CBO’s [August 5 estimate](https://www.cbo.gov/publication/62643) was retrievable during this audit. It says the estimate covers the August 2 Senate committee text. Its [four-page estimate](https://www.cbo.gov/system/files/2026-08/Continuing-Appropriations-and-Extensions-Act-2027.pdf) reports annualized totals of:

- Budget authority: $1,700,879 million.
- Outlays: $1,869,190 million.

CBO explicitly says these figures are annualized. They are not the 72-day cost of the stopgap, and the outlay estimate includes spending flowing from prior-year appropriations. CBO also identifies a $6 million full-year Flex Subsidy appropriation, associated rescissions, $1.537 billion in emergency Superfund budget authority, and separate direct-spending and revenue effects.

The access explanation may describe a genuine earlier capture failure, but it does not justify omitting available figures or citing the enacted bill as evidence for that failure.

### 3. MEDIUM: Section 106 is described as one global expiration trigger

Page bytes 12,913-13,038:

> `Section 106 says the money lasts until a 2027 appropriations act is signed, or until December 11, 2026, whichever comes first.`

The law is program-specific. Section 106 ends authority for a project or activity when its appropriation or applicable full-year act is enacted, or on December 11. It does not say that enactment of any one of the twelve appropriations acts terminates the entire CR. [Exact enrolled text, line 128](/Volumes/4/GitHub/the-catch-site/data/sources/government-funding/BILLS-119hr6500enr.txt:128)

The [Senate Appropriations section-by-section](https://www.appropriations.senate.gov/download/section-by-section&download=1) confirms that the trigger concerns the applicable act and “a particular program or activity.”

### Material propositions verified without correction

- House passage, 370-48, the party split, September 1 at 2:03 p.m., suspension of the rules, and 14 not voting match the [House Clerk record](https://clerk.house.gov/evs/2026/roll286.xml).
- Senate passage, 90-6 at 3:37 a.m. on August 8, matches the [Senate roll call](https://www.senate.gov/legislative/LIS/roll_call_votes/vote1192/vote_119_2_00228.xml).
- The September 2 signature and Public Law 119-103 designation match the [White House signing note](https://www.whitehouse.gov/briefings-statements/2026/09/congressional-bill-h-r-6500-signed-into-law/) and [National Archives registry](https://www.archives.gov/federal-register/laws/current.html).
- The 101-day and 38-day elapsed calculations are correct.
- The limited hemp delay is supported by H.R. 6500 section 2019 and [Public Law 119-37, section 781](/Volumes/4/GitHub/the-catch-site/data/sources/government-funding/plaw-119-37.txt:3681).
- The page appropriately declines to attribute the September 1 market close to the funding vote.

The live enrolled PDF, House roll call, and Senate roll call matched their pins byte-for-byte during the audit.

## Layer 2: Completeness discovery

### 4. CRITICAL: The account omits most of what the law does

The controlling summary at page bytes 9,041-9,209 says:

> `The enrolled bill funds most agencies at fiscal year 2026 rates through December 11, 2026, or until a full-year 2027 appropriations act is signed, whichever comes first.`

That baseline is true, but materially incomplete. The enrolled text contains 108 numbered `SEC.` entries. The official section-by-section identifies sections 101-115 as the standard CR provisions, then describes dozens of exceptions and three additional divisions.

Material omitted provisions include:

- Farm-loan demand, 2030 Census preparation, weather-satellite schedules, federal judicial security, and FBI preparation for the 2028 Olympics.
- Navy shipbuilding cost-to-complete authority and up to $2.853 billion for National Security Systems. [Section 127, line 369](/Volumes/4/GitHub/the-catch-site/data/sources/government-funding/BILLS-119hr6500enr.txt:369)
- Disaster Relief Fund and wildfire-response flexibility.
- Additional Indian Health Service operating rates.
- Two $174,000 congressional death gratuities.
- Housing, transit, aviation, highway, and homeless-assistance funding changes.
- $21.4 million in temporary Medicaid disaster relief for the Northern Mariana Islands. [Section 2006, line 781](/Volumes/4/GitHub/the-catch-site/data/sources/government-funding/BILLS-119hr6500enr.txt:781)
- A $21 million reduction to the Medicare Improvement Fund.
- Haiti trade preferences and customs user fees, alongside AGOA.
- Passport-fee authority associated with more than $565 million in anticipated FY2027 revenue.
- $130,191,781 for supportive services to very low-income veteran families. [Section 4304, line 1192](/Volumes/4/GitHub/the-catch-site/data/sources/government-funding/BILLS-119hr6500enr.txt:1192)

Even Chair Collins’s August 2 release foregrounded “shipbuilding across multiple vessels” and the Disaster Relief Fund alongside WIC. [Official Collins statement](https://www.appropriations.senate.gov/news/majority/sen-collins-statement-on-release-of-continuing-resolution)

These are not incidental details. They identify which programs received exceptions, who benefits, and where the “current levels” shorthand stops being true.

### 5. HIGH: The account gives an asymmetric explanation of opposition

Page bytes 36,102-36,164:

> `The 370-48 margin hides a fight over hemp and abortion funding.`

That describes documented Republican objections, but 29 Democrats voted no compared with 19 Republicans. The article provides no Democratic-nay rationale and instead spends its “What happened next” section on an unrelated rule vote.

Two official statements establish at least two additional opposition rationales:

- Lateefah Simon said the resolution would continue funding a “deeply harmful and authoritarian agenda,” citing immigration enforcement, the Iran war, and election administration. [Simon’s statement](https://simon.house.gov/media/press-releases/congresswoman-simons-vote-hr-6500-continuing-appropriations-and-extensions-act)
- Delia Ramirez said H.R. 6500 continued funding DHS operations, including units she accused of “terrorizing our communities during Midway Blitz.” [Ramirez’s statement](https://ramirez.house.gov/media/press-releases/ramirez-statement-no-vote-continuing-resolution)

Both are confirmed Democratic nays in the [House roll call at lines 384 and 418](/Volumes/4/GitHub/the-catch-site/data/sources/government-funding/house-roll286.xml:384). These examples cannot establish the motives of all 29 nays, but they disprove hemp and abortion as a sufficient account of the 48-member opposition.

Page bytes 62,079-62,186 instead begin a lengthy account of H. Res. 1499. The [official House floor summary](https://repcloakroom.house.gov/floor/tuesday-september-1st-2026/) says that rule covered H.R. 1501, H.R. 9436, H.R. 4795, and H. Res. 1490, not H.R. 6500.

### 6. MEDIUM: The visible evidence ledger does not match its own provenance promise

Page bytes 65,835-65,933 promise:

> `Everything this page rests on, numbered where the story cites it. We keep a dated copy of each one.`

But the HTML restarts and reorders lists without assigning explicit values:

- The primary list begins at bytes 65,982-66,027. Because IDs 10, 31, and 14-22 are placed elsewhere, `src-11` is visibly numbered 10 and `src-29` is visibly numbered 19.
- The “Official data” list starts at bytes 71,423-71,470, where `src-31` is visibly numbered 11.
- Coverage starts at bytes 72,001-72,048; later IDs 34-43 appear visibly as 23-32.

The anchors still open the intended IDs, but the visible numbers contradict the citation numbers.

The page then says at bytes 76,888-77,032:

> `The state record has not yet read this story's sources, so it tracks no values for it...`

And at bytes 77,379-77,476:

> `No changes are recorded in this view. The first check of this story&#39;s sources has not run yet.`

That does not invalidate the underlying records, but it means the published surface itself reports no completed state-derived source check.

### Lineage assessment

The manifest has 43 entries but only 41 unique URLs and captures:

- Senate votes 227 and 228 are each duplicated to expose different passages.
- PBS republishes the same Kevin Freking Associated Press dispatch already counted as AP.
- Most news reports derive the vote totals, bill contents, and signature from the same official records.

The core chronology rests on five primary record streams: enrolled legislation, House vote data, Senate vote data, the presidential signing record, and the public-law registry. The Congressional Record adds procedural context. CBO is a separate analytical lineage. Coverage count should not be treated as independent corroboration count.

## Layer 3: Reconstructed story

Congress used H.R. 6500, originally passed by the House in January as an AGOA bill, as the vehicle for a broader funding agreement. The Senate replaced it with the Continuing Appropriations and Extensions Act, 2027, and passed that amended measure 90-6 on August 8. The House concurred in the Senate amendments under suspension of the rules, 370-48, on September 1. The president signed it September 2 as Public Law 119-103.

Division A generally continues FY2026 funding rates, but only as a baseline. It contains dozens of program-specific anomalies covering food assistance, loans, the census, weather satellites, law enforcement, shipbuilding, national-security systems, disaster response, wildfire operations, tribal health, transportation, housing, and other programs. Several provisions expressly override the standard restrictions against new starts. The operative expiration is project-specific under the applicable full-year appropriations act, with December 11 as the outside date.

Divisions B through D also extend trade, customs, cybersecurity, patent-fee, passport-fee, transportation, and veterans authorities. Some provisions contain direct appropriations, rescissions, or measurable revenue effects. CBO’s August 5 estimate is useful context, but its trillion-dollar totals are annualized FY2027 figures, not the cost of keeping government open for 72 days. Exact application to the enacted text still requires a text comparison against CBO’s August 2 input.

The broad vote reflected several distinct coalitions. Supporters emphasized avoiding another shutdown and maintaining services. Democratic appropriators supported Senate-added protections involving immigration-enforcement transfers and the proposed Uniform Guidance rule. Republican opponents cited hemp, abortion policy, and procedure. At least some Democratic opponents cited continued DHS funding, immigration enforcement, the administration’s broader agenda, and war funding. The record presently examined does not support assigning one motive to all 48 nays.

The next policy endpoint is not the unrelated H. Res. 1499 rule dispute. It is whether each applicable FY2027 appropriations act displaces the CR before December 11, and whether Congress renews or changes the hemp, grants, transportation, veterans, and other expiring authorities.

## Remaining high-value checks

- Diff the exact August 2 text scored by CBO against the enrolled act before treating every CBO figure as a final-law figure.
- Collect official explanations from the remaining Democratic and Republican nays. Two Democratic examples establish incompleteness, not the full distribution of motives.
- Pin the CBO estimate and Senate section-by-section with hashes and passage records.
- Test Roll Call’s attributed “earliest completion in recent memory” superlative against a defined historical denominator.
- The manifest has no video pins. The saved PBS and Cole pages contain YouTube links but no frozen video or transcript; capture and inspect them at `fps=1` if visual evidence will be used.
- Identify or deploy the intended public URL. The expected canonical route returned 404 during this audit.

VERDICT: INCOMPLETE

