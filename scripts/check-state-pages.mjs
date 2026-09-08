import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';
import { eventPath, eventRecordPath, verifyFigure, figureText, retirementReason } from '../src/lib/state.mjs';

const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
const normalize = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
function* nodes(node) { yield node; for (const child of node.childNodes ?? []) yield* nodes(child); }

export function checkTimeline(html, timeline = {}) {
  if (timeline.changes_checked_at != null) {
    const day = String(timeline.changes_checked_at).slice(0, 10);
    const parsed = new Date(`${day}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== day) throw new Error('Revision check date is invalid');
  }
  const all = [...nodes(parse(html))];
  const sections = all.filter((node) => (attr(node, 'class') ?? '').split(/\s+/).includes('revision-timeline'));
  if (sections.length !== 1) throw new Error('Revision evidence section is missing or duplicated');
  const section = sections[0];
  const descendants = [...nodes(section)];
  const marked = (name) => descendants.filter((node) => attr(node, name) !== undefined);
  const confirmations = timeline.confirmations ?? [];
  const rendered = marked('data-revision-confirmation');
  if (rendered.length !== confirmations.length) throw new Error('Rendered confirmation count differs');
  for (const [index, row] of confirmations.entries()) {
    const node = rendered[index];
    if (!normalize(text(node)).includes(normalize(row.sentence))) throw new Error('Rendered confirmation sentence differs');
    const quotes = [...nodes(node)].filter((child) => attr(child, 'data-revision-quote') !== undefined);
    if (quotes.length !== (row.quotes ?? []).length) throw new Error('Rendered quote count differs');
    for (const [q, quote] of (row.quotes ?? []).entries()) {
      if (!normalize(text(quotes[q])).includes(normalize(quote.text))) throw new Error('Rendered quote text differs');
      const links = new Set([...nodes(quotes[q])].map((child) => attr(child, 'href')).filter(Boolean));
      if ((quote.reports ?? []).some((report) => !links.has(report.url))) throw new Error('Rendered quote source differs');
    }
    const links = new Set([...nodes(node)].map((child) => attr(child, 'href')).filter(Boolean));
    if ((row.reports ?? []).some((report) => !links.has(report.url))) throw new Error('Rendered confirmation source differs');
  }
  if (marked('data-revision-no-confirmations').length !== Number(confirmations.length === 0)) throw new Error('Missing-confirmation text differs');
  const changes = timeline.changes ?? [];
  const empty = marked('data-revision-no-changes');
  if (empty.length !== Number(changes.length === 0)) throw new Error('No-change text differs');
  if (!changes.length) {
    const checked = timeline.changes_checked_at?.slice(0, 10);
    const expected = `No changes are recorded in this view. ${checked ? `Changes last checked ${checked}.` : "The first check of this story's sources has not run yet."}`;
    if (normalize(text(empty[0])) !== expected) throw new Error('No-change check date differs');
  }
  const expectedUrls = new Set([...confirmations.flatMap((row) => [...(row.reports ?? []), ...(row.quotes ?? []).flatMap((quote) => quote.reports ?? [])].map((report) => report.url)), ...changes.flatMap((row) => [row.earlier_evidence_url, row.later_evidence_url])]);
  const actualUrls = new Set(descendants.map((node) => attr(node, 'href')).filter(Boolean));
  if (actualUrls.size !== expectedUrls.size || [...actualUrls].some((url) => !expectedUrls.has(url))) throw new Error('Revision evidence links differ');
  for (const url of actualUrls) if (new URL(url).pathname === '/') throw new Error('Revision evidence links to a publisher homepage');
}

export function checkPageFigures(html, state, eventId) {
  const figures = [...nodes(parse(html))].filter((node) => attr(node, 'data-state-figure') !== undefined);
  for (const node of figures) {
    const id = attr(node, 'data-state-figure-event') || eventId;
    const view = state.events.get(id);
    if (!view || view.status !== 'published') throw new Error(`Displayed figure references an unpublished story: ${id}`);
    const value = attr(node, 'data-figure-value');
    const unit = attr(node, 'data-figure-unit');
    if (value === undefined || unit === undefined) throw new Error(`Displayed figure lacks value or unit: ${id}`);
    verifyFigure(view, attr(node, 'data-state-figure'), value, unit);
    if (normalize(text(node)) !== normalize(figureText(value, unit))) throw new Error(`Visible figure differs from its accepted value: ${id}`);
  }
  return figures;
}

export function checkStatePages(state, dist) {
  const failures = [], checked = [];
  const read = (route) => {
    const path = join(dist, route, 'index.html');
    if (!existsSync(path)) throw new Error(`Generated page missing: ${route}`);
    return readFileSync(path, 'utf8');
  };
  const heading = (html) => [...nodes(parse(html))].find((node) => node.tagName === 'h1');
  for (const [id, view] of state.events) {
    try {
      const html = read(eventPath(id));
      if (view.status === 'merged') {
        const redirects = [...nodes(parse(html))].filter((node) => node.tagName === 'meta' && attr(node, 'http-equiv')?.toLowerCase() === 'refresh');
        if (!redirects.some((node) => attr(node, 'content')?.includes(eventPath(view.survivor)))) throw new Error(`Merge redirect missing: ${id}`);
        continue;
      }
      if (normalize(text(heading(html) ?? {})) !== normalize((view.event ?? view).label)) throw new Error(`Rendered story label differs: ${id}`);
      if (view.status === 'retired') {
        const stub = [...nodes(parse(html))].find((node) => attr(node, 'data-retired-root') !== undefined);
        if (!stub || !normalize(text(stub)).includes(normalize(retirementReason(view.reason)))) throw new Error(`Retired root reason missing: ${id}`);
        const links = new Set([...nodes(stub)].map((node) => attr(node, 'href')).filter(Boolean));
        if (!(view.selected_children ?? []).length || view.selected_children.some((child) => !links.has(eventPath(child.id)))) throw new Error(`Retired root child links missing: ${id}`);
        if ([...nodes(parse(html))].some((node) => attr(node, 'data-state-figure') !== undefined)) throw new Error(`Retired root contains figures: ${id}`);
        continue;
      }
      checkTimeline(html, view.revision_timeline);
      const figures = checkPageFigures(html, state, id);
      const current = figures.filter((node) => attr(node, 'data-state-figure-role') === 'current').map((node) => attr(node, 'data-state-figure')).sort();
      const expected = Object.values(view.current_state ?? {}).filter((slot) => slot.figure).map((slot) => slot.occurrence_id).sort();
      if (JSON.stringify(current) !== JSON.stringify(expected)) throw new Error(`Rendered current figure coverage differs: ${id}`);
      const transitions = [...nodes(parse(html))].filter((node) => attr(node, 'data-state-transition') !== undefined);
      const expectedTransitions = view.revision_timeline?.changes ?? [];
      if (transitions.length !== expectedTransitions.length || expectedTransitions.some((row, index) => !normalize(text(transitions[index])).includes(normalize(row.sentence)))) throw new Error(`Rendered transitions differ: ${id}`);
      const links = new Set([...nodes(parse(html))].map((node) => attr(node, 'href')).filter(Boolean));
      for (const [index, row] of expectedTransitions.entries()) {
        const sources = new Set([...nodes(transitions[index])].map((node) => attr(node, 'href')).filter(Boolean));
        for (const url of [row.earlier_evidence_url, row.later_evidence_url]) if (!sources.has(url)) throw new Error(`Transition source is not linked in its row: ${id}`);
      }
      for (const edge of view.edges ?? []) if (edge.label === 'cites' && edge.accepted !== false && edge.refusal == null && !edge.retire) {
        const route = `/records/${edge.to_evidence_id}/`;
        if (!links.has(route)) throw new Error(`Cited record link missing: ${id}`);
        read(route);
      }
      checked.push({id, figures: figures.length, transitions: transitions.length});
    } catch (error) { failures.push(error.message); }
  }
  const recordPaths = new Set([...state.events.keys()].map((id) => eventRecordPath(id)).filter(Boolean));
  for (const record of recordPaths) {
    try {
      const html = read(record);
      const stories = [...state.events.values()].filter((view) => view.status === 'published' && eventRecordPath(view.event.id) === record);
      const roots = new Set(stories.map((view) => view.root_id));
      if (roots.size !== 1) throw new Error(`Event record series is disconnected: ${record}`);
      const chain = state.chains.get(stories[0].root_id);
      const section = [...nodes(parse(html))].find((node) => attr(node, 'data-event-record') === record);
      if (!section || attr(section, 'data-series-root') !== chain.id) throw new Error(`Event record series differs: ${record}`);
      const links = new Set([...nodes(section)].map((node) => attr(node, 'href')).filter(Boolean));
      if (stories.some((view) => !links.has(eventPath(view.event.id)))) throw new Error(`Event record omits a selected story: ${record}`);
      const ids = new Set(stories.map((view) => view.event.id));
      const expected = chain.tracked.map((track) => track.values.filter((value) => ids.has(value.event_id))).filter((values) => values.length > 1).flatMap((values) => values.map((value) => `${value.event_id}/${value.occurrence_id}`)).sort();
      const actual = checkPageFigures(html, state).map((node) => `${attr(node, 'data-state-figure-event')}/${attr(node, 'data-state-figure')}`).sort();
      if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Event record tracked figures differ: ${record}`);
    } catch (error) { failures.push(error.message); }
  }
  return { failures, checked };
}

export function readerCopy(html) {
  function copy(node) {
    if (['head', 'script', 'style'].includes(node.tagName) || attr(node, 'data-source-copy') !== undefined) return '';
    if (node.nodeName === '#text') return node.value;
    return (node.childNodes ?? []).map(copy).join(' ');
  }
  return normalize(copy(parse(html)));
}

export function checkAuthoredSections(html, sections) {
  if (!Array.isArray(sections) || !sections.length) throw new Error('Authored section inventory is missing');
  const all = [...nodes(parse(html))];
  const main = all.find((node) => node.tagName === 'main' && (attr(node, 'class') ?? '').split(/\s+/).includes('story'));
  if (!main) throw new Error('Authored story body is missing');
  const body = [...nodes(main)];
  for (const id of sections) {
    const section = body.find((node) => node.tagName === 'section' && attr(node, 'id') === id);
    if (!section || ![...nodes(section)].some((node) => ['p', 'li', 'blockquote'].includes(node.tagName) && normalize(text(node)))) throw new Error(`Authored section is missing or empty: ${id}`);
  }
}
