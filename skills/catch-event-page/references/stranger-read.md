# The stranger read

One Claude reader per read, launched by the reviewer on the story commit alongside the red
team and the entailment check, and again on every patched commit. It is the only step in
the pipeline that runs on Claude; the audits stay on codex.

Words used below: the page carries three layers of text, marked in its source as `fact`
(numbers, charts, the records list), `narrative` (the story's own paragraphs) and `proof`
(receipts and method notes a reader sees only when they ask to "show the work"). The
default view a stranger gets is the story: fact and narrative, no proof. A citation is a
small superscript number after a sentence linking to the records list.

## Run it

```
skills/catch-event-page/scripts/stranger_read.sh <subject>/<slug> [port]
```

Without a port it reads the built page under `dist/`; with a port it fetches the page from
the worktree's dev server at `http://127.0.0.1:<port>/events/<subject>/<slug>/`. The script
writes, under `checks/audits/`, with the story's name and the date:

- `-stranger-page.txt`: the page as the story view reads it. Tags are gone, each block is
  on its own line, proof-layer blocks and citation numbers are dropped, so the reader sees
  what a stranger sees and no proof-layer sentence can be reported as a defect.
- `-stranger-prompt.txt`: the prompt below with the two file paths filled in.
- `-stranger.md`: the report.

The launcher is `claude -p` with read-only tool access. Inside a Claude Code session the
reviewer may instead run the rendered prompt as one Agent-tool subagent and save its report
at the same `-stranger.md` path; the input and prompt files are the same either way. The
script refuses a page text under 2,000 bytes, which is what a dev server returns while the
author's edit is rebuilding it: wait for the commit and run it again.

## The prompt

> You are a stranger reading one web page about this event: <the page's headline>. You
> have never seen this project, its vocabulary, or its other pages. Do not search the web,
> do not open any other file than the two named here, do not edit anything.
>
> Read the page text at <the -stranger-page.txt path> top to bottom, once, the way a
> reader would. Then open <the reader model path>, which describes the reader this page
> was written for and the seven questions that reader brings.
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

## Reading the report

The reviewer checks each quoted sentence against the page source. A sentence the report
quotes that is not in `-stranger-page.txt` was invented and is dropped. The rest go into
the numbered patch list with the red team's findings, on the first read and on every
reread of a patched page.
