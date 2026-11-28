import test from 'node:test';
import assert from 'node:assert/strict';
import { headingCitations } from './design-rules.mjs';
import { storyDate, storyISO } from '../src/lib/story-date.mjs';

test('heading gate rejects superscripts and citation links, including nested markers', () => {
  for (const level of [1, 2, 3, 4]) {
    for (const citation of ['<sup>7</sup>', '<span><sup class="src-ref"><a href="#src-7">7</a></sup></span>', '<a href="#src-17">17</a>', '<a data-record-href="/records/source/" href="/records/source/">7</a>']) {
      assert.equal(headingCitations(`<h${level}>Heading${citation}</h${level}>`).length, 1);
    }
  }
});
test('ordinary heading links and body citations remain valid', () => {
  assert.deepEqual(headingCitations('<h2><a href="#timeline">Timeline</a></h2><p>Fact.<sup><a href="#src-7">7</a></sup></p>'), []);
});
test('publication and update dates share the same calendar format', () => {
  assert.equal(storyDate('2026-11-20'), 'Nov. 20, 2026');
  assert.equal(storyDate('2026-11-21'), 'Nov. 21, 2026');
  assert.equal(storyDate('2026-01-01'), 'Jan. 1, 2026');
  assert.equal(storyDate('October 8, 2026'), 'Oct. 8, 2026');
  assert.equal(storyISO('November 20, 2026'), storyISO('2026-11-20'));
  assert.throws(() => storyDate('2026-02-31'), /Invalid story date/);
});
