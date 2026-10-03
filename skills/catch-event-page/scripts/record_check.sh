#!/usr/bin/env bash
# The record check: every block of the built page against the passages it cites, then against
# the page's other records and anything published since. With --since, only the blocks changed
# after that commit. Usage: skills/catch-event-page/scripts/record_check.sh <subject>/<story> [out.md] [--since <commit>]
# Writes checks/audits/<subject>--<story>-<date>-records.md (verdict) and .log (full run). Build first.
set -euo pipefail
story="${1:?usage: record_check.sh <subject>/<story> [out.md] [--since <commit>]}"
shift
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
manifest="$root/checks/manifests/$subject--$slug.json"
rm="$root/checks/reader-models/$subject--$slug.md"
ledger="$root/checks/working-notes/$subject--$slug.md"
held="$root/checks/working-notes/$subject--$slug-held.md"
out=""; since=""
while [ $# -gt 0 ]; do
  case "$1" in
    --since) since="${2:?--since needs a commit}"; shift 2 ;;
    *) out="$1"; shift ;;
  esac
done
scope="records"; [ -n "$since" ] && scope="since-${since:0:8}-records"
[ -n "$out" ] || out="$root/checks/audits/$subject--$slug-$(date -u +%Y-%m-%d)-$scope.md"
[ -f "$manifest" ] || { echo "manifest missing: $manifest" >&2; exit 2; }
mkdir -p "$(dirname "$out")"
prior="$({ ls "$root/checks/audits/$subject--$slug-"*.md 2>/dev/null || true; } | { grep -v -F "$out" || true; } | tr '\n' ' ')"
scripts="$root/skills/catch-event-page/scripts"
. "$scripts/page_builds.sh"
built_page "$root" "$story" > /dev/null || exit 2
table="$(mktemp)"; prompt="$(mktemp)"
earlier="$(mktemp)"
if [ -n "$since" ]; then
  earlier_page "$root" "$story" "$since" "$earlier" "${out%.md}-earlier-build.log" || { rm -f "$earlier" "$table" "$prompt"; exit 2; }
fi
python3 "$scripts/claim_table.py" "$story" --earlier "$earlier" > "$table"
rm -f "$earlier"
if ! grep -q '^| 1 |' "$table"; then
  { echo "No block of the page changed since ${since:-the start}; nothing to judge."; echo; echo "Blocks checked: 0; findings: Critical 0, Major 0, Minor 0."; echo; echo "VERDICT: SHIP"; } > "$out"
  rm -f "$table" "$prompt"; echo "$out"; exit 0
fi
scopeline="Every block of the page is listed and in scope."
[ -n "$since" ] && scopeline="Only the blocks the page built at commit $since did not show with the same words and the same citations are listed; the rest of the page was judged before and is not in scope. Counts refer to the listed blocks."
scopeline="$scopeline A row with no citation is text the page shows without a Cite (a headline, a dek, a figure label, a table cell): judge it against the records the manifest lists (open the pins it needs)."
cat > "$prompt" <<PROMPT
Check a news analysis page against its records as its most skeptical reader: a subject-matter expert who knows the records and wants the page to be wrong. The page is /events/$story/ in $root (source src/pages/events/$story.astro, data module under $root/src/data/, manifest $manifest, pinned text files under $root/data/sources/).

$scopeline

Below is the table of the page's blocks (a paragraph, a list item, a card, a table cell or a caption, in the words and numbers the built page shows) with its section and every citation it carries: the record id, the passage the citation points at, and the record's text pin. Work in two passes.

Pass one, each block against what it cites. For every row: open each text pin, find each passage, read the record around it (the whole document, not only the passage), and decide whether the cited records together support the whole block: every number, actor, date, mechanism, causal word, characterization and scope word in it. A block usually carries several sentences and several citations; a sentence is supported when any of the block's cited records supports it in full. A passage that supports one phrase does not support the sentence around it. A sentence that says more than its records is not supported: a stitched or altered quotation, a mechanism or cause the record does not give, an actor or scope wider than the record, a proposed thing written as done, a superlative or "first" the record does not make, two counts compared as if one unit. A sentence in reader words that says the same thing as the record is supported. The headline and the dek are page sentences and are judged like the rest.

Pass two, each block against everything else. Use the page's other pinned records, and the network for the primary records the page rests on and anything published since the page's date.
1. A sentence saying no record shows something (an absence sentence) that any record pinned for this page contradicts, not only the records the sentence names. A sentence that states what the page could not find or fetch is supported by the working note or manifest; report it only if it contradicts them.
2. A record given a subject it does not have: a statement about one thing described as a statement about another, one witness's words placed as the answer to a different document's claim, a dated statement written as the state today.
3. Source authority: a fact credited to an outlet that sits in a pinned primary; a lineage counted twice (syndicated copies, a shared briefing); a document that exists and is not pinned.
4. A later record that makes a sentence false: a ruling, filing or statement after the page's date by an actor the page names.

What the piece should cut, move, explain or add belongs to the editor's read: do not report an omission, a term used before its sentence, a referent, or the order of the page. Do not report style preferences, and do not report a finding you did not verify at a record.

For every finding: a severity tag (Critical, Major, Minor), the row number and section, the sentence bytes, the record (file path or URL) with the exact bytes that support the finding in quotation marks, what in the sentence goes beyond them, and the correct account in one or two sentences. Rank by how much a reader would be misled.

Severity is about what the page says, not what it could have said. Critical: a sentence that is false against its own record, an altered quotation, or a sentence a later record makes false. Major: a sentence the page states that its records do not support (wider actor or scope, a mechanism the record does not give, a forecast written as an outcome, a superlative the record does not make, a record given a subject it does not have, an absence a pinned record contradicts). Minor, never higher: a fact credited to an outlet when a pinned primary carries it, a document that exists and is not pinned while the page correctly attributes the outlet it relies on, a number or label the record supports only after arithmetic the page does not show. A page can be complete without carrying every record that exists.

The author's reader model is at $rm when that file exists: seven one-sentence answers and a materiality grade A to D for every passage of the record. Use it to know what each sentence is for.

The review log. Every earlier report on this page, from any read: ${prior:-none}. The author's ledger of what each round changed and why: $ledger when it exists. The editor's held list, items decided and not open to review: $held when it exists. Read all three before you write. Do not report an item on the held list. Do not repeat a finding from an earlier report unless the ledger says it was patched and the page still carries the defect; then tag it "residual" with the ledger line. Tag every other finding "new".

Close with one line of counts (blocks checked; findings by severity), then exactly one line: VERDICT: SHIP if there is no Critical or Major finding, otherwise VERDICT: NO-SHIP.

Rules: do not edit any file; do not run git commit, git reset, git checkout, or any command that mutates repository state; do not kill, restart, or signal any process you did not start. No em dashes anywhere in your output.

$(cat "$table")
PROMPT
codex exec -m "${CODEX_MODEL:-gpt-6-sol}" --skip-git-repo-check -C "$root" -c model_reasoning_effort=high -o "$out" "$(cat "$prompt")" </dev/null > "${out%.md}.log" 2>&1 || true
rm -f "$prompt" "$table"
grep -q '^VERDICT: ' "$out" 2>/dev/null || { echo "no VERDICT line in $out; read ${out%.md}.log and rerun" >&2; exit 1; }
echo "$out"
