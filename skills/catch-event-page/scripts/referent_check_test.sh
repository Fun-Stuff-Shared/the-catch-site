#!/usr/bin/env bash
# Fixtures for referent_check.sh and added_sentences.py: with --since, the page at that commit
# is built and only the sentences its story view did not show, or showed in another order,
# reach the model; a patch that adds nothing is CLEAR without a model call; STALLS exits 1.
# The codex call is a stub on PATH that records the prompt, and the site build is a stub that
# renders the fixture page the way the components do.
# Usage: bash referent_check_test.sh   (exit 1 on the first failed case)
set -uo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
root="$tmp/root"
mkdir -p "$root/skills/catch-event-page/scripts" "$root/dist/events/s/x" "$root/src/pages/events/s" "$root/src/data" "$root/data/state" "$root/scripts" "$root/node_modules/.bin" "$tmp/bin"
cp "$here/referent_check.sh" "$here/page_builds.sh" "$here/page_text.py" "$here/added_sentences.py" "$root/skills/catch-event-page/scripts/"
cat > "$root/node_modules/.bin/astro" <<'STUB'
#!/usr/bin/env bash
[ ! -e src/pages/events/s/broken ] || { echo "build error"; exit 1; }
[ -f src/pages/events/s/x.astro ] || exit 0
mkdir -p dist/events/s/x
{ printf '<html><body><main>'
  sed -e '1,/^---$/{/^---$/!d;}' -e '/^---$/d' src/pages/events/s/x.astro \
    | sed -e "s/{lede}/$(cat src/data/lede.txt)/" -e 's/<Cite [^>]*\/>/<sup class="src-ref">1<\/sup>/g' \
          -e 's/<SourcedBlock [^>]* detail>/<div class="sourced-block detail" data-layer="fact">/g' -e 's/<\/SourcedBlock>/<\/div>/g'
  printf '</main></body></html>'; } > dist/events/s/x/index.html
STUB
chmod +x "$root/node_modules/.bin/astro"
echo '// the stub build writes the page whole' > "$root/scripts/merge-cites.mjs"
echo 'The president announced the ban on three outlets on September 18.' > "$root/src/data/lede.txt"
old='<p data-layer="narrative">{lede}<Cite s="post" passage="x" /></p>'
new='<p data-layer="narrative">Feinberg said this initial decision would stand until the review ended. The pool halt came next. Klein objected.</p>'
proof='<div data-layer="proof"><p>The three counts describe hard passes held before the ban, according to each sworn declaration.</p></div><SourcedBlock source="post" kind="record" detail><p>The archived September 18 post names the three outlets.</p></SourcedBlock>'
page() { printf -- '---\nimport x from "y";\n---\n%s\n' "$1" > "$root/src/pages/events/s/x.astro"; (cd "$root" && node_modules/.bin/astro build); }
printf 'node_modules\ndist\n' > "$root/.gitignore"
page "$old
$proof"
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
run() { STUB_PROMPT="$tmp/prompt.txt" STUB_VERDICT="$1" PATH="$tmp/bin:$PATH" bash "$root/skills/catch-event-page/scripts/referent_check.sh" s/x "$tmp/out.md" --since "$base" > "$tmp/run.log" 2>&1; }

rm -f "$tmp/prompt.txt"; run STALLS; code=$?
[ $code = 0 ] || fail "a patch that added no sentence: exit $code ($(cat "$tmp/run.log"))"
[ ! -e "$tmp/prompt.txt" ] || fail "a patch that added no sentence still called the model"
grep -q '^VERDICT: CLEAR' "$tmp/out.md" || fail "a patch that added no sentence is not CLEAR"
[ -z "$(git -C "$root" worktree list | sed 1d)" ] || fail "the earlier build's worktree was left behind"
echo "ok   a patch that added no sentence is CLEAR without a model call, a sentence a data module supplies included"

