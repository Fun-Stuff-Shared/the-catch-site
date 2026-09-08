# Section grammar, chip vocabulary, layers

Ratified 2026-08-23 against /events/fed-rate/june-2026/, reworked 2026-08-31 on
/events/jobs/july-2026/, and given the shape rules below on 2026-09-08 after Zain read
/events/texas-senate/september-2026/ as a wall of text. Order is fixed. Drop a section only
when it is truly empty.

## Shape rules (inverted pyramid, 2026-09-08, Zain)

The page is an inverted pyramid. A reader who stops after Three things has the story; a
reader who stops after The catch has the checking; everything deeper is there for the
reader who wants it, behind a disclosure, never in the way. The depth stays on the page.
It does not stay in the reader's path.

1. **Budget the fact blocks.** A section carries at most four `SourcedBlock`s in the open.
   Every further record goes inside a `<details class="receipt" data-layer="fact">` with a
   plain summary line ("the filing, line by line", "the ballot and the calendar"). A
   disclosure tagged `fact` stays visible in The story and Just the facts, collapsed; a
   disclosure tagged `proof` shows only in Show the work. Method notes, capture dates, and
   arithmetic are `proof`; records a curious reader might open are `fact`.
2. **Every number series is a figure, not a paragraph.** Two or more comparable numbers
   (committees, months, candidates, outlets, years) render through `BarChart`, `DataTable`,
   or `StepChart` from values in the data module, inside a `<figure class="story-figure"
   data-layer="fact">` with a figcaption, a one-sentence `chart-source` line that says what
   the figure shows, and a `chart-vintage` line tagged `proof`. A story with a numeric series
   and no figure is not done.
3. **One mechanism sentence per introduced term.** Before the first number that leans on a
   term (independent expenditure, 48-hour notice, connected TV, margin of error, seasonal
   adjustment, Global Gateway), one sentence says what the thing is in everyday words.
   The jobs page's "the jobs report is really two surveys" is the model.
4. **Every section ends on a "so what".** The last narrative sentence of a section says
   what the section's records add up to for the reader ("a tie by the poll's own standard";
   "a hiring stall more than a burst of layoffs"). A section that ends on a quote is not
   finished.
5. **Round in the story; cents in the proof.** Story and fact text carry `millions()`-style
   rounding ($7.7 million, 2.5 percent). Exact figures live in the proof receipts and the
   data module. Zero dollar figures to the cent in the story view is the check.
6. **Rank the catch.** Rows in The catch are ordered by consequence, each carries a "Why it
   matters:" clause of one sentence, and rows that cannot earn one (LLC versus Inc., a
   pronoun, a rounding) go into a single `catch-minor` line under the list or out. A row
   rests on two records that disagree, never on a label, a preview, a dateline correct in
   local time, or a broader true word.
