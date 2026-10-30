# Project Kickstart — reusable Codex & Claude Code skill

A portable, instruction-only agent skill for **starting or restarting a web development project correctly**: requirements → read-only audit → architecture → instructions/skills audit → milestone plan → approved setup. It does not build the website for you.

## Contents

- `SKILL.md` — small orchestration and the two-phase gate
- `references/` — detailed audit, architecture, guidance-layering and handoff procedures
- `templates/` — optional starting points for `AGENTS.md`, `CLAUDE.md`, project brief and plan
- `tests/manual-evaluation.md` — six scenarios for assessing skill behavior

## Install on your Mac

Unzip the archive in a temporary folder, `cd` to that folder, and then choose **one** of these destinations. If the skill directory already exists, review its content rather than overwriting it.

**Codex (all your projects):**

```bash
mkdir -p "$HOME/.agents/skills"
[ ! -e "$HOME/.agents/skills/project-kickstart" ] && cp -R project-kickstart "$HOME/.agents/skills/" || echo 'Skill already exists; compare before replacing.'
```

**Claude Code (all your projects):**

```bash
mkdir -p "$HOME/.claude/skills"
[ ! -e "$HOME/.claude/skills/project-kickstart" ] && cp -R project-kickstart "$HOME/.claude/skills/" || echo 'Skill already exists; compare before replacing.'
```

**Project-scoped alternative:** install the folder at `<repo>/.agents/skills/project-kickstart` for Codex or `<repo>/.claude/skills/project-kickstart` for Claude Code. If using both agents, install an identical copy to each relevant location. Avoid copying it into each repo if your personal installation already covers your needs.

## Invoke it

**Codex:**

```text
$project-kickstart Audit this repository and propose the setup plan. Phase 1 only: read-only, no changes.
```

**Claude Code:**

```text
/project-kickstart Audit this repository and propose the setup plan. Phase 1 only: read-only, no changes.
```

After reviewing the audit, expressly authorize **Phase 2 documentation changes only** and specify Codex, Claude Code, or both. The skill then updates only approved files and stops before actual implementation.

## Why it is designed this way

An agent instruction file is for **persistent, verified rules**. A skill is for a **repeatable workflow**, and supporting docs hold the detail. This keeps `AGENTS.md` or `CLAUDE.md` concise while allowing deeper instructions on demand.

The `SKILL.md` file is tool-neutral: there are no vendor-exclusive fields or executable setup scripts. Skill discovery does depend on installing it in the correct tool-specific directory.

## Official documentation

- OpenAI: https://learn.chatgpt.com/docs/build-skills
- OpenAI: https://learn.chatgpt.com/docs/customization/overview
- Anthropic: https://code.claude.com/docs/en/skills

## Version

1.0 — 2026-10-30. No repository was modified or agent runtime was executed to create this download.
