# Single-section QA card

Section: [name]
Reference image / art files: [paths]
Approved copy and links: [paths/brief]

## Build evidence

- [ ] Scope includes this section only; previously approved sections unchanged.
- [ ] MJML compiled with validation, or HTML checked with project tooling.
- [ ] HTML static audit run; log warnings.
- [ ] Screenshots inspected at 320px, 390px and 600px (1440px optional full-page context).
- [ ] No unintended overflow or missing assets.
- [ ] Actual image crop and spacing compared against reference, with differences recorded.
- [ ] Essential text and CTA usable without images.
- [ ] Table-based fallback and Outlook-specific risk documented; chosen CTA clickable area confirmed or marked NOT TESTED.
- [ ] Long copy/missing dynamic inputs checked for reusable modules.
- [ ] Links and marketing copy reconcile with approved brief.

### Observed deviations (no invented passes)

| Breakpoint/client | Expected | Actual evidence | Decision / remaining risk |
|---|---|---|---|
| 320px browser | [expected] | [screenshot path or not tested] | [pending] |
| 390px browser | [expected] | [screenshot path or not tested] | [pending] |
| 600px browser | [expected] | [screenshot path or not tested] | [pending] |
| Real inbox | [target clients] | [tested clients/versions or not tested] | [pending] |
