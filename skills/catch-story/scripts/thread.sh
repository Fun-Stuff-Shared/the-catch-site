#!/usr/bin/env zsh
# usage: thread.sh <subject>--<slug> <round>
set -euo pipefail
story=$1 round=$2
here=${0:A:h}
subject=${story%%--*} slug=${story#*--}
page=src/pages/events/$subject/$slug.astro
html=dist/events/$subject/$slug/index.html
mkdir -p checks/reads
[[ $html -nt $page ]] || { print "build first: $html is older than $page" >&2; exit 1 }
python3 $here/thread.py $html $here/../assets/thread-prompt.txt checks/reads/$story-r$round-thread.md
