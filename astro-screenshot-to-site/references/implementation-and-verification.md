# Astro implementation and verification

## Architecture mapping

- Prefer the project’s existing `src/components`, `src/layouts`, `src/pages`, content, and styling conventions. For a starter repository, first identify what is already reusable before adding structure.
- Use `.astro` section components for static markup and typed `interface Props` or equivalent project conventions for inputs. Keep data and client-specific choices in typed configuration/content objects; avoid client-side JavaScript for data that can be rendered at build time.
- Reuse the project’s token system. If none exists, define a small, centralized CSS custom-property layer for approved design values and reference it from components; do not scatter repeated magic values.
- Keep optional sections, navigation, contact details, asset paths, locale, and feature choices configurable without cloning page markup. Preserve existing routes, integrations, content collections, and adapters.

## Verification evidence

For each implemented section and for the final page, record:

- the reference and viewport used for desktop and mobile comparison;
- layout, type, spacing, crop, overflow, and responsive findings;
- keyboard/focus, semantic landmarks, heading order, alt text, contrast, and reduced-motion checks;
- title, description, canonical, robots, Open Graph/Twitter, structured data where applicable, and sitemap/route behavior;
- build/type/lint results and performance findings such as image dimensions/formats, font loading, unused JavaScript, layout shift, and above-the-fold weight;
- missing assets, unavailable fonts or embeds, unresolved assumptions, and every approved design deviation.

Use the project’s existing browser, accessibility, SEO, and performance tooling. Do not add a dependency merely to satisfy this checklist; if a check cannot run, state that limitation and use the strongest available evidence.

## Acceptance boundary

Visual similarity is not proof of accessibility, SEO, or performance. A section is ready for approval only when its implementation checks pass or their limitations are documented, its missing assets and deviations are explicit, and the user’s requested approval boundary has been respected.
