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

## 10. Accept the story (the reviewer, before dispatching turn one)

A story page reads its event from the published state (`state_event_id` in the manifest)
and the build throws `Missing publication selection` when no view exists for it. The
reviewer does this before dispatching turn one, and the dispatch names the event id; the
author never runs these commands:

```bash
cd /Volumes/4/CF/news-fqs-pilot
python3 scripts/story_accept.py list                       # find the candidate
python3 scripts/story_accept.py accept <candidate_id> --by <you> --reason "..." \
  --kind employment_situation_report --subject "U.S. employment situation" --period 2026-08 \
  --label "<the headline>" --event-id event-jobs-2026-09-04-august-payrolls-rise-162000
```

Then link it into its series and build its view at once; neither waits on a maintenance fire:

```bash
cd /Volumes/4/CF/sai
PYTHONPATH=src .venv/bin/python -m sai.cli state event-op --op reparent --event event-jobs-2026-09-04-august-payrolls-rise-162000 \
  --target event-jobs-2026-08-07-july-payrolls-fall-23000 --author <you> --reason "next story in the jobs series"
PYTHONPATH=src .venv/bin/python -m sai.cli state refresh-views --event event-jobs-2026-09-04-august-payrolls-rise-162000
```

The first makes the new story follow the previous one (the subject page and the gate
require every story under a subject to sit on one connected series). The second writes
`catch-state/views/event-<id>.json` and the chain view under the views lock only, so it runs
while a fire holds `maintain.lock`; the fire's own refresh folds the same records later.
`npm run build` pulls the views first.

The hosted build has no access to the state directory: it reads the committed copy under
`data/state/`. Committing the views is the reviewer's step (step 12), never the author's.
A story view committed without its chain view builds locally and fails on the host with
`Chain omits story: <id>`; the site then keeps serving the previous build with no error
you can see from git. The reviewer checks before pushing:

```bash
rm -rf /tmp/committed-state && mkdir -p /tmp/committed-state && git archive HEAD data/state | tar -x -C /tmp/committed-state
node -e "import('./src/lib/state.mjs').then(m=>{const s=m.readState('/tmp/committed-state/data/state');console.log('committed state ok:',s.events.size,'stories',s.chains.size,'chains')})"
```
## 12. Fill the story's state record (the reviewer, after the story commit)

Every record must already have `pinned_path`, `text_path`, and `text_sha256`, including
PDFs, CSVs, posts, and video transcripts. Registration reads these files without rewriting
or deriving text. A missing text file or changed hash stops registration before any writes.

The author enriches every manifest figure; the reviewer runs the command:

- Sourced: `figure` (slot name), `value`, `unit`, `kind: "sourced"`, and
  `source: {source_id, quote_span}`. The passage must be byte-exact and contain the value.
- Computed: `figure`, `value`, `unit`, `kind: "computed"`, `formula`, and `inputs`.
  Each input has `source_id`, `quote_span`, `value`, and `unit`. Supported formulas are
  `sum` (same units) and `date_difference_days` (first ISO date minus second; input unit
  `date`, result unit `days`). Calculations are checked and displayed as computed,
  with their inputs; the result is never presented as a quotation.
- Keep scale in the unit: `USD` and `USD millions` are different. Passages need enough
  context to establish which quantity the number measures; finding digits alone does not
  establish their meaning. For a sum over selected records, record the selection rule too.

**The state sequence is the reviewer's.** It runs once, after the story turn's commit is
accepted, so the accepted figure records name the site commit and the exact manifest hash;
the author's part is the enriched manifest above. From the SAI checkout:

```bash
cd /Volumes/4/CF/sai
PYTHONPATH=src .venv/bin/python -m sai.cli state stage-story \
  --site-root /Volumes/4/GitHub/the-catch-site \
  --manifest /Volumes/4/GitHub/the-catch-site/checks/manifests/<subject>--<story>.json \
  --state-dir /Volumes/4/CF/catch-state
```

This registers the pins as document evidence, accepts the authored figures through the
gate, and refreshes the event and its chain view. It makes **zero model calls**. Rerunning
unchanged figures creates no duplicate evidence or occurrences, even after another commit.
It does not publish a page or wait for the scheduled maintenance fire.

