# Reader experience audit

**Implementation follow-up:** visual and interaction fixes are implemented in the subsequent pass. See [CONTENT-HANDOFF.md](CONTENT-HANDOFF.md) for the completed UI changes and remaining content/publication work. The findings below record the audit before those fixes.


September 7, 2026 · experimental `design/reader-experience` worktree · local preview at http://localhost:4322/

The homepage is becoming a useful editorial front page. The next work should make discovery durable, explain how the reporting works, and make article navigation and evidence access predictable. Another wholesale homepage redesign is not the first priority.

## Completed in this pass

- “Earlier in this series” now includes the publication date and the existing story summary. Its headline remains subordinate to the current story. See `src/components/StoryLink.astro` and `public/assets/reader.css`.
- Story headline anchors occupy their heading's width, giving wrapped headlines a continuous click target.
- Two June claim-history links now point directly to the current June story. The old URL has a production redirect in `public/_redirects`; this removes a redirect hop and a dead end in the Python preview, which does not implement those redirects.

No evidence data, manifests, reporting prose, production deployment, or analytics configuration was changed.

## What was exercised

Manual browser journeys covered the homepage, People directory, Rubio profile, both published Rubio stories, Series directory and its filter, both series pages, both Fed stories, the jobs story, methodology and its Catch-Score appendix, source library, source panel, source details, and saved source text. Checks included mobile menu navigation, off-home search with no results and a matching result, article mode switching, section navigation, opening a citation and returning to reading. The 15-story synthetic preview was used to exercise pagination.

Desktop homepage and mobile homepage/article/source-panel screenshots were inspected. At a 390-pixel viewport, the inspected homepage and jobs citation state had no horizontal document overflow. This is representative journey coverage, not a claim that every page or external source was manually clicked.

A separate static scan covered **2,550 built HTML pages and 29,678 local anchor references**. After the two link edits it found **zero missing local file targets and zero duplicate HTML IDs**. There are **2,545 unresolved static skip-link references**, all `#main-content`: `BaseLayout.astro:58–60` assigns or retargets the ID in JavaScript. These work in the inspected running pages but need a server-rendered target for use without JavaScript.

Reproduce:

```sh
CATCH_DESIGN_PREVIEW=1 CATCH_STATE_SOURCE=/nonexistent/catch-ui-frozen npm run build
node scripts/audit-reader.mjs > /tmp/catch-reader-audit.json
npm run test:reader
```

Build, event gate, shell gate and all **12 reader tests** passed. The shell gate covered **2,542 nonredirect pages**. The audit checks file existence and HTML markup; it does not validate HTTP status, external-source availability, assistive technology behavior, production headers, search-engine indexing, or Core Web Vitals.

## Findings to address before scaling

| Priority | Finding and evidence | Recommended change |
| --- | --- | --- |
| High | Archive position is lost on reload. In `/design/coverage/`, Next displayed page 2 while the URL remained unchanged; reopening that URL displayed page 1. `src/scripts/discovery.ts:9,48–52` stores query/topic but not page. | Give archive pages durable URLs and real pagination links. Preserve topic, query and page when returning from a story. Test reload, sharing, and Back. |
| High | The library uses raw subject identifiers: “fed rate” and “officials/marco rubio.” It has no document-search control; the global search explicitly searches stories. `src/pages/records/index.astro:4–10`. | Use reader-facing subject names and document search with publisher/date filters. Keep stories as the primary discovery unit; documents support the reading journey. |
| High | “How we check” explains propositions, status codes and a technical scoring appendix, but does not explain the three reading modes or the citation panel. `src/pages/methodology.astro:9–15`. | Rewrite the main page around reporting, primary documents, interpretation, source context, updates and corrections. Keep technical checks in an appendix. Add actual editorial/contact details once established; do not invent policies or identities. |
| Medium | Rubio's profile displays 22 Zika roll calls while the story describes 15. The profile derives a broader measure-level set; the episode has its own directly-Zika list. `src/lib/official-votes.mjs:6–15`, `src/data/officials/marco-rubio/episodes/zika-2016.json:5,43`. | Label the broader list's scope explicitly and distinguish it from the story's selected scope. Preserve the underlying counts and vote records. |
| Medium | Evidence entry points have different behavior: story citations open context, some record links open detail pages, and vote links leave for the Senate. Observed on the jobs and Zika stories. | Make “Read source passage,” “Source details” and external-original links visually predictable. Prefer context at the point of a claim, with the original one step away. |
| Medium | The saved BLS copy begins with extensive captured website navigation before report text. `src/pages/records/pins/[id].astro:19` renders the preserved text as a preformatted block. | Retain the exact saved copy, but add in-document search and a jump to the cited passage. Keep the contextual reader as the default route. |
| Medium | Source-library → source details loses the library return context. The observed details page only offers source/story destinations; saved-copy navigation continues without the library location. | Support a clearly labeled return to the originating library section, alongside the existing story-return path. |
| Medium | The 404 copy says the record “has never existed on this surface,” with no inline recovery action. `src/pages/404.astro:6`. | Say the page could not be found and provide Latest/Search recovery. Validate actual production 404 status separately. |

