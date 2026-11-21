import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { brandOutputs, outputDirectory, artworkPalette } from './export-brand.mjs';

test('committed exports match local source artwork and declared PNG dimensions', async () => {
  const outputs = await brandOutputs();
  for (const [name, expected] of outputs) assert.deepEqual(await readFile(join(outputDirectory, name)), expected, `${name} needs regeneration`);
  const catalog = JSON.parse(await readFile(join(outputDirectory, 'catalog.json'), 'utf8'));
  for (const image of catalog.images) {
    const metadata = await sharp(join(outputDirectory, image.href.split('/').at(-1))).metadata();
    assert.equal(metadata.format, 'png');
    assert.equal(metadata.width, image.width);
    assert.equal(metadata.height, image.height);
  }
});

test('all SVGs are labeled, outlined and self-contained', async () => {
  for (const name of (await readdir(outputDirectory)).filter(name => name.endsWith('.svg'))) {
    const svg = await readFile(join(outputDirectory, name), 'utf8');
    assert.match(svg, /<title id="title">The Catch\.<\/title>/);
    assert.match(svg, /<path /);
    assert.doesNotMatch(svg, /<(?:text|script|image|foreignObject)\b|\b(?:href|src)=|@import|url\(/i);
  }
});

test('manifest purposes reference real icons and maskable content stays inside its safe circle', async () => {
  const manifest = JSON.parse(await readFile(join(outputDirectory, 'site.webmanifest'), 'utf8'));
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.id, '/');
  assert.deepEqual(manifest.icons.map(icon => icon.purpose), ['any', 'any', 'maskable']);
  for (const icon of manifest.icons) {
    const { width, height } = await sharp(join(outputDirectory, icon.src.split('/').at(-1))).metadata();
    assert.equal(icon.sizes, `${width}x${height}`);
  }
  const { data, info } = await sharp(join(outputDirectory, 'icon-maskable-512.png')).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let colored = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const offset = (y * info.width + x) * info.channels;
    if (data[offset] === 13 && data[offset + 1] === 13 && data[offset + 2] === 13) continue;
    colored++;
    assert.ok(Math.hypot(x + .5 - 256, y + .5 - 256) <= 204.8, `Artwork outside safe circle at ${x},${y}`);
  }
  assert.ok(colored > 40_000, 'The icon must contain artwork, not an empty black square');
});

test('ICO embeds both actual-size PNGs with correct directory offsets', async () => {
  const ico = await readFile(join(outputDirectory, 'favicon.ico'));
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 2);
  for (let i = 0; i < 2; i++) {
    const entry = 6 + i * 16;
    const size = [16, 32][i];
    assert.equal(ico[entry], size);
    assert.equal(ico[entry + 1], size);
    const length = ico.readUInt32LE(entry + 8), offset = ico.readUInt32LE(entry + 12);
    const png = ico.subarray(offset, offset + length);
    const metadata = await sharp(png).metadata();
    assert.equal(metadata.width, size);
    assert.equal(metadata.height, size);
    assert.deepEqual(png, await readFile(join(outputDirectory, `favicon-${size}.png`)));
  }
});

test('application brand primitive drift is rejected without owning theme aliases', () => {
  const sources = { sample: '<g data-brand-role="ink" fill="#0d0d0d"/><g data-brand-role="paper" fill="#f4efe6"/><g data-brand-role="highlight" fill="#f2d83b"/><g data-brand-role="alert" fill="#b13224"/>' };
  assert.throws(() => artworkPalette(sources, ':root { --brand-highlight: #ffff00; }'), /differs/);
  assert.equal(artworkPalette(sources, ':root { --paper: #202020; }').paper, '#f4efe6');
});
