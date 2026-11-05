#!/usr/bin/env python3
"""Sends a published story's records, figures and claims to sai-core's capture intake, so the core holds them.

Run from a worktree that has the story. The core files the story on subject-event-<series>-<moment> and asks its
resolver once where that subject belongs. Sending again adds nothing: the intake keys each record by its bytes and
the story.
"""
import hashlib
import json
import mimetypes
import os
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

URL = os.environ.get("SAI_INTAKE_URL", "http://sai.tailb77c8a.ts.net:8401")
SECRET = "agents/sai-intake/SAI_OUTBOX_TOKEN"
STATUSES = {"fact", "said", "alleged", "plans", "expected"}


def token() -> str:
    if given := os.environ.get("SAI_OUTBOX_TOKEN"):
        return given
    home = {**os.environ, "SETEC_SERVER": "https://secrets.tailb77c8a.ts.net", "PATH": f"{Path.home()}/.local/bin:{os.environ['PATH']}"}
    return subprocess.run(["setec", "get", SECRET], env=home, check=True, capture_output=True, text=True).stdout.strip()


def figure_mention(figure: dict) -> dict:
    quantity = {"kind": "quantity", "amount": str(figure["value"]), "unit": figure["unit"], "dimension": "count"}
    return {
        "id": figure["figure"], "quote": figure["source"]["quote_span"], "value": quantity, "author_status": "fact",
        "claim_key": {"attribute": "count", "dimension": f"metric={figure['figure']}"},
    }


def claim_mention(claim: dict, passage: str, index: int) -> dict:
    status = claim.get("status")
    return {
        "id": f"{claim['id']}-{index}", "quote": passage, "value": {"kind": "proposition", "text": claim["says"]},
        "author_status": status if status in STATUSES else "fact", "claim_key": {"attribute": "statement"},
    }


def mentions_by_record(manifest: dict, claims: list[dict]) -> tuple[dict[str, list[dict]], list[str]]:
    """What each record supports: a sourced figure's quote, and every passage a claim cites. A computed figure rests
    on no one passage, and a figure with no number is not a quantity, so they stay on the page alone."""
    held: dict[str, list[dict]] = {}
    left: list[str] = []
    for figure in manifest.get("figures", []):
        source = figure.get("source") or {}
        if figure.get("kind") != "sourced" or not source.get("source_id") or not source.get("quote_span"):
            left.append(figure.get("figure", "?"))
            continue
        try:
            float(str(figure["value"]))
        except ValueError:
            left.append(figure["figure"])
            continue
        held.setdefault(source["source_id"], []).append(figure_mention(figure))
    for claim in claims:
        for index, evidence in enumerate(claim.get("evidence", [])):
            held.setdefault(evidence["record"], []).append(claim_mention(claim, evidence["passage"], index))
    return held, left


def blob(path: Path) -> dict:
    data = path.read_bytes()
    return {"sha256": hashlib.sha256(data).hexdigest(), "size": len(data), "media_type": mimetypes.guess_type(path.name)[0] or "application/octet-stream"}


def document(record: dict, story: str, label: str, lede: str, published: str, mentions: list[dict]) -> dict:
    payload = {"label": label, "lede": lede, "published": published, "mentions": mentions}
    attributes = {"url": record.get("url"), "publisher": record.get("publisher"), "title": record.get("title"), "published_at": record.get("date"), "story": story, "authored": json.dumps(payload, ensure_ascii=False)}
    return {"raw": blob(Path(record.get("pinned_path") or record["text_path"])), "text": blob(Path(record["text_path"])), "attributes": {key: value for key, value in attributes.items() if value is not None}}


def call(method: str, path: str, credential: str, body: bytes | None = None) -> dict:
    request = urllib.request.Request(URL + path, data=body, method=method, headers={"Authorization": f"Bearer {credential}", "User-Agent": "catch-site"})
    with urllib.request.urlopen(request, timeout=300) as response:
        return json.load(response)


def send(story: str) -> dict:
    manifest = json.loads(Path(f"checks/manifests/{story}.json").read_text())
    claims = json.loads(Path(f"checks/claims/{story}.json").read_text())["claims"] if Path(f"checks/claims/{story}.json").exists() else []
    label = manifest.get("story_title") or manifest["event"]
    lede = " ".join(claim["says"] for claim in claims[:5]) or label
    held, left = mentions_by_record(manifest, claims)
    known = {record["id"] for record in manifest["records"]}
    if unknown := sorted(set(held) - known):
        raise SystemExit(f"{story}: figures or claims cite records the manifest lacks: {', '.join(unknown)}")
    documents = [document(record, story, label, lede, manifest["date"], held.get(record["id"], [])) for record in manifest["records"] if record.get("text_path")]
    credential = token()
    body = json.dumps({"run": {"story": story}, "documents": documents}, ensure_ascii=False, sort_keys=True).encode()
    run = f"authored-{hashlib.sha256(body).hexdigest()[:24]}"
    answer = call("POST", f"/runs/{run}/manifest", credential, body)
    paths = {blob_row["sha256"]: Path(record.get(field) or record["text_path"]) for record, row in zip([r for r in manifest["records"] if r.get("text_path")], documents, strict=True) for field, blob_row in (("pinned_path", row["raw"]), ("text_path", row["text"]))}
    for sha in answer["missing"]:
        call("PUT", f"/blobs/{sha}", credential, paths[sha].read_bytes())
    done = call("POST", f"/runs/{run}/commit", credential, json.dumps({"manifest": answer["manifest"]}).encode())
    return {"story": story, "subject": "subject-event-" + story.replace("--", "-", 1), "run": run, "documents": len(documents), "added": done["added"], "mentions": sum(len(rows) for rows in held.values()), "figures_left_on_the_page": left}


if __name__ == "__main__":
    try:
        print(json.dumps(send(sys.argv[1])))
    except urllib.error.HTTPError as error:
        raise SystemExit(f"intake answered {error.code}: {error.read().decode(errors='replace')[:400]}") from error
