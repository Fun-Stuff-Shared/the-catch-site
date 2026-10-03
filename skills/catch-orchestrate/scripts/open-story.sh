#!/bin/zsh
# Open a story run: accept the candidate, attach it to its series, refresh its views, cut the
# author worktree (under .worktrees/, removed by close-story.sh), start the clock and dispatch the record turn. Usage:
#   open-story.sh <short> <cand-id> <subject-slug> <slug> <period> <kind> <subject words> <label> <candidate-block-file> [previous-event-id]
# Env: BY (default keystone), REASON (required: whose word and the span), AUTHOR_HOST, AUTHOR_MODEL.
set -euo pipefail
short="${1:?short}"; cand="${2:?candidate id}"; subject="${3:?subject slug}"; slug="${4:?slug}"; period="${5:?period}"
kind="${6:?kind}"; words="${7:?subject words}"; label="${8:?label}"; block="${9:?candidate block file}"; block="${block:A}"; previous="${10:-}"
site=/Volumes/4/GitHub/the-catch-site; wt="$site/.worktrees/$short"; event="event-$subject-$slug"
out="/Volumes/4/scratch-fable-profile/grok-authoring/dispatch/$short"; state=/Volumes/4/CF/catch-state
sai=/Volumes/4/CF/sai-prod; py=/Volumes/4/CF/sai/.venv/bin/python
[ -s "$block" ] || { echo "candidate block missing: $block" >&2; exit 2; }
mkdir -p "$out"
dispatched=("$out"/*-record.(started|pid)(N))
if (( ${#dispatched} )); then echo "a record turn was already dispatched for $short; run drive.sh" >&2; exit 2; fi
(cd /Volumes/4/CF/news-fqs-pilot && /opt/anaconda3/bin/python3 scripts/story_accept.py accept "$cand" --by "${BY:-keystone}" \
  --reason "${REASON:?REASON}" --kind "$kind" --subject "$words" --period "$period" --label "$label" --event-id "$event")
cd "$sai"
if [ -n "$previous" ]; then
  PYTHONPATH=src PYTHONDONTWRITEBYTECODE=1 "$py" -m sai.cli state event-op --state-dir "$state" --op reparent --event "$event" \
    --target "$previous" --author "${BY:-keystone}" --reason "next story in the $subject series" > "$out/reparent.json"
fi
PYTHONPATH=src PYTHONDONTWRITEBYTECODE=1 "$py" -m sai.cli state refresh-views --state-dir "$state" --event "$event" > "$out/refresh.json"
[ -s "$state/views/$event.json" ] || { echo "no view for $event" >&2; exit 1; }
[ -d "$wt" ] || { git -C "$site" worktree add "$wt" -b "author/$short" main; ln -s "$site/node_modules" "$wt/node_modules"; }
commit="$(git -C "$site" rev-parse --short main)"
cp "$block" "$out/candidate-block.txt"
echo "$wt" > "$out/WORKTREE"
date -u +%Y-%m-%dT%H:%M:%SZ > "$out/CLOCK.txt"
cd "$wt"
AUTHOR_HOST="${AUTHOR_HOST:-grok}" AUTHOR_MODEL="${AUTHOR_MODEL:-grok-4.7}" DISPATCH_DIR="$out" EVENT_ID="$event" \
  zsh skills/catch-event-page/assets/dispatch/run-turn.sh record "$subject" "$slug" "$wt" "author/$short" "$commit" "$out/candidate-block.txt"
