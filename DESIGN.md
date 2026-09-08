# Reader experience

The experimental direction extends the jobs story's editorial identity: Newsreader headings and prose, Public Sans navigation, quiet rules, white paper, near-black ink, restrained blue links. Reading is the primary mode.

The shell fills the desktop viewport with shared responsive gutters. Browsing uses the available width for multiple story or series columns. Text pages share an 864px reading column with larger desktop prose; wide tables and source copies may use the browsing width. A story contents rail occupies the left grid column on large screens. Below it, contents appear in the reading flow. No route changes the outer sheet width.

Latest uses a newspaper composition: a compact publication line, topic navigation, one lead and up to two supporting stories from distinct coverage groups across the desktop, followed by a denser reporting grid. Series and methodology sit in a separate section below the reporting. At tablet widths the lead spans two columns; mobile stacks the stories and lets the topic row scroll. Headlines retain their full text. Related older developments sit beneath featured event stories, with direct links to their series. The publication line is “Understand the story. Follow the evidence.” The catalog paginates twelve stories at a time.

Search is one shared header control on every route. It opens a field, filters the current homepage catalog in place, and shows matching published stories in a dropdown on other pages. The series directory also has its distinctly labeled local series filter. Topics describe subjects; series follow ongoing coverage; stories are dated developments. Only topics with published stories appear on the real homepage.

The opt-in `/design/coverage/` preview exercises the same homepage with fifteen explicitly fictional stories across five topics. Build it with `CATCH_DESIGN_PREVIEW=1 CATCH_STATE_SOURCE=/nonexistent/catch-ui-frozen npm run build`. Samples have separate noindex detail pages and are excluded from the real homepage and search index. Without the preview flag the design routes are not generated.

Archived static HTML routes are rendered through BaseLayout so their navigation and gutters match the rest of the site. The build shell gate checks every nonredirect page for the shared navigation, search form, and stylesheet.

Citations offer a focus/hover preview and a persistent panel on click. Desktop panels leave the story visible; mobile uses a modal bottom sheet with an expand control. Source text is rendered as text, never injected HTML. Exact saved passages are marked within surrounding source text; unavailable context is stated explicitly. Closing returns focus without moving the story. Complete saved documents remain available. The supporting figure ledger is collapsed beneath sources in ordinary reading and opens in Show the work. Its rows link directly to source passages; raw data rows belong in the source reader. The active contents item has a blue marker and light tint.

Verification: existing build and event gate, focused evidence-context tests, desktop/mobile browser journey, keyboard dismissal, discovery filters and empty results. How we check stays in primary navigation and the footer. Mobile navigation opens from a compact menu; Search opens from the same control on every page. Local preview only.

The jobs chart is an optional editorial visual shared by the homepage, series overview, and story. It calculates monthly changes from the hash-verified saved PAYEMS totals. The full chart exposes a table, calculation explanation, source vintage, and exact source-row links. Other stories retain a complete text-only layout; photographs should be added only with relevant, attributed assets.

Series overviews share one component: latest story and optional visual or dated figures, followed by a dated earlier-story list, then expandable supporting material. A one-story series explicitly says that it is the first published story. Source pages show passages with surrounding saved text, preserve the return section through full-document navigation, and disclose the text fingerprint under an expandable provenance section.
