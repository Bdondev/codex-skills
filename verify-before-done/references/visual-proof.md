# Visual proof protocol

Visual screenshots prove what a page looked like under *one* environment. A screenshot is not proof of responsiveness across devices or that behavior works.

1. **Find the source of truth.** Name the supplied mockup/Figma export/reference image and whether it is approved. Do not invent a baseline.
2. **Reproduce conditions.** Record viewport width and height, zoom/device scale, route, data/fixtures, font loading, browser engine, test date, and any animation/motion settings.
3. **Capture at relevant sizes.** Use project-specific target sizes; 1440px desktop and 390px mobile are common for the user's web projects but are not universal. Add other breakpoints when a bug or requirement demands it.
4. **Compare.** If Playwright Test is configured, `await expect(page).toHaveScreenshot('page-mobile.png')` can compare against an approved snapshot. Review diffs manually to distinguish legitimate dynamic pixels from layout defects. For one-off mockups, produce a side-by-side or overlay; don't label two unreviewed screenshots as an automated comparison.
5. **Test behavior separately.** Clicking a CTA, choosing a variant, submitting a form, and keyboard navigation must be exercised with assertions if in scope.
6. **Report discrepancies.** Include the affected element/viewport, expected vs observed result, and image path. Never update a failing baseline just to get a green status without user approval.

**Evidence example (not an actual test result):**

`Mobile hero / 390×844 / Chromium / reference: references/mobile.png / captured: artifacts/verification/hero/mobile.png / observed: title wraps differently / status: FAIL`

If the reference or browser tooling cannot be accessed, mark reference comparison **BLOCKED** rather than asserting pixel accuracy.
