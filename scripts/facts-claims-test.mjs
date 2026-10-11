import test from "node:test";
import assert from "node:assert/strict";
import { sentences, factsClaims } from "./facts-claims.mjs";

const cite = (n, passage = "x") => `<sup class="src-ref"><a href="#src-${n}" data-record-href="/records/r${n}/" data-passage="${passage}">${n}</a></sup>`;

test("abbreviations never end a sentence", () => {
  const html = `Jackson's order set any response for 4 p.m. Eastern on September 9.${cite(1)} The U.S. Senate voted. Lt. Gen. Smith spoke at 9 a.m. Monday.${cite(2)} See e.g. Section 4.${cite(3)}`;
  assert.deepEqual(sentences(html), [
    `Jackson's order set any response for 4 p.m. Eastern on September 9.${cite(1)}`,
    "The U.S. Senate voted.",
    `Lt. Gen. Smith spoke at 9 a.m. Monday.${cite(2)}`,
    `See e.g. Section 4.${cite(3)}`,
  ]);
});

test("a period inside a citation's passage or inside markup never splits", () => {
  const html = `It rose 2.5 percent.${cite(1, "rose. It")} Then <em>it. Ended</em> here.${cite(2)} She said "no."${cite(3)} No. 2 diesel rose.`;
  assert.deepEqual(sentences(html), [
    `It rose 2.5 percent.${cite(1, "rose. It")}`,
    `Then <em>it. Ended</em> here.${cite(2)}`,
    `She said "no."${cite(3)}`,
    "No. 2 diesel rose.",
  ]);
});

test("only cited sentences become claims, in a list after their paragraph", () => {
  const page = `<main id="story-root"><p data-layer="narrative">Plain link sentence. The vote was 12 to 0.${cite(1)}</p></main>`;
  const out = factsClaims(page);
  assert.match(out, /<\/p><ul class="claim-list" data-layer="claims"><li>The vote was 12 to 0\.<sup/);
  assert.doesNotMatch(out.split("claim-list")[1], /Plain link sentence/);
});
