export function quotedSegments(value, quotes = []) {
  const text = String(value ?? '');
  const needles = [...new Set(quotes.filter(Boolean).map((quote) => `“${String(quote).replace(/\s+/g, ' ').trim()}”`))];
  const segments = [];
  let offset = 0;
  while (offset < text.length) {
    const next = needles.map((needle) => ({ needle, at: text.indexOf(needle, offset) })).filter(({ at }) => at >= 0).sort((a, b) => a.at - b.at || b.needle.length - a.needle.length)[0];
    if (!next) { segments.push({ text: text.slice(offset), source: false }); break; }
    if (next.at > offset) segments.push({ text: text.slice(offset, next.at), source: false });
    segments.push({ text: next.needle, source: true });
    offset = next.at + next.needle.length;
  }
  return segments;
}
