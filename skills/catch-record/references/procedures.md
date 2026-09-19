# Procedures: the exact commands, in the order an authoring session runs them

Every step names its command and its artifact. A skipped step is a finding you report in
your own words, never a style choice. The turn skills (catch-record, catch-structure, catch-story) are the order of work; this file is the
commands for it. Paths are relative to
`/Volumes/4/GitHub/the-catch-site` unless stated. Two other repos take part:
`/Volumes/4/CF/news-fqs-pilot` (capture registry, `capture` CLI, news search index) and
`/Volumes/4/CF/catch-state` (the tracked-event state log).

Environment for the search index (set once per shell; never hardcode another host):

```bash
export IQ_URL=http://100.122.112.83:8100
export OPENAI_API_KEY=iq-local   # the searcher reads this name; the value routes to IQ
```

## 0. Scaffold from the recipe (bootstrap once per event class, then reuse)

```bash
cat recipes/README.md
cat recipes/jobs-report.json            # or fomc.json, court-ruling.json, coverage-only.json
node scripts/new-event.mjs --recipe jobs-report --date 2026-09-05
```

The recipe names the expected primaries, data series, coverage set, and sections. It is a
seed: the page is never bounded by it. The scaffold creates `data/sources/<event>/`, the
data module `src/data/<slug>.mjs`, and the story page. When the class already has a gold
page, copy its structure rather than inventing one.

## 1. Open the working note

`checks/working-notes/<subject>--<story>.md` holds, in this order: the ask or the patch
list copied item by item; one line per census search (catch-record, step 1) with what was
found and admitted or where you searched; a passage table per primary record (catch-record,
step 2). For a review, keep the reviewer's numbers verbatim; you check each against the
pins in step 4.

After the primaries are admitted and before the first sentence, the gap list:

```bash
node skills/catch-record/scripts/pin_gaps.mjs <subject>/<story>        # numbers and names in primary pins the page does not carry
```

Every line is dispositioned in the working note under its record (used, held unused, out of
scope). Rerun it after the draft; a line still undispositioned is a finding.

## 2. Build the coverage universe yourself (never trust a seed list)

Three searches, all three every time, publisher-agnostic, date-windowed:

```bash
# a. the capture registry (everything the three daily sweeps held)
capture search "jobs report" --since 2026-08-01 --limit 50
capture search "payrolls" --since 2026-08-01 --limit 50
capture history --help                     # sweeps and one-offs by date

# b. semantic search over held article bodies
cd /Volumes/4/CF/news-fqs-pilot
leann search news-articles-clean-v1 "the July jobs report and the 23,000 payroll decline" \
  --top-k 20 --non-interactive --show-metadata
# results carry Created/Event timestamps, title, publisher; the md body is in the run dir

# c. is this already a tracked event? (read the state log's event rows)
cd /Volumes/4/CF/sai
PYTHONPATH=src .venv/bin/python -m sai.cli state corrections   # lists published stories
grep -h '"kind": "event"' /Volumes/4/CF/catch-state/log/*/log.jsonl | grep -i "jobs" | tail -5
```

List every held item touching the event: coverage, previews, adjacent context. This list
is the coverage universe. Ten minutes for a mature class; an hour for a new one.

## 3. Admit primary documents and official series

Rule: nothing is admitted unless it went through the registry. `capture news <url>` is the
only route for every URL this story will cite: agency pages, PDFs, court filings, statutes,
member statements, data pages, and coverage alike. The registry is where the receipt, the
raw bytes, the text extraction, and the admission stamp live; a file fetched any other way
has no receipt and the gate refuses the record. Save the bytes before you write a
sentence. Every saved file gets a row in `data/sources/SOURCES.md` (file, bytes, sha256
prefix), and every manifest record carries `capture_run` (the run id the receipt sits in),
`capture_raw_sha256`, and `captured_at` copied from that receipt.

Check the registry before capturing: the three daily sweeps capture BLS, Fed and other
agency releases as served on release day (`capture search "Bureau of Labor" --since <date>`
lists them with their run directory). A copy captured on the day beats a capture made
later, and bls.gov often refuses fetches afterwards. Either way the pin is a copy of the
run's `raw/` file (see step 5 for the path mapping), never a fresh download.

