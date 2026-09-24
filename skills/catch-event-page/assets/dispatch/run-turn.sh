#!/bin/zsh
# Render a turn prompt and launch the author detached. Usage:
#   run-turn.sh record|structure|story <subject> <slug> <worktree> <branch> <skill-commit> [candidate-block-file]
# Placeholders: SUBJECT SLUG WORKTREE BRANCH SKILL_COMMIT EVENT_ID (env) AUDIT_FILE (env, structure) CANDIDATE_BLOCK (file, record).
# Writes the rendered prompt, the log and .started/.finished markers under $DISPATCH_DIR
# (default /Volumes/4/scratch-fable-profile/grok-authoring/dispatch). Host: $AUTHOR_HOST, codex (default) or grok;
# model: $AUTHOR_MODEL (default gpt-6-sol on codex, grok-4.7 on grok). Both are always set explicitly in a timed run.
set -euo pipefail
turn="${1:?turn}"; subject="${2:?subject}"; slug="${3:?slug}"; wt="${4:?worktree}"; branch="${5:?branch}"; commit="${6:?skill commit}"; cand="${7:-}"
here="$(cd "$(dirname "$0")" && pwd)"; out="${DISPATCH_DIR:-/Volumes/4/scratch-fable-profile/grok-authoring/dispatch}"; mkdir -p "$out"
name="$subject--$slug-$turn"; prompt="$out/$name.prompt.txt"
python3 - "$here/prompt-$turn.txt" "$prompt" "$subject" "$slug" "$wt" "$branch" "$commit" "${EVENT_ID:-}" "${AUDIT_FILE:-}" "$cand" <<'PY'
import sys
src, dst, subject, slug, wt, branch, commit, event, audit, cand = sys.argv[1:]
t = open(src).read()
block = open(cand).read().strip() if cand else ""
for k, v in {"SUBJECT": subject, "SLUG": slug, "WORKTREE": wt, "BRANCH": branch, "SKILL_COMMIT": commit, "EVENT_ID": event, "AUDIT_FILE": audit, "CANDIDATE_BLOCK": block}.items():
    t = t.replace("{" + k + "}", v)
left = [l for l in t.split("\n") if "{" in l and "}" in l and any(k in l for k in ("SUBJECT","SLUG","WORKTREE","BRANCH","SKILL_COMMIT","EVENT_ID","AUDIT_FILE","CANDIDATE_BLOCK"))]
if left: sys.exit("unfilled placeholder: " + left[0][:120])
open(dst, "w").write(t)
PY
[ "$(git -C "$wt" rev-parse --short HEAD)" != "" ] || exit 2
git -C "$wt" merge-base --is-ancestor "$commit" HEAD || { echo "the worktree does not contain skill commit $commit" >&2; exit 2; }
runner="$out/$name.run.sh"
host="${AUTHOR_HOST:-codex}"
case "$host" in
  codex) launch="codex exec -m \"${AUTHOR_MODEL:-gpt-6-sol}\" --skip-git-repo-check -C \"$wt\" -c model_reasoning_effort=high \"\$(cat \"$prompt\")\" </dev/null" ;;
  grok) launch="$HOME/.grok/bin/grok --always-approve -m \"${AUTHOR_MODEL:-grok-4.7}\" --prompt-file \"$prompt\" </dev/null" ;;
  *) echo "AUTHOR_HOST is codex or grok, not $host" >&2; exit 2 ;;
esac
cat > "$runner" <<SH
#!/bin/zsh
cd "$wt"
date -u +%Y-%m-%dT%H:%M:%SZ > "$out/$name.started"
$launch
echo "$host exit \$?"
date -u +%Y-%m-%dT%H:%M:%SZ > "$out/$name.finished"
SH
chmod +x "$runner"
python3 - "$runner" "$out/$name.log" "$out/$name.pid" <<'PY'
import os, subprocess, sys
runner, log, pidfile = sys.argv[1:]
p = subprocess.Popen(["/bin/zsh", runner], stdout=open(log, "w"), stderr=subprocess.STDOUT, stdin=subprocess.DEVNULL, preexec_fn=os.setsid)
open(pidfile, "w").write(str(p.pid)); print("launched pid", p.pid)
PY
echo "prompt $prompt"; echo "log $out/$name.log"; echo "finished marker $out/$name.finished"
