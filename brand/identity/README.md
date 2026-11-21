# Identity kit

Approved direction: [Open Dossier with Marked Paper’s yellow Catch block](https://github.com/Fun-Stuff-Shared/the-catch-site/issues/3#issuecomment-7061593823).

These six SVGs are the editable artwork sources. The letterforms are outlined
from the site's existing `public/assets/fonts/newsreader-700.woff2` (Newsreader
Bold, copyright The Newsreader Project Authors; original SIL OFL alongside).
The placement, yellow block and compact mark are original work for this kit;
the `brand-reference` branch was not merged or copied into the public tree.
SVG/PNG exports require no fonts or network access to render.

## Export

```
npm ci
npm run brand:export
npm run test:brand
node scripts/export-brand.mjs --check
```

The exporter uses pinned Sharp to rasterize the SVG sources, preserving aspect
ratio, and writes the committed files under `public/assets/brand/`. It also
writes the SVG favicon, a 16/32 PNG-backed ICO and `site.webmanifest` with
192/512 icons plus a separately padded maskable icon. PNGs are deterministic
with the same pinned Sharp/libvips version; there are no timestamps or remote
inputs. Regenerate rather than editing public copies. `catalog.json` lists the
actual PNG dimensions for consumers and the gated preview.

The SVGs contain fixed artwork colors, not a second CSS theme system. A owns
the application primitives and themeable sheet aliases. The exporter checks
artwork roles against A's `--brand-ink`, `--brand-paper`, `--brand-highlight`
and `--brand-alert` whenever those declarations are present in the main CSS.
Do not add a parallel palette to the application.

## Use

- Horizontal wordmark: at least 168 CSS px wide; use `on-paper` on light sheets
  and `on-ink` on dark backgrounds. PNG exports are 1200 × 311.
- Stacked lockup: at least 112 CSS px wide. PNG exports are 780 × 585.
- Keep at least one period-height of clear space around each wordmark.
- Below the wordmark minimum, use the compact mark rather than shrinking the
  full name. The 16/32 px favicons are rasterized for their actual display size.
- Do not recolor, stretch or independently move the block, letters or period.
- Use the maskable PNG only for the manifest's `maskable` purpose; all artwork
  fits in its central 80%-diameter circle. Other icons have `any` purpose.
- An image used alone needs `alt="The Catch."`. Inside an already labeled home
  link, use empty alt to avoid reading the name twice. Preserve the accessible
  home-link name and visible focus when integrating.

## Preview and integration boundary

`CATCH_DESIGN_PREVIEW=1 npm run build` includes `/design/identity/`, a noindex
asset preview. A normal build omits that route. It contains no story fixtures
and is not linked from publication navigation or discovery. This is an isolated
B1 asset preview, not B4's complete token/treatment/usage gallery.

B1 initially leaves `BaseLayout.astro`, the live masthead, shared styles and
the production document head unchanged while A is being built. After A merges,
wire these assets using its `.wordmark` / `.wordmark-highlight` contract and add
the favicon, Apple icon and manifest links to the shared head. The manifest's
root id, start URL and scope deliberately preserve the real publication routes;
there is no service worker or offline-reading claim.

The preview deliberately shows fixed paper and ink artwork boards in both OS
color preferences. Its shared shell does not yet respond to dark preference;
identical light/dark captures do not demonstrate A's pending dark-sheet theme.
