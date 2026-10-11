import test from "node:test";
import assert from "node:assert/strict";
import { claims, factsClaims } from "./facts-claims.mjs";

const cite = (n, passage = "x") => `<sup class="src-ref"><a href="#src-${n}" data-record-href="/records/r${n}/" data-passage="${passage}">${n}</a></sup>`;

test("a claim ends at punctuation followed by its citation, so abbreviations need no guessing", () => {
  const html = `Jackson's order set any response for 4 p.m. Eastern on September 9.${cite(1)} The vote ended at 3 a.m.${cite(2)} Earlier, the U.S. Senate had adjourned.${cite(3)}`;
  assert.deepEqual(claims(html), [
    `Jackson's order set any response for 4 p.m. Eastern on September 9.${cite(1)}`,
    `The vote ended at 3 a.m.${cite(2)}`,
    `Earlier, the U.S. Senate had adjourned.${cite(3)}`,
  ]);
});

test("uncited sentences stay with the cited one after them, and text after the last citation is no claim", () => {
  const html = `The barrels are not new. They are what is left of March's pledge.${cite(1)} That matters for prices.`;
  assert.deepEqual(claims(html), [`The barrels are not new. They are what is left of March's pledge.${cite(1)}`]);
});

test("punctuation inside a citation's passage, inside markup, or before a mid-sentence citation never ends a claim", () => {
  const html = `Trump said it rose${cite(1, "rose. It")} and fell.${cite(2)} Then <em>it. Ended</em> here.${cite(3)} She said "no."${cite(4)}${cite(5)}`;
  assert.deepEqual(claims(html), [
    `Trump said it rose${cite(1, "rose. It")} and fell.${cite(2)}`,
    `Then <em>it. Ended</em> here.${cite(3)}`,
    `She said "no."${cite(4)}${cite(5)}`,
  ]);
});

test("claims go in a list after their paragraph", () => {
  const page = `<main id="story-root"><p data-layer="narrative">The vote was 12 to 0.${cite(1)} That matters.</p></main>`;
  const out = factsClaims(page);
  assert.match(out, /<\/p><ul class="claim-list" data-layer="claims"><li>The vote was 12 to 0\.<sup/);
  assert.doesNotMatch(out.split("claim-list")[1], /That matters/);
});

test("a run of citations marked by merge-cites stays with its claim", () => {
  const more = (n) => cite(n).replace('<sup class="src-ref">', '<sup class="src-ref src-ref-more">');
  assert.deepEqual(claims(`One.${cite(1)}${more(2)} Two.${cite(3)}`), [`One.${cite(1)}${more(2)}`, `Two.${cite(3)}`]);
});
