# Matrix and evidence rules

## Choose explicit targets

Do not say "tested in Outlook" without a version/engine. Choose based on campaign reach:

- Gmail web; Gmail app on iOS; Gmail app on Android (accounts/configuration may affect output)
- Apple Mail on macOS; iOS Mail
- Classic Outlook Windows (Word-based version); new Outlook Windows; Outlook web; Outlook iOS/Android
- Yahoo web/mobile and AOL when relevant
- Actual ESP preview/test-send environment

Web browser rendering does **not** count as inbox rendering. One screenshot does not validate a family of clients. Consult https://www.caniemail.com/ for feature-specific support *as of the investigation date*, then verify with actual inbox testing. The existence of support in one Apple Mail version says nothing about classic Outlook.

## States per client

Track `NOT TESTED`, `PASS`, `FAIL`, `PASS WITH KNOWN COMPROMISE`, and link to evidence; don't silently default to PASS. Include light/dark mode, images off, narrow widths, preheader/subject appearance and accessible fallback where supported. Content variants: short, long, empty and unusual personalization values; send and render after ESP transforms.

Use `templates/CLIENT_MATRIX.md` (clone rows according to actual selected clients). All required tests must be documented before calling a release READY. A client not required by the project can be marked `NOT IN SCOPE` with a reason—not `PASS`.
