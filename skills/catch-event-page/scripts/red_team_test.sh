#!/usr/bin/env bash
# Fixtures for red_team.sh's preflight: a first-ever run with no earlier report reaches the review
# with "Earlier reports on this page: none", and a reader model without a headline is refused.
# The codex call is a stub on PATH that records the prompt and writes a verdict.
# Usage: bash red_team_test.sh   (exit 1 on the first failed case)
set -uo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/root/skills/catch-event-page/scripts" "$tmp/root/dist/events/s/x" "$tmp/root/checks/manifests" "$tmp/root/checks/reader-models" "$tmp/root/src/pages/events/s" "$tmp/bin"
cp "$here/red_team.sh" "$tmp/root/skills/catch-event-page/scripts/red_team.sh"
echo '<html><body><p>page</p></body></html>' > "$tmp/root/dist/events/s/x/index.html"
echo '{"records":[]}' > "$tmp/root/checks/manifests/s--x.json"
echo '' > "$tmp/root/src/pages/events/s/x.astro"
printf '# s: x\n\n## Entering\n\nx\n\n## Exiting\n\n1. a\n\n## Headline\n\nH\n\nDek: d\n\n## Grades\n\n## Sections\n\n' > "$tmp/root/checks/reader-models/s--x.md"
cat > "$tmp/bin/codex" <<'STUB'
#!/usr/bin/env bash
out=; while [ $# -gt 0 ]; do case "$1" in -o) out="$2"; shift 2;; *) last="$1"; shift;; esac; done
printf '%s' "$last" > "${out%.md}.prompt.txt"
echo 'VERDICT: SHIP' > "$out"
STUB
chmod +x "$tmp/bin/codex"
fail() { echo "FAIL $1"; exit 1; }

out="$tmp/root/checks/audits/s--x-first-redteam.md"
PATH="$tmp/bin:$PATH" bash "$tmp/root/skills/catch-event-page/scripts/red_team.sh" s/x "$out" > "$tmp/run1.log" 2>&1
[ $? = 0 ] || fail "first run with no earlier report: exit $? (log: $(cat "$tmp/run1.log"))"
grep -q 'Earlier reports on this page: none' "${out%.md}.prompt.txt" || fail "first run: prompt does not say earlier reports are none"
echo "ok   first run with no earlier report reaches the review"

out2="$tmp/root/checks/audits/s--x-second-redteam.md"
PATH="$tmp/bin:$PATH" bash "$tmp/root/skills/catch-event-page/scripts/red_team.sh" s/x "$out2" > "$tmp/run2.log" 2>&1 || fail "second run: exit $?"
grep -q "Earlier reports on this page: $out" "${out2%.md}.prompt.txt" || fail "second run: prompt does not list the first report"
echo "ok   second run lists the first report"

printf '# s: x\n\n## Entering\n\nx\n\n## Exiting\n\n1. a\n\n## Grades\n\n## Sections\n\n' > "$tmp/root/checks/reader-models/s--x.md"
PATH="$tmp/bin:$PATH" bash "$tmp/root/skills/catch-event-page/scripts/red_team.sh" s/x "$tmp/root/checks/audits/s--x-third-redteam.md" > "$tmp/run3.log" 2>&1
[ $? = 2 ] || fail "no headline: exit $?, wanted 2"
grep -q 'Rerun turn two' "$tmp/run3.log" || fail "no headline: no rerun message"
echo "ok   reader model without a headline is refused"
echo "red_team_test: 3 cases pass"
