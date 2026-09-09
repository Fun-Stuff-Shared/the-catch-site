---
name: catch-event-page
description: >
  Author or rework a story page for The Catch (the-catch-site, /events/SUBJECT/MONTH/)
  the way the two gold pages were built: admit sources first, compute every number from
  saved data, verify outlet claims against the record, write in the fixed section grammar
  with three reading lenses (The story / Just the facts / Show the work), then pass the
  build gate and live audit. Use when asked to write, build, rework, or review a Catch
  event page, story page, jobs or Fed page, or to absorb a review of one. Works for any
  agent (Claude, Codex, grok); nothing here depends on a particular model.
license: CC BY-NC 4.0
metadata:
  author: the-catch
  version: "1.0"
  gold_examples: /events/fed-rate/june-2026/ and /events/jobs/july-2026/
---

# Catch event page

You are writing a page a stranger will read and a skeptic will audit. Every sentence
traces to a saved document, a saved data series, or arithmetic done from one. If you
cannot point at the record for a sentence, the sentence does not ship.

## Write from the record, not from your understanding of it

The way this work fails is not arithmetic. Seven stories in one day recomputed every
number correctly and still shipped invented coverage claims, overstated mechanisms,
stitched quotations and explanations no record gives. The cause was the same each time:
a real passage supported one phrase of a sentence, and the author treated that as support
for the whole sentence. A citation is not a license for the words around it.

