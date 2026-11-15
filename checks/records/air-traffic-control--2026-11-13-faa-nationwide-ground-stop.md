# The FAA's nationwide ground stop of November 13, 2026: the record

Every fact line ends with its source: the record id and the record's words in square brackets (straight quotes, or curly quotes when the words hold straight ones; `admit.py check` verifies each one), or `[lead: URL]` for something found but not admitted, with the reason. A fact with neither is not in the record.

Written the evening of November 13, 2026; the stop was lifted at 8:16 p.m. Eastern. Times are Eastern unless marked Z (UTC; Eastern is Z minus five hours).

## The explanations

Scored again after the evening White House briefing (record `wh-briefing-2026-11-13`), where the transportation and homeland security secretaries put a cause on the record.

Question 1: what failed, and why on Friday?

- A. A cyberattack (the fear Mullin was asked about). If true: CISA or FBI findings of intrusion. Should not find: investigators saying no evidence of one; a mechanical account of the failure.
- B. A physical cut or sabotage of the lines (the September 2026 Philadelphia outage began with a cut fiber). If true: a named cut site, repair crews, failure along one path. Should not find: an overload account; a fix made by changing the equipment's load.
- C. A carrier failure. C1: Verizon. C2: one of the other local carriers FTI leases from, as in Dallas in 2025. Should not find: the carrier saying its network works; the FAA naming its own switches and routers.
- D. The FAA's own telecommunications network failed. D1, what broke: its old analog switches and routers were overloaded with data and gave bad data (Duffy, on the record). D2, why Friday: a change made to that network: new equipment and patches going in (Mullin, on the record, "appears"), an update that made it reboot and crash (CBS's sources), a software update (MS NOW's official; the FBI's line of inquiry per Bloomberg). Should not find: the network unchanged that day; the digital parts failing too.
- E. SMART, the AI planning tool the FAA expanded to all 22 centers on November 10. Should not find: SMART disconnected from the radar and automation systems; radio and radar down.
- F. The Microsoft 365 outage that began November 12. Should not find: officials and Microsoft saying the two are separate.
- G. Staffing and cuts (Rep. Ramirez's question). Should not find: an equipment cause on the record.

Two camps the orchestrator asked about were searched for and not found published: blame on the previous administration's equipment as the cause (Duffy faults past administrations for not fixing the system, not for Friday's trigger) [wh-briefing-2026-11-13: "uh $15 billion has been given to the FAA to fix this air traffic control system"], and a named foreign actor (asked about Iran, Mullin: "we're not seeing that at all") [wh-briefing-2026-11-13: "we're not seeing that at all."].

