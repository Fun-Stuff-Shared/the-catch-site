#!/usr/bin/env zsh
# usage: open-story.sh <v2-subject-id> <series-slug> <YYYY-MM-DD-what-happened> "<subject in reader words>" "<working headline>" \
#          [--follows <previous story id>] [--no-launch]
# CATCH_BASE names the branch to cut from (main).
set -euo pipefail
here=${0:A:h}
site=/Volumes/4/GitHub/the-catch-site
base=${CATCH_BASE:-main}
candidate=$1 subject=$2 slug=$3 words=$4 label=$5
shift 5
follows="" launch=1
while (( $# )); do
  case $1 in
    --follows) follows=$2; shift 2 ;;
    --no-launch) launch=0; shift ;;
    *) print "unknown option $1" >&2; exit 2 ;;
  esac
done
story=$subject--$slug wt=$site/.worktrees/$slug branch=author/$slug
[[ -e $wt ]] && { print "worktree exists: $wt" >&2; exit 1 }
command git -C $site rev-parse -q --verify refs/heads/$branch >/dev/null && { print "branch exists: $branch" >&2; exit 1 }
command git -C $site cat-file -e ${base}:checks/manifests/$story.json 2>/dev/null && { print "story exists: $story" >&2; exit 1 }
[[ -z $follows ]] || command git -C $site cat-file -e ${base}:checks/manifests/$follows.json || { print "--follows: no story $follows on $base" >&2; exit 1 }

git -C $site worktree add -q $wt -b $branch $base
remaining="the worktree $wt exists on $branch; candidate $candidate is not yet checked"
trap 'print "open-story stopped: $remaining" >&2' ERR
cd $wt
npm ci --no-progress --silent
zsh $here/fetch-pinned.sh
CANDIDATE=$candidate node --input-type=module -e '
import { readV2 } from "./src/lib/v2.mjs";
const view = readV2().views.get(process.env.CANDIDATE);
if (!view) { console.error(`no subject ${process.env.CANDIDATE} in the pinned snapshot`); process.exit(1); }'
python3 -I - $story $subject $slug $candidate $label <<'EOF'
import json, sys
from pathlib import Path
story, subject, slug, candidate, label = sys.argv[1:]
Path(f"checks/manifests/{story}.json").write_text(json.dumps({
    "subject": subject, "event": f"{subject}/{slug}", "story": f"/events/{subject}/{slug}/", "date": slug[:10],
    "v2": True, "v2_subjects": [candidate], "story_title": label, "sub_events": [], "records": [], "story_sources": [],
}, indent=2, ensure_ascii=False) + "\n")
EOF
trap - ERR

orchestrator=${CATCH_ORCHESTRATOR:-the session that ran open-story.sh}
kick=$wt/../.kickoff-$slug.md
LABEL=$label STORY=$story CANDIDATE=$candidate WORKTREE=$wt BRANCH=$branch \
FOLLOWS=${follows:+"It follows $follows in the $subject series: read that story's page first, and its brief in checks/records if it has one."} \
SEARCH=$words SINCE=${slug[1,10]} ORCHESTRATOR=$orchestrator python3 -I -c '
import os, sys
t = open(sys.argv[1]).read()
values = dict(os.environ)
values["FOLLOWS"] = values.get("FOLLOWS") or "It is the first story in its series."
for k in ("STORY", "LABEL", "CANDIDATE", "FOLLOWS", "SEARCH", "SINCE", "WORKTREE", "BRANCH", "ORCHESTRATOR"):
    t = t.replace("{" + k + "}", values.get(k, ""))
print(t)' $here/../assets/kickoff.md > $kick

print "opened $story on $candidate, worktree $wt ($branch), kickoff $kick"
if (( launch )); then
  CMUX_QUIET=1 cmux workspace create --name "$slug" --description "Catch story $story" --cwd $wt \
    --command "claude \"\$(cat $kick)\"" --focus false
fi
