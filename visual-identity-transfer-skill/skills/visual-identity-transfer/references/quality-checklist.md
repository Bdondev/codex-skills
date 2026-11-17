# Quality-control checklist

## Pass / inspect
- [ ] The intended person, and only that person, was edited.
- [ ] Facial features from the identity image are visibly recognizable; no generic facial substitution.
- [ ] Hair type, hairline, braid parts, facial hair, and natural skin tone match the reference as visibly supported.
- [ ] Head angle, expression, body pose and camera perspective still follow the base.
- [ ] Clothing silhouette, patches, visible embroidery, colors, materials and folds are correctly adapted to the base pose.
- [ ] Hands, finger count, grips, arm joins, and interactions with props look physically plausible and reflect the base.
- [ ] Secondary people, vehicle, environment, and objects were not unnecessarily modified.
- [ ] The edit's outlines, shading, saturation, and directional highlights belong to the base's art style.
- [ ] Titles, typography, logo shapes, and visible source text are preserved as closely as possible.
- [ ] Requested output framing does not arbitrarily crop or reshape the source.

## Targeted correction patterns
- Wrong hand geometry: "Edit only [exact hand] and immediate contact area; keep the wrist, surrounding arm, prop location, pose, and everything outside the mask unchanged. Fix anatomy and natural contact."
- Different braids: "Edit only hair and hairline using the precise parting/braid pattern visible in Image B; lock face, head angle, clothing, and poster." 
- Missing patches: "Edit only the selected jacket patch panel. Follow the colors, design boundaries and placement visible in Image B; omit illegible lettering rather than invent text."
- Face feels pasted on: "Relight/re-render only the target face in the base artwork's illustrated contour style and color-shadow structure; retain reference facial anatomy."
- Distorted poster text: "Do not redraw text. If possible, composite or restore the untouched source-text layer over the image output."

## Honest limitations
Instructions to "keep unchanged" describe intent, not a pixel-level editing lock. A generative model may alter collateral regions. A screenshot is not equivalent to the source artwork, and fine print may not be resolvable. Present as unresolved when not verifiable.
