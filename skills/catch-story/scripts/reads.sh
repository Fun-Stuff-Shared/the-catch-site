#!/usr/bin/env zsh
# usage: reads.sh <subject>--<slug> <round> [retell|entailment|both]
set -euo pipefail
story=$1 round=$2 which=${3:-both}
here=${0:A:h}
subject=${story%%--*} slug=${story#*--}
page=src/pages/events/$subject/$slug.astro
html=dist/events/$subject/$slug/index.html
out=checks/reads
mkdir -p $out
[[ $html -nt $page ]] || { print "build first: $html is older than $page" >&2; exit 1 }
fill() {
  PAGE=$1 MANIFEST=checks/manifests/$story.json DATA=src/data/$subject-$slug.mjs DATE=$(date +%F) python3 -c '
import os, sys
t = open(sys.argv[1]).read()
for k in ("PAGE", "MANIFEST", "DATA", "DATE"):
    t = t.replace("{" + k + "}", os.environ[k])
print(t)' $2
}
if [[ $which != entailment ]]; then
  fill "$(python3 $here/page_text.py $html)" $here/../assets/retell-prompt.txt |
    claude -p --model sonnet > $out/$story-r$round-retell.md
  print "retell -> $out/$story-r$round-retell.md"
fi
if [[ $which != retell ]]; then
  report=$out/$story-r$round-entailment.md
  prompt=$(fill $page $here/../assets/entailment-prompt.txt)
  for attempt in 1 2 3; do
    rm -f $report
    codex exec -m chatgpt-web/high --skip-git-repo-check -C $PWD -c model_reasoning_effort=high \
      -o $report "$prompt" </dev/null > /dev/null 2>&1 || true
    if [[ -s $report ]] && tail -1 $report | grep -qE '^(ENTAILED|NOT ENTAILED)'; then
      print "entailment -> $report: $(tail -1 $report)"
      exit 0
    fi
    print "entailment attempt $attempt ended without a verdict" >&2
  done
  exit 1
fi
