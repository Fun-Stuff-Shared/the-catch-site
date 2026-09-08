import { event as jobs } from '../data/jobs202607.mjs';
import { event as jobsAugust } from '../data/jobs202608.mjs';
import { event as june } from '../data/fomc20260617.mjs';
import { event as july } from '../data/fomc20260729.mjs';
import { event as miamiCargo } from '../data/miamicargocrash202609.mjs';
import { event as missouriHouseMap } from '../data/missourihousemap202609.mjs';
import { readPublishedState, eventPath, eventRecordPath } from './state.mjs';
import immigration from '../data/officials/marco-rubio/episodes/immigration-2013.json';
import zika from '../data/officials/marco-rubio/episodes/zika-2016.json';

const editorial = new Map([jobs, jobsAugust, june, july, miamiCargo, missouriHouseMap].map(e => [`/events/${e.slug}/`, e]));
export const series = [
  { path: '/events/jobs/', title: 'The job market', topic: 'Economy', keywords: 'jobs employment payrolls unemployment labor', description: 'Monthly jobs reports, the revisions that follow, and what they mean for people working or looking for work.' },
  { path: '/events/fed-rate/', title: 'The federal funds rate', topic: 'Economy', keywords: 'Fed FOMC interest rates monetary policy', description: 'The Federal Reserve’s decisions, the debate behind them, and what happens next.' },
  { path: '/events/miami-cargo-crash/', title: 'The Miami cargo crash', topic: 'Aviation', keywords: 'Miami airport cargo plane 21 Air Amazon runway overrun', description: 'The September 6, 2026, runway overrun at Miami International Airport, the official record, and what coverage got right.' },
  { path: '/events/missouri-house-map/', title: 'The Missouri House map', topic: 'Elections', keywords: 'Missouri redistricting House map referendum Supreme Court', description: "Missouri's Supreme Court ruled that the 2025 U.S. House map never became law. The November 3 House election uses the 2022 districts whether or not voters approve it." },
];
export function storyCatalog() {
  const state = readPublishedState();
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