So the unit of writing is the passage, not the paragraph. For each admitted record, list
the passages that change the event, the mechanism, who is affected, the chronology, or an
outlet verdict, and mark each one used, held unused with a reason, or out of scope. Draft
only after that table exists, and draft each sentence with its passage open: the sentence
may say what the passage says, in reader words, and nothing more. Where a term or a count
needs a mechanism the passage does not give, write the gap ("the records do not say what
the count includes"), never the likely explanation. Where two records differ, say what
each one counts; do not reconcile them. Where an outlet is quoted, the words come from
that outlet's own pin, byte for byte. Where you rewrite or restructure, every regenerated
sentence is a new sentence and is checked against its passage again; a rewrite is not a
retelling from memory.

Four questions, asked of every sentence before it ships: which record, which passage,
does the passage say all of this, and did I read it this session or remember it.

Repo: `/Volumes/4/GitHub/the-catch-site` (Astro, static). Build and gate: `npm run build`.
Deploy is `git push` to main; the live site rebuilds in under a minute.

## The three lenses (the page's contract)

Every block on the page carries exactly one `data-layer`:

| Layer | Who sees it | What goes in it |
|---|---|---|
| `fact` | every mode, except `detail` blocks which Just the facts and Show the work show | KPIs, figures, quote cards, the catch, checked claims, the sources list, and the record blocks. A record block that restates a document line by line is `<SourcedBlock detail>`: it stays out of The story and appears, in the open, in the other two views. |
| `narrative` | The story, Show the work | The synthesis: tight reporting, most important first, mechanisms inline, a "so what" per section (WRITING.md, "What each view is for"). Every narrative paragraph cites at least one record with `<Cite>`. A narrative sentence that cannot cite a fact block does not ship. |
| `proof` | Show the work only | Receipts, arithmetic, capture dates, revision warnings, source-usage notes. Auditor register. |

"Just the facts" hides narrative. "The story" hides proof. "Show the work" shows all
three. The default (no JavaScript, print, crawler) is The story. The mode switcher is
`<ReadingModes />`; do not reimplement it.

Two rules the gold pages themselves break, so hold them stricter than the examples:

1. **Uncited narrative is a defect.** Run `scripts/lens_lint.mjs` on the page; it lists
   every narrative paragraph without a `<Cite>`. Fix each one or move the claim into a
   `<SourcedBlock>`.
2. **Proof content never rides inside a fact block.** A capture date, a "later releases
   may revise" line, a values table, or a method note goes in its own `data-layer="proof"`
   element, even inside a figure.

## Workflow

Work in this order. Each step names its artifact; an unmapped step is a finding you
report, never an omission. The exact commands for every step (registry search, index
search, state-log check, fetch and pin, archive and assisted recovery, computation
snippets, build, lint, screenshot, independent interrogation, live audit) are in
`references/procedures.md`; read it before step 2 and keep it open.

1. **Capture the ask as a checklist.** A review or brief is copied item by item into a
   working note before any data is touched. Reworks are verified against this list.
2. **Admit sources first, starting at the first public act.** The story span begins with the
   announcement, the filing, or the first vote, not with the summary document coverage anchored
   on. Check the capture registry before fetching: agency releases
   are usually already held as served on release day. Save every document under
   `data/sources/` before writing a sentence, series files under dated names: primary documents from the issuing institution, official series as raw CSV
   (FRED `fredgraph.csv?id=`), coverage articles as served. Blocked fetches are recovered
   (archive.org snapshot, ALFRED vintages, assisted search) and the recovery is disclosed
   in `data/sources/SOURCES.md` and in the page's records list, in reader words.
   Regenerate SOURCES.md (file, bytes, sha256 prefix) after every addition.
3. **Recount against existing pins before fetching.** Most numbers a reviewer raises are
   already inside a pinned release. Open the pinned bytes and recount; pin new sources
   only for what the pins lack. The pins win over the reviewer's memory.
4. **Compute, never quote, derived numbers.** Days held, percentiles, streaks, revision
   tables, and comparisons are recomputed in-session from the admitted series. Put the
   values in the page's data module (`src/data/<subject><period>.mjs`) with a comment
   naming the source file, and render from it. A number is never typed twice.
5. **Disposition the passages, then verify outlet claims against the record.** Build the
   passage table from the section above in the working note before any prose: record,
   passage, what it establishes, disposition. It is the map the page is written from and
   the interrogation is checked against. Then, before crediting an outlet for a fact, search
   every primary pin for it (case-insensitive; uppercase and hyphenated headings defeat
   case-sensitive searches). The primary takes the cite; the outlet row says it checks out.
   Legal and financial terms appear first as the pin's word in quotation marks, then in reader
   words. Each checkable claim in each coverage
   article is compared with the primary document. Verdicts use the closed chip set
   (see `references/section-grammar.md`). A wrong claim is named plainly: who, what they
   wrote, what the record shows. Be ready for the page's own earlier claim to be wrong
   in a more specific way than the reviewer said; say so on the page with a dated
   correction.
   A video is a record twice over: the audio and every frame. Read both before any verdict
   says what an ad does or does not cite (`references/procedures.md`).
6. **Write in the section grammar, as an inverted pyramid, one passage at a time.** Fixed
   order, sections dropped only when truly empty. Each sentence is written with its passage
   on screen; a sentence with no passage in the table is a gap to state or a sentence to cut. Read `WRITING.md` at the repo root (house style; it binds every
   sentence) and `references/section-grammar.md` before writing, the shape rules first:
   most important first and each paragraph one level deeper, depth in the open and never
   collapsed, every number series a figure from the data module (`BarChart`, `DataTable`,
   `DecisionTimeline`, `StepChart` in `src/components/story/`), a chronology table for dated
   steps, one mechanism sentence per introduced term at first use, a "so what" closing each
   section, rounding in the story and cents in the proof, catch rows ranked with a "Why it
   matters", coverage as `OutletCheck` cards with the closed chip set and errors first, Who
   feels it as a dated list, quotes as cards. Use the components:
   `SourcedBlock` (fact with a chip), `Cite` (numbered source reference),
   `StorySources` (the records list), `ReadingModes`, `StoryState`.
7. **Manifest every record, and every displayed number.** Append each new record to
   `checks/manifests/<subject>--<story>.json` with `pinned_path`, `text_sha256`, and a
   byte-exact `quote` (for a CSV, a data line). Add it to `story_sources` with a plain
   `usage` line. The gate re-verifies every record on every build.
8. **Build with the real pipeline.** `npm run build` (never a partial build or a
   fallback). Fix what the gate reports and rebuild until clean. Then run
   `node skills/catch-event-page/scripts/lens_lint.mjs src/pages/events/<subject>/<story>.astro`.
   Then run `node skills/catch-event-page/scripts/prose_lint.mjs src/pages/events/<subject>/<story>.astro`
   for the 45-word narrative limit and one quotation per paragraph.
   Then `node skills/catch-event-page/scripts/quote_lint.mjs <same page>`: every quoted span
   on the page must be one contiguous run of bytes in a record the same element cites, and
   an outlet's quoted words must come from that outlet's own pin. A finding is a defect on
   the page, never a lint to silence: fix the quote, the cite, or the attribution.
9. **Independent interrogation, then the completeness audit.** Two runs by models that
   did not write the page, both required before staging. First the interrogation
   (`scripts/interrogate.sh <subject>/<story>`, prompt and handling in
   `references/interrogation.md`): a model with web and X search lists everything the page
   does not cover. Then the completeness audit
   (`scripts/completeness_audit.sh <subject>/<story>`, contract in
   `references/completeness-audit.md`): three layers, verification of every material
   proposition against its record, discovery before, after, and around the page's frame
   with every citation the sources themselves make chased to its record, and an
   independent reconstruction the auditor then tries to disprove. Every returned item gets
   one of four dispositions the same session: admitted and fixed (a named record is a
   fetch, never a decline), fixed from the pins, typed on the page in reader words after
   one attempt, or declined with its reason. Rerun the audit after the fixes; stage on
   COMPLETE, or on INCOMPLETE whose remaining checks are all typed on the page. Write the
   catch box after this step: each row names the two records that disagree. Never dismiss
   a list wholesale.
10. **Update the subject page and homepage.** New story = one timeline row + KPI/chart
   refresh on `/events/<subject>/`; the homepage features the latest story. Each month's
   page is standalone and is never edited afterwards: a revision to last month's number is
   this month's story and goes on this month's page (its revisions table and claim check).
   Every story declares one lead visual in its data module as `event.visual`, and the
   homepage lead card renders it through `LeadVisual`. Three kinds: `payrolls` (the chart,
   `{ kind, source, from, to, latest, range, rangeCompact }`, also rendered on the story and
   series pages as `<PayrollChart {...event.visual} />`), `timeline` (`{ kind, title, note,
   entries }`, one to four dated lines, built from the page's own timeline data), and
   `table` (`{ kind, title, note, rows }`, one to three `[figure, what it is]` rows built
   from the page's own data). The caps are enforced at build time so the card stays one
   glance; a story with no natural exhibit declares none and the card is text. Never type
   chart or table values on a page or in the declaration; map them from the data.
11. **Read the story into the state record.** The state record (the tracked-figures block at
    the foot of every story) is filled from the story's own pins, at authoring time, not by a
    separate batch: register the manifest's exact pinned text and deterministically fill its
    sourced and computed figures (`references/procedures.md`, step 12), then rebuild. A Luna
    read of only these pins is optional; the deterministic fill makes no model calls. A story whose foot says
    the state has not read its sources is not done.
12. **Rework the class, then keep iterating.** A review names instances; each instance
    belongs to a class (a stitched quote, an outlet quoted with words it did not print, a
    typed number, an unsupported explanation, internal vocabulary). Fix the named line,
    sweep the whole page for the class, rerun both lints and the interrogation, and report
    the sibling count per class. A page is a living record. When a record the page names as missing
    arrives (a transcript, a roll call, a later filing, a transcript of a spot that was on the
    post all along), capture it that day, fold it in, re-check the claim, and add the dated
    line to What happened next. "No transcript is saved" is a task with a date, never a
    sentence that ships twice.
13. **Stage, then ship on a human's word, then audit live.** Publication is a human
    decision: hand over the rendered page, not receipts. Commit by explicit path (page, data module, manifest,
    ledger, pins). Push. Poll the live URL until the new content serves, then re-run the
    language checks on the live bytes and screenshot at 100 percent zoom. Judge only the
    live domain; local dev servers and browser caches serve stale HTML.

## Language rules (hard, enforced by the gate)

- No em dashes anywhere in public copy.
- Quote the record once per paragraph, then say what it means in the reader's words. A paragraph with two quotations is two paragraphs or one quotation.
- No internal vocabulary in visible text. The gate's list: byte-captured, capture debt,
  operator review, signed export, retrieval, automated, staging, sha256, checked into,
  admission row hash, eligible claim, manifested, dossier, extraction pipeline, staged,
  internal review, cloture, perfecting nature. Receipts speak in reader words.
  A source that refuses capture is described as "does not let its pages be saved", never
  as blocking automated retrieval.
- No repo paths, bare hashes, enum values, or typed labels on the page. If reading a
  line requires knowing project vocabulary, rewrite it.
- No text jammed against an inline tag (`<em>under</em>counting`). Keep the space on
  the same source line; Astro collapses a newline before an inline element.
- Verdict words are plain: "checks out", "mislabeled", "wrong". No invented categories.
- Day-dates never appear in URLs or section kickers; stories are slugged by month.

## Before you say done

- [ ] Every step above maps to an artifact, or is reported as not done.
- [ ] The completeness audit ran on the built page (`checks/audits/<subject>--<story>-<date>.md`),
      every finding has a disposition, and the rerun returned COMPLETE or its remaining
      checks are typed on the page.
- [ ] Every number on the page was recounted from the pinned bytes this session.
- [ ] Step 12 ran: every manifest figure appears in the built state record with its unit
      and source passage; computed figures show their inputs and formula as computations.
      Registration preserved every pinned text hash, state verify passed, and the build gate is green.
- [ ] `npm run build` passed with the gate; `lens_lint.mjs` reports zero uncited narrative;
      `prose_lint.mjs` and `quote_lint.mjs` report zero findings.
- [ ] Measured in a browser at 1280 wide (section-grammar shape rule 10): at least one figure,
      a chronology table if the story has dated steps, zero dollar figures to the cent in
      the story view, no facts behind a collapsed element, and the story view not more than
      about 9,000 px tall.
- [ ] SOURCES.md regenerated after the last pin; every manifest `pinned_path` basename has a row.
- [ ] Zero same-source adjacent `<Cite>` pairs; every computed number is visible or deleted.
- [ ] The open-questions list asks for nothing the records list already holds.
- [ ] No `.md.err`, `data/state/`, or `data/sources/officials/` file in the commit.
- [ ] Live bytes audited, not a staging copy.
- [ ] The reader-facing delta is named in one sentence.

## Gotchas

- Fed and FRED endpoints accept a browser User-Agent; BLS release archives and CME tool
  pages block direct fetches. Recover and disclose; never paraphrase from memory.
- ALFRED multi-vintage comma syntax silently returns only the first vintage: fetch one
  vintage per call and concatenate.
- The `?mode=` links on the switcher only work with JavaScript. Do not describe them as a
  no-JavaScript fallback; the no-JavaScript view is The story.
- A story page under `src/pages/events/<subject>/` without a manifest fails the build.
- A new story is accepted into the state, linked to the previous story in its series, and
  its view is refreshed with one command each (procedures.md, step 10); none of the three
  waits on a maintenance fire.
- The story slug is the data month (`august-2026` for the report released September 4), not
  the release month. `new-event.mjs` derives the slug from `--date`, so pass a date inside
  the data month or copy the previous month's page instead.
- The article search index lags the registry by a day or more; the registry is the coverage
  universe, the index a second net.
- The gate runs in the Workers git build too, so a failing gate blocks the deploy.

## References (read when the step calls for it)

- `references/section-grammar.md`: section order, chip vocabulary, component usage, layer rules per section.
- `references/gold-traces.md`: the two gold builds step by step, with the lessons each one produced.
- `references/manifest-and-gate.md`: manifest fields, SOURCES.md ledger, gate checks, ship verification.
- `references/anti-patterns.md`: the drift the audit found on the gold pages and the rule for each.
- `references/procedures.md`: every command, step by step, from recipe scaffold to live audit.
- `references/completeness-audit.md`: the three-layer audit, the four dispositions, the completion standard.
- `references/interrogation.md`: the independent completeness review, its prompt, and how each gap is dispositioned.
