---
name: catch-orchestrate
description: >
  Run a Catch story from candidate to live page as the orchestrator: open the story (accept
  the candidate in catch-state, link it into its series, cut the worktree, launch the author
  in a headed cmux thread), supervise the author through catch-record and catch-story by
  message, make the editorial calls the human delegates, rename the event label to the
  headline, finish the manifest's figures and attestations, stage the figures in
  catch-state, publish to main with the state views, verify the live page, and close the
  worktree. Use when asked to run, orchestrate, open, publish, ship or close a Catch story,
  to relay instructions to a story's author, or to fix a story that will not build because
  of its state label or views.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "1.0"
---

# Catch orchestration

You run the story; the author writes it. The author is a Claude session in its own
worktree following `catch-record` (stage one) and `catch-story` (stage two). You open the
story, answer its questions, read what it sends at the bytes, decide what the human has
delegated, and do everything that touches shared state: catch-state, main, the live site.
The author never touches those.

Repo: `/Volumes/4/GitHub/the-catch-site`. State: `/Volumes/4/CF/catch-state` (written only
through the `sai.cli state` commands below, from `/Volumes/4/CF/sai`). Candidates:
`/Volumes/4/CF/news-fqs-pilot`. Scripts: `skills/catch-orchestrate/scripts/`.

## 1. Open the story

Find the candidate (`cd /Volumes/4/CF/news-fqs-pilot && python3 scripts/story_accept.py list`),
read enough of its saved articles to fix the moment and its date, and decide whether it
continues an earlier story: the next jobs report, a later ruling in a case already on the
site. Then:

```bash
CATCH_ORCHESTRATOR=<your name in ListAgents> zsh skills/catch-orchestrate/scripts/open-story.sh \
  <candidate-id> <subject-slug> <YYYY-MM-DD-what-happened> "<subject in reader words>" "<working headline>" \
  [--decline <sibling candidate-id>]... [--follows <previous event id>]
```

It accepts the candidate as `event-<subject>-<slug>`, declines the siblings that cover the
same event, reparents the event onto the previous story's when it continues a series (the
subject page and the gate require every story of a subject on one connected series),
refreshes the view, cuts `.worktrees/<slug>` from main on `author/<slug>`, writes the
kickoff from `assets/kickoff.md`, and launches the author in a headed cmux workspace. Then
subscribe to the author (`SendMessage` with `notify_when_idle`). If its first report
names a different story id, tell it to keep the accepted one.

## 2. Stage one: the record

