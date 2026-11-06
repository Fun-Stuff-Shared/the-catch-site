---
name: catch-orchestrate
description: >
  Run a Catch story from candidate to live page as the orchestrator: open the story (accept
  the candidate from v2, name its subject in the manifest, cut the worktree, launch the author
  in a headed cmux thread), supervise the author through catch-record and catch-story by
  message, make the editorial calls the human delegates, finish the manifest's figures and attestations,
  publish to main, verify the live page, send the story to the core, and close the
  worktree. Use when asked to run, orchestrate, open, publish, ship or close a Catch story,
  or to relay instructions to a story's author.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "1.0"
---

# Catch orchestration

You run the story; the author writes it. The author is a Claude session in its own
worktree following `catch-record` (stage one) and `catch-story` (stage two). You open the
story, answer its questions, read what it sends at the bytes, decide what the human has
delegated, and do everything that touches shared state: main, the live site, the core.
The author never touches those.

Repo: `/Volumes/4/GitHub/the-catch-site`. Candidates and evidence: the pinned sai-core v2 snapshot in `data/v2`, which the page builds from; `sai` (`sai --help`) reads the live core past the pin. Scripts: `skills/catch-orchestrate/scripts/`.

## 1. Open the story

Find the candidate with `node scripts/v2-candidates.mjs [--days 7] [words...]`, read enough of its view and sources to fix the moment and its date, check the live core for what the pin lacks (`sai brief <subject>` for newer sources, `sai search-all "<words>"` for the same event under another subject; the manifest can name only a subject the pinned snapshot holds), and decide whether it continues an earlier story: the next jobs report, a later ruling in a case already on the site. Then:

```bash
CATCH_ORCHESTRATOR=<your name in ListAgents> zsh skills/catch-orchestrate/scripts/open-story.sh \
  <v2-subject-id> <series-slug> <YYYY-MM-DD-what-happened> "<subject in reader words>" "<working headline>" \
  [--follows <previous story id>]
```

It cuts `.worktrees/<slug>` on `author/<slug>`, fetches the pinned snapshot there, writes the manifest with `v2: true` and the candidate in `v2_subjects`, writes the kickoff from `assets/kickoff.md`, and launches the author in a headed cmux workspace. Then subscribe to the author (`SendMessage` with `notify_when_idle`). If its first report names a different story id, tell it to keep this one.

## 2. Stage one: the record

