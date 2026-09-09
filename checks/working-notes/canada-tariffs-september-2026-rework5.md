# canada-tariffs/september-2026 rework 5 working checklist

Copied from /Volumes/4/scratch-fable-profile/grok-authoring/reviews/8-rework5.md
before any data was touched. HEAD dca217a2. Verify each item at the pins;
the reviewer's claim is a pointer, not a fact.

Central: the page verifies that Finance repeats C$27.6 billion; it does not
verify the valuation. Say so plainly. Seafood revision is the first catch.
R27 and R34 are the central changes.

## R27 (Major, verified) Dollar for dollar is Finance's pairing, not a reproduced valuation

Rewrite the "Canada matched the U.S. action dollar for dollar" CheckedBlock
(line 284) so it says, in the page's own words:
- Finance assigns C$27.6 billion of covered trade to each side
- the saved records do not reproduce that valuation by tariff code and
  reference period
- the figure did not change when 254 seafood lines left the list
- no saved record explains why
Name the five quantities that "dollar for dollar" could mean (covered trade,
duty liability, revenue collected, trade displaced, economic harm) and state
which one Finance's figure is.
Check the dek and KPI labels for any wording that presents the match as
established; hold them to "Finance says".

R27 extension (r5, Major, verified at line 285 and Finance list line 39):
"Rate for rate" has the same status. The page compared Finance's rate column
with the Canadian orders, which proves the table matches Canadian law, not
that each Canadian rate matches the U.S. rate on the same goods. Finance's
own words are "based on the matching U.S. rate for the same goods." Attribute
both halves to Finance in the CheckedBlock and anywhere the page says
"matched"; state that no saved record gives the product-level crosswalk;
list the crosswalk as a missing record in What we do not know.

## R28 (Major, verified) Elevate seafood revision to first catch row

It is third, line 152. Cross-reference it from R27's block. Add "the
import-value calculation by tariff code and reference period" to What we do
not know as the missing record. Attempt one capture of Finance's backgrounder
or methodology page for the C$27.6 billion valuation (search canada.ca
department-finance news for August 25 to 28, 2026); type it absent with the
search shape if not found.

## R29 (Major, verified) Connect Feb 20 ruling to July 20 choice of statute