| Evidence | A attack | B cut | C carrier | D1 old network overloaded | D2 a change made Friday | E SMART | F Microsoft | G staffing |
|---|---|---|---|---|---|---|---|---|
| Duffy: "analog telecom ... Our switches uh our routers actually got overloaded with data", then gave inconsistent data, "and because of that, we shut the system down" [wh-briefing-2026-11-13: "So we have TDM uh telecom, so this is analog telecom."] [wh-briefing-2026-11-13: "Our switches uh our routers actually got overloaded with data"] [wh-briefing-2026-11-13: "they started to give us inconsistency in the data uh from those uh from those routers, and because of that, we shut the system down."] | I, as Duffy describes it (overload, not intrusion) | I: overload, not a severed line | I, C2: the switches and routers he names are the FAA's | C | C | | | I |
| Duffy: the upgraded IP switches held; "It's the old hardware that went down"; centers and TRACONs upgraded to IP "did not experience these issues" [wh-briefing-2026-11-13: "our new IP switches did not go down. It's the old hardware that went down."] [wh-briefing-2026-11-13: "Now we do have some uh uh in our trade cons and centers that have been upgraded to um to digital uh to IP, those did not experience these issues"] | | | | C | C | | | |
| Duffy: the fix reduced the load on the switches [wh-briefing-2026-11-13: "We were able to uh deploy fixes to uh reduce the overloading on our on our um on our switches"] | | I | | C | C | | | |
| Mullin: "as Secretary Duffy and FA[A] was going in and putting patches into the system, they were putting new equipment and uh new um technology and that new equipment new technology ... was overwhelming the older system" [wh-briefing-2026-11-13: "as Secretary Duffy and FA was going in and putting patches into the system, they were putting new equipment and uh new um technology and that new equipment new technology just wasn't it was overwhelming the older system"] | | | | C | C (on the record, "appears") | | | |
| Asked whether the FAA's patching caused it, Duffy: "I want to clarify that ... this is our old uh TDM analog system that uh got overloaded with data"; asked what was different on Friday: "we're still working on the details of what went wrong today" [wh-briefing-2026-11-13: "So yeah, that's so I want to clarify that. Um this is our old uh TDM analog system that uh got overloaded with data and started to experience these issues."] [wh-briefing-2026-11-13: "we're still working on the details of what went wrong today"] | | | | C | not confirmed by Duffy | | | |
| CBS's sources: an update to the network, then a reboot and a crash [cbs-ground-stop-2026-11-13: "caused the system to reboot, leading to a crash and a communications outage"]; MS NOW's official: a software update [msnow-software-update-2026-11-13: "A software update caused the rare nationwide ground stop"]; FBI, per a person familiar: looking at a software update, not a cyberattack or crime [bloomberg-fbi-software-2026-11-13: "One area of inquiry is whether the outage was caused by a software update, the person said."] | I (sources) | | | | C (unnamed) | | | |
| Mullin: "zero evidence" of a cyberattack; "It appears that this was mechanically driven. However, we're still looking." [wh-briefing-2026-11-13: "We've seen zero evidence uh that this was that this was a a cyber attack"] [wh-briefing-2026-11-13: "It appears that this was mechanically driven. However, we're still looking."] | I (on the record; "still looking") | | | | | | | |
| Verizon: network "fully functioning" [verizon-via-deitaone-x-2026-11-13: "WE ARE NOT AWARE OF ANY ISSUE RELATED TO AIR TRAFFIC CONTROL SYSTEMS"] | | | I, C1 | | | | | |
| Duffy: SMART "isn't plugged in uh to stars in ERAM", the radar and automation systems, so "there's no possible way smart would have impacted what [happened]" [wh-briefing-2026-11-13: "that smart system isn't plugged in uh to stars in ERAM"] [wh-briefing-2026-11-13: "So there's no possible way smart would have impacted what"]; its maker denies any role [asi-x-smart-2026-11-13: "any product of ASI or our integration with FAA and ATC"] | | | | | | I (denied on the record; no record links it) | | |
| Mullin: "no connection between this and Microsoft"; Microsoft: no indication [wh-briefing-2026-11-13: "there is no connection between this and Microsoft"] [nbc-live-2026-11-13: "Microsoft has no indication that the FAA nationwide ground stop is related to the recent service disruption"] | | | | | | | I | |

Survives: D. D1, what broke, is on the record from Duffy: the FAA's old analog switches and routers were overloaded and gave bad data, and the upgraded digital ones held. D2, why it broke on Friday, is not settled: Mullin's on-record account is that new equipment and patches going in "appears" to have overwhelmed the older system, and CBS's and MS NOW's unnamed sources describe the same kind of change (an update); Duffy, asked about the patching, restated the overload without confirming it, and said the FAA is "still working on the details of what went wrong today". No official has named the change, who made it, or what it touched.

Ruled out, on more than one party's word: E (Duffy: SMART is not plugged into STARS and ERAM and is "completely disconnected"; its maker denies; no record links it), F (Mullin and Microsoft), C1 (Verizon's own statement).

No record supports it, resting only on the officials' unfinished account: B (they describe an overload eased by reducing load, not a cut), G as the trigger.

Not tested: C2, another carrier; Verizon's denial covers only Verizon.

No evidence so far; officials are not ruling it out: A. Mullin: "zero evidence", "mechanically driven", "still looking"; Duffy: "I don't want to rule out that we didn't have nefarious activity here" [wh-briefing-2026-11-13: "I don't want to rule out that we didn't have nefarious activity here."].

The result turns on the briefing's own words. It would change if the FAA's investigation names a different trigger. The deciding rows were checked in the audio (two transcription engines on the onset time; the cause passages read in context, with the reporter's question and the official's answer told apart).

