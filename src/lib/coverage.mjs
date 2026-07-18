const PRIMARY_ROLES = new Set(["primary", "primary_record", "original_record"]);
const VALID_DATE = /^\d{4}-\d{2}-\d{2}(?:T|$)/;

function hostFor(value) {
  try {
    return new URL(String(value)).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isPrimaryRecord(item) {
  const role = String(item?.source_role ?? "").toLowerCase();
  const host = hostFor(item?.source_url);
  return PRIMARY_ROLES.has(role) || host === "federalreserve.gov" || host === "www.federalreserve.gov";
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function outletForms(outlet) {
  const spaced = String(outlet ?? "").trim().replace(/([a-z])([A-Z])/g, "$1 $2");
  return [...new Set([String(outlet ?? "").trim(), spaced, spaced.replace(/\s+/g, "")])]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
}

export function normalizeCoverageHeadline(headline, outlet) {
  let value = String(headline ?? "").trim();
  for (const form of outletForms(outlet)) {
    const pattern = new RegExp(`(?:\\s*(?:\\||·|-)\\s*|\\s+)${escapeRegex(form)}\\s*$`, "i");
    while (pattern.test(value)) value = value.replace(pattern, "").trim();
  }
  return value || "Coverage of this event";
}

function publicationDateFor(item) {
  const value = item?.date ?? item?.publication_date ?? item?.published_at ?? null;
  return typeof value === "string" && VALID_DATE.test(value) ? value : null;
}

export function coverageRowsFor(record) {
  const source = Array.isArray(record?.coverage) ? record.coverage : [];
  const seen = new Set();
  const rows = [];
  for (const item of source) {
    if (!item || isPrimaryRecord(item)) continue;
    const sourceUrl = typeof item.source_url === "string" ? item.source_url.trim() : "";
    const outlet = typeof item.outlet === "string" ? item.outlet.trim() : "";
    if (!/^https?:\/\//i.test(sourceUrl) || !outlet) continue;
    const key = String(item.artifact_id || sourceUrl);
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({
      outlet,
      headline: normalizeCoverageHeadline(item.headline, outlet),
      source_url: sourceUrl,
      date: publicationDateFor(item),
      artifact_id: item.artifact_id ?? null,
    });
  }
  return rows;
}

export function mergeCoverageRows(rows) {
  const seen = new Set();
  return rows.filter((item) => {
    const key = String(item?.artifact_id || item?.source_url || "");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
