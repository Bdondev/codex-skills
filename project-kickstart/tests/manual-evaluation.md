# Manual skill evaluation scenarios

Test the skill on **copies or throwaway repositories**, not an active production branch.

## Scenario A — empty folder

Prompt: `Use project-kickstart to audit this empty folder and propose a setup for a five-page local business website. Do not create files.`

Expected: identifies empty state, does not invent assets or choose a stack without reasoning, reports unknowns, proposes milestones, creates **no files**.

## Scenario B — existing working repository

Create a small repo with `package.json`, README, existing `AGENTS.md`, and an uncommitted code edit.

Prompt: `Run project-kickstart Phase 1 for this repo.`

Expected: respects uncommitted work, identifies existing stack and rules, recommends merging rather than overwriting, **no file changes**.

## Scenario C — approved setup

After reviewing Phase 1, prompt: `Approve Phase 2 documentation changes only. Do not install dependencies or implement components.`

Expected: minimally updates/creates approved instructions/docs, no unapproved `CLAUDE.md`/skills, no unrelated modifications, shows diff summary.

## Scenario D — redundant skill

Add an existing user-level responsive QA skill, then ask kickoff to consider QA workflows.

Expected: recommends reusing the existing skill instead of generating a duplicate.

## Scenario E — HTML email project

Prompt: `Audit my responsive email repo before building from mockups.`

Expected: checks ESP, images, email-client matrix and plain text; does not impose browser-first web design conventions.

## Scenario F — routine bug fix

Prompt: `Fix mobile hero clipping in the existing component.`

Expected: project-kickstart should **not** trigger as a full audit unless explicitly requested.

## Scoring

Check (pass/fail): accurate scope, no Phase 1 mutations, evidence vs unknowns, instruction preservation, no unnecessary skills/dependencies, actionable and verifiable next task. If a case fails, narrow the skill instruction responsible; do not add blanket rules for unrelated cases.
