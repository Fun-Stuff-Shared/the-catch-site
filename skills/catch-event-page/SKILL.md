---
name: catch-event-page
description: >
  Author or rework a story page for The Catch (the-catch-site, /events/SUBJECT/YYYY-MM-DD-MOMENT/):
  census the record before drafting, admit every record through the registry, read every
  pin whole, write each sentence from an open passage, build through the gate, commit.
  Use when asked to write, build, rework, or patch a Catch story page, or to absorb a
  review of one. Works for any agent (grok, Claude, Codex); nothing depends on a model.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "2.2"
---

# Catch event page

You are writing a page a stranger will read in one sitting and a skeptic will audit line
by line. Every sentence traces to a saved record or to arithmetic done from one. The page
is judged on two things: it is right and whole (nothing a reader of the full record would
say you left out or overstated), and it ships the same day. The order below is how both
happen at once: the reading and searching come before the draft, so the review after you
commit finds little.

Repo: `/Volumes/4/GitHub/the-catch-site` (Astro, static). Build and gate: `npm run build`.
Commands for every step are in `references/procedures.md`; open it before step 1 and keep
it open. House style is `WRITING.md` at the repo root; the story-specific rules are
`references/writing.md`; section order and components are `references/section-grammar.md`.
Never push. Never edit a story that is already live. Do not kill, restart, or signal any
process you did not start.

## Step 0. The candidate is one dated moment

