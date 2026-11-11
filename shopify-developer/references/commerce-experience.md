# Performance, SEO, accessibility, localization

Use this reference when designing storefront-facing functionality or reviewing storefront quality.

## Performance

- Prefer Liquid-rendered HTML for normal theme content. Avoid unnecessary hydration, global bundles, complex sliders, hidden duplicate mobile/desktop DOM and excessive app embeds.
- Use responsive `image_url` + `image_tag` or verified native Shopify media APIs. Supply useful `sizes`, suitable widths and reservable dimensions; avoid CLS and stretched/blurry crops.
- Do not lazy-load the likely LCP/above-the-fold hero or product image. Use `preload` selectively and only after checking impact.
- Load CSS/JS when needed; avoid expensive loops, huge serialized product datasets and repeated network calls. Consider asset budgets and third-party script impact.
- Measure rather than invent LCP, INP, CLS, Lighthouse or conversion improvements. Capture before/after when feasible.

## SEO

- Use semantic HTML and a clear primary heading; avoid generic 'exactly one h1' enforcement when the template's semantic context requires judgment.
- Preserve Shopify native SEO fields, title/description behavior, canonical tags and crawlable links. Verify duplicate-product, pagination, filter and market URL behavior before custom canonical logic.
- Add only supported, accurate structured data; avoid duplicate or inaccurate Product/Offer JSON-LD if apps or the theme already emit it.
- Use meaningful image alt text; decorative images should have appropriate empty alt values rather than keyword stuffing.
- Navigation, product cards, pagination and important collection content should remain crawlable without client JS.

## Accessibility

- Use buttons for actions, anchors for links, correctly associated form labels, landmarks and logical headings.
- Test keyboard-only navigation and visible focus, especially menus, drawers, quantity, variant selectors, modals, predictive search and filtering.
- Ensure dialogs manage focus entry, trapping where appropriate and return; announce dynamic state and errors, without excessive live-region chatter.
- Use ARIA only to complement native HTML; respect reduced motion and accessible contrast. Check responsive reflow and zoom.
- Target WCAG 2.2 AA where applicable; an automated scan alone does not establish conformance.

## Localization and Shopify Markets

- Use `locales/` files and translation filters for interface strings; do not hardcode user-visible language or currency markers.
- Use documented `routes`, `localization` and market-aware formatting. Preserve language/country selectors and shipping/tax messaging.
- Test store-dependent pricing, currency, compare-at prices, region-specific inventory, duties/tax notices and market URLs.
- Do not assume one market's measurements, payment availability or shipping restrictions generalize to others. Support RTL if required by merchant languages.
