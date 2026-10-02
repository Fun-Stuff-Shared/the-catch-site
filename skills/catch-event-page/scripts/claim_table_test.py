"""claim_table.py on built pages in a throwaway root: a row holds what the page shows, a card
is one row, and with --earlier only the blocks the earlier page did not show are listed.
Usage: python3 claim_table_test.py   (exit 1 when a case fails)"""
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

here = Path(__file__).resolve().parent
root = Path(tempfile.mkdtemp(prefix="claim-table-"))
scripts = root / "skills/catch-event-page/scripts"
scripts.mkdir(parents=True)
shutil.copy(here / "claim_table.py", scripts)
(root / "checks/manifests").mkdir(parents=True)
(root / "checks/manifests/subject--story.json").write_text(json.dumps({"records": [{"id": i, "text_path": f"data/sources/{i}.txt"} for i in ("order", "post", "count")]}))
cite = lambda record, passage, more="": f'<sup class="src-ref"><a href="#src-1" data-record-href="/records/{record}/" data-passage="{passage}"{more}>1</a></sup>'


def page(title="A", body="The president announced the ban.", total=78, cell="$10.0 million", label="hard passes", chart=8, card="Mislabeled."):
    return f"""<html><body><nav><p>Site menu.{cite("post", "x")}</p></nav><main>
<h1>{title}</h1><p class="story-dek">The court ordered the passes restored.{cite("order", "shall remain in effect")}</p>
<div class="kpi-strip"><div class="kpi"><span class="kpi-value">78</span><span class="kpi-label">{label}</span></div></div>
<p class="railed rail-note">Story updated 2026-10-02.</p><p class="railed rail-note">Revised, September 4: the count is 78.{cite("count", "78 hard passes")}</p>
<section id="what-happened"><p data-layer="narrative">{body}{cite("post", "effective immediately", ' data-passages="three outlets&#10;until further notice"')}</p>
<p class="chart-source">Together the declarations report {total} passes.{cite("count", "40 journalists")}</p>
<svg><text>{chart}</text></svg>
<table><tr><td>MAGA Inc.</td><td>{cell}</td></tr></table>
<div data-layer="proof"><p>An untouched paragraph.{cite("post", "effective immediately")}</p></div></section>
<section id="outlets"><article class="outlet-check"><h3>Reuters, September 8</h3><p class="oc-claim">wrote that the ban covered four outlets.</p><p class="oc-verdict"><strong>{card}</strong></p><p class="oc-sources">{cite("post", "three outlets")}</p></article><article class="outlet-check"><h3>CBS News, September 9</h3><p class="oc-claim">wrote that 40 journalists lost passes.</p><p class="oc-sources">{cite("count", "40 reporters")}</p></article></section>
<section id="records"><p class="section-lede">Every record this page cites.{cite("post", "x")}</p><ol><li>{chart} The post as posted</li></ol></section>
</main></body></html>"""


def rows(now, earlier=None):
    out = root / "dist/events/subject/story"
    out.mkdir(parents=True, exist_ok=True)
    (out / "index.html").write_text(now, encoding="utf-8")
    args = ["python3", str(scripts / "claim_table.py"), "subject/story", "--json"]
    if earlier is not None:
        (root / "earlier.html").write_text(earlier, encoding="utf-8")
        args += ["--earlier", str(root / "earlier.html")]
    return json.loads(subprocess.run(args, capture_output=True, text=True, check=True).stdout)["rows"]


full = rows(page())
texts = [r["text"] for r in full]
card = next(r for r in full if r["text"].startswith("Reuters"))
body = next(r for r in full if r["text"].startswith("The president"))
got = rows(page(body="The president announced the ban on three outlets."), page())
changed = rows(page(title="Court restores the passes", total=79, cell="$10.5 million", label="hard passes held before the ban", chart=9, card="Wrong."), page())
changed_texts = [r["text"] for r in changed]
checks = [
    ("the whole page: every cited block is a row and nothing else is", texts == ["The court ordered the passes restored.", "Revised, September 4: the count is 78.", "The president announced the ban.", "Together the declarations report 78 passes.", "An untouched paragraph.", card["text"], "CBS News, September 9 wrote that 40 journalists lost passes."]),
    ("a merged citation gives each of its passages", [c["passage"] for c in body["cites"]] == ["effective immediately", "three outlets", "until further notice"]),
    ("a row names its section and its record's text pin", body["at"] == "what-happened" and body["cites"][0]["text_path"] == "data/sources/post.txt"),
    ("a card is one row: outlet, claim and verdict, with the citations of its sources line", card["text"] == "Reuters, September 8 wrote that the ban covered four outlets. Mislabeled." and [c["record"] for c in card["cites"]] == ["post"]),
    ("two cards side by side are two rows, each with its own citations", [c["record"] for c in full[-1]["cites"]] == ["count"] and len(card["cites"]) == 1),
    ("a cited rail note (a revision notice) is a row; the uncited update stamp is not", "Revised, September 4: the count is 78." in texts and not any(t.startswith("Story updated") for t in texts + [r["text"] for r in rows(page(), "")])),
    ("a proof-layer block is a row; the site menu, the update stamp and the records section are not", "An untouched paragraph." in texts and not any(t.startswith(("Site menu", "Story updated", "Every record")) for t in texts)),
    ("nothing changed: no block is listed", rows(page(), page()) == []),
    ("a rewritten paragraph is listed alone", [r["text"] for r in got] == ["The president announced the ban on three outlets."]),
    ("a changed headline, with no Cite, is listed with its words", "Court restores the passes" in changed_texts),
    ("a changed value inside a cited block is listed as the page shows it", "Together the declarations report 79 passes." in changed_texts),
    ("a changed table cell, a changed figure label and a changed chart value are rows", {"$10.5 million", "78 hard passes held before the ban", "9"} <= set(changed_texts)),
    ("a card whose verdict changed is listed whole", any(t.endswith("four outlets. Wrong.") for t in changed_texts)),
    ("a block that did not change is not listed, and a renumbered records list is not", not any(t.startswith(("The court ordered", "The president announced", "An untouched", "MAGA Inc")) or t.endswith("as posted") for t in changed_texts)),
    ("a block whose citation changed is listed though its words did not", [r["text"] for r in rows(page(), page().replace('data-passage="40 journalists"', 'data-passage="38 journalists"'))] == ["Together the declarations report 78 passes."]),
    ("a block the page now shows twice is listed once", [r["text"] for r in rows(page().replace("<h1>A</h1>", "<h1>A</h1><h1>A</h1>"), page())] == ["A"]),
    ("an empty earlier page (the story is new) lists every block that has words", len(rows(page(), "")) > len(full)),
]
shutil.rmtree(root, ignore_errors=True)
for name, ok in checks:
    print("ok  " if ok else "FAIL", name)
print(f"claim_table_test: {sum(ok for _, ok in checks)} of {len(checks)} cases pass")
sys.exit(0 if all(ok for _, ok in checks) else 1)
