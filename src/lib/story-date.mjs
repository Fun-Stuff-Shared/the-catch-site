// Editorial dates are calendar dates, never timestamps in the reader's timezone.
const months = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
export function storyISO(value) {
  let iso = value;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    // Older authored pages store their update as an English calendar date.
    const written = /^([A-Za-z.]+) (\d{1,2}), (\d{4})$/.exec(value);
    const month = written && months.findIndex(name => name.slice(0, 3).toLowerCase() === written[1].slice(0, 3).toLowerCase());
    if (!written || month < 0) throw new Error(`Invalid story date: ${value}`);
    iso = `${written[3]}-${String(month + 1).padStart(2, '0')}-${written[2].padStart(2, '0')}`;
  }
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== iso) throw new Error(`Invalid story date: ${value}`);
  return iso;
}
export function storyDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(storyISO(value));
  return `${months[Number(match[2]) - 1]} ${Number(match[3])}, ${match[1]}`;
}
