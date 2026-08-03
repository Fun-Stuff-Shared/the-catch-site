export function splitHeadline(headline) {
  const match = /^(.*\S)\s\(([^()]+)\)$/.exec(String(headline ?? ""));
  return match ? { base: match[1], docLabel: match[2] } : { base: String(headline ?? ""), docLabel: null };
}

export function collapseByHeadline(records) {
  const items = [];
  const groups = new Map();
  for (const record of records) {
    const headline = record.reader_headline ?? record.matter_title ?? "";
    const { base } = splitHeadline(headline);
    const key = `${record.event_slug ?? ""}::${base}`;
    const existing = groups.get(key);
    if (existing) {
      existing.records.push(record);
      continue;
    }
    const group = { base, records: [record] };
    groups.set(key, group);
    items.push(group);
  }
  return items;
}
