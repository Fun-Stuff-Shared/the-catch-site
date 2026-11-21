# Officials and election record contract (P1)

This is the pipeline interface for issue #4, not a new published dataset.
`schemas/official-records-v1.json` is JSON Schema 2020-12. The validator adds
record resolution and cross-row checks that JSON Schema cannot express.
No existing prose, records, routes, citation components or publication decisions
are changed. P2–P6 build components against this interface; P7 wires live pages.

## Files and entry points

| File | Purpose |
| --- | --- |
| `schemas/official-records-v1.json` | Strict, versioned interchange shape; unknown properties fail |
| `src/lib/official-records.mjs` | `validateOfficialRecords`, `assertOfficialRecords`, `publishedOfficials`, `previewOfficials` |
| `src/lib/official-evidence.mjs` | Hash-checked passage resolver and anchor-attribute adapter |
| `scripts/fixtures/official-records/` | Synthetic corpus, saved sample source, registry and negative mutation cases |
| `scripts/official-records-test.mjs` | Structural, relational, provenance and publication-boundary tests |

Run `npm run test:officials`. For pipeline handoff, validate a JSON dataset against
a **trusted** registry of admitted records and an array of published story paths:

```sh
node scripts/check-official-records.mjs dataset.json trusted-records.json published-stories.json
```

The registry is external to the dataset on purpose. Do not accept a submitted
dataset as its own record registry. The CLI's output distinguishes `fixture`
from `records`; passing validation does not authorize publication.

## Dataset and evidence

The top level requires `format: "catch-official-records-v1"`, `kind` (`records`
or `fixture`), `coverage`, and six arrays: `officials`, `roll_calls`, `finance`,
`registrations`, `maintenance`, `elections`. Keep absent arrays empty and explain
why in `coverage.missing`; never insert fake zero observations to satisfy a view.
Dates are ISO dates; `as_of` is no earlier than the coverage end. `completeness`
is `partial` whenever missing-data reasons exist. An empty official section
needs a missing entry with both `section` and `subject_id` (the official ID).
Empty top-level collections need a missing entry without a subject ID.

Each factual row (including identity, identifiers, members, candidates and
industry classifications) has a nonempty `evidence` array. A reference is:

```json
{
  "record_id": "an-admitted-record-id",
  "passage": "An exact, unique passage in the saved text.",
  "source_class": "official",
  "locator": "Optional original table, row or section label"
}
```

The trusted registry supplies `{id, text_path, text_sha256, source_class}`.
`text_sha256` includes the `sha256:` prefix. Text is UTF-8; neither whitespace
nor Unicode is normalized. Fingerprints must match; paths cannot escape the
repository, including through symlinks. `readText(record)` may be injected by a
verified snapshot reader instead of the default filesystem reader. Reuse one
resolver per dataset/page to cache hash checks, never across changing registries.

Source classes are `primary`, `official`, `coverage`, `fixture`. Producers must
classify admitted sources explicitly, not infer source class from a URL or
publisher name. Existing manifests without a class are not silently upgraded.
Secondary statement quotations retain `quoted_via`; a statement's literal
`quote` must occur in its cited passage. Fixtures cannot be used by a records
dataset, even if someone changes only the dataset's `kind`.

Passages must be unique in their saved text because the current reader locates
them by text, not offsets. Include enough surrounding words to disambiguate.
`locator` is descriptive metadata, **not** an offset or an alternate search key.
Validation proves shape, references and exact bytes, not whether the source
entails the claim; the existing evidence admission/editorial process still does
that work. Registered sources must also be emitted through the existing records
routes when a view is wired live.

## Record families

- **Officials:** stable `id` and `slug`; sourced `identity.name`; external
  identifiers; dated offices with state/county, chamber and party; statements
  and actions grouped by topic; references to finance sets; explicit appearances.
  Office periods are `[start, end)` and `end: null` means ongoing. Split terms
  when party changes. Concurrent different offices are representable.
- **Statements/actions:** independent stable IDs, dates, topics and evidence.
  Actions may reference a roll call; it must include that official on that date.
  Matching a topic does not imply motive or an editorial verdict.
- **Appearances:** existing `/events/.../` or `/officials/.../` story paths,
  checked against the caller's `publishedStories` set. Never discover appearances
  through string matching. The fixture's story set is synthetic and cannot be
  substituted for the production catalog.
