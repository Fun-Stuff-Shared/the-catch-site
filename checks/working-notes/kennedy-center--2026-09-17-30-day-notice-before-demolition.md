# Kennedy Center, September 17 notice order: working note

Candidate: `cand-e73a52791fa9a687`

Story path: `/events/kennedy-center/2026-09-17-30-day-notice-before-demolition/`

State event: `event-kennedy-center-2026-09-17-30-day-notice-before-demolition`

## Preflight

The candidate is one dated court moment. The September 17 minute order denied Joyce Beatty's request for an emergency hearing, required a sworn status report on the temporary closure and emergency repairs by September 23, repeated the defendants' earlier promise to disclose any reversal of their no-demolition/no-new-building position, and ordered written notice more than 30 days before implementing a change to the project plans presented in the preservation case, including demolition of the main building.

The catch is scope. The order did not impose a general 30-day waiting period on every repair or decide whether the main building may be demolished. It attached advance notice to changes from the project plans already presented to the court. The order also did not grant the requested emergency hearing.

## Census log

One line per search, in run order:

- Candidate row in `candidates-2026-09-18.jsonl`: ten saved article bodies; nine concern the September 15-17 closure, demolition statements, and notice order; one AP live page is broader.
- `capture search "Kennedy Center" --since 2026-09-18 --limit 100`: 105 results; the September 17 order appeared in ABC, PBS/AP, UPI, The Hill, CNBC, Al Jazeera, CBS, and follow-on video coverage.
- `capture search "Kennedy Center demolition" --since 2026-09-15 --limit 100`: three results; BBC on the August demolition filing, CNBC and The Hill on the September demolition image.
- `capture search "Beatty Trump" --since 2026-09-15 --limit 100`: no results under that exact pair.
- `capture search "D.C. Preservation League" --since 2026-08-01 --limit 50`: no results under that exact case name.
- `capture search "Kennedy Center status report" --since 2026-09-17 --limit 50`: no separately indexed September 23 status report as of September 19; the deadline had not arrived.
- LEANN semantic search for the candidate headline and the terms `Kennedy Center demolition notice`: no additional held body beyond the registry and candidate set.
- CourtListener docket page for Beatty v. Trump, entries 84-87: refused by the registry as `robots_disallowed` in `capture-oneoff-20260919T072321Z`.
- D.D.C. public ECF document URLs for entries 84-87: refused by the registry as `robots_disallowed` in `capture-oneoff-20260919T072430Z`.
- CourtListener docket through the archive route: refused as `robots_disallowed` in `capture-oneoff-20260919T073217Z`.
- Justia docket page: captured in `capture-oneoff-20260919T073142Z`, but the saved docket says it was last retrieved September 15 and stops before the September 17 minute order; not admitted to the story.
- Direct RECAP storage PDFs for entries 84-87: captured in `capture-oneoff-20260919T072626Z`; entry 87 is the plaintiffs' reply, not the court's minute order.
- Companion-case filings 45 and 62, Beatty opinions 50 and 77, and 20 U.S.C. 76j and 76l: captured in `capture-oneoff-20260919T072811Z`.
- RECAP attachment 62-1, the preservation plaintiffs' addendum: captured in `capture-oneoff-20260919T074023Z`.
- RECAP board resolution 66-2 and August 13 minutes 68-3: captured in `capture-oneoff-20260919T074101Z`.
- RECAP September 15 board-vote notice 78, September 16 scheduling order 82, and Washington Litigation Group's September 17 reaction: captured in `capture-oneoff-20260919T074128Z`.
- Candidate coverage pins ABC `0881`, PBS/AP `0144`, UPI `0727`, USA Today September 16 `6921`, and USA Today September 17 `6951`: admitted from `quarry-wire-scheduled-20260918T160030Z` after the primary records.
- Issuing-institution search: the D.D.C. court site exposed no separately downloadable September 17 order; the operative ruling is a text-only docket order. The court's docket and ECF pages were unavailable to the registry, so the page quotes the order only where an admitted carrier reproduces it.
- Kennedy Center institutional listing search: no September 17 release carrying the court's order; the board minutes and filed resolutions are the direct institutional records used.
- Legislative search: the governing duties and board powers are in 20 U.S.C. 76j and 76l. The May opinions discuss the separate $257 million appropriation, but the September 17 order does not adjudicate the appropriation.
- Forward search through September 19: no later court filing changed the September 17 notice command; the ordered status report was due September 23.
- CourtListener docket capture for the September 17 minute order: direct route refused as `robots_disallowed` in `capture-oneoff-20260919T090517Z`; required archive fallback refused as `robots_disallowed` in `capture-oneoff-20260919T090524Z`.
- September 18 attachment capture from direct RECAP storage in `capture-oneoff-20260919T090606Z`: ECF 88-1, 89-1, 89-2 and 89-3 succeeded. ECF 89-1 duplicates the substantive text of 88-1 except for the docket header and was not separately admitted. ECF 89-4 returned `http_status_404`.
- ECF 89-4 archive fallback in `capture-oneoff-20260919T090626Z`: the direct request and Wayback request both returned `http_status_404`; the Delta addendum and exhibits remain unavailable on that route.
- Public Law 119-21 PDF: direct GPO capture succeeded in `capture-oneoff-20260919T090837Z`; the Kennedy Center provision appropriates $256,657,000 through September 30, 2029.
- Defendants' August 24 response, ECF 68: direct RECAP storage capture succeeded in `capture-oneoff-20260919T091035Z`.
- Preservation plaintiffs' September 17 public statement: direct issuing-organization capture succeeded in `capture-oneoff-20260919T091123Z`.
- Associated Press protest report and the Action Network event page: both direct captures succeeded in `capture-oneoff-20260919T091138Z`.
- Associated Press report on Trump's September 18 remarks: direct capture succeeded in `capture-oneoff-20260919T091155Z`.
- Washington Post September 14 recognition-proposal page: the one registry attempt in `capture-oneoff-20260919T102728Z` resolved to `quarry-wire-scheduled-20260914T220001Z`. The receipt says `body_captured`, but the text is a 639-character subscription excerpt, so it was not admitted.
- Washington Post September 18 layoffs page: the one registry attempt in `capture-oneoff-20260919T102733Z` resolved to `quarry-wire-scheduled-20260919T100035Z`. The receipt says `body_captured`, but the text is a 675-character subscription excerpt, so it was not admitted.

