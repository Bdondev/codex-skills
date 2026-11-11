# Apps, APIs, Functions, checkout and customer account extensions

Read when the feature cannot safely or completely live inside the Online Store theme, or when the user is building an app/headless storefront.

## Architecture choices

| Requirement | Prefer |
| --- | --- |
| Merchant-editable storefront UI | Theme section/block/schema; metafield/metaobject |
| App-provided storefront UI | Theme app extension with app block/embedded integration |
| Shopify Admin workflow/interface | Embedded app + App Bridge; appropriate Polaris web components; admin UI extension where supported |
| Secure reads/writes to shop resources | GraphQL Admin API from authenticated server-side code |
| Custom storefront outside Liquid | Storefront API and cart flows; Hydrogen when its architecture is justified |
| Checkout field or UI at supported target | Checkout UI extension; verify target/plan eligibility |
| Server-executed discounts, cart/checkout logic | Appropriate Shopify Function API; verify availability and capabilities |
| Customer account page UI | Customer Account UI extension for supported customer accounts and targets |
| Analytics instrumentation | Web Pixels and approved event/customer privacy mechanisms |
| Backend jobs and sync | Validated webhooks plus queues/retries/idempotency |

Never force an app where a native theme implementation suffices, or a theme hack where Shopify expects an app/function.

## Admin and Storefront APIs

- Prefer GraphQL Admin API for new integrations. Treat REST Admin API as legacy and use only when a justified maintained integration requires it.
- Use Storefront API for custom storefronts; do not expose Admin API tokens in browser/Shopify Liquid assets.
- Check API version, schema, scopes, pagination, mutation input and response shapes **against the current docs**. Do not invent GraphQL field names or assume an older tutorial matches current stable version.
- Follow app auth, sessions/session tokens, signed requests, webhook HMAC verification, secret storage, least-privilege scopes and protected customer-data policies.
- Validate all untrusted input server-side, use retry/backoff for throttling, and make order/inventory/billing/fulfillment handlers idempotent; handle duplicate and out-of-order webhook delivery.
- Prefer webhooks to repeated polling for asynchronous updates where possible.

## Checkout boundaries

- For new work never use `checkout.liquid`, Shopify Scripts, Additional Scripts, direct checkout DOM changes, checkout script tags or deprecated Checkout API flows.
- Use Checkout Extensibility: supported Checkout UI extensions, Functions, Web Pixels, checkout branding mechanisms, Checkout Blocks or metafields as warranted by the use case.
- **Shopify Plus is required for Checkout UI extensions on information, shipping and payment steps**; other extension surfaces have different eligibility. Check target and merchant plan before promising a solution.
- Verify exact extension API version/targets. UI extensions on newer API versions use Polaris web components; do not copy old React UI-component samples without checking support.
- Confirm whether the merchant has enabled the supported customer account experience before proposing Customer Account UI extensions.
- Define how the extension interacts with checkout state, privacy rules, network access, localization and protected data. Test in a store with the correct plan/configuration.

## Shopify Functions and server logic

- Select a specific currently available Function API for discounts, delivery/payment customization, cart transforms or validation only when the requirement fits its capabilities. Check merchant plan/app eligibility and feature limits.
- Keep execution deterministic and resource-conscious. Test failures/edge cases and integration with discounts, selling plans, shipping, taxes and accelerated checkout as applicable.
- Avoid pushing security-sensitive or externally authoritative business logic into browser JS/Liquid.

## Headless

- Choose Hydrogen only when its benefits (custom UX, architecture, integration needs) outweigh added infrastructure, maintenance and Shopify-native feature parity costs.
- Storefront API carts and checkout URLs must use supported current flows. Verify caching, cart correctness, customer auth, Markets/localization, SEO and web-vitals behavior.
