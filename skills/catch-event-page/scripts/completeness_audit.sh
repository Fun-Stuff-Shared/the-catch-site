#!/usr/bin/env bash
# Three-layer completeness audit of a built story page by a model that did not write it.
# Usage: skills/catch-event-page/scripts/completeness_audit.sh <subject>/<story> [out.md]
# Reads the built page, its source and data module, manifest, and pins; runs codex with
# network access (read-only on the repo); writes the verdict to checks/audits/<subject>--<story>-<date>.md
# and the full run to the matching .log. What to do with the verdict: references/completeness-audit.md.
set -euo pipefail
story="${1:?usage: completeness_audit.sh <subject>/<story> [out.md]}"
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
html="$root/dist/events/$story/index.html"
page="$root/src/pages/events/$story.astro"
manifest="$root/checks/manifests/$subject--$slug.json"
[ -f "$manifest" ] || manifest="$root/checks/manifests/$subject--${slug%-*}.json"
out="${2:-$root/checks/audits/$subject--$slug-$(date -u +%Y-%m-%d).md}"
[ -f "$html" ] || { echo "build first: $html is missing" >&2; exit 2; }
[ -f "$manifest" ] || { echo "manifest missing for $story" >&2; exit 2; }
mkdir -p "$(dirname "$out")"
prompt="$(mktemp)"
cat > "$prompt" <<PROMPT
You are auditing whether a published story tells the full and correctly bounded story. The article is a starting point, not the research boundary. Lead with what is missing: an account can be accurate sentence by sentence and still be materially incomplete or misleading by omission.

Run three layers and keep them separate:
1. Verification: for each material proposition (numbers, dates, quotations, causal claims, procedural characterizations, superlatives, motive claims, absence claims), does the cited record support the wording, and does the broader record support the proposition? Flag wording that is literally defensible but materially misleading.
2. Completeness discovery: search backward, forward, and around the story's chosen beginning, endpoint, actors, scope, thesis, and causal frame for omitted events, records, actors, context, counterevidence, alternative explanations, and later developments. Follow every citation the story's own sources make to its underlying record (a video's on-screen source slate, a story's linked filing, a release's dataset). Count independent evidentiary lineages, not domains. Normalize timeframe, population, geography, units, denominators, and procedural stage before calling anything a contradiction. An unsuccessful search does not prove an absence claim.
3. Independent reconstruction: ignore the story's narrative and rebuild the current state from the strongest evidence, then try to disprove your reconstruction.

Do not conclude nothing is missing because every sentence is cited or several outlets agree. Finish only after major claims and numbers are checked, the frame is searched in all three directions, primary records, missing actors, denominators, and procedural context are considered, counterevidence, competing explanations, lineage duplication, and source revisions are tested, the reconstruction exists, and a fresh "what are we still missing" pass finds no high-probability material avenue. If access prevents that, label the audit bounded and list the remaining high-value checks.

Rules: do not edit any file; do not run git commit, git reset, git checkout, or any command that mutates repository state; do not kill, restart, or signal any process you did not start. Use the network for live records and coverage; prefer primary sources. Read every video pin frame by frame (ffmpeg -vf fps=1) as well as its transcript. No em dashes anywhere in your output.

The article: the built page $html (source $page, data module under $root/src/data/). Its records are listed in $manifest with pinned files under $root/data/sources/. Read the complete page first, then expand outward.

Output, ranked by materiality: each finding with a severity, the page bytes, the record (URL or file path) and the exact bytes that support it, and what the correct account is. Then "Reconstructed story" and "Remaining high-value checks". End with a single line VERDICT: COMPLETE or VERDICT: INCOMPLETE.
PROMPT
codex exec -m "${CODEX_MODEL:-gpt-5.6-sol}" --skip-git-repo-check -C "$root" -c model_reasoning_effort=high -o "$out" "$(cat "$prompt")" </dev/null > "${out%.md}.log" 2>&1 || true
rm -f "$prompt"
grep -q '^VERDICT: ' "$out" 2>/dev/null || { echo "no VERDICT line in $out; read ${out%.md}.log and rerun" >&2; exit 1; }
echo "$out"
