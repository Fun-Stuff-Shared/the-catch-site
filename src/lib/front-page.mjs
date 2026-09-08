export function frontPage(items, count = 3) {
  const groups = new Set();
  const featured = [];
  for (const item of items) {
    const key = item.series || item.topic || item.href;
    if (groups.has(key)) continue;
    groups.add(key);
    featured.push(item);
    if (featured.length === count) break;
  }
  return { featured, remaining: items.filter(item => !featured.includes(item)) };
}
