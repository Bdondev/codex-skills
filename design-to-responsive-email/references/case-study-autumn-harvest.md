# Case study: verified Sweetgreen Autumn Harvest conversation

This file is a **case-study recipe**, not a universal specification. Source: user's connected Notion page *Build a responsive HTML email from a design using 100% Codex*, fetched 2026-10-29; the last appended discussion explicitly addressed image slicing and overlapping salad-bowl artwork. The page is a narrative guide, not the raw layered artwork, so exact crop pixels and measurements remain unverified.

## Observed layout and asset recommendations

### 1. Promotional hero

- Working assets: model, dark-green background, decorative "30% OFF" artwork. These may be separately editable **when real source layers exist**.
- Final display: prefer a composite decorative hero image if overlapping components would require fragile CSS. Keep brand logo as an independently linked image, primary CTA as HTML, and important offer terms as live text (even if decoratively repeated in the image).
- Do not imply the 225px-wide screenshot can generate genuine 1200px sharp photography.

### 2. Autumn Harvest Bowls

- **Two independent slices:** `harvest-bowl.png` (whole bowl including toppings/dressing cup/shadow, if the pixels are available) and `autumn-pumpkin.png` (decorative transparent PNG). Do not slice individual ingredients.
- **Live HTML:** cream section background; H2 heading; white rounded bordered card when supported; product description; **five nutrition values as table cells**; functional 30%-off CTA.
- **Problem:** bowl crosses the card's *bottom border*. CSS negative margins and absolute positioning are unreliable in some email clients.

**Two viable render treatments:**

| Option | Structure | Tradeoff |
|---|---|---|
| Email-compatibility-first | White HTML card with live content; bowl placed beneath/inside card in source order | More robust, but less exact overlap |
| Fidelity-first | Export **the lower non-text card artwork/border + bowl** as a composite; arrange live heading/description/nutrition outside the composite | Closer artwork, but extra care required to keep all text readable and properly placed |

**Recommended deliverables:** the separate bowl PNG, separate pumpkin PNG, and **optional** lower-card/bowl decorative composite. That lets the implementer make a supported tradeoff after testing. Never rasterize the CTA, nutrition values or approved prose in the final composite.

### 3. Meet the Grower

- Working composition: spinach, bowl, farm-name artwork, top label and arrow as one potential composite; **farmer photograph beside tractor separately**.
- Keep meaningful farm identity, story text and any CTA independently accessible in the resulting email. The decorative farm-name lettering in a composite is not a substitute for readable content when images are blocked.

### 4. Loyalty and Footer

- Loyalty: separate phone/hand image; live heading + joining CTA.
- Footer: supplied logo/social icons as assets; legal text, sender details and unsubscribe as live HTML, with links configured through the real ESP.

## Quality and provenance

The page's original design reference was described as **225 × 1536 px**. This is a source limitation rather than an instruction to resize generated images. Prefer brand-provided high-resolution images or layered design. Keep original output separate from generated/retouched alternatives, recording the provenance in the asset manifest. For crops from flattened screenshots, annotate occluded areas that cannot be truly extracted.
