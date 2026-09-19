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
<figure data-layer="proof"><p>proof inside figure</p></figure>
<p data-layer="narrative">Narrative two<br/>with a break.</p>
<script>var x = 1;</script>
</main><footer>footer</footer></body></html>"""
with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f: f.write(PAGE); path = f.name
out = subprocess.run([sys.executable, os.path.join(HERE, "page_text.py"), path], capture_output=True, text=True, check=True).stdout
lines = out.splitlines()
checks = [
    ("the headline is line 2", lines[1] == "Fed raises rates"),
    ("text after a bare <br> inside proof survives", "Fact after proof." in lines),
    ("proof text is gone", "Captured" not in out and "more proof" not in out and "proof inside figure" not in out),
    ("citation numbers are gone", "Narrative one. Second sentence." in lines),
    ("inline spans get a space", "3.75 percent" in lines),
    ("a self-closing br breaks the line", "Narrative two" in lines and "with a break." in lines),
    ("chrome outside main is gone", "site chrome" not in out and "footer" not in out),
    ("scripts are gone", "var x" not in out),
]
bad = [n for n, ok in checks if not ok]
for n, ok in checks: print(("ok  " if ok else "FAIL"), n)
if bad: print(out)
sys.exit(1 if bad else 0)
