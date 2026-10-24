#!/usr/bin/env zsh
# usage: reads.sh <subject>--<slug> <round>
# The cold retell: a fresh reader reads the built story once and retells it in five sentences.
set -euo pipefail
story=$1 round=$2
here=${0:A:h}
subject=${story%%--*} slug=${story#*--}
page=src/pages/events/$subject/$slug.astro
html=dist/events/$subject/$slug/index.html
mkdir -p checks/reads
[[ $html -nt $page ]] || { print "build first: $html is older than $page" >&2; exit 1 }
PAGE="$(python3 $here/page_text.py $html)" python3 -c '
import os, sys
print(open(sys.argv[1]).read().replace("{PAGE}", os.environ["PAGE"]))' $here/../assets/retell-prompt.txt |
  claude -p --model sonnet > checks/reads/$story-r$round-retell.md
print "retell -> checks/reads/$story-r$round-retell.md"
