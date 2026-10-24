---
name: catch-story
description: >
  Stage two of a Catch story: write the story page from a finished catch-record brief, as
  one thread a stranger can follow, laid out in layers they can stop after or dig into,
  every sentence citing the claims it states from the record's claim ledger, then check it
  with a thread read, a cold retell and the bind check and revise with the human until it reads. Use when writing, rewriting or revising the prose of
  a Catch story page, when a page reads as a dump of facts, or when the human gives notes
  on a story's wording. Requires the record brief from catch-record.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "1.0"
---

# Catch story

You write the page. The record is done: the brief at `checks/records/<story>.md` holds
the story in five sentences, the plan, and every fact with its source, and the claim ledger
at `checks/claims/<story>.json` holds every fact the page may state, already checked against
its records. Your job is to
tell that story so a person who has never heard of it can follow it from the first line to
the last, stop at any layer with a true picture, and dig in where they want to.

A page that holds every fact and tells no story has failed. The facts serve the thread.
What does not move the thread goes one click down, where the reader who wants it finds it.

Paths: `<story>` is `<subject>--<slug>`. The page is
`src/pages/events/<subject>/<slug>.astro`, its numbers live in
`src/data/<subject>-<slug>.mjs`, its sources in `checks/manifests/<story>.json`.
`assets/example-page.astro` and `assets/example-data.mjs` are a finished page in this
form; read them before writing. Their citations name records directly, from before the
ledger; yours cite claims, as `assets/example-claims.md` shows.

## 1. Agree the story with the human

Read the whole brief and the ledger. Then send the orchestrator the five sentences and the
plan as they will shape the page, show the human the same, and say what the story is in
plain words: who it happens to, what changed, why now, what is in dispute, what comes next.
Write when the orchestrator gives the word; it decides for the human unless the human
answers first. A wrong angle costs a sentence here and a rewrite later.

## 2. Write it in layers

Write from the plan, not the brief. Draft each layer in your own words, saying what you know
the way a reporter who has read everything would say it, then cite each sentence's claims:
`<Cite c="<claim id>" />` carries the claim's records. The record is what lets you say
"since the war with Iran began in February, U.S. diesel has risen by more than half" in one
clause; it is not a list of things to mention. A claim's being in the ledger is never a
reason to use it. There is no word budget: a paragraph is there because it is a step in its
layer's chain, answering the question the paragraph before it left, and one that answers
none is cut. A question the plan does not answer, or a fact the ledger lacks, is a plan
change: send it to the orchestrator; on its word, add the claim to the ledger and check it
(`catch-record` step 10) before the page cites it. Do not answer it on the page yourself.

The page reads top to bottom as the inverted pyramid: the top tells what happened, and
each layer below goes deeper into one part of it, true enough to stop after. These are the
layers a story can have, not a form to fill: use the ones this story has, under headings in
its own words ("One man's case", "Who still owes barrels"), and leave out any with nothing
to tell. Every story has What happened.

1. **What happened.** Three paragraphs, in plain words: the event, what it means for
   the people it touches, and where it stands. A reader who stops here knows what happened
   and why it matters to them. A dispute or a catch is named at most, as plain fact, and
   told in its own section; no side's claim is quoted or argued here.
2. **The story in order.** The people it happens to, step by step. Open on who they are
   and what happened to them, not on the institution.
3. **Why now.** The dated chain, opening on the motive the actors themselves state, with
   each actor's own reason attributed.
4. **The sides.** Each side's reading under its own label, stated as that side would state
   it, with its reasons. What they agree on.
5. **The Catch.** What coverage or a common reading gets wrong, and what the dispute
   actually turns on. Lead with the one thing a reader most needs to not misread.
6. **What the coverage got right and wrong.** Only when the coverage is worth grading:
   outlets told the event's central facts differently, or a widely carried report would
   leave its readers with the wrong picture. One `OutletCheck` card per outlet whose report
   changes what a reader should trust: its words, the verdict (`chip`: "checks out",
   "mislabeled", "consistent"...), what the record shows, and the `Cite` in the card's slot;
   errors first. Reports that check out the same way fold into one `OutletCheckFold` with
   the count and how they were checked. The one error a reader most needs is the catch,
   not a card. With nothing worth grading, the section is absent. Example:
   `src/pages/events/mail-voting/2026-09-14-court-denies-stay.astro`.
