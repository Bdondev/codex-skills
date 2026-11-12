# Platform adaptation

These are project-specific recommendations, not additional rules claimed to come from ECSS.

## Astro / native CSS
- Keep shared design tokens and element defaults in the global entry point. Use Astro scoped styles for local component ownership or a sibling stylesheet if the project prefers it.
- When working in a single-page file, propose extraction only if a component boundary is clear and the task authorizes it. Do not turn every small element into a component.
- In a native ECSS project a possible layout is `src/styles/tokens.css`, `base.css`, `layouts/stack.css`, `components/card.css`; use the existing import order or an explicitly planned cascade-layer strategy.

## Tailwind (including Astro and Shopify projects)
- Preserve utility classes and theme configuration. Do not impose native ECSS class prefixes on Tailwind utilities or apply native filename lint rules to generated CSS.
- In Tailwind v4, reuse existing `@theme` definitions or shared CSS custom properties. Avoid maintaining two independent token scales for the same design decision.
- Put repeated markup into a real component when its contract is understood. Keep custom styles close to their owner. Do not extract arbitrary utility strings into custom CSS or `@apply` just to look like ECSS.
- Do not remove Tailwind or reorganize the build without explicit migration approval.

## WordPress
- Inspect whether the theme is classic or block-based. Preserve the theme's enqueue strategy, `theme.json` where applicable, editor styles, and plugin-generated classes.
- Coordinate global tokens and editor/front-end behavior. Keep custom theme styles owned by template parts or feature files rather than broad overrides of plugin internals.
- Verify rendering with real content, block variations, and the admin/editor if applicable. Do not modify plugin/core files.

## Shopify Liquid
- Inspect theme assets, section/snippet ownership, schema settings, dynamic section IDs and theme editor behavior. Keep reusable CSS in an appropriate asset and instance-specific values in scoped custom properties when needed.
- Preserve existing class names used by scripts, apps and theme features. Check multiple instances of the same section and dynamic reloads in the theme editor when possible.
- Do not add a build dependency or refactor a vendor theme globally without permission.

## HTML email
Excluded: use the dedicated HTML email workflow. Browser-oriented native CSS and stylesheet organization are not substitutes for email-client compatibility.

## Existing Sass
- Preserve established Sass modules, variables, mixins and compilation. Use runtime CSS properties when values must vary at runtime. Apply architectural principles to authored SCSS, not generated CSS.
- Do not add Sass to Tailwind v4 by default or convert existing Sass without migration approval.

## GoHighLevel embedded forms
- Style the iframe host and wrapper, not cross-origin internal fields. Verify sizing and anchor behavior. Defer embed operations to astro-ghl-lead-capture; report external access limitations.
