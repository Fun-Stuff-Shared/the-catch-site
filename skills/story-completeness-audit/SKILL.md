---
name: story-completeness-audit
description: Investigate whether a news article, report, research memo, or developing story tells the full and correctly bounded story. Use for requests such as “what am I missing?”, “is this the full picture?”, “is there more to the story?”, completeness audits, deep verification, source/provenance checks, narrative-to-record comparison, or independent reconstruction of a reported event. Prioritize material omissions and story discovery; use fact-checking as one supporting layer rather than the endpoint.
---

# Story Completeness Audit

Determine whether the supplied account is the full, correctly bounded picture of what the available evidence establishes.

Treat the article as a starting point, not the research boundary. Lead with what is missing. An article can be accurate sentence by sentence yet materially incomplete or misleading by omission.

## Operating model

Run three distinct layers:

1. **Verification:** Determine whether cited material supports the article’s wording and whether the broader record supports the proposition. Keep those judgments separate.
2. **Completeness discovery:** Search outside the article’s frame for omitted events, records, actors, context, counterevidence, alternative explanations, and later developments.
3. **Independent reconstruction:** Temporarily ignore the article’s narrative and rebuild the current state from the strongest available evidence.

For any substantive audit, read [references/investigation-workflow.md](references/investigation-workflow.md). Before drafting the answer, read [references/output-schema.md](references/output-schema.md).

## Core requirements

- Identify the article’s chosen beginning, endpoint, actors, scope, thesis, sources, causal frame, and implied conclusions.
- Extract material propositions, including numbers, dates, quotations, causal claims, procedural characterizations, superlatives, motive claims, and absence claims.
- Search backward, forward, and horizontally around the supplied account. Do not merely verify its existing citations or reuse its vocabulary.
- Seek primary records for important legal, legislative, governmental, financial, scientific, or procedural claims. Treat an official statement as primary evidence of what the institution said, not automatic proof of its underlying assertion.
- Compare narrative wording directly with the underlying record. Flag language that is literally defensible but materially misleading.
- Count independent evidentiary lineages, not domains. Syndicated reports or stories derived from one release, filing, dataset, or anonymous source are not independent confirmations.
- Normalize timeframe, population, geography, units, denominators, and procedural stage before declaring a contradiction.
- Preserve unresolved uncertainty. An unsuccessful search does not prove an absence claim.
- Rank omissions by materiality; avoid exhaustive trivia.
- Continue until readily discoverable additional evidence is unlikely to materially change the reconstructed story. State meaningful search limitations rather than implying certainty.

## Tool behavior

Use live research for factual audits because articles, records, and subsequent developments may have changed. Prefer primary and authoritative sources; use secondary reporting to discover leads, provide context, or establish firsthand reporting. Follow citations to their underlying records where feasible.

When the user provides a file or link, inspect the complete supplied material before expanding outward. If necessary source material is inaccessible, proceed with what can be verified and identify the limitation precisely.

Do not ask the user to define the investigation when the supplied material and request establish a reasonable scope. Ask only when a missing choice would materially change the audit.

## Completion standard

Do not conclude “nothing missing” merely because every sentence has a citation or several outlets agree. Finish only after:

- major claims and important numbers have been checked;
- the story has been searched before, after, and around its chosen frame;
- relevant primary records, missing actors, denominators, and procedural context have been considered;
- counterevidence, competing supported explanations, lineage duplication, and source revisions have been tested;
- the story has been independently reconstructed;
- a fresh “what are we still missing?” pass and an adversarial attempt to disprove the reconstruction reveal no high-probability material avenue left unexplored.

If time, access, or source availability prevents that standard, label the result a bounded or preliminary audit and list the remaining high-value checks.
