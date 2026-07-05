import type { AccentColorPreset, Project, ProjectImage } from "@/types/portfolio";

const image = (src: string, alt: string, caption: string): ProjectImage => ({
  src,
  alt,
  caption,
});

const projectAsset = (
  slug: string,
  filename: string,
  alt: string,
  caption: string,
): ProjectImage => image(`/images/projects/${slug}/${filename}`, alt, caption);

const numberedAssets = (
  slug: string,
  filenames: string[],
  title: string,
  captionPrefix = title,
): ProjectImage[] =>
  filenames.map((filename, index) =>
    projectAsset(
      slug,
      filename,
      `${title} image ${index + 1}.`,
      `${captionPrefix} image ${index + 1}.`,
    ),
  );

const processNote = {
  newspaper:
    "The process centers on page rhythm: headline scale, image placement, and pacing across a printed spread.",
  award:
    "The process centers on making a dense team story legible for judges through clear hierarchy, sequencing, and supporting visuals.",
  event:
    "The process centers on designing for a busy physical environment where signage has to read quickly from a distance.",
  nhsjc:
    "The process centers on compact communication: a memorable visual hook, limited space, and clear audience cues.",
  mk:
    "The process centers on translating a handmade pottery identity into clear brand, advertising, and workshop information materials.",
};

const newspaperImages = numberedAssets(
  "newspaper-design",
  [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
    "11.png",
    "12.png",
    "13.png",
    "14.jpg",
    "15.jpg",
    "16.png",
  ],
  "Newspaper Design",
);

const awardImages = numberedAssets(
  "award-presentation-materials",
  ["1.jpeg", "2.JPG", "3.png", "4.png"],
  "Award Presentation Materials",
);

const eventImages = numberedAssets(
  "event-design",
  ["1.jpeg", "4.jpg"],
  "Event Design",
);

const nhsjcImages = numberedAssets(
  "nhsjc-competitions",
  ["1.png", "2.jpeg", "3.png"],
  "NHSJC Competitions",
);

