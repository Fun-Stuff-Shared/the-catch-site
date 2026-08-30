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

function amendmentLabel(amendment) {
  const number = amendment?.match(/(?:Amdt\.|Amendment)\s*(?:No\.\s*)?(\d+)/i)?.[1];
  return number ? `Amendment ${number}` : amendment || "Amendment";
}

function readerTitle(value = "") {
  return value
    .replace(/\b(?:S\.)?Amdt\.?\s*(?:No\.?\s*)?(\d+)/gi, "Amendment $1")
    .replace(/\bAmdt\.?\s*(?:No\.?\s*)?(\d+)/gi, "Amendment $1")
    .replace(/\bAmdt\.?\b/gi, "Amendment")
    .replace(/\bMotion to Proceed to (?:Consider )?/gi, "")
    .replace(/\beligibility\b/gi, "qualification")
    .replace(/\bpipeline\b/gi, "process")
    .replace(/\bwave\b/gi, "group")
    .replace(/^\s*:\s*/, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function hasUsefulPurpose(purpose) {
  return purpose && !/^(?:No Statement of Purpose on File\.|Of a perfecting nature\.|To improve the bill\.)$/i.test(purpose);
}

function readerPurpose(purpose) {
  return purpose
    .replace(/\beligibility\b/gi, "qualification")
    .replace(/\bpipeline\b/gi, "process")
    .replace(/\bwave\b/gi, "group");
}

function clotureTarget({ title, measure, amendment }) {
  const stripped = readerTitle(title
    .replace(/^(?:Upon Reconsideration,?\s*)?(?:Motion\s*(?:to\s*)?Invoke\s+Cloture|Cloture)(?:\s+on)?\s*:?[\s]*/i, "")
    .replace(/^(?:the )?Motion to Proceed to (?:Consider )?/i, ""));
  if (stripped && !/cloture/i.test(stripped)) return stripped;
  if (amendment) return `${amendmentLabel(amendment)} to ${measure}`;
  return measure || "the measure";
}

function readerDescription(vote) {
  const { question, title, measure, amendment, purpose } = vote;
  const cleanTitle = readerTitle(title);
  if (/cloture/i.test(question) || /cloture/i.test(title)) {
    if (/motion to proceed/i.test(title)) return `Vote to end debate on whether to begin considering ${measure || "the measure"}. Needed 60 votes.`;
    if (/motion to concur/i.test(title)) return `Vote to end debate on accepting the House version of ${measure || "the measure"}${amendment ? " with a Senate change" : ""}. Needed 60 votes.`;
    if (/motion to|amdt|concur/i.test(clotureTarget(vote))) return `Vote to end debate and move toward a final vote on ${measure || "the measure"}. Needed 60 votes.`;
    return `Vote to end debate and move toward a final vote on ${clotureTarget(vote)}. Needed 60 votes.`;
  }
  if (/motion to table/i.test(question) || /motion to table/i.test(title)) {
    return hasUsefulPurpose(purpose) ? `Vote on whether to set aside an amendment to ${measure}: ${readerPurpose(purpose)}` : `Vote on whether to set aside ${amendment ? `${amendmentLabel(amendment)} to ${measure}` : measure || "the measure"}.`;
  }
  if (/motion to proceed/i.test(question) || /motion to proceed/i.test(title)) return `Vote to begin considering ${measure || "the measure"}.`;
  if (/^On the Motion$/i.test(question)) {
    if (/motion to waive/i.test(title)) return `Vote on whether to waive a Senate budget rule for ${measure || "the measure"}.`;
    if (/motion to concur/i.test(title)) return `Vote on whether to accept the House's changes to ${measure || "the measure"}.`;
    if (/motion to recommit/i.test(title)) return `Vote on whether to send ${measure || "the measure"} back to committee.`;
    return hasUsefulPurpose(purpose) ? `Vote on a Senate motion about ${measure || "the measure"}: ${readerPurpose(purpose)}` : `Vote on a Senate motion about ${measure || "the measure"}.`;
  }
  if (/nomination/i.test(question)) return `Vote on ${cleanTitle || measure}.`;
  if (/amendment/i.test(question)) {
    if (!hasUsefulPurpose(purpose)) return `${amendmentLabel(amendment)} to ${measure} (Senate record gives no summary).`;
    return `Amendment to ${measure}: ${readerPurpose(purpose)}`;
  }
  if (/passage/i.test(question)) return `Final vote on ${measure || cleanTitle}.`;
  if (hasUsefulPurpose(purpose)) return `Vote on ${measure || cleanTitle}: ${readerPurpose(purpose)}`;
  if (/motion to|amdt|concur/i.test(cleanTitle)) return `Vote on a Senate procedural question about ${measure || "the measure"}.`;
  return `Vote on ${cleanTitle || measure || "the measure"}.`;
}

function readerCast(cast) {
  if (cast === "Yea") return "Voted yes";
  if (cast === "Nay") return "Voted no";
  if (cast === "Not Voting") return "Did not vote";
  return cast || "No vote recorded";
}

function readerResult(result, yeas, nays) {
  const failed = /(?:Rejected|Failed|Defeated|Not Sustained|Not Well Taken|Guilty|Veto Sustained)$/i.test(result);
  return `${failed ? "Failed" : "Passed"} ${yeas}-${nays}`;
}

const files = filesAt(DROP).sort();
const parsed = files.map((file) => {
  const xml = readFileSync(file, "utf8");
  const congress = Number(field(xml, "congress"));
  const session = Number(field(xml, "session"));
  const rc = Number(field(xml, "vote_number"));
  if (!congress || !session || !rc) throw new Error(`${file}: missing roll-call identity`);
  return { file, xml, congress, session, rc, date: isoDate(field(xml, "vote_date"), file) };
});
const tenureEnd = parsed.filter(({ xml }) => (xml.match(/<member>[\s\S]*?<\/member>/g) ?? []).some((entry) => field(entry, "lis_member_id") === MEMBER_ID)).map(({ date }) => date).sort().at(-1);
if (!tenureEnd) throw new Error(`no Senate XML file contains ${MEMBER_ID}`);
const postTenure = parsed.filter(({ xml, date }) => date > tenureEnd && !(xml.match(/<member>[\s\S]*?<\/member>/g) ?? []).some((entry) => field(entry, "lis_member_id") === MEMBER_ID));
for (const { file, xml, date } of parsed) {
  if (date <= tenureEnd && !(xml.match(/<member>[\s\S]*?<\/member>/g) ?? []).some((entry) => field(entry, "lis_member_id") === MEMBER_ID)) {
    throw new Error(`${file}: missing Senate member ${MEMBER_ID} on or before tenure end ${tenureEnd}`);
  }
}
const rows = parsed.filter(({ file }) => !postTenure.some((excluded) => excluded.file === file)).map(({ file, xml, congress, session, rc, date }) => {
  const documentNumber = field(xml, "document_number");
  const documentType = field(xml, "document_type");
  const document = documentNumber && documentType ? `${documentType.endsWith(".") ? documentType : `${documentType}.`} ${documentNumber}` : documentNumber;
  const amendmentToDocument = field(xml, "amendment_to_document_number");
  const amendment = field(xml, "amendment_number") || null;
  const vote = {
    rc,
    congress,
    session,
    date,
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
  return { ...vote, reader_description: readerDescription(vote), reader_cast: readerCast(vote.cast), reader_result: readerResult(vote.result, vote.yeas, vote.nays) };
});

const captureManifest = readFileSync(join(DROP, "capture_manifest.json"));
const output = {
  meta: {
    member_lis_id: MEMBER_ID,
    files_scanned: files.length,
    rows_written: rows.length,
    tenure_end: tenureEnd,
    post_tenure_excluded: postTenure.length,
    capture_manifest_sha256: `sha256:${createHash("sha256").update(captureManifest).digest("hex")}`,
  },
  rows,
};

if (output.meta.files_scanned - output.meta.post_tenure_excluded !== output.meta.rows_written) throw new Error("row count does not equal XML file count minus post-tenure exclusions");
mkdirSync(new URL("../src/data/votes/", import.meta.url), { recursive: true });
writeFileSync(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
console.log(`wrote ${output.meta.rows_written} Marco Rubio roll calls from ${output.meta.files_scanned} Senate XML files`);
