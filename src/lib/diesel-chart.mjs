import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { recordById } from './record-manifests.mjs';

const MONTHS = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
const flat = (text) => text.replace(/\s+/g, ' ');

export function dieselChart(recordId, from, to) {
  const source = recordById.get(recordId);
  if (!source) throw new Error(`Diesel chart record unknown: ${recordId}`);
  const saved = readFileSync(source.text_path, 'utf8');
  if (`sha256:${createHash('sha256').update(saved).digest('hex')}` !== source.text_sha256) throw new Error('Diesel chart source does not match the saved record');
  const text = flat(saved);
  const lines = saved.split(/\r?\n/).map((line) => line.trim());
  const rows = [];
  let header = null;
  let first = false;
  for (let i = 0; i < lines.length; i++) {
    const month = lines[i].match(/^(\d{4})-([A-Z][a-z]{2})$/);
    if (month) { header = { line: lines[i], year: month[1], month: MONTHS[month[2]] }; first = true; continue; }
    const day = lines[i].match(/^(\d{2})\/(\d{2})$/);
    if (!header || !day || !/^\d+\.\d{3}$/.test(lines[i + 1] ?? '')) continue;
    if (day[1] !== header.month) throw new Error(`Diesel chart week ${lines[i]} outside ${header.line}`);
    const date = `${header.year}-${day[1]}-${day[2]}`;
    const short = `${lines[i]} ${lines[i + 1]}`;
    const passage = first || text.indexOf(short) !== text.lastIndexOf(short) ? `${header.line} ${short}` : short;
    rows.push({ date, value: Number(lines[i + 1]), raw: lines[i + 1], passage });
    first = false;
    i++;
  }
  const series = rows.filter((row) => row.date >= from && row.date <= to);
  if (!series.length || series[0].date.slice(0, 7) !== from.slice(0, 7) || series.at(-1).date !== to) throw new Error('Incomplete diesel chart series');
  const peak = rows.reduce((max, row) => (row.value > max.value ? row : max));
  for (const row of [...series, peak]) {
    const at = text.indexOf(row.passage);
    if (at < 0 || at !== text.lastIndexOf(row.passage)) throw new Error(`Diesel chart passage not unique: ${row.passage}`);
  }
  return { source, series, peak };
}
