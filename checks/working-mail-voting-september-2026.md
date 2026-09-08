# Rework checklist: mail-voting/september-2026

Created before any page edit. Each item is closed at the pinned bytes; verification is stated here.

## Process

- [x] Step 1. This checklist created and committed. `6ac7f04e`.
- [x] Step 4 / procedures step 12. Manifest figures enriched (sourced: quote_span; computed: date_difference_days). Manifest committed `3bf7ff96`. `sai.cli state stage-story` (no model): 10 figures, 0 model calls, 10 occurrences written, 29 pins registered. `state verify`: ok. Same command with `--luna-read`: launched. Do not commit `data/state/`. Did not patch SAI.
- [x] Step 5. `npm run build` (full gate) passed. `lens_lint` clean. Zero em dashes in the built story HTML. Measured at 1280 in Chromium. Screenshot `checks/screenshots/mail-voting-september-2026-1280.png`.
- [x] Step 6. Commit page, data module, subject data, this note, screenshot by explicit path. Never push.

## Keystone

- [x] K1. Closed. Stay granted August 24 (`scotus-26A124-opinion.txt` line 23 `[August 24, 2026]`); rule published Wednesday August 26 (`usps-final-rule-plain.txt` line 3 `Federal Register / Vol. 91, No. 164 / Wednesday, August 26, 2026`). `daysBetween(2026-08-24, 2026-08-26)` is 2. Page renders `{computed.daysStayToRule} days later`.
- [x] K2. Closed. Hyphenated artifact is `scotus-26A305-application.txt` line 284 `addressee-infor-` / line 285 `mation requirements`. Unbroken form is line 370 `addressee-information requirements`. Record block now quotes `addressee-information requirements`; Cite passage is that phrase.
- [x] K3. Closed. Talwani card now starts lowercase after an ellipsis from `talwani-pi-2026-09-04.txt` line 2400 `the court finds, on one side,` then line 2402 `that immediate implementation of the Final Rule issued less than seventy days before the`. Cite passage `the court finds, on one side,`. Other quoted phrases on the page checked as unbroken substrings (or PDF line-wrap joins, or an honest ellipsis). See C6, C8, Congress card note.
- [x] K4. Closed. Catch-minor now reads `The Associated Press Sunday story spells Biden as "Joe Bden."` (`ap-2026-09-06.txt` line 15 `Joe Bden`). Page sweep: no `pin`, `pinned`, `capture`, or `registry` in reader copy.
- [x] K5. Closed. Dek, KPI, Where this sits, Who feels it, and the proof receipt render `computed.daysFilingToElection` (58) and the other module counts (`daysPiToElection` 60, `days297ToElection` 61, `daysRuleToElection` 69, `daysEoToElection` 217, `daysFilingToUocava` 13, `daysFilingToJackson` 3, `daysStayToRule` 2, `uocavaDaysBeforeElection` 45, `plaintiffStates` 23, `intervenorStates` 12).
- [x] K6. Closed. Replaced `The so what of this history is a clock.` with `The dates leave little room.` plus the computed day counts.
- [x] K7. Closed. Sources line now ends `The figures come from the official Federal Register PDFs.` Prototype sentence dropped.
- [x] K8. Closed. Cut. Dockets say only `submitted to Justice Jackson` (`scotus-26A297-docket.html` around the 26A297 application row; same formula on 26A305 and 26A124). No pin states a First Circuit allotment. Page: `The docket shows the application was submitted to Justice Jackson.`
- [x] K9. Closed. Story view now has 6 figures and 5 quote cards.
  - (a) DataTable of enjoined DMM sections from `usps-final-rule-plain.txt` 24.3.1 (line 5734) through 24.5.3(a)-(c) (lines 5916-5936).
  - (b) Dedicated DecisionTimeline of TRO Aug 27, 26A297 Sep 3, PI Sep 4, 26A305 Sep 6. The existing nine-row timeline remains as the longer chronology; it already listed those four among other dates (`mailvoting202609.mjs` timeline).
  - (c) DataTable of Sauer mailing dates from `scotus-26A305-application.txt` lines 416-420 (North Carolina begun; Alabama September 9; five states week of September 13) plus UOCAVA September 19 from `talwani-pi-2026-09-04.txt` (`September 19, 2026 (45 days before the election)`).
  - (d) Congress heading card from `scotus-26A305-congress-amicus.txt` lines 56-58 `THE ORDER AND FINAL RULE USURP CONGRESS’S` / `CONSTITUTIONAL ROLE AS THE ULTIMATE AUTHORITY` / `ON FEDERAL-ELECTION ADMINISTRATION.` Cite passage `THE ORDER AND FINAL RULE USURP CONGRESS`. Talwani no-evidence card: the opinion sentence is split by a Document 285 page-46 running header (`talwani-pi-2026-09-04.txt` line 2408 `no evidence relating to` then line 2419 `fraudulent mail voting to support the rushed implementation of the Final Rule.`). Card is an ellipsis plus the contiguous second half. First half stays in Who feels it with Cite `no evidence relating to`.

## Codex red-team

