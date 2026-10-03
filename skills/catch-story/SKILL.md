---
name: catch-story
description: >
  Turn three of a Catch story: write the narrative on a record one session built and a
  reader model another session wrote, each sentence from an open passage, in the reader
  model's sections and order; build through the gate, run the lints, the interrogation and
  the entailment check; commit. Also the author's side of each patch round after review.
  Use when dispatched to write or patch a Catch story page.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "3.8"
---

# Catch story turn

You are writing a page a stranger will read in one sitting and a skeptic will audit line
by line. Every sentence traces to a saved record or to arithmetic done from one. What the
page communicates was decided in the reader model; your work is the sentences. It ships
the same day.

Repo: `/Volumes/4/GitHub/the-catch-site` (Astro, static). Build and gate: `npm run build`.
Never push. Never edit a story that is already live. Do not kill, restart, or signal any
process you did not start. This skill's `scripts/` and the shared files in its `references/`
are links to `skills/catch-event-page/`, the pipeline map and the reviewer's process.
Read, in this order, before the first sentence: `references/story.md` (the reader model you
are writing from, concept before qualification, the redundancy budget),
`references/shape-rules.md`, `references/sections.md`, `references/components.md`,
`references/writing.md` (the rules that bind each sentence), `references/anti-patterns.md`
(sentences real reviews cut, by shape). Commands are in
`references/procedures.md`; manifest fields in `references/manifest-and-gate.md`; the
interrogation prompt in `references/interrogation.md`.

## Step 5. Write the story, each sentence from an open passage: turn three

