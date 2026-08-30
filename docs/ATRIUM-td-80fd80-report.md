# td-80fd80 — records nesting

## Acceptance evidence

| Item | Result | Pointer |
| --- | --- | --- |
| a | Existing claim routes remain and redirect to canonical records. | `src/pages/claims/fomc-*.astro`; `checks/routes.txt`; `npm run build` |
| b | Manifest-backed story record links resolve; a deliberate unknown id fails the build. | `src/components/EventRecordContext.astro`; `/tmp/td80-bad-id.log` |
| c | Every migrated record quote is checked against its pin; altering the BLS quote fails. | `scripts/check-events.mjs`; `/tmp/td80-bad-quote.log` |
| d | Jobs standing record shows dated current values and its three sub-events. | `src/pages/events/jobs/index.astro`; `src/data/subjects/jobs.mjs` |
| e | The Fed standing page keeps its chart and nests four records inside the two dated event cards. | `src/pages/events/fed-rate/index.astro` |
| f | The July BLS record lists the jobs story and the jobs standing record under Used in. | `src/pages/records/[id].astro`; `/records/bls-empsit-2026-07/` |
| g | Five page kinds were captured at 1280 and 390: Fed standing, jobs standing, records index, BLS record, and July jobs story. | `output/playwright/td80/` (ignored local evidence) |
| h | Work is committed by exact path; no push or deployment. | `e413b88`, `6c0dbd2`, `0c1c623`, `fcd67ca`, `d2a158f` |

Plain-language pass: a subject page explains what holds now; an event groups dated developments; a record is the original document, with its checked passage and where it was used.

## Deliberate failures

- Bad record id: `bls-prebmk-2026-typo` produced `record chip names unknown record bls-prebmk-2026-typo` during the static build.
- Altered quote: changing the BLS quote from `-23,000` to `-23,001` produced `bls-empsit-2026-07 quote is absent from its text pin`.

Keystone owns the required on-screen three-item read-through at P3.
