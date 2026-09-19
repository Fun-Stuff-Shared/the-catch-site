#!/usr/bin/env bash
# Ends an authoring turn: ledger rows for the manifest's pins, the build with its gate, the
# three lints, then one commit holding only this story's artifacts. The author writes; this
# does the rest.
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
manifest="checks/manifests/$subject--$slug.json"
[ -f "$page" ] || { echo "no page at $page" >&2; exit 2; }
[ -f "$manifest" ] || { echo "no manifest at $manifest" >&2; exit 2; }
if [ $commit = 1 ] && ! git diff --cached --quiet; then
  echo "the index already holds staged files; commit or unstage them first:" >&2; git diff --cached --name-only >&2; exit 2
fi
generated='^(data/state/|src/data/news-records\.json$|data/sources/news-state/|\.finish-build\.log$)'

node skills/catch-event-page/scripts/sources_ledger.mjs "$manifest" || exit 1
echo "== build"; npm run build > .finish-build.log 2>&1 || { tail -40 .finish-build.log; echo "BUILD FAILED (full log: .finish-build.log)"; exit 1; }
echo "build green"
fail=0
echo "== lens_lint"; node skills/catch-event-page/scripts/lens_lint.mjs "$page" || fail=1
echo "== quote_lint"; node skills/catch-event-page/scripts/quote_lint.mjs "$page" || fail=1
echo "== voice_lint"; skills/catch-event-page/scripts/voice_lint.sh "dist/events/$story/index.html" || fail=1
[ $fail = 0 ] || { echo "LINT FAILED: fix the sentences above, then run finish.sh again"; exit 1; }

# The story's own artifacts: its pages, the data modules those pages import, the files its
# manifest pins, and its check files. Nothing else, whatever else is dirty in the tree.
owned=("$page" "src/pages/events/$subject/index.astro" "src/pages/index.astro" "$manifest"
       "data/sources/SOURCES.md" "checks/routes.txt")
for f in "$page" "src/pages/events/$subject/index.astro" "src/pages/index.astro"; do
  [ -f "$f" ] || continue
  while IFS= read -r spec; do
    rel="$(cd "$(dirname "$f")" && cd "$(dirname "$spec")" 2>/dev/null && pwd)/$(basename "$spec")"
    owned+=("${rel#"$root"/}")
  done < <(grep -oE "from ['\"][^'\"]*data/[^'\"]+['\"]" "$f" | sed -E "s/from ['\"](.*)['\"]/\1/")
done
while IFS= read -r pin; do owned+=("$pin"); done < <(node -e '
  const m = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
  for (const r of m.records ?? []) for (const k of ["pinned_path", "text_path"]) if (r[k]) console.log(r[k]);' "$manifest")
while IFS= read -r f; do owned+=("$f"); done < <(git ls-files --others --exclude-standard --modified -- \
  "checks/working-notes/$subject--$slug*" "checks/reader-models/$subject--$slug*" \
  "checks/interrogations/$subject--$slug*" "checks/audits/$subject--$slug*" | grep -v '\.md\.err$')

paths=()
while IFS= read -r -d '' f; do paths+=("$f"); done < <(
  printf '%s\0' "${owned[@]}" | sort -zu | while IFS= read -r -d '' f; do
    [ -e "$f" ] || continue
    printf '%s' "$f" | grep -Eq "$generated" && { echo "refusing a generated path the page or manifest names: $f" >&2; continue; }
    if [ -n "$(git status --porcelain --untracked-files=all -- "$f")" ]; then printf '%s\0' "$f"; fi
  done)

# One author, one story, one clean worktree: any other change in the tree is a mistake to
# resolve, never something to commit alongside or leave behind silently.
stray=$(git status --porcelain --untracked-files=all | cut -c4- | grep -Ev "$generated" | grep -Ev '\.md\.err$' \
  | grep -Fvx -f <(printf '%s\n' "${paths[@]}") || true)
if [ -n "$stray" ]; then
  echo "the tree holds changes outside this story; revert them or commit them yourself first:" >&2
  printf '  %s\n' $stray >&2; exit 2
fi
[ ${#paths[@]} -gt 0 ] || { echo "nothing to commit"; exit 0; }
echo "== files"; printf '  %s\n' "${paths[@]}"
[ $commit = 1 ] || { echo "(--no-commit: stopping here)"; exit 0; }
git add -- "${paths[@]}" && git -c commit.gpgsign=false commit -q -m "$kind: $subject/$slug" -- "${paths[@]}" \
  && echo "committed $(git rev-parse --short HEAD)  $kind: $subject/$slug" \
  && echo "page: dist/events/$story/index.html"
