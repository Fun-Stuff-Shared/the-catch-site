import { payload } from "./export.mjs";
import { statusLabelFor } from "./status-contract.mjs";
import { coverageRowsFor } from "./coverage.mjs";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function eventDate(record) {
  return record.correction_event?.observed_at?.slice(0, 10) ?? payload.generated_at.slice(0, 10);
}

function sourceRef(record) {
  return record.provenance_ref ?? `source-${record.claim_id}`;
}

function dateParts(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T|$)/.exec(String(value ?? ""));
  if (!match) return null;
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year: match[1], month, day };
}

export function formatDate(value) {
  const parts = dateParts(value);
  return parts ? `${MONTHS[parts.month - 1]} ${parts.day}, ${parts.year}` : "Date unavailable";
}

export function formatTimestamp(value) {
  const raw = String(value ?? "");
  const parts = dateParts(raw);
  if (!parts) return "Date unavailable";
  if (!raw.includes("T")) return formatDate(raw);
  const time = /T(\d{2}):(\d{2})/.exec(raw);
  return time
    ? `${MONTHS[parts.month - 1]} ${parts.day}, ${parts.year}, ${time[1]}:${time[2]} UTC`
    : formatDate(raw);
}

export function formatMonth(year, month) {
  const monthNumber = Number(month);
  return monthNumber >= 1 && monthNumber <= 12 ? `${MONTHS[monthNumber - 1]} ${year}` : String(year);
}

export function formatDay(year, month, day) {
  return formatDate(`${year}-${month}-${day}`);
}

function formatHistory(entries) {
  return entries.map((entry) => ({ ...entry, date: formatTimestamp(entry.date) }));
}

function formatInstances(entries) {
  return entries.map((entry) => ({ ...entry, date: entry.date ? formatDate(entry.date) : entry.date }));
}

function formatFractionPercent(whole, numerator, denominator) {
  const value = Number(whole) + Number(numerator) / Number(denominator);
  return `${value.toFixed(2)}%`;
}

export function normalizeAuthoredText(value) {
  let text = String(value ?? "");
  text = text.replace(
    /(\d+)-(\d+)\/(\d+)\s+to\s+(\d+)-(\d+)\/(\d+)\s+percent(?:\s*\(\s*\d+(?:\.\d+)?\s+to\s+\d+(?:\.\d+)?\s+percent\s*\))?/gi,
    (_, wholeA, numeratorA, denominatorA, wholeB, numeratorB, denominatorB) =>
      `${formatFractionPercent(wholeA, numeratorA, denominatorA)} to ${formatFractionPercent(wholeB, numeratorB, denominatorB)}`,
  );
  text = text.replace(/(\d+)-(\d+)\/(\d+)\s+percent\b/gi, (_, whole, numerator, denominator) => formatFractionPercent(whole, numerator, denominator));
  return text.replace(/(\d+(?:\.\d+)?)\s+to\s+(\d+(?:\.\d+)?)\s+percent\b/gi, "$1% to $2%");
}

function documentTitleFor(record) {
  if (record.document_title) return record.document_title;
  const sourceUrl = String(record.source_url ?? "");
  if (sourceUrl.includes("/pressreleases/")) return "FOMC statement";
  if (sourceUrl.includes("fomcminutes")) return "FOMC minutes";
  return "Source record";
}

