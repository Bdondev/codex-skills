# Centralized Codex and Claude Code skills

This repository is a reusable skill library for macOS. It discovers every directory containing `SKILL.md` and installs each discovered skill into both:

- `~/.agents/skills/` for Codex
- `~/.claude/skills/` for Claude Code

The default installation creates one symbolic link per skill, so edits and Git updates are immediately shared by both agents.

## Install

From this repository:

```sh
./install.sh
```

Install one skill by its directory name:

```sh
./install.sh verify-before-done
```

The installer recursively discovers `SKILL.md` files. Duplicate directory names are reported as conflicts and skipped during an all-skills install; selecting an ambiguous name stops with an error. Existing files, directories, and links to unrelated locations are never overwritten or deleted.

The installer verifies that each selected skill is available through both agent directories. Running it again is safe and does not create duplicate links.

An all-skills run may still install every unambiguous skill, but returns a non-zero status when it reports a conflict so the conflict cannot be missed.

## Validate every skill

Create the reusable, Git-ignored validation environment once, then run the official validator against every discovered skill:

```sh
python3 -m venv .skill-validation-venv
.skill-validation-venv/bin/python -m pip install PyYAML
set -eu -o pipefail
find . -type f -name SKILL.md -not -path './.git/*' -print0 |
while IFS= read -r -d '' skill_file; do
  .skill-validation-venv/bin/python \
    "$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py" \
    "$(dirname "$skill_file")"
done
```

The environment is excluded by `.gitignore`. This checks skill frontmatter and scaffold invariants; run each skill's existing tests and inspect real platform, browser, CMS, store, ESP, and inbox integrations separately.

## Update

```sh
./update.sh
```

The update script first stops if the repository has any tracked, staged, or untracked changes. With a clean worktree it runs `git pull --ff-only`, then refreshes both global skill directories by running the installer. Pass `--copy` or a skill name through to the installer when needed:

```sh
./update.sh --copy
./update.sh verify-before-done
```

## Adding a skill

1. Create a new directory in this repository.
2. Add a `SKILL.md` file in that directory.
3. Commit the change.
4. Run `./install.sh` (or `./update.sh` when pulling from GitHub).

Skill directory names must be unique across the repository. The GitHub remote for this library is currently `https://github.com/Bdondev/codex-skills.git`.

## Symbolic-link fallback

Symbolic links are the recommended mode. If the filesystem or macOS security settings prevent link creation, use the explicit copy mode:

```sh
./install.sh --copy
```

Copy mode only creates a destination that does not already exist; it never replaces or deletes an existing skill. Because copies do not receive repository changes automatically, rerun `./install.sh --copy` only after resolving or moving the existing destination yourself, while preserving any unrelated skill. Use symlink mode whenever possible.

## Troubleshooting

- **Conflict reported:** inspect the existing destination under `~/.agents/skills/` or `~/.claude/skills/`, or resolve duplicate skill directory names in this repository. The installer leaves the existing item unchanged.
- **No skills found:** confirm that each skill directory contains a file named exactly `SKILL.md`.
- **Update stopped:** `git status --short` will show the local changes. Commit or stash them before running `./update.sh`.
- **Verification failed:** check that both global directories exist and that the selected destination contains `SKILL.md`; then rerun the installer.
- **Permissions:** ensure your user can write to your home directory. The scripts do not require `sudo`.

## Safe testing

Before installing globally, run the scripts with a temporary `HOME` so the target directories are isolated:

```sh
test_home=$(mktemp -d)
HOME="$test_home" ./install.sh
HOME="$test_home" ./install.sh
rm -rf "$test_home"
```

This tests discovery, installation, repeatability, and verification without touching your real agent directories.
