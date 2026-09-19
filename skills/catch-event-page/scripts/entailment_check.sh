#!/usr/bin/env bash
# Entailment pass: a model that did not write the page reads every cited sentence with the
# passage it cites and the record around it, and returns the sentences the record does not
# support in full. Usage: skills/catch-event-page/scripts/entailment_check.sh <subject>/<story> [out.md] [--since <commit>]
# Writes checks/audits/<subject>--<story>-<date>-entailment.md (verdict) and .log (full run).
# With --since, only the blocks changed since that commit are judged: the author's own check
# on the sentences it just wrote, minutes instead of the whole page.
set -euo pipefail
story="${1:?usage: entailment_check.sh <subject>/<story> [out.md] [--since <commit>]}"
shift
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
manifest="$root/checks/manifests/$subject--$slug.json"
out=""; since=""
while [ $# -gt 0 ]; do
  case "$1" in
    --since) since="${2:?--since needs a commit}"; shift 2 ;;
    *) out="$1"; shift ;;
  esac
done
scope="entailment"; [ -n "$since" ] && scope="since-${since:0:8}-entailment"
[ -n "$out" ] || out="$root/checks/audits/$subject--$slug-$(date -u +%Y-%m-%d)-$scope.md"
[ -f "$manifest" ] || { echo "manifest missing: $manifest" >&2; exit 2; }
mkdir -p "$(dirname "$out")"
table="$(mktemp)"; prompt="$(mktemp)"
if [ -n "$since" ]; then
  node "$root/skills/catch-event-page/scripts/claim_table.mjs" "$story" --since "$since" > "$table"
else
  node "$root/skills/catch-event-page/scripts/claim_table.mjs" "$story" > "$table"
fi
if ! grep -q '^| 1 |' "$table"; then
  { echo "No cited block changed since ${since:-the start}; nothing to judge."; echo; echo "Blocks checked: 0; blocks with an unsupported sentence: Critical 0, Major 0, Moderate 0, Minor 0."; echo; echo "VERDICT: ENTAILED"; } > "$out"
  rm -f "$table"; echo "$out"; exit 0
fi
scopeline=""
[ -n "$since" ] && scopeline="Only the blocks whose lines changed since commit $since are listed; the rest of the page was judged before and is not in scope. Counts refer to the listed blocks."
cat > "$prompt" <<PROMPT
You are checking whether each cited sentence on a news page says only what its cited record supports. The page is /events/$story/ in $root (source src/pages/events/$story.astro, manifest $manifest, pinned text files under $root/data/sources/).

$scopeline

Below is the table of every cited block on the page (a paragraph, list item, or caption) with every citation it carries: the record id, the passage the citation points at, and the record's text pin. For every row: open each text pin, find each passage, read the record around it (the whole document, not only the passage), and decide whether the cited records together support the whole block: every number, actor, date, mechanism, causal word, characterization, and scope word in it. A block usually carries several sentences and several citations; a sentence is supported when any of the block's cited records supports it in full. A passage that supports one phrase does not support the sentence around it. A sentence that says more than its records (a mechanism the record does not give, a broader actor, a settled state for something the record calls proposed, a cause the record does not state, a superlative the record does not make) is not supported. A sentence in reader words that says the same thing as the record is supported. A sentence that states what the page could not find or fetch is supported by the working note or manifest, not by a record; report it only if it contradicts them.

Report only the blocks with an unsupported sentence. For each: the row number and line, the sentence bytes, which cited records you checked, what the records actually support (quote it), what in the sentence goes beyond them, and a materiality (Critical, Major, Moderate, Minor). Then one line with the counts: blocks checked, blocks with an unsupported sentence by materiality. End with exactly one line: VERDICT: ENTAILED if no block is Critical or Major, otherwise VERDICT: NOT-ENTAILED.

Rules: do not edit any file; do not run git commit, git reset, git checkout, or any command that mutates repository state; do not kill, restart, or signal any process you did not start. No em dashes anywhere in your output. Read the pins from disk; do not use the network.

$(cat "$table")
PROMPT
codex exec -m "${CODEX_MODEL:-gpt-5.6-sol}" --skip-git-repo-check -C "$root" -c model_reasoning_effort=high -o "$out" "$(cat "$prompt")" </dev/null > "${out%.md}.log" 2>&1 || true
rm -f "$prompt" "$table"
grep -q '^VERDICT: ' "$out" 2>/dev/null || { echo "no VERDICT line in $out; read ${out%.md}.log and rerun" >&2; exit 1; }
echo "$out"
