#!/usr/bin/env bash

set -u

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd -P)
cd "$SCRIPT_DIR" || exit 1

if [ -n "$(git status --porcelain --untracked-files=all)" ]; then
  echo "Error: repository has uncommitted changes. Commit or stash them before updating." >&2
  git status --short >&2
  exit 1
fi

git pull --ff-only || exit 1
exec "$SCRIPT_DIR/install.sh" "$@"
