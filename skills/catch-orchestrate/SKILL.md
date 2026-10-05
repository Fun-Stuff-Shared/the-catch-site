---
name: catch-orchestrate
description: >
  The reviewer's turn of a Catch story (the-catch-site): accept the event, cut the worktree,
  dispatch the record, structure and story turns to the author hosts, run the reads, send
  the patch lists, decide, serve the page for the human's read, stage. Use when running a
  story from candidate to staged page, or a timed comparison of two author models on one
  record. The author turns are catch-record, catch-structure and catch-story; this skill
  never writes a record, a reader model or a sentence.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "0.8"
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
variable is visible in the log): the production author is grok `grok-4.7` for the record,
structure and story turns.
The audit runs on codex `chatgpt-web/high` under two skills, contextual
reconstruction then the story completeness audit: once on the record commit before any
prose, and once at the close on the finished page. The record check and the editor's read
run on codex `gpt-6-sol`. The reviewer of a sentence is never its author; the stranger read is the one Claude subagent, on `sonnet`,
always with the model passed. A timed comparison (section 6) adds a second story author
on codex `gpt-6-sol` from the same structure commit; it is the exception, not the run.

## The run in four commands

The steps below are the procedure; four scripts under `skills/catch-orchestrate/scripts/`
carry it, so nobody waits between steps. What stays yours: the pick and the candidate
block (steps 1 and 2), the read of the structure commit while the story turn runs (step
5), each patch list and the decision (step 7), and the close.

```bash
S=/Volumes/4/GitHub/the-catch-site/skills/catch-orchestrate/scripts
D=/Volumes/4/scratch-fable-profile/grok-authoring/dispatch
# 1. accept, reparent (when a previous story is named), refresh views, cut the worktree, start the clock, dispatch the record turn
BY=<you> REASON="<the human's word, the span>" zsh $S/open-story.sh <short> <cand-id> <subject-slug> <slug> <YYYY-MM-DD> <kind> \
  "<subject in reader words>" "<the candidate headline>" <candidate block file> [previous event id]
# 2. the driver: record turn, record build, audit, structure turn, state label, story turn, build, the record check and the stranger read
python3 $S/launch.py $D/<short>/drive.out zsh $S/drive.sh <short> <subject-slug> <slug>
# 3. each patch round: quote check, the author's own session resumed with the list, build, the record check on what the patch changed
python3 $S/launch.py $D/<short>/patch<N>.out zsh $S/patch.sh <short> <subject-slug> <slug> <N> <patch list file>
# 4. the closing reads, once the record check says SHIP: the stranger and the audit together, then the editor with both reports
DRIVE_CLOSING=<N> python3 $S/launch.py $D/<short>/closing<N>.out zsh $S/drive.sh <short> <subject-slug> <slug>
# 5. the clock, any time; the worktree, when the story is shipped or killed
python3 $S/ledger.py $D/<short>
zsh $S/close-story.sh <short>            # a shipped story, after it is merged to main
zsh $S/close-story.sh --killed <short>   # a story that will not ship
```

The driver writes one line per step to `<dispatch dir>/DRIVE.log` and `.started` and
`.finished` markers that `ledger.py` turns into the run's times. It ends by writing
`READY-r0` (the reads are in); a patch round ends with `READY-r<N>`, the closing reads
with `CLOSED-r<N>`. A failed step writes
its reason to `<dispatch dir>/STOP` and exits; fix the cause and launch the same command
again, finished steps are skipped. To pause it, write a reason into `<dispatch dir>/HOLD`
(checked before every step); to stop it with whatever step it is running, kill its process
group (`kill -- -$(cat <dispatch dir>/drive.pid)`), never the driver alone, which would
leave its audit or reads running and a restart would start them a second time. One driver
or patch round runs per story; a second launch refuses while the first is alive; to stop an author turn, kill its process group (`kill -- -$(cat <turn>.pid)`;
the pid file holds the wrapper, the author is its child), which is yours. The driver does not wait for your read of the structure commit: it
dispatches the story turn at once, and a wrong angle is stopped by HOLD, killing the story
turn, deleting its markers, the structure markers and the `label.*` markers, and
re-dispatching turn two.

