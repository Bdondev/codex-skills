# Guidance and skill layering

The aim is **small, reliable always-on instructions**, with detailed procedures loaded only for applicable work.

## Choose the right home

| Information | Where it belongs |
| --- | --- |
| Stack, source conventions, hard constraints, verified build/test commands | Root `AGENTS.md` (Codex) or `CLAUDE.md` (Claude Code) |
| Specialized repeatable procedure (design-to-code, email module build, visual regression) | `SKILL.md` in a skill folder |
| Lengthy design specifications, architecture rationale, content, progress | `docs/` or other project documentation |
| Reusable deterministic validation | Script in a skill, or normal project script if used by CI/build |
| One-time instructions for a single ticket | The task prompt, not persistent guidance |

## Discovery locations

- Codex project skills: `<repo>/.agents/skills/<skill-name>/SKILL.md`
- Codex personal skills: `~/.agents/skills/<skill-name>/SKILL.md`
- Claude Code project skills: `<repo>/.claude/skills/<skill-name>/SKILL.md`
- Claude Code personal skills: `~/.claude/skills/<skill-name>/SKILL.md`
- Codex repo guidance: `AGENTS.md` (also inspect nested/override guidance if present).
- Claude Code repo guidance: `CLAUDE.md` (also inspect related instructions if present).

Do not assume that Codex loads `.claude/skills` or Claude loads `.agents/skills` natively. Copy/install the portable skill in the correct directory for the target agent rather than relying on implicit cross-discovery.

## Merge policy for existing guidance

1. Read the existing file before proposing edits.
2. Compare its actual rules with verified project requirements.
3. Preserve user-authored rules, ordering where practical, and project-specific details.
4. Avoid duplicated rules and generic boilerplate. Resolve contradictory instructions visibly.
5. Make minimal, section-level edits; never replace the file wholesale without explicit authorization.
6. Do not repeatedly rewrite instructions during individual component/section tasks unless requirements changed.
7. Reference long docs or relevant skills rather than embedding their entire contents.

## Skill creation threshold

Create a new skill **only when all are true**:

- A specific procedure will recur or is sufficiently complex/error-prone.
- Existing project/personal skills do not already cover it adequately.
- It has a distinct trigger and a testable outcome.
- The user approved creation and location.

Examples of potentially valuable project workflows: mockup-to-section implementation, responsive visual QA, HTML-email compatibility checks, WordPress local QA, launch validation. These are examples, **not a checklist to generate**.

## Concise instruction file checklist

Keep: project identity (brief), actual stack, major paths, constraints, verified commands, definition of done, pointers to project docs.

Exclude: exhaustive tutorials, repeated general programming advice, speculative commands, duplicated readme content, long task histories, skills copied inline.
