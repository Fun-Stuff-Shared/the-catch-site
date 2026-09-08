import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sourceContext } from '../src/lib/evidence-context.mjs';

test('preserves source bytes while locating line-wrapped quotations', () => {
  const text = 'Before.\nThe rate was 4.1\n percent (July).\nAfter.';
  const result = sourceContext(text, 'The rate was 4.1 percent (July).');
  assert.equal(result.match, 'The rate was 4.1\n percent (July).');
  assert.equal(result.before + result.match + result.after, text);
  assert.equal(text.slice(result.start, result.start + result.match.length), result.match);
});
test('refuses empty, missing, and merely similar quotations', () => {
  assert.equal(sourceContext('The rate was 4.1 percent.', 'The rate was 4.2 percent.'), null);
  assert.equal(sourceContext('anything', '  '), null);
  assert.equal(sourceContext(null, 'anything'), null);
  assert.equal(sourceContext('Price: $3x50', '$3.50'), null);
});
test('all authored passage anchors occur exactly in their saved source', () => {
  const page = readFileSync(new URL('../src/pages/events/jobs/july-2026.astro', import.meta.url), 'utf8');
  const text = readFileSync(new URL('../data/sources/bls-empsit-2026-07.txt', import.meta.url), 'utf8');
  const anchors = [...page.matchAll(/<Cite s="bls-empsit-2026-07" passage="([^"]+)"/g)];
  assert.ok(anchors.length >= 3);
  for (const [,quote] of anchors) assert.ok(sourceContext(text, quote), quote);
});
test('bounded context keeps preceding and following source text', () => {
  const text = Array.from({length: 100}, (_,i) => `Paragraph ${i}.`).join('\n');
  const result = sourceContext(text, 'Paragraph 50.', 40);
  assert.ok(result.trimmedBefore && result.trimmedAfter);
  assert.ok(result.before.includes('Paragraph 49.'));
  assert.ok(result.after.includes('Paragraph 51.'));
});
test('a long single-line paragraph retains context before the match', () => {
  const text = 'Before '.repeat(200) + 'Cited passage.' + ' After'.repeat(200);
  const result = sourceContext(text, 'Cited passage.', 100);
  assert.ok(result.before.length >= 100);
  assert.ok(result.trimmedBefore);
  assert.equal(result.match, 'Cited passage.');
});
