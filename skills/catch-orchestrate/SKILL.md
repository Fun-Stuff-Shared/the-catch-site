---
name: catch-orchestrate
description: >
  The reviewer's turn of a Catch story (the-catch-site): accept the event, cut the worktree,
  dispatch the record, structure and story turns to the author hosts, run the reads, send
  one patch list, decide, serve the page for the human's read, stage. Use when running a
  story from candidate to staged page, or a timed comparison of two author models on one
  record. The author turns are catch-record, catch-structure and catch-story; this skill
  never writes a record, a reader model or a sentence.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "0.1"
---

# Catch orchestration turn

You supervise one story from an accepted candidate to a page a human can read, and you
write nothing on the page. Every author turn is a fresh session on another host; you read
what it committed, at the bytes, and decide. The clock runs from the first dispatch to the
resting page, per turn, and the run's numbers go in the progress log with the page.

Repo: `/Volumes/4/GitHub/the-catch-site` (main is the reviewer's checkout; authors work in
worktrees). State: `/Volumes/4/CF/catch-state` (SAI, `/Volumes/4/CF/sai`). Candidates:
`/Volumes/4/CF/news-fqs-pilot/story-candidates/`. Dispatch dir: one folder per story under
`/Volumes/4/scratch-fable-profile/grok-authoring/dispatch/<short>/`. Never push without the
human's word. Never edit a skill file while a review is reading it. Never kill, restart or
signal a process you did not start; the authors you launch are yours to stop.

Hosts and models (set explicitly in every dispatch; the defaults exist only so a missing
variable is visible in the log): codex `gpt-6-sol` for the record and structure turns and
one story turn; grok `grok-4.7` for the other story turn. Reviews (audit, red team,
entailment) run on codex `gpt-6-sol`; the stranger read is the one Claude subagent, on
`sonnet`, always with the model passed.

## 1. Accept the event (state, before any dispatch)

The candidate is the human's pick; the pasted row or its id is the word. Read enough of the
saved article bodies to fix the span: the first public act, the day the moment happened,
the court or chamber, the parties. One dated moment, slugged by the day and what happened.

```bash
cd /Volumes/4/CF/news-fqs-pilot
python3 scripts/story_accept.py list | grep -i "<subject words>"
python3 scripts/story_accept.py accept <cand-id> --by <you> --reason "<the human's word, the span>" \
  --kind news --subject "<subject in reader words>" --period <YYYY-MM-DD of the moment> \
  --label "<the candidate headline>" --event-id event-<subject-slug>-<slug>
python3 scripts/story_accept.py decline <sibling cand-id> --by <you> --reason "same cluster as <cand-id>"
cd /Volumes/4/CF/sai
PYTHONPATH=src /opt/anaconda3/bin/python3 -m sai.cli state refresh-views --state-dir /Volumes/4/CF/catch-state --event event-<subject-slug>-<slug>
ls /Volumes/4/CF/catch-state/views | grep <subject-slug>     # event- and chain- views exist
```

A subject with an earlier story also gets `state event-op --op reparent` onto the previous
story (`skills/catch-event-page/references/procedures.md`, step 10). A new subject needs
no reparent; its chain view is its own.

## 2. Cut the worktree and write the candidate block

```bash
cd /Volumes/4/GitHub/the-catch-site
git worktree add /Volumes/4/GitHub/the-catch-site-wt-<short> -b author/<short> main
ln -s /Volumes/4/GitHub/the-catch-site/node_modules /Volumes/4/GitHub/the-catch-site-wt-<short>/node_modules
git rev-parse --short main      # the skill commit named in every dispatch
```

The candidate block (`<dispatch dir>/candidate-block.txt`) is the paragraph the record
turn opens with: candidate id, headline, where the row and the saved bodies are, sibling
candidates for the same cluster, the subject slug and whether it is new, the span in dated
sentences, and the primary records to admit first, named (the post as posted, the
complaint and docket, the statements, the precedent, the pending sibling case). Write it
from the bodies you read in step 1, not from the headline.

## 3. Dispatch turn one and start the clock

```bash
date -u +%Y-%m-%dT%H:%M:%SZ > <dispatch dir>/CLOCK.txt
cd /Volumes/4/GitHub/the-catch-site-wt-<short>
AUTHOR_HOST=codex AUTHOR_MODEL=gpt-6-sol DISPATCH_DIR=<dispatch dir> EVENT_ID=event-<subject-slug>-<slug> \
  zsh skills/catch-event-page/assets/dispatch/run-turn.sh record <subject-slug> <slug> \
  /Volumes/4/GitHub/the-catch-site-wt-<short> author/<short> <skill-commit> <dispatch dir>/candidate-block.txt
```

