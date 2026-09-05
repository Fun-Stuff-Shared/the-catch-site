import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';
import { eventPath, chainPath, verifyFigure } from '../src/lib/state.mjs';

const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
const normalize = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
function* nodes(node) { yield node; for (const child of node.childNodes ?? []) yield* nodes(child); }

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
    if (normalize(text(node)) !== normalize(`${value} ${unit}`)) throw new Error(`Visible figure differs from its accepted value: ${id}`);
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
      if (view.status === 'retired') continue;
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
  for (const [id, chain] of state.chains) {
    try {
      const html = read(chainPath(id));
      if (normalize(text(heading(html) ?? {})) !== normalize(chain.root.label)) throw new Error(`Rendered chain label differs: ${id}`);
      const actual = checkPageFigures(html, state).map((node) => `${attr(node, 'data-state-figure-event')}/${attr(node, 'data-state-figure')}`).sort();
      const expected = chain.tracked.flatMap((track) => track.values.map((value) => `${value.event_id}/${value.occurrence_id}`)).sort();
      if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Rendered chain figures differ: ${id}`);
    } catch (error) { failures.push(error.message); }
  }
  return { failures, checked };
}
