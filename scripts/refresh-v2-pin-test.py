import hashlib
import importlib.util
import io
import json
import subprocess
import tarfile
import tempfile
import unittest
from pathlib import Path
from contextlib import nullcontext
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("refresh", Path(__file__).with_name("refresh-v2-pin.py"))
refresh = importlib.util.module_from_spec(spec)
spec.loader.exec_module(refresh)


class SiteArtifactTest(unittest.TestCase):
    def test_upload_failures_leave_only_harmless_orphans_and_retry_pins_both(self):
        for boundary in (1, 2):
            with self.subTest(boundary=boundary), tempfile.TemporaryDirectory() as folder:
                root = Path(folder)
                archive = root / "input.tgz"
                raw = json.dumps({"format": "sai-news-view/5", "views": {}, "moved": {}}).encode()
                with tarfile.open(archive, "w:gz") as packed:
                    entry = tarfile.TarInfo("manifest.json")
                    entry.size = len(raw)
                    packed.addfile(entry, io.BytesIO(raw))
                snapshot = refresh.snapshot_id(archive)
                data, site_pin = refresh.site_artifact(archive)
                remote = {}
                attempts = 0
                failure = boundary

                def command(args, **kwargs):
                    nonlocal attempts
                    if args[0] == "rclone":
                        self.assertIn("--immutable", args)
                        self.assertIn("--checksum", args)
                        attempts += 1
                        if attempts == failure:
                            raise subprocess.CalledProcessError(1, args)
                        key = args[3].removeprefix("store:bucket/")
                        content = Path(args[2]).read_bytes()
                        if key in remote:
                            self.assertEqual(remote[key], content)
                        remote[key] = content
                    return subprocess.CompletedProcess(args, 0)

                def clone(remote, branch, folder):
                    checkout = Path(folder)
                    (checkout / refresh.PIN).parent.mkdir(parents=True)
                    (checkout / refresh.PIN).write_text("old snapshot\n")
                    (checkout / refresh.SITE_PIN).write_text("old site\n")

                argv = ["refresh-v2-pin.py", "--archive", str(archive), "--branch", "test"]
                env = {"SAI_SNAPSHOTS_URL": "https://example.invalid/bucket", "SAI_SNAPSHOTS_ACCESS_KEY": "fixture", "SAI_SNAPSHOTS_SECRET_KEY": "fixture"}
                with patch.object(refresh, "clone", side_effect=clone), patch.object(refresh, "check"), patch.object(refresh.subprocess, "run", side_effect=command) as run, patch.dict(refresh.os.environ, env), patch.object(refresh.sys, "argv", argv):
                    first = root / "first"
                    first.mkdir()
                    with patch.object(refresh.tempfile, "TemporaryDirectory", return_value=nullcontext(str(first))):
                        with self.assertRaises(subprocess.CalledProcessError):
                            refresh.main()
                    self.assertEqual((first / "checkout" / refresh.PIN).read_text(), "old snapshot\n")
                    self.assertEqual((first / "checkout" / refresh.SITE_PIN).read_text(), "old site\n")
                    self.assertFalse(any(call.args[0][0] == "git" for call in run.call_args_list))
                    expected = {} if boundary == 1 else {f"{snapshot}.tgz": archive.read_bytes()}
                    self.assertEqual(remote, expected)
                    attempts, failure = 0, None
                    retry = root / "retry"
                    retry.mkdir()
                    with patch.object(refresh.tempfile, "TemporaryDirectory", return_value=nullcontext(str(retry))):
                        refresh.main()
                    self.assertEqual(remote, {f"{snapshot}.tgz": archive.read_bytes(), f"site/{snapshot}.json": data})
                    self.assertEqual((retry / "checkout" / refresh.PIN).read_text(), f"{snapshot}\n")
                    self.assertEqual((retry / "checkout" / refresh.SITE_PIN).read_text(), site_pin)
                    commits = [call.args[0] for call in run.call_args_list if "commit" in call.args[0]]
                    self.assertEqual(len(commits), 1)
                    self.assertEqual(commits[0][-2:], [refresh.PIN, refresh.SITE_PIN])

    def test_archive_artifact_and_transition_pin(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            archive = root / "snapshot.tgz"
            manifest = {"format": "sai-news-view/5", "views": {"z": {}, "a": {}}, "moved": {"old": "a"}, "texts": {"unused": "absent"}}
            raw = json.dumps(manifest).encode()
            with tarfile.open(archive, "w:gz") as packed:
                entry = tarfile.TarInfo("./manifest.json")
                entry.size = len(raw)
                packed.addfile(entry, io.BytesIO(raw))
            snapshot = hashlib.sha256(raw).hexdigest()[:24]
            data, pin = refresh.site_artifact(archive)
            self.assertEqual(refresh.snapshot_id(archive), snapshot)
            self.assertEqual(json.loads(data), {"format": manifest["format"], "id": snapshot, "views": ["a", "z"], "moved": {"old": "a"}})
            self.assertEqual(pin, f"{snapshot} {hashlib.sha256(data).hexdigest()}\n")
            self.assertEqual(refresh.site_artifact(archive), (data, pin))
            current = root / refresh.PIN
            current.parent.mkdir(parents=True)
            current.write_text(f"{snapshot}\n")
            with patch.object(refresh.subprocess, "run") as run:
                self.assertTrue(refresh.commit_pin(folder, "test", snapshot, pin))
                self.assertEqual((root / refresh.SITE_PIN).read_text(), pin)
                self.assertIn(["git", "-C", folder, "add", "--", refresh.PIN, refresh.SITE_PIN], [call.args[0] for call in run.call_args_list])
                run.reset_mock()
                self.assertFalse(refresh.commit_pin(folder, "test", snapshot, pin))
                run.assert_not_called()
                (root / refresh.SITE_PIN).write_text("outdated\n")
                self.assertTrue(refresh.commit_pin(folder, "test", snapshot, pin))
                self.assertEqual((root / refresh.SITE_PIN).read_text(), pin)


if __name__ == "__main__":
    unittest.main()
