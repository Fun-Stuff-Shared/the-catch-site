<!-- em-dash-disable-file: reviewer output, kept verbatim -->
**Seven findings across 70 claims.** The issues concern overstated short forms, unsupported chronology, the duration of the ground stop, and distinctions between reported findings and what the records establish.

### Findings

**1. C1 — [national-stop-order]**

**Claim:** “At 3:53 p.m. Eastern on November 13 the FAA's command center ordered every U.S. airport to hold all departures until further notice, citing extraordinary circumstances and safety.”

**Short form:** “3:53 p.m.: every U.S. airport stopped”

**Record:** `atcscc-advzy-111-2026-11-13`

Exact words:
> SEND TIME: 11/13/26 20:54Z  
> EVENT TIME: 13/2053 - 14/0400  
> ALL AIRPORTS ARE GROUND STOPPED. ALL DEPARTING TRAFFIC SHOULD REMAIN GROUND STOPPED UNTIL FURTHER NOTICE. INBOUND INTERNATIONAL FLIGHTS WILL BE MANAGED ON A CASE BY CASE BASIS.

records(20261114-022550)

**Finding:** The short form exceeds the claim. It suggests all airport operations stopped, although the directive halted departures and explicitly contemplated international arrivals. The claim also identifies the 3:53 p.m. effective time as the time the order was issued, whereas the advisory was sent at 3:54 p.m.

**Wrong takeaway:** Every U.S. airport stopped operating entirely at 3:53 p.m., including handling arriving aircraft.

---

**2. C7 — [airborne-4042]**

**Claim:** “4,042 flights bound for U.S. airports were in the air when the stop was ordered, by Flightradar24's count.”

**Short form:** “4,042 flights in the air”

**Record:** `flightradar24-x-2026-11-13`

Exact words:
> At the time, 4,042 flights destined for US airports were already airborne.

records(20261114-022550)

**Finding:** The full claim holds, but its short form removes the destination restriction.

**Wrong takeaway:** Flightradar24 counted 4,042 flights airborne in total, rather than 4,042 flights specifically destined for U.S. airports.

---

**3. C9 — [sequence-chicago]**

**Claim:** “The first stops of the afternoon were at Chicago: O'Hare at 3:10 p.m. Eastern for communications issues and Midway at 3:17, before the national stop at 3:53.”

**Record:** `atcscc-advzy-107-2026-11-13`

Exact words:
> SEND TIME: 11/13/26 20:28Z  
> CTL ELEMENT: ORD  
> GROUND STOP PERIOD: 13/2010Z - 13/2130Z  
> COMMENTS: COMMS ISSUES

**Record:** `atcscc-advzy-109-2026-11-13`

Exact words:
> SEND TIME: 11/13/26 20:31Z  
> CTL ELEMENT: MDW  
> GROUND STOP PERIOD: 13/2017Z - 13/2130Z  
> IMPACTING CONDITION: EQUIPMENT / OUTAGE

records(20261114-022550)

**Finding:** The cited advisories establish the effective times and show that the Chicago stops preceded the nationwide stop. They do not establish that these were the **first stops of the afternoon** across the air traffic system.

**Wrong takeaway:** The records establish Chicago as the first location where any ground stop occurred that afternoon, rather than establishing only the sequence of these documented advisories.

---

**4. C13 — [stop-kept-0400]**

**Claim:** “At 5:46 p.m. the command center kept the stop in force to 11 p.m., giving communications failure as the reason, and said flights would leave as en-route centers recovered.”

**Record:** `atcscc-advzy-120-2026-11-13`

Exact words:
> SEND TIME: 11/13/26 22:46Z  
> EVENT TIME: 13/2245 - 14/0400  
> EXPECT UPDATE:0400Z  
> REASON: COMMUNICATIONS FAILURE  
> REMARKS: THE FAA COMMAND CENTER GROUND STOP REMAINS IN EFFECT.

records(20261114-022550)

**Record:** `atcscc-advzy-005-2026-11-14`

Exact words:
> SEND TIME: 11/14/26 01:19Z  
> EVENT TIME: 14/0116 - 14/0130  
> REMARKS: THE FAA COMMAND CENTER NATIONWIDE GROUND STOP HAS BEEN CANCELLED.

records(20261114-022550)

**Finding:** The original advisory listed an event window ending at 11 p.m. and an expected update at that time. It did not establish that the stop would necessarily remain operative until 11 p.m. The subsequent cancellation advisory lists an effective time of 8:16 p.m.

**Wrong takeaway:** The command center committed to maintaining the ground stop until 11 p.m., or actually maintained it until then. The record establishes neither.

---

**5. C17 — [l3harris-no-comment]**

**Claim:** “L3Harris did not respond to CBS News' request for comment.”

**Record:** `cbs-ground-stop-2026-11-13`

Exact words:
> The system is operated by L3Harris, which did not immediately respond to CBS News' request for comment.

records(20261114-022550)

**Finding:** The claim drops the temporal limitation “immediately.”

**Wrong takeaway:** L3Harris failed to respond to CBS News' request altogether, rather than having failed to respond immediately at the time CBS reported the story.

---

**6. C32 — [fti-single-network]**

**Claim:** “FTI replaced the FAA's separate telecommunications networks with a single network carrying voice and radar for air traffic control to over 4,400 FAA sites.”

**Record:** `oig-fti-2006-04-27`

Exact words:
> The purpose of the FTI program is to replace seven existing FAA-owned and -leased telecommunications networks with a single network that would cost less to operate.

The inspector general continued:
> When completed, FTI will consist of about 25,000 telecommunications services at over 4,400 FAA sites.

records(20261114-022550)

The same report stated:
> By the end of FY 2005, only about 2.5 percent (610 of 24,266) of FTI services had been cutover to the NAS for operational use.

records(20261114-022550)

**Finding:** The cited 2006 report describes the intended network consolidation, not a completed replacement. It explicitly documents that the transition remained substantially unfinished.

**Wrong takeaway:** The inspector general established in 2006 that FTI had already replaced the seven networks and completed the transition across more than 4,400 sites.

---

**7. C40 — [accounts-name-network]**

**Claim:** “No account of the trigger so far says a center's own equipment failed: CBS's sources describe an update to the FAA's private network followed by a reboot and crash, MS NOW's official a software update, CNN's airline source network routers, and the FAA's own advisory a nationwide communications failure.”

**Record:** `wh-briefing-2026-11-13`

Duffy's exact words:
> Our switches uh our routers actually got overloaded with data and they went down and uh I shouldn't say they went down they started to give us inconsistency in the data

He continued:
> It's the old hardware that went down.

records(20261114-022550)

Later, discussing the old analog system, Duffy said:
> And it was in our trade cons and our centers throughout the NAS.

He also distinguished upgraded facilities:
> those did not experience these issues

records(20261114-022550)

**Finding:** The categorical opening exceeds what the selected reports establish. Duffy's subsequent account explicitly identified failures involving old switches, routers and hardware, and located the problems in TRACONs and en-route centers. His statements do not establish the precise physical location of every failed component, but they prevent the record from excluding center-level equipment failures.

**Wrong takeaway:** Every available account attributes the failure exclusively to an external or shared network, with no official account identifying failed legacy equipment at air traffic control facilities.

---

CHECKED: 70 claims  
CLAIMS DO NOT HOLD
