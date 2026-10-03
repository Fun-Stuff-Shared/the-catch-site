#!/bin/zsh
# Drive one story run from its dispatched record turn to the first set of reads, with no
# one waiting between steps: record turn, record build, completeness audit, structure turn,
# state label, story turn, build, the four reads. Every step leaves .started/.finished
# markers in the dispatch dir (ledger.py reads them) and a line in DRIVE.log. A step that
# is already finished is skipped, so a stopped driver is restarted with the same command.
# Usage: drive.sh <short> <subject> <slug>          (launch detached: launch.py drive.sh ...)
# Stops with a reason in <dispatch dir>/STOP when a step fails, and before any step when
# <dispatch dir>/HOLD exists (the four reads start together and count as one step). Ends by writing READY-r0: the reads are in, the patch list is
# the reviewer's.
set -uo pipefail
short="${1:?short}"; subject="${2:?subject}"; slug="${3:?slug}"
site=/Volumes/4/GitHub/the-catch-site
out="${DISPATCH_ROOT:-/Volumes/4/scratch-fable-profile/grok-authoring/dispatch}/$short"
wt="$(cat "$out/WORKTREE" 2>/dev/null || echo "$site/.worktrees/$short")"
state=/Volumes/4/CF/catch-state; sai=/Volumes/4/CF/sai-prod; py=/Volumes/4/CF/sai/.venv/bin/python
event="event-$subject-$slug"; name="$subject--$slug"; story="$subject/$slug"
host="${AUTHOR_HOST:-grok}"; model="${AUTHOR_MODEL:-grok-4.7}"
scripts="$wt/skills/catch-event-page/scripts"
[ -d "$wt" ] || { echo "no worktree at $wt" >&2; exit 2; }
zmodload zsh/system
: >> "$out/drive.lock"
zsystem flock -t 30 -f lockfd "$out/drive.lock" || { echo "could not take $out/drive.lock" >&2; exit 2; }
other="$(cat "$out/drive.pid" 2>/dev/null)"
if [ -n "$other" ] && [ "$other" != "$$" ] && kill -0 -- "-$other" 2>/dev/null; then
  echo "a driver or patch round for $short is still running (process group $other); stop it with: kill -- -$other" >&2; exit 2
fi
echo $$ > "$out/drive.pid"
zsystem flock -u "$lockfd"
cd "$wt"
rm -f "$out/STOP"

now() { date -u +%Y-%m-%dT%H:%M:%SZ; }
say() { echo "$(now) $*" >> "$out/DRIVE.log"; }
stop() { say "STOP $*"; echo "$(now) $*" > "$out/STOP"; exit 1; }
hold() { [ -e "$out/HOLD" ] && { say "HOLD before $1: $(cat "$out/HOLD")"; exit 0; }; return 0; }
skill_commit() { git -C "$wt" merge-base HEAD "$(git -C "$site" rev-parse main)" | cut -c1-8; }

step() {
  local m="$1" log="$2"; shift 2
  [ -e "$out/$m.finished" ] && return 0
  if [ -e "$out/$m.started" ]; then
    local tag="dead-$(date -u +%H%M%S)"
    mv "$out/$m.started" "$out/$m.started.$tag"
    [ -e "$out/$m.failed" ] && mv "$out/$m.failed" "$out/$m.finished.$tag"
  fi
  now > "$out/$m.started"
  say "start $m"
  "$@" > "$log" 2>&1; local rc=$?
  [ $rc = 0 ] || { now > "$out/$m.failed"; stop "$m failed (exit $rc), see $log"; }
  now > "$out/$m.finished"; say "done $m"
}

sessions() { ls "$HOME/.grok/sessions/$("$py" -c 'import sys,urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$wt")" 2>/dev/null | grep -E '^[0-9a-f-]{36}$' | sort; }

alive() { kill -0 -- "-$(cat "$out/$name-$1.pid")" 2>/dev/null; }

