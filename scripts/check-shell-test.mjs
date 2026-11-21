import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { parse } from 'parse5';
import { checkShell, shellInspector } from './check-shell.mjs';

const BUILD = 'a'.repeat(40);
const NAV = '<nav id="site-navigation"><a href="/">Latest</a><a href="/events/">Series</a><a href="/officials/">People</a><a href="/methodology/">Method</a></nav>';
const FRAME = '<link rel="stylesheet" href="/assets/reader.css">';
const SEARCH = '<form id="global-search"></form>';
const MARKER = `<meta name="catch-build" content="${BUILD}">`;
const page = (body = '') => `<!doctype html><html><head>${FRAME}${MARKER}</head><body>${NAV}${SEARCH}${body}</body></html>`;
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
function* nodes(node) { yield node; for(const child of node.childNodes ?? []) yield* nodes(child); }
function original(html) {
 const all = [...nodes(parse(html))], errors = [], file = 'page';
 if(all.some(n=>n.tagName==='meta' && attr(n,'http-equiv')?.toLowerCase()==='refresh')) return { errors, skipped:true };
 const nav=all.find(n=>attr(n,'id')==='site-navigation');
 const hrefs=nav ? [...nodes(nav)].filter(n=>n.tagName==='a').map(n=>attr(n,'href')) : [];
 if(JSON.stringify(hrefs)!==JSON.stringify(['/', '/events/', '/officials/', '/methodology/'])) errors.push(`${file}: inconsistent navigation`);
 if(!all.some(n=>n.tagName==='link' && attr(n,'href')==='/assets/reader.css')) errors.push(`${file}: missing shared frame`);
 if(all.filter(n=>attr(n,'id')==='global-search').length!==1) errors.push(`${file}: missing or duplicated global search`);
 const builds=all.filter(n=>n.tagName==='meta' && attr(n,'name')==='catch-build').map(n=>attr(n,'content'));
 if(builds.length!==1 || builds[0]!==BUILD) errors.push(`${file}: build id ${builds.join(', ') || 'missing'}, want ${BUILD}`);
 return { errors, skipped:false };
}
function inspect(html, chunkSize = 17) {
 const inspector = shellInspector();
 for(let i=0; i<html.length; i+=chunkSize) inspector.write(html.slice(i, i+chunkSize));
 return inspector.finish('page', BUILD);
}

test('shell assertions match the DOM gate across chunk boundaries', () => {
 for(const html of [page(), '', page().replace(NAV, ''), page().replace(SEARCH, ''), page().replace(FRAME, ''), page().replace(MARKER, ''),
  page().replace(SEARCH, SEARCH+SEARCH), page().replace(MARKER, MARKER+MARKER), page().replace(BUILD, 'b'.repeat(40)),
  page().replace('href="/events/"', 'href="/wrong/"'), page().replace(NAV, '<nav id="site-navigation"><a href="/">Only one</a></nav>'+NAV),
  page('<template><meta http-equiv="refresh"><nav id="site-navigation"></nav><form id="global-search"></form></template>'),
  page('<script>"<meta http-equiv=refresh>"</script><!-- <form id="global-search"> -->'),
  page('<p><b><i>Malformed</b> formatting</i><table><a href="/">Fostered</a><tr><td>Cell</td></tr></table>'),
  '<meta http-equiv="REFRESH">', page('<meta http-equiv="refresh">'),
 ]) for(const size of [1, 17, 65536]) assert.deepEqual(inspect(html, size), original(html), `chunk ${size}: ${html.slice(0,80)}`);
});

test('completed body subtrees and long text are not retained', () => {
 const inspector = shellInspector();
 inspector.write(page().replace('</body></html>', '<main>'));
 for(let i=0; i<512; i++) {
  inspector.write('<section><p>'+'x'.repeat(65536)+'</p></section>');
  assert.ok(inspector.retainedNodes() < 30);
 }
 inspector.write('</main></body></html>');
 assert.deepEqual(inspector.finish('page', BUILD), {errors:[],skipped:false});
});

test('directory checks handle empty output, missing files, and CLI failures', async t => {
 const root = mkdtempSync(join(tmpdir(), 'shell-test-'));
 t.after(() => rmSync(root, {recursive:true,force:true}));
 assert.deepEqual(await checkShell(root, BUILD), { errors:[],checked:0 });
 await assert.rejects(checkShell(join(root,'missing'), BUILD), /ENOENT/);
 writeFileSync(join(root,'index.html'), '<html><body>No frame</body></html>');
 const result = await checkShell(root, BUILD);
 assert.equal(result.errors.length,4);
 assert.equal(result.checked,1);
 mkdirSync(join(root,'dist'));
 writeFileSync(join(root,'dist/index.html'), '<html><body>No frame</body></html>');
 const child = spawnSync(process.execPath, [new URL('./check-shell.mjs', import.meta.url).pathname], {cwd:root,env:{...process.env,WORKERS_CI_COMMIT_SHA:BUILD},encoding:'utf8'});
 assert.equal(child.status,1);
 for(const error of ['inconsistent navigation','missing shared frame','missing or duplicated global search','build id missing']) assert.ok(child.stderr.includes(error), child.stderr);
});
