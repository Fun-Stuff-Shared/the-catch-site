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

wt=$site/.worktrees/publish-$(date +%Y%m%d-%H%M%S)
git -C $site worktree add -q $wt -b ${wt:t} main
ln -s $site/node_modules $wt/node_modules
cd $wt
for b in $merges; do
  git merge -q --no-ff -m "Merge branch '$b'" $b || { print "merge of $b conflicts; resolve in $wt and rerun from there" >&2; exit 1 }
done

for s in $stories; do
  m=checks/manifests/$s.json
  python3 - $m <<'EOF' || exit 1
import json, sys
m = json.load(open(sys.argv[1]))
need = ["sources_admitted", "derived_numbers_computed", "outlet_claims_verified", "section_grammar",
        "chip_vocabulary", "live_elements_guarded", "subject_page_updated", "homepage_updated"]
bad = [k for k in need if not (m.get("steps", {}).get(k, {}).get("done") is True and len(m["steps"][k].get("evidence", "").strip()) >= 10)]
if bad or not m.get("completed_by"):
    sys.exit(f"{sys.argv[1]}: attestations missing or empty: {bad or ['completed_by']}")
if not m.get("figures"):
    sys.exit(f"{sys.argv[1]}: no figures declared; the story's headline numbers must be in figures[] before it is staged")
EOF
  PYTHONPATH=$sai/src PYTHONDONTWRITEBYTECODE=1 $sai/.venv/bin/python -c '
import sys
from pathlib import Path
from sai.state.story_manifest import read_pins
read_pins(Path(sys.argv[1]), Path(sys.argv[1]) / sys.argv[2])' $wt $m || { print "$m: its saved records do not match the manifest" >&2; exit 1 }
done

npm run build > /tmp/${wt:t}-build1.log 2>&1 || { print "build or gate failed: /tmp/${wt:t}-build1.log" >&2; exit 1 }

for s in $stories; do
  (cd $sai && PYTHONPATH=src .venv/bin/python -m sai.cli state stage-story --manifest $site/checks/manifests/$s.json \
    --site-root $wt --state-dir $state) > /tmp/${wt:t}-stage-$s.json || { print "stage-story refused $s: /tmp/${wt:t}-stage-$s.json" >&2; exit 1 }
done
(cd $sai && PYTHONPATH=src .venv/bin/python -m sai.cli state verify --state-dir $state >/dev/null)

views=()
for s in $stories; do
  event=event-${s/--/-}
  (cd $sai && PYTHONPATH=src .venv/bin/python -m sai.cli state refresh-views --state-dir $state --event $event >/dev/null)
  views+=(data/state/$event.json)
  for c in $(command grep -l "\"$event\"" $state/views/chain-*.json); do views+=(data/state/${c:t}); done
done
views=(${(u)views})
for v in $views; do cp $state/views/${v:t} $v; done
git add -- $views
git commit -q -m "state: views for ${(j:, :)stories}" -- $views

tmp=$(mktemp -d)
git archive HEAD data/state | tar -x -C $tmp
for s in $stories; do node -e "import('./src/lib/state.mjs').then(m=>{if(!m.readState('$tmp/data/state').events.get('event-${s/--/-}'))process.exit(1)})" || { print "committed state lacks event-${s/--/-}" >&2; exit 1 }; done
print "committed state holds ${(j:, :)stories}"

npm run build > /tmp/${wt:t}-build2.log 2>&1 || { print "build or gate failed after staging: /tmp/${wt:t}-build2.log" >&2; exit 1 }
git -C $site checkout -q -- $generated 2>/dev/null || true
git -C $site merge -q --ff-only ${wt:t}
print "main is at $(git -C $site rev-parse --short main); $(git -C $site rev-list --count origin/main..main) commits ahead of origin"
(( push )) || { print "not pushed (--no-push)"; exit 0 }

git -C $site push -q origin main
for s in $stories; do
  subject=${s%%--*} slug=${s#*--}
  url=$live/events/$subject/$slug/
  python3 - dist/events/$subject/$slug/index.html $url <<'EOF' || exit 1
import html, re, sys, time, urllib.request
h1 = lambda t: html.unescape(re.sub(r"<[^>]+>", "", re.search(r"<h1[^>]*>(.*?)</h1>", t, re.S).group(1))).strip()
want, url = h1(open(sys.argv[1], encoding="utf-8").read()), sys.argv[2]
for _ in range(60):
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            body = r.read().decode("utf-8")
        if r.status == 200 and h1(body) == want:
            print(f"live: {url} (em dashes: {body.count(chr(0x2014))})")
            sys.exit(0)
    except Exception:
        pass
    time.sleep(10)
sys.exit(f"NOT LIVE after 10 minutes: {url}; read the hosted build log")
EOF
done
node scripts/live-audit.mjs $live
print "published from $wt"