page "$old
$new
$proof"
run STALLS; code=$?
[ $code = 1 ] || fail "STALLS: exit $code, wanted 1 ($(cat "$tmp/run.log"))"
grep -q '^1\. Feinberg said this initial decision would stand until the review ended\.$' "$tmp/prompt.txt" || fail "the added sentence is not item 1 of the prompt"
grep -q '^[0-9]*\. The president announced' "$tmp/prompt.txt" && fail "a sentence the earlier page held is listed"
grep -q '^2\. The pool halt came next\.$' "$tmp/prompt.txt" || fail "a five-word added sentence did not reach the model"
grep -q '^3\. Klein objected\.$' "$tmp/prompt.txt" || fail "a two-word added sentence did not reach the model"
echo "ok   only the added sentences reach the model, a two-word one included, and STALLS exits 1"

run CLEAR; code=$?
[ $code = 0 ] || fail "CLEAR: exit $code, wanted 0"
echo "ok   CLEAR exits 0"

page '<p data-layer="narrative">The three counts describe hard passes held before the ban, according to each sworn declaration. The archived September 18 post names the three outlets.</p>'"
$old"
rm -f "$tmp/prompt.txt"; run STALLS; code=$?
[ $code = 1 ] || fail "a sentence moved out of proof: exit $code, wanted 1 ($(cat "$tmp/run.log"))"
grep -q '^1\. The three counts describe hard passes held before the ban' "$tmp/prompt.txt" || fail "a sentence moved out of the proof layer did not reach the model"
grep -q '^[0-9]*\. The president announced' "$tmp/prompt.txt" && fail "a sentence the earlier story view held is listed"
grep -q '^2\. The archived September 18 post names the three outlets\.$' "$tmp/prompt.txt" || fail "a sentence moved out of a detail block did not reach the model"
echo "ok   a sentence moved from the proof layer or a detail block into the story view reaches the model"

page "$old
$proof"
echo 'The president announced the ban on four outlets on September 18.' > "$root/src/data/lede.txt"
(cd "$root" && node_modules/.bin/astro build)
rm -f "$tmp/prompt.txt"; run STALLS; code=$?
[ $code = 1 ] || fail "a changed data-module sentence: exit $code, wanted 1 ($(cat "$tmp/run.log"))"
[ "$(tail -1 "$tmp/prompt.txt")" = "1. The president announced the ban on four outlets on September 18." ] && [ -z "$(tail -2 "$tmp/prompt.txt" | sed -n 1p)" ] || fail "the changed data-module sentence is not the one sentence listed"
git -C "$root" checkout -q -- src/data/lede.txt; (cd "$root" && node_modules/.bin/astro build)
echo "ok   a sentence whose data-module value changed is listed by its value"

git -C "$root" rm -q --cached src/pages/events/s/x.astro && git -C "$root" -c user.email=t@t -c user.name=t -c commit.gpgsign=false commit -q -m "before the page"
before_page="$(git -C "$root" rev-parse HEAD)"
rm -f "$tmp/prompt.txt"; STUB_PROMPT="$tmp/prompt.txt" STUB_VERDICT=CLEAR PATH="$tmp/bin:$PATH" bash "$root/skills/catch-event-page/scripts/referent_check.sh" s/x "$tmp/out.md" --since "$before_page" > "$tmp/run.log" 2>&1 || fail "a page new since the commit: $(cat "$tmp/run.log")"
grep -q '^1\. The president announced the ban on three outlets on September 18\.$' "$tmp/prompt.txt" || fail "a page the earlier commit did not have: its sentences are not all listed"
echo "ok   every sentence is listed when the earlier commit had no such page"

