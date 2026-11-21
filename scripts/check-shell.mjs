import { createReadStream, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { defaultTreeAdapter, Parser } from 'parse5';
import { buildId } from '../src/lib/build-id.mjs';
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
function* nodes(node) { yield node; for(const child of node.childNodes ?? []) yield* nodes(child); }
function* files(path) { for(const item of readdirSync(path,{withFileTypes:true})) { const next=join(path,item.name); if(item.isDirectory()) yield* files(next); else if(item.name.endsWith('.html')) yield next; } }
const expected = ['/', '/events/', '/officials/', '/methodology/'];

export function shellInspector() {
 const parser = new Parser({ treeAdapter: {
  ...defaultTreeAdapter,
  insertText() {},
  insertTextBefore() {},
  createCommentNode() { return null; },
  appendChild(parent, node) { if(node) defaultTreeAdapter.appendChild(parent, node); },
  insertBefore(parent, node, before) { if(node) defaultTreeAdapter.insertBefore(parent, node, before); },
 } });
 const tokenizer = parser.tokenizer;
 const appendCharacter = tokenizer._appendCharToCurrentCharacterToken;
 tokenizer._appendCharToCurrentCharacterToken = function(type, ch) {
  appendCharacter.call(this, type, ch);
  if(this.currentCharacterToken?.chars.length >= 4096) {
   this._emitCurrentCharacterToken(null);
   this.preprocessor.dropParsedChunk();
  }
 };
 let retained = 0;
 function prune() {
  const keep = new Set();
  const retain = node => { for(; node && !keep.has(node); node=node.parentNode) keep.add(node); };
  retain(parser.document);
  retain(parser.headElement);
  retain(parser.formElement);
  for(const node of parser.openElements.items.slice(0, parser.openElements.stackTop + 1)) retain(node);
  for(const entry of parser.activeFormattingElements.entries) retain(entry.element);
  retain(parser.activeFormattingElements.bookmark?.element);
  const all = [], pending = [parser.document];
  while(pending.length) {
   const node = pending.pop();
   all.push(node);
   pending.push(...(node.childNodes ?? []));
   if(node.content) pending.push(node.content);
   const id = attr(node, 'id');
   if(id === 'site-navigation' || id === 'global-search' ||
    (node.tagName === 'link' && attr(node, 'href') === '/assets/reader.css') ||
    (node.tagName === 'meta' && (attr(node, 'name') === 'catch-build' || attr(node, 'http-equiv')?.toLowerCase() === 'refresh'))) retain(node);
   if(node.tagName === 'a') {
    for(let parent=node; parent; parent=parent.parentNode) {
     if(attr(parent, 'id') === 'site-navigation') { retain(node); break; }
    }
   }
  }
  // Keep the parser's live tree-construction state and shell markers, not completed body subtrees.
  for(const node of all) {
   if(node.childNodes) node.childNodes = node.childNodes.filter(child => keep.has(child));
  }
  retained = keep.size;
 }
 return {
  write(chunk) { tokenizer.write(chunk, false); prune(); },
  retainedNodes() { return retained; },
  finish(file, build) {
   tokenizer.write('', true);
   const all=[...nodes(parser.document)];
   const errors=[];
   if(all.some(n=>n.tagName==='meta' && attr(n,'http-equiv')?.toLowerCase()==='refresh')) return { errors, skipped: true };
 const nav=all.find(n=>attr(n,'id')==='site-navigation');
 const hrefs=nav ? [...nodes(nav)].filter(n=>n.tagName==='a').map(n=>attr(n,'href')) : [];
 if(JSON.stringify(hrefs)!==JSON.stringify(expected)) errors.push(`${file}: inconsistent navigation`);
 if(!all.some(n=>n.tagName==='link' && attr(n,'href')==='/assets/reader.css')) errors.push(`${file}: missing shared frame`);
 if(all.filter(n=>attr(n,'id')==='global-search').length!==1) errors.push(`${file}: missing or duplicated global search`);
 const builds=all.filter(n=>n.tagName==='meta' && attr(n,'name')==='catch-build').map(n=>attr(n,'content'));
 if(builds.length!==1 || builds[0]!==build) errors.push(`${file}: build id ${builds.join(', ') || 'missing'}, want ${build}`);
   return { errors, skipped: false };
  },
 };
}

export async function checkShell(root = 'dist', build = buildId()) {
 const errors=[]; let checked=0;
 for(const file of files(root)) {
  const inspector = shellInspector();
  for await(const chunk of createReadStream(file, { encoding: 'utf8', highWaterMark: 65536 })) inspector.write(chunk);
  const result = inspector.finish(file, build);
  errors.push(...result.errors);
  if(!result.skipped) checked++;
 }
 return { errors, checked };
}

if(process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
 const build = buildId();
 const { errors, checked } = await checkShell('dist', build);
 if(errors.length) { console.error(errors.join('\n')); process.exitCode=1; }
 else console.log(`shell gate passed: ${checked} pages share navigation, search, frame and build ${build.slice(0, 9)}`);
}
