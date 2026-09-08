# Anti-patterns (each one was found on a real page)

### Uncited narrative
**What happens:** a `data-layer="narrative"` paragraph makes a numeric or causal claim with no `<Cite>`.
**Why it is bad:** "Just the facts" hides it, but "The story" shows it with nothing behind it; the page's promise ("every claim traces to a source") is false for that sentence.
**Rule:** every narrative paragraph carries at least one `<Cite>`, with `passage=` when the claim is specific. `scripts/lens_lint.mjs` enforces it.
**Instead:** cite the record, or move the sentence into a `SourcedBlock`, or cut it.

### Proof inside a fact block
**What happens:** a chart's "figures from the saved series dated ...; later releases may revise them" line and its values table sit inside `<figure data-layer="fact">`.
**Why it is bad:** auditor-register content leaks into The story and Just the facts.
**Rule:** capture dates, vintage notes, method notes, value tables are `data-layer="proof"` elements of their own.

### Restyled instead of recomputed
**What happens:** a reviewer disputes a number and the page is edited to their number.
**Why it is bad:** the reviewer's memory can be wrong (58 vs 59), and the page's own earlier claim can be wrong in a more specific way than they said.
**Rule:** recount from the pinned bytes; recompute from the admitted series; the pins win.

### Numbers typed twice
**What happens:** a value appears in prose and in a table, typed separately.
**Rule:** derived values live in the data module and render from it.

### Internal vocabulary on the page
**What happens:** "staged", "retrieval note", "assisted capture", "checked into site source data", enum labels, repo paths, hashes.
**Rule:** reader words only. The gate lists the banned terms; the list is the floor, not the ceiling.

### Recovery presented as truth
**What happens:** a blocked article recovered through assisted search is quoted as if captured as served.
**Rule:** verify every figure in a recovery against the primary document, and disclose the recovery in SOURCES.md and the records list.

### Claiming a no-JavaScript fallback
**What happens:** a comment or sentence says the mode links "degrade to query-param links without JS".
**Why it is bad:** only client code reads `?mode=`; without JavaScript the page reloads The story.
**Rule:** the no-JavaScript view is The story. Do not promise more.

### Rewriting an old story
**What happens:** a later development is edited into the original sections.
**Rule:** stories are written once. Later events are dated "what happened next" additions and dated corrections.

### Jammed inline tags and em dashes
**Rule:** keep a space on the same source line before inline elements; never use an em dash in public copy. The gate blocks both.

### Starting on the main document, not the first public act
**What happens:** the page opens on the fact sheet, the opinion, or the enrolled bill and skips the days before it: the announcement post, the officials' briefing figure, the earlier votes, the trial court. Four of four first drafts did this (2026-09-08).
**Why it is bad:** the dispute the page exists to check usually starts before the main document; a page that opens on Monday cannot check what was said on Friday.
**Rule:** the story span in the data module starts at the first public act, and What happened opens there. An interrogation item that names a fetchable public record is a fetch, not a decline.

### Crediting the outlet that repeated a fact that sits in a pinned primary
**What happens:** the 25-year term and the 1.5 million barrel target were in the pinned ministry address; the page credited CBS. The Chinese and Russian operators were in the pinned fact sheet; the page credited Reuters "from officials". The FAA statement existed on the FAA page; the page said there was none.
**Why it is bad:** the outlet row says "checks out" against a record the page never cites, and the primary's own words are lost.
**Rule:** before citing an outlet for a fact, search every primary pin for it, case-insensitive (uppercase and hyphenated headings defeat case-sensitive searches; "AFRICAN GROWTH AND OPPORTUNITY" was missed twice). The primary takes the cite; the outlet row records that it checks out.

### Legal and financial terms drift from the pin's word
**What happens:** "equity stake" for what the company called "rights to a stake" and an official later called warrants; "closed at" for a spot-price series; "state Representative" for what the pin labels a Senate candidate; "traditional opposition and orthodox Chavismo" for "members of the opposition and within the Chavismo movement"; "Powell signed" for an order signed "Chief Justice".
**Rule:** a legal or financial term appears first as the pin's word in quotation marks, then is defined in reader words. A date on a source card is the pin's dateline, recounted at ledger time.