Question 2: why could one outage stop every center?

- A. One national telecommunications network, run by one contractor, carries every center's and TRACON's voice and radar, and the old analog part of it failed "everywhere" at once (Duffy). No record shows a single router or path all of them depend on.
- B. The center buildings themselves are old (Senate Commerce Republicans: the outage "appears to be related to FAA's ARTCCs").
- C. Not everything failed; the stop was a precaution (Duffy: "we didn't lose all telecom. We didn't lose all radar"; Mullin: two areas could still communicate).

| Evidence | A one network | B old buildings | C precaution |
|---|---|---|---|
| FTI carries voice and radar for the FAA's sites on a single network [oig-fti-2006-04-27: "telecommunications networks with a single network"] [oig-fti-2006-04-27: "telecommunication services (e.g., voice and radar) for air traffic control"] | C | | |
| Duffy: "It's an old system that went down and went down everywhere. It got overloaded." [wh-briefing-2026-11-13: "It's an old system that went down and went down everywhere. It got overloaded."] | C | I: what he names is telecom equipment, not buildings | |
| Bedford, September: the network being replaced is a 1980s design that connects radar and voice [bedford-testimony-2026-09-15: "It replaces an aging and extremely limited 1980’s network architecture that presently connects airports, weather systems, radar, voice communications, and aircraft."] | C | | |
| L3Harris, which runs FTI: several carriers for redundancy, and as of May halfway through rebuilding the network while it ran [l3harris-fti-page-2026-11-13: "This multi-carrier approach ensures redundancy and reliability across the system."] [l3harris-modernization-2026-05: "completing 50% of a nationwide effort to rebuild the invisible backbone connecting every tower, radar facility and air traffic control center across the United States"] | C, for a shared network mid-rebuild; against a single physical path | | |
| GAO, September: the rebuild's 11,389 projects are not on one schedule, and installations at the same sites go ahead without addressing conflicts [gao-26-107992: "individual projects are scheduled to conduct different installations at the same installation sites repeatedly, generally without addressing potential conflicts"] | context only; no record ties Friday's change to a scheduling conflict | | |
| Duffy: "we didn't lose all telecom. We didn't lose all radar"; Mullin, earlier: two areas could still communicate; Alaska in-state and Hawaii inter-island flights kept flying [wh-briefing-2026-11-13: "Uh we didn't lose all telecom. We didn't lose all radar"] [npr-ground-stop-2026-11-13: "there's two areas inside the United States that are still able to communicate just fine."] [ap-grounded-late-2026-11-13: "The airline said its flights within the state of Alaska and its “neighbor island” flights in Hawaii are not impacted by the nationwide grounding of flights."] | C | | C |

Survives: A, with C as a qualifier on scope: the nationwide stop was a traffic decision taken when the old network's data became unreliable, and not every facility lost everything. Ruled out as the explanation of Friday: B; the failure the officials describe is in the telecom equipment, and the upgraded parts of the same centers held.

## The story

On Friday afternoon, November 13, the FAA stopped every departing flight in the country for more than four hours after radar and radio links to its air traffic control centers became unreliable.
Flights already in the air were held over their destinations or turned back, at least 600 of them by early evening, and by 7:15 p.m. the day's cancellations reached 4,000.
Transportation Secretary Sean Duffy said the FAA's old analog switches and routers were overloaded with data while the newer digital equipment held, and he wants $50 billion from Congress for a new system.
On Saturday Duffy said a router at one remote site, where the contractor L3Harris was moving an old copper line to fiber, flooded the network; the FAA has not determined whether the router or the work was at fault, and FAA Administrator Bryan Bedford said the job was upkeep of the old network, not modernization.
The FAA lifted the stop at 8:16 p.m., airlines expect a full schedule by Sunday's close of business, and the FAA says it will share its root cause analysis when complete.

## The plan

Headline: Duffy blamed old switches for grounding U.S. flights. Now he traces it to a contractor's job at one site.

