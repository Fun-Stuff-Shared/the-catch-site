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

# The manifest's pins, judged in canonical spelling before anything is written: a pin that
# leaves data/sources/ (through ".." or an absolute path) stops the turn here.
pins=(); escaped=0
while IFS= read -r pin; do pins+=("$pin"); done < <(node -e '
  const m = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
  for (const r of m.records ?? []) for (const k of ["pinned_path", "text_path"]) if (r[k]) console.log(r[k]);' "$manifest")
while IFS= read -r bad; do echo "the manifest pins a path outside data/sources/: $bad" >&2; escaped=1; done < <(
  printf '%s\n' ${pins[@]+"${pins[@]}"} | node -e '
    const p = require("path").posix;
    for (const line of require("fs").readFileSync(0, "utf8").split("\n"))
      if (line && !/^data\/sources\/(?!news-state\/)/.test(p.normalize(line))) console.log(line);')
[ $escaped = 0 ] || exit 2

node skills/catch-event-page/scripts/sources_ledger.mjs "$manifest" || exit 1
# The record turn has no narrative yet, so the gate lets section_grammar stay unattested
# for this build only; the story turn and every hosted build require it true.
turn=; [ "$kind" = record ] && turn=record
echo "== build"; CATCH_TURN=$turn npm run build > .finish-build.log 2>&1 || { tail -40 .finish-build.log; echo "BUILD FAILED (full log: .finish-build.log)"; exit 1; }
echo "build green"
fail=0
echo "== lens_lint"; node skills/catch-event-page/scripts/lens_lint.mjs "$page" || fail=1
echo "== quote_lint"; node skills/catch-event-page/scripts/quote_lint.mjs "$page" || fail=1
echo "== voice_lint"; skills/catch-event-page/scripts/voice_lint.sh "dist/events/$story/index.html" || fail=1
[ $fail = 0 ] || { echo "LINT FAILED: fix the sentences above, then run finish.sh again"; exit 1; }

# The story's own artifacts: its page, the data modules that page imports, the subject's
# data module (turn one refreshes its KPIs, and a worktree holds one story, so that
# refresh is this story's), the files its manifest pins, and its check files, owned whole.
# Files every story writes a line into (the homepage, the story index, the subject page,
# the ledger, the route list) are shared: a change there is this story's only where the
# changed lines name it, so each hunk must carry the slug, a pinned path or one of the
# page's own data modules.
subject_page="src/pages/events/$subject/index.astro"
shared=("src/pages/index.astro" "src/lib/discovery.mjs" "$subject_page" "data/sources/SOURCES.md" "checks/routes.txt")
imports() { grep -oE "from ['\"][^'\"]*data/[^'\"]+['\"]" "$1" | sed -E "s/from ['\"](.*)['\"]/\1/" | while IFS= read -r spec; do echo "$(dirname "$1")/$spec"; done; }
modules=(); page_modules=()
while IFS= read -r m; do modules+=("$m"); page_modules+=("$m"); done < <(imports "$page")
if [ -f "$subject_page" ]; then while IFS= read -r m; do modules+=("$m"); done < <(imports "$subject_page"); fi
owned=("$page" "$manifest" "${shared[@]}" ${modules[@]+"${modules[@]}"} ${pins[@]+"${pins[@]}"})
while IFS= read -r f; do owned+=("$f"); done < <(git ls-files --others --exclude-standard --modified -- \
  "checks/working-notes/$subject--$slug*" "checks/reader-models/$subject--$slug*" \
  "checks/interrogations/$subject--$slug*" "checks/audits/$subject--$slug*" | grep -v '\.md\.err$')

# Every other path is judged in its canonical spelling too: one that leaves the repo is
# refused, and a generated namespace reached through ".." is caught by the filter below.
canon=()
while IFS=$'\t' read -r orig norm; do
  case "$norm" in
    /*|..|../*) echo "a path the page or manifest names leaves the repo: $orig" >&2; escaped=1;;
    *) canon+=("$norm");;
  esac
done < <(printf '%s\n' "${owned[@]}" | node -e '
  const p = require("path").posix;
  for (const line of require("fs").readFileSync(0, "utf8").split("\n")) if (line) console.log(line + "\t" + p.normalize(line));')
[ $escaped = 0 ] || exit 2

paths=()
while IFS= read -r -d '' f; do paths+=("$f"); done < <(
  printf '%s\0' ${canon[@]+"${canon[@]}"} | sort -zu | while IFS= read -r -d '' f; do
    [ -e "$f" ] || continue
    printf '%s' "$f" | grep -Eq "$generated" && { echo "refusing a generated path the page or manifest names: $f" >&2; continue; }
    if [ -n "$(git status --porcelain --untracked-files=all -- "$f")" ]; then printf '%s\0' "$f"; fi
  done)

tokens=("$slug" ${pins[@]+"${pins[@]}"})
for m in ${page_modules[@]+"${page_modules[@]}"}; do tokens+=("$(basename "$m")"); done
# A shared file may name the story's data module only by the name it imports it under (the
# discovery map does), and the series registry names a new subject only by its path.
for f in "${shared[@]}"; do
  [ -f "$f" ] || continue
  while IFS= read -r b; do tokens+=("$b"); done < <(node -e '
    const fs = require("fs"); const [file, ...bases] = process.argv.slice(1);
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^import\s+(.+?)\s+from\s+[\x22\x27]([^\x22\x27]+)[\x22\x27]/); if (!m) continue;
      if (!bases.includes(m[2].split("/").pop())) continue;
      const d = m[1].match(/^([A-Za-z_$][\w$]*)\s*(,|$)/); if (d) console.log(d[1]);
      for (const r of m[1].matchAll(/\bas\s+([A-Za-z_$][\w$]*)/g)) console.log(r[1]);
    }' "$f" $(for m in ${page_modules[@]+"${page_modules[@]}"}; do basename "$m"; done))
done
tokens+=("path: '/events/$subject/'" "path: \"/events/$subject/\"")
foreign=0
for f in $(printf '%s\n' "${shared[@]}" | node -e 'const p=require("path").posix;for(const l of require("fs").readFileSync(0,"utf8").split("\n"))if(l)console.log(p.normalize(l))'); do
  printf '%s\n' ${paths[@]+"${paths[@]}"} | grep -Fqx "$f" || continue
  while IFS= read -r hunk; do
    body="$(git diff -U0 -- "$f" | awk -v h="$hunk" '$0 == h {p=1; next} /^@@/ {p=0} p')"
    printf '%s\n' "$body" | grep -Fq -f <(printf '%s\n' "${tokens[@]}") && continue
    echo "$f has a change that does not name this story ($hunk); revert it or commit it yourself first" >&2; foreign=1
  done < <(git diff -U0 -- "$f" | grep '^@@')
done
[ $foreign = 0 ] || exit 2

# One author, one story, one clean worktree: any other change in the tree is a mistake to
# resolve, never something to commit alongside or leave behind silently.
stray=$(git status --porcelain --untracked-files=all | cut -c4- | grep -Ev "$generated" | grep -Ev '\.md\.err$' \
  | grep -Fvx -f <(printf '%s\n' ${paths[@]+"${paths[@]}"}) || true)
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
