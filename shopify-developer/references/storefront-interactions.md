# Storefront JavaScript, CSS, product forms and cart

Read when working on interactive theme features.

## JavaScript and CSS

- Prioritize native HTML + CSS + Liquid. Add JavaScript for interaction, not to build an otherwise renderable product page from scratch.
- Use small scoped modules and existing class-naming conventions. Prefer `snake_case` for Liquid values, `camelCase` for JavaScript and project-consistent component-style CSS classes.
- Avoid global mutable state and broad selectors that affect unrelated sections, other apps or editor previews.
- Do not assume a section exists only once or loads only on the initial document. Support Shopify theme editor events (`shopify:section:load`, `shopify:section:unload`, `shopify:section:select`, `shopify:section:deselect`, `shopify:block:select`, `shopify:block:deselect`) when relevant; initialize/dispose safely and prevent duplicate event binding.
- Use event delegation when elements can be replaced dynamically (cart drawer, variant picker, filtered results). Avoid duplicate listeners and memory leaks.
- Load assets only where needed; minimize blocking scripts, oversized packages and unnecessary third-party dependencies.

## Product purchase flows

- Retain native product form semantics, correct variant IDs, selling plan IDs, properties, availability, quantity, validations and error states. Check how the target theme handles variant selection rather than rebuilding it automatically.
- Test one-default-variant, multiple variants, unavailable selection, sold out, selling plan, gift-card and product-without-media states.
- Keep dynamic payment and accelerated checkout controls functional. Never hardcode prices, inventory or availability in client code as if they are authoritative.

## Ajax cart and section rendering

- Use documented Ajax Cart API endpoints and locale-aware routes; check whether the target theme already has a cart controller or uses the Section Rendering API.
- Check `response.ok`, parse errors defensively, handle rate limits/network failure, and restore interactive state when requests fail.
- After cart mutations, refresh all affected UI, including line items, cart count, subtotal, discounts, errors and shipping/availability notices. Do not assume `/cart/add.js` results and section-rendering behavior are interchangeable across themes.
- Ensure rapid quantity changes don't apply stale responses out of order. Avoid conflicting concurrent requests to the same cart state.
- Use focus management, status announcements and `aria-live` where appropriate; never discard keyboard focus when replacing dynamic cart content.
- Test without JavaScript where possible; if the feature intrinsically requires JS, provide meaningful failure/recovery messaging.

## Editor and integration regression checks

- Exercise add/remove/reorder section, repeat component on one page, select/deselect blocks, preview another template and change locale.
- Keep apps, tracking, predictive search, localization selectors and existing merchandising logic intact.
- Respect prefers-reduced-motion; ensure drawers, menus and dialogs have escape handling, focus return and appropriate semantics.
