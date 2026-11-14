# The FAA's nationwide ground stop of November 13, 2026: the record

Every fact line ends with its source: the record id and the record's words in square brackets (straight quotes, or curly quotes when the words hold straight ones; `admit.py check` verifies each one), or `[lead: URL]` for something found but not admitted, with the reason. A fact with neither is not in the record.

Written the evening of November 13, 2026, while the stop was still in force. Times are Eastern unless marked Z (UTC; Eastern is Z minus five hours).

## The explanations

Question 1: what failed?

- A. A cyberattack (the fear Mullin was asked about and would not rule out). If true: CISA or FBI findings of intrusion, failures that do not trace to an internal change. Should not find: an internal update that explains the timing; investigators saying no attack.
- B. A physical cut or sabotage of the lines (the September 2026 Newark and Philadelphia outage began with a cut fiber). If true: one region first and only that region, a named cut site, repair crews. Should not find: every center hit within the hour; a software trigger.
- C. A carrier failure. C1: Verizon, which provides core network functions to the FAA. C2: one of the other local carriers FTI leases from, as in Dallas in 2025, when the FAA blamed a local carrier's failures and L3Harris's oversight of the backups. If true: carrier outage reports, other customers down. Should not find: the carrier saying its network works; failures at centers served by different carriers all within the hour.
- D. A fault in the FAA's own network: an update to the private network L3Harris runs for the FAA made it reboot and crash (CBS's sources); routers, starting in Chicago and cascading (CNN's airline source); a software update (MS NOW's federal official; the FBI's line of inquiry per Bloomberg). If true: near-simultaneous failure across facilities, restoration center by center, no intrusion. Should not find: a network unchanged that day; failures limited to circuits outside that network.
- E. SMART, the AI planning tool the FAA expanded to all 22 centers on November 10. If true: a fault in planning or flow tools, a link between SMART and the network that carries radio and radar. Should not find: SMART limited to sending recommendations; radio and radar down.
- F. The Microsoft 365 outage that began November 12. If true: FAA dependence on the failed Microsoft services. Should not find: officials and Microsoft saying the two are separate.
- G. Staffing and cuts (Rep. Ramirez's question). If true: staffing named as the impacting condition across centers. Should not find: an equipment or communications cause on every advisory.

Two camps the orchestrator asked about were searched for and not found published: blame on the previous administration's equipment (Duffy has said nothing on cause beyond his first post), and a named foreign actor as a claim (the "Iranians" line is callers asking a consultant, not anyone asserting it) [usatoday-live-2026-11-13: "I've had four or five people text me, ‘This is the Iranians, right?’"]. They are left off the matrix.

| Evidence | A attack | B cut | C carrier | D FAA network | E SMART | F Microsoft | G staffing |
|---|---|---|---|---|---|---|---|
| The command center's own words: every en-route center on extended flight-plan times "due to nationwide comms failure" [atcscc-advzy-117-2026-11-13: "NATIONWIDE COMMS FAILURE."]; Duffy: "all" centers [duffy-x-ground-stop-2026-11-13: "following a communication issue impacting all Air Route Traffic Control Centers"] | C | I: a cut takes out the circuits on its path; the September cut hit one facility's lines [thehill-sept-outage-2026-09-24: "a New Jersey Transit contractor on Monday accidentally cut the backup fiber line"] | C | C | | | I: the reason on every national advisory is communications or equipment, and the operations plan lists staffing triggers at four facilities only [atcscc-advzy-120-2026-11-13: "REASON: COMMUNICATIONS FAILURE"] [atcscc-advzy-119-2026-11-13: "UNTIL 0200	-ZNY AREA A"] |
| Verizon: network "fully functioning", no known issue with air traffic control systems [verizon-via-deitaone-x-2026-11-13: "WE ARE NOT AWARE OF ANY ISSUE RELATED TO AIR TRAFFIC CONTROL SYSTEMS"] | | | I, for Verizon (C1) only | | | | |
| FTI leases from several local carriers [l3harris-fti-page-2026-11-13: "The FTI network leverages multiple local exchange carriers for robust and dependable connections."]; in Dallas in 2025 the FAA blamed a local carrier and failed backups [faa-general-statements-dallas-2025-09-20: "Oversight by L3Harris, an FAA contractor, failed to ensure that redundancies in the system functioned properly."] | | | C2 possible in kind; one local carrier would not reach every center | | | | |
| CBS: an update to the private network L3Harris runs made it reboot and crash [cbs-ground-stop-2026-11-13: "caused the system to reboot, leading to a crash and a communications outage"] | | | | C | | | |
| MS NOW: "A software update caused" it, per a federal official [msnow-software-update-2026-11-13: "a federal official with direct knowledge of the investigation told MS NOW"] | | | | C | | | |
| FBI, per a person familiar: not a cyberattack or criminality; inquiry into a software update [bloomberg-fbi-software-2026-11-13: "doesn’t believe the communication issue affecting air traffic control was due to a cyberattack or criminality"] | I (a source's account of the FBI's view) | I, for sabotage | | C | | | |
| CNN's senior security source: "a communication software issue rather than an intentional act" [cnn-live-2026-11-13: "Authorities continue to believe the issue was caused by a communication software issue rather than an intentional act, the source said"] | I (same kind) | I, for sabotage | | C | | | |
| SMART only sends recommendations that FAA staff review; it cannot take over control of an aircraft [faa-smart-launch-2026-09-21: "SMART cannot be used to replace the critical role air traffic controllers play or take over control of an aircraft."] [ap-flights-halted-2026-11-13: "just sends recommendations to the air traffic control centers"]; the failure took out radios and radar [cnbc-ground-stop-2026-11-13: "The issues were related to communications and radar problems, according to an internal message from Alaska Airlines"] [ain-ground-stop-2026-11-13: "frequency and radar outages at several air route traffic control centers (ARTCC)"] | | | | | Symptoms do not fit its function (it carries no radio or radar); no record rules out a fault through its data connections | | |
| Microsoft: no indication the stop is related [nbc-live-2026-11-13: "Microsoft has no indication that the FAA nationwide ground stop is related to the recent service disruption"]; Mullin: "separate issues" [geekwire-mullin-2026-11-13: "I don’t see any reason to connect those two at all. Those are separate issues."] | | | | | | I | |

Survives: D, with no I against it. The accounts are not one confirmation; each stands at its own weight. CBS's sources describe the most: an update to the network, then a reboot and a crash. MS NOW's official says a software update caused it, without saying what was updated. Bloomberg's source says the FBI is looking at a software update, an inquiry, not a finding. CNN's airline source says routers, starting at Midway, and names no update. None says who made the change, what equipment it touched, or whether the reboot started the failure or followed it. No one has confirmed any of it on the record: not the FAA, not DOT, not L3Harris.

Ruled out as stated: B (a cut is local; this hit every center within the hour), C1 (Verizon's own statement), F (Microsoft and Mullin), G as the trigger (the FAA's advisories give communications and equipment, not staffing, as the reason).

Can't be tested yet: C2, a failure at another carrier or in the backups. One local carrier would not reach every center, so it fits poorly, but no record excludes it; the FAA's own finding would. E: the symptoms do not fit what SMART does, its maker denies any role "or our integration with FAA and ATC" [asi-x-smart-2026-11-13: "any product of ASI or our integration with FAA and ATC"], and DHS says it is examining it [geekwire-mullin-2026-11-13: "Asked about a possible link between the outage and the new system, Mullin said, “We’re looking at that,”"]; no record rules out a fault through its data connections.

Unproven, leaning out: A. No record shows an attack, and every official and sourced account says none is seen, but Mullin says nothing is ruled out [geekwire-mullin-2026-11-13: "Mullin also declined to rule out a cyberattack, saying, “We’re not ruling out anything at this point.”"]. It closes only when the FAA or FBI says on the record what the update was and who made it.

The result turns on the three unnamed accounts of an update. It would change if the FAA's own finding names something else: a cut, a carrier, an intrusion. The deciding rows were rechecked in the records themselves, not in reports of them: the advisories (117, 119, 120) and Verizon's words.

Question 2: why could one outage stop all 22 en-route centers?

- A. One national network, run by one contractor, carries every center's voice and radar. Its lines are redundant (several carriers, backup paths), but a fault in how the network itself is run, or a change made across it, reaches every center at once (the inspector general's description of FTI; Bedford's of the network FENS replaces). No record shows a single router or path all 22 depend on; A claims only a shared network and a shared operator.
- B. The centers themselves are old (Senate Commerce Republicans: "It appears to be related to FAA's ARTCCs"; no new center "since LBJ").
- C. Not every center lost everything; the stop was a precaution (the FAA's "abundance of caution"; Mullin's two areas).

| Evidence | A one network | B old centers | C precaution |
|---|---|---|---|
| FTI replaced the FAA's separate networks "with a single network" carrying voice and radar to over 4,400 sites [oig-fti-2006-04-27: "telecommunications networks with a single network"] [oig-fti-2006-04-27: "telecommunication services (e.g., voice and radar) for air traffic control"] | C | | |
| Bedford, September 15: FENS replaces "an aging and extremely limited 1980’s network architecture that presently connects airports, weather systems, radar, voice communications, and aircraft" [bedford-testimony-2026-09-15: "It replaces an aging and extremely limited 1980’s network architecture that presently connects airports, weather systems, radar, voice communications, and aircraft."] | C | | |
| Every center hit within the hour: O'Hare stopped at 2010Z for "COMMS ISSUES", Midway at 2017Z, the nation at 2053Z [atcscc-advzy-107-2026-11-13: "COMMENTS: COMMS ISSUES"] [atcscc-advzy-109-2026-11-13: "GROUND STOP PERIOD: 13/2017Z - 13/2130Z"] [atcscc-advzy-111-2026-11-13: "EVENT TIME: 13/2053 - 14/0400"] | C | I: twenty-two buildings of different ages do not fail together within the hour unless something they share fails | |
| Every account of the trigger names the network, none a center building: CBS (the private network), CNN's airline source (network routers), MS NOW (a software update) [cnn-live-2026-11-13: "the result of a problem with network routers, according to an airline source"] | C | I | |
| 2014: one fire at Chicago Center's FTI equipment disrupted traffic for more than two weeks [oig-disruptions-2017-01-11: "an FAA contract employee deliberately started a"] | C | | |
| September 2026: L3Harris had the FAA switch Philadelphia to its backup lines, the backup was cut, and Bedford said "we just don’t have the redundancy" [thehill-sept-outage-2026-09-24: "When it fails, we just don’t have the redundancy that we would get if we had a modern architecture,"] | C | | |
| L3Harris: FTI uses several carriers for redundancy and is rebuilt in maintenance windows with parallel systems [l3harris-fti-page-2026-11-13: "This multi-carrier approach ensures redundancy and reliability across the system."]; as of May it was halfway through rebuilding the backbone to every center, 150 to 200 paths a month, with "software-defined networking" [l3harris-modernization-2026-05: "completing 50% of a nationwide effort to rebuild the invisible backbone connecting every tower, radar facility and air traffic control center across the United States"] [l3harris-modernization-2026-05: "L3Harris is deploying 150-200 new network paths each month"] | C, for a shared operator and shared changes; against a single physical path | | |
| GAO, September: the rebuild's 11,389 projects run on unintegrated schedules, installing at the same sites repeatedly without addressing conflicts [gao-26-107992: "individual projects are scheduled to conduct different installations at the same installation sites repeatedly, generally without addressing potential conflicts"] | context: the record does not tie Friday's update to the rebuild | | |
| Mullin: two areas could still communicate [npr-ground-stop-2026-11-13: "there's two areas inside the United States that are still able to communicate just fine."]; FAA: "abundance of caution" [faa-x-telecom-outage-2026-11-13: "out of an abundance of caution all flights have been halted"] | C | | C |

Survives: A, with C as a qualifier on scope (not every area lost everything). Ruled out as the explanation of Friday: B; the centers are old, but no account of Friday's failure names a center building or a center's own equipment. The result rests on the unnamed accounts of the trigger plus the FAA's own "nationwide comms failure"; it would change if the FAA's finding named a fault inside the centers. Context, not a finding: the network was halfway through a rebuild done while it ran, and GAO had warned that the rebuild's installations were not coordinated; no record says Friday's update was part of it.

## The story

On Friday afternoon, November 13, the FAA stopped every departing flight in the country after what it called a temporary telecommunications outage hit the centers that guide planes between airports.
More than 4,000 flights were in the air when it began, and by 7:15 p.m. more than 4,000 had been cancelled.
Every center talks over one network that contractor L3Harris runs, and unnamed sources say an update to it crashed it; the FAA has not said what failed.
Officials see no sign of an attack, and Senate Commerce Republicans say the outage points to the aging centers themselves, but every account of the failure so far points at the network that links them.
The FAA says it will release flights in tiers as centers recover, and the FAA, the FBI and the Senate Commerce Committee are looking into the cause.

## The plan

Headline: Why one outage stopped every flight in the country

What happened (sentences 1 and 2; the event, who it hit, where it stands):
1. What happened? At 3:53 p.m. the FAA's command center ground-stopped every airport "until further notice". [atcscc-advzy-111-2026-11-13: "ALL AIRPORTS ARE GROUND STOPPED"]
2. Why? The FAA: "a temporary telecommunications outage"; Duffy: a communication issue at all the en-route centers, the 22 facilities that handle planes above 18,000 feet. [faa-x-telecom-outage-2026-11-13: "There has been a temporary telecommunications outage"] [abc-nefarious-2026-11-13: "Air Route Traffic Control Centers are responsible for all flights above 18,000 feet."]
3. All of them? Duffy said all; the FAA's statement said multiple; Mullin said two areas could still communicate. [nbcchicago-faa-statement-2026-11-13: "communication issues impacting multiple Air Route Traffic Control Centers"] [npr-ground-stop-2026-11-13: "there's two areas inside the United States that are still able to communicate just fine."]
4. Who was hit? 4,042 flights in the air at the order; at least 600 diverted by 5:50 p.m., most back to where they took off; more than 4,000 cancellations and 10,000 delays by 7:15 p.m.; 11,000 flights with 1.5 million passengers had been scheduled after 4 p.m.; Europe and Mexico held U.S.-bound departures. [flightradar24-x-2026-11-13: "At the time, 4,042 flights destined for US airports were already airborne."] [ap-grounded-2026-11-13: "496 flights were diverted to the airport from where they originally took off, while 104 were sent to a different airport, according to Cirium"] [axios-ground-stop-2026-11-13: "FlightAware reported more than 10,000 domestic delays and 4,000 cancellations"] [ap-grounded-2026-11-13: "Some 11,000 flights carrying more than 1.5 million passengers were scheduled to take off from airports in the U.S. after 4 p.m. Eastern"] [usatoday-live-2026-11-13: "U.S.-bound departures from 42 countries"] [ap-grounded-2026-11-13: "all scheduled flights from Mexican airports headed to the U.S. are grounded for the time being"]
5. Where does it stand? Still in force at 7:37 p.m. "for a large portion of the country", with some coastal facilities releasing international departures and flights let out as centers recover. [atcscc-advzy-001-2026-11-14: "THE NATIONAL GROUND STOP REMAINS IN EFFECT FOR A LARGE PORTION OF"] [atcscc-advzy-001-2026-11-14: "SOME OF THE COASTAL FACILITIES HAVE BEEN ABLE TO RELEASE SOME INTERNATIONAL DEPARTURES."] [atcscc-advzy-120-2026-11-13: "AS ENROUTE FACILITIES RECOVER, FLIGHTS WILL BE ALLOWED TO DEPART"]
6. How rare? The second nationwide stop since 9/11; the last, in January 2023, came when contractors deleted files in the pilot-notice system. [msnow-software-update-2026-11-13: "only the second nationwide ground stop since the Sept. 11, 2001, terrorist attacks"] [faa-notam-statement-2023-01-19: "contract personnel unintentionally deleted files"]

How one outage reached every center (sentence 3): opens on what failed
1. What is reported to have failed? An update to the FAA's private network made it reboot and crash, per CBS's sources; a software update, per MS NOW's official; the FBI is looking at a software update, per Bloomberg. [cbs-ground-stop-2026-11-13: "caused the system to reboot, leading to a crash and a communications outage"] [msnow-software-update-2026-11-13: "A software update caused the rare nationwide ground stop"] [bloomberg-fbi-software-2026-11-13: "One area of inquiry is whether the outage was caused by a software update"]
2. Has anyone confirmed it? No one on the record; L3Harris did not respond to CBS. [cbs-ground-stop-2026-11-13: "The system is operated by L3Harris, which did not immediately respond to CBS News' request for comment."]
3. What is that network? FTI: one network, run by L3Harris, carrying voice and radar to over 4,400 FAA sites, over several carriers with backup paths. [oig-fti-2006-04-27: "telecommunications networks with a single network"] [oig-fti-2006-04-27: "4,400 FAA sites."]
4. Why does one fault reach every center? Because every center talks over it; the FAA's command center called Friday "nationwide comms failure". [atcscc-advzy-117-2026-11-13: "NATIONWIDE COMMS FAILURE."]
5. How did it unfold? O'Hare stopped for communications at 3:10, Midway at 3:17, the country at 3:53. [atcscc-advzy-107-2026-11-13: "COMMENTS: COMMS ISSUES"] [atcscc-advzy-109-2026-11-13: "GROUND STOP PERIOD: 13/2017Z - 13/2130Z"] (timeline figure)
6. Has this happened before? 2014, Chicago Center fire; September 2026, Philadelphia's backup line cut; Bedford: no redundancy. [oig-disruptions-2017-01-11: "As a result of the damage, Chicago Center was unable to control air traffic for more"] [thehill-sept-outage-2026-09-24: "When it fails, we just don’t have the redundancy that we would get if we had a modern architecture,"]
7. Is it being replaced? FENS, awarded to Verizon in 2023, now led by AT&T, due by the end of 2028. [nextgov-att-fens-2026-08-14: "AT&T is taking over as the lead project manager and prime contractor with Verizon moving to a supporting role"]

Was it an attack? (the explanations, reader-facing): opens on what each explanation predicts and what the record shows
1. Attack: no sign, per DHS, the FBI's view as Bloomberg reports it, and CNN's security source; Mullin rules nothing out. [bloomberg-fbi-software-2026-11-13: "doesn’t believe the communication issue affecting air traffic control was due to a cyberattack or criminality"]
2. Cut line: would hit one region; this hit every center.
3. A carrier: Verizon says its network works; FTI also leases from other local carriers, and nothing yet rules one of them out, though one local carrier would not reach every center. [verizon-via-deitaone-x-2026-11-13: "VERIZON’S NETWORK IS FULLY FUNCTIONING"] [l3harris-fti-page-2026-11-13: "The FTI network leverages multiple local exchange carriers"]
4. SMART: the symptoms do not fit what it does (recommendations only; no radio or radar); its maker denies any role; DHS is examining it; can't be tested yet. [faa-smart-launch-2026-09-21: "SMART cannot be used to replace the critical role air traffic controllers play or take over control of an aircraft."]
5. Microsoft: Microsoft and Mullin say separate.
6. Staffing: the FAA's advisories give communications failure as the reason.
7. What would settle it: the FAA's own finding on the update.

The Catch (sentence 4): opens on the Senate Commerce Republicans' post. Wording held until the White House briefing's pinned transcript is read; if officials name the cause on the record, both items are tested against it.
1. What did they say? It "appears to be related to FAA's ARTCCs" and "highlights the need to prioritize modernizing ARTCCs over other projects", citing the $1.9 billion to replace and consolidate the centers. [senate-commerce-x-2026-11-13: "the incident highlights the need to prioritize modernizing ARTCCs over other projects"] [senate-commerce-x-2026-11-13: "successfully got $1.9 billion in Working Families Tax Cut Act to replace and consolidate outdated ARTCCs"]
2. What does the record show? Each account at its own weight: CBS's sources, an update to the network, then a reboot and a crash; MS NOW's official, a software update; CNN's airline source, routers; Bloomberg's source, the FBI looking at an update; the FAA's own advisory, a nationwide communications failure. No account so far says a center's own equipment failed. [cbs-ground-stop-2026-11-13: "An update to the private communications network that connects America's air traffic control system"] [atcscc-advzy-117-2026-11-13: "NATIONWIDE COMMS FAILURE."]
3. Their position on the network: Cruz backed the telecom money too; the test is only of this diagnosis. [senate-commerce-hearing-2025-12: "This funding will ensure the FAA is equipped to invest in the latest telecommunications infrastructure, prevent outages"]
4. Context, one sentence: the network was halfway through a rebuild done while it ran. [l3harris-modernization-2026-05: "completing 50% of a nationwide effort to rebuild the invisible backbone"]
5. Second item: Ray LaHood, former transportation secretary, to CNN's affiliate WEEK: "very old and antiquated" technology "may have contributed", and "I assume something happened" at Potomac TRACON, the approach facility outside Washington. The FAA's first stops were at Chicago, and the outage hit the en-route centers. [cnn-live-2026-11-13: "may have contributed to the nationwide meltdown today, former Secretary of Transportation Ray LaHood told CNN affiliate WEEK"] [cnn-live-2026-11-13: "I assume something happened there."] [atcscc-advzy-107-2026-11-13: "COMMENTS: COMMS ISSUES"]
6. One qualifier: the cause is unconfirmed on the record.

What happens next (sentence 5):
1. Flights released in tiers as limitations ease. [atcscc-advzy-119-2026-11-13: "THE CURRENT STRATEGY WILL BE A TIERED APPROACH"]
2. Investigations: FAA technicians, the FBI's inquiry, Duckworth and Cantwell's committee. [usatoday-live-2026-11-13: "will be something the Commerce Committee will be reviewing"]
3. What to watch: the FAA's own cause statement; whether it names L3Harris and the update.

Background held: the AI tool's history and the October letter asking for a pause; the $30.1 billion request filed hours before the stop [aerotime-ground-stop-2026-11-13: "asked Congress for an additional $30.1 billion"]; the 2001 inspector general warning about mixing air traffic and administrative traffic on one network [oig-fti-2001-08-21: "would share the same network with administrative systems having direct connections to the Internet"]; Peraton as integrator [faa-peraton-2025-12-04: "announced Peraton will be the Prime Integrator"]; FENS's 2023 award [oig-contracts-2024-02-26: "FAA Enterprise Network Services contract in March 2023"]; the copper-to-fiber count [faa-bnatcs-fact-sheet-2025-12-04: "has replaced over one-third of copper with high-speed digital fiber"]; the 1960s Sky Shield groundings [ain-ground-stop-2026-11-13: "as well as during three military exercises under Operation Sky Shield in the early 1960s"]; Arroyo's "old wires" view [nbcchicago-faa-statement-2026-11-13: "whether it’s because the old wires that they have are just run down or for whatever reason"]; how long the 2023 stop ran [nolen-testimony-2023-02-15: "I lifted the ground stop at 9:07 a.m. EST"].

## The event

At 3:53 p.m. (2053Z) on Friday, November 13, 2026, the FAA's Air Traffic Control System Command Center ground-stopped every U.S. airport "due to extraordinary circumstances and for reasons of safety" [atcscc-advzy-111-2026-11-13: "DUE TO EXTRAORDINARY CIRCUMSTANCES AND FOR REASONS OF SAFETY."]. Transportation Secretary Sean Duffy said a communication issue had hit all the en-route centers [duffy-x-ground-stop-2026-11-13: "following a communication issue impacting all Air Route Traffic Control Centers"]. The FAA called it "a temporary telecommunications outage" [faa-x-telecom-outage-2026-11-13: "There has been a temporary telecommunications outage"]. Homeland Security Secretary Markwayne Mullin said there was no indication yet of an attack [mullin-rr47-x-2026-11-13: "There is no indication as of yet that this was a nefarious attack."]. At 5:46 p.m. the command center kept the stop to 11 p.m. with the reason "communications failure" [atcscc-advzy-120-2026-11-13: "REASON: COMMUNICATIONS FAILURE"].

## The people it happens to

Travelers and crews: 4,042 flights bound for U.S. airports were airborne at the order [flightradar24-x-2026-11-13: "At the time, 4,042 flights destined for US airports were already airborne."]; airborne flights were told to expect holding at any airport [atcscc-advzy-116-2026-11-13: "AIRBORNE HOLDING TO ANY AND ALL AIRPORTS WITHIN THE"]; by 6:04 p.m. FlightAware counted 1,913 cancellations and 10,494 delays [abc-live-2026-11-13: "1,913 flights have been cancelled and 10,494 flights have been delayed"]. Controllers lost radios and radar [cnbc-ground-stop-2026-11-13: "The issues were related to communications and radar problems, according to an internal message from Alaska Airlines"].

## How it came to this

| Date | What happened | Source |
|---|---|---|
| 2001-08-21 | Inspector general warns that FTI would put air traffic control on the same network as administrative systems | [oig-fti-2001-08-21: "would share the same network with administrative systems having direct connections to the Internet"] |
| 2006-04-27 | Inspector general: FTI replaces separate networks with a single network carrying voice and radar | [oig-fti-2006-04-27: "telecommunications networks with a single network"] |
| 2014-09-26 | Fire set by a contract employee destroys FTI equipment at Chicago Center; more than two weeks of disruption | [oig-disruptions-2017-01-11: "an FAA contract employee deliberately started a"] |
| 2023-01-11 | Nationwide ground stop after contractors delete files in the pilot-notice database | [faa-notam-statement-2023-01-19: "contract personnel unintentionally deleted files while working to correct synchronization between the live primary database and a backup database"] |
| 2023-03 | FENS awarded, to phase out FTI | [oig-contracts-2024-02-26: "FAA Enterprise Network Services contract in March 2023"] |
| 2025-12-04 | Peraton named integrator of the rebuild; telecommunications "one of the top priorities" | [faa-bnatcs-fact-sheet-2025-12-04: "Telecommunications, however, is one of the top priorities since it connects the NAS together"] |
| 2026-08 | AT&T takes over FENS lead from Verizon | [nextgov-att-fens-2026-08-14: "AT&T is taking over as the lead project manager and prime contractor with Verizon moving to a supporting role"] |
| 2026-09-15 | Bedford: FENS replaces a 1980s network | [bedford-testimony-2026-09-15: "It replaces an aging and extremely limited 1980’s network architecture"] |
| 2026-09-21 | SMART launched in the Washington area | [faa-smart-launch-2026-09-21: "The FAA began using SMART in a limited mode today in the airspace around Washington, D.C."] |
| 2026-09-21/24 | Philadelphia switched to backup lines on L3Harris's advice; backup cut | [thehill-sept-outage-2026-09-24: "The FAA said it was advised on Sunday by L3Harris, a technology contractor, to switch to the backup lines"] |
| 2026-11-10 | FAA expands SMART to all 22 centers | [usatoday-live-2026-11-13: "The FAA said its expansion would cover airspace managed by all 22 regional air traffic control centers."] |
| 2026-11-13 2010Z | O'Hare ground stop, "COMMS ISSUES" | [atcscc-advzy-107-2026-11-13: "COMMENTS: COMMS ISSUES"] |
| 2026-11-13 2017Z | Midway ground stop | [atcscc-advzy-109-2026-11-13: "GROUND STOP PERIOD: 13/2017Z - 13/2130Z"] |
| 2026-11-13 2053Z | National ground stop | [atcscc-advzy-111-2026-11-13: "EVENT TIME: 13/2053 - 14/0400"] |
| 2026-11-13 2121Z | "Nationwide comms failure" | [atcscc-advzy-117-2026-11-13: "NATIONWIDE COMMS FAILURE."] |
| 2026-11-13 2246Z | Stop kept to 0400Z; tiered release | [atcscc-advzy-119-2026-11-13: "THE CURRENT STRATEGY WILL BE A TIERED APPROACH"] |

## Why: the stated reasons

- The FAA: a temporary telecommunications outage; flights halted "out of an abundance of caution" [faa-x-telecom-outage-2026-11-13: "out of an abundance of caution all flights have been halted"].
- Duffy: a communication issue at all the en-route centers; technicians investigating [duffy-x-ground-stop-2026-11-13: "FAA technicians are investigating the issue."].
- Mullin: "a telecommunications outage throughout FAA" [mullin-rr47-x-2026-11-13: "This was a telecommunications outage throughout FAA."].
- Sources: an update to the network L3Harris runs (CBS), routers starting at Midway (CNN's airline source), a software update (MS NOW's official) [cnn-live-2026-11-13: "The problem is believed to have started at Chicago Midway International Airport and cascaded nationwide."].

## The sides

- Senate Commerce Republicans: the outage "appears to be related to FAA's ARTCCs" and shows the need to modernize the centers "over other projects"; Cruz won $1.9 billion to replace and consolidate them [senate-commerce-x-2026-11-13: "successfully got $1.9 billion in Working Families Tax Cut Act to replace and consolidate outdated ARTCCs"].
- Democrats: Duckworth demands answers on redundancy [duckworth-x-2026-11-13: "The safety of our skies is built on redundancies."]; Ramirez asks whether cuts are responsible [ramirez-x-2026-11-13: "We must be clear whether the Trump administration's cuts and changes to the FAA are responsible for today's disruptions."]; Cantwell's committee will review primary and backup frequencies [usatoday-live-2026-11-13: "Technology issues related to how planes communicate through primary frequencies, backup frequencies, and other issues will be something the Commerce Committee will be reviewing"].
- Agreed by all: the failure was in communications, and the system lacks redundancy.

## The numbers

| Figure | What it counts | As of | Source |
|---|---|---|---|
| 4,042 | flights bound for U.S. airports airborne at the order | 2054Z | [flightradar24-x-2026-11-13: "At the time, 4,042 flights destined for US airports were already airborne."] |
| 1,913 / 10,494 | flights cancelled / delayed, FlightAware | 6:04 p.m. ET | [abc-live-2026-11-13: "1,913 flights have been cancelled and 10,494 flights have been delayed"] |
| 4,000+ / 10,000+ | cancellations / domestic delays over the day, FlightAware | 7:15 p.m. ET | [axios-ground-stop-2026-11-13: "FlightAware reported more than 10,000 domestic delays and 4,000 cancellations"] |
| 600 (496 + 104) | flights diverted: back to origin + elsewhere, Cirium | 5:50 p.m. ET | [ap-grounded-2026-11-13: "At least 600 flights have been diverted so far"] |
| 11,000 / 1.5 million | flights / passengers scheduled after 4 p.m., not cancellations | Nov 13 | [ap-grounded-2026-11-13: "Some 11,000 flights carrying more than 1.5 million passengers"] |
| 22 | en-route centers | standing | [abc-nefarious-2026-11-13: "There are 22 of those centers in the U.S."] |
| 4,400 | FAA sites on FTI | 2006 | [oig-fti-2006-04-27: "4,400 FAA sites."] |
| 2 | nationwide stops since 9/11, counting this one | Nov 13 | [msnow-software-update-2026-11-13: "only the second nationwide ground stop since the Sept. 11, 2001, terrorist attacks"] |

## What coverage says that the records do not

- The Washington Times headline ties SMART's expansion to the stop by timing [washtimes-smart-2026-11-13: "FAA expanded AI air traffic tool to all centers days before nationwide ground stop"]; its own story says neither the FAA nor Duffy has linked them [washtimes-smart-2026-11-13: "Neither the FAA nor Transportation Secretary Sean Duffy has linked SMART to Friday’s ground stop"]. The headline is accurate on dates; the record holds no link.
- Senate Commerce Republicans (see The sides): a fix for the centers, while every account names the network.

## What is next

- The stop stays until centers recover; release in tiers [atcscc-advzy-119-2026-11-13: "TRAFFIC WILL BE RELEASED FROM THE NATIONWIDE GROUND STOP AS"].
- The FAA's own statement of cause; L3Harris's response; the FBI's inquiry.
- Senate Commerce review (Cantwell); Duckworth's demand for answers.

## Reactions

See The sides. Air Space Intelligence denied SMART had any role [asi-x-smart-2026-11-13: "The current ground stop is not based on or a result of the SMART system"].

## Unknowns

- The confirmed cause: no FAA, DOT or L3Harris statement on the record as of the latest capture (searched: FAA's X account, Duffy's, the command-center advisories, CBS's note on L3Harris).
- When the stop lifted: at 0037Z on November 14 the command center's plan still had it in force to 0400Z with selective releases [atcscc-advzy-001-2026-11-14: "UNTIL 0400 -NATIONWIDE GROUND STOP W/SELECTIVE RELEASES"]. Watched on the advisory list; to be added when it lifts.
- Which areas kept communicating: Mullin did not name them; the advisories say only that "some of the coastal facilities" released international departures. A CBS source said East Coast international departures could fly over the Atlantic [cbs-ground-stop-2026-11-13: "International flights departing from the East Coast are able to fly over the Atlantic Ocean"].

## Leads not admitted

- Washington Examiner, "rolling frequency outage" per two FAA employees: not opened. [lead: https://mlq.ai/news/faa-orders-rare-nationwide-ground-stop-halting-all-us-departures-over-extraordinary-circumstances/]
- New York Post source on "an upgrade to new software": reported by View from the Wing; the Post's page not found. [lead: https://viewfromthewing.com/faa-ground-stop-every-u-s-airport-departure-halted-as-air-traffic-control-communications-fail/]
- The Register: FTI is managed by L3Harris; capture failed. [lead: https://www.theregister.com/offbeat/2026/11/13/all-us-flights-grounded-by-faa/5309912]
- Reuters on the White House's $30.1 billion request: capture refused (401); AeroTime's account is admitted. [lead: https://www.reuters.com/legal/government/white-house-urges-congress-provide-301-billion-aviation-reform-2026-11-13/]
- FAA's November 10 SMART statement: known through coverage only. [lead: https://www.theflightbrief.com/articles/faa-smart-traffic-planning-all-22-centers]
