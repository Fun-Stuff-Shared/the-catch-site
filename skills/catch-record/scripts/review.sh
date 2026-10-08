#!/usr/bin/env zsh
# usage: review.sh <subject>--<slug> <round>
set -euo pipefail
story=$1 round=$2
here=${0:A:h}
wt=$PWD
report=checks/records/$story-review-r$round.md
work=$(mktemp -d -t catch-review)
prompt=$work/prompt.txt
BRIEF=checks/records/$story.md MANIFEST=checks/manifests/$story.json DATE=$(date +%F) python3 -c '
import os, sys
t = open(sys.argv[1]).read()
for k in ("BRIEF", "MANIFEST", "DATE"):
    t = t.replace("{" + k + "}", os.environ[k])
print(t)' $here/../assets/review-prompt.txt > $prompt
for attempt in 1 2 3; do
  rm -f $report
  codex exec -m chatgpt-web/high --skip-git-repo-check -C $wt -c model_reasoning_effort=high \
    -o $report "$(cat $prompt)" </dev/null > $work/attempt$attempt.log 2>&1 || true
  if [[ -s $report ]] && tail -1 $report | grep -qE 'RECORD (COMPLETE|INCOMPLETE)'; then
    print "review r$round -> $report: $(tail -1 $report)"
    exit 0
  fi
  print "review r$round attempt $attempt ended without a verdict: $(tail -1 $work/attempt$attempt.log)" >&2
done
print "review r$round failed three times; logs in $work" >&2
exit 1
