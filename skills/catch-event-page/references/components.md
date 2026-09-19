# Chips, components and layer rules

## Chip vocabulary (closed set; extend only by decision)

record / their words / computed / official data / single outlet / reported pricing /
one source / checks out / consistent / mislabeled / unconfirmed / not in the record.

`not in the record` (decided 2026-09-18): the outlet's claim has no pinned support and no
pinned contradiction; the row names the search. `mislabeled` and `wrong` need a quoted
record that says otherwise.

`SourcedBlock kind=` accepts `record`, `computed`, `official`, `checked`. Verdict words in
prose: "checks out", "mislabeled", "wrong".

## Components and how they bind

The story component library lives in `src/components/story/`; `index.ts` lists every
component a story page binds (eighteen, including `StoryToc`, `SectionKicker`, `Chip`,
`RailedParagraph`, `LiveCounter`, `RecordsList`); `RevisionTimeline` and `QuotedText` in the
same directory are site internals rendered by `StoryState`. The ones a story page binds by
hand: `BarChart` (bars: label and value; negatives red), `DataTable` (columns, rows,
highlightColumn), `StepChart` (rate paths), `DateLine` (points: label and date; intervals:
days; highlight), `OutletCheckFold` (count, method; the `OutletCheck` cards go in its slot),
`OutletCheck` (outlet, claim, verdict, chip, status ok/warn/note; put the `Cite` in the
slot), `CheckedBlock` (label, variant confirmed/contested), `QuoteCard` (speaker, when,
where, label), `Receipt`, `DecisionTimeline`, `KpiStrip`, `ThreeThings`. Import each
from its `.astro` file. /events/texas-senate/2026-09-05-maga-inc-10-million-ad-buy/ and /events/fed-rate/2026-06-17-unanimous-hold/
use them; copy their shapes.

```astro
<SourcedBlock source="bls-empsit-2026-07" kind="record">
  <p>The Bureau of Labor Statistics reported on August 7 that payroll employment fell by 23,000.<Cite s="bls-empsit-2026-07" /></p>
</SourcedBlock>

<p data-layer="narrative">The decline was concentrated in local government education.<Cite s="bls-empsit-2026-07" passage="local government education lost 50,000 jobs" /></p>

<details class="receipt" data-layer="proof"><summary>how this was computed</summary>
  <p>Monthly change from the saved PAYEMS series, seasonally adjusted, first print against the August 11 vintage. Mean revision minus 16,000 across six months.</p>
</details>

<figure class="story-figure" data-layer="fact">
  <figcaption><strong>Outside money in the general election, by committee</strong><span>Millions of dollars reported to the FEC.</span></figcaption>
  <BarChart bars={outsideMoney.bars} unit="m" ariaLabel="..." />
  <p class="chart-source">MAGA Inc.'s $10 million is the largest single filing.<Cite s="fec-ie-2026-bulk" passage="LONE STAR LIBERTY PAC" /></p>
  <p class="chart-vintage" data-layer="proof">FEC bulk file saved September 8, 2026.</p>
</figure>

<OutletCheck outlet="CBS News" claim={`wrote that Trump was &ldquo;donating $10 million&rdquo;`} verdict="The spending is independent, not a donation." chip="mislabeled" status="warn"><Cite s="cbs-texas-senate-ad-blitz" passage="donating $10 million" /></OutletCheck>

<StorySources event="jobs/2026-08-07-july-payrolls-fall-23000" />
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
