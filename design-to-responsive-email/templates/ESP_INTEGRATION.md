# ESP integration + release validation

Campaign / email type: [marketing/transactional/lifecycle/receipt/notification/newsletter]
ESP / account (not credentials): [verified]
Source template path:
Compiled HTML path:
Post-ESP HTML/test delivery source:
Date / owner:

## Approved dynamic fields

| Field or block | Source of official syntax | Test value, including missing/long | Verified in preview/test send? |
|---|---|---|---|
| Name | [official doc link] | missing, unicode, long | NOT TESTED |
| Unsubscribe | [official doc link] | test address | NOT TESTED |
| Physical address/sender | [approved business data] | supplied | NOT TESTED |
| Preference center | [if required] | test link | NOT TESTED |

## Gates

- [ ] Confirm opt-out and sender identity requirements with the responsible owner; do not infer law or platform tags.
- [ ] Verify ESP template editable regions and intended partial/module reuse.
- [ ] Confirm merge tags, conditionals, loops, correct escaping and fallback values against official ESP docs.
- [ ] Render using blank/long/non-ASCII personalization data.
- [ ] Confirm sender authentication in ESP dashboard if available; do not claim inbox placement.
- [ ] Verify hosted HTTPS images, tracked CTAs, unsubscribe and preferences from a received test message.
- [ ] Check delivered email's raw HTML bytes; distinguish `NOT AVAILABLE` from `PASS`.
- [ ] Verify actual MIME plain-text alternative, subject/from/preheader metadata and image-disabled reading.

Release decision: BLOCKED / NEEDS QA / READY (approved by owner)