## Round-one review patch, items 1–20

1. Reordered the opening account so Matt Floca is identified before his declaration is summarized.
2. Defined the disputed recognition as recognition for the administration's renovation and fundraising role.
3. Retried the minute-order docket route and required archive route; both were refused as `robots_disallowed`, so the order remains typed unreachable and the two admitted carriers remain labeled.
4. Made no prose change for the informational voice-lint observation; the reviewed sentence is attributed and evidence-bearing.
5. Corrected the source note: UPI reproduces the full operative sentence, while Beatty's counsel quotes only part.
6. Corrected the UPI verdict to the same source boundary and removed the false two-source reproduction claim.
7. Captured ECF 88-1 and 89-1 through 89-4 by the required direct storage route. Admitted 88-1, 89-2 and 89-3; held 89-1 as a substantive duplicate; typed 89-4 unreachable after direct and archive `http_status_404` results. Narrowed the plan unknown to accessible public filings, the sealed JLL report and the sealed Delta presentation.
8. Added the Public Law 119-21 appropriation and the board minutes' half-covered, $124 million and $285 million comparisons. The exact appropriation is stored in the data module and rounded there for the displayed $257 million label.
9. Added the February 1 announcement and March 16 board vote to the timeline.
10. Added affected contracts, two staff layoff tranches, ten remaining programming staff, REACH programming, National Symphony Orchestra off-site performances, the Kennedy Center Honors and the Mark Twain Prize.
11. Added the vote denominator: 26 votes cast, with 23 in favor and 3 opposed; two additional trustees were present but did not vote, and several were absent.
12. Made the notice-order coverage denominator explicit: six admitted records and three verdict cards.
13. Captured ECF 68 and added the conditional taken-down argument and amphitheater example, bounded as a litigation position rather than an approved project.
14. Added the September 18 supporting papers, August 31 Delta distribution, September 15 ratification, and the defendants' $300 million versus less-than-$30-million comparison. The page says these are defendants' assertions and identifies the sealed JLL report and Delta presentation.
15. Captured the preservation plaintiffs' statement and added their receiver, limited-receiver and monitor position as measures they said the court should consider, without presenting them as relief already sought.
16. Captured the AP protest report and Action Network page, then added the crowd, human chain and invited constituencies in `who-feels-it` and `what-happened-next`.
17. Captured the later AP report and added that Trump did not directly answer the demolition question.
18. Added ABC's limitation that the published image did not show the whole placard and cut the visible word at `DEMOLIS`.
19. Added the AP recognition error to the AP verdict: two proposals were enjoined, while the endowment-inscription request was denied as unripe.
20. Explained how ABC, CBS and the earlier USA Today record are used despite not receiving verdict cards. The two later AP records are separately identified as follow-on coverage.

