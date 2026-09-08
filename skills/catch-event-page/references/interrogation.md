# Independent interrogation (gate 6)

A model that did not write the page reads the finished page and lists everything it does
not cover or account for. The byte checks prove what is on the page is real; this step
types what is absent. Run it after the gate passes and before the review ping.

Run:

```bash
node scripts/../skills/catch-event-page/scripts/interrogate.sh jobs/august-2026
# writes checks/interrogations/jobs--august-2026-<date>.md
```

The script uses grok with web search and X search on (`--always-approve`, no subagents), so
the reviewer can pull posts by economists and officials, the White House and Treasury
reaction, prediction markets, and outlets the capture sweep did not hold. Any model with
web access can run the same prompt; paste the prompt block below plus the page text and
the source list.

## What to do with the result

Every numbered gap becomes a row in the needs ledger with one of three outcomes, written
the same session:

1. **Fixed on the page.** The gap named a held or fetchable record: admit it (procedures.md
   steps 3 and 5), cite it, rebuild.
2. **Typed, unreachable.** The record cannot be admitted (paywalled, deleted, a claim with no
   document behind it). The manifest `needs_ledger` row says so in reader words, and the
   page's "What we do not know yet" section carries it when a reader would miss it.
3. **Declined, with the reason.** The gap is out of the story's scope or is opinion rather
   than record. Write the reason in the ledger row. Never dismiss the list wholesale.

Two kinds of finding get special handling:

- **A sentence flagged wrong or overstated.** Reopen the pinned record before deciding.
  If the reviewer is right, fix the sentence and note the correction in the page's
  "Story updated" date; if the reviewer is wrong, say why in the ledger row.
- **Drama and reaction** (political statements, criticism of the agency, market bets, viral
  posts). These enter the page only through an admitted record: capture the post or
  statement through the registry (`capture news <url> --reason ...`), pin it, cite it. A
  reaction the page cannot pin is typed, never paraphrased from the reviewer's summary.

## The prompt

The block between the markers is what the script sends, followed by the page text and the
source list.

=== PROMPT ===
You are reviewing a finished news analysis page for completeness. Below is the full text of the page, then the list of sources it used. Use web search and X (Twitter) search freely.

Tell me everything this page does not cover or account for:
- sources it should have used: other outlets, the issuing agency's own release text and tables, official statements, reactions from officials (Fed, White House, Treasury, Congress), posts on X by economists, officials or the outlets' own reporters, prediction markets, and related releases the same week;
- ordering and angles a reader would expect that are missing or buried;
- context the page asserts without support, and numbers that should have been checked;
- any story, drama, dispute, or criticism around the subject (political reaction, questions about the data, forecasts that were badly wrong, what happens next);
- any sentence that reads as wrong, overstated, or unsupported.

Take your time. For each gap give, on one numbered line: what is missing; why a reader would want it; where it could be sourced, with a URL when you find one and the date of the post or article. Prefer primary sources and the original post over a report about it. Do not rewrite the page. Do not pad: if the page already covers a point, do not list it.
=== END PROMPT ===
