import { catalogPage } from '../lib/catalog-page.mjs';
type Story = { href: string; title: string; summary: string; topic: string; keywords?: string };
const form = document.querySelector<HTMLFormElement>('#global-search')!;
const input = form.querySelector<HTMLInputElement>('input')!;
const results = document.querySelector<HTMLElement>('#search-results')!;
if (!document.querySelector('[data-home-catalog]')) {
  let catalog: Promise<Story[]> | null = null, generation = 0;
  input.setAttribute('aria-controls', 'search-results');
  const close = () => { generation++; results.hidden = true; };
  const search = async () => {
    const query = input.value.trim(), id = ++generation;
    if (!query) { results.hidden = true; return; }
    results.hidden = false;
    const message = results.querySelector<HTMLElement>('[data-search-message]')!;
    const matches = results.querySelector<HTMLElement>('[data-search-matches]')!;
    const all = results.querySelector<HTMLAnchorElement>('[data-all-results]')!;
    matches.replaceChildren();
    message.textContent = 'Searching stories…';
    all.href = `/?q=${encodeURIComponent(query)}`;
    try {
      catalog ??= fetch('/search-index.json').then(response => { if(!response.ok) throw new Error('Search unavailable'); return response.json(); }).catch(error => { catalog = null; throw error; });
      const stories = await catalog;
      if (id !== generation) return;
      const found = catalogPage(stories.map(story => ({...story, search:`${story.title} ${story.summary} ${story.topic} ${story.keywords ?? ''}`})), {query,pageSize:5});
      message.textContent = found.count ? `${found.count} ${found.count === 1 ? 'story' : 'stories'} found` : 'No matching stories. Try another search.';
      for (const story of found.items) {
        const li = document.createElement('li'), link = document.createElement('a'), topic = document.createElement('span'), title = document.createElement('strong');
        link.href = story.href; topic.textContent = story.topic; title.textContent = story.title;
        link.append(topic,title); li.append(link); matches.append(li);
      }
    } catch { if(id === generation) message.textContent = 'Search could not load. Try again, or browse all stories.'; }
  };
  input.addEventListener('input', search);
  input.addEventListener('focus', () => { if(input.value.trim()) search(); });
  input.addEventListener('keydown', e => { if(e.key === 'ArrowDown' && !results.hidden) { e.preventDefault(); results.querySelector<HTMLAnchorElement>('a')?.focus(); } });
  results.addEventListener('keydown', e => {
    const links=[...results.querySelectorAll<HTMLAnchorElement>('a')], index=links.indexOf(document.activeElement as HTMLAnchorElement);
    if(e.key === 'ArrowDown') { e.preventDefault(); links[Math.min(index + 1, links.length - 1)]?.focus(); }
    if(e.key === 'ArrowUp') { e.preventDefault(); index > 0 ? links[index - 1].focus() : input.focus(); }
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !results.hidden) { e.preventDefault(); input.focus({preventScroll:true}); close(); } });
  document.querySelector('.search-toggle')?.addEventListener('click', () => { if(document.querySelector('.search-toggle')?.getAttribute('aria-expanded') === 'true') close(); });
  document.addEventListener('click', e => { if(!form.contains(e.target as Node) && !results.contains(e.target as Node) && !(e.target as Element).closest('.search-toggle')) close(); });
  document.addEventListener('focusin', e => { if(!form.contains(e.target as Node) && !results.contains(e.target as Node)) close(); });
}
