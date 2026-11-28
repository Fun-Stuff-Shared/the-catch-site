#!/usr/bin/env python3
"""Moves the site to the producer's newest packed snapshot: checks it with the branch's own readSnapshot, the
check every build runs, then uploads it to the store as <id>.tgz, commits the id to data/v2/CURRENT on one
branch and pushes. A snapshot the check refuses is neither uploaded nor pinned, so the site's build never
meets it. The producer replaces the archive in place, so the id, the check and the upload all read one private copy
of it: reading the live file three times once uploaded a newer archive under an older one's id. A push to main deploys, so the branch is the caller's to name.

The store key comes from the environment; git uses whatever push credentials the machine has.
"""
import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
import tarfile
import tempfile
from pathlib import Path

PIN = "data/v2/CURRENT"
SITE_PIN = "data/v2/SITE_CURRENT"
CHECK = ("src/lib/v2.mjs", "src/lib/v2-brief.mjs")


def manifest_bytes(archive: Path) -> bytes:
    with tarfile.open(archive, "r|gz") as members:
        for member in members:
            if member.name.removeprefix("./") == "manifest.json":
                reader = members.extractfile(member)
                if reader is None:
                    break
                return reader.read()
    raise SystemExit(f"{archive} holds no manifest.json")


def snapshot_id(archive: Path) -> str:
    return hashlib.sha256(manifest_bytes(archive)).hexdigest()[:24]


def site_artifact(archive: Path) -> tuple[bytes, str]:
    raw = manifest_bytes(archive)
    snapshot = hashlib.sha256(raw).hexdigest()[:24]
    manifest = json.loads(raw)
    site = {"format": manifest["format"], "id": snapshot, "views": sorted(manifest["views"]), "moved": manifest["moved"]}
    data = (json.dumps(site, sort_keys=True, separators=(",", ":"), ensure_ascii=False) + "\n").encode("utf-8")
    return data, f"{snapshot} {hashlib.sha256(data).hexdigest()}\n"


def upload(archive: Path, store: str, key: str) -> None:
    endpoint, bucket = store.rstrip("/").rsplit("/", 1)
    env = {
        **os.environ,
        "RCLONE_CONFIG_STORE_TYPE": "s3",
        "RCLONE_CONFIG_STORE_PROVIDER": "Cloudflare",
        "RCLONE_CONFIG_STORE_ENDPOINT": endpoint,
        "RCLONE_CONFIG_STORE_ACCESS_KEY_ID": os.environ["SAI_SNAPSHOTS_ACCESS_KEY"],
        "RCLONE_CONFIG_STORE_SECRET_ACCESS_KEY": os.environ["SAI_SNAPSHOTS_SECRET_KEY"],
    }
    subprocess.run(["rclone", "copyto", str(archive), f"store:{bucket}/{key}", "--s3-no-check-bucket", "--immutable", "--checksum"], env=env, check=True)


def check(checkout: Path, archive: Path, snapshot: str) -> None:
    with tempfile.TemporaryDirectory(prefix="catch-snapshot-") as folder:
        with tarfile.open(archive, "r:gz") as members:
            members.extractall(folder, filter="data")
        script = "const { readSnapshot } = await import(process.argv[1]); readSnapshot(process.argv[2], process.argv[3]);"
        module = (checkout / CHECK[0]).as_uri()
        proc = subprocess.run(["node", "--input-type=module", "-e", script, module, folder, snapshot], capture_output=True, text=True, check=False)
        if proc.returncode != 0:
            failure = next((line for line in proc.stderr.splitlines() if line.startswith("Error")), proc.stderr.strip()[-500:])
            raise SystemExit(f"{snapshot} refused by readSnapshot, not pinned: {failure}")


def clone(remote: str, branch: str, folder: str) -> None:
    subprocess.run(["git", "clone", "--quiet", "--depth", "1", "--branch", branch, "--filter=blob:none", "--no-checkout", remote, folder], check=True)
    subprocess.run(["git", "-C", folder, "sparse-checkout", "set", "--no-cone", f"/{PIN}", f"/{SITE_PIN}", *(f"/{path}" for path in CHECK)], check=True)
    subprocess.run(["git", "-C", folder, "checkout", "--quiet", branch], check=True)


def commit_pin(folder: str, branch: str, snapshot: str, site_pin: str) -> bool:
    def git(*args: str) -> None:
        subprocess.run(["git", "-C", folder, *args], check=True)

    pin = Path(folder) / PIN
    site = Path(folder) / SITE_PIN
    if pin.read_text().strip() == snapshot and site.exists() and site.read_text() == site_pin:
        return False
    pin.write_text(f"{snapshot}\n")
    site.write_text(site_pin)
    git("add", "--", PIN, SITE_PIN)
    git("-c", "user.name=catch-site refresh", "-c", "user.email=catch-site-refresh@users.noreply.github.com", "commit", "--quiet", "-m", f"The site reads v2 snapshot {snapshot}", "--", PIN, SITE_PIN)
    git("push", "--quiet", "origin", branch)
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--archive", type=Path, required=True)
    parser.add_argument("--branch", required=True)
    parser.add_argument("--remote", default="https://github.com/Fun-Stuff-Shared/the-catch-site.git")
    args = parser.parse_args()
    with tempfile.TemporaryDirectory(prefix="catch-pin-") as folder:
        archive = Path(folder) / "snapshot.tgz"
        shutil.copyfile(args.archive, archive)
        snapshot = snapshot_id(archive)
        checkout = Path(folder) / "checkout"
        clone(args.remote, args.branch, str(checkout))
        check(checkout, archive, snapshot)
        data, site_pin = site_artifact(archive)
        site = Path(folder) / "site" / f"{snapshot}.json"
        site.parent.mkdir()
        site.write_bytes(data)
        # Content-addressed uploads may leave harmless orphans; immutable retries reuse identical objects.
        # Neither pin changes until both uploads succeed.
        upload(archive, os.environ["SAI_SNAPSHOTS_URL"], f"{snapshot}.tgz")
        upload(site, os.environ["SAI_SNAPSHOTS_URL"], f"site/{snapshot}.json")
        moved = commit_pin(str(checkout), args.branch, snapshot, site_pin)
    print(f"{snapshot} {'pinned' if moved else 'already pinned'} on {args.branch}", file=sys.stderr)


if __name__ == "__main__":
    main()
