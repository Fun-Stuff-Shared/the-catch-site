#!/usr/bin/env python3
"""Replay committed claim rounds against their report-addition commit's parent.

No checkout, writes or model calls. Only the historical hash function is evaluated.
Report and claim
identity are kept separate: a parent is not necessarily the original pack state.
"""

import argparse
import ast
import hashlib
import importlib.util
import json
import re
import subprocess
from pathlib import Path

KEYWORDS = r"\b(days?|weeks?|months?|calendar|total|sum|percent(?:age)?|difference|arithmetic)\b|%|does not add up"
ROOT = Path(__file__).resolve().parents[1]


def historical_hash(source):
    tree = ast.parse(source)
    hashed = next(node for node in tree.body if isinstance(node, ast.Assign)
                  and any(isinstance(target, ast.Name) and target.id == "HASHED" for target in node.targets))
    function = next(node for node in tree.body if isinstance(node, ast.FunctionDef) and node.name == "claim_hash")
    namespace = {"hashlib": hashlib, "json": json, "HASHED": ast.literal_eval(hashed.value)}
    exec(compile(ast.Module(body=[function], type_ignores=[]), "<historical claim_hash>", "exec"), namespace)
    return namespace["claim_hash"]


class GitObjects:
    def __init__(self, root):
        self.process = subprocess.Popen(["git", "cat-file", "--batch"], cwd=root,
                                        stdin=subprocess.PIPE, stdout=subprocess.PIPE)
        self.cache = {}

    def read(self, revision, path):
        key = f"{revision}:{path}"
        if key not in self.cache:
            self.process.stdin.write((key + "\n").encode())
            self.process.stdin.flush()
            header = self.process.stdout.readline().decode().strip().split()
            if header[-1] == "missing":
                self.cache[key] = None
            else:
                size = int(header[-1])
                self.cache[key] = self.process.stdout.read(size).decode("utf-8", errors="replace")
                self.process.stdout.read(1)
        return self.cache[key]

    def close(self):
        self.process.stdin.close()
        self.process.wait()


