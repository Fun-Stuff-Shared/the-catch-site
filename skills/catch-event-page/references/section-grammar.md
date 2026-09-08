# Section grammar, chip vocabulary, layers

Ratified 2026-08-23 against /events/fed-rate/june-2026/ and reworked 2026-08-31 on
/events/jobs/july-2026/. Order is fixed. Drop a section only when it is truly empty.

## Page skeleton (in order)

| # | Section (anchor) | Layer | Contents |
|---|---|---|---|
| 0 | Kicker, headline, dek, `<ReadingModes />` | kicker narrative; h1 and dek fact | Headline states the outcome with the number. Dek adds the two facts a reader must know. |
| 1 | In this story (`story-toc`) | fact | Ordered list of section anchors below. |
| 2 | KPI strip | fact | Three to four values from `event.kpis`; values nowrap; units small. |
| 3 | Three things to know | fact | Three declarative sentences, each a `SourcedBlock` with a `Cite`. |
| 4 | What happened (`what-happened`) | fact + narrative | The record's own words first (`SourcedBlock kind="record"`), then narrative that cites them. |
| 4b | The catch (`the-catch`) | fact | Pilot rule (2026-09-08, Zain). Three to five rows, each a record-bound takeaway: a bold lead phrase of two to four words, one or two cited sentences, and an anchor link to the section that holds the evidence. Exactly three tags, in these words: "Told versus record" (a headline or claim the record contradicts), "Left out" (a fact in the record or held coverage the coverage skipped), "Who pays" (the cost to a consumer, traveler, worker, or taxpayer, with its number). No row without a `Cite`; no opinion words. A bordered block like Three things, visually distinct from it, kicker "The catch". |
| 5 | Where this sits (`where-this-sits`) | fact chart + proof provenance + narrative | Chart computed at build from the admitted series. Vintage line and values table are proof. Percentiles, streaks, "held for N days" are `computed` chips with receipts. |
| 6 | Projections / the real signal | fact + narrative | Only when the record has one (SEP tables, revision tables, household survey). |
| 7 | Who feels it (`who-feels-it`) | fact + narrative | Official series the reader lives with (mortgage rate, unemployment, real earnings), each cited. |
| 8 | What the coverage got right, and what it got wrong (`outlets`) | fact | One entry per outlet: what they wrote, the chip verdict, what the record shows. |
| 9 | Claim checked against the record (`claim-check`) | fact + proof | The recurring premise, recomputed, with its computation receipt in proof. |
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

```astro
<SourcedBlock source="bls-empsit-2026-07" kind="record">
  <p>The Bureau of Labor Statistics reported on August 7 that payroll employment fell by 23,000.<Cite s="bls-empsit-2026-07" /></p>
</SourcedBlock>

<p data-layer="narrative">The decline was concentrated in local government education.<Cite s="bls-empsit-2026-07" passage="local government education lost 50,000 jobs" /></p>

<details class="receipt" data-layer="proof"><summary>how this was computed</summary>
  <p>Monthly change from the saved PAYEMS series, seasonally adjusted, first print against the August 11 vintage. Mean revision minus 16,000 across six months.</p>
</details>

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
