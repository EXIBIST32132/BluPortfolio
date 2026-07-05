import type { AccentColorPreset, Project } from "@/types/portfolio";

const draftNote =
  "Draft case-study copy from Blu's public Carrd listing. Replace with Blu's exact brief, process notes, and final reflection when available.";

const baseProjects: Array<
  Omit<Project, "accentColorPreset" | "featured" | "order" | "sections">
> = [
  {
    slug: "asl-robotics-website",
    title: "ASL Robotics Website",
    subtitle: "A team site system for robotics information and public-facing updates.",
    year: "2025",
    status: "Public portfolio item",
    tags: ["Website", "Robotics", "Information Design", "Brand"],
    heroImage: {
      src: "/images/projects/asl-robotics-website.jpg",
      alt: "Screenshot-style image from Blu Belinky's ASL Robotics Website portfolio item.",
      caption: "ASL Robotics Website - March 2025",
    },
    thumbnail: {
      src: "/images/projects/asl-robotics-website.jpg",
      alt: "ASL Robotics Website project thumbnail.",
      caption: "Website screen capture from the current portfolio.",
    },
    accentColor: "#6698e2",
    clockAngle: 28,
    role: "Website design, content structure, visual communication",
    tools: ["Google Sites", "Layout design", "Editorial systems"],
    summary:
      "A robotics website project that turns team information, competition context, and visual identity into a clearer public-facing resource.",
    brief:
      "Create a useful, legible site for ASL Robotics that could support team visibility and help visitors understand the program quickly.",
    process:
      "The project is treated here as an information architecture problem: group team identity, updates, and competition material into a structure that feels active without losing clarity.",
    outcome:
      "A public robotics website connected to a wider set of team graphics, presentation materials, Twitch overlays, pit designs, and event photography.",
    reflection:
      "The strongest design decision is treating robotics communication as a system, not a one-off page. The final case study should add Blu's notes on audience, constraints, and what changed from draft to launch.",
    sourceUrl: "https://sites.google.com/asl.org/aslrobotics",
    contentNote: draftNote,
    gallery: [
      {
        src: "/images/projects/asl-robotics-website.jpg",
        alt: "Wide website image from ASL Robotics Website portfolio item.",
        caption: "Website item pulled from the current Carrd portfolio.",
      },
    ],
  },
  {
    slug: "frc-hudson-valley-impact",
    title: "FRC Hudson Valley Regional Impact Materials",
    subtitle: "Presentation and pit graphics for a robotics competition environment.",
    year: "2025",
    status: "Public portfolio item",
    tags: ["Presentation", "Infographic", "Robotics", "Print"],
    heroImage: {
      src: "/images/projects/frc-impact-presentation.jpg",
      alt: "FRC Hudson Valley Regional 2025 Impact Presentation Materials Design.",
      caption: "Impact Presentation Materials Design - March 2025",
    },
    thumbnail: {
      src: "/images/projects/frc-impact-presentation.jpg",
      alt: "FRC impact presentation design thumbnail.",
      caption: "Presentation material preview.",
    },
    accentColor: "#a87ce6",
    clockAngle: 86,
    role: "Graphic design, presentation material design, event communication",
    tools: ["Presentation design", "Infographic design", "Print layout"],
    summary:
      "A compact competition graphics system spanning impact presentation material, pit design, and infographic work.",
    brief:
      "Support a robotics team at competition with materials that are quick to understand in a busy physical environment.",
    process:
      "The design challenge is balancing team energy with readable hierarchy: large information blocks, graphic moments, and physical display needs all have to work together.",
    outcome:
      "A set of presentation and pit-facing assets that give the team a more cohesive presence across digital and printed moments.",
    reflection:
      "This is a strong place for Blu to add specific constraints: print size, viewer distance, judges' needs, team branding, and what had to be simplified.",
    contentNote: draftNote,
    gallery: [
      {
        src: "/images/projects/frc-impact-presentation.jpg",
        alt: "FRC impact presentation material.",
        caption: "Impact presentation material.",
      },
      {
        src: "/images/projects/frc-pit-infographic.jpg",
        alt: "FRC Hudson Valley Regional 2025 pit infographic design.",
        caption: "Pit infographic design.",
      },
    ],
  },
  {
    slug: "ampersand-spring-layout",
    title: "The Ampersand Spring Issue Layout",
    subtitle: "A publication spread built around pacing, hierarchy, and page rhythm.",
    year: "2026",
    status: "Public portfolio item",
    tags: ["Publication", "Layout", "Editorial", "Print"],
    heroImage: {
      src: "/images/projects/ampersand-layout.jpg",
      alt: "The Ampersand Volume 1 Spring Issue page 21 layout.",
      caption: "The Ampersand Volume 1, Spring Issue pp. 21 Layout - April 2026",
    },
    thumbnail: {
      src: "/images/projects/ampersand-layout.jpg",
      alt: "The Ampersand Spring Issue layout thumbnail.",
      caption: "Publication layout preview.",
    },
    accentColor: "#7F5A83",
    clockAngle: 142,
    role: "Editorial layout, visual hierarchy, publication design",
    tools: ["Editorial layout", "Typography", "Print production"],
    summary:
      "A publication layout project that foregrounds composition, readable pacing, and page-level editorial decisions.",
    brief:
      "Design a print spread that supports the story while giving the issue a polished, deliberate editorial rhythm.",
    process:
      "The layout is treated as a sequence of reading cues: headline scale, image placement, body copy blocks, and white space all direct movement through the page.",
    outcome:
      "A finished publication page that can sit in a broader magazine/newspaper issue while still carrying its own visual identity.",
    reflection:
      "The final write-up should document what Blu adjusted for print: type scale, image crops, grid decisions, and how the page changed during review.",
    contentNote: draftNote,
    gallery: [
      {
        src: "/images/projects/ampersand-layout.jpg",
        alt: "The Ampersand Spring Issue layout image.",
        caption: "Spring issue layout from the current portfolio.",
      },
    ],
  },
  {
    slug: "standard-silksong-graphic",
    title: "The Standard Silksong Graphic",
    subtitle: "A feature graphic for a publication page about game culture.",
    year: "2025",
    status: "Public portfolio item",
    tags: ["Graphic", "Illustration", "Publication", "Games"],
    heroImage: {
      src: "/images/projects/silksong-graphic.jpg",
      alt: "The Standard Volume 51, Issue 1 page 16 Silksong graphic.",
      caption: "The Standard Volume 51, Issue 1 pp. 16 Silksong graphic - Oct. 2025",
    },
    thumbnail: {
      src: "/images/projects/silksong-graphic.jpg",
      alt: "Silksong graphic thumbnail.",
      caption: "Publication graphic preview.",
    },
    accentColor: "#0D324D",
    clockAngle: 205,
    role: "Graphic design, visual storytelling, publication support",
    tools: ["Illustration", "Editorial graphics", "Composition"],
    summary:
      "A publication graphic connected to Blu's recurring games/culture coverage and visual analysis.",
    brief:
      "Create a graphic that can carry a topic visually while still fitting into The Standard's editorial context.",
    process:
      "This piece is framed as a translation task: turn a game/culture subject into a graphic that reads quickly and supports a page layout.",
    outcome:
      "A finished graphic used in The Standard's Volume 51, Issue 1 coverage.",
    reflection:
      "This case study should eventually capture Blu's visual research, references, and decisions about how closely to echo the source material.",
    sourceUrl: "https://standard.asl.org/flipbook/issue-1-october-2025/#16",
    contentNote: draftNote,
    gallery: [
      {
        src: "/images/projects/silksong-graphic.jpg",
        alt: "Silksong editorial graphic.",
        caption: "Graphic from The Standard Volume 51, Issue 1.",
      },
    ],
  },
  {
    slug: "senior-supplement-cover",
    title: "Senior Supplement Cover",
    subtitle: "A cover design balancing celebration, print impact, and school memory.",
    year: "2025",
    status: "Public portfolio item",
    tags: ["Cover", "Publication", "Print", "Typography"],
    heroImage: {
      src: "/images/projects/senior-supplement-cover.jpg",
      alt: "Senior Supplement 2025 cover.",
      caption: "Senior Supplement 2025 Cover - June 2025",
    },
    thumbnail: {
      src: "/images/projects/senior-supplement-cover.jpg",
      alt: "Senior Supplement cover thumbnail.",
      caption: "Cover design preview.",
    },
    accentColor: "#A188A6",
    clockAngle: 266,
    role: "Cover design, publication identity, print layout",
    tools: ["Typography", "Cover composition", "Print layout"],
    summary:
      "A commemorative publication cover where the design has to feel celebratory without becoming noisy.",
    brief:
      "Create a cover that signals a special supplement and works as the first impression for a printed school publication.",
    process:
      "The cover is framed around impact at a glance: strong hierarchy, a clear central image or type gesture, and restrained supporting details.",
    outcome:
      "A finished Senior Supplement cover included in Blu's current design and photography archive.",
    reflection:
      "The future case study should explain how Blu selected the cover concept, what alternatives were rejected, and how the final print constraints shaped the piece.",
    contentNote: draftNote,
    gallery: [
      {
        src: "/images/projects/senior-supplement-cover.jpg",
        alt: "Senior Supplement 2025 cover image.",
        caption: "Cover image from the current portfolio.",
      },
    ],
  },
  {
    slug: "nhsjc-advert-contest",
    title: "NHSJC Advert + Logo Contest Work",
    subtitle: "Competition pieces exploring compact communication and visual identity.",
    year: "2023-2024",
    status: "Public portfolio item",
    tags: ["Advert", "Logo", "Competition", "Graphic"],
    heroImage: {
      src: "/images/projects/nhsjc-advert-contest.jpg",
      alt: "NHSJC 2024 Advert Contest piece.",
      caption: "NHSJC 2024 Advert Contest - Nov. 2024",
    },
    thumbnail: {
      src: "/images/projects/nhsjc-advert-contest.jpg",
      alt: "NHSJC advert contest thumbnail.",
      caption: "Advert contest preview.",
    },
    accentColor: "#9DA2AB",
    clockAngle: 328,
    role: "Graphic design, advertising concept, logo exploration",
    tools: ["Poster design", "Logo design", "Competition brief"],
    summary:
      "A pair of competition-oriented works that show compact messaging, visual hierarchy, and identity thinking.",
    brief:
      "Respond to contest prompts with visual work that communicates quickly and holds up in a judged setting.",
    process:
      "The project is grouped as a design-competition story: concept, hierarchy, visual hook, and the constraints of making something memorable in a small format.",
    outcome:
      "NHSJC advert work plus earlier logo contest work, including an honourable mention noted on Blu's current portfolio.",
    reflection:
      "This case study should eventually separate the advert and logo pieces if Blu wants more detail, but grouping them keeps the first portfolio version project-led and concise.",
    contentNote: draftNote,
    gallery: [
      {
        src: "/images/projects/nhsjc-advert-contest.jpg",
        alt: "NHSJC advert contest work.",
        caption: "NHSJC 2024 Advert Contest.",
      },
      {
        src: "/images/projects/nhsjc-logo-honourable.jpg",
        alt: "NHSJC 2023 Logo Contest Honourable Mention work.",
        caption: "NHSJC 2023 Logo Contest Honourable Mention.",
      },
    ],
  },
];

const accentPresetBySlug: Record<string, AccentColorPreset> = {
  "asl-robotics-website": "blue",
  "frc-hudson-valley-impact": "purple",
  "ampersand-spring-layout": "mixed",
  "standard-silksong-graphic": "black",
  "senior-supplement-cover": "mixed",
  "nhsjc-advert-contest": "mixed",
};

export const projects: Project[] = baseProjects.map((project, index) => ({
  ...project,
  featured: true,
  order: (index + 1) * 10,
  accentColorPreset: accentPresetBySlug[project.slug] ?? "mixed",
  sections: [],
}));

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return projects[0];
  }

  return projects[(index + 1) % projects.length];
}
