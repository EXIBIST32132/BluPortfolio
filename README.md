# Blu Belinky Design Portfolio

Custom project-led portfolio for Blu Belinky. The site uses a black stage, warm-white editorial panels, blue/purple design tokens, handmade collage details, fixed top section tabs, and an interactive Contents clock.

There is no CMS in this version. Edit content directly in the typed local files.

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit Blu's Content

- Bio, awards, roles, courses, navigation settings, optional CV link, and Blu's public email: `src/content/profile.ts`
- Projects, tags, case-study copy, source links, image paths, and clock angles: `src/content/projects.ts`
- Global visual tokens and layout styles: `src/app/globals.css`

Blu's public contact is email only: `blubelinky@gmail.com`. Do not add phone numbers, addresses, or private contact details.

## NewPortfolio.pdf Source Of Truth

`NewPortfolio.pdf` is the current content and layout source of truth. The layout drawings inside the PDF are not literal website artwork:

- blue boxes are image slots
- numbers inside boxes are image-slot references
- `blah blah`/lorem text is placement-only
- the real public copy is the text written below each project wireframe

ASL Robotics Rebrand is currently removed from the public clock, Work cards, order, and route unless Blu asks to restore it later.

## Adding Or Editing Projects

Add or update project objects in `src/content/projects.ts`.

The five current project entries should stay in this order unless Blu changes the portfolio sequence:

1. `Newspaper Design`
2. `Award Presentation Materials`
3. `Event Design`
4. `NHSJC Competitions`
5. `MK Pottery`

Important public-facing fields:

- `slug`
- `title`
- `subtitle`
- `year`
- `tags`
- `thumbnail`
- `heroImage`
- `accentColor`
- `clockAngle`
- `role`
- `tools`
- `summary`
- `caseStudy`
- `gallery`

Project pages are generated automatically at `/projects/[slug]`.

The legacy fields `overview`, `brief`, `process`, `outcome`, and `reflection` may remain in typed data for compatibility, but the public pages render from `caseStudy`. Keep public project body copy limited to Blu's `NewPortfolio.pdf` wording.

## Clock Angles

The Contents page clock reads each project's `clockAngle` field from `src/content/projects.ts`.

- Use degrees from `0` to `360`.
- Keep angles spaced far enough apart that desktop labels do not overlap the clock face.
- Hover, keyboard focus, click, and mobile tap update the active project and rotate the hands.
- Reduced-motion users still get active project changes, but hand movement is instant.

On mobile, the clock remains visible and project items become a readable editorial list.

Each clock project box is a real link. Keep the `slug` stable unless the project URL should change.

## Images

Put project images in `public/images/projects/` and update the matching `src`, `alt`, and `caption` fields in `src/content/projects.ts`.

Opening images and galleries are now organized by project folder:

- `public/images/projects/newspaper-design/`
- `public/images/projects/award-presentation-materials/`
- `public/images/projects/event-design/`
- `public/images/projects/nhsjc-competitions/`
- `public/images/projects/mk-pottery/`

To replace an opening image, add the new file under the relevant project folder and update the matching `heroImage`, `thumbnail`, and `caseStudy.heroImage` paths. To edit PDF-specific case-study slots, update the matching `caseStudy` subsection and keep `docs/layout-slot-map.md` in sync.

Reference docs:

- `docs/image-manifest.md` lists available images and likely project matches.
- `docs/layout-slot-map.md` maps each PDF wireframe slot to the chosen image and exact copy block.

## DT Getai Font

DT Getai Grotesk is installed from Blu's provided local zip package.

- Font files: `public/fonts/DTGetaiGroteskDisplay-Black.otf` and `public/fonts/DTGetaiGroteskDisplay-Black.ttf`
- License/info: `public/fonts/LICENSE OFL .txt` and `public/fonts/INFO.txt`
- CSS hook: the `@font-face` rule and `--font-display` token live in `src/app/globals.css`.

Do not download paid or unlicensed replacement font files. If Blu later supplies a different licensed font file, place it under `public/fonts/`, update the `@font-face` rule, and keep body copy on the readable body font token.

## Checks

Run before handoff:

```bash
npm run lint
npm run typecheck
npm run build
npm run qa:visual
```

`npm run qa:visual` runs `tests/visual.spec.ts`. It checks 1920x1080, 1440x900, 1024x768, and 390x844; no horizontal overflow; console health; fixed tabs; Contents clock hover/focus/reduced-motion behavior; exact five-project Work card copy; project routes; and the PDF-specific case-study headings. Screenshots are saved under `test-results/visual-audit/`.

## Stage And Panel System

The portfolio is now a continuous warm-paper editorial flow with a black fixed header/stage edge and connected white portfolio panels. Blu's PDF edits removed the slideshow-like section gaps, replaced the `BB` mark with `Blu Belinky`, removed the opening tagline/time label, and made clock boxes clickable.

The current public version uses five projects, keeps ASL Robotics Rebrand removed, and replaces the old generic case-study template with project-specific layouts drawn from the PDF wireframes.

Keep this system intact when adding features so the site does not drift toward a generic SaaS/card-grid portfolio.

## Deploy On Vercel

This is a standard Next.js App Router project and can be deployed on Vercel with the default framework settings.

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Use install command `npm install`.
4. Use build command `npm run build`.
5. Keep output directory blank/default.
6. Deploy.
