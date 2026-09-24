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
  version: "3.5"
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
a passage it admits on the way, to widen an A or B line's quoted words to the words it cites
from the same passage, or to re-grade an unmet gap line C ("unmet", dated). Before the first sentence, it admits every gap line the reader
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
stranger needs to read on; What happened opens
on the clean model (what happened and what it means), the act itself in its first sentence
and what was expected, with the gauge that measured it, after the act and never before it;
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
paragraph before and headed with the speaker; What happened next dated; What we do not
know only after its disproof search, and never a step that is scheduled but not yet due;
the records list. Concept before qualification, every distinction introduced by the
mistake it prevents, a fact told once in the story register and once in proof.

Four questions of every sentence before you move on: which record, which passage, does the
passage say all of this, and did I read it this session or remember it. A fifth for every
paragraph: which of the seven answers does this advance.

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
asked for, a dictionary definition). A lint finding is a defect on the page, never a lint to silence. `scripts/story_budget.mjs <page> <reader model>` lists every story-view
paragraph whose cited records carry no passage graded A or B; each one moves to a detail
block or the proof before the commit, or the reader model's grade is wrong and the report says which answer the passage changes. The interrogation
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
working tree: a model that did not write the page judges every cited block against its
passages and the record around them. `--since` narrows it to the blocks whose text differs
from a commit, so the baseline is always the commit you started from, never the commit
you just made (that would compare the tree with itself and judge nothing).

```bash
skills/catch-story/scripts/entailment_check.sh <subject>/<story>                          # first draft: the whole page
skills/catch-story/scripts/entailment_check.sh <subject>/<story> --since <start commit>   # a patch: only the blocks you changed
```

Read the verdict file it names. Every Critical and Major is fixed at the cited passage
(the sentence says what the record says, or the record that says it is admitted), the
lints run again, and the check runs again with the same `--since`, until it returns
ENTAILED. A Moderate or Minor is fixed or written in the working note with why it stands.
Commit the verdict file with the page. You return only on an ENTAILED verdict; the closing
check after you return confirms it.

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

Three reads run on your story commit, in parallel: a red team reads the page against the
reader model and grades every omission by the grades (an omitted A or B is a Major; a C
or D the reader shows changes an answer is a Major against the grade; an omitted C is
Minor; D is not a finding), a codex pass judges every cited sentence against its
passage, and a stranger read (a Claude reader that has never seen the project, given the
page as the story view reads it and the reader model) reports where it misread, stalled,
or saw the page talking to itself. The completeness audit does not run again: it ran on the record commit and its
findings are already in your reader model. The reviewer verifies the findings at the
bytes, refutes what the pins refute, and sends you the rest as one numbered patch list;
every numbered finding gets a ledger line (patched, held with reason, out of scope with
reason). A patch changes only what the items name. Every regenerated sentence is a new
sentence: run the entailment check with `--since` the commit the patch started from and
fix what it finds before you return, and run the lints again. Fix each item's class across
the whole page, not only the named line, and report the sibling count per class.

After each round the reviewer reads the patched page, reruns the stranger read on it, and
either sends the next numbered list or decides on the page as it stands: cut the sentence, hold the item with its reason on
the ledger, or kill the story. Before the push, the reviewer re-runs the capture search on the story terms dated on or
after your run and dispositions the results in the ledger.

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
  `references/sections.md`; one chip per claim class across the cards, and an
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
- [ ] The page follows the reader model's sections and order; the story view carries A and B only; every record you admitted in this turn has a Grades row in the reader model (the gap line's grade, opening with the words you cite, or a grade naming the answer and the clause it changes) before the commit. `finish.sh story` runs `story_budget.mjs` on the page, the reader model and the manifest, and refuses a record with no grade, an A or B line that does not open with the quoted words or does not name the answer and its clause, a Cite written as an expression, and a story-view paragraph none of whose Cites quotes a run of three or more words inside an A or B line; the Macklemore pages cited 18 and 9 ungraded records.
- [ ] Every number on the page was recounted from the pinned bytes this session.
- [ ] Every quoted span is one contiguous run of bytes in the record its element cites.
- [ ] `finish.sh` printed the commit (build green, the three lints zero); the interrogation dispositioned.
- [ ] The entailment check on the tree you are committing returned ENTAILED (`--since` the commit you started from, for a patch); its verdict file is committed under `checks/audits/`.
- [ ] Every catch pairs an outlet sentence with the record passage that contradicts it; none rests on an inference.
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