## Round-two review patch, items 21–32

21. Removed the duplicated protest account from `who-feels-it`; the crowd, human chain and invited constituencies now appear once in `what-happened-next`.
22. Made no prose change. The six-record and three-card counts are arithmetic exported by the data module.
23. Kept counsel's discovery characterization attributed and added that UPI's reproduced order text contains the notice command but no discovery provision. The docket was not cited.
24. Corrected the record boundary: the earlier JLL plan and Delta presentation are sealed, while Floca says the finalized Delta report and certain appendices were attached as Exhibit A. The public attachment remained unreachable at 89-4.
25. Added Floca's estimate that 75 to 175 of roughly 300 employees would be affected, labelled as an estimate, and added the opinion's identified exposure to ticket and tourist revenue, audience retention, specialized arts staff and donors.
26. Started the timeline with the Center's September 2025 announcement that renovation work had begun and the opinion's statement that staff apparently sought no federal planning-agency input for that work.
27. Defined the REACH as the Center's expansion campus at its first appearance in the timeline and in the later practical-effects paragraph.
28. Added the conflict between the two defense filings: one quotes closure to patrons `forthwith`, while the other adds `upon the dissolution of the preliminary injunction`. The inaccessible preliminary minutes are named as the unresolved record.
29. The required Post registry attempt returned the 639-character subscription excerpt described above, so no Post record was admitted. Added only what Floca's admitted declaration establishes: a September 13 management packet was attached as Exhibit B for the September 15 meeting. The page labels the timing as contemporaneous and does not claim causation.
30. Added Beatty's chronology beside Floca's two stated safety grounds: twelve days open after the plaster fall, no meaningfully new information before closure, the June and July Walter P Moore analysis, and closure the day after the board vote. The page says Cooper denied the hearing and that neither admitted carrier reports a resolution of the factual dispute.
31. Added the August vote's acknowledged information gaps: two slides received two days before, Whitehouse's six baseline requirements, Larsen's missing four-year analysis, and the later August 31 distribution of the full Delta report.
32. The required Post registry attempt returned the 675-character subscription excerpt described above. It was not admitted under the skill's short-body rule, so no new layoff sentence was added.

## Round-three review patch, items 33–41

33. Removed both author-process sentences from the timeline caption; the figure now presents the dated sequence without explaining where its first entry or REACH definition came from.
34. Narrowed only the named wording. The page now says UPI published an excerpt of the order and keeps the “ordered discovery” characterization attributed to counsel. The docket remains uncited.
35. Kept UPI's byte-exact reproduced quotation and marked in the quote-card source line that the bracketed explanations are UPI's.
36. Replaced both page uses of `no-demolition position` with wording limited to full demolition or rebuilding. Sibling count for the named class: two changed, zero remaining.
37. Added that the August plan temporarily moved the Kennedy memorial to the REACH and said it would remain open to the public, from the board-minutes passage.
38. Added the AP record's concrete account that Duke Ellington students lost Washington National Opera costume access and Millennium Stage performances.
39. Named the three recognition proposals before the AP correction: the renovation-and-restoration inscription, the second inscription conditional on the Trump Kennedy Center Fund reaching $100 million, and President Donald J. Trump Plaza. The amount is exported from the data module.
40. Captured ECF 86-2 once through the direct CourtListener storage route in `capture-oneoff-20260919T111931Z`; the registry returned `body_captured` with 248,279 raw bytes. The PDF's email page was read visually because the registry text extraction omitted the image text. The page now carries both parts of Floca's email: the closure would let operations staff determine whether another severe incident was imminent, and it was not a decision to carry out the board's separate renovation-closure vote.
41. Tried each named public route once. ProPublica Nonprofit Explorer was captured in `capture-oneoff-20260919T112009Z`, but its page listed Kennedy Center filings only through September 2024. The IRS search route was captured in `capture-oneoff-20260919T112055Z`, but the saved page exposed only its JavaScript requirement and no filing result. The Atlantic article was captured in full in `capture-oneoff-20260919T112009Z`. Because neither primary route supplied the new return, the page adds one sentence attributed to The Atlantic rather than treating the filing as admitted primary evidence.

