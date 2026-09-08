import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
function* nodes(node) { yield node; for(const child of node.childNodes ?? []) yield* nodes(child); }
function* files(path) { for(const item of readdirSync(path,{withFileTypes:true})) { const next=join(path,item.name); if(item.isDirectory()) yield* files(next); else if(item.name.endsWith('.html')) yield next; } }
const expected = ['/', '/events/', '/officials/', '/methodology/'];
const errors=[]; let checked=0;
for(const file of files('dist')) {
 const all=[...nodes(parse(readFileSync(file,'utf8')))];
 if(all.some(n=>n.tagName==='meta' && attr(n,'http-equiv')?.toLowerCase()==='refresh')) continue;
 const nav=all.find(n=>attr(n,'id')==='site-navigation');
 const hrefs=nav ? [...nodes(nav)].filter(n=>n.tagName==='a').map(n=>attr(n,'href')) : [];
 if(JSON.stringify(hrefs)!==JSON.stringify(expected)) errors.push(`${file}: inconsistent navigation`);
 if(!all.some(n=>n.tagName==='link' && attr(n,'href')==='/assets/reader.css')) errors.push(`${file}: missing shared frame`);
 if(all.filter(n=>attr(n,'id')==='global-search').length!==1) errors.push(`${file}: missing or duplicated global search`);
 checked++;
}
if(errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`shell gate passed: ${checked} pages share navigation, search, and frame`);
