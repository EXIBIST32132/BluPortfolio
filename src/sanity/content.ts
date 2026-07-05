import { draftMode } from "next/headers";
import { profile as fallbackProfile, siteSettings as fallbackSiteSettings } from "@/content/profile";
import { getNextProject as getFallbackNextProject, getProject, projects as fallbackProjects } from "@/content/projects";
import { getSanityClient } from "@/sanity/client";
import { portfolioQuery, projectBySlugQuery, projectsQuery } from "@/sanity/queries";
import { sanityImageToProjectImage } from "@/sanity/image";
import type {
  DesignSettings,
  PortfolioContent,
  Profile,
  Project,
  ProjectSection,
  SectionSetting,
  SiteSettings,
  TextAlignment,
  TextEmphasis,
  TextSizePreset,
} from "@/types/portfolio";

const accentColors: Record<Project["accentColorPreset"], string> = {
  blue: "#6698e2",
  purple: "#a87ce6",
  mixed: "#6698e2",
  black: "#020202",
};

type SanityImageValue = {
  asset?: { _ref?: string; url?: string };
  alt?: string;
  caption?: string;
};

type SanitySiteSettings = Partial<
  Omit<SiteSettings, "defaultSeoImage" | "designSettings" | "sections">
> & {
  defaultSeoImage?: SanityImageValue;
  designSettings?: Partial<DesignSettings>;
  sections?: Partial<SectionSetting>[];
};

type SanityProfile = Partial<Omit<Profile, "profileImage" | "contact">> & {
  profileImage?: SanityImageValue;
};

type SanityProject = Partial<
  Omit<Project, "heroImage" | "thumbnail" | "gallery" | "sections">
> & {
  heroImage?: SanityImageValue;
  thumbnail?: SanityImageValue;
  gallery?: SanityImageValue[];
  sections?: unknown[];
};

type SanityPortfolioResponse = {
  siteSettings?: SanitySiteSettings | null;
  profile?: SanityProfile | null;
  projects?: SanityProject[] | null;
};

function withFallbackArray<T>(value: T[] | undefined | null, fallback: T[]) {
  return value && value.length > 0 ? value : fallback;
}

function normalizeDesignSettings(value?: Partial<DesignSettings> | null): DesignSettings {
  return {
    accentTheme: value?.accentTheme ?? fallbackSiteSettings.designSettings.accentTheme,
    textScale: value?.textScale ?? fallbackSiteSettings.designSettings.textScale,
    headingStyle: value?.headingStyle ?? fallbackSiteSettings.designSettings.headingStyle,
    cardDensity: value?.cardDensity ?? fallbackSiteSettings.designSettings.cardDensity,
    motionIntensity: value?.motionIntensity ?? fallbackSiteSettings.designSettings.motionIntensity,
  };
}

function normalizeSiteSettings(value?: SanitySiteSettings | null): SiteSettings {
  const contactEmail = value?.contactEmail ?? fallbackSiteSettings.contactEmail;

  return {
    siteTitle: value?.siteTitle ?? fallbackSiteSettings.siteTitle,
    siteDescription: value?.siteDescription ?? fallbackSiteSettings.siteDescription,
    defaultSeoImage: value?.defaultSeoImage
      ? sanityImageToProjectImage(value.defaultSeoImage, fallbackProjects[0].heroImage)
      : fallbackSiteSettings.defaultSeoImage,
    navigationItems: withFallbackArray(value?.navigationItems, fallbackSiteSettings.navigationItems),
    contactEmail,
    cvUrl: value?.cvUrl ?? fallbackSiteSettings.cvUrl ?? null,
    socialLinks: withFallbackArray(value?.socialLinks, fallbackSiteSettings.socialLinks),
    designSettings: normalizeDesignSettings(value?.designSettings),
    sections: withFallbackArray(
      value?.sections?.filter(
        (section): section is SectionSetting =>
          Boolean(section.id && section.label && typeof section.order === "number"),
      ),
      fallbackSiteSettings.sections,
    ),
  };
}

