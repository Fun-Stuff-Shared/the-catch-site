---
name: catch-event-page
description: >
  Author or rework a story page for The Catch (the-catch-site, /events/SUBJECT/YYYY-MM-DD-MOMENT/):
  census the record before drafting, admit every record through the registry, read every
  pin whole, build the record in one turn and the story in a second, write each sentence
  from an open passage for the reader model, build through the gate, commit.
  Use when asked to write, build, rework, or patch a Catch story page, or to absorb a
  review of one. Works for any agent (grok, Claude, Codex); nothing depends on a model.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "3.0"
---

# Catch event page

You are writing a page a stranger will read in one sitting and a skeptic will audit line
by line. Every sentence traces to a saved record or to arithmetic done from one. The page
is judged on three things: it is right (nothing overstated), it is whole (nothing a reader
of the full record would say was left out of the record), and a stranger understands it
before being asked to qualify it. It ships the same day. The order below is how both
happen at once: the reading and searching come before the draft, so the review after you
commit finds little.

Repo: `/Volumes/4/GitHub/the-catch-site` (Astro, static). Build and gate: `npm run build`.
Commands for every step are in `references/procedures.md`; open it before step 1 and keep
it open. House style is `WRITING.md` at the repo root; the reader model and the two turns are
`references/story.md`; the sentence rules are `references/writing.md`; sections, chips
and components are `references/section-toolkit.md`.
Never push. Never edit a story that is already live. Do not kill, restart, or signal any
process you did not start.

## Step 0. The candidate is one dated moment

Read the candidate row. Compare every article's title, URL and named entities with the
headline in one pass; an article from another cluster means the seed is wrong, and you
rebuild the coverage universe from the registry once instead of opening the rest of the
seed bodies. The story is one dated moment: the day it happened, then a few words for what
happened (`2026-09-08-counter-tariffs-take-effect`), under a subject slug. A month is never
a story. Mint it with `new-event.mjs --date --moment`, copy the previous story's page for
shape (procedures, step 0). The reviewer accepts the candidate into the state before
dispatch and the dispatch names the event id (procedures, step 10); you never accept one. The story span starts at the first public act (the announcement, the filing,
the first vote), not at the summary document coverage anchored on.

## Step 1. Census the record before any sentence

Before drafting, run every search below over the subject and its dates, against the
registry, the index, and the issuing institutions' own listings. Write one line per search
in `checks/working-notes/<subject>--<story>.md`: what you found and admitted, or what you
searched (which listings, which dates, which routes) and did not find. A search is done
when its result is admitted or its absence is written with the search named. This is the
list of what reviewers have found missing; each item is a search, not a question.

