# Project documentation policy

Use project documentation as durable, selective context, not as an always-loaded process manual. Prefer existing canonical files, including a README, an issue tracker, or platform-specific documentation. Never create a duplicate solely to match these filenames.

## Select the minimum useful set during Phase 1

| Level | When appropriate | Candidate files (not mandatory) |
| --- | --- | --- |
| Lightweight | Small landing page, one-off email, short build, or a mature repo with adequate existing documentation | README or PROJECT_BRIEF; PROJECT_PLAN only if meaningful |
| Standard | Multi-section website/theme, multi-session build, several milestones or meaningful visual QA | Brief and plan; PROGRESS and QA-CHECKLIST when not covered elsewhere |
| Extended | Complex integrations, multi-agent ownership, larger ecommerce/app projects, major architectural decisions | Standard set plus ARCHITECTURE and/or DECISIONS where separately useful |

Choose based on actual scope, handoff and verification needs, not the framework or number of files. Even an extended project can use existing equivalents rather than generating new documents. A small project may need no `docs/` directory.

## Templates and ownership

All paths are relative to the project root; templates are relative to this skill's root.

| Candidate path | Template | Content and when useful |
| --- | --- | --- |
| `docs/PROJECT_BRIEF.md` | `templates/PROJECT_BRIEF.template.md` | Confirmed goals, requirements, boundaries, constraints, unknowns |
| `docs/PROJECT_PLAN.md` | `templates/PROJECT_PLAN.template.md` | Milestones, verification and next implementation slice |
| `docs/ARCHITECTURE.md` | `templates/ARCHITECTURE.template.md` | Verified current layout, stack, data/integration boundaries and planned changes where complexity warrants it |
| `docs/PROGRESS.md` | `templates/PROGRESS.template.md` | Resumption checkpoint, milestone state, evidence, blockers, next task for multi-session or multi-agent work |
| `docs/DECISIONS.md` | `templates/DECISIONS.template.md` | Material choices with rationale, alternatives, status and consequences; omit if brief/plan covers them |
| `docs/QA-CHECKLIST.md` | `templates/QA-CHECKLIST.template.md` | Project-specific acceptance checks, verification methods and evidence; not a substitute for actual tests |

Use the existing `mockup-to-design-spec` outputs (`DESIGN.md`, section specs, asset inventory, implementation plan, and email-specific docs) as the canonical design handoff. Use `design-to-responsive-email` for email-specific requirements, manifests, build plans and client QA when needed. Existing equivalent email documentation, `docs/IMPLEMENTATION.md`, `docs/EMAIL-QA.md`, issue trackers or test plans may replace the corresponding generic candidates. The platform builder owns implementation; `verify-before-done` owns verification procedure and evidence collection. Do not create parallel design specs, competing roadmaps or another test matrix.

## Approval and generation

- Phase 1: inspect existing documentation, determine its freshness and authority, identify gaps, and propose each path/action (create, update, reuse, omit), rationale, and whether maintenance is in scope. No file creation or editing.
- Phase 2: create or minimally update only explicitly approved files. Use project-specific confirmed evidence, label proposed architecture and unverified facts, remove unused placeholders, link canonical equivalents, and preserve existing instructions and decisions. Never fabricate status, metrics, commands, test output or approvals.
- If conflicting evidence exists, record the discrepancy as an open decision; do not silently choose one. Never include credentials, private environment values, or sensitive client data.

## Selective context loading

If authorized to edit agent instructions, add a short index mapping tasks to the actual canonical paths. Example: planning → brief/plan; UI implementation → design/section specs; architecture changes → architecture/decisions; resuming → progress or issue tracker; verification → QA checklist and relevant evidence. Only include files that actually exist or are created as part of the approved setup. Read only relevant documents; do not mandate loading the whole folder. Keep detailed workflow rules in skills.

## Maintenance and handoff

If ongoing maintenance is approved, add a short rule in agent guidance with the canonical paths and when to update them. Within authorized work scope:

- Progress: after material milestone completion, handoff or new blocker. Record completed versus pending, evidence links or commits if available, date, and the next action. Do not equate code changes with verification.
- Decisions: after a material choice is proposed, approved or superseded. Keep status and rationale; link to the relevant change. Do not silently mark a proposal accepted.
- Architecture: after material stack, source layout or integration boundary changes. Separate implemented from proposed and remove stale descriptions.
- QA: update requirements when acceptance criteria change; record actual results with check date, command/method and evidence. Use Not run, Pass, Fail or Blocked accurately. No browser-only proof of email-client compatibility.
- Brief and plan: change only when scope, constraints or milestones actually change; keep a single canonical plan.

For parallel agents, coordinate documentation changes via the repo's established ownership/PR process. Avoid concurrent broad rewrites. Do not add another progress tracker when the team uses an adequate one. If documentation edits are outside current authorization, flag the needed update in the handoff instead.