export function presentationFor(record) {
  const pulled = record.publication_status === "pulled";
  const corrected = record.publication_status === "corrected";
  const previewOnly = payload.preview_only === true || payload.public_claim_eligible !== true;
  const date = record.event_date ?? eventDate(record);
  const source = sourceRef(record);
  const claimText = record.claim_text ?? "";
  const realHistory = Array.isArray(record.history) ? record.history : null;
  const history = realHistory ? formatHistory(realHistory) : [];
  if (corrected) {
    history.push({ status: "Corrected", date: formatDate(date), text: "Wording corrected. The original wording remains visible." });
  }
  if (pulled) {
    history[0] = { status: "Pulled", date: formatDate(date), text: "Claim withdrawn from the served record." };
  }
  const archiveCapture = record.archive_capture
    ? { ...record.archive_capture, date: formatDate(record.archive_capture.date) }
    : null;
  const sourceLabel = record.source_label ?? source;
  const documentTitle = documentTitleFor(record);
  const coverageRows = coverageRowsFor(record).map((item) => ({
    ...item,
    dateLabel: item.date ? formatDate(item.date) : null,
  }));
  const authoredTitle = normalizeAuthoredText(record.matter_title ?? claimText);
  const readerHeadline = normalizeAuthoredText(record.reader_headline ?? authoredTitle);
  const pageTitle = normalizeAuthoredText(record.page_title ?? authoredTitle);
  const eventDateLabel = formatDate(date);
  return {
    matterPath: record.matter_id ? `/matters/${record.matter_id}` : record.matter_path ?? null,
    matterTitle: pulled ? "Claim withdrawn" : readerHeadline,
    pageTitle: pulled ? "Claim withdrawn" : pageTitle,
    sourceByline: `${sourceLabel} · ${documentTitle}, ${eventDateLabel}`,
    findingLine: pulled ? "" : normalizeAuthoredText(record.finding_line ?? (corrected ? "The initial wording was narrowed after the source record was checked." : "The original record supports the event as stated.")),
    eventTitle: record.event_title ?? record.source_family ?? "Recorded event",
    eventPath: record.event_slug ? `/events/${record.event_slug}/` : null,
    coverageRows,
    coverageOutlets: [...new Set(coverageRows.map((item) => item.outlet).filter(Boolean))],
    eventDate: formatDate(date),
    tierLabel: record.tier_label ?? (corrected ? "Reporting" : "Original record"),
    sourceUrl: record.source_url ?? null,
    sourceLabel,
    quote: record.quote ?? claimText,
    quoteLocation: record.quote_location ?? record.evidence_refs?.join(", ") ?? "Cited source location",
    firstRetrievedAt: record.first_retrieved_at ? formatDate(record.first_retrieved_at) : null,
    checkedAgainst: Array.isArray(record.checked_against) ? record.checked_against : [record.source_label ?? "Source record"],
    evidenceViewer: record.evidence_viewer ?? null,
    verificationStatus: statusLabelFor(record),
    previewOnly,
    correctionState: record.correction_state ?? (previewOnly ? "Preview only; not published" : pulled ? "Pulled" : corrected ? "Corrected; original retained" : "Current"),
    checkedProposition: normalizeAuthoredText(record.checked_proposition ?? claimText),
    checkedPropositionNote: record.checked_proposition_note === "Editorial normalization; the source quote remains verbatim."
      ? "Wording standardized for clarity; the source quote is shown unchanged."
      : record.checked_proposition_note ?? null,
    checkedAt: record.verified_at ? formatTimestamp(record.verified_at) : null,
    scope: record.scope ?? (pulled ? "" : "This record checks only the proposition described by the cited export."),
    instances: pulled ? [] : formatInstances(record.instances ?? [{ speaker: "Recorded source", role: corrected ? "reporting source" : "original record", date }]),
    evidence: pulled ? [] : record.evidence ?? [{
      kind: corrected ? "Statement" : "Document",
      sourceKind: corrected ? "Reporting" : "First-hand",
      claimantSource: corrected,
      speaker: "Recorded source",
      quote: claimText,
      source,
      location: record.evidence_refs?.join(", ") ?? "Cited source location",
    }],
    provenance: record.provenance ?? { source, capture: record.provenance_ref ?? "Signed export" },
    archiveCapture,
    history,
    originalClaimText: record.original_claim_text ?? "",
    relatedClaims: Array.isArray(record.related_claims) ? record.related_claims : [],
  };
}
