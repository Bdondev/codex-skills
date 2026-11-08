#!/usr/bin/env python3
"""Audit recorded command evidence, fail-closed on missing or non-PASS checks.

This audits command execution evidence only, not the acceptance matrix or
visual/behavioral correctness of the finished feature.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import sys


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dir", required=True, help="Folder containing <check>.json and <check>.log")
    parser.add_argument("--require", action="append", default=[], help="Required check name; repeatable")
    args = parser.parse_args()
    folder = Path(args.dir).resolve()
    failed = False

    if not args.require:
        parser.error("Specify at least one --require check; avoid accidentally passing an empty set")

    for name in args.require:
        if not name.replace("_", "-").replace("-", "").isalnum() or len(name) > 80:
            print(f"INVALID check name: {name}")
            failed = True
            continue
        record_path = folder / f"{name}.json"
        log_path = folder / f"{name}.log"
        if not record_path.is_file() or not log_path.is_file():
            print(f"{name}: BLOCKED — missing command record/log")
            failed = True
            continue
        try:
            data = json.loads(record_path.read_text(encoding="utf-8"))
            digest = hashlib.sha256(log_path.read_bytes()).hexdigest()
            consistent = (data.get("check") == name and data.get("log") == log_path.name
                          and data.get("log_sha256") == digest and isinstance(data.get("command"), list)
                          and len(data["command"]) > 0)
            passed = (data.get("status") == "PASS" and data.get("exit_code") == 0)
            if consistent and passed:
                print(f"{name}: PASS — command exit 0; log hash matches record")
            else:
                print(f"{name}: FAIL/BLOCKED — evidence inconsistent or command did not pass")
                failed = True
        except (OSError, ValueError, TypeError, KeyError) as exc:
            print(f"{name}: BLOCKED — invalid evidence ({type(exc).__name__})")
            failed = True

    print("This audit does not prove that acceptance criteria, visual fidelity, or security have passed.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
