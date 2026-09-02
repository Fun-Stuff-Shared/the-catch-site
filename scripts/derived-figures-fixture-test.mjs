import assert from "node:assert/strict";
import { verifyDerivedFigure } from "./derived-figures.mjs";

const page = "events/example/";
const kpi = { value: "6", unit: "" };
const accepted = new Map([
  ["a", { id: "a", as_of: "2026-01-01", figure: { value: "9" } }],
  ["b", { id: "b", as_of: "2026-01-07", figure: { value: "3" } }],
]);
const good = { page, figure_text: "6", formula: "difference", occurrence_ids: ["a", "b"], recomputed_value: "6" };
assert.deepEqual(verifyDerivedFigure({ page, kpi, row: good, acceptedOccurrences: accepted }).ok, true);
for (const [name, row, expression] of [
  ["wrong recomputed_value", { ...good, recomputed_value: "7" }, /strip figure 6 recomputed 6, not declared 7/],
  ["missing occurrence id", { ...good, occurrence_ids: ["a", "missing"] }, /strip figure 6 names missing or unaccepted occurrence missing/],
  ["unknown formula", { ...good, formula: "not_a_formula" }, /strip figure 6 uses unknown formula not_a_formula/],
]) {
  const result = verifyDerivedFigure({ page, kpi, row, acceptedOccurrences: accepted });
  assert.equal(result.ok, false, name);
  assert.match(result.error, expression, name);
  console.log(`${name}: ${result.error}`);
}
