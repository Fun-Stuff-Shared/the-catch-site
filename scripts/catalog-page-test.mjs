import test from 'node:test';
import assert from 'node:assert/strict';
import { catalogPage } from '../src/lib/catalog-page.mjs';
const stories = Array.from({length: 317}, (_, id) => ({id, topic: id % 2 ? 'Economy' : 'Health', search: `Story ${id} ${id % 3 ? 'monthly update' : 'benchmark revision'}`}));
test('hundreds of entries paginate without dropping or repeating entries', () => {
  const all = [];
  for (let page = 1; page <= 27; page++) all.push(...catalogPage(stories, {page}).items);
  assert.deepEqual(all, stories);
});
test('topic and all search terms apply together before pagination', () => {
  const result = catalogPage(stories, {topic:'Economy', query:'  REVISION benchmark '});
  assert.equal(result.count, 53);
  assert.ok(result.items.every(s => s.id % 2 === 1 && s.id % 3 === 0));
});
test('filter changes clamp the page and empty results retain one valid page', () => {
  const result = catalogPage(stories, {page:27, query:'story 316'});
  assert.equal(result.page, 1);
  assert.deepEqual(result.items.map(s => s.id), [316]);
  assert.deepEqual(catalogPage(stories, {page:27, query:'unpublished subject'}), {items:[], count:0, page:1, pages:1});
});
test('directory behavior supports more than two series and direct story links', () => {
  const series = Array.from({length:43}, (_, id) => ({id, topic:'Economy', search:`series ${id} latest payroll`, href:`/events/series-${id}/latest/`}));
  const result = catalogPage(series, {page:4, query:'payroll'});
  assert.equal(result.count,43);
  assert.equal(result.items.length,7);
  assert.equal(result.items[0].href,'/events/series-36/latest/');
});
