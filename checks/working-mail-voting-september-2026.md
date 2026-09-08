# Rework checklist: mail-voting/september-2026

Created before any page edit. Each item is closed at the pinned bytes; verification is stated here.

## Process

- [ ] Step 1. This checklist created and committed.
- [ ] Step 4 / procedures step 12. Manifest figures enriched (sourced: quote_span; computed: date_difference_days). Manifest committed, then `sai.cli state stage-story` (no model), then `state verify`. Same command with `--luna-read`; PID stop command pasted here; let it run in background. Do not commit `data/state/`. Do not patch SAI.
- [ ] Step 5. `npm run build` (full gate), `lens_lint` clean, zero em dashes, measure at 1280 in the browser, screenshot in `checks/screenshots/`.
- [ ] Step 6. Commit page, data module, manifest, this note, screenshot by explicit path. Never push.

## Keystone

- [ ] K1. "Three days later the rule was in the Federal Register" (Where this sits). Stay granted August 24, rule published Wednesday August 26 (usps-final-rule-plain.txt line 3). Two days.
- [ ] K2. Record block quoting Sauer renders the PDF line-break hyphen: `"modest envelope-design and addressee-infor-" mation requirements`. Render `addressee-information`; keep the Cite passage on a phrase that exists in the text.
- [ ] K3. Talwani quote card capitalizes a mid-sentence fragment ("Immediate implementation ..."). The record reads "the court finds, on one side, that immediate implementation ...". Quote from "the court finds" or begin the card with a lowercase fragment after an ellipsis. Apply the same test to every quoted phrase on the page: one unbroken substring, capitalization as in the record, or an honest ellipsis.
- [ ] K4. "The Associated Press Sunday pin spells Biden as 'Joe Bden.'" "Pin" is project vocabulary; say "the Associated Press Sunday story". Sweep the page for "pin", "pinned", "capture", "registry".
- [ ] K5. "filed 58 days before the election" types a number the module already computes. Render computed.daysFilingToElection. Sweep for any other typed count that the module holds.
- [ ] K6. "The so what of this history is a clock." Rewrite in plain register.
- [ ] K7. Sources line: drop "The Federal Register's web pages are a prototype"; say the figures come from the official Federal Register PDFs.
- [ ] K8. "Justice Ketanji Brown Jackson, who handles emergency applications from the First Circuit": the dockets say only "submitted to Justice Jackson". Cite a record that states the allotment or cut the clause.
- [ ] K9. Component density. Story view has 3 figures across 3,202 words; Greenland has 12 across 4,147. Add, from records already pinned: (a) DataTable of enjoined DMM sections, one plain-language row each from usps-final-rule-plain.txt; (b) StepChart or DecisionTimeline of the four court steps (TRO Aug 27, 26A297 Sep 3, PI Sep 4, 26A305 Sep 6) if the existing timeline does not already carry them as its own figure; (c) DataTable of mailing dates Sauer named (NC begun, AL Sep 9, five states week of Sep 13, UOCAVA Sep 19); (d) QuoteCards for the Congress amicus heading and Talwani's "no evidence relating to fraudulent mail voting" line. Every card byte-contiguous.

## Codex red-team

- [ ] C1. Critical. The Hill attribution reverses the actor. Page lines 125 and 201 say Sauer asked to let the Postal Service "bar" ballots to residents. Pinned story (hill-2026-09-06.txt line 5) says he asked to "permit the administration to bar the U.S. Postal Service from sending mail-in ballots to residents of states that have not submitted a list of eligible voters based on citizenship data". Quote The Hill as written, then check that sentence against the application and rule.
- [ ] C2. Critical. CBS is inside a collective verbatim attribution it did not write. CBS (cbs-2026-09-06.txt line 4) has "enforcing President Trump's executive order"; AP, PBS, CNBC have "enforcing President Donald Trump's executive order". Either quote CBS separately or attribute the exact words only to the outlets that wrote them.
- [ ] C3. Major. The Hill's "indefinitely halted" is cut before "while lower courts decided on the policy" (line 7). Duration during litigation is not the same question as which elections the injunction covers. Drop that catch row or rewrite it as context, and rework The Hill OutletCheck.
- [ ] C4. Major. UOCAVA is stated as an unconditional 45-day rule (lines 158, 188). 52 U.S.C. 20302(a)(8) requires transmission of "a validly requested absentee ballot" and the 45-day date applies "in the case in which the request is received at least 45 days before an election", subject to subsection (g). Keep the date; state the condition in plain words.
- [ ] C5. Major. The NBC "wrong owner" verdict is unsupported. NBC wrote "voters not included in a federal database"; the rule's system is the Federal Ballot Mail Portal, a Postal Service system that state and local officials load. That is a federal database with state-loaded rows. Change the NBC verdict to consistent, or narrow the finding to what the record supports (who supplies the rows).
- [ ] C6. Major, same as K3: the Talwani card lifts "that immediate implementation..." into a standalone sentence. Fix per K3.
- [ ] C7. Major, same as K2: the "addressee-infor-" artifact.
- [ ] C8. Major. The Sauer card replaces the record's em dash with a comma. House rule bans em dashes in copy, so quote up to "in place" and end the card there, or start a second card at "including Alabama". Never alter bytes inside a quotation.
- [ ] C9. Minor, same as K4: "pinned filings", "AP Sunday pin", "live paper", "the UOCAVA figure" are internal shorthand; rewrite in reader words.

## Constraints (session)

- Load catch-event-page first; section-grammar rule 9 and anti-patterns.md before touching the page.
- Do not kill, restart, or signal any process this session did not start.
- Do not edit any story page other than this one and its subject index.
- Commit by explicit path only. Never push.
- No em dashes anywhere.
- Every fix verified at the pinned bytes; verification stated in this note.
- A finding believed wrong is refuted here with the bytes, never silently skipped.
- If stage-story fails, paste the full error here and continue; do not patch SAI.

## Verification log

(filled as each item is closed)

## Measurement (step 5)

| Metric | Value |
|---|---|
| Story view height (px at 1280) | |
| Words | |
| Figures | |
| Quote cards | |
| Open record blocks | |
| Cents in story view | |
| Em dashes | |
| Screenshot | |

## Luna read stop command

(paste PID-specific stop command here)