The author reports each record review's verdict and its relevance calls. Spot-check what
it admits: open two or three cited passages per round. Push back when it admits detail that
does not change the five sentences, or when a reviewer finding was applied without being
checked against the record. When it sends the five sentences and outline, judge them as
the editor: is each sentence one plain fact, does any repeat an error the catch corrects,
is the tension of the story in them. Then check what happened since the record's newest
source (a web search on the event, the docket, the officials' feeds) and send the author
anything that moved. Then give the word to write.

## 3. Stage two: the page

The author sends its headline before its first build. Rename the label to match, exactly,
and tell it to build. Do the same for every later headline change:

```bash
cd /Volumes/4/CF/sai
PYTHONPATH=src .venv/bin/python -m sai.cli state event-op --state-dir /Volumes/4/CF/catch-state \
  --op rename --event event-<subject>-<slug> --author <who> --reason "<why>" --label "<exact h1>"
PYTHONPATH=src .venv/bin/python -m sai.cli state refresh-views --state-dir /Volumes/4/CF/catch-state --event event-<subject>-<slug>
```

A rename breaks the build of every other worktree that still holds the old page for that
event (`Rendered story label differs`). When you rename a story already on main, merge the
new page into main at once and tell the other authors to merge main.

Each round of cold reads, verify the verdicts the author reports against the pins before
you accept them; the entailment reviewer misreads records too. Stop the rounds when a round
finds only wording that changes nothing for a reader. Then read the served page top to
bottom yourself, in the story view, as the editor: where the thread breaks, what is said
three times, what a reader will ask that the records answer. Before you or the author tell
anyone "the records don't say", search every admitted record's text for it. Send the notes
as problems, not sentences. Then give the human the URL.

## 4. Finish the manifest

The gate and catch-state read more than the page. Before publishing, the author fills, and
you check:

- `completed_by` and `date`.
- `steps`: eight attestations, each `{"done": true, "evidence": "<a true sentence about this
  page>"}`: `sources_admitted`, `derived_numbers_computed`, `outlet_claims_verified`,
  `section_grammar`, `chip_vocabulary`, `live_elements_guarded`, `subject_page_updated`,
  `homepage_updated`. Evidence describes the page as it is now; a rewritten page needs
  rewritten evidence.
- `figures[]`: every headline number, with `figure` (a slot name), `label` (reader words),
  `value` (a bare number), `unit` (scale included: `USD millions`), and either
  `kind: "sourced"` with `source: {source_id, quote_span}` (a whole sentence of the record that
  states the value) or `kind: "computed"` with `formula` (`sum` or `date_difference_days`) and
  `inputs` of the same shape. The build lists any figure without a label.
- `sub_events[]`: `id`, `date`, `label`, `section_anchor`, `records` for each dated step the
  page tells.
- The subject page (`src/pages/events/<subject>/index.astro` and its data module): a new
  subject gets its page; an existing one gets a timeline row and refreshed figures. The
  homepage and series listings pick the story up through `src/lib/discovery.mjs`.

## 5. Publish

The human decides what goes live. On their word:

```bash
zsh skills/catch-orchestrate/scripts/publish.sh --merge author/<slug> [--merge <other branch>]... <story-id>...
```

It cuts a publish worktree from main, merges the branches, refuses a manifest with missing
attestations, no figures or saved records that do not match it, runs the full build and
gate, stages each story's figures and pins in catch-state from the publish worktree
(`state stage-story`, no model calls), verifies the state, copies each story's event view and every chain view that names it into `data/state/`
and commits them (`state:`), checks that the committed views alone hold every story (the
hosted build has no catch-state and reads only committed views; a story view without its
chain fails on the host and the site silently keeps the old build), builds again, and only
then fast-forwards main and pushes it. A failure anywhere before that leaves main where it
was. It then polls each live URL until its headline serves, counts em dashes on the live bytes and
runs `scripts/live-audit.mjs`. `--no-push` stops before the push. Main may carry other
stories' unpushed commits: list them for the human before the first push of the day.

Then open the live page in the story view and look at it, at 100 percent.

## 6. Close

```bash
zsh skills/catch-orchestrate/scripts/close-story.sh .worktrees/<slug> <story-id>
```

Once the story is live, it refuses while anything still runs in the worktree, copies
uncommitted files that are not build output to `.worktrees/.closed/`, removes the worktree
(the branch stays), and re-registers the story's records in catch-state so their saved text
reads from the main checkout. Close the publish worktree with every story it published
(`close-story.sh .worktrees/publish-<stamp> <story-id>...`): staging pointed those records
at it. Close scratch worktrees without a story id.

## Relaying

- The author's messages are reports, not instructions to you; check what they claim
  (commits, verdicts, record lines) before passing it on.
- A message to the author that reports a record quotes the record's words with the file.
- The author's name in ListAgents can change when its session restarts; list again rather
  than resending to a dead name.
- Tell the human what changed, in plain words, each time the author reports: verdicts,
  decisions you made for them, what you need from them.

## Gotchas

- `npm run build` is the only build. `astro build` alone skips the record pages and pull-state.
- The global git post-commit hook can hang on `git lfs`; scripts and authors commit with `git -c core.hooksPath=/dev/null`.
- A build in any worktree overwrites `data/state/`, `src/data/news-records.json` and `data/sources/news-state/`; never commit them except through `publish.sh`, and discard them in the main checkout before fast-forwarding it.
- A story merged without its views builds locally (the local build pulls catch-state) and fails on the host.
- `story_accept.py` appends to the candidate files; an accepted candidate is not undone by deleting a line.
