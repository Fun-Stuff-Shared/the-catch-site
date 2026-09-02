# ATRIUM report: td-4c9880 and td-2ed160

## Reader-facing result

The three event pages retain their existing KPI strip, Three Things, story, chart, and records form. The committed fold views are used only by the build gate to verify the visible strip figures.

## td-4c9880: corroboration pins

| Ask | Evidence |
|---|---|
| Pin each corroboration record | `src/data/news-corroboration-records.json` names a `pinned_path`, `text_path`, and SHA-256 for 173 of 173 records; the files are under `data/sources/outlets/`. |
| Keep unavailable sources explicit | `data/sources/corroboration-pin-outcomes.json`: 145/173 full-body captures; 25/173 fetch failures and 3/173 paywalls are preserved as 28/173 clearly labelled saved excerpts from the committed corroboration capture. |
| Saved-copy routes and record links | The green build generated the matching `/records/pins/<id>/` routes and gate checks their links. |
| Missing-pin break | Removing `outlet-a02b2a4546f9ceff.txt` made the gate fail with `repository pin is missing`; restoring it passed. |

One excerpt page reads: “Saved passage from the corroboration check,” followed by the title, publisher/date, and the captured passage. It does not call the passage a full saved copy.

## td-2ed160: fold verification

| Page | Current slots | Structured figures | Quote-only heads | Disputed slots | Strip figures with accepted match |
|---|---:|---:|---:|---:|---:|
| Fed rate, June | 16 | 5 | 4 | 7 | 1/4 |
| Fed rate, July | 17 | 4 | 8 | 5 | 0/4 |
| Jobs, July | 5 | 1 | 3 | 1 | 0/4 |

The counts above were recounted from `data/state/` and the visible four-number strips in this session. The merged records build printed `1,216 (1,043 claim-source + 173 corroboration)`.

The checker reads each page's existing KPI data at build time and requires an accepted occurrence with the same value, unit, and period. It names every absence. The corrected contract is typed-blocked by 11 absent figures out of 12: June 3/4 absent, July 4/4 absent, Jobs 4/4 absent. A deliberate edit of June’s `12–0` to `12–1` failed with: `/events/fed-rate/june-2026/: strip figure 12–1 has no accepted fold occurrence with the same value, unit, and period`; the source was restored.

Screenshots:

- Before: `docs/td-2ed160-before/fed-rate-june-2026.png`, `fed-rate-july-2026.png`, `jobs-july-2026.png` from commit `716a41a`.
- After: `docs/td-2ed160-after/fed-rate-june-2026.png`, `fed-rate-july-2026.png`, `jobs-july-2026.png` from the detached local preview. Each retains the same above-story form as the committed baseline: KPI strip, Three Things, and story opening.

Findings for LENS, not fixed here: the Jobs fold head is the CNBC August 3 forecast of `85,000` jobs, occurrence `occurrence-c4c2a335d7a1f67158b74a7e1037b802255d5576b8bfce093b09fa2bad482f64-7697d6ec0fac808b`. The attached June 1 airfare quote is occurrence `occurrence-193c2558ce5861a54205fa40a8ca0e4d7c200e972c0060f2a95ff65618d54fca-4a9246235ff29a8b`. No slot or occurrence was changed in site code.

## Final verification

`npm run build` intentionally fails under the corrected gate with 11 named strip figures that lack accepted fold occurrences. The Astro build itself completes, and the output is suitable for the local preview screenshots; the event gate remains the typed blocker.

No deploy or push occurred. Review is required before any push.
