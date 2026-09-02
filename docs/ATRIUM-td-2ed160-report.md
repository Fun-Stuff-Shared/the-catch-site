# ATRIUM report: td-4c9880 and td-2ed160

## Reader-facing result

Each of the three event pages now begins with figures, source statements, disagreements, a timeline, and saved-source passages drawn from its committed state view. Numbers appear only where the view carries a structured figure. Other statements remain the source's words.

## td-4c9880: corroboration pins

| Ask | Evidence |
|---|---|
| Pin each corroboration record | `src/data/news-corroboration-records.json` names a `pinned_path`, `text_path`, and SHA-256 for 173 of 173 records; the files are under `data/sources/outlets/`. |
| Keep unavailable sources explicit | `data/sources/corroboration-pin-outcomes.json`: 145/173 full-body captures; 25/173 fetch failures and 3/173 paywalls are preserved as 28/173 clearly labelled saved excerpts from the committed corroboration capture. |
| Saved-copy routes and record links | The green build generated the matching `/records/pins/<id>/` routes and gate checks their links. |
| Missing-pin break | Removing `outlet-a02b2a4546f9ceff.txt` made the gate fail with `repository pin is missing`; restoring it passed. |

One excerpt page reads: “Saved passage from the corroboration check,” followed by the title, publisher/date, and the captured passage. It does not call the passage a full saved copy.

## td-2ed160: fold rendering

| Page | Current slots | Structured figures | Quote-only heads | Disputed slots | Built figure coverage |
|---|---:|---:|---:|---:|---:|
| Fed rate, June | 16 | 5 | 4 | 7 | 5/5 |
| Fed rate, July | 17 | 4 | 8 | 5 | 4/4 |
| Jobs, July | 5 | 1 | 3 | 1 | 1/1 |

The counts above were recounted from `data/state/` and the built `dist` figure attributes in this session. The merged records build printed `1,216 (1,043 claim-source + 173 corroboration)`.

The checker reads each built `data-derived-figure` and matches its occurrence id, value, and unit to an accepted occurrence in the corresponding committed view. A deliberate edit of June’s `12-0` to `12-1` failed with: `/events/fed-rate/june-2026/: derived figure 12-1 does not match an accepted fold occurrence`; the final full build restored it and passed.

Screenshots:

- Before: `docs/td-2ed160-before/fed-rate-june-2026.png`, `fed-rate-july-2026.png`, `jobs-july-2026.png` from commit `716a41a`.
- After: `docs/td-2ed160-after/fed-rate-june-2026.png`, `fed-rate-july-2026.png`, `jobs-july-2026.png` from the detached local preview after the green build.

Typed risks rendered through: the fold retains every near-duplicate slot rather than choosing one by hand, including the July dissent variants and the Jobs `us_airfare_price_change` slot. No slot was removed or amended in site code.

## Final verification

`npm run build` passed with: `event gate passed: 3 story page(s) manifested, mechanical checks clean`.

No deploy or push occurred. Review is required before any push.
