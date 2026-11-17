# WordPress Theme Development (Codex) v1.1.0

Plan, build and audit custom classic, block or hybrid WordPress themes with LocalWP, Tailwind, native WordPress fields, ACF Free and section-by-section visual QA.

This skill integrates with `mockup-to-design-spec` v2.0. When approved `docs/DESIGN.md`, section specifications, `docs/ASSET-INVENTORY.md` and `docs/IMPLEMENTATION.md` exist, it consumes those files as the source of truth. It maps visual sections to the selected WordPress architecture and dynamic content to native fields, ACF Free, CPTs or taxonomies without introducing ACF Pro.

Run the package checks from the repository root:

```sh
node wordpress-theme-development/scripts/validate-skill.mjs
node --test wordpress-theme-development/tests/validator.test.mjs
```

The package preserves the Trofo LocalWP preset, classic PHP + ACF Free + Tailwind workflow, and existing architecture, content-model, LocalWP and visual-QA references.
