import { existsSync, mkdirSync, mkdtempSync, readdirSync, renameSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readState } from "../src/lib/state.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const isView = (name) => /^(event-|chain-).+\.json$/.test(name);
const copySnapshot = String.raw`
import fcntl, shutil, sys
from pathlib import Path
source, destination = map(Path, sys.argv[1:])
with (source / '.write.lock').open('a') as lock:
    fcntl.flock(lock, fcntl.LOCK_SH)
    for path in source.iterdir():
        if path.is_file() and path.suffix == '.json' and path.name.startswith(('event-', 'chain-')):
            shutil.copyfile(path, destination / path.name)
`;

export function pullState({ source = process.env.CATCH_STATE_SOURCE || "/Volumes/4/CF/catch-state/views", destination = join(root, "data/state"), python = process.env.CATCH_STATE_PYTHON || "python3" } = {}) {
  if (!existsSync(source)) {
    const state = readState(destination);
    if (!state.events.size) throw new Error("No committed event views are available");
    return { source: "committed", events: state.events.size, chains: state.chains.size };
  }
  mkdirSync(destination, { recursive: true });
  const temporary = mkdtempSync(join(destination, ".pull-"));
  try {
    execFileSync(python, ["-c", copySnapshot, source, temporary]);
    const state = readState(temporary);
    if (!state.events.size) throw new Error("Source projection has no event views");
    const incoming = new Set(readdirSync(temporary).filter(isView));
    for (const name of incoming) renameSync(join(temporary, name), join(destination, name));
    for (const name of readdirSync(destination).filter(isView)) if (!incoming.has(name)) rmSync(join(destination, name));
    return { source, events: state.events.size, chains: state.chains.size };
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) console.log(JSON.stringify(pullState()));
