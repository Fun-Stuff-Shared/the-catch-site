const ALLOWED_FORMULAS = new Set(["days_since", "vote_tally", "count_of", "difference", "percentile_rank"]);

export { ALLOWED_FORMULAS };

export function normalizeFigure(value) {
  return `${value ?? ""}`.replace(/[–—]/g, "-").replace(/%/g, "").replace(/\s+/g, "").toLowerCase();
}

function numeric(value) {
  const normalized = `${value ?? ""}`.replace(/,/g, "").replace(/%/g, "").trim();
  return /^-?\d+(?:\.\d+)?$/.test(normalized) ? Number(normalized) : null;
}

function formatNumber(value) {
  return Number.isInteger(value) ? `${value}` : `${value}`.replace(/0+$/, "").replace(/\.$/, "");
}

function dateValue(occurrence) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(occurrence.as_of ?? "")) return null;
  const value = Date.parse(`${occurrence.as_of}T00:00:00Z`);
  return Number.isNaN(value) ? null : value;
}

export function recompute(formula, occurrences) {
  if (!ALLOWED_FORMULAS.has(formula)) throw new Error(`unknown formula ${formula}`);
  if (!occurrences.length) throw new Error("no occurrence ids");
  const values = occurrences.map((occurrence) => numeric(occurrence.figure?.value));

  if (formula === "days_since") {
    if (occurrences.length !== 2) throw new Error("days_since requires exactly two dated occurrences");
    const [first, second] = occurrences.map(dateValue);
    if (first === null || second === null) throw new Error("days_since requires ISO as_of dates");
    return formatNumber(Math.abs(second - first) / 86_400_000);
  }
  if (formula === "vote_tally") {
    if (occurrences.length !== 1 || !/^\d+\s*-\s*\d+$/.test(occurrences[0].figure?.value ?? "")) throw new Error("vote_tally requires one tally figure");
    return occurrences[0].figure.value.replace(/\s+/g, "");
  }
  if (formula === "count_of") return formatNumber(occurrences.length);
  if (formula === "difference") {
    if (occurrences.length !== 2 || values.some((value) => value === null)) throw new Error("difference requires exactly two numeric figures");
    return formatNumber(values[0] - values[1]);
  }
  if (values.some((value) => value === null)) throw new Error("percentile_rank requires numeric figures");
  const sorted = [...values].sort((a, b) => a - b);
  const rank = sorted.lastIndexOf(values[0]) + 1;
  return formatNumber(Math.round((rank / sorted.length) * 100));
}

export function rowsFromExport(exported) {
  const rows = Array.isArray(exported) ? exported : exported?.rows;
  if (!Array.isArray(rows)) throw new Error("derived-figures export requires a rows array");
  return rows;
}

export function verifyDerivedFigure({ page, kpi, row, acceptedOccurrences }) {
  const label = `${page}: strip figure ${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ""}`;
  if (!row || row.page !== page || normalizeFigure(row.figure_text) !== normalizeFigure(`${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ""}`)) return { ok: false, error: `${label} has no matching derived-figures row` };
  if (!ALLOWED_FORMULAS.has(row.formula)) return { ok: false, error: `${label} uses unknown formula ${row.formula}` };
  if (!Array.isArray(row.occurrence_ids) || !row.occurrence_ids.length) return { ok: false, error: `${label} has no occurrence ids` };
  const occurrences = [];
  for (const id of row.occurrence_ids) {
    const occurrence = acceptedOccurrences.get(id);
    if (!occurrence) return { ok: false, error: `${label} names missing or unaccepted occurrence ${id}` };
    occurrences.push(occurrence);
  }
  let result;
  try { result = recompute(row.formula, occurrences); }
  catch (error) { return { ok: false, error: `${label} cannot recompute ${row.formula}: ${error.message}` }; }
  if (normalizeFigure(result) !== normalizeFigure(row.recomputed_value)) return { ok: false, error: `${label} recomputed ${result}, not declared ${row.recomputed_value}` };
  if (normalizeFigure(result) !== normalizeFigure(`${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ""}`)) return { ok: false, error: `${label} recomputed ${result}, not displayed ${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ""}` };
  return { ok: true, path: `derived:${row.formula}`, occurrenceIds: row.occurrence_ids };
}
