#!/usr/bin/env zsh
# usage: publish.sh [--merge <branch>]... [--no-push] <story-id>...
set -euo pipefail
site=/Volumes/4/GitHub/the-catch-site
sai=/Volumes/4/CF/sai
state=/Volumes/4/CF/catch-state
live=${CATCH_LIVE:-https://thecatchengine.com}
merges=() stories=() push=1
while (( $# )); do
  case $1 in
    --merge) merges+=$2; shift 2 ;;
    --no-push) push=0; shift ;;
    *) stories+=$1; shift ;;
  esac
done
(( ${#stories} )) || { print "name at least one story id" >&2; exit 2 }
git() { command git -c core.hooksPath=/dev/null "$@" }
generated=(data/state src/data/news-records.json data/sources/news-state)
for b in $merges; do git -C $site rev-parse -q --verify "$b^{commit}" >/dev/null || { print "no branch $b" >&2; exit 2 }; done

wt=$site/.worktrees/publish-$(date +%Y%m%d-%H%M%S)
git -C $site worktree add -q $wt -b ${wt:t} main
ln -s $site/node_modules $wt/node_modules
cd $wt
for b in $merges; do
  git merge -q --no-ff -m "Merge branch '$b'" $b || {
    git merge --abort || true; cd $site; git worktree remove --force $wt; git branch -q -D ${wt:t}
    print "merge of $b conflicts with main or an earlier --merge branch. In $b's worktree, drop the build output (git checkout -- data/state src/data/news-records.json; git clean -fdq -- data/state data/sources/news-state), merge main, resolve the conflict there, and run publish.sh again" >&2; exit 1 }
done

# A v2 story renders from the committed sai-core snapshot in data/v2; only v1 stories are staged in catch-state,
# so only their pins are read for staging. The gate checks every manifest's records against their saved text.
v1=() v2=()
for s in $stories; do
  if jq -e '.v2 == true' checks/manifests/$s.json >/dev/null; then v2+=$s; else v1+=$s; fi
done

for s in $stories; do
  m=checks/manifests/$s.json
  python3 - $m <<'EOF' || exit 1
import json, sys
m = json.load(open(sys.argv[1]))
if not m.get("figures"):
    sys.exit(f"{sys.argv[1]}: no figures declared; the story's headline numbers must be in figures[] before it is staged")
EOF
done
for s in $v1; do
  m=checks/manifests/$s.json
  PYTHONPATH=$sai/src PYTHONDONTWRITEBYTECODE=1 $sai/.venv/bin/python -c '
import sys
from pathlib import Path
from sai.state.story_manifest import read_pins
read_pins(Path(sys.argv[1]), Path(sys.argv[1]) / sys.argv[2])' $wt $m || { print "$m: its saved records do not match the manifest" >&2; exit 1 }
done

npm run build > /tmp/${wt:t}-build1.log 2>&1 || { print "build or gate failed: /tmp/${wt:t}-build1.log" >&2; exit 1 }
for s in $stories; do
  python3 -I skills/catch-record/scripts/claims.py verify $s || { print "$s: its claims or its page have not passed their checks as they read now" >&2; exit 1 }
done

for s in $v1; do
  (cd $sai && PYTHONPATH=src .venv/bin/python -m sai.cli state stage-story --manifest $wt/checks/manifests/$s.json \
    --site-root $wt --state-dir $state) > /tmp/${wt:t}-stage-$s.json || { print "stage-story refused $s: /tmp/${wt:t}-stage-$s.json" >&2; exit 1 }
done
(cd $sai && PYTHONPATH=src .venv/bin/python -m sai.cli state verify --state-dir $state >/dev/null)

views=()
for s in $v1; do
  event=event-${s/--/-}
  (cd $sai && PYTHONPATH=src .venv/bin/python -m sai.cli state refresh-views --state-dir $state --event $event >/dev/null)
  views+=(data/state/$event.json)
  for c in $(command grep -rlF --include='chain-*.json' "\"$event\"" $state/views); do views+=(data/state/${c:t}); done
done
views=(${(u)views})
if (( ${#views} )); then
  for v in $views; do cp $state/views/${v:t} $v; done
  git add -- $views
  git commit -q -m "state: views for ${(j:, :)v1}" -- $views
fi

tmp=$(mktemp -d)
git archive HEAD data/state data/v2 | tar -x -C $tmp
node -e "import('./scripts/pull-state.mjs').then(m=>m.pullState({source:'$tmp/no-catch-state',destination:'$tmp/data/state',manifests:'checks/manifests'}))" || { print "committed v1 state still holds a v2 story's views or the v1 events under them" >&2; exit 1 }
for s in $v2; do node -e "import('./src/lib/v2.mjs').then(v=>v.storySubjects(v.readV2('$tmp/data/v2'),'$s'))" || { print "committed v2 snapshot lacks $s" >&2; exit 1 }; done
for s in $v1; do node -e "import('./src/lib/state.mjs').then(m=>{if(!m.readState('$tmp/data/state').events.get('event-${s/--/-}'))process.exit(1)})" || { print "committed state lacks event-${s/--/-}" >&2; exit 1 }; done
print "committed state holds ${(j:, :)stories}"

npm run build > /tmp/${wt:t}-build2.log 2>&1 || { print "build or gate failed after staging: /tmp/${wt:t}-build2.log" >&2; exit 1 }
git -C $site checkout -q -- $generated 2>/dev/null || true
for f in $(git -C $site diff --name-only --diff-filter=A main ${wt:t} -- $generated); do
  [[ -e $site/$f ]] && ! git -C $site ls-files --error-unmatch -- $f >/dev/null 2>&1 && rm -- $site/$f
done
git -C $site merge -q --ff-only ${wt:t}
print "main is at $(git -C $site rev-parse --short main); $(git -C $site rev-list --count origin/main..main) commits ahead of origin"
(( push )) || { print "not pushed (--no-push)"; exit 0 }

git -C $site push -q origin main
pushed=$(git rev-parse HEAD)
for s in $stories; do
  subject=${s%%--*} slug=${s#*--}
  if (( ${v2[(Ie)$s]} )); then
    node scripts/live-ready.mjs $live/events/$subject/$slug/ $pushed $(<data/v2/CURRENT) || exit 1
  else
    node scripts/live-ready.mjs $live/events/$subject/$slug/ $pushed || exit 1
  fi
done
node scripts/live-audit.mjs $live
print "published from $wt"
