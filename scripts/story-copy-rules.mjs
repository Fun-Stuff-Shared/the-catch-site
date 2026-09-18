// What a story page may not say to a reader. Each pattern is one the site owner
// rejected on sight (design/language-analysis-2026-09-17.md, W3, W5, W6): the site
// talking about what it holds instead of what the record says, and tariff-schedule or
// statute paragraph codes in prose. Fixtures: scripts/story-copy-rules-test.mjs.
import { storyCopy, quoteCards } from "./check-state-pages.mjs";

const CURRENCY = "(?:[$€£¥₹]|\\b(?:USD|EUR|CAD|GBP|AUD|JPY|CNY|MXN|CHF|INR|usd|eur|cad|gbp|aud|jpy|cny|mxn|chf|inr))";
export const SCHEDULE_CODE = new RegExp(
  `(?<![$€£¥₹\\d,])(?<!${CURRENCY}\\s*)\\b99\\d{2}\\.\\d{2}(?:\\.\\d{2})?\\b|\\(\\d{1,2}\\)\\s?\\([A-Za-z]{1,3}\\)(?:\\s?\\([ivx]{1,4}\\))?`,
);

// Only phrases with no reading except the site describing its own files. Ordinary
// actors saving, pinning or capturing things in the world are not matched; whether a
// sentence is still custody talk in the site's voice is the author's judgment
// (WRITING.md), not this list's.
const COPY = "(?:copy|copies|post|page|pages|record|records|series|docket|list|table)";
const HELD = "(?:copy|copies|page|pages|record|records|file|files|table|tables|docket|dockets|contract|contracts|statute|statutes|sources|source)";
export const CUSTODY_TALK = [
  new RegExp(`\\b(?:the|a|an|our|its|this|these|those) saved ${COPY}\\b`, "i"),
  /\b(?:the|our|its|these|those) captured cop(?:y|ies)\b/i, /\bcaptured cop(?:y|ies) (?:is|are) kept\b/i,
  /\b(?:copy|copies|page|pages) (?:was|were|is|are|has been|have been) saved\b/i,
  new RegExp(`\\b${HELD} could not be (?:fetched|captured)\\b`, "i"), /\bcop(?:y|ies) could not be (?:saved|retrieved)\b/i,
  /\bwe (?:have|had) (?:not|never) (?:saved|pinned|captured|fetched|retrieved)\b/i,
  /\bwe (?:did not|didn't|could not|couldn't|cannot|can't|do not|don't) (?:save|pin|capture|fetch|retrieve|hold|find)\b/i,
  /\bwe (?:hold|held) (?:no|only)\b/i,
  new RegExp(`\\bwe (?:hold|held|saved) (?:the|a|an|its|their|this|these|those) ${HELD}\\b`, "i"),
  /\b(?:tracker|series|table|docket|page|post|release|copy|copies) we (?:also )?saved\b/i,
  /\bwe work from\b/i, /\bsaved here\b/i,
  new RegExp(`\\b${HELD} (?:that |which )?we (?:hold|saved|have(?=[.,;:)]|\\s*$))\\b`, "i"),
  /\b(?:in|on|among) our (?:records|files|copies)\b/i,
  /\b(?:this|the|any) (?:page|site|story) (?:does not|doesn't|do not|don't) hold\b(?! up\b)/i,
  /\brecords (?:do not|don't|does not) hold\b(?! up\b)/i,
  new RegExp(`\\b${HELD} (?:this|the) (?:page|site|story) holds\\b`, "i"),
  new RegExp(`\\b(?:this|the) (?:page|site|story) holds (?:no |only |a |an |the |any )?${HELD}\\b`, "i"),
  /\bnot on this page\b/i,
  /\bsaved for this page\b/i, /\bserved to (?:us|this page|this machine)\b/i, /\b(?:returns?|returned|served|blocked|refused|opened|fetched)\b[^.]*\bthis machine\b/i,
  new RegExp(`\\bcould not be (?:saved|fetched|captured|retrieved) (?:from|at|through|by)\\b[^.]*?\\b(?:route|routes|address|addresses|url|urls)\\b`, "i"),
  /\bcould not be fetched\b/i,
  /\barchive copy\b/i, /\bcapture route\b/i, /\bcapture was blocked\b/i, /\bwe could not retrieve\b/i,
  /\bassisted (?:web reader|screen capture)\b/i,
  /\bstate record has not yet read\b/i, /\bthis page does not yet list\b/i, /\bno changes are recorded in this view\b/i,
];

const ENTITIES = { "&quot;": '"', "&#39;": "'", "&lt;": "<", "&gt;": ">", "&amp;": "&" };
function decode(text) { return text.replace(/&quot;|&#39;|&lt;|&gt;|&amp;/g, (e) => ENTITIES[e]); }

// Every record link on the page that carries a passage, as { id, passage }, read from the
// tag's attributes in whatever order the renderer wrote them. Links to outlet URLs are not
// record links: the evidence reader opens only /records/ links (src/scripts/evidence-reader.ts).
export function citedPassages(html) {
  const out = [];
  for (const [tag] of html.matchAll(/<a\b(?:[^>"]|"[^"]*")*>/g)) {
    const attrs = Object.fromEntries([...tag.matchAll(/\s([a-zA-Z-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
    const id = (attrs["data-record-href"] ?? attrs.href)?.match(/^\/records\/([^/]+)\/$/)?.[1];
    if (id && "data-passage" in attrs) out.push({ id, passage: decode(attrs["data-passage"]) });
  }
  return out;
}

export function storyFindings(html, route) {
  const findings = [];
  const text = storyCopy(html);
  const code = text.match(SCHEDULE_CODE);
  if (code) findings.push(`${route}: schedule or statute code "${code[0]}" in reader-facing text; cite the record and say it in words`);
  for (const re of CUSTODY_TALK) {
    const m = text.match(re);
    if (m) findings.push(`${route}: custody talk "${m[0]}" in reader-facing text; say what the record says, or get the record`);
  }
  if (html.includes('class="story-records"')) findings.push(`${route}: records list before the first section; the records section at the foot is the list`);
  for (const card of quoteCards(html)) {
    const who = card.speaker || "(no speaker)";
    if (!card.speaker) findings.push(`${route}: quote card "${card.words}" names no speaker`);
    if (card.beforeIsCard) findings.push(`${route}: quote card by ${who} stacked on another card; introduce each quote in a narrative paragraph`);
    else if (!card.beforeIsNarrative) findings.push(`${route}: quote card by ${who} follows <${card.beforeTag ?? "nothing"}>; a narrative paragraph introduces every quote card`);
  }
  return findings;
}
