import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

const exportPath = process.env.PORTICO_ACQUISITION_EXPORT_PATH ?? path.resolve(process.cwd(), "data/acquisition_export.json");
const document = JSON.parse(fs.readFileSync(exportPath, "utf8"));
const payload = document.payload;

if (!payload || !Array.isArray(payload.claims)) {
  throw new Error("acquisition_export_payload_invalid");
}
if (payload.preview_only !== true || payload.public_claim_eligible !== false || payload.publication_status !== "preview") {
  throw new Error("acquisition_export_gate_refused");
}
if (!payload.acquisition_policy || !Array.isArray(payload.acquisition_policy.families)) {
  throw new Error("acquisition_policy_missing_from_export_payload");
}
if (payload.acquisition_policy.source_status !== "candidate_policy_pending_activation") {
  throw new Error("scan_policy_candidate_source_status_refused");
}

const exclusion = payload.exclusions?.[0];
const manifestPath = process.env.PORTICO_FULTON_CAPTURE_MANIFEST_PATH ?? exclusion?.manifest_path;
if (!exclusion || typeof manifestPath !== "string") {
  throw new Error("fulton_capture_manifest_missing");
}
const manifestBytes = fs.readFileSync(manifestPath);
const manifestHash = `sha256:${createHash("sha256").update(manifestBytes).digest("hex")}`;
if (manifestHash !== exclusion.manifest_sha256) {
  throw new Error("fulton_capture_manifest_hash_mismatch");
}
const manifest = JSON.parse(manifestBytes.toString("utf8"));
if (!Array.isArray(manifest.records)) {
  throw new Error("fulton_capture_manifest_records_missing");
}
const derivedExclusionCount = manifest.records.length;
if (derivedExclusionCount !== exclusion.expected_count) {
  throw new Error("fulton_capture_derived_count_mismatch");
}

const registryPath = process.env.PORTICO_SCAN_REGISTRY_PATH ?? payload.acquisition_policy.registry_path;
const registryBytes = fs.readFileSync(registryPath);
const registryHash = `sha256:${createHash("sha256").update(registryBytes).digest("hex")}`;
if (registryHash !== payload.acquisition_policy.registry_sha256) {
  throw new Error("scan_policy_registry_hash_mismatch");
}
const registry = JSON.parse(registryBytes.toString("utf8"));
if (registry.candidate_status !== "pending_fable_p3_record") {
  throw new Error("scan_policy_candidate_status_refused");
}
const registryEntries = Array.isArray(registry.entries) ? registry.entries : [];
const policyFamilies = payload.acquisition_policy.families;
const policyFamilyMap = new Map(policyFamilies.map((family) => [family.family_id, family]));
const registryFamilyIds = registryEntries.map((entry) => entry.family_id).sort();
const policyFamilyIds = policyFamilies.map((family) => family.family_id).sort();
if (JSON.stringify(registryFamilyIds) !== JSON.stringify(policyFamilyIds)) {
  throw new Error("scan_policy_family_set_mismatch");
}
const derivedFamilies = registryEntries.map((entry) => {
  if (!entry.scan_policy || !policyFamilyMap.has(entry.family_id)) {
    throw new Error("scan_policy_missing_for_family");
  }
  return { ...policyFamilyMap.get(entry.family_id), scan_policy: entry.scan_policy };
});
const observedAt = derivedFamilies.map((family) => family.scan_policy.declared_at).sort().at(-1);
if (typeof observedAt !== "string") {
  throw new Error("scan_policy_observed_at_missing");
}
const derivedPolicy = { ...payload.acquisition_policy, observed_at: observedAt, families: derivedFamilies };

export const acquisitionDocument = document;
export const acquisitionPayload = payload;
export const acquisitionPolicy = derivedPolicy;
export const acquisitionInterventions = Array.isArray(payload.interventions) ? payload.interventions : [];
export const acquisitionExclusions = [{ ...exclusion, count: derivedExclusionCount }];
