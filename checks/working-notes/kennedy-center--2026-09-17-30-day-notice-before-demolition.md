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
| `defendants-statement-facts-89-2-2026-09-18` | Defendants say management sent the finalized Delta report to trustees on August 31 and the board ratified closure on September 15 | Defendants' chronology supporting the motions | What happened next, attributed |
| `floca-declaration-89-3-2026-09-18` | Floca identifies a JLL report and Delta presentation as appearing under seal | Why those plan records cannot be read from the public pin set | What happened next and unknowns |
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
| Full JLL 2026 project plan and Delta report | not held on a public route | ECF 89-3 identifies a JLL report and Delta presentation under seal. ECF 89-4 returned `http_status_404` through direct storage and the required archive fallback. No unheld plan detail is asserted. |
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

The final patch self-check used `--since e548e46d`, inspected 15 changed blocks and returned `ENTAILED`, with zero critical, major, moderate or minor unsupported sentences. The committed verdict is under `checks/audits/`.
