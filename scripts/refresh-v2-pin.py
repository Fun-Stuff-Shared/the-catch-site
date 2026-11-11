#!/usr/bin/env python3
"""Moves the site to the producer's newest packed snapshot: checks it with the branch's own readSnapshot, the
check every build runs, then uploads it to the store as <id>.tgz, commits the id to data/v2/CURRENT on one
branch and pushes. A snapshot the check refuses is neither uploaded nor pinned, so the site's build never
meets it. A push to main deploys, so the branch is the caller's to name.

The store key comes from the environment; git uses whatever push credentials the machine has.
"""
import argparse
import hashlib
import os
import subprocess
import sys
import tarfile
import tempfile
from pathlib import Path

PIN = "data/v2/CURRENT"
CHECK = ("src/lib/v2.mjs", "src/lib/v2-brief.mjs")


def snapshot_id(archive: Path) -> str:
    with tarfile.open(archive, "r|gz") as members:
        for member in members:
            if member.name.removeprefix("./") == "manifest.json":
                reader = members.extractfile(member)
                if reader is None:
                    break
                return hashlib.sha256(reader.read()).hexdigest()[:24]
    raise SystemExit(f"{archive} holds no manifest.json")


def upload(archive: Path, store: str, snapshot: str) -> None:
    endpoint, bucket = store.rstrip("/").rsplit("/", 1)
    env = {
        **os.environ,
        "RCLONE_CONFIG_STORE_TYPE": "s3",
        "RCLONE_CONFIG_STORE_PROVIDER": "Cloudflare",
        "RCLONE_CONFIG_STORE_ENDPOINT": endpoint,
        "RCLONE_CONFIG_STORE_ACCESS_KEY_ID": os.environ["SAI_SNAPSHOTS_ACCESS_KEY"],
        "RCLONE_CONFIG_STORE_SECRET_ACCESS_KEY": os.environ["SAI_SNAPSHOTS_SECRET_KEY"],
    }
    subprocess.run(["rclone", "copyto", str(archive), f"store:{bucket}/{snapshot}.tgz", "--s3-no-check-bucket", "--immutable"], env=env, check=True)


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
    subprocess.run(["git", "-C", folder, "sparse-checkout", "set", "--no-cone", f"/{PIN}", *(f"/{path}" for path in CHECK)], check=True)
    subprocess.run(["git", "-C", folder, "checkout", "--quiet", branch], check=True)


def commit_pin(folder: str, branch: str, snapshot: str) -> bool:
    def git(*args: str) -> None:
        subprocess.run(["git", "-C", folder, *args], check=True)

    pin = Path(folder) / PIN
    if pin.read_text().strip() == snapshot:
        return False
    pin.write_text(f"{snapshot}\n")
    git("-c", "user.name=catch-site refresh", "-c", "user.email=catch-site-refresh@users.noreply.github.com", "commit", "--quiet", "-m", f"The site reads v2 snapshot {snapshot}", "--", PIN)
    git("push", "--quiet", "origin", branch)
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--archive", type=Path, required=True)
    parser.add_argument("--branch", required=True)
    parser.add_argument("--remote", default="https://github.com/Fun-Stuff-Shared/the-catch-site.git")
    args = parser.parse_args()
    snapshot = snapshot_id(args.archive)
    with tempfile.TemporaryDirectory(prefix="catch-pin-") as folder:
        clone(args.remote, args.branch, folder)
        check(Path(folder), args.archive, snapshot)
        upload(args.archive, os.environ["SAI_SNAPSHOTS_URL"], snapshot)
        moved = commit_pin(folder, args.branch, snapshot)
    print(f"{snapshot} {'pinned' if moved else 'already pinned'} on {args.branch}", file=sys.stderr)


if __name__ == "__main__":
    main()
