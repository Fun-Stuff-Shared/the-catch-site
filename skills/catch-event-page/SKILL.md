---
name: catch-event-page
description: >
  The Catch story pipeline (the-catch-site): the map of the three author turns (catch-record,
  catch-structure, catch-story, each its own skill and session), the reviewer's process
  between and after them (accept the event, dispatch, the record audit, read the reader
  model, red team and entailment, patch rounds, decide, stage, ship), and the home of the
  scripts and reference files the three turns share. Use when reviewing, dispatching or
  shipping a Catch story, or to find a shared script or reference. An author uses the turn
  skill it was dispatched with, never this one.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "3.5"
---

# Catch story pipeline

One story is three author sessions and one reviewer. Each author session runs one skill
and ends on one commit made by one command; nothing an author does depends on remembering
another turn. The reviewer owns everything that is not writing: state, acceptance,
dispatch, the reads, the decision, staging, the push.

| Turn | Skill | Ends with | Produces |
|---|---|---|---|
| 1 | `skills/catch-record` | `finish.sh <story> record` | pins, working note (census, passage tables, gaps), data module, figures, chronology, detail blocks, records list, subject row, homepage feature; no narrative |
| audit | reviewer | `completeness_audit.sh` on the record commit | `checks/audits/<story>-<date>-record-audit.md`; runs once per story |
| 2 | `skills/catch-structure` | `finish.sh <story> structure` | `checks/reader-models/<story>.md`: entering, exiting (seven answers), headline and dek, grades, sections, outline |
| 3 | `skills/catch-story` | `finish.sh <story> story` | the page, manifest, interrogation, entailment verdict |
| review | reviewer | red team + entailment + stranger read on the story commit; a numbered patch list per round until the reviewer decides | patch commits, then the decision: cut, hold, or kill |

Repo: `/Volumes/4/GitHub/the-catch-site`. Shared by every turn: `scripts/` (finish, the
lints, pin_gaps, sources_ledger, interrogate, the three reads) and `references/`
(procedures, story, writing, shape-rules, sections, components, manifest-and-gate, interrogation).

## The reviewer's process

1. **Accept the event** in state before dispatching turn one, and name the event id in the
   dispatch (`references/procedures.md`, step 10). The author never runs a state command.
2. **Dispatch turn one** with `assets/dispatch/run-turn.sh record <subject> <slug> <worktree>
   <branch> <skill-commit> <candidate-block-file>` (EVENT_ID in the environment): it renders
   `assets/dispatch/prompt-record.txt`, refuses an unfilled placeholder or a worktree without
   the skill commit, and launches the author detached with a finished marker. Every dispatch says: do not push, do not edit a
   live story, do not kill, restart or signal any process you did not start.
3. **Run the record audit** on the record commit: `scripts/completeness_audit.sh <story>
   checks/audits/<subject>--<slug>-<date>-record-audit.md`. It hunts outside the frame and
   finds a different frame every time it runs, so it runs here, once, before any prose.
4. **Dispatch turn two** (`run-turn.sh structure ...` with AUDIT_FILE in the environment; a fresh session). **Read the reader model
   commit** before going on: the seven answers against the record, the headline against
   answers 1 and 3, the grades against the passage tables (each A and B line quotes the
   words the story will cite and names the clause it changes; an answer with more than three
   A or B lines is reread, one clause each), the sections against the question tree. A wrong angle is fixed here by
   re-dispatching turn two with the correction, never later on prose.
5. **Dispatch turn three** (`run-turn.sh story ...`; a fresh session).
6. **Three reads on the story commit, in parallel:** `scripts/red_team.sh`,
   `scripts/entailment_check.sh`, and the stranger read: `scripts/stranger_read.sh
   <subject>/<slug> [port]`, one Claude reader given the page as the story view reads it
   and the reader model, returning what a stranger misreads, stalls on, or sees as the
   page talking to itself (`references/stranger-read.md`). Verify every finding at the bytes; refute what the pins
   refute; send the rest as one numbered patch list. The stranger's findings from this read
   go in the same list as the red team's, not held back for a later round.
7. **Patch rounds.** The author patches, runs entailment `--since` the commit the round
   started from and the lints, commits. The reviewer reads the patched page, reruns the
   red team and the stranger read on it, and either sends the next numbered list or
   decides: cut a sentence, hold an item with its reason, or kill the story. A held item
   goes on `checks/working-notes/<subject>--<slug>-held.md`, one line each with the reason;
   both reviewer scripts read that file, the author's ledger, and every earlier report, and
   label each finding new, repeat, or residual. The reviewer decides the two things the
   reviewers cannot: when a source chain is deep enough (a page correctly attributing an
   outlet is complete without the instrument behind it), and when a stranger's cut beats a
   red team's expansion (the stranger is the reader; the red team is not). Rounds are not
   capped, but the round after the first report with no new Critical or Major finding is
   the last; what remains is held or cut, not patched again. The headline is page text and
   is patched like any sentence; it is never held because a label upstream says otherwise.
8. **Before the push:** re-run the capture search on the story terms dated on or after the
   run and disposition the results; amend the event's label in the state log to the page's
   headline when they differ (the label is set at acceptance, step 1, and the page's
   headline wins); refresh the state views for the event and commit them;
   hosted-style build from a git archive with `CATCH_STATE_SOURCE=/nonexistent`; a STAGED
   row with a ships-by date; then push on a human's word and verify the live bytes
   (`references/procedures.md`, step 12).

## What the loop measures

Dispatch to staged, per story, in wall-clock minutes, from the run markers. The Kennedy
Center trial on the one-skill design took 4 h 27 min over four author runs; the record
turn alone on this design took 46 min. Each patch round is timed on its own so the cost of
review can be read apart from the cost of writing.

## References

- `references/procedures.md`: every command, in order, from scaffold to ship.
- `references/story.md`: the reader model, materiality grades, concept before qualification, the three turns.
- `references/writing.md`: the rules that bind each sentence.
- `references/shape-rules.md`, `references/sections.md`, `references/components.md`: how a page is built to be read, the core and optional sections, chips and components.
- `references/manifest-and-gate.md`: manifest fields, SOURCES.md, what the gate checks.
- `references/interrogation.md`: the interrogation prompt the script sends.
- `references/anti-patterns.md`: sentences real reviews cut, by shape, for the story turn.
- `assets/dispatch/`: the three turn prompts and `run-turn.sh`.
