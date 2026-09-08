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
5. **Verify outlet claims against the record.** Before crediting an outlet for a fact, search
   every primary pin for it (case-insensitive; uppercase and hyphenated headings defeat
   case-sensitive searches). The primary takes the cite; the outlet row says it checks out.
   Legal and financial terms appear first as the pin's word in quotation marks, then in reader
   words. Each checkable claim in each coverage
   article is compared with the primary document. Verdicts use the closed chip set
   (see `references/section-grammar.md`). A wrong claim is named plainly: who, what they
   wrote, what the record shows. Be ready for the page's own earlier claim to be wrong
   in a more specific way than the reviewer said; say so on the page with a dated
   correction.
6. **Write in the section grammar, as an inverted pyramid.** Fixed order, sections dropped
   only when truly empty. Read `WRITING.md` at the repo root (house style; it binds every
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
9. **Independent interrogation.** A model that did not write the page reads the built
   page with web and X search on and lists everything it does not cover: missing sources,
   reactions, drama, wrong sentences (`scripts/interrogate.sh <subject>/<story>`; prompt
   and handling in `references/interrogation.md`). Every gap becomes a needs-ledger row,
   fixed on the page, typed unreachable, or declined with its reason. An item that names a
   fetchable public record is a fetch, not a decline. Write the catch box after this step:
   each row names the two records that disagree. Never dismiss the
   list wholesale.
10. **Update the subject page and homepage.** New story = one timeline row + KPI/chart
   refresh on `/events/<subject>/`; the homepage features the latest story. Each month's
   page is standalone and is never edited afterwards: a revision to last month's number is
   this month's story and goes on this month's page (its revisions table and claim check).
   A story with a chart declares it once, in its data module, as `event.visual`
   (`{ kind, source, from, to, latest, range, rangeCompact }`); the story page, the
   series page, and the homepage lead card all render from that one declaration
   (`<PayrollChart {...event.visual} />`). Never type chart props on a page.
11. **Read the story into the state record.** The state record (the tracked-figures block at
    the foot of every story) is filled from the story's own pins, at authoring time, not by a
    separate batch: ingest the manifest's pins and run the extraction for this event (commands
    in `references/procedures.md`, step 12), pull the state, rebuild. A story whose foot says
    the state has not read its sources is not done.
12. **Keep iterating.** A page is a living record. When a record the page names as missing
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
- [ ] Every number on the page was recounted from the pinned bytes this session.
- [ ] `npm run build` passed with the gate; `lens_lint.mjs` reports zero uncited narrative.
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
- `references/interrogation.md`: the independent completeness review, its prompt, and how each gap is dispositioned.
