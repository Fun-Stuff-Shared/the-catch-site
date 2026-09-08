# Working checklist: Miami cargo crash, September 2026

Candidate: cand-9941f5cfa0d30d0c
Headline: At least 5 dead after Amazon cargo plane crashed off runway at Miami airport
Subject slug: miami-cargo-crash
Story slug: september-2026
Event id: event-miami-cargo-crash-september-2026

## Ask (verbatim)

- Author a new Catch story page for this candidate on main
- Use catch-event-page skill in full
- No recipe: pick subject slug; slug story by month
- Admit primaries first (NTSB, FAA, Miami-Dade Aviation, airline/operator, official statements), then coverage
- Verify each outlet's checkable claims against the primary record
- Write in section grammar with three lenses
- Manifest every record
- npm run build until gate passes
- Run lens lint
- Update subject page and homepage
- Independent interrogation + ledger
- Accept candidate with story_accept.py
- Commit by explicit path, plain messages, no attribution trailers
- Do NOT push
- Do NOT edit any existing story page

## Coverage universe (held)

31 articles / 17 outlets in the candidate row; registry search found English bodies from AP, ABC, CBS, CNBC, Fox, Guardian, Hill, NBC, NPR, PBS, Reuters, USA Today, Al Jazeera, DW, France 24, UPI, plus later NTSB-day pieces. WaPo served subscription stubs. NYT and BBC bodies not in the listed run md paths (BBC listed as a dedup URL only).

## Primaries to admit

- FAA @FAANews 2026-09-06
- NTSB @NTSB_Newsroom go-team and briefing posts
- Miami Int'l Airport @iflymia runway/ground-stop posts
- Miami-Dade Fire Rescue incident updates
- 21 Air CEO statement at 21air.us
- C-SPAN recording of NTSB Miami briefing 2026-09-07
- NTSB.gov / FAA.gov press pages if they carry this accident (may be empty)

## Numbers to recount from pins

- Deaths, injuries, who was in which vehicle
- Flight number, operator, type, origin
- Time, runway, distance past pavement
- Recorders recovered
- Runways closed / reopened
- Fire response (60 units / 200 personnel)

## Rework 1 (2026-09-08): K1-K7 and C1-C8

Copied from `/Volumes/4/scratch-fable-profile/grok-authoring/reviews/1-rework.md` before any data was touched. Pins on disk and named sources win over memory. C1 and C2 are wrong statements currently on the page; each gets a dated correction line in reader words.

