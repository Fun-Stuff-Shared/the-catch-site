# The Catch: agent notes

- All reader-facing prose follows the house style in `WRITING.md`. A story is
  built in three skills under `skills/`: `catch-record` (the evidence record),
  `catch-story` (the page) and `catch-orchestrate` (opening, state, publishing,
  closing). Read the one for the work before touching a story.
- `npm run build` builds and runs the event gate (`scripts/check-events.mjs`):
  layer typing, citation resolution, internal-vocabulary and formatting
  checks. A page is not done until the gate passes.
- Story pages using reading modes type every content block
  `data-layer="fact|narrative|proof"`; sources are driven by the per-article
  manifest under `checks/manifests/` (see `story_sources`).
