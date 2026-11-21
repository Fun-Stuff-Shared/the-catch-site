import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
export const outputDirectory = resolve(root, 'public/assets/brand');
const sourceDirectory = resolve(root, 'brand/identity');
const variants = ['wordmark-on-paper', 'wordmark-on-ink', 'wordmark-stacked-on-paper', 'wordmark-stacked-on-ink', 'mark', 'mark-maskable'];

// The SVG artwork is the design source, not another set of application tokens.
// A owns the CSS theme contract; fail on drift once its brand primitives exist.
export function artworkPalette(sources, css) {
  const palette = {};
  for (const svg of Object.values(sources)) {
    for (const [, role, fill] of svg.matchAll(/data-brand-role="([a-z]+)" fill="(#[a-f0-9]{6})"/g)) {
      if (palette[role] && palette[role] !== fill) throw new Error(`Inconsistent artwork color: ${role}`);
      palette[role] = fill;
    }
  }
  for (const role of ['ink', 'paper', 'highlight', 'alert']) {
    if (!palette[role]) throw new Error(`Missing artwork role: ${role}`);
    const declared = css.match(new RegExp(`--brand-${role}\\s*:\\s*(#[a-f0-9]{6})\\b`, 'i'))?.[1].toLowerCase();
    if (declared && declared !== palette[role]) throw new Error(`Artwork ${role} differs from A's --brand-${role}`);
  }
  return palette;
}

export function icoFromPngs(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, i) => {
    const entry = 6 + i * 16;
    header[entry] = header[entry + 1] = size === 256 ? 0 : size;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map(({ png }) => png)]);
}

export async function brandOutputs() {
  const sources = Object.fromEntries(await Promise.all(variants.map(async name => [name, await readFile(resolve(sourceDirectory, `${name}.svg`), 'utf8')])));
  const palette = artworkPalette(sources, await readFile(resolve(root, 'public/assets/the-catch.css'), 'utf8'));
  const outputs = new Map(variants.map(name => [`${name}.svg`, Buffer.from(sources[name])]));
  const images = [];
  async function png(source, filename, width) {
    const data = await sharp(Buffer.from(sources[source]), { density: 288 }).resize({ width }).png({ compressionLevel: 9, palette: false }).toBuffer();
    const { height } = await sharp(data).metadata();
    outputs.set(filename, data);
    images.push({ href: `/assets/brand/${filename}`, width, height });
    return data;
  }
  for (const name of variants.filter(name => name.startsWith('wordmark'))) await png(name, `${name}.png`, name.includes('stacked') ? 780 : 1200);
  const favicon16 = await png('mark', 'favicon-16.png', 16);
  const favicon32 = await png('mark', 'favicon-32.png', 32);
  await png('mark', 'apple-touch-icon.png', 180);
  await png('mark', 'icon-192.png', 192);
  await png('mark', 'icon-512.png', 512);
  await png('mark-maskable', 'icon-maskable-512.png', 512);
  await png('mark', 'avatar-1000.png', 1000);
  outputs.set('favicon.svg', Buffer.from(sources.mark));
  outputs.set('favicon.ico', icoFromPngs([{ size: 16, png: favicon16 }, { size: 32, png: favicon32 }]));
  const manifest = {
    id: '/', name: 'The Catch', short_name: 'The Catch', lang: 'en',
    description: 'A permanent record of checked claims', start_url: '/', scope: '/', display: 'standalone',
    background_color: palette.ink, theme_color: palette.ink,
    icons: [
      { src: '/assets/brand/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/assets/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/assets/brand/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  outputs.set('site.webmanifest', Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));
  outputs.set('catalog.json', Buffer.from(`${JSON.stringify({ palette, images }, null, 2)}\n`));
  return outputs;
}

async function main() {
  const check = process.argv.includes('--check');
  if (process.argv.slice(2).some(arg => arg !== '--check')) throw new Error('Usage: node scripts/export-brand.mjs [--check]');
  const outputs = await brandOutputs();
  if (!check) await mkdir(outputDirectory, { recursive: true });
  for (const [name, data] of outputs) {
    const path = resolve(outputDirectory, name);
    if (check) {
      if (!(await readFile(path)).equals(data)) throw new Error(`${name} is stale; run npm run brand:export`);
    } else await writeFile(path, data);
  }
  console.log(`Brand assets ${check ? 'verified' : 'exported'}: ${outputs.size} local SVG, PNG, ICO and manifest files.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error.message); process.exitCode = 1; });