turn() {
  local t="$1" f
  if [ -e "$out/$name-$t.pid" ] && ! alive "$t" \
     && { [ -e "$out/$name-$t.failed" ] || ! { [ -e "$out/$name-$t.finished" ] && grep -q "^$host exit 0$" "$out/$name-$t.log"; }; }; then
    say "the earlier $t turn died or failed; its markers are set aside and the turn is dispatched again"
    local tag="dead-$(date -u +%H%M%S)"
    for f in started finished pid log; do [ -e "$out/$name-$t.$f" ] && mv "$out/$name-$t.$f" "$out/$name-$t.$f.$tag"; done
    [ -e "$out/$name-$t.failed" ] && mv "$out/$name-$t.failed" "$out/$name-$t.finished.$tag"
  fi
  if [ ! -e "$out/$name-$t.started" ] && [ ! -e "$out/$name-$t.pid" ]; then
    sessions > "$out/sessions.before-$t"
    say "dispatch $t"
    AUTHOR_HOST="$host" AUTHOR_MODEL="$model" DISPATCH_DIR="$out" EVENT_ID="$event" AUDIT_FILE="${AUDIT_FILE:-}" \
      zsh "$wt/skills/catch-event-page/assets/dispatch/run-turn.sh" "$t" "$subject" "$slug" "$wt" \
      "$(git -C "$wt" branch --show-current)" "$(skill_commit)" >> "$out/DRIVE.log" 2>&1 || stop "$t turn did not launch"
  fi
  until [ -e "$out/$name-$t.finished" ]; do
    alive "$t" || { sleep 5; [ -e "$out/$name-$t.finished" ] || stop "$t turn ended with no finished marker, see $out/$name-$t.log"; }
    sleep 20
  done
  grep -q "^$host exit 0$" "$out/$name-$t.log" || stop "the $t turn's author exited with an error, see $out/$name-$t.log"
  say "finished $t"
}

committed() { git -C "$wt" log --grep "^$1" --since="$(cat "$out/$name-$2.started")" -1 --format=%h | grep -q .; }
uncommitted() { now > "$out/$name-$1.failed"; stop "the $1 turn finished with no $1 commit of its own (a restart dispatches it again), see $out/$name-$1.log"; }

stranger() {
  local r="$1" base="$2"
  "$scripts/stranger_read.sh" "$story" || return 1
  local report="$(ls -t "$base"-*-stranger.md 2>/dev/null | grep -Ev -- '-r[0-9]+-stranger\.md$' | head -1)"
  [ -s "$report" ] || return 1
  local dated="${report%-stranger.md}"
  mv "$report" "$dated-r$r-stranger.md"
  cp "$dated-stranger-page.txt" "$dated-r$r-stranger-page.txt"; cp "$dated-stranger-prompt.txt" "$dated-r$r-stranger-prompt.txt"
}

one_read() {
  local script="$1" report="$2"
  [ -e "$report" ] && mv "$report" "$report.superseded-$(date -u +%H%M%S)"
  "$scripts/$script" "$story" "$report" && grep -q '^VERDICT: ' "$report"
}

reads() {
  local r="$1" d="$(date -u +%Y-%m-%d)" a="$wt/checks/audits/$name"
  export CODEX_MODEL=gpt-6-sol STRANGER_MODEL=sonnet
  ( step "read-r$r-editor" "$out/read-r$r-editor.log" one_read editor_read.sh "$a-$d-r$r-editor.md" ) &
  ( step "read-r$r-redteam" "$out/read-r$r-redteam.log" one_read red_team.sh "$a-$d-r$r-redteam.md" ) &
  ( step "read-r$r-entailment" "$out/read-r$r-entailment.log" one_read entailment_check.sh "$a-$d-r$r-entailment.md" ) &
  ( step "read-r$r-stranger" "$out/read-r$r-stranger.log" stranger "$r" "$a" ) &
  wait
  for k in editor redteam entailment stranger; do
    [ -e "$out/read-r$r-$k.finished" ] || stop "round $r $k read did not finish, see $out/read-r$r-$k.log"
  done
}

staged() {
  local file="$wt/.finish-stage.json" verdict
  verdict="$("$py" -c 'import json,sys
r=json.load(open(sys.argv[1])); r["registration"]; f=r.get("figures") or r
print("refused" if isinstance(f, dict) and f.get("figures_refused") else "ok")' "$file" 2>/dev/null)"
  [ -n "$verdict" ] && [ "$(stat -f %m "$file")" -lt "$(git -C "$wt" log --grep '^story' -1 --format=%ct)" ] && verdict=""
  echo "$verdict"
}

stage() {
  cd "$sai" && PYTHONPATH=src PYTHONDONTWRITEBYTECODE=1 "$py" -m sai.cli state stage-story \
    --manifest "$wt/checks/manifests/$name.json" --site-root "$wt" --state-dir "$state" > "$wt/.finish-stage.json"
}

