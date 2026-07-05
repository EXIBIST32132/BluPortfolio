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
- In production, `clockAngle`, project order, project title, tags, cards, and case-study copy come from Sanity project documents. Local TypeScript content is only a fallback fixture.
- Hover, keyboard focus, click, and touch all update the same active project state.
- Desktop and tablet preserve a radial editorial layout. Small mobile screens switch the project items into a list so names remain readable and tappable.
- Reduced-motion mode keeps the active-state change but removes animated hand rotation.

## CMS Editing Model

- Sanity Studio is embedded at `/studio`.
- Editors can change site settings, profile text, navigation labels, contact email, optional CV link/file, project cards, project pages, image galleries, tags, section visibility/order, and constrained design presets.
- Design presets map to CSS data attributes and tokens. The CMS must not expose arbitrary raw CSS.
- Sanity images use crop/hotspot support and must include useful alt text.
- Preview mode uses `/api/draft/enable` and Visual Editing when Sanity env vars and a read token are present.
- Published updates should hit `/api/revalidate` with the Sanity webhook secret so homepage and project caches refresh.

## Seamless Stage System

- The site should always read as a black stage holding a stack of handmade editorial portfolio panels.
- The top section tabs are fixed on the black stage so the portfolio keeps visible orientation while moving through long panels and case-study pages.
- Panel seams are softened with repeated tape marks, dashed inner borders, warm-paper grids, and blue/purple wash accents.
- Project cards should feel like pinned posters or scraps, not generic product cards.
- The strongest visual rhythm should come from typography, paper edges, and project imagery rather than decorative animation.

## QA Expectations

- After layout or motion changes, run `npm run qa:visual`.
- The Playwright audit saves viewport screenshots to `test-results/visual-audit/`.
- Required manual taste checks remain: black stage fills the viewport, no horizontal overflow, clock labels do not collide, mobile project index remains usable, and the design does not drift toward a generic SaaS portfolio.

The generated concept board used during implementation is stored outside the repo at:

`/Users/jonathanst-georges/.codex/generated_images/019f24b5-c69b-7530-b0ea-7b855fca4e0c/ig_0f9e7778de7a5d7b016a46d6afa36c81919d8e6037efcd9a12.png`
