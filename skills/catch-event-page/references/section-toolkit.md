# Section toolkit, chip vocabulary, layers

Sections are tools, not obligations. The core below is fixed. Every other section is chosen
by the reader model's question tree (`story.md`, answer 7) and left out when no question asks
for it. The page skeleton is the site's data shape; it is never the visible shape of every
story. A story that fills every box reads as generated, whatever the sentences say.

## Shape rules

0. **The story view carries A and B material only** (`story.md`). Narrative carries the story
   in the Zika register (/officials/marco-rubio/zika-2016/: one dense What happened that
   explains each mechanism inline the moment it is needed, then the chronology, then the
   words as cards, then the record). A `SourcedBlock` that restates a document line by line
   (the filing itself, a committee's books, a ballot listing, a docket) is marked `detail`
   and shows in Just the facts and Show the work, in the open; the story view hides it
   (`ReadingModes.astro`). A fact a stranger needs to follow the story is written into the
   narrative with its cite, never left in a detail block. Collapsed `<details>` are for proof
   only (arithmetic, capture dates, method), never for facts.
1. **Write in descending order of importance.** Each section opens with the sentence a
   stranger most needs and each paragraph after goes one step deeper. The full record sits
   at the end of its section as detail blocks, or in the closing records list.
2. **A figure when comparison is easier seen than read.** Two or more comparable numbers
   (committees, months, candidates, outlets, years) render through `BarChart`, `DataTable`,
   `DecisionTimeline`, or `StepChart` from values in the data module, inside a
   `<figure class="story-figure" data-layer="fact">` with a figcaption and a one-sentence
   `chart-source` line; the `chart-vintage` line is `proof`. A series the story states in one
   sentence needs no figure. A story with dated steps has a chronology table.
3. **One mechanism sentence per introduced term, inline, at first use.** Independent
   expenditure, 48-hour notice, connected TV, margin of error, seasonal adjustment, Global
   Gateway: one sentence in everyday words, in the paragraph that first leans on the term.
4. **A section answers the question written beside it in the reader model, and ends when the
   answer is complete.** A closing sentence that weighs, sums up, or tells the stranger what
   to take from the section is cut; `voice_lint.py` lists them. A section that ends on a
   quote is finished if the quote is the answer.
5. **Round in the story; cents in the proof.** Story and fact text carry rounded figures
   ($7.7 million, 2.5 percent); exact figures live in proof receipts and the data module.
6. **Rank the catch.** One to three, ordered by how far the wrong reading would carry a
   stranger. Each pairs the outlet's sentence (its pin, byte for byte) with the record
   passage that contradicts it, both cited, and names the mistake it prevents. Small slips
   share one `catch-minor` line or go to the coverage cards. A row with one record is a fact
   block, not a catch. Never a list of every discrepancy the census found.
7. **Coverage as cards, errors first, with the closed chip set.** `OutletCheck` cards,
   `status="warn"` first; chips are the vocabulary below, never invented words. Outlets that
   carried one dispatch share a card. One count line above the cards.
8. **Who feels it is prose about named people and places, with dates**, each sentence
   cited: the worker, the traveler, the town, the taxpayer, what changes for them and when.
   Never a dated list of rows. Its length follows the consequence in the record, not the
   length of the other sections.
9. **Quote cards are byte-contiguous.** A `QuoteCard` holds one unbroken span of the record.
   Never join two sentences the record separates with attribution ("he said"), a question, or
   other text, and never lift a phrase the record reports indirectly ("described the EU as a
   loyal friend") into direct speech. If the best two sentences are not contiguous, show the
   contiguous one and put the other in the narrative with its own Cite. Byte-exact means the
   card text is a substring of the pinned text file; check it with a search before build.
   A person's words are a card (speaker, date, venue, the words, the record), not a paragraph
   that begins with an institution's name. The paragraph before the card says who is about
   to speak and why; never two cards in a row, never a card after a figure or a heading.
10. **The page never names or describes its reader, and never narrates its own method** in
    the story or fact layers. "A reader", "readers", "this page found", "we could preserve",
    "as reproduced by", "searched", "the records add up to" are proof-layer sentences or they
    are cut; `voice_lint.py` fails the page on them.
11. **Measure before you say done.** In a browser at 1280 wide: story-view height, words by
    layer, fact blocks per section, dollar figures to the cent, figures on the page. The
    gold jobs page is 7,100 px, 1,745 words, 15 fact blocks, one chart and two tables. A
    page at twice that height with no figure is the anti-pattern; so is a page that reaches
    the target by collapsing its facts.

## The core (every story)

| Section (anchor) | Layer | Contents |
|---|---|---|
| Kicker, headline, dek, `<ReadingModes />` | kicker narrative; h1 and dek fact | Headline states the most important change, with the number when the number is the change. Dek adds the two facts a stranger needs to read on. |
| In this story (`story-toc`) | fact | Ordered list of the section anchors the story actually has. |
| KPI strip | fact | Three to four values from `event.kpis`, when the story has that many figures; values nowrap; units small. |
| What happened (`what-happened`) | fact + narrative | Three to six narrative paragraphs answering reader-model answers 1, 4 and 5 in that order: the first paragraph is the clean model (what happened and what it means), each paragraph after goes one level deeper, the mechanism sentence at a term's first use. After the sixth paragraph a stranger has the model or the section is doing another section's job. The record's own lines follow as `SourcedBlock kind="record" detail`. |
| What happened next | fact | Dated additions only, once there are any; never rewrite earlier sections. Ends with a "watching" line. |
| What we do not know yet (`unknowns`) | narrative | Only after the disproof search, cited where a record bounds the unknown; absent when empty. A step that is scheduled but not yet due is a next step, not an unknown. |
| The records (`records`) | fact; usage notes proof | `<StorySources event="<subject>/<story>" />`. Grouped: primary documents, official data, coverage checked. |

## Optional sections, chosen by the question tree

| Section (anchor) | Use when | Contents |
|---|---|---|
| Three things to know | The three points are dimensions the headline and dek do not carry. Otherwise omit; it restates the fold. | Three declarative sentences, each a `SourcedBlock` with a `Cite`. |
| The catch (`the-catch`) | A pinned record contradicts something an outlet or the headline said (answer 3). | Placed right after the section that establishes the concept the wrong reading depends on; that is What happened when the concept is the event itself. One bold lead phrase of two to four words, then one to three cited paragraphs naming the two records, what each says, and the mistake it prevents. Tags only where they fit: "Told versus record", "Left out", "Who pays" (with its number). Bordered block, kicker "The catch". |
| Where this sits (`where-this-sits`) | Answer 2 or 5 needs a baseline: the race, the scale, the history. | Chart or table from the admitted series when comparison is easier seen than read; two to four narrative paragraphs; the rest of the record as detail. Vintage line and values table are proof. Percentiles, streaks, "held for N days" are `computed` chips with receipts. Capped at a quarter of the page. |
| A section named for its concept | A question in answer 7 that no standard section answers ("The statement barely moved", "The June request buys more than the war"). | Prose that answers that one question, cited; a figure or a card when the answer is one. Prefer this to stretching a standard section. |
| Projections / the real signal | The record has one (SEP tables, revision tables, household survey). | fact + narrative. |
| Who feels it (`who-feels-it`) | The record names the people and places (answer 2). | Prose, cited, then the official series they live with (mortgage rate, unemployment, real earnings). |
| What the coverage got right, and what it got wrong (`outlets`) | An outlet's error is A or B material. Otherwise the coverage check lives in detail blocks and Show the work. | One count line, then `OutletCheck` cards, errors first: what they wrote, the chip verdict, what the record shows, the `Cite` in the card's slot. |
| What the markets said (`markets`) | The record has dated pricing. | Dated quotes with source; single-outlet pricing gets the same treatment as any single-outlet fact. |

Removed from the toolkit: "Claim checked against the record". A claim on this site is checked
only when someone made it: an outlet's sentence in the catch or a coverage card, an official's
words in a card. The page never writes the popular framing itself and then grades it.

## Chip vocabulary (closed set; extend only by decision)

record / their words / computed / official data / single outlet / reported pricing /
one source / checks out / consistent / mislabeled / unconfirmed / not in the record.

`not in the record` (decided 2026-09-18): the outlet's claim has no pinned support and no
pinned contradiction; the row names the search. `mislabeled` and `wrong` need a quoted
record that says otherwise.

`SourcedBlock kind=` accepts `record`, `computed`, `official`, `checked`. Verdict words in
prose: "checks out", "mislabeled", "wrong".

## Components and how they bind

The story component library lives in `src/components/story/`; `index.ts` is the full list
(fifteen, including `StoryToc`, `SectionKicker`, `Chip`, `RailedParagraph`, `LiveCounter`,
`RecordsList`). The ones a story page binds by hand:
`BarChart` (bars: label and value; negatives red), `DataTable` (columns, rows,
highlightColumn), `StepChart` (rate paths), `OutletCheck` (outlet, claim, verdict, chip,
status ok/warn/note; put the `Cite` in the slot), `CheckedBlock` (label, variant
confirmed/contested), `Receipt`, `DecisionTimeline`, `KpiStrip`, `ThreeThings`. Import each
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
