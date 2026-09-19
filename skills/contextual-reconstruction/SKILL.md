---
name: contextual-reconstruction
description: Reconstruct an event, incident, failure, policy, decision, claim, trend, or issue from its surrounding history and system. Use when asked what is actually happening, how something developed, what caused or amplified it, whether earlier warnings or remedies map to it, what similar cases reveal, what consequences extend beyond the headline, or where the real story lies. Supports established subjects and developing events; breaking-news handling is one operating mode rather than the skill’s boundary.
---

# Contextual Reconstruction

Reconstruct the subject rather than audit an existing account. Start from a signal, event, question, or issue and determine what happened, how the surrounding system made it possible, how it propagated, what earlier incidents or interventions bear on it, and what evidence would materially change the picture.

Do the investigation. Do not answer investigative questions by merely restating them as proposed research steps. Treat “did the earlier audit address this subsystem?” or “what was the remedy timeline?” as instructions to retrieve, compare, and present the underlying evidence.

## Boundary with Story Completeness Audit

- Use this skill to **reconstruct the subject**, even when no article or settled narrative exists.
- Use Story Completeness Audit to **audit a supplied account** for omissions, support, and framing.
- When both apply, reconstruct first and compare the supplied account against that reconstruction second.

## Operating model

For every substantive task, read [references/reconstruction-workflow.md](references/reconstruction-workflow.md). Read [references/output-schema.md](references/output-schema.md) before presenting results. For a live or rapidly changing event, also read [references/developing-events.md](references/developing-events.md).

Reconstruct across these layers:

1. **Current state:** Establish what is happening and distinguish observed effects, reported explanations, supported causes, and unknowns.
2. **Historical path:** Trace precursor conditions, earlier incidents, decisions, warnings, regulation, litigation, investments, and remediation.
3. **Analogue set:** Find similar cases by mechanism, system, failure class, institutional setting, or consequence—not only identical bugs or facts.
4. **Warning/remedy crosswalk:** Map earlier findings and promised improvements to the present system, scope, and failure stage.
5. **Causal and propagation trace:** Explain what triggered the situation, what converted it into a wider event, and where impact spread.
6. **Consequences:** Separate immediate, second-order, and longer-term effects across relevant actors and institutions.
7. **Story discovery:** Identify the strongest evidence-backed stories only after reconstructing the subject.

## Core rules

- Use live research for factual reconstruction. Prefer primary records and contemporaneous evidence; use reporting and informed public signals to discover leads and supply context.
- Search with alternate terminology and identifiers rather than inheriting one actor’s framing.
- Separate symptom, trigger, root condition, control failure, propagation mechanism, and consequence. Do not call proximity or sequence causation without supporting evidence.
- Do not require the same immediate bug to find a meaningful connection. Test overlap at the system, component, process, control objective, failure class, or recovery function level.
- Treat a remedy marked “complete” as a status assertion requiring scope and effectiveness analysis, not proof that the risk was eliminated.
- Treat official explanations as evidence of what the institution says. Seek the records, data, technical material, or independent observations that support or qualify them.
- Distinguish direct linkage from functional overlap, analogy, and speculation. Never convert resemblance into a confirmed causal connection.
- Preserve provenance and time. State what was known when, distinguish event time from publication time, and avoid using later evidence as though it was contemporaneously available.
- Rank findings by evidentiary strength and material significance. Avoid chronology dumps and collections of merely interesting facts.

## Completion standard

Finish a stable-subject reconstruction when the current state, major historical path, meaningful analogues, relevant warnings/remedies, plausible causal and propagation chain, material downstream effects, and important unresolved alternatives have been investigated; the strongest potential stories have been tested; and an adversarial search reveals no readily discoverable evidence likely to materially change the reconstruction.

For developing events, produce an explicitly time-bounded snapshot rather than pretending finality. State the `as of` time, unresolved causal questions, source limitations, and the specific evidence or future event that could change the assessment.
