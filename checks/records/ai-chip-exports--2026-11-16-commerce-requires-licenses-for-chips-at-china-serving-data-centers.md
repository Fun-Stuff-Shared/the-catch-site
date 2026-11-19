# Commerce requires licenses to send AI chips to data centers serving Chinese firms: the record

Every fact line ends with its source: the record id and the record's words in square brackets (straight quotes, or curly quotes when the words hold straight ones; `admit.py check` verifies each one), or `[lead: URL]` for something found but not admitted, with the reason. A fact with neither is not in the record.

## The explanations

The story turns on two questions. What does the November 16 rule actually do, and from when? And why did it come now, and whose rule is it?

Question 1: what does the rule change, and from when?
- A. It bans Chinese firms' remote use of American AI chips: the U.S. "closes loophole" (NBC and NPR headlines; NBC: remote access "will be banned"). If true: prohibition language with no license path. We should not find: case-by-case license review.
- B. It requires a license, reviewed case by case: an exporter needs one to ship advanced chips to a data center anywhere abroad that gives large amounts of computing power to companies headquartered in China, Macau or the other countries in the same group, and a separate license is needed to ship to Indonesia, Malaysia, Singapore, Thailand and Brazil (the rule's own text). If true: a license review policy, a threshold, exceptions. We should not find: a flat prohibition.
- C. It is a proposal, not yet binding (WSJ: "The new proposed rule"). If true: a comment period before any effect. We should not find: "interim final rule" or an effective date.
- D. Timing variants: in force immediately on November 16 (AP: "took effect immediately") or in 90 days (NYT: "goes into effect in 90 days"). If true: an effective date of November 16, or 90 days out, in the rule.
- E. It adds nothing new: it "reinforces existing restrictions" that some data centers were already breaking (BIS's framing; Sen. Cantwell: BIS had warned that "certain arrangements may violate existing restrictions"). If true: the rule describes itself as a clarification. We should not find: new license requirements.
- F. It is a replacement framework that also loosens: besides the new controls, it removes the never-enforced Biden-era worldwide license requirement, model-weights controls and country tiers (review r1, finding 5). If true: removals in the rule text.

| Evidence | A | B | C | D | E |
|---|---|---|---|---|---|
| Rule: license applications for the new data-center control "will be reviewed on a case-by-case basis" [fr-pi-2026-23529: "Applications for licenses required by this section will be reviewed on a case-by-case basis."] | I: a license path exists | C | | | |
| Rule: the trigger is access to more than 12,000,000 "aggregate TPP" for companies headquartered in Macau or Country Group D:5 [fr-pi-2026-23529: "provide access to more than 12,000,000 “aggregate TPP”"] | I: below the threshold the new data-center control does not apply (other license requirements still can) | C | | | I: a new numeric trigger |
| Rule: "ACTION: Interim final rule" and "This rule is effective [INSERT DATE OF PUBLICATION IN THE FEDERAL REGISTER]" [fr-pi-2026-23529: "ACTION: Interim final rule."] [fr-pi-2026-23529: "Effective date: This rule is effective [INSERT DATE OF PUBLICATION IN THE FEDERAL REGISTER]."] | | C | I: binding on publication, comments taken after | I, for "90 days" | |
| Federal Register public inspection: filed November 16, scheduled for publication November 19 [fr-pi-2026-23529: "FR Doc. 2026-23529 Filed: 11/16/2026 4:15 pm; Publication Date: 11/19/2026"] | | C | I | I, for "immediately" on November 16 | |
| Rule: data centers already serving such companies "must obtain a license with 90 days of the effective date" [fr-pi-2026-23529: "must obtain a license with 90 days of the effective date of this IFR or face future export restrictions"] | | C | | the 90 days is a grace period for existing services, not the effective date | |
| Rule: a new license requirement for Indonesia, Malaysia, Singapore, Brazil and Thailand, with an exclusion for U.S.-headquartered buyers that report [fr-pi-2026-23529: "a license is required for exports, reexports, or transfers (in-country) to or within Indonesia, Malaysia, Singapore, Brazil, and Thailand"] | I: shipments continue under license | C | | | I: a new destination requirement |
| Rule: BIS says its 2023 control "has never been limited" to direct sales and already covered data centers where a China-headquartered firm was the main (over 50 percent) remote user, and tells violators to self-disclose [fr-pi-2026-23529: "This end-use control thus is not, and has never been limited only to exports"] | | C | | | C, for data centers that served mostly Chinese firms |
| BIS guidance, May 31, 2026: a license has been required since November 2023 for advanced chips sold to China-headquartered companies located anywhere, but data centers "are not required to cease the ongoing use" of chips "until further notice from BIS" [bis-guidance-2026-05-31: "This license requirement was first introduced on November 17, 2023."] [bis-guidance-2026-05-31: "computing items because of this guidance, until further notice from BIS."] | | C: the 90-day deadline ends "until further notice" | | | I: existing data centers were told they could carry on; the rule ends that |
| Rule, §742.6 policy: applications for advanced chips "for an entity headquartered" in D:5 or Macau face "a presumption of denial", and where more than one policy applies, that one governs [fr-pi-2026-23529: "will be reviewed under a presumption of denial"] | C: for chips meant for Chinese companies themselves, approval is presumed unlikely | C: the new data-center control is case by case; the older one presumes denial | | | |
| Rule: rescinds the AI Diffusion Rule, "never been enforced", removing its worldwide license requirement and model-weights controls [fr-pi-2026-23529: "The AI Diffusion Rule has never been enforced."] | | C | | | F: C; the removals undo rules never applied |
| Rule: the summary calls its targets "overseas data centers" [fr-pi-2026-23529: "transfers (in-country) to overseas data centers that remotely supply significant volumes"]; McGuire: the remote-access controls "do not apply to data centers in the United States" [mcguire-x-2026-11-16: "The biggest gap is the remote access controls do not apply to data centers in the United States."] | I: renting at U.S. data centers is untouched | C | | | |

Survives: B. E is ruled out in practice: BIS says a data center serving mostly Chinese-headquartered firms already needed a license under its 2023 control, but in May 2026 it told existing data centers they could keep operating "until further notice"; what is new is the 12,000,000 TPP trigger whatever the share, the five countries, and the 90-day deadline that ends the May tolerance. F survives as background: the removals take out Biden-era rules that were never enforced, so they change nothing a reader would see in practice, and the page does not need them. The licenses are not equally open: the data-center control is case by case, while chips meant for a China-headquartered company itself face a presumption of denial (review r1, finding 2). Ruled out: A, by the case-by-case license review and the threshold, and by the rule's reach only to data centers abroad; C, by "interim final rule" and an effective date on publication; D in both forms: the rule takes effect on Federal Register publication, scheduled November 19, and the 90 days is the deadline for data centers already serving such companies. The result turns on the rule's own text (the review policy and the DATES line), checked at the PDF BIS posted and the Federal Register's public inspection copy; it would change only if the published version differs.

Question 2: why did it come now, and whose rule is it?
- A. The Megaspeed and Jensen Huang scandal produced it: it is "the first U.S. policy response to the scandal" (CNBC), and Huang's scandal created "pressure on the Commerce Department to act" (NBC). If true: no version of this rule before the scandal broke. We should not find: an earlier draft approved and waiting.
- B. It was long planned at Commerce, and the timing is coincidence (the Commerce spokeswoman: the department "was actively considering new rules to address remote access, along with other agencies"; a senior official: the administration "had been discussing potential measures on remote access"). If true: Commerce authorship and a steady path. We should not find: Commerce holding the rule back, or other agencies credited with writing it.
- C. Treasury and the National Security Council wrote it and made Commerce publish it, over Lutnick's preference for a leaner rule (the BIS release's own line; Chris McGuire; Politico's three sources). If true: the release credits them; reporting that Lutnick resisted. We should not find: Commerce describing the rule as its own initiative.
- D. Congress forced it (the House-passed Remote Access Security Act; Cantwell's letter the day before). If true: the rule cites the bill or the letter.
- E. It was timed for Trump's trip to meet Xi, as leverage. If true: officials tie it to the talks. We should not find: officials saying it has no bearing on the trip.

| Evidence | A | B | C | D | E |
|---|---|---|---|---|---|
| NYT, November 12: in October "some top officials" sought rules restricting Chinese access to computing power in Southeast Asia, and "The president had also signed off on the proposal"; Kessler said Lutnick "had substantial policy issues with the idea" [nyt-lutnick-softer-2026-11-12: "The president had also signed off on the proposal."] | I: a version was approved before the scandal broke | I: Commerce held it back | C | | |
| BIS release: the rule was "written by and at the direction of the Department of Treasury and the National Security Council" [bis-release-2026-11-16: "written by and at the direction of the Department of Treasury and the National Security Council"] | | I: BIS credits other agencies with writing it | C | | |
| Politico: Bessent "pushed through" the rule, Rubio supported it, per three people [politico-bessent-rule-2026-11-16: "Treasury Secretary Scott Bessent pushed through a new Commerce Department rule"]; the URL still reads "over-commerce-objections" though the captured headline does not | | I | C, with "over objections" withdrawn from the headline | | |
| NYT, November 16: Lutnick "had pushed for a leaner version of the rules on foreign data centers" [nyt-loophole-2026-11-16: "Mr. Lutnick had pushed for a leaner version of the rules on foreign data centers, one that would be less onerous for Nvidia and its customers."] | | I | C | | |
| BIS, May 13, 2025: on dropping Biden's rule, BIS said it "will issue a replacement rule in the future" and announced licensing requirements for Malaysia and Thailand [bis-diffusion-rescission-2025-05-13: "BIS plans to publish a regulation formalizing the rescission and will issue a replacement rule in the future."] | I: a replacement was promised 18 months before the scandal | C: a planned rule | C | | |
| Bessent, November 13 (about blacklisting Megaspeed, not about this rule): Commerce "has the pen" on the entity list; Treasury had pushed "for months at the deputies level" [nyt-bessent-faults-2026-11-13: "Treasury and my deputy has been pushing for this for months at the deputies level."] | C: public blame came three days before the rule | | C | | |
| Trump, November 16: "two different views"; Lutnick might have delayed to avoid "a blowup with China" [nyt-loophole-2026-11-16: "if you didn’t delay it, if you didn’t do something, you could have a blowup with China."] | | | C | | I: the president frames the rule's risk to the trip, not its use |
| Senior official on the Friday call: the Megaspeed situation "would not have any bearing on the trip"; export controls "are not up for negotiation" [nyt-loophole-2026-11-16: "Export controls are national security matters and are not up for negotiation with the Chinese, the official said."] | | | | | contested: an interested official's word |
| China's commerce ministry, November 17: the move departs from the two leaders' consensus; countermeasures if the U.S. persists [mofcom-2026-11-17: "美方做法背离两国元首达成的重要共识"] | | | | | C, as a consequence; it does not show intent |
| Sens. Blunt Rochester and Curtis, November 13: remote-access limits "should not be geographically limited in scope" [bluntrochester-curtis-2026-11-13: "These policies should not be geographically limited in scope."]; the House-passed Remote Access Security Act would control remote access by a foreign person to U.S. items [rasa-hr2683-rfs: "jurisdiction of the United States by a foreign person."] | | | | C: pressure, dated before the rule; the rule does less than either asks | |
| The rule text names neither the Remote Access Security Act nor Cantwell's letter; it cites the Export Control Reform Act as its authority [fr-pi-2026-23529: "serves as the authority under which BIS issues this IFR"] | | | | unproven: no record ties the rule to them | |

Survives: C, and A in a narrower form: the rule's substance predates the scandal (a replacement promised by BIS in May 2025, a proposal the president approved in October, per the Times' sources), and the scandal and Bessent's public blame came just before Commerce published it, crediting Treasury and the NSC as authors. Ruled out: A as "the scandal produced the rule", by BIS's May 2025 promise and the October sign-off. B splits (the lead's note: B and C can both be true): its first half, that a rule was long planned, survives on BIS's May 2025 promise and the Commerce spokeswoman's word; its second half, Commerce authorship on a steady path, is ruled out by BIS's own line that the rule was "written by and at the direction of the Department of Treasury and the National Security Council" and by the reporting that Lutnick and Kessler held it back. Unproven: E; the official's denial is testimony from an interested side and China's protest shows a consequence, not intent (review r1, finding 9). Unproven: D; congressional pressure is real and dated, but no record ties the rule to it, and a private push would leave none. The result turns on two rows: the BIS release (a primary record, read at bis.gov) and the October sign-off, which rests on the Times' unnamed sources; if the sign-off was wrong, A (the scandal produced the rule) would survive alongside C.

## The story

On November 16 the Commerce Department issued a rule that requires a U.S. license to ship advanced AI chips to data centers abroad that rent large amounts of computing power to Chinese companies, and to ship them at all to Indonesia, Malaysia, Singapore, Thailand and Brazil.
Chinese firms have needed a U.S. license to buy the most advanced chips since 2022, so many rent them from data centers in Southeast Asia, and the rule falls on those data centers, on the firms, and on chipmakers like Nvidia.
Commerce had promised a replacement for Biden's chip rule since May 2025, and this one came days after Nvidia's chief executive resigned over an affair with a Megaspeed executive and Treasury Secretary Bessent blamed Commerce for not blacklisting Megaspeed; Commerce says Treasury and the White House national security staff wrote it.
Headlines say the U.S. closed the loophole, but the rule requires licenses rather than banning the rentals, and controls only chips exported to data centers abroad.
It takes effect when published, scheduled for November 19, data centers already serving Chinese firms have 90 days to get a license, and Commerce Secretary Lutnick, who wanted a leaner rule, faces Senate questions in December.

## The plan

Each layer, the sentence it tells, and its chain. Claim ids are in checks/claims.

Headline: Commerce will require licenses to ship AI chips to data centers serving Chinese firms at scale
Dek: The rule takes effect on publication, set for November 19, and does not cover data centers inside the United States.

What happened (sentences 1 and 2; the event, what it means, where it stands):
1. What did Commerce do? A license to ship advanced chips to any data center abroad that gives more than a set amount of computing power (12 million "TPP", about 800 H100 chips by McGuire's count) to companies headquartered in China, Macau and the other countries of concern; and a license for any shipment of those chips to Indonesia, Malaysia, Singapore, Thailand and Brazil unless the buyer is a U.S. company that reports [fr-pi-2026-23529: "provide access to more than 12,000,000"] [mcguire-x-2026-11-16: "equivalent to ~200 of the most advanced Blackwell chips, or ~800 H100 chips"] [fr-pi-2026-23529: "to or within Indonesia, Malaysia, Singapore, Brazil, and Thailand"].
2. Why does that matter? Chinese firms, which have needed a license to buy the most advanced chips since 2022, have rented them from data centers in Southeast Asia, and in May BIS said its guidance did not require data center operators otherwise following the rules to stop using the chips they had, "until further notice"; now one doing so at that scale must get a license within 90 days or face restrictions, and chip sellers must check who their data-center customers serve [bis-guidance-2026-05-31: "computing items because of this guidance, until further notice from BIS."] [nyt-loophole-2026-11-16: "That means Chinese companies that are blocked from buying advanced Nvidia chips directly can simply rent them through Southeast Asian firms."] [fr-pi-2026-23529: "must obtain a license with 90 days of the effective date of this IFR or face future export restrictions"].
3. Where does it stand? Filed November 16, takes effect on Federal Register publication, scheduled for November 19; comments for 60 days after. Named, not argued: BIS says Treasury and the NSC wrote it; it is a license requirement, not a ban [fr-pi-2026-23529: "Publication Date: 11/19/2026"] [bis-release-2026-11-16: "written by and at the direction of the Department of Treasury and the National Security Council"].

How it got here (sentence 3): opens on BIS's stated reason, then the dated chain, as a timeline.
1. What does Commerce say the rule is for? So that "existing restrictions ... cannot be circumvented through remote computing arrangements involving data centers in third countries" [bis-release-2026-11-16: "The rule is designed to ensure that existing restrictions on access to sensitive American technology cannot be circumvented through remote computing arrangements involving data centers in third countries."].
2. Hadn't anyone tried this before? Biden's January 2025 rule did; Trump's Commerce Department dropped it in May 2025 and promised "a replacement rule in the future" [npr-loophole-2026-11-16: "In May 2025, Trump's Commerce Department announced it would not enforce the rule and intended to rescind it"] [bis-diffusion-rescission-2025-05-13: "BIS plans to publish a regulation formalizing the rescission and will issue a replacement rule in the future."].
3. Why did it take until now? In October officials pushed new remote-access rules and the president signed off, but Lutnick said he did not understand the rush and warned of a trade war, per the Times [nyt-lutnick-softer-2026-11-12: "The president had also signed off on the proposal."].
4. What changed? The Megaspeed revelations, Huang's resignation on November 12, Bessent's November 13 "Commerce has the pen" (on blacklisting Megaspeed), the Blunt Rochester-Curtis letter the same day, Cantwell's November 15 letter, then the rule [nyt-bessent-faults-2026-11-13: "saying that other departments had pushed for the measure but that Commerce “has the pen.”"].
Visual: timeline, May 2025 to November 19.

Who wrote it (sentence 3, the dispute inside the administration):
1. Whose rule is it? BIS's release credits Treasury and the NSC; Politico's three sources say Bessent pushed it through with Rubio's support [politico-bessent-rule-2026-11-16: "Treasury Secretary Scott Bessent pushed through a new Commerce Department rule"].
2. What does Commerce say? Commerce and Justice say Commerce investigated Megaspeed from 2024 and handed the criminal case to Justice [doj-commerce-megaspeed-2026-11-17: "the Department of Commerce initiated an investigation into Megaspeed in 2024 for potential export control violations"]. What did Commerce want? A leaner rule, less onerous for Nvidia [nyt-loophole-2026-11-16: "Mr. Lutnick had pushed for a leaner version of the rules on foreign data centers, one that would be less onerous for Nvidia and its customers."]; Commerce says it worked with other agencies and was considering remote-access rules [nyt-lutnick-softer-2026-11-12: "The Commerce Department spokeswoman said that the department was actively considering new rules to address remote access, along with other agencies."].
3. What does Trump say? "Two different views"; Lutnick may have delayed to avoid "a blowup with China" [nypost-trump-lutnick-2026-11-16: "He might have delayed it, but he was doing that because if you didn’t delay it, if you didn’t do something, you could have had a blowup with China,"].
Quote card: McGuire, "I have never seen a BIS rule that was not written by BIS."

The Catch (sentence 4): a license, not a ban, and only abroad.
1. Does the rule ban Chinese firms from renting American chips? No: it requires a license, reviewed case by case, and only above the threshold [fr-pi-2026-23529: "Applications for licenses required by this section will be reviewed on a case-by-case basis."].
2. Does it reach every data center? No: it controls chips shipped abroad, not computing services, so data centers inside the United States are untouched; McGuire, who praises the rule: Chinese firms can still train "at data centers in Northern Virginia" [kharon-remote-access-2026-11-16: "The new rule does not make providing computing capacity a controlled activity; it regulates the chips behind that capacity."] [mcguire-x-2026-11-16: "So Chinese companies can legally train on large numbers of Blackwells at data centers in Northern Virginia."].
3. Who is still untouched? Below 12 million TPP the new control requires no license (an older control still reaches a data center whose main user is a Chinese company), and data centers inside the United States are outside it; it does reach chips already installed abroad, whoever holds them [fr-pi-2026-23529: "provide access to more than 12,000,000"] [fr-pi-2026-23529: "regardless of whether the person in possession of the EAR item was a party to the transaction to the original"].
3b. Is a license as good as a ban? Not always: the new data-center control is reviewed case by case, but chips meant for a China-headquartered company itself still face a presumption of denial [fr-pi-2026-23529: "will be reviewed under a presumption of denial"].
4. Who wanted more? Sens. Blunt Rochester and Curtis asked for limits "not geographically limited", and the House-passed Remote Access Security Act would control remote access itself, which would reach U.S. data centers [bluntrochester-curtis-2026-11-13: "These policies should not be geographically limited in scope."] [rasa-hr2683-rfs: "jurisdiction of the United States by a foreign person."].
Visual: two-column comparison, what headlines said vs what the rule says.

How the coverage told it (OutletCheck cards; errors first):
- NBC: "will be banned": mislabeled, a license requirement [nbc-loophole-2026-11-16].
- AP: "took effect immediately": wrong date, effective on publication, November 19 [ap-remote-access-2026-11-16].
- NYT: "goes into effect in 90 days": the 90 days is the deadline for existing data centers [nyt-loophole-2026-11-16].
- WSJ: "proposed rule" in its first version, dropped later: it is an interim final rule [wsj-crackdown-2026-11-16].

What happens next (sentence 5): steps table.
1. November 19: publication; the rule takes effect [fr-pi-2026-23529: "Publication Date: 11/19/2026"].
2. 60 days after: comments close; the rule can still change [fr-pi-2026-23529: "INSERT DATE 60 DAYS AFTER DATE OF PUBLICATION"].
3. 90 days after: data centers already serving Chinese firms must hold a license [fr-pi-2026-23529: "must obtain a license with 90 days of the effective date"].
4. December: Lutnick before the Senate Banking Committee [cnbc-cantwell-2026-11-16: "On Thursday, Senate banking committee Chair Tim Scott, R-S.C., summoned both Huang and Lutnick to testify before his committee in December."].
5. China's commerce ministry threatens countermeasures if the U.S. persists [mofcom-2026-11-17: "若美方一意孤行，中方将采取反制措施，坚定维护国家主权、安全、发展利益。"].
6. The Senate has not acted on the Remote Access Security Act, which the House passed [kharon-remote-access-2026-11-16: "which passed the House in January and awaits Senate action"].
7. Singapore is seeking "trusted access" for its companies [cna-singapore-2026-11-17: "We have also been engaging the relevant US authorities on the scope and implementation of the measure, as well as exploring how to facilitate trusted access for Singapore companies."].
What it will not settle: Chinese access at U.S. data centers; how many licenses Commerce grants (BIS's paperwork estimate is about 100 more licenses a year) [fr-pi-2026-23529: "BIS expects an annual increase of approximately 100 licenses"].

## Review r1: how each finding was judged

1. Threshold does not make smaller arrangements legal: verified; the matrix row now says the new control does not apply below it while other requirements can. No change to the five sentences.
2. Presumption of denial: verified in the rule's §742.6 policy; added as a row; the catch says "licenses, not a ban" rather than "case by case", and the claim carries both policies.
3. May 31, 2026 guidance: verified and admitted; it changes the "legally" coverage line (now not graded) and gives the 90-day deadline its meaning: it ends the May tolerance.
4. May 13, 2025 replacement promise and January 13, 2026 H200 policy: verified and admitted; sentence 2 and sentence 3 rewritten; Q2 gains a row ruling out "the scandal produced it".
5. The rule also removes controls: verified; scored as answer F; held as background because the removals undo rules never enforced.
6. Bessent's "pen" was about the entity list: verified in the Times' text; the row and sentence 3 now say so. Axios held as a lead.
7. Remote Access Security Act and the Blunt Rochester-Curtis letter: verified and admitted; they are the strongest case that the rule leaves the U.S. gap, and go to The Catch and What happens next.
8. Singapore's investigation: verified and admitted; background, not on the page beyond attributing the spy suspicion to U.S. officials.
9. China's response, and E unproven: verified and admitted; E moved from ruled out to unproven.
10. Nvidia's committee: verified and admitted; a reaction.
11. 100 licenses is a workload estimate: agreed; the figure now says so.

## Review r2: how each finding was judged

1. Ricketts' MEGA Act on Megaspeed: not fetched; it concerns blacklisting one company, not this rule [lead: https://www.ricketts.senate.gov/news/press-releases/ricketts-leads-effort-to-force-a-decision-on-megaspeed-entity-listing/, not admitted: another story's thread].
2. House interviews of Jensen Huang (December 1) and Nvidia's general counsel (December 2): not fetched; the Megaspeed inquiry, not the rule [lead: https://foreignaffairs.house.gov/news/press-releases/jensen-huang-and-nvidia-agree-to-appear-before-congress].
3. Axios's three presidential decisions, and the May 2025 promise being for a replacement rule generally: agreed on the second point; sentence 3 now says "a replacement for Biden's chip rule". Axios stays a lead.
4. Commerce's defense of its Megaspeed enforcement: already admitted; the plan's "who wrote it" layer now gives Commerce's account.
5. Legal authority over computing services: Kharon's admitted account covers it (the 2009 advisory opinion); background.
6. Ultimate parents and intermediaries: the claim already says "or whose ultimate parent is headquartered"; intermediaries are background.
7. Recommender exemption and 90-day ambiguities (WilmerHale): background; the page states the 90 days as the rule words it.
8. The May 31 guidance is not blanket permission: verified in its words ("otherwise engaged in activities consistent with the EAR", "because of this guidance"); the claim, the plan and the chronology now say so.
9. The foundry control: already in Background held.
10. The 30-day savings clause for shipments en route: verified in the rule; background.
No finding changes what survives in either matrix; the five sentences changed in wording only (finding 3). Reviews stop at round 2.

Background held:
- The rule lets shipments already en route on publication day finish under the old terms within 30 days [fr-pi-2026-23529: "is completed no later than on [INSERT DATE 30 DAYS"].
- Singapore found insufficient evidence that Alice Huang committed the offences it investigated, and did not investigate her for espionage [mha-singapore-megaspeed-2026-11-12: "Huang was not based in Singapore, and was not investigated for espionage."].
- The rule's removals: the AI Diffusion Rule's worldwide license requirement and model-weights controls, never enforced [fr-pi-2026-23529: "The AI Diffusion Rule has never been enforced."]. the recommender-system exemption; the foundry presumptions; the AI Diffusion rescission details; stock moves; the Commerce-Justice Megaspeed timeline; Trump's trip to Xi and the officials' "no bearing" line; Cantwell's family-business charge; Megaspeed dollar figures.

## The event

On November 16, 2026, the Commerce Department's Bureau of Industry and Security (BIS) released an interim final rule on remote access to advanced chips through data centers in other countries [bis-release-2026-11-16: "released an interim final rule (IFR)"]. The rule was signed by Jeffrey I. Kessler, the under secretary for industry and security [fr-pi-2026-23529: "Jeffrey I. Kessler, Under Secretary for Industry and Security."]. BIS's release says it was written "by and at the direction of" Treasury and the National Security Council [bis-release-2026-11-16: "written by and at the direction of the Department of Treasury and the National Security Council"]. The same day, Trump left for Asia, where he is to meet Xi Jinping [ap-remote-access-2026-11-16: "The rule came on the same day President Donald Trump departed for a trip to Asia"].

## The people it happens to

- Chipmakers and exporters, Nvidia above all: they must know who their data-center customers serve [fr-pi-2026-23529: "Data centers, foreign foundries, and chip exporters are required to perform robust due diligence on their customers"].
- Data centers abroad that rent computing power to Chinese-headquartered companies: those already doing so at scale must get a license within 90 days or face restrictions [fr-pi-2026-23529: "must obtain a license with 90 days of the effective date of this IFR or face future export restrictions"].
- Chinese companies that rent the chips abroad: NYT reports they could "simply rent them through Southeast Asian firms" [nyt-loophole-2026-11-16: "That means Chinese companies that are blocked from buying advanced Nvidia chips directly can simply rent them through Southeast Asian firms."]. Cantwell names Alibaba and ByteDance [cnbc-loophole-2026-11-16: "used overseas data centers equipped with advanced Nvidia chips to train advanced AI models."].
- Buyers in the five named countries, who now need a license unless they are U.S.-headquartered and report [fr-pi-2026-23529: "The license requirement for these five countries will not apply to semiconductors"].

## How it came to this

| Date | What happened | Source |
|---|---|---|
| Oct 7, 2022 | U.S. requires licenses for advanced chips to China | [npr-loophole-2026-11-16: "Since October 2022, U.S. companies have typically needed a BIS export license"] |
| Nov 17, 2023 | License required for advanced chips sold to China-headquartered companies wherever located | [bis-guidance-2026-05-31: "This license requirement was first introduced on November 17, 2023."] |
| Oct 25, 2023 | BIS's advanced-computing rule: an end-use control meant to stop China-headquartered companies "setting up cloud or data servers in other countries" to keep training AI models | [fr-acs-ifr-2023-10-25: "setting up cloud or data servers in other countries to allow these headquartered companies of concern to continue to train their AI models"] |
| Jan 15, 2025 | Biden's AI Diffusion Rule, including remote-access limits | [nyt-loophole-2026-11-16: "Just before leaving office, the Biden administration issued global rules on chip sales, including restrictions on Chinese firms remotely accessing data centers."] |
| May 13, 2025 | BIS promises a replacement rule and licensing for Malaysia and Thailand | [bis-diffusion-rescission-2025-05-13: "BIS plans to publish a regulation formalizing the rescission and will issue a replacement rule in the future."] |
| Jan 13, 2026 | BIS opens case-by-case licensing of Nvidia H200-class chips to approved Chinese buyers | [bis-h200-policy-2026-01-13: "BIS will now review export license applications for the Nvidia H200, AMD MI325X, and"] |
| May 31, 2026 | BIS: the 2023 license requirement still applies; its guidance does not require law-abiding data centers to stop using chips they hold, "until further notice" | [bis-guidance-2026-05-31: "computing items because of this guidance, until further notice from BIS."] |
| May 2025 | Trump's Commerce Department says it will not enforce the diffusion rule and will rescind it | [npr-loophole-2026-11-16: "In May 2025, Trump's Commerce Department announced it would not enforce the rule and intended to rescind it"] |
| Oct 2026 | Officials press remote-access rules; the president signs off; Lutnick says he does not understand the rush | [nyt-lutnick-softer-2026-11-12: "And Mr. Lutnick told his colleagues that he didn’t understand the rush."] |
| Nov 9, 2026 | NYT reports the Megaspeed investigation | [cnbc-loophole-2026-11-16: "The New York Times reported on Nov. 9"] |
| Nov 12, 2026 | Jensen Huang steps down as Nvidia CEO | [nyt-lutnick-softer-2026-11-12: "On Thursday, Mr. Huang announced that he was stepping down from the company"] |
| Nov 13, 2026 | Bessent on CNBC: Commerce "has the pen" | [nyt-bessent-faults-2026-11-13: "saying that other departments had pushed for the measure but that Commerce “has the pen.”"] |
| Nov 13, 2026 | Sens. Blunt Rochester and Curtis: remote-access limits should not be geographically limited | [bluntrochester-curtis-2026-11-13: "These policies should not be geographically limited in scope."] |
| Nov 15, 2026 | Cantwell letter to Lutnick | [cnbc-cantwell-2026-11-16: "alleged in a letter to Commerce Secretary Howard Lutnick on Sunday"] |
| Nov 16, 2026 | BIS releases the rule | [bis-release-2026-11-16: "released an interim final rule (IFR)"] |
| Nov 19, 2026 | Scheduled Federal Register publication; the rule takes effect | [fr-pi-2026-23529: "Publication Date: 11/19/2026"] |

## Why: the stated reasons

- BIS: the rule is "designed to ensure that existing restrictions on access to sensitive American technology cannot be circumvented through remote computing arrangements involving data centers in third countries" [bis-release-2026-11-16: "The rule is designed to ensure that existing restrictions on access to sensitive American technology cannot be circumvented through remote computing arrangements involving data centers in third countries."].
- Rule preamble: computing power at this level can train models "capable of supporting military- and intelligence-related activities" [fr-pi-2026-23529: "capable of supporting military- and intelligence-related activities"]; the five countries were added over concern that chips "are being diverted to entities and countries of concern without authorization" [fr-pi-2026-23529: "are being diverted to entities and countries of concern without authorization"].
- Recommender systems are exempt because "these functions do not pose the same national security threat" [fr-pi-2026-23529: "as these functions do not pose the same national security threat"].

## The sides

- For tighter controls: Bessent, Rubio and Greer "have all pushed to reinstate broad restrictions on data centers" [nyt-loophole-2026-11-16: "who have all pushed to reinstate broad restrictions on data centers in recent months"]. McGuire calls the rule "a major step forward" with gaps [mcguire-x-2026-11-16: "These rules are a major step forward."].
- For caution: Lutnick wanted a leaner rule [nyt-loophole-2026-11-16: "Mr. Lutnick had pushed for a leaner version of the rules on foreign data centers"], and argued new action would "instigate a further trade war with China" [nyt-lutnick-softer-2026-11-12: "he believed any new action would instigate a further trade war with China"]. Nvidia and its proponents say sales "help create jobs in the United States" [nyt-loophole-2026-11-16: "Nvidia and its proponents contend that the sales help create jobs in the United States"].
- Trump: "two different views" [nyt-loophole-2026-11-16: "Mr. Trump said there were just “two different views.”"].
- Agreed by both sides: the most advanced chips stay barred from direct sale to China [ap-remote-access-2026-11-16: "The U.S. bans sales of the country’s most advanced AI chips to China"].

## The numbers

| Figure | What it counts | As of | Source |
|---|---|---|---|
| 12,000,000 aggregate TPP | computing power at one data center or linked ones, provided to China-headquartered firms, above which a license is needed | rule, Nov 16, 2026 | [fr-pi-2026-23529: "provide access to more than 12,000,000 “aggregate TPP”"] |
| ~200 Blackwell / ~800 H100 chips | McGuire's conversion of the threshold, not a BIS figure | Nov 16, 2026 | [mcguire-x-2026-11-16: "equivalent to ~200 of the most advanced Blackwell chips, or ~800 H100 chips"] |
| 90 days | deadline for data centers already serving such firms to get a license | from the effective date | [fr-pi-2026-23529: "must obtain a license with 90 days of the effective date"] |
| 60 days | comment period | after publication | [fr-pi-2026-23529: "INSERT DATE 60 DAYS AFTER DATE OF PUBLICATION"] |
| about 100 | BIS's paperwork estimate of added licenses a year; not a count of data centers covered | rule's Paperwork Reduction Act section | [fr-pi-2026-23529: "BIS expects an annual increase of approximately 100 licenses"] |
| 5 | countries newly needing a license | rule | [fr-pi-2026-23529: "Indonesia, Malaysia, Singapore, Brazil, and Thailand"] |

## What coverage says that the records do not

- NBC: remote access "will be banned when Monday’s rule change goes into effect" [nbc-loophole-2026-11-16: "That remote access has been tolerated so far, but will be banned when Monday’s rule change goes into effect."]. The rule requires a license, reviewed case by case [fr-pi-2026-23529: "Applications for licenses required by this section will be reviewed on a case-by-case basis."], and reaches only data centers abroad.
- NBC's headline: "U.S. closes loophole that let Chinese companies use top AI chips" [nbc-loophole-2026-11-16: "U.S. closes loophole that let Chinese companies use top AI chips"]. McGuire, who praises the rule: Chinese firms can still "legally train on large numbers of Blackwells at data centers in Northern Virginia" [mcguire-x-2026-11-16: "So Chinese companies can legally train on large numbers of Blackwells at data centers in Northern Virginia."].
- AP: the rule "took effect immediately" [ap-remote-access-2026-11-16: "said in issuing the rule that took effect immediately"]. The rule is effective on Federal Register publication, scheduled November 19 [fr-pi-2026-23529: "Publication Date: 11/19/2026"].
- Politico's headline: "Commerce closes China’s backdoor to Nvidia chips" [politico-backdoor-2026-11-16: "Commerce closes China’s backdoor to Nvidia chips after White House steps in"]. Kharon: "The new rule does not make providing computing capacity a controlled activity; it regulates the chips behind that capacity" [kharon-remote-access-2026-11-16: "The new rule does not make providing computing capacity a controlled activity; it regulates the chips behind that capacity."].
- NYT: "The provision, which goes into effect in 90 days" [nyt-loophole-2026-11-16: "The provision, which goes into effect in 90 days"]. The 90 days is the deadline for existing data centers to get a license; the rule takes effect on publication.
- WSJ: "The new proposed rule" [wsj-crackdown-2026-11-16: "The new proposed rule would add Malaysia, Thailand, Indonesia, Singapore and Brazil"]. The rule is an interim final rule, binding on publication.
- NYT: Chinese firms "have continued to legally access the chips by renting them" [nyt-loophole-2026-11-16: "Chinese firms have continued to legally access the chips by renting them from data centers in Southeast Asia and elsewhere."]. The rule says data centers serving mostly Chinese firms already needed a license and should self-disclose [fr-pi-2026-23529: "Any entities in violation of this requirement should submit a voluntary self"], but BIS's May 31 guidance let existing data centers carry on "until further notice" [bis-guidance-2026-05-31: "computing items because of this guidance, until further notice from BIS."]. Not graded: in practice the rentals were tolerated.
- NYT and NBC: the five-country license applies to "companies with headquarters in" (NYT) or "data center customers in" (NBC) those countries [nyt-loophole-2026-11-16: "require a license to export advanced chips to companies with headquarters in Indonesia, Malaysia, Singapore, Thailand or Brazil"]. The rule makes it a destination requirement: any shipment "to or within" the five countries, unless the buyer is U.S.-headquartered.

## What is next

- Federal Register publication, scheduled November 19; the rule takes effect that day [fr-pi-2026-23529: "Publication Date: 11/19/2026"].
- Comments due 60 days after publication [fr-pi-2026-23529: "INSERT DATE 60 DAYS AFTER DATE OF PUBLICATION"].
- 90 days from the effective date: data centers already serving such companies must hold a license [fr-pi-2026-23529: "must obtain a license with 90 days of the effective date"].
- Lutnick has agreed to testify to the Senate Banking Committee in December [cnbc-cantwell-2026-11-16: "On Thursday, Senate banking committee Chair Tim Scott, R-S.C., summoned both Huang and Lutnick to testify before his committee in December."].
- Democrats take control of the House and Senate in January [cnbc-cantwell-2026-11-16: "And Democrats, who will take control of both the House and Senate in January"].

## Reactions

- Chris McGuire, Council on Foreign Relations senior fellow and former NSC official: "These rules are a major step forward" [mcguire-x-2026-11-16: "These rules are a major step forward."]; on the release's authorship line, "I have never seen a BIS rule that was not written by BIS" [mcguire-x-2026-11-16: "I have never seen a BIS rule that was not written by BIS."].
- China's Ministry of Commerce spokesperson, November 17: the U.S. move departs from "the important consensus reached by the two heads of state", and if the U.S. persists China will take countermeasures (translation) [mofcom-2026-11-17: "若美方一意孤行，中方将采取反制措施，坚定维护国家主权、安全、发展利益。"].
- Nvidia's board, November 17, set up a National Security and Export Control Oversight Committee [nvidia-committee-2026-11-17: "announced that the Board of Directors has established the National Security and Export Control Oversight Committee"].
- Sens. Blunt Rochester and Curtis, November 13: China "will simply rent access to chips elsewhere" if limits are geographic [bluntrochester-curtis-2026-11-13: "If they are, China will simply rent access to chips elsewhere, creating a whack-a-mole scenario."].
- Singapore's trade and digital ministries, November 17: "studying the details of this new measure carefully" and seeking "trusted access for Singapore companies" [cna-singapore-2026-11-17: "We have also been engaging the relevant US authorities on the scope and implementation of the measure, as well as exploring how to facilitate trusted access for Singapore companies."].
- Commerce and Justice, November 17, on Megaspeed: Commerce opened an investigation in 2024 [doj-commerce-megaspeed-2026-11-17: "the Department of Commerce initiated an investigation into Megaspeed in 2024 for potential export control violations"]; Nvidia put Megaspeed on its "no sell" list in June 2025 [doj-commerce-megaspeed-2026-11-17: "In June 2025, Nvidia placed Megaspeed on its “no sell” list."].
- Trump, November 16: Lutnick "might have delayed it" to avoid "a blowup with China" [nypost-trump-lutnick-2026-11-16: "He might have delayed it, but he was doing that because if you didn’t delay it, if you didn’t do something, you could have had a blowup with China,"].
- China's foreign ministry spokesperson Guo Jiakun, November 17, as reported by Global Times: the U.S. "keeps overstretching the concept of national security and abusing export control measures" [lead: https://www.globaltimes.cn/page/202611/1374456.shtml, captured but not admitted: a state outlet's rendering, used for nothing on the page yet].

## Unknowns

- How many data centers sit above the threshold: the rule gives no count; BIS estimates about 100 more licenses a year [fr-pi-2026-23529: "BIS expects an annual increase of approximately 100 licenses"].

## Leads not admitted

- Congress.gov actions for H.R. 2683, the Remote Access Security Act (Kharon: it "passed the House in January and awaits Senate action") [lead: https://www.congress.gov/bill/119th-congress/house-bill/2683/all-actions, capture refused with HTTP 403]. Kharon's account is admitted [kharon-remote-access-2026-11-16: "which passed the House in January and awaits Senate action"].
- Politico's correction removing "Commerce Department objections" from its headline, per the grok sweep [lead: https://www.politico.com/news/2026/11/16/bessent-pushed-new-ai-chips-rule-over-commerce-objections-01169043, the captured text ends before any correction note; the URL slug still carries "over-commerce-objections"].
- China's Ministry of Commerce statement threatening countermeasures [lead: https://www.globaltimes.cn/page/202611/1374476.shtml, not captured; English renderings differ across outlets].
- Malaysia's trade minister after the rule, "If you want to be in this game, you have to follow the regulation" [lead: https://www.reuters.com/world/asia-pacific/us-ai-chip-curbs-threaten-southeast-asia-data-centre-boom-shares-tumble-2026-11-17/, not fetched].
- Axios via the New York Post: Trump "approved action against chip diversion three times this year", including after a November 5 meeting [lead: https://nypost.com/2026/11/16/us-news/trump-defends-commerce-boss-lutnick-over-nvidia-megaspeed-controversy/, the Post's secondhand account of Axios; the Axios story was not fetched].
- Megaspeed dollar figures ($787 million, $4.8 billion, $12 billion) from McGuire, Warren and Coons, and Meyerson [lead: grok sweep, conflicting and unverified; not this story's question].
- Axios, November 11 and 13: presidential decisions on chip diversion in May, August and November, and a Bessent-Lutnick confrontation Commerce disputes (review r1, finding 6) [lead: https://www.axios.com/2026/11/11/trump-lutnick-nvidia-china-chip-export-controls, not fetched; the Times' October account is admitted and the Post's summary of Axios is held as a lead above].

## Review r1: how each finding was judged

1. Threshold does not make smaller arrangements legal: verified; the matrix row now says the new control does not apply below it while other requirements can. No change to the five sentences.
2. Presumption of denial: verified in the rule's §742.6 policy; added as a row; the catch says "licenses, not a ban" rather than "case by case", and the claim carries both policies.
3. May 31, 2026 guidance: verified and admitted; it changes the "legally" coverage line (now not graded) and gives the 90-day deadline its meaning: it ends the May tolerance.
4. May 13, 2025 replacement promise and January 13, 2026 H200 policy: verified and admitted; sentence 2 and sentence 3 rewritten; Q2 gains a row ruling out "the scandal produced it".
5. The rule also removes controls: verified; scored as answer F; held as background because the removals undo rules never enforced.
6. Bessent's "pen" was about the entity list: verified in the Times' text; the row and sentence 3 now say so. Axios held as a lead.
7. Remote Access Security Act and the Blunt Rochester-Curtis letter: verified and admitted; they are the strongest case that the rule leaves the U.S. gap, and go to The Catch and What happens next.
8. Singapore's investigation: verified and admitted; background, not on the page beyond attributing the spy suspicion to U.S. officials.
9. China's response, and E unproven: verified and admitted; E moved from ruled out to unproven.
10. Nvidia's committee: verified and admitted; a reaction.
11. 100 licenses is a workload estimate: agreed; the figure now says so.

## Review r2: how each finding was judged

1. Ricketts' MEGA Act on Megaspeed: not fetched; it concerns blacklisting one company, not this rule [lead: https://www.ricketts.senate.gov/news/press-releases/ricketts-leads-effort-to-force-a-decision-on-megaspeed-entity-listing/, not admitted: another story's thread].
2. House interviews of Jensen Huang (December 1) and Nvidia's general counsel (December 2): not fetched; the Megaspeed inquiry, not the rule [lead: https://foreignaffairs.house.gov/news/press-releases/jensen-huang-and-nvidia-agree-to-appear-before-congress].
3. Axios's three presidential decisions, and the May 2025 promise being for a replacement rule generally: agreed on the second point; sentence 3 now says "a replacement for Biden's chip rule". Axios stays a lead.
4. Commerce's defense of its Megaspeed enforcement: already admitted; the plan's "who wrote it" layer now gives Commerce's account.
5. Legal authority over computing services: Kharon's admitted account covers it (the 2009 advisory opinion); background.
6. Ultimate parents and intermediaries: the claim already says "or whose ultimate parent is headquartered"; intermediaries are background.
7. Recommender exemption and 90-day ambiguities (WilmerHale): background; the page states the 90 days as the rule words it.
8. The May 31 guidance is not blanket permission: verified in its words ("otherwise engaged in activities consistent with the EAR", "because of this guidance"); the claim, the plan and the chronology now say so.
9. The foundry control: already in Background held.
10. The 30-day savings clause for shipments en route: verified in the rule; background.
No finding changes what survives in either matrix; the five sentences changed in wording only (finding 3). Reviews stop at round 2.

Background held:
- The rule lets shipments already en route on publication day finish under the old terms within 30 days [fr-pi-2026-23529: "is completed no later than on [INSERT DATE 30 DAYS"].
- Singapore found insufficient evidence that Alice Huang committed the offences it investigated, and did not investigate her for espionage [mha-singapore-megaspeed-2026-11-12: "Huang was not based in Singapore, and was not investigated for espionage."].
- The rule's removals: the AI Diffusion Rule's worldwide license requirement and model-weights controls, never enforced [fr-pi-2026-23529: "The AI Diffusion Rule has never been enforced."].
- Chip stocks fell on Monday [nyt-loophole-2026-11-16: "Share prices of chip stocks tumbled Monday."].
- The rule formally rescinds the AI Diffusion Rule, which "has never been enforced" [fr-pi-2026-23529: "The AI Diffusion Rule has never been enforced."].
- The rule tightens the presumptions chip fabricators face for advanced-node logic chips [fr-pi-2026-23529: "this IFR amends the presumptions which front-end chips fabricators and chip"].
