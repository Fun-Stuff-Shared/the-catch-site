import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { recordById } from './record-manifests.mjs';
export const payrollSource = recordById.get('fred-payems-2026-07');
const saved = readFileSync(payrollSource.pinned_path, 'utf8');
if (`sha256:${createHash('sha256').update(saved).digest('hex')}` !== payrollSource.text_sha256) throw new Error('Payroll chart source does not match the saved record');
const rows = saved.trim().split(/\r?\n/).slice(1).map(line => {
  const [date, value] = line.split(',');
  return { date, value: Number(value), line };
});
export const payrollSeries = rows.flatMap((row, i) => {
  if (row.date < '2025-06-01' || row.date > '2026-07-01') return [];
  const previous = rows[i - 1];
  if (!previous || !Number.isFinite(row.value) || !Number.isFinite(previous.value)) throw new Error('Incomplete payroll chart series');
  return [{ month: row.date.slice(0, 7), change: row.value - previous.value, passage: `${previous.line}\n${row.line}` }];
});
