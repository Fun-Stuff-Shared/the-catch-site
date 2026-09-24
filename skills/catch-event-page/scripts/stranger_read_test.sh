#!/usr/bin/env bash
# Fixtures for stranger_read.sh: a first-ever read with no earlier report reaches the reader with
# "none" as the earlier reports, and a later read lists the earlier report. The Claude call is a
# stub on PATH that records the prompt and writes a report.
# Usage: bash stranger_read_test.sh   (exit 1 on the first failed case)
set -uo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
root="$tmp/root"
mkdir -p "$root/skills/catch-event-page/scripts" "$root/dist/events/s/x" "$root/checks/reader-models" "$tmp/bin"
cp "$here/stranger_read.sh" "$here/page_text.py" "$root/skills/catch-event-page/scripts/"
{ echo "<html><body><main><h1>An event</h1><p>The event line.</p>"; for i in $(seq 1 40); do echo "<p>Paragraph $i of the story view, long enough that the page text passes the partial-page check with room to spare.</p>"; done; echo "</main></body></html>"; } > "$root/dist/events/s/x/index.html"
printf '# s: x\n\n## Entering\n\nx\n\n## Exiting\n\n1. a\n\n## Headline\n\nH\n\nDek: d\n\n## Grades\n\n## Sections\n\n' > "$root/checks/reader-models/s--x.md"
cat > "$tmp/bin/claude" <<'STUB'
#!/usr/bin/env bash
prompt=; while [ $# -gt 0 ]; do case "$1" in -p) prompt="$2"; shift 2;; *) shift;; esac; done
printf '%s' "$prompt" > "$STUB_PROMPT"
echo 'A stranger report.'
STUB
chmod +x "$tmp/bin/claude"
fail() { echo "FAIL $1"; exit 1; }
date="$(date -u +%Y-%m-%d)"

STUB_PROMPT="$tmp/prompt1.txt" PATH="$tmp/bin:$PATH" bash "$root/skills/catch-event-page/scripts/stranger_read.sh" s/x > "$tmp/run1.log" 2>&1
[ $? = 0 ] || fail "first read with no earlier report: exit $? (log: $(cat "$tmp/run1.log"))"
grep -q '(none)' "$tmp/prompt1.txt" || fail "first read: prompt does not say earlier reports are none"
[ -s "$root/checks/audits/s--x-$date-stranger.md" ] || fail "first read: no report written"
echo "ok   first read with no earlier report reaches the reader"

echo 'An earlier report.' > "$root/checks/audits/s--x-2026-01-01-stranger.md"
STUB_PROMPT="$tmp/prompt2.txt" PATH="$tmp/bin:$PATH" bash "$root/skills/catch-event-page/scripts/stranger_read.sh" s/x > "$tmp/run2.log" 2>&1 || fail "second read: exit $?"
grep -q "s--x-2026-01-01-stranger.md" "$tmp/prompt2.txt" || fail "second read: prompt does not list the earlier report"
grep -q "s--x-$date-stranger.md" "$tmp/prompt2.txt" && fail "second read: prompt lists its own report"
echo "ok   a later read lists the earlier report and not itself"
echo "stranger_read_test: 2 cases pass"