### Round-three capture passage table

| Record | Passage | What it establishes | Use |
|---|---|---|---|
| `floca-email-86-2-2026-09-16` | “determine whether any other severe safety incident is imminent” and “this is not a decision to effectuate the Board's separate vote” | Management's stated purpose for the temporary closure and its separation from the renovation vote | Who feels it, both halves together |
| `propublica-kennedy-center-990-index-2026-09-19` | “According to its Sept. 2024 tax filing” | The captured index did not list the newly reported return | Not used in story prose; route outcome recorded in the manifest needs ledger |
| `irs-teos-kennedy-center-2026-09-19` | “To use this app, JavaScript needs to be enabled” | The saved IRS route did not expose a filing result | Not used in story prose; route outcome recorded in the manifest needs ledger |
| `atlantic-kennedy-center-tax-return-2026-09-18` | “more than $516 million in total revenue”; “$48 million ‘bad debt expense’”; program-service revenue from nearly $105 million to about $89 million; annual audit not completed | The outlet's account of the unavailable filing figures and audit status | Where this sits, attributed to The Atlantic |

Round-three `pin_gaps.mjs` dispositions for the new primary-route records: the Floca email's Grand Foyer line is held unused because the existing declaration already supplies the page's plaster-fall account, and the Gift Shop relocation is out of scope for items 33–41. The ProPublica page's filing dates are used only to establish that its index stopped at September 2024; its generic Nonprofit Explorer, audit-threshold and extracted-data labels are held unused. The IRS route produced no undispositioned gap line. The Atlantic record is coverage and is used only in the attributed filing sentence.

## Primary-record passage tables

### September 17 ruling and immediate filings

| Record | Passage | What it establishes | Use |
|---|---|---|---|
| September 17 minute order | Court docket text could not be admitted directly because both CourtListener and D.D.C. ECF were refused by the capture registry | Typed source gap; the order is text-only, not document 87 | Disclosed in records and unknowns; no fake primary pin |
| `beatty-motion-84-2026-09-16` | Plaintiff asks the court to enforce its injunction and hold an emergency hearing over the closure | What Beatty requested | What happened |
| `kennedy-bailey-declaration-84-1-2026-09-16` | Kennedy-Bailey describes locked doors, fencing, and conditions she observed on September 16 | Firsthand observations supporting the motion | What happened, attributed |
| `beatty-notice-85-2026-09-17` | The filing supplies Trump's September 16 remarks and the photographed `Kennedy Center DEMOLISHED` placard as supplemental authority | What the plaintiff put before the judge | What happened |
| `defendants-response-86-2026-09-17` | Defendants say the temporary safety closure is separate from the board's two-year closure decision and no emergency hearing is needed | Government's position | Both sides |
| `floca-declaration-86-1-2026-09-17` | Floca says the closure is for seven days unless extended, will be reassessed weekly, and follows canopy and ceiling safety findings | Sworn basis and stated duration of temporary closure | What happened, who feels it |
| `beatty-reply-87-2026-09-17` | Plaintiffs argue the asserted safety closure is a pretext and seek clarification that demolition is barred | Argument, not the order | Both sides, attributed |
| `beatty-counsel-reaction-2026-09-17` | Counsel's release reproduces the order's project-scope language and says the sworn update is due September 23 | Party reaction and a carrier for the minute order's public effect | Immediate reaction; not presented as the court's own hosted document |
| `preservation-plaintiffs-statement-2026-09-17` | Eight plaintiff organizations publicly ask the court to consider a receiver, replacement leadership, a limited receiver, independent monitor or another neutral officer | The plaintiffs' public position about measures the court should consider | Who feels it, attributed and bounded |

### The plan and the board actions

