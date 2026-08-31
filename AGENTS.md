# The Catch: agent notes

- All reader-facing prose follows the house style in `WRITING.md`. The
  `catch-writing` skill (`.claude/skills/catch-writing/SKILL.md`) is the
  workflow for writing and reviewing page copy; invoke it before touching
  story text.
- `npm run build` builds and runs the event gate (`scripts/check-events.mjs`):
  layer typing, citation resolution, internal-vocabulary and formatting
  checks. A page is not done until the gate passes.
- Story pages using reading modes type every content block
  `data-layer="fact|narrative|proof"`; sources are driven by the per-article
  manifest under `checks/manifests/` (see `story_sources`).
