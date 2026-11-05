import { execFileSync } from "node:child_process";
import { closeSync, copyFileSync, createWriteStream, existsSync, fsyncSync, mkdirSync, mkdtempSync, openSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { AwsClient } from "aws4fetch";
import { readSnapshot, readV2, snapshotId } from "../src/lib/v2.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));

const fsyncPath = (path) => { const fd = openSync(path, "r"); try { fsyncSync(fd); } finally { closeSync(fd); } };

// The source names its snapshot in CURRENT and never rewrites a snapshot, so copying the named folder and
// checking it whole gives a consistent set. The destination flips its own CURRENT only after the copy is
// verified and renamed into place, so a reader sees the old snapshot or the new one, never a mix.
export function pullV2({ source = process.env.SAI_VIEWS_SOURCE, destination = join(root, "data/v2") } = {}) {
  if (!source) {
    const pinned = readV2(destination);
    return { source: "pinned", snapshot: pinned.id, views: pinned.views.size };
  }
  const id = snapshotId(source);
  const snapshots = join(destination, "snapshots");
  mkdirSync(snapshots, { recursive: true });
  const final = join(snapshots, id);
  if (!existsSync(final)) {
    const temporary = mkdtempSync(join(snapshots, ".pull-"));
    try {
      const from = join(source, "snapshots", id);
      const { manifest } = readSnapshot(from, id);
      for (const path of ["manifest.json", ...Object.values(manifest.texts), ...Object.values(manifest.views).map((entry) => entry.path)]) {
        mkdirSync(dirname(join(temporary, path)), { recursive: true });
        copyFileSync(join(from, path), join(temporary, path));
        fsyncPath(join(temporary, path));
      }
      readSnapshot(temporary, id);
      for (const folder of ["texts", "views", "."]) if (existsSync(join(temporary, folder))) fsyncPath(join(temporary, folder));
      renameSync(temporary, final);
      fsyncPath(snapshots);
    } catch (error) {
      rmSync(temporary, { recursive: true, force: true });
      throw error;
    }
  }
  const snapshot = readSnapshot(final, id);
  const pointer = join(destination, `.CURRENT.${process.pid}`);
  writeFileSync(pointer, `${id}\n`);
  fsyncPath(pointer);
  renameSync(pointer, join(destination, "CURRENT"));
  fsyncPath(destination);
  for (const name of readdirSync(snapshots)) if (name !== id && !name.startsWith(".")) rmSync(join(snapshots, name), { recursive: true, force: true });
  return { source, snapshot: id, views: snapshot.views.size };
}

// Git pins a snapshot by id in CURRENT; its bytes live in object storage as <id>.tgz, with its manifest, views and
// texts at the archive's root. The id is the hash of the manifest, so what arrives is checked against the pin.
export async function fetchPinned({
  destination = join(root, "data/v2"), store = process.env.SAI_SNAPSHOTS_URL,
  accessKeyId = process.env.SAI_SNAPSHOTS_ACCESS_KEY, secretAccessKey = process.env.SAI_SNAPSHOTS_SECRET_KEY,
} = {}) {
  const id = snapshotId(destination);
  const snapshots = join(destination, "snapshots");
  const final = join(snapshots, id);
  if (existsSync(final)) return;
  if (!store) throw new Error(`v2 snapshot ${id} is not here and SAI_SNAPSHOTS_URL is not set`);
  const url = `${store.replace(/\/$/, "")}/${id}.tgz`;
  const response = accessKeyId ? await new AwsClient({ accessKeyId, secretAccessKey, service: "s3", region: "auto" }).fetch(url) : await fetch(url);
  if (!response.ok) throw new Error(`v2 snapshot ${id}: ${url} answered ${response.status}`);
  mkdirSync(snapshots, { recursive: true });
  const temporary = mkdtempSync(join(snapshots, ".pull-"));
  try {
    const archive = join(temporary, "snapshot.tgz");
    await pipeline(Readable.fromWeb(response.body), createWriteStream(archive));
    const unpacked = join(temporary, id);
    mkdirSync(unpacked);
    execFileSync("tar", ["-xzf", archive, "-C", unpacked]);
    readSnapshot(unpacked, id);
    renameSync(unpacked, final);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
  for (const name of readdirSync(snapshots)) if (name !== id && !name.startsWith(".")) rmSync(join(snapshots, name), { recursive: true, force: true });
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  if (!process.env.SAI_VIEWS_SOURCE) await fetchPinned();
  console.log(JSON.stringify(pullV2()));
}