| Record | Passage | What it establishes | Use |
|---|---|---|---|
| `preservation-joint-report-62-2026-08-28` | Defendants would inform the plaintiffs and court if the board reversed its position that the building would not be demolished and no new structure would be built | The representation the September 17 order enforced | The catch |
| `preservation-addendum-62-1-2026-08-28` | Preservation plaintiffs reserve the right to seek emergency relief after defendants said the building might have to be taken down | The contemporaneous dispute over a possible change | Where this sits, attributed |
| `board-minutes-68-3-2026-08-13` | The board resolution closes the main building, keeps the REACH and off-site programming operating, and passed 23-3 | What the board decided and the vote | Timeline, figure, who feels it |
| `board-resolution-66-2-2026-08-13` | The board approved proposed recognition inscriptions and a Trump Plaza, with action after 14 days | The separate recognition action intertwined with the later closure dispute | Context only |
| `board-vote-notice-78-2026-09-15` | Beatty notified the court that the board approved the closure resolution again and that Trump said closing would be immediate | The September 15 action before the emergency motion | Timeline |
| `scheduling-order-82-2026-09-16` | Expedited discovery is limited to the August 13 main-building closure decision; discovery began September 16 | The litigation track already under way | What happens next |
| `defendants-response-recognition-68-2026-08-24` | Defendants argue that without the administration's work the building would eventually have to be taken down and mention an amphitheater proposal | Conditional litigation position, not an approved demolition plan | Where this sits, attributed |
| `public-law-119-21-kennedy-center` | Congress appropriates $256,657,000 for Kennedy Center capital repair, restoration, maintenance backlog and security structures through September 30, 2029 | The exact appropriation mechanism and availability period | Where this sits |
| `defendants-consolidated-memorandum-88-1-2026-09-18` | Defendants compare a claimed $300 million phased-closure shortfall with a gap below $30 million for complete closure | Defendants' funding argument, not a court finding | What happened next, attributed |
| `defendants-statement-facts-89-2-2026-09-18` | Defendants say management sent the finalized Delta report to trustees on August 31 and quote closure to patrons `forthwith` | Defendants' chronology and one version of the September closure condition | What happened next, attributed |
| `floca-declaration-89-3-2026-09-18` | Floca identifies a JLL report and Delta presentation under seal, says the finalized Delta report and certain appendices are Exhibit A, and authenticates the September 13 packet as Exhibit B | The different status of the project materials and the existence of the trustee packet | What happened next and unknowns |
| `action-network-hands-around-kennedy-center-2026-09-18` | The event page invites artists, patrons, staff, union members and volunteers | Organizer-defined constituencies | Who feels it |

### Earlier court rulings and governing law

| Record | Passage | What it establishes | Use |
|---|---|---|---|
| `beatty-opinion-50-2026-05-29` | The preliminary injunction bars implementation of the March closure vote but allows necessary repairs and does not categorically prohibit a later prudent closure | The legal baseline in Beatty | Where this sits |
| `preservation-opinion-45-2026-05-29` | The court denied the preservation plaintiffs' preliminary injunction on the sworn understanding that no main building would be demolished and no new structure erected; findings could change if project scope changed | Why a scope-change notice matters | The catch |
| `beatty-opinion-77-2026-09-15` | The court blocked the later recognition inscriptions and grounds renaming; the government had said the building might have to be taken down if recognition were barred | Immediate judicial context | Timeline |
| `usc-20-76j-2026-09-19` | The board must plan necessary capital work, maintain and operate the building and site, and obtain specified approvals for changes to grounds management | Statutory duties discussed by the court | Where this sits |
| `usc-20-76l-2026-09-19` | The board has its statutory organization, quorum, bylaw powers, and trustee obligations | Board authority and duties | Context |

### Coverage checked against the records

