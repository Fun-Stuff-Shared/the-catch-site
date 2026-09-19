# Procedures: the exact commands, in the order an authoring session runs them

Every step names its command and its artifact. A skipped step is a finding you report in
your own words, never a style choice. The turn skills (catch-record, catch-structure, catch-story) are the order of work; this file is the
commands for it. Paths are relative to
`/Volumes/4/GitHub/the-catch-site` unless stated. Two other repos take part:
`/Volumes/4/CF/news-fqs-pilot` (capture registry, `capture` CLI, news search index) and
`/Volumes/4/CF/catch-state` (the tracked-event state log).

Environment for the search index (set once per shell; never hardcode another host):

```bash
export IQ_URL=http://100.122.112.83:8100
export OPENAI_API_KEY=iq-local   # the searcher reads this name; the value routes to IQ
```

## 8. The story turn begins


Turn three is a fresh session. It reads the reader model commit, the working note and the
built page, admits every gap line the reader model graded A or B (step 2 of the record
procedures for each: fetch, pin, census line, passage table, manifest row), and then writes
the story in the reader model's order. Read `story.md`, then
`shape-rules.md`, `sections.md`, `components.md`, then `writing.md`. Bind every narrative paragraph with `Cite`, from
the pin open on screen. Keep the needs ledger open beside you: every gap you notice while
writing becomes a named row the moment you notice it, and step 3 or 5 runs for that row
mid-flight. Drafting is how you learn what the story is missing.
## 9. The unknowns rule and the superlative rule

Before typing any "what we do not know" line, run its disproof search against the
registry, the index, and the pins (step 2 commands with the specific question). A gap
the records already fill is a defect in the run, not an unknown on the page. The list
is nearly empty every time.

Every superlative or gloss ("lowest since", "fastest pace", "unexpected") either quotes
a held record or does not appear.

## 10. Manifest, build, lint, screenshot


```bash
# manifest: checks/manifests/<subject>--<story>.json (fields in manifest-and-gate.md)
npm run build                                   # pull state, build records, astro build, event gate, shell gate
node skills/catch-story/scripts/lens_lint.mjs src/pages/events/jobs/2026-09-04-august-payrolls-rise-162000.astro
python3 -m http.server 4322 -d dist >/dev/null 2>&1 &   # or any static server
agent-browser open http://localhost:4322/events/jobs/2026-09-04-august-payrolls-rise-162000/ && agent-browser screenshot /tmp/page.png
```

```bash
node skills/catch-story/scripts/quote_lint.mjs src/pages/events/<subject>/<story>.astro
```

`quote_lint` reads every `Cite passage`, every quote card body, every quoted span inside an
`OutletCheck` claim or verdict, and every quoted span in a paragraph or list item, and checks
each one against the text pins of the records that element cites (a `SourcedBlock`'s
`source` counts). It fails on: a passage absent from its record; a quote card that is not
one contiguous substring of its record; an outlet quoted with words its own pin does not
contain (the CBS "President Donald Trump" defect on the mail-voting story); a quoted span
whose element cites no record, or cites records that do not contain it (the "week of
September 13" miscite). Quotation marks mean quotation: no scare quotes, no paraphrase
inside quote marks, no bytes changed inside a quote ("&" to "and", an inserted word, a
comma for the record's dash). Cut the quote before the byte you cannot reproduce.

Fix what the gate and the lint report, rebuild, look at the screenshot at 100 percent
zoom (overflow, missing styles, unreadable sections), repeat until clean.

## 11. Independent interrogation

Run it when the page is otherwise complete, then do three things with the list: (1) an item that names a fetchable public record is a fetch, not a decline; fetch it, verify the quote at the pin, and use it or write the absence with the attempt; (2) an item the pins already answer is fixed from the pins; (3) only an item that needs a paywalled or nonexistent record is declined, with the reason.

A model that did not write the page reads the built page and lists everything it does not
cover or account for, using web search and X search. Read `interrogation.md` for the prompt
and what to do with the result, then:

```bash
skills/catch-story/scripts/interrogate.sh jobs/2026-09-04-august-payrolls-rise-162000
cat checks/interrogations/jobs--2026-09-04-august-payrolls-rise-162000-<date>.md
```

Every returned gap becomes a needs-ledger row: fixed on the page, typed unreachable, or
declined with its reason, all in the same session. Wholesale dismissal is the violation
this step exists to prevent.