Turn three is a fresh session. It opens by reading the reader model commit (the structure
turn's file), the working note and the built page; it writes to the reader model only to grade
a passage it admits on the way, to add a second quoted run to an A or B line when it cites
another run of the same passage, or to re-grade an unmet gap line C ("unmet", dated). Before the first sentence, it admits every gap line the reader
model graded A or B (fetch, pin, census line, passage table, manifest row, the record
procedures as written; a refused fetch is recovered the way step 2 recovers one). A gap the
structure turn graded A or B is not an unknown on the page; it is a record the page cites. Every factual sentence is written with its passage on screen
and cites it (`Cite s= passage=`). The sentence says what the passage says, in everyday
words, and nothing more. Where the page needs more than the passage gives, admit the
record that gives it (and write its census line) or write the gap as a dated absence in
everyday words; never the likely explanation. A sentence that says something is absent
(`data-absence`) is checked against every record cited anywhere on this page, not only the
records the sentence names, and the ledger lists the records opened for it; an absence
sentence with no records listed is not swept. The Macklemore loop spent three patch rounds
on absence sentences contradicted by a record the page cited a few lines away. Where two records differ, say what each one
counts and do the set arithmetic before any sentence says they do not match. Where an
outlet is quoted, the words are that outlet's own pin, byte for byte, one contiguous span.
Numbers come from the data module by identifier; a number is never typed twice. Legal and
financial terms appear first as the pin's word in quotation marks, then in everyday words.

The shape: the headline and the dek are the reader model's `## Headline`, set as the data
module's title and the page's dek (the label the story was opened under is not the
headline, and a patch round may change both); the headline states the most important
change, with the number when the number is the change; the dek adds the two facts a
stranger needs to read on and names no person the story has not yet introduced (roles and
counts until then); What happened opens
on the clean model (what happened and what it means), the act itself in its first sentence
and what was expected, with the gauge that measured it, after the act and never before it;
when the event is a sequence, one short passage carries the whole sequence in order with
its dates, before the paragraphs that expand each step (in sentences a stranger can
hold, `references/writing.md`; a step the passage tells is not told again in full below it); a term the opening figure leans on is
explained in the first paragraph after the figure, from the record's words;
what was new is stated as the fact (in July nine of 12 voted to hold, in September all 12
voted to raise), never announced ("the news is", "the change was", "the real signal is");
the mechanism is paragraphs of What happened, not a section; it goes one level deeper per
paragraph, a term explained only where the sentence leaning on it would otherwise be misread and then as its consequence in this story (`references/writing.md`), three to six paragraphs; the
catch, when a record contradicts the wrong reading, right after the section that
establishes the concept the wrong reading depends on; then the sections the question tree
asks for, in its order, and none it does not; a section the tree adds beyond the fixed
forms in `references/sections.md` is a question a stranger would jump to from the contents
list and more than two paragraphs of answer (a shorter thread is paragraphs inside the
section whose question it follows; the reactions of the actors the story names are dated
paragraphs of What happened next unless the reaction is the event);
a line-by-line comparison of two records (two statements, two versions of a bill) is a
proof block, and the story says in one sentence what changed between them; quotes as cards, each introduced by the
paragraph before and headed with the speaker, one card per actor per point; a prior case
the page names carries what it decided and what it does not decide for this story; What happened next dated; What we do not
know only after its disproof search, which for a question of history ("has this happened
before") leaves the pinned set once (the fact-checkers, the court's earlier opinions, the
archive) and admits what it finds, and never a step that is scheduled but not yet due, and
never the gap line's own words ("the opinions read give no date for an earlier ban");
the records list. Concept before qualification, every distinction introduced by the
mistake it prevents, a fact told once in the story register and once in proof.

Four questions of every sentence before you move on: which record, which passage, does the
passage say all of this, and did I read it this session or remember it. A fifth for every
paragraph: which of the seven answers does this advance.

Each of answers 1 to 6 in the reader model's Exiting is on the page as one sentence a
stranger could repeat to someone else, and the paragraph that holds it carries
`data-answer="N"` on its `<p>` (`data-answer="1 5"` when one paragraph holds two). Why it
matters (answer 2) is a sentence about what changed for people outside the story's actors;
a number that shows the mechanism (how many stations take the feed) supports that sentence
and does not stand in for it. `story_budget.mjs` refuses a page where an answer has no
marked paragraph in the story view. The mark is your claim, and a script cannot tell whether
the paragraph says the answer: `story_budget.mjs ... --answers` prints each answer beside
its marked paragraph, you read that list before you commit, and the reviewer reads the same
list and reports a paragraph that only wears the label. A stranger who asks for a missing sentence
is not answered by another fact.

## Step 6. Manifest, build, lints, interrogation, self-check

Append every record to `checks/manifests/<subject>--<story>.json` with `pinned_path`,
`text_path`, `text_sha256`, a byte-exact `quote`, the registry receipt fields, and a plain
`about`; add it to `story_sources` with a plain `usage` line; enrich every displayed figure
(sourced with its passage, or computed with formula and inputs, unit with scale); attest
`section_grammar` true now that the reader model has chosen the sections. Fields:
`references/manifest-and-gate.md`. Then build and lint in one command, and interrogate:

```bash
skills/catch-story/scripts/finish.sh <subject>/<story> story --no-commit   # ledger rows, build with the gate, the three lints
skills/catch-story/scripts/interrogate.sh <subject>/<story>
```

The gate fails on a record whose quote is not in its pin or whose text hash does not
recompute, a record with no registry run id and no `capture_status`, a `Cite` that does
not resolve, a number typed into a table cell, em dashes, internal vocabulary, custody
talk, schedule codes and statute paragraph codes in prose, jammed inline tags, a story
with no manifest. The voice lint fails on a sentence that names the reader or narrates the
page's own method outside the proof layer, and lists for a reread the sentences a stranger
reads as machine voice: the seven questions in `scripts/voice_lint.py` (a description of
the page or its method, a mirrored antithesis, a section wrap-up, a gloss on what to take
away, a document as the subject where the fact could stand alone, an explanation nobody
asked for, a dictionary definition). It ends with the page's sentence-length profile (the
words, the median, the share of sentences under 8 and over 30 words, the longest): a
report to read, never a cap to meet (`references/writing.md`, sentence length). A lint finding is a defect on the page, never a lint to silence. `scripts/story_budget.mjs <page> <reader model> <manifest>` lists every story-view
paragraph with no Cite whose passage is, word for word, the quoted words of an A or B line for
that record; each one moves to a detail block or the proof before the commit, or the reader model's grade is wrong and the report says which answer the passage changes. The interrogation
is a model with web and X search listing what the page does not cover: every item is fixed
from the pins, admitted and fixed, or written on the page as a dated absence after one
attempt, in the same run; an item that names a public record is a fetch, not a decline.
Write the dispositions at the top of the interrogation file. An interrogation item the
reader model grades C or D is fixed in the detail blocks or the records list, not in the
story view, and the disposition says so.

Then look at the built page in a browser at 1280 wide, in all three modes: at least one
figure, no facts behind a collapsed element, no dollar figures to the cent in the story
view, the story view under about 9,000 px, the first paragraph telling a cold stranger what
happened and what it means before any qualification.

Then check your own sentences before anyone else does. The entailment check reads the
built page, in the words and numbers a reader sees, so it runs after a build and refuses a
build older than the page source: a model that did not write the page judges every cited
block against its passages and the record around them. `--since` builds the page as it
stood at a commit and narrows the check to the blocks that page did not show, so the
baseline is always the commit you started from, never the commit you just made (that
would compare the page with itself and judge nothing). A block whose words and citations
stand and that only moved between the story view, the detail and the proof is not judged
again: the same words against the same passage give the same verdict. The referent check
below is the one that reads it when it enters the story view.

