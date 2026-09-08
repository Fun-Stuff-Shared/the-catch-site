const samples = [
  ['Economy', 'Hiring slows as employers wait for clearer signals', 'The headline jobs number tells only part of the story. Hours worked, wages, and revisions point in different directions.'],
  ['Technology', 'The chip funding deadline puts promised jobs under scrutiny', 'A new round of disclosures would show how much of the promised investment has reached construction sites.'],
  ['World', 'A ceasefire proposal leaves the hardest questions unanswered', 'The published terms cover the first phase. The timetable for the next phase remains open.'],
  ['Health', 'Local clinics face a gap between approved funding and arriving funds', 'The budget includes the money. The payment schedule shows why some clinics are still planning cuts.'],
  ['Politics', 'A senator’s new position meets a decade of recorded votes', 'We compare the latest statement with the bills, amendments, and votes that came before it.'],
  ['Economy', 'Rent keeps household budgets under pressure as other prices ease', 'The national inflation measure and the costs facing a new tenant describe different experiences.'],
  ['Technology', 'An appeals court pauses the new data-transfer restrictions', 'The order temporarily changes the deadline. It does not settle the underlying dispute.'],
  ['World', 'A trade agreement’s published text narrows an earlier promise', 'The announcement described broad relief. The agreement lists exceptions that matter for several industries.'],
  ['Health', 'The heat alert arrives before emergency funding reaches shelters', 'Local plans describe where residents can go. The funding documents show which facilities can stay open overnight.'],
  ['Politics', 'School districts weigh cuts as temporary funding ends', 'The grants were time-limited. District budgets show what was added and what remains funded.'],
  ['Economy', 'Lower borrowing costs have yet to reach many small businesses', 'Published rates have fallen, while lending surveys describe tighter conditions for new applicants.'],
  ['Technology', 'A safety investigation changes what is known about the aircraft failure', 'The investigators distinguish the damaged part from the sequence of events that caused it.'],
  ['World', 'An aid shipment clears the border, with distribution still unresolved', 'Arrival records establish what entered. They do not establish how much has reached its intended recipients.'],
  ['Health', 'A new clinical trial tests a narrower claim than the announcement suggests', 'The study measures one outcome in a specific patient group. Those limits shape what its results can tell us.'],
  ['Politics', 'A public promise returns in the final spending bill', 'We follow the proposal from the first announcement through amendments to the enacted text.'],
];
export const designStories = samples.map(([topic, title, summary], index) => ({
  href: `/design/story-${index + 1}/`, title, summary, topic, synthetic: true,
  date: new Date(Date.UTC(2026, 8, 7 - index)).toISOString().slice(0, 10),
  keywords: topic,
}));
