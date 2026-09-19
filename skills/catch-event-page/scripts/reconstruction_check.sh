#!/usr/bin/env bash
# Independent reconstruction of a story's subject by a model that did not write the page, run
# under the contextual-reconstruction skill (skills/contextual-reconstruction/): current state,
# historical path, analogues, warning and remedy crosswalk, causal trace, consequences, then a
# comparison of the built page against the reconstruction. Runs beside completeness_audit.sh.
# Usage: skills/catch-event-page/scripts/reconstruction_check.sh <subject>/<story> [out.md]
# Writes checks/audits/<subject>--<story>-<date>-reconstruction.md and the full run to .log.
set -euo pipefail
story="${1:?usage: reconstruction_check.sh <subject>/<story> [out.md]}"
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
html="$root/dist/events/$story/index.html"
page="$root/src/pages/events/$story.astro"
manifest="$root/checks/manifests/$subject--$slug.json"
[ -f "$manifest" ] || manifest="$root/checks/manifests/$subject--${slug%-*}.json"
skill="$root/skills/contextual-reconstruction"
out="${2:-$root/checks/audits/$subject--$slug-$(date -u +%Y-%m-%d)-reconstruction.md}"
[ -f "$html" ] || { echo "build first: $html is missing" >&2; exit 2; }
[ -f "$manifest" ] || { echo "manifest missing for $story" >&2; exit 2; }
[ -f "$skill/SKILL.md" ] || { echo "skill missing: $skill/SKILL.md" >&2; exit 2; }
mkdir -p "$(dirname "$out")"
prompt="$(mktemp)"
cat > "$prompt" <<PROMPT
Read and follow, in full and in this order, before doing anything else:
  $skill/SKILL.md
  $skill/references/reconstruction-workflow.md
  $skill/references/developing-events.md
  $skill/references/output-schema.md
They define the work: reconstruct the subject first from live research and primary records (current state, historical path, analogue set, warning and remedy crosswalk, causal and propagation trace, consequences, story discovery), and only then compare the supplied account against the reconstruction.

The subject is the event told by the built page $html (source $page, records listed in $manifest with pinned files under $root/data/sources/). Read the page once to learn the subject and its date, then put it aside and reconstruct the subject independently, working backward from the event through the institution's own doctrine, policy, and prior statements, through earlier litigation, regulation, and incidents, and through third-party baselines, and forward from the event to the run date for what the institutions involved have said or done since. Search with alternate terminology and identifiers, not the page's framing.

Rules: do not edit any file; do not run git commit, git reset, git checkout, or any command that mutates repository state; do not kill, restart, or signal any process you did not start. Use the network; prefer primary sources. Preserve provenance and time: state what was known when, and never treat evidence published after the page's update date as something the page should have had, mark it "since the page" instead. No em dashes anywhere in your output.

Output in the skill's schema, then a final section "Against the page" listing, one numbered item each: what the reconstruction establishes that the page lacks, what the page states that the reconstruction contradicts or qualifies, and what has happened since the page. Every item names its materiality (Critical, Major, Moderate, Minor), quotes the page bytes where the page speaks, names the record (URL) with the exact bytes that support it, and states the correct account. End with exactly one line: VERDICT: COVERED if no Critical or Major item remains, otherwise VERDICT: GAPS.
PROMPT
codex exec -m "${CODEX_MODEL:-gpt-5.6-sol}" --skip-git-repo-check -C "$root" -c model_reasoning_effort=high -o "$out" "$(cat "$prompt")" </dev/null > "${out%.md}.log" 2>&1 || true
rm -f "$prompt"
grep -q '^VERDICT: ' "$out" 2>/dev/null || { echo "no VERDICT line in $out; read ${out%.md}.log and rerun" >&2; exit 1; }
echo "$out"