What happened (sentences 1 and 2; the event, who it hit, where it stands):
1. What happened? At 3:53 p.m. the FAA's command center ground-stopped every airport "until further notice". [atcscc-advzy-111-2026-11-13: "ALL AIRPORTS ARE GROUND STOPPED"]
2. Why? The radar and radio links to its centers and TRACONs became unreliable; the FAA called it a telecommunications outage. [wh-briefing-2026-11-13: "So at uh 3 36 PM we experienced instability for our radar and our communications in our centers and our tray cons across uh the country."] [faa-x-telecom-outage-2026-11-13: "There has been a temporary telecommunications outage"]
3. All of them? Not everything failed: Duffy says they did not lose all telecom or radar, Mullin said two areas could still communicate, and Alaska and Hawaii inter-island flights kept flying. [wh-briefing-2026-11-13: "Uh we didn't lose all telecom. We didn't lose all radar"] [ap-grounded-late-2026-11-13: "The airline said its flights within the state of Alaska and its “neighbor island” flights in Hawaii are not impacted by the nationwide grounding of flights."]
4. Who was hit? 4,042 flights in the air at the order; at least 600 diverted by 5:50 p.m.; more than 4,000 cancellations by 7:15 p.m.; Europe and Mexico held U.S.-bound departures. [flightradar24-x-2026-11-13: "At the time, 4,042 flights destined for US airports were already airborne."] [ap-grounded-2026-11-13: "At least 600 flights have been diverted so far"] [axios-ground-stop-2026-11-13: "FlightAware reported more than 10,000 domestic delays and 4,000 cancellations"] [usatoday-live-2026-11-13: "U.S.-bound departures from 42 countries"] [ap-grounded-2026-11-13: "all scheduled flights from Mexican airports headed to the U.S. are grounded for the time being"]
5. Where does it stand? Lifted at 8:16 p.m.; disruptions expected into Saturday. [atcscc-advzy-005-2026-11-14: "THE FAA COMMAND CENTER NATIONWIDE GROUND STOP HAS BEEN"] [ap-grounded-late-2026-11-13: "“We expect disruptions to continue into tomorrow, including additional cancellations,” JetBlue said in a news release."]
6. How rare? The second nationwide stop since 9/11; the last, in January 2023, came when contractors deleted files in the pilot-notice system. [msnow-software-update-2026-11-13: "only the second nationwide ground stop since the Sept. 11, 2001, terrorist attacks"] [faa-notam-statement-2023-01-19: "contract personnel unintentionally deleted files"]

Saturday update (2026-11-14): What broke now opens on Duffy's Saturday account: L3Harris moving a remote site's copper line to fiber; the router being replaced flooded other routers. [dot-presser-2026-11-14: "In at least one of our remote FAA locations, a contractor was doing routine maintenance to switch telecommunication lines from old copper wire, and they were bringing it over to Fiber."] [dot-presser-2026-11-14: "We haven't determined what the fault was."] Bedford: 17 of 22 centers unstable; paper maintenance logs; one network, the flood spread to other centers' backups. [dot-presser-2026-11-14: "we have one federal telephony infrastructure. One. We don't have two."] The Catch now sets Friday's account (old switches, $50 billion) against Saturday's (one router at one site, a routine job Duffy says should not have had this impact; Bedford: sustainment, not modernization). [dot-presser-2026-11-14: "this isn't modernization, this is sustainment."] The Friday plan below is kept as written.

