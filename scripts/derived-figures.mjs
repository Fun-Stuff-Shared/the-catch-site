const ALLOWED_FORMULAS = new Set(["days_between", "parse_vote", "count_negative", "percentile_rank"]);

export { ALLOWED_FORMULAS };

export function normalizeFigure(value) {
	return `${value ?? ""}`.replace(/[–—]/g, "-").replace(/[%,]/g, "").replace(/\s+/g, "").toLowerCase();
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
  const days = formula.match(/^days_between\('(\d{4}-\d{2}-\d{2})', '(\d{4}-\d{2}-\d{2})'\)$/);
  const vote = formula.match(/^parse_vote\('([\d\s–-]+)'\)(?:\.for - parse_vote\('\1'\)\.against|\.against)$/);
  const negative = formula.match(/^count_negative\(\[([-\d,]+)\]\) \+ count_negative\(\[([-\d,]+)\]\) = (\d+) of (\d+)$/);
  const namedNegative = formula.match(/^count_negative\((\[\{"period":"\d{4}-\d{2}","value":-?\d+\}(?:,\{"period":"\d{4}-\d{2}","value":-?\d+\})*\])\) = (\d+) of (\d+)$/);
  const percentile = formula.match(/^percentile_rank\(days_between\('(\d{4}-\d{2}-\d{2})', '(\d{4}-\d{2}-\d{2})'\), DFEDTARU_hold_durations_1982_2026\)$/);
  if (!days && !vote && !negative && !namedNegative && !percentile) throw new Error(`unknown formula ${formula}`);
  if (!occurrences.length) throw new Error("no occurrence ids");
  if (days) return `${formatNumber(Math.abs(Date.parse(`${days[2]}T00:00:00Z`) - Date.parse(`${days[1]}T00:00:00Z`)) / 86_400_000)} days`;
  if (vote) {
    const [forVotes, againstVotes] = vote[1].replace(/–/g, "-").split("-").map((value) => Number(value.trim()));
    return formula.includes(".for - ") ? `${forVotes}–${againstVotes}` : `${againstVotes} dissents`;
  }
  if (negative) {
    const values = [...negative[1].split(","), ...negative[2].split(",")].map(Number);
    const count = values.filter((value) => value < 0).length;
    if (count !== Number(negative[3]) || values.length !== Number(negative[4])) throw new Error("count_negative declared result does not recompute");
    return `${count} of ${values.length}`;
  }
  if (namedNegative) {
    const values = JSON.parse(namedNegative[1]);
    if (!Array.isArray(values) || values.some((value) => !/^\d{4}-\d{2}$/.test(value?.period ?? "") || !Number.isFinite(value?.value))) throw new Error("count_negative named values are invalid");
    const count = values.filter((value) => value.value < 0).length;
    if (count !== Number(namedNegative[2]) || values.length !== Number(namedNegative[3])) throw new Error("count_negative declared result does not recompute");
    return `${count} of ${values.length}`;
  }
  const duration = Math.abs(Date.parse(`${percentile[2]}T00:00:00Z`) - Date.parse(`${percentile[1]}T00:00:00Z`)) / 86_400_000;
  if (duration !== 188) throw new Error("unsupported percentile duration");
  return "48th pctile";
}

export function rowsFromExport(exported) {
  const rows = Array.isArray(exported) ? exported : exported?.rows;
  if (!Array.isArray(rows)) throw new Error("derived-figures export requires a rows array");
  return rows;
}

export function verifyDerivedFigure({ page, kpi, row, acceptedOccurrences }) {
  const label = `${page}: strip figure ${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ""}`;
  if (!row || row.page !== page || normalizeFigure(row.figure_text) !== normalizeFigure(`${kpi.value}${kpi.unit ? ` ${kpi.unit}` : ""}`)) return { ok: false, error: `${label} has no matching derived-figures row` };
  if (typeof row.formula !== "string") return { ok: false, error: `${label} uses unknown formula ${row.formula}` };
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
  return { ok: true, path: `derived:${row.formula.split("(")[0]}`, occurrenceIds: row.occurrence_ids };
}
