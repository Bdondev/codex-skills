# Shopify Developer — Codex skill (2026 edition)

A reusable Shopify engineering skill for Codex: theme/Liquid architecture, cart and storefront JavaScript, checkout extensions, Functions, apps, APIs, SEO, accessibility, performance, Markets, testing, and safe deployment.

## Repository layout

This folder is intended for the **root of `Bdondev/codex-skills`**, alongside `wordpress-theme-development/`, `design-to-responsive-email/`, and `verify-before-done/`.

```text
codex-skills/
├── design-to-responsive-email/
├── verify-before-done/
├── wordpress-theme-development/
└── shopify-developer/
    ├── SKILL.md
    ├── README.md
    ├── agents/
    │   └── openai.yaml
    ├── references/
    │   ├── apps-extensions.md
    │   ├── commerce-experience.md
    │   ├── official-sources.md
    │   ├── storefront-interactions.md
    │   ├── testing-deployment.md
    │   └── theme-liquid.md
    └── templates/
        ├── AGENTS.shopify.md
        └── section-brief.md
```

## Install / sync

1. Copy `shopify-developer/` into the root of your `codex-skills` repository.
2. Review with `git diff -- shopify-developer`; commit and push only when ready.
3. For global Codex use, copy or symlink that folder to `~/.codex/skills/shopify-developer/` (or your existing skills location).
4. Open a new Codex session or refresh skill discovery, and invoke `$shopify-developer`.

Do **not** copy the whole `codex-skills` repository into a project's `.agents/skills/` directory.

## Example invocations

- `$shopify-developer Audit my current Shopify theme and map sections, assets, metafields, and merchant editability. Stop after the audit.`
- `$shopify-developer Implement only the hero section from my approved mockup. Follow existing theme conventions and verify at 1440px and 390px.`
- `$shopify-developer Debug cart-drawer quantity updates without breaking variant, subscription, or localization state.`
- `$shopify-developer Determine whether this feature requires a theme section, theme app extension, Shopify Function, or Checkout UI extension. Verify plan and API limitations before coding.`

## Operating principles

The skill uses an initial project audit, relevant references loaded on demand, scoped implementation, real validation, and evidence-backed reporting. The `templates/AGENTS.shopify.md` is project-specific starting guidance, not a file to overwrite in every task.

No credentials, runnable integrations, or third-party dependencies are bundled. The skill does not verify access to a specific Shopify store and does not authorize commits, production pushes, or publishing.
