# Astro Screenshot to Site

An Astro implementation skill for new sites and existing-project modifications driven by screenshots, mockups, or approved `mockup-to-design-spec` v2.0 handoffs.

The skill preserves the project’s architecture, uses reusable Astro section components with typed props, centralizes design tokens, supports client-specific configuration, and validates sections on desktop and mobile. It also covers accessibility, technical SEO, performance, missing assets, and approved design deviations without requiring new dependencies or a full rewrite.

## Use

Copy `astro-screenshot-to-site/` into the root of a Codex skills repository or into the project’s configured skills directory, then invoke `$astro-screenshot-to-site` with the visual references or approved `docs/` handoff.

Examples:

- `$astro-screenshot-to-site Implement the approved hero section from docs/DESIGN.md and stop for approval.`
- `$astro-screenshot-to-site Adapt this Astro starter to the supplied desktop and mobile references, preserving its routing and components.`
- `$astro-screenshot-to-site Refine the existing landing page and report missing assets and visual deviations.`

This package has no bundled runtime dependencies. It does not commit, deploy, replace assets, or overwrite approved design specifications unless explicitly requested.
