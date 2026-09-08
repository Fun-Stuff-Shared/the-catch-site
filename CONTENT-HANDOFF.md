# Content and publication handoff

This follows the visual implementation in the `design/reader-experience` worktree. Preview: http://localhost:4322/. No upstream state, source bytes, story copy, or manifests were changed. The original audit is in `READER-AUDIT.md`; its recommendations are historical findings, not the current implementation status.

## Implemented in the UI

- KPI strips use defined grid cells with row and column dividers, smaller labels without forced capitals, consistent padding, and two columns on mobile.
- Reading modes follow the headline/summary and remain reachable while scrolling. Section navigation uses a compact disclosure on smaller screens and a quieter rail on wide screens; it omits sections hidden by the selected mode.
- Mode changes preserve the current visible section where possible. Section links close the mobile menu and focus their destination below the sticky controls.
- The earlier-story teaser includes its existing date and summary.
- Archive page number is retained in the URL and restored on reload. This fixes reader position; it does not create separately rendered search-engine archive pages.
- Source library has reader-facing subject labels, document search, publisher/year filters, counts, empty results and reset. Filter state is in the URL.
- Library → source details → saved copy carries a return link to the originating filtered library section.
- Saved copies have a cited-passage jump and in-document text search. The complete saved text remains intact.
- Skip links have a target in the initial HTML. June's duplicate series breadcrumb is removed. July's breadcrumb and the People label are consistent. The 404 page has ordinary recovery links.

## 1. Explain the reporting to readers

**Owner:** editorial/product. **Surface:** `src/pages/methodology.astro`, `src/pages/methodology/catch-score.astro`, shared footer in `src/layouts/BaseLayout.astro`.

Provide approved language explaining the three modes, primary documents, interpretation, source context, dated changes and corrections. Supply the actual contact/correction route and publication/editorial identity. Review the footer's promises about review status and permanent public corrections against actual operating behavior. Keep technical check names and SAI internals in the appendix.

Acceptance: a reader can explain what changes between the three modes, inspect a source, and find how to report an error. Every institutional promise matches the workflow. Follow `WRITING.md`; do not invent editorial staff, review practices or response commitments.

## 2. Resolve vote-count scope

**Owner:** reporting/state. **Inputs:** `src/data/officials/marco-rubio/episodes/zika-2016.json`, `src/lib/official-votes.mjs`, profile `src/pages/officials/marco-rubio/index.astro`.

The profile derives a measure-level roll-call set; the story describes a narrower 15-roll-call scope. Define reader labels for the broader set, directly relevant votes and curated key votes. Decide whether the profile should present all three or foreground only one. Do not replace one count with another without tracing its denominator.

Acceptance: a reader can understand why counts differ; each number is generated from its declared set. Retain original vote records and cast descriptions.

## 3. Bring Fed stories onto reading modes

**Owner:** reporting/editorial with frontend implementation. **Surfaces:** `src/pages/events/fed-rate/june-2026.astro`, `july-2026.astro`, their event data and manifests.

Type all relevant blocks as fact, narrative or proof before enabling modes. Decide which summaries and technical calculations belong to each depth. The shared controls and section rail can then be reused. The visual pass intentionally did not classify reporting by guessing from prose.

Acceptance: all three views tell a coherent story; hidden sections disappear from navigation; each claim retains its manifest-driven citations; event gate passes.

## 4. Evidence labels and source-link behavior

**Owner:** evidence/state plus editorial. **Surfaces:** event record ledger components, episode vote/source links, `src/lib/record-manifests.mjs` and source manifests.

Provide human-readable measure names, units, dates and context for raw fields such as revision keys and CSV observations. Define which external vote/document links have an exact accepted captured-source mapping. With that mapping, the UI can consistently open the contextual panel first and offer an explicitly labeled original-source link.

Acceptance: every ledger value keeps its exact provenance; quotations remain verbatim; no link is inferred solely from a similar headline or URL. Confirm whether the default manifest quote is the right landing passage for each saved document. Search highlighting is a navigation aid, not a verification result.

## 5. Search indexing and sharing

**Owner:** publication/platform, with editorial decisions on indexable content. **Surfaces:** `astro.config.mjs`, `src/layouts/BaseLayout.astro`, route generators and discovery catalog.

Required decisions: canonical production origin; indexing policy for stories, series, profiles, claims, source copies and internal outlet references; publisher/byline identities; meaningful share-image policy. Implement descriptions, absolute canonical URLs, Open Graph cards, accurate Article/Breadcrumb structured data, sitemap and robots policy from those decisions. Keep synthetic pages out of production and indexing.

Archive position is now shareable through `?page=`, but the static site still needs real rendered archive/topic pages and pagination links for a deliberate crawl strategy. Do not claim this interaction fix completes SEO pagination.

Acceptance: inspect deployed HTML and HTTP status/redirects; canonicalize mode/query/return variants; verify index policy and sitemap agree; validate structured data against visible copy. Local file checks do not establish Google indexing or production Core Web Vitals.

## 6. Analytics connection

**Owner:** product/platform. Select provider, consent approach and retention before installing an SDK. Use the event list in `READER-AUDIT.md`: pageviews alone will miss reading-mode changes and citation panels. Prefer stable story/source identifiers; avoid sending source text or per-keystroke searches. No analytics SDK or external reporting endpoint was added here.

## Verification and continuation

Work only in `/Volumes/4/GitHub/the-catch-site/.worktrees/reader-experience`. Build against its frozen data:

```sh
CATCH_DESIGN_PREVIEW=1 CATCH_STATE_SOURCE=/nonexistent/catch-ui-frozen npm run build
npm run test:reader
npm run test:state
node scripts/audit-reader.mjs > /tmp/catch-reader-audit.json
```

Use `CATCH_DESIGN_PREVIEW=1` only when the synthetic stress-test pages are needed. Do not push: pushing deploys. Integrate content/state changes through the owning workflow, then rerun the event gate and check the affected visible modes and citations.

### Verification receipt for the visual pass

- Frozen preview build: 2,550 pages; event and shell gates pass.
- Reader tests: 12 pass. State tests: 21 pass.
- Static audit: 30,903 local anchors; no missing local file targets, unresolved fragments or duplicate IDs.
- Browser checks: 390px mobile, 768px tablet and 1600px desktop; inspected KPI grids fit without horizontal overflow. The facts-mode section menu omitted hidden sections. Switching from facts to work at the immigration vote section returned that section beneath the controls (approximately 115px from the viewport top).
- Page-two URL reload, source search, passage jump and filtered-library return were exercised. Return URL retained `?q=employment#jobs`.
- All 1,251 rendered saved-document text bodies matched their inputs after HTML's CR/LF and NUL handling. Source files and manifests have no diff. Two pre-existing inputs contain NUL/binary-looking content: `outlet-af24628f58e3f96d` and `outlet-87bb262391fe3020`. The capture owner should check their encoding/content type; this UI pass does not repair or reinterpret those saved bytes.
