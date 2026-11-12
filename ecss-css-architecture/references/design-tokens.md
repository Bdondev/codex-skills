# Design tokens

Identify the canonical source of color, typography, spacing, sizing, radii and motion decisions: CSS properties, Tailwind theme, WordPress theme.json, Shopify settings or Sass modules. Preserve it; resolve duplication only within approved scope.

- Reuse the existing scales and semantic roles. Introduce semantic aliases when values need to vary independently, such as surface, text and focus.
- Keep runtime theme/instance configuration in appropriate custom properties; do not replace compile-time Sass values indiscriminately.
- Use fluid measures, clamp(), logical properties and container queries where supported and relevant. Do not invent breakpoints or exact values from an unclear mockup.
- Separate local component configuration from shared design decisions. Avoid tokenizing isolated values unless doing so communicates an intentional design decision.
- Check contrast, reflow, zoom, focus and reduced motion. Tokens alone do not establish accessibility conformance.

Illustrative example only; do not import these as project defaults:

```css
:root {
  --space-md: 1rem;
  --color-surface: #fff;
  --color-text: #17212b;
}
```
