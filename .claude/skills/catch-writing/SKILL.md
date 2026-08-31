---
name: catch-writing
description: House writing style for The Catch. Use when writing, rewriting, or reviewing any reader-facing page copy in this repo (event stories, officials pages, records pages, methodology), or when a request mentions voice, tone, plain language, AI-sounding prose, or writing guidelines for the site.
---

# Catch writing

The voice authority is `WRITING.md` at the repo root. It is the single source
of truth; this skill is the workflow that applies it. Do not restate its rules
from memory: read it before writing.

## Writing new copy

1. Read `WRITING.md` in full.
2. Name the layer of each block you are about to write (fact / narrative /
   proof) and keep one voice per layer.
3. List the terms the copy will use that a general reader does not bring;
   plan one introduction per term, at first use, idea and term together.
4. Draft. Every number carries its comparison; every cause is quoted or
   absent; every attributed view carries a name and a record.
5. Run the review pass below on your own draft before showing it.

## Reviewing copy (yours or anyone's)

1. Read `WRITING.md`, then the page at the bytes (built HTML or served page,
   not the template alone).
2. Mechanical scan first: em dashes in body prose, banned vocabulary,
   negation-flips, hedge stacks, unnamed attribution, "-ing" significance
   tails, adjective triplets. Cite each hit with its exact sentence.
3. Register scan: does any block borrow another layer's voice? Is any term
   used before the page grounds it?
4. Template scan: could this paragraph sit unchanged in a different article?
   Does any scaffold sentence recur across pages?
5. Skim test: read only headline, dek, KPIs, and Three Things. If that
   reader leaves without the story, the page fails.
6. Cold-reader test: from the first three sentences alone, say what happened
   and why it matters. If you cannot, the opening fails.
7. Report findings as exact sentences with proposed rewrites, never as
   generalities.

## Boundaries

- The build gate (`scripts/check-events.mjs`) owns the mechanical checks it
  already implements (internal vocabulary, layer typing, citation
  resolution). Propose new gate rules there; do not hand-run what the gate
  runs.
- Site prose is the institution's voice. Personal-voice skills (zain-voice)
  do not apply to reader-facing pages.
