# The story: the reader model, materiality, and what the story view carries

This step runs after the record is built (catch-record, step 3) and before the first narrative
sentence. Its artifact is `checks/reader-models/<subject>--<story>.md`, committed with the
page. The red team reads it and grades its findings against it; the completeness audit ran
before this step, on the record commit, and its findings are passages you grade here.

## Why this step exists

The census and the pins tell the author what is known. Nothing tells the author what a
stranger needs. Without this step the page follows the evidence tree: source by source,
distinction by distinction, each one qualified before it is stated. With it the page follows
the stranger's questions, in the order they ask them, and the evidence sits underneath.

The rule that governs everything below: the story view carries only what a stranger needs
to understand the event, its mechanism, its consequence, or a material open question.
Everything else the record holds is preserved in Just the facts (detail blocks) or Show the
work (proof), never lost and never allowed to interrupt the story. A fact can be important
enough to keep without being important enough to read first.

## The reader model: what the story communicates

The file has four headings, in this order, plus an optional fifth. `finish.sh structure`
refuses the file without them.

`## Entering`: what a stranger arrives knowing, in two to four sentences. The headline they
saw, the number they half remember, the wrong reading the coverage handed them. This is
the reader the first paragraph is written for.

`## Exiting`: the seven answers below, one sentence each in everyday words, each with the
record id that supports it. This is what the reader knows when they leave. An answer with
no record is a gap line in the working note, graded, for the story turn to admit, and so is
every record-audit finding that cites a document outside the manifest: the grade is what the
document does for the answers, and the story turn admits every A and B before it writes.

`## Grades`: every passage-table line and gap-list line with its grade A to D and, for A
and B, the answer it serves.

`## Sections`: the section list from `sections.md`, each with the question from
answer 7 it answers, in the reader's order.

`## Outline` (optional): for a long story, under each section the passages it draws on,
one line each, so the story turn writes from a list rather than a search.

### The seven answers

1. What happened? (the act, the actor, the date, the number when there is one)
2. Why does it matter to someone who does not follow this subject?
3. What is the easiest wrong reading of it, the one the headline or the coverage invites?
4. What is the one concept a stranger must hold to follow it? (the mechanism, in one sentence)
5. What changed: the state it was in before, and the state the record puts it in now?
6. What is unresolved, as of the newest dated record?
7. The next three to five questions a curious stranger asks, in the order they ask them.

Answer 7 is the page's order. What happened answers 1, 4 and 5. The catch answers 3 when a
record contradicts the wrong reading. The remaining sections come from the questions in 7,
one section per question, named for the question when no standard section fits.

Two worked examples of answer 7:

- A rate decision: What did the Fed do? What does the split vote mean? Is this the start of
  a series? What changes for a mortgage or a savings account? What did the Fed say it is
  watching?
- A disclosure of weapons in orbit: What did the officials admit? What are they? Is the
  capability new, or only the admission? Is it legal? Why say it now? What is not known?

The evidence tree for the second story runs official, wording, second official, coverage
error, definition, treaty, budget. The question tree is the one the page follows.

## Materiality grades

Every line in the working note's passage tables and every line of the gap list gets one
grade. The grade decides where the passage lives.

| Grade | Meaning | Where it lives |
|---|---|---|
| A | Changes the event: what happened, who did it, the scale, the legal or procedural state, the consequence | The story view |
| B | Changes the reading: prevents the wrong reading in answer 3, supplies the concept in answer 4, or bounds the open question in answer 6 | The story view, unless the story already carries it |
| C | Strengthens the proof: corroboration, lineage, exact sourcing, the full listing, the second count | Just the facts (detail blocks) and Show the work (proof) |
| D | Residue: true, sourced, and changes no answer | The records list, or the working note only |

The test for A and B: take the passage away and reread the seven answers. If no answer
changes, the passage is C or D. A successful census yields dozens of findings; a finished
story uses a fraction of them in the story view. That is editing, not incompleteness.