What broke (sentence 3): opens on Duffy's account
1. What broke? The FAA's old analog switches and routers, overloaded with data, began giving bad data; the FAA shut the system down. [wh-briefing-2026-11-13: "Our switches uh our routers actually got overloaded with data"]
2. What held? The digital IP switches, and the centers and TRACONs already upgraded. [wh-briefing-2026-11-13: "our new IP switches did not go down. It's the old hardware that went down."]
3. What network is that? FTI, the single network L3Harris runs that carries voice and radar to the FAA's sites; it was halfway through a rebuild done while it ran. [oig-fti-2006-04-27: "telecommunications networks with a single network"] [l3harris-modernization-2026-05: "completing 50% of a nationwide effort to rebuild the invisible backbone"]
4. Why every center at once? They all talk over it, and Duffy says the old part "went down everywhere". [wh-briefing-2026-11-13: "It's an old system that went down and went down everywhere. It got overloaded."]
5. How did it unfold? O'Hare stopped for communications at 3:10, Midway at 3:17, the country at 3:53; Duffy dates the instability across the country to 3:36. [atcscc-advzy-107-2026-11-13: "COMMENTS: COMMS ISSUES"] [atcscc-advzy-109-2026-11-13: "GROUND STOP PERIOD: 13/2017Z - 13/2130Z"] (timeline figure)
6. How was it fixed? Fixes that reduced the load on the switches. [wh-briefing-2026-11-13: "We were able to uh deploy fixes to uh reduce the overloading on our on our um on our switches"]
7. Has this happened before? September 2026, Philadelphia; Bedford then: "we just don't have the redundancy". [thehill-sept-outage-2026-09-24: "When it fails, we just don’t have the redundancy that we would get if we had a modern architecture,"]

