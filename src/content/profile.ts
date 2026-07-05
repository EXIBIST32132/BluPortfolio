import type { DesignSettings, Profile, SectionSetting, SiteSettings } from "@/types/portfolio";

export const profile: Profile = {
  name: "Blu Belinky",
  role: "Student journalist and graphic designer",
  shortTagline: "Project-led graphic design portfolio.",
  portfolioTitle: "Design Portfolio.",
  positioning: "Project-led graphic design portfolio.",
  sourcePortfolio: "https://blubelinky.carrd.co/",
  bio: [
    "Blu Belinky is a student journalist and designer working across publication layouts, graphics, photography, robotics communications, and community storytelling.",
    "Her public portfolio currently traces a journalism path that began with The Scroll in middle school and grew into roles at The Standard, including Media Team, Diversity, Equity & Inclusion Editor, and Community Engagement Editor.",
    "This version reframes that work as a project-led design portfolio. The bio is intentionally easy to rewrite in src/content/profile.ts when Blu wants a more personal design-application voice.",
  ],
  awards: [
    "NSPA 2025 Leadership in Student Journalism",
    "NSPA Innovation Pacemaker",
    "SPA Best Initiative Shortlist",
    "NSPA Logo Design Honourable Mention",
  ],
  roles: [
    "Quill & Scroll Journalism Honor Society: Treasurer",
    "The Standard: Community Engagement Editor (2025-2026)",
    "The Standard: Diversity, Equity & Inclusion Editor (2024-2025)",
    "The Standard: Media Team (2023-2024)",
    "The Standard: Staff Reporter (2022-2023)",
    "The Scroll: Arts Editor (2020-2021)",
  ],
  courses: [
    "Advanced Journalism: Editors (2024-2026)",
    "Advanced Journalism (2023-2024)",
    "Journalistic Writing (2023)",
    "Multimedia Journalism (2022)",
    "Digital Photography (2023)",
    "Media: Exploration and Creation (2019-2020)",
  ],
  skills: ["Publication design", "Editorial graphics", "Robotics communications", "Photography"],
  contact: {
    email: {
      label: "blubelinky@gmail.com",
      href: "mailto:blubelinky@gmail.com",
      note: "Use email as Blu's only public contact detail.",
    },
  },
};

export const designSettings: DesignSettings = {
  accentTheme: "mixed",
  textScale: "normal",
  headingStyle: "getai",
  cardDensity: "normal",
  motionIntensity: "normal",
};

export const sectionSettings: SectionSetting[] = [
  { id: "cover", label: "Cover", visible: true, order: 10 },
  { id: "contents", label: "Contents", visible: true, order: 20 },
  { id: "work", label: "Work", visible: true, order: 30 },
  { id: "about", label: "About", visible: true, order: 40 },
  { id: "contact", label: "Contact", visible: true, order: 50 },
];

export const siteSettings: SiteSettings = {
  siteTitle: `${profile.name} - ${profile.portfolioTitle}`,
  siteDescription: profile.positioning,
  navigationItems: [
    { href: "#work", label: "Work" },
    { href: "#contents", label: "Contents" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
  contactEmail: "blubelinky@gmail.com",
  cvUrl: null,
  socialLinks: [],
  designSettings,
  sections: sectionSettings,
};
