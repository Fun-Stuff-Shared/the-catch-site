const UNRESOLVED_STATUS = "date_unresolved_from_records";

export function occurrenceFor(record) {
  const occurrence = record.occurrence_time ?? {};
  const start = occurrence.start;
  if (occurrence.status === UNRESOLVED_STATUS || typeof start !== "string") {
    return { kind: "unresolved", status: UNRESOLVED_STATUS };
  }
  if (/^\d{4}$/.test(start)) {
    return { kind: "year", year: start };
  }
  if (/^\d{4}-(0[1-9]|1[0-2])$/.test(start)) {
    return { kind: "month", year: start.slice(0, 4), month: start.slice(5, 7) };
  }
  if (/^\d{4}-(0[1-9]|1[0-2])-\d{2}$/.test(start)) {
    const date = new Date(`${start}T00:00:00Z`);
    if (date.toISOString().slice(0, 10) === start) {
      return { kind: "day", date: start, year: start.slice(0, 4), month: start.slice(5, 7), day: start.slice(8, 10) };
    }
  }
  return { kind: "unresolved", status: UNRESOLVED_STATUS };
}

export function archiveGroups(records) {
  const years = new Map();
  const unresolved = [];
  for (const record of records) {
    const occurrence = occurrenceFor(record);
    if (occurrence.kind === "unresolved") {
      unresolved.push(record);
      continue;
    }
    if (!years.has(occurrence.year)) years.set(occurrence.year, { records: [], yearOnly: [], months: new Map() });
    const year = years.get(occurrence.year);
    year.records.push(record);
    if (occurrence.kind === "year") {
      year.yearOnly.push(record);
      continue;
    }
    const months = year.months;
    if (!months.has(occurrence.month)) months.set(occurrence.month, { records: [], monthOnly: [], days: new Map() });
    const month = months.get(occurrence.month);
    month.records.push(record);
    if (occurrence.kind === "month") {
      month.monthOnly.push(record);
      continue;
    }
    if (!month.days.has(occurrence.day)) month.days.set(occurrence.day, []);
    month.days.get(occurrence.day).push(record);
  }
  return {
    years: [...years.entries()].sort(([left], [right]) => right.localeCompare(left)).map(([year, group]) => ({
      year,
      records: group.records,
      yearOnly: group.yearOnly,
      months: [...group.months.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([month, monthGroup]) => ({
        month,
        records: monthGroup.records,
        monthOnly: monthGroup.monthOnly,
        days: [...monthGroup.days.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([day, dayRecords]) => ({ day, records: dayRecords })),
      })),
    })),
    unresolved,
  };
}
