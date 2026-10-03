#!/bin/zsh
# Close a story run's worktree once the story is shipped or killed, so no worktree outlives
# its run. The branch stays; uncommitted files that are not build output are copied to the
# dispatch dir first. Usage: close-story.sh [--killed] <short> [worktree path]
# The state reads each story record's text from the path it was staged at, so a shipped
# story's records are pointed at the main checkout once the worktree is gone. A story that
# is not on main closes only with --killed, and its records then stay unreadable to search.
# Refuses while an author, a read or a preview started from the worktree is still running.
set -euo pipefail
killed=0; [ "${1:-}" = --killed ] && { killed=1; shift; }
short="${1:?short}"; site=/Volumes/4/GitHub/the-catch-site
out="${DISPATCH_ROOT:-/Volumes/4/scratch-fable-profile/grok-authoring/dispatch}/$short"
wt="${2:-$(cat "$out/WORKTREE" 2>/dev/null || echo "$site/.worktrees/$short")}"
[ -d "$wt" ] || { echo "no worktree at $wt" >&2; exit 2; }
users="$(lsof -a -d cwd -Fpn 2>/dev/null | awk -v w="$wt" '/^p/{p=substr($0,2)} /^n/{d=substr($0,2); if (d==w || index(d, w "/")==1) print p}')"
if [ -n "$users" ]; then echo "processes still working in $wt:" >&2; ps -o pid,command -p $(echo $users | tr ' ' ',') | cut -c1-160 >&2; exit 1; fi
if pgrep -f "(drive|patch)\\.sh $short " > /dev/null; then echo "a driver or patch round for $short is still running" >&2; exit 1; fi
py=/Volumes/4/CF/sai/.venv/bin/python; export PYTHONPATH=/Volumes/4/CF/sai-prod/src PYTHONDONTWRITEBYTECODE=1
# Prints the ids of the state's live story records whose saved text is (or was) under the worktree
# and cannot be read now; with "all" as the third argument, readable ones too.
records() {
  "$py" -c 'import sys
from pathlib import Path
from sai.state.gate import current_index
from sai.state.rows import is_live, superseded_evidence_ids
log = Path("/Volumes/4/CF/catch-state/log"); wt = sys.argv[1].rstrip("/") + "/"
retired = superseded_evidence_ids(current_index(log, "edge").values())
for row in current_index(log, "evidence").values():
    path = str(row.get("text_path") or "")
    if row.get("source_family") == "story_pin" and is_live(row) and row["id"] not in retired and (path.startswith(wt) if sys.argv[2] == "all" else row["id"] in set(sys.argv[3:]) and not Path(path).is_file()):
        print(row["id"])' "$wt" "$@"
}
# The manifest is committed on main and the main checkout holds that same file.
on_main() { git -C "$site" cat-file -e "main:$1" 2>/dev/null && [ -f "$site/$1" ] && git -C "$site" diff --quiet main -- "$1"; }
staged=("${(@f)$(records all)}"); staged=(${staged:#})
manifests=()
for f in "$out"/*-record.started(N); do manifests+=("checks/manifests/${${f:t}%-record.started}.json"); done
if [ ${#staged} -gt 0 ] && [ $killed = 0 ]; then
  [ ${#manifests} -gt 0 ] || { echo "${#staged} of the state's records read their text from $wt and no run marker names the story. Close with --killed to leave them unreadable" >&2; exit 1; }
  for m in $manifests; do
    on_main "$m" || { echo "$m is not on main: ${#staged} of the state's records would become unreadable. Merge the story first, or close with --killed" >&2; exit 1; }
    "$py" -c 'import sys
from pathlib import Path
from sai.state.story_manifest import read_pins
site = Path(sys.argv[1]); read_pins(site, site / sys.argv[2])' "$site" "$m" \
      || { echo "$m: the main checkout's saved records do not match the manifest (above); nothing was closed" >&2; exit 1; }
  done
fi
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
for m in $manifests; do
  [ $killed = 0 ] && on_main "$m" || continue
  "$py" -c 'import sys
from pathlib import Path
from sai.state.story_manifest import register_pins
site = Path(sys.argv[1]); register_pins(Path("/Volumes/4/CF/catch-state/log"), site, site / sys.argv[2])' "$site" "$m" \
    || echo "$m: the state did not take the records from main (above)" >&2
done
if [ ${#staged} -gt 0 ]; then
  lost=("${(@f)$(records only $staged)}"); lost=(${lost:#})
  echo "${#staged} of the state's records read their text from the worktree; $((${#staged} - ${#lost})) now read from main, ${#lost} have no readable text"
  [ ${#lost} = 0 ] || printf '  %s\n' $lost
fi
echo "closed $wt (branch ${branch:-detached} at $head kept; leftovers in $left)"
