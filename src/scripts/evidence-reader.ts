import { sourceContext } from '../lib/evidence-context.mjs';
type Source = { title: string; byline: string; quote: string; saved: string | null; href: string; text?: string; excerpt?: boolean };
const panel = document.querySelector<HTMLDialogElement>('#evidence-reader')!;
const preview = document.querySelector<HTMLElement>('#evidence-preview')!;
const cache = new Map<string, Promise<Source>>();
let origin: HTMLAnchorElement | null = null, current: Source | null = null, request = 0, previewRequest = 0;
const status = panel.querySelector<HTMLElement>('.evidence-status')!;
const body = panel.querySelector<HTMLElement>('.evidence-text')!;
const purpose = panel.querySelector<HTMLElement>('.evidence-purpose')!;
const controls = panel.querySelector<HTMLElement>('.evidence-view-controls')!;
let returnScroll: number | null = null;
let restoringFocus = false;
let dismissedAnchor: HTMLAnchorElement | null = null;
const isMobile = () => matchMedia('(max-width: 760px)').matches;
async function fetchHTML(href: string) {
  const response = await fetch(href);
  if (!response.ok) throw new Error('Source unavailable');
  return new DOMParser().parseFromString(await response.text(), 'text/html');
}
function source(href: string): Promise<Source> {
  if (!cache.has(href)) cache.set(href, fetchHTML(href).then(doc => {
    const saved = doc.querySelector<HTMLAnchorElement>('a[href^="/records/pins/"]')?.getAttribute('href') ?? null;
    return { href, title: doc.querySelector('h1')?.textContent ?? 'Source', byline: doc.querySelector('.record-sub')?.textContent ?? '', quote: doc.querySelector('blockquote')?.textContent?.trim() ?? '', saved };
  }).catch(error => { cache.delete(href); throw error; }));
  return cache.get(href)!;
}
function hidePreview() { previewRequest++; if (preview.matches(':popover-open')) preview.hidePopover(); document.querySelectorAll('[aria-describedby="evidence-preview"]').forEach(el => el.removeAttribute('aria-describedby')); }
function recordHref(a: HTMLAnchorElement) { return a.dataset.recordHref ?? a.getAttribute('href')!; }
async function showPreview(a: HTMLAnchorElement) {
  if (isMobile() || panel.open || restoringFocus || a === dismissedAnchor) return;
  const id = ++previewRequest;
  try {
    const data = await source(recordHref(a));
    if (id !== previewRequest) return;
    preview.querySelector('.preview-title')!.textContent = data.title;
    const passage = a.dataset.passage ?? data.quote;
    preview.querySelector('.preview-copy')!.textContent = passage.length > 260 ? passage.slice(0, 257) + '…' : passage;
    a.setAttribute('aria-describedby', 'evidence-preview');
    preview.showPopover();
    const r = a.getBoundingClientRect();
    preview.style.left = `${Math.max(12, Math.min(r.left, innerWidth - preview.offsetWidth - 20))}px`;
    preview.style.top = `${Math.max(12, r.top >= preview.offsetHeight + 16 ? r.top - preview.offsetHeight - 10 : Math.min(r.bottom + 10, innerHeight - preview.offsetHeight - 12))}px`;
  } catch { hidePreview(); }
}
function render(full = false) {
  if (!current) return;
  body.replaceChildren();
  const context = sourceContext(current.text, current.quote);
  const mark = document.createElement('mark');
  controls.hidden = !current.text;
  panel.querySelector('[data-context-view]')!.setAttribute('aria-pressed', String(!full));
  panel.querySelector('[data-full-view]')!.setAttribute('aria-pressed', String(full));
  if (current.text && full) {
    if (context) {
      body.append(document.createTextNode(current.text.slice(0, context.start)));
      mark.textContent = context.match; body.append(mark, document.createTextNode(current.text.slice(context.start + context.match.length)));
    } else body.textContent = current.text;
    purpose.textContent = current.excerpt ? 'The saved copy contains an excerpt of the source.' : 'The complete text of the saved copy.';
  } else if (context) {
    body.append(document.createTextNode((context.trimmedBefore ? '…\n' : '') + context.before));
    mark.textContent = context.match;
    body.append(mark, document.createTextNode(context.after + (context.trimmedAfter ? '\n…' : '')));
    purpose.textContent = 'The recorded passage is marked below, with the surrounding text from the saved source.';
  } else {
    body.textContent = current.quote;
    purpose.textContent = current.text ? 'We could not locate this passage exactly in the saved text. Open the full saved text to inspect the document.' : 'Only the recorded passage is available here. Source details may provide another way to inspect the document.';
  }
  if (mark.isConnected) {
    const scroller = panel.querySelector<HTMLElement>('.evidence-scroll')!;
    scroller.scrollTop = Math.max(0, scroller.scrollTop + mark.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 80);
  }
}
async function openSource(a: HTMLAnchorElement) {
  hidePreview(); origin = a; current = null; const id = ++request;
  const href = recordHref(a);
  panel.querySelector('.evidence-scroll')!.scrollTop = 0;
  body.replaceChildren(); controls.hidden = true; purpose.textContent = '';
  panel.querySelector('#evidence-title')!.textContent = 'Opening source…';
  panel.querySelector('.evidence-byline')!.textContent = '';
  status.textContent = 'Loading the saved source.';
  const details = panel.querySelector<HTMLAnchorElement>('[data-source-page]')!;
  const saved = panel.querySelector<HTMLAnchorElement>('[data-saved-page]')!;
  details.href = href; saved.hidden = true;
  if (!panel.open) {
    const top = a.getBoundingClientRect().top;
    if (!isMobile()) returnScroll = scrollY;
    isMobile() ? panel.showModal() : panel.show();
    document.body.classList.add('evidence-open');
    if (returnScroll !== null) window.scrollBy(0, a.getBoundingClientRect().top - top);
  }
  panel.querySelector<HTMLButtonElement>('[data-close-evidence]')!.focus({preventScroll: true});
  try {
    const data = await source(href);
    if (id !== request) return;
    panel.querySelector('#evidence-title')!.textContent = data.title;
    panel.querySelector('.evidence-byline')!.textContent = data.byline;
    current = { ...data, quote: a.dataset.passage ?? data.quote };
    if (data.saved) {
      saved.href = data.saved; saved.hidden = false;
      try {
        const doc = await fetchHTML(data.saved);
        if (id !== request) return;
        current.text = doc.querySelector('pre')?.textContent ?? '';
        current.excerpt = doc.querySelector('.record-kicker')?.textContent?.includes('Saved passage') ?? false;
      } catch { if (id !== request) return; status.textContent = 'The saved document could not load. You can retry from this citation or open source details.'; }
    }
    if (current.text || !data.saved) status.textContent = '';
    render();
  } catch { if (id === request) { status.textContent = 'The source could not load. Close this panel and try the citation again, or open source details.'; panel.querySelector('#evidence-title')!.textContent = 'Source unavailable'; } }
}
function close() { dismissedAnchor = origin; request++; panel.close(); document.body.classList.remove('evidence-open'); panel.classList.remove('expanded'); panel.querySelector('[data-expand-evidence]')!.setAttribute('aria-pressed','false'); restoringFocus = true; origin?.focus({preventScroll:true}); restoringFocus = false; if(returnScroll !== null) { window.scrollTo(0, returnScroll); returnScroll = null; } }
panel.querySelector('[data-close-evidence]')!.addEventListener('click', close);
panel.addEventListener('cancel', e => { e.preventDefault(); close(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') { dismissedAnchor = document.activeElement instanceof HTMLAnchorElement ? document.activeElement : origin; hidePreview(); if(panel.open) { e.preventDefault(); close(); } } });
panel.addEventListener('click', e => { if (e.target === panel) { const r = panel.getBoundingClientRect(); if(e.clientX < r.left || e.clientY < r.top || e.clientX > r.right || e.clientY > r.bottom) close(); } });
panel.querySelector('[data-expand-evidence]')!.addEventListener('click', () => { const expanded=panel.classList.toggle('expanded');panel.querySelector('[data-expand-evidence]')!.setAttribute('aria-pressed', String(expanded)); });
panel.querySelector('[data-context-view]')!.addEventListener('click', () => render(false));
panel.querySelector('[data-full-view]')!.addEventListener('click', () => render(true));
const links = [...document.querySelectorAll<HTMLAnchorElement>('main a[data-record-href], main a[href^="/records/"]')].filter(a => a.dataset.recordHref || /^\/records\/[^/]+\/$/.test(a.getAttribute('href')!) && a.getAttribute('href') !== '/records/pins/');
links.forEach(a => {
  a.setAttribute('aria-haspopup', 'dialog'); a.setAttribute('aria-controls', 'evidence-reader');
  a.addEventListener('click', e => { if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); openSource(a); });
  a.addEventListener('mouseenter', () => showPreview(a));
  a.addEventListener('mouseleave', () => { if (dismissedAnchor === a) dismissedAnchor = null; setTimeout(() => { if(!preview.matches(':hover')) hidePreview(); }, 120); });
  a.addEventListener('focus', () => showPreview(a));
  a.addEventListener('blur', () => { if (dismissedAnchor === a) dismissedAnchor = null; hidePreview(); });
});
preview.addEventListener('mouseleave', hidePreview);
window.addEventListener('scroll', hidePreview, {passive:true});

matchMedia('(max-width: 760px)').addEventListener('change', () => {
  hidePreview();
  if (!panel.open) return;
  panel.close();
  isMobile() ? panel.showModal() : panel.show();
  panel.querySelector<HTMLButtonElement>('[data-close-evidence]')!.focus({preventScroll:true});
});
