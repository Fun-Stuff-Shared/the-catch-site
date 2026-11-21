**12 findings.** The principal problems are short forms that turn historical application statuses into current facts, language that confuses approvals with shipments, and statements that exceed what the records establish.

1. **C8 — [not-shipped]**

   **Claim:** “Every one of the 21 approved applications is marked ‘Approved, not shipped’ in the BIS table as of May 11, 2026.”

   **Short form:** “All 21 approvals: ‘not shipped’”

   **Record — `bis-license-table-2026-05-11`:** The table is titled “H200 License and Equivalent Application Status as of May 11, 2026.” All 21 approved rows state “Approved, not shipped.” 

   **Problem:** The full claim holds, but the short form drops the May 11 cutoff. Nvidia subsequently reported shipments, including $2.4 billion of Hopper data center products to China during the quarter ending October 25.

   **Wrong reader takeaway:** None of the 21 approvals had resulted in shipments by November 2026, rather than none having shipped as of May 11.

2. **C11 — [rwa-common]**

   **Claim:** “Returns without action are routine: BIS returned 4,706 applications, 11.8 percent of those it reviewed, in 2021.”

   **Record — `bis-stats-2021`:**
   > “In 2021, BIS reviewed 40,843 license applications”

   The report separately identifies 39,901 applications for tangible items, software and technology and states:

   > “return without action totaled 4,706, a decrease of 1.8% (86 less) and the RWA rate was 11.8%.” 

   **Problem:** The 11.8% denominator covers the 39,901 tangible-item, software and technology applications, not all 40,843 applications BIS reviewed. Across all applications, 4,706 represents approximately 11.5%.

   **Wrong reader takeaway:** The 11.8% rate applies to BIS's entire 2021 licensing workload.

3. **C12 — [offshore-returned]**

   **Claim:** “Requests for 1,118,500 chips for ByteDance and Alibaba entities in Malaysia, Indonesia and Thailand were returned without action.”

   **Short form:** “1,118,500 for Southeast Asian data centers: returned”

   **Record — `bis-license-table-2026-05-11`:** The relevant column is headed “Data Center Operator or Ultimate Consignee.” The five returned applications identify ByteDance and Alibaba entities, chip quantities and ultimate chip locations in Malaysia, Indonesia and Thailand.  

   **Problem:** The total and full claim hold. The short form identifies the destinations specifically as data centers, while the table identifies corporate operators or ultimate consignees and countries. It does not establish the particular facilities where all requested chips would have been installed.

   **Wrong reader takeaway:** BIS identified 1,118,500 chips as destined for confirmed Southeast Asian data-center facilities.

4. **C15 — [pending]**

   **Claim:** “Applications for 600,342 chips, 23 in all, were still pending on May 11, 2026.”

   **Short form:** “600,342 still pending”

   **Record — `bis-license-table-2026-05-11`:** The table is explicitly dated May 11, 2026, and contains 23 applications marked “Submitted,” totaling 600,342 chips.  

   **Problem:** The full claim holds. The short form presents an explicitly historical status without its cutoff.

   **Wrong reader takeaway:** Applications covering 600,342 chips remained pending on November 20, rather than having been pending on May 11.

5. **C17 — [alibaba-asked]**

   **Claim:** “Alibaba and its subsidiaries applied for 948,950 chips and were approved for 75,000.”

   **Short form:** “Alibaba: asked 948,950, got 75,000”

   **Record — `hfac-summary-2026-11-19`:**
   > “948,950 covered integrated circuits for Alibaba and its subsidiaries”

   And:

   > “This includes 75,000 for Alibaba”

   **Record — `bis-license-table-2026-05-11`:**
   > “12/16/2025 | Nvidia | Alibaba Group | 75,000 | Approved, not shipped | China”  

   **Problem:** The full claim holds. “Got 75,000” changes approval into apparent receipt, despite the table explicitly recording those chips as not shipped.

   **Wrong reader takeaway:** Alibaba had physically received 75,000 chips by May 11.

6. **C20 — [installers]**

   **Claim:** “All but two of Nvidia's applications list Maginfra, Beijing New Matrix, ZTE Kangxun and Lenovo or its subsidiaries as companies that ‘may install the systems in the datacenter.’”

   **Record — `hfac-summary-2026-11-19`:**
   > “All but two NVIDIA license applications for the export, re-export, or transfer (in country) of covered integrated circuits to PRC companies provided to the House Foreign Affairs Committee list Maginfra Co., Ltd., Beijing New Matrix Information Technologies, ZTE Kangxun Telecom Co., Ltd., and Lenovo or its subsidiaries as entities that ‘may install the systems in the datacenter.’” 

   **Problem:** The claim omits the source's limitation to the relevant applications provided to the committee.

   **Wrong reader takeaway:** This pattern covered essentially all Nvidia export-license applications, rather than the specific China-related applications supplied to the committee.

