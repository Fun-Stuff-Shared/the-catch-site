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
  version: "0.7"
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
structure and story turns (the human's pick, 2026-09-24, after the press-ban comparison).
Reviews (audit, editor's read, red team, entailment) run on codex `gpt-6-sol`, so the reviewer of a
sentence is never its author; the stranger read is the one Claude subagent, on `sonnet`,
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
# 2. the driver: record turn, record build, audit, structure turn, state label, story turn, build, four reads
python3 $S/launch.py $D/<short>/drive.out zsh $S/drive.sh <short> <subject-slug> <slug>
# 3. each patch round: quote check, the author's own session resumed with the list, build, four reads
python3 $S/launch.py $D/<short>/patch<N>.out zsh $S/patch.sh <short> <subject-slug> <slug> <N> <patch list file>
# 4. the clock, any time; the worktree, when the story is shipped or killed
python3 $S/ledger.py $D/<short>
zsh $S/close-story.sh <short>
```

The driver writes one line per step to `<dispatch dir>/DRIVE.log` and `.started` and
`.finished` markers that `ledger.py` turns into the run's times. It ends by writing
`READY-r0` (the reads are in); a patch round ends with `READY-r<N>`. A failed step writes
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
is item 1 of the round's list. On the press-ban page the restraining order was signed the
day the story turn ran; the page said the docket held no order until the red team found
it on the web in round 3.

On each story commit, in parallel, from the worktree, the four scripts under
`skills/catch-event-page/scripts/`: `editor_read.sh`, `red_team.sh`, `entailment_check.sh`
and `stranger_read.sh`, each given `<subject-slug>/<slug>` (the stranger on `sonnet`,
model passed). Read the author's own referent verdict
(`checks/audits/...-referents.md`): a patch commit without a CLEAR one goes back before
the reads run. Verify every finding at the bytes; refute what the pins refute; send the
rest as one numbered patch list, the stranger's items in the same list.

The four reads ask different questions, and the list is built on the editor's memo. The
editor's read decides what the piece must do for a reader: whether the story the page
tells is the story the record supports today, whether each of answers 1 to 6 is said in
words a reader could repeat, what to cut, what a reader still asks, and what each
addition displaces; its memo is in page order with a word budget, so it is the spine of
the list. The red team checks sentences against records and nothing else (a sentence
wider than its record, a record given a subject it does not have, source authority, a
later record that makes a sentence false); it does not report omissions, terms or order.
The entailment pass judges each cited sentence against its passage. The stranger is the
reader. Run on the press-ban story commit (2026-10-02), the editor's read returned in one
memo what the recorded rounds had taken three lists to reach: the witness sentence
attached to the wrong subject, the sequence no passage carried in order, the missing
sentence on what the pool halt cost viewers, the dek's bare surnames, 330 words of cuts,
and the September 24 order the page predated. Run on the round 5 page it missed the
red team's Major of that round (the five-network statement given a subject it does not
have), which is why the red team stays, narrowed to that question.

Launch the four as detached scripts from the worktree with `CODEX_MODEL` and
`STRANGER_MODEL` set and a finished marker per read; on the press pages the stranger
returned in under two minutes, the entailment pass in four and the red team in eight. Each
read writes `checks/audits/<subject>--<slug>-<date>-<read>.md`. The reviewer's entailment
run overwrites the whole-page entailment file the author wrote the same day on a first
draft; it is the second, independent run and the one the patch list cites. A patch
author's own checks are separate files (`...-since-<commit>-entailment.md`,
`...-since-<commit>-referents.md`) and are read beside it. Two items on every list so far were the same across both authors on one
record (a KPI whose meaning arrives later on the page, and a "why it matters" sentence the
stranger had to assemble): expect the stranger and the red team to converge on the opening
number.

A patch item quotes what the pin says and where, never a suggested framing. The sol press
list asked for a witness sentence to "open with the referent", the letter's allegation; the
grok page had done exactly that and the red team called it Critical, because the witness
spoke about other inquiries. Give the author the pin lines and the class, and let the
sentence follow the record. What a record says appears in the list only inside quotation
marks, and the list is sent only after the check passes:

```bash
node skills/catch-event-page/scripts/patch_quotes.mjs <subject-slug>/<slug> <dispatch dir>/<round>.prompt.txt [fetched text of a record the list asks to admit]
```

It finds every quoted span, of any length, in a pinned record, the page, its data
module, the reader model or the working note, and exits 1 on a span found nowhere: that
span is your wording, and the author will write it onto the page as the record's. Patch 2
of the press-ban page described a fact-check in the reviewer's words, dropped its two
hedges, and the author wrote the reviewer's sentence.

Every list opens with the page's size and closes with what must leave: the word count of
the story view's sentences and the longest of them from
`python3 skills/catch-event-page/scripts/voice_lint.py --lengths dist/events/<subject-slug>/<slug>/index.html`,
and for every item that adds a clause the question of what it displaces (a sentence that
now says the same thing, a detail that moves to a detail block). The author reports the
count after the patch. Four rounds on the press-ban page took the narrative from 706 words
to 1,704 and the sentences of 35 words or more from 1 to 9 before any item asked for a
cut, and the stranger's later stalls were mostly sentences earlier patches had lengthened.
An item names the register it wants ("a passage a stranger can hold"), never a number: "under 30 words" produced primer prose in round 5.

Read a grok page for its measured gaps before the reads return, at the bytes, and put
what you find on the patch list with the pin lines. On the press-ban page (2026-09-24,
skills 3.5) the grok author, against the gpt-6-sol author on the same record: put three
bare surnames in the dek where the reader model's dek had a count; spread the sequence
(ban, denials, letters, deadline) over four sections with no sentence carrying it in
order; wrote the reader model's C "unmet" gap line onto the page as the unknown ("the
opinions read give no date for an earlier ban") where one web search found the
fact-checkers calling the ban unprecedented; dropped the judge's 2018 Acosta order, which
the president's own post named, because the reader model graded it D; and put two cards
on one actor's one point. What it did better than sol: defined the term the opening figure
leans on in the first paragraph, carried a second catch (the letter's cited articles were
not all by pass holders), the government's reserved challenge to the 1977 precedent, and
the reach of the pool feed. Skills 3.6 binds each gap as a rule (`catch-story`,
`references/writing.md`); the reviewer still checks the five at the bytes on every grok
page until a run shows the rule held.

Resume the author's own session for the patch (`codex exec resume <session id>` from the
story log's `session id:` line; `grok --resume <id>` with the id from
`~/.grok/sessions/<encoded worktree path>/`), so the author patches with its record read
still in context. The reads run again on the patched commit. Rounds are not capped; the
round after the first report with no new Critical or Major finding is the last, and what
remains is held or cut, not patched again. Then decide on the page as it stands: cut a
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

Write every direction in a patch list as the exact sentence or the exact fact you want on
the page. Authors transcribe a reviewer's paraphrase: "more people were working in
September" and "the Fed has decided nothing since September 16" went onto the jobs page
word for word from a list (2026-10-03) and both overstated their records. Split a quoted
page passage into one quotation per sentence, and do not put commit messages or error text
in quotation marks; `patch_quotes.mjs` refuses a quotation it cannot find.

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

The measured run on a new subject (the White House press ban, 32 records, 2026-09-24):

| Turn | Length |
|---|---|
| Record, gpt-6-sol | 42 min |
| Completeness audit, gpt-6-sol | 10 min |
| Structure, gpt-6-sol | 7 min |
| Story, gpt-6-sol and grok-4.7 in parallel | 49 and 56 min |
| Three reads per page, in parallel | 5 and 7 min |
| Patch, gpt-6-sol and grok-4.7 | 11 and 15 min |
| Stranger reread of the patched page | 2 min |
| First dispatch to the first resting page | 143 min |

The reviewer's hands between turns came to about 25 minutes of that, most of it the
label rename and the finish run by hand that step 5 now prevents. The reviewer's own
decision after the reread is a commit in the worktree by explicit path (the cut sentence,
the held list, the read reports as `.md`, never the `.log` files) with a `review:` message,
so the resting commit carries what was decided and why.

## Gotchas

- A maintenance run (`news-state-maintain`, every two hours at half past) holds the state
  while it works. The label rename (`state event-op`) and the one-event view refresh
  (`state refresh-views --event`) do not need its lock and run during it (three renames on
  2026-10-03 each reached the views in about 14 seconds mid-run). `state export --event`
  and a full `refresh-views` with no `--event` are refused with `maintain_fire_mismatch`
  until the run ends.
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