1. For every package announced, the financing decision behind it: budget line, legal instrument, funding source, allocation, contract, disbursement, implementation period, each separately.
2. For every actor receiving money, rights, equity, warrants, control, data access, or a contract, that actor's own current legal exposure: investigations, litigation, sanctions, arbitration, creditor claims, ownership, and its response.
3. For every current case, the predecessor proceedings: settlements, enforcement orders, appeals, stays, vacaturs, new pleadings that changed what is in dispute.
4. For every deal, the executed contract and every instrument that allocates power or risk: approval, bidding, financing, guarantees, insurance, audit rights, termination, liens, priority, warrants, dividends, vetoes, offtake, governing law, dispute resolution.
5. For every headline number, its denominator before its meaning: annual baseline, historical average, total population, total trade, unique people, full asset base, reference period, unit of count.
6. For every list or package that changed, the before and after components, and whether the published total changed; if it did not, the valuation workbook, reference period, methodology, or reconciliation.
7. For every announcement, which state it is in: intention, authorization, signed agreement, legal obligation, committed, available, contracted, disbursed, completed. Never collapse these.
8. For every policy described as new, its lineage: prior guidance, voluntary practice, legislation, pilots, existing standards, against the new mandate, enforcement mechanism, data system, penalty.
9. For every claimed consequence, the full causal chain: mechanism, responsible actor, timing, thresholds, alternatives, mitigation, and what would separate the claim from its counterfactual.
10. For every official statistic, the exact table, title, row, seasonal status, margin or significance threshold, vintage, revision policy, comparison window. Say estimate when the record does.
11. For every legal claim, the operative instrument and its current procedural state: statute, regulation, order, docket, controlling precedent, service or notice record, implementation guidance, later challenge. Read a statute's effective-date clause against the order's own dates.
12. For every regulated system involved in harm, both compliance and sufficiency: the site-specific determination, not only the national rule.
13. For every actor affected on the ground, their own records and representation: local government, legislature, workers, vendors, communities, indigenous groups, regulators, counterparties, people exposed to the risk.
14. For every company relationship, owner, controller, operator, customer, contractor, regulator, each from filings or the governing contract, never inferred from a brand name or headquarters.
15. For every market or price reaction, causality attributed to a participant or not stated: contemporaneous analyst notes, competing shocks, timing, the later outcome series.
16. For every forecast, comparison, count, and ranking, every denominator and unit enumerated. No "third trip", "majority", "largest", or "number of countries" until the counting rule is explicit.
17. For every record repeated by several outlets, the source lineage from the pin's byline and source metadata, never from domains: syndicated copies, transcript carriers, shared briefings, and party restatements are one lineage.
18. For every document that cannot be captured, a primary mirror, docket attachment, public archive, licensed carrier, or official listing; what remains unavailable and how it limits the story.
19. For every developing event, a forward search through the cutoff: next filing, order, inspector general review, audit, implementation notice, regulator response, institutional statement, outcome data.
19b. For every subject a legislature can act on, its votes and resolutions in the story's span (roll calls, floor records, committee markups, hearings), from the chamber's own record, dated from that record and not from a later summary.
19c. For every issuing institution, its own live topic page and newsroom on the run date (the page it points the public to now, not only the release that started the story).
19d. For every subject, the institution's standing doctrine, policy or framework document and one third-party baseline assessment of the subject, dated before the event: the record the event changed.
20. Before saying done, the browser-visible page: built HTML, source list, citation targets, navigation text, labels, reader-facing state messages.

Also every time: the capture registry and the article index for the subject and its dates;
the issuing institution's own listing for every date on the page and the days after it;
the next release of every series the page cites.

The searches can run in parallel: fan them across subagents, each returning the record ids
it admitted and its working-note lines. You merge the note, and you write every sentence.

A record you found but did not admit goes under "Not admitted this run" in the working
note with its date and why; anything dated inside the story span that names the event is
admitted or typed there. The review reads that list; it is not a dead end.

## Step 2. Admit every record, then read every pin whole

Every URL this story cites goes through `capture news --reason "<subject>/<story>: <what
this record is for>"`, primaries first (the institution that acted; the filing, order, vote
record, statement, release, data file), then coverage. The registry is the admission:
receipt, raw bytes, text, stamp. A file fetched any other way is not a record; when the
registry refuses a document, the manifest row says so in `capture_status` and you move on.
Check the registry before fetching: the daily sweeps usually already hold the release as
served on release day. Every pin gets a text sibling at pin time; a video is read twice,
audio and every frame, with the on-screen text transcribed into the sibling. Series files
carry their fetch date in the name. `finish.sh` writes the ledger row for every file the manifest pins.

Then read every admitted primary record whole, not the span you plan to quote. In the
working note, under the record's id, list each passage that changes the event, the
mechanism, who is affected, the chronology, or an outlet verdict, and mark it: used
(where), held unused (why), or out of scope. Most of what reviewers find is inside a pin
the author already held. Before crediting an outlet for a fact, search every primary pin
for it, case-insensitive; the primary takes the cite and the outlet row says it checks out.

Then run the gap list and disposition every line before drafting:

```bash
node skills/catch-event-page/scripts/pin_gaps.mjs <subject>/<story>
```

