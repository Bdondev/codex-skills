# QA and release checklist

## Build and static audit

See `esp-and-compiled-output.md` and `client-matrix.md`. The final ESP-processed artifact is a separate check from authoring-source build.

- [ ] Source compiles without MJML errors or other build errors.
- [ ] All intended live text present in source and compiled HTML, checked against approved copy.
- [ ] Links correct, tracking appropriate, personalization and unsubscribe syntax valid for the selected ESP.
- [ ] Images loaded from delivery-safe HTTPS paths or supported ESP mechanisms, with sensible alt text.
- [ ] Content renders in meaningful order without images.
- [ ] Marketing footer includes user-provided legal contact info and valid unsubscribe pathway as required by jurisdiction/ESP. Do not invent.
- [ ] HTML byte size checked before AND after ESP processing when available; aim for <80–90 KB before transformation, warn near 90 KB, inspect Gmail clipping risk near ~102 KB. These are risk thresholds, not universal guarantees.
- [ ] Plain text is supplied and actual multipart MIME send configuration confirmed; check subject/from/preheader in ESP metadata.
- [ ] Client matrix and alternate content lengths, missing values, link rewriting, images off and dark states documented.

## Screenshot review (browser emulation only)

- [ ] 320px, 390px, 600/640px, and reference design width captured.
- [ ] No horizontal scrolling, broken columns, invisible CTAs or clipped text.
- [ ] Image scale/crops, space rhythm and section alignment reviewed.
- [ ] Screenshot differences documented: acceptable deviation / bug / can't verify without reference.

## Real inbox QA (do not conflate with browser QA)

- [ ] Gmail web and Gmail iOS/Android as required.
- [ ] Apple Mail desktop/iOS as required.
- [ ] Outlook classic Windows, new Outlook, Outlook web/mobile according to actual audience.
- [ ] Images off, dark mode, various inbox text sizes where applicable.
- [ ] Buttons tested, links opened, alt text and reading order inspected.
- [ ] Test-send through actual ESP to check link rewriting, merge tags and suppression/unsubscribe.

## Release decision record

```
Campaign:
Target ESP/inboxes:
Compiled HTML path:
Verified by build:
Verified by browser screenshot (sizes):
Verified by real email clients (client/version):
Missing/untested:
Final links/merge tags confirmed by:
Remaining blockers:
Release state: READY / NEEDS QA / BLOCKED
```

"READY" needs the release owner's approval and the required real-client checks; do not declare it on source lint alone.