- [x] K1. Add a paragraph on how the landing looked, typed as outside analysts reading public video, not the NTSB. Sources already on disk: `data/sources/coverage/pbs-miami-cargo-what-went-wrong.txt` (Miles O'Brien on PBS NewsHour: tailwind with a crosswind component; landed at about 185 miles an hour, about halfway down a 9,000-foot runway; when a go-around would have been initiated) and `data/sources/coverage/cnbc-miami-cargo-crash-probe.txt` (Mary Schiavo: video shows the plane floating above the runway without flaring; not raining, dark storm clouds, strong winds reported). Also cite `data/sources/coverage/cbs-miami-cargo-ntsb.txt` for the NTSB working groups (meteorology, aircraft performance). Place it in Where this sits after the 1,300-feet paragraph, in plain words, with "The NTSB has not said any of this" as the closing sentence. Add both articles to SOURCES.md, the manifest, and the records list with a plain usage line.
- [x] K2. Who feels it, travelers paragraph: add the disruption counts. `data/sources/coverage/ap-miami-cargo-crash.txt`: "More than 160 flights were canceled and nearly 325 delayed by late Sunday, according to FlightAware". `data/sources/coverage/usatoday-miami-cargo-day2.txt`: "At least 55 flights have been cancelled, and more than 100 others are delayed" on Monday, and "during the Labor Day travel rush". Attribute the counts to FlightAware as reported by AP and USA Today. Add usatoday-miami-cargo-day2 to SOURCES.md, manifest, records.
- [x] K3. Who feels it, injured paragraph: name the hospitals from `data/sources/coverage/cbs-miami-cargo-ntsb.txt`: "Two of the injured victims were transported to Jackson Memorial Hospital ... the other three victims were taken to Jackson's Ryder Trauma Center in critical condition, the Miami-Dade Sheriff's Office said." Cite CBS (already manifested).
- [x] K4. KPI strip and subject figures: "5 taken to hospitals" reads as the same five who died. Change the KPI label in `src/data/miamicargocrash202609.mjs` to "injured, taken to hospitals" and the subject figure label in `src/data/subjects/miami-cargo-crash.mjs` to "Injured, taken to hospitals". In Three things, item 2, write "five people were dead and five others were injured" (ABC records both in one sentence).
- [x] K5. Move the arresting-bed question up. Add a two-sentence paragraph to What happened next, in plain words: a bed of crushable material past the runway end that stops a plane; CBS: investigators will examine whether one should have been installed and whether it could have made a difference (`data/sources/coverage/cbs-miami-cargo-ntsb.txt`); AP: Miami is not equipped with them, and the FAA says they are installed at more than 120 airports (`data/sources/coverage/ap-miami-cargo-crash.txt`). Keep the open-question row. C7 later replaces AP as the source for "Miami has none".
- [x] K6. No orphan pins. Every file under `data/sources/coverage/*miami-cargo*` that is on disk must have a SOURCES.md row and be committed, or be deleted. Files the page now uses (K1, K2) also get manifest rows. For files held but not used on the page, the SOURCES.md row says "held; not used on the page".
- [x] K7. NEW SECTION, "The catch" after What happened and before Where this sits, anchor `the-catch`, add it to the In this story list. Bordered block, kicker "The catch", three to five rows (six allowed if every row is cited). Each row: bold lead of two to four words, one or two cited sentences, one of the three tags in exact words (Told versus record, Left out, Who pays), and an anchor link to the evidence section. Rows: "Not Amazon's plane." / "Nobody on the plane died." / "No arresting bed." / "What the video shows." / "160 flights cancelled." / "Van year: 2012." Style `.the-catch` in `src/styles/story.css`. No em dashes.
- [x] C1. WRONG CLAIM ON THE PAGE. Line 191 says "The FAA general-statements page we saved does not either" and there is no such pin. Save FAA Statements on Aviation Accidents and Incidents (`https://www.faa.gov/newsroom/statements/accident_incidents`) as `data/sources/faa-statements-2026-09-06.html/.txt`. Cite it for the flight facts in What happened (it outranks the FAA X post). Remove the "no written FAA statement" sentence from open questions and from the manifest needs ledger. Keep the NTSB half (no written NTSB release). Dated correction line in reader words.
- [x] C2. WRONG CLAIM ON THE PAGE, TWICE. Lines 111 and 135 say the C-SPAN briefing page has no transcript. Capture the transcript. Source Homendy's briefing statements to the transcript first. Claim check: van year is 2012 (CBS checks out; CNBC's 2021 is wrong). 1,300-feet figure is not in the transcript text; keep it attributed to the outlets. Remove both "no transcript" sentences. Fix manifest usage and interrogation ledger. Dated correction line in reader words.
- [x] C3. Three official web records: Amazon update page (`https://www.aboutamazon.com/news/company-news/amazon-21-air-miami-updates`); MIA homepage notice (`https://miami-airport.com/`); Miami-Dade mayor's September 7 release. Cite Amazon page where the page now cites Amazon's X post; keep X as the earlier statement. Add MIA notice to Who feels it, travelers. Use mayor release as the county's own record; keep ABC for fatality announcement timing.
- [x] C4. Weather, primary. NOAA METAR `https://aviationweather.gov/api/data/metar?ids=KMIA&format=raw&hours=72` saved as `data/sources/noaa-metar-kmia-2026-09-06.txt`. Observation nearest 1:53 p.m. EDT: thunderstorm, wind from the south at 17 knots gusting to 26, peak gust 26 knots one minute earlier, wind shift at 1:37 p.m. Fact block in Where this sits before K1's analyst paragraph, decoding as proof-layer, close with "The NTSB has not said weather played a part."
- [x] C5. Aircraft and operator identity. FAA registry for N1997A (serial 27310, 767-33A, owner ANDROMEDA LEASING II LLC) only if Flightradar24 incident post can be saved linking Flight 7598 to N1997A. DOT order 2016-9-22: 21 Air is a Miami cargo carrier the Transportation Department certified for foreign charter cargo in 2016. Do not use the FAA oversight-office chart.
- [x] C6. Traveler impact: use the MIA notice (C3) and the FlightAware counts (K2). Do not use the FAA command-center status page. Any count stays attributed and time-stamped.
- [x] C7. Arresting bed policy: FAA EMAS page ("A standard EMAS will bring a runway's critical aircraft to a complete stop when it enters the EMAS at 70 knots or less.") plus Homendy transcript that Runway 30 lacks one. Replaces AP as the source for "Miami has none"; keep AP for the 120-airport count. Folds into K5.
- [x] C8. One bounded precedent in Where this sits, narrative layer, cited to NTSB's Atlas Air page: February 23, 2019 Atlas Air crash near Houston was also a Boeing 767 flying cargo for Amazon, and it also left Miami; different operator, different phase of flight, different cause. Do not add Fine Air. Open-questions searched-absent list as of September 8.

Recount of existing pins (before new fetches):

- K1 PBS: Miles O'Brien, tailwind with crosswind, 185 mph, halfway down 9,000-foot runway, go-around. CONFIRMED in `pbs-miami-cargo-what-went-wrong.txt`.
- K1 CNBC: Schiavo floating without flaring; not raining, dark storm clouds, strong winds. CONFIRMED in `cnbc-miami-cargo-crash-probe.txt`.
- K1 CBS working groups: meteorology and aircraft performance. CONFIRMED in `cbs-miami-cargo-ntsb.txt`.
- K2 AP FlightAware 160/325. CONFIRMED.
- K2 USA Today 55 cancelled, 100 delayed, Labor Day. CONFIRMED.
- K3 Jackson Memorial / Ryder Trauma. CONFIRMED in CBS pin.
- K5 CBS EMAS examine; AP not equipped, 120 airports. CONFIRMED.
