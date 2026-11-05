#!/usr/bin/env python3
"""Writes the snapshot CURRENT names as <out>/<id>.tgz and prints its id. Run where the producer's views live.

The producer keeps two snapshots and rotates them within seconds under load, far sooner than a copy finishes.
Every file is opened before any is read, because an open descriptor keeps a pruned file's bytes readable.
"""
import gzip
import hashlib
import io
import json
import os
import resource
import sys
import tarfile
import time
from pathlib import Path

PINNING_SECONDS = 300


def pin(views: Path) -> tuple[str, bytes, dict[str, int]]:
    deadline = time.time() + PINNING_SECONDS
    while True:
        snapshot = (views / "CURRENT").read_text().strip()
        folder = views / "snapshots" / snapshot
        files: dict[str, int] = {}
        try:
            manifest = (folder / "manifest.json").read_bytes()
            if hashlib.sha256(manifest).hexdigest()[:24] != snapshot:
                raise FileNotFoundError(snapshot)
            named = json.loads(manifest)
            for path in [entry["path"] for entry in named["views"].values()] + list(named["texts"].values()):
                files[path] = os.open(folder / path, os.O_RDONLY)
            return snapshot, manifest, files
        except FileNotFoundError:
            for descriptor in files.values():
                os.close(descriptor)
            if time.time() > deadline:
                raise SystemExit(f"snapshots pruned faster than they can be pinned for {PINNING_SECONDS} s")


def pack(views: Path, out: Path) -> str:
    hard = resource.getrlimit(resource.RLIMIT_NOFILE)[1]
    resource.setrlimit(resource.RLIMIT_NOFILE, (hard, hard))
    snapshot, manifest, files = pin(views)
    final = out / f"{snapshot}.tgz"
    partial = out / f".{snapshot}.tgz.partial"
    with gzip.open(partial, "wb", compresslevel=3) as compressed, tarfile.open(fileobj=compressed, mode="w|") as archive:
        def add(name: str, reader, size: int) -> None:
            info = tarfile.TarInfo(name)
            info.size, info.mode = size, 0o644
            archive.addfile(info, reader)

        add(f"snapshots/{snapshot}/manifest.json", io.BytesIO(manifest), len(manifest))
        for path, descriptor in files.items():
            with os.fdopen(descriptor, "rb") as handle:
                add(f"snapshots/{snapshot}/{path}", handle, os.fstat(handle.fileno()).st_size)
    partial.replace(final)
    return snapshot


if __name__ == "__main__":
    print(pack(Path(sys.argv[1]), Path(sys.argv[2])))
