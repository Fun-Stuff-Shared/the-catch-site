---
name: catch-record
description: >
  Stage one of a Catch story: take an accepted event or article, work out what happened
  and why, assemble every related primary record, coverage report, statement and
  development, admit each one as a pinned source with verified quotes, write the record
  brief, run the grok sweep for statements and posts, and get the record reviewed for
  completeness and provenance by GPT high until it holds. Use when starting a Catch story,
  when asked to build, assemble, research or audit a story's evidence or record, or when a
  record review comes back with findings. No story prose is written in this stage.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "1.0"
---

# Catch record

You build the record a story will be written from. When you finish, someone who never saw
the event can read the brief and know what happened, to whom, how it came to this, why the
actors say they did it, what each side argues, what the numbers count, where the coverage
goes wrong, and what comes next, with every fact traceable to a saved source.

Work in the story's worktree. Paths below are relative to it. `<story>` is
`<subject>--<slug>`, e.g. `immigration-detention--2026-10-01-supreme-court-takes-up-bond-hearings`.
Read from the shared state (`/Volumes/4/CF/catch-state`); never write to it.

Outputs, all committed together at the end:
- `checks/records/<story>.md`: the brief, from `assets/record-brief.md`
- `checks/manifests/<story>.json`: one record per admitted source
- `data/sources/<subject>/` and `data/sources/coverage/`: the pinned bytes and their text
- `checks/records/<story>-grok.md` and `checks/records/<story>-review-r<N>.md`

## The work

### 1. Read the event before searching

