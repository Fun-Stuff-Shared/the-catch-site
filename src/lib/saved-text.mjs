import { readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const KINDS = {
  ".pdf": "PDF document", ".xlsx": "spreadsheet", ".xls": "spreadsheet",
  ".mp4": "video file", ".webm": "video file", ".mov": "video file",
  ".wav": "audio file", ".mp3": "audio file", ".m4a": "audio file",
  ".png": "image", ".jpg": "image", ".jpeg": "image", ".gif": "image", ".webp": "image",
};

const article = (kind) => (/^[aeiou]/i.test(kind) ? "an" : "a");
const megabytes = (bytes) => `${(bytes / 1_000_000).toFixed(1).replace(/\.0$/, "")} MB`;

// Records pin the document as served. A page cannot show a video, a PDF, or a spreadsheet as
// text, so for those the saved text is the text version made from the file, and the page says so.
export function savedText(record, root = process.cwd()) {
  if (!record.pinned_path) return null;
  const kind = KINDS[extname(record.pinned_path).toLowerCase()];
  if (!kind) return { text: readFileSync(join(root, record.pinned_path), "utf8"), kind: null, note: null };
  const bytes = statSync(join(root, record.pinned_path)).size;
  const text = record.text_path ? readFileSync(join(root, record.text_path), "utf8") : null;
  const note = text
    ? `The saved file is ${article(kind)} ${kind} of ${megabytes(bytes)}. What follows is the text taken from it, which is the text the story quotes.`
    : `The saved file is ${article(kind)} ${kind} of ${megabytes(bytes)} and has no text version.`;
  return { text, kind, note };
}
