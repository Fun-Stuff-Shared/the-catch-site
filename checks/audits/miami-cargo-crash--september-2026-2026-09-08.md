# Dispositions (keystone, 2026-09-08, rework commit 26f62b67)

Each finding checked at the pinned bytes before any edit. Verified = the record says what the auditor said it says.

| # | Finding | Verified at the bytes | Disposition |
|---|---|---|---|
| L1-1 | Names absence claim obsolete | Yes: Local 10 (captured through the registry, run capture-oneoff-20260908T212253Z) names all five dead, three hospitalized, two pilots; AP 18:42Z copy matches with a spelling correction | Fixed: new Who-feels-it blocks, KPI labels, three-things, unknowns item replaced with which-vehicle question |
| L1-2 | Page contradicts its own transcript on 1,300 feet | Yes: transcript line "In total it was about 1300 ft. past the paved surface." | Fixed: transcript is the cited record; receipt text corrected; outlets typed as one lineage |
| L1-3 | EMAS count confuses beds with airports | Yes: FAA Safety Briefing Mar/Apr 2026 "122 EMAS installations at 70 U.S. airports"; transcript "about 72 airports"; AP and CNBC "more than 120 airports" | Fixed: catch retitled, count rendered from the data module, AP outlet block names the unit swap |
| L1-4 | "Not Amazon's plane" overcorrects | Yes: registry owner Andromeda Leasing II; NTSB page operator 21 Air LLC; Amazon "Amazon Air plane operated by 21 Air"; Duffy "an Amazon cargo plane" | Fixed: catch and claim check now separate owner, operator, customer; "operated by Amazon" stays the wrong claim; quote_lint L229 cleared by citing Duffy |
| L1-5 | Runway denominator imprecise | Yes: FAA AIP Runway 30 9360 ft, LDA 7913, ASDA 8853 | Fixed: new paragraph with both figures from the data module and the computed gap |
| L2-1 | NTSB investigation page and docket omitted | Yes: DCA26MA352 page, Part 121, Status: Ongoing; docket "has not been released" | Fixed: new record block in What happened; unknowns item rewritten; watching line |
| L2-2 | ADS-B speeds unused | Yes: FR24 pin 112 knots exiting, 69 last received; transcript "various sources ... confirm with the flight data recorder" | Fixed: catch 4 and a new paragraph, typed provisional and not NTSB-confirmed |
| L2-3 | Source-revision machinery missed AP's revision | Partly: the story-state footer is the shared state machinery (Luna read not yet run on this story), not page copy | Page side fixed by pinning AP's Tuesday story as its own record; the "first source check has not run" footer is typed pending on the state pipeline, not edited here |
| L2-4 | Landing footage not pinned | Not verified: no landing video was located this pass | Not fixed: typed open; page already says the NTSB has not confirmed any video reading |
| L2-5 | Duplicate lineages | Yes: PBS bylines are AP; CNBC repeats AP's Schiavo and EMAS sentences | Fixed: outlets intro names both lineages; O'Brien paragraph says AP and CNBC are one source for Schiavo |
| L2-6 | Disruption figures are stale snapshots | Yes: AP Sept 8 "More than 225 flights were canceled Sunday and Monday"; Local 10 two runways closed Monday and Tuesday | Fixed: catch 5 rewritten with dated snapshots and the two-day total |
| L2-7 | Comparator follows the brand | Yes: NTSB DCA25SR002 page, 11 wet-runway overruns 2008 to 2022 | Fixed: precedent paragraph rewritten; wet-or-dry typed unknown and added to the unknowns list |

Not done this pass: the 7 p.m. Tuesday NTSB briefing (not pinned; no page claim made), the original landing footage, the sheriff's own release, OCR of nothing (no PDF gap here). Dated "Correction, September 8" lines removed from the page per the 2026-09-08 rule that unpublished pages fix the mechanism instead of carrying corrections.

---

# Audit result: materially incomplete

The largest omissions are current human facts and primary investigative context. The page still treats victims’ names as unknown, although the sheriff identified all five people killed, all three hospitalized survivors, and both pilots on September 8. It also falsely says its saved NTSB transcript lacks the 1,300-foot figure, misstates the EMAS denominator, and turns the distinction between owner, operator, and customer into the overbroad catch “Not Amazon’s plane.”

