#!/bin/zsh
# One patch round: check the list's quotes, resume the story author's own session with the
# list under the journalist's preamble, wait, build, run the record check on the blocks the patch changed. Markers and DRIVE.log as in
# drive.sh. Usage: patch.sh <short> <subject> <slug> <round number> <patch list file> [fetched text of a record the list asks to admit ...]
# A list that changes the headline carries one line "HEADLINE: <the exact new headline>"; the
# state label is renamed to it before the author starts, since the build compares the two.
# Ends by writing READY-r<round>; stops with a reason in <dispatch dir>/STOP.
set -uo pipefail
short="${1:?short}"; subject="${2:?subject}"; slug="${3:?slug}"; r="${4:?round}"; list="${5:?patch list}"; list="${list:A}"
extra=("${@:6}"); extra=("${extra[@]:A}")
site=/Volumes/4/GitHub/the-catch-site
out="${DISPATCH_ROOT:-/Volumes/4/scratch-fable-profile/grok-authoring/dispatch}/$short"
wt="$(cat "$out/WORKTREE" 2>/dev/null || echo "$site/.worktrees/$short")"
name="$subject--$slug"; story="$subject/$slug"; m="$name-patch$r"
state=/Volumes/4/CF/catch-state; sai=/Volumes/4/CF/sai-prod; py=/Volumes/4/CF/sai/.venv/bin/python
event="event-$subject-$slug"
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
  { cat <<'PREAMBLE'
You are the journalist who wrote this story, and the page is yours. Below is what the people who read it found. Two kinds of item are in the list.

A correction is a sentence the records do not support. Fix each one, or show the record that supports the sentence as it stands.

Everything else is advice from readers with different interests: a stranger who stalled, an editor who wants a cut or a hole filled, the reviewer's own read. Weigh them as a journalist would. Take what makes the story clearer and truer for a person who has never heard of it, decline what does not, and do not try to satisfy every reader at once. A suggested sentence is a suggestion; write your own when yours is better, on the same records.

Report each item as taken, taken differently (say how) or declined (say why).

PREAMBLE
    cat "$list"; } > "$out/$m.prompt.txt"
  headline="$(sed -n 's/^HEADLINE: *//p' "$list" | head -1)"
  if [ -n "$headline" ] && [ "$(cat "$out/$m.label.finished" 2>/dev/null)" != "$headline" ]; then
    current="$("$py" -c 'import json,sys; v=json.load(open(sys.argv[1])); print((v.get("event") or v)["label"])' "$state/views/$event.json")"
    if [ "$headline" != "$current" ] && [ "$(cat "$out/$m.label.renamed" 2>/dev/null)" != "$headline" ]; then
      say "state label: \"$current\" becomes \"$headline\""
      ( cd "$sai" && PYTHONPATH=src PYTHONDONTWRITEBYTECODE=1 "$py" -m sai.cli state event-op --state-dir "$state" --op rename \
          --event "$event" --author "${BY:-keystone}" --label "$headline" --reason "patch round $r: the list's headline" ) \
        > "$out/$m.label.log" 2>&1 || stop "the state label rename for patch $r failed, see $out/$m.label.log"
      print -r -- "$headline" > "$out/$m.label.renamed"
    fi
    ( cd "$sai" && PYTHONPATH=src PYTHONDONTWRITEBYTECODE=1 "$py" -m sai.cli state refresh-views --state-dir "$state" --event "$event" ) \
      > "$out/$m.label-refresh.log" 2>&1 || stop "the view refresh after the rename for patch $r failed, see $out/$m.label-refresh.log"
    print -r -- "$headline" > "$out/$m.label.finished"
  fi
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
DRIVE_ONLY_READS="$r" DRIVE_SINCE="$(cat "$out/$m.before")" exec zsh "$here/drive.sh" "$short" "$subject" "$slug"
