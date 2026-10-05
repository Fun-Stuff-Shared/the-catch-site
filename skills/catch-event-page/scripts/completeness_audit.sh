#!/usr/bin/env bash
# Audit of a built story page by a model that did not write it, run under two skills: the subject
# is reconstructed from its history and system first (skills/contextual-reconstruction/), then the
# page is audited against that reconstruction (skills/story-completeness-audit/): verification,
# discovery outside the frame, output schema leading with what is missing. It runs on the record
# commit before any prose, and again at the close on the finished page (AUDIT_STAGE=closing).
# Usage: skills/catch-event-page/scripts/completeness_audit.sh <subject>/<story> [out.md]
# Writes the audit to checks/audits/<subject>--<story>-<date>.md and the full run to .log.
# What to do with the verdict: SKILL.md, "After you commit".
set -euo pipefail
story="${1:?usage: completeness_audit.sh <subject>/<story> [out.md]}"
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
html="$root/dist/events/$story/index.html"
page="$root/src/pages/events/$story.astro"
manifest="$root/checks/manifests/$subject--$slug.json"
rm="$root/checks/reader-models/$subject--$slug.md"
[ -f "$manifest" ] || manifest="$root/checks/manifests/$subject--${slug%-*}.json"
skill="$root/skills/story-completeness-audit"
context="$root/skills/contextual-reconstruction"
held="$root/checks/working-notes/$subject--$slug-held.md"
out="${2:-$root/checks/audits/$subject--$slug-$(date -u +%Y-%m-%d).md}"
[ -f "$html" ] || { echo "build first: $html is missing" >&2; exit 2; }
[ -f "$manifest" ] || { echo "manifest missing for $story" >&2; exit 2; }
[ -f "$skill/SKILL.md" ] || { echo "skill missing: $skill/SKILL.md" >&2; exit 2; }
[ -f "$context/SKILL.md" ] || { echo "skill missing: $context/SKILL.md" >&2; exit 2; }
stage=""
if [ "${AUDIT_STAGE:-}" = closing ]; then
  prior="$({ ls "$root/checks/audits/$subject--$slug-"*.md 2>/dev/null || true; } | { grep -v -F "$out" || true; } | tr '\n' ' ')"
  stage="This is the closing audit of a finished story that has been through review. The earlier reports on this page are ${prior:-none}; the editor's held list is $held when that file exists (decided, not open). Do not report a held item. Tag a finding an earlier report already made as a repeat and name the report; everything else is new.

"
fi
mkdir -p "$(dirname "$out")"
prompt="$(mktemp)"
cat > "$prompt" <<PROMPT
Read and follow, in full and in this order, before doing anything else:
  $context/SKILL.md
  $context/references/reconstruction-workflow.md
  $context/references/developing-events.md
  $skill/SKILL.md
  $skill/references/investigation-workflow.md
  $skill/references/output-schema.md
Reconstruct first and audit second, as the first skill's boundary section says: establish from the records and live research what happened, the history behind it (what changed, when, and who changed it), each side's own account of a dispute in the terms that side uses, and what follows; then compare the page against that reconstruction. A dispute the page tells from one side, with the other side reduced to a clause, is a Major omission, and so is a history the page starts later than the change both sides argue from.

${stage}The second skill's files define the audit: three separate layers (verification, completeness discovery outside the article's frame, independent reconstruction), the backward, forward, and horizontal searches, the omission classes, lineage counting, materiality ranking, the completion standard, and the output schema. Apply them as written. The completion standard is binding: do not return a verdict because every sentence is cited or several outlets agree.

The article: the built page $html (source $page, data module under $root/src/data/). Its records are listed in $manifest with pinned files under $root/data/sources/. Read the complete page first, then expand outward. Follow every citation the page's own sources make to its underlying record (a video's on-screen source slate, a story's linked filing, a release's dataset). Read every video pin frame by frame (ffmpeg -vf fps=1) as well as its transcript.

The author's reader model is at $rm when that file exists: seven one-sentence answers (what happened, why it matters, the easiest wrong reading, the one concept, what changed, what is unresolved, the questions a stranger asks next) and a materiality grade A to D for every passage of the record (A changes the event, B changes the reading, C strengthens the proof, D changes no answer). Grade every omission against it: a passage the author graded A or B that the story view does not carry is Major; a passage graded C or D that in fact changes one of the seven answers is Major against the grade, and you name which answer changes; an omitted C is Minor; D is never a finding. The story view is meant to carry A and B only, so do not report C or D material as missing from the story when Just the facts or Show the work carries it. When the file does not exist, say so and grade as before.

Rules: do not edit any file; do not run git commit, git reset, git checkout, or any command that mutates repository state; do not kill, restart, or signal any process you did not start. Use the network for live records and coverage; prefer primary sources. No em dashes anywhere in your output.

Output in the audit schema's nine sections, leading with "What You're Missing"; the reconstruction is the basis of the independent reconstruction section and is not printed as a separate report. Every finding names its materiality (Critical, Major, Moderate, Minor, Cosmetic), quotes the page bytes, names the record (URL or file path) with the exact bytes that support it, and states the correct account. Then end with exactly one line: VERDICT: COMPLETE if the completeness verdict is substantially complete or mostly complete with minor omissions, otherwise VERDICT: INCOMPLETE. If access prevents the completion standard, say the audit is bounded, list the remaining high-value checks, and return VERDICT: INCOMPLETE.
PROMPT
codex exec -m "${CODEX_MODEL:-chatgpt-web/gpt-5.6-sol}" --skip-git-repo-check -C "$root" -c model_reasoning_effort=high -o "$out" "$(cat "$prompt")" </dev/null > "${out%.md}.log" 2>&1 || true
rm -f "$prompt"
grep -q '^VERDICT: ' "$out" 2>/dev/null || { echo "no VERDICT line in $out; read ${out%.md}.log and rerun" >&2; exit 1; }
echo "$out"
