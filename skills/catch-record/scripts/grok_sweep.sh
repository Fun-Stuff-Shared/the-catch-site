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
if {
  GROK_LENGTH_SALVAGE=1 grok -p "$prompt" --output-format streaming-json |
    python3 -c '
import json, sys
stop_reason = None
for line in sys.stdin.buffer:
    event = json.loads(line)
    if event["type"] == "text":
        sys.stdout.buffer.write(event["data"].encode("utf-8"))
    elif event["type"] == "end":
        stop_reason = event["stopReason"]
    elif event["type"] == "error":
        sys.exit(event["message"])
if stop_reason != "end_turn":
    sys.exit("Grok did not finish: " + (stop_reason or "missing end event"))
sys.stdout.buffer.write(b"\n")
' > "$out"
} 2> "$out.err"; then
  print "grok sweep -> $out ($(wc -l < $out) lines)"
else
  code=$?
  print -u2 "grok sweep incomplete -> $out (see $out.err)"
  exit $code
fi
