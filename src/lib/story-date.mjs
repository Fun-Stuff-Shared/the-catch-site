// Editorial dates are calendar dates, never timestamps in the reader's timezone.
const months = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
export function storyDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match || !months[Number(match[2]) - 1]) throw new Error(`Invalid story date: ${iso}`);
  return `${months[Number(match[2]) - 1]} ${Number(match[3])}, ${match[1]}`;
}
