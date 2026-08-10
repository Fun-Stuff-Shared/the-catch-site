import vocabulary from "../data/stage2-public-vocabulary.json";
import dispositionMap from "../data/stage2-claim-disposition-to-public-label.json";

const closedLabels = new Set(vocabulary.closed_label_set);

function mappedLabel(axis, key) {
  const label = dispositionMap[axis]?.[key];
  if (!label || !closedLabels.has(label)) throw new Error(`stage2_public_label_out_of_set:${axis}:${key}`);
  return label;
}

export function labelsForNewsClaim(claim) {
  if (typeof claim.quote !== "string" || claim.quote.trim() === "") {
    throw new Error(`stage2_evidence_receipt_missing:${claim.claim_id}`);
  }
  const claimKind = claim.claim_class === "context"
    ? "context"
    : claim.claim_class === "core"
      ? "world_assertion"
      : null;
  if (!claimKind) throw new Error(`stage2_claim_kind_unresolvable:${claim.claim_id}`);
  return [
    { axis: "claim_kind", label: mappedLabel("claim_kind", claimKind) },
    { axis: "evidence_receipt", label: mappedLabel("evidence_receipt", "quote_support=supported") },
  ];
}
