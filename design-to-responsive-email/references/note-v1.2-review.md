# 2026 HTML Email Agent Instructions — incorporation record

Source: user pasted full note "HTML Email Development Agent Instructions — 2026 Edition" in conversation on 2026-10-29. This is user guidance, not proof of universal client support.

## Newly adopted

- Framework choice driven by project rather than default MJML.
- Authoring source vs compiled output vs ESP-rendered test-send vs multipart MIME separation.
- Individual Outlook versions and Gmail/Apple/Yahoo/client matrix, states and evidence.
- ESP-approved merge/loop/unsubscribe/address syntax only, with missing/long-data tests.
- Practical reusable module and precise client-debug workflow.
- Plain-text alternative, deliverability and compliance guardrails.
- Wider static lint checks; recommended file-size budget before ESP modification.

## Corrections / nuanced claims

- The source note calls its simple table+anchor-padding CTA "bulletproof". Outlook's clickable region and padding vary by method; use reviewed alternatives with client testing (Litmus 2025).
- "Keep final HTML under 100 KB" is conservative guidance, not a universal pass threshold. ~102 KB Gmail clipping is documented; ESP can enlarge final HTML.
- `target="_blank"` is not an email security mandate. It may be used, but functionality depends on client.
- The sample 600px `width="600"` HTML table isn't by itself proof of mobile fluidity when CSS is stripped. Test fallback widths and hybrid patterns.
- Legacy/classic Word-based Outlook is not the same as new Outlook, Outlook web or mobile.
- Subject/from and true multipart text/plain are send-level metadata/delivery settings, not satisfied by writing `<title>` or `.txt` alone.
- Tooling can flag suspicious links/tags and file sizes, not prove compliance, deliverability, real-client support or complete accessibility.

References: https://www.litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design ; https://help.litmus.com/article/236-emails-cut-off-at-the-bottom ; https://documentation.mjml.io/
