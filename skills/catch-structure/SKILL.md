---
name: catch-structure
description: >
  Turn two of a Catch story: read the record another session built (working note, passage
  tables, gap dispositions, record audit, built facts view) and write the reader model, the
  one file that says what the story communicates (what a stranger enters knowing, what they
  exit knowing, a grade on every passage, the sections and their questions, an outline when
  needed), then commit it alone. Use when dispatched to structure a story. No story sentence
  is written in this turn.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "3.1"
---

# Catch structure turn

You decide what the story communicates before a sentence of it exists, from a record you
did not build and do not know the cost of. Your whole output is one file. The story turn
writes in its order and does not rewrite its answers; the reviewer reads it before that
turn is dispatched, so an angle that is wrong is corrected here, in one file, not in a
patch round on prose.

Repo: `/Volumes/4/GitHub/the-catch-site` (Astro, static). Build and gate: `npm run build`.
Never push. Never edit a story that is already live. Do not kill, restart, or signal any
process you did not start. Scripts and reference files are shared by the three turn skills
and live under `skills/catch-event-page/`; the reviewer's process is that skill's SKILL.md.
The file's shape, the seven answers, the materiality grades and the three turns are
`skills/catch-event-page/references/story.md`; read it in full first. The core and optional
sections and the question tree that chooses them are
`skills/catch-event-page/references/section-toolkit.md`.

## The one step

Turn two is a fresh session that did not build the record. It reads the working note, the
passage tables, the gap dispositions, the record audit
(`checks/audits/<subject>--<story>-<date>-record-audit.md`, when it exists: each of its
findings is a passage to grade A to D or a census gap to write into the working note) and the
built page, and writes one file, `checks/reader-models/<subject>--<story>.md` (`mkdir -p
checks/reader-models` first), in the shape `skills/catch-event-page/references/story.md` gives: what a stranger
enters knowing, what they exit knowing (the seven answers, each with its record id), a
grade A to D on every passage-table line and gap-list line, the section list from
`skills/catch-event-page/references/section-toolkit.md` with the question each section answers, and, when the
story is long enough to need one, an outline of which passages each section draws on. This
file is what the story communicates, decided before any sentence exists. The story view
will carry A and B material only; C and D stay in the detail blocks, the proof and the
records list. An answer with no record is a gap line in the working note, graded, for the
story turn to admit. Then one command ends the turn:

```bash
skills/catch-event-page/scripts/finish.sh <subject>/<story> structure
```

It commits the reader model and the working note and nothing else; the page is unchanged,
so there is no build. The reviewer reads that file before the story turn is dispatched.

## Before you say done

- [ ] `checks/reader-models/<subject>--<story>.md` has Entering, Exiting (seven answers, each with a record id), Grades (every passage-table line, gap line and record-audit finding), Sections (each with its question, in the reader's order), and an Outline when the story needs one.
- [ ] Every A and B names the answer it serves; the story view will carry A and B only.
- [ ] An answer with no record is a gap line in the working note, graded; you admitted nothing.
- [ ] `finish.sh <subject>/<story> structure` printed the commit.
- [ ] The report is the Entering paragraph, the seven answers, the section list and the commit hash.
