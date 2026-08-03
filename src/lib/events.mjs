import { coverageRowsFor, mergeCoverageRows } from "./coverage.mjs";

export function eventGroups(records) {
  const groups = new Map();
  for (const record of records) {
    if (!record.event_slug) continue;
    const existing = groups.get(record.event_slug);
    if (existing) {
      existing.records.push(record);
      existing.coverage = mergeCoverageRows([...existing.coverage, ...coverageRowsFor(record)]);
      continue;
    }
    groups.set(record.event_slug, {
      slug: record.event_slug,
      title: record.event_title ?? "Recorded event",
      date: record.event_date,
      records: [record],
      coverage: coverageRowsFor(record),
    });
  }
  for (const group of groups.values()) {
    const dayDates = group.records
      .map((record) => String(record.event_date ?? ""))
      .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))
      .sort();
    if (dayDates.length > 0) group.date = dayDates[0];
  }
  return [...groups.values()].sort((a, b) => String(a.date ?? "").localeCompare(String(b.date ?? "")) || a.title.localeCompare(b.title));
}

export function eventPath(slug) {
  return `/events/${slug}/`;
}

export function warrantedEvents(records) {
  return eventGroups(records).filter((group) => group.records.length > 1 || group.coverage.length > 0);
}
