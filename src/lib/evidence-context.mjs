export function sourceContext(text, quote, radius = 1000) {
  if (!text || !quote?.trim()) return null;
  const escaped = quote.trim().split(/\s+/).map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+');
  const match = new RegExp(escaped).exec(text);
  if (!match) return null;
  const start = Math.max(0, match.index - radius);
  const end = Math.min(text.length, match.index + match[0].length + radius);
  const precedingBreak = text.lastIndexOf('\n', start);
  const beforeStart = precedingBreak < 0 ? start : precedingBreak + 1;
  const nextBreak = text.indexOf('\n', end);
  const afterEnd = nextBreak < 0 ? text.length : nextBreak;
  return { before: text.slice(beforeStart, match.index), match: match[0], after: text.slice(match.index + match[0].length, afterEnd), start: match.index, trimmedBefore: beforeStart > 0, trimmedAfter: afterEnd < text.length };
}

// A merged citation can name separate passages, not one continuous quotation.
// Keep their context windows together where they overlap, and mark only the
// exact source ranges. Full-text segments reconstruct the saved bytes unchanged.
export function sourcePassages(text, quotes, full = false, radius = 1000) {
  const passages = [...new Set(quotes.filter(quote => quote?.trim()))];
  const groups = [];
  for (const quote of passages) {
    const previous = groups.at(-1);
    const joined = previous && sourceContext(text, `${previous.quote}\n\n${quote}`, radius);
    // Preserve contiguous authored spans before locating separate ones. A short
    // repeated fragment must not jump away from its disambiguating lead-in.
    if (joined) {
      previous.quote += `\n\n${quote}`;
      previous.context = joined;
    } else groups.push({ quote, context: sourceContext(text, quote, radius) });
  }
  const contexts = groups.map(group => group.context);
  const found = contexts.filter(Boolean);
  const merge = ranges => ranges.sort((a, b) => a.start - b.start).reduce((out, range) => {
    const last = out.at(-1);
    if (last && range.start <= last.end) last.end = Math.max(last.end, range.end);
    else out.push({ ...range });
    return out;
  }, []);
  const marks = merge(found.map(context => ({ start: context.start, end: context.start + context.match.length })));
  const windows = full && text ? [{ start: 0, end: text.length }] : merge(found.map(context => ({
    start: context.start - context.before.length,
    end: context.start + context.match.length + context.after.length,
  })));
  const segments = [];
  let cursor = 0;
  for (const window of windows) {
    if (window.start > cursor) segments.push({ text: cursor ? '\n…\n' : '…\n', marked: false });
    cursor = window.start;
    for (const mark of marks.filter(mark => mark.start >= window.start && mark.end <= window.end)) {
      if (mark.start > cursor) segments.push({ text: text.slice(cursor, mark.start), marked: false });
      segments.push({ text: text.slice(mark.start, mark.end), marked: true });
      cursor = mark.end;
    }
    if (cursor < window.end) segments.push({ text: text.slice(cursor, window.end), marked: false });
    cursor = window.end;
  }
  if (windows.length && cursor < text.length) segments.push({ text: '\n…', marked: false });
  return { segments, primary: contexts[0]?.match, found: found.length, missing: groups.filter(group => !group.context).map(group => group.quote) };
}
