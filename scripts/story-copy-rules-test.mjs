import test from "node:test";
import assert from "node:assert/strict";
import { SCHEDULE_CODE, CUSTODY_TALK, storyFindings, citedPassages } from "./story-copy-rules.mjs";
import { storyCopy } from "./check-state-pages.mjs";

const custody = (s) => CUSTODY_TALK.some((re) => re.test(s));
const page = (main) => `<html><body><main>${main}</main></body></html>`;
const card = (speaker, words) => `<figure class="quote-card" data-layer="fact"><figcaption class="qc-head"><span class="qc-speaker">${speaker}</span></figcaption><blockquote class="qc-words"><p>${words}</p></blockquote></figure>`;

test("custody talk: the site's own rejected sentences fail", () => {
  for (const s of [
    "The figures on this page come from the saved records cited beside them.",
    "The state record has not yet read this story's sources.",
    "This page does not yet list who reported each figure.",
    "No changes are recorded in this view. Changes last checked 2026-09-08.",
    "His own response is not on any page we hold.",
    "we do not hold a production",
    "Truth Social, archive copy",
    "the Act could not be saved from any of five routes tried",
    "direct capture was blocked by the site, so its text was recovered through an assisted web reader",
    "captured copies are kept so the record stays verifiable",
    "The saved page is the Reuters dispatch as carried by Yahoo.",
    "a Punchbowl News item that we could not retrieve",
    "The saved post is stamped 10:43 AM with no time zone shown.",
    "cbo.gov refused three fetches, so we hold no copy and print no CBO figure.",
    "We have not saved the Star.",
    "no Council of Ministers approval is on any page we hold",
    "in the records we hold",
    "The page was saved on September 8.",
    "The release could not be fetched.",
    "No White House document in our records mentions hemp.",
    "The 26A124 docket we hold lists no filing between August 12 and August 24.",
    "One counts bookings, the other filings; we hold only the filings.",
    "the reuters.com page returns 401 from this machine",
    "Only that opening was served to us.",
    "a figure the sources this page holds do not support",
    "No statement is among the records saved for this page.",
    "We did not find a transcript of that meeting.",
    "What the records do not hold",
    "None of them is in a contract we have.",
    "We work from a copy saved August 23, 2026.",
    "Figures from the saved series dated September 8, 2026.",
    "The saved series reports totals in thousands.",
    "according to the National Conference of State Legislatures tracker we saved.",
    "Her office's own release, saved here, uses different words.",
    "The application and the reply are on the saved docket.",
    "The EIA weekly series we saved for all grades.",
    "The older annual table we also saved still shows 41,151.",
    "Steel, dairy, and agricultural equipment are on the saved list.",
    "The older table we hold shows 41,151.",
  ]) assert.ok(custody(s), s);
});

test("custody talk: ordinary reporting passes", () => {
  for (const s of [
    "The tweet was pinned to his profile.",
    "The state record lists three filings.",
    "The arrest was captured on video.",
    "The bill could not be saved.",
    "The committee has not yet read the bill.",
    "The docket does not yet list an order.",
    "No changes are recorded to the statute since 2019.",
    "Police captured the suspect on Tuesday.",
    "The vaccine saved lives.",
    "A direct capture of the flag decided the game.",
    "An assisted search of the archive found the deed.",
    "The courtroom system saved audio of the hearing.",
    "The campaign could not be saved from the candidate's late withdrawal.",
    "The exporter could not be saved from the new tariff.",
    "Body cameras captured video of the arrest.",
    "The bill could not be saved from a filibuster.",
    "The currency could not be saved from another selloff.",
    "The candidate's profile showed a pinned article about the election.",
    "The body could not be retrieved from the river.",
    "We keep a dated copy of each one.",
    "The record was saved by the clerk before the filing system failed.",
    "The candidate's pinned post announced the recount.",
    "Customs saved records of each duty payment.",
    "The body camera captured copies of the messages on the phone.",
    "The committee's saved version of the bill omitted section 4.",
    "The governor's pinned post remained at the top of her profile.",
    "The flight recorder's saved file ended two seconds before impact.",
    "We have saved the docket.",
    'Rubio later said "we have a special account that can take possession of the oil."',
    "The estimate could not be opened on September 8, so this story prints no CBO figure.",
    "A New York Times story on the ad the same day could not be opened.",
    "No Jeffries statement on the stopgap is in any record this story cites.",
    "We hold the company responsible for the spill.",
    "We saved the state $2 million, the auditor wrote.",
    "His signature is not on any page of the agreement.",
    "The body could not be retrieved from the crash site.",
    "The hospital record could not be retrieved during the outage.",
    "The contract could not be saved after the parties rejected the proposal.",
    "The agency published a dated list of the 17 approved fields.",
    "BLS via FRED, as published September 8, 2026; later releases may revise them.",
    "The NTSB's investigation page, as of Tuesday, gives the case a number.",
    "This story holds lessons for states rewriting their election laws.",
    "This story does not hold up against the court record.",
    "Results from this machine differed from the hand count.",
    "The sources that we have interviewed describe a divided committee.",
    "The records do not hold up under scrutiny.",
    "The sources we have read describe a divided committee.",
    "The files we have put in order run to 1,200 pages.",
    "White House presidential-actions listing, saved September 9",
  ]) assert.equal(custody(s), false, s);
});

