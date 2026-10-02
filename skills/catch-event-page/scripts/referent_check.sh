#!/usr/bin/env bash
# Referent check: a model that did not write the page reads the sentences a turn or a patch
# added the way a stranger meets them, top down, and returns the ones that lean on something
# the page has not yet said: a demonstrative with no referent, a bare surname, a role with no
# holder, a named rule or case with no consequence. The stranger read finds these a round
# later; this is the author's own check before the commit.
# Usage: skills/catch-event-page/scripts/referent_check.sh <subject>/<story> [out.md] [--since <commit>]
# Reads the built page (dist/events/<story>/index.html): build first. With --since, the page
# at that commit is built in a throwaway worktree against the state this build read, and only
# the sentences that earlier page did not show the story reader, or showed in another order,
# are judged.
# Writes checks/audits/<subject>--<story>-<date>-referents.md (verdict) and .log (full run).
# Exit 1 on VERDICT: STALLS or when the run returns no verdict.
set -euo pipefail
story="${1:?usage: referent_check.sh <subject>/<story> [out.md] [--since <commit>]}"
shift
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
scripts="$root/skills/catch-event-page/scripts"
. "$scripts/page_builds.sh"
out=""; since=""
while [ $# -gt 0 ]; do
  case "$1" in
    --since) since="${2:?--since needs a commit}"; shift 2 ;;
    *) out="$1"; shift ;;
  esac
done
scope="referents"; [ -n "$since" ] && scope="since-${since:0:8}-referents"
[ -n "$out" ] || out="$root/checks/audits/$subject--$slug-$(date -u +%Y-%m-%d)-$scope.md"
html="$(built_page "$root" "$story")" || exit 2
mkdir -p "$(dirname "$out")"
pagetxt="${out%.md}-page.txt"; list="$(mktemp)"; before="$(mktemp)"; prompt="$(mktemp)"
python3 "$scripts/page_text.py" "$html" > "$pagetxt"
if [ -n "$since" ]; then
  earlier="$(mktemp)"
  earlier_page "$root" "$story" "$since" "$earlier" "${out%.md}-earlier-build.log" || { rm -f "$earlier"; exit 2; }
  : > "$before"; [ ! -s "$earlier" ] || python3 "$scripts/page_text.py" "$earlier" > "$before"
  rm -f "$earlier"
  python3 "$scripts/added_sentences.py" "$pagetxt" "$before" > "$list"
else
  python3 "$scripts/added_sentences.py" "$pagetxt" > "$list"
fi
if ! grep -q '^1\. ' "$list"; then
  { echo "No story-view sentence was added since ${since:-the start}; nothing to judge."; echo; echo "VERDICT: CLEAR"; } > "$out"
  rm -f "$list" "$before" "$prompt" "$pagetxt"; echo "$out"; exit 0
fi
cat > "$prompt" <<PROMPT
You are reading a news page as a stranger would: someone smart who reads a general newspaper, has never seen this project or its other pages, and reads this page once from the top. The page text, one block per line in reading order, is at $pagetxt. Open that file and nothing else. Do not use the network. Do not edit any file; do not run any command that changes repository state; do not kill, restart, or signal any process you did not start.

Below are the sentences that were just written or changed. For each one, find it in the page text and judge it using only what the page says above it and inside the sentence itself. A sentence stalls when it leans on one of these four things:

1. A demonstrative or a definite phrase standing for one specific thing ("this decision", "that order", "the paper", "the letter", "the move") when the page has not yet said which one.
2. A bare surname, or a person named with no role, when the page has not yet given the full name and what the person is.
3. A role or title ("the pool chair", "the judge", "the agency") the sentence depends on, when the page has not yet said who holds it or what it does here.
4. A named policy, rule, case, program or document ("the 1977 precedent") with no words, there or earlier, saying what it does in this story.

Report only the sentences that stall, one numbered item each: the list number, the sentence bytes exactly, the class (1 to 4), the words with no referent, and where the page later supplies the referent if it does. Report nothing else (style, length, sourcing are not in scope) and propose no rewrites. Then one line with the count per class. End with exactly one line: VERDICT: CLEAR if no sentence stalls, otherwise VERDICT: STALLS. No em dashes anywhere in your output.

$(cat "$list")
PROMPT
codex exec -m "${CODEX_MODEL:-gpt-6-sol}" -s read-only --skip-git-repo-check -C "$root" -c model_reasoning_effort=medium -o "$out" "$(cat "$prompt")" </dev/null > "${out%.md}.log" 2>&1 || true
rm -f "$prompt" "$list" "$before"
grep -q '^VERDICT: ' "$out" 2>/dev/null || { echo "no VERDICT line in $out; read ${out%.md}.log and rerun" >&2; exit 1; }
echo "$out"; grep '^VERDICT: ' "$out"
grep -q '^VERDICT: CLEAR' "$out"
