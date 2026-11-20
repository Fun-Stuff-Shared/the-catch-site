# House committee releases Commerce's China chip-license table: the record

Every fact line ends with its source: the record id and the record's words in square brackets (straight quotes, or curly quotes when the words hold straight ones; `admit.py check` verifies each one), or `[lead: URL]` for something found but not admitted, with the reason. A fact with neither is not in the record.

## The explanations

The story turns on three questions. What do the 879,868 approvals amount to: chips sent to China, or permission that went largely unused? Did Commerce approve chips for companies the Pentagon calls Chinese military companies? And why were the biggest requests, for ByteDance and Alibaba data centers in Southeast Asia, sent back?

Question 1: what did the 879,868 approvals amount to?
- A. Chips shipped to China: "approved the shipment" and the order "was fulfilled", "sending" 75,000 to Alibaba (The Hill); "over 30% of the AI chips sent to China were shipped to" designated companies (McGuire, quoted by Reuters); "879,000 advanced AI chip shipments to China" (Straits Times summary). Reuters' own copy says "approved shipments" but adds that it was not clear how many resulted in shipments (review r1, finding 2). If true: shipped statuses in the table, and shipments on the order of the approvals. We should not find: approved rows marked not shipped.
- B. Permission, none of it used by May 11; limited shipments came later and have stopped (Kessler in July: "very few"; Nvidia's filings and statements). If true: the table marks the approvals unshipped; later records show some shipments, small next to the approvals. We should not find: shipments near 879,868, or no shipments at all.
- C. Permission Beijing kept from being used: China restricted its companies' purchases (Nvidia's August 10-Q). If true: Nvidia says it could not sell what it was licensed to. We should not find: large shipments under the licenses.
- D. Permission U.S. conditions throttled: U.S. inspection, a 25 percent tariff, volume limits (Nvidia: "strict conditions and limited volumes"). If true: conditions in the January rule and Nvidia's filings. We should not find: unconditioned licenses.

| Evidence | A | B | C | D |
|---|---|---|---|---|
| BIS table, as of May 11, 2026: every one of the 21 approved rows reads "Approved, not shipped" [bis-license-table-2026-05-11: "12/16/2025 | Nvidia | Alibaba Group | 75,000 | Approved, not shipped | China"] [hfac-summary-2026-11-19: "BIS approved the export, re-export, or transfer (in-country) of 879,868 covered integrated"] | I, as of May 11 | C | C | C |
| Kessler to the committee, July 14: "minimal exports" of H200s so far; shipments had begun but were "very few" [reuters-kessler-2026-07-14: "There have been minimal exports"] | I | C | C | C |
| Nvidia 10-Q, August 26: licenses from February 2026 for "small amounts" of H200s; sales "restricted by the PRC government"; "a fraction of the allowed shipments", under 1 percent of data center revenue [nvidia-10q-2026-08-26: "we have made a fraction of the allowed shipments under the USG’s H200 licensing program"] [nvidia-10q-2026-08-26: "but such sales were restricted by the PRC government, and we have been unable to sell all the products for which we have licenses"] | I | C | C | C |
| Nvidia 10-Q: licenses require U.S. inspection before shipment, so H200s shipped under them pay a 25 percent tariff Nvidia could not pass on [nvidia-10q-2026-08-26: "any H200s shipped under the new licensing program are subject to a 25% tariff upon importation into the United States"] | | C | | C |
| January 2026 rule: case-by-case review only if the exporter certifies supply, a 50 percent cap against U.S. shipments, buyer security and third-party testing in the United States [fr-h200-rule-2026-01-15: "the aggregate shipments of the product to China and Macau"] | | C | | C |
| Nvidia CFO commentary, November 17: Hopper data center shipments to China were $2.4 billion in the quarter ended October 25 [nvidia-cfo-q3-2026-11-17: "Shipments of Data Center Hopper products to China during the quarter were $2.4 billion."]; Kress: the licensed H200s "went to China within this last quarter" [cnbc-kress-2026-11-18: "we would only have the licensed H200s [Nvidia's data center GPUs], and those went to China within this last quarter"] | C, for shipments after May; the count of chips is not given | C | I, in its strong form (nothing sold) | C |
| Reuters, November 5, citing two people: about 600,000 H200s stored in Hong Kong awaiting Beijing's approval to enter mainland China; some allowed in [reuters-hk-stockpile-2026-11-05: "About 600,000 of Nvidia’s advanced artificial intelligence chips are stored in Hong Kong awaiting shipment to mainland China, two people familiar with the matter said, as Beijing withholds approval for large-scale imports despite demand from technology firms."] | | C | C | |
| Nvidia, November 17 and 19: no longer shipping licensed Hopper data center products to China; "we have since stopped shipping H200s to China" [nvidia-call-q3-2026-11-17: "we are no longer shipping licensed Hopper data center products to China"] [reuters-licenses-2026-11-19: "despite receiving some licenses, we have since stopped shipping H200s to China"] | | C | | |

Survives: B, with C and D as its reasons, which overlap rather than compete. Ruled out: A as of May 11, by the table itself; the approved chips had not shipped. What shipped since is a separate fact: Nvidia shipped licensed H200s to China from roughly May through October and stopped by November 17, with $2.4 billion of Hopper data center shipments in the quarter ended October 25; no record gives a chip count or ties the shipments to particular licenses, and nothing in the record shows any AMD MI325X shipment. C in its strong form (Beijing blocked everything) is ruled out by the $2.4 billion; its weak form (Beijing held purchases down) survives on Nvidia's own filing and Reuters' November 5 report of about 600,000 H200s waiting in Hong Kong for Beijing's approval (review r1, finding 6); that report ties no chips to particular licenses, and Hong Kong counts as China in the table's "Chip Location" sense only by inference, so the page gives it as Reuters' report and does not add it to any shipped count. The table covers the applications in BIS's May 11 summary; the committee says it holds others not fully reflected, including a 445,000-chip Tencent request (review r1, finding 1). The result turns on the table's status column, rechecked at the committee's PDF and the Scribd text layer row by row; it would change only if BIS's status column meant something other than what it says, and the table defines no status. Unknown: how many of the 879,868 were ever shipped.

