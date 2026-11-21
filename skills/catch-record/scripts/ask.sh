#!/usr/bin/env zsh
# usage: ask.sh <prompt-file> <answer-file> [--inline FILE | -f FILE]...
# Sends the prompt, with each --inline file pasted after it and each -f file attached, to GPT-6 Sol (high) in ChatGPT Web
# through the running Codex Web GPT launcher (the chatgpt-web-ask skill), and writes the answer.
# One ask at a time across all sessions: the launcher holds five ChatGPT tabs, shared with
# Codex bridge tasks. A failure reports whether ChatGPT got the message (submitted). Exit 3
# (launcher not running) and 4 (signed out) are the human's to fix.
# CATCH_ASK_LOCK_TIMEOUT sets the lock wait in seconds (default 1800).
set -euo pipefail
path=($HOME/.bun/bin $path)
prompt=${1:A} answer=${2:A}; shift 2
files=(); while (( $# )); do files+=($1 ${2:A}); shift 2; done
checkout=/Volumes/4/GitHub/codex-chatgpt-web
lock=/Volumes/4/tmp/chatgpt-web-ask.lock
lock_timeout=${CATCH_ASK_LOCK_TIMEOUT:-1800}
if [[ ! $lock_timeout =~ '^[0-9]{1,9}$' ]]; then
  print -u2 "ask: CATCH_ASK_LOCK_TIMEOUT must be a nonnegative integer in seconds (up to nine digits)"
  exit 2
fi
lock_timeout=$(( 10#$lock_timeout ))
mkdir -p ${lock:h}
SECONDS=0
waiting=0
while ! mkdir $lock 2>/dev/null; do
  remaining=$(( lock_timeout - SECONDS ))
  if (( remaining <= 0 )); then
    holder=unavailable
    if [[ -f $lock/holder ]]; then holder=$(cat $lock/holder 2>/dev/null) || holder=unavailable; fi
    print -u2 "ask: timed out after ${lock_timeout}s waiting for lock $lock; holder: ${holder:-unavailable}"
    exit 1
  fi
  if (( ! waiting )); then
    print -u2 "ask: waiting for lock $lock (up to ${lock_timeout}s)"
    waiting=1
  fi
  sleep $(( remaining < 5 ? remaining : 5 ))
done
trap 'rm -f $lock/holder; rmdir $lock' EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
print -r -- "pid=$$ host=$(hostname) user=$(id -un) command=${0:t}" > $lock/holder
cd $checkout
[[ $(git branch --show-current) == feat/ask ]] || { print "ask: $checkout is not on feat/ask" >&2; exit 2 }
code=0
bun run src/cli.ts ask --model gpt-6-sol --effort high --detach --json \
  --prompt-file $prompt $files > $answer.sent 2> $answer.log || code=$?
[[ -s $answer.sent ]] || { print "ask: the launcher wrote nothing, so nothing reached ChatGPT (exit $code): $(<$answer.log)" >&2; exit 1 }
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
