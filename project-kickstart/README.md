# Project Kickstart — reusable Codex & Claude Code skill

A portable, instruction-only agent skill for **starting or restarting a web development project correctly**: requirements → read-only audit → architecture → instructions/skills audit → milestone plan → approved setup. It does not build the website for you.

## Contents

- `SKILL.md` — small orchestration, two-phase gate, and conditional design/platform routing
- `references/` — detailed audit, architecture, guidance-layering, documentation policy and handoff procedures
- `templates/` — optional starting points for `AGENTS.md`, `CLAUDE.md`, project brief, plan, architecture, progress, decisions and QA checklist
- `tests/manual-evaluation.md` — twelve scenarios for assessing skill behavior
- `First prompts` — example invocations

## Documentation selection (v1.2)

| Level | Suggested set (reuse equivalents) |
| --- | --- |
| Lightweight | README or brief; plan if needed |
| Standard | Brief, plan, progress and QA where useful |
| Extended | Standard plus architecture and decisions where useful |

The skill proposes exact files during Phase 1 and creates only those approved during Phase 2. Existing design specs, email docs, issue trackers and other equivalent records remain canonical. Optional documentation is not automatically mandatory. `AGENTS.md` or `CLAUDE.md` can index relevant files by task instead of demanding that every document be read. Ongoing maintenance must be explicitly approved. See [documentation-policy.md](references/documentation-policy.md).

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

**Upgrade from v1.1:** compare the extracted folder against the existing repository's `project-kickstart/` folder. Merge any local customizations, then update that folder with the extracted contents. Review the diff before committing or using your repository's existing installation/update workflow. Do not replace other skills.

## Invoke it

**Codex:**

```text
$project-kickstart Audit this repository and propose the setup plan and minimum useful documentation set. Phase 1 only: read-only, no changes.
```

**Claude Code:**

```text
/project-kickstart Audit this repository and propose the setup plan and minimum useful documentation set. Phase 1 only: read-only, no changes.
```

After reviewing the audit, expressly authorize **Phase 2 documentation changes only** and specify the intended agent instruction file and maintenance scope if applicable. The skill then updates only approved files and stops before actual implementation.

## Why it is designed this way

An agent instruction file is for **persistent, verified rules**. A skill is for a **repeatable workflow**, and supporting docs hold the detail. This keeps `AGENTS.md` or `CLAUDE.md` concise while allowing deeper instructions on demand.

The `SKILL.md` file is tool-neutral: there are no vendor-exclusive fields or executable setup scripts. Skill discovery does depend on installing it in the correct tool-specific directory.

## Official documentation

- OpenAI: https://learn.chatgpt.com/docs/build-skills
- OpenAI: https://learn.chatgpt.com/docs/customization/overview
- Anthropic: https://code.claude.com/docs/en/skills

## Version

1.2.0 — 2026-11-17. Adds complexity-based documentation and maintenance policy while preserving the 1.1 two-phase gate, platform routing and project-specific instructions.
