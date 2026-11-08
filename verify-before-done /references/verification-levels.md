# Risk-based verification: LIGHT → STANDARD → DEEP

This file is read **only when choosing or escalating a verification level**. Always follow applicable project rules and user-specified checks even if the selected level's usual minimum is smaller. Levels set a *floor*, not a ceiling or a promise of correctness.

## Automatic selection (evaluate top-down)

1. **DEEP if any high-risk trigger applies:** authentication/authorization; secrets/security; money, checkout/payment, or cart correctness where customer orders may be affected; privacy, personal data, database migrations, destructive operations, external write integrations; shared architecture/core dependency or design-system refactor spanning many features; deployment/production infrastructure, or a regression affecting critical customer journeys. Existing project rules may mandate DEEP for additional paths. **Do not execute production writes without explicit authorization.**
2. **STANDARD if behavior or a whole UI unit changes:** a feature, component, section, page, WordPress template, Shopify Liquid section/snippet, API endpoint, data fetching, interactive JavaScript, responsive layout, new route, or multiple connected files. If scope is ambiguous, use STANDARD.
3. **LIGHT only when confidently isolated and low risk:** copy, alt-text fix, cosmetic CSS adjustment in a single local element, documentation, comment, or safe metadata change. No material interaction, data model, shared styling, security, or production effect. Visual changes still need proportionate visual inspection where possible.
4. **Escalate** if tests find an unexpected failure, the diff touches higher-risk code than expected, or a user/project acceptance criterion requires broader coverage. Never lower a requirement just because a tool is unavailable. Report required checks as BLOCKED.

Risk has priority over file count. A one-line auth change can require DEEP. A many-line documentation change can still be LIGHT.

## Minimum evidence by level

| Level | Required checks (when applicable) | Skip by default |
|---|---|---|
| **LIGHT** | Inspect scoped diff and acceptance criteria; run an existing *targeted* syntax/lint/test if available; check the changed output (including a quick screenshot/preview for visible CSS changes when feasible). | Entire test suite, comprehensive device matrix, additional agents, bulky reports. |
| **STANDARD** | All relevant LIGHT checks; build or framework validation when configured; one or more positive and edge/negative behavioral tests for changed interactions; relevant desktop/mobile browser verification for UI changes; compare approved references if visual fidelity is a requirement; scoped regression check. | Unrelated test suites, repeated full-page screenshot captures, third-party client farms unless required. |
| **DEEP** | Applicable STANDARD checks **plus** wider regression/integration coverage, security/privacy/data or transaction-specific failure cases, accessibility and keyboard workflows for UI changes, multiple relevant device states, independent review if available, and an explicit risk/rollback review when relevant. Run production/staging operations only with permission. | Redundant checks with no additional signal, indiscriminate retrials or duplicate-agent work. |

The table is not a checklist to run on every task. Apply gates that relate to changed behavior and the request. Tests only count if executed and inspected.

## Cost and context discipline

- Read this file to select a level; open platform-specific references only for relevant frameworks. Do not paste entire references back into the chat.
- Prefer changed-file tests, targeted Playwright cases, and `git diff --check` before broader runs. On failure, expand coverage based on the risk or finding.
- Read existing package scripts, don't guess commands. Do not install tools just to satisfy a level.
- Save command logs/screenshots to local artifacts where appropriate; report brief observations, exit codes, paths, and the smallest useful error excerpt. Don't feed full traces or image sets back repeatedly.
- One independent QA reviewer is useful for DEEP if available; three agents repeating the same tests aren't automatically better.
- Avoid repeatedly running builds or taking screenshots when inputs have not changed.

## Examples (selection, not completed test claims)

| Task | Level | Reason |
|---|---|---|
| Adjust one button's margin in a Shopify collection card | LIGHT | Local styling only; inspect visually, no behavior change |
| Correct footer copy in an Astro site | LIGHT | Isolated content |
| Build responsive Astro hero matching a supplied mobile/desktop mockup | STANDARD | New UI section, viewport and reference checks required |
| Add Shopify product-card variant switching | STANDARD | Interactive change; browser assertions and edge cases |
| Change Shopify cart discount/quantity logic affecting orders | DEEP | Transaction/customer integrity |
| Modify WordPress theme authentication or data export | DEEP | Auth/data security |
| Refactor global typography tokens used across multiple templates | DEEP | Cross-page visual regressions |
| Update responsive HTML email headline copy | LIGHT | Text-only; preserve links and merge tags |
| Rebuild an HTML email layout for Outlook/Gmail | STANDARD | Cross-client rendering required; report unavailable client tests as BLOCKED |

## User choice and reporting

- By default, **auto-select** based on risk. Honor a user's explicit request for **higher** coverage.
- If a user requests lower coverage on a high-risk change, explain the unverified risks and label the result PARTIAL/BLOCKED unless required gates still pass. Never hide missing checks.
- State selection succinctly: `Level: STANDARD — new interactive Shopify section`.
- Completion vocabulary: check-level **PASS / FAIL / BLOCKED / NOT_APPLICABLE**; task-level **VERIFIED / PARTIAL / BLOCKED**. BLOCKED is for essential checks that cannot run, PARTIAL for implemented work with unresolved verification; do not call skipped or failed required checks VERIFIED.
