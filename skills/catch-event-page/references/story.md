# The story: the reader model, materiality, and what the story view carries

This step runs after the record is built (SKILL.md, step 3) and before the first narrative
sentence. Its artifact is `checks/reader-models/<subject>--<story>.md`, committed with the
page. The completeness audit and the red team read it and grade their findings against it.

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

## The reader model: seven answers, one sentence each

Write these in everyday words, each with the record id that supports it. An answer with no
record is a census gap; go back to step 1 before drafting.

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
against the grade, and the audit names which answer changes. An omitted C is a note at most.
D is never a finding.

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

## The two turns

The record and the story are written in separate turns, by separate contexts, so that the
knowledge of how hard a record was to get never decides whether a stranger reads it.

**Turn one, the record** (SKILL.md steps 0 to 3): census, admission, whole-pin reads, the
passage tables, the gap list with dispositions, the data module, figures, the chronology,
the detail blocks, the manifest, the state views, a green build. The story view of the built
page is headline, dek, KPI strip, figures, chronology and the records list, with no
narrative paragraphs yet. The turn ends on a commit and a plain report: the working note is
the deliverable.

**Turn two, the story** (SKILL.md steps 4 to 7): a fresh context that did not build the
record reads the working note, the passage tables, the gap dispositions and the built facts
view, writes the reader model and the grades, chooses the sections, writes the narrative
one passage at a time with the pin open, runs the lints, the interrogation and the
entailment check, and commits. It may admit a record turn one missed and writes the census
line for it. It never regenerates a figure or a detail block from memory; it reads them.

One host, one worktree, one turn at a time. The second turn is a new session, never a
resumed one.

## Before the first narrative sentence

- [ ] `checks/reader-models/<subject>--<story>.md` holds the seven answers, each with a record id.
- [ ] Every passage-table line and gap-list line carries a grade.
- [ ] The section list is written under the reader model, each section with the question from answer 7 it answers.
