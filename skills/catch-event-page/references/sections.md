# Sections: the core every story has, the optional ones the question tree chooses

## The core (every story)

| Section (anchor) | Layer | Contents |
|---|---|---|
| Kicker, headline, dek, `<ReadingModes />` | kicker narrative; h1 and dek fact | Headline states the most important change, with the number when the number is the change. Dek adds the two facts a stranger needs to read on. |
| In this story (`story-toc`) | fact | Ordered list of the section anchors the story actually has. |
| KPI strip | fact | Three to four values from `event.kpis`, when the story has that many figures; values nowrap; units small. |
| What happened (`what-happened`) | fact + narrative | Three to six narrative paragraphs answering reader-model answers 1, 4 and 5 in that order: the first paragraph is the clean model (what happened and what it means), each paragraph after goes one level deeper; a term is explained only where the sentence that leans on it would otherwise be misread, in that sentence, as its consequence here (`writing.md`, which words need introducing). After the sixth paragraph a stranger has the model or the section is doing another section's job. The record's own lines follow as `SourcedBlock kind="record" detail`. |
| What happened next | fact | Dated additions only, once there are any; never rewrite earlier sections. Usually three consequences, each with the one or two records that carry it: the act taking effect, the response of the actors the story names, and the next decision now in play; not every reaction published in the following days, which is a coverage detail block or absent. Ends with a "watching" line. |
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
