# What grok does when it authors a Catch page (four stories, 2026-09-08)

Source: logs/1-author.log through logs/4-author.log, logs/1-rework.log through logs/3-rework.log (4-rework pending), the four keystone reviews, the four codex red-team verdicts, and the built pages. Counts are recounted from those files this session.

| Story | Author run | Keystone items | Codex r1 | Rework run | Result |
|---|---|---|---|---|---|
| 1 Miami cargo crash | ~25 min, 24 records | 7 | NO-SHIP (1 critical, 6 major) | 27 new pins, all items absorbed | staged cff0c3a3 |
| 2 Missouri House map | ~30 min | 12 | NO-SHIP (12 major) | 17 codex + 12 keystone absorbed | staged 1204d8c6 |
| 3 House funding stopgap | ~25 min | 15 | NO-SHIP | 20 new pins, 26 items absorbed | staged 30e6f929 |
| 4 Venezuela oil deal | ~30 min, 30 records | 16 | NO-SHIP (2 critical, 12 major) | 17 new pins, 28 items absorbed, ~25 min | staged 3f14445e |

Every first draft failed the red team; every rework absorbed every item in one pass. The loop works because the review finds what the author skipped, not because the author improves between stories. The same six omissions recur.

## 1. The author writes from the pins it chose, never from the run-up

Each page opens on the "main document" of the candidate (the fact sheet, the opinion, the enrolled bill) and skips the days before it. Story 4 opened on the Monday fact sheet and left out the Friday announcement, the officials' 55 percent briefing, and the weekend Pentagon denial; story 3 skipped the January and July prior votes; story 2 skipped the trial court and the statute chain. The interrogation step catches this every time and grok declines the items as "not pinned this session" (4-author.log: "Declined this session: Trump's Friday Truth Social post ... are real records. They were not pinned here.").
Rule for the skill: the story span in the data module must start at the first public act, and What happened must open there. An interrogation item that names a fetchable public record is not declinable; fetch it or type the block.

## 2. Attribution goes to the outlet that repeated the fact, not the primary that holds it

Story 4: the 25-year term and the 1.5 million barrels a day were in the pinned Venezuelan ministry address; the page credited CBS. The Chinese and Russian operators were in the pinned fact sheet; the page credited Reuters "from officials". Story 3: the hemp mechanism was in the enrolled text; the page credited coverage. Story 1: the FAA statement existed on the FAA page; the page said the FAA had no written statement.
Rule: before citing an outlet for a fact, grep every primary pin for it (case-insensitive; hyphenated and uppercase headings miss case-sensitive searches: "AFRICAN GROWTH AND OPPORTUNITY" was missed twice by two different reviewers). The primary wins the cite; the outlet row says "checks out".

## 3. Wording drift on legal terms

"Equity stake" for what NABEP called "rights to a stake" and an official later called warrants; "closed at" for a spot-price series; "Florida state Representative" for what the pin labels a Senate candidate; "traditional opposition and orthodox Chavismo" for "members of the opposition and within the Chavismo movement"; story 2's "Powell signed" for an order signed "Chief Justice"; story 1's "2012 van" (the correct year) against CNBC's "2021" was caught only because the transcript was pinned late.
Rule: a legal or financial term on the page is the pin's word in quotation marks the first time it appears, then defined in reader words. A date on a source card is the pin's dateline, recounted at ledger time.

## 4. The catch box is built from what the author already wrote, not from the dispute

Story 4's five rows: two held, one manufactured a contradiction between two layers of the same deal (concession grantor versus contract counterparty), one was the weakest possible ("who pays": two price observations with no incidence), and the real dispute (equity or warrants; the administration's own 55 arithmetic) was absent. Story 1's box had six good rows only after the rework added the video and weather records. Story 3's box needed the corrected hemp direction.
Rule: write the catch box last, after the interrogation, and require each row to name the two records that disagree. A row with one record is a fact block, not a catch.

## 5. Ledger and manifest hygiene decays late in the run

