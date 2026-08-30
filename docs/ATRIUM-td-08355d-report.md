# td-08355d report

- Vote store: `scripts/build-votes.mjs` writes `src/data/votes/marco-rubio.json`. Its current meta is 5,263 XML files scanned, 4,612 rows written, tenure end 2025-01-20, and 651 post-tenure exclusions.
- Episode data and pages: `src/data/officials/marco-rubio/episodes/*.json`, `src/components/officials/EpisodePage.astro`, and the two thin episode routes derive the 18 S. 744 votes and 22 H.R. 2577/H.R. 5325 votes from the store. The subject index derives its counts from the same data.
- Statements: `scripts/check-statements.mjs` checks displayed quote spans against cached source bytes or the specified X-post retrieval file. `scripts/fetch-source.mjs` uses a browser user agent, 45-second timeout, retry, and typed Wayback fallback. The corrected Simi Valley URL is pinned, and the Zika splice and lowercase source span are rendered as checked text.
- Vote page: `/officials/marco-rubio/votes/` renders all 4,612 retained votes by year. Its rendered HTML is 1,413,529 bytes, below the 2 MB split limit.
- Gate and negative probes: `scripts/check-events.mjs` verifies store accounting and key-roll-call membership, then runs the statement check. Temporarily changing immigration key roll call 148 to 1 failed with `key roll call 1 is not on its measures`. Temporarily changing `fully funding the request` to `fully funding the requisition` failed with `quote miss` against the May 17 Congressional Record. Both fixtures were restored before the final green build.
- Visual evidence: local 1280px captures are `.playwright-cli/td083/td083-official-index.png`, `td083-immigration.png`, `td083-zika.png`, and `td083-votes.png`.
- Final verification: `node scripts/check-statements.mjs` and `npm run build` pass. No push, deploy, or model call occurred.
