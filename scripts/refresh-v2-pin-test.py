import hashlib
import importlib.util
import io
import json
import tarfile
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("refresh", Path(__file__).with_name("refresh-v2-pin.py"))
refresh = importlib.util.module_from_spec(spec)
spec.loader.exec_module(refresh)


class SiteArtifactTest(unittest.TestCase):
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
