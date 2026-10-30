# Project plan and handoff

## Phase 1 output format

Use this report structure, scaled to project complexity:

1. **Evidence:** workspace/repo, project stage, verified stack/assets, Git state, missing access.
2. **Brief:** purpose and target user, scope, confirmed constraints.
3. **Uncertainties:** separate blocking decisions from questions that can wait.
4. **Architecture decision:** recommended approach, specific reasons, trade-offs, if migration is proposed why.
5. **Instruction audit:** current `AGENTS.md`/`CLAUDE.md`, skill inventory, conflicts/duplication, necessary changes.
6. **Milestones:** each milestone has a deliverable, pass/fail acceptance criteria, and verification method.
7. **Proposed setup changes:** exact file paths; mark create/update/unchanged, and why.
8. **Gate:** explicitly request approval of Phase 2; implementation remains out of scope.

## Milestone examples (customize; do not force)

- Discovery/architecture accepted.
- Baseline scaffolding or existing-project stabilization.
- Design tokens and global layout.
- First representative section/module plus desktop/mobile comparison.
- Remaining prioritized sections/modules.
- Accessibility and SEO or email-client checks.
- Production build, deployment preparation, and handoff.

For WordPress and Shopify, replace generic scaffolding steps with platform-specific theme/local development and testing. For email, replace browser-only QA with inbox/client render testing.

## First implementation task

Use the smallest vertical slice that proves the stack and design approach. Include:

- The file(s)/component(s) to modify.
- Exact reference assets and known copy.
- Responsive/accessibility expectations.
- Checks to run and what evidence to provide.
- Explicit exclusions (e.g., do not change unrelated sections).

## Phase 2 handoff

Provide a file-change summary, unverified items, next implementation prompt, and any approval still required. Never imply the project is production-ready merely because kickoff files were created.
