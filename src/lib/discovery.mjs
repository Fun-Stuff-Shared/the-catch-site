import { event as jobs } from '../data/jobs202607.mjs';
import { event as jobsAugust } from '../data/jobs202608.mjs';
import { event as jobsSeptember } from '../data/jobs-2026-10-02-september-payrolls-rise-29000.mjs';
import { event as june } from '../data/fomc20260617.mjs';
import { event as july } from '../data/fomc20260729.mjs';
import { event as septemberFed } from '../data/fed-rate-2026-09-16-unanimous-quarter-point-hike.mjs';
import { event as miamiCargo } from '../data/miamicargocrash202609.mjs';
import { event as missouriHouseMap } from '../data/missourihousemap202609.mjs';
import { event as governmentFunding } from '../data/governmentfunding202609.mjs';
import { event as venezuelaOil } from '../data/venezuelaoil202609.mjs';
import { event as texasSenate } from '../data/texassenate202609.mjs';
import { event as greenland } from '../data/greenland202609.mjs';
import { event as mailVoting } from '../data/mailvoting202609.mjs';
import { event as mailVotingDenial } from '../data/mail-voting-2026-09-14-court-denies-stay.mjs';
import { event as kennedyCenterNotice } from '../data/kennedy-center-2026-09-17-30-day-notice-before-demolition.mjs';
import { event as edSheeranTour } from '../data/ed-sheeran-tour-2026-09-14-macklemore-removed-from-the-loop-tour.mjs';
import { event as fuelReserves } from '../data/fuel-reserves-2026-10-02-g7-releases-100-million-barrels.mjs';
import { event as canadaTariffs } from '../data/canadatariffs202609.mjs';
import { event as spaceWeapons } from '../data/spaceweapons202609.mjs';
import { event as iranWar } from '../data/iran-war-2026-09-15-cbo-estimates-38-billion-war-cost.mjs';
import { event as immigrationDetention } from '../data/immigration-detention-2026-10-01-supreme-court-takes-up-bond-hearings.mjs';
import { event as lisaCookHearing } from '../data/lisa-cook-2026-10-09-trump-orders-hearing-on-cook.mjs';
import { event as okinawaMarine } from '../data/okinawa-2026-10-04-us-marine-arrested-in-killing-of-woman.mjs';
import { event as alaskaCertification } from '../data/election-administration-2026-10-23-doj-sues-to-block-alaska-senate-certification.mjs';
import { event as fbiOfficialsCharged } from '../data/fbi-officials-charged-2026-10-20-two-ex-fbi-officials-charged-with-lying-to-congress.mjs';
import { event as wedgewoodPolls } from '../data/midterm-polls-2026-10-20-wedgewood-polls-admits-fabricating-polls.mjs';
import { event as nhStudentIds } from '../data/new-hampshire-student-ids-2026-10-22-supreme-court-lets-new-hampshire-bar-student-ids.mjs';
import { event as californiaVoterList } from '../data/california-voter-list-2026-10-19-doj-seeks-to-block-20000-california-ballots.mjs';
import { event as ncMailBallots } from '../data/north-carolina-mail-ballots-2026-10-21-north-carolina-rejects-more-mail-ballots.mjs';
import { event as fraudTipProgram } from '../data/fraud-tip-program-2026-10-20-trump-launches-25-million-fraud-tip-program.mjs';
import { publishedState, eventPath, eventRecordPath } from './state.mjs';
import immigration from '../data/officials/marco-rubio/episodes/immigration-2013.json';
import zika from '../data/officials/marco-rubio/episodes/zika-2016.json';

