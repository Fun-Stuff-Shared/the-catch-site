"""Deterministic checks for page_text: run with any python3.
Usage: python3 skills/catch-event-page/scripts/page_text_test.py"""
import os, subprocess, sys, tempfile
HERE = os.path.dirname(os.path.abspath(__file__))
PAGE = """<html><body><header>site chrome</header><main>
<p class="kicker">The rate · updated 2026-09-19</p>
<h1>Fed raises rates</h1>
<div class="kpi"><span>3.75</span><small>percent</small></div>
<p data-layer="narrative">Narrative one.<sup class="src-ref"><a href="#s1">1</a></sup> Second sentence.</p>
<div data-layer="proof">Captured<br>on September 18<img src="x.png"><hr/>more proof</div>
<p data-layer="fact">Fact after proof.</p>
<div class="sourced-block detail" data-layer="fact"><p>The archived post names the three outlets.</p></div>
<div class="sourced-block" data-layer="fact"><p>A sourced block the story view shows.</p></div>
<figure data-layer="proof"><p>proof inside figure</p></figure>
<p data-layer="narrative">Narrative two<br/>with a break.</p>
<script>var x = 1;</script>
<div class="mode-switcher" role="radiogroup"><a class="mode-btn active">The story</a><a class="mode-btn">Just the facts</a></div>
<nav class="story-toc" data-layer="fact"><details open><summary><span>On this page</span></summary><ol><li><a href="#a">What happened</a></li></ol></details></nav>
<section id="what-happened"><h2>What happened</h2><p class="sources-line">A sources line outside the records section stays.</p></section>
<details class="record-ledger" data-layer="fact" open><summary>Figures in the source documents <span>1</span></summary><article class="ledger-row"><h3>CNN hard passes reported before the ban</h3><strong>40 passes</strong></article></details>
<article><strong>3 organizations</strong><details class="ledger-source-passage"><summary>Recorded passage</summary><blockquote>three news organizations</blockquote></details></article>
<section id="records" data-layer="fact"><h2>The records</h2><p class="section-lede">We keep a dated copy of each one.</p>
<section><ol><li>1 complaint · District Court</li></ol></section>
<p class="sources-line"><a href="/methodology">How we check</a><span data-layer="proof"> the arithmetic</span></p></section>
<p data-layer="narrative">After the records.</p>
</main><footer>footer</footer></body></html>"""
with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f: f.write(PAGE); path = f.name
out = subprocess.run([sys.executable, os.path.join(HERE, "page_text.py"), path], capture_output=True, text=True, check=True).stdout
lines = out.splitlines()
checks = [
    ("the headline is line 2", lines[1] == "Fed raises rates"),
    ("text after a bare <br> inside proof survives", "Fact after proof." in lines),
    ("a detail block, shown only in the facts view, is gone and a plain sourced block stays", "The archived post names the three outlets." not in out and "A sourced block the story view shows." in lines),
    ("proof text is gone", "Captured" not in out and "more proof" not in out and "proof inside figure" not in out),
    ("citation numbers are gone", "Narrative one. Second sentence." in lines),
    ("inline spans get a space", "3.75 percent" in lines),
    ("a self-closing br breaks the line", "Narrative two" in lines and "with a break." in lines),
    ("chrome outside main is gone", "site chrome" not in out and "footer" not in out),
    ("scripts are gone", "var x" not in out),
    ("the mode switcher is gone", "Just the facts" not in out),
    ("the contents list is gone and the section heading stays", "On this page" not in out and lines.count("What happened") == 1),
    ("the state ledger of figures is gone", "Figures in the source documents" not in out and "CNN hard passes reported before the ban" not in out and "40 passes" not in out),
    ("the recorded-passage disclosure is gone and the figure stays", "Recorded passage" not in out and "three news organizations" not in out and "3 organizations" in lines),
    ("the records section's fixed lines are gone and its entries stay", "We keep a dated copy" not in out and "How we check" not in out and "1 complaint · District Court" in lines),
    ("a sources line outside the records section stays", "A sources line outside the records section stays." in lines),
    ("text after the records section survives", "After the records." in lines),
]
bad = [n for n, ok in checks if not ok]
for n, ok in checks: print(("ok  " if ok else "FAIL"), n)
if bad: print(out)
sys.exit(1 if bad else 0)
