# Asset-first decisions for responsive HTML email

**Critical rule:** A whole-email image is not a functional HTML email. Preserve important text and links as live HTML. Decide each slice with its *final email role* in mind, not simply what is easy to cut from a screenshot.

## Triage decision tree

1. **Text, CTA, price, promotion, nutrition, story, required disclosure?** Prefer live HTML. Only incorporate stylized letters into decorative art when essential information is also stated live.
2. **Clean photo, logo or icon?** Separate JPEG for rectangular photography; PNG for transparent logo/icon where supplied. Social icons must have individually linked, accessible anchors if used.
3. **Several decorative elements overlap or cross a card edge?** Maintain isolated working files for editing and optionally produce one final composite, **without** CTA or essential copy. This avoids fragile CSS stacking.
4. **Does the design demand selectable content inside a highly decorative card?** Rebuild the card as a live HTML table; reserve the composite for its *non-text* border and artwork where layout permits. If exact layering would require text over an image, choose a compatibility-first simplification and document it. Never assert a composite automatically preserves accessibility.
5. **Image-only screenshot 225px wide?** The screenshot identifies composition, not sharp source photography. Record missing original files and visually approximate only with permission; do not claim detail was recovered by upscaling or generative replacement.
6. **Image as background?** Provide a solid fill fallback; a background-image dependency for essential text is a compatibility risk.

## Section-specific pattern table (from verified Sweetgreen walkthrough)

| Section | Working slices / final graphic | Always live / functional | Main risk and resolution |
|---|---|---|---|
| Black Friday hero | Model, dark green backdrop, decorative 30%-off art; optionally a final hero composite | Promo CTA, and essential offer terms if the graphic's text is meaningful | Complex overlap; composite art rather than absolute-positioned HTML |
| Autumn Harvest | Transparent bowl and pumpkin separately; optional card-border/bowl *artwork-only* composite | Heading, description, **five nutrition values**, offer, CTA | Bowl crosses white card border; compare simplified email-safe stacking with composite |
| Meet the Grower | Spinach/bowl/farm-name/top label/arrow montage as composite when required; farmers at tractor as separate photo | Story, actionable links, farm identification if meaningful | Farm name baked in may disappear with images disabled |
| Loyalty | Phone and hand visual | Heading, description, join CTA | Prevent tiny text being rasterized |
| Footer | Logo and individual social icons | Mailing address, legal text, unsubscribe link | Icons must be separately linked; tokens are ESP-specific |

## Asset specs and verification

- Preserve original crops and files; put processed copies in `assets/optimized/`. Keep a manifest with `provenance`, `observed vs proposed dimensions`, `display width`, `source size`, `format`, `alt`, `hosting URL`, `status`, and `approval`.
- PNG and JPEG remain safe baseline formats for broad client reach. Avoid defaulting to WebP without testing target clients. Use sRGB when exporting.
- Export at 2× *when source pixel dimensions allow*; don't automatically upscale. Examples from source: 1200px hero/farm photo for a 600px-wide visual, 800–1200px for bowl or phone artwork, logo about 2× intended display width. These are suggestions, **not measured requirements**.
- For truly decorative images use empty alt (`alt=""`); meaningful photos get concise alt; linked brand icons need accessible labels. Image-off state must still retain all critical content and working CTAs.
- Verify every slice against provided original at intended display size. Check transparency edge halos, clipped ingredients, shadow duplication, typography hallucination, intrinsic size, file weight and image-hosting status. Never claim an editor's generative cutout is identical to a source crop.

## Fallback matrix

| Intended technique | In-client fallback |
|---|---|
| Complex overlapping decorations | Flatten non-text graphics into one rectangular composite |
| Bowl over card border | Simplify to bowl beneath card, OR art-only composite plus live text above |
| Decorative background image | Solid background color |
| Offer lettering printed in art | Include essential offer text in live content |
| Image missing/blocked | Alt (if meaningful) plus readable live headings/text/CTAs |
| Farm name inside art | Supply farm name as live text or accessible alternative while avoiding unnecessary duplication |
