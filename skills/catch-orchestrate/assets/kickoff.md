Write the Catch story for this event, stage one then stage two. Read `skills/catch-record/SKILL.md` in this worktree in full and follow it; when the record is done, read `skills/catch-story/SKILL.md` and follow it. Where a step in either skill is wrong, unclear or missing something you needed, say so in your reports.

The event: {EVENT}
- Story id: {STORY}. Event id: {EVENT_ID}, accepted in catch-state with the label "{LABEL}".
- Candidate {CANDIDATE} ({CANDIDATE_FILE}). Its row and saved articles: `cd /Volumes/4/CF/news-fqs-pilot && python3 scripts/story_accept.py list --json`.
- {FOLLOWS}
- Held coverage to start from: `capture search "{SEARCH}" --since {SINCE} --compact`.

The worktree is {WORKTREE} on branch {BRANCH}. Read from /Volumes/4/CF/catch-state; never write to it. Do not push. Commit by path; git's post-commit hook can hang on git lfs, so commit with `git -c core.hooksPath=/dev/null commit ...`.

The orchestrator is the Claude session named {ORCHESTRATOR} in ListAgents; message it with SendMessage (by whatever name it has in ListAgents if that one is gone). Send it:
- each record review's verdict;
- the five sentences and outline when stage one is done, and wait for its word before writing the page;
- the headline before your first build, and every time it changes (it renames the event label, and the build fails until the label matches);
- each round of cold reads;
- the served page URL when the reads stop.
Show the human the same things in this window.