To register pins alone, use `state ingest-catch-pins --manifest <manifest> --sources-root
<site-root> --state-dir <state-dir>`. Always supply `--manifest` for authored stories.

Then verify and rebuild:

```bash
PYTHONPATH=src .venv/bin/python -m sai.cli state verify --state-dir /Volumes/4/CF/catch-state
cd /Volumes/4/GitHub/the-catch-site
npm run build
```

The build pulls the refreshed views. Inspect the built story's tracked-figures block:
every manifest figure has its value, unit, and source passage; every computed figure is
labelled Computed and shows all inputs. Texas's acceptance example has 44 registered pins
and 15 figures. A missing or empty block is not done. Then the reviewer commits the two
views the refresh wrote for this story, `data/state/event-<id>.json` and
`data/state/chain-<root>.json`, with a message beginning `state:`; the hosted build has no
state directory and reads committed views (`scripts/pull-state.mjs`). No other generated
`data/state/` file is ever committed.

### Optional Luna read

Add `--luna-read` to the same `stage-story` command when an additional model read is wanted.
This launches only the registered rows from this manifest, with the selected event as the
default. It never drains the general worklist. Defaults use SAI's configured provider and
model; explicit controls are `--provider`, `--model`, `--concurrency` (default 1), and
`--timeout-seconds` (default 900 per item).

The command prints `read.pid`, `read.stop_command`, and `read.run_dir`. Stop exactly that
run with the printed `kill -TERM <pid>` command. It terminates that run's worker children;
do not use a broad process-name kill. Progress and output remain under
`<state-dir>/story-reads/<event-id>/`. A later launch resumes its item ledger and excludes
terminal rows; it does not reset exhausted attempts. Check `RUN-MANIFEST.json` and
`output.log` for completion or failure, then refresh the event again and rebuild to show
any additional accepted facts:

```bash
cd /Volumes/4/CF/sai
PYTHONPATH=src .venv/bin/python -m sai.cli state refresh-views \
  --state-dir /Volumes/4/CF/catch-state --event <event-id>
```

An active maintenance owner can refuse the optional read; its failure is visible in the
run output. Do not clear another run's lock. The deterministic authoring fill and event
view refresh are available without launching or interrupting that maintenance run.

## 13. Cross-link and commit (the reviewer stages and ships)

- Subject page: one timeline row and the KPI/chart refresh. Homepage: the latest story.
  Related pages link both ways. Turn one does this from the data module; turn two checks
  the row and the feature still describe the story as written.
- The author's commits come from `finish.sh` (by path, nothing generated). The reviewer
  then runs the state sequence (step 12) and commits the two views.
- The publication decision is a human's. Stage the build, add the staged row with a
  ships-by date where the project tracks staging, and hand over the rendered page (URL or
  screenshot), never a receipt list.
- On the word to ship: `git push` (the live site rebuilds from main), poll the live URL
  until the new content serves, then `node scripts/live-audit.mjs`, re-run the language
  greps on the live bytes, screenshot at 100 percent zoom.

```bash
URL=https://thecatchengine.com/events/jobs/2026-09-04-august-payrolls-rise-162000/
for i in $(seq 1 30); do
  code=$(curl -sL -o /tmp/live.html -w '%{http_code}' "$URL")
  [ "$code" = 200 ] && grep -q "<marker from the new page>" /tmp/live.html && break
  sleep 10
done
[ "$code" = 200 ] && grep -q "<marker from the new page>" /tmp/live.html || { echo "NOT LIVE after 5 min (last code $code): the hosted build failed; read its log"; exit 1; }
node scripts/live-audit.mjs
grep -c $'\u2014' /tmp/live.html     # count of em dashes, must be 0
```

A 404 or the old page after five minutes means the hosted build failed, almost always in
`pull-state.mjs` on the committed state (see step 10). The poll must exit nonzero in that
case; a check that prints zeros and exits 0 on a 404 is how a failed deploy got reported
as shipped once.