7. **C25 — [trump-dec-8]**

   **Claim:** “The rule followed President Trump's December 8, 2025, announcement that the H200 could be shipped to approved customers in China.”

   **Short form:** “Dec. 8: Trump allows H200 sales”

   **Record — `bis-h200-release-2026-01-13`:**
   > “Today’s rule follows President Trump’s December 8, 2025 announcement that the United States will allow the H200 and similar products to be shipped to approved customers in China”

   **Record — `fr-h200-rule-2026-01-15`:**
   > “The effective date of this rule is January 15, 2026.”  

   **Problem:** The full claim holds. The short form makes the December 8 announcement sound like an immediately effective authorization. The regulatory change took effect January 15.

   **Wrong reader takeaway:** H200 sales were authorized under the new case-by-case licensing policy beginning December 8.

8. **C32 — [huang-resigned]**

   **Claim:** “Jensen Huang resigned as Nvidia's chief executive on November 12.”

   **Short form:** “Nov. 12: Huang resigns”

   **Record — `nvidia-call-q3-2026-11-17`:**
   > “On November 12, our Board of Directors announced that after disclosure of personal behavior inconsistent with the company's code of conduct, standards, and cultural norms, Jensen Huang voluntarily resigned his positions as President, CEO, and Board Member.”

   **Problem:** The record establishes November 12 as the date of the board's announcement, not explicitly the date Huang submitted his resignation. It also confirms that the board accepted the resignation. 

   **Wrong reader takeaway:** November 12 is independently established as the precise date of Huang's resignation, rather than the date Nvidia announced it.

9. **C36 — [inspection-tariff]**

   **Claim:** “The licenses require each H200 to be inspected in the United States before it goes to the customer, so each pays a 25 percent U.S. tariff.”

   **Record — `nvidia-10q-2026-08-26`:**
   > “The licenses require that the H200s go through an inspection process in the United States prior to any shipment to the customer.”

   And:

   > “any H200s shipped under the new licensing program are subject to a 25% tariff upon importation into the United States.”

   **Record — `fr-h200-rule-2026-01-15`:**
   > “Such a review can be performed by a representative sampling of a batch of semiconductors chosen by the lab, rather than the lab reviewing every individual semiconductor that the exporter intends to export.”  

   **Problem:** The record supports an inspection process and the tariff, but not individual inspection of every chip. The regulation expressly allows sampling.

   **Wrong reader takeaway:** Federal licensing requirements mandate that inspectors individually examine every exported H200.

10. **C39 — [nvidia-stopped]**

    **Claim:** “Nvidia says it has stopped shipping licensed Hopper chips, H200s among them, to China.”

    **Short form:** “Nov. 17: Nvidia stops”

    **Record — `nvidia-call-q3-2026-11-17`:**
    > “we are no longer shipping licensed Hopper data center products to China.”

    **Record — `reuters-licenses-2026-11-19`:**
    > “despite receiving some licenses, we have since stopped shipping H200s to China”  

    **Problem:** The records establish that Nvidia had stopped shipments by November 17. They do not establish November 17 as the date shipments ceased.

    **Wrong reader takeaway:** Nvidia halted shipments specifically on November 17, rather than announcing that day that shipments had already stopped.

11. **C42 — [amd-licenses]**

    **Claim:** “AMD got its first MI325 licenses for Chinese customers in February 2026 and said in August it did not yet know whether China would allow the chips in; its November filing reports the licenses and no shipments.”

    **Record — `amd-10q-2026-08-05`:**
    > “In February 2026, the U.S. government granted us some export licenses authorizing us to ship our AMD Instinct MI325 products to certain China-based customers.”

    And:

    > “We do not yet know whether any imports of MI325 products will be allowed into China.”

    **Record — `amd-10q-2026-11-04`:**
    > “During the first half of 2026, the U.S. government granted us some export licenses authorizing us to ship our AMD Instinct MI325 products to certain China-based customers.”

    The November filing further states:

    > “Any MI325 products shipped to China are required by the terms of the licenses to first undergo an inspection process in the United States.”  

    **Problem:** The November filing confirms the licenses but does not affirmatively report that no MI325 shipments occurred. Its description of shipments is conditional. The February disclosure also says “some export licenses,” without expressly identifying them as the first.

    **Wrong reader takeaway:** AMD affirmatively disclosed in November that it had shipped zero MI325 chips to China, and its filings establish February as the first-ever MI325 license approval date.

12. **C56 — [huang-dec-1]**

    **Claim:** “Huang and Nvidia's general counsel, Tim Teter, are due for transcribed interviews with three House committees on December 1 and 2.”

    **Short form:** “Dec. 1: Huang interviewed”

    **Record — `hfac-huang-interviews-2026-11-17`:**
    > “Jensen Huang will appear before the committees on December 1st, and NVIDIA General Counsel will appear on December 2nd, both for transcribed interviews.” records(20261120-112022)

    **Problem:** The full claim correctly presents scheduled future appearances. The short form presents Huang's December 1 interview as an event, rather than preserving its scheduled status.

    **Wrong reader takeaway:** Huang's appearance is an established completed event instead of an interview scheduled for a future date.

CHECKED: 66 claims  
CLAIMS DO NOT HOLD
