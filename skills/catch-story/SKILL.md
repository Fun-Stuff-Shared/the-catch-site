---
name: catch-story
description: >
  Stage two of a Catch story: write the story page from a finished catch-record brief, as
  one thread a stranger can follow, laid out in layers they can stop after or dig into,
  with every claim cited on its own sentence, then check it with a cold retell and an entailment read and
  revise with the human until it reads. Use when writing, rewriting or revising the prose of
  a Catch story page, when a page reads as a dump of facts, or when the human gives notes
  on a story's wording. Requires the record brief from catch-record.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "1.0"
---

# Catch story

You write the page. The record is done: the brief at `checks/records/<story>.md` holds
the story in five sentences, the plan, and every fact with its source. Your job is to
tell that story so a person who has never heard of it can follow it from the first line to
the last, stop at any layer with a true picture, and dig in where they want to.

A page that holds every fact and tells no story has failed. The facts serve the thread.
What does not move the thread goes one click down, where the reader who wants it finds it.

Paths: `<story>` is `<subject>--<slug>`. The page is
`src/pages/events/<subject>/<slug>.astro`, its numbers live in
`src/data/<subject>-<slug>.mjs`, its sources in `checks/manifests/<story>.json`.
`assets/example-page.astro` and `assets/example-data.mjs` are a finished page in this
form; read them before writing.

## 1. Agree the story with the human

Read the whole brief. Then show the human the five sentences and the plan as they will
shape the page, and say what the story is in plain words: who it happens to, what changed,
why now, what is in dispute, what comes next. Do not write a page until they agree.
A wrong angle costs a sentence here and a rewrite later.

## 2. Write it in layers

Write from the plan, not the brief. Draft each layer in your own words with the brief
closed, saying what you know the way a reporter who has read everything would say it, then
attach the citations. The record is what lets you say "since the war with Iran began in
February, U.S. diesel has risen by more than half" in one clause; it is not a list of things to mention.
A record's being admitted is never a reason to use it. There is no word budget: a
paragraph is there because it is a step in its layer's chain, answering the question the
paragraph before it left, and one that answers none is cut. A question the plan does not answer is a plan change: send it
to the orchestrator; do not answer it on the page yourself.

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
question each answers, and how to draw what none covers: `references/visuals.md`.

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
the sentence: every sentence that states a fact ends with the `<Cite>`s for that fact, not
a paragraph-end cluster covering the sentences before it. Just the facts is built from the
cited sentences alone, so a fact sentence without its own citation drops out of it, and one
that leans on an uncited sentence before it ("They are what is left...") reads as a dangling
claim there. Only a sentence that states no fact of its own ("That matters because...")
stands uncited.

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

## 5. Read it cold

```bash
zsh skills/catch-story/scripts/thread.sh <story> <N>      # N = 1, 2, ...
zsh skills/catch-story/scripts/reads.sh <story> <N>
```

Three reads on the built page. The thread read comes first: a fresh reader (Haiku) reads
the story one paragraph at a time, never seeing what comes next, and after each says
whether it answered the question they had, whether they could see why it came now, which
words lost them, and what they want to know next. A fresh reader (Claude, no context) then
reads the whole story once and retells it in five sentences. GPT-6 Sol (high), in
ChatGPT Web, checks every paragraph against its cited records: the page and each cited passage
go in the message, and the full text of every cited record goes as an attached file
(`scripts/evidence_pack.py`, built from the rendered page; after the first round the page part
holds only the blocks that changed). It ends `ENTAILED` or `NOT ENTAILED`.

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
reader quotes is fixed in the sentence or the sentence is cut. Every entailment finding is
first checked against the record's own words, because the reviewer misreads records too
(it once narrowed a treaty clause the page had right, and the author applied it in three
places); a finding the record refutes is answered with the record and left out. A finding
that holds is fixed at the record: the sentence says what the record says, or the record
that says it is admitted with catch-record. A finding names a problem; you write the fix,
in the page's voice. Reviewer wording runs to hedges and qualifiers ("defer further
releases pending an IEA assessment"), and pasted in, it turns the page into the reviewer's
prose.

A finding in either read that needs a fact the plan does not hold is a plan change, not an
edit: send it to the orchestrator with the answer and its record, and add it only on its
word. Stage two does not grow the story.

Two rounds, then the human. Round 1 reads the finished page; fix what holds. Round 2 reads
the fixed page; from here fix only what changes what a reader takes away: a wrong number,
actor or date, a claim the record contradicts, a retelling that misses one of the five
sentences. Punctuation, quote-versus-paraphrase and how-broadly-worded findings go on a
list for the human, unapplied. A third round runs only when round 2 found a wrong fact, and
only on the paragraphs that changed. Never more. Every rewrite gives the next round new
text to flag, so the rounds do not converge on their own; a 45-paragraph page always
draws findings. The human's read is the last check.

## 6. Show the human, in the story viewer

Serve the page and give the human the URL, never markdown:

```bash
npx astro preview --host 127.0.0.1 --port <port>
```

Their notes are the last read. Take each one as the problem it names, not as a sentence to
paste: a note that says a paragraph is unclear asks for the paragraph to be clear, and a
suggested rewrite is a pointer to the problem. Fix every instance of the problem across the
page, not only the one named. Rebuild, rerun the reads on what changed, and show it again.

## 7. Commit

Commit the page, the data module, the manifest and the reads by path with a
`story: <story>` message. Never commit `data/state/`, `src/data/news-records.json` or
`data/sources/news-state/`: the build regenerates them. Commit nothing under `skills/`: a
tool the skill lacks goes to the editor as a note, and the skill changes on its own branch,
so the story branch never carries a second copy of it.

## Gotchas

- `astro build` alone skips `build-news-records.mjs` and the gate then fails on another story's record page. Use `npm run build`.
- A passage holding an em dash cannot be printed. Cite and quote the clause on either side.
- The gate fails a timestamped absence ("As of October 5, no one has..."). State what is true instead ("The Court has not acted on that petition") or cut it.
- `<Cite passage=...>` matches the record across whitespace; check the words exist in the record's text before you cite them.
- A detail block cannot hold the only statement of a fact a story paragraph depends on; the story paragraph must stand without it.