function normalizeProfile(value: SanityProfile | null | undefined, contactEmail: string): Profile {
  return {
    ...fallbackProfile,
    ...value,
    portfolioTitle: value?.portfolioTitle ?? fallbackProfile.portfolioTitle,
    positioning: value?.positioning ?? value?.shortTagline ?? fallbackProfile.positioning,
    bio: withFallbackArray(value?.bio, fallbackProfile.bio),
    skills: withFallbackArray(value?.skills, fallbackProfile.skills),
    awards: withFallbackArray(value?.awards, fallbackProfile.awards),
    roles: withFallbackArray(value?.roles, fallbackProfile.roles),
    courses: withFallbackArray(value?.courses, fallbackProfile.courses),
    profileImage: value?.profileImage
      ? sanityImageToProjectImage(value.profileImage, fallbackProjects[0].heroImage)
      : fallbackProfile.profileImage,
    contact: {
      email: {
        label: contactEmail,
        href: `mailto:${contactEmail}`,
        note: "Use email as Blu's only public contact detail.",
      },
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object");
}

function isTextSizePreset(value: unknown): value is TextSizePreset {
  return (
    value === "caption" ||
    value === "body" ||
    value === "lede" ||
    value === "heading" ||
    value === "display"
  );
}

function isTextAlignment(value: unknown): value is TextAlignment {
  return value === "left" || value === "center";
}

function isTextEmphasis(value: unknown): value is TextEmphasis {
  return value === "normal" || value === "sticker" || value === "label";
}

function textPresetFields(section: Record<string, unknown>) {
  return {
    sizePreset: isTextSizePreset(section.sizePreset) ? section.sizePreset : undefined,
    alignment: isTextAlignment(section.alignment) ? section.alignment : undefined,
    emphasis: isTextEmphasis(section.emphasis) ? section.emphasis : undefined,
  };
}

function normalizeProjectSections(
  value: unknown[] | undefined,
  fallback: ProjectSection[],
): ProjectSection[] {
  if (!value?.length) {
    return fallback;
  }

  const sections = value
    .map((section, index): ProjectSection | null => {
      if (!isRecord(section) || typeof section._type !== "string") {
        return null;
      }

      const base = {
        _key: typeof section._key === "string" ? section._key : undefined,
        ...textPresetFields(section),
      };

      if (section._type === "richTextBlock") {
        return {
          ...base,
          _type: "richTextBlock",
          heading: typeof section.heading === "string" ? section.heading : undefined,
          body: Array.isArray(section.body) ? section.body : [],
        };
      }

      if (section._type === "imageBlock" || section._type === "fullBleedImageBlock") {
        const fallbackImage = fallbackProjects[index % fallbackProjects.length]?.heroImage;

        if (!isRecord(section.image) || !fallbackImage) {
          return null;
        }

        return {
          ...base,
          _type: section._type,
          image: sanityImageToProjectImage(section.image, fallbackImage),
        };
      }

      if (section._type === "imageGalleryBlock") {
        const fallbackImage = fallbackProjects[index % fallbackProjects.length]?.heroImage;

        if (!Array.isArray(section.images) || !fallbackImage) {
          return null;
        }

        return {
          ...base,
          _type: "imageGalleryBlock",
          heading: typeof section.heading === "string" ? section.heading : undefined,
          images: section.images
            .filter(isRecord)
            .map((image) => sanityImageToProjectImage(image, fallbackImage)),
        };
      }

      if (section._type === "quoteBlock") {
        return {
          ...base,
          _type: "quoteBlock",
          quote: typeof section.quote === "string" ? section.quote : "",
          attribution: typeof section.attribution === "string" ? section.attribution : undefined,
        };
      }

      if (section._type === "processStepBlock") {
        const steps = Array.isArray(section.steps) ? section.steps.filter(isRecord) : [];

        return {
          ...base,
          _type: "processStepBlock",
          heading: typeof section.heading === "string" ? section.heading : undefined,
          steps: steps.map((step, stepIndex) => ({
            _key: typeof step._key === "string" ? step._key : `${base._key ?? index}-${stepIndex}`,
            title: typeof step.title === "string" ? step.title : "Process step",
            text: typeof step.text === "string" ? step.text : "",
          })),
        };
      }

      if (section._type === "outcomeBlock") {
        return {
          ...base,
          _type: "outcomeBlock",
          heading: typeof section.heading === "string" ? section.heading : undefined,
          body: typeof section.body === "string" ? section.body : "",
        };
      }

      if (section._type === "twoColumnBlock") {
        return {
          ...base,
          _type: "twoColumnBlock",
          left: Array.isArray(section.left) ? section.left : [],
          right: Array.isArray(section.right) ? section.right : [],
        };
      }

      if (section._type === "spacerBlock") {
        return {
          _key: base._key,
          _type: "spacerBlock",
          size:
            section.size === "small" || section.size === "large" || section.size === "medium"
              ? section.size
              : "medium",
        };
      }

      return null;
    })
    .filter((section): section is ProjectSection => Boolean(section));

  return sections.length ? sections : fallback;
}

function normalizeProject(value: SanityProject, index: number): Project | null {
  const fallback = fallbackProjects[index % fallbackProjects.length] ?? fallbackProjects[0];

  if (!value.slug || !value.title) {
    return null;
  }

  const accentColorPreset = value.accentColorPreset ?? fallback.accentColorPreset;

  return {
    ...fallback,
    ...value,
    slug: value.slug,
    title: value.title,
    subtitle: value.subtitle ?? fallback.subtitle,
    year: value.year ?? fallback.year,
    status: value.status ?? fallback.status,
    featured: value.featured ?? true,
    order: value.order ?? (index + 1) * 10,
    tags: withFallbackArray(value.tags, fallback.tags),
    heroImage: sanityImageToProjectImage(value.heroImage, fallback.heroImage),
    thumbnail: sanityImageToProjectImage(value.thumbnail ?? value.heroImage, fallback.thumbnail, 900),
    accentColor: value.accentColor ?? accentColors[accentColorPreset],
    accentColorPreset,
    clockAngle: value.clockAngle ?? fallback.clockAngle,
    role: value.role ?? fallback.role,
    tools: withFallbackArray(value.tools, fallback.tools),
    summary: value.summary ?? fallback.summary,
    brief: value.brief ?? fallback.brief,
    process: value.process ?? fallback.process,
    outcome: value.outcome ?? fallback.outcome,
    reflection: value.reflection ?? fallback.reflection,
    gallery: withFallbackArray(
      value.gallery?.map((image, imageIndex) =>
        sanityImageToProjectImage(image, fallback.gallery[imageIndex] ?? fallback.heroImage),
      ),
      fallback.gallery,
    ),
    sections: normalizeProjectSections(value.sections, fallback.sections),
  };
}

function normalizeProjects(values: SanityProject[] | null | undefined) {
  const normalized = values
    ?.map((project, index) => normalizeProject(project, index))
    .filter((project): project is Project => Boolean(project));

  return normalized && normalized.length > 0 ? normalized : fallbackProjects;
}

async function previewEnabled() {
  try {
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const preview = await previewEnabled();
  const client = getSanityClient(preview);

  if (!client) {
    return {
      siteSettings: fallbackSiteSettings,
      profile: fallbackProfile,
      projects: fallbackProjects,
    };
  }

  try {
    const data = await client.fetch<SanityPortfolioResponse>(
      portfolioQuery,
      {},
      { next: { tags: ["portfolio", "siteSettings", "profile", "project"] } },
    );
    const siteSettings = normalizeSiteSettings(data.siteSettings);

    return {
      siteSettings,
      profile: normalizeProfile(data.profile, siteSettings.contactEmail),
      projects: normalizeProjects(data.projects),
    };
  } catch (error) {
    console.warn("Sanity content fetch failed; using local fallback content.", error);

    return {
      siteSettings: fallbackSiteSettings,
      profile: fallbackProfile,
      projects: fallbackProjects,
    };
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const preview = await previewEnabled();
  const client = getSanityClient(preview);

  if (!client) {
    return fallbackProjects;
  }

  try {
    const data = await client.fetch<SanityProject[]>(
      projectsQuery,
      {},
      { next: { tags: ["portfolio", "project"] } },
    );

    return normalizeProjects(data);
  } catch (error) {
    console.warn("Sanity projects fetch failed; using local fallback projects.", error);
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string) {
  const preview = await previewEnabled();
  const client = getSanityClient(preview);

  if (!client) {
    return {
      project: getProject(slug),
      projects: fallbackProjects,
    };
  }

  try {
    const [project, projects] = await Promise.all([
      client.fetch<SanityProject | null>(
        projectBySlugQuery,
        { slug },
        { next: { tags: ["portfolio", "project", `project:${slug}`] } },
      ),
      client.fetch<SanityProject[]>(
        projectsQuery,
        {},
        { next: { tags: ["portfolio", "project"] } },
      ),
    ]);
    const normalizedProjects = normalizeProjects(projects);

    return {
      project: project ? normalizeProject(project, normalizedProjects.length) : getProject(slug),
      projects: normalizedProjects,
    };
  } catch (error) {
    console.warn("Sanity project fetch failed; using local fallback project.", error);

    return {
      project: getProject(slug),
      projects: fallbackProjects,
    };
  }
}

export function getNextProject(projects: Project[], slug: string) {
  if (projects === fallbackProjects) {
    return getFallbackNextProject(slug);
  }

  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return projects[0];
  }

  return projects[(index + 1) % projects.length];
}