ensure_staged() {
  local file="$wt/.finish-stage.json" verdict="$(staged)"
  if [ "$verdict" != ok ]; then
    say "the story's records are not staged clean (result: ${verdict:-none readable}); staging them now"
    hold stage
    local m="stage-$(date -u +%Y%m%dT%H%M%S)"
    ( step "$m" "$out/$m.log" stage ) || exit 1
    verdict="$(staged)"
    [ -n "$verdict" ] || stop "state staging ran and left no readable result in $file, see $out/$m.log"
  fi
  [ "$verdict" = ok ] || stop "the state refused one or more of the story's figures; the author rewrites or drops them (see $file)"
  local split
  split="$("$py" -c 'import json,sys
v=json.load(open(sys.argv[1]))
for s in v["current_state"].values():
    own = sum(h.startswith("story-figure:") for h in s["heads"])
    if own and len(s["heads"]) > 1: print("own" if own > 1 else "other", s["slot"])' "$state/views/$event.json")" \
    || stop "could not read the story's state view $state/views/$event.json"
  local own="$(echo "$split" | sed -n 's/^own //p' | tr '\n' ' ')" other="$(echo "$split" | sed -n 's/^other //p' | tr '\n' ' ')"
  [ -z "$other" ] || say "another source's value stands beside the story's for: $other(the page prints no current value for these until the state's judges rule on the pair)"
  [ -z "$own" ] || stop "the state holds more than one of the story's own values for these figures, so the page prints none: $own(see $state/views/$event.json)"
}

if [ -n "${DRIVE_ONLY_READS:-}" ]; then
  hold "build"; ensure_staged; step "build-r$DRIVE_ONLY_READS" "$out/build-r$DRIVE_ONLY_READS.log" npm run build
  hold "reads"; reads "$DRIVE_ONLY_READS"; now > "$out/READY-r$DRIVE_ONLY_READS"; say "READY round $DRIVE_ONLY_READS"; exit 0
fi

hold record; turn record
committed "record:" record || uncommitted record
hold record-build
step record-build "$out/record-build.log" env CATCH_TURN=record npm run build
[ -s "dist/events/$story/index.html" ] || stop "the record build wrote no page for $story"
say "record page: $(grep -o 'data-layer="narrative"' "dist/events/$story/index.html" | wc -l | tr -d ' ') narrative-marked blocks (a kicker or an absence note; the build gate passed)"

hold record-audit
audit="$wt/checks/audits/$name-$(cat "$out/record-audit.date" 2>/dev/null || date -u +%Y-%m-%d | tee "$out/record-audit.date")-record-audit.md"
run_audit() {
  [ -e "$audit" ] && mv "$audit" "$audit.superseded-$(date -u +%H%M%S)"
  CODEX_MODEL=gpt-6-sol "$scripts/completeness_audit.sh" "$story" "$audit"
}
step record-audit "$out/record-audit.log" run_audit
[ -s "$audit" ] || stop "the completeness audit wrote nothing at $audit"

hold structure; AUDIT_FILE="$audit" turn structure
committed "structure:" structure || uncommitted structure

rename() {
  [ -e "$out/label.renamed" ] || [ -e "$out/label.finished" ] && return 0
  local headline current
  headline="$(awk '/^## Headline/{f=1;next} f&&NF{print;exit}' "$wt/checks/reader-models/$name.md")"
  [ -n "$headline" ] || stop "the reader model has no headline"
  current="$("$py" -c 'import json,sys; v=json.load(open(sys.argv[1])); print((v.get("event") or v)["label"])' "$state/views/$event.json")"
  [ -e "$out/label.started" ] || now > "$out/label.started"
  [ "$headline" = "$current" ] && { now > "$out/label.finished"; return 0; }
  say "state label: \"$current\" becomes \"$headline\""
  ( cd "$sai" && PYTHONPATH=src PYTHONDONTWRITEBYTECODE=1 "$py" -m sai.cli state event-op --state-dir "$state" --op rename \
      --event "$event" --author "${BY:-keystone}" --label "$headline" \
      --reason "structure turn $(git -C "$wt" log --grep '^structure:' -1 --format=%h): the reader model's headline" ) \
    > "$out/label.log" 2>&1 || stop "the state label rename failed, see $out/label.log"
  now > "$out/label.renamed"
}

refresh() {
  [ -e "$out/label.finished" ] && return 0
  ( cd "$sai" && PYTHONPATH=src PYTHONDONTWRITEBYTECODE=1 "$py" -m sai.cli state refresh-views --state-dir "$state" --event "$event" ) \
    > "$out/label-refresh.log" 2>&1 || stop "the view refresh after the rename failed, see $out/label-refresh.log"
  now > "$out/label.finished"; say "done label"
}

hold label; rename; refresh

hold story; turn story
committed "story" story || uncommitted story
ensure_staged
sessions | comm -13 "$out/sessions.before-story" - | head -1 > "$out/story.session"
[ -s "$out/story.session" ] || stop "no author session found for the story turn under ~/.grok/sessions"

hold build
step build-r0 "$out/build-r0.log" npm run build
hold reads; reads 0
now > "$out/READY-r0"; say "READY round 0: reads in $wt/checks/audits, the patch list is the reviewer's"
