# CSS debugging and focused checks

1. Reproduce the issue with actual viewport, browser, content and state. Record expected versus observed behavior.
2. Inspect computed styles, the box model, containing blocks, cascade/layer order, inherited values, specificity and responsive conditions.
3. For overflow, compare scroll and client widths; locate oversized media, flex/grid minimum sizes, fixed widths, transforms or positioned elements. Fix the responsible source rather than applying blanket `overflow-x: hidden`.
4. Make the smallest scoped correction. Retest the failing state and neighboring widths. Keep justified clipping and intentional scroll regions.
5. Compare visual references at matched viewports. Prioritize proportions, typography, spacing and crop. Report missing fonts or assets instead of inventing them.

## Focused verification

Use applicable existing build, lint, diff and browser checks. Check reflow, long content, component states, visible focus and reduced motion when relevant. Record actual commands/results and limitations. Delegate formal verification to `verify-before-done` when requested or required; do not duplicate its risk-based procedure.

## Optional lint adoption


ECSS links to its Stylelint preset at https://www.npmjs.com/package/@efficientcss/stylelint-config-ecss and its work-in-progress scaffolding at https://github.com/efficientcss/scaffolding.

Before adopting the preset, inspect its published peer dependencies, rule configuration, maintenance status, and support for the project's syntax. Merge into existing Stylelint config only after approval; do not replace existing lint rules indiscriminately. Run on authored native CSS first, excluding vendor/generated files. In compatible mode keep only applicable rules. Avoid mass autofix and record legacy exceptions. The preset was not installed or tested when this skill was prepared.

