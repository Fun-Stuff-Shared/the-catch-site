#!/usr/bin/env zsh
# usage: publish.sh [--merge <branch>]... [--no-push] <story-id>...
# CATCH_BASE names the branch to publish to (main); CATCH_LIVE the site that branch serves.
set -euo pipefail
here=${0:A:h}
site=/Volumes/4/GitHub/the-catch-site
base=${CATCH_BASE:-main}
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
for b in $merges; do git -C $site rev-parse -q --verify "$b^{commit}" >/dev/null || { print "no branch $b" >&2; exit 2 }; done

wt=$site/.worktrees/publish-$(date +%Y%m%d-%H%M%S)
git -C $site worktree add -q $wt -b ${wt:t} $base
cd $wt
for b in $merges; do
  git merge -q --no-ff -m "Merge branch '$b'" $b || {
    git merge --abort || true; cd $site; git worktree remove --force $wt; git branch -q -D ${wt:t}
    print "merge of $b conflicts with $base or an earlier --merge branch. In $b's worktree, merge $base, resolve, commit, and rerun." >&2; exit 1 }
done
npm ci --no-progress --silent
zsh $here/fetch-pinned.sh >/dev/null

for s in $stories; do
  m=checks/manifests/$s.json
  python3 -I - $m <<'EOF' || exit 1
import json, sys
m = json.load(open(sys.argv[1]))
if m.get("v2") is not True:
    sys.exit(f"{sys.argv[1]}: only a v2 story publishes; v1 is frozen")
if not m.get("figures"):
    sys.exit(f"{sys.argv[1]}: no figures declared; the story's headline numbers must be in figures[] before it is published")
EOF
done

npm run build > /tmp/${wt:t}-build.log 2>&1 || { print "build or gate failed: /tmp/${wt:t}-build.log" >&2; exit 1 }
git checkout -q -- src/data/news-records.json
for s in $stories; do
  python3 -I skills/catch-record/scripts/claims.py verify $s || { print "$s: its claims or its page have not passed their checks as they read now" >&2; exit 1 }
done

if [[ $base == main ]]; then
  git -C $site merge -q --ff-only ${wt:t}
else
  git -C $site branch -q -f $base ${wt:t}
fi
print "$base is at $(git -C $site rev-parse --short $base)"
(( push )) || { print "not pushed (--no-push)"; exit 0 }

git -C $site push -q origin $base
pushed=$(git rev-parse HEAD)
for s in $stories; do
  node scripts/live-ready.mjs $live/events/${s%%--*}/${s#*--}/ $pushed $(<data/v2/CURRENT) || exit 1
done
node scripts/live-audit.mjs $live
print "published from $wt"
