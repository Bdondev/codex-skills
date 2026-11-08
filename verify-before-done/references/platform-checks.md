# Platform-specific verification selectors

**Use existing scripts first.** Inspect `package.json`, `composer.json`, config files, CI workflows, and `AGENTS.md`. Commands here are examples, not evidence of actual execution. Don't run preview uploads or external writes without the necessary permission.

## Astro / Tailwind / static front end

- Identify scripts with `cat package.json`; use `npm run build` if present (or project package manager equivalent).
- If project defines `check`, `lint`, or `test`, execute the relevant scripts. For Astro, `astro check` may require separately installed dependencies; don't assume availability.
- If Playwright is configured, run targeted tests with the project's runner (`npx playwright test` is a typical example). Verify affected route(s), CTA links, mobile overflow, focus navigation, and interactive elements.
- For pixel-accurate tasks, compare *approved* references at 1440px and 390px, matching viewport height, fonts, assets, and content. Avoid silently replacing baselines.
- Record build or JavaScript console errors separately from visual differences.

## Shopify themes (Liquid + JSON templates)

- If Shopify CLI is installed, a non-deploying local validation is `shopify theme check --fail-level error`; verify the command is appropriate for that repo/version.
- Inspect JSON schema/section settings, snippets, and theme templates affected by the change. Don't infer Liquid validity solely from generic HTML parsing.
- For storefront interaction changes, verify actual variant id/price/availability sync, cart updates, redirects/error handling, product media, and zero/invalid availability as appropriate to scope.
- `shopify theme dev` can create/use a development theme and requires store access; **do not** run without appropriate authorization and understanding of the target store. Never publish or push a live theme as a verification shortcut.
- A local lint PASS does **not** establish that dynamic behavior works on the store. If safe preview access is absent, mark storefront integration checks **BLOCKED**.

## WordPress theme / plugin

- Run `php -l <changed-file.php>` per changed PHP file where PHP CLI is available. Use existing PHP CodeSniffer/WPCS or Composer test commands if configured.
- Run the project's actual CSS/JS build commands where applicable.
- Render affected templates in the **local/staging** WordPress environment if permitted; test missing fields, empty content, escaping and sanitization, and responsive layouts where relevant.
- If using ACF Free, verify the expected fields actually exist in that environment; do not assume a premium feature is available.
- Don't modify production WordPress content, DB, plugin installation, or live settings just to make a test pass.

## Responsive HTML email

- Verify changed copy and links, table structure, alt text, mobile layout, and relevant ESP merge tags.
- Test representative clients (Gmail/Outlook/Apple Mail) through Litmus/Email on Acid or equivalent *when available*; generic browser rendering cannot establish inbox-client compatibility.
- When no cross-client tool is available, report email-client compatibility checks as **BLOCKED**, not PASS.

## Common checks for UI development

- Functional: user journey, edge case, and changed path actually work.
- Visual: reference versus implementation, viewport-specific issues, no hidden overflow, usable text/CTA sizing.
- Accessibility: semantic structure, keyboard path, visible focus, labels, alt text, contrast where relevant; tool checks do not replace manual judgment.
- Performance: assess against existing project budget if applicable; never claim an improvement without a controlled before/after measure.
- Security/data: secrets remain out of output; protect production accounts and sensitive fixtures.
