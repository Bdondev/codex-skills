# Audit, QA, version control and deployment

Use for initial assessment, bug fixes, implementation, releases and audits. Adjust checks to the actual theme/app repository.

## First project audit

1. Read `AGENTS.md` and any repo docs, `package.json`, Shopify CLI config, app TOML configs, lockfile and theme layout. Identify theme vs app vs monorepo.
2. Record current Git branch/status and existing edits. Never reset/clean away work without permission.
3. Identify local toolchain and existing commands, current theme/app API versions and store connection, without leaking secrets.
4. Inspect the actual target code and dependencies. Reproduce bug if possible; capture before-state/screenshots for visual regressions.
5. During requested project setup, add/merge concise `AGENTS.md` using the template only if appropriate. Do not repeatedly rewrite it on ordinary tasks.
6. Present a narrow change plan and separate unrelated refactors.

## Theme implementation/QA

- Use Shopify CLI (`shopify theme dev`, `shopify theme check`, and relevant preview/pull/push commands) **only when available/configured** and after confirming the intended store/theme. Check exact flags with CLI help if necessary.
- Run `shopify theme check` and project-specific lint/build/test commands if available. Report status and reasons for any skipped checks; never pretend validation occurred.
- Test a real Shopify development or staging store rather than relying on static HTML alone. In the theme editor test adding, removing, reordering and revisiting sections, and changing settings/locale.
- Product states: default variant; many variants; unavailable combination; sold out; missing media; multiple media types (including video/3D); subscription; gift card; discounts; long titles; empty/large collections; customer logged in/out; multiple Markets/currencies.
- Test navigation, forms, cart, search, dynamic checkout, mobile drawer, language/country selectors, and app integration.
- For design implementation compare screenshot at 1440px and 390px, using supplied mockups/assets as ground truth; test other relevant widths and longer translated content. Confirm no horizontal overflow, clipping or keyboard traps.
- Run accessibility checks and keyboard/manual testing. Capture Lighthouse/Core Web Vitals where tools permit; use measured deltas only.

## App/extension QA

- Test GraphQL query/mutation paths with expected and unexpected responses, permission failures, webhook retry/duplicate/out-of-order delivery, rate limiting and session expiry.
- Verify extension target eligibility and versions; test in matching checkout/customer account contexts, locale, network failures and data permissions.
- Use unit tests for pure logic and integration tests for APIs/webhooks/billing as appropriate.

## Safe release workflow

1. Commit reviewed changes in small logical units; keep generated assets consistent with source. Do not commit `.env`, API tokens or store secrets.
2. Inspect diffs. Protect existing merchant-edited settings/data and Shopify admin changes; confirm the remote theme/environment before pushing.
3. Back up theme before major migrations. Prefer an unpublished/staging theme and preview link.
4. Require explicit user approval before any publish or changes to the live theme, checkout, production app configuration, store data or credentials.
5. Run final regression checks, publish through the permitted workflow, document rollback and verify live behavior only after approval.

## Final report template

- **Scope:** surface and expected behavior.
- **Changed:** paths and brief implementation summary.
- **Checks:** commands/tests run with pass/fail and manual test coverage.
- **Unverified:** store/plan/configuration access missing, or browser/shop tests not possible.
- **Release:** preview link (only if actually available), pending approvals and rollback plan.
