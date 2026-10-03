#!/bin/zsh
# Close a story run's worktree once the story is shipped or killed, so no worktree outlives
# its run. The branch stays; uncommitted files that are not build output are copied to the
# dispatch dir first. Usage: close-story.sh <short> [worktree path]
# Refuses while an author, a read or a preview started from the worktree is still running.
set -euo pipefail
short="${1:?short}"; site=/Volumes/4/GitHub/the-catch-site
out="${DISPATCH_ROOT:-/Volumes/4/scratch-fable-profile/grok-authoring/dispatch}/$short"
wt="${2:-$(cat "$out/WORKTREE" 2>/dev/null || echo "$site/.worktrees/$short")}"
[ -d "$wt" ] || { echo "no worktree at $wt" >&2; exit 2; }
users="$(lsof -a -d cwd -Fpn 2>/dev/null | awk -v w="$wt" '/^p/{p=substr($0,2)} /^n/{d=substr($0,2); if (d==w || index(d, w "/")==1) print p}')"
if [ -n "$users" ]; then echo "processes still working in $wt:" >&2; ps -o pid,command -p $(echo $users | tr ' ' ',') | cut -c1-160 >&2; exit 1; fi
if pgrep -f "(drive|patch)\\.sh $short " > /dev/null; then echo "a driver or patch round for $short is still running" >&2; exit 1; fi
generated='^(data/state/|data/sources/news-state/|src/data/news-records\.json$|dist/|node_modules|\.astro/)'
left="$out/worktree-leftovers-$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$left"
git -C "$wt" status --porcelain -z --untracked-files=all --ignored | while IFS= read -r -d '' entry; do
  f="${entry:3}"
  [[ "$f" =~ $generated ]] && continue
  [ -e "$wt/$f" ] && [ ! -L "$wt/$f" ] || continue
  mkdir -p "$left/$(dirname "${f%/}")"; cp -Rp "$wt/${f%/}" "$left/${f%/}"
done
git -C "$wt" diff HEAD -- . ':!data/state' ':!data/sources/news-state' ':!src/data/news-records.json' > "$left/uncommitted.diff"
branch="$(git -C "$wt" branch --show-current)"; head="$(git -C "$wt" rev-parse --short HEAD)"
git -C "$site" worktree remove --force "$wt"
echo "closed $wt (branch ${branch:-detached} at $head kept; leftovers in $left)"
