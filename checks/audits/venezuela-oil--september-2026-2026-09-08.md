# Dispositions (keystone, 2026-09-08 22:15Z; rework commits 4ba96617, e43d545a on local main)

Each finding verified at held bytes before editing. Every new record went through `capture news` (runs capture-oneoff-20260908T215312Z and capture-oneoff-20260908T215956Z; the Post stub from quarry-wire-scheduled-20260904T220002Z).

| # | Finding | Verified at | Disposition |
|---|---|---|---|
| 1 | Story begins after the decisive event | Jan 3 transcript (American Presidency Project, released by the White House Office of Communications): "successfully captured Maduro in the dead of night"; CREC Feb 11 page S936, S. 3838 findings (1) to (4) | FIXED. Origin paragraph and two record blocks open What happened; kicker, span, dek, three-things item 1 carry it; the Senate bill is in Watching and Unknowns. The whitehouse.gov gallery the auditor cited is photos only (3,167 bytes of text); the transcript record is the UCSB copy. |
| 2 | 100-year rights as fact | EFE via ABC Color: "El contrato está firmado 25 años"; El País: "signed for 25 years, but by mutual agreement it can be renewed" | FIXED. Title now "The White House says 100-year rights ... Caracas says 25 years, renewable." (state event renamed via `state event-op --op rename`, author keystone, reason recorded). Catch 4 rewritten with Obregón. Instrument-type point: the audit's Article 40 claim was not verified (not searched in the pin); the page says only that the 25-year cap is written for mixed companies and no record names the contract form. |
| 3 | OSC authority unchecked | 10 U.S.C. 149: "The term "capital assistance" means a loan, loan guarantee, or technical assistance."; loans and guarantees "To the extent and in such amounts as specifically provided in advance in appropriations Acts" | FIXED. Statute record block in What happened next; Unknowns item retyped as which authority covers the warrants. Page does not claim illegality. |
| 4 | Assembly vote and Machado's objection omitted | Guardian Sept 1: "backed by Venezuela's national assembly"; AFP via France 24: Jorge Rodríguez line; OilPrice pin (already held): "publicly approved rules and competitive bidding", "who is signing it, who will finance it"; law text: "promoverá la concurrencia de diversas ofertas", "previa aprobación del Consejo de Ministros" | FIXED. New h3 in What happened next with Assembly, law, Obregón, El País blocks; Machado questions block in Who feels it. NOT DONE: Machado's video and the Reuters Assembly video are not held (no text route through capture; the auditor's time-coded quotes are not on any record we hold and are not on the page); the France 24 abstention line the auditor's search surfaced is not in the held France 24 bytes (that page was modified after Sept 1) so it is not on the page. Typed in needs_ledger. |
| 5 | 65 billion proved is an issuer claim | EIA Country Analysis Brief (Feb 2024 PDF): "303 billion barrels (Figure 5), accounting for approximately 17% of global reserves"; El País Monaldi: "we have never recovered more than 8% of what is claimed to exist" | FIXED. Catch 7 "Proved, says who?"; EIA block in Where this sits with computed share 21.5 percent (data module, proof receipt); The Hill's 21 percent now checked against EIA; Unknowns adds the reserve report. The eia.gov country page URL the auditor cited is a JavaScript shell (navigation only under capture); the PDF brief is the record. |
| 6 | Operator was a causal actor | Dow Jones pin (already held): "resisted investing at the speed and scale he wanted", "deliberately intended to bind future Venezuelan governments", "ahead of November's midterm elections"; NABEP contact page: Caracas headquarters plus "Bridgetown (Barbados)" | PARTLY FIXED. Dow Jones block and NABEP offices block added. The Post's Sept 4 investigation is held only as a subscription stub (3,133 bytes: headline, subhead, first paragraph); the auditor's Swiss, visa, and Sargeant-sale claims are not on any bytes we hold and are not on the page; typed on the page and in needs_ledger. NABEP's page lists Caracas as headquarters, not Barbados; the page says so. |
| 7 | Gasoline "checked" with untestable evidence | wh-release: "as soon as early next year"; El País: SPR "cannot be replenished with heavy crude" | FIXED. Both gasoline claim checks retyped "not yet testable" with the White House's own timeline; kicker reads "Four claims, examined; two not yet testable"; CBS gas block qualified. |
| 8 | Provenance checks unfinished on the page | stage-story failed on this manifest (KeyError 'inputs': figures were the flat shape) | PARTLY FIXED. Figures enriched to the sourced shape (17); stage-story registered 57 pins and 17 figures, state verify ok; the built page now lists each tracked figure with its passage. Three figures left as page computations with receipts (WTI day change, NABEP share of July output, the 250K line: the state tool's formulas cover only sum and date difference, and "250K" has no numeric token it reads). Known limits typed: (a) CSV date,value lines tokenize as one number in the state validator, so the CSV passages are ",84.57" style value spans without the date (validator defect, sibling: every FRED CSV figure on every story; not fixed this tick); (b) the figure list renders slot names ("Aaa 408") not labels (site component, td-7b4872 family); (c) "does not yet list who reported each figure" stays until a Luna read runs. Lineage grouping of carrier copies: NOT DONE on the page beyond the existing carrier disclosures. |

Not changed on the auditor's say-so: the "13 vs 31"-style byte offsets were not re-derived; each quotation above was re-read in the pinned text.

---

The account is materially incomplete. Its narrow term-checking is often careful, but it omits the coercive political origin, the January oil-control regime, the deal’s undisclosed legal instruments, Venezuelan approval requirements, the beneficiary’s role in shaping the arrangement, and counterevidence against the reserve and price claims.

Publication-state note: the audited local build is 91,613 bytes. As of September 8, 2026, `https://thecatchengine.com/events/venezuela-oil/september-2026/` returns HTTP 404 and the live events index does not list the story. The findings below concern the supplied built page.

## Layer 2: Completeness discovery, ranked by materiality

### 1. The story begins after the decisive event

**Severity: CRITICAL**

**Page bytes:** [built page](/Volumes/4/GitHub/the-catch-site/dist/events/venezuela-oil/september-2026/index.html:2), bytes `12335:12464`: “On Friday, August 28, President Trump posted that the United States had ‘entered into an Agreement with the Country of Venezuela’”.

**Record bytes:** The page’s own [Guardian pin](/Volumes/4/GitHub/the-catch-site/data/sources/coverage/guardian-machado-2026-09-03.txt:1), bytes `3771:3801`, says Maduro was “abducted by US special forces.” The [White House record](https://www.whitehouse.gov/gallery/president-donald-trump-delivers-remarks-at-a-press-conference-following-operation-absolute-resolve/) calls January 3 an operation “leading to the capture” of Maduro. The [February 11 Congressional Record](https://www.congress.gov/119/crec/2026/02/11/172/29/CREC-2026-02-11.pdf), page S936, records an earlier January 6 oil deal, U.S.-controlled proceeds, and Rubio’s admission that the audit process had not been finalized.

**Correct account:** August 28 was not the beginning. The agreement followed the January 3 U.S. military capture of Maduro, U.S. backing for an unelected Rodríguez administration, an earlier January oil-marketing arrangement, sanctions changes, and U.S.-controlled oil-revenue accounts already under congressional scrutiny. Presenting August as a clean bilateral starting point removes the coercion, continuity, and unresolved fund-governance questions from the causal frame.

### 2. “100-year rights” is stated as fact without the instrument that would create them

**Severity: CRITICAL**

**Page bytes:** Headline bytes `134:243` say “100-year rights to 17 Venezuelan oil fields.” Body bytes `32717:32785` concede: “Which instrument the 100 years sits in is not in any record we hold.”

**Record bytes:** The [White House fact sheet pin](/Volumes/4/GitHub/the-catch-site/data/sources/venezuela-oil/wh-fact-sheet-2026-08-31.txt:660), bytes `5434:5530`, says “100-year concessions for 17 oil fields with proven reserves of approximately 65 billion barrels.” Venezuela’s [August 29 statement](/Volumes/4/GitHub/the-catch-site/data/sources/venezuela-oil/mppre-7986-presidenta-delcy-rodriguez-se-dirige-al-pais-sobre-el-gran-acuerdo-energetico-con-eeuu.txt:402), bytes `4426:4473`, says “Este proyecto binacional, suscrito por 25 años.” On September 7, PDVSA’s president described a 25-year contract renewable for similar periods, not a presently executed 100-year grant. [EFE report](https://www.abc.com.py/internacionales/2026/09/07/presidente-de-estatal-pdvsa-dice-que-acuerdo-petrolero-entre-venezuela-y-eeuu-es-renovable/), [EL PAÍS report](https://english.elpais.com/international/2026-09-08/trumps-conditions-cast-a-shadow-over-the-us-venezuela-oil-deal.html).

**Correct account:** The best subsequent official description is an initial 25-year NABEP-PDVSA contract that may be renewed by mutual agreement. No disclosed contract proves an unconditional 100-year entitlement. The headline should attribute the 100-year claim to the White House or use the evidenced 25-year initial term plus claimed renewal path.

The story also applies the law’s 25-year cap for mixed companies without establishing that this is a mixed-company instrument. Article 40 separately permits PDVSA to contract with private Venezuelan operators. The instrument type must be resolved before assigning the correct duration rule.

### 3. The central U.S. legal-authority claim was left unchecked after the relevant statute was readily available

**Severity: HIGH**

**Page bytes:** Bytes `75410:75626`: “The OSC statute text itself... We have not pinned the statute.”

**Record bytes:** The saved [Semafor record](/Volumes/4/GitHub/the-catch-site/data/sources/coverage/semafor-osc-2026-09-02.txt:1), bytes `3194:3259`, describes “issuing and guaranteeing loans plus offering technical assistance”; bytes `3327:3354` record that OSC “does not take equity stakes.” The current official [10 U.S.C. §149](https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title10-section149) defines capital assistance in terms of loans, loan guarantees, and technical assistance. It does not expressly authorize OSC to acquire equity.

**Correct account:** The public record supports only this bounded statement: officials assert that penny warrants lawfully give OSC a 35 percent economic position, but neither the legal theory nor the warrant instrument has been disclosed, and §149 does not expressly supply the claimed equity authority. That does not prove illegality because another authority might exist. It does make “equity stake” legally unverified, not merely an open detail.

### 4. Venezuelan approval procedure and Machado’s actual objection are substantially omitted

**Severity: HIGH**

**Page bytes:** Bytes `66259:66329` mention concessions awarded “without a competitive process.” Bytes `47900:48000` introduce Machado, but the page selects only her pro-U.S. and illegitimacy lines.

**Record bytes:** Article 39 of the [hydrocarbons-law text](/Volumes/4/GitHub/the-catch-site/data/sources/venezuela-oil/ley-hidrocarburos-2026.txt:1433), bytes `53168:53215`, requires authorities to “promoverá la concurrencia de diversas ofertas.” Direct selection requires “previa aprobación del Consejo de Ministros,” bytes `54151:54195`. A [Reuters video record](https://www.reutersconnect.com/item/venezuelas-assembly-backs-oil-deal-announced-with-us/dGFnOnJldXRlcnMuY29tLDIwMjY6bmV3c21sX1ZBOTU1NzAxMDkyMDI2UlAx) shows Venezuela’s National Assembly approving a motion supporting the agreement on September 1.

Machado’s original seven-minute statement asks, at 0:26 to 0:39, “¿Quién firma?”, “¿Quién pone el dinero?”, and “¿Quién da las garantías?” At 4:10 to 4:50 she demands public Assembly rules and open bidding, “sin adjudicaciones a dedo.” [Original video](https://youtu.be/pLK7fHIsPhg).

**Correct account:** The ruling-party Assembly passed a support motion, but that is not demonstrated to be approval of the still-undisclosed contract. Venezuelan law normally calls for competing offers and permits direct selection only through a specified exception and Council of Ministers approval. No such approval, operator evaluation, business plan, contract text, or field annex is pinned. Machado’s position was a detailed transparency and procurement critique, not merely the two quotations selected by the page.

### 5. “65 billion proved barrels” and the economic projections are issuer claims, not verified facts

**Severity: HIGH**

**Page bytes:** Bytes `37661:37777`: “The White House compares the 65 billion barrels to ‘roughly 46 billion barrels’ of U.S. territorial proved reserves.” The page then verifies the U.S. denominator, not the Venezuelan numerator.

**Record bytes:** The White House calls the fields “proven reserves” at [fact-sheet line 660](/Volumes/4/GitHub/the-catch-site/data/sources/venezuela-oil/wh-fact-sheet-2026-08-31.txt:660). NABEP calls them “P1 reserves” at [company-release line 3009](/Volumes/4/GitHub/the-catch-site/data/sources/venezuela-oil/nabep-pr-2026-08-31.txt:3009). Neither supplies a field schedule, reserve report, auditor, effective date, price assumptions, or recovery model.

The [EIA Venezuela brief](https://www.eia.gov/international/analysis/country/VEN) gives a 303-billion-barrel country estimate and says most reserves are extra-heavy crude requiring specialized technology and capital. Thus 65 billion is about 21.5 percent of that country estimate, but its classification cannot be independently confirmed.

**Correct account:** The White House, Venezuelan government, and transaction beneficiary repeat the same 65-billion figure. That is corroboration of what the parties claim, not independent proof that the 17 unidentified fields contain 65 billion economically recoverable barrels. The $100 billion investment and $200 billion or $209 billion fiscal-return numbers likewise remain projections without disclosed models. The article correctly rejects “doubling American reserves,” but still presents an unverified Venezuelan numerator beside a differently defined U.S. EIA measure.

### 6. The operator was a causal actor and beneficiary, not merely a controversial executive

**Severity: HIGH**

**Page bytes:** Bytes `44944:45095` report Betancourt’s investigations; bytes `45185:45244` say the page “does not adjudicate them.” That is accurate but too narrow.

**Record bytes:** The saved [Dow Jones record](/Volumes/4/GitHub/the-catch-site/data/sources/coverage/djn-wsj-warrants-2026-08-29.txt:1) says U.S. oil companies “resisted investing,” bytes `454:527`; that the private structure was intended to bind future Venezuelan governments, bytes `7491:7580`; and identifies the November midterms, bytes `5780:5817`, as reported political context.

A full September 4 [Washington Post investigation](https://www.washingtonpost.com/world/2026/09/04/trumps-huge-venezuela-deal-began-with-call-bet-an-oilman/) reports that Betancourt assisted U.S. strategy before and after Maduro’s capture, influenced Venezuelan oil decisions, received U.S. intervention and a visa while Swiss authorities pursued him, and became the chosen intermediary. It also reports that Sargeant sold his NABEP stake under administration pressure and that NABEP still needed substantial financing. NABEP’s own current [contact page](https://www.nabep.net/contact) already resolves the article’s supposedly unchecked Barbados headquarters claim.

**Correct account:** NABEP and Betancourt were central to how the deal was designed, selected, and made politically workable. The account should distinguish reported allegations from proven facts, but it cannot omit the operator’s government relationships, noncompetitive selection, administration assistance, financing problem, and direct economic benefit. Those facts bear on motive, durability, conflicts, and whether the projected production is credible.

### 7. The gasoline claim is labeled “checked” using evidence that cannot test it

**Severity: MEDIUM-HIGH**

**Page bytes:** Bytes `58609:58720`: “the EIA weekly series for the fact-sheet week is $4.207, a cent below the week before. No later week is pinned.”

**Record bytes:** [Gasoline CSV lines 1744-1745](/Volumes/4/GitHub/the-catch-site/data/sources/venezuela-oil/GASALLW-2026-09-08.csv:1744) show `4.218` and `4.207`. [WTI CSV lines 10608-10610](/Volumes/4/GitHub/the-catch-site/data/sources/venezuela-oil/DCOILWTICO-2026-09-08.csv:10608) show `84.57`, `87.03`, and `91.48`.

**Correct account:** A same-week gasoline observation cannot validate a promise whose mechanism depends on future drilling, infrastructure, financing, refining, and supply. The page itself says material production might begin in 2027. WTI’s rise also cannot disprove the promise because Iran and Hormuz were contemporaneous confounders. The correct status is “not yet testable,” with a defined future observation window, not “checked.”

### 8. The published artifact declares its own provenance checks unfinished

**Severity: MEDIUM-HIGH**

**Page bytes:** Bytes `88802:88887`: “The state record has not yet read this story’s sources, so it tracks no values for it.” Bytes `89171:89224`: “This page does not yet list who reported each figure.” Bytes `89293:89330`: “No changes are recorded in this view.”

**Record bytes:** The [manifest](/Volumes/4/GitHub/the-catch-site/checks/manifests/venezuela-oil--september-2026.json:1) contains 47 records, 47 story-source entries, and 20 figures. Several are carriers or duplicates of the same Reuters, AP, official-briefing, or Machado-video lineage. The page does not expose those dependencies as source lineages.

**Correct account:** An inventory of 47 records is not 47 independent confirmations. The core terms still trace mainly to the White House, Venezuelan executive, NABEP, and a small number of anonymous-source news networks. The page should complete its figure tracking, revision history, and lineage grouping before presenting the checking surface as finished.

I separately compared the normalized article bodies of the five central live sources against their pins: the White House fact sheet, White House September 2 release, NABEP release, and MPPRE pages 7980 and 7986. Their substantive bodies matched; dynamic page wrappers differed. That reduces revision risk but does not cure the omissions.

## Layer 1: Verification of material propositions

| Proposition | Finding |
|---|---|
| 17 fields | Repeated by both governments and NABEP, but the field list is absent. Issuer claim verified; underlying proposition unverified. |
| 65 billion proved barrels | Repeated by interested parties, with no reserve report or independent field-level support. Materially under-supported. |
| 35 percent equity | White House says present equity; NABEP says rights to a stake; later officials say penny warrants. Present ownership and exercise status are not established. |
| 20 percent at production cost | Accurately attributed, but no contract defines cost, eligible production, duration, transfer point, or pricing adjustments. |
| 55 percent control | Article correctly identifies this as administration arithmetic combining unlike instruments. It is not 55 percent barrel ownership. |
| 100 years | White House claim only. Subsequent PDVSA description is 25 years plus possible renewals. Headline overstates the evidence. |
| $100 billion investment | Forecast from NABEP and governments, not committed financing shown in a contract. |
| $200 billion or $209 billion revenue | Projection with inconsistent labels and no model. The article notices the label differences but does not verify the economics. |
| 1.15 million b/d country output | Supported by the saved August EIA outlook for July. Correctly bounded as country output. |
| 200,000 or 250,000 b/d NABEP output | Company and White House claims, not independently audited in the cited record. |
| Russian and Chinese prior control | Reported by officials and Reuters, but not independently checkable without the 17-field schedule and ownership history. |
| Venezuela retains the deposits | Supported by the [Venezuelan statement](/Volumes/4/GitHub/the-catch-site/data/sources/venezuela-oil/mppre-7986-presidenta-delcy-rodriguez-se-dirige-al-pais-sobre-el-gran-acuerdo-energetico-con-eeuu.txt:416), bytes `6536:6602`, and the hydrocarbons law. |
| “Biggest oil deal in world history” | Properly attributed to Trump, not established as a factual superlative. |
| Lower gas prices | Prospective causal claim. Not presently verifiable and not tested by same-week prices. |
| No congressional action | The page’s U.S. roll-call wording is narrowly true for its saved records, but it omits earlier U.S. legislative scrutiny and the September 1 Venezuelan Assembly vote. |
| NABEP organization | The page calls it unknown, although NABEP lists Barbados headquarters and Venezuelan offices. The precise parent, subsidiaries, licensee, and beneficial ownership remain unresolved. |
| OSC authority | No disclosed warrant instrument or legal opinion. Current §149 does not expressly authorize equity. |

## Layer 3: Reconstructed story

On January 3, U.S. forces captured Nicolás Maduro. The United States then supported Delcy Rodríguez’s interim government while creating an oil-marketing and sanctions regime in which Venezuelan proceeds moved through U.S.-controlled accounts. Congress was already questioning audit access, conflicts, and who controlled disbursements.

NABEP was not a new entrant in August. It already had three Venezuelan projects and an existing relationship with PDVSA. Reporting indicates Betancourt also acted as an intermediary in U.S. policy and Venezuelan oil decisions. Large oil companies resisted the speed, risk, and legal uncertainty sought by the administration, which then chose NABEP and brought OSC into the structure.

On August 27, OFAC issued GL46D. On August 28, Trump and Rodríguez announced an agreement after private negotiations. Fourteen new projects were reportedly added to NABEP’s existing three. No signed agreement, field annex, reserve report, financing commitment, cap table, warrant, or legal opinion was made public.

The White House later described 100-year concessions, 65 billion proved barrels, a free 35 percent OSC equity stake, and a State Department right to buy 20 percent at production cost. NABEP used different language: rights to a 35 percent stake. Officials later described penny warrants that could provide dividends before exercise.

Venezuela described the project as a 25-year contract and insisted that the Republic retained the deposits. On September 1, the ruling-party Assembly passed a motion supporting the agreement. That does not establish approval of the undisclosed contract or satisfaction of the law’s direct-selection requirements. On September 7, PDVSA’s president said the contract could be renewed for similar periods, explaining the aspiration toward 100 years without proving a present 100-year grant.

The 65-billion-barrel, $100-billion-investment, $209-billion-revenue, and lower-gas-price claims remain projections from the transaction’s sponsors and beneficiary. Their repetition does not substitute for field-level reserve evidence, financial commitments, or a production schedule.

## Remaining high-value checks

- Obtain the signed PDVSA-NABEP contract, all amendments, the 17-field annex, and the renewal clause.
- Obtain the OSC warrant instrument, cap table, legal opinion, appropriations basis, congressional notices, and exercise status.
- Obtain the Council of Ministers direct-selection approval, operator fitness evaluation, approved business plan, and complete Assembly record.
- Obtain an independent field-by-field reserve audit, including effective date, crude quality, recovery assumptions, and economic threshold.
- Trace NABEP’s Barbados, Venezuelan, and any U.S. entities, beneficial owners, the Sargeant divestiture, financing commitments, and the entity actually relying on GL46D.
- Audit January-to-present proceeds, KPMG reports, GL46D transaction reports, Treasury or Qatar accounts, and the status of congressional or GAO review.
- Pin the original Machado video. The manifest contains zero video files. I read its Spanish transcript end to end, but the media stream refused download with HTTP 403, so an `ffmpeg -vf fps=1` frame inspection of that unpinned source remains outstanding.
- Publish and then byte-check the live article. The expected route currently returns 404.

VERDICT: INCOMPLETE