test("schedule codes: tariff headings and statute paragraphs fail, money and dates pass", () => {
  for (const s of ["heading 9903.01.10", "products described in paragraphs (1)(C)(ii)(I)", "under (2)(A)", "9903.01.10 covers the first class.", "See the tariff schedule.9903.01.10 applies here.", "1.9903.01.10 covers the first class.", "headings 9903.01.10 and 9903.01.11.", "paragraph (1) (C) (ii)", "The proclamation added HTS 9903.01.10 for the covered goods.", "CBP 9903.01.10"]) assert.ok(SCHEDULE_CODE.test(s), s);
  for (const s of ["$9903.01", "$9,903.01", "$ 9903.01", "$   9903.01", "USD 9903.01", "usd 9903.01", "AUD 9903.01", "€9903.25", "EUR 9903.25", "₹9903.01", "jpy 9903.01", "chf 9903.01", "INR 9903.01", "2026-09-17", "September 9, 2026", "(90-6)", "note 12", "[1]", "(1)", "19903.01"]) assert.equal(SCHEDULE_CODE.test(s), false, s);
});

test("storyCopy reads only main and drops proof, source copy, script and style", () => {
  const html = page('<p data-layer="narrative">Narrative words.</p><p data-layer="proof">proof words</p><blockquote data-source-copy>quoted words</blockquote><script>script words</script><style>style words</style>') + "<aside>aside words</aside>";
  const text = storyCopy(html);
  assert.ok(text.includes("Narrative words"));
  for (const w of ["proof words", "quoted words", "script words", "style words", "aside words"]) assert.equal(text.includes(w), false, w);
  assert.throws(() => storyCopy("<html><body><aside>saved record</aside></body></html>"), /main/);
});

test("quote cards: introduced, attributed, unstacked", () => {
  const ok = page(`<section><p data-layer="narrative">She said it plainly.</p>${card("Jane Doe, mayor", "We will.")}</section>`);
  assert.deepEqual(storyFindings(ok, "/x/"), []);
  const stacked = page(`<section><p data-layer="narrative">Two voices.</p>${card("A", "one")}<!-- c -->\n  ${card("B", "two")}</section>`);
  assert.match(storyFindings(stacked, "/x/").join("\n"), /by B stacked on another card/);
  const afterFigure = page(`<section><figure class="story-figure"><figcaption>chart</figcaption></figure>${card("A", "one")}</section>`);
  assert.match(storyFindings(afterFigure, "/x/").join("\n"), /follows <figure>/);
  const noSpeaker = page(`<section><p data-layer="narrative">Intro.</p>${card("", "one")}</section>`);
  assert.match(storyFindings(noSpeaker, "/x/").join("\n"), /names no speaker/);
  const records = page('<section class="story-records"><p>This story rests on 3 records.</p></section>');
  assert.match(storyFindings(records, "/x/").join("\n"), /records list before the first section/);
});

test("cited passages: read from attributes in any order, entities decoded", () => {
  const html = [
    '<sup class="src-ref"><a href="#src-1" data-record-href="/records/rec-a/" data-passage="he said &quot;no&quot;" aria-label="Source 1">1</a></sup>',
    '<a data-passage="Tom&#39;s &amp; Jerry&#39;s" aria-label="x" data-record-href="/records/rec-b/" href="#src-2">2</a>',
    '<a href="/records/rec-c/" data-passage="figure link, href only">3</a>',
    '<a href="#src-4" data-record-href="/records/rec-d/">4</a>',
    '<a href="#src-5" data-record-href="/records/rec-e/" data-passage="then --> after" aria-label="x">5</a>',
    '<a class="ledger-source" href="https://example.com/story" data-passage="outlet link, not a record">6</a>',
  ].join("\n");
  assert.deepEqual(citedPassages(html), [
    { id: "rec-a", passage: 'he said "no"' },
    { id: "rec-b", passage: "Tom's & Jerry's" },
    { id: "rec-c", passage: "figure link, href only" },
    { id: "rec-e", passage: "then --> after" },
  ]);
});
