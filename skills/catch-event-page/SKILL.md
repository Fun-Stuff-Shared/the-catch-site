---
name: catch-event-page
description: >
  The Catch story pipeline (the-catch-site): the map of the three author turns (catch-record,
  catch-structure, catch-story, each its own skill and session), the reviewer's process
  between and after them (accept the event, dispatch, the record audit, read the reader
  model, red team and entailment, one patch round, decide, stage, ship), and the home of the
  scripts and reference files the three turns share. Use when reviewing, dispatching or
  shipping a Catch story, or to find a shared script or reference. An author uses the turn
  skill it was dispatched with, never this one.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "3.1"
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
| 2 | `skills/catch-structure` | `finish.sh <story> structure` | `checks/reader-models/<story>.md`: entering, exiting (seven answers), grades, sections, outline |
| 3 | `skills/catch-story` | `finish.sh <story> story` | the page, manifest, interrogation, entailment verdict |
| review | reviewer | red team + entailment in parallel, one patch list | the patch commit, then the decision |

Repo: `/Volumes/4/GitHub/the-catch-site`. Shared by every turn: `scripts/` (finish, the
lints, pin_gaps, sources_ledger, interrogate, the three reads) and `references/`
(procedures, story, writing, section-toolkit, manifest-and-gate, interrogation).

## The reviewer's process

1. **Accept the event** in state before dispatching turn one, and name the event id in the
   dispatch (`references/procedures.md`, step 10). The author never runs a state command.
2. **Dispatch turn one** on a pinned skill commit, in a worktree that holds one story, as a
   detached session with a finished marker. Every dispatch says: do not push, do not edit a
   live story, do not kill, restart or signal any process you did not start.
3. **Run the record audit** on the record commit: `scripts/completeness_audit.sh <story>
   checks/audits/<subject>--<slug>-<date>-record-audit.md`. It hunts outside the frame and
   finds a different frame every time it runs, so it runs here, once, before any prose.
4. **Dispatch turn two** (a fresh session) naming the audit file. **Read the reader model
   commit** before going on: the seven answers against the record, the grades against the
   passage tables, the sections against the question tree. A wrong angle is fixed here by
   re-dispatching turn two with the correction, never later on prose.
5. **Dispatch turn three** (a fresh session) naming the reader model commit.
6. **Two reads on the story commit, in parallel:** `scripts/red_team.sh` and
   `scripts/entailment_check.sh`. Verify every finding at the bytes; refute what the pins
   refute; send the rest as one numbered patch list.
7. **One patch round.** The author patches, runs entailment `--since` the story commit and
   the lints, commits. Nothing else runs.
8. **Decide on the page as it stands:** cut a sentence, hold an item with its reason on the
   ledger, or kill the story. A third author run is never the answer.
9. **Before the push:** re-run the capture search on the story terms dated on or after the
   run and disposition the results; refresh the state views for the event and commit them;
   hosted-style build from a git archive with `CATCH_STATE_SOURCE=/nonexistent`; a STAGED
   row with a ships-by date; then push on a human's word and verify the live bytes
   (`references/procedures.md`, step 12).

## What the loop measures

Dispatch to staged, per story, in wall-clock minutes, from the run markers. The Kennedy
Center trial on the one-skill design took 4 h 27 min over four author runs; the record
turn alone on this design took 46 min. A story that needs a second patch round is a record
problem, written into the working note for the next story, not a third run.

## References

- `references/procedures.md`: every command, in order, from scaffold to ship.
- `references/story.md`: the reader model, materiality grades, concept before qualification, the three turns.
- `references/writing.md`: the rules that bind each sentence.
- `references/section-toolkit.md`: the core and optional sections, chip vocabulary, components, layer rules.
- `references/manifest-and-gate.md`: manifest fields, SOURCES.md, what the gate checks.
- `references/interrogation.md`: the interrogation prompt the script sends.