- **Roll calls:** ID is `chamber-congress-session-number`; include the exact
  question, measure (nullable), recorded result, threshold and member casts.
  Votes are `yea`, `nay`, `not_voting`, `present`; do not turn a missing row or
  `not_voting` into a claim about physical absence. Members have stable source
  IDs, names, states and party **at the vote**. `official_id` is optional for
  members without a dossier; when present it must resolve and match an office
  term. Complete member counts reconcile with totals. Partial rows need a reason
  and cannot exceed totals. They also require a dataset-level `roll_calls`
  missing reason and partial coverage. They are not eligible for full party statistics.
- **Finance:** explicit official↔committee association, reporting period,
  grouping method and sourced receipt rows. `amount_cents` is a signed safe
  integer so refunds are preserved. `report_id` identifies a report's amendment
  lineage; `filing_id` identifies the concrete filing. Deduplicate the same
  committee/report/schedule/transaction, replacing originals with amendments,
  before handing off; identity checks span all finance sets, including overlaps.
  Receipt dates must fall within dataset coverage and their report's period.
  Keep excluded memo, interest, exchange and duplicate rows
  labeled; consumers must exclude them from contribution totals. Industry
  classifications need receipt IDs, a methodology and their own evidence.
  Unclassified included contributions require an `industries` missing reason
  for that official. Employer names are not corporate donations. Independent
  expenditures are not supported as candidate receipts in this contract.
- **Registration:** dated state/county observations, status, status definition,
  source-series ID, integer count and evidence. Do not join incompatible source
  series or silently substitute observations from different reporting dates.
- **Maintenance:** recorded `notice`, `inactive_designation`, `removal` events.
  `count: null` explicitly represents an unavailable count. A change in an
  inactive series is not evidence of removal. No voter-level personal data is
  included in this contract.
- **Elections:** election date, reporting timestamp, unofficial/certified status,
  jurisdiction, office, sourced candidate counts and a denominator. Candidate
  votes must equal `valid_candidate_votes` or not exceed `total_ballots`.

## Consumers and publication boundaries

```js
import { publishedOfficials, previewOfficials } from "./official-records.mjs";
import { createOfficialEvidence, officialEvidenceLink } from "./official-evidence.mjs";

const context = { records: trustedRecordById, publishedStories: publishedStoryPaths };
const live = publishedOfficials(pipelineDataset, context);
const resolveEvidence = createOfficialEvidence(context);
const attributes = officialEvidenceLink(live[0].identity.evidence[0], resolveEvidence);
// Astro: <a {...attributes}>Read the source</a>
```

The adapter emits `href`, `data-record-href`, `data-passage` for the current
reader, with a source-page fallback. It never allocates a page-local footnote or
changes `Cite.astro`. Use literal text for labels; let Astro escape attributes.

`publishedOfficials` never reads the design flag, never imports fixtures and
always returns `[]` for fixture datasets. Invalid record datasets fail closed
with errors; they do not silently degrade into zeroes or half-valid lists.
The validator must receive a real registry even for an empty dataset.

Gallery-only modules may import fixtures and call `previewOfficials`, which
returns `[]` unless `CATCH_DESIGN_PREVIEW === "1"`. An enabled preview accepts
only fixture datasets. Use it in gated `getStaticPaths`, alongside `noindex`
and a clear synthetic notice. A preview-only evidence resolver needs
`{allowFixture: true}`; never enable this on a live route. Keep fixture imports
out of production discovery, search and client bundles. There are intentionally
no new pages or gallery routes in P1: their ownership belongs to P2–P6.

Derived metrics are not stored assertions in v1. P3 computes alignment from the
**currently shown, complete roll calls**: the unique yea/nay majority of the
official's own party, excluding party ties and the official's non-yea/nay casts;
show numerator, denominator and coverage. No eligible calls means unavailable,
not 0%. P5 derives election vote margins and percentage-point margins from the
shown candidate rows and an explicitly labeled denominator. Finance totals use
the displayed eligible, deduplicated receipts. Preserve input IDs with derived
views so every result can be recomputed.

## Producer gaps and follow-up ownership

P1 does not reclassify the legacy Rubio data, infer official history, import
new records, or touch `src/lib/v2.mjs`. The producer still needs to supply sourced
identity/office/party history, full member casts and topic assignments, official
FEC committee links with deduplicated receipts and supported classifications,
normalized county observations/maintenance/results, and story appearances.

P2–P6 each own their component and gallery routes after this contract and issue
#3 foundation A merge. P7 owns published dataset loading, strict selector use,
source-route existence and fixture-exclusion checks over generated routes,
search and assets. Existing pages remain as-is until that integration; schema
validation is not yet part of their legacy publication path. Future additive
shape changes require an explicit schema update and consumer tests; incompatible
changes require a new format version.
