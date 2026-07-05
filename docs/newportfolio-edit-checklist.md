# NewPortfolio.pdf Edit Checklist

Source of truth for this pass: `NewPortfolio.pdf` plus the existing `Images/` folder.

## Global

- [x] Treat the PDF wireframes as layout instructions, not visible website content.
- [x] Keep continuous warm-paper flow and fixed `Blu Belinky` header.
- [x] Keep the clock project index clickable, keyboard accessible, touch usable, and reduced-motion safe.
- [x] Use current five-project order: Newspaper Design, Award Presentation Materials, Event Design, NHSJC Competitions, MK Pottery.
- [x] Keep Work heading as `Work`.
- [x] Remove visible filler/copy-lock violations: `blah blah`, lorem text, `Public Portfolio item`, `Coming soon`, `Placeholder`, `TODO`.

## Project Cards

- [x] Newspaper Design card uses exact title, description, tags, and newspaper opening image.
- [x] ASL Robotics Rebrand removed from the public Work cards, clock index, and routes.
- [x] Award Presentation Materials card uses exact title, description, tags, and map/presentation opening image.
- [x] Event Design card uses exact title, description, tags, and event/pit image.
- [x] NHSJC Competitions card uses exact title, description, tags, and NHSJC image.
- [x] MK Pottery card uses exact title, description, tags, and MK logo image.

## Case Studies

- [x] Newspaper Design follows page 5 wireframe and page 6 copy.
- [x] Award Presentation Materials follows page 7 wireframe and pages 7-8 copy.
- [x] Event Design follows page 9 wireframe and pages 9-10 copy.
- [x] NHSJC Competitions follows page 10 wireframe and pages 10-11 copy.
- [x] MK Pottery follows page 12 wireframe and pages 12-13 copy.
- [x] No public ASL Robotics Rebrand case-study route is rendered.
- [x] Old public case-study headings `Problem`, `Brief`, `Final outcome`, and `Reflection` are not rendered.

## QA

- [x] Image PDFs from `Images/` rendered into deployable `public/images/projects/` PNG assets where needed.
- [x] Playwright tests updated for five-project order, exact copy, removed ASL page, and PDF-specific case-study headings.
- [x] Final visual screenshots reviewed after full `npm run qa:visual`.
