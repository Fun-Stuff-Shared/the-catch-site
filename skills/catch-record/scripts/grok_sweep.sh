#!/usr/bin/env zsh
# usage: grok_sweep.sh <subject>--<slug> "<the event, in two or three dated sentences>"
set -euo pipefail
story=$1 event=$2
here=${0:A:h}
out=checks/records/$story-grok.md
mkdir -p checks/records
prompt=$(EVENT=$event DATE=$(date +%F) python3 -c '
import os, sys
t = open(sys.argv[1]).read()
print(t.replace("{EVENT}", os.environ["EVENT"]).replace("{DATE}", os.environ["DATE"]))' $here/../assets/grok-prompt.txt)
grok -p "$prompt" --output-format plain > $out 2> $out.err
print "grok sweep -> $out ($(wc -l < $out) lines)"
