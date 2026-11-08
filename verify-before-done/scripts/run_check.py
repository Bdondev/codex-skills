#!/usr/bin/env python3
"""Capture a real local check's exit status and output as verification evidence.

This only proves the command was executed and its exit status; it does not
prove that the command adequately tests a user's acceptance criteria.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import time
from datetime import datetime, timezone


def now_utc() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", required=True, help="Directory for per-check artifacts")
    parser.add_argument("--name", required=True, help="Safe check id, e.g. build or theme-check")
    parser.add_argument("--cwd", default=".", help="Project working directory")
    parser.add_argument("--timeout", type=int, default=300, help="Timeout in seconds (default: 300)")
    parser.add_argument("command", nargs=argparse.REMAINDER, help="Run after --, e.g. -- npm run build")
    args = parser.parse_args()
    if not re.fullmatch(r"[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}", args.name):
        parser.error("--name must be 1-80 letters, numbers, underscore or hyphen")
    if args.timeout <= 0:
        parser.error("--timeout must be a positive integer")
    args.command = args.command[1:] if args.command[:1] == ["--"] else args.command
    if not args.command:
        parser.error("supply a command after --")
    return args


def risky_action(args: list[str]) -> bool:
    """Guard a few well-known *direct* publishing/deleting commands.

    Not a sandbox/security boundary; project scripts may themselves have side effects.
    """
    stem = Path(args[0]).name.lower()
    words = [stem] + [arg.lower() for arg in args[1:]]
    return bool(
        (stem == "git" and len(words) > 1 and words[1] in {"push", "merge", "reset", "clean"})
        or (stem == "shopify" and len(words) > 2 and words[1:3] in
            (["theme", "push"], ["theme", "publish"], ["theme", "delete"], ["theme", "share"]))
        or (stem in {"npm", "pnpm", "yarn"} and len(words) > 1 and words[1] == "publish")
    )


def write_json(path: Path, data: dict) -> None:
    temp = path.with_suffix(".tmp")
    temp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    temp.replace(path)


def main() -> int:
    args = parse_args()
    os.umask(0o077)  # private logs by default; examine before sharing
    directory = Path(args.out).expanduser().resolve()
    directory.mkdir(parents=True, exist_ok=True)
    cwd = Path(args.cwd).expanduser().resolve()
    log = directory / f"{args.name}.log"
    record_file = directory / f"{args.name}.json"

    record: dict = {
        "schema_version": 1,
        "check": args.name,
        "command": args.command,
        "cwd": str(cwd),
        "started_at": now_utc(),
        "finished_at": None,
        "duration_seconds": None,
        "status": "BLOCKED",
        "exit_code": None,
        "reason": None,
        "log": log.name,
        "log_sha256": None,
    }
    start = time.monotonic()

    with log.open("wb") as stream:
        if not cwd.is_dir():
            record["reason"] = f"Working directory does not exist: {cwd}"
            stream.write((record["reason"] + "\n").encode())
        elif risky_action(args.command):
            record["reason"] = "Refusing a known publishing/destructive command as a verification check"
            stream.write((record["reason"] + "\n").encode())
        else:
            try:
                result = subprocess.run(
                    args.command,
                    cwd=cwd,
                    stdin=subprocess.DEVNULL,
                    stdout=stream,
                    stderr=subprocess.STDOUT,
                    timeout=args.timeout,
                    check=False,
                )
                record["exit_code"] = result.returncode
                record["status"] = "PASS" if result.returncode == 0 else "FAIL"
            except subprocess.TimeoutExpired:
                record["reason"] = f"Check timed out after {args.timeout}s"
            except FileNotFoundError:
                record["reason"] = f"Command unavailable: {args.command[0]}"
            except OSError as error:
                record["reason"] = f"Could not execute command: {error.__class__.__name__}"
            if record["reason"]:
                stream.write((record["reason"] + "\n").encode())

    record["finished_at"] = now_utc()
    record["duration_seconds"] = round(time.monotonic() - start, 3)
    record["log_sha256"] = hashlib.sha256(log.read_bytes()).hexdigest()
    write_json(record_file, record)
    print(f"{args.name}: {record['status']} (exit={record['exit_code']}, evidence={record_file})")
    print("Note: check status is not equivalent to complete task acceptance.")
    return 0 if record["status"] == "PASS" else 1


if __name__ == "__main__":
    sys.exit(main())