### A catch row built from what the page already says, not from two records that disagree
**What happens:** a row contrasts two layers of one deal (who granted the concession; who the U.S. contracted with) as if they conflicted; another lists two price observations under "who pays" with no incidence; the real dispute (equity or warrants; the administration's own 55 percent arithmetic) is absent.
**Rule:** write the catch box last, after the interrogation. Each row names the two records that disagree. A row with one record is a fact block, not a catch.

### Ledger and manifest decay after the interrogation
**What happens:** pins added late have no SOURCES.md row; the figures list registers eight unlabeled values on a page with twenty numbers; a needs-ledger row still calls a question open after a pinned record answered it; an open-questions bullet asks for a document the same page already cites; orphan files (.md.err, data/sources/officials/) are left in the tree.
**Rule:** the last three steps before commit are: regenerate SOURCES.md, grep every manifest pinned_path basename against it, re-read the open-questions list against the records list. Every displayed number is a labeled figures entry.

### Same-source adjacent cites and proof-only numbers
**What happens:** 11 of 34 adjacent cite pairs on one page cited the same record twice, rendering "1 , 1"; a share was computed into the data module and a proof block but never stated in visible text; paragraphs were split into one-sentence paragraphs to attach claim-sized passages.
**Rule:** one Cite per sentence unless two different records support it; a computed number appears in the fact layer or is deleted with its proof block; passages attach to clauses, not to new paragraphs.

### A wall of record blocks
Texas Senate, first version (fcd3c048): 42 `SourcedBlock`s, 45 dollar figures to the cent,
no figure, 10,555 px tall; the narrative layer was the same size as the gold jobs page, so
the excess was records, not story. Three readers quit at the same place: the first run of
paragraphs that each open with an institution's name. Rule: section-grammar shape rules 1,
2, 5, and 10. Write in descending order with the depth in the open at the end of each
section; every number series a figure; round in the story; measure the page before saying
done. Hiding the depth in collapsed boxes is not the fix (Zain, 2026-09-08, on the first
Texas restructure): the reader should be reading toward it, not clicking for it.

### Catch rows in identical furniture
"LLC, not Inc." sat between "Not a campaign gift" and "Not the first outside money" in the
same box, and a skeptical reader read the trivial row as padding that devalued the real
ones. Rule: shape rule 6. Rank by consequence, one "Why it matters" per row, small slips on
one line.

### A paragraph per outlet that concludes the outlet was right
Nine outlet paragraphs, six of them "checks out", read as roll call and every reader
skipped the section. Rule: shape rule 7. `OutletCheck` cards, errors first, one card for a
shared dispatch, a count line above.

### The section readers came for is the shortest
Who feels it on Texas was 358 px with the early-voting date under a paragraph about
unitemized contributions; on Greenland the reader's own facts (6 to 15 megabit, the housing
backlog, the soldiers arriving that week) sat in a catch box, in What happened next, and in
a fact-check aside. Rule: shape rule 8. A dated list of the reader's facts, in order.

### Pinned coverage read for quotes, not for content
Texas (746e4523): the Tribune pin alone held the outside-spending picture, the race totals,
Trump counting PACs and nonprofits toward "a billion", and Thune's $8 million a week; none
reached the page. Greenland (d27c5d84): the factsheet and the 2021 programming document
were named as sources and unused; DR and KNR pins held the 15 million kroner co-financing,
the three-day meeting sequence, and the housing deadline. Rule: after pinning an article or
document, list every passage that changes a reader's understanding, and place each or type
why not.

### An absence claim without the capture that would show the positive
"Did not post the Ennis statement"; "first 2026 general-election independent expenditure"
resting on one later filing; "no White House statement" with no listing saved. Rule: no
negative without the capture that would show the positive, with the search named; check
earlier filings before any "first".

### An unrelated record framed as a response
Talarico's "crony capitalism" post named nothing about the buy; the Trump map post named
nothing about the Commission package, and no outlet tied them. Rule: quote what the record
says about the event; if it names nothing about the event, say so or leave it out. A catch
row needs an outlet that told the reader the thing the record contradicts.

### A broader true word, a rounding, a preview, or a label called a discrepancy
AP's "television" against "connected TV"; AP's "around half a billion" against €530 million;
France 24's "expected to unveil" published the evening before; Reuters' Sunday dateline on a
piece first published Sunday in Nuuk; the Commission press-corner "Sep 6" label against the
7 September signature block. Rule: a catch row rests on two records that disagree. Rounding,
previews, datelines correct in local time, and publication labels are not disagreements;
say what they are in one line.

### An interactive portal pinned as its empty shell
The Texas Secretary of State candidate portal saved as an Angular shell with no candidates.
Rule: if the pin has no data, it is not a pin; capture with a browser and save what rendered.

### Stitched quotations in quote cards
Greenland, layout pass (539c1f21): four of eight quote cards joined non-contiguous record
text. The Davos card fused two passages 1,400 characters apart into one sentence that never
appears in the transcript; the Nielsen card turned AP's indirect "described the EU as a loyal
and trusted friend" into direct speech and welded it to a separate quotation; the Frederiksen
and Air Force One cards bridged an attribution and a separate question. Each Cite passage
was real, so the gate passed. Rule: a card is one byte-contiguous substring of the pinned
text; the Cite passage proves a phrase exists, not that the sentence does. Sibling: any
`QuotedText` or blockquote built from a coverage article that paraphrases.

### The explanation the records do not give
Same page: the ten-versus-eleven NATO count was "explained" as observers in the total; no
record defines either count. A catch row states the disagreement and what each record
says about its own denominator; it does not supply the missing reconciliation.
