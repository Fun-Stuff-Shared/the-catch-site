import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, sep } from 'node:path';
import { parse } from 'parse5';
import { headingCitations } from './design-rules.mjs';

function* files(path) {
  for (const item of readdirSync(path, { withFileTypes: true })) {
    const next = join(path, item.name);
    if (item.isDirectory()) yield* files(next);
    else if (item.name.endsWith('.html')) yield next;
  }
}
function* nodes(node) { yield node; for (const child of node.childNodes ?? []) yield* nodes(child); }
const attr = (node, name) => node.attrs?.find(attribute => attribute.name === name)?.value;
const enabled = process.env.CATCH_DESIGN_PREVIEW === '1';
for (const file of files('dist')) {
  assert.deepEqual(headingCitations(readFileSync(file, 'utf8')), [], `${file}: headings h1–h4 must not contain superscripts or citation links; cite the first factual sentence instead`);
}
assert.equal(existsSync('dist/design'), enabled, 'Design routes must only exist in an opt-in preview build');
for (const path of ['dist/index.html', 'dist/search-index.json']) {
  assert.ok(!readFileSync(path, 'utf8').includes('/design/'), `${path} must not publish fictional discovery links`);
}
if (enabled) {
  assert.ok(existsSync('dist/design/index.html'), 'Missing component gallery');
  assert.ok(existsSync('dist/design/coverage/index.html'), 'Missing fictional coverage');
  for (const file of files('dist/design')) {
    const html = readFileSync(file, 'utf8');
    assert.ok([...nodes(parse(html))].some(node => node.tagName === 'meta' && attr(node, 'name') === 'robots' && attr(node, 'content')?.split(/[\s,]+/).includes('noindex')), `${file} must be noindex`);
    // The identity kit previews real brand assets, not fictional reporting.
    if (['identity', 'story-treatments'].some(name => file.startsWith(join('dist/design', name) + sep))) {
      assert.match(html, /Design preview only/, `${file} must disclose the identity preview`);
    } else {
      assert.match(html, /Fictional|fictional|Synthetic/, `${file} must disclose fictional content`);
    }
  }
}
console.log(`design gate passed: ${enabled ? 'opt-in fixtures are noindex' : 'no design routes'}, published discovery excludes fixtures`);
