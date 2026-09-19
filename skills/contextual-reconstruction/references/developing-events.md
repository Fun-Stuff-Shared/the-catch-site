# Developing-Event Mode

Use this reference when facts, impacts, explanations, or remedies are still changing.

## Snapshot discipline

- Put a precise `as of` timestamp near the beginning.
- Prefer event time over publication time and identify the distinction.
- Record corrections and changed explanations without silently overwriting earlier states.
- Treat “resolved,” “contained,” and “normal operations” as scoped claims: identify who declared them, what system or geography they cover, and whether downstream effects persist.
- Recheck the most decision-relevant facts immediately before finishing.

## Source handling

Use official alerts, operators, regulators, status systems, direct records, and observed operational data for the current state. Use reputable reporting for synthesis and discovery. Use expert, employee, affected-professional, and eyewitness posts as attributed leads with explicit confidence.

Do not wait for a final incident report before forming a bounded reconstruction. Do not infer a root cause merely because an early official explanation names a component or generic “technical issue.”

## Update-aware workflow

1. Find the earliest credible signal.
2. Establish the latest operational state.
3. Build the event timeline between them.
4. Identify changes in scope, impact, explanation, mitigation, and recovery.
5. Add the relevant historical, analogue, remedy, and propagation context from the core workflow.
6. Identify the specific forthcoming records or milestones most likely to change the reconstruction.

## Completion for the current snapshot

A snapshot is adequate when the earliest credible signal, present state, major propagation path, relevant precursor history, known warnings or remedies, material downstream effects, and highest-value unresolved causal questions have been investigated.

Always state:

- `as of` time;
- what is confirmed, likely, disputed, and unknown;
- what may continue changing;
- what evidence would materially revise the assessment;
- when a new check becomes worthwhile, if a concrete milestone is known.
