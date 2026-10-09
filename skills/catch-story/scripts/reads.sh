#!/usr/bin/env zsh
# usage: reads.sh <subject>--<slug> <round> [retell|entailment|both]
# The entailment read checks only the blocks changed since the last round it passed on this
# machine; FULL=1 checks the whole page.
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
  work=$(mktemp -d /Volumes/4/tmp/catch-entailment.XXXXXX)
  fill $page $here/../assets/entailment-prompt.txt > $work/prompt.txt
  checked=/Volumes/4/tmp/catch-reads/$story; mkdir -p $checked
  base=($checked/r*.html(Nom[1]))
  [[ -n ${FULL:-} ]] && base=
  python3 $here/evidence_pack.py $story $html $work/evidence.md ${base:+$base}
  for attempt in 1 2 3; do
    zsh $here/../../catch-record/scripts/ask.sh $work/prompt.txt $work/answer.md $work/evidence.md || { print "entailment: the ask failed; see above" >&2; exit 1 }
    if grep -v '^[[:space:]]*$' $work/answer.md | tail -1 | tr -d '`*' | sed 's/ *$//' | grep -qE '^(ENTAILED|NOT ENTAILED)$' &&
       grep -v '^[[:space:]]*$' $work/answer.md | tail -2 | head -1 | tr -d '`*' | sed 's/ *$//' | grep -qE '^CHECKED: [1-9][0-9]* blocks, [1-9][0-9]* citations$'; then
      cp $work/answer.md $report
      cp $html $checked/r$round.html
      print "entailment -> $report: $(tail -2 $report | head -1); $(tail -1 $report)"
      exit 0
    fi
    print "entailment attempt $attempt ended without an audited verdict: $(tail -2 $work/answer.md | tr '\n' ' ')" >&2
  done
  exit 1
fi
