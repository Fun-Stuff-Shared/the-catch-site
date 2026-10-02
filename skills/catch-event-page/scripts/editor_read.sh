#!/usr/bin/env bash
# The editor's read of a built story page by a model that did not write it: what the piece
# says, whether the record as it stands today supports that story, what to cut, what to fix,
# and what a reader still asks, with every addition paid for by a cut. One memo, in page
# order, that an author can apply in one pass.
# Usage: skills/catch-event-page/scripts/editor_read.sh <subject>/<story> [out.md]
# Writes checks/audits/<subject>--<story>-<date>-editor.md (memo and verdict), its -page.txt
# (the page as the story view reads) and .log (full run).
set -euo pipefail
story="${1:?usage: editor_read.sh <subject>/<story> [out.md]}"
subject="${story%%/*}"; slug="${story##*/}"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
scripts="$root/skills/catch-event-page/scripts"
html="$root/dist/events/$story/index.html"
page="$root/src/pages/events/$story.astro"
manifest="$root/checks/manifests/$subject--$slug.json"
rm="$root/checks/reader-models/$subject--$slug.md"
ledger="$root/checks/working-notes/$subject--$slug.md"
held="$root/checks/working-notes/$subject--$slug-held.md"
out="${2:-$root/checks/audits/$subject--$slug-$(date -u +%Y-%m-%d)-editor.md}"
prior="$({ ls "$root/checks/audits/$subject--$slug-"*.md 2>/dev/null || true; } | { grep -v -F "$out" || true; } | tr '\n' ' ')"
[ -f "$html" ] || { echo "build first: $html is missing" >&2; exit 2; }
[ -f "$manifest" ] || { echo "manifest missing: $manifest" >&2; exit 2; }
[ -f "$rm" ] || { echo "reader model missing: $rm" >&2; exit 2; }
mkdir -p "$(dirname "$out")"
pagetxt="${out%.md}-page.txt"
python3 "$scripts/page_text.py" "$html" > "$pagetxt"
size="$(python3 "$scripts/voice_lint.py" --lengths "$html" | sed -n '2,5p')"
answers="$(node "$scripts/story_budget.mjs" "$page" "$rm" "$manifest" --answers 2>/dev/null | grep -E '^(answer [1-6]:|  )' || true)"
prompt="$(mktemp)"
cat > "$prompt" <<PROMPT
You are the editor of this piece. A reporter filed it; you did not write it; the decision to run it is yours. You are not hunting for ways it could be wrong and you are not listing everything the record holds. You decide what this piece must do for a reader, whether it does it, and which changes get it there with the fewest words moved. An editor who only adds has not edited.

Read in this order.
1. The page as a reader gets it: $pagetxt (the story view, one block per line). Read it once, top to bottom, before opening anything else, and write down three things you will report under "First read": the story in one sentence as the page told it to you; the questions you still had at the end; the first place you lost the thread, if any (quote it).
2. What the piece set out to tell: the reader model at $rm (seven answers, then a grade A to D for every passage: A changes the event, B changes the reading, C strengthens the proof, D changes no answer).
3. The record: $manifest lists the records, with pinned files and text pins under $root/data/sources/. Read every pin the story view cites, whole. The page source is $page (data module under $root/src/data/). Use the network for two things only: what has happened since the page's date (rulings, filings, statements by the actors named), and a primary record the piece reaches only through an outlet.
4. The review log: every earlier report on this page, from any read (editor, red team, entailment, stranger, record audit), ${prior:-none}; the author's ledger $ledger when it exists; the editor's held list $held when it exists (decided, not open). Do not report a held item. Do not repeat an earlier finding unless the ledger says it was patched and the page still carries it; tag that "residual" and everything else "new".

The page's size now:
$size

