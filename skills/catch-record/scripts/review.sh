#!/usr/bin/env zsh
# usage: review.sh <subject>--<slug> <round>
set -euo pipefail
story=$1 round=$2
here=${0:A:h}
wt=$PWD
report=checks/records/$story-review-r$round.md
prompt=checks/records/$story-review-r$round.prompt.txt
BRIEF=checks/records/$story.md MANIFEST=checks/manifests/$story.json DATE=$(date +%F) python3 -c '
import os, sys
t = open(sys.argv[1]).read()
for k in ("BRIEF", "MANIFEST", "DATE"):
    t = t.replace("{" + k + "}", os.environ[k])
print(t)' $here/../assets/review-prompt.txt > $prompt
codex exec -m chatgpt-web/high --skip-git-repo-check -C $wt -c model_reasoning_effort=high -o $report "$(cat $prompt)" </dev/null > $report.log 2>&1
print "review r$round -> $report: $(tail -1 $report)"
