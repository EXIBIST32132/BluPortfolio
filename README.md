# Blu Belinky Design Portfolio

Custom project-led portfolio for Blu Belinky. The public site keeps the black stage, warm-white editorial panels, blue/purple accents, handmade collage details, fixed top section tabs, and interactive Contents clock.

Content is now editable in Sanity Studio at `/studio`. The local TypeScript content files remain as fallback fixture data so the site still builds before Sanity credentials are configured.

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio) after Sanity env vars are added.

## Sanity Setup

1. Create or select a Sanity project.
2. Add these values to `.env.local`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_READ_TOKEN` for draft preview only
   - `SANITY_REVALIDATE_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
3. Run `npm run dev` and open `/studio`.
4. Create one document each for `siteSettings`, `profile`, and `designSettings`.
5. Add project documents and publish them.

If env vars are missing, the public site uses `src/content/profile.ts` and `src/content/projects.ts` automatically.

## What Blu Can Edit

In Sanity Studio, Blu can edit:

- Site title, description, SEO image, navigation labels, section visibility/order, CV link/file, and optional social links.
- Profile name, role, tagline, cover positioning line, bio, skills, awards, roles, courses, location, and availability.
- Project cards and project pages: title, slug, year, status, featured state, order, tags, role, tools, summary, brief, process, outcome, reflection, source URL, thumbnails, hero images, galleries, and custom content sections.
- Clock order and `clockAngle` for each project.
- Design presets: accent theme, text scale, heading style, card density, and motion intensity.

The CMS does not expose raw CSS. Design settings map to preset classes/tokens in `src/app/globals.css`.

## Projects And Clock Angles

Projects are edited in Sanity documents of type `project`.

- `featured` controls whether the project appears in Selected Projects.
- `order` controls project ordering.
- `clockAngle` must be between `0` and `360`.
- The Contents clock reads each project’s `clockAngle`.
- Hover, keyboard focus, click, and mobile tap update the active project and rotate the hands.
- Reduced-motion users still get the active state, but hand rotation is instant.

Keep angles spaced enough that desktop labels do not overlap. On mobile, the clock remains visible and the index becomes a usable editorial list.

## Project Sections

Project pages include the standard case-study fields plus optional CMS sections:

- Rich text block
- Image block
- Image gallery block
- Quote block
- Process step block
- Outcome block
- Two-column block
- Full-bleed image block
- Spacer block with small/medium/large presets

Text blocks support fixed `caption`, `body`, `lede`, `heading`, and `display` size presets plus left/center alignment and normal/sticker/label emphasis.

## Images

Sanity image fields use crop/hotspot support and require alt text where possible. The frontend renders Sanity images through `@sanity/image-url` and `next/image`.

Fallback prototype images live in `public/images/projects/`. Keep those files in place for local development without Sanity credentials.

## Contact And CV

Blu’s fallback public contact is email only: `blubelinky@gmail.com`.

In Sanity, `siteSettings.contactEmail` controls the email link. `cvUrl` or `cvFile` is optional and only renders if set. Do not add phone numbers, addresses, or private contact details.

## Preview And Revalidation

Sanity Presentation is configured through `sanity.config.ts`.

- Draft preview enable route: `/api/draft/enable`
- Draft preview disable route: `/api/draft/disable`
- Webhook revalidation route: `/api/revalidate`

Create a signed Sanity webhook for publish/update/delete events and point it at:

```text
https://your-vercel-domain.com/api/revalidate
```

Use the same value as `SANITY_REVALIDATE_SECRET`. The route revalidates portfolio, site/profile/project tags and project paths when a slug is included.

## Deploy On Vercel

1. Push the repo to GitHub.
2. Import the project in Vercel with the default Next.js settings.
3. Add the env vars from `.env.example` in Vercel Project Settings.
4. Deploy.
5. Add the production URL as `NEXT_PUBLIC_SITE_URL`.
6. In Sanity, configure CORS origins for local dev and the Vercel/custom domain.
7. Invite Blu as a Sanity editor.
8. Publish content from `/studio`.
9. Add the custom domain in Vercel and point DNS to Vercel using the instructions shown in the Vercel dashboard.

## What Still Requires A Developer

- Changing the visual system beyond the exposed presets.
- Adding new section block types.
- Changing the clock layout or interaction model.
- Adding integrations that require secrets or server code.
- Adjusting Playwright tests when major layout changes are intentional.

## DT Getai Font

DT Getai Grotesk is installed from Blu’s provided local zip package.

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

`npm run qa:visual` runs `tests/visual.spec.ts` against fallback or CMS-backed content. It checks 1920x1080, 1440x900, 1024x768, and 390x844; no horizontal overflow; console health; fixed tabs; Contents clock hover/focus/reduced-motion behavior; project cards; and at least one case-study page. Screenshots are saved under `test-results/visual-audit/`.

## Stage And Panel System

The portfolio is a scrollable black-stage booklet with warm-white editorial panels. Panels are connected with repeated paper textures, tape strips, dashed borders, blue/purple accents, and project-led labels. Keep this system intact when adding features so the site does not drift toward a generic SaaS/card-grid portfolio.
