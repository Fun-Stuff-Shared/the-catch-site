# Event recipes

A recipe defines the repeatable dossier-then-synthesis flow for a class of events.
Each recipe type specifies what to capture, compute, verify, and render.

## How it works

1. **Recipe selects the event type** (FOMC, jobs report, court ruling, coverage-only)
2. **Dossier stage** (stages 1-3, templatable, agent-executable):
   - Stage 1: Fetch primary documents from known URLs
   - Stage 2: Pull official data series (FRED, BLS, etc.) as raw CSV
   - Stage 3: Capture outlet coverage; Grok for specific named gaps only
   - All sources pinned to `data/sources/` with SHA in `SOURCES.md`
3. **Synthesis stage** (stage 4, one model turn over captured bytes):
   - Write the data module (`.mjs`) with figures traced to pinned sources
   - Write the story page (`.astro`) using the component library
   - Every derived number computed in-session, never quoted from outlets
4. **Gate** (automated, blocks deploy):
   - Manifest attestation (`checks/manifests/`)
   - Build audit (no em dashes, no internal vocabulary, no jammed tags)
   - Route regression (`checks/routes.txt`)
5. **Ship** (manual push, then live audit)

## Recipe files

Each `.json` recipe in this directory defines:

```json
{
  "type": "fomc",
  "name": "FOMC rate decision",
  "cadence": "~8 per year (scheduled meeting dates)",
  "primary_sources": [
    { "name": "FOMC statement", "url_template": "https://www.federalreserve.gov/newsevents/pressreleases/monetary{YYYYMMDD}a.htm" },
    { "name": "FOMC minutes", "url_template": "https://www.federalreserve.gov/monetarypolicy/fomcminutes{YYYYMMDD}.htm" },
    { "name": "SEP tables", "url_template": "https://www.federalreserve.gov/monetarypolicy/fomcprojtabl{YYYYMMDD}.htm" }
  ],
  "data_series": [
    { "name": "Target range upper bound", "fred_id": "DFEDTARU", "format": "csv" },
    { "name": "PCE price index", "fred_id": "PCEPI", "format": "csv" },
    { "name": "Unemployment rate", "fred_id": "UNRATE", "format": "csv" },
    { "name": "30-year mortgage", "fred_id": "MORTGAGE30US", "format": "csv" }
  ],
  "computations": [
    "days_held: count days from last change point to meeting date",
    "percentile: rank current rate against full DFEDTAR+DFEDTARU daily history",
    "pce_streak: count consecutive months above 2% YoY from PCEPI"
  ],
  "outlet_check": "Verify each outlet's checkable claims against the primary documents",
  "sections": [
    "what-happened", "where-this-sits", "the-projections",
    "outlets", "claim-check", "who-feels-it",
    "what-next", "markets", "records"
  ],
  "grok_scope": [
    "Dissenter X/social posts (named officials only, dated URLs required)",
    "Market pricing quotes (FedWatch, Polymarket, Kalshi — dated, never estimates)",
    "Blocked outlet articles (disclose recovery method)"
  ],
  "subject_page_updates": [
    "Timeline row with date, vote, and link to new story",
    "KPI strip refresh (current rate, days held)",
    "Chart endpoint extension"
  ]
}
```

## Current recipes

- `fomc.json` — Federal Reserve rate decisions
- `jobs-report.json` — BLS employment situation
- `coverage-only.json` — events without a primary anchor document

## Adding a new recipe

1. Copy the closest existing recipe
2. Fill in primary sources, data series, computations, and section order
3. The synthesis turn reads the recipe to know what to fetch and compute
4. After the first page ships, write a process record (companion to the recipe)
