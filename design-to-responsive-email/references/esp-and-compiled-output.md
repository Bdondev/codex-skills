# Compiled HTML, ESP output, and personalization rules

## Source-of-truth distinction

- **Authoring source:** MJML, table HTML, partials, templated HTML, React Email, Maizzle or ESP-native code. Edit this and rebuild. Do not routinely hand-edit `dist/email.html` (edits get lost in the next compile).
- **Compiled output:** the actual HTML that the browser and email client will receive *before ESP rewriting*. Inspect raw generated markup, linked assets, CSS inlining, conditional MSO blocks and final byte count. Framework success is not inbox compatibility.
- **ESP-transformed output:** if the ESP rewrites links, inserts personalization/tracking, or compiles blocks, inspect the exported or test-delivered HTML. Record actual final byte count and rendering. If export is unavailable, say `NOT VERIFIED`.
- **Delivered MIME:** a plain-text `.txt` file alone does not create a multipart email. Confirm the ESP or sender sends `text/plain` and `text/html` appropriately. Subject/sender/preheader often live in ESP campaign settings rather than HTML `<title>`.

## ESP setup

1. Record whether the message is marketing, transactional, lifecycle, receipt, notification or newsletter; classifications may change opt-out/identity requirements.
2. Record exact ESP, template/drag-and-drop restrictions, send method and audience/jurisdiction. No syntax invented for Klaviyo, Mailchimp, Shopify Email, SFMC, Braze, HubSpot, Customer.io, etc.
3. Obtain official merge syntax for all personalization/conditional/loop/opt-out/address fields and protect these tokens from minifiers or escaping. Never hardcode subscriber PII into reusable templates.
4. Validate previews using *missing*, empty, short, long, unicode/emoji and unexpected values. Escaping and fallbacks must follow the platform's documented syntax.
5. Use ESP asset hosting or deliverable HTTPS URLs; confirm final tracking redirects do not break destination or consent URLs.
6. Compare rendered **final** email and preview against approved copy; open links and unsubscribe/preferences from real test mail with approved accounts.
7. Check sender-domain authentication and other deliverability settings in the ESP's own dashboards; source HTML cannot establish authentication, inbox placement or legal compliance.
8. Use `templates/ESP_INTEGRATION.md` to maintain a verification record. If any requirement cannot be verified, record a blocker instead of guessing.

## File-size budget (heuristic, not legal or compatibility law)

- Before ESP processing: target <80–90 KB as an **engineering budget**, not a pass/fail condition.
- >=90 KB: consider optimization and document growth room.
- ~102 KB: risk of Gmail clipping; determine final tested behavior after ESP mutation. Track **UTF-8 bytes**, not just visible text. Avoid removing functional MSO conditionals, required content or ESP tags merely to shrink the source.

## Security and compliance

No scripts, exposed credentials, private profile data or concealed unsubscribe. Avoid collecting sensitive data inside email. Don't claim consent/law compliance without verified jurisdiction and counsel or platform policy. Avoid speculative statements that text/image ratios alone determine inbox placement.

See official references: https://documentation.mjml.io/ and https://www.litmus.com/blog/a-guide-to-rendering-differences-in-microsoft-outlook-clients
