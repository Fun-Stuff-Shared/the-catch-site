#!/usr/bin/env bash
# Red team of a built story page by a model that did not write it: source authority, what the
# page leaves out or overstates, and anything a skeptical reader would refuse, verified from the
# repo files and the model's own web search. Usage: skills/catch-event-page/scripts/red_team.sh <subject>/<story> [out.md]
# Writes checks/audits/<subject>--<story>-<date>-redteam.md (verdict) and .log (full run).
set -euo pipefail
story="${1:?usage: red_team.sh <subject>/<story> [out.md]}"
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
html="$root/dist/events/$story/index.html"
page="$root/src/pages/events/$story.astro"
manifest="$root/checks/manifests/$subject--$slug.json"
rm="$root/checks/reader-models/$subject--$slug.md"
ledger="$root/checks/working-notes/$subject--$slug.md"
held="$root/checks/working-notes/$subject--$slug-held.md"
out="${2:-$root/checks/audits/$subject--$slug-$(date -u +%Y-%m-%d)-redteam.md}"
prior="$(ls "$root/checks/audits/$subject--$slug-"*-redteam*.md 2>/dev/null | grep -v -F "$out" | grep -v '\.log$' | tr '\n' ' ')"
[ -f "$html" ] || { echo "build first: $html is missing" >&2; exit 2; }
[ -f "$manifest" ] || { echo "manifest missing: $manifest" >&2; exit 2; }
if [ -f "$rm" ] && ! grep -q '^## Headline' "$rm"; then echo "$rm has no \"## Headline\"; it predates skills 3.5. Rerun turn two (finish.sh $story structure) before this read." >&2; exit 2; fi
mkdir -p "$(dirname "$out")"
prompt="$(mktemp)"
cat > "$prompt" <<PROMPT
Red-team a finished news analysis page as its most skeptical reader: a subject-matter expert who knows the records and wants the page to be wrong. The page is the built file $html (source $page, data module under $root/src/data/). Its records are listed in $manifest with pinned files and text pins under $root/data/sources/. Read the whole page first, then every pin whole, then use the network freely for the primary records the page rests on and the ones it should have rested on.

Find, and rank by how much a reader would be misled:
1. Sentences the records do not support: stitched or altered quotations, a mechanism or cause the record does not give, an actor or scope wider than the record, a proposed thing written as done, a superlative or "first" the record does not make, two counts compared as if one unit, and a sentence saying no record shows something (an absence sentence) that any record pinned for this page contradicts, not only the records the sentence names. The headline and the dek are page sentences and are judged like the rest.
2. What the page leaves out that a reader of the full record would expect: the first public act before the page's opening, the financing or legal instrument behind a package, the actor receiving money or rights and its own exposure, the denominator of every headline number, the predecessor proceeding, the next release or filing after the page's cutoff, the people it lands on and what changes for them.
3. Source authority: a fact credited to an outlet that sits in a pinned primary; a lineage counted twice (syndicated copies, a shared briefing); a document that exists and is not pinned.
4. What a stranger cannot follow: a term used before its sentence, a number without its comparison, an opening that does not say what happened.

For every finding: a severity tag (Critical, Major, Minor), the page bytes, the record (URL or file path) with the exact bytes that support the finding, and the correct account in one or two sentences. Do not report style preferences, and do not report a finding you did not verify at a record.

Severity is about what the page says, not what it could have said. Critical: a sentence on the page that is false against its own record, or an altered quotation. Major: a sentence the page states that its record does not support (wider actor or scope, a mechanism the record does not give, a forecast written as an outcome, a superlative the record does not make), or a passage the author's reader model graded A that no reading mode carries. Minor, never higher: an omission of any other kind, a fact credited to an outlet when a pinned primary carries it, an instrument that exists and is not pinned while the page correctly attributes the outlet it relies on, a term before its sentence. A page can be complete without carrying every record that exists.

The author's reader model is at $rm when that file exists: seven one-sentence answers (what happened, why it matters, the easiest wrong reading, the one concept, what changed, what is unresolved, the questions a stranger asks next) and a materiality grade A to D for every passage of the record (A changes the event, B changes the reading, C strengthens the proof, D changes no answer). Use it to grade omissions: A omitted from every mode is Major; B omitted from the story view is Minor and you name which answer changes; C and D are never findings as omissions. Placement is the other direction: a story-view paragraph whose cited passages are all graded C or D is Major against the placement; name the paragraph, its records and their grades. The headline is the reader model's own; judge it against answers 1 and 3. When the file does not exist, say so.

The review log. Earlier reports on this page: ${prior:-none}. The author's ledger of what each round changed and why: $ledger when it exists. The editor's held list, items decided and not open to review: $held when it exists. Read all three before you write. Do not report an item on the held list. Do not repeat a finding from an earlier report unless the ledger says it was patched and the page still carries the defect; then tag it "residual" with the ledger line. Tag every other finding "new". A report that re-lists settled items is a failed report.

End with exactly one line: VERDICT: SHIP if there is no Critical or Major finding, otherwise VERDICT: NO-SHIP.

Rules: do not edit any file; do not run git commit, git reset, git checkout, or any command that mutates repository state; do not kill, restart, or signal any process you did not start. No em dashes anywhere in your output.
PROMPT
codex exec -m "${CODEX_MODEL:-gpt-5.6-sol}" --skip-git-repo-check -C "$root" -c model_reasoning_effort=high -o "$out" "$(cat "$prompt")" </dev/null > "${out%.md}.log" 2>&1 || true
rm -f "$prompt"
grep -q '^VERDICT: ' "$out" 2>/dev/null || { echo "no VERDICT line in $out; read ${out%.md}.log and rerun" >&2; exit 1; }
echo "$out"