This is a bounded current-state audit as of September 8, 2026, 5:07 p.m. EDT. The NTSB had scheduled another briefing for 7 p.m., the public docket remained unreleased, and no preliminary report, recorder data, maintenance records, or official Runway 30 EMAS determination was available.

Byte ranges below are zero-based and half-open. The audited [built page](/Volumes/4/GitHub/the-catch-site/dist/events/miami-cargo-crash/september-2026/index.html) is 72,607 bytes, SHA-256 `1ab7d747c68d95e9a5931be8b6d18966ff53fa485b1a1944d50d3c90410f0cb5`.

## Layer 1: Verification

### 1. CRITICAL: The names and injury-status absence claim is obsolete

**Page bytes:** `[52373,52605)` says it is watching “whether Miami-Dade names the dead.” Bytes `[53377,53483)` list “The names of the dead and injured” among unanswered questions.

**Record:** The [September 8 Local 10 report of Sheriff Rosie Cordero-Stutz’s briefing](https://www.local10.com/news/local/2026/09/08/miami-dade-sheriff-rosie-cordero-stutz-to-release-update-on-fatal-cargo-plane-crash/) contains:

- Response bytes `[12240,12480)`: “Miami-Dade Sheriff Rosie Cordero-Stutz identified the five dead who were traveling in the Econoline van as Rolando Aleman Leon, 55; Yoel Rodriguez Naranjo, 53; Julio C. Pineda, 75; Carlos Acosta Fajardo, 53; and Javierkys Reyes Quevedo, 47.”
- Bytes `[12623,12819)`: Eugenio Corredor and Ridoel Averhoff Diaz were critical; Roosevelt Sebastian Perdomo Torres was stable.
- Bytes `[12905,13021)`: pilots Jaime Felipe Silva Molina and Joseph Carol suffered minor injuries.

The [current AP account](https://apnews.com/article/amazon-cargo-plane-crash-miami-airport-victims-6c23909e94ea2faedd28071749fc00e3) independently reports the same names and says all five deaths occurred in the van. Its correction at bytes `[860330,860502)` says an earlier version misspelled Yoel Rodriguez Naranjo’s last name because the original sheriff’s release contained the error.

**Correct account:** Five Professional Ocean Service workers were killed in the van. Two pilots were treated and released with minor injuries. Three other people remained hospitalized, two critical and one stable. The page should name all ten people where authorities have released names and preserve the correction history.

### 2. HIGH: The page directly contradicts its own saved NTSB transcript

**Page bytes:** `[29775,29854)`: “The C-SPAN transcript of the briefing does not include the figure 1,300 either.”

**Record:** [Saved C-SPAN transcript](/Volumes/4/GitHub/the-catch-site/data/sources/cspan-ntsb-briefing-2026-09-07-transcript.txt), bytes `[3677,3731)`: “In total it was about 1300 ft. past the paved surface.”

**Correct account:** Jennifer Homendy stated the 1,300-foot figure directly in the NTSB briefing. CBS, Reuters, and CNBC are downstream reports of that one NTSB lineage, not the source needed to establish the number.

### 3. HIGH: The EMAS count confuses installations with airports

**Page bytes:** `[23469,23628)` says a standard bed is designed for 70 knots or less and “such beds are installed at more than 120 airports.”

**Records:**

- The saved NTSB transcript, bytes `[7870,7902)`, says “about 72 airports across the US.”
- The [FAA’s March/April 2026 Safety Briefing](https://www.faa.gov/sites/faa.gov/files/MarApr2026.pdf), extracted-text bytes `[10956,11029)`, says: “Across the country, there are 122\nEMAS installations at 70 U.S. airports.”
- The [FAA EMAS page](https://www.faa.gov/airports/engineering/incursions_excursions/emas), response bytes `[87040,87056)`, gives the 70-knot design condition.

**Correct account:** As of the FAA’s March/April 2026 publication, there were 122 installations at 70 airports. “More than 120 airports” changes the unit and materially inflates the airport denominator.

The procedural context is also missing. FAA response bytes `[86368,86431)` say EMAS is used where airports lack adequate space for traditional safety areas. The live AP source reports that Miami appeared compliant because it had a 1,000-foot runway safety buffer. That is an expert assessment, not yet a case-specific FAA determination.

### 4. HIGH: “Not Amazon’s plane” is an overcorrection

**Page bytes:** `[21472,21598)`: “Not Amazon’s plane. Headlines said Amazon cargo plane. The FAA and the NTSB name 21 Air, a contractor flying for Amazon.”

**Records:**

- [Amazon’s own statement](/Volumes/4/GitHub/the-catch-site/data/sources/amazon-update-2026-09-06.txt), bytes `[669,707)`: “an Amazon Air plane operated by 21 Air.”
- The NTSB transcript, bytes `[17246,17349)`, calls it “an Amazon operation or operation for transporting cargo” contracted to 21 Air.
- The [FAA registry pin](/Volumes/4/GitHub/the-catch-site/data/sources/faa-registry-n1997a.txt), bytes `[2020,2044)`, names the registered owner as “ANDROMEDA LEASING II LLC.”
- The official [NTSB investigation page](https://www.ntsb.gov/investigations/Pages/DCA26MA352.aspx), response bytes `[55346,55469)`, identifies 21 Air LLC as the operator.

The repository’s quote checker also fails at source line 229 because the quoted span “Amazon cargo plane” is absent from the cited records.

**Correct account:** Andromeda Leasing II LLC was the registered owner, 21 Air LLC was the operating carrier, and the aircraft was flying an Amazon Air cargo mission. “Amazon cargo plane” is reasonable customer or network shorthand. “Operated by Amazon” would be wrong. The current catch conflates ownership, operation, branding, and customer responsibility.

### 5. MEDIUM: The runway denominator is materially imprecise

**Page bytes:** `[31563,31626)` reports an analyst saying the plane was “about halfway down a 9,000-foot runway.”

**Record:** The [FAA Aeronautical Information Publication](https://www.faa.gov/air_traffic/publications/atpubs/aip_html/part3_ad_2.0_florida.html) gives:

- Response bytes `[72030,72063)`: Runway 30 true dimensions are 9,360 by 150 feet.
- Bytes `[73972,74004)`: landing distance available is 7,913 feet.
- The same record lists TORA/TODA as 9,355 feet and ASDA as 8,853 feet.

**Correct account:** “Halfway” must name its denominator. The physical runway is 9,360 feet, while Runway 30’s declared landing distance is 7,913 feet. The analyst’s 9,000-foot phrasing is only a rough approximation and should not be presented as the operational landing denominator.

## Layer 2: Completeness discovery

### 1. HIGH: The official NTSB investigation hub and procedural stage are omitted

**Page bytes:** `[53717,53946)` says the available NTSB record consists of X posts, the Monday transcript, and coverage. Bytes `[52373,52448)` say the page is watching for a written briefing or preliminary report.

**Records:**

- The official [NTSB investigation page](https://www.ntsb.gov/investigations/Pages/DCA26MA352.aspx), response bytes `[55470,55576)`, identifies the flight as a Part 121 cargo operation.
- Bytes `[58025,58032)` state “Ongoing.”
- The investigation identifier is DCA26MA352.
- The [NTSB docket](https://data.ntsb.gov/Docket/?NTSBNumber=DCA26MA352) says: “The docket for this investigation has not been released.”

**Correct account:** No written press release or preliminary report had appeared, but an official investigation page and docket endpoint existed. The story should identify the Part 121 operating regime, investigation number, ongoing status, and unreleased docket. Its narrow press-release absence claim is defensible; its broader “what we have” characterization is incomplete.

### 2. HIGH: Direct ADS-B speed evidence is present in the source set but unused

**Page bytes:** `[52373,52605)` says it is waiting for speed from the flight data recorder. The visible account instead foregrounds an analyst’s 185 mph estimate.

**Records:**

- [Flightradar24 pin](/Volumes/4/GitHub/the-catch-site/data/sources/fr24-21air-7598-miami.txt), bytes `[1429,1529)`: “speed at 112 knots as it exited the usable area of the runway. The last received speed was 69 knots.”
- The NTSB transcript around bytes `[11566,11716)` says investigators had speed information from various sources but were withholding it until comparison with the flight data recorder.

**Correct account:** Public ADS-B showed 112 knots at the usable-runway exit and 69 knots at the final reception point. Those figures are provisional and not NTSB-confirmed. They do not contradict 185 mph at a different position and time. The story should report both with normalized locations, units, and evidentiary status.

### 3. HIGH: The page’s source-revision machinery missed a material revision

**Page bytes:** `[10255,10280)` says “Story updated 2026-09-08.” Bytes `[69910,69963)` say the page does not list who reported each figure. Bytes `[70032,70130)` say no changes are recorded and the first source check has not run.

**Records:**

- The pinned [AP text](/Volumes/4/GitHub/the-catch-site/data/sources/coverage/ap-miami-cargo-crash.txt), line 6, says it was unclear whether the pilots survived or whether everyone killed was in vehicles.
- The current version of that same AP URL, response bytes `[898533,898696)`, says all five killed were in a van carrying seven cleaning-company workers.
- AP’s separate September 8 report records a correction prompted by an erroneous sheriff’s release.

**Correct account:** A materially revised source cannot be presented through a “no changes” state merely because the source checker has not run. The reader-facing state should say unchecked or stale and should surface the revised casualty and occupancy facts.

### 4. MEDIUM: The actual landing footage is absent from the evidence set

**Page bytes:** `[24509,24622)` says analysts watching public video described a long float and tailwind. Bytes `[31563,31626)` add speed and runway-position estimates.

**Record:** Manifest bytes `[27970,28070)` and `[28800,28912)` describe the PBS and CNBC interpretations, but the 36-record manifest contains no pinned landing video file. The only video-page pin is the C-SPAN briefing.

I extracted all 1,607 frames of the 1,606.4-second C-SPAN stream at one frame per second and read the complete transcript. The video shows only the press briefing. Visible provenance is a WSVN watermark and, beginning around 12 seconds, a C-SPAN lower third. It contains no landing footage, source slate for the landing footage, crash imagery, or independent visual support for touchdown point, speed, or wind.

**Correct account:** The original landing footage must be pinned and attributed. Visual observation, geolocation, ADS-B-derived speed, weather data, and analysts’ inferences should be separate evidence classes. The footage alone cannot prove 185 mph, tailwind, runway station, or cause.

### 5. MEDIUM: Several apparent sources are duplicate lineages

**Page bytes:** The “what video shows” and EMAS passages present several publisher citations without explaining their shared provenance.

**Records:**

- [PBS early coverage](/Volumes/4/GitHub/the-catch-site/data/sources/coverage/pbs-miami-cargo-crash.txt), line 3, identifies its authors as Associated Press journalists.
- [AP coverage](/Volumes/4/GitHub/the-catch-site/data/sources/coverage/ap-miami-cargo-crash.txt), bytes `[1612,1702)`, and [CNBC coverage](/Volumes/4/GitHub/the-catch-site/data/sources/coverage/cnbc-miami-cargo-crash-probe.txt), bytes `[1998,2088)`, repeat the same Mary Schiavo attribution and wording.
- Both repeat the same erroneous “more than 120 airports” EMAS formulation.

**Correct account:** PBS’s early story is AP copy. The Schiavo and EMAS passages in AP and CNBC are one AP-derived lineage. The 1,300-foot reports are downstream of one NTSB briefing lineage. The landing interpretation has two identifiable expert lineages: Miles O’Brien through PBS and Mary Schiavo through AP syndication.

### 6. MEDIUM: Operational disruption figures are stale snapshots, not current totals

**Page bytes:** `[25228,25478)` reports more than 160 cancellations and nearly 325 delays by late Sunday, then at least 55 cancellations and more than 100 delays on Monday without a Monday timestamp.

**Records:**

- The current AP source, response bytes `[1010730,1010862)`, reports 160 cancellations and more than 300 delays Sunday, plus 69 cancellations Monday through mid-afternoon.
- The later [AP September 8 account](https://apnews.com/article/amazon-cargo-plane-crash-miami-airport-victims-6c23909e94ea2faedd28071749fc00e3), bytes `[859109,859211)`, says more than 225 flights were canceled Sunday and Monday and hundreds delayed.
- Local 10 reports two of four runways remained closed Monday and Tuesday.

**Correct account:** These are changing FlightAware or airport snapshots, not contradictions. Each needs an observation time, source, and denominator. The current story should say at least 225 combined cancellations by the later update and note that two runways remained closed Tuesday.

### 7. MEDIUM: The comparator follows the Amazon brand, not the overrun mechanism

**Page bytes:** `[32796,33055)` selects Atlas Air Flight 3591 as the bounded precedent because it was another Amazon cargo 767, while acknowledging a different operator, phase, and cause.

**Record:** The NTSB’s May 2026 [wet-runway overrun report](https://www.ntsb.gov/investigations/Pages/DCA25SR002.aspx), response bytes `[54337,54524)`, covers 11 wet-runway overruns from 2008 through 2022. Bytes `[55532,55716)` say existing friction assumptions can underestimate required landing distance and increase overrun risk.

**Correct account:** Atlas 3591 is a brand comparator, not a mechanism comparator. The stronger surrounding record is the NTSB’s recent runway-overrun work, prior EMAS recommendations, touchdown-zone policy, braking performance, runway condition, wind, crew decision-making, aircraft systems, and airport design. This does not establish that Runway 30 was wet or that friction contributed here. Those remain investigative questions.

## Reconstructed story

At 1:53 p.m. EDT on September 6, 2026, 21 Air Flight 7598, a Boeing 767-33A registered N1997A, landed on Miami International Airport’s Runway 30 after a Part 121 cargo flight from San Juan. The registered owner was Andromeda Leasing II LLC. The operator was 21 Air LLC. The mission was part of Amazon Air’s cargo network.

The aircraft overran the runway, struck navigational aids and equipment, hit a Professional Ocean Service Ford Econoline van carrying seven people inside the airport perimeter, passed through a perimeter fence, struck a Toyota Corolla Cross on Northwest 67th Avenue, and continued through grass toward another fence near a Tesla robotaxi area. NTSB Chair Jennifer Homendy said the path extended about 1,300 feet beyond the paved surface.

All five deaths were Professional Ocean Service workers in the van: Rolando Aleman Leon, Yoel Rodriguez Naranjo, Julio C. Pineda, Carlos Acosta Fajardo, and Javierkys Reyes Quevedo. The two pilots, Jaime Felipe Silva Molina and Joseph Carol, suffered minor injuries and were released. Eugenio Corredor and Ridoel Averhoff Diaz remained critical; Roosevelt Sebastian Perdomo Torres was stable. The available public records do not yet securely map each surviving ground victim to the van or SUV.

The airport weather observation at 1:53 p.m. reported a thunderstorm and wind from 190 degrees at 17 knots, gusting to 26, with a recent wind shift. That supports investigating wind and weather. It does not establish the wind experienced by the aircraft, runway condition, braking effectiveness, motive, error, or cause.

Runway 30 is physically 9,360 feet long, but its declared landing distance available is 7,913 feet. Public ADS-B data showed 112 knots as the aircraft exited the usable runway area and 69 knots at the last received point. Those speeds are provisional. The NTSB recovered the flight-data and cockpit-voice recorders and said it would wait for recorder confirmation before publishing speed conclusions.

Miami had no EMAS bed at that runway end. The FAA’s current national denominator is 122 installations at 70 airports. Public reporting says Miami appeared compliant because of a 1,000-foot safety area, but the official runway-specific engineering and certification record has not been produced. Whether EMAS could have changed the result is an open NTSB question.

No probable cause has been determined. The strongest disproof attempt did not overturn the event sequence, casualty count, operator, route, or 1,300-foot distance. It did show that the landing-dynamics narrative remains provisional, the Amazon ownership framing is improperly collapsed, EMAS compliance is not yet established by a primary case-specific record, and the article’s human and procedural state is stale.

## Remaining high-value checks

1. Obtain and audit the NTSB’s scheduled September 8 briefing, including every frame, transcript, speed disclosure, recorder status, and any change in investigative scope.
2. Obtain the original Miami-Dade Sheriff’s Office news release and briefing video. Reconcile the AP-recorded spelling correction and map each surviving ground victim to the van or SUV.
3. Obtain the NTSB preliminary report and public docket when released, including FDR/CVR factual reports, ATC recordings, radar, airport surveillance, witness media, and wreckage documentation.
4. Obtain the FAA and airport certification records for Runway 30’s safety area and the written decision explaining why EMAS was or was not required.
5. Obtain Runway 30 condition reports, braking-action reports, rainfall measurements, NOTAMs, inspection logs, and the operative arrival weather and wind information supplied to the crew.
6. Obtain 21 Air’s operating specifications, crew qualifications and duty history, maintenance history for N1997A, prior discrepancies, and FAA surveillance or enforcement records.
7. Obtain the Amazon and 21 Air contract provisions assigning operational control, safety assurance, maintenance oversight, and audit responsibilities.
8. Pin the original landing footage and its metadata. Verify capture time, location, continuity, edits, camera angle, and whether the footage can support any touchdown-point claim.
9. Replace rolling disruption snapshots with a final airport or FlightAware series using fixed observation times and consistent cancellation and delay denominators.

VERDICT: INCOMPLETE