The grades are the author's claim and the audits test it. An omitted A or B is a Major. A
passage graded C or D that the auditor shows changes one of the seven answers is a Major
against the grade, and the audit names which answer changes. An omitted C is Minor. D is
never a finding.

## Concept before qualification

State the clean model first, then its boundary. A qualification comes before the concept
only when the concept is false without it.

Before: "CBO estimated $38.1 billion, although that is not money paid out, does not include
the bases, cannot be added to the request, and uses a different method from the Pentagon's
own count."

After: "CBO estimates the fighting added $38.1 billion to Pentagon costs through August 1.
More than half of it is the cost of replacing missiles already fired." Then, in its own
paragraph: "That is not the whole cost of the war," and what is outside it.

Every distinction on the page is introduced by the mistake it prevents ("Adding the June
request to the estimate counts the same missiles twice"). A distinction that prevents no
mistake is cut from the story view. A stranger is never asked to care about a difference
before being shown why it matters.

## The redundancy budget

Above the fold (headline, dek, KPI strip, a summary box) may repeat the headline figure so
the page scans. Below it, a figure or fact returns only with something new: its mechanism,
its denominator, its consequence, or a record that changed it. Told once in the story
register and once in proof; never in the headline, the summary, the first paragraph, the
catch and a checked claim.

## Contrast constructions

"X, not Y" states a distinction the record makes and the misreading depends on. It is never
a headline, a kicker, a paragraph closer, or a habit. When two of them sit in one paragraph,
one is a fact stated the long way; rewrite it as the fact.

## The three turns

The record, the structure and the story are written in separate turns, by separate
contexts, so that the knowledge of how hard a record was to get never decides whether a
stranger reads it, and so that what the story communicates is decided before a sentence
of it exists.

**Turn one, the record** (the catch-record skill): census, admission, whole-pin reads, the
passage tables, the gap list with dispositions, the data module, figures, the chronology,
the detail blocks, the subject page row and homepage feature, the manifest with every gate
attestation true in fact (`section_grammar` still `done: false`, which the record build
accepts), then `finish.sh <subject>/<story> record` (ledger rows, the build with its gate,
the lints, one commit). The story view of the built page is headline, dek, KPI strip,
figures, chronology and the records list, with no narrative paragraphs yet. The turn ends
on that commit and a plain report: the working note is the deliverable. The completeness
audit runs once, on this commit.

**Turn two, the structure** (the catch-structure skill): a fresh context reads the working note, the
passage tables, the gap dispositions, the record audit and the built facts view, and
writes the reader model: entering, exiting, grades, sections, an outline when the story
needs one. Then `finish.sh <subject>/<story> structure`, which commits that file and
nothing else. The reviewer reads it before dispatching turn three; an angle that is wrong
is corrected here, in one file, not in a patch round on the prose.

**Turn three, the story** (the catch-story skill): a fresh context reads the reader model
commit, the working note and the built page, writes the narrative one passage at a time
with the pin open, in the sections and the order the reader model chose, runs the lints,
the interrogation and the entailment check, and ends with `finish.sh <subject>/<story>
story`. State views, staging and shipping are the reviewer's, after the commit. It may
admit a record the earlier turns missed and writes the census line for it. It never
regenerates a figure or a detail block from memory; it reads them.

One host, one worktree, one turn at a time. Every turn is a new session, never a resumed
one.

## Before the first narrative sentence

- [ ] `checks/reader-models/<subject>--<story>.md` is committed by turn two (`finish.sh <subject>/<story> structure`) with Entering, Exiting (the seven answers, each with a record id), Grades and Sections.
- [ ] Every passage-table line and gap-list line carries a grade.
- [ ] The section list is written under the reader model, each section with the question from answer 7 it answers.
- [ ] The story turn reads that commit and writes in its order; it does not rewrite the answers.
