# Dynamic email implementation and portfolio previews

Use only for dynamic email work. Read the approved dynamic-content contract and selected platform reference from mockup-to-design-spec if installed; otherwise obtain equivalent requirements. Confirm current official documentation and actual account capabilities before using platform-specific syntax.

| Target | Engine | Verification |
|---|---|---|
| Klaviyo | Django-style ESP dialect, not full Django | Native event/profile preview |
| SFMC | AMPscript | Native subscriber preview and data extensions |
| Shopify or Liquid ESP | Platform-specific Liquid | Native preview and supported objects |
| Node preview | LiquidJS | Local fixtures, not ESP parity |
| Django | Django templates | Configured server renderer |
| Python | Jinja2 | Configured HTML autoescaping |
| SendGrid / Mailgun | Provider-specific Handlebars | Native preview |
| HubSpot | HubL | Native email preview |
| Responsys | RPL / FreeMarker-derived dialect | Native proof |

- Map fields to verified profile/event/catalog sources, types, requiredness, fallbacks, escaping contexts and fixtures. Never use real customer data in repository fixtures.
- Test missing/null/empty/long/Unicode/HTML-special values and 0/1/max/over-max items. Distinguish zero and false from missing. Specify locale, currency and empty states.
- For server-rendered MJML, render trusted templates with synthetic or authorized data then compile. For ESP-native send-time logic, compile layout preserving native tags, then let the ESP render. Test tag survival in attributes and conditional blocks; mj-raw is not a universal solution. Use reproducible controlled insertion with assertions if needed; never hand-edit generated output.
- Keep loops around structurally complete email-safe table units; validate all branches, mobile stacking and Outlook conditionals. Escape text/attributes appropriately, validate URL schemes and destinations, and allow rich HTML only from trusted sanitized sources.
- Separate production and preview commands/artifacts (e.g. dist/esp/email.html and dist/preview/index.html). Preserve established paths. Production retains native tags; preview uses synthetic fixtures and no real tracking, unsubscribe actions, credentials or personal data. Unsupported engines may use a clearly labeled visual fixture approximation, not claimed emulation.
- Verify production retains required native tokens and has no unresolved build placeholders. Verify preview has no unresolved tokens or live send actions. Validate rendered variants with existing HTML validator and browser checks; raw ESP templates may require rendering before HTML validation. No browser JavaScript in delivered email.
- Native ESP preview/test delivery and real-client QA remain required for production readiness. No upload/send without authorization. Record blocked checks.

Official starting points: https://help.klaviyo.com/ ; https://developer.salesforce.com/docs/marketing/marketing-cloud-ampscript/overview ; https://shopify.dev/docs/api/liquid ; https://liquidjs.com/ ; https://docs.djangoproject.com/ ; https://jinja.palletsprojects.com/ ; https://www.twilio.com/docs/sendgrid ; https://documentation.mailgun.com/ ; https://developers.hubspot.com/ ; https://docs.oracle.com/en/cloud/saas/marketing/responsys/ .