Story 4: four pins added after the interrogation had no SOURCES.md row; the manifest figures list had eight unlabeled entries for a page with roughly twenty displayed numbers; the needs ledger still called 14-versus-17 unresolved after the pinned Reuters resolved it. Story 3 left uncommitted pins it cited. Stories 1 to 3 left data/sources/officials/ orphans and .md.err interrogation files. Every story left an open-question row that the same page had already answered (story 4: "a State or Energy written statement" while citing both).
Rule: regenerate SOURCES.md and re-read the open-questions list as the last two steps before commit; a basename grep of every manifest pinned_path against the ledger is a build-time check the skill script should run.

## 6. Same-source adjacent cites and proof-only numbers

11 of 34 adjacent cite pairs on story 4 were same-source, rendering "1 , 1" (td-6b175e class); story 2 had the same until reworked. Story 4 computed 21.7 percent into the data module and a proof block but never stated it in visible text. Story 3 over-split What happened into one-sentence paragraphs when told to attach claim-sized passages.
Rule: one Cite per sentence unless two different records support it; a computed number either appears in the fact layer or is deleted with its proof block.

## What grok does well (keep)

- Reads the skill and procedures first, every time, and copies the ask into a working note before touching data.
- Pins primaries before writing and recovers blocked fetches (SCOTUS appendix for the Missouri opinion; Dow Jones and BOE copies for blocked Reuters and WSJ text) with disclosure.
- Recounts numbers from the pins; arithmetic has been clean in all four codex verdicts.
- Absorbs a 26-item rework in one pass with byte-exact quotes and reports item by item with the commit hash.
- Restores build-time data/state drift and commits only story paths.

## Fetch facts (for the skill's procedures)

- Scrapling chrome impersonation gets Politico, Axios, WaPo, Washington Examiner, C-SPAN, Kalshi, BBC, Fox, Semafor, TradingView, BOE Report, Investing.com, MarketScreener, KPBS, reed.senate.gov, Guardian, OilPrice. Stealth mode gets Truth Social.
- Blocked in every mode on Sept 8: reuters.com (401), nytimes.com (403), cbo.gov (403), congress.gov (403 challenge), courts.mo.gov opinion PDF, house.mo.gov, spglobal. archive.org had no snapshot for any of the Reuters or CBO pages tried.
- Carrier copies (Reuters via Investing.com, BOE Report, MarketScreener; WSJ via Dow Jones on TradingView; AP via KPBS and NPR) carry the same text and are disclosed in the records list.
- Parallel coverage fetches fail more often than sequential retries.

## Story 4 rework (logs/4-rework.log, commit 3f14445e)

Absorbed all 16 keystone and 12 codex items in one pass, about 25 minutes. Copied the browser-copy pins from the verify directory instead of re-fetching, regenerated the ledger, rewrote the page with a focused sub-agent while updating the manifest itself, ran build, lint, an em-dash check, and the interrogation, then fixed one date the interrogation caught (the lending office's launch year versus its statute) and rebuilt. Two habits to keep: it reported a mid-run "not done" list before finishing and then closed each item; it verified zero same-source adjacent cites with its own regex. One new habit to watch: to avoid double cites it added short cite-carrier sentences ("The Rubio ranking sits in a State Department transcript of September 1.") rather than attaching the second cite to the clause; that is the same over-splitting seen in story 3 in a new form. Rule for the skill: passages attach to clauses, not to new sentences.

## Folded into the skill (2026-09-08)

SKILL.md steps 2, 5, 7, 9 and the done checklist; references/anti-patterns.md, six new entries; references/procedures.md, fetch facts in step 3 and the interrogation rule in step 11. The same lessons ride in prompt-5.txt as extra asks so the next author run is the test of whether the skill text changes the first draft.


## Stories 5 and 6 (Texas Senate, Greenland): after the first fold

The first fold worked on the six recurring omissions: both first drafts opened on the first
public act, pinned primaries before coverage, registered every figure, and had zero wrong
numbers on recount. Four new patterns showed on both stories and are now anti-patterns:
pinned coverage read for quotes rather than content; absence claims without a capture; an
unrelated record framed as a response; a rounding, preview, label, or broader true word
called a discrepancy. Two showed once: nobody introduced on first mention (Texas), an
interactive portal pinned as an empty shell (Texas).

What the fold did not touch and Zain caught on reading (2026-09-08): shape. Both pages
were walls of record blocks with no figure; see section-grammar shape rules and the four
shape anti-patterns. The rule for the next drafts: measure the page before saying done.
