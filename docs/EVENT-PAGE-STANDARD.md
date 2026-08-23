# The Catch: event page standard (v1, 2026-08-23)

Ratified against the first page built to it: /events/fed-rate/june-2026/ (the June 17, 2026
FOMC decision). Zain's defect report (25 items) and the fed-hold reference diagram are the
origin; this document is the repeatable contract. A page that does not meet this standard
does not ship as an event.

## The model: subject / story / record

Three layers, each with its own relationship to time:

1. SUBJECT (standing page, e.g. /events/fed-rate/): one per tracked subject, always
   current. Carries: current-state KPI strip (live counters where honest), the full-history
   chart, a dated decision timeline, links to records. Updated whenever a new story lands;
   never carries story prose of its own beyond timeline entries.
2. STORY (decision page, e.g. /events/fed-rate/june-2026/): one per occurrence, slugged by
   month under the subject (day-dates never appear in URLs). Written once, never rewritten;
   later events are covered by "what happened next" additions and dated corrections only.
3. RECORD (/claims/...): one per primary document, dated. The document's own words in a
   clean excerpt, one "How we checked this" toggle, links up to story and subject.

Next occurrence = new month-slugged story + one timeline row + KPI/chart refresh on the
subject page. Nothing is overwritten.

## Production steps (what was actually done for june-2026, in order)

1. ADMIT SOURCES FIRST. Fetch and save into data/sources/ before writing a sentence:
   - primary documents (statement, minutes, projection tables) from the issuing institution;
   - official data series (FRED etc.) as raw CSV;
   - the coverage articles being checked, captured as served;
   - anything that blocks automated capture is recovered via assisted search (grok) and the
     recovery method disclosed in SOURCES.md, or typed on the page in reader words if
     unrecoverable ("CME does not allow its tool pages to be saved directly").
   Regenerate SOURCES.md (file, bytes, sha256 prefix) after every addition.
2. COMPUTE, NEVER QUOTE, THE DERIVED NUMBERS. Days held, percentiles, streaks, comparisons
   come from the admitted series, recomputed in-session. Every computed figure gets a
   receipt toggle stating the method in reader words (series, window, method), never
   internal paths or repo language.
3. VERIFY OUTLET CLAIMS AGAINST THE RECORD before writing the cross-source section. Each
   outlet's checkable claim is compared to the primary document; verdicts use the fixed
   chip vocabulary below. A wrong claim is named plainly (who, what they wrote, what the
   record shows).
4. WRITE IN THE SECTION GRAMMAR (order fixed, sections dropped only when truly empty):
   three-things-to-know box; KPI strip; What happened; Where this sits (chart + history);
   the projections/real-signal section when the record has one; What the outlets got
   right, and what they got wrong; Claim checked against the record; Who feels it; What
   happened next (+ watching line); What the markets said; The records (sources by kind:
   our records / primary documents / official data / coverage checked / pricing quotes).
5. LIVE ELEMENTS ARE GUARDED. A client-side counter states its last-checked date and the
   correction promise ("if X moves, this page gets a dated correction"). No live element
   without a guard.
6. LAYOUT: centered 52rem reading column; floating left "In this story" rail (fixed,
   below the headline, smaller type, scrollspy active state) at wide viewports, inline
   above the content otherwise; section kickers in mono uppercase; KPI values nowrap.

## Language rules (hard)

- No em dashes anywhere in public copy.
- No internal vocabulary: no enum values, no "byte-captured / capture debt / staging /
  operator review / signed export / retrieval / automated", no repo paths, no bare SHAs
  on public pages. Receipts speak in reader words.
- Every sentence is pointer-backed: it quotes a record, cites a named outlet with a date,
  or carries a computed chip with a receipt.
- Chip vocabulary (closed set; extend only by decision): record / their words / computed /
  official data / single outlet / reported pricing / one source / checks out / consistent /
  mislabeled / unconfirmed.
- Verdict words are plain: "checks out", "mislabeled", "wrong", never invented categories.

## Verification before ship (all four, every deploy)

1. Build audit: grep the built page for em dashes, internal-prose words, and jammed
   tag boundaries (text touching inline tags with no space) - all must be zero.
2. Route regression: every previously-live route still resolves in dist.
3. Deploy is git push (Workers git build); poll the live URL until the new content serves.
4. Live audit: `node scripts/live-audit.mjs` probes EVERY route in checks/routes.txt on the
   live site (200 after redirects, same host), then curl the new page's bytes and re-run the
   language greps; screenshot at 100% zoom.

## The gate (enforced at build, added 2026-08-23)

`npm run build` runs `scripts/check-events.mjs` after the Astro build; the Workers git build
runs the same command, so a gate failure blocks the deploy. Two layers:

1. MANIFEST. Every story page (any non-index .astro under src/pages/events/<subject>/) must
   have `checks/manifests/<subject>--<story>.json` in which the building agent attests each
   judgment step of this standard as done WITH a real evidence line (not a stub): sources
   admitted, derived numbers computed, outlet claims verified, section grammar, chip
   vocabulary, live elements guarded, subject page updated, homepage updated. `completed_by`
   and `date` are required. An unattested or stubbed step fails the build. Attest only what
   was actually done; the manifest is the written form of the standard's checklist, and a
   false attestation is a false SHIP.
2. MECHANICAL. The script itself checks dist (events, claims, homepage): no em dashes, no
   internal vocabulary in visible text, no text jammed against inline tags, and every route
   in `checks/routes.txt` still resolves (append new routes when pages ship; never remove
   a route without a ruling).

Live audit (step 4 of ship verification) stays a post-deploy action and is not in the
manifest: it cannot be honestly attested before the deploy exists.

## Home and index wiring

The homepage features the LATEST STORY (headline as the link), with the subject's standing
record linked secondarily. The events index lists subjects as standing cards. Records index
lists records by date.

## Known gaps carried forward (do not silently drop)

- Records admission/display: the four FOMC statements/minutes now have record pages
  (June and July 2026), but the SEP tables, the September 2016 statement, and the series
  CSVs still have no record pages; each primary document used by a story should surface
  as an admitted, displayed record.
- Chart/UI polish: Zain is holding graph/UI critique; expect a revision round.
- July 29 story shipped 2026-08-23 (/events/fed-rate/july-2026/); gap closed.
