# Dispositions (keystone, 2026-09-09 00:20Z, main 5b510788)

| # | Finding | Verified at the bytes | Disposition |
|---|---|---|---|
| R1 | "Neither publishes a financing decision" and "no record yet shows the financing decision" are false: an April 13, 2026 implementing decision commits €21.15 million | Yes: ec-greenland-country.txt lists "13 April 2026 Annual action plan 2026"; the Commission ZIP fetched and pinned: decision "EUR 21 150 000", annex "first operational component of the EU–Greenland Investment Package" | Admitted and fixed: catch row rewritten ("A total, one tranche written down"), Where this sits rewritten, watching line rewritten; decision and annex manifested with a sub-event |
| R2 | Story starts September 1; package formed over two years, Parliament notified January 26 | Partly: "two years of intensive work" is in the pinned statement; the Parliament newsletter URL returns 404 here, so the January 26 notification is unverified and not used | Fixed from the pins for the two-year and April points; January notification typed unverified in this table, not on the page |
| R3 | "This year and next" is an announcement window, not the implementation period | Yes: annex "96 months from the date of entry into force of the financing agreement"; press release "over the next five years" | Admitted and fixed |
| R4 | New-money baseline under-normalized (€54.7 million cable; €94 million agreements) | €54.7 million verified in the country pin; the March 2024 factsheet not fetched | Fixed for the cable figure; the €94 million left out (unverified here) |
| R5 | 24 of 34 stated as fact; Commission says 25 | Yes: DR "24 af de 34"; country pin "25 of the 34" | Admitted and fixed: both counts attributed |
| R6 | AP conversion sentence wrong | Yes: $580 million at 1.1614 is €499 million | Admitted and fixed |
| R7 | "Seven outlet stories are in the records" versus 19 coverage records | Yes: manifest coverage_records length 19 | Admitted and fixed |
| Op | Auditor's Undertone run left undertone.db at the repo root | Yes | Deleted; untracked artifact |

Pre-existing quote_lint findings on lines 262, 277, 290 (not touched by this rework) remain open for the next pass.

The central omission is the pre-September financing record. The page says no record shows a financing decision, but its own pinned Commission page links an April 2026 decision authorizing the package’s first €21.15 million component. Combined with a January notification to Parliament, this changes the September visit from the package’s beginning into its political unveiling and first-deliverables event.

Audit target: the supplied [built page](/Volumes/4/GitHub/the-catch-site/dist/events/greenland/september-2026/index.html:3), 85,868 bytes, SHA-256 `f562fe8387727975bc47d13bf5f1d23a1610c88d02b331fc09cc9903621c4f02`. Offsets below are zero-based and inclusive. A live fetch returned HTTP 403 and browser automation returned `ERR_BLOCKED_BY_CLIENT`, so deployed-byte parity is not confirmed.

## 1. Verification

### Rank 1, CRITICAL: The financing-decision absence claim is materially false

