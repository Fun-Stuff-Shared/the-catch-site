The record is incomplete. The most consequential gaps concern the evidence for the reported software failure, the FAA network's ongoing modernization, the exclusion of competing explanations, and the political dispute over modernization priorities.

### Findings

**1. The evidence does not establish a single, independently corroborated software-update failure. — Provenance / Untested**

CBS reports that multiple sources attributed the outage to a communications-network update that caused a reboot and crash. MS NOW separately attributes the outage to a software update. But Bloomberg's account of the FBI investigation says a software update is *one area of inquiry*, not an established finding. CNN's airline source identifies network routers without identifying a software update.

These accounts are not equivalent confirmations of the same failure sequence. The record's central conclusion combines the specificity of CBS's account with other sources that establish less. No identified source establishes who deployed the update, what equipment changed, or whether the reported reboot was the initiating failure rather than a consequence.

This changes how firmly the central explanation can be treated as established.

Sources: [CBS News](https://www.cbsnews.com/news/faa-issues-nationwide-ground-stop/) · [Axios, citing Bloomberg's FBI reporting](https://www.axios.com/2026/11/13/faa-nationwide-ground-stop)

**2. The inference that one nationwide network necessarily constitutes one nationwide point of failure is unsupported. — Untested**

L3Harris's current description of the FAA Telecommunications Infrastructure says the network uses multiple local exchange carriers, redundant connections, parallel systems and coordinated maintenance procedures. Its May 2026 account describes a network already undergoing extensive replacement.

The existence of a nationwide managed network does not establish that all 22 centers depend on a single router, software instance or physical communications path. Nor do the nationwide FAA advisories establish that every center's equipment failed simultaneously rather than that national departures were halted because adequate communications could not be assured.

The distinction matters because the explanation of *how one fault reached every center* remains unresolved even if the software-update reporting proves correct.

Source: [L3Harris — FAA Telecommunications Infrastructure](https://www.l3harris.com/all-capabilities/faa-telecommunications-infrastructure-fti)

**3. Verizon's statement does not rule out a telecommunications-carrier failure or a failed backup arrangement. — Untested / Matrix**

L3Harris's network documentation identifies a multi-carrier architecture, not an exclusively Verizon-operated network.

A particularly relevant primary precedent is the FAA's September 20, 2025, statement about the Dallas TRACON outage. The FAA attributed that disruption to multiple failures of telecommunications services supplied by Frontier, a local carrier, and explicitly said L3Harris had failed to ensure that redundancies functioned properly.

Therefore, Verizon's statement that its network was functioning cannot exclude failures involving other carriers, leased circuits or backup arrangements. The matrix's exclusion of carrier failure is stronger than its evidence permits.

This matters because carrier and redundancy failures remain technically relevant alternatives to the proposed internal software trigger.

Sources: [FAA — September 20, 2025, Dallas TRACON findings](https://www.faa.gov/newsroom/statements/general-statements) · [L3Harris network architecture](https://www.l3harris.com/all-capabilities/faa-telecommunications-infrastructure-fti)

**4. The outage happened during an extensive modernization of the very network suspected of failing. — Missing lineage**

On May 11, 2026, L3Harris announced that it had completed more than half of its nationwide FAA telecommunications modernization effort.

The company reported deploying approximately 150–200 network paths monthly, replacing legacy connections while existing services continued operating. It described testing new systems in parallel and then switching during coordinated maintenance periods.

Separately, the White House and Transportation Department's November 13 funding request reported that 68% of legacy copper telecommunications connections had been replaced with fiber.

These developments change the underlying question. The possible initiating event was not necessarily the failure of untouched, decades-old equipment. It may have arisen during changes to an actively modernized network, with old and new infrastructure operating together.

Neither the record nor these sources establishes whether Friday's reported update was part of that modernization.

Sources: [L3Harris — May 11, 2026, modernization progress](https://www.l3harris.com/newsroom/editorial/2026/05/l3harris-reaches-over-50-faa-telecommunications-modernization) · [Reuters — November 13 modernization funding request](https://www.reuters.com/legal/government/white-house-urges-congress-provide-301-billion-aviation-reform-2026-11-13/?utm_source=chatgpt.com)

**5. A September 2026 GAO investigation identified serious risks in how the accelerated modernization was being coordinated. — Missing lineage**

GAO-26-107992 found that the FAA lacked both a reliable lifecycle cost estimate and an integrated master schedule for its accelerated air traffic control modernization program.

Instead, the FAA had **11,389 individual project schedules that were not integrated**. GAO specifically warned that separate projects could be scheduled at the same locations without sufficiently coordinating their effects on air traffic control operations.

The agency had also accelerated major communications and surveillance replacements toward a December 2028 deadline.

This is directly relevant to a reported network-update failure. It establishes that federal auditors had already identified risks from coordinating overlapping technology changes, not merely from retaining aging equipment.

It does not establish that those planning failures caused Friday's outage.

Source: [GAO-26-107992 — September 2026 modernization audit](https://www.gao.gov/assets/900/890007.pdf)

**6. The record presents the Senate Republicans' preference for rebuilding control centers as more opposed to network modernization than their documented position supports. — Untested / Missing lineage**

In December 2025, Senate Commerce Chairman Ted Cruz explicitly identified modern telecommunications infrastructure and preventing outages as intended benefits of the Republicans' $12.5 billion modernization investment.

The September 2026 GAO report also identifies the statutory allocation of that funding, including $4.75 billion for telecommunications, $3 billion for radar and $3.5 billion for air traffic control facilities construction.

Thus, the Republicans' November 13 demand to prioritize replacing and consolidating ARTCC facilities does not establish that they reject network modernization or consider telecommunications secondary in every respect.

The outstanding disagreement concerns priorities within an ongoing modernization program. The reported network failure does not, by itself, disprove the case for rebuilding centers, particularly when those centers depend on modern communications equipment.

This substantially affects the record's central political contrast.

Sources: [Senate Commerce Committee — December 2025 hearing announcement](https://www.commerce.senate.gov/meetings/faas-plan-for-atc-modernization-evaluating-progress-ensuring-accountability-and-results/) · [GAO — modernization funding allocations](https://www.gao.gov/assets/900/890007.pdf)

**7. The SMART exclusion rests on an insufficient technical inference, although its developer has denied involvement. — Untested / Matrix**

The FAA's November 10 primary statement is publicly available.

It identifies SMART as a cloud-based platform that brings together 200 data streams, including flight paths, weather, traffic flow and controller staffing. Specialists use its output to make recommendations through the FAA's command center.

That establishes SMART's operational function. It does not establish the absence of technical dependencies between its data integrations and other FAA systems.

The fact that SMART cannot control aircraft does not, by itself, exclude an integration or software problem affecting communications infrastructure.

The developer has expressly denied that SMART or its integration caused the ground stop, and officials have not established a connection. But the matrix's technical argument for ruling SMART out does not independently establish that conclusion.

Source: [FAA — November 10, 2026, SMART expansion statement](https://www.faa.gov/newsroom/statements/general-statements)

**8. The reported cancellation toll had more than doubled from the record's snapshot. — Missing development**

The brief reports 1,913 canceled flights and 10,494 delays as of 6:04 p.m. Eastern.

Axios reported that by **7:15 p.m. Eastern**, FlightAware had recorded more than **4,000 cancellations and 10,000 domestic delays**.

The original snapshot remains valid for its specified time, but the subsequent figures materially change the scale of the disruption already documented Friday evening.

Source: [Axios — November 13 flight disruption totals](https://www.axios.com/2026/11/13/faa-nationwide-ground-stop)

**9. The international consequences and the scale of flight diversions are missing. — Missing developments**

Associated Press reported that by 5:50 p.m. Eastern, at least **600 flights had been diverted**: 496 returned to their departure airport and 104 diverted elsewhere.

AP also reported that:

- European aviation authorities suspended U.S.-bound departures at the FAA's request from 5 p.m. Eastern until midnight.
- Mexico's federal aviation agency grounded scheduled departures to the United States.
- Approximately 11,000 flights carrying more than 1.5 million passengers were scheduled to depart U.S. airports after 4 p.m., representing a substantially larger population potentially affected than the aircraft already airborne.

The resulting disruption was not limited to people waiting to depart American airports. It affected international aviation operations, aircraft already flying, and destinations across multiple countries.

The 1.5 million figure represents passengers scheduled to travel, not confirmed cancellations or stranded passengers.

Source: [Associated Press — November 13 live coverage](https://apnews.com/article/6aaa6bd4991ef22eb0c3baa6961a91d1)

READ: 14 sections  
RECORD INCOMPLETE