Confirm the launch: the pid file's process has parent 1 and the log grows past the prompt
echo; the log's `model:` line names the model you set. Wait on the `.finished` marker (a
poll that also exits when the pid dies), never on a timer. The record turn has taken 46
minutes on a subject with a recipe and longer on a new one.

## 4. Read the record commit, then audit it

`git log --grep "^record:" -1` in the worktree. Before the audit: the working note has one
line per census search, the passage tables exist per primary record, the manifest's
`state_event_id` is the event you accepted, `npm run build` in the worktree is green and
`dist/events/<subject>/<slug>/index.html` shows headline, dek, KPI strip, figures,
chronology and records list and no narrative paragraph. Then, once, on this commit:

```bash
cd /Volumes/4/GitHub/the-catch-site-wt-<short>
skills/catch-event-page/scripts/completeness_audit.sh <subject-slug>/<slug> checks/audits/<subject-slug>--<slug>-<date>-record-audit.md
```

The audit file is turn two's input (AUDIT_FILE). It runs here and never again.

## 5. Dispatch turn two, read the reader model

`run-turn.sh structure ...` with AUDIT_FILE in the environment, same host and model as
turn one. Read the structure commit before going on: the seven answers against the record,
the headline against answers 1 and 3, every A and B grade against its passage table (the
quoted words and the clause named), the sections against the question tree. A wrong angle
is fixed here by re-dispatching turn two with the correction, never later on prose.

## 6. Dispatch the story turns

One author: `run-turn.sh story ...` in the same worktree. Two authors on one record (the
timed comparison): cut the second worktree at the structure commit and dispatch both at
once, each on its own host.

```bash
S=$(git -C /Volumes/4/GitHub/the-catch-site-wt-<short> log --grep "^structure:" -1 --format=%h)
git -C /Volumes/4/GitHub/the-catch-site worktree add /Volumes/4/GitHub/the-catch-site-wt-<short>-grok -b author/<short>-grok $S
ln -s /Volumes/4/GitHub/the-catch-site/node_modules /Volumes/4/GitHub/the-catch-site-wt-<short>-grok/node_modules
AUTHOR_HOST=codex AUTHOR_MODEL=gpt-6-sol DISPATCH_DIR=<dispatch dir>/sol  run-turn.sh story ... wt-<short> author/<short> <skill-commit>
AUTHOR_HOST=grok  AUTHOR_MODEL=grok-4.7  DISPATCH_DIR=<dispatch dir>/grok run-turn.sh story ... wt-<short>-grok author/<short>-grok <skill-commit>
```

The two pages then differ only by the author; the record, the reader model, the skill
commit and the clock start are the same.

## 7. The reads, one patch round, the decision

On each story commit, in parallel: `scripts/red_team.sh`, `scripts/entailment_check.sh`,
`scripts/stranger_read.sh <subject-slug>/<slug>` (the stranger on `sonnet`, model passed).
Verify every finding at the bytes; refute what the pins refute; send the rest as one
numbered patch list, the stranger's items in the same list. The author patches once. The
three reads run again only when the patch introduced a Critical. Then decide on the page
as it stands: cut a sentence, hold an item with its reason on
`checks/working-notes/<subject-slug>--<slug>-held.md`, or kill the story. Two things the
reviewers cannot decide are yours: when a source chain is deep enough, and when a
stranger's cut beats a red team's expansion. The headline is page text and is patched
like any sentence.

## 8. Serve, record the clock, stage

Build each resting page in its worktree and serve it (`npx astro preview --host 127.0.0.1
--port <port>` in the worktree, detached, pid noted). Hand the human the URL, never a
receipt list. Write the run's clock from the markers: each turn's `.started` to
`.finished`, the patch round, and CLOCK.txt to the last resting commit; the author time
and the reviewer's hands read apart. The progress entry names the reader-facing delta,
the times, the commits, and what is held. A STAGED row carries a ships-by date. The state
fill (`sai.cli state stage-story`) already ran inside the story turn's finish; check its
line in the log and rerun it on the merged page if the human merges the two. Push on the
human's word only; then verify the live bytes (procedures, step 13).

## Gotchas

- `run-turn.sh` renders the prompt from `assets/dispatch/prompt-<turn>.txt`, refuses an
  unfilled placeholder, and refuses a worktree that does not contain the skill commit.
- A grok run started with `-c` in a directory with no grok session fails with "No session
  found"; the dispatch runner starts a fresh session, never continues one.
- Model ids: codex refuses an id the account does not have ("not supported when using
  Codex with a ChatGPT account"); probe a new id with a one-line read-only exec before a
  run. The grok CLI's config default is grok-4.5; pass `-m` every time.
- Bash `run_in_background` caps at ten minutes; a turn is watched with a Monitor loop on
  the finished marker and the pid, re-armed at expiry.
- The staging summary printed by finish.sh reads `registration.pins`; a `?` there means the
  state CLI's JSON shape changed, not that no pins were staged.