It prints every unit-bearing number and every repeated or titled name in each primary pin
that appears nowhere on the page or in the data module. Each line gets one of three words
in the working note under the record: used (where), held unused (why), out of scope. Most
of what reviewers find is on this list: a death count with two categories and a later
table, a speech naming who depends on the satellites. Whole-pin reads by subagents are
fine; the dispositions are yours.

For a court order, a rule, a statute or a budget letter, the list is not enough: read the
operative sections whole (ORDERED paragraphs, holdings, exemptions, applicability,
definitions, data fields, footnotes that define the page's headline term) and write one
disposition per sentence there that the page does not carry in substance.

Recount every number a brief or review names against the pins before fetching anything
new. The pins win over anyone's memory.

## Step 3. Build the record: the end of turn one

Data module first (`src/data/<slug>.mjs`: event, kpis, series, tables, every derived
number computed from the admitted series with a comment naming the file). Then the parts
of the page that are the record and not the story: figures from the data module, the
chronology table, the record's own lines as `SourcedBlock kind="record" detail` under
the sections they belong to, the records list. Then the subject page and the homepage,
which are record work: one timeline row and the KPI or chart refresh on
`/events/<subject>/`, and the homepage feature through `event.visual` (procedures, step
13, and the visual kinds). Manifest with every gate attestation true in fact, which in
this turn means `section_grammar` is `done: false` (the sections are chosen by the reader
model, in turn two; the record build accepts that one attestation open). Then one command
ends the turn:

```bash
skills/catch-event-page/scripts/finish.sh <subject>/<story> record
```

It adds the ledger rows for your pins, builds through the gate, runs the three lints and
commits this story's files and nothing else. Fix what it reports on the page and run it
again until it prints the commit. It also stops on any change in the tree outside this
story, and on a change to the homepage, the story index, the subject page, the ledger or
the route list whose lines do not name this story, because a worktree holds one story
(the subject's data module is yours to refresh, so it is committed whole). The story view of this build is headline, dek, KPI strip, figures, chronology
and the records list, with no narrative paragraph yet.

This is where turn one ends (`references/story.md`, "The two turns"). Its report is the
working note: the census lines, the passage tables, the gap dispositions, what could not
be admitted and why. The story is written by a fresh session that did not build the record.

## Step 4. The reader model, before the first narrative sentence

Turn two opens by reading the working note, the passage tables, the gap dispositions and
the built page, then writing `checks/reader-models/<subject>--<story>.md` (create the
directory: `mkdir -p checks/reader-models`)
(`references/story.md`): the seven answers, one sentence each with its record id; a grade
A to D on every passage-table line and gap-list line; the section list from
`references/section-toolkit.md`, each section with the question it answers. An answer with
no record is a census gap: run step 1 for it now. The story view will carry A and B
material only; C and D stay in the detail blocks, the proof and the records list.

## Step 5. Write the story, each sentence from an open passage

Read `references/story.md`, `references/section-toolkit.md` and `references/writing.md`
before the first sentence. Every factual sentence is written with its passage on screen
and cites it (`Cite s= passage=`). The sentence says what the passage says, in everyday
words, and nothing more. Where the page needs more than the passage gives, admit the
record that gives it (and write its census line) or write the gap as a dated absence in
everyday words; never the likely explanation. Where two records differ, say what each one
counts and do the set arithmetic before any sentence says they do not match. Where an
outlet is quoted, the words are that outlet's own pin, byte for byte, one contiguous span.
Numbers come from the data module by identifier; a number is never typed twice. Legal and
financial terms appear first as the pin's word in quotation marks, then in everyday words.

The shape: the headline states the most important change, with the number when the number
is the change; the dek adds the two facts a stranger needs to read on; What happened opens
on the clean model (what happened and what it means) and goes one level deeper per
paragraph, one mechanism sentence per new term at first use, three to six paragraphs; the
catch, when a record contradicts the wrong reading, right after the section that
establishes the concept the wrong reading depends on; then the sections the question tree
asks for, in its order, and none it does not; quotes as cards, each introduced by the
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
skills/catch-event-page/scripts/finish.sh <subject>/<story> story --no-commit   # ledger rows, build with the gate, the three lints
skills/catch-event-page/scripts/interrogate.sh <subject>/<story>
```

The gate fails on a record whose quote is not in its pin or whose text hash does not
recompute, a record with no registry run id and no `capture_status`, a `Cite` that does
not resolve, a number typed into a table cell, em dashes, internal vocabulary, custody
talk, schedule codes and statute paragraph codes in prose, jammed inline tags, a story
with no manifest. The voice lint fails on a sentence that names the reader or narrates the
page's own method outside the proof layer, and lists the sentences a stranger reads as
machine voice (a mirrored antithesis, a section wrap-up, a gloss on what to take away) for
a reread. A lint finding is a defect on the page, never a lint to silence. The interrogation
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
skills/catch-event-page/scripts/entailment_check.sh <subject>/<story>                          # first draft: the whole page
skills/catch-event-page/scripts/entailment_check.sh <subject>/<story> --since <start commit>   # a patch: only the blocks you changed
```

Read the verdict file it names. Every Critical and Major is fixed at the cited passage
(the sentence says what the record says, or the record that says it is admitted), the
lints run again, and the check runs again with the same `--since`, until it returns
ENTAILED. A Moderate or Minor is fixed or written in the working note with why it stands.
Commit the verdict file with the page. You return only on an ENTAILED verdict; the closing
check after you return confirms it.

## Step 7. Commit and report

Check the subject page row and the homepage feature turn one wrote still describe the
story as written, and re-read the open-questions list: it asks for nothing the records list
already holds. Then:

```bash
skills/catch-event-page/scripts/finish.sh <subject>/<story> story
```

It commits the page, data module, manifest, ledger, pins, working note, reader model,
interrogation and audit files by path, and nothing the build generated. Do not push.

What you never do: accept the event, refresh or commit state views, stage or ship. The
reviewer does those after your commit (procedures, steps 10 and 12).

The report is plain words: what ran, what the page covers, what you could not do and why,
the local URL of the built page, and the commit hash. Everything in it is checkable from
files in the repo.

## After you commit: what happens to the page

A completeness audit under `skills/story-completeness-audit/` and a red team read the
page and the reader model on your commit, in parallel, and grade every omission against the
grades (an omitted A or B is a Major; a C or D the auditor shows changes an answer is a
Major against the grade; an omitted C is Minor; D is not a finding). A codex pass judges
every cited sentence against its passage. The reviewer verifies their findings at the bytes, refutes what the pins refute,
and sends you the rest as a numbered patch list; every numbered finding in every audit
section, including the ones about what came before, after and around the event, gets a
ledger line (patched, held with reason, out of scope with reason). A patch changes only
what the items name. Every regenerated sentence is a new sentence: run the entailment
check with `--since` the commit the patch started from and fix what it finds before you
return, and run the lints again. Fix each item's class across the whole page, not only the named
line, and report the sibling count per class. Before the push, the reviewer re-runs the
capture search on the story terms dated on or after your run and dispositions the results
in the ledger. A second audit runs on the patched commit. Rounds that survive it are the
reviewer's problem to escalate, not yours to explain away.

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
  `references/section-toolkit.md`; one chip per claim class across the cards, and an
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

- [ ] The working note holds one line per census search and a passage table per primary record.
- [ ] The reader model file holds the seven answers with record ids, a grade on every passage and gap line, and the section list with its questions; the story view carries A and B only.
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

## References

- `references/procedures.md`: every command, in order, from scaffold to commit.
- `references/story.md`: the reader model, materiality grades, concept before qualification, the two turns.
- `references/writing.md`: the rules that bind each sentence, with the everyday-word threshold.
- `references/section-toolkit.md`: the core and optional sections, chip vocabulary, components, layer rules.
- `references/manifest-and-gate.md`: manifest fields, SOURCES.md, what the gate checks.
- `references/interrogation.md`: the interrogation prompt the script sends.
