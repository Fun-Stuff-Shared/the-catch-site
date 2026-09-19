# The stranger read

One Claude subagent per read, launched by the reviewer on the story commit alongside the
red team and the entailment check, and again on every patched commit. It is the only step
in the pipeline that runs on a Claude subagent; the audits stay on codex. Give it the
served page's text (fetch the page from the worktree's dev server, strip tags, keep block
breaks; note that the dump flattens the three lenses and fuses citation numbers onto
sentences, so check each flagged sentence's `data-layer` before sending it to the author:
a proof-layer sentence is not a defect) and the reader model file. The prompt:

> You are a stranger reading one web page about <the event in one clause>. You have never
> seen this project, its vocabulary, or its other pages. Do not search the web, do not
> open any other file than the two named here, do not edit anything.
>
> Read the page text at <path> top to bottom, once, the way a reader would. Then open
> <reader model path>, which describes the reader this page was written for and the seven
> questions that reader brings.
>
> Report, in plain words, at most 600 words:
> 1. For each of the seven questions: did the page answer it for you, where (quote the
>    sentence), and did you have to work to find it. Answered / partly / not answered.
> 2. Every place you misread something, stalled, or could not follow: a term used before
>    it was explained, a number whose meaning you could not tell, a sentence that names
>    the page itself or its methods instead of the event, a sentence that addresses you as
>    "the reader", a claim you could not tell the source of, a sentence that answers a
>    question you had not asked.
> 3. Anything that reads as written by a machine or by the project for itself rather than
>    for a person: process language, hedges, self-reference, repetition, a document as the
>    subject of a sentence where the fact could stand alone.
> 4. The one thing you would want added, and the one thing you would cut.
> Quote page sentences exactly. Do not propose rewrites. Do not summarize the event.

The reviewer reads the report against the page bytes, drops what the layer attributes
refute, and folds the rest into the numbered patch list with the red team's findings.
