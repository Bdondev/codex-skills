# Precise image-slicing requests (use for editor or asset extraction)

A true pixel crop, a manual masked extraction, and generative reconstruction are different things. Call each by its actual method. From a flattened/low-res screenshot, occluded pixels are unknowable; never claim a generative image is the original cutout. Preserve original files, design lettering and appearance where source pixels permit.

## A. Generic extraction (one asset)

> Treat my supplied design/image as the authoritative visual reference. Produce **only** [ELEMENT] as `[FILENAME]`. Preserve the visible original composition, color, proportions, texture and crop. Exclude surrounding design UI and unrelated items. Keep real extracted pixels where available; do not fabricate hidden objects or missing lettering. Export `[PNG with transparency / JPEG rectangle]` using real source resolution. If a clean extraction requires reconstruction, explicitly state which parts were recreated and do not present them as a true crop. Do not add shadows, logos, labels or extras.

## B. Black Friday hero (editable files + final image)

> Slice the hero's model, green background, and decorative '30% OFF' artwork as **separate working assets** when original layers permit. Keep model/typography unchanged. Also prepare a **single composite decorative hero** at the final aspect ratio if the design's overlap requires it in email. Exclude the primary CTA; it will be a live HTML button. Keep the logo as a separate linked image and preserve essential offer terms in live HTML. If only a small screenshot exists, flag the lack of authentic high-resolution sources.

## C. Autumn Harvest — two distinct images

> Extract `harvest-bowl.png` (complete salad bowl, toppings, dressing cup and natural shadow as a single transparent object) and `autumn-pumpkin.png` (the separate decorative pumpkin with transparency). Do **not** crop/flatten the heading, five nutrition figures, product description or 30%-off CTA. Keep original shapes; don't synthesize missing ingredients. Report source dimensions and extraction method.

## D. Autumn Harvest optional lower-card composite

> Create `harvest-lower-artwork.png` from the **decorative lower border/card artwork and overlapping bowl only** to preserve the bowl crossing the card edge. Do not include any product description, nutrition figures, headings or CTA; those remain live HTML in their own email-safe rows. Keep a compatible fallback version with the bowl simply under the live-text card. Compare both against the screenshot and disclose which layout is used.

## E. Meet the Grower — two outputs

> Export (1) `grower-illustration-composite.png` containing spinach, bowl, farm-name artwork, top label and arrow in the illustrated arrangement; (2) `grower-farmers.jpg` containing the two farmers standing by a tractor as an **independent rectangular photograph**. Avoid changing faces, equipment, colors, farm lettering or cropping off subjects. Keep the explanatory farm story and functional links outside these images. Mark any ambiguous/illegible text instead of inventing it.

## F. Loyalty / Footer

> Extract only the phone/hand loyalty illustration as `loyalty-phone.png`. Keep headline and join CTA as live HTML. Extract each supplied social icon as its own asset if the design requires separate destinations, with appropriate transparent edges. Keep the legal copy, sender details and unsubscribe link live. No invented brand logos or profile destinations.

## Verify each output

- Compare each crop with authoritative source at intended display size and check non-distorted aspect ratio, edge halos, cut-off objects and duplicated shadows.
- Record intrinsic dimensions, file size, transparency channel, source/provenance, output file and alt text in `docs/ASSET_MANIFEST.csv`.
- Publish no asset until URL, license/brand authenticity and QA have been approved. An image tool's plausible result is **not proof** of faithful extraction.
