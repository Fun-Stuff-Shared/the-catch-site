#!/usr/bin/env bash
# Fixtures for editor_read.sh: the prompt carries the page as the reader gets it, the page's
# size, each answer beside the paragraph marked for it, and every earlier report from any
# read; a reader model the answer listing cannot read says so instead of "none marked";
# a run with no verdict exits 1. The codex call is a stub on PATH that records the prompt.
# Usage: bash editor_read_test.sh   (exit 1 on the first failed case)
set -uo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
root="$tmp/root"; scripts="$root/skills/catch-event-page/scripts"
mkdir -p "$scripts" "$root/dist/events/s/x" "$root/checks/manifests" "$root/checks/reader-models" "$root/checks/audits" "$root/src/pages/events/s" "$tmp/bin"
cp "$here/editor_read.sh" "$here/page_text.py" "$here/voice_lint.py" "$here/story_budget.mjs" "$here/cite_attrs.mjs" "$scripts/"
para='<p data-layer="narrative" data-answer="2">Viewers of a thousand local stations lost the only video of the president they get.<Cite s="rec-a" passage="the only source of video" /></p>'
printf '<html><body><main><h1>Headline</h1>%s</main></body></html>' "${para/<Cite s=\"rec-a\" passage=\"the only source of video\" \/>/}" > "$root/dist/events/s/x/index.html"
printf -- '---\n---\n<main>\n%s\n</main>\n' "$para" > "$root/src/pages/events/s/x.astro"
echo '{"records":[{"id":"rec-a","text_path":"data/sources/s/rec-a.txt"}]}' > "$root/checks/manifests/s--x.json"
model() { printf '# s: x\n\n## Entering\n\nx\n\n## Exiting\n\n1. one\n2. Why it matters: local stations lost the feed\n3. three\n4. four\n5. five\n6. six\n\n## Headline\n\nH\n\nDek: d\n\n## Grades\n\n| Record | Passage or gap or audit finding | Grade | Serves answer |\n|---|---|---|---|\n%s\n## Sections\n\n' "$1" > "$root/checks/reader-models/s--x.md"; }
model '| `rec-a` | "the only source of video" L4: the feed. | A | 2, who lost the feed |'
cat > "$tmp/bin/codex" <<'STUB'
#!/usr/bin/env bash
out=; while [ $# -gt 0 ]; do case "$1" in -o) out="$2"; shift 2;; *) last="$1"; shift;; esac; done
printf '%s' "$last" > "${out%.md}.prompt.txt"
[ -n "${STUB_VERDICT:-}" ] && printf 'A memo.\n\nVERDICT: %s\n' "$STUB_VERDICT" > "$out"
exit 0
STUB
chmod +x "$tmp/bin/codex"
fail() { echo "FAIL $1"; exit 1; }
run() { STUB_VERDICT="$1" PATH="$tmp/bin:$PATH" bash "$scripts/editor_read.sh" s/x "$2" > "$tmp/run.log" 2>&1; }

one="$root/checks/audits/s--x-2026-01-01-editor.md"
run NO-SHIP "$one" || fail "first read: exit $? ($(cat "$tmp/run.log"))"
p="${one%.md}.prompt.txt"
grep -q 'record audit), none;' "$p" || fail "first read: the prompt does not say earlier reports are none"
grep -q "^answer 2: Why it matters: local stations lost the feed" "$p" || fail "the prompt does not list answer 2"
for pair in "1 one" "3 three" "4 four" "5 five" "6 six"; do grep -q "^answer ${pair% *}: ${pair#* }" "$p" || fail "the prompt does not list answer ${pair% *} with its words"; done
grep -q "Viewers of a thousand local stations lost the only video" "$p" || fail "the prompt does not put the marked paragraph beside answer 2"
grep -q "sentence lengths: .* words in 1 sentences" "$p" || fail "the prompt does not carry the page's size"
grep -q "Viewers of a thousand local stations" "${one%.md}-page.txt" || fail "the page text file was not written"
echo "ok   a first read gets the page text, its size and each answer beside its marked paragraph"

echo 'VERDICT: NO-SHIP' > "$root/checks/audits/s--x-2025-12-31-redteam.md"
echo 'stalled' > "$root/checks/audits/s--x-2025-12-31-stranger.md"
echo 'DONE' > "$root/checks/audits/s--x-2025-12-31-entailment.md"
two="$root/checks/audits/s--x-2026-01-02-editor.md"
run SHIP "$two" || fail "second read: exit $?"
grep -q "record audit), .*s--x-2026-01-01-editor.md" "${two%.md}.prompt.txt" || fail "second read: the first memo is not listed"
for read in redteam stranger entailment; do grep -q "record audit), .*s--x-2025-12-31-$read.md" "${two%.md}.prompt.txt" || fail "second read: the $read report is not listed"; done
grep -q "s--x-2026-01-02-editor.md" <<<"$(grep -o 'record audit), [^;]*' "${two%.md}.prompt.txt")" && fail "second read: lists its own output as an earlier report"
echo "ok   a second read lists the earlier memo and the red team, stranger and entailment reports, never itself"

model ''
three="$root/checks/audits/s--x-2026-01-03-editor.md"
run SHIP "$three" || fail "unreadable grades: exit $?"
grep -q "the listing could not be produced" "${three%.md}.prompt.txt" || fail "a reader model the listing cannot read is reported as nothing marked"
echo "ok   a reader model the answer listing cannot read is said to be unread, not unmarked"

four="$root/checks/audits/s--x-2026-01-04-editor.md"
run "" "$four"; [ $? = 1 ] || fail "no verdict: exit $?, wanted 1"
echo "ok   a run that returns no verdict exits 1"
echo "editor_read_test: 4 cases pass"