const editorial = new Map([jobs, jobsAugust, jobsSeptember, june, july, septemberFed, miamiCargo, missouriHouseMap, governmentFunding, venezuelaOil, texasSenate, greenland, mailVoting, canadaTariffs, spaceWeapons, iranWar, mailVotingDenial, kennedyCenterNotice, edSheeranTour, fuelReserves, immigrationDetention, okinawaMarine, lisaCookHearing, alaskaCertification, fbiOfficialsCharged, wedgewoodPolls, nhStudentIds, californiaVoterList, ncMailBallots, fraudTipProgram].map(e => [`/events/${e.slug}/`, e]));
export const series = [
  { path: '/events/jobs/', title: 'The job market', topic: 'Economy', keywords: 'jobs employment payrolls unemployment labor', description: 'Monthly jobs reports, the revisions that follow, and what they mean for people working or looking for work.' },
  { path: '/events/fed-rate/', title: 'The federal funds rate', topic: 'Economy', keywords: 'Fed FOMC interest rates monetary policy', description: 'The Federal Reserve’s decisions, the debate behind them, and what happens next.' },
  { path: '/events/miami-cargo-crash/', title: 'The Miami cargo crash', topic: 'Aviation', keywords: 'Miami airport cargo plane 21 Air Amazon runway overrun', description: 'The September 6, 2026, runway overrun at Miami International Airport, the official record, and what coverage got right.' },
  { path: '/events/missouri-house-map/', title: 'The Missouri House map', topic: 'Elections', keywords: 'Missouri redistricting House map referendum Supreme Court', description: "Missouri's Supreme Court ruled that the 2025 U.S. House map never became law. The November 3 House election uses the 2022 districts whether or not voters approve it." },
  { path: '/events/government-funding/', title: 'Government funding', topic: 'Congress', keywords: 'continuing resolution shutdown appropriations Congress House Senate', description: 'The September 2026 stopgap keeps most federal agencies at fiscal year 2026 rates through December 11. The House vote was 370 to 48. The president signed the act the next day as Public Law 119-103.' },
  { path: '/events/venezuela-oil/', title: 'Venezuela oil', topic: 'Energy', keywords: 'Venezuela oil NABEP sanctions Chevron White House', description: 'The August 31, 2026, White House fact sheet named North American Blue Energy Partners, a 35 percent U.S. equity stake, and 100-year rights to 17 Venezuelan fields.' },
  { path: '/events/texas-senate/', title: 'The Texas Senate race', topic: 'Elections', keywords: 'Texas Senate Paxton Talarico MAGA Inc independent expenditure FEC', description: 'MAGA Inc. filed $10 million in independent expenditures for connected TV and digital ads in the Texas U.S. Senate race. The November 3 general election is between Ken Paxton and James Talarico.' },
  { path: '/events/greenland/', title: 'Greenland', topic: 'Europe', keywords: 'Greenland EU von der Leyen Nuuk Global Gateway Denmark Nielsen Frederiksen', description: 'On September 7, 2026, the European Commission named a €200 million Global Gateway package for Greenland and signed a joint declaration with Greenland and Denmark. The declaration says it creates no legal or financial obligations.' },
  { path: '/events/midterm-polls/', title: 'Midterm polls', topic: 'Elections', keywords: 'polls polling Wedgewood fake fabricated FiftyPlusOne Silver Bulletin Decision Desk forecast Kalshi McMorrow', description: 'The polls of the 2026 midterms and the people who check them, starting with Wedgewood Polls, which admitted on October 20 that most of the polls it published since June were made up.' },
  { path: '/events/new-hampshire-student-ids/', title: 'New Hampshire student IDs', topic: 'Elections', keywords: 'New Hampshire student ID voter ID Supreme Court Purcell Scanlan HB 323 registration polls', description: 'On October 22 the Supreme Court let New Hampshire forbid student IDs at the polls, even as backup proof, without ruling on the state\'s law.' },
  { path: '/events/california-voter-list/', title: 'California\'s voter list', topic: 'Elections', keywords: 'California noncitizen voters voter rolls Justice Department ballots Essayli Ninth Circuit Los Angeles County registrar', description: 'The Justice Department has asked a federal appeals court to make California set aside the mail ballots of about 20,000 voters it calls likely noncitizens, before the trial judge rules.' },
  { path: '/events/north-carolina-mail-ballots/', title: 'North Carolina mail ballots', topic: 'Elections', keywords: 'North Carolina mail ballots absentee rejected spoiled inner envelope seal State Board of Elections Stein Schroeder Common Cause rejection rate', description: 'Since Sept. 4 North Carolina spoils any mail ballot whose inner envelope arrives unsealed. The State Board puts the rejection rate at 3.1%, against 2.6% at the same point in 2022, not double as Gov. Josh Stein says.' },
  { path: '/events/mail-voting/', title: 'Mail voting', topic: 'Elections', keywords: 'mail voting Postal Service Supreme Court Talwani executive order 14399 ballot', description: 'On September 14, 2026, the Supreme Court denied a stay of a federal judge\'s injunction of Postal Service mail-ballot rules. The injunction covers elections on or before November 3.' },
  { path: '/events/canada-tariffs/', title: 'Canada tariffs', topic: 'Trade', keywords: 'Canada tariffs Carney Champagne Section 338 countermeasure surtax CBSA', description: 'Canada\'s counter-tariffs on C$27.6 billion (about US$20 billion) of U.S. goods took effect September 8, 17 days after the U.S. 50 percent Section 338 duties took effect.' },
  { path: '/events/space-weapons/', title: 'Space weapons', topic: 'Defense', keywords: 'space weapons on-orbit Space Force Meink Schiess Outer Space Treaty Golden Dome', description: 'On September 14, 2026, Air Force Secretary Troy Meink said the United States has on-orbit space control weapons. The Space Force chief said the next day that Guardians already operate them.' },
  { path: '/events/iran-war/', title: 'Iran war cost', topic: 'Congress', keywords: 'Iran war CBO Congressional Budget Office Epic Fury Boyle Hegseth munitions inflation', description: 'CBO\'s September 15 letter puts the Pentagon\'s incremental cost of the Iran war at $38.1 billion through August 1. Another month would add $2 billion or $3 billion.' },
  { path: '/events/kennedy-center/', title: 'Kennedy Center', topic: 'Courts', keywords: 'Kennedy Center demolition renovation Cooper Beatty preservation court', description: 'The court record behind the September 17 advance-notice order for covered changes to the Kennedy Center project plans.' },
  { path: '/events/ed-sheeran-tour/', title: "Ed Sheeran's Loop Tour", topic: 'Music', keywords: 'Ed Sheeran Macklemore Loop Tour Finneas Aaron Rowe Lukas Graham Beoga', description: "Macklemore's removal from the 2026 Loop Tour lineup, the supporting acts who withdrew, and the remaining North American schedule." },
  { path: '/events/fuel-reserves/', title: 'Fuel reserves', topic: 'Energy', keywords: 'G7 diesel crude oil reserves IEA Strategic Petroleum Reserve export', description: 'The G7\'s 100 million barrels of emergency oil and the March pledge they come from: why diesel is short, who has not delivered, and Washington\'s push on Europe.' },
  { path: '/events/immigration-detention/', title: 'Immigration detention', topic: 'Courts', keywords: 'immigration detention bond hearing Supreme Court mandatory detention', description: 'For three decades immigrants who entered without inspection could ask for release on bond. In July 2025 the Trump administration said the law forbids it, nine federal appeals courts have said it does not, and on October 1 the Supreme Court took the case.' },
  { path: '/events/lisa-cook/', title: 'Lisa Cook and the Fed', topic: 'Courts', keywords: 'Lisa Cook Federal Reserve governor Trump removal for cause mortgage Supreme Court committee of inquiry Hassett Pulte', description: 'Trump has tried twice to remove Fed Governor Lisa Cook over 2021 mortgage allegations she denies. The Supreme Court kept her in office in June; a White House committee hears her case on November 5.' },
  { path: '/events/election-administration/', title: 'Election administration', topic: 'Elections', keywords: 'Alaska Senate Sullivan Peltola certification Justice Department ranked choice NVRA lawsuit', description: 'Federal actions on how the 2026 midterms are run and certified, starting with the Justice Department\'s suit to stop Alaska certifying its Senate result if Sen. Dan Sullivan loses and would have won with every vote for a second Dan Sullivan.' },
  { path: '/events/okinawa/', title: 'Okinawa', topic: 'Asia', keywords: 'Okinawa Marine Naha Ballard SOFA status of forces agreement curfew Koja Takaichi', description: 'Japan holds a U.S. Marine arrested on October 4 in the killing of Anna Yagi in Naha. Okinawa says U.S. discipline measures have failed and the status of forces agreement must change; Washington says the agreement is working.' },
  { path: '/events/fbi-officials-charged/', title: 'FBI officials charged', topic: 'Courts', keywords: 'FBI Floris Benavides Foreign Influence Task Force Hunter Biden laptop false statements Congress House Judiciary Pirro Faruqui Round River', description: 'Two former leaders of the FBI\'s Foreign Influence Task Force are charged with lying to House Judiciary Committee staff in 2023 about their part in the FBI\'s Hunter Biden investigations. A probable-cause hearing is set for October 27.' },
  { path: '/events/fraud-tip-program/', title: 'Fraud tip program', topic: 'Justice', keywords: 'fraud whistleblower WHIP tip reward Justice Department Treasury Vance Nick Shirley Minnesota Feeding Our Future 1 percent commission False Claims Act', description: 'The Justice Department\'s $25 million program offers $10,000 to $30,000 when a tip about health care or benefits fraud leads to criminal charges. President Trump described it as 1% of recovered money with no limit, decided by him.' },
];
export function storyCatalog() {
  const state = publishedState();
  // Hand-authored stories whose projection view has not arrived yet still publish on their manifest.
  const pending = [...editorial.values()].filter(e => ![...state.events.values()].some(v => eventPath(v.event.id) === `/events/${e.slug}/`)).map(e => {
    const href = `/events/${e.slug}/`, group = series.find(s => href.startsWith(s.path));
    return { href, title: e.title, summary: e.dek, date: e.date, updated: e.updated, topic: group?.topic ?? 'Reporting', series: group?.path, visual: e.visual, keywords: `${group?.title ?? ''} ${group?.keywords ?? ''}` };
  });
  const events = [...state.events.values()].filter(v => v.status === 'published').map(v => {
    const href = eventPath(v.event.id), copy = editorial.get(href);
    const group = series.find(s => s.path === eventRecordPath(v.event.id));
    return { href, title: v.event.label, summary: copy?.dek ?? '', date: copy?.date ?? v.event.period, updated: copy?.updated, topic: group?.topic ?? v.desk ?? 'Reporting', series: group?.path, visual: copy?.visual, keywords: `${group?.title ?? ''} ${group?.keywords ?? ''}` };
  });
  const people = [zika, immigration].map(e => ({ href: `/officials/marco-rubio/${e.slug}/`, title: e.title, summary: e.dek, date: e.statements[0]?.date, topic: e.slug === 'zika-2016' ? 'Health' : 'Politics', series: '/officials/marco-rubio/', keywords: `Marco Rubio ${e.kicker}` }));
  return [...pending, ...events, ...people].sort((a,b) => String(b.date).localeCompare(String(a.date)) || a.href.localeCompare(b.href));
}
