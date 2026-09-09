#!/usr/bin/env bash
# Completeness audit of a built story page by a model that did not write it, run under the
# story-completeness-audit skill (skills/story-completeness-audit/): verification, discovery
# outside the frame, independent reconstruction, output schema leading with what is missing.
# Usage: skills/catch-event-page/scripts/completeness_audit.sh <subject>/<story> [out.md]
# Writes the audit to checks/audits/<subject>--<story>-<date>.md and the full run to .log.
# What to do with the verdict: references/completeness-audit.md.
set -euo pipefail
story="${1:?usage: completeness_audit.sh <subject>/<story> [out.md]}"
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
html="$root/dist/events/$story/index.html"
page="$root/src/pages/events/$story.astro"
manifest="$root/checks/manifests/$subject--$slug.json"
[ -f "$manifest" ] || manifest="$root/checks/manifests/$subject--${slug%-*}.json"
skill="$root/skills/story-completeness-audit"
out="${2:-$root/checks/audits/$subject--$slug-$(date -u +%Y-%m-%d).md}"
[ -f "$html" ] || { echo "build first: $html is missing" >&2; exit 2; }
[ -f "$manifest" ] || { echo "manifest missing for $story" >&2; exit 2; }
[ -f "$skill/SKILL.md" ] || { echo "skill missing: $skill/SKILL.md" >&2; exit 2; }
mkdir -p "$(dirname "$out")"
prompt="$(mktemp)"
cat > "$prompt" <<PROMPT
Read and follow, in full and in this order, before doing anything else:
  $skill/SKILL.md
  $skill/references/investigation-workflow.md
  $skill/references/output-schema.md
They define the audit: three separate layers (verification, completeness discovery outside the article's frame, independent reconstruction), the backward, forward, and horizontal searches, the omission classes, lineage counting, materiality ranking, the completion standard, and the output schema. Apply them as written. The completion standard is binding: do not return a verdict because every sentence is cited or several outlets agree.

The article: the built page $html (source $page, data module under $root/src/data/). Its records are listed in $manifest with pinned files under $root/data/sources/. Read the complete page first, then expand outward. Follow every citation the page's own sources make to its underlying record (a video's on-screen source slate, a story's linked filing, a release's dataset). Read every video pin frame by frame (ffmpeg -vf fps=1) as well as its transcript.

Rules: do not edit any file; do not run git commit, git reset, git checkout, or any command that mutates repository state; do not kill, restart, or signal any process you did not start. Use the network for live records and coverage; prefer primary sources. No em dashes anywhere in your output.

Output in the schema's nine sections, leading with "What You're Missing". Every finding names its materiality (Critical, Major, Moderate, Minor, Cosmetic), quotes the page bytes, names the record (URL or file path) with the exact bytes that support it, and states the correct account. Then end with exactly one line: VERDICT: COMPLETE if the completeness verdict is substantially complete or mostly complete with minor omissions, otherwise VERDICT: INCOMPLETE. If access prevents the completion standard, say the audit is bounded, list the remaining high-value checks, and return VERDICT: INCOMPLETE.
PROMPT
codex exec -m "${CODEX_MODEL:-gpt-5.6-sol}" --skip-git-repo-check -C "$root" -c model_reasoning_effort=high -o "$out" "$(cat "$prompt")" </dev/null > "${out%.md}.log" 2>&1 || true
rm -f "$prompt"
grep -q '^VERDICT: ' "$out" 2>/dev/null || { echo "no VERDICT line in $out; read ${out%.md}.log and rerun" >&2; exit 1; }
echo "$out"
