#!/usr/bin/env zsh
# usage: ask.sh <prompt-file> <answer-file> [--inline FILE | -f FILE]...
# Sends the prompt, with each --inline file pasted after it and each -f file attached, to GPT-6 Sol (high) in ChatGPT Web
# through the running Codex Web GPT launcher (the chatgpt-web-ask skill), and writes the answer.
# One ask at a time across all sessions: the launcher holds five ChatGPT tabs, shared with
# Codex bridge tasks. A failure reports whether ChatGPT got the message (submitted). Exit 3
# (launcher not running) and 4 (signed out) are the human's to fix.
set -euo pipefail
prompt=${1:A} answer=${2:A}; shift 2
files=(); while (( $# )); do files+=($1 ${2:A}); shift 2; done
checkout=/Volumes/4/GitHub/codex-chatgpt-web
lock=/Volumes/4/tmp/chatgpt-web-ask.lock
mkdir -p ${lock:h}
for i in {1..360}; do mkdir $lock 2>/dev/null && break; (( i == 360 )) && { print "ask: lock held for 30 minutes: $lock" >&2; exit 1 }; sleep 5; done
trap 'rmdir $lock 2>/dev/null' EXIT INT TERM
cd $checkout
[[ $(git branch --show-current) == feat/ask ]] || { print "ask: $checkout is not on feat/ask" >&2; exit 2 }
code=0
bun run src/cli.ts ask --model gpt-6-sol --effort high --detach --json \
  --prompt-file $prompt $files > $answer.sent 2> $answer.log || code=$?
run=$(python3 - $answer.sent <<'PY'
import json, sys
r = json.load(open(sys.argv[1]))
if not r.get("ok"):
    e = r.get("error", {})
    sys.exit(f"ask: {e.get('code')} (exit {e.get('exitCode')}, submitted {r.get('submitted')}): {e.get('message')}")
print(r["run"])
PY
)
code=0; bun run src/cli.ts ask --wait $run --timeout 3600 --json > $answer.json 2>> $answer.log || code=$?
python3 - $answer.json $answer <<'PY'
import json, sys
r = json.load(open(sys.argv[1]))
if not r.get("ok"):
    e = r.get("error", {})
    sys.exit(f"ask: {e.get('code')} (exit {e.get('exitCode')}, submitted {r.get('submitted')}): {e.get('message')}")
open(sys.argv[2], "w").write(r["text"].rstrip() + "\n")
print(f"ask: {r.get('conversation', {}).get('url', '')}", file=sys.stderr)
PY
rm -f $answer.sent $answer.json $answer.log
