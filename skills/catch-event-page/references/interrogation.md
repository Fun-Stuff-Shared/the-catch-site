# Independent interrogation

`scripts/interrogate.sh <subject>/<story>` sends the prompt block below, then the built
page's text and the manifest's source list, to grok with web and X search on, and writes
the numbered gap list to `checks/interrogations/<subject>--<story>-<date>.md`. The author
runs it after the build is green (SKILL.md, step 6) and dispositions every item in the
same run: fixed from the pins, admitted and fixed, or written on the page as a dated
absence after one attempt. An item that names a public record is a fetch, not a decline.
A reaction (a post, a statement) enters the page only through an admitted record.

Write the dispositions as a table keyed by the gap numbers at the top of the file, then
the list as returned (replace any em dashes with a colon or comma), and commit it with
the page.

The script reads the prompt between the two markers; keep them.

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
