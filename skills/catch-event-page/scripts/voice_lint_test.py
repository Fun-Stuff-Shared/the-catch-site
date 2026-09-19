"""Deterministic checks for voice_lint's four rules: run with any python3, no SDK needed.
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
 <p data-layer="fact">After the judge sealed it, the order was not available through the public docket.</p>
 <p data-layer="fact">We could not obtain the order through the public docket.</p>
 <p data-layer="fact">The clerk added this page to the public docket on Monday.</p>
 <p data-layer="narrative">This page found the order in a mirror.</p>
 <p data-layer="fact">This page lists the motions heard on Monday.</p>
 <p data-layer="narrative">This page rests on three filings and one transcript.</p>
 <p data-layer="fact">This page was filed as exhibit 12 in the public docket.</p>
 <p data-layer="fact">The clerk wrote the seal number on this page of the public docket.</p>
 <p data-layer="fact">This page does not contain the sealed appendix in the public docket.</p>
 <p data-layer="narrative">We found the order in the public docket.</p>
 <p data-layer="narrative">Our search found the order in the public docket.</p>
 <p data-layer="fact">The docket page confirms the motion was filed on Monday.</p>
 <p data-layer="fact">Page 4 of the order does not show the judge's signature.</p>
 <p data-layer="narrative">We verified the order in the public docket.</p>
 <p data-layer="narrative">We reviewed every filing in the public docket.</p>
 <p data-layer="narrative">Our investigation found the order in the public docket.</p>
 <p data-layer="narrative">I found the order in the public docket.</p>
 <p data-layer="narrative">We discovered the order in the public docket.</p>
 <p data-layer="narrative">Our audit found the order in the public docket.</p>
 <p data-layer="narrative">He told the crowd, "I think I have close to a billion dollars in the Super PAC. I found the money myself," and the paper quoted him the same day.</p>
 <p data-layer="narrative">By Friday, we found the order in the public docket.</p>
 <p data-layer="narrative">After reviewing every filing, our audit found the order in the public docket.</p>
 <p data-layer="narrative">The result of our search was one order in the public docket.</p>
 <p data-layer="fact">Our World in Data reported the figure on Monday.</p>
 <p data-layer="fact">I-95 reopened on Monday after the crash.</p>
 <p data-layer="fact">Title I funds reached the district in August.</p>
 <p data-layer="fact">The docket page lists the motions heard on Monday.</p>
 <p data-layer="narrative">If you saw one of these spots, the committee paid for it, not the campaign.</p>
 <p data-layer="narrative">He told the crowd, "you saw the ballots with your own eyes," and left the stage.</p>
 <p data-layer="narrative">Wells Fargo said the loan was repaid in an hour.</p>
 <p data-layer="narrative">As of September 19, the minutes of the September 15-16 meeting had not been published.</p>
 <p data-layer="narrative">At the time of writing no ruling had issued in the appeal.</p>
 <p data-layer="fact">Finance Canada said the countermeasures would be effective as of 12:01 a.m. on September 8.</p>
 <p data-layer="fact">The minutes of the September meeting are due October 7 under the committee's calendar.</p>
 <p data-layer="narrative">As of September 19 the minutes remain unpublished.</p>
 <p data-layer="narrative">As of September 19, no minutes had been published.</p>
 <p data-layer="narrative">As of September 19 the minutes hadn't been published.</p>
 <p data-layer="narrative">In the records saved September 19 the transcript had not appeared.</p>
 <p data-layer="fact">The order was effective as of September 8, but the permit had not expired.</p>
 <p data-layer="fact">As of Friday the rate was 4 percent.</p>
 <p data-layer="fact">As of Friday the rate was not 4 percent.</p>
 <p data-layer="fact">As of September 19, the committee had 12 voting members.</p>
 <p data-layer="fact">The court's docket for this case through September 19 holds no filing of that kind.</p>
 <p data-layer="fact">Von der Leyen, in the press release: "Greenland can count on the EU. That was my message during my last visit. Today, I am back to deliver the real results of our close cooperation," and the release is dated September 7.</p>
 <h2 data-layer="fact">What we do not know yet</h2>
 <h2 data-layer="fact">What we found in the docket</h2>
 <figure class="quote-card" data-layer="fact"><blockquote class="qc-words">We found the ballots ourselves and the readers of this county saw them, she said.</blockquote></figure>
</section>
<section id="records" data-layer="fact">
 <p class="section-lede">Everything this page rests on, numbered where the story cites it. We keep a dated copy of each one.</p>
 <p class="not-section-lede">Our count of the sealed exhibits in the public docket came to nine.</p>
 <p class="sources-line-extra">We keep one more copy of every exhibit in the public docket.</p>
 <p>The court's minute order of September 17, saved the same day from the docket.</p>
 <p class="sources-line"><a href="/methodology">How we check</a> where this page says computed, the arithmetic was done from the saved series.</p>
</section>
</main></body></html>"""

def fails_for(html):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f: f.write(html); path = f.name
    out = []
    judged.extend(s for _, s, _ in vl.sentences(path))
    for tag, sen, inside in vl.sentences(path):
        own = vl.strip_q(sen, inside)
        if own == vl.SECTION_TITLE: continue
        if vl.READER.search(own): out.append(("reader", sen))
        if vl.SELF_PAGE.search(own) or vl.FIRST_PERSON.search(own): out.append(("process", sen))
        if vl.TIMESTAMPED_ABSENCE.search(own): out.append(("timestamped_absence", sen))
    os.unlink(path); return out