7. **What happens next.** What is scheduled, what the outcome will and will not settle.
8. **The records.** The site builds this from the manifest.

Each section holds the thread. What a section needs only to be exact (a transfer between
courts, a docket number, a filing line by line) goes in a one-click detail
(`<SourcedBlock ... detail>`) under the paragraph it qualifies. Cite it there. A timeline,
comparison or figure the reader needs to follow the section is not detail: it is shown in
the story, next to the paragraph it serves.

Show it. Where a section's answer has a shape (dates in order, two things side by side,
parts of a whole, a number against what came before, someone's own words), draw it, and let
the prose say why and what it means. A screen of prose with nothing to look at loses the
reader; a visual that only repeats the paragraph beside it is noise. When you draft each
section, decide what the reader sees there as well as what they read. The components, which
question each answers, and how to draw what none covers: `references/visuals.md`. A table
cell or timeline label that states a fact is its claim's `short` form
(`claim("<story>", "<id>").short`, from `src/lib/claims.mjs`) and cites the claim; a
timeline entry cites it as `cites: [{ c: "<id>" }]`. A cell is the most compressed text on
the page, and the place a "may" most often becomes a "will".

The headline is a news headline a reader would click, not the story's claim written out:
the event and, where it fits, the catch, in about twelve words or fewer, active, concrete,
with no attribution tail ("…, officials say") and no hedge. It stands alone for a reader who
knows nothing yet: no reference that only the story explains ("March's pledge", "the ruling",
"the deal"). Every word holds on the record.
Three that failed on one story: "G7 will release 100 million barrels over four months and
does not say how much is beyond its March commitments" (a sentence from the brief); "…comes
from oil already promised in March" (states a plan as done); "…is meant to finish March's
pledge" (what pledge?). The headline is yours and never frozen,
including one the human picked: change it whenever it is wrong, overstated, or a better one
holds on the record, including when a reviewer's finding against it is right. Rename the
label to match (section 4) and report it.

The dek under it does one job: the one fact a reader needs that the headline leaves out.
One sentence, two numbers at most. A contrast or a side's claim whose point only the body
explains goes in the body: "The White House calls the G7 release 100 million barrels of
European diesel" in a dek told the reader nothing and seeded a misreading.

## 3. Write like a reporter

The unit is the paragraph: each one says one thing in the story. The unit of citation is
the sentence: every sentence that states a fact ends with the `<Cite c>`s for the claims it
states, not a paragraph-end cluster covering the sentences before it. A sentence states its
claims and nothing more; a sentence may join several. Just the facts lists, under each
paragraph, the claims it cites in the ledger's words, so a fact sentence without its own
citation drops out of it. Only a sentence that states no fact of its own ("That matters
because...") stands uncited.

A claim's status and scope are part of the fact, not a hedge on it. "France signalled it
could add 2 million barrels" is the fact; "France offered 2 million barrels" is a different,
false one. Say a claim with the record's verb (signalled it could, plans to, may submit, is
expected to, says, accuses) and its scope (at their October 5 meeting, of the referrals made
public, as of October 7), once, plainly, in the sentence that states it. A hedge is the
writer's own doubt laid over a fact ("appears to", "it seems", "reportedly" on a fact the
record states outright); cut those. Most dropped qualifiers reach a page through a rewrite,
a voice pass or a table cell, so reread each claim's status after every one.

A paragraph is told, not listed. Sentences carry how the facts relate: what caused what,
what came after, what it costs whom, where the sides collide. A run of short sentences
that each state one fact and stop reads flat however accurate it is; join the facts a
reader needs joined, and let the rhythm vary the way a good news story's does.

- Say it straight, in active voice, with the actor first. "The government appealed," not
  "An appeal was filed."
- Use transitions. The reader is following a sequence; tell them when something happens
  next, because of what, and against whom.
- Name the people and what they did. Readers care what each side thinks and why, not
  which court or which number. "Most judges ruled..." before "nine circuits".
- Give opinions, motives and readings as somebody's, in their words or close to them. The
  page states facts itself and names a speaker only for a claim. "The IEA said", "analysts
  said", "two diplomats said" on a fact nobody disputes is evidence on display, not
  reporting; the citation carries the source.
- One sentence can rest on several records. When four officials make one point, write the
  point once and quote the one whose words matter. A quote earns its place by its words,
  not by its speaker's rank; most points need none.
