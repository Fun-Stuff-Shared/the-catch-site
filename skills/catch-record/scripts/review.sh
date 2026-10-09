#!/usr/bin/env zsh
# usage: review.sh <subject>--<slug> <round>
set -euo pipefail
story=$1 round=$2
here=${0:A:h}
report=checks/records/$story-review-r$round.md
work=$(mktemp -d /Volumes/4/tmp/catch-review.XXXXXX)
prompt=$work/prompt.txt
DATE=$(date +%F) python3 -c '
import os, sys
t = open(sys.argv[1]).read()
for k in ("DATE",):
    t = t.replace("{" + k + "}", os.environ[k])
print(t)' $here/../assets/review-prompt.txt > $prompt
for attempt in 1 2 3; do
  zsh $here/ask.sh $prompt $work/answer.md checks/records/$story.md || { print "review r$round: the ask failed; see above" >&2; exit 1 }
  if grep -v '^[[:space:]]*$' $work/answer.md | tail -1 | tr -d '`*' | sed 's/ *$//' | grep -qE '^RECORD (COMPLETE|INCOMPLETE)$' &&
     grep -v '^[[:space:]]*$' $work/answer.md | tail -2 | head -1 | tr -d '`*' | sed 's/ *$//' | grep -qE '^READ: [1-9][0-9]* sections$'; then
    cp $work/answer.md $report
    print "review r$round -> $report: $(tail -2 $report | head -1); $(tail -1 $report)"
    exit 0
  fi
  print "review r$round attempt $attempt ended without an audited verdict: $(tail -2 $work/answer.md | tr '\n' ' ')" >&2
done
print "review r$round failed three times; answers in $work" >&2
exit 1
