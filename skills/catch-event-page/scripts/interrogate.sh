#!/usr/bin/env bash
# Independent completeness review of a built story page by a model that did not write it.
# Usage: skills/catch-event-page/scripts/interrogate.sh <subject>/<story> [out.md]
# Reads dist/events/<subject>/<story>/index.html and checks/manifests/<subject>--<story>.json,
# builds the prompt in references/interrogation.md, runs grok with web and X search on,
# and writes the numbered gap list to the output file (default: checks/interrogations/<subject>--<story>-<date>.md).
set -euo pipefail
story="${1:?usage: interrogate.sh <subject>/<story> [out.md]}"
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
html="$root/dist/events/$story/index.html"
manifest="$root/checks/manifests/$subject--$slug.json"
out="${2:-$root/checks/interrogations/$subject--$slug-$(date -u +%Y-%m-%d).md}"
[ -f "$html" ] || { echo "build first: $html is missing" >&2; exit 2; }
[ -f "$manifest" ] || { echo "manifest missing: $manifest" >&2; exit 2; }
mkdir -p "$(dirname "$out")"
prompt="$(mktemp)"
{
  sed -n '/^=== PROMPT ===$/,/^=== END PROMPT ===$/p' "$root/skills/catch-event-page/references/interrogation.md" | sed '1d;$d'
  printf '\n=== PAGE TEXT ===\n'
  sed 's/<[^>]*>/ /g' "$html" | tr -s ' \n' ' '
  printf '\n\n=== SOURCES THE PAGE USED ===\n'
  python3 -c "import json,sys; [print('-', r['publisher'], '|', r['title'], '|', r['url']) for r in json.load(open(sys.argv[1]))['records']]" "$manifest"
} > "$prompt"
"${GROK_BIN:-$HOME/.grok/bin/grok}" --always-approve --no-subagents -p "$(cat "$prompt")" > "$out" 2> "$out.err"
rm -f "$prompt"
echo "$out"
