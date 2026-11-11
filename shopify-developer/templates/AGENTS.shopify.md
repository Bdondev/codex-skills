# Shopify project instructions (starter template)

Use this as a concise **starting point**, not as a replacement for existing repository instructions. Customize after inspecting the actual project.

## Project context
- Platform/surface: [Online Store 2.0 theme | app | extension | Hydrogen]
- Store/environment: [development/staging; do not paste secrets]
- Theme/app name and version: [fill after inspection]
- Local commands: [use the actual project's dev/build/check/test commands]

## Code conventions
- Follow existing Liquid, JavaScript, CSS and schema conventions; prefer native Shopify capabilities.
- Use merchant-editable settings, JSON templates, translations and typed custom data where appropriate.
- Protect accessibility, performance, SEO, Markets and core purchase/cart behavior.
- No invented Shopify tags/APIs; check Shopify docs for version- or plan-sensitive work.

## Workflow
- Inspect source and Git status before edits; make one scoped change at a time.
- Validate with repository tests and Shopify Theme Check / development-store checks when available.
- For visual work compare reference at 1440px desktop and 390px mobile; check other breakpoints.
- Never overwrite merchant data/settings or publish to live theme without explicit approval.
- Summarize changed files, tests, limitations and release steps.

For detailed tasks use the `$shopify-developer` skill. Keep long workflows in the skill references rather than here.
