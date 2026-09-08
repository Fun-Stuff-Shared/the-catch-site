import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'parse5';

function* files(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else if (path.endsWith('.html')) yield path;
  }
}

function* nodes(node) {
  yield node;
  for (const child of node.childNodes ?? []) yield* nodes(child);
}

const attr = (node, key) => node.attrs?.find(attribute => attribute.name === key)?.value;
const root = join(process.cwd(), 'dist');
const pages = new Map();
for (const file of files(root)) {
  const elements = [...nodes(parse(readFileSync(file, 'utf8')))];
  pages.set(file, {
    elements,
    ids: new Set(elements.map(node => attr(node, 'id')).filter(Boolean)),
    path: '/' + relative(root, file).replace(/index.html$/, ''),
  });
}

const missing = [], fragments = [], duplicates = [], metadata = [];
let links = 0;
for (const page of pages.values()) {
  const ids = page.elements.map(node => attr(node, 'id')).filter(Boolean);
  if (ids.length !== new Set(ids).size) duplicates.push(page.path);
  metadata.push({
    path: page.path,
    description: page.elements.some(node => node.tagName === 'meta' && attr(node, 'name') === 'description'),
    canonical: page.elements.some(node => node.tagName === 'link' && attr(node, 'rel') === 'canonical'),
    og: page.elements.some(node => attr(node, 'property') === 'og:title'),
    schema: page.elements.some(node => attr(node, 'type') === 'application/ld+json'),
    noindex: page.elements.some(node => attr(node, 'name') === 'robots' && attr(node, 'content')?.includes('noindex')),
  });
  for (const node of page.elements.filter(node => node.tagName === 'a')) {
    const href = attr(node, 'href');
    if (!href) continue;
    const url = new URL(href, 'http://localhost' + page.path);
    if (url.origin !== 'http://localhost') continue;
    links++;
    let destination = root + decodeURIComponent(url.pathname);
    if (existsSync(destination) && statSync(destination).isDirectory()) destination = join(destination, 'index.html');
    else if (!existsSync(destination) && existsSync(destination + '/index.html')) destination += '/index.html';
    if (!existsSync(destination)) {
      missing.push({ from: page.path, to: href });
      continue;
    }
    if (url.hash && pages.has(destination) && !pages.get(destination).ids.has(decodeURIComponent(url.hash.slice(1)))) {
      fragments.push({ from: page.path, to: href });
    }
  }
}

console.log(JSON.stringify({
  pages: pages.size,
  links,
  missing,
  fragments,
  duplicates,
  metadata: Object.fromEntries(['description', 'canonical', 'og', 'schema', 'noindex'].map(key => [key, metadata.filter(page => page[key]).length])),
  core: metadata.filter(page => page.path === '/' || page.path.startsWith('/events/') || page.path.startsWith('/officials/') || page.path === '/methodology/'),
}, null, 2));
