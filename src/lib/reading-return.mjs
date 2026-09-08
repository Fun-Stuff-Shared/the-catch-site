export function readingReturn(value, origin) {
  if (!value?.startsWith('/') || value.startsWith('//')) return null;
  const url = new URL(value, origin);
  if (url.origin !== origin || !/^\/(?:$|events\/|officials\/|design\/|records\/$)/.test(url.pathname)) return null;
  return url.pathname + url.search + url.hash;
}
