# Manifest, ledger, gate, ship verification

## checks/manifests/<subject>--<story>.json

The gate reads this file on every build. Fields you write by hand:

| Field | What it holds |
|---|---|
| `subject`, `event`, `date`, `story_title` | `jobs`, `jobs/july-2026`, release date, headline |
| `state_event_id` | the tracked event id in the state log (`event-jobs-july-2026`); selects the story for state-backed routes |
| `records[]` | one per saved document: `id`, `title`, `publisher`, `date`, `url`, `pinned_path`, `text_path`, `text_sha256`, `quote` (byte-exact words from the file; a CSV data line for series), `quote_span_check: "byte_exact"`, `about` (one plain sentence a stranger understands) |
| `story_sources[]` | the numbered list the page cites: `id`, `group` (`primary`, `official`, `coverage`), `label`, `meta` (" · released August 7"), `usage` (plain words: "every figure the story marks as record") |
| `primary_sources[]` | `id`, `path`, `bytes`, `sha256`, `url` for each primary document |
| `figures[]` | `figure`, `source_id`, `value` for each headline number |
| `needs_ledger[]` | `need`, `plain`, `record_id`, `status` (`have` or what is missing and why, in reader words) |
| `sub_events[]` | `id`, `date`, `label`, `section_anchor`, `records[]` for each dated development on the page |
| `coverage_records[]`, `coverage_threshold` | outlet articles checked (at least two) |
| `authored_sections[]` | the section anchors the page renders |

Attest only what was done. A stubbed or false line is a false ship.

## data/sources/SOURCES.md

Regenerated after every addition: a table of file, bytes, sha256 prefix, plus a plain
paragraph naming any recovery (archive.org snapshot, ALFRED vintages, assisted search)
and the date it was done.

## Gate (`npm run build`, also run by the Workers git build)

1. Manifest layer: every story page under `src/pages/events/<subject>/` has its manifest; every record's quote is byte-exact in the pinned file; every `Cite` id resolves.
2. Mechanical layer on dist: zero em dashes, zero internal vocabulary in visible text, zero text jammed against inline tags, every route in `checks/routes.txt` still resolves (append new routes; never remove one without a ruling), every manifested route appears on `/events/`.

`npm run check` runs the gate alone against an existing dist.

## Ship verification (every deploy, four steps)

1. Build audit on dist (the gate).
2. Route regression (the gate).
3. `git push` to main; poll the live URL until a marker from the new content serves.
4. Live audit: `node scripts/live-audit.mjs` probes every route in `checks/routes.txt` on the live site; curl the new page's bytes and re-run the language greps; screenshot at 100 percent zoom. Local dev servers and browser caches serve stale HTML; judge only the live domain or a cache-busted URL.
