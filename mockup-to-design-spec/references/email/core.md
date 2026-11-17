# Email design audit
Separate visual layout, source framework, template engine, ESP and data contract. Record email type (campaign, transactional, flow), audience, locale, sender and target clients if supplied. Unknowns stay unknown.

- Record actual reference width and proposed content width separately. Specify live text, image crops, retina assets, image-off states, alt text, semantic reading order, mobile stacking, bulletproof CTA and Outlook fallbacks. Do not assume browser CSS or JavaScript works in email.
- Specify dark-mode behavior, accessible contrast and links, preheader, plain-text alternative, footer, unsubscribe/preferences and sender address as applicable. Use ESP-native compliance mechanisms; confirm jurisdiction and message type before claiming compliance.
- Define each dynamic field with type, scope, source, sample synthetic value, fallback, escaping and verification status. Record conditions, loops, limits, ordering, empty states, price/currency formatting and tracking behavior. Never invent production data or include PII in fixtures.
- Specify source -> compile -> ESP import/render -> test send, with a separate static portfolio preview rendered from synthetic fixtures. Do not expose production tokens, unsubscribe links or live customer data in public previews. Local preview is not an ESP emulator unless verified.
- Validate final HTML size (including ESP transformations), links, images, mobile, Outlook desktop, Gmail, Apple Mail and dark mode using actual client tests when available. Record unavailable tests as pending.
