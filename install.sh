#!/usr/bin/env bash

set -u

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd -P)
REPO_ROOT=$SCRIPT_DIR
AGENTS_SKILLS_DIR=${AGENTS_SKILLS_DIR:-"${HOME}/.agents/skills"}
CLAUDE_SKILLS_DIR=${CLAUDE_SKILLS_DIR:-"${HOME}/.claude/skills"}

usage() {
  cat <<'EOF'
Usage: ./install.sh [--copy] [--all | SKILL_NAME]

Install all discovered skills by default, or one skill by directory name.
  --copy  Copy skill directories instead of creating symbolic links.
  --all   Install every unambiguous discovered skill (the default).
EOF
}

die() {
  echo "Error: $*" >&2
  exit 1
}

mode=symlink
requested=all
discovery_conflicts=0

while [ "$#" -gt 0 ]; do
  case "$1" in
    --copy)
      mode=copy
      ;;
    --all)
      requested=all
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --*)
      die "unknown option: $1"
      ;;
    *)
      [ "$requested" = all ] || die "only one skill may be selected"
      requested=$1
      ;;
  esac
  shift
done

tmp_dir=$(mktemp -d "${TMPDIR:-/tmp}/codex-skills.XXXXXX") || die "could not create a temporary directory"
cleanup() {
  rm -rf "$tmp_dir"
}
trap cleanup EXIT HUP INT TERM

manifest=$tmp_dir/manifest
: > "$manifest"

while IFS= read -r skill_file; do
  skill_dir=$(dirname -- "$skill_file")
  skill_name=$(basename -- "$skill_dir")
  skill_dir=$(CDPATH= cd -- "$skill_dir" && pwd -P) || die "could not resolve $skill_dir"
  printf '%s\t%s\n' "$skill_name" "$skill_dir" >> "$manifest"
done < <(find "$REPO_ROOT" -type f -name SKILL.md -not -path "$REPO_ROOT/.git/*" -print | sort)

[ -s "$manifest" ] || die "no SKILL.md files were found under $REPO_ROOT"

find_candidate() {
  candidate_name=$1
  candidate_count=0
  candidate_dir=
  while IFS='	' read -r found_name found_dir; do
    if [ "$found_name" = "$candidate_name" ]; then
      candidate_count=$((candidate_count + 1))
      candidate_dir=$found_dir
    fi
  done < "$manifest"
}

if [ "$requested" != all ]; then
  find_candidate "$requested"
  [ "$candidate_count" -gt 0 ] || die "skill not found: $requested"
  [ "$candidate_count" -eq 1 ] || die "skill name is ambiguous: $requested (found $candidate_count SKILL.md files)"
  selected=$tmp_dir/selected
  printf '%s\t%s\n' "$requested" "$candidate_dir" > "$selected"
else
  selected=$tmp_dir/selected
  : > "$selected"
  seen=$tmp_dir/seen
  : > "$seen"
  while IFS='	' read -r skill_name skill_dir; do
    if grep -Fqx "$skill_name" "$seen"; then
      continue
    fi
    printf '%s\n' "$skill_name" >> "$seen"
    find_candidate "$skill_name"
    if [ "$candidate_count" -gt 1 ]; then
      echo "Conflict: skill '$skill_name' has $candidate_count discovered locations; skipping it." >&2
      discovery_conflicts=$((discovery_conflicts + 1))
      continue
    fi
    printf '%s\t%s\n' "$skill_name" "$candidate_dir" >> "$selected"
  done < "$manifest"
fi

[ -s "$selected" ] || die "nothing to install"

mkdir -p "$AGENTS_SKILLS_DIR" "$CLAUDE_SKILLS_DIR" || die "could not create global skill directories"

installed=0
conflicts=$discovery_conflicts
already_present=0

install_one() {
  skill_name=$1
  source_dir=$2
  target_root=$3
  destination=$target_root/$skill_name

  if [ -L "$destination" ]; then
    destination_target=$(readlink "$destination")
    destination_target=$(CDPATH= cd -- "$(dirname -- "$destination")" && cd -- "$destination_target" 2>/dev/null && pwd -P) || destination_target=
    if [ "$destination_target" = "$source_dir" ]; then
      already_present=$((already_present + 1))
      return 0
    fi
    echo "Conflict: $destination already links to a different location; leaving it unchanged." >&2
    conflicts=$((conflicts + 1))
    return 0
  fi

  if [ -e "$destination" ]; then
    echo "Conflict: $destination already exists; leaving it unchanged." >&2
    conflicts=$((conflicts + 1))
    return 0
  fi

  if [ "$mode" = symlink ]; then
    if ! ln -s "$source_dir" "$destination" 2>/dev/null; then
      echo "Could not create symbolic link at $destination." >&2
      echo "Retry with --copy if this filesystem does not support symbolic links." >&2
      return 1
    fi
  else
    if ! cp -R "$source_dir" "$destination"; then
      echo "Could not copy $source_dir to $destination." >&2
      return 1
    fi
  fi
  installed=$((installed + 1))
}

while IFS='	' read -r skill_name source_dir; do
  install_one "$skill_name" "$source_dir" "$AGENTS_SKILLS_DIR" || exit 1
  install_one "$skill_name" "$source_dir" "$CLAUDE_SKILLS_DIR" || exit 1
done < "$selected"

verify_root() {
  verify_root_path=$1
  verify_failed=0
  while IFS='	' read -r skill_name source_dir; do
    destination=$verify_root_path/$skill_name
    if [ "$mode" = symlink ]; then
      if [ ! -L "$destination" ] || [ ! -f "$destination/SKILL.md" ]; then
        echo "Verification failed: $destination is not a linked skill with SKILL.md." >&2
        verify_failed=1
      fi
    elif [ ! -f "$destination/SKILL.md" ]; then
      echo "Verification failed: $destination has no SKILL.md." >&2
      verify_failed=1
    fi
  done < "$selected"
  return "$verify_failed"
}

verify_root "$AGENTS_SKILLS_DIR" || exit 1
verify_root "$CLAUDE_SKILLS_DIR" || exit 1

echo "Discovered $(wc -l < "$manifest" | tr -d ' ') skill location(s)."
echo "Installed $installed target(s); $already_present already current; $conflicts conflict(s)."
echo "Verified Codex skills at $AGENTS_SKILLS_DIR"
echo "Verified Claude Code skills at $CLAUDE_SKILLS_DIR"

[ "$conflicts" -eq 0 ]
