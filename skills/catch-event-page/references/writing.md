# Writing a Catch story: the rules that bind each sentence

`WRITING.md` at the repo root is the house style and binds every page. These are the rules
specific to story pages, in the order they come up while writing. Each one is a class of
defect reviewers keep finding; the rule is how the sentence is written so they do not.

## Who the reader is, and which words need introducing

The reader is smart, curious, and reads a general newspaper. Words such a reader meets
weekly are everyday and are never explained: tariff, injunction, payroll, subsidy,
indictment, stay, appeal, warrant, surtax. Agency shorthand, series names, and terms of
art are introduced once, at first use, in the sentence that first leans on them: U-6, SEP,
FOMC, PCE, tariff headings, Section 338, independent expenditure, 48-hour notice,
connected TV, seasonal adjustment. One short apposition or one sentence, then the term is
used freely. Explaining an everyday word insults the reader; using a term of art without
its sentence loses them. A page that introduces more than five or six terms is two pages.

## The opening and the order

The first three sentences tell a cold reader what happened and why it matters to them, in
everyday words, with the number. What happened opens on the first public act and runs in
descending order of importance: each paragraph one level deeper, the full record (every
filing line, every vote) at the end of its section in the open, never in a collapsed box.
The catch comes first among the sections after What happened: one headline claim in bold
lead words, then short prose that names the two records that disagree and says why it
matters. A row with one record is a fact, not a catch. Rounding, previews, datelines
correct in local time, publication labels, and a broader true word ("television" for
"connected TV") are not disagreements; say what they are in one line or leave them out.

## Sentences and passages

- A sentence says what its passage says and no more. A passage that supports one phrase
  is not support for the sentence around it.
- Passages attach to clauses, not to new sentences written to carry a cite. One Cite per
  sentence unless two different records support it; never two adjacent cites to one record.
- A quotation is one contiguous span of the record's bytes, inside quotation marks, and
  nothing else is inside quotation marks: no scare quotes, no paraphrase, no changed byte.
  Two sentences the record separates are two quotations or one quotation and prose.
  An indirect report ("described the EU as a loyal friend") is never lifted into speech.
- One quotation per paragraph, then what it means in the reader's words.
- Legal and financial terms appear first as the pin's word in quotation marks ("rights to
  a stake"), then in reader words. "Equity stake", "closed at", "signed" are the pin's
  words or they are not on the page.
- An outlet is credited only for what its own pin prints. A fact that sits in a pinned
  primary takes the primary's cite; the outlet row says it checks out.
- Coverage is cited in the coverage section, or in a narrative sentence about what the
  outlet wrote. A narrative paragraph does not carry a coverage cite for a fact.
- Every superlative and gloss ("lowest since", "unexpected", "first") quotes a held record
  or does not appear; "first" is checked against earlier filings before it is written.
- A cause is quoted from a record with its author named, or absent, and the absence is
  said plainly. When an outlet authors a cause the record does not hold, that is
  reportable, attributed to the outlet.

## Numbers, counts and units

- Every derived number is computed in the data module from the admitted series and
  rendered by identifier. Round in the story; cents and exact figures in the proof.
- Every count names its unit (a tariff item, a schedule row, a product are three units)
  and is compared only with like units. Unlabeled currency in a national release is that
  nation's currency.
- Every headline number carries its denominator: what was expected, what came before,
  what is normal, against what total.
- Two counts of one list at two dates: compute the removed and added sets from the two
  pins, put the counts and the category breakdown in the data module, and say what left
  and what came in. A bare delta is not the story.
- Two records that give different counts, dates, or names: extract both sets from the
  pinned bytes and compute union, intersection, and both differences before any sentence
  says they do not match. If the arithmetic reconciles them, the page says so. If it does
  not, the page says what each record counts and that the records do not explain the gap.
  Never supply a likely denominator, motive, embargo, observer category, or "probably".
- A statute cited by an order: read its effective-date clause against the order's own dates
  before the page says when anything takes effect.

## Absence, mechanism and actors

- No negative ("did not post", "no statement", "the ad names no document") without the
  capture that would show the positive, with the search named: the listing for that date,
  every frame of the video, the earlier filings.
- A record that names nothing about the event is not a response to it. Quote what the
  record says about the event; if it says nothing, say so or leave it out.
- The actor receiving money, rights, or control is on the page with its own exposure and
  obligations, from its own filings, not inferred from a brand or a headquarters.
- Distinguish intention, authorization, signed agreement, obligation, committed, available,
  contracted, disbursed, completed. The page names the state the record puts the thing in.

## Rewriting and patching

A rewrite or a layout pass is not permission to regenerate prose from memory of the
sources. Every regenerated sentence is a new sentence and is checked against its passage
again; `quote_lint` runs again. A patch changes only what its items name. When an item
names a class (a stitched quote, a typed number, an outlet quoted with words it did not
print, an unsupported explanation, custody talk), sweep the whole page for that class and
report the sibling count.

## What the story view shows

The story is the synthesis: figures, quote cards, the catch, checked claims, and the
narrative. A raw record (a filing line by line, a committee's books, a ballot listing) is
`SourcedBlock detail` and shows in Just the facts and Show the work. Capture dates,
vintages, method notes and value tables are proof. A reader who wants the depth reads
toward it in the open; nothing a reader needs is behind a click.
