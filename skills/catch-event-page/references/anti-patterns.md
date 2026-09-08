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
