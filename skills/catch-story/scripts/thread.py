"""The thread read: a fresh reader (Haiku) reads the story one paragraph at a time and, after
each, says whether it answered the question they had, why it felt out of place if it did,
which words lost them, what they now understand and what they want to know next. Two readers
read independently; the report lists the breaks both of them hit, then each full read.
Usage: thread.py page.html prompt.txt report.md"""
import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

here = os.path.dirname(os.path.abspath(__file__))
units = json.loads("[" + ",".join(subprocess.run(
    [sys.executable, os.path.join(here, "thread_units.py"), sys.argv[1]],
    capture_output=True, text=True, check=True).stdout.split("\n")[:-1]) + "]")
units = [u for u in units if u["heading"] and len(u["text"].split()) > 3]
tpl = open(sys.argv[2]).read()
def read():
    sofar, question, rows = [], "(none yet: this is the start)", []
    for u in units:
        prompt = (tpl.replace("{SOFAR}", "\n\n".join(sofar) or "(nothing yet)")
                  .replace("{QUESTION}", question).replace("{HEADING}", f' (under the heading "{u["heading"]}")')
                  .replace("{PARA}", u["text"]))
        j = None
        for attempt in range(3):
            r = subprocess.run(["claude", "-p", "--model", "haiku"], input=prompt, capture_output=True, text=True).stdout
            try:
                j = json.loads(r[r.index("{"): r.rindex("}") + 1])
                break
            except ValueError:
                pass
        if j is None: raise SystemExit(f"no answer for: {u['text'][:80]}")
        rows.append(dict(j, asked=question))
        sofar.append(f"[{u['heading']}] {u['text']}")
        question = j.get("next") or question
    return rows


with ThreadPoolExecutor(2) as pool:
    reads = list(pool.map(lambda _: read(), range(2)))


def hanging(rows):
    found, run = [], []
    for i, r in enumerate(rows + [{"answered": "yes"}]):
        if r["answered"] == "no" and (not run or units[i]["heading"] == units[run[0]]["heading"]):
            run.append(i); continue
        if len(run) >= 3: found.append((run[0], len(run), rows[run[0]]["asked"]))
        run = [i] if r["answered"] == "no" else []
    return found


out = ["# Thread read", "", "Breaks both readers hit, by paragraph.", ""]
for i, u in enumerate(units):
    x, y = reads[0][i], reads[1][i]
    for key, label in (("why_here", "Out of place"), ("lost", "Lost")):
        if x.get(key) and y.get(key):
            out.append(f"- {label}, paragraph {i + 1} (\"{u['text'][:60]}...\"): {x[key]} / {y[key]}")
for n, rows in enumerate(reads, 1):
    for start, length, q in hanging(rows):
        out.append(f"- Hanging question (reader {n}), unanswered for {length} paragraphs of one section from paragraph {start + 1}: \"{q}\"")
for n, rows in enumerate(reads, 1):
    out += ["", f"## Reader {n}", ""]
    for i, (u, r) in enumerate(zip(units, rows), 1):
        out += [f"{i}. [{u['heading']}] {u['text'][:100]}", f"   - asked: {r['asked']}",
                f"   - answered: {r['answered']}; out of place: {r.get('why_here') or '-'}; lost: {r.get('lost') or '-'}",
                f"   - knows: {r.get('knows', '')}", ""]
open(sys.argv[3], "w").write("\n".join(out) + "\n")
print(sys.argv[3])
