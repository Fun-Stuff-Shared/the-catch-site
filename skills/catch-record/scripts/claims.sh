#!/usr/bin/env zsh
# usage: claims.sh <subject>--<slug> <round>
# GPT-6 Sol (high) checks every claim in the ledger that has not held as it reads now; when it
# answers CLAIMS HOLD, those claims are recorded as held.
set -euo pipefail
story=$1 round=$2
here=${0:A:h}
report=checks/records/$story-claims-r$round.md
work=$(mktemp -d /Volumes/4/tmp/catch-claims.XXXXXX)
n=$(python3 -I $here/claims.py pack $story $work/claims.md $work/records.md | sed -E 's/^[^:]*: ([0-9]+) claims.*/\1/')
(( n > 0 )) || { print "claims r$round: every claim already holds as it reads now"; exit 0 }
DATE=$(date +%F) python3 -c '
import os, sys
print(open(sys.argv[1]).read().replace("{DATE}", os.environ["DATE"]))' $here/../assets/claims-prompt.txt > $work/prompt.txt
for attempt in 1 2 3; do
  zsh $here/ask.sh $work/prompt.txt $work/answer.md --inline $work/claims.md -f $work/records.md || { print "claims r$round: the ask failed; see above" >&2; exit 1 }
  verdict=$(grep -v '^[[:space:]]*$' $work/answer.md | tail -1 | tr -d '`*' | sed 's/ *$//')
  if [[ $verdict == "CLAIMS HOLD" || $verdict == "CLAIMS DO NOT HOLD" ]] &&
     grep -v '^[[:space:]]*$' $work/answer.md | tail -2 | head -1 | tr -d '`*' | sed 's/ *$//' | grep -qxF "CHECKED: $n claims"; then
    cp $work/answer.md $report
    [[ $verdict == "CLAIMS HOLD" ]] && python3 -I $here/claims.py hold $story $work/claims.md
    print "claims r$round -> $report: $n claims sent; $(tail -2 $report | head -1); $verdict"
    exit 0
  fi
  print "claims r$round attempt $attempt ended without an audited verdict: $(tail -2 $work/answer.md | tr '\n' ' ')" >&2
done
print "claims r$round failed three times; answers in $work" >&2
exit 1
