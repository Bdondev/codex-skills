# Architecture decision guide

Select the simplest maintainable approach that satisfies **verified** requirements. Avoid framework popularity as the main selection criterion.

## Decision order

1. Can the current stack meet the requirements without undue migration cost?
2. Who needs to edit content, and through what interface?
3. Is the project a brochure site, ecommerce storefront, app, CMS theme, or email template?
4. Which features genuinely require server-side logic, authentication, or persistent data?
5. What are the hosting, budget, timeline, accessibility, SEO, localization, and maintenance constraints?
6. Are integrations (forms, CRM, payments, analytics) provided by a third party, and what security boundaries apply?

## Common options (not defaults)

| Project need | Candidate | Verify first |
| --- | --- | --- |
| Content-first static business site | Astro with static output | Need for client editing, forms, dynamic features |
| Existing WordPress/client-managed website | WordPress theme and established editor | Existing plugin stack, theme constraints, backups, local environment |
| Shopify storefront/theme | Shopify Liquid theme | Existing theme architecture, section schemas, store permissions |
| Stateful web application | Framework with server/backend support | Auth, persistence, deployment, operational cost |
| Responsive marketing email | Email-safe HTML and CSS; table layouts | ESP, clients, assets, accessibility, plain-text, QA |
| Basic one-page landing page | HTML/CSS (or existing project stack) | Need for components, authoring, build pipeline |

Choose CSS/build tools based on project needs and compatibility; do not automatically install Tailwind or other tooling. An existing repository should normally retain its current architecture until a concrete reason to change it is shown.

## Define nonfunctional acceptance criteria

- **Accessibility:** semantic structure, keyboard access, sufficient contrast, appropriate labels, image alternatives, and an agreed test approach (e.g. WCAG 2.2 AA when requested).
- **Responsive behavior:** explicit viewport targets; no horizontal overflow or critical clipping; reference comparison where designs exist.
- **Performance:** meaningful targets and measurement method, not invented scores.
- **SEO/AEO/GEO:** indexability, metadata, semantic content and structured data *only where applicable and justified*; avoid claims of guaranteed rankings or AI citations.
- **Security/privacy:** no committed secrets; vetted integration boundaries; form/privacy/compliance requirements determined by jurisdiction and project.
- **Email-specific:** images-off readability, responsive fallback behavior, Outlook/Gmail testing, dark-mode considerations, accessible links/buttons, and plain-text alternative.

## Architecture decision record (short)

State: chosen approach, requirements it satisfies, alternatives considered, trade-offs, unknowns, what would cause reconsideration.
