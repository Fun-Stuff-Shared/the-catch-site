import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { recordById } from './record-manifests.mjs';

export function payrollChart(recordId, from, to) {
  const source = recordById.get(recordId);
  if (!source) throw new Error(`Payroll chart record unknown: ${recordId}`);
  const saved = readFileSync(source.pinned_path, 'utf8');
  if (`sha256:${createHash('sha256').update(saved).digest('hex')}` !== source.text_sha256) throw new Error('Payroll chart source does not match the saved record');
  const rows = saved.trim().split(/\r?\n/).slice(1).map(line => {
    const [date, value] = line.split(',');
    return { date, value: Number(value), line };
  });
  const series = rows.flatMap((row, i) => {
    if (row.date < from || row.date > to) return [];
    const previous = rows[i - 1];
    if (!previous || !Number.isFinite(row.value) || !Number.isFinite(previous.value)) throw new Error('Incomplete payroll chart series');
    return [{ month: row.date.slice(0, 7), change: row.value - previous.value, passage: `${previous.line}\n${row.line}` }];
  });
  return { source, series };
}

const july = payrollChart('fred-payems-2026-07', '2025-06-01', '2026-07-01');
export const payrollSource = july.source;
export const payrollSeries = july.series;

