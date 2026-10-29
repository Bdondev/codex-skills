# Asset slicing plan — use before editing any visuals

Design reference: [filename + original dimensions]
Original layered assets available: [yes/no/unknown]
ESP / host for final image URLs: [pending]
Expected email display width: [proposed, not measured]

| Section | Visual or copy element | Final mode (LIVE / SEPARATE / COMPOSITE / FALLBACK) | Proposed filename | Source provenance | Display width (px) | Export width (px) | Transparent? | Important live text? | Blocker / risk |
|---|---|---|---|---|---:|---:|---|---|---|
| Hero | Person + green background + decorative offer | COMPOSITE artwork only | hero-artwork.png | [original / flattened screenshot / generated] | [measure] | [only if source supports] | [yes/no] | Promo terms + CTA | [approval] |
| Product | Bowl (whole) | SEPARATE | harvest-bowl.png | [source] | [measure] | [measure] | yes | Heading + nutrition + CTA | Border overlap |
| Product | Pumpkin | SEPARATE | autumn-pumpkin.png | [source] | [measure] | [measure] | yes | None | [none] |
| Product | Bowl + lower card illustration | COMPOSITE (optional) | harvest-lower-artwork.png | [source] | [measure] | [measure] | [yes/no] | All text stays HTML | Avoid duplication |
| Grower | Farmers + tractor | SEPARATE | grower-farmers.jpg | [source] | [measure] | [measure] | no | Farm story | [resolution] |

For every image: keep source untouched, record exact extraction versus generative re-creation, describe clipped/occluded features, verify pixel dimensions and hosting requirements. The rows are illustrative only; replace with the campaign's actual sections.

## Choice gate

- [ ] Approved working files identified.
- [ ] All essential copy marked live HTML.
- [ ] All CTAs remain HTML links/buttons.
- [ ] Decorative overlap has compatible fallback.
- [ ] No low-resolution upscaling presented as restored source detail.
- [ ] Manifest includes missing source assets and approvals.
