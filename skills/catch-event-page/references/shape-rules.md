# Shape rules: how a story page is built to be read


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