judged = []
hits = fails_for(PAGE)
text = " | ".join(s for _, s in hits)
REV = [("mirrored", 0.9 - i * 0.01, f"m{i}") for i in range(10)] + [("dictionary", 0.5, "d1"), ("dictionary", 0.4, "d2"), ("dictionary", 0.3, "d3")]
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
    ("'This page of the public docket' passes", "filing date" not in text),
    ("a sealed-docket fact passes", "judge sealed" not in text),
    ("first-person retrieval through the docket fails", any("We could not obtain" in s for _, s in hits)),
    ("a document called bare 'this page' mid-sentence fails", any("clerk added" in s for _, s in hits)),
    ("'This page found' fails", any("found the order in a mirror" in s for _, s in hits)),
    ("bare 'This page lists' fails", any(s.startswith("This page lists") for _, s in hits)),
    ("'This page rests on' fails", any("three filings" in s for _, s in hits)),
    ("an agency that did not answer through a docket passes", "before the deadline" not in text),
    ("bare 'This page was filed' fails", any("exhibit 12" in s for _, s in hits)),
    ("a seal number written on a docket page passes", "seal number" not in text),
    ("bare 'This page does not contain' fails", any("sealed appendix" in s for _, s in hits)),
    ("'We found the order' fails", any(s.startswith("We found the order") for _, s in hits)),
    ("'Our search found' fails", any(s.startswith("Our search found") for _, s in hits)),
    ("a docket page named as the document passes", "motion was filed" not in text),
    ("a numbered page of an order passes", "judge's signature" not in text),
    ("'We verified the order' fails", any(s.startswith("We verified") for _, s in hits)),
    ("'We reviewed every filing' fails", any(s.startswith("We reviewed") for _, s in hits)),
    ("'Our investigation found' fails", any(s.startswith("Our investigation") for _, s in hits)),
    ("'I found the order' fails", any(s.startswith("I found") for _, s in hits)),
    ("'We discovered' fails", any(s.startswith("We discovered") for _, s in hits)),
    ("'Our audit found' fails", any(s.startswith("Our audit") for _, s in hits)),
    ("mid-sentence 'we found' fails", any(s.startswith("By Friday, we found") for _, s in hits)),
    ("mid-sentence 'our audit found' fails", any(s.startswith("After reviewing") for _, s in hits)),
    ("'the result of our search' fails", any(s.startswith("The result of our search") for _, s in hits)),
    ("a proper name beginning with Our passes", "Our World in Data" not in text),
    ("an interstate route passes", "I-95" not in text),
    ("a roman numeral I passes", "Title I" not in text),
    ("a document page named as the document passes", "docket page lists" not in text),
    ("words containing we, my, our as substrings pass", "Wells Fargo" not in text),
    ("the middle sentences of a long quotation are not own voice", not any("my last visit" in s or "I am back" in s for _, s in hits)),
    ("the words after a long quotation closes are still judged", any("release is dated" in s for s in judged)),
    ("the unknowns section title is chrome", "What we do not know yet" not in text),
    ("a first-person authored heading fails", any(s == "What we found in the docket" for _, s in hits)),
    ("addressing the reader as you fails", any(k == "reader" and s.startswith("If you saw") for k, s in hits)),
    ("you inside a quotation passes", not any("own eyes" in s for _, s in hits)),
    ("a quotation the splitter cut in two is not own voice", not any("Super PAC" in s or "money myself" in s for _, s in hits)),
    ("a quote card's words are not judged", not any("ballots ourselves" in s for s in judged)),
    ("a class that merely contains section-lede is judged", any(s.startswith("Our count of the sealed") for _, s in hits)),
    ("a class that merely contains sources-line is judged", any(s.startswith("We keep one more") for _, s in hits)),
    ("'as of <date> ... had not' fails", any(k == "timestamped_absence" and s.startswith("As of September 19") for k, s in hits)),
    ("'at the time of writing' fails", any(k == "timestamped_absence" and s.startswith("At the time of writing") for k, s in hits)),
    ("an effective date written as 'as of' passes", "12:01 a.m." not in text),
    ("a due date passes", "due October 7" not in text),
    ("'remain unpublished' after a date fails", any(k == "timestamped_absence" and "remain unpublished" in s for k, s in hits)),
    ("a negator before the verb fails", any(k == "timestamped_absence" and "no minutes had been" in s for k, s in hits)),
    ("a contraction fails", any(k == "timestamped_absence" and "hadn't" in s for k, s in hits)),
    ("'in the records saved' fails", any(k == "timestamped_absence" and s.startswith("In the records saved") for k, s in hits)),
    ("an effective date with an unrelated negation passes", "permit had not expired" not in text),
    ("a dated rate passes", "was 4 percent" not in text),
    ("a dated negated value passes", "was not 4 percent" not in text),
    ("a dated positive count passes", "12 voting members" not in text),
    ("a bounded absence with no frame word passes", "holds no filing" not in text),
    ("the reread list is the top ten plus two per question left out", (lambda r: len(r) == 12 and r[:10] == REV[:10] and [h[0] for h in r[10:]] == ["dictionary", "dictionary"])(vl.reread_list(REV))),
    ("a question inside the top ten gets no extra rows", len(vl.reread_list(REV[:3])) == 3),
]
bad = [name for name, ok in checks if not ok]
for name, ok in checks: print(("ok  " if ok else "FAIL"), name)
sys.exit(1 if bad else 0)
