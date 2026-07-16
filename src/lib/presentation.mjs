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
  const date = eventDate(record);
  const source = sourceRef(record);
  const claimText = record.claim_text ?? "";
  const history = [{ status: "Published", date, text: "Entered the public record after signing and review." }];
  if (corrected) {
    history.push({ status: "Corrected", date, text: "Wording corrected. The original wording remains visible." });
  }
  if (pulled) {
    history[0] = { status: "Pulled", date, text: "Claim withdrawn from the served record." };
  }
  return {
    matterPath: `/matters/${record.claim_id}`,
    matterTitle: pulled ? "Fixture claim withdrawn" : claimText,
    findingLine: pulled ? "" : corrected ? "The initial wording was narrowed after the source record was checked." : "The original record supports the event as stated.",
    eventTitle: record.source_family ?? "Recorded event",
    eventDate: date,
    tierLabel: corrected ? "Reporting" : "Original record",
    sourceUrl: `#source-${record.claim_id}`,
    sourceLabel: source,
    quote: claimText,
    quoteLocation: record.evidence_refs?.join(", ") ?? "Cited source location",
    verificationStatus: statusLabelFor(record),
    correctionState: pulled ? "Pulled" : corrected ? "Corrected; original retained" : "Current",
    checkedProposition: claimText,
    scope: pulled ? "" : "This record checks only the proposition described by the cited export.",
    instances: pulled ? [] : [{ speaker: "Recorded source", role: corrected ? "reporting source" : "original record", date }],
    evidence: pulled ? [] : [{
      kind: corrected ? "Statement" : "Document",
      sourceKind: corrected ? "Reporting" : "First-hand",
      claimantSource: corrected,
      speaker: "Recorded source",
      quote: claimText,
      source,
      location: record.evidence_refs?.join(", ") ?? "Cited source location",
    }],
    provenance: { source, capture: record.provenance_ref ?? "Signed export" },
    history,
    originalClaimText: record.original_claim_text ?? "",
  };
}
