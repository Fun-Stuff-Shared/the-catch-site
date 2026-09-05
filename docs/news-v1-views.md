# Generated news views

The build pulls a lock-protected snapshot of every event and chain view, validates
it, builds cited record pages, renders Astro, and runs the publication gate. When the
state volume is absent, the committed copies in `data/state` are used. A mounted but
incomplete or inconsistent projection fails the build.

The three existing story URLs retain their prose introductions. All current values,
source lists, follow-up links and chain comparisons come from state views. The home
feature and events index use the same deterministic chain ranking. A one-story,
one-publisher chain is listed under its desk and remains reachable at its URL.
Claims and officials retain their existing data paths. Publication is manual.

The existing three prose manifests retain their eight publication attestations.
Generated content is checked directly by `check-state-pages.mjs`: every event route,
merge redirect, story and chain title, current figure, transition sentence and link,
cited record page, and tracked chain figure must match the snapshot. The HTML parser
checks the visible number as well as its provenance attributes. Changing a visible
number while leaving its attributes intact fails the build. The mechanical language,
route and citation checks in `check-events.mjs` still run.

Cited documents have repository text pins checked against their evidence hash. Their
record pages show the accepted cited passages, each checked against that saved text.
A reference without a quoted passage is explicitly shown as the opening of the saved
document. The document's citation role remains attached to each citing story.

Run `npm run test:state` for consumer and tamper tests. Run `npm run build` for the
full publication gate. To test a disposable projection without reading live state,
set `CATCH_STATE_SOURCE` to its views directory; the pull still validates it before
replacing local copies. Keep fixture inputs out of commits intended for publication.