- [x] C1. Closed. Hill line 5: `permit the administration to bar the U.S. Postal Service from sending mail-in ballots to residents of states that have not submitted a list of eligible voters based on citizenship data.` Catch and OutletCheck now quote those words. Application is `APPLICATION FOR A STAY OF THE INJUNCTION` (`scotus-26A305-application.txt` lines 26-29). Portal fields: `usps-final-rule-plain.txt` 24.4.2.b lines 5817-5827 (name, address, two IMbs, originating election office state). Citizenship list: `eo-14399.txt` `State Citizenship List`. The citizenship-list catch survives on The Hill's actual words; the actor is the administration barring the Postal Service, not the Postal Service barring ballots.
- [x] C2. Closed. CBS `cbs-2026-09-06.txt` line 4 `enforcing President Trump's executive order`. AP line 5, PBS, CNBC: `enforcing President Donald Trump's executive order`. Catch names both wordings. Separate CBS OutletCheck. AP/PBS/CNBC share one card.
- [x] C3. Closed. Hill line 7: `indefinitely halted the Postal Service’s plan while lower courts decided on the policy.` Dropped the November-3 catch row. Hill OutletCheck no longer treats duration during litigation as a disagreement with which elections the injunction covers; the November 3 scope is context in that card.
- [x] C4. Closed. Statute `uocava-52usc20302.txt` line 209: `in the case in which the request is received at least 45 days before an election for Federal office, not later than 45 days before the election`. Chart source and dated list state that condition. Date September 19 kept.
- [x] C5. Closed. NBC `nbc-2026-09-06.txt` line 7 `not included in a federal database`. Rule portal is `Federal Ballot Mail Portal` (`usps-final-rule-plain.txt`). NBC OutletCheck chip is `consistent`: a Postal Service system with state-loaded rows, not a federal citizenship file. Catch-minor narrowed to who supplies the rows.
- [x] C6. Closed with K3.
- [x] C7. Closed with K2.
- [x] C8. Closed. Application lines 416-418: `as the injunction remains in place` then U+2014 `including Alabama`. Sauer card ends at `in place`. Alabama and the five-state week sit in the mailing-dates table, not inside the quotation.
- [x] C9. Closed with K4. `pinned filings` -> `the filings and dockets` / `the dates in the filings`. `live paper` -> `Sunday's application` / `Sunday's stay request`. `the UOCAVA figure` -> `the statutory 45-day overseas and military ballot date`.

## Constraints (session)

- Load catch-event-page first; section-grammar rule 9 and anti-patterns.md before touching the page.
- Do not kill, restart, or signal any process this session did not start. Stopped only the Python static server this session opened on port 4327. Luna read pid 59286 left running.
- Did not edit any story page other than this one and its subject data (`src/data/subjects/mail-voting.mjs`). Restored uncommitted deletion `data/sources/texas-senate/tlo-sb2-86r-history.html` so `npm run build` could finish; that file was already `D` in the working tree at session start.
- Commit by explicit path only. Never push.
- No em dashes in the page or in the built story HTML (count 0).
- A finding believed wrong is refuted here with the bytes, never silently skipped. None skipped.

## Verification log

- K1: `usps-final-rule-plain.txt:3` Wednesday, August 26, 2026; opinion `[August 24, 2026]`; computed 2.
- K2/C7: application.txt:284 `addressee-infor-`; :370 `addressee-information requirements`.
- K3/C6: talwani-pi:2400-2404.
- K8: 26A297 docket `submitted to Justice Jackson`; Hill line 9 `was assigned to the administration’s new request` is assignment of this application, not a circuit allotment.
- C1: hill-2026-09-06.txt line 5 exact sentence.
- C2: cbs-2026-09-06.txt line 4 vs ap-2026-09-06.txt line 5.
- C3: hill-2026-09-06.txt line 7 `while lower courts decided on the policy`.
- C4: uocava-52usc20302.txt line 205-209.
- C5: nbc-2026-09-06.txt line 7; usps-final-rule-plain.txt 24.4.1-24.4.2.
- C8: application.txt:418 `in place` + U+2014.
- Intervenor count 12 is counted from the named list in application.txt:92-94 (Alabama through Texas). No pin writes the digit 12 as that count, so it is not a sourced SAI figure. Applications-to-court 3 is likewise not a digit in the AP `third time` line, so it was dropped from the manifest figures list.
- Plaintiff 23 is sourced from `scotus-26A297-application.txt` `group of 23 States and the District of Columbia for elections before and on November 3, 2026.`

## Measurement (step 5)

Chromium, viewport 1280, story mode (default). Playwright full-page PNG 1280 x 12363.

| Metric | Value |
|---|---|
| Story view height (px at 1280) | 12094 (`main.story` scrollHeight); document 12363 |
| Words | 4065 in the story view (proof and detail record blocks removed) |
| Figures | 6 |
| Quote cards | 5 |
| Open record blocks | 0 in story view (detail SourcedBlocks hidden) |
| Cents in story view | 0 |
| Em dashes | 0 |
| Screenshot | `checks/screenshots/mail-voting-september-2026-1280.png` |

Story height is above the ~9,000 px note in section-grammar. Greenland's 1280 screenshot is 14194 px; this page is in that range after adding the required figures and cards.

Tracked-figures foot (built HTML): 10 figures with units and passages, including Computed day counts with both date inputs (58, 60, 61, 69, 217, 13, 3, 2 days) plus sourced 45 days and 23 states.

## Luna read stop command

```
kill -TERM 59286
```

pid 59286; run_dir `/Volumes/4/CF/catch-state/story-reads/event-mail-voting-september-2026`; 29 worklist items; provider openai-codex; model gpt-5.6-luna. Left running. Do not use a broad process-name kill.

## Not done

- Live-domain audit (no push).
- Luna read of the pins is in progress; this session did not wait for it or refresh views from its output.
- Subject `index.astro` was already a SeriesOverview wrapper; KPI 58 now comes from `computed.daysFilingToElection` in `src/data/subjects/mail-voting.mjs`.