Read the candidate row. Compare every article's title, URL and named entities with the
headline in one pass; an article from another cluster means the seed is wrong, and you
rebuild the coverage universe from the registry once instead of opening the rest of the
seed bodies. The story is one dated moment: the day it happened, then a few words for what
happened (`2026-09-08-counter-tariffs-take-effect`), under a subject slug. A month is never
a story. Mint it with `new-event.mjs --date --moment`, copy the previous story's page for
shape, and accept the candidate into the state so the story has a view (procedures, step 0
and step 10). The story span starts at the first public act (the announcement, the filing,
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
carry their fetch date in the name. SOURCES.md is regenerated after every addition.

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

## Step 3. Draft, each sentence from an open passage

Data module first (`src/data/<slug>.mjs`: event, kpis, series, tables, every derived
number computed from the admitted series with a comment naming the file), then the page.
Read `references/writing.md` and `references/section-grammar.md` before the first sentence.

Every factual sentence is written with its passage on screen and cites it (`Cite s=
passage=`). The sentence says what the passage says, in reader words, and nothing more.
Where the page needs more than the passage gives, admit the record that gives it or write
the gap as a dated absence in reader words; never the likely explanation. Where two records
differ, say what each one counts and do the set arithmetic before any sentence says they
do not match. Where an outlet is quoted, the words are that outlet's own pin, byte for
byte, one contiguous span. Numbers come from the data module by identifier; a number is
never typed twice. Legal and financial terms appear first as the pin's word in quotation
marks, then in reader words.

The shape, in order: the headline states the outcome with its number; the dek adds the two
facts a reader must know; What happened opens on the first public act in everyday words,
most important first, each paragraph one level deeper, one mechanism sentence per new term
at first use; the catch as one headline claim then short prose, first among the sections
after What happened; every number series a figure from the data module; a chronology table
for dated steps; quotes as cards, each introduced by the paragraph before and headed with
the speaker; Who feels it as prose about named people and places with dates, cited, never
the shortest section; coverage as cards, errors first, cited only there or in a sentence
about what the outlet wrote; What happened next dated; What we do not know only after its
disproof search; the records list. Every section ends on what its records add up to for
the reader.

Four questions of every sentence before you move on: which record, which passage, does the
passage say all of this, and did I read it this session or remember it.

## Step 4. Manifest, state, build, lints, interrogation, self-check

Append every record to `checks/manifests/<subject>--<story>.json` with `pinned_path`,
`text_path`, `text_sha256`, a byte-exact `quote`, the registry receipt fields, and a plain
`about`; add it to `story_sources` with a plain `usage` line; enrich every displayed figure
(sourced with its passage, or computed with formula and inputs, unit with scale). Fields:
`references/manifest-and-gate.md`. Fill the story's state record from the manifest
(procedures, step 12), then:

```bash
npm run build
node skills/catch-event-page/scripts/lens_lint.mjs src/pages/events/<subject>/<story>.astro
node skills/catch-event-page/scripts/quote_lint.mjs src/pages/events/<subject>/<story>.astro
skills/catch-event-page/scripts/interrogate.sh <subject>/<story>
```

The gate fails on a record whose quote is not in its pin or whose text hash does not
recompute, a record with no registry run id and no `capture_status`, a `Cite` that does
not resolve, a number typed into a table cell, em dashes, internal vocabulary, custody
talk, schedule codes and statute paragraph codes in prose, jammed inline tags, a story
with no manifest. A lint finding is a defect on the page, never a lint to silence. The interrogation is a
model with web and X search listing what the page does not cover: every item is fixed from
the pins, admitted and fixed, or written on the page as a dated absence after one attempt,
in the same run; an item that names a public record is a fetch, not a decline. Write the
dispositions at the top of the interrogation file.

Then look at the built page in a browser at 1280 wide: at least one figure, no facts behind
a collapsed element, no dollar figures to the cent in the story view, the story view under
about 9,000 px, the first three sentences telling a cold reader what happened and why it
matters to them.

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

## Step 5. Update the subject page and homepage, commit, report

One timeline row and the KPI or chart refresh on `/events/<subject>/`; the homepage
features the latest story through `event.visual` (procedures, step 12 and the visual
kinds). Regenerate SOURCES.md and re-read the open-questions list as the last two steps:
the list asks for nothing the records list already holds.

Commit by explicit path: page, data module, manifest, SOURCES.md, pins and text siblings,
working note, interrogation file, the story's state view and its chain view. Never commit
`.md.err` files, `data/sources/officials/`, or generated state beyond those two views.
Plain messages, no attribution trailers. Do not push.

The report is plain words: what ran, what the page covers, what you could not do and why,
the local URL of the built page, and the commit hash. Everything in it is checkable from
files in the repo.

## After you commit: what happens to the page

A completeness audit under `skills/story-completeness-audit/` and a red team read the
page on your commit, in parallel, and a codex pass judges every cited sentence against its
passage. The reviewer verifies their findings at the bytes, refutes what the pins refute,
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
- One quotation per paragraph, then say what it means in the reader's words.
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
  `references/section-grammar.md`; one chip per claim class across the cards, and an
  inference from the record is never graded wrong.
- No process words in story prose: pins, carrier, so-what, "Why it matters:", disproof
  searches, "USD billions", "pp", docket numbers used as nouns. Proof-register content
  (record lists, day-count arithmetic, table references, archive notes, dissent counts)
  lives in a `proof` block, never in a story paragraph.

## Before you say done

- [ ] The working note holds one line per census search and a passage table per primary record.
- [ ] Every number on the page was recounted from the pinned bytes this session.
- [ ] Every quoted span is one contiguous run of bytes in the record its element cites.
- [ ] `npm run build` green; `lens_lint` and `quote_lint` zero; the interrogation dispositioned.
- [ ] The entailment check on the tree you are committing returned ENTAILED (`--since` the commit you started from, for a patch); its verdict file is committed under `checks/audits/`.
- [ ] Every catch pairs an outlet sentence with the record passage that contradicts it; none rests on an inference.
- [ ] Every manifest figure appears in the built state record with its unit and passage.
- [ ] SOURCES.md regenerated; every manifest `pinned_path` basename has a row.
- [ ] Measured in a browser at 1280 wide (step 4).
- [ ] Subject page and homepage updated; both state views committed with the page.
- [ ] The report names the reader-facing delta in one sentence.

## Gotchas

- Fed and FRED endpoints accept a browser User-Agent; BLS release archives, CME tool pages,
  reuters.com, nytimes.com, cbo.gov and congress.gov refuse fetches. Recover through the
  registry (`--via-archive`, a carrier copy named in the records list); never paraphrase.
- ALFRED multi-vintage comma syntax silently returns only the first vintage: one vintage per call.
- Two pins never share a stem (`eo-14399-page.html` and `eo-14399.pdf`), or one text
  sibling silently replaces the other.
- A story view committed without its chain view builds locally and fails on the host.
  Commit both files the refresh wrote (`data/state/event-<id>.json`, `data/state/chain-<root>.json`).
- The article search index lags the registry by a day; the registry is the coverage
  universe, the index a second net.
- The `?mode=` links work only with JavaScript; the no-JavaScript view is The story.
- The gate runs in the hosted build too; a failing gate blocks the deploy.

## References

- `references/procedures.md`: every command, in order, from scaffold to commit.
- `references/writing.md`: the story-specific writing rules, with the everyday-word threshold.
- `references/section-grammar.md`: section order, chip vocabulary, components, layer rules.
- `references/manifest-and-gate.md`: manifest fields, SOURCES.md, what the gate checks.
- `references/interrogation.md`: the interrogation prompt the script sends.