| Outlet | Claim | Record result | Disposition |
|---|---|---|---|
| ABC | The administration must give 30 days' notice before demolition | Directionally right; exact order says more than 30 days and ties notice to changes in the scope of the plans presented in the preservation case | `mislabeled` if stated as a blanket demolition ruling |
| PBS/AP | Notice is required before any major physical changes | Too broad as a description of the text; the order reaches changes to the previously presented project scope, including demolition | `mislabeled` |
| UPI | Plans for changes must be submitted 30 days out | UPI reproduces the operative sentence, including the scope limitation and `more than 30 days` | `checks out` when the sentence is read in full |
| USA Today, September 17 | The order effectively blocked immediate demolition and likely allows judicial review during the notice period | Immediate demolition is prevented by the notice command; review during the period is the outlet's inference, not an express order term | first part `checks out`; second `single outlet` inference |
| USA Today, September 16 | Trump said the building would end up being ripped down without the overhaul and recognition | The quotation is also filed in Beatty's supplemental notice | `checks out` as an attributed statement |
| Associated Press, September 18 protest | Thousands joined outside and some formed a human chain around the Center | Follow-on event reporting, supported by the organizer's admitted event page for invited constituencies | Used in who feels it and what happened next; no verdict card |
| Associated Press, September 18 Trump remarks | Trump did not directly respond when asked whether he planned to demolish the theater | Follow-on attributed reporting | Used in unknowns; no verdict card |

## Needs ledger

| Need | Status | Disposition |
|---|---|---|
| Court-hosted September 17 minute order | typed unreachable | Direct CourtListener capture returned `robots_disallowed` in `capture-oneoff-20260919T090517Z`; the required archive fallback returned the same code in `capture-oneoff-20260919T090524Z`. The text-only order is quoted only through admitted carriers. |
| September 23 sworn status report | not yet due | Forward search run September 19. The page states the deadline, not the report's contents. |
| JLL plan, Delta presentation and Delta Exhibit A | partly held | ECF 89-3 identifies the earlier JLL plan and Delta presentation under seal and says the finalized Delta report and certain appendices were attached as Exhibit A. ECF 89-4 returned `http_status_404` through direct storage and the required archive fallback. No unavailable plan detail is asserted. |
| September 15 preliminary board minutes | not held on a public route | The two defense filings quote different closure conditions. The page states the conflict without choosing between them. |
| Washington Post September 14 recognition-proposal page | subscription stub, not admitted | The one registry attempt resolved to a 639-character excerpt in `quarry-wire-scheduled-20260914T220001Z`; item 29 uses only the admitted Floca declaration. |
| Washington Post September 18 layoffs page | subscription stub, not admitted | The one registry attempt resolved to a 675-character excerpt in `quarry-wire-scheduled-20260919T100035Z`; item 32 was left out. |
| ECF 89-1 supporting memorandum | duplicate, not separately admitted | Direct storage succeeded, but its substantive extracted text matches admitted ECF 88-1; only the docket header differs. |
| Whether defendants will propose demolition | unknown after disproof search | The order requires notice if scope changes; it does not say a demolition decision has been made. |
| Whether the temporary safety closure will extend past seven days | unknown after disproof search | Floca says seven days unless extended and weekly reassessment. No later sworn update was available by September 19. |

## Drafting constraints

- Do not call the order a demolition ban.
- Use `more than 30 days` when quoting or characterizing the legal command precisely.
- Keep the temporary safety closure separate from the board's two-year main-building closure resolution.
- Attribute allegations, advocacy, and characterizations to their speakers.
- Treat document 87 as the plaintiffs' reply, never as the judge's order.
- State that the emergency-hearing motion was denied.

## Interrogation dispositions

The independent interrogation returned 21 items. The page was corrected to name Bridget Kennedy-Bailey, and it now includes the public ripped-down statement, the placard with its attributed wording, the Kennedy Center spokesperson's denial, Floca's concrete safety evidence, Kennedy-Bailey's sworn forklift observation, and the defendants' September 18 motions. The CourtListener docket retry again returned `robots_disallowed` in `capture-oneoff-20260919T080409Z`. The direct Truth Social capture returned only a shell and was not admitted. The round-one review then required the additional renovation comparisons, later protest and layoff record, preservation plaintiffs' public position, and coverage-accounting changes documented above. The White House repost, meeting characterizations and prediction-market material remain outside this item-scoped patch.

The initial closure is displayed as `seven days`, matching the authoritative passages. It is not staged as a numeric authored figure because the state validator requires the Arabic numeral to appear in the exact source span, while the filings spell the number out.

## Entailment self-check

The round-two patch self-check used `--since a980c477`. Its committed verdict is under `checks/audits/`; the final counts are recorded there after the item 29 wording was narrowed to the declaration's admitted extent.
