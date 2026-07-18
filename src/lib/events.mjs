export function eventGroups(records) {
  const groups = new Map();
  for (const record of records) {
    if (!record.event_slug) continue;
    const existing = groups.get(record.event_slug);
    if (existing) {
      existing.records.push(record);
      continue;
    }
    groups.set(record.event_slug, {
      slug: record.event_slug,
      title: record.event_title ?? "Recorded event",
      date: record.event_date,
      records: [record],
      coverage: Array.isArray(record.coverage) ? record.coverage : [],
    });
  }
  return [...groups.values()].sort((a, b) => String(a.date ?? "").localeCompare(String(b.date ?? "")) || a.title.localeCompare(b.title));
}

export function eventPath(slug) {
  return `/events/${slug}/`;
}
