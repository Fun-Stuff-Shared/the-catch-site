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
