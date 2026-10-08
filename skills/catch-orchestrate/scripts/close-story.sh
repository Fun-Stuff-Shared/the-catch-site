#!/usr/bin/env zsh
# usage: close-story.sh <worktree path> [<story-id>]...   (no story id: a worktree with no story of its own)
set -euo pipefail
site=/Volumes/4/GitHub/the-catch-site
wt=${1:A}
shift
stories=($@)
[[ -d $wt ]] || { print "no worktree at $wt" >&2; exit 2 }
users=$(lsof -a -d cwd -Fpn 2>/dev/null | awk -v w="$wt" '/^p/{p=substr($0,2)} /^n/{d=substr($0,2); if (d==w || index(d, w "/")==1) print p}')
[[ -z $users ]] || { print "processes still working in $wt:" >&2; ps -o pid,command -p ${(j:,:)${(f)users}} >&2; exit 1 }
for s in $stories; do
  m=checks/manifests/$s.json
  command git -C $site cat-file -e main:$m 2>/dev/null || { print "$m is not on main; publish it first" >&2; exit 1 }
  command git -C $site diff --quiet main -- $m || { print "$m in the main checkout differs from main" >&2; exit 1 }
done
left=$site/.worktrees/.closed/${wt:t}-$(date +%Y%m%d-%H%M%S)
mkdir -p $left
python3 - $wt $left <<'EOF'
import re, shutil, subprocess, sys
from pathlib import Path
wt, left = Path(sys.argv[1]), Path(sys.argv[2])
generated = re.compile(r"^(data/state/|data/sources/news-state/|src/data/news-records\.json$|dist/|node_modules|\.astro/)")
out = subprocess.run(["git", "-C", str(wt), "status", "--porcelain=v1", "-z", "--untracked-files=all"],
                     check=True, capture_output=True).stdout.decode()
fields = out.split("\0")
copied, i = 0, 0
while i < len(fields) and fields[i]:
    status, path = fields[i][:2], fields[i][3:]
    i += 2 if status[0] in "RC" else 1
    src = wt / path
    if generated.match(path) or not src.exists() or src.is_symlink():
        continue
    dest = left / path
    dest.parent.mkdir(parents=True, exist_ok=True)
    (shutil.copytree if src.is_dir() else shutil.copy2)(src, dest)
    copied += 1
diff = subprocess.run(["git", "-C", str(wt), "diff", "HEAD", "--", ".", ":!data/state", ":!data/sources/news-state",
                       ":!src/data/news-records.json"], check=True, capture_output=True).stdout
(left / "uncommitted.diff").write_bytes(diff)
print(f"copied {copied} uncommitted paths and the diff to {left}")
EOF
branch=$(command git -C $wt branch --show-current) head=$(command git -C $wt rev-parse --short HEAD)
command git -C $site worktree remove --force $wt
for s in $stories; do
  PYTHONPATH=/Volumes/4/CF/sai-prod/src PYTHONDONTWRITEBYTECODE=1 /Volumes/4/CF/sai/.venv/bin/python -c '
import sys
from pathlib import Path
from sai.state.story_manifest import register_pins
site = Path(sys.argv[1])
register_pins(Path("/Volumes/4/CF/catch-state/log"), site, site / sys.argv[2])
print(sys.argv[2], "records now read their text from", site)' $site checks/manifests/$s.json
done
print "closed $wt (branch ${branch:-detached} at $head kept)"
