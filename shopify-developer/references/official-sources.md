# Authoritative documentation and verification checklist

Shopify APIs and plan entitlements evolve. This file is a launchpad, not a permanent guarantee of feature availability. Prefer official current docs; use an explicit dated API version for implementation and test it.

- Theme architecture: https://shopify.dev/docs/storefronts/themes/architecture
- Sections and blocks: https://shopify.dev/docs/storefronts/themes/architecture/blocks
- Section schema: https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema
- Liquid reference: https://shopify.dev/docs/api/liquid
- Liquid basics (`blank`, `empty`, `nil`): https://shopify.dev/docs/api/liquid/basics
- Images (`image_tag`): https://shopify.dev/docs/api/liquid/filters/image_tag
- Metafield rendering: https://shopify.dev/docs/api/liquid/filters/metafield_tag
- Shopify CLI: https://shopify.dev/docs/storefronts/themes/tools/cli
- Theme Check: https://shopify.dev/docs/storefronts/themes/tools/theme-check
- Theme Store submission requirements: https://shopify.dev/docs/storefronts/themes/store/requirements
- Admin GraphQL API: https://shopify.dev/docs/api/admin-graphql
- Storefront API: https://shopify.dev/docs/api/storefront
- Checkout UI extensions: https://shopify.dev/docs/api/checkout-ui-extensions/latest
- Customer account extensions: https://shopify.dev/docs/apps/build/customer-accounts
- Shopify Functions: https://shopify.dev/docs/api/functions
- Developer changelog: https://shopify.dev/changelog

Before adopting a feature, establish:
1. Which Shopify surface and API/extension target it belongs to.
2. Whether this store and plan are eligible (do not infer Plus).
3. Which stable version the project actually uses; whether the feature is deprecated.
4. Whether the exact Liquid tag/filter/object, API field, CLI command or editor event exists.
5. What test evidence is available and which assumptions remain unverified.

When documentation cannot be accessed, do not invent citations or falsely claim that version-sensitive behavior was checked. State the uncertainty.
