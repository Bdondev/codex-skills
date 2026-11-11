# Theme architecture, Liquid and custom data

Use when the task involves Online Store themes, JSON templates, Liquid, schema, blocks, snippets, metafields or metaobjects.

## Fit the existing theme first

- Inspect `layout/`, `templates/`, `sections/`, `blocks/`, `snippets/`, `assets/`, `config/` and `locales/` as applicable. Some older themes do not have a `blocks/` directory.
- Use JSON templates and section groups where merchant-configurable ordering is required. Use section schemas, presets and settings to expose useful merchant controls without creating hundreds of one-off settings.
- Choose **section blocks** (declared inside section schema) for local, non-nestable content, **theme blocks** (Liquid files in `blocks/`) for reusability and nesting, and **app blocks** for app-provided UI. Section blocks and theme blocks cannot currently be mixed in the same section. Check nesting and count limits against Shopify docs.
- Use snippets for non-editor-configurable reusable markup, and `{% render 'name', variable: value %}` instead of `{% include %}`. Pass dependencies explicitly and avoid relying on unseen outer scope.
- Follow existing theme conventions and support editor-specific `block.shopify_attributes` and section settings where relevant.
- Separate generated CSS/JS source from compiled theme assets. Avoid altering merchant-managed `config/settings_data.json` unintentionally.

## Liquid rules

- Use supported Liquid constructs and objects only. Guard optional resources with `!= blank`, `== nil`, `== empty`, or more appropriate documented checks; `present` is not a verified Shopify Liquid keyword. Remember empty strings can be truthy.
- Preserve selected-option/variant edge cases, availability, selling plans, gift cards, no-image and sold-out states; don't assume `selected_or_first_available_variant` is always non-nil for every URL option combination.
- Paginate large collections, search, blogs and customer lists; do not emit enormous loops or load all product variants blindly.
- Use `form` objects, `form.errors` and `default_errors` only in contexts where Shopify documents support.
- Use `asset_url`, `routes` and translation filters; avoid hardcoded shop domains, handles, URL paths, locale strings or currencies when Shopify offers a suitable alternative.
- Keep heavy business logic in an app, Function, or backend when Liquid isn't the right boundary.

## Safe image example

Example for a **below-the-fold** product image. For a critical LCP/hero image, adjust `loading` and consider an appropriately justified `preload`.

```liquid
{% if product.featured_image != blank %}
  {% assign image_alt = product.featured_image.alt | default: product.title %}
  {{ product.featured_image
    | image_url: width: 1200
    | image_tag:
      alt: image_alt,
      loading: 'lazy',
      widths: '400, 800, 1200',
      sizes: '(min-width: 990px) 50vw, 100vw'
  }}
{% endif %}
```

Use appropriate widths for the actual component and layout; do not assume `lazy` is correct for top-of-page media.

## Metafields and metaobjects

- Use typed metafield definitions for data attached to products, variants, collections, customers and other Shopify resources. Use metaobjects for reusable structured content such as comparison rows, size guides, icons, ingredients, brand pages and lookbooks.
- Prefer connected dynamic sources where supported. Preserve namespace/key, definition type, permissions and data-model assumptions.
- Check for missing values and use type-appropriate rendering. `metafield_tag` does not support all metafield list types: verify the type before using.

```liquid
{% assign care_instructions = product.metafields.custom.care_instructions %}
{% if care_instructions != blank %}
  <div class="product-care">
    {{ care_instructions | metafield_tag }}
  </div>
{% endif %}
```

## Theme Store boundary

For private/client projects, inspect Dawn or Horizon as learning references where licensing and reuse permit. **New Shopify Theme Store submissions must use Shopify Skeleton Theme or fully original code**; submission rules disallow Dawn- or Horizon-derived themes. Validate against current Theme Store criteria before preparing a submission.
