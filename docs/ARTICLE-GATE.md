# Gate support for standing articles and format previews

The dated-event gate remains required. `npm run build` still runs citation merging,
work evidence, facts lists, the event gate, and the shell gate in that order.
Non-event article routes now join that pipeline through a build-only registration.
This is not a rendering, gallery, or citation-context API: #3 E owns the citation
frame/context; #5 V0 owns the shared fictional gallery harness. No article template
or fixture is introduced here.

## Register a published article

Add a JSON descriptor under `checks/article-pages/`:

```json
{
  "route": "/trackers/route-name/",
  "source": "src/components/formats/Tracker.astro",
  "manifest": "checks/manifests/route-name.json",
  "claims": "checks/claims/route-name.json"
}
```

- `route` is a canonical, lowercase, trailing-slash route, never `/events/` or `/design/`.
- `source` names the Astro file containing the article markup; typed table-number
  checks apply there, just as they do on authored event pages.
- `manifest` uses the existing record manifest: `subject`, `event` (stable context
  ID), `story` equal to `route`, `date`, `sub_events`, `records`, `story_sources`,
  `completed_by`, and every existing editorial `steps` attestation. Records retain
  their saved paths under `data/sources/`, hash, quote, and capture-run/status checks.
- `claims` is optional. When present it is the existing `{claims: [...]}` ledger;
  facts mode uses its own `says` sentences, not a URL-derived event ledger. Cited
  claims must name evidence in this page's numbered sources.

The rendered page needs `main#story-root`, all three `data-mode` links and the
mode switcher, fully typed content blocks, and its numbered source list. Existing
layer, empty-facts, house-copy, citation-target, and saved-passage checks are shared
with events. Article citations additionally verify page-local source numbering,
record membership, nonempty passages, and claim evidence. Sources use the existing
primary/official/coverage ordering. Unknown layer values fail.

An emitted non-event reading-mode article without a registration fails the gate.
The four pre-existing Rubio episode routes retain their existing official-page
checks; this is an exact compatibility list, not an exemption for future routes.
Registered standing routes are not required to enter the dated `/events/` index.
No existing event route, attestation, reading-mode check, or route regression is
removed. Explicit CLI directory arguments for the three processors still work.

## Let a preview harness register a fixture

V0 may put the same descriptor, named `article.json`, anywhere under
`src/fixtures/`. The descriptor and its manifest, claims, source bytes and any
fixture downloads stay in that fixture's directory. The reusable Astro component
may live elsewhere under `src/`. No fixture module goes in `src/data/*.mjs` and no
fictional manifest goes in production `checks/manifests/` (those publish records).

The fixture descriptor's route must be under `/design/`. Its manifest's `story`
must match. Synthetic record IDs start `fixture-`; each record has a `reader_path`
under that fixture's preview route, supplied by V0, so it cannot open a production
record. The source's hash and exact quotation are checked as usual; give its
`capture_status` an honest fictional-fixture label, never a false admission run.
Fixtures do not attest editorial admission of fictional material. Published
articles still need all five editorial attestations.

Only `CATCH_DESIGN_PREVIEW=1` includes fixture articles in processing and expects
their routes. Each needs a real robots `noindex` meta tag and a visible fictional
or synthetic notice marked `data-fixture-notice` (or the existing `sample-notice`
class), including fixture record-reader pages. The notice must not be hidden or
confined to one reading mode. Normal builds reject emitted `/design/` pages. Even preview
builds reject fixture routes, record IDs, distinctive titles/quotes, or identical
fixture bytes in production discovery, sitemap, record pages, downloads and
runtime bundles. Optional `sentinels: ["unique fictional heading"]` on a descriptor
adds strings to that isolation check; each string must be at least 12 characters.
Use distinctive fictional wording so a leak is detectable without confusing an
ordinary reporting sentence with fixture prose. Keep preview downloads inside
`/design/` as well. Source data modules may not import the fixture tree.

Run `npm run test:articles` for disposable positive/negative fixtures exercising
the real post-build CLIs and gate. These test inputs are created in temporary
directories, never imported by the site. `npm run test:cites`, `npm run test:copy`,
and `npm run build` remain the existing regression checks.

## Tracker authoring boundary for later templates

A tracker is a separate standing route with append-only dated updates and
source-supported next dates. It never rewrites a dated story. Meeting recaps use
the same boundary for draft minutes, later approval, and changes. A corrections
log requires a real Catch editorial journal; `updated` timestamps or other
outlets' corrections are not journal entries. These are authoring requirements
for later templates, not unsupported assertions that this mechanical gate can
establish an editorial history.

## Returning from a source

The source reader, source details and saved copy admit exact registered published
article routes for their return links, including mode queries and section anchors.
The browser imports only the named `route` fields from published descriptors;
manifest/source/ledger paths and preview fixture descriptors are not bundled.
Existing event, official, design-preview and source-library returns stay supported.
