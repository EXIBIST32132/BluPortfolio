# Blu Belinky Portfolio

This repository is Blu Belinky's custom design portfolio. Treat it as a designed object: playful, editorial, handmade, collage-like, project-led, visually memorable, and still polished enough for CV/design applications.

## Portfolio Rules

- Project-based structure is mandatory. Do not organize the main site around Brand / Poster / Logo / Illustration; use those only as project tags.
- Avoid generic AI website patterns: no stock SaaS layouts, no purple-to-white gradient heroes, no glassmorphism defaults, no filler badges, no random decorative text, and no copied non-Latin characters from references.
- Preserve the black outer stage, white or warm-white editorial panels, handmade/collage details, and Blu's blue/purple accent direction unless Blu changes the art direction.
- Use design tokens in `src/app/globals.css` for colors, typography, spacing, radii, borders, shadows, z-index, and motion.
- All colors, shadows, spacing, borders, and motion values should come from tokens or established token-derived patterns. Avoid one-off hex values in components.
- Use transform and opacity for motion. Do not animate layout properties such as top, left, width, height, or margin for routine interactions.
- Support `prefers-reduced-motion` globally and in interactive components such as the contents clock.
- Keep the clock-hand hover/focus/tap interaction as the signature interaction. It must remain keyboard accessible and mobile/touch usable whenever the Contents page changes.
- The black stage/background must fill the full viewport at every breakpoint. Do not allow accidental white browser edges, horizontal scroll, or short awkward gaps between portfolio panels.
- The top navigation tabs must remain fixed, visible, readable, and keyboard accessible while scrolling on both the homepage and project pages.
- Avoid regressions toward generic SaaS/card-grid layouts. Project cards should keep a paper/poster/collage feeling and remain project-led.
- Local typed files are the production editing surface. Keep Blu's content easy to edit in `src/content/profile.ts` and `src/content/projects.ts`.
- Portfolio.pdf edits from this pass are a design/content source of truth unless Blu gives newer direction.
- The top-left header mark must read `Blu Belinky`, not `BB`, and the fixed header must remain flush with the top of the viewport.
- The Work section and project navigation must preserve this order unless Blu changes it: Newspaper Design, Award Presentation Materials, Event Design, NHSJC Competitions, MK Pottery.
- Project `clockAngle` and `order` live in `src/content/projects.ts` and must keep the Contents clock hover/focus/tap interaction accurate, keyboard accessible, and mobile usable.
- Contents clock project items must remain real clickable links, keyboard accessible, mobile/touch usable, and visually spaced away from the clock face.
- Case-study pages must use the public structure `Overview`, `Process`, and `Gallery` unless Blu changes direction later. Do not reintroduce public `Problem / Brief`, `Final Outcome`, or `Reflection` as the main structure.
- Maintain accessibility: semantic HTML, keyboard navigation, visible focus states, labelled links/buttons, alt text, acceptable contrast, and mobile responsiveness.
- Do not use unlicensed fonts. Use DT Getai only if Blu provides a licensed local font file under `public/fonts/`; otherwise keep the documented fallback and README TODO.
- Do not invent real contact details, phone numbers, private addresses, or social links. Use placeholders only when clearly labelled as editable placeholders.

## Verification

- Run lint, typecheck, and build before final response:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
- Run the Playwright visual audit after layout, animation, or clock changes:
  - `npm run qa:visual`
- Use browser screenshots or Playwright where available. Check at least 1920x1080, 1440x900, 1024x768, and 390x844.
- Visual changes must be checked at 1920x1080, 1440x900, 1024x768, and 390x844 before handoff.
- Check for horizontal overflow, clipped text, broken focus states, unusable mobile project index, and any visual drift toward generic template patterns.
