---
name: poster-identity-outfit-transfer
description: Edit an existing poster, key art, or cinematic illustration by transferring a person's recognizable facial identity, hair, skin tone, and optional outfit from a second reference while preserving the base composition, pose, characters, environment, logos, and art style. Use for GTA-inspired game posters, editorial artwork, character replacements, reference-guided face and clothing transfers, and localized anatomy corrections.
---

# Poster identity and outfit transfer

## Purpose
Replace **only the requested subject attributes** in a base artwork with details from an identity/outfit reference. Treat this as reference-guided **editing**, not whole-scene invention. The desired output is one cohesive illustration in the base image's art direction.

## Required inputs
- **Image A — BASE:** Original highest-quality poster/artwork, without chat interface, screenshots, cropped borders, or text overlays if possible. Authoritative for scene, style, pose, geometry, props, typography, and untouched subjects.
- **Image B — SUBJECT:** Clear, preferably high-resolution identity/outfit reference. Authoritative for face, skin tone, hairstyle, facial hair, clothing details, and materials, as specified by the user.
- **Edit scope:** Which person in A to alter and the exact attributes to replace; whether identity, outfit, or both.
- **Optional constraints:** Output aspect ratio, text/logos, location of arms/hands/props, areas that must not change.

If the user supplies only a screenshot of a previous result or a prompt describing A/B, do **not** claim an exact match or fabricate missing image references. Ask for the missing originals if actually performing the edit; you can still generate an actionable prompt/template.

## Reference hierarchy (resolve conflicts in this order)
1. **Unchanged regions of Image A win**: composition, camera framing, horizon, background, secondary people, vehicles, objects, lettering, and overall visual style.
2. **Changed attributes from Image B win**: intended person's recognizable facial structure, hair pattern/hairline, natural skin tone, facial hair, jacket patches, embroidery, shirt, pants, and other explicitly selected outfit elements.
3. **Pose and expression from Image A win**: head angle, gaze direction, original expression, body position, limb and hand positions, interactions with props. Adapt Image B's clothes to A's body pose. Do not transfer Image B's studio pose or lighting.
4. **Lighting/shading from Image A win**: relight the transferred features and garments to belong to the illustrated scene; do not paste photographic features onto a drawn face.
5. The latest user correction overrides older non-essential instructions only for the explicitly corrected region.

When inputs disagree or a feature is not visible, avoid inventing precise facts; describe the ambiguity and prioritize the explicit visual reference.

## Workflow
1. **Analyze before editing.** Identify the target subject and inventory locked and editable regions. Confirm which reference controls each feature. A screenshot of chat output is a *preview*, not necessarily the uncompressed authoritative source.
2. **Create a minimal edit plan**: `replace` (identity, hair, facial hair, selected clothing) vs `lock` (all untouched details). Do not make unrequested improvements.
3. **Match identity in the base style.** Adapt the face using distinctive visible geometry (brow, eyes, nose, lips, jaw, face proportions, ears) while preserving Image A's camera angle and expression. Retain the reference's specific hair parting/braid structure when visible. Preserve the subject's authentic tone rather than changing it to suit a generic stylization.
4. **Transfer outfit precisely.** Recreate material, cut, silhouette, patches, lettering, colors, embroidery layout, zipper/collar/cuffs; put the garments on Image A's existing pose. Clothing folds and reflections should obey the original perspective and scene lighting. Do not invent brand lettering, badge motifs, or tiny details when the source is unreadable.
5. **Lock everything else.** Explicitly preserve secondary characters, vehicles, environment, sky, bag, text, logos, prop locations, and any art not selected for replacement.
6. **Render with cohesive art direction.** Match contour weight, cel-shaded or painterly shadows, saturation, material treatment, and original directional lighting.
7. **QA in order of importance:** identity resemblance; base composition; unaltered elements; outfit details; pose and hand/prop geometry; style/lighting; text/logo accuracy. Consult `references/quality-checklist.md`.
8. **Use targeted revisions.** If one item fails, revise only that region with a narrow instruction; use an image editor's selection/mask tools where available. Avoid starting over for a localized hand, patch, or typography issue unless unavoidable.

## Image tool execution
- When an image-editing tool is available and the user requests an image, **perform the edit** using both reference images and these instructions. Do not present JSON alone as though it rendered an image.
- When no image generation/editing tool is available, provide a paste-ready prompt and a concise explanation of which two images to attach. Do not imply an image was generated.
- When a tool cannot enforce true pixel locks, tell the user that "preserve exactly" is a **target**, not a guarantee. For logos and typography requiring pixel-perfect results, recommend keeping the original layer and compositing it over the edited image in a layer-based editor.
- Neither `SKILL.md` nor an example JSON is a special image-command API. Slash commands such as `/edit` are shorthand only unless the active tool specifically supports them. Descriptive instructions and carefully chosen references matter more than elaborate JSON syntax.

## Deliverable behavior
- For an image-editing request with usable sources: produce the edited image and one short summary of what changed; identify any visible limitation.
- For a prompt/skill request: produce a ready-to-copy edit prompt with **Image A/B hierarchy**, strict `REPLACE` and `LOCK` sections, style integration, QA checks, and expected output.
- For a reusable JSON request: use `templates/edit-spec.json` and fill only details supported by the references/user.

## Bundled references
- `templates/chatgpt-images-prompt.md`: compact natural-language prompt designed for chat-based image editors.
- `templates/edit-spec.json`: reusable structured spec.
- `examples/gta-inspired-poster.md`: concrete worked example based on the supplied discussion.
- `references/quality-checklist.md`: validation and narrow-repair guidance.
