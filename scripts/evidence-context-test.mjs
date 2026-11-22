import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sourceContext, sourcePassages } from '../src/lib/evidence-context.mjs';

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
  const page = readFileSync(new URL('../src/pages/events/jobs/2026-08-07-july-payrolls-fall-23000.astro', import.meta.url), 'utf8');
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

test('merged Iowa citations locate both separate passages without inventing intervening text', () => {
  const ledger = JSON.parse(readFileSync(new URL('../checks/claims/iowa-army-detonation--2026-11-20-army-detonates-lead-azide-in-iowa.json', import.meta.url), 'utf8'));
  const quotes = ledger.claims.find(claim => claim.id === 'telle-immediately').evidence.map(evidence => evidence.passage);
  const text = readFileSync(new URL('../data/sources/iowa-army-detonation/army-postponement-2026-11-19.txt', import.meta.url), 'utf8');
  assert.equal(quotes.length, 2);
  assert.equal(sourceContext(text, quotes.join('\n\n')), null);
  for (const full of [false, true]) {
    const result = sourcePassages(text, quotes, full);
    assert.deepEqual(result.missing, []);
    assert.equal(result.found, 2);
    assert.deepEqual(result.segments.filter(segment => segment.marked).map(segment => segment.text), [...quotes].sort((a, b) => text.indexOf(a) - text.indexOf(b)));
    assert.equal(result.primary, quotes[0]);
    if (full) assert.equal(result.segments.map(segment => segment.text).join(''), text);
  }
});

test('overlapping passage contexts do not duplicate source text or highlights', () => {
  const text = 'Before. The cited passage is here. After.';
  const result = sourcePassages(text, ['The cited passage', 'cited passage', 'The cited passage']);
  assert.equal(result.segments.map(segment => segment.text).join(''), text);
  assert.deepEqual(result.segments.filter(segment => segment.marked), [{ text: 'The cited passage', marked: true }]);
});

test('single and absent passages preserve the existing context and full-text behavior', () => {
  const text = 'Before. The rate was 4.1\n percent. After.';
  const context = sourceContext(text, 'The rate was 4.1 percent.');
  const result = sourcePassages(text, ['The rate was 4.1 percent.']);
  assert.equal(result.segments.map(segment => segment.text).join(''), context.before + context.match + context.after);
  assert.deepEqual(result.segments.filter(segment => segment.marked), [{ text: context.match, marked: true }]);
  assert.deepEqual(sourcePassages(text, ['Not here.']).segments, []);
  assert.deepEqual(sourcePassages(text, ['Not here.'], true).segments, [{ text, marked: false }]);
});

test('distant passages get bounded context in source order while missing quotes stay explicit', () => {
  const text = Array.from({ length: 100 }, (_, i) => `Paragraph ${i}.`).join('\n');
  const result = sourcePassages(text, ['Paragraph 80.', 'Paragraph 20.', 'Not in the record.'], false, 20);
  assert.deepEqual(result.missing, ['Not in the record.']);
  assert.deepEqual(result.segments.filter(segment => segment.marked).map(segment => segment.text), ['Paragraph 20.', 'Paragraph 80.']);
  const excerpt = result.segments.map(segment => segment.text).join('');
  assert.ok(excerpt.includes('Paragraph 19.') && excerpt.includes('Paragraph 81.'));
  assert.ok(!excerpt.includes('Paragraph 50.'));
  assert.ok(excerpt.startsWith('…\n') && excerpt.endsWith('\n…'));
  assert.deepEqual(sourcePassages(null, ['Missing.']).missing, ['Missing.']);
});
