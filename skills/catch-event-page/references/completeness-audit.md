# Completeness audit (gate 6, second half)

The interrogation asks a model with web search what the page does not cover. The
completeness audit is a different question, asked in three layers, by a model that did
not write the page and that reads the page as a starting point rather than a boundary.
An article can be right sentence by sentence and still be wrong by omission; a citation
on every sentence proves nothing about what the sentences leave out. This step exists
because the Texas page shipped "the ad names no document" with source slates sitting in
the video frames, and nobody who verified the sentences looked outside the frame.

Run it on the built page, after the gate passes and after the interrogation dispositions
are on the page. It is a required step: a story is not staged until the audit has run
and every finding has a disposition in `checks/audits/`.

```bash
skills/catch-event-page/scripts/completeness_audit.sh <subject>/<story>
# writes checks/audits/<subject>--<story>-<date>.md (verdict) and .log (full run)
```

## The three layers the auditor runs

1. **Verification.** For each material proposition (numbers, dates, quotations, causal
   claims, procedural characterizations, superlatives, motive claims, absence claims):
   does the cited record support the page's wording, and does the broader record support
   the proposition? The two judgments stay separate. Wording that is literally defensible
   but materially misleading is a finding.
2. **Completeness discovery.** Search backward (what came before the page's chosen
   beginning), forward (what happened after its endpoint), and horizontally (actors,
   records, counterevidence, competing explanations, denominators, procedural stage) that
   the page does not hold. Every citation the page's own sources make is followed to its
   record: an ad's on-screen slate, a story's linked filing, a release's underlying data.
   Independent lineages are counted, not domains: syndicated copies of one dispatch or
   several stories built on one filing are one confirmation.
3. **Independent reconstruction.** Ignoring the page's narrative, rebuild the current state
   of the story from the strongest evidence found, then try to disprove that
   reconstruction. Differences between it and the page are findings.

The auditor's completion standard: it may not return COMPLETE because every sentence is
cited or several outlets agree. It returns COMPLETE only after the major claims are
checked, the frame is searched in all three directions, the primary records, missing
actors, and denominators are considered, lineage duplication and source revisions are
tested, the reconstruction exists, and an adversarial "what are we still missing" pass
finds no material avenue. Otherwise it returns INCOMPLETE with the remaining high-value
checks named. A bounded run (a record unreachable, a paywall) says so in those words.

## What the author does with the verdict, the same session

Every finding gets one of four dispositions, written into a table at the top of the
audit file and closed before staging:

1. **Admitted and fixed.** The finding names a record (a filing, a journal page, a poll's
   toplines, a video frame, a statute). Fetch it, pin it with its text sibling, manifest
   it, and rewrite the sentence or verdict from its bytes. A record the auditor found on
   the web is a fetch, never a decline.
2. **Fixed from the pins.** The finding is answered by a record already held (a misread
   passage, a number the module already computes, a lineage the sources list shows).
3. **Typed on the page.** The record cannot be admitted after one attempt (paywall, deleted,
   no document exists). The page says so in reader words where a reader would otherwise
   miss it ("the ad cites a Punchbowl News item of September 9, 2025, which we could not
   retrieve"), and the manifest `needs_ledger` carries the attempt.
4. **Declined, with the reason.** Out of the story's scope, or opinion rather than record.
   The reason is written. Declining a whole verdict, or a finding because the auditor's own
   facts were partly wrong, is not allowed: check the finding at the record, then keep what
   the record supports.

After the dispositions: rebuild, rerun both lints, and rerun the audit. Stage on COMPLETE,
or on INCOMPLETE whose every remaining check is typed on the page. Commit the audit file
with the page.

## Reading the auditor's facts

The auditor is a witness, not a judge. Its findings arrive with the bytes it read; the
author re-reads those bytes before acting, because the two human audits and the codex run
on the Texas page each carried an error of their own (a wrong margin, a wrong committee
number, a swapped topline). A finding whose cited bytes do not say what the auditor says
is refuted in the disposition table with the bytes, not silently dropped.
