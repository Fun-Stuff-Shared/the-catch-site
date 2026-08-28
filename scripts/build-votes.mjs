import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DROP = "/Volumes/4/CF/public-figure-pilots/rubio-2025/source_discovery/zain-votes-drop";
const OUTPUT = new URL("../src/data/votes/marco-rubio.json", import.meta.url);
const MEMBER_ID = "S350";

function filesAt(path) {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const candidate = join(path, entry.name);
    return entry.isDirectory() ? filesAt(candidate) : /^vote_\d+_\d+_\d+\.xml$/.test(entry.name) ? [candidate] : [];
  });
}

function decode(value = "") {
  return value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code))).trim();
}

function field(xml, name) {
  const match = xml.match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`));
  return decode(match?.[1] ?? "");
}

function memberCast(xml, file) {
  const members = xml.match(/<member>[\s\S]*?<\/member>/g) ?? [];
  const member = members.find((entry) => field(entry, "lis_member_id") === MEMBER_ID);
  if (!member) throw new Error(`${file}: missing Senate member ${MEMBER_ID}`);
  return field(member, "vote_cast");
}

function isoDate(value, file) {
  const parsed = new Date(value.replace(/,\s+/, ", "));
  if (Number.isNaN(parsed.valueOf())) throw new Error(`${file}: unreadable vote_date ${JSON.stringify(value)}`);
  return parsed.toISOString().slice(0, 10);
}

const files = filesAt(DROP).sort();
const rows = files.map((file) => {
  const xml = readFileSync(file, "utf8");
  const congress = Number(field(xml, "congress"));
  const session = Number(field(xml, "session"));
  const rc = Number(field(xml, "vote_number"));
  if (!congress || !session || !rc) throw new Error(`${file}: missing roll-call identity`);
  const document = field(xml, "document_number");
  const amendmentToDocument = field(xml, "amendment_to_document_number");
  const amendment = field(xml, "amendment_number") || null;
  return {
    rc,
    congress,
    session,
    date: isoDate(field(xml, "vote_date"), file),
    question: field(xml, "question"),
    title: field(xml, "vote_title"),
    measure: document || amendmentToDocument || null,
    amendment,
    purpose: field(xml, "amendment_purpose") || field(xml, "vote_document_text"),
    result: field(xml, "vote_result"),
    yeas: Number(field(xml, "yeas")),
    nays: Number(field(xml, "nays")),
    absent: Number(field(xml, "absent") || 0),
    threshold: field(xml, "majority_requirement"),
    cast: memberCast(xml, file),
    url: `https://www.senate.gov/legislative/LIS/roll_call_votes/vote${congress}${session}/vote_${congress}_${session}_${String(rc).padStart(5, "0")}.htm`,
  };
});

const captureManifest = readFileSync(join(DROP, "capture_manifest.json"));
const output = {
  meta: {
    member_lis_id: MEMBER_ID,
    files_scanned: files.length,
    rows_written: rows.length,
    capture_manifest_sha256: `sha256:${createHash("sha256").update(captureManifest).digest("hex")}`,
  },
  rows,
};

if (output.meta.files_scanned !== output.meta.rows_written) throw new Error("row count does not equal XML file count");
mkdirSync(new URL("../src/data/votes/", import.meta.url), { recursive: true });
writeFileSync(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
console.log(`wrote ${output.meta.rows_written} Marco Rubio roll calls from ${output.meta.files_scanned} Senate XML files`);
