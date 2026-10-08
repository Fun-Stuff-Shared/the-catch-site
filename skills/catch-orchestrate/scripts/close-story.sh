#!/usr/bin/env zsh
# usage: close-story.sh <worktree path> [<story-id>]   (no story id: a worktree with no story of its own)
set -euo pipefail
site=/Volumes/4/GitHub/the-catch-site
wt=${1:A} story=${2:-}
[[ -d $wt ]] || { print "no worktree at $wt" >&2; exit 2 }
users=$(lsof -a -d cwd -Fpn 2>/dev/null | awk -v w="$wt" '/^p/{p=substr($0,2)} /^n/{d=substr($0,2); if (d==w || index(d, w "/")==1) print p}')
[[ -z $users ]] || { print "processes still working in $wt:" >&2; ps -o pid,command -p ${(j:,:)${(f)users}} >&2; exit 1 }
if [[ -n $story ]]; then
  m=checks/manifests/$story.json
  command git -C $site cat-file -e main:$m 2>/dev/null || { print "$m is not on main; publish it first" >&2; exit 1 }
  command git -C $site diff --quiet main -- $m || { print "$m in the main checkout differs from main" >&2; exit 1 }
fi
left=$site/.worktrees/.closed/${wt:t}-$(date +%Y%m%d-%H%M%S)
mkdir -p $left
command git -C $wt status --porcelain --untracked-files=all | while IFS= read -r entry; do
  f=${entry:3}
  [[ $f =~ '^(data/state/|data/sources/news-state/|src/data/news-records\.json$|dist/|node_modules|\.astro/)' ]] && continue
  [[ -e $wt/$f && ! -L $wt/$f ]] || continue
  mkdir -p $left/${f:h}; cp -Rp $wt/$f $left/$f
done
branch=$(command git -C $wt branch --show-current) head=$(command git -C $wt rev-parse --short HEAD)
command git -C $site worktree remove --force $wt
if [[ -n $story ]]; then
  PYTHONPATH=/Volumes/4/CF/sai-prod/src PYTHONDONTWRITEBYTECODE=1 /Volumes/4/CF/sai/.venv/bin/python -c '
import sys
from pathlib import Path
from sai.state.story_manifest import register_pins
site = Path(sys.argv[1])
register_pins(Path("/Volumes/4/CF/catch-state/log"), site, site / sys.argv[2])
print("records now read their text from", site)' $site checks/manifests/$story.json
fi
print "closed $wt (branch ${branch:-detached} at $head kept; uncommitted files copied to $left)"
