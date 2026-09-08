import { readingReturn } from '../lib/reading-return.mjs';
const from = readingReturn(new URLSearchParams(location.search).get('from'), location.origin);
if (from) {
  const back = document.querySelector<HTMLAnchorElement>('[data-return-reading]');
  if (back) { back.href = from; back.hidden = false; back.textContent = new URL(from, location.origin).pathname === '/' ? 'Return to the homepage' : 'Return to reading'; }
  document.querySelectorAll<HTMLAnchorElement>('main a[href^="/records/"]').forEach(link => {
    const url = new URL(link.href); url.searchParams.set('from', from); link.href = url.pathname + url.search;
  });
}
