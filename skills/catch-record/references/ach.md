# Competing explanations

The brief's "The explanations" section is Richards Heuer's analysis of competing
hypotheses (ACH), from *Psychology of Intelligence Analysis* (CIA Center for the Study of
Intelligence, 1999), chapter 8, pages 95 to 110:
https://www.cia.gov/resources/csi/static/Pyschology-of-Intelligence-Analysis.pdf

It is there for one failure: a brief that picks the first plausible account of an event and
gathers what fits it. Heuer's description of it (p. 95):

> The way most analysts go about their business is to pick out what they suspect
> intuitively is the most likely answer, then look at the available information from the
> point of view of whether or not it supports this answer.

## Heuer's eight steps, and where each sits in catch-record

| Heuer (p. 97) | catch-record |
|---|---|
| 1. Identify the possible hypotheses. Use a group with different perspectives. | Step 1: the questions and every serious answer. The orchestrator, the grok sweep and the record review are the other perspectives. |
| 2. List significant evidence and arguments for and against each. | Step 1's "if true, expect / should not find" lines, then steps 2 to 7. |
| 3. Build the matrix; judge each item's diagnosticity. | Step 8: the matrix, one row at a time across the answers. |
| 4. Refine: reword hypotheses, drop evidence with no diagnostic value. | Step 8: rows that fit every answer move to "Background held". |
| 5. Tentative conclusions, by trying to disprove hypotheses. | Step 8: read down each column; what survives is what has no I standing. |
| 6. Test how sensitive the conclusion is to a few critical items. | Step 8: recheck the deciding rows at the primary record; say what would change the result. |
| 7. Report the relative likelihood of all hypotheses, not just the most likely. | The five sentences and plan: the survivor is the spine, the ruled-out answer is The Catch, two survivors are the dispute. |
| 8. Identify milestones that would show events taking a different course. | What happens next. |

## What each step asks of you

**Every serious answer, including the ones you think are wrong.** "If a person does not
even generate the correct hypothesis for consideration, obviously he or she will not get
the correct answer" (p. 96). An answer goes in as its own camp would state it, from its
own filing or statement, not its opponent's summary (catch-record step 4). More than about
seven is unmanageable; group the near-duplicates (p. 98).

**Ask what you should see, and what you should not.** "If this hypothesis is true, what
should I expect to be seeing or not seeing?" (p. 99). Absence counts: "the vital clue was
that the dog did not bark in the night." A record that should exist if an answer were true,
searched for where it would be and not found, is evidence against that answer.

**Score across the row, then read down the column.** Take one piece of evidence and mark it
against every answer before moving to the next (p. 100). Evidence that fits every answer
has no diagnostic value: "a high-temperature reading may have great value in telling a
doctor that a patient is sick, but relatively little value in determining which illness"
(p. 102). Most of what seems to support the favoured answer turns out to be like this.

**Rule out, don't add up.** "The hypothesis with the fewest minuses is probably the most
likely one... The pluses, indicating evidence that is consistent with a hypothesis, are far
less significant" (p. 104). "A single item of evidence that is inconsistent with a
hypothesis may be sufficient grounds for rejecting that hypothesis."

**Unproven is not disproved.** "For an unproven hypothesis, there is no evidence that it is
correct. For a disproved hypothesis, there is positive evidence that it is wrong" (p. 98).
Before writing "there is no evidence that...", ask whether, if the answer were true, you
could realistically expect to see the evidence (p. 109). A private threat leaves no public
document; its absence from the record rules nothing out.

**Recheck what decides it.** Analysts who do this "often realize that their judgments are
actually based on very few factors" (p. 105). Those few rows get checked at the primary
record, because "when analysis turns out to be wrong, it is often because of key
assumptions that went unchallenged and proved invalid" (p. 106).

**You decide, not the matrix.** "The matrix should not dictate the conclusion to you"
(p. 105). If the matrix says something you think is wrong, you left a factor out: put it in
as a row.

## Counting