```bash
capture news --reason "<subject>/<story>: <what this record is for>" "<url>" "<url2>"   # several URLs in one run
capture news --via-archive --reason "..." "<url>"                                       # blocked host: Wayback through the registry
```

When the registry cannot admit a document, the record says so instead of hiding it:
`capture_status: "not admitted: <what the registry returned and what you did instead>"`.
Two cases the registry does not yet handle: a scanned PDF with no text layer is rejected
as `empty_or_unextractable_body` (pin it directly, read it by OCR, and say so in `about`),
and some hosts (sos.mo.gov, cbo.gov) refuse the registry's fetcher. A `capture_status`
record is a typed exception the reviewer sees, not a second admission route.

Name every series file with its fetch date (`PAYEMS-2026-09-04.csv`, never `PAYEMS.csv`):
an earlier story's manifest hashes its own copy, and overwriting it fails the gate.

```bash
# Every document, through the registry (agency pages, PDFs, filings, statutes, data pages)
capture news --reason "fed-rate/2026-06-17-unanimous-hold: the decision statement" "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm"
capture search "monetary20260617a" --limit 1      # find the run dir; copy raw/<file> as the pin, text/<file> as the text sibling

# FRED and ALFRED series go through the registry too, one URL per series and one vintage per call
capture news --reason "jobs/2026-09-04-august-payrolls-rise-162000: PAYEMS series" "https://fred.stlouisfed.org/graph/fredgraph.csv?id=PAYEMS"
capture news --reason "jobs/2026-08-07-july-payrolls-fall-23000: PAYEMS first print" "https://alfred.stlouisfed.org/graph/alfredgraph.csv?id=PAYEMS&vintage_date=2026-08-07"
#   (the ALFRED comma form silently returns only the first vintage)

# The ledger row (bytes and sha prefix) is written by finish.sh for every path the manifest names
```

Blocked fetches (BLS release archive, CME tool pages, paywalled outlets) are recovered,
never paraphrased:

What the registry's own fetcher can and cannot reach (not an invitation to fetch outside it):

- `scrapling` chrome impersonation, which is what `capture` uses, served Politico, Axios, Washington Post, Washington Examiner, C-SPAN, Kalshi, BBC, Fox, Semafor, TradingView, BOE Report, Investing.com, MarketScreener, KPBS, Senate member sites, the Guardian, OilPrice. `StealthyFetcher.fetch(url, headless=True)` served Truth Social.
- Blocked in every mode: reuters.com (401), nytimes.com (403), cbo.gov (403), congress.gov (challenge), courts.mo.gov opinion PDFs, house.mo.gov, spglobal. archive.org had no snapshot for any Reuters or CBO page tried.
- Carrier copies carry the same text: Reuters via Investing.com, BOE Report, MarketScreener; WSJ via Dow Jones on TradingView; AP via KPBS, NPR, PBS. Pin the carrier, name the carrier in the records list and in the ledger's recovery paragraph, quote the carrier's bytes.
- Sequential retries succeed where parallel coverage fetches fail.

```bash
# Wayback snapshot through the registry (keeps the original URL in the receipt)
capture news "https://www.bls.gov/news.release/realer.nr0.htm" --via-archive --reason "real earnings July 2026 for jobs/2026-09-04-august-payrolls-rise-162000"
# Assisted search leg for a named gap (dated quotes with URLs; forbid estimates in the prompt)
~/.grok/bin/grok --always-approve -p "Fetch the full text of <URL> as published, including every figure and table. Return the text verbatim, then list each numeric claim with the sentence it came from. Do not estimate or summarize."
~/.grok/bin/grok --always-approve -p "Find dated primary quotes (with URL and timestamp) of CME FedWatch, Polymarket, and Kalshi odds for the June 17 2026 FOMC decision between June 12 and June 17. Verbatim quotes only, no estimates."
```

Every figure in a recovered text is verified against the primary document before it is
used, and the recovery (route, date, URL) is written in the ledger's recovery paragraph and in the record's
`about` line in reader words ("recovered from an Internet Archive copy saved August 24").