The Fed articles still lack the three reading modes. This is a known content-template gap, not a newly introduced regression. Their visible breadcrumb also repeats the series name on desktop; consolidate it when bringing them onto the shared article template.

## Search and sharing readiness

The static metadata scan found **0 meta descriptions, 4 canonicals, 0 Open Graph titles, 0 JSON-LD blocks and 21 noindex pages**. `BaseLayout.astro:3–14` has only optional canonical/noindex props. `astro.config.mjs` has no production `site` origin. No sitemap or robots file is present in the audited build.

The site exposes text and ordinary story links in the initial HTML, which is a useful foundation. Missing descriptions or structured data do not by themselves prevent indexing. However, the current build does not provide controlled snippets, consistent canonical identities, or rich article/share metadata.

Before public scale-up:

1. Establish the actual canonical production origin. Give each indexable page a unique title, description and absolute canonical URL. Reading modes and return/query parameters should not create separate article identities. See Google's [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
2. Set an explicit indexing policy by page family. Published stories, substantive series pages and reader methodology are useful landing pages. Decide deliberately whether source details, saved copies, claim histories and internal outlet-reference routes belong in search. Keep synthetic previews excluded. Do not equate all generated pages with publishable editorial destinations.
3. Generate a sitemap from that policy and add crawlable archive/topic pagination. JavaScript filter buttons alone are not archive links. See [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
4. Add Article and Breadcrumb metadata using actual publication/update dates, headline, publisher and confirmed authorship. Structured data must describe the visible content. See [structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) and [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).
5. Add Open Graph/social-card metadata. Prefer meaningful charts, document excerpts or relevant licensed images; do not add decorative photographs just to fill cards. Provide a branded fallback share image and useful alternative text for informative images.
6. Test the deployed host's redirects, 404 responses, canonical URLs, rendered HTML and mobile performance. This local audit is not production SEO certification.

## Analytics preparation

No analytics provider was connected in this pass. Define a small event contract before adding a SDK: story opened, reading mode changed, citation opened, full source opened, returned to story, series opened, topic selected, search submitted/result opened/no results, archive page changed, and source-load failure.

Use stable story/series/source IDs and canonical paths. Mode changes and source panels do not cause page navigation, so pageviews alone will miss the site's distinctive behavior. Avoid logging raw source text or every search keystroke. Treat search terms as potentially sensitive and decide retention/redaction explicitly. Provider and consent requirements remain a separate implementation decision.

## Separate design pass: article sidebar and reading modes

The two controls answer different questions: **where am I in the article?** and **how much detail do I want?** They should remain distinct while sharing one quiet visual language.

| Format | Benefit | Cost | Recommendation |
| --- | --- | --- | --- |
| Desktop section rail, mobile “In this story” disclosure | Makes long articles navigable; leaves most space for reading; adapts to nine or more sections | Needs mode-aware section availability and careful sticky behavior | Preferred |
| One sticky toolbar containing mode and section menus | Compact and consistent across screen sizes | Hides the article's shape; switching between two menus is slower | Use only at intermediate widths if the rail cannot fit |
| Heavy boxed sidebar with modes and every section | Controls are conspicuous | Competes with the headline, charts and source panel; cramped at medium widths | Avoid |
| Progress bar alone | Very quiet | Shows distance but cannot explain or navigate structure | Optional supplement, not a replacement |

Recommended composition:

- Place the reading-mode control **below the headline and summary**, before the key figures/body. Let readers first learn what the story is about. Retain the established labels for this iteration; explain the selected mode in one short line when needed.
- On wide screens, keep a 10–12rem left section rail aligned with the article body. Use a single active marker and stronger active text, not a separate box or thick bar around every item. Keep full section labels readable without forced truncation.
- On mobile, replace the long wrapping list of section links with an accessible “In this story” disclosure. While reading, a compact current-section control can reopen it. Avoid stacking a sticky global header, mode bar and full table of contents.
- Keep the mode control reachable after scrolling through a compact article toolbar or rail placement, but do not duplicate interactive controls unnecessarily. Switching depth should preserve the current section where it still exists; if it disappears, move to the nearest visible section and announce the change.
- Derive navigation from sections actually visible in the selected mode. Existing `story-toc.ts:1–23` tracks scroll position but does not maintain mode-specific navigation availability. This is a requirement for the next pass, not a claim that a hidden-section bug was reproduced here.
- When the source reader opens on medium-width desktops, let it take precedence over the section rail; the current CSS already hides the rail at those widths. Preserve reading width and a clear return action. On mobile, use the existing source sheet rather than squeezing a second column onto the page.
- Keep “Figures and source passages” as an on-demand evidence ledger. A row should foreground a human-readable measure, value/date and source, then expand to the exact passage and surrounding context. Avoid treating raw field identifiers or CSV rows as explanatory copy. Do not duplicate a second set of KPI cards below the story.

Validate this pass on jobs, both people stories and the eventual Fed template at mobile, tablet, ordinary laptop and wide desktop widths. Exercise keyboard navigation, long section labels, mode changes near the end of an article, source-reader open/close, and direct section URLs. The layout proposal above has not been implemented in this audit patch.
