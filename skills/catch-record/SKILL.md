---
name: catch-record
description: >
  Turn one of a Catch story (the-catch-site, /events/SUBJECT/YYYY-MM-DD-MOMENT/): census the
  record, admit every record through the registry, read every pin whole, build the data
  module, figures, chronology, detail blocks, records list, subject page row and homepage
  feature, and commit the record with no narrative sentence. Use when dispatched to build the
  record for a story. The structure and the story are other skills, other sessions.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "3.1"
---

# Catch record turn

You are building the record a stranger's story will be written from, by a session that
will not be yours. Everything you admit is read whole; everything you leave out is written
down with the search that did not find it. The story view of what you commit is headline,
dek, KPI strip, figures, chronology and the records list, and no narrative paragraph. It
ships the same day.

Repo: `/Volumes/4/GitHub/the-catch-site` (Astro, static). Build and gate: `npm run build`.
Never push. Never edit a story that is already live. Do not kill, restart, or signal any
process you did not start. Scripts and reference files are shared by the three turn skills
and live under `skills/catch-event-page/`; the reviewer's process is that skill's SKILL.md.
Commands for every step are in `skills/catch-event-page/references/procedures.md` (steps 0
to 8); open it before step 1 and keep it open. Components, figures and detail blocks are
`skills/catch-event-page/references/section-toolkit.md`; manifest fields are
`skills/catch-event-page/references/manifest-and-gate.md`.

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
model, in turn two, and attested in turn three; the record build accepts that one attestation open). Then one command
ends the turn:

```bash
skills/catch-event-page/scripts/finish.sh <subject>/<story> record
```

It adds the ledger rows for your pins, builds through the gate, runs the three lints and
commits this story's files and nothing else. Fix what it reports on the page and run it
again until it prints the commit. It also stops on any change in the tree outside this
story, and on a change to the homepage, the story index, the subject page, the ledger or
the route list whose lines do not name this story (its slug, a pin, its data module or
the name that file imports the module under), because a worktree holds one story
(the subject's data module is yours to refresh, so it is committed whole). The story view of this build is headline, dek, KPI strip, figures, chronology
and the records list, with no narrative paragraph yet.

This is where turn one ends (`skills/catch-event-page/references/story.md`, "The three turns"). Its report is the
working note: the census lines, the passage tables, the gap dispositions, what could not
be admitted and why. The story is written by a fresh session that did not build the record.
Between the turns the completeness audit runs once, on this commit, against the record
and the working note; its file is `checks/audits/<subject>--<story>-<date>-record-audit.md`.
It runs here, before a narrative sentence exists, because it hunts outside the frame (what
came before, after and around the event) and every round it runs after the story is
written finds a different frame: on the Kennedy Center trial it returned seven to ten
Majors three rounds running with no item repeated. Its findings are passages for the
structure turn to grade, and it does not run again on this story.

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
  `skills/catch-event-page/references/section-toolkit.md`; one chip per claim class across the cards, and an
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
- [ ] Every number in the data module was recounted from the pinned bytes this session.
- [ ] Every quoted span in a detail block is one contiguous run of bytes in the record its element cites.
- [ ] `finish.sh <subject>/<story> record` printed the commit (build green, the three lints zero).
- [ ] Subject page row and homepage feature written.
- [ ] The report is the working note: census lines, passage tables, gap dispositions, what could not be admitted and why.

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
