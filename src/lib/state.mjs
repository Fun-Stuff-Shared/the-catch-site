import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const stateDirectory = join(process.cwd(), "data/state");
const readable = (row) => row && row.accepted !== false && row.refusal == null && row.retire !== true;

export function verifyFigure(view, occurrenceId, value, unit) {
  const occurrence = (view.occurrences ?? []).find((row) => row.id === occurrenceId && readable(row));
  const source = (view.evidence ?? []).find((row) => row.id === occurrence?.evidence_id && readable(row));
  if (!occurrence?.figure || !source || String(occurrence.figure.value) !== String(value) || String(occurrence.figure.unit ?? "") !== String(unit ?? "")) {
    throw new Error(`Figure has no matching accepted occurrence: ${view.event.id}/${occurrenceId}`);
  }
  return occurrence;
}

export function readState(directory = stateDirectory) {
  const events = new Map();
  const chains = new Map();
  for (const name of readdirSync(directory).sort()) {
    if (!/^(event-|chain-).+\.json$/.test(name)) continue;
    const view = JSON.parse(readFileSync(join(directory, name), "utf8"));
    if (name.startsWith("chain-")) {
      if (!view?.root?.id || !Array.isArray(view.events)) throw new Error(`Invalid chain view: ${name}`);
      if (name !== `chain-${view.id}.json`) throw new Error(`Chain filename does not match its id: ${name}`);
      chains.set(view.id, view);
    } else {
      const id = view.event?.id ?? view.id;
      if (!id || name !== `${id}.json`) throw new Error(`Event filename does not match its id: ${name}`);
      if (!["published", "merged", "retired"].includes(view.status)) throw new Error(`Event view has not been adopted: ${name}`);
      if (view.status === "published" && (!readable(view.event) || view.event.status !== "published")) throw new Error(`Event is not published: ${name}`);
      events.set(id, view);
    }
  }
  for (const [id, view] of events) {
    if (view.status === "merged" && !events.has(view.survivor)) throw new Error(`Missing survivor for ${id}`);
    if (view.status === "published" && !chains.has(view.root_id)) throw new Error(`Missing chain for ${id}`);
    if (view.follows && !events.has(view.follows)) throw new Error(`Missing previous story for ${id}`);
    if (view.status === "published") {
      if (!chains.get(view.root_id).events.some((event) => event.id === id)) throw new Error(`Chain omits story: ${id}`);
      for (const slot of Object.values(view.current_state ?? {})) if (slot.figure) verifyFigure(view, slot.occurrence_id, slot.figure.value, slot.figure.unit);
    }
  }
  for (const chain of chains.values()) {
    const rootView = events.get(chain.id);
    const rootEvent = rootView?.event ?? rootView;
    if (!rootEvent || ['label', 'status', 'reason'].some((key) => (chain.root[key] ?? null) !== (rootEvent[key] ?? null))) throw new Error(`Chain root differs from its story view: ${chain.id}`);
    for (const event of chain.events) {
      const view = events.get(event.id);
      if (!view || view.root_id !== chain.id || view.status !== event.status) throw new Error(`Chain member differs from its story view: ${event.id}`);
      const fields = view.status === 'published' ? ['label', 'period', 'follows', 'reason'] : ['label', 'reason'];
      const story = view.event ?? view;
      if (fields.some((key) => (event[key] ?? null) !== (story[key] ?? null))) throw new Error(`Chain story metadata differs: ${event.id}`);
      const slots = new Map(Object.entries(view.current_state ?? {}).map(([id, slot]) => [id, [slot.slot, slot.figure?.value ?? null, slot.figure?.unit ?? null, slot.quote_span ?? null, slot.occurrence_id ?? null]]));
      if ((event.slots ?? []).length !== slots.size || (event.slots ?? []).some((slot) => JSON.stringify(slots.get(slot.slot_id)) !== JSON.stringify([slot.name, slot.value ?? null, slot.unit ?? null, slot.sentence ?? null, slot.occurrence_id ?? null]))) throw new Error(`Chain slot values differ: ${event.id}`);
    }
    for (const track of chain.tracked ?? []) for (const value of track.values) {
      const view = events.get(value.event_id);
      if (!view || !Object.values(view.current_state ?? {}).some((slot) => slot.occurrence_id === value.occurrence_id)) throw new Error(`Chain figure is not a current story value: ${value.event_id}`);
      verifyFigure(view, value.occurrence_id, value.value, value.unit);
    }
  }
  return { events, chains };
}

export function eventPath(id) {
  const seeded = {
    "event-jobs-july-2026": "jobs/july-2026",
    "event-fed-rate-june-2026": "fed-rate/june-2026",
    "event-fed-rate-july-2026": "fed-rate/july-2026",
  };
  return `/events/${seeded[id] ?? encodeURIComponent(id)}/`;
}

export function rankedChains(state) {
  return [...state.chains.values()].sort((a, b) =>
    b.events.filter((event) => event.status === "published").length - a.events.filter((event) => event.status === "published").length ||
    b.outlet_count - a.outlet_count ||
    String(b.last_moved_at ?? "").localeCompare(String(a.last_moved_at ?? "")) || a.id.localeCompare(b.id));
}

export function frontChains(state) {
  return rankedChains(state).filter((chain) => {
    const published = chain.events.filter((event) => event.status === "published").length;
    return published > 0 && (published > 1 || chain.outlet_count > 1);
  });
}

