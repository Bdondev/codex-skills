# Design fidelity and QA loop

The goal is the closest defensible reproduction, not an unsupported “pixel perfect” claim. References are authoritative when their resolution is sufficient; mark uncertainty otherwise.

## Before each section

1. Identify the exact source reference, its dimensions and crop; map every visible logo/icon/photo to supplied assets. Do not generate replacement assets or borrow web images without permission.
2. Compare geometry: max width, alignment, columns, gaps, vertical rhythm, heading wraps, CTA positions, border radii, shadows, overlays, gradients, photo focal points, and spacing to neighboring sections.
3. Read the current project's design tokens and preserve approved components. If a property cannot be measured due to low resolution, document the estimate.
4. Define interaction and responsive expectations, including mobile stacking and intrinsic min/max widths.

## Browser verification

1. Build, then load the **LocalWP WordPress URL**; wait for relevant fonts and images to load (do not hide unresolved loading failures).
2. Capture the same viewport width and device scale as the reference whenever possible; a useful baseline is desktop **1440 CSS px** and mobile **390 CSS px**, with an additional **428 CSS px** wide test if needed. These are test targets, not promises about the source image.
3. Compare screenshots side by side or via overlay/diff; inspect both visual output and DOM/CSS. If reference screenshots have different width, reframe the comparison instead of claiming exact pixel equality.
4. Correct the largest deviations first: overall layout → imagery/cropping → typography and wraps → spacing → details.
5. Recheck at least one narrower breakpoint, one wider breakpoint and mobile nav/interactions. Review horizontal overflow and intrinsic child widths. Check keyboard navigation, focus visibility, accordion/menu state and tap targets.
6. Run relevant Lighthouse or equivalent diagnostics if available; verify color contrast, headings, label associations, image alt, and reduced-motion behavior where relevant. Automated testing is only part of accessibility verification.
7. If feasible, check iOS Safari/mobile device for browser-specific layout and image-crop issues, especially when previous QA found a mobile mismatch. Record what was actually tested.

## Acceptance record

In `docs/visual-qa.md` (if project already keeps one) or the section handoff, record:

- Section and reference filename; screenshot viewport(s) and exact local URL.
- Build/test results, actual screenshots produced (and paths), what could not run.
- Major differences found and resolved; remaining differences and why.
- Whether images are original/approved and whether missing details are unverified.
- Pass/fail for horizontal overflow, navigation/interaction and keyboard operation.

Avoid inventing numerical “pixel accuracy” or accessibility audit scores. Do not delay another unrelated section indefinitely for unmeasurable reference details; communicate the limitation and move on with user direction.
