// Readers for the two FEC file shapes the site pins: raw ".fec" electronic filings saved as CSV
// (Form 3X and its schedules, one record per line, no header row) and the independent-expenditure
// bulk export (a header row, one row per expenditure line).
import { readFileSync, readdirSync } from "node:fs";

export function parseCsvLine(line) {
  const out = []; let cur = ""; let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true; else if (c === ",") { out.push(cur); cur = ""; } else cur += c;
  }
  out.push(cur); return out;
}

// A quoted field may span lines; a record ends where its quotes balance.
export function* fecRecords(text) {
  let buf = "";
  for (const raw of text.split(/\r?\n/)) {
    buf = buf ? `${buf}\n${raw}` : raw;
    if ((buf.match(/"/g) || []).length % 2) continue;
    const r = parseCsvLine(buf); buf = "";
    if (r.length > 1) yield r;
  }
}

// Schedule A (receipts) field positions in the FEC 8.x electronic format.
export const SA = { formType: 0, entityType: 5, orgName: 6, lastName: 7, firstName: 8, date: 19, amount: 20, aggregate: 21, description: 22, memoCode: 42 };

export function receiptName(r) {
  const org = (r[SA.orgName] || "").trim();
  return org || `${(r[SA.firstName] || "").trim()} ${(r[SA.lastName] || "").trim()}`.trim();
}

// Why a Schedule A row is not money from a giver, or null when it is.
//   memo: the FEC's cross-reference entries (partnership attributions, in-kind restatements) that
//         repeat money already counted on another line; the memo code is an X near the end of the row.
//   interest: bank interest, described as such by the filer.
//   exchange: an exchange or custodian that sold assets the committee already held; the FEC does not
//         treat the exchange as the contributor when the purchaser is unknown.
export function receiptExclusion(r, { exchanges = ["GEMINI"] } = {}) {
  if (r.slice(SA.memoCode - 4, SA.memoCode + 4).some((x) => (x || "").trim() === "X")) return "memo";
  const desc = (r[SA.description] || "").toUpperCase();
  if (desc.includes("INTEREST")) return "interest";
  const org = (r[SA.orgName] || "").toUpperCase();
  if (exchanges.some((e) => org.includes(e)) || desc.includes("PURCHASER UNKNOWN")) return "exchange";
  return null;
}

// Sum one receipt line (default: SA17, other federal receipts) across every .fec CSV in a directory,
// by giver, with the excluded money reported by reason.
export function scheduleAReceipts(dir, { line = "SA17", exchanges } = {}) {
  const totals = new Map();
  const excluded = { memo: 0, interest: 0, exchange: 0 };
  const files = readdirSync(dir).filter((f) => f.endsWith(".csv")).sort();
  for (const file of files) {
    for (const r of fecRecords(readFileSync(`${dir}/${file}`, "utf8"))) {
      if (r[SA.formType] !== line) continue;
      const amount = Number(r[SA.amount] || 0);
      const why = receiptExclusion(r, { exchanges });
      if (why) { excluded[why] += amount; continue; }
      const name = receiptName(r);
      totals.set(name, (totals.get(name) || 0) + amount);
    }
  }
  const list = [...totals.entries()].sort((a, b) => b[1] - a[1]).map(([name, amount]) => ({ name, amount }));
  return { files, list, excluded, givers: totals.size, total: list.reduce((a, r) => a + r.amount, 0) };
}

const MONTHS = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };
export function fecDateToIso(d) {
  const [dd, mm, yy] = d.split("-");
  return `20${yy}-${String(MONTHS[mm.toUpperCase()]).padStart(2, "0")}-${dd}`;
}

// Independent expenditures from the bulk export, by committee. Keeps the highest file number per
// committee, candidate, and transaction id so amendments replace originals rather than add to them.
export function independentExpendituresByCommittee(path, { office, state, candidateIds, electionType = "G", receivedBefore, exclude = () => false }) {
  const lines = readFileSync(path, "utf8").split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  const col = (r, k) => r[header.indexOf(k)];
  const best = new Map();
  for (const line of lines.slice(1)) {
    const r = parseCsvLine(line);
    if (office && col(r, "can_office") !== office) continue;
    if (state && col(r, "can_office_state") !== state) continue;
    if (electionType && col(r, "ele_type") !== electionType) continue;
    if (candidateIds && !candidateIds.includes(col(r, "cand_id"))) continue;
    const key = `${col(r, "spe_id")}|${col(r, "cand_id")}|${col(r, "tran_id")}`;
    if (!best.has(key) || Number(col(r, "file_num")) > Number(col(best.get(key), "file_num"))) best.set(key, r);
  }
  const byCommittee = new Map();
  for (const r of best.values()) {
    if (receivedBefore && fecDateToIso(col(r, "receipt_dat")) >= receivedBefore) continue;
    const name = col(r, "spe_nam").trim();
    if (exclude(name)) continue;
    byCommittee.set(name, (byCommittee.get(name) || 0) + Number(col(r, "exp_amo") || 0));
  }
  const committees = [...byCommittee.entries()].sort((a, b) => b[1] - a[1]);
  return { committees, count: committees.length, total: committees.reduce((a, [, v]) => a + v, 0) };
}
