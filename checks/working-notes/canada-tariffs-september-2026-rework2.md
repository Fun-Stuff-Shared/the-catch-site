# Working checklist: canada-tariffs/september-2026 rework 2 (R10 to R16)

Copied from `/Volumes/4/scratch-fable-profile/grok-authoring/reviews/8-rework2.md` before any data was touched. HEAD a31b82ec. Repo `/Volumes/4/GitHub/the-catch-site`.

Every URL through `capture news --reason "canada-tariffs/september-2026: <why>"` from `/Volumes/4/CF/news-fqs-pilot`. Reuters refuses capture. Python is `/opt/anaconda3/bin/python3`. Do not kill processes not started here. Do not run the completeness audit. Never push.

## R10. Section 338 history (Major, omission)

Page says only that Section 338 lets the president add a duty of up to 50 percent. Audit reports CRS R48435 said the United States had never imposed tariffs under Section 338 before 2026; Supreme Court held February 20, 2026 that IEEPA did not authorize the challenged tariffs (No. 24-1287); USTR said other tariff tools would be used.

Capture:
- https://www.congress.gov/crs_external_products/R/PDF/R48435/R48435.1.pdf
- https://www.supremecourt.gov/opinions/25pdf/24-1287_4gcj.pdf
- https://ustr.gov/about/policy-offices/press-office/press-releases/2026/february/ambassador-greer-issues-statement-supreme-court-ieepa-decision

Acceptance: two to three cited sentences in Where this sits; records; timeline row for February 20 if the opinion date checks. If a record does not say what the audit says, write what the record says.

- [ ] Captured and read at the bytes
- [ ] Sentences on page
- [ ] Timeline if date checks

## R11. The second Canadian order (Major, stale "missing")

Page still says SOR/2026-187 was missing (two mentions). Audit locates it as PC 2026-0786: https://orders-in-council.canada.ca/attachment.php?attach=48944&lang=en

Acceptance: capture, pin PDF with text version, replace missing-order sentences with what the order does (raises listed steel and aluminum schedules to 50 percent, commencement tied to the new surtax order), add to records list and sources line, say plainly the Canadian package is two coordinated orders.

- [ ] Captured and read at the bytes
- [ ] Missing-order sentences replaced
- [ ] Manifest + sources

## R12. The alcohol-scope and dairy-scope proclamations (Major, stale "missing page")

Page says White House URL for alcohol-basket scope change returned a missing page (two mentions). Audit reports live at:
https://www.whitehouse.gov/presidential-actions/2026/09/modifying-the-scope-of-products-of-canada-subject-to-the-additional-duties-imposed-to-offset-canadian-discrimination-against-the-commerce-of-the-united-states-with-respect-to-alcoholic-beverages/

Acceptance: capture it and its annex PDF; count added and removed lines the way auto-scope annexes are counted; put in Three things, September 15 timeline row, Who feels it, and the catch. Dairy-ban pin (proc-exclude-dairy-2026-09-08.txt line 18) references a separate September 8 dairy-scope proclamation: search White House presidential-actions listing for September 8 and capture if it exists; if not found, type it on the page as referenced by the dairy ban and not located, naming where you looked.

- [ ] Alcohol-scope captured, annex counted
- [ ] Dairy-scope searched; captured or typed as not located
- [ ] Three things, timeline, Who feels it, catch

## R13. Why the talks failed: offers and red lines (Major, omission)

Causal account is two slogans. Pinned Carney remarks of August 22 (carney-remarks-2026-08-22.txt lines 63 to 77) list what Canada offered and refused. U.S. proclamations state grievances; alcohol-ban pin line 10 names Saskatchewan's August 27 levy.

Acceptance: one paragraph per side from those pins, cited; end with what remains undisclosed (the U.S. draft terms). No new capture unless a quote is not in the pins.

- [ ] Read pins at the bytes
- [ ] One paragraph per side on page
- [ ] Undisclosed U.S. draft terms stated

## R14. Who pays (Moderate, overstated)

Page says a Canadian household "meets the new Canadian charge as a higher import price" and a U.S. exporter meets it as a higher landing price. CBSA (cbsa-cn26-23.txt line 217) makes the importer the legal payer; Bank of Canada pin (boc-fad-2026-09-02.txt line 9) says the measures "could feed into consumer prices over time."

Acceptance: rewrite so the legal payer is the importer and the pass-through is conditional, cited to both pins.

- [ ] Read pins at the bytes
- [ ] Rewrite on page

## R15. Lineages and the official video (Moderate)

PBS carries the AP dispatch and MarketScreener carries Reuters, so outlet count and independent reporting lineages differ. State both numbers in the outlets section. Capture the official Carney September 8 video (YouTube) so the Winnipeg Free Press transcript has its source on the records list; if capture fails, type it on the page with the reason.

- [ ] Outlet count vs lineage numbers on page
- [ ] Carney video captured or typed with reason

## R16. USTR's own dollar figure (Moderate)

Audit reports USTR July 20 statement valuing the U.S. action at "nearly $20 billion in imports from Canada":
https://ustr.gov/about/policy-offices/press-office/press-releases/2026/july/ambassador-greer-issues-statement-president-trump-imposing-section-338-tariffs-canada

Acceptance: capture it. If the figure is there, add it to the currency paragraph as the U.S.-side primary number, and re-verdict USA Today's "estimated 5%": US$20 billion over the Census 2025 import total from Canada is about 5.2 percent, so "consistent" if that arithmetic holds from the data module.

- [ ] Captured and read at the bytes
- [ ] Currency paragraph + USA Today re-verdict if figure holds

## Gates

- [ ] Every new URL through capture news with the required reason
- [ ] Pins and manifest rows carry byte-exact quotes; SOURCES.md regenerated
- [ ] quote_lint clean; lens_lint clean; zero em dashes in page and data module
- [ ] npm run build green
- [ ] Numbers live in src/data/canadatariffs202609.mjs, never typed twice
- [ ] Rework log R10 to R16 table
- [ ] Commit by explicit path on local main, no trailer, never push