```bash
skills/catch-story/scripts/entailment_check.sh <subject>/<story>                          # first draft: the whole page
skills/catch-story/scripts/entailment_check.sh <subject>/<story> --since <start commit>   # a patch: only the blocks you changed
```

Read the verdict file it names. Every Critical and Major is fixed at the cited passage
(the sentence says what the record says, or the record that says it is admitted), the
build and the lints run again, and the check runs again with the same `--since`, until it returns
ENTAILED. A Moderate or Minor is fixed or written in the working note with why it stands.
Commit the verdict file with the page. You return only on an ENTAILED verdict; the closing
check after you return confirms it.

Then read what you added the way a stranger meets it. The entailment check reads each
sentence beside its passage, and so do you; neither reads it top down with nothing but the
page above it. The referent check does: a model that did not write the page takes the
sentences this turn added and returns the ones that lean on something the page has not yet
said (a demonstrative with no referent, a bare surname, a role with no holder, a named
rule or case with no consequence here).

```bash
skills/catch-story/scripts/referent_check.sh <subject>/<story> --since <start commit>   # after a build
```

With `--since` the script builds the page as it stood at that commit (about half a minute)
and sends the sentences the story view did not show then, or showed in another order.

Every item is fixed in the sentence (name the thing, give the role, say what the rule does
in this story) or the sentence is cut; then build and run it again with the same `--since`
until it returns CLEAR, and commit its verdict file with the page. A sentence added or
split in a patch is where a bare demonstrative appears ("this initial decision", "That
kind of release").

## Step 7. Commit and report

Check the subject page row and the homepage feature the record turn wrote still describe the
story as written, and re-read the open-questions list: it asks for nothing the records list
already holds. Then:

```bash
skills/catch-story/scripts/finish.sh <subject>/<story> story
```

It commits the page, data module, manifest, ledger, pins, working note, reader model,
interrogation and audit files by path, and nothing the build generated. Do not push.

What you never do: accept the event, refresh or commit state views, stage or ship. The
reviewer does those after your commit (procedures, steps 10 and 12).

The report is plain words: what ran, what the page covers, what you could not do and why,
the local URL of the built page, and the commit hash. Everything in it is checkable from
files in the repo.

## After you commit: what happens to the page

You are the journalist who wrote this story, and the page is yours. Two reads run on your
story commit, in parallel: a record check (a model that did not write the page judges
every block against the passages it cites, then against the page's other records and
anything published since) and a stranger read (a Claude reader that has never seen the
project, given the page as the story view reads it and the reader model, reporting where
it misread, stalled, or saw the page talking to itself). The completeness audit does not
run again: it ran on the record commit and its findings are already in your reader model.
The reviewer verifies the findings at the bytes, refutes what the pins refute, and sends
you the rest as one patch list in two parts.

Corrections are sentences the records do not support. Fix each one, or show the record
that supports the sentence as written. Everything else is advice, from readers who each
see one side of the page: take it, take it differently, or decline it. You balance what
the readers need against each other and against the story; a page that tries to satisfy
every reader satisfies none. Report each item in one line: taken, taken differently (say
how), or declined (say why). Each also gets a ledger line.

Every regenerated sentence is a new sentence: run the entailment check and the referent
check with `--since` the commit the patch started from and fix what they find before you
return, and run the lints again. A patch that adds a clause says in its ledger line what
the clause displaces (the words cut to make room, or why none), and the report gives the
page's word count before and after
(`python3 skills/catch-event-page/scripts/voice_lint.py --lengths <built page>`). Fix each
correction's class across the whole page, not only the named line, and report the sibling
count per class.

After your patch the record check runs on the blocks you changed, and the reviewer either
sends the next list or decides on the page as it stands: cut the sentence, hold the item
with its reason on the ledger, or kill the story. At every round the reviewer re-runs the
capture search on the story terms dated on or after the record turn, and a record that
moved the event since (a ruling, a filing) is on the next list with its pin. When the
record check passes, the stranger reads the page again and an editor reads it last, with
the stranger's report in hand, and writes one memo in page order: whether each of answers
1 to 6 has a sentence a reader could repeat, what to cut, what to fix, what a reader still
asks, and the words each addition costs. That memo is your last list.

The lints and scripts under `skills/` change for a defect a real page demonstrates, and
for nothing else. A reviewer's finding built from a constructed input (a malformed table
row nobody wrote, a Cite inside a script tag) is recorded as an open item with the
input that would trigger it; it is fixed the day a page under review hits it.

