# Design Notes

The supplied visual direction was interpreted as a portfolio object rather than a literal reference copy.

- The black outer background became a persistent stage around white editorial panels.
- The reference's contents-page energy became a project index with a central clock, where hover/focus/tap changes the clock hands.
- Handmade details are implemented as code-native SVG/CSS tape, scraps, doodles, imperfect borders, and pinned cards.
- The palette was shifted away from pink and toward Blu's preferred blue `#6698e2` and purple `#a87ce6`.
- Display typography now uses the local OFL-licensed DT Getai Grotesk files supplied by Blu under `public/fonts/`.
- The main structure is project-led. Brand, Poster, Logo, Illustration, Website, and Publication appear only as tags.
- No decorative non-Latin characters were copied from the inspiration image.
- Current public Carrd content was used for project names, roles, awards, and selected work images where reachable.

## Interaction System

- The Contents clock is the signature interaction. It has a resting state, then rotates its hands toward the active project's `clockAngle`.
- In production, `clockAngle`, project order, project title, tags, cards, and case-study copy come from the local typed files in `src/content/`.
- Hover, keyboard focus, click, and touch all update the same active project state.
- Desktop and tablet preserve a radial editorial layout. Small mobile screens switch the project items into a list so names remain readable and tappable.
- Reduced-motion mode keeps the active-state change but removes animated hand rotation.

## Editing Model

- Edit site/profile content in `src/content/profile.ts`.
- Edit projects, cards, tags, image paths, case-study copy, and clock angles in `src/content/projects.ts`.
- Design presets map to CSS data attributes and tokens. Do not introduce arbitrary one-off style controls for content edits.
- Project images live under `public/images/projects/` and must include useful alt text in the project data.

## NewPortfolio.pdf Edit Pass

`NewPortfolio.pdf` is the current source of truth for this refinement pass. It supersedes older PDF edits and the previous generic case-study template.

- The page now reads as one continuous warm-paper portfolio flow instead of separated slideshow-like panels.
- The fixed header is flush with the top of the viewport and uses the full name `Blu Belinky`.
- The opening screen no longer shows the deleted tagline or unexplained `3:30` label.
- The contents clock keeps the project-led index, but every project box is now a real case-study link.
- Desktop clock labels are spaced outside the clock face; smaller screens switch to a readable editorial list.
- The current five-project order is: Newspaper Design, Award Presentation Materials, Event Design, NHSJC Competitions, MK Pottery.
- The PDF layout images are interpreted as layout instructions: blue boxes are image slots, numbers are image-slot references, and `blah blah` text is not public copy.
- Newspaper, Award Presentation Materials, Event Design, NHSJC Competitions, and MK Pottery use project-specific layouts mapped from the PDF wireframes and `Images/` assets.
- ASL Robotics Rebrand is currently removed from the public portfolio list and route unless Blu asks to restore it later.
- Project copy should not be invented or paraphrased. Public card/body text must come from `NewPortfolio.pdf`.

## Seamless Stage System

- The site should read as a continuous warm-paper portfolio object with black used as an intentional header/frame/border system.
- The top section tabs are fixed at the top edge so the portfolio keeps visible orientation while moving through long panels and case-study pages.
- Panel seams are softened with repeated tape marks, dashed inner borders, warm-paper grids, and blue/purple wash accents.
- Project cards should feel like pinned posters or scraps, not generic product cards.
- The strongest visual rhythm should come from typography, paper edges, and project imagery rather than decorative animation.

## QA Expectations

- After layout or motion changes, run `npm run qa:visual`.
- The Playwright audit saves viewport screenshots to `test-results/visual-audit/`.
- Required manual taste checks remain: black stage fills the viewport, no horizontal overflow, clock labels do not collide, mobile project index remains usable, and the design does not drift toward a generic SaaS portfolio.

The generated concept board used during implementation is stored outside the repo at:

`/Users/jonathanst-georges/.codex/generated_images/019f24b5-c69b-7530-b0ea-7b855fca4e0c/ig_0f9e7778de7a5d7b016a46d6afa36c81919d8e6037efcd9a12.png`
