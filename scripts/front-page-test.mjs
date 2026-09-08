import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { frontPage } from '../src/lib/front-page.mjs';
import { payrollChanges } from '../src/data/jobs202607.mjs';
test('front page separates ongoing coverage without losing remaining stories', () => {
  const items = [
    {href:'/jobs/july',series:'/jobs',topic:'Economy'},
    {href:'/rates/july',series:'/rates',topic:'Economy'},
    {href:'/rates/june',series:'/rates',topic:'Economy'},
    {href:'/health',topic:'Health'},
  ];
  const result=frontPage(items);
  assert.deepEqual(result.featured.map(x=>x.href),['/jobs/july','/rates/july','/health']);
  assert.deepEqual(result.remaining,[items[2]]);
  assert.equal(frontPage(items.slice(1,3)).featured.length,1);
  assert.deepEqual(frontPage([]),{featured:[],remaining:[]});
});
test('charted monthly changes agree with the saved source totals', () => {
  const rows=readFileSync('data/sources/PAYEMS.csv','utf8').trim().split('\n').slice(1).map(row=>row.split(','));
  for(const point of payrollChanges) {
    const index=rows.findIndex(([date])=>date.startsWith(point.month));
    assert.ok(index>0);
    assert.equal(Number(rows[index][1])-Number(rows[index-1][1]),point.change,point.month);
  }
});

import { readingReturn } from '../src/lib/reading-return.mjs';
test('reading returns preserve the section and reject external or source-page detours', () => {
  const origin='http://localhost:4322';
  assert.equal(readingReturn('/events/jobs/july-2026/?mode=facts#payroll-chart',origin),'/events/jobs/july-2026/?mode=facts#payroll-chart');
  for(const invalid of ['//example.com','/\\example.com','https://example.com','/records/one/',null]) assert.equal(readingReturn(invalid,origin),null);
});