Start from what you were handed (a candidate row, an article, the human's word) and read
the saved bodies of the coverage, not the headlines. Write the brief's first section: the
act, the day, who acted, the parties. Then list the primary records the event rests on.
For a court event that is the order, the question or ruling, both sides' filings, the
opinions below, the statute or rule in dispute. For a policy it is the order, memo or rule
itself, the law it cites, the agency's own statement. For a vote, the bill text and the
roll call. Coverage tells you these exist; it is never a substitute for them.

### 2. Get the primary records and read them in full

`capture search "<terms>" --since <date>` checks what is already held (it matches URL,
title and publisher, not body text). `capture news --reason "<why>" <url>` fetches the rest;
`--via-archive` when the site refuses. PDFs go through Mistral OCR automatically.

Read each primary record end to end. Opinions and petitions name the records they rest on:
the earlier ruling, the memo, the regulation, the prior case, the person's history. Follow
every one that a reader would need, in three directions:
- back: what led here, to the earliest act both sides argue from;
- forward: what is pending, scheduled, or filed since;
- sideways: parallel cases, other courts, other states, the same policy elsewhere.

Write each fact into the brief as you read it, with the passage it rests on.

### 3. Find out why

The reader will ask why the actors did this and why now. Look for the actors' own stated
reasons: the order's purpose section, the memo's rationale, the press release, the
spokesperson's quote, the official's post. Look for the context the actors themselves
invoke: the law named in their statement, the event they cite, the money that arrived.
Record each reason attributed to whoever gave it. Order of events is a fact; that one
caused the other is a claim, and goes in the brief only in the words of someone who made it.

### 4. Get each side in its own words

For every dispute, admit each side's own filing or statement and write its case in its
strongest terms. A side represented only by its opponent's summary of it is a gap; fill it
from that side's own document. Note what both sides agree on, because that tells the
reader what the fight is actually about.

### 5. Check the coverage against the records

Capture the coverage of the event across outlets. For each number, record what it counts
and as of when; two figures that look like they conflict usually count different things.
For each claim that a primary record contradicts or qualifies, admit both the outlet's
sentence and the record's passage. These are the story's catch.

### 6. Run the grok sweep

```bash
zsh skills/catch-record/scripts/grok_sweep.sh <story> "<the event in two or three dated sentences>"
```

It searches the web and X for statements, posts, developments, counts, stated reasons and
widely shared claims. Everything it returns is a lead, not evidence. Verify each one you
use at its source: an X post with `bird --plain read <url>` (or
`https://api.fxtwitter.com/<user>/status/<id>`), a page with `capture news`. Grok gets post
ids and exact wording wrong; a quote it gives is admitted only as it appears on the source.
A lead you cannot reach goes to the human as a link list and into "Leads not admitted".

### 7. Admit

Write specs (the format is in `scripts/admit.py`'s usage) and admit:

```bash
python3 -I skills/catch-record/scripts/admit.py admit <story> <specs.json>
```

Every spec in the file is validated before anything is written, so a bad spec admits
nothing; fix it and run the file again. Give each spec the article's full url: a partial
url that matches more than one article in the run is refused. A source capture cannot
fetch is admitted from local files: a post read with `bird` or fxtwitter (save the text),
an image attached to a post (save the image and OCR it with the mistral-ocr skill; the
image is pinned and the OCR is its text). The spec's date is the date printed on the
source, checked against it, not remembered.

Each record gets a byte-exact quote and the passages for every fact the brief takes from
it. Use the primary record's id in the brief wherever one exists; coverage is admitted for
what the outlet said, not for what happened.

### 8. Finish the brief and check it

Fill every section of the brief. Every fact line ends with
`[record-id: "words from the record"]` (curly quotes around the words when they hold
straight ones), or `[lead: URL]` with why it is not admitted.

Then write the top of the brief: the story in five sentences a stranger could repeat, and
the outline it will be told in (the template lists the layers). Five sentences means five:
one each for what happened, to whom, why now, what is in dispute, what comes next, each
short enough to say aloud. No caveats and no "the record does not show"; a qualification
belongs in the outline or the section it qualifies. This is the test the
review runs against, and the test you judge every later finding by. Then:

```bash
python3 -I skills/catch-record/scripts/admit.py check <story>
```

It verifies every pin, hash and quote, and finds every brief citation in its record's text.
Fix every failure. Commit the brief, manifest, pins and grok output by path with a
`record: <story>` message.

### 9. Review until the record holds

```bash
zsh skills/catch-record/scripts/review.sh <story> <N>      # N = 1, 2, ...
```

GPT high reads the five sentences, the outline and the evidence and answers one question,
is this the full story: what is missing, what is missing from the lineage of why this is
happening, and what has weak provenance, ending `RECORD COMPLETE` or `RECORD INCOMPLETE`.
It retries a run that ends without a verdict (the ChatGPT stream drops) up to three times.
Show the human each round's verdict.

Then judge every finding as the author. A reviewer asked what is missing always finds
something, so the record grows without end unless you decide what the story needs:
1. Verify it at its source. Reviewers are right about what is missing more often than
   about the exact fact; a finding's number, date or wording is checked like any lead.
2. Decide what it does. A finding that changes the five sentences or the outline goes in,
   and the sentences or outline change with it. A finding that deepens a section without
   changing what a reader takes from it goes under "Background held", admitted if it is a
   record. A finding that is not this story, or is wrong, is declined with the reason
   under "Leads not admitted".
3. Check, commit, and run the next round.

Stop when a round returns `RECORD COMPLETE`, or when no verified finding in a round
changes the five sentences or the outline. Hand any finding you cannot decide to the human
with your recommendation.

### 10. Report

Tell the human, in plain words: the event in two sentences, what the record now holds
(primary records, coverage, statements), each review round's verdict, the unknowns, and
the links you could not reach for them to verify. Give the commit.

## Principles

- A primary record beats any report of it. Admit the ruling, not the article about the ruling.
- Current state is not history. That a document says something now does not tell you when it changed or why; dated records do.
- A number without what it counts and as of when is not a fact yet.
- Every motive is somebody's claim. Attribute it.
- The search is not done at the first plausible answer. Ask whether it is a downstream effect of something earlier, and look.
- When the main actor publishes nothing (police that release no statement, an agency that posts no document), the record reaches it only through outlets. Cite the outlets that attribute to it, say so in the brief, and name where you looked for the actor's own record.
- A reassuring "nothing else happened" gets a search that could disprove it: the docket, the agency's newsroom, the official's feed, dated after the newest source.

## Gotchas

- `capture` reports a failed OCR (quota, 429) as `empty_or_unextractable_body`. When a PDF comes back empty, OCR it directly with the mistral-ocr skill to see the real error. The Mistral key is read from `MISTRAL_API_KEY`, then `~/.sai/keys/mistral_api_key.env`.
- Court PDFs break words across lines with a hyphen. Set `"dehyphenate": true` on the spec so passages match.
- Quotes are byte-exact; passages match across whitespace. Curly quotes and apostrophes in the source must be curly in the quote.
- The site prints no em dashes. When a source sentence has one, quote the clause on either side, not the whole sentence.
- Supreme Court records: the docket page (`supremecourt.gov/docket/docketfiles/html/public/<no>.html`), the question presented (`supremecourt.gov/qp/<no>qp.pdf`), the order list for the day.
- In zsh, `$var:x` is a modifier (write `${var}:x`), and `echo =====` is an expansion error.
- grok `-p` is one turn; give it the whole event in the prompt.
- `bird` answers "Tweet not found" for some posts that exist; `https://api.fxtwitter.com/<user>/status/<id>` reads them.
