"""Deterministic checks for voice_lint's fail tier: run with any python3, no SDK needed.
Usage: python3 skills/catch-event-page/scripts/voice_lint_test.py"""
import os, sys, tempfile
sys.path.insert(0, os.path.dirname(__file__))
import voice_lint as vl

PAGE = """<html><body><main id="story-root">
<section id="what-happened">
 <p data-layer="narrative">The Fed raised its target range by a quarter point on September 16, the first increase since 2023.</p>
 <p data-layer="narrative">A reader who stops here misses the vote.</p>
 <p data-layer="fact">Everything this page rests on was found through the public docket route, the clerk said.</p>
 <p data-layer="fact">The public docket route remains open to everyone who files a request.</p>
 <p data-layer="fact">This page did not answer through the public docket route before the cutoff.</p>
 <p data-layer="fact">The agency did not answer through the public docket before the deadline.</p>
 <p data-layer="narrative">The chair said "this page of the transcript is the one that matters" during the briefing.</p>
 <p data-layer="proof">This page found the order through the storage mirror on September 18.</p>
 <p data-layer="narrative">This page does not compute a speed for the moment the airplane left the pavement.</p>
 <p data-layer="fact">The benefit is not available through the federal exchange.</p>
 <p data-layer="fact">Single outlet centers are exempt from the licensing rule.</p>
 <p data-layer="fact">This page of the public docket lists the motion and its filing date.</p>
 <p data-layer="fact">Single outlet among the records here: AP says the vote was 9 to 3.</p>
 <p data-layer="fact">After the judge sealed it, the order was not available through the public docket.</p>
 <p data-layer="fact">We could not obtain the order through the public docket.</p>
 <p data-layer="fact">The clerk added this page to the public docket on Monday.</p>
 <p data-layer="narrative">This page found the order in a mirror.</p>
 <p data-layer="fact">This page lists the motions heard on Monday.</p>
 <p data-layer="narrative">This page rests on three filings and one transcript.</p>
 <p data-layer="fact">This page was filed as exhibit 12 in the public docket.</p>
</section>
<section id="records" data-layer="fact">
 <p class="section-lede">Everything this page rests on, numbered where the story cites it. We keep a dated copy of each one.</p>
 <p>The court's minute order of September 17, saved the same day from the docket.</p>
 <p class="sources-line"><a href="/methodology">How we check</a> where this page says computed, the arithmetic was done from the saved series.</p>
</section>
</main></body></html>"""

def fails_for(html):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f: f.write(html); path = f.name
    out = []
    judged.extend(s for _, s in vl.sentences(path))
    for tag, sen in vl.sentences(path):
        own = vl.strip_q(sen)
        if vl.READER.search(own): out.append(("reader", sen))
        if vl.PROCESS.search(own): out.append(("process", sen))
    os.unlink(path); return out

judged = []
hits = fails_for(PAGE)
text = " | ".join(s for _, s in hits)
checks = [
    ("plain fact sentence passes", "first increase since 2023" not in text),
    ("reader address fails", any(k == "reader" and "A reader who stops" in s for k, s in hits)),
    ("chrome wording in an ordinary fact paragraph fails", any("clerk said" in s for _, s in hits)),
    ("a fact about a public docket route passes", "remains open to everyone" not in text),
    ("narrating that the page could not reach a record fails", any("did not answer through" in s for _, s in hits)),
    ("a quotation containing 'this page' passes", "transcript is the one" not in text),
    ("proof-layer narration is not judged", "storage mirror" not in text),
    ("'this page does not compute' fails", any("does not compute" in s for _, s in hits)),
    ("the records section lede is skipped as chrome", "dated copy of each one" not in text),
    ("the How we check line is skipped as chrome", "arithmetic was done" not in text),
    ("an ordinary records-list paragraph is still judged", any(s.startswith("The court's minute order") for s in judged)),
    ("'not available through the federal exchange' passes", "federal exchange" not in text),
    ("'Single outlet centers' passes", "licensing rule" not in text),
    ("'This page of the public docket' passes", "lists the motion" not in text),
    ("a single-outlet coverage note fails", any("Single outlet among" in s for _, s in hits)),
    ("a sealed-docket fact passes", "judge sealed" not in text),
    ("first-person retrieval through the docket fails", any("We could not obtain" in s for _, s in hits)),
    ("a docket document called 'this page' passes", "clerk added" not in text),
    ("'This page found' fails", any("found the order in a mirror" in s for _, s in hits)),
    ("a document page as subject passes", "motions heard on Monday" not in text),
    ("'This page rests on' fails", any("three filings" in s for _, s in hits)),
    ("an agency that did not answer through a docket passes", "before the deadline" not in text),
    ("a docket page in the passive passes", "exhibit 12" not in text),
]
bad = [name for name, ok in checks if not ok]
for name, ok in checks: print(("ok  " if ok else "FAIL"), name)
sys.exit(1 if bad else 0)
