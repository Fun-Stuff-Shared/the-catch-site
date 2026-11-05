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


def blob(data: bytes, media_type: str) -> dict:
    return {"sha256": hashlib.sha256(data).hexdigest(), "size": len(data), "media_type": media_type}


def utf8(data: bytes) -> bytes:
    """The core reads text as UTF-8. A saved text in another encoding, as some extracted PDFs are, is sent recoded;
    its pinned bytes stay the record."""
    try:
        data.decode("utf-8")
        return data
    except UnicodeDecodeError:
        return data.decode("cp1252", "replace").encode("utf-8")


def document(record: dict, story: str, label: str, lede: str, published: str, mentions: list[dict], files: dict[str, bytes]) -> dict:
    payload = {"label": label, "lede": lede, "published": published, "mentions": mentions}
    attributes = {"url": record.get("url"), "publisher": record.get("publisher"), "title": record.get("title"), "published_at": record.get("date"), "story": story, "authored": json.dumps(payload, ensure_ascii=False)}
    path = Path(record.get("pinned_path") or record["text_path"])
    raw, text = path.read_bytes(), utf8(Path(record["text_path"]).read_bytes())
    files[hashlib.sha256(raw).hexdigest()] = raw
    files[hashlib.sha256(text).hexdigest()] = text
    return {"raw": blob(raw, mimetypes.guess_type(path.name)[0] or "application/octet-stream"), "text": blob(text, "text/plain"), "attributes": {key: value for key, value in attributes.items() if value is not None}}


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
    sendable = [record for record in manifest["records"] if record.get("text_path")]
    if unread := sorted(set(held) - {record["id"] for record in sendable}):
        raise SystemExit(f"{story}: figures or claims cite records with no saved text: {', '.join(unread)}")
    files: dict[str, bytes] = {}
    documents = [document(record, story, label, lede, manifest["date"], held.get(record["id"], []), files) for record in sendable]
    credential = token()
    body = json.dumps({"run": {"story": story}, "documents": documents}, ensure_ascii=False, sort_keys=True).encode()
    run = f"authored-{hashlib.sha256(body).hexdigest()[:24]}"
    answer = call("POST", f"/runs/{run}/manifest", credential, body)
    for sha in answer["missing"]:
        call("PUT", f"/blobs/{sha}", credential, files[sha])
    done = call("POST", f"/runs/{run}/commit", credential, json.dumps({"manifest": answer["manifest"]}).encode())
    return {"story": story, "subject": "subject-event-" + story.replace("--", "-", 1), "run": run, "documents": len(documents), "added": done["added"], "mentions": sum(len(rows) for rows in held.values()), "figures_left_on_the_page": left}


if __name__ == "__main__":
    try:
        print(json.dumps(send(sys.argv[1])))
    except urllib.error.HTTPError as error:
        raise SystemExit(f"intake answered {error.code}: {error.read().decode(errors='replace')[:400]}") from error
