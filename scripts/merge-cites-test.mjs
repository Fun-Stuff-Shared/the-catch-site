import test from "node:test";
import assert from "node:assert/strict";
import { mergeCites } from "./merge-cites.mjs";

const cite = (n, passage) => `<sup class="src-ref"><a href="#src-${n}" data-record-href="/records/r${n}/" data-passage="${passage}" aria-label="Source ${n}: read the evidence">${n}</a></sup>`;

test("consecutive citations of one record render once and keep every passage", () => {
  const out = mergeCites(`Sentence.${cite(1, "one")}${cite(1, "two")}`);
  assert.equal((out.match(/<sup/g) || []).length, 1);
  assert.match(out, /data-passage="one"/);
  assert.match(out, /data-passages="two"/);
});

test("citations of one record for different claims render once and name every claim", () => {
  const claimed = (n, passage, c) => cite(n, passage).replace(' aria-label', ` data-claim="${c}" aria-label`);
  const out = mergeCites(`Sentence.${claimed(1, "one", "a")}${claimed(1, "two", "b")}${claimed(1, "three", "b")}`);
  assert.equal((out.match(/<sup/g) || []).length, 1);
  assert.match(out, /data-claim="a b"/);
  assert.match(out, /data-passages="two&#10;three"/);
});

test("a record repeated later in the same run renders once, where it first appears", () => {
  const claimed = (n, passage, c) => cite(n, passage).replace(' aria-label', ` data-claim="${c}" aria-label`);
  const out = mergeCites(`Sentence.${claimed(5, "p", "a")}${claimed(4, "q", "b")}${claimed(5, "r", "c")}${claimed(1, "s", "d")}`);
  assert.deepEqual([...out.matchAll(/#src-(\d+)/g)].map((m) => m[1]), ["5", "4", "1"]);
  assert.match(out, /data-claim="a c"/);
  assert.match(out, /data-passages="r"/);
  assert.equal(mergeCites(out), out);
});

test("whitespace between the citations does not stop the merge", () => {
  const out = mergeCites(`Sentence.${cite(4, "a")}\n  ${cite(4, "b")}`);
  assert.equal((out.match(/<sup/g) || []).length, 1);
});

test("citations of different records stay separate and in order", () => {
  const out = mergeCites(`Sentence.${cite(2, "z")}${cite(3, "q")}`);
  assert.equal((out.match(/<sup/g) || []).length, 2);
  assert.ok(out.indexOf("#src-2") < out.indexOf("#src-3"));
});

test("a passage containing a dollar figure is carried verbatim", () => {
  const out = mergeCites(`Sentence.${cite(5, "half of the work")}${cite(5, "shortfall of $124M")}`);
  assert.match(out, /data-passages="shortfall of \$124M"/);
});

test("running again on a merged page folds what is left and changes nothing else", () => {
  const claimed = (n, passage, c) => cite(n, passage).replace(' aria-label', ` data-claim="${c}" aria-label`);
  const once = mergeCites(`One.${claimed(1, "x", "a")}${claimed(2, "y", "b")} Two.${claimed(3, "z", "c")}`);
  assert.equal(mergeCites(once), once);
});

test("a page without citations is returned unchanged", () => {
  assert.equal(mergeCites("<p>plain</p>"), "<p>plain</p>");
});

test("only a citation directly after another is marked for the separating comma", () => {
  const out = mergeCites(`One.${cite(1, "a")}${cite(2, "b")} Two.${cite(3, "c")}`);
  assert.equal((out.match(/src-ref-more/g) || []).length, 1);
  assert.match(out, /<sup class="src-ref src-ref-more"><a href="#src-2"/);
  assert.match(out, /Two\.<sup class="src-ref"><a href="#src-3"/);
});
