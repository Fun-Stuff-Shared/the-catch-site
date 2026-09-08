export function catalogPage(items, { query = '', topic = '', page = 1, pageSize = 12 } = {}) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const matched = items.filter(item => (!topic || item.topic === topic) && terms.every(term => item.search.toLocaleLowerCase().includes(term)));
  const pages = Math.max(1, Math.ceil(matched.length / pageSize));
  const current = Math.max(1, Math.min(page, pages));
  return { items: matched.slice((current - 1) * pageSize, current * pageSize), count: matched.length, page: current, pages };
}
