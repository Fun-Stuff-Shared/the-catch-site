# Mail-voting rework 2 checklist

Copied from `checks/audits/mail-voting--september-2026-2026-09-08.md` disposition table, 2026-09-08. Every row marked "fix" is an item. Do not write story prose until the four new sources are admitted.

## Sources to admit first

- [x] a. USPS system-of-records notice USPS 820.225. Direct fetch 200. Pin `data/sources/mail-voting/usps-sorn-820-225.pdf` + `.txt`. Manifest quote: `Records are retained for 5 years.`
- [x] b. USPS response to comments. Direct fetch 200. Pin `usps-sorn-response-2026-09-01.pdf` + `.txt`. Manifest quote: `effective with this publication of the`.
- [x] c. Blumenthal whistleblower release. Direct fetch 200. Pin html + txt. Manifest quote: `zero-percent failure threshold`.
- [x] d. USPS portal statement. Direct fetch 200. Pin html + txt. Manifest quote: `spent months developing a U.S. Federal Ballot Mail Portal`.
- [x] No fetch was blocked.
- [x] SOURCES.md mail-voting table extended with the eight new files.

## Findings (fix)

- [x] Finding 1: UOCAVA exclusion stated; September 19 kept as statutory context only; removed from Who feels it dated list. `src/pages/events/mail-voting/september-2026.astro:82`, `:203`, dated list `:222-225`.
- [x] Finding 2: Outbound mailings presented by election offices; 24.5.4 cited. `:80`.
- [x] Finding 3: Issued and effective August 21, published August 26; `daysEffectiveToElection` 74 in `src/data/mailvoting202609.mjs:43-44`; both 69 and 74 rendered at `:189`.
- [x] Finding 4: Claim check lists injunction reach from Talwani, not "acceptance screen". `:259`.
- [x] Finding 5: Brown's 25 is the same coalition; loose label because D.C. is not a state. `:199`.
- [x] Finding 6: Society for the Rule of Law cited to the docket pin. `:274`.
- [x] Finding 7: "Why the judge blocked it" with three preliminary holdings and the government's answer. `:92-100`.
- [x] Finding 8: Catch-minor no longer calls NBC a slip; NBC chip is checks out; SORN cited. `:178`, `:247`.
- [x] Finding 9: Three labeled parts, each cited. `:215`, `:217`, `:219`.

## Remaining checks on the page (open questions)

- [x] September 9 response and any stay order (`:283`)
- [x] First Circuit dockets 26-2029 and 26-2031 (`:284`)
- [x] USPS production due September 8 (`:285`)

## No page change (from disposition)

- "First check of this story's sources has not run yet": no page change; fills when story read completes.
- No video record: no action.

## Gates (in this order)

- [x] quote_lint: clean
- [x] lens_lint: clean
- [x] npm run build: event gate passed
- [x] stage-story without --luna-read: 33 pins, 11 figures, 0 model calls

## Commit

- [ ] Explicit paths only. Never add data/state/. Never push.
