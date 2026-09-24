// Reads every <Cite> tag on a page source. A Cite is readable only when its attributes are the
// record id and the passage as literals: "...", {"..."}, or {`...`} with no interpolation (the
// backtick form is for a passage that itself contains double quotes). Any other form (a spread,
// an expression, single quotes, a space around the equals sign) is unreadable, and a lint that
// cannot read a Cite refuses it rather than treating it as absent.
const literal = String.raw`(?:"([^"]*)"|\{[ \t]*"([^"]*)"[ \t]*\}|\{[ \t]*` + "`((?:(?!\\$\\{)[^`])*)`" + String.raw`[ \t]*\})`;
const grammar = new RegExp(String.raw`^(?:\s+(s|passage)=${literal})+\s*/?$`);
const one = new RegExp(String.raw`\s+(s|passage)=${literal}`, "g");
// A tag ends at the first ">" outside a double-quoted or backtick run, so a passage may contain one.
export const citeTag = /<Cite\b((?:"[^"]*"|`[^`]*`|[^>"`])*)>/g;

export function readCites(source) {
  const out = [];
  for (const m of source.matchAll(citeTag)) {
    const attrs = m[1];
    const cite = { index: m.index, raw: m[0].slice(0, 80), s: null, passage: null, readable: grammar.test(attrs) };
    if (cite.readable) {
      for (const a of attrs.matchAll(one)) cite[a[1]] = a[2] ?? a[3] ?? a[4];
      if (cite.s === null) cite.readable = false;
    }
    out.push(cite);
  }
  return out;
}

export const lineOf = (source, index) => source.slice(0, index).split("\n").length;
