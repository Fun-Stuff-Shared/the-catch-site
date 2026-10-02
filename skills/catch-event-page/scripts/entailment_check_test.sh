#!/usr/bin/env bash
# Fixtures for entailment_check.sh: the table it sends is read from the built page; with
# --since the page at that commit is built and only the blocks that changed reach the model;
# a patch that changed nothing is ENTAILED without a model call. The codex call is a stub on
# PATH that records the prompt, and the site build is a stub that renders the fixture page.
# Usage: bash entailment_check_test.sh   (exit 1 on the first failed case)
set -uo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
root="$tmp/root"
mkdir -p "$root/skills/catch-event-page/scripts" "$root/src/pages/events/s" "$root/src/data" "$root/data/state" "$root/scripts" "$root/checks/manifests" "$root/node_modules/.bin" "$tmp/bin"
cp "$here/entailment_check.sh" "$here/page_builds.sh" "$here/claim_table.py" "$root/skills/catch-event-page/scripts/"
cat > "$root/node_modules/.bin/astro" <<'STUB'
#!/usr/bin/env bash
[ -f src/pages/events/s/x.astro ] || exit 0
mkdir -p dist/events/s/x
{ printf '<html><body><main>'
  sed -e '1,/^---$/{/^---$/!d;}' -e '/^---$/d' src/pages/events/s/x.astro \
    | sed -e "s/{total}/$(cat src/data/total.txt)/" -e 's/<Cite s="\([^"]*\)" passage="\([^"]*\)" \/>/<sup class="src-ref"><a href="#src-1" data-record-href="\/records\/\1\/" data-passage="\2">1<\/a><\/sup>/g'
  printf '</main></body></html>'; } > dist/events/s/x/index.html
STUB
chmod +x "$root/node_modules/.bin/astro"
echo '// the stub build writes the page whole' > "$root/scripts/merge-cites.mjs"
echo '{"records":[{"id":"post","text_path":"data/sources/post.txt"},{"id":"count","text_path":"data/sources/count.txt"}]}' > "$root/checks/manifests/s--x.json"
echo 78 > "$root/src/data/total.txt"
page() { printf -- '---\nimport x from "y";\n---\n<h1>The ban</h1>\n<p data-layer="narrative">%s<Cite s="post" passage="effective immediately" /></p>\n<p class="chart-source">The declarations report {total} passes.<Cite s="count" passage="40 journalists" /></p>\n' "$1" > "$root/src/pages/events/s/x.astro"; (cd "$root" && node_modules/.bin/astro build); }
printf 'node_modules\ndist\n' > "$root/.gitignore"
page "The president announced the ban."
git -C "$root" init -q && git -C "$root" add -A && git -C "$root" -c user.email=t@t -c user.name=t -c commit.gpgsign=false commit -q -m base
base="$(git -C "$root" rev-parse HEAD)"
cat > "$tmp/bin/codex" <<'STUB'
#!/usr/bin/env bash
out=; last=; while [ $# -gt 0 ]; do case "$1" in -o) out="$2"; shift 2;; *) last="$1"; shift;; esac; done
printf '%s' "$last" > "$STUB_PROMPT"
printf 'A report.\n\nVERDICT: %s\n' "$STUB_VERDICT" > "$out"
STUB
chmod +x "$tmp/bin/codex"
fail() { echo "FAIL $1"; exit 1; }
run() { rm -f "$tmp/prompt.txt"; STUB_PROMPT="$tmp/prompt.txt" STUB_VERDICT=ENTAILED PATH="$tmp/bin:$PATH" bash "$root/skills/catch-event-page/scripts/entailment_check.sh" s/x "$tmp/out.md" "$@" > "$tmp/run.log" 2>&1; }

run; code=$?
[ $code = 0 ] || fail "the whole page: exit $code ($(cat "$tmp/run.log"))"
grep -q '^| 1 | top | The president announced the ban\. | post: effective immediately; data/sources/post.txt |$' "$tmp/prompt.txt" || fail "the cited paragraph is not row 1 with its record, passage and pin"
grep -q '^| 2 | top | The declarations report 78 passes\. | count: 40 journalists' "$tmp/prompt.txt" || fail "the row does not hold the value the page shows"
grep -q '^| [0-9]* | top | The ban |' "$tmp/prompt.txt" && fail "the whole-page table lists a block with no citation"
echo "ok   the whole page: every cited block reaches the model in the words the page shows"

run --since "$base"; code=$?
[ $code = 0 ] && [ ! -e "$tmp/prompt.txt" ] && grep -q '^VERDICT: ENTAILED' "$tmp/out.md" || fail "a patch that changed nothing: exit $code, wanted ENTAILED and no model call ($(cat "$tmp/run.log"))"
[ -z "$(git -C "$root" worktree list | sed 1d)" ] || fail "the earlier build's worktree was left behind"
echo "ok   a patch that changed nothing is ENTAILED without a model call"

echo 79 > "$root/src/data/total.txt"; (cd "$root" && node_modules/.bin/astro build)
run --since "$base"; code=$?
[ $code = 0 ] || fail "a changed value: exit $code ($(cat "$tmp/run.log"))"
grep -q '^| 1 | top | The declarations report 79 passes\. |' "$tmp/prompt.txt" || fail "a block whose rendered value changed is not the row sent"
grep -q 'The president announced' "$tmp/prompt.txt" && fail "a block that did not change is listed"
echo "ok   a value that changed outside the page source is listed as the page shows it, and nothing else is"

touch -t 203001010000 "$root/src/pages/events/s/x.astro"
run; code=$?
[ $code = 2 ] && grep -q "build first" "$tmp/run.log" && [ ! -e "$tmp/prompt.txt" ] || fail "a built page older than its source: exit $code, wanted 2 and no model call ($(cat "$tmp/run.log"))"
echo "ok   a built page older than its source stops the check"
echo "entailment_check_test: 4 cases pass"
