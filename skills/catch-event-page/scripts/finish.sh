#!/usr/bin/env bash
# Ends an authoring turn: ledger rows for new sources, the build with its gate, the three
# lints, then one commit by explicit path. The author writes; this does the rest.
# Usage: skills/catch-event-page/scripts/finish.sh <subject>/<story> record|story [--no-commit]
# Exit 1 when the build or a lint fails (nothing is committed); the output names the failure.
set -uo pipefail
story="${1:?usage: finish.sh <subject>/<story> record|story [--no-commit]}"
kind="${2:?usage: finish.sh <subject>/<story> record|story [--no-commit]}"
case "$kind" in record|story) ;; *) echo "second argument is record or story" >&2; exit 2;; esac
commit=1; [ "${3:-}" = "--no-commit" ] && commit=0
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"; cd "$root"
page="src/pages/events/$subject/$slug.astro"
[ -f "$page" ] || { echo "no page at $page" >&2; exit 2; }
[ -f "checks/manifests/$subject--$slug.json" ] || { echo "no manifest at checks/manifests/$subject--$slug.json" >&2; exit 2; }

node skills/catch-event-page/scripts/sources_ledger.mjs "checks/manifests/$subject--$slug.json" || exit 1
echo "== build"; npm run build > .finish-build.log 2>&1 || { tail -40 .finish-build.log; echo "BUILD FAILED (full log: .finish-build.log)"; exit 1; }
echo "build green"
fail=0
echo "== lens_lint"; node skills/catch-event-page/scripts/lens_lint.mjs "$page" || fail=1
echo "== quote_lint"; node skills/catch-event-page/scripts/quote_lint.mjs "$page" || fail=1
echo "== voice_lint"; skills/catch-event-page/scripts/voice_lint.sh "dist/events/$story/index.html" || fail=1
[ $fail = 0 ] || { echo "LINT FAILED: fix the sentences above, then run finish.sh again"; exit 1; }

# Everything the turn wrote, by path, and nothing the build generated.
paths=$(git status --porcelain --untracked-files=all | cut -c4- \
  | grep -E "^(src/pages/events/$subject/|src/pages/index\.astro|src/data/|checks/(manifests|working-notes|reader-models|interrogations|audits)/|data/sources/)" \
  | grep -Ev "^(data/sources/(officials|news-state)/|src/data/news-records\.json)|\.md\.err$" || true)
[ -n "$paths" ] || { echo "nothing to commit"; exit 0; }
echo "== files"; echo "$paths"
[ $commit = 1 ] || { echo "(--no-commit: stopping here)"; exit 0; }
echo "$paths" | xargs git add -- && git -c commit.gpgsign=false commit -q -m "$kind: $subject/$slug" \
  && echo "committed $(git rev-parse --short HEAD)  $kind: $subject/$slug" \
  && echo "page: dist/events/$story/index.html"
