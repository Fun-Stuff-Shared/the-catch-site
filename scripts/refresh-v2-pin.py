#!/usr/bin/env python3
"""Moves the site to the producer's newest packed snapshot: uploads it to the store as <id>.tgz, commits the
id to data/v2/CURRENT on one branch and pushes. A push to main deploys, so the branch is the caller's to name.

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


def commit_pin(remote: str, branch: str, snapshot: str) -> bool:
    with tempfile.TemporaryDirectory(prefix="catch-pin-") as folder:
        def git(*args: str) -> None:
            subprocess.run(["git", "-C", folder, *args], check=True)

        subprocess.run(["git", "clone", "--quiet", "--depth", "1", "--branch", branch, "--filter=blob:none", "--no-checkout", remote, folder], check=True)
        git("sparse-checkout", "set", "--no-cone", f"/{PIN}")
        git("checkout", "--quiet", branch)
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
    upload(args.archive, os.environ["SAI_SNAPSHOTS_URL"], snapshot)
    moved = commit_pin(args.remote, args.branch, snapshot)
    print(f"{snapshot} {'pinned' if moved else 'already pinned'} on {args.branch}", file=sys.stderr)


if __name__ == "__main__":
    main()
