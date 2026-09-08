# Procedures: the exact commands, in the order an authoring session runs them

This is the runsheet of the corrected 2026-08-25 jobs run and the two gold builds, made
executable. Every step names its command and its artifact. A skipped step is a finding
you report in your own words, never a style choice. Paths are relative to
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

## 1. Capture the ask as a checklist

Write the brief or review into a working note, one line per item, before touching data.
For a review, keep the reviewer's numbers verbatim; you will check each against the pins
in step 4. This note is what you verify the finished page against.

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

Rule: save the bytes before you write a sentence. Every saved file gets a row in
`data/sources/SOURCES.md` (file, bytes, sha256 prefix).

```bash
# Institution pages that accept a browser User-Agent (Fed, FRED, most agencies)
node scripts/fetch-source.mjs "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm"
#   -> data/sources/officials/<sha16>.html + .json receipt; falls back to an archive.org snapshot itself
# Or curl with the same User-Agent into the event's own folder, then extract text:
curl -sL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/139.0.0.0 Safari/537.36" \
  "https://www.bls.gov/news.release/empsit.nr0.htm" -o data/sources/bls-empsit-2026-08.html
python3 -c "import re,sys;t=open(sys.argv[1]).read();print(re.sub(r'<[^>]+>',' ',t))" data/sources/bls-empsit-2026-08.html > data/sources/bls-empsit-2026-08.txt

# FRED series, raw CSV (one call per series)
curl -sL "https://fred.stlouisfed.org/graph/fredgraph.csv?id=PAYEMS" -o data/sources/PAYEMS.csv
# ALFRED vintages for first-print vs revised: ONE VINTAGE PER CALL (the comma form silently returns only the first)
curl -sL "https://alfred.stlouisfed.org/graph/alfredgraph.csv?id=PAYEMS&vintage_date=2026-08-07" -o data/sources/alfred-payems-2026-08-07.csv

# Ledger row (bytes and sha prefix) after every addition
f=data/sources/PAYEMS.csv; printf '| %s | %s | %s |\n' "$f" "$(wc -c < $f | tr -d ' ')" "$(shasum -a 256 $f | cut -c1-16)" >> data/sources/SOURCES.md
```

Blocked fetches (BLS release archive, CME tool pages, paywalled outlets) are recovered,
never paraphrased:

```bash
# Wayback snapshot through the registry (keeps the original URL in the receipt)
capture news "https://www.bls.gov/news.release/realer.nr0.htm" --via-archive --reason "real earnings July 2026 for jobs/august-2026"
# Assisted search leg for a named gap (dated quotes with URLs; forbid estimates in the prompt)
~/.grok/bin/grok --always-approve -p "Fetch the full text of <URL> as published, including every figure and table. Return the text verbatim, then list each numeric claim with the sentence it came from. Do not estimate or summarize."
~/.grok/bin/grok --always-approve -p "Find dated primary quotes (with URL and timestamp) of CME FedWatch, Polymarket, and Kalshi odds for the June 17 2026 FOMC decision between June 12 and June 17. Verbatim quotes only, no estimates."
```

Every figure in a recovered text is verified against the primary document before it is
used, and the recovery (route, date, URL) is written in SOURCES.md and in the record's
`about` line in reader words ("recovered from an Internet Archive copy saved August 24").

## 4. Recount against the pins before fetching anything new

Open the pinned text and count. Most review numbers are already there.

```bash
grep -n "unemployment rate" data/sources/bls-empsit-2026-07.txt | head
grep -c "U-6" data/sources/bls-empsit-2026-07.txt        # zero means the pin lacks it: pin a new source
```

The pins win over the reviewer's memory. Record each recount result in the checklist.

## 5. Admit coverage articles

Coverage is captured as served through the registry, so it has a receipt and a record:

```bash
capture news "https://www.cnbc.com/2026/08/07/jobs-report-july-2026.html" --reason "coverage checked for jobs/july-2026"
capture search "cnbc.com/2026/08/07/jobs-report" --limit 1     # find the run dir and md path
```

Copy the article text into `data/sources/coverage/<outlet>-<slug>.txt`, add it to
SOURCES.md, and to the manifest's `records[]` (with a byte-exact `quote`) and
`story_sources[]` (group `coverage`). The run dir's `md/article_NNNN.md` is the
admitted body; the pin is what the gate verifies.

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

## 8. Draft to the section grammar

Data module first (`src/data/<slug>.mjs`: event, kpis, series, tables), then the page.
Read `section-grammar.md`. Bind every fact block with `SourcedBlock` and every narrative
paragraph with `Cite`. Keep the needs ledger open beside you: every gap you notice while
writing becomes a named row the moment you notice it, and step 3 or 5 runs for that row
mid-flight. Drafting is how you learn what the story is missing.

## 9. The unknowns rule and the superlative rule

Before typing any "what we do not know" line, run its disproof search against the
registry, the index, and the pins (step 2 commands with the specific question). A gap
the records already fill is a defect in the run, not an unknown on the page. The list
is nearly empty every time.

Every superlative or gloss ("lowest since", "fastest pace", "unexpected") either quotes
a held record or does not appear.

## 10. Manifest, ledger, build, lint, screenshot

```bash
# manifest: checks/manifests/<subject>--<story>.json (fields in manifest-and-gate.md)
npm run build                                   # pull state, build records, astro build, event gate, shell gate
node skills/catch-event-page/scripts/lens_lint.mjs src/pages/events/jobs/august-2026.astro
python3 -m http.server 4322 -d dist >/dev/null 2>&1 &   # or any static server
agent-browser open http://localhost:4322/events/jobs/august-2026/ && agent-browser screenshot /tmp/page.png
```

Fix what the gate and the lint report, rebuild, look at the screenshot at 100 percent
zoom (overflow, missing styles, unreadable sections), repeat until clean.

## 11. Independent interrogation (gate 6)

A model that did not write the page reads the finished page and is asked one question.
Use whichever is available; the question is the same:

```bash
cd /Volumes/4/GitHub/the-catch-site
codex exec -s read-only --skip-git-repo-check -C . "Read dist/events/jobs/august-2026/index.html and data/sources/SOURCES.md. Tell me everything this page does not cover or account for: sources it should have used, ordering, angles, context, numbers that should have been checked. Take your time. List each gap on its own line." </dev/null
~/.grok/bin/grok --always-approve -p "$(cat dist/events/jobs/august-2026/index.html | sed 's/<[^>]*>/ /g' | head -c 60000) ... Tell me everything this page does not cover or account for: sources, ordering, angles, context. Take your time."
```

Every returned gap becomes a needs-ledger row: resolved on the page, or typed with its
reason in the manifest's `needs_ledger` and in the page's unknowns section. Wholesale
dismissal is the violation this step exists to prevent.

## 12. Cross-link, stage, ship

- Subject page: one timeline row and the KPI/chart refresh. Homepage: the latest story.
  Related pages link both ways.
- Commit by explicit path: page, data module, manifest, SOURCES.md, the pinned files.
- The publication decision is a human's. Stage the build, add the staged row with a
  ships-by date where the project tracks staging, and hand over the rendered page (URL or
  screenshot), never a receipt list.
- On the word to ship: `git push` (the live site rebuilds from main), poll the live URL
  until the new content serves, then `node scripts/live-audit.mjs`, re-run the language
  greps on the live bytes, screenshot at 100 percent zoom.

```bash
until curl -s https://thecatchengine.com/events/jobs/august-2026/ | grep -q "<marker from the new page>"; do sleep 15; done
node scripts/live-audit.mjs
curl -s https://thecatchengine.com/events/jobs/august-2026/ | grep -c $'\u2014'     # count of em dashes, must be 0
```
