import { n } from "../midterms-2026-2026-11-03-why-voters-turned-on-republicans.mjs";

export const subject = {
  title: "The 2026 midterms",
  dek: `What the 2026 midterm results show and what voters said. In the largest survey of voters, ${n.corruption}% called government corruption crucial to their vote for Congress and ${n.iran}% said the same of the Iran war.`,
  current: [
    { label: "Voters who called government corruption crucial, Voter Poll", value: n.corruption, unit: "%", as_of: "2026-11-04", record_id: "voter-poll-national-house", source_value: n.corruption, source_unit: "%", source_sentence: "Yes: 55%  [Democrats 63 / Republicans 35]" },
    { label: "S&P 500 fall on Nov. 5, two days after the vote", value: 4.4, unit: "%", as_of: "2026-11-05", record_id: "ap-indexes-2026-11-05", source_value: 4.4, source_unit: "%", source_sentence: "The S&P 500 fell 334.89 points, or 4.4%, to 7,353.73." },
    { label: "Voters who called the Iran war crucial, Voter Poll", value: n.iran, unit: "%", as_of: "2026-11-04", record_id: "voter-poll-national-house", source_value: n.iran, source_unit: "%", source_sentence: "Yes: 34%  [Democrats 72 / Republicans 26]" },
  ],
};
