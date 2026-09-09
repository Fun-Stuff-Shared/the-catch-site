# Canada tariffs September 2026 rework 3 checklist

Copied from dispatch 8-rework3.md before any data work. HEAD a3558a6c, page commit 4c50ac15.

## R17 (Major): the two Canadian orders reconcile exactly to the Finance list

Page line 143 says the Finance table of 629 lines and the 335 tariff items of PC 2026-0785 "cannot be reconciled line by line" and "are different units". That is wrong.

Keystone recount (verify myself with regex `\d{4}\.\d{2}\.\d{2}`):

- PC 2026-0785 English Schedules 1 to 3 (file offsets 7090 to 11003 of oic-pc-2026-0785.txt):
  Schedule 1 = 21, Schedule 2 = 172, Schedule 3 = 142, union 335. Schedule 4 (14 codes) is the Chapter 98/99 exception list, not covered goods.
- PC 2026-0786 English Schedules 1, 1.1, 2, 2.1 (offsets 3038 to 9151 of oic-pc-2026-0786.txt):
  2 + 27 + 21 + 244 = 294 unique codes.
- Overlap between the two orders: 0. Union: 629. Finance August 26 table unique codes: 629.
  Finance minus orders: 0. Orders minus Finance: 0.

Ask:
- Replace the "different units" catch with the true account: Finance's public list is exactly the union of the two coordinated orders, 335 codes from PC 2026-0785 at 15/25/50 percent and 294 steel and aluminum codes from PC 2026-0786 at 25/50 percent.
- Put the six counts (21, 172, 142, 2, 27, 21, 244 and the 335/294/629 sums) in the data module with the file and offsets as the comment, recompute in-session, render from the module.
- Cross-check the Finance table's rate column against the schedule each code sits in and report any code whose Finance rate differs from its schedule rate (from the HTML table, not a text parse).
- Rewrite "Three things", the Where-this-sits paragraph at line 98, and the proof arithmetic at line 260 so no sentence still says the figures cannot be reconciled.
- Title and state label may need to change; if h1 changes, commit data/state event and chain files.

Acceptance: counts live only in src/data/canadatariffs202609.mjs; page renders from module; catch/Three things/where-this-sits/proof rewritten; rate mismatches reported.

## R18 (Major): zero-rate Section 338 headings

Page line 77 says each of the three proclamations "imposed an additional 50 percent duty on a basket of Canadian goods." Audit: CBP CSMS assigns 50 percent to HTSUS 9903.03.12 through 9903.03.14 and a 0 percent additional Section 338 rate under 9903.03.15 (metals, vehicles and parts, wood products, semiconductors, patented pharmaceuticals, goods handled under other tariff authorities) and 9903.03.16 (civil aircraft).

URL: https://content.govdelivery.com/accounts/USDHSCBP/bulletins/4261d04
If refuses: cbp.gov CSMS page for the same message number.

If bytes confirm: add one narrative paragraph and one timeline entry explaining 50 percent on listed headings and 0 percent Section 338 on those broad categories because other duties (Section 232 and others) already apply, before comparing U.S. baskets with Canada's matching rates.

If bytes do not confirm: say so in disposition table and leave the page as is.

## R19 (Moderate): eight reporting lineages, not nine

Page line 226 says "Nine independent reporting lineages." Detroit News pin metadata: source:Reuters, author Promit Mukherjee; lede is Reuters "C$27.6 billion ($19.94 billion)" dispatch.

Ask: eleven outlets, eight independent reporting lineages plus one transcript carrier. Keep the Detroit card but say the text is Reuters carried by the Detroit News, the same way the MarketScreener card does.

## R20 (Moderate): the video's $500 billion claim

WFP transcript line 89: "new ports, mines, and energy corridors from every region of the country that now represent $500 billion in new private investment."

MPO page: https://www.canada.ca/en/privy-council/major-projects-office/our-priorities/projects-transformative-strategies.html
Distinguishes $192 billion in new investment from $500 billion in future private-sector investment.

If bytes show distinction: add a checked line in the coverage section (Carney's own video, "$500 billion in new private investment": MPO lists $192 billion new and $500 billion future) with the plain verdict.

If they do not: type it in the disposition.

## Gates (not data work)

- Every new URL through `capture news --reason "canada-tariffs/september-2026: <why>"` from /Volumes/4/CF/news-fqs-pilot. reuters.com refuses.
- Python: /opt/anaconda3/bin/python3
- New records manifested with byte-exact quotes; SOURCES.md regenerated.
- lens_lint and quote_lint clean; zero em dashes; npm run build green.
- Commit by explicit path, no trailer, never push.
- Do not run completeness audit. Do not kill/restart/signal any process I did not start.
- Absolute paths only.

## Keystone-owned, skip

- Reader ledger "27.6 USD billions as printed"
- Revision timeline "No changes are recorded in this view"
