# The two gold builds, condensed

Full traces live in the coordination repo:
`/Volumes/4/GitHub/fable-core-handoff-2026-07-01/21-live-news/EVENT-PAGE-PROCESS-RECORD-fed-june2026-20260823.md`
and `.../EVENT-PAGE-PROCESS-RECORD-jobs-july2026-rework-20260831.md`. Read them when the
shape below is not enough. The site contract is `docs/EVENT-PAGE-STANDARD.md`.

## Shape A: build from scratch (Fed, June 2026)

admit primary docs -> admit official series -> capture coverage (assisted search for
blocked sources, disclose) -> compute every derived number from admitted series ->
verify outlet claims against the record -> write in the section grammar with the closed
chip vocabulary -> build audit -> push -> live audit. Then update the subject page and
never touch old stories.

Lessons that came out of it:

- The Fox Business "nine of the 18 voting members" finding existed only because the
  claim was recomputed against the statement (twelve voters) and the SEP (eighteen
  participants). Count right, label wrong: "mislabeled". Recompute; do not restyle.
- StockTitan blocked direct capture; grok recovered the article, then every figure in
  the recovery was verified against the Fed's own tables before use. Recovery is a
  source of text, never a source of truth.
- CME tool pages block automated saves. The page says so in reader words rather than
  pretending; market pricing came from dated quotes with URLs instead.
- Custody machinery and internal prose came off the page in the first feedback round;
  one "How we checked this" toggle per record page is the whole visible apparatus.
- Day-dates left the URLs: subject page, month-slugged story, record per document.

## Shape B: absorb an expert review (Jobs, July 2026)

capture the review verbatim as a checklist -> recount every review number against the
EXISTING pins first (most are already there) -> pin new sources only for what the pins
lack, disclose recoveries -> recompute any page claim the review challenges -> render
derived numbers from a data module, never typed twice -> manifest every new record so
the gate owns it -> full real build, fix what the gate catches -> push -> live audit ->
one re-review ping.

Lessons that came out of it:

- Eleven of twelve review numbers were already inside the pinned BLS release; only U-6
  needed a new source. Open the pins before fetching.
- The reviewer said the odds moved "58 to 44"; the pinned records said 59 to 44. The
  pins win, and the page says 59.
- Recomputing the revisions table from seven ALFRED vintages disproved the page's own
  sentence ("first estimates repeatedly overstated the job market"): spring months were
  revised up. The page now states the specific truth and names its own correction.
- Two gate failures before push: "layoff wave" tripped the reader-vocabulary list;
  `<em>under</em>counting` and a newline before `<em>` tripped the jammed-tag check.
- The build's `|| fallback` had masked a broken pipeline for days. Run the real build.

## What the audit found on both gold pages (2026-09-08)

The three lenses render correctly under JavaScript on both pages. But: several
narrative paragraphs carry no citation on either page; the `?mode=` links never worked
without JavaScript; the reader-experience branch moved chart vintage and values into a
fact-layer figure and dropped the switcher's trust line. Treat the gold pages as the
shape to match and this skill's rules as the bar to clear; where they differ, the rules
win.
