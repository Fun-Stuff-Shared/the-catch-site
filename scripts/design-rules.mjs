import { parseFragment } from 'parse5';
function* nodes(node) { yield node; for (const child of node.childNodes ?? []) yield* nodes(child); }
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;

export function headingCitations(html) {
  const failures = [];
  for (const [heading] of html.matchAll(/<h([1-4])\b[^>]*>[\s\S]*?<\/h\1>/gi)) {
    if (!/<sup\b|<a\b/i.test(heading)) continue;
    const cited = [...nodes(parseFragment(heading))].some(node => node.tagName === 'sup' ||
      (node.tagName === 'a' && (attr(node, 'href')?.startsWith('#src-') || attr(node, 'data-record-href') !== undefined || attr(node, 'data-claim') !== undefined)));
    if (cited) failures.push(heading);
  }
  return failures;
}
