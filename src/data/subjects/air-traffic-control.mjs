export const subject = {
  title: "Air traffic control",
  dek: "The FAA's air traffic control system and the network that connects it, starting with the nationwide ground stop of November 13, 2026, when a router at one site, officials say, flooded that network, and flights were held for more than four hours.",
  current: [
    { label: "Nationwide ground stop, Nov. 13", value: "4 hr 23 min", unit: "", as_of: "2026-11-14", record_id: "atcscc-advzy-005-2026-11-14", source_value: "14/0116", source_unit: "UTC cancellation time", source_sentence: "THE FAA COMMAND CENTER NATIONWIDE GROUND STOP HAS BEEN CANCELLED." },
    { label: "Flights in the air when it began", value: "4,042", unit: "flights", as_of: "2026-11-13", record_id: "flightradar24-x-2026-11-13", source_value: "4,042", source_unit: "flights", source_sentence: "At the time, 4,042 flights destined for US airports were already airborne." },
    { label: "FAA sites on the network", value: "4,400+", unit: "sites", as_of: "2006-04-27", record_id: "oig-fti-2006-04-27", source_value: "4,400", source_unit: "FAA sites", source_sentence: "4,400 FAA sites." },
  ],
};

// How the series is listed on the homepage and /events/; lower rank lists first.
export const listing = {
  title: "Air traffic control",
  topic: "Aviation",
  keywords: "FAA ground stop air traffic control outage telecommunications FTI L3Harris switches routers Duffy Mullin SMART FENS",
  description: "The FAA network that connects air traffic control, starting with the November 13, 2026, nationwide ground stop, which officials first blamed on old switches and now trace to a contractor's job at one site; departures were held for more than four hours.",
  rank: 4,
};
