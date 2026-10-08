// Every date and count here is printed on an admitted record.
// Crime counts: okinawa-police-usmil-crime-2025 and -2024 (cases, people), okinawa-pref-base-stats-2026-04 (1972-2025 totals, 2003).
// Base land and facilities: okinawa-pref-base-stats-2025-07 ("全国に占める本県の比率： 40.8% 70.3%"; "沖 縄 ： 31施設").
// Custody limit: moj-criminal-justice-faq ("is 23 days in any single crime").
// Pause and curfew: watson-memo-2026-10-06.

export const event = {
  slug: "okinawa/2026-10-04-us-marine-arrested-in-killing-of-woman",
  title: "Japan holds a U.S. Marine in the killing of an Okinawa woman, and Okinawa says U.S. discipline measures have failed",
  dek: "Japanese police arrested Lance Cpl. Devin Ballard off base, so Japan holds him. The U.S. ordered a pause and a curfew, and its commander on Okinawa offered condolences but no apology. Prosecutors can hold him for at most 23 days on this charge before deciding whether to indict him.",
  name: "Marine arrested in Naha killing",
  date: "2026-10-04",
  updated: "2026-10-08",
  kpis: [],
  visual: {
    kind: "timeline",
    title: "From the hotel to the curfew",
    entries: [
      { date: "Oct. 3", title: "Anna Yagi found dead in a Naha hotel" },
      { date: "Oct. 4", title: "Ballard arrested in Okinawa City" },
      { date: "Oct. 5", title: "Case sent to prosecutors" },
      { date: "Oct. 6", title: "U.S. orders a pause and a curfew", current: true },
    ],
  },
};

export const figures = {
  maxDaysToCharge: 23,
  pauseHours: 48,
  curfewDays: 30,
  officers: 197,
  cases2025: 101,
  people2025: 80,
  cases2024: 73,
  people2024: 80,
  casesSince1972: "6,409",
  peopleSince1972: "6,285",
  landShare: "70.3",
  facilityShare: "40.8",
  facilitiesOkinawa: 31,
  facilitiesJapan: 76,
  custodyRequests: 6,
  custodyGranted: 5,
};

export const chronology = {
  rows: [
    ["1945 to 1972", "The U.S. governs Okinawa from the end of World War II."],
    ["1960", "The status of forces agreement: Japan tries off-duty crimes, but a suspect the U.S. holds stays with the U.S. until Japan charges him."],
    ["1995", "Three U.S. servicemen rape a 12-year-old girl. The U.S. agrees to consider early handover in murder and rape cases."],
    ["2003", "Okinawa begins a nationwide campaign to revise the agreement; Japan's governors call for a fundamental revision."],
    ["Oct. 2012", "After an alleged assault, the U.S. commander in Japan apologizes in a statement and orders a curfew for every service member in Japan."],
    ["2016", "Rina Shimabukuro is killed by a former Marine working on base. A monthlong curfew and alcohol ban follow."],
    ["Jan. 2017", "Japan and the U.S. clarify which civilians count as part of U.S. forces under the agreement."],
    ["2024", "Sexual-assault cases surface that were never reported to the prefecture. Tokyo starts a new system for sharing information on such cases; the U.S. adds patrols and closes off-base bars to service members from 1 to 5 a.m."],
    ["Apr. 2025", "Joint U.S.-Japanese patrols begin on Gate 2 Street in Okinawa City."],
    ["2025", "Okinawa police clear 101 cases involving U.S. forces, the most since 2003."],
    ["Sept. 13, 2026", "Genta Koja is elected governor with ruling-party backing."],
    ["Oct. 3 to 7, 2026", "This case: the killing, the arrest, the protests, the U.S. pause and curfew, Koja's meeting with Takaichi."],
  ],
};

export const counts = {
  rows: [
    ["\"exceeded 100\" arrests in 2025", "AP's first story; CBS", "101 criminal cases, involving 80 people"],
    ["\"6,409 arrests\" since 1972", "BBC", "6,409 cases in Okinawa, involving 6,285 people, 1972 to 2025"],
    ["\"about 6,000\" service members arrested \"in Japan\"", "Al Jazeera, citing the Yomiuri", "6,285 people in Okinawa, including civilian employees and family members"],
  ],
};
