#!/usr/bin/env zsh
# usage: open-story.sh <candidate-id> <subject-slug> <story-slug> "<subject in reader words>" "<working headline>" \
#          [--decline <candidate-id>]... [--follows <previous event id>] [--no-launch]
set -euo pipefail
here=${0:A:h}
site=/Volumes/4/GitHub/the-catch-site
pilot=/Volumes/4/CF/news-fqs-pilot
sai=/Volumes/4/CF/sai
state=/Volumes/4/CF/catch-state
cand=$1 subject=$2 slug=$3 words=$4 label=$5
shift 5
declines=() follows="" launch=1
while (( $# )); do
  case $1 in
    --decline) declines+=$2; shift 2 ;;
    --follows) follows=$2; shift 2 ;;
    --no-launch) launch=0; shift ;;
    *) print "unknown option $1" >&2; exit 2 ;;
  esac
done
story=$subject--$slug event=event-$subject-$slug wt=$site/.worktrees/$slug branch=author/$slug
by=${CATCH_BY:-zain}
[[ -e $wt ]] && { print "worktree exists: $wt" >&2; exit 1 }
command git -C $site rev-parse -q --verify refs/heads/$branch >/dev/null && { print "branch exists: $branch" >&2; exit 1 }
[[ -e $state/views/$event.json ]] && { print "event already exists: $event" >&2; exit 1 }
[[ -z $follows || -f $state/views/$follows.json ]] || { print "--follows: no published view for $follows" >&2; exit 1 }

row=$(cd $pilot && python3 scripts/story_accept.py list --json | python3 -c '
import json, sys
rows = [r for r in json.load(sys.stdin) if r.get("candidate_id") == sys.argv[1]]
print(json.dumps(rows[-1] if rows else {}))' $cand)
[[ $row == "{}" ]] && { print "no candidate $cand" >&2; exit 1 }
[[ $(print -r -- $row | python3 -c 'import json,sys; print(json.load(sys.stdin).get("status"))') == proposed ]] || { print "candidate $cand is not proposed" >&2; exit 1 }

git -C $site worktree add -q $wt -b $branch main
ln -s $site/node_modules $wt/node_modules
remaining="accept $cand as $event"
trap 'print "open-story stopped; the worktree $wt exists; still to do: $remaining" >&2' ERR

(cd $pilot && python3 scripts/story_accept.py accept $cand --by $by --reason "picked for a Catch story: $label" \
  --kind news --subject "$words" --period ${slug[1,10]} --label "$label" --event-id $event)
remaining="declines, reparent, refresh-views for $event (see SKILL.md section 1)"
for d in $declines; do
  (cd $pilot && python3 scripts/story_accept.py decline $d --by $by --reason "same story as $cand")
done
if [[ -n $follows ]]; then
  (cd $sai && PYTHONPATH=src .venv/bin/python -m sai.cli state event-op --state-dir $state --op reparent \
    --event $event --target $follows --author $by --reason "next story in the $subject series")
fi
(cd $sai && PYTHONPATH=src .venv/bin/python -m sai.cli state refresh-views --state-dir $state --event $event >/dev/null)
[[ -f $state/views/$event.json ]] || { print "no view written for $event" >&2; exit 1 }
trap - ERR

orchestrator=${CATCH_ORCHESTRATOR:-the session that ran open-story.sh}
kick=$wt/../.kickoff-$slug.md
ROW=$row STORY=$story EVENT_ID=$event LABEL=$label CANDIDATE=$cand WORKTREE=$wt BRANCH=$branch \
FOLLOWS=${follows:+"It follows $follows in the $subject series: read that story's page and brief first."} \
SEARCH=$words SINCE=${slug[1,10]} ORCHESTRATOR=$orchestrator python3 -c '
import json, os, sys
row = json.loads(os.environ["ROW"])
t = open(sys.argv[1]).read()
values = dict(os.environ)
values["EVENT"] = row.get("headline", "")
values["CANDIDATE_FILE"] = row.get("why", "")
values["FOLLOWS"] = values.get("FOLLOWS") or "It is the first story in its series."
for k in ("EVENT", "STORY", "EVENT_ID", "LABEL", "CANDIDATE", "CANDIDATE_FILE", "FOLLOWS", "SEARCH", "SINCE", "WORKTREE", "BRANCH", "ORCHESTRATOR"):
    t = t.replace("{" + k + "}", values.get(k, ""))
print(t)' $here/../assets/kickoff.md > $kick

print "opened $story: event $event, worktree $wt ($branch), kickoff $kick"
if (( launch )); then
  CMUX_QUIET=1 cmux workspace create --name "$slug" --description "Catch story $story" --cwd $wt \
    --command "claude \"\$(cat $kick)\"" --focus false
fi