Answers and their paragraphs (each of the reader model's answers 1 to 6 beside the story-view paragraph the author marked as carrying it):
${answers:-the listing could not be produced (story_budget.mjs did not read this page and reader model); judge each answer from the page text.}

Write the edit memo with these headings.

## First read
The three things from step 1, written before you opened the reader model.

## The story
Is the story the page told you the story the record supports today? State it in one sentence from the record, then say where the page's version differs: the angle, the opening act, what changed, what is unresolved. If the event has moved since the page's date, say what moved first, with the record (URL or file, exact bytes). A piece that is behind its event does not run. If the event is a sequence (an act, its consequence, the process that followed), say whether one passage near the top gives the order with its dates; a sequence a reader has to assemble from several sections is a defect of the story, not a line edit. Then take answers 1 to 6 in turn: does the marked paragraph (with no mark, any sentence of the story view) say the answer in words a reader could repeat to someone else? A number or a mechanism standing where the sentence should be (how many stations take a feed, in place of what changed for the people who watch them) does not carry the answer, and neither does a paragraph that only wears the mark: name the answer, and ask for the sentence, never for another fact.

## The top
The headline, the dek and the first paragraph, judged as a cold reader meets them: does the first sentence say what happened; does the headline survive the easiest wrong reading (answer 3); is anyone named before being introduced; does the top lean on a term the page explains later.

## Line edits
In page order, numbered. Each: the page bytes exactly; one kind; the reason in a clause; for FIX, the record (file path or URL) and its exact bytes in quotation marks.
- CUT: told twice; a detour that never returns to the story; record detail that belongs in a detail block or the proof; a sentence about importance instead of a fact.
- TIGHTEN: a sentence carrying three records' worth of clauses, or a run of short sentences that reads as a list.
- MOVE: a fact a reader needs earlier than the page gives it.
- CLARIFY: a demonstrative, surname, role or named rule with nothing before it to hang on; an earlier case or ruling named without what it decided; a connective between two records that no record states; a dated statement that reads as the state today.
- FIX: a sentence that says more than its record, an altered or stitched quotation, a scope or actor wider than the record, a record given a subject it does not have (a statement about one thing described as a statement about another), a "first" or superlative no record makes, an absence any pinned record contradicts.
Do not rewrite sentences. Anything you say a record says goes inside quotation marks, in the record's own words; never your paraphrase in quotation marks.

## Holes
What a reader of this piece will ask that it does not answer, ranked by how much the answer changes the story. Each: the question; the record that answers it (file or URL, exact bytes); which answer of the reader model it changes; and what it displaces, by line-edit number or page bytes. A question no record answers is an unknown: say whether the page states it as one.

## The budget
Words now, words your cuts remove, words your holes add, in round numbers.

## Decision
Tag every numbered item Critical, Major or Minor. Critical: a sentence false against its own record, an altered quotation, a piece behind its event. Major: a sentence its record does not support; an answer 1 to 6 that no sentence on the page carries in words a reader could repeat; a passage graded A or B that the story view lacks; a passage graded C or D that changes one of answers 1 to 7 (name the answer); a story-view paragraph built only on C or D passages; a top that fails a cold reader. Minor: everything else, including every cut and every omission of C material. An omitted D passage that changes no answer is not an item. End with exactly one line: VERDICT: SHIP if no item is Critical or Major, otherwise VERDICT: NO-SHIP.

Rules: do not edit any file; do not run git commit, git reset, git checkout, or any command that mutates repository state; do not kill, restart, or signal any process you did not start. No em dashes anywhere in your output.
PROMPT
codex exec -m "${CODEX_MODEL:-gpt-6-sol}" --skip-git-repo-check -C "$root" -c model_reasoning_effort=high -o "$out" "$(cat "$prompt")" </dev/null > "${out%.md}.log" 2>&1 || true
rm -f "$prompt"
grep -q '^VERDICT: ' "$out" 2>/dev/null || { echo "no VERDICT line in $out; read ${out%.md}.log and rerun" >&2; exit 1; }
echo "$out"
