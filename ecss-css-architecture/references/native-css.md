# Native ECSS

Source: [Efficient CSS](https://ecss.info/en/). These are selected principles and practical adaptations, not a complete specification. Use native mode only when the project has selected it.

- Align named component selectors with owning filenames. Keep their variants, internal selectors and responsive rules in that component's stylesheet.
- Use meaningful ECSS child-selector prefixes where appropriate; consult the source naming rules before adopting a new convention. Keep modifiers scoped to their owner.
- Prefer semantic element selectors, inheritance and purpose-driven attributes. Avoid unnecessary specificity, deep nesting and incidental DOM depth. Explicitly anchor native nesting with `&`; keep it shallow.
- Parent layouts own external gaps; components own internal padding. Prefer fluid layouts and natural content dimensions. Keep justified fixed dimensions and deliberate clipping.
- Extract patterns when their intent is clear, not just because two declarations match. Keep independent components independently owned.

## Example

Illustrative only; use the project's actual token values and names.

```html
<div class="product-grid">
  <article class="product-card as-featured">
    <h2>Product name</h2>
    <p>Product description.</p>
  </article>
</div>
```

```css
/* product-grid.css: parent owns the arrangement */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: var(--space-md);
}
/* product-card.css: card owns its appearance */
.product-card {
  padding: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  & :where(h2) { font-size: var(--text-lg); }
  &.as-featured { border-color: var(--color-accent); }
}
```

The example assumes native CSS nesting is supported by the project's target browsers or compiled by existing tooling. A stable minimum card measure can be a named token if reused. Do not import this example as production CSS without adapting it.

