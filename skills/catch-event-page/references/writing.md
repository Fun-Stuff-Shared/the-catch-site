# Writing a Catch story: the rules that bind each sentence

`WRITING.md` at the repo root is the house style and binds every page. These are the rules
that bind each sentence of a story page, in the order they come up while writing. The
shape of the page is `story.md` and `section-toolkit.md`. Each one is a class of
defect reviewers keep finding; the rule is how the sentence is written so they do not.

## Which words need introducing

The stranger is smart, curious, and reads a general newspaper. Words such a person meets
weekly are everyday and are never explained: tariff, injunction, payroll, subsidy,
indictment, stay, appeal, warrant, surtax. Agency shorthand, series names, and terms of
art are introduced once, at first use, in the sentence that first leans on them: U-6, SEP,
FOMC, PCE, tariff headings, Section 338, independent expenditure, 48-hour notice,
connected TV, seasonal adjustment. One short apposition or one sentence, then the term is
used freely. Explaining an everyday word insults the stranger; using a term of art without
its sentence loses them. A page that introduces more than five or six terms is two pages.

## Register

- Concept before qualification (`story.md`): the clean model in the first sentence, the
  boundary in the next paragraph. A qualification comes first only when the concept is false
  without it. Each distinction is introduced by the mistake it prevents.
- The page never says "reader" or "readers", never describes who is reading, and never
  narrates its own method in the story or fact layers ("this page found", "we could
  preserve", "as reproduced by", "searched", "the records add up to", "this story rests on
  N records"). Method and provenance are proof-layer sentences.
- "X, not Y" is used where the record makes the distinction and the misreading depends on
  it; never as a headline, a kicker, or a paragraph closer, and never twice in a paragraph.
- A fact is told once in the story register (a summary line, or prose, or a table, never
  all three) and once in proof. A discrepancy is stated once with both values and its
  status. A paragraph whose last sentence disclaims its own relevance is cut.
- A catch is a pair: the outlet's sentence, byte for byte from its pin, and the record
  passage that contradicts it, both cited in the catch's own prose. A catch with only one
  side is the author's inference and does not ship; an inference from the record is never
  graded wrong. Rounding, previews, datelines correct in local time, publication labels,
  and a broader true word ("television" for "connected TV") are not disagreements; say what
  they are in one line or leave them out.
- The strongest plain sentence never sits in the last section.

## Sentences and passages

- A sentence says what its passage says and no more. A passage that supports one phrase
  is not support for the sentence around it.
- Passages attach to clauses, not to new sentences written to carry a cite. One Cite per
  sentence unless two different records support it; never two adjacent cites to one record.
- A quotation is one contiguous span of the record's bytes, inside quotation marks, and
  nothing else is inside quotation marks: no scare quotes, no paraphrase, no changed byte.
  Two sentences the record separates are two quotations or one quotation and prose.
  An indirect report ("described the EU as a loyal friend") is never lifted into speech.
- One quotation per paragraph, then what it means in everyday words.
- Legal and financial terms appear first as the pin's word in quotation marks ("rights to
  a stake"), then in everyday words. "Equity stake", "closed at", "signed" are the pin's
  words or they are not on the page.
- An outlet is credited only for what its own pin prints. A fact that sits in a pinned
  primary takes the primary's cite; the outlet row says it checks out.
- An outlet is called mislabeled or wrong only when a pinned record is quoted that says
  otherwise. When the page's own record is a later summary of the event (a CBO letter
  dating a hearing, a release describing a vote), capture the event's own record (the
  hearing page, the roll call) before faulting anyone on it; the summary can be the one
  that is wrong. When no record supports the outlet's claim and none contradicts it, the
  chip is "not in the record" and the row says what was searched.
- A definition, a list of who is affected, or a mechanism that is not in a record is not
  written. The plain-words sentence at a term's first use says what the record says the
  term means, or says only what the term is doing in that sentence.
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
- Every headline figure names its kind in the sentence that carries it: an estimate, an
  obligation, a disbursement, a replacement value, a request, a notional model, a cash
  total. "Has cost" for a replacement-value estimate, or a modeled architecture's price
  for a program's price, is the error the record lets a reader avoid.
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
- An absence paragraph carries `data-absence` on its `<p>` and cites nothing; the search it
  names is in the working note. Never staple a record's cite onto a sentence the record
  does not contain to satisfy the lint; `lens_lint` accepts an absence paragraph.
- A paragraph that describes the page's own method or sums up its sections (how the day
  counts were made, what the records add up to) carries `data-method` and cites nothing;
  `lens_lint` accepts it and the entailment pass skips it. A cite stapled to a method
  sentence to satisfy the lint is a defect.
- A narrative sentence that carries a number, a date, or a named act carries its own
  Cite; the paragraph's last cite does not cover it.
- The story's `updated` date in the data module is the newest dated record or search on
  the page, never the day of the first draft.
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

The story view carries the A and B material of the reader model (`story.md`) and nothing
else: the narrative, the figures, the quote cards, the catch. A raw record (a filing line by
line, a committee's books, a ballot listing) is `SourcedBlock detail` and shows in Just the
facts and Show the work. Capture dates, vintages, method notes and value tables are proof.
Nothing a stranger needs is behind a click; nothing a stranger does not need is in the way.
