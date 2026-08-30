# td-08355d report

- Vote store: `scripts/build-votes.mjs` writes `src/data/votes/marco-rubio.json`. Its current meta is 5,263 XML files scanned, 4,612 rows written, tenure end 2025-01-20, and 651 post-tenure exclusions.
- Episode data and pages: `src/data/officials/marco-rubio/episodes/*.json`, `src/components/officials/EpisodePage.astro`, and the two thin episode routes derive the 18 S. 744 votes and 22 H.R. 2577/H.R. 5325 votes from the store. The subject index derives its counts from the same data.
- Statements: `scripts/check-statements.mjs` checks displayed quote spans against cached source bytes or the specified X-post retrieval file. `scripts/fetch-source.mjs` uses a browser user agent, 45-second timeout, retry, and typed Wayback fallback. The corrected Simi Valley URL is pinned, and the Zika splice and lowercase source span are rendered as checked text.
- Vote page: `/officials/marco-rubio/votes/` renders all 4,612 retained votes by year. Its rendered HTML is 1,413,529 bytes, below the 2 MB split limit.
- Gate and negative probes: `scripts/check-events.mjs` verifies store accounting and key-roll-call membership, then runs the statement check. Temporarily changing immigration key roll call 148 to 1 failed with `key roll call 1 is not on its measures`. Temporarily changing `fully funding the request` to `fully funding the requisition` failed with `quote miss` against the May 17 Congressional Record. Both fixtures were restored before the final green build.
- Visual evidence: local 1280px captures are `.playwright-cli/td083/td083-official-index.png`, `td083-immigration.png`, `td083-zika.png`, and `td083-votes.png`.
- Final verification: `node scripts/check-statements.mjs` and `npm run build` pass. No push, deploy, or model call occurred.

Reader-facing delta: the Rubio pages now derive each vote and count from Senate XML and show only quote spans that a reader can open and check against a retained source.

| Date | First words | Source URL | Retained source SHA |
| --- | --- | --- | --- |
| 2013-06-09 | Nobody is talking here about preventing legalization | https://politifact.com/factchecks/2013/jun/20/dana-rohrabacher/rep-dana-rohrabacher-says-sen-marco-rubios-claims-/ | sha256:ca76fdac1032f37bd33041d3368d742c6941faa29e3b0a417d33c6afbc76b518 |
| 2013-06-26 | must happen before those in the country illegally | Congressional Record 2013-06-26 | sha256:d34c850247667df27060974d711098d6134baf1c45f82b7bb331f2f403860456 |
| 2013-06-26 | they cannot even apply for permanent status | Congressional Record 2013-06-26 | sha256:d34c850247667df27060974d711098d6134baf1c45f82b7bb331f2f403860456 |
| 2013-10-26 | At this point, the most realistic way | https://www.breitbart.com/politics/2013/10/26/exclusive-rubio-house-should-not-pass-individual-immigration-bills-as-ruse-to-conference-with-senate-bill/ | sha256:b7c243698d4b0cbaafd882036b90c26125353c0418a2bd6ec87eaf5b4b46541b |
| 2015-09-16 | We cannot deal with all three of these problems | https://www.presidency.ucsb.edu/documents/republican-candidates-debate-simi-valley-california-0 | sha256:edd6ed6c61b43289c0f1171ac0c5ef32224812e50c0618042593629bf26d05c1 |
| 2016-03-03 | When I'm president it will not be dealt with | https://www.presidency.ucsb.edu/documents/republican-candidates-debate-detroit-michigan | sha256:52d9a0f35cd347b4f258c843d9eabcd5aa26a146be33ecc2125f4fe760aa5356 |
| 2016-05-17 | fully funding the request | Congressional Record 2016-05-17 | sha256:f27ba6ce8ec3e6f88a84bbee5d0076f2a4aa805eb29a582d3497599b39a4dcd9 |
| 2016-05-17 | if we are left with a vote | Congressional Record 2016-05-17 | sha256:f27ba6ce8ec3e6f88a84bbee5d0076f2a4aa805eb29a582d3497599b39a4dcd9 |
| 2016-05-17 | Their funding measure isn't even $1.1 billion | Congressional Record 2016-05-17 | sha256:f27ba6ce8ec3e6f88a84bbee5d0076f2a4aa805eb29a582d3497599b39a4dcd9 |
| 2016-05-17 | Today we will vote to approve Zika funding | X post 732526164770689028 | sha256:aff98389fe8bb55dadf7ab1a4ddaf13d45e35e45ebf60425919b2e875b716d59 |
| 2016-05-17 | In Senate we just passed $1.2 billion | X post 732656720615464960 | sha256:aff98389fe8bb55dadf7ab1a4ddaf13d45e35e45ebf60425919b2e875b716d59 |
| 2016-08-25 | I voted 5 times to fund the effort | X post 768872185356165120 | sha256:aff98389fe8bb55dadf7ab1a4ddaf13d45e35e45ebf60425919b2e875b716d59 |
| 2016-09-28 | after a lot of work, the Senate has finally | Congressional Record 2016-09-28 | sha256:acfdef058ab8e8c7265ef55536e6cf2a8dfea00b09b4ef4e0101545c58ffa979 |
| 2016-09-28 | Today we passed $1.1 billion in Senate | X post 781231848768868352 | sha256:aff98389fe8bb55dadf7ab1a4ddaf13d45e35e45ebf60425919b2e875b716d59 |