Question 2: did Commerce approve chips for companies the Pentagon calls Chinese military companies?
- A. Yes: BIS approved 272,000 chips for Alibaba, Tencent, Baidu and BYD, "Department of War-designated Chinese Military Companies" (Mast's release; The Hill: "approved the shipment of nearly 900,000 AI chips to Defense Department-designated Chinese military companies"; McGuire: "over 30%"). If true: the four on the 1260H list when approved. We should not find: listings dated after the approvals.
- B. Only Tencent was listed when the approvals were in place: the Pentagon added Alibaba, Baidu and BYD on June 8, 2026, after the May 11 status date. If true: a June 2026 listing for the three, Tencent listed earlier. We should not find: the three on a list in force before May 11.
- C. The list has no bearing on export licenses: the 1260H list is a Pentagon designation that bars Defense contracting, not exports, so approving these buyers broke no export rule (the plain alternative). If true: no export prohibition tied to the list. We should not find: an export-control rule keyed to 1260H.
- D. Commerce vetted the buyers under the January rule's security conditions and multi-agency review (Commerce, November 19). If true: the rule's conditions; Commerce's statements. We should not find: approvals without the certifications.

| Evidence | A | B | C | D |
|---|---|---|---|---|
| HFAC summary: the four are "Chinese Military Companies in the Department of War’s latest 1260H list from June 2026" [hfac-summary-2026-11-19: "companies identified as Chinese Military Companies in the Department of War’s latest"] | C, as of now | C: the summary dates the list June 2026 | | |
| Federal Register, June 10, 2026: the Deputy Secretary of Defense designates Alibaba, Baidu and BYD [fr-1260h-2026-06-10: "Alibaba Group Holding Limited (Alibaba)"]; TechCrunch, June 8: "The Pentagon has added Alibaba, Baidu, EV-maker BYD" [techcrunch-1260h-2026-06-08: "The Pentagon has added Alibaba, Baidu, EV-maker BYD, and buzzy robotics company Unitree to a list of entities it says support the Chinese military."] | I, for three of the four at the time of the approvals | C | | |
| The January 2025 list includes Tencent [dod-1260h-2025-01-07: "Tencent Holdings Limited"] | C, for Tencent | C | | |
| TechCrunch: the June update "was briefly published in February, before being pulled from the Federal Register for unexplained reasons" [techcrunch-1260h-2026-06-08: "This particular update to the 1260H list was briefly published in February, before being pulled from the Federal Register for unexplained reasons"] | C, weakly: a withdrawn list named them before some approvals may have come | C | | |
| BIS table gives application dates and a status as of May 11, no approval dates [bis-license-table-2026-05-11: "Columns: Date submitted | Exporter"] | | C: every approval predates June 8 | | |
| WilmerHale: a 1260H listing was "initially reputational rather than legal"; from June 30, 2026, it bars Pentagon contracts [wilmerhale-1260h-2026-06-12: "In this respect, the principal effect of designation was initially reputational rather than legal."] | | | C | |
| January 2026 rule keeps end-use and end-user controls: the transaction must not be "prohibited by end user/use controls" [fr-h200-rule-2026-01-15: "the transaction is not prohibited by end user/use controls"]; Commerce: licensing decisions are "the product of deliberation and consultation among multiple U.S. government agencies" [businesstimes-nyt-2026-11-20: "Licensing decisions are the product of deliberation and consultation among multiple U.S. government agencies, he said."] | | | C | C |
| HFAC summary: every Nvidia and AMD application said the transfer posed a "low" risk of diversion; most Nvidia applications listed Maginfra and New Matrix as possible installers [hfac-summary-2026-11-19: "Every NVIDIA and AMD application stated that the proposed transfer posed a"] | | | | contested: the committee reads this as weak vetting; the record does not show what BIS checked. The Information reports, from unnamed people, that Kessler pushed approvals over other agencies' objections; paywalled and unadmitted, held as a lead (review r1, finding 5) |

Survives: B and C. A survives only in the present tense: all four are designated now, and Tencent was when the approvals were in place; the three others were added on June 8, after the May 11 status date. "Approved chips for designated military companies" is true of Tencent at the time and of all four today. D is unproven: no record shows what BIS checked. The result turns on two dates, the June 8 designation and the May 11 status date, both checked at the primary records; a withdrawn February version named the companies, so "listed only after the approvals" holds for the list in force, and the approval dates themselves are not in the table.

Question 3: why were the largest requests, 1,118,500 chips for ByteDance and Alibaba data centers in Malaysia, Indonesia and Thailand, returned?
- A. BIS was already turning away the offshore data-center route that the November 16 rule later put under license. If true: a stated reason tying the returns to offshore data centers.
- B. Those applications sat outside the January rule's case-by-case path, which covers chips "destined to China or Macau"; for Chinese-headquartered firms elsewhere the rule kept a presumption of denial. If true: the rule's text says so.
- D. The applicants withdrew them, a license exception applied, or no license was needed: the regulation lists these among the reasons for a return (review r1, finding 3). If true: the regulation lists them. We should not find: a stated denial.
- C. Ordinary paperwork returns: BIS returns a registered application "without action" when it cannot fix deficiencies crucial to processing it, and it returned about one in eight applications this way in 2021. If true: a deficiency notice.

| Evidence | A | B | C |
|---|---|---|---|
| BIS table: the five offshore rows are "RWA"; the table gives no reason for any status [bis-license-table-2026-05-11: "12/11/2025 | Nvidia | Bytedance System SDN BHD | 508,000 | RWA | Malaysia"] | | | |
| January rule: case-by-case for "exports from the United States destined to China or Macau"; "presumption of denial" kept for Chinese-headquartered entities located outside them [fr-h200-rule-2026-01-15: "This rule maintains a presumption of denial licensing policy for exports to end-users located outside of Macau or destinations in"] | | C | |
| 15 CFR 750.4: an application BIS cannot correct is "returned without action" [ecfr-750-4: "it will be returned without action"]; BIS returned 11.8 percent of applications without action in 2021 [bis-stats-2021: "Return without action (RWA) totaled 4,706"] | | | C |
| EAR 772: an application may be returned because the applicant asked, a license exception applies, the items are outside Commerce's jurisdiction, documents are missing, or the applicant cannot be reached [ear-772-rwa: "The applicant has requested the application be returned;"] [ear-772-rwa: "A License Exception applies;"] | | | C | C |
| The Alibaba Group request for 610,000 chips to China was also returned [bis-license-table-2026-05-11: "2/6/2026 | Nvidia | Alibaba Group | 610,000 | RWA | China"] | no bearing: BIS could have had different reasons for different returns (review r1, finding 3) | | C | C |

Survives: B, C and D; none is proven. Unproven: A; no record states a reason for any return, and BIS's notices to the applicants are not public. The page says the table gives no reason and states the January rule's scope as a fact, without tying the two.

## The story

On November 19 a House committee released a Commerce Department table showing that by May 11 the department had approved 879,868 Nvidia and AMD AI chips for Chinese companies, out of 3.4 million requested, and that none had shipped.
The approvals went to companies including ByteDance, Tencent, Alibaba, Baidu and BYD, while requests for 1.9 million more, among them ByteDance and Alibaba data centers in Southeast Asia, were sent back.
Committee chairman Brian Mast made the table public under a 2018 export law as Congress examines Commerce's handling of chip sales, after Nvidia's chief executive resigned amid news of his affair with a former Megaspeed executive whom U.S. authorities suspect of spying for China.
The Hill and a former official quoted by Reuters described the approvals as chips sent or shipped, including to Pentagon-listed Chinese military companies, but the table shows none shipped by May 11, and three of those four companies joined the Pentagon list only on June 8.
Nvidia says it shipped licensed H200s to China starting by July and has since stopped, no record says how many, and Lutnick, Huang and BIS's chief face Congress in December.

## The plan

Headline: Commerce approved 879,868 AI chips for Chinese companies; none had shipped by May
Dek: A Commerce table a House committee released shows every approval unshipped as of May 11. Nvidia shipped licensed H200s to China later, then stopped.

What happened (sentence 1; the event, what it means, where it stands):
1. What did the committee release? The BIS status table of H200 and MI325X license applications as of May 11, 2026 (the committee says it holds others not fully reflected), and a two-page summary; released November 19 by the House Foreign Affairs Committee under its chairman, Brian Mast, a Florida Republican, by unanimous consent [hfac-release-2026-11-19: "This afternoon, Chairman Brian Mast exercised his authorities under the Export Control Reform Act"] [meeks-remarks-2026-11-19: "the Committee approved by unanimous consent the disclosure of license information"].
2. What does it show? 3,444,160 chips requested; 879,868 approved in 21 applications, each marked "Approved, not shipped"; 1,888,950 returned without action; one rejected; 600,342 still pending [hfac-summary-2026-11-19: "May 11, 2026, as of that date, BIS received applications to sell 3,444,160 covered"] [bis-license-table-2026-05-11: "12/16/2025 | Nvidia | Alibaba Group | 75,000 | Approved, not shipped | China"].
3. Who decides? BIS, the Commerce agency that licenses exports, under the January 2026 rule that opened case-by-case review for these chips [fr-h200-rule-2026-01-15: "revising its license review policy for exports of certain semiconductors to China"].
4. Where does it stand? Nvidia shipped some licensed H200s after May and has stopped; how many approved chips ever shipped is not public. Named, not argued: coverage reported the approvals as shipments.
Visual: a stacked bar of the 3.44 million requested chips by status (approved, returned, rejected, pending).

Who got what (sentence 2): opens on "who were the buyers?"
1. Who was approved? ByteDance 150,000 and Tencent 150,000, each split between an Nvidia and an AMD license; Alibaba, VNET, Linkwise, Kuaishou and DiDi 75,000 each; Baidu 43,000; BYD 4,000; carmakers including Tesla's Shanghai unit [bis-license-table-2026-05-11: "12/22/2025 | AMD | Oriental Power Holdings Limited, a wholly owned subsidiary of Tencent Holdings Limited | 75,000 | Approved, not shipped | China"].
2. Who was turned back? Alibaba asked for 948,950 and got 75,000; the largest requests, 1,118,500 chips for ByteDance and Alibaba data centers in Malaysia, Indonesia and Thailand, and 610,000 for Alibaba Group in China, were returned without action, which is not a denial: BIS rules list reasons from an applicant's own request to missing documents or no license being needed, and the table gives none [hfac-summary-2026-11-19: "948,950 covered integrated circuits for Alibaba and its"] [ear-772-rwa: "The applicant has requested the application be returned;"].
3. Why would the offshore requests differ? The January rule's case-by-case path covers chips going to China or Macau; for Chinese-owned firms elsewhere it kept the presumption of denial. Stated as the rule's scope, not as the reason [fr-h200-rule-2026-01-15: "This rule maintains a presumption of denial licensing policy for exports to end-users located outside of Macau or destinations in"].
4. Who would install the chips? Most Nvidia applications listed Maginfra, Beijing New Matrix, ZTE Kangxun and Lenovo; the Times found Maginfra's and New Matrix's offices empty; Mast calls them "fake companies"; every application rated diversion risk "low" [hfac-summary-2026-11-19: "Kangxun Telecom Co., Ltd., and Lenovo or its subsidiaries as entities that “may install"] [cnbc-licenses-2026-11-19: "Both are fake companies."].
Visual: table of the 21 approvals, largest first.

Why now (sentence 3):
1. How could a committee publish confidential license data? The Export Control Reform Act lets it when withholding is "contrary to the national interest"; Meeks and Warren invoked the same law in December 2025 to get the data [hfac-summary-2026-11-19: "the withholding of the following information is contrary to the national interest"] [meeks-warren-2025-12-22: "The lawmakers made the request pursuant to the Export Control Reform Act of 2018 (ECRA)."].
2. Why now? Mast, November 16: "Americans deserve to know how this happened"; after Jensen Huang's November 12 resignation and Commerce's November 16 rule (link the November 16 story) [mast-x-2026-11-16: "Americans deserve to know how this happened and we will be getting answers."].
3. What does each side say? Meeks: BIS "seemed to approve licenses ... with little scrutiny"; Commerce: the approvals follow the January rule's security requirements and multi-agency review [meeks-remarks-2026-11-19: "the agency seemed to approve licenses for advanced chips to China with little scrutiny"] [reuters-licenses-2026-11-19: "which imposes significant additional national security-related requirements on license applicants"].

What shipped after May (sentence 5): opens on "so did any of these chips reach China?"
1. July: Kessler, BIS's head, tells the committee "minimal exports," "very few," then "trivial" [reuters-kessler-2026-07-14: "There have been minimal exports of any H200s to China so far"].
2. August: Nvidia says Beijing restricted the sales; it made "a fraction of the allowed shipments," under 1 percent of data center revenue; each H200 had to pass U.S. inspection and pay a 25 percent tariff [nvidia-10q-2026-08-26: "we have made a fraction of the allowed shipments under the USG’s H200 licensing program."].
3. August to October: Nvidia's Hopper data center shipments to China, $2.4 billion; Kress says the licensed H200s "went to China within this last quarter" [nvidia-cfo-q3-2026-11-17: "Shipments of Data Center Hopper products to China during the quarter were $2.4 billion."].
4. November 17 and 19: Nvidia stops [reuters-licenses-2026-11-19: "despite receiving some licenses, we have since stopped shipping H200s to China"].
4b. Beijing's side: Reuters, November 5, citing two people, about 600,000 H200s stored in Hong Kong awaiting Beijing's approval [reuters-hk-stockpile-2026-11-05: "Beijing has yet to approve large-volume imports into mainland China, the people said."].
5. AMD? Licenses in February; in August it did not know whether China would allow imports; its November filing reports licenses, not shipments [amd-10q-2026-08-05: "We do not yet know whether any imports of MI325 products will be allowed into China."].
Visual: timeline, December 2025 to November 19.
Quote card: Kress, "we would only have the licensed H200s, and those went to China within this last quarter."

The Catch (sentence 4):
1. Were 879,868 chips shipped or sent? No: as of May 11 every approval was unshipped; The Hill wrote "the order was fulfilled" and "sending", McGuire, quoted by Reuters, "over 30% of the AI chips sent to China were shipped to" designated companies, the Straits Times "879,000 ... shipments to China". Reuters itself said it was not clear how many shipped, and the table answers: none by May 11 [hill-licenses-2026-11-19: "The order was fulfilled through 21 license applications as of May 11"] [reuters-licenses-2026-11-19: "It was not immediately clear how many of the approvals resulted in actual China-bound shipments of chips"].
2. Were all four on the Pentagon list when approved? Tencent since January 2025; Alibaba, Baidu and BYD from June 8, 2026, after the May 11 status date (a February version was published and pulled); the list governs Pentagon contracting, not exports. Approved before three were listed; all four listed now [techcrunch-1260h-2026-06-08: "The Pentagon has added Alibaba, Baidu, EV-maker BYD"] [wilmerhale-1260h-2026-06-12: "In this respect, the principal effect of designation was initially reputational rather than legal."].
3. Did Commerce approve 3.4 million? No: that is what was requested (Business Times/NYT dek) [businesstimes-nyt-2026-11-20: "The Commerce Department approved applications to sell more than 3.4 million chips to the firms, lawmakers say"].
Visual: two-column comparison, what coverage said vs what the table says.
The qualifier: shipments did happen after May; the Catch is about the approvals as of May 11, not about whether any chips reached China.

Every explanation, tested (reader-facing): the three questions and their answers.

What happens next:
0. December 1: Commerce's answers due to Meeks and Kamlager-Dove on whether Nvidia influenced the Megaspeed investigation [reuters-meeks-probe-2026-11-20: "which requested answers and relevant documents by December 1"].
1. December 1: Huang's closed-door interview with the committee and two others; December 2, Nvidia's general counsel [cnbc-licenses-2026-11-19: "Huang is due for a closed-door transcribed interview with the House Foreign Affairs panel and two other committees on Dec. 1."].
2. Senate Banking: Huang and Lutnick agreed to testify [cnbc-licenses-2026-11-19: "Huang and Commerce Secretary Howard Lutnick had also agreed to testify"].
3. Meeks wants public hearings with Lutnick and Kessler [meeks-remarks-2026-11-19: "That must include public hearings with Commerce Secretary Howard Lutnick and BIS Undersecretary Jeffrey Kessler."].
4. Nvidia's forecast assumes no data center revenue from China [nvidia-cfo-q3-2026-11-17: "We are not assuming any Data Center compute revenue from China in our outlook."].
What it will not settle: how many approved chips shipped; what happened to the 23 pending applications after May 11.

Background held: the per-company table beyond what the page shows; Lenovo's two non-China licenses; the 445,000-chip Tencent application not in the summary; New Century Lettall's ties to Megaspeed (pending, not approved); the 1260H denials by Alibaba and Baidu; AMD's MI308 history; Reuters' "about 10,000 H200 chips" each for several internet companies (anonymous sources); Huang's December 1 interview details.

## The event

On November 19, 2026, the House Foreign Affairs Committee, under its chairman, Rep. Brian Mast, a Florida Republican, used the Export Control Reform Act to publish license information on Nvidia and AMD AI chips for China [hfac-release-2026-11-19: "This afternoon, Chairman Brian Mast exercised his authorities under the Export Control Reform Act to publicly reveal export control license application information regarding NVIDIA and AMD's AI chip licenses for the People's Republic of China."]. The committee approved the disclosure by unanimous consent at a business meeting [meeks-remarks-2026-11-19: "the Committee approved by unanimous consent the disclosure of license information"]. It released two documents: a two-page committee summary and a four-page table from the Commerce Department's Bureau of Industry and Security (BIS), the agency that licenses exports, titled "H200 License and Equivalent Application Status as of May 11, 2026" [hfac-summary-2026-11-19: "Pursuant to 50 U.S.C. 4820(h)(2)(b)(ii), the House Foreign Affairs Committee determines that"] [bis-license-table-2026-05-11: "H200 License and Equivalent Application Status as of May 11, 2026"].

The summary says that as of May 11, 2026, BIS had applications to sell 3,444,160 covered chips, Nvidia's H200 and AMD's MI325X, to Chinese companies, and had approved 879,868 across 21 applications [hfac-summary-2026-11-19: "May 11, 2026, as of that date, BIS received applications to sell 3,444,160 covered"] [hfac-summary-2026-11-19: "Covered integrated circuits are the following products: NVIDIA’s H200 and AMD’s MI325X."]. Every approved row in the table reads "Approved, not shipped" [bis-license-table-2026-05-11: "3/10/2026 | Nvidia | Baidu | 43,000 | Approved, not shipped | China"].

## The people it happens to

The buyers. Approved: Alibaba Group 75,000 (Nvidia); ByteDance 150,000 (75,000 Nvidia to Beijing Bytedance, 75,000 AMD to its subsidiary Beijing Zitiao); Tencent 150,000 (75,000 Nvidia, 75,000 AMD to its subsidiary Oriental Power); VNET, Linkwise Digital Tech, Kuaishou (AMD) and Beijing DiDi (AMD) 75,000 each; Shanghai Mihoyo 57,810; Baidu 43,000; JD 41,300; Didi Infinity 24,780; Ubiquant 8,660; Li Auto 8,260; Great Wall Motor 4,800; Shanghai Yovole 4,250; Tesla (Shanghai), BYD and Shanghai Jiatang 4,000 each; Nvidia itself 8 [bis-license-table-2026-05-11: "12/22/2025 | AMD | Oriental Power Holdings Limited, a wholly owned subsidiary of Tencent Holdings Limited | 75,000 | Approved, not shipped | China"] [bis-license-table-2026-05-11: "3/16/2026 | Nvidia | BYD | 4,000 | Approved, not shipped | China"]. AMD's four approvals total 300,000; Nvidia's seventeen total 579,868 (computed from the table).

Returned without action: 1,888,950 chips over nine rows, including Alibaba Group 610,000 (China), Bytedance System Malaysia 508,000, PT Byteplus Indonesia 203,000, Alibaba Cloud Malaysia 203,000 and 50,500, TikTok Thailand 154,000 [bis-license-table-2026-05-11: "12/19/2025 | Nvidia | TikTok (System) Thailand Ltd. | 154,000 | RWA | Thailand"]. Rejected: one, AMD to UCloud, 75,000 [bis-license-table-2026-05-11: "3/9/2026 | AMD | UCloud | 75,000 | Rejected | China"]. Still submitted: 23 rows, 600,342 chips, among them Meituan, High-Flyer and New Century Lettall [bis-license-table-2026-05-11: "4/6/2026 | Nvidia | New Century Lettall Data Service Co., Ltd. | 40,800 | Submitted | China"].

Alibaba asked for 948,950 chips for itself and its subsidiaries and got 75,000 [hfac-summary-2026-11-19: "948,950 covered integrated circuits for Alibaba and its"] [hfac-summary-2026-11-19: "This includes 75,000 for Alibaba, 150,000 for Tencent and its subsidiaries, 43,000 for Baidu,"]. The committee holds applications not in the May 11 summary, including Nvidia's December 19, 2025, application to export 445,000 H200s to Tencent [hfac-summary-2026-11-19: "For example, NVIDIA applied on December 19, 2025, to"].

The installers. All but two Nvidia applications list Maginfra, Beijing New Matrix, ZTE Kangxun and Lenovo as entities that "may install the systems in the datacenter" [hfac-summary-2026-11-19: "Kangxun Telecom Co., Ltd., and Lenovo or its subsidiaries as entities that “may install"]. The New York Times found Maginfra's and New Matrix's listed offices empty and tied New Matrix's owners to a blacklisted fund [nyt-installers-2026-11-07: "New Matrix is the second Chinese company approved to handle Nvidia’s H200 chips that does not seem to have any physical presence at its listed address."]. Mast called them "fake companies" [cnbc-licenses-2026-11-19: "Both are fake companies."].

The chipmakers. Nvidia and AMD; every application they filed rated the transfer's diversion risk "low" [hfac-summary-2026-11-19: "“low” risk of diversion."].

## How it came to this

| Date | What happened | Source |
|---|---|---|
| Jan 7, 2025 | Pentagon lists Tencent as a Chinese military company | [dod-1260h-2025-01-07: "Tencent Holdings Limited"] |
| Dec 8, 2025 | Trump announces H200 sales to approved customers in China | [bis-h200-release-2026-01-13: "Today’s rule follows President Trump’s December 8, 2025 announcement that the United States will allow the H200 and similar products to be shipped to approved customers in China"] |
| Dec 9 to Dec 30, 2025 | Nvidia and AMD file the first applications in the table | [bis-license-table-2026-05-11: "12/9/2025 | Nvidia | Beijing Bytedance Technology Co. Ltd. | 75,000 | Approved, not shipped | China"] |
| Dec 22, 2025 | Meeks and Warren demand the license information under the Export Control Reform Act | [meeks-warren-2025-12-22: "The lawmakers made the request pursuant to the Export Control Reform Act of 2018 (ECRA)."] |
| Jan 15, 2026 | BIS rule moves H200-class exports to China from presumption of denial to case-by-case, with conditions | [fr-h200-rule-2026-01-15: "The effective date of this rule is January 15, 2026."] |
| February 2026 | U.S. grants Nvidia and AMD their first licenses; a 1260H update naming Alibaba, Baidu and BYD is published and pulled | [nvidia-10q-2026-08-26: "Beginning in February 2026, the USG granted licenses that would allow us to ship small amounts of H200 products to specific China-based customers"] [amd-10q-2026-08-05: "In February 2026, the U.S. government granted us some export licenses authorizing us to ship our AMD Instinct MI325 products to certain China-based customers."] [techcrunch-1260h-2026-06-08: "briefly published in February"] |
| May 11, 2026 | BIS status table: 879,868 approved, none shipped | [bis-license-table-2026-05-11: "H200 License and Equivalent Application Status as of May 11, 2026"] |
| June 8, 2026 | Pentagon adds Alibaba, Baidu and BYD to the 1260H list | [techcrunch-1260h-2026-06-08: "The Pentagon has added Alibaba, Baidu, EV-maker BYD, and buzzy robotics company Unitree to a list of entities it says support the Chinese military."] |
| July 14, 2026 | Kessler tells the committee H200 shipments have begun, "very few" | [reuters-kessler-2026-07-14: "There have been minimal exports"] |
| Aug 26, 2026 | Nvidia 10-Q: a fraction of allowed shipments, under 1 percent of data center revenue | [nvidia-10q-2026-08-26: "Those shipments account for less than 1% of Data Center revenue in our most recent quarter."] |
| Nov 12, 2026 | Jensen Huang resigns as Nvidia's chief executive | [nvidia-call-q3-2026-11-17: "Jensen Huang voluntarily resigned his positions as President, CEO, and Board Member"] |
| Nov 16, 2026 | Mast: "Americans deserve to know how this happened"; Commerce issues the remote-access rule | [mast-x-2026-11-16: "Americans deserve to know how this happened and we will be getting answers."] |
| Nov 17, 2026 | Nvidia: $2.4 billion Hopper shipments to China last quarter; no longer shipping licensed Hopper to China | [nvidia-cfo-q3-2026-11-17: "Shipments of Data Center Hopper products to China during the quarter were $2.4 billion."] |
| Nov 19, 2026 | Committee releases the table | [hfac-release-2026-11-19: "This is the most detailed public disclosure in the history of the Export Control Reform Act."] |

## Why: the stated reasons

- The committee: withholding the information "is contrary to the national interest" [hfac-summary-2026-11-19: "the withholding of the following information is contrary to the national interest"].
- Mast, November 16: "Our most advanced chips should never end up in the hands of China. Americans deserve to know how this happened" [mast-x-2026-11-16: "Our most advanced chips should never end up in the hands of China."].
- Meeks: "The public has the right to know how these decisions were made" [meeks-remarks-2026-11-19: "The public has the right to know how these decisions were made"].
- BIS, January: the case-by-case policy is "necessary to ensure the national security benefits of U.S. leadership in artificial intelligence (AI)" [fr-h200-rule-2026-01-15: "BIS finds this action necessary to ensure the national security benefits of U.S. leadership in artificial intelligence (AI)."].
- Commerce, November 19: its H200 approach rests on the January rule's added national-security requirements [reuters-licenses-2026-11-19: "which imposes significant additional national security-related requirements on license applicants"].

## The sides

The committee (Mast and Meeks): BIS approved chips for companies the Pentagon designates as military companies, and Nvidia's applications named possible smuggling fronts as installers; Meeks says BIS "seemed to approve licenses for advanced chips to China with little scrutiny" even as other reviews were delayed [meeks-remarks-2026-11-19: "the agency seemed to approve licenses for advanced chips to China with little scrutiny"].

Commerce: the approvals followed the January rule's conditions and multi-agency deliberation, and the disclosure shows its transparency with Congress [businesstimes-nyt-2026-11-20: "A spokesperson for the Commerce Department said the disclosure was evidence of the department’s transparency with Congress about licensing activity."].

Nvidia: approvals came with "strict conditions and limited volumes," shipments were legal, and it has stopped shipping H200s to China [hill-licenses-2026-11-19: "the review and licensing process spanned more than half a year, with approvals subject to strict conditions and limited volumes."]. AMD: it complies with export law [hill-licenses-2026-11-19: "AMD complies with applicable U.S. export control laws and regulations"].

Agreed by all: the figures. No side disputes the 3.4 million requested or the 879,868 approved.

## The numbers

| Figure | What it counts | As of | Source |
|---|---|---|---|
| 3,444,160 | H200 and MI325X chips in applications to sell to PRC companies | May 11, 2026 | [hfac-summary-2026-11-19: "3,444,160 covered"] |
| 879,868 | chips approved, 21 applications, all "not shipped" | May 11, 2026 | [hfac-summary-2026-11-19: "of 879,868 covered integrated"] |
| 1,888,950 | chips in 9 applications returned without action | May 11, 2026 | computed from the table |
| 1,118,500 | of those, for ByteDance and Alibaba entities in Malaysia, Indonesia, Thailand | May 11, 2026 | computed from the table |
| 600,342 | chips in 23 applications still submitted | May 11, 2026 | computed from the table |
| 75,000 | one application rejected (UCloud) | May 11, 2026 | [bis-license-table-2026-05-11: "3/9/2026 | AMD | UCloud | 75,000 | Rejected | China"] |
| 272,000 | approved for Alibaba, Tencent, Baidu, BYD; 30.9% of approvals | May 11, 2026 | computed from the summary |
| $2.4 billion | Nvidia Hopper data center shipments to China | quarter ended Oct 25, 2026 | [nvidia-cfo-q3-2026-11-17: "$2.4 billion"] |

## What coverage says that the records do not

- Reuters, November 19: "The Trump administration approved shipments of nearly 900,000 advanced AI chips" and "The approvals for 879,000 chip shipments" [reuters-licenses-2026-11-19: "The approvals for 879,000 chip shipments by the Commerce Department included 75,000 for Alibaba, 150,000 for Tencent, 43,000 for Baidu, and 4,000 for BYD, all on the Pentagon's list of alleged Chinese military-backed companies, the committee noted."]. The table approves licenses and marks every one "Approved, not shipped" as of May 11 [bis-license-table-2026-05-11: "12/9/2025 | Nvidia | Beijing Bytedance Technology Co. Ltd. | 75,000 | Approved, not shipped | China"]. The same story says it "was not immediately clear how many of the approvals resulted in actual China-bound shipments", so Reuters' "approved shipments" means licenses that would allow shipments; it is not graded as an error (review r1, finding 2). The table answers its open question as of May 11: none. "All on the Pentagon's list" is true now; three were added June 8.
- McGuire, quoted by Reuters: "over 30% of the AI chips sent to China were shipped to companies that the Department of War has designated as Chinese military companies" [reuters-licenses-2026-11-19: "The fact that over 30% of the AI chips sent to China were shipped to companies that the Department of War has designated as Chinese military companies is astonishing"]. The 30.9 percent is a share of approvals (272,000 of 879,868), none shipped by May 11; three of the four were designated on June 8.
- The Hill: "approved the shipment of nearly 900,000 AI chips to Defense Department-designated Chinese military companies" and "The order was fulfilled ... including sending 75,000 to Alibaba" [hill-licenses-2026-11-19: "The Trump administration approved the shipment of nearly 900,000 AI chips to Defense Department-designated Chinese military companies, according to newly released documents from the House Foreign Affairs Committee."] [hill-licenses-2026-11-19: "including sending 75,000 to Alibaba, 150,000 to Tencent and its subsidiaries, 43,000 to Baidu and 4,000 to BYD."]. Of the 879,868, 272,000 were approved for the four designated companies; nothing was sent as of May 11.
- The Straits Times' summary: "approved 879,000 advanced AI chip shipments to China" [straitstimes-licenses-2026-11-19: "The Trump administration approved 879,000 advanced AI chip shipments to China from December 2025 to May 2026, the House Foreign Affairs Committee said."]. Same error.
- The Business Times, republishing The New York Times, subheadline: "The Commerce Department approved applications to sell more than 3.4 million chips" [businesstimes-nyt-2026-11-20: "The Commerce Department approved applications to sell more than 3.4 million chips to the firms, lawmakers say"]. 3.4 million is what was requested; 879,868 was approved. The article body has it right.
- The time span "from December 2025 through May 2026" (Reuters) counts application dates from December 9, 2025, to April 16, 2026, and a status as of May 11; the table gives no approval dates [bis-license-table-2026-05-11: "Columns: Date submitted | Exporter"].
- CNBC's "approved the sale of more than 879,000 AI chips" and Al Jazeera's "approved exports" describe approvals, and are accurate.

## What is next

- December 1: Huang's closed-door transcribed interview with the committee and two others; December 2: Nvidia general counsel Tim Teter [cnbc-licenses-2026-11-19: "Huang is due for a closed-door transcribed interview with the House Foreign Affairs panel and two other committees on Dec. 1."].
- December 1: answers due to Meeks and Kamlager-Dove's November 19 letter asking whether Nvidia influenced Commerce's Megaspeed investigation [reuters-meeks-probe-2026-11-20: "whether the department allowed a major American corporation that is financially and personally linked to the Trump administration to interfere with enforcement activity"].
- Since November 19, shipping these chips to Malaysia, Indonesia or Thailand needs a license under Commerce's November 16 rule (see the November 16 story; held as background, linked, not tied to the returns) (review r1, finding 4).
- Senate Banking: Huang and Lutnick agreed to testify [cnbc-licenses-2026-11-19: "Huang and Commerce Secretary Howard Lutnick had also agreed to testify"].
- Meeks wants public hearings with Lutnick and Kessler; the Times reports the committee plans them next month [meeks-remarks-2026-11-19: "That must include public hearings with Commerce Secretary Howard Lutnick and BIS Undersecretary Jeffrey Kessler."] [businesstimes-nyt-2026-11-20: "The committee plans to hold hearings next month with Commerce Secretary Howard Lutnick and his deputy Jeff Kessler"].
- Nvidia's fourth-quarter forecast assumes no data center revenue from China [nvidia-cfo-q3-2026-11-17: "We are not assuming any Data Center compute revenue from China in our outlook."].
- 23 applications for 600,342 chips were still pending on May 11; their fate since is not public.
What it will not settle: how many approved chips shipped, unless BIS or the companies publish counts.

## Reactions

- Meeks (D-N.Y., ranking member), November 19 [meeks-remarks-2026-11-19: "The public has the right to know how these decisions were made"].
- Mast, November 19, on Maginfra and New Matrix [cnbc-licenses-2026-11-19: "Both are fake companies."].
- Chris McGuire, former U.S. official, via Reuters [reuters-licenses-2026-11-19: "calls into question whether Commerce conducted any serious national security review before approving these licenses"].
- Commerce [businesstimes-nyt-2026-11-20: "A spokesperson for the Commerce Department said the disclosure was evidence of the department’s transparency with Congress about licensing activity."].
- Nvidia [hill-licenses-2026-11-19: "the review and licensing process spanned more than half a year, with approvals subject to strict conditions and limited volumes."]; Nvidia's spokesperson John Rizzo, on the Megaspeed-linked applicant: Nvidia "did not and will not" ship it an H200 [businesstimes-nyt-2026-11-20: "Nvidia “did not and will not” ship an H200 to the company linked to Megaspeed, or any other company, he said."].
- AMD [hill-licenses-2026-11-19: "AMD complies with applicable U.S. export control laws and regulations"].
- Alibaba sued the Pentagon over its designation in June [cbs-alibaba-suit-2026-06-24: "Chinese tech giant Alibaba has filed a federal lawsuit against the Defense Department for designating it a military-linked firm."]; a judge in October blocked a related contracting restriction without removing Alibaba from the list [lead: https://www.reuters.com/legal/litigation/alibaba-wins-injunction-against-pentagon-contract-restrictions-tied-china-2026-10-27 , reuters.com refuses capture; background].
- Alibaba, June 2026, on its designation [techcrunch-1260h-2026-06-08: "Alibaba told TechCrunch that it “is not a Chinese military company nor part of any military-civil fusion strategy."]. Alibaba, Tencent, Baidu and BYD did not respond to Reuters on November 19.

## Unknowns

- How many of the 879,868 approved chips shipped. Searched: Nvidia's 10-Q and CFO commentary (dollars and shares of revenue, no chip counts), Kessler's July testimony as reported ("very few", "trivial"), AMD's August and November 10-Qs (licenses, no shipments reported). Reuters reports "about 10,000 H200 chips" each for several internet companies, from unnamed people; held as background.
- Which licenses the post-May Nvidia shipments ran under, and to whom. Not in any admitted record.
- Approval dates. The table gives application dates and a May 11 status only.
- Why any application was returned. The table gives no reasons; BIS's notices to applicants are not public.
- What became of the 23 pending applications, and of Nvidia's 445,000-chip Tencent application the summary says was not fully reflected.
- Whether Maginfra or New Matrix handled any chips that shipped.

## Leads not admitted

- https://www.reuters.com/world/license-information-ai-chips-sent-china-released-by-us-house-committee-2026-11-19 and https://www.reuters.com/world/china/us-official-says-shipments-h200-chips-china-have-begun-2026-07-14: reuters.com refused capture (401), also via archive; admitted through syndicated copies (AOL, WMBD, Yahoo).
- https://www.reuters.com/world/asia-pacific/pentagon-lists-entities-designated-chinese-military-company-2026-06-08 and https://gulfbusiness.com/en/2026/news/nvidia-stops-shipping-us-approved-ai-chips-to-china: refused capture; duplicates of admitted records.
- https://www.bloomberg.com/news/articles/2026-11-18/interim-nvidia-ceo-says-it-s-no-longer-sending-ai-chips-to-china: captured as a paywall stub; Kress's words are admitted from the call transcript.
- https://thenextweb.com/news/nvidia-h200-china-exports-commerce-kessler-the-information: The Information, unverified by TNW, says Kessler told staff to approve exports over other agencies' objections; anonymous, not this story's question.
- https://x.com/shanaka86/status/2123677543270171072 and https://x.com/MyDaebakCafe/status/2123684068520804857: readers' posts making the "not shipped" and 1260H-timing points; the records themselves are admitted.
- https://www.youtube.com/watch?v=odTSnyZ3H9Q: auto-transcript of the business meeting; Mast's words are admitted from CNBC.
- https://www.nextgov.com/people/2026/11/moolenaar-suggests-nvidia-linked-businesswoman-was-chinese-intelligence-asset/417333/: Moolenaar on Alice Huang, not the license table.
- https://oag.ca.gov/news/press-releases/attorney-general-bonta-serves-investigative-subpoena-nvidia: California's subpoena of Nvidia the same day; separate matter.
- https://www.theinformation.com/articles/u-s-commerce-department-rushed-clear-nvidia-h200-exports-china: anonymous report that Kessler pushed approvals over other agencies' objections; paywalled.
- https://democrats-judiciary.house.gov/sites/evo-subsites/democrats-judiciary.house.gov/files/evo-media-document/2026-11-17-raskin-meeks-kamlager-dove-to-lutnick-cantor-fitzgerald-re-nvidia.pdf: the Cantor Fitzgerald letter; not this story's question.
- https://www.cnbc.com/2026/11/19/amd-falls-on-short-seller-report-of-alleged-china-exposure.html: Hunterbrook's AMD report; separate matter.
- https://selectcommitteeontheccp.house.gov/sites/evo-subsites/selectcommitteeontheccp.house.gov/files/evo-media-document/letter-to-doc-h200-rule-hbm-1.14.26.pdf: select committee letter on the January rule; background, not needed.
- https://www.nytimes.com/2026/09/06/technology/ai-chips-china-blacklist.html: the committee's second footnote; the November 7 Times story covers the installers.

## Review r1: how each finding was judged

1. The table is not a full census (the 445,000-chip Tencent request): verified in the summary; wording changed from "every application" to the applications in BIS's May 11 summary. No change to the five sentences.
2. Reuters hedged: verified; Reuters' "approved shipments" is no longer graded an error; the Catch rests on The Hill, McGuire's quote and the Straits Times summary. Sentence 4 rewritten.
3. RWA reasons: verified in EAR 772 and admitted; answer D added to question 3; the Alibaba China row no longer rules anything out.
4. The November 16 rule's Southeast Asia license requirement: verified in the November 16 story's record; held as background with a link, not tied to the returns. Alibaba's chief executive's warning (The Information): paywalled, lead.
5. The Information on Kessler: anonymous, paywalled; noted in the matrix as an untested allegation; lead.
6. 600,000 H200s in Hong Kong: verified at a syndicated Reuters copy and admitted; added as a row and as a clause in the shipments section; not counted as shipments.
7. Commerce and Justice's Megaspeed account: verified in the November 16 story's record; background, not this story's question.
8. The Cantor Fitzgerald letter: verified at the Judiciary Democrats' page; not this story's question; lead.
9. The November 19 Meeks and Kamlager-Dove letter: verified at a syndicated Reuters copy and admitted; added to What is next.
10. Alibaba's lawsuit: verified and admitted (CBS); added to Reactions; the October injunction held as a lead.
11. Huang's resignation: sentence 3 now says he resigned amid news of the affair, not because of it.
12. Policy lineage: the January rule moved these chips from a presumption of denial; the page states that in one clause; the 2022 and 2023 rules are covered in the November 16 story.