The I's are a ranking within one question, not a probability. Heuer's own software counted
them and declined to turn the count into percentages, because the hypotheses in practice
overlap or leave possibilities out, and because "the probability calculation would convey a
false sense of precision" (Heuer, *How Does Analysis of Competing Hypotheses (ACH) Improve
Intelligence Analysis?*, 2005, p. 8:
https://pherson.org/wp-content/uploads/2013/06/06.-How-Does-ACH-Improve-Analysis_FINAL.pdf).
He also notes that a single decisive record can outweigh everything else: "A single report
from such a source may trump all other evidence" (p. 7). A signed order, a dated readout, a
roll call are that kind of record.

## Why the brief makes you write it down

In a controlled study, intelligence analysts trained in ACH "did not follow all of the steps
of ACH", the evidence that it reduced confirmation bias was mixed, and it "may increase
judgement inconsistency and error" (Dhami, Belton and Mandel, *Applied Cognitive
Psychology*, 2019, https://doi.org/10.1002/acp.3550). Of 25 trained analysts, only 5
picked the answer by its inconsistencies alone, as the method requires, and only 11 revised
the matrix by diagnosticity. Fewer of them (3, against 13 untrained) used base rates, which
ACH gives no guidance on: how often the plain answer is the true one (a scheduled release,
a routine filing) still counts, and goes in as a row. That is why the matrix is a section of the brief with a citation on every I, why the
orchestrator reads the answers before the search and the deciding rows after it, and why
the record review is asked what the matrix leaves untested.

The matrix is working material. It lives in the brief, under `checks/`, and never appears on
the page.

## Worked example: the G7 release (October 2026)

Built from the fuel brief's own citations
(`checks/records/fuel-reserves--2026-10-02-g7-releases-100-million-barrels.md`), to show the
shape. That brief was written without a matrix, and its page treated the pressure from
Washington as background rather than testing it.

**Question 1: what did the October 2 agreement add?**
- A. 100 million new barrels of European diesel, negotiated by Trump (the White House).
- B. Nothing new: the 100 million is what was left of March's 400 million pledge
  (Germany, the energy agency).
- C. March's remainder, plus some new barrels.

| Evidence | A | B | C |
|---|---|---|---|
| G7 text: release set "taking into account commitments that have already been fulfilled" | C | C | C |
| G7 text: release "by G7 members and partners", the U.S. among them | I: not from Europe | C | C |
| Agency, Oct 7: finishing March "would bring approximately 100 million barrels to the market" | I | C | C |
| Germany: "as of now, no additional quantities" | I | C | C |
| France signalled 2 million barrels of diesel "on top of the quantities agreed in March" | | I, if France delivers | C |

The first row is the one that looks strongest and decides nothing: it fits all three, so it
moves to Background held. A is ruled out. B and C survive, and they differ by France's 2
million at most, so the spine is "these are March's barrels", with France's offer as the
one qualifier and its delivery as a milestone.

**Question 2: did Washington's pressure produce it?**
- A. Yes: Trump pressed Europe, with a diesel export ban as the threat, and got the release
  (the White House; three people who spoke to Reuters).
- B. No: France called the meeting on its own and the outcome is March's plan finishing.
- C. France's meeting, but Washington's push shaped its terms: faster delivery, diesel first.

| Evidence | A | B | C |
|---|---|---|---|
| Macron, Sep 18: "je convoquerai un G7" on stocks, before the public U.S. push (Wright Sep 29, Bessent Oct 1) | I, for the meeting itself | C | C |
| Bessent asked Europe to "accelerate delivery" and "make additional supplies immediately available"; the text front-loads diesel in 20 days and adds nothing | I, for the additional supplies | C | C |
| Diesel first | C | C | C |
| Macron: Trump "did not threaten to issue an embargo"; three Reuters sources: France and Germany told to release or face a ban | | | |

Diesel first fits every answer (the agency says diesel is where the shortage is), so it
decides nothing. The threat row is contested testimony on both sides, and a private warning
would leave no public record, so it rules nothing out. A, as the White House states it, is
ruled out. B and C both survive, and the record cannot separate them: what would is whether
Washington pressed France before September 18, which no admitted record shows either way.
So the page can say the pressure won no new barrels, and cannot say it had no effect.