## 4. Recount against the pins before fetching anything new

Open the pinned text and count. Most review numbers are already there. A saved BLS release
text (`empsit_<date>.htm` as captured) carries the summary tables A and B and the detail
tables: A-2 and A-3 (rates by race, sex, age, education), A-7 (nativity, year over year,
unadjusted), A-8 (part time for economic reasons), A-12 (duration of unemployment, the
long-term level and median weeks), A-15 (U-6), B-1 (sector detail including temporary
help), B-2 (hours by industry), B-3 and B-8 (earnings, production workers), B-5 (women on
payrolls by sector). Search the pin for the table name before typing anything as absent. What the pin does not carry: the diffusion indexes and the unadjusted sector
tables (separate pages).

```bash
grep -n "unemployment rate" data/sources/bls-empsit-2026-07.txt | head
grep -c "U-6" data/sources/bls-empsit-2026-07.txt        # zero means the pin lacks it: pin a new source
```

The pins win over the reviewer's memory. Record each recount result in the checklist.

## 5. Admit coverage articles

Coverage is captured as served through the registry, so it has a receipt and a record:

```bash
capture news "https://www.cnbc.com/2026/08/07/jobs-report-july-2026.html" --reason "coverage checked for jobs/2026-08-07-july-payrolls-fall-23000"
capture search "cnbc.com/2026/08/07/jobs-report" --limit 1     # find the run dir and md path
```

To find a held article's body: the run directory's `article_receipts.jsonl` has one row
per item with `item_url`, `final_url`, `typed_outcome` (`body_captured` is the good one),
`raw_path` (the HTML as served), `text_path` (extracted text) and `md_path`.
`dedup_items.jsonl` has titles and URLs but no paths.

```bash
cd /Volumes/4/CF/news-fqs-pilot/runs/<run>
python3 -c "import json,sys; [print(r['text_path'], r['raw_path'], r['item_url']) for r in map(json.loads, open('article_receipts.jsonl')) if sys.argv[1] in r.get('item_url','') and r.get('typed_outcome')=='body_captured']" "cnbc.com/2026/09/04"
```

Copy `text_path` to `data/sources/coverage/<outlet>-<slug>.txt` and `raw_path` to the
matching `.html` (or `.pdf`), and add the record to the manifest's
`records[]` (with a `quote` that is present in the text pin) and `story_sources[]` (group
`coverage`). The pin is what the gate verifies.

**Every pin gets a text sibling at pin time, whatever its format.** The manifest's
`text_path` and `text_sha256` are what registration and the gate read; nothing downstream
re-extracts. HTML: the text pin from the capture. PDF: `pdftotext -layout file.pdf file.txt`
(a scanned PDF with no text layer goes through `/Volumes/4/CF/news-fqs-pilot/scripts/capture.py`,
which falls back to Mistral OCR). CSV: the file is its own text. Video or audio: the
transcript `.txt` from undertone (step 5, the video rule). A record whose `text_path` is missing or whose
hash does not match the file is not a record.

**A video is read twice: the audio and every frame.** An ad's citations, disclaimers, and
the wording of its charge often exist only on screen, in a source slate the narration never
speaks. Extract one frame a second, look at every frame, and transcribe every piece of
on-screen text into the transcript sibling under its own heading with the frame number:

```
ffmpeg -v error -y -i data/sources/<subject>/<stem>.mp4 -vf "fps=1,scale=960:-1" /tmp/frames/<stem>-%03d.png
```

Pin each frame that carries a source slate or a claim in text as its own record
(`<stem>-frame-024.png` with a `.txt` sibling holding the transcribed text), and check the
claim against the sources the slate names before writing a verdict. "The ad names no
document" is a claim about the frames, and it is false until every frame was read.