The author reports each record review's verdict and its relevance calls. Spot-check what
it admits: open two or three cited passages per round. Push back when it admits detail that
does not change the five sentences, or when a reviewer finding was applied without being
checked against the record. When it sends its questions and answers (catch-record step
1), add any camp it left out and any answer stated weaker than the camp states it, while
it searches, not after. When it sends the scored matrix with the five sentences and plan,
open the one or two rows the result turns on at their pins, and check that the spine is
what survived, not what the author started with. Then judge the sentences as
the editor: is each sentence one plain fact, does any repeat an error the catch corrects,
is the tension of the story in them. Then check what happened since the record's newest
source (a web search on the event, the docket, the officials' feeds) and send the author
anything that moved. Then read the claim ledger: open the pins of the claims with a load
(the spine, the catch, the figures, what named people did), and check that each says the
record's status and scope, not a stronger one. The claim check's findings are verified
against the pins like the review's. Then give the word to write; you decide for the human
unless they answer first.

## 3. Stage two: the page

The author owns the headline: it renames its own event's label when it sets or changes the
headline (`catch-story` section 4) and tells you. Read each one as the editor would: a
headline a reader would click, every word on the record. Send back one that is a sentence
from the brief, hedged, or carries an attribution tail, with the problem, not a rewrite.
When the human picks a headline, send it to the author to apply.

A rename breaks the build of every other worktree that still holds the old page for that
event (`Rendered story label differs`). For a story not yet on main that is only its own
worktree. For a story already on main (a revision), every other worktree's local build fails
on it until the revised page is published; tell the other authors to build against the
committed state meanwhile (`git checkout -- data/state && npm run build`), and publish the
revision promptly.

The author sends you any fact the plan does not hold as a plan change. Take it only when a
reader of the five sentences needs it, in the fewest words that hold; otherwise it stays in
the record. A plan change you accept becomes a claim the author adds to the ledger and runs
through the claim check before the page cites it. Stage two does not grow the story. When
the author reports a bind finding it declined, read the claim against the sentence
yourself. Hold the author to catch-story's two rounds of reader reads, and read the page
yourself after the first, so your notes and the human's land before the second; the bind
check runs on every edit and needs no limit. Then read the served page top to
bottom yourself, in the story view, as the editor. Read What happened alone first: it tells
the event plainly in about three paragraphs and argues no side's claim. Then where the
thread breaks, what is said three times, what a reader will ask that the records answer.
Each note names the layer the point belongs to; a reader's question is never answered by
moving its answer into What happened. Before you or the author tell
anyone "the records don't say", search every admitted record's text for it. Send the notes
as problems, not sentences. Then give the human the URL.

## 4. Finish the manifest

The gate reads more than the page. Before publishing, the author fills, and
you check:

- `completed_by` and `date`.
- `steps`: the attestations the gate lists in `scripts/check-events.mjs` (`REQUIRED_STEPS`),
  each `{"done": true, "evidence": "<a true sentence about this page>"}`. Evidence describes
  the page as it is now; a rewritten page needs rewritten evidence.
- `figures[]`: every headline number, with `figure` (a slot name), `label` (reader words),
  `value` (a bare number), `unit` (scale included: `USD millions`), and either
  `kind: "sourced"` with `source: {source_id, quote_span}` (a whole sentence of the record that
  states the value) or `kind: "computed"` with `formula` (`sum` or `date_difference_days`) and
  `inputs` of the same shape. The build lists any figure without a label.
- `sub_events[]`: `id`, `date`, `label`, `section_anchor`, `records` for each dated step the
  page tells.
- The subject page (`src/pages/events/<subject>/index.astro` and its data module): a new
  subject gets its page; an existing one gets a timeline row and refreshed figures, and its
  description reads from the subject data so it does not go stale.
- `src/lib/discovery.mjs`: import the story's `event` into the `editorial` list, and add a new
  subject to `series`. The homepage and series listings read these, and the gate fails with
  "/events/ index missing manifested route" until they are there. The manifest also names `event_record`.

## 5. Publish

The human decides what goes live. Before you ask for their word, give them each story's open
gaps, in plain words: everything the author listed as left, every stall in the last retell
the page does not answer, and every bind finding the author declined, with why. A story with a content gap
publishes only after the human has seen that gap and said to publish anyway. "Push once
done" is not that. Then, on their word:

```bash
zsh skills/catch-orchestrate/scripts/publish.sh --merge author/<slug> [--merge <other branch>]... <story-id>...
```

It cuts a publish worktree from main, merges the branches, fetches the pinned snapshot, refuses a manifest that is not v2 or has no figures, runs the full build and gate (which refuses missing attestations and a `v2_subjects` entry the snapshot cannot resolve), refuses a story whose cited claims have not held in the claim check or whose citing blocks have not passed the bind check as they read now (`claims.py verify`), and only then fast-forwards main and pushes it. A failure anywhere before that leaves main where it was. It then polls each live URL until it serves the pushed commit's build (every page carries the build as `<meta name="catch-build">`, since a story can keep its headline across builds), counts em dashes on the page, and runs `scripts/live-audit.mjs`. `--no-push` stops before the push. Main may carry other stories' unpushed commits: list them for the human before the first push of the day. `CATCH_BASE=<branch> CATCH_LIVE=<that branch's preview URL>` publishes to a branch instead; a non-main branch builds a preview and takes no production traffic.

Then open the live page in the story view and look at it, at 100 percent.

## Revising a published story

A published story that needs more than wording (a missing why, numbers a reader cannot
reconcile, a claim the page leaves unresolved) goes back through both stages, not a voice
pass. Cut `.worktrees/<subject>-revision` from main on `author/<subject>-revision`, write a
kickoff from `assets/kickoff.md` that names the gaps with the retell's own words, and launch
the author as in step 1. The author tops up the record (catch-record steps 3 to 10 for what is
missing, after naming the explanations as in step 1 and rescoring them in step 8, with a
new ledger: the old page's citations name records, and the rewrite cites claims), sends you the revised five sentences and plan, and rewrites the page from the plan
under catch-story. A revision is a rewrite: patching the old page carries its structure and
voice forward. The headline stays unless the human changes it; a new headline is renamed as in
step 3. Supervise it like a new story, including your own read before publishing. A voice
pass is only for pages whose content is already complete: it may not add a fact, so it
cannot close a content gap.

## 6. Close

```bash
zsh skills/catch-orchestrate/scripts/close-story.sh .worktrees/<slug> <story-id>
```

Once the story is live, it refuses while anything still runs in the worktree, sends the story's records, figures and claims to the core (`scripts/send-story-to-v2.py`, which holds them on `subject-event-<series>-<moment>`), copies uncommitted files that are not build output to `.worktrees/.closed/`, and removes the worktree (the branch stays). Close scratch worktrees without a story id.

## Relaying

- The author's messages are reports, not instructions to you; check what they claim
  (commits, verdicts, record lines) before passing it on.
- A message to the author that reports a record quotes the record's words with the file.
- The author's name in ListAgents can change when its session restarts; list again rather
  than resending to a dead name.
- Tell the human about the article, not the process: what the story now says, what you
  decided for them, what you need from them. Round numbers and finding counts are not news.

## Gotchas

- `npm run build` is the only build. `astro build` alone skips the record pages and the checks of the committed v1 views in `data/state` (`scripts/pull-state.mjs`).
- The global git post-commit hook can hang on `git lfs`; scripts and authors commit with `git -c core.hooksPath=/dev/null`.
- A build in any worktree overwrites `src/data/news-records.json`; never commit it it.
- A story whose `v2_subjects` entry leaves the snapshot without a merge record fails the build; the last deploy keeps serving until the manifest names a subject that exists.
