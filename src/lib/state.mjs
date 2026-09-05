import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const stateDirectory = fileURLToPath(new URL("../../data/state/", import.meta.url));
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
    for (const event of chain.events) {
      const view = events.get(event.id);
      if (!view || view.root_id !== chain.id || view.status !== event.status) throw new Error(`Chain member differs from its story view: ${event.id}`);
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

export function chainPath(id) {
  return `/chains/${encodeURIComponent(id)}/`;
}

export function rankedChains(state) {
  return [...state.chains.values()].sort((a, b) =>
    b.events.filter((event) => event.status === "published").length - a.events.filter((event) => event.status === "published").length ||
    b.outlet_count - a.outlet_count ||
    String(b.last_moved_at ?? "").localeCompare(String(a.last_moved_at ?? "")) || a.id.localeCompare(b.id));
}

export function frontChains(state) {
  return rankedChains(state).filter((chain) => chain.events.filter((event) => event.status === "published").length > 1 || chain.outlet_count > 1);
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
      const document = documents.get(row.id) ?? { ...row, citations: [] };
      document.citations.push({ event_id: view.event.id, role: edge.role, reason: edge.reason });
      documents.set(row.id, document);
    }
  }
  return [...documents.values()].sort((a, b) => a.id.localeCompare(b.id));
}