def replay(root, labels, arith):
    paths = subprocess.check_output(["git", "ls-files", "checks/records"], cwd=root, text=True).splitlines()
    additions = {}
    pending = {path: path for path in paths if re.search(r"-claims-r\d+\.md$", path)}
    log = subprocess.check_output([
        "git", "log", "--format=COMMIT %H", "--name-status", "--find-renames",
        "--", "checks/records"], cwd=root, text=True)
    for line in log.splitlines():
        if line.startswith("COMMIT "):
            commit = line.split()[1]
        else:
            fields = line.split("\t")
            if len(fields) == 3 and fields[0].startswith("R") and fields[2] in pending:
                pending[fields[1]] = pending.pop(fields[2])
            elif len(fields) == 2 and fields[0] == "A" and fields[1] in pending:
                additions[pending.pop(fields[1])] = (commit, fields[1])
    if pending:
        raise ValueError(f"could not find report additions: {sorted(pending)}")
    objects = GitObjects(root)
    rounds = []
    try:
        for path, (commit, original_path) in sorted(additions.items()):
            name = Path(path).name
            m = re.fullmatch(r"(.+)-claims-r(\d+)\.md", name)
            if not m:
                continue
            story, round_number = m[1], int(m[2])
            historical_story = Path(original_path).name.rsplit("-claims-r", 1)[0]
            added_report = objects.read(commit, original_path)
            report = objects.read("HEAD", path) or added_report
            verdicts = re.findall(r"CLAIMS (?:DO NOT HOLD|HOLD)", report)
            verdict = verdicts[-1] if verdicts else "NO VERDICT"
            parent = commit + "^"
            raw_ledger = objects.read(parent, f"checks/claims/{historical_story}.json")
            raw_manifest = objects.read(parent, f"checks/manifests/{historical_story}.json")
            row = dict(report=name, commit=commit, parent=parent, story=story,
                       historical_report=original_path, historical_story=historical_story,
                       round=round_number, verdict=verdict,
                       report_changed_since_addition=report != added_report,
                       candidate=bool(re.search(KEYWORDS, report, re.I)),
                       findings=labels.get("findings", {}).get(name, []),
                       mismatches=[], computations=0, unavailable=[], claims={}, held_claim_ids=[], packed_claim_ids=[])
            if not raw_ledger or not raw_manifest:
                row["unavailable"].append("parent ledger or manifest absent")
            else:
                ledger, manifest = json.loads(raw_ledger), json.loads(raw_manifest)
                source = objects.read(parent, "skills/catch-record/scripts/claims.py")
                if source is None:
                    raise ValueError(f"historical claims.py absent at {parent}")
                claim_hash = historical_hash(source)
                held = json.loads(objects.read(parent, f"checks/reads/{historical_story}-claims-held.json") or "{}")
                records = {r["id"]: r for r in manifest["records"]}
                texts = {}
                for rid, record in records.items():
                    text_path = record.get("text_path")
                    if text_path:
                        text = objects.read(parent, text_path)
                        if text is None:
                            row["unavailable"].append(f"missing record {rid}: {text_path}")
                        else:
                            texts[rid] = text
                for claim in ledger["claims"]:
                    row["claims"][claim["id"]] = claim.get("says", "")
                    if held.get(claim["id"]) == claim_hash(claim):
                        row["held_claim_ids"].append(claim["id"])
                        continue
                    row["packed_claim_ids"].append(claim["id"])
                    for stated, result, matches in arith.computations(claim, records, texts):
                        row["computations"] += 1
                        if not matches:
                            row["mismatches"].append(dict(claim=claim["id"], says=claim["says"], stated=stated, result=result))
            for finding in row["findings"]:
                parent_says = row["claims"].get(finding["claim"])
                finding = dict(finding)
                finding["parent_claim_present"] = parent_says is not None
                finding["parent_wording_matches"] = parent_says == finding["says"]
                finding["packed"] = finding["claim"] in row["packed_claim_ids"]
                finding["caught"] = finding["parent_wording_matches"] and any(
                    x["claim"] == finding["claim"] for x in row["mismatches"])
                row.setdefault("evaluated_findings", []).append(finding)
            rounds.append(row)
    finally:
        objects.close()
    reviews = labels.get("recomputation_reviews", [])
    for row in rounds:
        flagged = {f["claim"] for f in row["findings"]}
        for mismatch in row["mismatches"]:
            mismatch["report_faults_same_claim"] = mismatch["claim"] in flagged
            review = next((review for review in reviews if all(
                mismatch[key] == review[key] for key in ("claim", "stated", "result"))), None)
            mismatch["recomputation_correct"] = review["correct"] if review else None
            mismatch["true_false_positive"] = review is not None and not review["correct"]
            mismatch["model_missed"] = review is not None and review["correct"] and mismatch["claim"] not in flagged
    return rounds


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true", help="full per-round machine-readable results")
    args = parser.parse_args()
    spec = importlib.util.spec_from_file_location("arith", ROOT / "skills/catch-record/scripts/arith.py")
    arith = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(arith)
    labels = json.loads((ROOT / "scripts/claims-arith-findings.json").read_text())
    rounds = replay(ROOT, labels, arith)
    reviewed = {f"{story}-claims-r{number}.md" for story, numbers in labels["reviewed_candidates"].items() for number in numbers}
    candidates = {r["report"] for r in rounds if r["candidate"] and r["verdict"] == "CLAIMS DO NOT HOLD"}
    if candidates != reviewed:
        raise ValueError(f"keyword review out of date: new={sorted(candidates - reviewed)}, removed={sorted(reviewed - candidates)}")
    if args.json:
        print(json.dumps(rounds, indent=2, ensure_ascii=False))
        return
    for row in rounds:
        print(f'{row["report"]}: {row["verdict"]}; {row["computations"]} computations; '
              f'{len(row["mismatches"])} mismatches; {len(row["packed_claim_ids"])} packed claims; {len(row["unavailable"])} unavailable inputs')
        for mismatch in row["mismatches"]:
            category = "UNREVIEWED" if mismatch["recomputation_correct"] is None else "TRUE FP" if mismatch["true_false_positive"] else "MODEL MISSED" if mismatch["model_missed"] else "CAUGHT"
            print(f'  {category} {mismatch["claim"]}: {mismatch["stated"]} but {mismatch["result"]}')
    failing = [r for r in rounds if r["verdict"] == "CLAIMS DO NOT HOLD"]
    arithmetic = [r for r in failing if r["findings"]]
    caught = [r for r in arithmetic if any(f["caught"] for f in r.get("evaluated_findings", []))]
    findings = [f for r in arithmetic for f in r.get("evaluated_findings", [])]
    mismatches = [m for r in rounds for m in r["mismatches"]]
    print(f"SUMMARY {len(rounds)} reports; {len(failing)} failing; "
          f"{sum(r['candidate'] for r in failing)} keyword candidates; "
          f"{len(arithmetic)} arithmetic-finding reports; {len(caught)} caught reports; "
          f"{len(arithmetic) - len(caught)} missed reports")
    print(f"FINDINGS {len(findings)} labelled; {sum(f['caught'] for f in findings)} caught; "
          f"{sum(not f['caught'] for f in findings)} missed")
    print(f"SUMMARY CLASSIFICATION {sum(m['true_false_positive'] for m in mismatches)} true false positives; "
          f"{sum(m['model_missed'] for m in mismatches)} genuine discrepancies the model passed; "
          f"{sum(m['recomputation_correct'] is None for m in mismatches)} unreviewed mismatches")
    for row in rounds:
        for mismatch in row["mismatches"]:
            if mismatch["model_missed"]:
                print(f'MODEL MISSED {row["report"]} [{mismatch["claim"]}]')
        for cid in ("reuters-ipsos", "rodriguez-99"):
            if cid in row["claims"]:
                print(f'PACKED {row["report"]} [{cid}]: {cid in row["packed_claim_ids"]}')
    print(f"PROVENANCE {sum(bool(r['unavailable']) for r in rounds)} rounds with unavailable inputs; "
          f"{sum(not f['parent_wording_matches'] for f in findings)} findings whose report wording differs from parent ledger; "
          f"{sum(r['report_changed_since_addition'] for r in rounds)} reports edited after addition")
    print(f"RENAMES {sum(r['story'] != r['historical_story'] for r in rounds)} reports followed to their original paths")
    for row in arithmetic:
        for f in row.get("evaluated_findings", []):
            if not f["caught"]:
                print(f'MISS {row["report"]} [{f["claim"]}]: {f["reason"]}; '
                      f'parent claim present={f["parent_claim_present"]}, wording matches={f["parent_wording_matches"]}')
    print("The issue's 71 arithmetic-failing reports is not reproduced by this labelled corpus.")


if __name__ == "__main__":
    main()
