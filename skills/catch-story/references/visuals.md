# Showing it: the visual toolkit

A reader takes in a timeline, a comparison or a count faster from something drawn than
from a paragraph. So the default is to show: where a section's answer has a shape (a
sequence of dates, two things side by side, parts of a whole, a number against what came
before, a person's own words), draw it, and let the prose carry what the picture cannot
(why, what it means, who disputes it). Prose stays the spine; a visual sits beside the
paragraph that introduces it and never replaces the sentence that says what it shows.

Not every section needs one, and a visual that repeats the paragraph next to it is noise.
But a screen of prose with nothing to look at is a page the reader leaves. A visual the
reader needs is part of the story, never a one-click detail: `detail` is for raw record
(a docket listing, a filing line by line), not for the timeline that explains why now.

Every visual is cited like prose, its numbers come from the data module, and its caption
says what it shows in a sentence a reader can check. A cell or label that states a fact is
its claim's `short` form and cites the claim (`cites: [{ c: "<id>" }]` on a timeline entry),
so the cell keeps the claim's "may" or "signalled": `assets/example-claims.md`. The seen-on
pages below cite records directly, from before the ledger.

## Which one, for which question

| The reader is asking | Show it with | Component and props | Seen on |
|---|---|---|---|
| How did we get here? In what order? | A dated chronology | `DataTable` (`columns`, `rows`, `caption`) in a `<figure class="story-figure">`, or `DecisionTimeline` (`entries: [{date, title, sub?, current?, cites?}]`, `heading`) | `okinawa/2026-10-04…astro` "From U.S. rule to this case"; `jobs/2026-10-02…astro:245` |
| How long between these steps? | Dates on a line with the days between | `DateLine` (`points: [{label, date}]`, `intervals: [{days}]`, `highlight?`, `ariaLabel`) | `mail-voting/2026-09-14…astro:137` |
| What exactly did they say? | The speaker's words as a card | `QuoteCard` (`speaker`, `when`, `where`, `label?`), the quote and its `Cite` in the slot; introduced by the paragraph before it | `space-weapons/2026-09-14…astro:76` |
| How big, against what? | The key figures in a row | `KpiStrip` (`kpis: [{value, unit?, label}]`) | `fed-rate/2026-09-16…astro:53` |
| How has it moved? | A chart of the series | `StepChart` (rates and other step series), `BarChart` (`bars: [{label, value}]`, `signed?`), or a page chart like `DieselChart` | `fed-rate/2026-09-16…astro:72`; `canada-tariffs/2026-09-08…astro:166`; `fuel-reserves/2026-10-02…astro` |
| How do the two sides, two documents, two places compare? | A side-by-side table | `DataTable` with one column per side and one row per point | `fuel-reserves/2026-10-02…astro` "The March pledge and what is left of it" |
| What did each outlet get right or wrong? | Outlet cards | `OutletCheck`, `OutletCheckFold` (the section menu says when) | `mail-voting/2026-09-14…astro:189` |

Import each from `src/components/story/<Name>.astro`; every prop above is read from the
component's own `Props`.

## When no component draws it

Some answers have a shape no component covers: seats on a board, who sits on a committee,
which of two homes each document describes. Draw it in the page as plain HTML inside a
`<figure class="story-figure">` with a `<figcaption>`: a short list or grid styled with the
site's existing classes and color tokens, never an image, so it reads in both themes, on a
phone and to a screen reader. Keep it to what the records say, cite it, and keep it small:
a diagram of seven seats is seven boxes and a caption, not an illustration. If two stories
need the same drawing, it becomes a component on its own skill branch.

## Check it rendered

Look at the built page, not the source (section 4): each visual is visible in The story,
reads on a narrow screen, and says what the paragraph beside it claims. A visual that is
hidden, cramped or unreadable is a defect like a broken sentence.
