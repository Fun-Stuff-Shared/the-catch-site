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

// What the page renders. The frontmatter, HTML comments and {/* */} comments are blanked to
// spaces (newlines kept, so indexes and line numbers hold), and every element under a
// data-layer="proof" ancestor is reported as a range: the reading modes hide the whole subtree,
// so a Cite there is not on the story or fact view whatever its own element says.
const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
// An attribute is a quoted string, a template literal, or a brace expression that may itself hold
// strings, template literals and one level of braces (title={`${event.title} | The Catch`}).
const expr = String.raw`\{(?:[^{}"'` + "`" + String.raw`]|"[^"]*"|'[^']*'|` + "`[^`]*`" + String.raw`|\{[^{}]*\})*\}`;
const tagAt = new RegExp(String.raw`<(\/?)([A-Za-z][\w.:-]*)((?:"[^"]*"|` + "`[^`]*`" + String.raw`|'[^']*'|${expr}|[^>"'` + "`" + String.raw`{])*)>`, "y");
const token = /<!--|\{\/\*|<\/?[A-Za-z]/g;
export function renderedView(source) {
  let text = source;
  const blank = (a, b) => { text = text.slice(0, a) + text.slice(a, b).replace(/[^\n]/g, " ") + text.slice(b); };
  const fm = text.match(/^---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/);
  if (fm) blank(0, fm[0].length);
  const stack = [];
  const proofRanges = [];
  const close = (name, end) => {
    const at = stack.map((e) => e.name).lastIndexOf(name);
    if (at < 0) return;
    for (const e of stack.splice(at)) if (e.proof !== null) proofRanges.push([e.proof, end]);
  };
  token.lastIndex = fm ? fm[0].length : 0;
  for (let t; (t = token.exec(text));) {
    const at = t.index;
    if (t[0] === "<!--") { const e = text.indexOf("-->", at + 4); const stop = e < 0 ? text.length : e + 3; blank(at, stop); token.lastIndex = stop; continue; }
    if (t[0] === "{/*") { const e = text.indexOf("*/}", at + 3); const stop = e < 0 ? text.length : e + 3; blank(at, stop); token.lastIndex = stop; continue; }
    tagAt.lastIndex = at;
    const m = tagAt.exec(text);
    if (!m) { token.lastIndex = at + 1; continue; }
    const [tag, slash, name, attrs] = m;
    const end = at + tag.length;
    token.lastIndex = end;
    if (slash) { close(name, end); continue; }
    if (attrs.trimEnd().endsWith("/") || voidTags.has(name.toLowerCase())) continue;
    if (name === "script" || name === "style") {
      const e = text.indexOf(`</${name}`, end);
      token.lastIndex = e < 0 ? text.length : e;
      continue;
    }
    stack.push({ name, proof: /\sdata-layer=(?:"proof"|\{\s*"proof"\s*\})/.test(attrs) ? at : null });
  }
  for (const e of stack) if (e.proof !== null) proofRanges.push([e.proof, text.length]);
  return { text, proofRanges };
}
