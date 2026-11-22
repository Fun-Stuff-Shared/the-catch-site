import { publishedState, eventPath, eventRecordPath } from './state.mjs';
import immigration from '../data/officials/marco-rubio/episodes/immigration-2013.json';
import zika from '../data/officials/marco-rubio/episodes/zika-2016.json';

const editorial = new Map(Object.values(import.meta.glob('../data/*.mjs', { eager: true })).map(m => m.event).filter(Boolean).map(e => [`/events/${e.slug}/`, e]));
export const series = Object.entries(import.meta.glob('../data/subjects/*.mjs', { eager: true }))
  .map(([file, m]) => [file, m.listing]).filter(([, listing]) => listing)
  .map(([file, { rank, ...listing }]) => ({ path: `/events/${file.match(/([^/]+)\.mjs$/)[1]}/`, rank, ...listing }))
  .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity) || a.title.localeCompare(b.title));
export function storyCatalog() {
  const state = publishedState();
  // Hand-authored stories whose projection view has not arrived yet still publish on their manifest.
  const pending = [...editorial.values()].filter(e => ![...state.events.values()].some(v => eventPath(v.event.id) === `/events/${e.slug}/`)).map(e => {
    const href = `/events/${e.slug}/`, group = series.find(s => href.startsWith(s.path));
    return { href, title: e.title, summary: e.dek, date: e.date, updated: e.updated, topic: group?.topic ?? 'Reporting', series: group?.path, visual: e.visual, keywords: `${group?.title ?? ''} ${group?.keywords ?? ''}` };
  });
  const events = [...state.events.values()].filter(v => v.status === 'published').map(v => {
    const href = eventPath(v.event.id), copy = editorial.get(href);
    const recordPath = eventRecordPath(v.event.id);
    const group = series.find(s => s.path === recordPath);
    return { href, title: v.event.label, summary: copy?.dek ?? '', date: copy?.date ?? v.event.period, updated: copy?.updated, topic: group?.topic ?? v.desk ?? 'Reporting', series: group?.path, visual: copy?.visual, keywords: `${group?.title ?? ''} ${group?.keywords ?? ''}` };
  });
  const people = [zika, immigration].map(e => ({ href: `/officials/marco-rubio/${e.slug}/`, title: e.title, summary: e.dek, date: e.statements[0]?.date, topic: e.slug === 'zika-2016' ? 'Health' : 'Politics', series: '/officials/marco-rubio/', keywords: `Marco Rubio ${e.kicker}` }));
  return [...pending, ...events, ...people].sort((a,b) => String(b.date).localeCompare(String(a.date)) || a.href.localeCompare(b.href));
}
