# The Catch: writing guidelines

House style for every reader-facing page. This is the voice of the institution,
not of any person. It binds generated and hand-written copy equally; the
enforcement section says which rules the build gate holds and which an editor
holds.

## Who is on the page

A careful person showing you documents. Not a pundit, not an analyst desk, not
a brand. The register is plain declarative English that trusts the reader's
intelligence and assumes none of their vocabulary. Confidence comes from the
records, so the prose never performs confidence; where the record is thin the
page says so in plain words.

## The reader

Smart, curious, has never read a BLS release or a Fed statement. Brings
everyday words (job, paycheck, price, loan, rent) and nothing else. Every
other term is ours to introduce.

## One voice per layer

The three-projection pages type every block fact / narrative / proof. Each
layer keeps its own register and never borrows the others':

- **Fact layer.** Declarative sentences, dated, sourced. Every number carries
  its comparison (what was expected, what came before, what is normal), per
  the holistic-facts rule: a bare number is not yet a fact a reader can use.
  Signification is allowed when the records carry it ("fell for the wrong
  reason: fewer people working or looking" is a fact; the participation
  numbers are the reason). No adjective of size or speed unless computed
  ("largest since March 2020", never "massive").
- **Narrative layer.** The explainer voice. It teaches mechanisms (two
  surveys, seasonal adjustment), builds the arc, and says what the numbers
  mean for the people in them. It may carry judgment only when the fact layer
  underneath supports it, and it names what it will not do ("we will not
  guess at one").
- **Proof layer.** Auditor register, unapologetic. Verbatim quotes, series
  codes, capture dates, hashes. Never simplified: the reader who opened
  "Show the work" asked for the machinery.

## Grounding: introduce before use

Every concept is either a prerequisite (the everyday-words list above) or is
introduced on the page before any sentence leans on it. Introducing means
landing the idea and the term together, once, at first use, in apposition or
one short sentence ("U-6, the broadest underutilization measure the agency
publishes"). After introduction the term is used freely. One introduction per
page; a page that introduces more than five or six new terms is trying to be
two pages.

## Plain language, precision mode

Plainness never changes the claim. A term of art that IS the concept stays
and gets grounded; decorative jargon goes. Short common words over fancy
ones, active sentences, one claim per sentence, run-ons broken up. "Payrolls
fell by 23,000" beats every longer way of saying it.

## Contrast must be measured

Contrast is one of our main tools (expected vs. actual, first estimate vs.
current, headline vs. broad measure) and it is earned only when both sides
are measured things from the records. "The rate fell because the labor force
shrank, not because more people found work" contrasts two measured series.
The rhetorical flip ("this isn't X, it's Y") that sets up a strawman to
knock down is banned; state the real thing directly.

## Causes are quoted or absent

We never author a cause. A cause appears on the page only as a quote from a
record (with its author named) or not at all, and the absence is said plainly
("the release states the figure without a cause, and we will not guess at
one"). When an outlet authors a cause the record does not contain, that gap
is itself reportable, attributed to the outlet.

## No template skeletons

The corpus-level tell is a recurring scaffold: every section shaped the same,
stock sentences recurring across pages ("Key indicators to monitor…", "The
analysis notes…", "It remains to be seen…"). Structure follows the story.
Section headings are written for the page, not reused as slots. If two
articles could swap a paragraph without anyone noticing, that paragraph is
template, and template is the one voice we never use. The "what we do not
know yet" section names concrete observables ("a second month of a shrinking
labor force"), never analyst boilerplate.

## The skim layer carries the story

Headline, dek, KPI strip, and Three Things must work alone: a reader who
stops there leaves with the story, correctly. Three Things are whole ideas
with their comparisons folded in, not teasers.

## Mechanical bans (gate-enforceable)

- No em dashes in body prose. Colon, comma, parentheses, or two sentences.
- No rhetorical negation-flip (see Contrast above).
- Banned vocabulary in reader-facing text: significant, notably, crucially,
  importantly, robust, comprehensive, landscape, dynamics, delve, underscore,
  highlight (as a verb of emphasis), "it's worth noting", "it is important
  to", "serves as", "plays a role", "in today's". If the word carries a
  measurable meaning, replace it with the measurement.
- No hedge stacks: one qualifier per claim, chosen to match the evidence.
  Unverified is said as "we have not verified this", not "may potentially
  suggest".
- No adjective triplets; no "Similarly / Likewise / In the same way"
  transitions (a transition states what the next thing adds).
- No unnamed attribution: "analysts say", "experts argue", "observers note"
  never appear. Every voiced view carries a name and a record, or it is cut.
  This is the site's whole premise applied to its own prose.
- No trailing significance clauses: the "-ing" tail that inflates a fact
  ("…, highlighting the growing importance of…", "…, reflecting broader
  trends…"). State the fact; the reader judges its size.
- Repeat the noun. Rotating synonyms for one thing (the release / the report /
  the document / the publication) to avoid repetition trades clarity for
  variety. One thing, one name, used every time.
- Internal vocabulary never reaches the reader (already gated): tier names,
  claim ids, enum values, pipeline terms.

## What this is not

- Not Zain's personal voice. Personal signatures (slash groupings, controlled
  roughness, first-person war stories) belong to a byline, and The Catch's
  pages carry none.
- Not smart brevity. We compress with the skim layer, not with axioms and
  bolded labels.
- Not the analyst-brief register (hedged passive summarizing, "reports
  indicate", per-section methodology disclaimers). Our confidence statements
  live in the proof layer and the methodology page, stated once, plainly.

## Enforcement

Build gate (check-events.mjs) holds: internal vocabulary, jammed inline tags,
layer typing, citation resolution, and can hold the em-dash and
banned-vocabulary scans next. Editor (or reviewing agent) holds: grounding,
one-voice-per-layer, measured contrast, template detection, the skim-layer
test. A page fails review if a cold reader of only the first three sentences
cannot say what happened and why it matters to them.
