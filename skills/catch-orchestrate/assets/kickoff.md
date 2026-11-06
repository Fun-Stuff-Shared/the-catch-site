Write the Catch story for this event, stage one then stage two. Read `skills/catch-record/SKILL.md` in this worktree in full and follow it; when the record is done, read `skills/catch-story/SKILL.md` and follow it. Where a step in either skill is wrong, unclear or missing something you needed, say so in your reports.

The event: {LABEL}
- Story id: {STORY}, working headline "{LABEL}".
- It starts from the v2 development {CANDIDATE}: `data/v2` in this worktree holds what the core has on it, so read that view's claims, statements and sources first. Treat them as leads to check at the source, not as the record. The manifest's `v2_subjects` ties the story to it; the page shows none of it.
- {FOLLOWS}
- What the core holds on it now, past the pin: `sai brief {CANDIDATE}`; the same event under other subjects: `sai search-all "<words>"`. Leads too.
- Held coverage to start from: `capture search "<one term>" --since {SINCE} --compact`, one name or phrase at a time, because it matches the whole string against URL, title and publisher. Terms to try: {SEARCH}.

The worktree is {WORKTREE} on branch {BRANCH}. Do not push. Commit by path; git's post-commit hook can hang on git lfs, so commit with `git -c core.hooksPath=/dev/null commit ...`.

The orchestrator is the session {ORCHESTRATOR}; message it with `agenthail send @<name> "<message>"` (`agenthail list --json` finds it if that name is gone). Send it:
- the questions and answers once you have named them (catch-record step 1), then keep working while it reads them;
- each record review's verdict;
- the scored explanations, the five sentences and the plan when stage one is done, and wait for its word before writing the page;
- the headline and why, each time you set or change it, after you set `story_title` in the manifest to match;
- each round of cold reads;
- the served page URL when the reads stop.
Show the human the same things in this window.
