#!/usr/bin/env bash
# The stranger read: a Claude reader that did not write the page reads it the way a person would,
# then answers the reader model's seven questions and lists where it misread or stalled.
# Usage: skills/catch-event-page/scripts/stranger_read.sh <subject>/<story> [port]
# Input is the built page (dist/events/<story>/index.html), or the dev server on <port> when given.
# Writes checks/audits/<subject>--<story>-<date>-stranger-page.txt (the page as the story view reads:
# tags, proof-layer blocks and citation numbers stripped, block breaks kept), the rendered prompt
# beside it as -stranger-prompt.txt, and the report as -stranger.md.
# Inside a Claude Code session the reviewer may run the rendered prompt as one Agent-tool subagent
# instead of the claude command below; the input, prompt and report paths are the same.
set -euo pipefail
story="${1:?usage: stranger_read.sh <subject>/<story> [port]}"
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
date="$(date -u +%Y-%m-%d)"
base="$root/checks/audits/$subject--$slug-$date-stranger"
rm="$root/checks/reader-models/$subject--$slug.md"
[ -f "$rm" ] || { echo "reader model missing: $rm" >&2; exit 2; }
mkdir -p "$(dirname "$base")"
if [ -n "${2:-}" ]; then
  curl -fsS "http://127.0.0.1:$2/events/$story/" > "$base-page.html"
else
  html="$root/dist/events/$story/index.html"
  [ -f "$html" ] || { echo "build first: $html is missing" >&2; exit 2; }
  cp "$html" "$base-page.html"
fi
python3 "$root/skills/catch-event-page/scripts/page_text.py" "$base-page.html" > "$base-page.txt"
rm -f "$base-page.html"
[ "$(wc -c < "$base-page.txt")" -gt 2000 ] || { echo "page text is $(wc -c < "$base-page.txt") bytes; the server returned a partial page" >&2; exit 2; }
event="$(sed -n '2p' "$base-page.txt")"
cat > "$base-prompt.txt" <<PROMPT
You are a stranger reading one web page about this event: $event. You have never seen this
project, its vocabulary, or its other pages. Do not search the web, do not open any other
file than the two named here, do not edit anything.

Read the page text at $base-page.txt top to bottom, once, the way a reader would. Then open
$rm, which describes the reader this page was written for and the seven questions that
reader brings.

Report, in plain words, at most 600 words:
1. For each of the seven questions: did the page answer it for you, where (quote the
   sentence), and did you have to work to find it. Answered / partly / not answered.
2. Every place you misread something, stalled, or could not follow: a term used before it
   was explained, a number whose meaning you could not tell, a sentence that names the page
   itself or its methods instead of the event, a sentence that addresses you as "the
   reader", a claim you could not tell the source of, a sentence that answers a question
   you had not asked.
3. Anything that reads as written by a machine or by the project for itself rather than for
   a person: process language, hedges, self-reference, repetition, a document as the
   subject of a sentence where the fact could stand alone.
4. The one thing you would want added, and the one thing you would cut.
Quote page sentences exactly. Do not propose rewrites. Do not summarize the event.
PROMPT
claude -p "$(cat "$base-prompt.txt")" --allowedTools Read --output-format text </dev/null > "$base.md"
echo "$base.md"