touch "$root/src/pages/events/s/broken"; git -C "$root" add src/pages/events/s/broken src/pages/events/s/x.astro && git -C "$root" -c user.email=t@t -c user.name=t -c commit.gpgsign=false commit -q -m "a commit that does not build"
broken="$(git -C "$root" rev-parse HEAD)"; rm "$root/src/pages/events/s/broken"
rm -f "$tmp/prompt.txt"; STUB_PROMPT="$tmp/prompt.txt" STUB_VERDICT=CLEAR PATH="$tmp/bin:$PATH" bash "$root/skills/catch-event-page/scripts/referent_check.sh" s/x "$tmp/out.md" --since "$broken" > "$tmp/run.log" 2>&1; code=$?
[ $code = 2 ] && grep -q "did not build" "$tmp/run.log" && [ ! -e "$tmp/prompt.txt" ] || fail "an earlier commit that does not build: exit $code, wanted 2 and no model call ($(cat "$tmp/run.log"))"
echo "ok   an earlier commit that does not build stops the check before the model"

touch -t 203001010000 "$root/src/pages/events/s/x.astro"
rm -f "$tmp/prompt.txt"; run CLEAR; code=$?
[ $code = 2 ] && grep -q "build first" "$tmp/run.log" && [ ! -e "$tmp/prompt.txt" ] || fail "a built page older than its source: exit $code, wanted 2 and no model call ($(cat "$tmp/run.log"))"
touch "$root/src/pages/events/s/x.astro"; (cd "$root" && node_modules/.bin/astro build)
echo "ok   a built page older than its source stops the check"

printf '%s\n' 'Wilson described the release of the plan in his declaration.' 'That kind of release can harm national security.' 'The department restricted passes in October.' > "$tmp/order.txt"
[ -z "$(python3 "$root/skills/catch-event-page/scripts/added_sentences.py" "$tmp/order.txt" "$tmp/order.txt")" ] || fail "sentences in their earlier order are listed"
printf '%s\n' 'That kind of release can harm national security.' 'Wilson described the release of the plan in his declaration.' 'The department restricted passes in October.' > "$tmp/swapped.txt"
[ "$(python3 "$root/skills/catch-event-page/scripts/added_sentences.py" "$tmp/swapped.txt" "$tmp/order.txt")" = "1. That kind of release can harm national security." ] || fail "a sentence moved above the sentence it leaned on is not the one listed"
echo "ok   a sentence moved above a sentence that stood before it is listed, and nothing else is"

printf '%s\n' 'The pool halt came next.' 'The department restricted passes in October.' 'The pool halt came next.' > "$tmp/twice.txt"
printf '%s\n' 'The pool halt came next.' 'The department restricted passes in October.' > "$tmp/once.txt"
[ "$(python3 "$root/skills/catch-event-page/scripts/added_sentences.py" "$tmp/twice.txt" "$tmp/once.txt")" = "1. The pool halt came next." ] || fail "a sentence said a second time is not listed once"
echo "ok   a sentence the page now says twice is listed once"

echo 'President Donald J. Trump posted the order on Friday. The pool halt came next.' > "$tmp/initial.txt"
[ "$(python3 "$root/skills/catch-event-page/scripts/added_sentences.py" "$tmp/initial.txt" | sed -n 1p)" = "1. President Donald J. Trump posted the order on Friday." ] || fail "a middle initial split a sentence in two"
[ "$(python3 "$root/skills/catch-event-page/scripts/added_sentences.py" "$tmp/initial.txt" | wc -l | tr -d ' ')" = 2 ] || fail "a middle initial: wanted two sentences"
echo "ok   a middle initial does not end a sentence"
echo 'The Federal Reserve Bank of St. Louis published the series on Friday. The pool halt came next.' > "$tmp/saint.txt"
[ "$(python3 "$root/skills/catch-event-page/scripts/added_sentences.py" "$tmp/saint.txt" | sed -n 1p)" = "1. The Federal Reserve Bank of St. Louis published the series on Friday." ] || fail "St. split the sentence"
[ "$(python3 "$root/skills/catch-event-page/scripts/added_sentences.py" "$tmp/saint.txt" | wc -l | tr -d ' ')" = 2 ] || fail "St.: wanted two sentences"
echo "ok   St. in a place name does not end a sentence"
echo "referent_check_test: 12 cases pass"