## Language rules (hard, enforced by the gate)

- No em dashes anywhere in public copy.
- One quotation per paragraph, then say what it means in everyday words.
- No internal vocabulary in visible text: byte-captured, capture debt, operator review,
  signed export, retrieval, automated, staging, staged, sha256, checked into, admission row
  hash, eligible claim, manifested, dossier, extraction pipeline, internal review, cloture,
  perfecting nature. No custody talk (the saved copy, we hold, could not be fetched, not on
  this page). A source that refuses capture "does not let its pages be saved".
- No repo paths, hashes, enum values, typed labels, tariff headings (`9903.01.10`) or
  statute paragraph codes (`(1)(C)(ii)`) in story prose.
- No text jammed against an inline tag (`<em>under</em>counting`); keep the space on the
  same source line.
- Verdict words are plain: "checks out", "mislabeled", "wrong". Chips are the closed set in
  `references/components.md`; one chip per claim class across the cards, and an
  inference from the record is never graded wrong.
- No process words in story prose: pins, carrier, so-what, "Why it matters:", disproof
  searches, "USD billions", "pp", docket numbers used as nouns. Proof-register content
  (record lists, day-count arithmetic, table references, archive notes, dissent counts)
  lives in a `proof` block, never in a story paragraph.
- The page never names or describes its reader ("a reader", "readers") and never narrates
  its own method in the story or fact layers ("this page found", "we could preserve", "as
  reproduced by", "Searched:", "the records add up to"). `voice_lint.py` fails the page.
- The page never writes a claim in its own words and then grades it. A checked claim is an
  outlet's sentence or an official's words, cited to the pin that carries them.

## Before you say done

- [ ] Every gap line graded A or B in the reader model is an admitted record with a census line and a manifest row, or a dated absence naming the fetch that failed.
- [ ] The page follows the reader model's sections and order; the story view carries A and B only; every record you admitted in this turn has a Grades row in the reader model (the gap line's grade, opening with the words you cite, or a grade naming the answer and the clause it changes) before the commit. `finish.sh story` runs `story_budget.mjs` on the page, the reader model and the manifest, and refuses a record with no grade, an A or B line that does not open with the quoted words or does not name the answer and its clause, a Grades row it cannot read (a row that does not parse is a defect, never skipped), a Cite it cannot read, a story-view paragraph none of whose Cites quotes the words of an A or B line, and an A or B passage that no Cite outside the proof carries (a Cite under any proof element, in a comment or in the frontmatter carries nothing); the Macklemore pages cited 18 and 9 ungraded records.
- [ ] Every number on the page was recounted from the pinned bytes this session.
- [ ] Every quoted span is one contiguous run of bytes in the record its element cites.
- [ ] `finish.sh` printed the commit (build green, the three lints zero); the interrogation dispositioned.
- [ ] The entailment check on the tree you are committing returned ENTAILED (`--since` the commit you started from, for a patch); its verdict file is committed under `checks/audits/`.
- [ ] The referent check on the sentences you added returned CLEAR; its verdict file is committed under `checks/audits/`.
- [ ] Each of answers 1 to 6 has its sentence on the page, in a paragraph marked `data-answer`.
- [ ] Every catch pairs an outlet sentence with the record passage that contradicts it; none rests on an inference.
- [ ] The dek names nobody the story has not introduced; the sequence is one short passage, in order, with its dates; every prior case named carries its scope; every unknown about history names the search that left the pinned set.
- [ ] Measured in a browser at 1280 wide, in all three modes (step 6).
- [ ] Subject page and homepage updated.
- [ ] The report names the reader-facing delta in one sentence.

## Gotchas

- Fed and FRED endpoints accept a browser User-Agent; BLS release archives, CME tool pages,
  reuters.com, nytimes.com, cbo.gov and congress.gov refuse fetches. Recover through the
  registry (`--via-archive`, a carrier copy named in the records list); never paraphrase.
- ALFRED multi-vintage comma syntax silently returns only the first vintage: one vintage per call.
- Two pins never share a stem (`eo-14399-page.html` and `eo-14399.pdf`), or one text
  sibling silently replaces the other.
- The article search index lags the registry by a day; the registry is the coverage
  universe, the index a second net.
- The `?mode=` links work only with JavaScript; the no-JavaScript view is The story.
- The gate runs in the hosted build too; a failing gate blocks the deploy.
