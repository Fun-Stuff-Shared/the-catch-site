#!/usr/bin/env zsh
# usage: publish.sh [--merge <branch>]... [--no-push] <story-id>...
# CATCH_BASE names the branch to publish to (main); CATCH_LIVE the site that branch serves.
# Incoming data/sources/ captures are scanned before merging. CATCH_SOURCE_SCAN_ALLOW=1
# allows reviewed public tokens to remain byte-exact; findings are still reported.
# This heuristic is not GitHub push protection approval and never edits source bytes.
set -euo pipefail
publish_script=$0 publish_command=initialization publish_line=$LINENO
trap 'publish_command=$ZSH_DEBUG_CMD publish_line=$LINENO' DEBUG
TRAPEXIT() {
  local rc=$?
  if (( rc )); then
    print -ru2 -- "$publish_script:$publish_line: failed (status $rc): $publish_command"
  fi
}
here=${0:A:h}
site=/Volumes/4/GitHub/the-catch-site
base=${CATCH_BASE:-main}
live=${CATCH_LIVE:-https://thecatchengine.com}
merges=() stories=() push=1 args=("$@")
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
if (( push )) && [[ $base == main ]]; then
  git -C $site fetch -q origin $base
  local_base=$(git -C $site rev-parse $base) remote_base=$(git -C $site rev-parse origin/$base)
  if [[ $local_base != $remote_base ]]; then
    git -C $site merge-base --is-ancestor $local_base $remote_base || {
      print "$base has commits that are not on origin/$base; push or drop them before publishing." >&2; exit 1 }
    git -C $site merge -q --ff-only origin/$base
  fi
fi

python3 -I - $site $base $merges <<'EOF'
import os, re, subprocess, sys

site, base, *branches = sys.argv[1:]
def git(*args):
    return subprocess.check_output(['git', '-C', site, *args])

patterns = [(name, re.compile(pattern)) for name, pattern in [
    ('Mapbox', rb'\b[ps]k\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}'),
    ('AWS', rb'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b'),
    ('GitHub', rb'\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})'),
    ('Slack', rb'\bxox[a-z]-[A-Za-z0-9-]{10,}'),
    ('Google', rb'\bAIza[A-Za-z0-9_-]{35}'),
    ('Stripe', rb'\b[rs]k_live_[A-Za-z0-9]{16,}'),
    ('private key', rb'-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----'),
]]
found = False
seen_commits = set()
seen_findings = set()
for branch in branches:
    commits = git('rev-list', '--reverse', f'{base}..{branch}').decode().splitlines()
    for commit in commits:
        if commit in seen_commits:
            continue
        seen_commits.add(commit)
        parents = git('rev-list', '--parents', '-n', '1', commit).split()[1:]
        merge_diff = '-c' if len(parents) > 1 else '-m'
        paths = git('diff-tree', '--root', merge_diff, '-r', '--no-commit-id', '--name-only', '-z', '--no-renames', '--diff-filter=ACMT', commit, '--', 'data/sources/')
        short = git('rev-parse', '--short', commit).decode().strip()
        for path in sorted(set(paths.split(b'\0')) - {b''}):
            name = os.fsdecode(path)
            content = git('show', f'{commit}:{name}')
            for number, line in enumerate(content.split(b'\n'), 1):
                for label, pattern in patterns:
                    finding = (name, number, label, line)
                    if pattern.search(line) and finding not in seen_findings:
                        seen_findings.add(finding)
                        found = True
                        print(f'{name}:{number}: {label} pattern (commit {short}, branch {branch})', file=sys.stderr)
if found:
    if os.environ.get('CATCH_SOURCE_SCAN_ALLOW') != '1':
        sys.exit('Source key scan stopped publication before merge. Review findings; for public tokens that must remain byte-exact, rerun with CATCH_SOURCE_SCAN_ALLOW=1. No source bytes were changed. GitHub may still reject the push.')
    print('CATCH_SOURCE_SCAN_ALLOW=1: continuing with reported source patterns unchanged; GitHub may still reject the push.', file=sys.stderr)
EOF

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
# Cloudflare refuses the whole deploy over one asset above 25 MiB, after the push, so check it here.
big=$(fd -t f -S +25mi . dist --no-ignore)
[[ -z $big ]] || { print "files over Cloudflare's 25 MiB asset limit; the deploy would fail:\n$big" >&2; exit 1 }
for s in $stories; do
  python3 -I skills/catch-record/scripts/claims.py verify $s || { print "$s: its claims or its page have not passed their checks as they read now" >&2; exit 1 }
done

before=$(git -C $site rev-parse $base)
if [[ $base == main ]]; then
  git -C $site merge -q --ff-only ${wt:t}
else
  git -C $site branch -q -f $base ${wt:t}
fi
print "$base is at $(git -C $site rev-parse --short $base)"
(( push )) || { print "not pushed (--no-push)"; exit 0 }

pushed=$(git rev-parse HEAD)
known=$(node scripts/deploy-wait.mjs known $pushed 2>/dev/null) || known=unknown
if ! git -C $site push -q origin $base; then
  if [[ $(git -C $site rev-parse $base) != $pushed ]]; then
    print "push failed; $base changed concurrently, so it was not restored (previous commit: $before)." >&2
  elif [[ $base == main ]]; then
    git -C $site reset --keep $before || {
      print "push failed; could not restore $base to $before. Preserve local changes before retrying." >&2; exit 1 }
    print "push failed; restored $base to $before." >&2
  else
    git -C $site update-ref refs/heads/$base $before $pushed
    print "push failed; restored $base to $before." >&2
  fi
  if [[ $base == main && -z ${CATCH_PUBLISH_RETRY:-} && $(git -C $site rev-parse $base) == $before ]] \
      && git -C $site fetch -q origin $base \
      && [[ $(git -C $site rev-parse origin/$base) != $before ]] \
      && git -C $site merge-base --is-ancestor $before origin/$base; then
    print "origin/$base moved during the build; rebuilding on it once." >&2
    cd $site; git worktree remove --force $wt; git branch -q -D ${wt:t}
    CATCH_PUBLISH_RETRY=1 exec zsh $here/publish.sh $args
  fi
  print "Publish commit $pushed is preserved in $wt (branch ${wt:t})." >&2
  print "Retry after resolving the push rejection (this reruns checks and deployment monitoring):" >&2
  print "CATCH_BASE=${(q)base} CATCH_LIVE=${(q)live} zsh ${(q)here}/publish.sh --merge ${(q)wt:t} ${(q)stories}" >&2
  exit 1
fi
deployed=0
node scripts/deploy-wait.mjs $pushed --ignore "$known" || deployed=$?
(( deployed == 0 || deployed == 3 )) || exit 1
(( deployed != 3 )) || print "cannot follow the cloudflare build; waiting on the live page instead" >&2
for s in $stories; do
  node scripts/live-ready.mjs $live/events/${s%%--*}/${s#*--}/ $pushed || exit 1
done
node scripts/live-audit.mjs $live
print "published from $wt"
