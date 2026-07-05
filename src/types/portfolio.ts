export type AccentTheme = "blue" | "purple" | "mixed";
export type AccentColorPreset = "blue" | "purple" | "mixed" | "black";
export type TextScalePreset = "compact" | "normal" | "large";
export type HeadingStylePreset = "getai" | "fallback" | "simple";
export type CardDensityPreset = "airy" | "normal" | "compact";
export type MotionIntensityPreset = "reduced" | "normal" | "expressive";
export type ProjectSectionId = "cover" | "contents" | "work" | "about" | "contact";

export type NavigationItem = {
  label: string;
  href: string;
};

export type SectionSetting = {
  id: ProjectSectionId;
  label: string;
  visible: boolean;
  order: number;
};

export type DesignSettings = {
  accentTheme: AccentTheme;
  textScale: TextScalePreset;
  headingStyle: HeadingStylePreset;
  cardDensity: CardDensityPreset;
  motionIntensity: MotionIntensityPreset;
};

export type ContactLink = {
  label: string;
  href: string | null;
  note?: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  defaultSeoImage?: ProjectImage;
  navigationItems: NavigationItem[];
  contactEmail: string;
  cvUrl?: string | null;
  socialLinks: SocialLink[];
  designSettings: DesignSettings;
  sections: SectionSetting[];
};

export type Profile = {
  name: string;
  role: string;
  shortTagline: string;
  portfolioTitle: string;
  positioning: string;
  sourcePortfolio?: string;
  bio: string[];
  profileImage?: ProjectImage;
  skills: string[];
  awards: string[];
  roles: string[];
  courses: string[];
  location?: string;
  availabilityStatus?: string;
  contact: {
    email: ContactLink;
  };
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  status: string;
  featured: boolean;
  order: number;
  tags: string[];
  heroImage: ProjectImage;
  thumbnail: ProjectImage;
  accentColor: string;
  accentColorPreset: AccentColorPreset;
  clockAngle: number;
  role: string;
  tools: string[];
  summary: string;
  brief: string;
  process: string;
  outcome: string;
  reflection: string;
  sourceUrl?: string;
  contentNote?: string;
  gallery: ProjectImage[];
};

export type PortfolioContent = {
  siteSettings: SiteSettings;
  profile: Profile;
  projects: Project[];
};
