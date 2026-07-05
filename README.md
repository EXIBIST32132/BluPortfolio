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

## Adding Or Editing Projects

Add or update project objects in `src/content/projects.ts`.

Important fields:

- `slug`
- `title`
- `subtitle`
- `year`
- `status`
- `tags`
- `thumbnail`
- `heroImage`
- `accentColor`
- `clockAngle`
- `role`
- `tools`
- `summary`
- `brief`
- `process`
- `outcome`
- `reflection`
- `gallery`

Project pages are generated automatically at `/projects/[slug]`.

## Clock Angles

The Contents page clock reads each project's `clockAngle` field from `src/content/projects.ts`.

- Use degrees from `0` to `360`.
- Keep angles spaced far enough apart that desktop labels do not overlap.
- Hover, keyboard focus, click, and mobile tap update the active project and rotate the hands.
- Reduced-motion users still get active project changes, but hand movement is instant.

On mobile, the clock remains visible and project items become a readable editorial list.

## Images

Put project images in `public/images/projects/` and update the matching `src`, `alt`, and `caption` fields in `src/content/projects.ts`.

Images currently included were copied from Blu's reachable public Carrd portfolio for this prototype.

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

`npm run qa:visual` runs `tests/visual.spec.ts`. It checks 1920x1080, 1440x900, 1024x768, and 390x844; no horizontal overflow; console health; fixed tabs; Contents clock hover/focus/reduced-motion behavior; project cards; and at least one case-study page. Screenshots are saved under `test-results/visual-audit/`.

## Stage And Panel System

The portfolio is a scrollable black-stage booklet with warm-white editorial panels. Panels are connected with repeated paper textures, tape strips, dashed borders, blue/purple accents, and project-led labels. Keep this system intact when adding features so the site does not drift toward a generic SaaS/card-grid portfolio.

## Deploy On Vercel

This is a standard Next.js App Router project and can be deployed on Vercel with the default framework settings.

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Use install command `npm install`.
4. Use build command `npm run build`.
5. Keep output directory blank/default.
6. Deploy.
