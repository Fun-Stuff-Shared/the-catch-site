import { payload } from "./export.mjs";
import { statusLabelFor } from "./status-contract.mjs";

function eventDate(record) {
  return record.correction_event?.observed_at?.slice(0, 10) ?? payload.generated_at.slice(0, 10);
}

function sourceRef(record) {
  return record.provenance_ref ?? `source-${record.claim_id}`;
}

export function presentationFor(record) {
  const pulled = record.publication_status === "pulled";
  const corrected = record.publication_status === "corrected";
  const previewOnly = payload.preview_only === true || payload.public_claim_eligible !== true;
  const date = record.event_date ?? eventDate(record);
  const source = sourceRef(record);
  const claimText = record.claim_text ?? "";
  const realHistory = Array.isArray(record.history) ? record.history : null;
  const history = realHistory ? [...realHistory] : [{ status: "Published", date, text: "Entered the public record after signing and review." }];
  if (corrected) {
    history.push({ status: "Corrected", date, text: "Wording corrected. The original wording remains visible." });
  }
  if (pulled) {
    history[0] = { status: "Pulled", date, text: "Claim withdrawn from the served record." };
  }
  return {
    matterPath: record.matter_id ? `/matters/${record.matter_id}` : record.matter_path ?? null,
    matterTitle: pulled ? "Fixture claim withdrawn" : record.matter_title ?? claimText,
    findingLine: pulled ? "" : record.finding_line ?? (corrected ? "The initial wording was narrowed after the source record was checked." : "The original record supports the event as stated."),
    eventTitle: record.event_title ?? record.source_family ?? "Recorded event",
    eventDate: date,
    tierLabel: record.tier_label ?? (corrected ? "Reporting" : "Original record"),
    sourceUrl: record.source_url ?? null,
    sourceLabel: record.source_label ?? source,
    quote: record.quote ?? claimText,
    quoteLocation: record.quote_location ?? record.evidence_refs?.join(", ") ?? "Cited source location",
    evidenceViewer: record.evidence_viewer ?? null,
    verificationStatus: statusLabelFor(record),
    previewOnly,
    correctionState: record.correction_state ?? (previewOnly ? "Preview only; not published" : pulled ? "Pulled" : corrected ? "Corrected; original retained" : "Current"),
    checkedProposition: record.checked_proposition ?? claimText,
    checkedPropositionNote: record.checked_proposition_note ?? null,
    checkedAt: record.verified_at ?? null,
    scope: record.scope ?? (pulled ? "" : "This record checks only the proposition described by the cited export."),
    instances: pulled ? [] : record.instances ?? [{ speaker: "Recorded source", role: corrected ? "reporting source" : "original record", date }],
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
    archiveCapture: record.archive_capture ?? null,
    history,
    originalClaimText: record.original_claim_text ?? "",
    relatedClaims: Array.isArray(record.related_claims) ? record.related_claims : [],
  };
}