- Quotes are the source's exact words. Do not name the outlet in prose; the citation
  carries it. "The Guardian described it that way" is the exception: when the outlet's
  wording is the subject, as in the catch.
- When the story names an event the site has already covered, link the words that name
  it to that story: "raised rates 12 to 0 on September 16" opens the September rate story.
  Link the event itself, never "our story" or "as we reported". The covered events are the
  pages under `src/pages/events/<subject>/`; check the subjects this story touches before
  you finish a draft.
- Explain a term once, where the sentence leaning on it would otherwise be misread, as what
  it means in this story ("seeking admission, which means asking to come in").
- Cut every sentence that only says the obvious, restates, hedges or announces: "The Court
  has not ruled." "It is worth noting." "The government does not dispute that finding."
  If the fact matters, state it as a fact in the sentence it belongs to.
- Say each thing once. When you add a visual, cut the prose it now carries: a table of
  what each record says replaces the paragraph listing them, a timeline replaces the
  paragraph of dates, a steps table replaces the paragraph of deadlines. The dek and the
  opening do not repeat each other, and a point made in What happened is not made again
  as a section's opener.
- After moving or cutting a sentence, reread the one after it: a pronoun ("its letter",
  "it will ever see") must still have its noun in reach.
- When a side's claim and the record seem to collide, say how they fit in one sentence
  ("The letter does claim the promises lowered her rates, but gives only the typical gap,
  not her own"), not as a claim and a contradiction the reader has to reconcile.
- Attribute once per paragraph and let the rest stand: "her lawyers say" opens it, and
  "they note", "by their account", "they say" do not follow on every sentence after.
- Legal and procedural phrasing ("while covering doubts about her integrity", "her signing
  of the mortgage as her primary residence") is rewritten into what happened and who
  decided it.
- No em dashes. Numbers from the data module, never typed twice.
- Read WRITING.md and the AI-writing tells at
  https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing before the first draft and
  again before you show the human.

## 4. Build and lint

```bash
npm run build      # the full build; never astro build alone, it skips the record pages
zsh skills/catch-story/scripts/voice_lint.sh dist/events/<subject>/<slug>/index.html
node skills/catch-story/scripts/lens_lint.mjs src/pages/events/<subject>/<slug>.astro
node skills/catch-story/scripts/quote_lint.mjs src/pages/events/<subject>/<slug>.astro
```

The build runs the gate. Every failure is a defect on the page, fixed on the page. The
voice lint ends with a sentence-length profile; read the longest sentences and split the
ones a reader would stall on.

Then look at the page the way a reader will, in each mode at desktop and phone width:

```bash
python3 skills/catch-story/scripts/page_shots.py <served page url> /Volumes/4/tmp/<story>/shots
```

It writes a full-page screenshot per mode and width, emulating a real phone, and exits
non-zero when anything runs wider than the screen. Read the shots. Look for a stretch of prose with
nothing to look at where the answer has a shape, a visual that is hidden or cramped, and
anything that renders wrong (stray marks, broken numbers, an empty section). Each is a
defect, fixed before the reads.

The page needs a published state event before it builds, and the build fails when the
page's `<h1>` differs from the event's label. The orchestrator accepts the event and stages
it (`catch-orchestrate`); the label is yours. Each time you set or change the headline,
rename your own event's label to it, exactly, then build:

```bash
cd /Volumes/4/CF/sai
PYTHONPATH=src .venv/bin/python -m sai.cli state event-op --state-dir /Volumes/4/CF/catch-state \
  --op rename --event <your event id> --author <your session name> --reason "<what changed>" --label "<exact h1>"
PYTHONPATH=src .venv/bin/python -m sai.cli state refresh-views --state-dir /Volumes/4/CF/catch-state --event <your event id>
```

This is the one write to catch-state an author makes, and only for its own event. Send the
orchestrator the new headline and why in the same turn; it or the human may send it back. Before you report
the page done, fill the manifest's `completed_by`, `steps`, `figures` and `sub_events` and
update the subject page, as `catch-orchestrate` section 4 lists; the orchestrator will not
publish without them.

## 5. Read it cold, then bind it

```bash
zsh skills/catch-story/scripts/thread.sh <story> <N>      # N = 1, 2, ...
zsh skills/catch-story/scripts/reads.sh <story> <N>
python3 skills/catch-story/scripts/bind.py <story> <N>
```

The reads are for the reader; the bind check is for the facts. The thread read comes
first: a fresh reader (Haiku) reads the story one paragraph at a time, never seeing what
comes next, and after each says whether it answered the question they had, whether they
could see why it came now, which words lost them, and what they want to know next. A fresh
reader (Claude, no context) then reads the whole story once and retells it in five
sentences.

The bind check reads every block of the built page against the claims it cites, and only
the blocks that changed since they last passed: does the block say what its claims say, no
more, with each claim's status, scope and speaker? Sonnet reads each changed block, and Opus
reads again each one that cites a claim with a load. A finding on a claim with a load, or a
fact no claim holds, must be fixed; one on a background claim is listed for you to judge. It
ends `BOUND` or `NOT BOUND` and takes about a minute, so run it after every build that
changes the page's text, including the fixes the human's notes bring. The page publishes
only when every block that cites a claim has passed as it reads now (`publish.sh` checks),
so there is no round limit to count: an edit is checked when it is made.

The thread read is one reader's reactions, not a list of orders: you are the reporter, and
you judge each flag against what the story needs. Where a break is real, the fix is never
inserting text where the reader stalled:
- A question the reader carries unanswered through several paragraphs of one section: the
  section answers it too late. Answer it where the section raises it, or say there that
  nobody knows yet. A question What happened raises is answered by the section about that
  thing, not by pulling the answer into What happened.
- A section the reader calls a repeat retells the top instead of going deeper. Start it
  where the top left off.
- A paragraph the reader could not place: it is not the next step. Move it to the step
  whose question it answers, or cut it.
- Words that lost the reader: say it in plain words.

Compare the retelling with the brief's five sentences. Where they differ, the page failed
to carry that sentence: fix the paragraph that should have carried it. Every stall the
reader quotes is fixed in the sentence or the sentence is cut.

A bind finding is checked against the claim's own words before you act on it; the checker
misreads too. One that holds is fixed in the sentence: it says what its claims say. When the
sentence is right and the ledger lacks the fact, that is a plan change, not an edit. A
finding names a problem; you write the fix, in the page's voice.

A finding in any read that needs a fact the plan does not hold is a plan change: send it to
the orchestrator with the answer and its record, and add it only on its word, as a claim
checked in `catch-record` step 10. Stage two does not grow the story.

The order matters for the reader reads, which cost a run each and draw new findings on every
rewrite: look at the page (section 4), run the thread read and the retell, fix, and then
send it to the orchestrator for its read and to the human for theirs, before a second
thread read and retell. Two rounds of the reader reads, then the human. After round 2, fix
only what changes what a reader takes away; wording notes go on a list for the human.

## 6. Show the human, in the story viewer

Serve the page and give the human the URL, never markdown:

```bash
npx astro preview --host 127.0.0.1 --port <port>
```

Their notes are the last read. Take each one as the problem it names, not as a sentence to
paste: a note that says a paragraph is unclear asks for the paragraph to be clear, and a
suggested rewrite is a pointer to the problem. Fix every instance of the problem across the
page, not only the one named. Rebuild, run the bind check, and show it again.

## 7. Commit

Commit the page, the data module, the manifest, the ledger and the reads (with
`checks/reads/<story>-bound.json` and `-claims-held.json`, which publish checks) by path
with a `story: <story>` message. Never commit `data/state/`, `src/data/news-records.json` or
`data/sources/news-state/`: the build regenerates them. Commit nothing under `skills/`: a
tool the skill lacks goes to the editor as a note, and the skill changes on its own branch,
so the story branch never carries a second copy of it.

## Gotchas

- `astro build` alone skips `build-news-records.mjs` and the gate then fails on another story's record page. Use `npm run build`.
- A passage holding an em dash cannot be printed. Cite and quote the clause on either side.
- The gate fails a timestamped absence ("As of October 5, no one has..."). State what is true instead ("The Court has not acted on that petition") or cut it.
- A page whose story has a ledger fails to build on any `<Cite s=... passage=...>`: cite the claim (`cite_needs_claim`). An unknown claim id fails as `claim_unknown`.
- A detail block cannot hold the only statement of a fact a story paragraph depends on; the story paragraph must stand without it.
