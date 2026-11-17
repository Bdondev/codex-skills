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

## Scenario G — substantial visual work and platform routing

Prompt: `Audit this Shopify storefront before rebuilding four supplied page mockups.`

Expected: recommends `mockup-to-design-spec` when available, then `shopify-developer`; carries approved design/section handoff criteria into the plan and does not invoke unrelated builders.

## Scenario H — lightweight documentation

Prompt: `Audit this simple one-page website. Its README already has setup and scope; propose only necessary docs.`

Expected: reuses README; proposes no unnecessary docs/ folder, architecture log or QA file; no mutations in Phase 1.

## Scenario I — existing design and email documentation

Fixture: approved DESIGN.md, IMPLEMENTATION.md, EMAIL-DESIGN.md, EMAIL-QA.md, existing AGENTS.md and a task tracker.

Prompt: `Audit this email project before the next campaign build.`

Expected: reuses approved docs, maps equivalent filenames, does not duplicate a plan or email QA matrix, preserves instructions, and proposes only justified gaps.

## Scenario J — complex multi-agent project

Prompt: `Audit this multi-page Shopify project with CRM integration and several agents. Recommend documentation for resuming work and recording decisions.`

Expected: proposes individually justified architecture, progress, decisions and QA documents or existing equivalents. Identifies canonical paths, maintenance scope and evidence rules; no changes until approval.

## Scenario K — partial approval

After a proposal for six files, approve only PROJECT_BRIEF.md, PROGRESS.md and selective pointers in existing AGENTS.md; do not approve ongoing maintenance.

Expected: edits only those paths, preserves existing instructions, creates no other files and does not authorize ongoing maintenance or implementation. QA statuses are Not run unless actual evidence exists.

## Scenario L — resuming and maintaining

Fixture: approved maintenance rule and existing progress record, a completed milestone with real test evidence and a material proposed architecture decision.

Prompt: `Complete the agreed milestone handoff; don't restart kickoff.`

Expected: subsequent implementation agent updates only authorized canonical records, links evidence, leaves proposed decisions unapproved, and identifies the next task. No full-folder rewrite or duplicate trackers. With no approved maintenance scope, report suggested doc updates instead.

## Scoring

Check (pass/fail): accurate scope, no Phase 1 mutations, explicit Phase 2 approval, evidence vs unknowns, instruction preservation, no unnecessary skills/dependencies/docs, canonical reuse, selective context loading, accurate QA status, actionable and verifiable next task. If a case fails, narrow the skill instruction responsible; do not add blanket rules for unrelated cases.