After the Supreme Court paragraph (line 181), one narrative paragraph: the
Court held IEEPA does not authorize tariffs; USTR's same-day list of
alternatives named Sections 122, 301, and 232 and did not name Section 338;
the July 20 proclamations used Section 338, which the saved statute text
shows carries both a duty power and an exclusion power ("shall be excluded
from importation"). Cite scotus-24-1287, ustr-ieepa-2026-02-20, usc-19-1338.
Do not write that the proclamations are unlawful or that the Court's ruling
reaches Section 338.

## R30 (Moderate, verified live) Trade denominator earlier

Capture https://budget.canada.ca/update-miseajour/2026/report-rapport/intro-en.html
and quote "approximately 85% of our goods trade tariff-free" and the chart
0.7 text version "Average Tariff Rate Canada 5.2 Global 11.4". Place one
sentence near the 6 percent of exports figure (line 178 or 203), dated as the
Spring 2026 update, written before the July 20 duties. Do not present 85
percent as the state after September 8.

## R31 (Moderate, verified live) Incidence

Capture https://www.bankofcanada.ca/2025/06/staff-analytical-note-2025-18/
and extend the Who pays catch row (line 162) or the who-pays paragraph: the
Bank's staff note on the 2018 counter-tariffs found "high but incomplete
pass-through of tariffs to consumer goods prices"; the Bank's April 2025
projection scenarios "assume that 75% of the increased costs from tariffs is
passed on to consumer prices within six quarters". Quote the finding and the
assumption as two different things. Keep the Sept 2 decision quote.

## R32 (Moderate, verified) Rewrite 0 percent headings wording

Three things (line 67) and the CBP paragraph (line 87): CBP created separate
entry headings for goods excluded from the additional Section 338 charge;
those goods carry a 0 percent Section 338 add-on and may remain subject to
Section 232, antidumping, countervailing, or other duties. Keep the quoted
CBP clause.

## R33 (Minor, verified) One more attempt at dairy-scope-modification proclamation

Line 315 types it absent. Search whitehouse.gov/presidential-actions for
September 8 and 9, 2026 and the Federal Register public inspection list.
Capture if found; otherwise update the typed absence with the search shape
and date.

## R34 (Major, verified) Remission and exceptions

Page near line 133 calls remission "a later write-off of a charge already
due." PC 2026-0785 section 3 grants remission of surtaxes "paid or payable"
(oic-pc-2026-0785.txt line 30), so remission can stop a payment as well as
refund one. The order's sections 1 and 2 exempt chapter 98 and 99 goods,
goods in transit, qualifying Campobello Island imports, and the Import for
Re-Export Program; sections 3 to 8 grant remission for public health, public
safety, national security, and goods used in manufacturing, processing,
agricultural production, and food and beverage packaging. Customs Notice
26-23 (cbsa-cn26-23.txt lines 13, 14, 225) names the Akwesasne, postal, and
courier remission orders and the duties relief and drawback programs. Add a
short "Who is exempt or gets the charge back" passage in Who pays, in plain
words, citing the order sections and the notice; correct the "later write-off"
sentence; state in one sentence that C$27.6 billion is the gross basket, not
the amount that will be assessed or collected. Recount nothing new.

## R35 (Moderate, unverified) The 2025 rollback

Auditor says Canada removed surtaxes on C$30.3 billion of consumer goods and
C$14.4 billion of other goods on September 1, 2025 (Canada Gazette
SOR/2025-181,
https://gazette.gc.ca/rp-pr/p2/2025/2025-09-10/html/sor-dors181-eng.html),
citing supply chains and consumer prices. Capture, confirm the two figures
and the date at the bytes, and add one timeline entry and one sentence in
Where this sits: the 2026 order is a partial return to broad counter-tariffs
a year after Canada removed comparable ones. If the figures are not in the
Gazette text, type it and do not write them.

## R36 (Moderate, unverified, low priority) Carney video's other claims

Transcript says the Marconi SAFE contract was announced "In July of this
year"; the auditor says the Prime Minister's readout is dated June 15
(https://www.pm.gc.ca/en/news/readouts/2026/06/15/prime-minister-carney-meets-european-council-president-antonio-costa-and).
Capture the readout; if the date holds, add the discrepancy to the video's
outlet card as a second checked claim. Do not chase the McKinley tariff
history; type it in one sentence as the video's characterization, unchecked
here.

## Audit r5 remaining unknowns

Registration receipt for the order, net collections, litigation: go to What
we do not know only if they are not already there.

## Refuted, no change

Source-list numbering (continuous, start=1/14/21, 78 unique ids).
GSA wording (already cautious).

## Rules

- Every new URL through `capture news --reason "canada-tariffs/september-2026: <why>"`
  from /Volumes/4/CF/news-fqs-pilot. reuters.com refuses capture.
- Python is /opt/anaconda3/bin/python3. Absolute paths only.
- Keep every narrative paragraph written or touched under 45 words.
- Do not run the completeness audit. Never push.
- Do not kill, restart, or signal any process not started here.
- Append "## R27 to R36 (rework 5)" to
  checks/audits/canada-tariffs--september-2026-2026-09-09-zain-review.md;
  never overwrite.
- Commit by explicit path, no trailer.

## Pin verification (fill before editing)

- R27 CheckedBlock:
- R27 dek/KPI:
- R27 Finance "matching U.S. rate":
- R28 catch order:
- R29 scotus / ustr / statute:
- R34 oic "paid or payable" / sections 1-8:
- R34 cbsa notice Akwesasne etc:
- R33 dairy-scope current typing:
- R35 gazette (after capture):
- R36 transcript July / readout (after capture):