const mkImages = numberedAssets(
  "mk-pottery",
  ["1.jpg", "2.png", "3.png", "4.png", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"],
  "MK Pottery",
);

const openingImages = {
  newspaper: image(
    newspaperImages[0].src,
    "Newspaper publication spread with feature graphics and page layout.",
    "Opening newspaper spread.",
  ),
  award: image(
    awardImages[2].src,
    "FRC presentation map and impact material composition.",
    "Award presentation material composition.",
  ),
  event: image(
    eventImages[0].src,
    "Robotics pit display and event signage installation.",
    "Event display and pit signage.",
  ),
  nhsjc: image(
    nhsjcImages[0].src,
    "NHSJC competition advert design featuring a soup can concept.",
    "NHSJC advert competition entry.",
  ),
  mk: image(
    mkImages[3].src,
    "MK Pottery logo mark on a warm paper background.",
    "MK Pottery logo mark.",
  ),
};

type ProjectDraft = Omit<Project, "accentColorPreset" | "featured" | "order"> & {
  accentColorPreset: AccentColorPreset;
};

const baseProjects: ProjectDraft[] = [
  {
    slug: "newspaper-design",
    title: "Newspaper Design",
    subtitle:
      "Publication spreads and feature graphics for The Standard built around pacing, hierarchy, and page rhythm.",
    year: "2025-2026",
    status: "",
    tags: ["Editorial", "Layout", "Print"],
    heroImage: openingImages.newspaper,
    thumbnail: openingImages.newspaper,
    accentColor: "#6698e2",
    accentColorPreset: "blue",
    clockAngle: 300,
    role: "Editorial layout, publication graphics, page hierarchy",
    tools: ["Editorial layout", "Typography", "Print design"],
    summary:
      "Publication spreads and feature graphics for The Standard built around pacing, hierarchy, and page rhythm.",
    overview:
      "Publication spreads and feature graphics for The Standard built around pacing, hierarchy, and page rhythm.",
    brief:
      "Build publication pages and graphics that support story pacing, hierarchy, and page rhythm.",
    process: processNote.newspaper,
    outcome:
      "A set of editorial spreads and feature graphics that can be swapped into the final case study as Blu adds process notes.",
    reflection:
      "Use the public Overview / Process / Gallery fields for the current case-study layout.",
    processImages: newspaperImages.slice(0, 3),
    gallery: newspaperImages,
  },
  {
    slug: "award-presentation-materials",
    title: "Award Presentation Materials",
    subtitle:
      "Impact presentation design for FRC regionals, built to communicate the team's story clearly to judges.",
    year: "2025",
    status: "",
    tags: ["Presentation Design", "Print"],
    heroImage: openingImages.award,
    thumbnail: openingImages.award,
    accentColor: "#6698e2",
    accentColorPreset: "mixed",
    clockAngle: 60,
    role: "Presentation design, print communication, information hierarchy",
    tools: ["Presentation design", "Print layout", "Information design"],
    summary:
      "Impact presentation design for FRC regionals, built to communicate the team's story clearly to judges.",
    overview:
      "Impact presentation design for FRC regionals, built to communicate the team's story clearly to judges.",
    brief:
      "Design award presentation materials that make a team story clear, legible, and judge-facing.",
    process: processNote.award,
    outcome:
      "Presentation materials structured around clarity, pacing, and fast comprehension in a competition context.",
    reflection:
      "Use the public Overview / Process / Gallery fields for the current case-study layout.",
    processImages: [awardImages[2], awardImages[0], awardImages[1]],
    gallery: awardImages,
  },
  {
    slug: "event-design",
    title: "Event Design",
    subtitle:
      "Pit displays and signage designed to hold up under the noise and pace of live competition.",
    year: "2025",
    status: "",
    tags: ["Signage", "Print", "Environmental"],
    heroImage: openingImages.event,
    thumbnail: openingImages.event,
    accentColor: "#a87ce6",
    accentColorPreset: "purple",
    clockAngle: 120,
    role: "Event graphics, pit display design, environmental communication",
    tools: ["Signage", "Print layout", "Display graphics"],
    summary:
      "Pit displays and signage designed to hold up under the noise and pace of live competition.",
    overview:
      "Pit displays and signage designed to hold up under the noise and pace of live competition.",
    brief:
      "Create pit displays and signage that stay readable in a fast, noisy live competition setting.",
    process: processNote.event,
    outcome:
      "A set of display-oriented graphics designed for quick reading and team presence during live events.",
    reflection:
      "Use the public Overview / Process / Gallery fields for the current case-study layout.",
    processImages: [eventImages[0], eventImages[1], eventImages[0]],
    gallery: eventImages,
  },
  {
    slug: "nhsjc-competitions",
    title: "NHSJC Competitions",
    subtitle: "Advert and logo contest entries exploring compact communication and visual identity.",
    year: "2023-2024",
    status: "",
    tags: ["Branding", "Advertising", "Print"],
    heroImage: openingImages.nhsjc,
    thumbnail: openingImages.nhsjc,
    accentColor: "#6698e2",
    accentColorPreset: "blue",
    clockAngle: 180,
    role: "Advertising concept, visual identity exploration, competition design",
    tools: ["Advertising design", "Logo design", "Print design"],
    summary: "Advert and logo contest entries exploring compact communication and visual identity.",
    overview: "Advert and logo contest entries exploring compact communication and visual identity.",
    brief:
      "Respond to competition prompts with compact visual communication and identity exploration.",
    process: processNote.nhsjc,
    outcome:
      "Competition-oriented advert and logo work grouped as a concise visual identity project.",
    reflection:
      "Use the public Overview / Process / Gallery fields for the current case-study layout.",
    processImages: nhsjcImages.slice(0, 3),
    gallery: nhsjcImages,
  },
  {
    slug: "mk-pottery",
    title: "MK Pottery",
    subtitle:
      "Branding, advertising, and workshop information design for MK Pottery, spanning identity and print materials.",
    year: "2025",
    status: "",
    tags: ["Logo Design", "Advertising", "Competition"],
    heroImage: openingImages.mk,
    thumbnail: openingImages.mk,
    accentColor: "#a87ce6",
    accentColorPreset: "mixed",
    clockAngle: 240,
    role: "Logo design, advertising, workshop information design",
    tools: ["Branding", "Print design", "Information design"],
    summary:
      "Branding, advertising, and workshop information design for MK Pottery, spanning identity and print materials.",
    overview:
      "Branding, advertising, and workshop information design for MK Pottery, spanning identity and print materials.",
    brief:
      "Create identity and print materials for MK Pottery across branding, advertising, and workshop information.",
    process: processNote.mk,
    outcome:
      "A small identity and information-design system for pottery-related brand and print materials.",
    reflection:
      "Use the public Overview / Process / Gallery fields for the current case-study layout.",
    processImages: [mkImages[3], mkImages[0], mkImages[4]],
    gallery: mkImages,
  },
];

export const projects: Project[] = baseProjects.map((project, index) => ({
  ...project,
  featured: true,
  order: (index + 1) * 10,
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