Every explanation, tested (Zain's question, reader-facing; ExplanationList): attack, cut line, carrier, the old network, a change made Friday, SMART, Microsoft, staffing, each with what the symptoms fit and what they don't, from the matrix above.

What each side says: the administration (old system, fund the build, $50 billion); Senate Commerce Republicans (the centers, "buildings first", $1.9 billion; Cruz also backs the telecom money); Democrats (Duckworth on redundancy; Ramirez on cuts; Cantwell's review). [senate-commerce-x-2026-11-13: "the incident highlights the need to prioritize modernizing ARTCCs over other projects"] [senate-commerce-hearing-2025-12: "This funding will ensure the FAA is equipped to invest in the latest telecommunications infrastructure, prevent outages"]

The Catch (sentence 4): opens on the administration's explanation
1. What do they say? Old hardware went down, and Congress should fund a new system: Duffy wants $50 billion and says "you will have more of these" otherwise. [wh-briefing-2026-11-13: "I want fifty billion dollars."] [wh-briefing-2026-11-13: "you will have more of these, you will have more of them unless you the the American people in the Congress tell us to"]
2. In the same paragraph: asked what was different on Friday, Duffy said the FAA is still working out what went wrong; the one trigger named on the record is Mullin's, that new equipment and patches going in "appears" to have overwhelmed the older system; asked about the patching, Duffy restated the overload and did not confirm it. [wh-briefing-2026-11-13: "we're still working on the details of what went wrong today"] [wh-briefing-2026-11-13: "as Secretary Duffy and FA was going in and putting patches into the system"] [wh-briefing-2026-11-13: "So yeah, that's so I want to clarify that."]
3. The sources: CBS's (an update, then a reboot and crash) and MS NOW's (a software update) describe the same kind of change. [cbs-ground-stop-2026-11-13: "An update to the private communications network that connects America's air traffic control system"] [msnow-software-update-2026-11-13: "A software update caused the rare nationwide ground stop"]
4. The point: "old hardware" explains what broke, not why it broke on Friday; the administration's own account of the trigger is a change made during the upgrade. The page does not say the upgrade caused it.

What happens next (sentence 5):
1. Airlines rebuilding schedules into Saturday. [ap-grounded-late-2026-11-13: "“We expect disruptions to continue into tomorrow, including additional cancellations,” JetBlue said in a news release."]
2. The FAA's account of what changed; the FBI's inquiry; Cantwell's committee review; Duckworth's demand for answers. [usatoday-live-2026-11-13: "will be something the Commerce Committee will be reviewing"]
3. Funding: the $30.1 billion request filed hours before the stop; Duffy now asks $50 billion. [aerotime-ground-stop-2026-11-13: "asked Congress for an additional $30.1 billion"] [wh-briefing-2026-11-13: "I want fifty billion dollars."]

Background held: the router-at-Midway account (CNN's airline source) [cnn-live-2026-11-13: "The problem is believed to have started at Chicago Midway International Airport and cascaded nationwide."]; LaHood's Potomac TRACON guess [cnn-live-2026-11-13: "I assume something happened there."]; the 2001 inspector general warning [oig-fti-2001-08-21: "would share the same network with administrative systems having direct connections to the Internet"]; Peraton [faa-peraton-2025-12-04: "announced Peraton will be the Prime Integrator"]; FENS's award and AT&T's takeover [nextgov-att-fens-2026-08-14: "AT&T is taking over as the lead project manager and prime contractor with Verizon moving to a supporting role"]; Dallas 2025 [faa-general-statements-dallas-2025-09-20: "Oversight by L3Harris, an FAA contractor, failed to ensure that redundancies in the system functioned properly."]; the 2014 Chicago fire [oig-disruptions-2017-01-11: "an FAA contract employee deliberately started a"]; Sky Shield [ain-ground-stop-2026-11-13: "as well as during three military exercises under Operation Sky Shield in the early 1960s"]; Arroyo [nbcchicago-faa-statement-2026-11-13: "whether it’s because the old wires that they have are just run down or for whatever reason"]; the 2023 stop's length [nolen-testimony-2023-02-15: "I lifted the ground stop at 9:07 a.m. EST"]; the Houston Chronicle printed the onset as 2:26 p.m., the audio has 3:36 (not admitted; not a catch) [lead: https://www.houstonchronicle.com/news/houston-texas/article/ground-stop-airport-22529698.php]; later counts in review r2 (827 diversions by 7:05, 6,000+ cancellations by 9 p.m., about 700 Saturday cancellations) not found in the captured versions [lead: https://apnews.com/article/flights-halted-airports-faa-f81b0904331dafad6133f291e5f531a8].

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
| 2026-11-14 0116Z | Stop cancelled (8:16 p.m. Eastern, Nov 13) | [atcscc-advzy-005-2026-11-14: "THE FAA COMMAND CENTER NATIONWIDE GROUND STOP HAS BEEN"] |

## Why: the stated reasons

- Duffy, at the evening briefing: the FAA's analog switches and routers were overloaded with data and gave inconsistent data, so the FAA shut the system down; the old hardware failed and the new held [wh-briefing-2026-11-13: "our new IP switches did not go down. It's the old hardware that went down."].
- Mullin, same briefing: new equipment and patches going in "appears" to have overwhelmed the older system [wh-briefing-2026-11-13: "as Secretary Duffy and FA was going in and putting patches into the system"].

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

- What changed on Friday: Duffy says the FAA is still working out what went wrong; Mullin's "appears" is the only on-record account of a trigger; no FAA or L3Harris statement names the change, who made it or what it touched.
- When normal flying resumes: the stop was cancelled at 0116Z [atcscc-advzy-005-2026-11-14: "EVENT TIME: 14/0116 - 14/0130"]; at 0037Z it had still been in force with selective releases [atcscc-advzy-001-2026-11-14: "UNTIL 0400 -NATIONWIDE GROUND STOP W/SELECTIVE RELEASES"]. How long recovery takes is not yet in the record.
- Which areas kept communicating: Mullin did not name them; the advisories say only that "some of the coastal facilities" released international departures. A CBS source said East Coast international departures could fly over the Atlantic [cbs-ground-stop-2026-11-13: "International flights departing from the East Coast are able to fly over the Atlantic Ocean"].

## Leads not admitted

- Washington Examiner, "rolling frequency outage" per two FAA employees: not opened. [lead: https://mlq.ai/news/faa-orders-rare-nationwide-ground-stop-halting-all-us-departures-over-extraordinary-circumstances/]
- New York Post source on "an upgrade to new software": reported by View from the Wing; the Post's page not found. [lead: https://viewfromthewing.com/faa-ground-stop-every-u-s-airport-departure-halted-as-air-traffic-control-communications-fail/]
- The Register: FTI is managed by L3Harris; capture failed. [lead: https://www.theregister.com/offbeat/2026/11/13/all-us-flights-grounded-by-faa/5309912]
- Reuters on the White House's $30.1 billion request: capture refused (401); AeroTime's account is admitted. [lead: https://www.reuters.com/legal/government/white-house-urges-congress-provide-301-billion-aviation-reform-2026-11-13/]
- FAA's November 10 SMART statement: known through coverage only. [lead: https://www.theflightbrief.com/articles/faa-smart-traffic-planning-all-22-centers]
