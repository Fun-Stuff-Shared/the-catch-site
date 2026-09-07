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