7. **Coverage as cards, errors first.** The outlets section uses `OutletCheck` cards with
   `status="warn"` rows first and one `ok` card per outlet or per shared dispatch, never
   a paragraph per outlet that concludes the outlet was right. One narrative line above
   the cards states the count ("Nine outlets. Six got the filing right. Three called
   independent spending a donation.").
8. **Who feels it is a dated list.** A `dated-list` of the reader's own facts in order
   (deadlines, hearings, when the money lands, when the vote is), each cited, plus at most
   two narrative paragraphs. It is the section readers come for; it is never the shortest.
9. **Measure before you say done.** In a browser at 1280 wide: story-view height, words by
   layer (fact, narrative, proof), fact blocks per section, dollar figures to the cent,
   figures on the page. The gold jobs page is 7,100 px, 1,745 words, 15 fact blocks, one
   chart and two tables. A page at twice that height with no figure is the anti-pattern.


## Page skeleton (in order)

| # | Section (anchor) | Layer | Contents |
|---|---|---|---|
| 0 | Kicker, headline, dek, `<ReadingModes />` | kicker narrative; h1 and dek fact | Headline states the outcome with the number. Dek adds the two facts a reader must know. |
| 1 | In this story (`story-toc`) | fact | Ordered list of section anchors below. |
| 2 | KPI strip | fact | Three to four values from `event.kpis`; values nowrap; units small. |
| 3 | Three things to know | fact | Three declarative sentences, each a `SourcedBlock` with a `Cite`. |
| 4 | What happened (`what-happened`) | fact + narrative | Three to five narrative paragraphs that tell it in order, citing the records, with the mechanism sentence for each new term; the record's own lines (`SourcedBlock kind="record"`) sit in a `fact` disclosure ("the filing, line by line") unless a quote is the story. |
| 4b | The catch (`the-catch`) | fact | Pilot rule (2026-09-08, Zain). Three to five rows, each a record-bound takeaway: a bold lead phrase of two to four words, one or two cited sentences, and an anchor link to the section that holds the evidence. Exactly three tags, in these words: "Told versus record" (a headline or claim the record contradicts), "Left out" (a fact in the record or held coverage the coverage skipped), "Who pays" (the cost to a consumer, traveler, worker, or taxpayer, with its number). No row without a `Cite`; no opinion words. Ranked by consequence; each row ends with "Why it matters:" and one sentence; small slips share one `catch-minor` line. A bordered block like Three things, visually distinct from it, kicker "The catch". |
| 5 | Where this sits (`where-this-sits`) | fact chart + proof provenance + narrative | Chart or table computed at build from the admitted series (`BarChart`, `DataTable`, `StepChart`); three or four narrative paragraphs that place the event (the race, the scale, the history); the rest of the record in `fact` disclosures. Vintage line and values table are proof. Percentiles, streaks, "held for N days" are `computed` chips with receipts. Capped at a quarter of the page. |
| 6 | Projections / the real signal | fact + narrative | Only when the record has one (SEP tables, revision tables, household survey). |
| 7 | Who feels it (`who-feels-it`) | fact + narrative | A `dated-list` of the reader's own facts in order, each cited, then the official series the reader lives with (mortgage rate, unemployment, real earnings). |
| 8 | What the coverage got right, and what it got wrong (`outlets`) | fact | One count line, then `OutletCheck` cards, errors first: what they wrote, the chip verdict, what the record shows, the `Cite` in the card's slot. Outlets that carried the same dispatch share one card. |
| 9 | Claim checked against the record (`claim-check`) | fact + proof | The recurring premise in a `CheckedBlock` (`variant="contested"` when the claim is wrong), recomputed, with its computation receipt in proof. The block checks the claim readers came with; a page that declines it says in one sentence what record would let it. |
| 10 | What the markets said (`markets`) | fact | Dated pricing quotes with source; single-outlet pricing gets the same treatment as any single-outlet fact, no special hand-wringing. |
| 11 | What happened next | fact | Dated additions only; never rewrite earlier sections. Ends with a "watching" line. |
| 12 | What we do not know yet (`unknowns`) | narrative | Cited where a record bounds the unknown. |
| 13 | The records (`records`) | fact; usage notes proof | `<StorySources event="<subject>/<story>" />`. Grouped: primary documents, official data, coverage checked. |

## Chip vocabulary (closed set; extend only by decision)

record / their words / computed / official data / single outlet / reported pricing /
one source / checks out / consistent / mislabeled / unconfirmed.

`SourcedBlock kind=` accepts `record`, `computed`, `official`, `checked`. Verdict words in
prose: "checks out", "mislabeled", "wrong".

## Components and how they bind

The story component library lives in `src/components/story/` (see its `index.ts`):
`BarChart` (bars: label and value; negatives red), `DataTable` (columns, rows,
highlightColumn), `StepChart` (rate paths), `OutletCheck` (outlet, claim, verdict, chip,
status ok/warn/note; put the `Cite` in the slot), `CheckedBlock` (label, variant
confirmed/contested), `Receipt`, `DecisionTimeline`, `KpiStrip`, `ThreeThings`. Import each
from its `.astro` file. /events/texas-senate/september-2026/ and /events/fed-rate/june-2026/
use them; copy their shapes.

```astro
<SourcedBlock source="bls-empsit-2026-07" kind="record">
  <p>The Bureau of Labor Statistics reported on August 7 that payroll employment fell by 23,000.<Cite s="bls-empsit-2026-07" /></p>
</SourcedBlock>

<p data-layer="narrative">The decline was concentrated in local government education.<Cite s="bls-empsit-2026-07" passage="local government education lost 50,000 jobs" /></p>

<details class="receipt" data-layer="proof"><summary>how this was computed</summary>
  <p>Monthly change from the saved PAYEMS series, seasonally adjusted, first print against the August 11 vintage. Mean revision minus 16,000 across six months.</p>
</details>

<details class="receipt" data-layer="fact"><summary>the filing, line by line</summary>
  <SourcedBlock source="fec-form24-cover" kind="record"><p>...<Cite s="fec-form24-cover" /></p></SourcedBlock>
</details>

<figure class="story-figure" data-layer="fact">
  <figcaption><strong>Outside money in the general election, by committee</strong><span>Millions of dollars reported to the FEC.</span></figcaption>
  <BarChart bars={outsideMoney.bars} unit="m" ariaLabel="..." />
  <p class="chart-source">MAGA Inc.'s $10 million is the largest single filing.<Cite s="fec-ie-2026-bulk" passage="LONE STAR LIBERTY PAC" /></p>
  <p class="chart-vintage" data-layer="proof">FEC bulk file saved September 8, 2026.</p>
</figure>

<OutletCheck outlet="CBS News" claim={`wrote that Trump was &ldquo;donating $10 million&rdquo;`} verdict="The spending is independent, not a donation." chip="mislabeled" status="warn"><Cite s="cbs-texas-senate-ad-blitz" passage="donating $10 million" /></OutletCheck>

<StorySources event="jobs/july-2026" />
```

- `Cite s=` must name an id in the manifest's `story_sources`; the build throws otherwise.
- `passage=` is optional and carries the exact words the citation points at; use it for
  narrative claims so the reader can open the evidence at that line.
- `SourcedBlock` marks the block `data-layer="fact"` itself. Never nest a proof element
  inside it without its own `data-layer="proof"`.

## Layer rules that the gate does not check (so you must)

- A narrative paragraph carries at least one `<Cite>`. `scripts/lens_lint.mjs` lists the ones that do not.
- Capture dates, vintage notes, method notes, and value tables are proof, never fact, even when they sit inside a figure.
- Live elements (a days-since counter) state their last-checked date and the correction promise in proof, and the guarded value in fact.
- The switcher's trust line ("Every claim here traces to a source.") stays on the page.