- Page bytes `28136:28153`: `A total, no split.`
- Page bytes `28262:28299`: `Neither publishes a financing decision`
- Page bytes `50230:50281`: `no record yet shows the financing decision behind it`
- Record: [pinned Commission country text](/Volumes/4/GitHub/the-catch-site/data/sources/greenland/ec-greenland-country.txt:1), bytes `9922:9934` say `13 April 2026`; bytes `9936:9991` name the annual action plan. The pinned HTML at bytes `63112:63154` contains its ZIP filename.
- Record: [official AAP ZIP](https://international-partnerships.ec.europa.eu/document/download/f34c6871-9ab2-4cf0-9420-d2ddbc708d09_en?filename=aap-2026-c2026-2542-greenland-part-1_en.zip). Extracted decision bytes `2012:2045` say `adopt an annual financing decision`; bytes `8190:8203` set `EUR 21 150 000`.
- Record: [extracted annex](/tmp/greenland-audit.pTuR4g/aap/C_2026_2542_F1_ANNEX_EN_V1_P1_4752029.txt), bytes `11294:11320` call it the `first operational component`.

Correct account: the two September announcement pages may not themselves contain a decision, so the narrow “neither” wording is literally defensible. The broader absence claim is not. At least €21.15 million had an implementing decision dated April 13. I did not find decisions accounting for the remaining €178.85 million.

### Rank 3, HIGH: “This year and next” is an announcement window, not the implementation period

- Page bytes `58291:58380`: `The €200 million and the two-year window check out against the Commission press release.`
- Record: [Commission press-release pin](/Volumes/4/GitHub/the-catch-site/data/sources/greenland/ip-26-1800.txt:1), bytes `3930:3953`: `over the next five years` for satellite expansion.
- Record: AAP annex bytes `78899:78907`: `96 months`.
- Record: AAP annex bytes `84174:84230`: `direct untargeted budget support to the national treasury`, with indicative disbursements continuing through 2029.

Correct account: the Commission described €200 million as investment for 2026 and 2027. At least one operational component runs up to eight years from the financing agreement, its budget support runs through 2029, and the satellite project is described as five years. The page verifies the quote but not the procedural meaning.

### Rank 5, MEDIUM: The page converts a disputed 24-of-34 figure into an unqualified fact

- Page bytes `48503:48577`: `24 of the 34 critical raw materials the EU lists can be found in Greenland.`
- Record: [DR pin](/Volumes/4/GitHub/the-catch-site/data/sources/coverage/dr-signing-2026-09-07.txt:1), bytes `3385:3395`: `24 af de 34`.
- Broader record: [Commission country pin](/Volumes/4/GitHub/the-catch-site/data/sources/greenland/ec-greenland-country.txt:1), bytes `6842:6853`: `25 of the 34`. The Commission’s [2023 raw-materials release](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_23_6166/IP_23_6166_EN.pdf) also says 25.

Correct account: DR reported 24; the Commission says 25. Without resolving the counting methodology, the story should attribute the disagreement rather than state 24 as settled.

### Rank 6, LOW: The AP currency normalization is arithmetically wrong

- Page bytes `32075:32153`: `AP's "around half a billion euros ($580 million)" is a round of €530 million.`
- Record: [AP pin](/Volumes/4/GitHub/the-catch-site/data/sources/coverage/ap-greenland-eu-2026-09-07.txt:1), bytes `1485:1526`: `around half a billion euros ($580 million)`.
- Record: [ECB rate pin](/Volumes/4/GitHub/the-catch-site/data/sources/greenland/ecb-eurofxref-2026-09-08.txt:1), bytes `342:377`: `currency='USD' rate='1.1614'`.

Correct account: at that rate, $580 million equals about €499.4 million. €530 million equals about $615.5 million. A later page passage partially recognizes this, making the page internally inconsistent.

### Rank 7, LOW: “Seven outlet stories” understates the manifest and obscures syndication

- Page bytes `56849:56888`: `Seven outlet stories are in the records.`
- Record: [manifest](/Volumes/4/GitHub/the-catch-site/checks/manifests/greenland--september-2026.json:1), key begins at byte `57055`; `jq '.coverage_records | length'` returns `19`.

Correct account: the manifest contains 19 coverage records, including syndicated copies and shared wire lineage. The page can say seven displayed stories, but not seven records or seven independent accounts.

Other central propositions were supported: the €200 million headline amount, the three declaration signatories, the declaration’s nonbinding character, the named project areas, the existing €225 million envelope, the proposed €530 million future envelope, and the separate fisheries payment.

## 2. Completeness discovery

### Rank 2, HIGH: The chosen September 1 beginning omits the package’s documented formation

- Page bytes `18170:18185`: `The week in Nuuk`
- Page bytes `18500:18565`: `Sep 1...Denmark announces the Nuuk visit`
- Record: the [European Parliament BUDG newsletter](https://www.europarl.europa.eu/cmsdata/302419/BUDG%20Newsletter%205%20February%202026.pdf) says the Commission informed Parliament on January 26 of a €200 million Greenland package, including €150 million from the NDICI cushion.
- Record: the April 13 implementing decision described above.
- Record: [official Ursula transcript](/tmp/greenland-audit.pTuR4g/ursula.vtt), bytes `822:846`: `2 years of intensive work`; bytes `1287:1304`: `first deliverables`.
- Record: [official Q&A transcript](/tmp/greenland-audit.pTuR4g/qa.vtt), bytes `4465:4489`: `geopolitical developments`, which she said affected the topics’ width and depth.

Correct account: development ran for roughly two years; Parliament was notified in January; a first financing decision followed in April; September brought the joint declaration, public presentation, and first project deliverables. Starting on September 1 materially compresses that chronology.

The page says its audiovisual landing page has no transcript at bytes `26323:26350`. That is true of the visible landing page, but official caption files were retrievable. I also inspected all 1,670 seconds of the 27:49 video at one frame per second. It contains podium footage and camera cuts, with no unseen charts, documents, or source slates.

### Rank 4, MEDIUM: The financial architecture and “new money” baseline are under-normalized

The omitted April annex allocates the first €21.15 million as:

- €5.15 million for satellite connectivity
- €8 million for hybrid renewable energy
- €3 million for raw-materials work
- €5 million for administrative capacity
- €8 million as budget support and €13.15 million as complementary support

The page correctly mentions the €225 million 2021-2027 envelope, but it does not place the September package cleanly alongside earlier implementation:

- The [Commission country pin](/Volumes/4/GitHub/the-catch-site/data/sources/greenland/ec-greenland-country.txt:1), bytes `7923:7937`, records `€54.7 million` already allocated to the Tusass Connect subsea cable.
- The Commission’s [March 2024 factsheet](https://ec.europa.eu/commission/presscorner/api/files/attachment/877811/Factsheet%20EU-Greenland%20Partnership%20EN.pdf) records almost €94 million of agreements: €71.25 million for education and €22.5 million for green growth.

Correct account: the €94 million is implementation within the existing €225 million framework, not additive new money. The €54.7 million cable allocation is a separate connectivity baseline. The €200 million package broadens and accelerates cooperation, but the story cannot establish that all €200 million was newly appropriated, contractually committed, or ready to disburse in Nuuk.

## 3. Independent reconstruction

Starting without the article’s frame produced three conclusions:

1. The joint declaration, the €200 million investment package, and individual financing or project instruments are distinct. Signing the declaration did not itself appropriate €200 million.
2. The September visit was a launch and implementation milestone for work already underway, not the package’s documentary beginning.
3. Only the first €21.15 million is presently traceable to the located financing decision. Searches across Commission, Parliament, EUR-Lex, Greenlandic government, KNR, and Sermitsiaq records did not produce a complete decision and contract chain for the remaining €178.85 million. That unsuccessful search is not evidence that no additional instruments exist.

A disproof search found no record invalidating the €200 million political commitment. It did find records that invalidate the page’s absence language and narrow chronology. Searches for Greenlandic parliamentary, civil-society, or opposition responses produced no adequately sourced counteraccount; this remains an evidence gap, not proof of consensus.

## Reconstructed story

By January 26, 2026, the Commission had informed the European Parliament that it intended to mobilize a €200 million package for Greenland, with €150 million coming from the NDICI flexibility cushion. On April 13, it adopted a €21.15 million annual financing decision described as the first operational component of that package.

On September 7 in Nuuk, the EU, Greenland, and Denmark signed a new nonbinding joint declaration. Separately, the Commission publicly presented the €200 million package and its first deliverables, covering satellite connectivity, hybrid energy, raw-materials development, and administrative capacity, with housing and tourism preparations also named.

The “this year and next” language describes the package’s political investment or mobilization window, not completion. Documented components extend through 2029, five years, or up to 96 months. The record currently supports a €200 million umbrella commitment and an initial €21.15 million financing decision, not a fully itemized, fully contracted €200 million program.

The package also sits beside, rather than replaces, the existing €225 million 2021-2027 envelope, prior agreements under that framework, separate connectivity funding, annual fisheries payments, and the proposed €530 million 2028-2034 envelope.

## Remaining high-value checks

- Trace the remaining €178.85 million through 2026 and 2027 financing decisions, budget lines, contribution agreements, grants, and procurement notices.
- Obtain primary documentation for the €50 million not covered by Parliament’s stated €150 million cushion contribution.
- Reconcile the reported €9.1 million satellite contribution with the AAP’s €5.15 million satellite allocation.
- Obtain the financing agreement and disbursement conditions for the €8 million budget-support component.
- Check Greenlandic parliamentary records, project-level consultations, Indigenous and municipal responses, and environmental review records.
- Re-fetch the live deployed page from an unblocked network and compare its bytes with the audited build.
- Resolve the Commission’s 25-of-34 count against DR’s 24-of-34 count.

Operational note: an Undertone transcription invocation created an untracked [`undertone.db`](/Volumes/4/GitHub/the-catch-site/undertone.db) at the repository root, 274,432 bytes. I left it untouched because the audit prohibited further repository mutation. No tracked story file was edited.

Goal tracker usage: 1,014,149 tokens over 46 minutes 10 seconds.

VERDICT: INCOMPLETE