One pinned file owns one text sibling, and two pins never share a stem. A loop that writes
`<stem>.txt` for every `*.html` after `pdftotext` wrote `<stem>.txt` for every `*.pdf`
silently replaces the PDF's text with the web page's when both pins share a name (the
mail-voting story's `eo-14399.html` and `eo-14399.pdf`). Name the page pin and the document
pin differently (`eo-14399-page.html`, `eo-14399.pdf`), and re-run the hash check on every
`text_path` after any extraction pass.

Preflight the candidate row before reading a single article body. Compare each article's
title and named entities with the candidate headline in one pass; if any belong elsewhere,
treat the seed as invalid and rebuild the coverage universe from the receipts and the
registry once, instead of opening the remaining seed bodies one by one.

Before capturing anything new, search the registry for the reactions too (a governor's
speech, the president's remarks, the stock close are usually already held by the daily
sweeps: `capture search "<name>" --since <date>`). Capture many URLs in one call:

```bash
capture news --reason "gaps named by the independent review of <story> (<date>)" <url> <url> ...
```

Read the run's `article_receipts.jsonl` before pinning: `typed_outcome` other than
`body_captured` (robots refusals: Reuters, The Wall Street Journal) and a `text_chars`
under about 1,000 (a subscription stub: Bloomberg served 462 characters) are not records.
Say so on the page in reader words: "do not let their pages be saved", "served only a
subscription stub". The word "automated" trips the gate. Posts on X and PDF notes capture
fine and pin like any article.

Label conventions in `story_sources[].meta`: coverage rows " · published <date>"; series
files " · saved <fetch date>, reflects the <release date> release"; official statements
" · <institution>". Record ids: `<outlet>-<topic>-<story>` (`cnn-august-jobs`,
`fed-waller-2026-09-03`, `adp-release-2026-08`). `needs_ledger[].status` vocabulary:
`have`, `partly have`, `missing: <reason in reader words>`.

## 6. Compute every derived number from the admitted series

Never quote a derived number from an outlet. Compute it, put the result in the data
module with a comment naming the source file, and render from the module.

```bash
# percentile of today's level across the full daily history (midpoint method), days held, streaks
python3 - <<'PY'
import csv, statistics
rows=[(r['observation_date'], float(r['DFEDTARU'])) for r in csv.DictReader(open('data/sources/DFEDTARU.csv')) if r['DFEDTARU'] not in ('.', '')]
vals=[v for _,v in rows]; today=vals[-1]
below=sum(v<today for v in vals); equal=sum(v==today for v in vals)
print('n',len(vals),'percentile',round(100*(below+equal/2)/len(vals),1),'mean',round(statistics.mean(vals),2),'median',statistics.median(vals))
last_change=max(d for (d,v),(pd,pv) in zip(rows[1:],rows[:-1]) if v!=pv); print('last change',last_change)
PY
# revisions table: first print (vintage on release day) vs current, one vintage per file
```

Each computed figure on the page gets a `computed` chip and a proof receipt stating
series, window, and method in reader words.

## 7. Verify outlet claims against the record

For each coverage article: list its checkable claims (numbers, counts, attributions),
find each in the primary document, and assign a chip: checks out, mislabeled, wrong,
single outlet, unconfirmed. Separate their numbers (verify) from their framing
(attribute: "CNBC called it ..."). A wrong claim is named plainly: who, what they wrote,
what the record shows. Be ready for the page's own earlier claim to be the wrong one.

## 8. The record turn ends
Turn one (`story.md`, "The three turns") ends here: data module (`src/data/<slug>.mjs`: event,
kpis, series, tables, every derived number with a comment naming its file), figures, the
chronology table, the record's own lines as `SourcedBlock kind="record" detail`, the
subject page row and the homepage feature (step 9), the manifest with
every gate attestation true in fact (`section_grammar` still `done: false`; the record
build accepts that one open), then `finish.sh <subject>/<story> record` (ledger
rows, the build with its gate, the lints, one commit by path). The story view of that
build is headline, dek, KPI strip, figures, chronology and the records list, with no
narrative yet.

## 9. Subject page row and homepage feature

The subject page (`src/pages/events/<subject>/index.astro`) gets one timeline row for this
story and its KPI or chart refresh from the subject's data module; the homepage features
the latest story through `event.visual`. Related pages link both ways. The story turn
checks that the row and the feature still describe the story as written; nothing else
touches them.
