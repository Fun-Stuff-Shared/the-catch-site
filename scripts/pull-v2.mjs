import { closeSync, copyFileSync, existsSync, fsyncSync, mkdirSync, mkdtempSync, openSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readSnapshot, readV2, snapshotId } from "../src/lib/v2.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));

const fsyncPath = (path) => { const fd = openSync(path, "r"); try { fsyncSync(fd); } finally { closeSync(fd); } };

// The source names its snapshot in CURRENT and never rewrites a snapshot, so copying the named folder and
// checking it whole gives a consistent set. The destination flips its own CURRENT only after the copy is
// verified and renamed into place, so a reader sees the old snapshot or the new one, never a mix.
export function pullV2({ source = process.env.SAI_VIEWS_SOURCE, destination = join(root, "data/v2") } = {}) {
  if (!source) {
    const committed = readV2(destination);
    return { source: "committed", snapshot: committed.id, views: committed.views.size };
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

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) console.log(JSON.stringify(pullV2()));
