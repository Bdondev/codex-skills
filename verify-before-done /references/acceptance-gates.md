# Acceptance criteria and completion gate

## Matrix (fill before declaring completion)

First auto-select LIGHT, STANDARD, or DEEP using [risk-based levels](verification-levels.md). Use the smallest relevant set of gates and retain any mandatory project or user checks.

| ID | Requirement | Observable acceptance | How verified | Required | Status | Evidence |
|---|---|---|---|---|---|---|
| A1 | Example: product variant selector | Selecting another available variant updates price, availability and add-to-cart variant ID | Browser interaction + assertion | Yes | BLOCKED | — |
| A2 | Example: mobile layout | No horizontal overflow at 390px viewport | Browser check + screenshot | Yes | BLOCKED | — |
| A3 | Example: reference fidelity | Compare 1440px and 390px against supplied design references | Reviewed side-by-side / diff | Yes | BLOCKED | — |

Never copy example rows as if they were real test results. Replace them with task-specific rows.

### Gate selection by task

| Task | Minimum proof |
|---|---|
| Text / style-only change | Diff review; targeted static validation; screenshot if visual impact |
| Component or page UI | Build; desktop/mobile browser checks; console checks; accessibility checks proportionate to scope; reference comparison if applicable |
| JavaScript interaction | Targeted positive and negative behavior tests; build; regression check |
| Shopify theme | Theme Check; Liquid/schema validation; preview behavior for affected pages if permitted; desktop/mobile checks |
| WordPress theme | Changed PHP syntax lint; project build; local render of affected template if available; browser tests |
| Responsive HTML email | Markup validation where available; desktop/mobile visual inspection; actual email-client tests where available; unresolved client gaps disclosed |
| Deploy/production configuration | Explicit authorization; environment safety and rollback review; post-change smoke tests (only if authorized) |

## Status rules

- **PASS:** Executed and observed; link to command, test result, or artifact. For manual review identify reviewer and what was inspected.
- **FAIL:** Executed but failed or deviated from acceptance; include error/evidence.
- **BLOCKED:** Could not execute, due to missing authorization, tool, fixture, environment, or reference. Clearly identify dependency and next action.
- **NOT_APPLICABLE:** Gate genuinely irrelevant to requested change; explain briefly.

A task can be **VERIFIED** only when all *required* criteria are PASS, other mandatory project gates are PASS, and no critical blocker remains. Otherwise **PARTIAL** or **BLOCKED**.

## Optional repo AGENTS.md snippet

If requested by the user, merge this concise addition without replacing existing repo instructions:

> Before claiming a coding task is complete, use `$verify-before-done`: automatically choose LIGHT/STANDARD/DEEP based on risk, execute applicable acceptance checks, and provide actual evidence (commands, exit codes, screenshots, or traces). Do not claim completion when required checks fail or are blocked. Never push, merge, deploy, or update visual baselines without authorization.
