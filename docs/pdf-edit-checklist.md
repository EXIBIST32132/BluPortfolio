# Portfolio.pdf Edit Checklist

Source of truth for this pass: `/Users/jonathanst-georges/Downloads/Portfolio.pdf`. It was rendered/extracted locally during QA; scratch render files were not kept in the repo.

Follow-up note: Blu later asked to remove ASL Robotics Rebrand and use all images from the organized `Images/` folders for the remaining project galleries. The current site therefore uses five projects, not the original six from this PDF checklist.

## A. Global Visual Flow / Background

- [x] Make the white/warm-paper surface feel continuous through the page.
- [x] Remove slideshow-like gaps between sections.
- [x] Keep black only as an intentional outer frame/stage.
- [x] Ensure `html`, `body`, and root shell fill the viewport.
- [x] Prevent horizontal overflow at 1920x1080, 1440x900, 1024x768, and 390x844.

## B. Header Fixes

- [x] Replace `BB` with `Blu Belinky`.
- [x] Pin the header flat to the viewport top.
- [x] Remove the unnecessary top gap above the header.
- [x] Keep header links readable and keyboard accessible.

## C. Opening Screen Fixes

- [x] Remove visible `Project-led graphic design portfolio.`
- [x] Remove unexplained visible `3:30`.
- [x] Replace or remove the confusing flower doodle.
- [x] Keep the opening screen visually intentional after copy removal.

## D. Clock / Contents Page Fixes

- [x] Use the exact six-project order from the PDF.
- [x] Keep the Contents index project-led.
- [x] Move project boxes away from the clock face/hands.
- [x] Make every project box clickable.
- [x] Link every project box to the relevant project page.
- [x] Preserve hover, keyboard focus, and mobile tap active states.
- [x] Rotate the clock hand with transform-based motion.
- [x] Add/keep reduced-motion fallback.
- [x] Make the clock panel sticky/stationary while the section is read on larger screens.
- [x] Use a readable stacked/two-column mobile layout.
- [x] Add required `data-testid` selectors.

## E. Work Section Copy Fixes

- [x] Replace `Projects, not categories.` with `Work`.
- [x] Delete the long case-study editing sentence.
- [x] Remove `Public Portfolio item` from cards.
- [x] Keep cards editorial/paper/poster-like and clickable.

## F. Exact Project Content

- [x] Add `Newspaper Design` with exact PDF description and tags.
- [x] Add `ASL Robotics Rebrand` with exact PDF description and tags.
- [x] Add `Award Presentation Materials` with exact PDF description and tags.
- [x] Add `Event Design` with exact PDF description and tags.
- [x] Add `NHSJC Competitions` with exact PDF description and tags.
- [x] Add `MK Pottery` with exact PDF description and tags.
- [x] Use extracted/opening images where available.
- [x] Avoid fake project details, fake dates, fake metrics, and fake links.

## G. Project Order Everywhere

- [x] Apply the six-project order to Contents.
- [x] Apply the six-project order to Work cards.
- [x] Apply the six-project order to next/previous project navigation.
- [x] Apply the six-project order to tests.

## H. Case-Study Page Layout

- [x] Replace public `Problem / Brief`, `Final Outcome`, and `Reflection` headings.
- [x] Use visible headings `Overview`, `Process`, and `Gallery`.
- [x] Add process image composition: one large left image, two stacked right images.
- [x] Add six-slot gallery grid.
- [x] Make process/gallery layouts responsive.

## I. Design Taste Pass

- [x] Remove generic SaaS/card-grid feeling where visible.
- [x] Strengthen typography hierarchy without making it messy.
- [x] Keep colors, shadows, spacing, and motion token-based.
- [x] Remove exposed sloppy placeholder text.
- [x] Preserve handmade/collage/editorial direction.

## J. Animation / Transition Pass

- [x] Refine section reveal transitions for continuous scroll.
- [x] Refine project hover/focus transitions.
- [x] Keep clock hand movement smooth without jitter.
- [x] Preserve reduced-motion behavior.

## K. Accessibility

- [x] Ensure project cards are links.
- [x] Ensure clock items are keyboard accessible links.
- [x] Keep visible focus states.
- [x] Maintain alt text.
- [x] Maintain semantic heading order.
- [x] Verify reduced-motion interactions.

## L. Playwright CLI QA

- [x] Update visual QA tests for PDF edits.
- [x] Check 1920x1080.
- [x] Check 1440x900.
- [x] Check 1024x768.
- [x] Check 390x844.
- [x] Check no horizontal overflow.
- [x] Check clock click/hover/focus/reduced-motion behavior.
- [x] Check project page layout and removed old headings.
- [x] Save screenshots under `test-results/visual-audit/`.

## M. Required Commands

- [x] `npm install` if needed.
- [x] `npm run lint`.
- [x] `npm run typecheck`.
- [x] `npm run build`.
- [x] `npm run qa:visual`.

## O. Documentation Updates

- [x] Update README editing instructions.
- [x] Update AGENTS.md permanent rules.
- [x] Update docs/design-notes.md with the PDF pass details.