Worktrees live under `/Volumes/4/GitHub/the-catch-site/.worktrees/<short>` (ignored by
git) and exist only while their story is open. `close-story.sh` copies uncommitted files
that are not build output to the dispatch dir and removes the worktree; the branch stays,
and `git worktree add .worktrees/<short> author/<short>` at the same path brings it back
with its author session still resumable. Never leave a worktree beside the repo.

The state reads each story record's saved text from the path it was staged at.
`close-story.sh` counts the state's records that read from the worktree, registers the
story's manifest from the main checkout once the worktree is gone, and prints how many of
those records now read from main and the id of each one left with no readable text (a
record whose text on main differs from the worktree's is left that way). A story that is
not on main closes only with `--killed`, which leaves all of its records unreadable to
the search index.

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
PYTHONPATH=src /Volumes/4/CF/sai/.venv/bin/python -m sai.cli state refresh-views --state-dir /Volumes/4/CF/catch-state --event event-<subject-slug>-<slug>
ls /Volumes/4/CF/catch-state/views | grep <subject-slug>     # event- and chain- views exist
```

A subject with an earlier story also gets `state event-op --op reparent` onto the previous
story (`skills/catch-event-page/references/procedures.md`, step 10). A new subject needs
no reparent; its chain view is its own.

## 2. Cut the worktree and write the candidate block

```bash
cd /Volumes/4/GitHub/the-catch-site
git worktree add .worktrees/<short> -b author/<short> main
ln -s /Volumes/4/GitHub/the-catch-site/node_modules .worktrees/<short>/node_modules
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
cd /Volumes/4/GitHub/the-catch-site/.worktrees/<short>
AUTHOR_HOST=grok AUTHOR_MODEL=grok-4.7 DISPATCH_DIR=<dispatch dir> EVENT_ID=event-<subject-slug>-<slug> \
  zsh skills/catch-event-page/assets/dispatch/run-turn.sh record <subject-slug> <slug> \
  /Volumes/4/GitHub/the-catch-site/.worktrees/<short> author/<short> <skill-commit> <dispatch dir>/candidate-block.txt
```

Confirm the launch: the pid file's process has parent 1 and the log grows past the prompt
echo; the log's `model:` line names the model you set. Wait on the `.finished` marker (a
poll that also exits when the pid dies), never on a timer. The record turn has taken 46
minutes on a subject with a recipe and 42 on a new subject with 32 records.

## 4. Read the record commit, then audit it

`git log --grep "^record:" -1` in the worktree. Before the audit: the working note has one
line per census search, the passage tables exist per primary record, the manifest's
`state_event_id` is the event you accepted, `CATCH_TURN=record npm run build` in the
worktree is green (the gate excuses only the unattested section_grammar step under that
variable; without it a record commit fails the gate by design) and
`dist/events/<subject>/<slug>/index.html` shows headline, dek, KPI strip, figures,
chronology and records list and zero `data-layer="narrative"` blocks. If main moved
while turn one ran (a headline rename, a merged story), merge main into the author
branch first, resolving the editorial list in `src/lib/discovery.mjs` as the union and
keeping both blocks of `data/sources/SOURCES.md`; the state's labels must match every
page in the worktree or the build fails on a page the author never touched. Then, once,
on this commit, detached (the audit takes twenty minutes or more):

```bash
cd /Volumes/4/GitHub/the-catch-site/.worktrees/<short>
CODEX_MODEL=gpt-6-sol skills/catch-event-page/scripts/completeness_audit.sh <subject-slug>/<slug> \
  checks/audits/<subject-slug>--<slug>-<date>-record-audit.md
```

The audit file is turn two's input (AUDIT_FILE). It runs here and never again.

## 5. Dispatch turn two, read the reader model

`run-turn.sh structure ...` with AUDIT_FILE in the environment, same host and model as
turn one. Read the structure commit before going on: the seven answers against the record,
the headline against answers 1 and 3, every A and B grade against its passage table (the
quoted words and the clause named), the sections against the question tree. A wrong angle
is fixed here by re-dispatching turn two with the correction, never later on prose.

When the reader model's headline differs from the label you accepted in step 1, rename
the state label now, before any story turn. The build compares each page's `<h1>` with
the state view's label (`scripts/check-state-pages.mjs`), the authors are told not to run
state commands, and a story turn that reaches its finish with the old label ends with the
page written, entailed and uncommitted (the sol press turn: 49 minutes, "Turn-three
commit: none"). The reviewer then runs `finish.sh ... story` in the worktree by hand, which
is the author's commit step and not a sentence.

```bash
cd /Volumes/4/CF/sai
PYTHONPATH=src /Volumes/4/CF/sai/.venv/bin/python -m sai.cli state event-op --state-dir /Volumes/4/CF/catch-state \
  --op rename --event event-<subject-slug>-<slug> --author <you> \
  --reason "structure turn <commit>: the reader model's headline answers questions 1 and 3" \
  --label "<the reader model's headline>"
PYTHONPATH=src /Volumes/4/CF/sai/.venv/bin/python -m sai.cli state refresh-views --state-dir /Volumes/4/CF/catch-state --event event-<subject-slug>-<slug>
```

## 6. Dispatch the story turns

The production run: `run-turn.sh story ...` in the same worktree, grok `grok-4.7`. Two
authors on one record (the timed comparison): cut the second worktree at the structure
commit and dispatch both at once, each on its own host.

```bash
S=$(git -C /Volumes/4/GitHub/the-catch-site/.worktrees/<short> log --grep "^structure:" -1 --format=%h)
git -C /Volumes/4/GitHub/the-catch-site worktree add /Volumes/4/GitHub/the-catch-site/.worktrees/<short>-grok -b author/<short>-grok $S
ln -s /Volumes/4/GitHub/the-catch-site/node_modules /Volumes/4/GitHub/the-catch-site/.worktrees/<short>-grok/node_modules
AUTHOR_HOST=grok  AUTHOR_MODEL=grok-4.7  DISPATCH_DIR=<dispatch dir>/grok run-turn.sh story ... .worktrees/<short>-grok author/<short>-grok <skill-commit>
AUTHOR_HOST=codex AUTHOR_MODEL=gpt-6-sol DISPATCH_DIR=<dispatch dir>/sol  run-turn.sh story ... .worktrees/<short> author/<short> <skill-commit>
```

The two pages then differ only by the author; the record, the reader model, the skill
commit and the clock start are the same.

## 7. The reads, the patch rounds, the decision

Every round starts with the event, before any read: run the capture search on the story
terms dated on or after the record turn, and for a court case fetch the docket's new
entries by document number from the RECAP store (it serves the PDFs the docket page
refuses). A record that moved the event (a ruling, a filing, a statement) is pinned and
is item 1 of the round's list.

Three reads, under `skills/catch-event-page/scripts/`, each asking one question.

- `record_check.sh` checks sentences against records and nothing else. It takes every
  block of the page with the passages it cites, then looks past the cited passage: an
  absence another pinned record contradicts, a record given a subject it does not have,
  source authority, a later record that makes a sentence false. It does not report
  omissions, terms or order. Its findings are corrections.
- `stranger_read.sh` is the reader (on `sonnet`, model passed): where a person who has
  never seen the story stalled, misread or lost interest. It gives no verdict; its report
  is read in full by the reviewer and by the editor.
- `editor_read.sh` decides what the piece must do for a reader: whether the story the page
  tells is the story the record supports today, whether each of answers 1 to 6 is said in
  words a reader could repeat, what to cut, what a reader still asks, and what each
  addition displaces. It runs last, with the stranger's report as input, and answers every
  item in it.

The order. The driver runs the record check and the stranger read together on the story
commit. Read the author's own referent verdict (`checks/audits/...-referents.md`), verify
every finding at the bytes, refute what the pins refute, and send one list: the record
check's corrections and the stranger's stalls. After each patch `patch.sh` runs the record
check on the blocks the patch changed. When it returns SHIP, run the closing reads
(`DRIVE_CLOSING`): the stranger and the audit on the page as it now stands, then the editor,
who reads both reports. The editor's memo is the last list; an audit finding the memo does
not take up is verified at the bytes and added to it or refuted with a reason; the record check runs once more on what that patch changed. Each
read writes `checks/audits/<subject>--<slug>-<date>-r<N>-<read>.md`.

Before telling the human a page is ready, read the last stranger report in full and the
served page top to bottom yourself. A clean record check says the sentences are true; it
does not say the page reads.

A correction quotes what the pin says and where, never a suggested framing: a framing the
reviewer suggests can itself give a record a subject it does not have. Give the author the
pin lines and the class, and let the sentence follow the record. What a record says appears in the list only inside quotation
marks, and the list is sent only after the check passes:

```bash
node skills/catch-event-page/scripts/patch_quotes.mjs <subject-slug>/<slug> <dispatch dir>/<round>.prompt.txt [fetched text of a record the list asks to admit]
```

It finds every quoted span, of any length, in a pinned record, the page, its data
module, the reader model or the working note, and exits 1 on a span found nowhere: that
span is your wording, and the author will write it onto the page as the record's.

Every list opens with the page's size and closes with what must leave: the word count of
the story view's sentences and the longest of them from
`python3 skills/catch-event-page/scripts/voice_lint.py --lengths dist/events/<subject-slug>/<slug>/index.html`,
and for every item that adds a clause the question of what it displaces (a sentence that
now says the same thing, a detail that moves to a detail block). The author reports the
count after the patch. Patches
that only add lengthen the sentences a stranger later stalls on.
An item names the register it wants ("a passage a stranger can hold"), never a number: a word cap produces primer prose.

Read a grok page at the bytes before the reads return for five things, and put what you
find on the list with the pin lines: bare surnames in the dek where the reader model's dek
has a count; a sequence spread over sections with no sentence carrying it in order; a gap
line the reader model graded C "unmet" written onto the page as an unknown when one web
search answers it; a prior case a record's own actor names dropped because it was graded
D; two cards on one actor's one point.

The author is the journalist and the page is the author's. `patch.sh` resumes the author's
own session (the id in `<dispatch dir>/story.session`), so the author patches with its
record read still in context, and opens every list with the same preamble: a correction is
fixed or answered with the record; everything else is advice the author weighs, takes,
rewrites or declines, with a line of report for each. The reads serve different readers and
the author is not asked to satisfy all of them. Rounds are not capped. A correction the
author declined without a record goes on the next list; advice the author declined is
settled unless the editor raises it.
Then decide on the page as it stands: cut a
sentence, hold an item with its reason on
`checks/working-notes/<subject-slug>--<slug>-held.md`, or kill the story. Two things the
reviewers cannot decide are yours: when a source chain is deep enough, and when a
stranger's cut beats a hole the editor's read wants filled. The headline is page text and
is patched like any sentence, with one addition: the list carries a line
`HEADLINE: <the exact new headline>` and the item tells the author to use those exact words
on the page and in the reader model. `patch.sh` renames the state label to that line before
the author starts, because the build fails when the page headline and the label differ.
To take a headline change back, give the list a `HEADLINE:` line with the earlier headline;
removing the line leaves the label where the last round put it.

A list keeps corrections and advice apart and says which each item is. For a correction,
give the record's words in quotation marks with the file, and the class of the defect. For
advice, say what the reader could not follow and where; offer a sentence only when you have
one, and check it against the pinned text first (find the record's words in the `.txt`
with whitespace collapsed), because an author may take a reviewer's sentence as written.
Name a page sentence by its opening words exactly as printed, one quotation per sentence;
`patch_quotes.mjs` refuses a quotation it cannot find, and it matches capitals. Do not put
commit messages or error text in quotation marks.

The page prints each figure's recorded passage, so a passage is a whole sentence of the
record. A passage may run across a line break in the pinned text (write it with single
spaces), and a row of a saved data series (`2026-09-29,113.96`) is read as a date and its
values. When a round's reads are clean and the passages are still fragments, one more
list restores them; it changes no claim.

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

The reviewer's own decision after the last read is a commit in the worktree by explicit
path (the cut sentence, the held list, the read reports as `.md`, never the `.log` files)
with a `review:` message, so the resting commit carries what was decided and why.

Expect, per story with the grok-4.7 author: record 35 to 45 minutes, completeness audit
about 10, structure 15 to 20, story 70 to 125, the first patch 20 to 65 and later patches
2 to 20, a read 6 to 11. Stories run side by side; three take about as long as the slowest
one. `ledger.py` prints a run's own times from its markers.

## Gotchas

- A maintenance run (`news-state-maintain`, every two hours at half past) holds the state
  while it works. The label rename (`state event-op`) and the one-event view refresh
  (`state refresh-views --event`) do not need its lock and run during it. `state export --event`
  and a full `refresh-views` with no `--event` are refused with `maintain_fire_mismatch`
  until the run ends.
- The driver stops when the state refuses a figure. Read the refusal in
  `<worktree>/.finish-stage.json` before sending it to the author, reason by reason. A
  missing source field, an unsupported formula, a source that is not live, or a passage
  that does not state the value is the author's to rewrite or drop. Only a refusal that says
  the value is not in a passage which does state it is the state's defect; that is fixed
  and deployed there, after which the same driver command stages again and goes on.
- A patch round cut off while the author was editing is launched again with the same list:
  the quote check passed on that list once and is not run again, since the author has
  already rewritten the sentences it names. A changed list is checked afresh.
- A read that dies on a login, a network or a capacity error (`STOP` names the read; its
  log ends in a 401 or "at capacity") has not judged the page. Launch the same command
  again once a one-line `codex exec` answers; never touch the login files.
- A figure row under "Show the work" that reads "This record does not yet establish one
  current value" means the state has not joined the story's figure to the wire's: either
  the judges have not reached it (the next maintenance run does) or the relation gate
  refused the pair. The refusal is in the newest folder under
  `/Volumes/4/CF/catch-state/judges/attempts/` whose `input.json` names the event; a gate
  that refuses two forms of one measurement is the state's defect, fixed and deployed there.
  To judge one story's pairs without waiting for a maintenance run, between runs (during
  one it is refused with `maintain_fire_mismatch`):
  `cd /Volumes/4/CF/sai-prod && PYTHONPATH=src /Volumes/4/CF/sai/.venv/bin/python -m sai.cli state judges --state-dir /Volumes/4/CF/catch-state --kind relation --event-id event-<subject-slug>-<slug> --run-dir <a new scratch folder>`,
  then `state refresh-views --event` and rebuild the page. A slot whose last attempt failed
  with nothing judged is no longer taken first by the scheduled runs; after its cause is
  fixed, `sai.cli state judge-clear --kind relation --unit <slot id> --author <you> --reason "<the fix>"`
  puts it first again.
- `drive.sh` is read by the shell as it runs. Change it by writing a new file and moving
  it over the old one, never in place, while any driver is running.
- `run-turn.sh` renders the prompt from `assets/dispatch/prompt-<turn>.txt`, refuses an
  unfilled placeholder, and refuses a worktree that does not contain the skill commit.
- An outside read of a page from a text extraction (a chat model given the copied page)
  loses the `value=` numbering of the records list and counts the entries in order, then
  reports cites beyond the list; check such a claim at the HTML before it becomes an item.
  Since 400c7a89 the numbers run in group order, so the list and the cites agree in any
  extraction.
- A grok run started with `-c` in a directory with no grok session fails with "No session
  found"; the dispatch runner starts a fresh session, never continues one.
- Model ids: codex refuses an id the account does not have ("not supported when using
  Codex with a ChatGPT account"); probe a new id with a one-line read-only exec before a
  run. The grok CLI's config default is grok-4.5; pass `-m` every time.
- Bash `run_in_background` caps at ten minutes; a turn is watched with a Monitor loop on
  the finished marker and the pid, re-armed at expiry.
- The staging summary printed by finish.sh reads `registration.pins`; a `?` there means the
  state CLI's JSON shape changed, not that no pins were staged.
- `finish.sh` owns every `checks/audits/<subject>--<slug>*` file, the `.log` transcripts
  included. Move the logs to scratch before running it by hand and put them back after;
  the `.md` verdicts are the record, the logs are not committed.
- The build copies the state views into `data/state/` (`scripts/pull-state.mjs`), so a
  worktree shows hundreds of modified view files after any state refresh. finish.sh
  refuses them as generated; leave them, never commit them.
