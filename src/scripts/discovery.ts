import { frontPage } from '../lib/front-page.mjs';
import { catalogPage } from '../lib/catalog-page.mjs';
const isSeries = !!document.querySelector('[data-catalog=series]');
const isHome = !!document.querySelector('[data-home-catalog]');
const input = document.querySelector<HTMLInputElement>(isSeries ? '#series-query' : '#story-query');
const items = [...document.querySelectorAll<HTMLElement>('[data-story-item]')];
const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-topic-filter]')];
if (input && (isHome || isSeries)) {
  let topic = '', page = 1;

  const catalog = items.map(element => ({ element, topic: element.dataset.topic ?? '', search: element.dataset.search ?? '', date: element.dataset.date ?? '', series: element.dataset.series ?? '' }));
  if(isHome) catalog.sort((a,b) => b.date.localeCompare(a.date) || items.indexOf(a.element)-items.indexOf(b.element));
  const pageSize = 12;
  const params = new URLSearchParams(location.search);
  input.value = params.get('q') ?? '';
  topic = params.get('topic') ?? '';
  if (!filters.some(f => f.dataset.topicFilter === topic)) topic = '';
  const render = () => {
    const terms = input.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    const result = catalogPage(catalog, { query: input.value, topic, page, pageSize });
    const { pages, count } = result;
    page = result.page;
    items.forEach(el => { el.hidden = true; el.classList.remove('story-link-lead'); });
    result.items.forEach(({ element: el }, i) => { el.hidden = false; el.classList.toggle('story-link-lead', !isSeries && i === 0 && !topic && !terms.length && page === 1); });
    if (isHome) {
      const featured = document.querySelector<HTMLElement>('[data-featured-stories]')!;
      const archive = document.querySelector<HTMLElement>('[data-archive-stories]')!;
      const front = document.querySelector<HTMLElement>('.front-stories')!;
      const isFrontPage = !topic && !terms.length && page === 1;
      front.hidden = !isFrontPage || !count;
      const selected = isFrontPage ? frontPage(result.items).featured : [];
      result.items.forEach(item => {
        const inFront = selected.includes(item);
        item.element.classList.toggle('story-link-lead', selected[0] === item);
        item.element.querySelectorAll<HTMLElement>('[data-related-stories], [data-story-visual]').forEach(el => el.hidden = !inFront);
        (inFront ? featured : archive).append(item.element);
      });
      document.querySelector('#archive-heading')!.textContent = isFrontPage ? 'More reporting' : topic || (terms.length ? 'Search results' : 'More reporting');
      document.querySelector('[data-result-count]')!.textContent = `${isFrontPage ? count - selected.length : count} ${count - (isFrontPage ? selected.length : 0) === 1 ? 'story' : 'stories'}`;
      document.querySelector<HTMLElement>('.reporting-archive')!.hidden = isFrontPage && count === selected.length;
    }
    filters.forEach(f => f.setAttribute('aria-pressed', String(f.dataset.topicFilter === topic)));
    document.querySelector<HTMLElement>('.search-empty')!.hidden = count !== 0;
    document.querySelector<HTMLElement>('.feed-pagination')!.hidden = pages <= 1;
    document.querySelector('[data-page-label]')!.textContent = `Page ${page} of ${pages}`;
    (document.querySelector('[data-prev-page]') as HTMLButtonElement).disabled = page === 1;
    (document.querySelector('[data-next-page]') as HTMLButtonElement).disabled = page === pages;
    document.querySelector('#search-status')!.textContent = terms.length || topic ? `${count} ${isSeries ? 'series' : count === 1 ? 'story' : 'stories'} found` : '';
    const url = new URL(location.href);
    input.value.trim() ? url.searchParams.set('q', input.value.trim()) : url.searchParams.delete('q');
    topic ? url.searchParams.set('topic', topic) : url.searchParams.delete('topic');
    history.replaceState(null, '', url);
  };
  input.addEventListener('input', () => { page = 1; render(); });
  input.form?.addEventListener('submit', e => { e.preventDefault(); page = 1; render(); });
  filters.forEach(f => f.addEventListener('click', () => { topic = f.dataset.topicFilter!; page = 1; render(); }));
  document.querySelector('[data-clear-search]')?.addEventListener('click', () => { input.value = ''; topic = ''; page = 1; render(); if(isHome) document.querySelector('.search-toggle')?.setAttribute('aria-expanded', 'true'); input.focus(); });
  document.querySelector('[data-prev-page]')?.addEventListener('click', () => { page--; render(); document.querySelector('#archive-heading, .browse-toolbar')?.scrollIntoView({block:'start'}); });
  document.querySelector('[data-next-page]')?.addEventListener('click', () => { page++; render(); document.querySelector('#archive-heading, .browse-toolbar')?.scrollIntoView({block:'start'}); });
  render();
}
