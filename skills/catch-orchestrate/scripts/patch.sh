#!/bin/zsh
# One patch round: check the list's quotes, resume the story author's own session with the
# list, wait, build, run the four reads on the patched commit. Markers and DRIVE.log as in
# drive.sh. Usage: patch.sh <short> <subject> <slug> <round number> <patch list file> [fetched text of a record the list asks to admit ...]
# Ends by writing READY-r<round>; stops with a reason in <dispatch dir>/STOP.
set -uo pipefail
short="${1:?short}"; subject="${2:?subject}"; slug="${3:?slug}"; r="${4:?round}"; list="${5:?patch list}"; list="${list:A}"
extra=("${@:6}"); extra=("${extra[@]:A}")
site=/Volumes/4/GitHub/the-catch-site
out="${DISPATCH_ROOT:-/Volumes/4/scratch-fable-profile/grok-authoring/dispatch}/$short"
wt="$(cat "$out/WORKTREE" 2>/dev/null || echo "$site/.worktrees/$short")"
name="$subject--$slug"; story="$subject/$slug"; m="$name-patch$r"
here="$(cd "$(dirname "$0")" && pwd)"
now() { date -u +%Y-%m-%dT%H:%M:%SZ; }
say() { echo "$(now) $*" >> "$out/DRIVE.log"; }
stop() { say "STOP $*"; echo "$(now) $*" > "$out/STOP"; exit 1; }
zmodload zsh/system
: >> "$out/drive.lock"
zsystem flock -t 30 -f lockfd "$out/drive.lock" || { echo "could not take $out/drive.lock" >&2; exit 2; }
other="$(cat "$out/drive.pid" 2>/dev/null)"
if [ -n "$other" ] && [ "$other" != "$$" ] && kill -0 -- "-$other" 2>/dev/null; then
  echo "a driver or patch round for $short is still running (process group $other); stop it with: kill -- -$other" >&2; exit 2
fi
echo $$ > "$out/drive.pid"
zsystem flock -u "$lockfd"
[ -e "$out/HOLD" ] && { say "HOLD before patch $r: $(cat "$out/HOLD")"; exit 0; }
cd "$wt"; rm -f "$out/STOP"
session="$(cat "$out/story.session" 2>/dev/null)"
[ -n "$session" ] || stop "no story session id in $out/story.session"
patched() { git log --grep "^story" "$(cat "$out/$m.before")..HEAD" -1 --format=%h | grep -q .; }
if [ ! -e "$out/$m.finished" ] && [ -e "$out/$m.before" ] && patched; then
  say "patch $r already committed $(git rev-parse --short HEAD) before the round was interrupted; not sent again"
  now > "$out/$m.finished"
fi
if [ ! -e "$out/$m.finished" ]; then
  node skills/catch-event-page/scripts/patch_quotes.mjs "$story" "$list" "${extra[@]}" > "$out/$m.quotes.log" 2>&1 \
    || stop "the patch list quotes words no record holds, see $out/$m.quotes.log"
  cp "$list" "$out/$m.prompt.txt" 2>/dev/null
  before="$(git rev-parse HEAD)"; echo "$before" > "$out/$m.before"
  if [ -e "$out/$m.started" ]; then
    tag="dead-$(date -u +%H%M%S)"
    mv "$out/$m.started" "$out/$m.started.$tag"
    [ -e "$out/$m.failed" ] && mv "$out/$m.failed" "$out/$m.finished.$tag"
  fi
  now > "$out/$m.started"
  say "start patch $r on session $session"
  "$HOME/.grok/bin/grok" --always-approve -m "${AUTHOR_MODEL:-grok-4.7}" --resume "$session" --prompt-file "$out/$m.prompt.txt" \
    </dev/null > "$out/$m.log" 2>&1
  rc=$?; echo "grok exit $rc" >> "$out/$m.log"
  [ $rc = 0 ] || { now > "$out/$m.failed"; stop "patch $r: the author exited with $rc, see $out/$m.log"; }
  patched || { now > "$out/$m.failed"; stop "patch $r ended with no story commit, see $out/$m.log"; }
  now > "$out/$m.finished"; say "done patch $r at $(git rev-parse --short HEAD)"
fi
DRIVE_ONLY_READS="$r" exec zsh "$here/drive.sh" "$short" "$subject" "$slug"