export function deskEvents(state) {
  const desks = new Map();
  for (const view of state.events.values()) {
    if (view.status !== "published") continue;
    const desk = view.desk || "Other reporting";
    if (!desks.has(desk)) desks.set(desk, []);
    desks.get(desk).push(view);
  }
  for (const views of desks.values()) views.sort((a, b) => String(b.event.period ?? "").localeCompare(String(a.event.period ?? "")) || a.event.id.localeCompare(b.event.id));
  return [...desks].sort(([a], [b]) => a.localeCompare(b));
}

export function citedDocuments(state) {
  const documents = new Map();
  for (const view of state.events.values()) {
    if (view.status !== "published") continue;
    const evidence = new Map((view.evidence ?? []).filter(readable).map((row) => [row.id, row]));
    for (const edge of view.edges ?? []) {
      if (!readable(edge) || edge.label !== "cites") continue;
      const row = evidence.get(edge.to_evidence_id);
      if (!row || row.source_kind !== "document") throw new Error(`Citation ${edge.id} has no live document`);
      if (!["primary_record", "reference"].includes(edge.role)) throw new Error(`Citation ${edge.id} has an invalid role`);
      const document = documents.get(row.id) ?? { ...row, citations: [], passages: [] };
      document.citations.push({ event_id: view.event.id, role: edge.role, reason: edge.reason });
      for (const occurrence of view.occurrences ?? []) {
        if (readable(occurrence) && occurrence.evidence_id === row.id && occurrence.quote_span && !document.passages.some((passage) => passage.occurrence_id === occurrence.id)) document.passages.push({ occurrence_id: occurrence.id, event_id: view.event.id, text: occurrence.quote_span });
      }
      documents.set(row.id, document);
    }
  }
  return [...documents.values()].sort((a, b) => a.id.localeCompare(b.id));
}

export function retirementReason(reason) {
  return ({ no_accepted_occurrence: 'No supported facts were recorded.', unfinished_legacy_identity: 'The entry was incomplete.' })[reason] ?? reason;
}

export function slotLabel(name) {
  const label = String(name ?? "").replace(/_/g, " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
}


export function figureText(value, unit = '') {
  const raw = String(value ?? '');
  const number = /^-?\d+(?:\.\d+)?$/.test(raw)
    ? raw.replace(/\d+(?=\.|$)/, (digits) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    : raw;
  const suffix = /^(percent|%)$/i.test(unit) && /(?:%|\bpercent)$/i.test(raw) ? '' : unit;
  return `${number}${suffix ? ` ${suffix}` : ''}`;
}

export function selectPublishedState(state, ids) {
  const selected = new Set(ids);
  const events = new Map();
  for (const id of selected) {
    const source = state.events.get(id);
    if (!source) throw new Error(`Publication manifest names missing event: ${id}`);
    const children = [...selected].filter((child) => child !== id && state.events.get(child)?.status === 'published' && state.events.get(child)?.root_id === id);
    if (source.status === 'retired' && !children.length) throw new Error(`Publication manifest names retired event: ${id}`);
    if (source.status === 'merged' && !selected.has(source.survivor)) throw new Error(`Published redirect has unpublished survivor: ${id}`);
    if (source.root_id && !selected.has(source.root_id)) throw new Error(`Published story has unpublished chain root: ${id}`);
    const follows = selected.has(source.follows) && state.events.get(source.follows)?.status === 'published' ? source.follows : null;
    events.set(id, { ...source, selected_children: source.status === 'retired' ? children.map((child) => state.events.get(child).event) : [], event: source.event ? { ...source.event, follows } : undefined, follows, changed_since_previous: follows ? source.changed_since_previous : [] });
  }
  const chains = new Map();
  for (const [id, chain] of state.chains) {
    if (!selected.has(id)) continue;
    const members = chain.events.filter((event) => selected.has(event.id)).map((event) => ({ ...event, follows: events.get(event.id).follows }));
    const publishers = new Set(members.flatMap((event) => (events.get(event.id).evidence ?? []).filter(readable).map((row) => row.publisher).filter(Boolean)));
    const tracked = chain.tracked.map((track) => ({ ...track, values: track.values.filter((value) => events.get(value.event_id)?.status === 'published') })).filter((track) => track.values.length);
    chains.set(id, { ...chain, events: members, tracked, outlet_count: publishers.size });
  }
  return { events, chains };
}

export function readPublishedState(directory = stateDirectory, manifests = join(process.cwd(), 'checks/manifests')) {
  const ids = new Set();
  for (const name of readdirSync(manifests).filter((name) => name.endsWith('.json'))) {
    const manifest = JSON.parse(readFileSync(join(manifests, name), 'utf8'));
    if (!manifest.state_event_id) continue;
    if (ids.has(manifest.state_event_id)) throw new Error(`Duplicate publication manifest: ${manifest.state_event_id}`);
    const route = manifest.story || `/events/${manifest.event}/`;
    if (route !== eventPath(manifest.state_event_id)) throw new Error(`Publication manifest route differs: ${name}`);
    ids.add(manifest.state_event_id);
  }
  return selectPublishedState(readState(directory), ids);
}

export function eventRecordPath(id, manifests = join(process.cwd(), 'checks/manifests')) {
  for (const name of readdirSync(manifests).filter((name) => name.endsWith('.json'))) {
    const manifest = JSON.parse(readFileSync(join(manifests, name), 'utf8'));
    if (manifest.state_event_id !== id) continue;
    const route = manifest.event_record;
    if (route != null && !/^\/events\/[a-z0-9-]+\/$/.test(route)) throw new Error(`Invalid event record route: ${name}`);
    return route ?? null;
  }
  return null;
}
