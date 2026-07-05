import { defineQuery } from "next-sanity";

const designSettingsProjection = `{
  accentTheme,
  textScale,
  headingStyle,
  cardDensity,
  motionIntensity
}`;

const siteSettingsProjection = `{
  siteTitle,
  siteDescription,
  defaultSeoImage,
  navigationItems[]{label, href},
  contactEmail,
  "cvUrl": coalesce(cvUrl, cvFile.asset->url),
  socialLinks[]{label, url},
  "designSettings": coalesce(designSettings->${designSettingsProjection}, *[_type == "designSettings"][0]${designSettingsProjection}),
  sections[]{id, label, visible, order}
}`;

const profileProjection = `{
  name,
  role,
  shortTagline,
  "portfolioTitle": coalesce(portfolioTitle, "Design Portfolio."),
  "positioning": coalesce(positioning, shortTagline),
  sourcePortfolio,
  bio,
  profileImage,
  skills,
  location,
  availabilityStatus,
  awards,
  roles,
  courses
}`;

const projectProjection = `{
  title,
  "slug": slug.current,
  subtitle,
  year,
  status,
  featured,
  order,
  clockAngle,
  tags,
  thumbnail,
  heroImage,
  accentColorPreset,
  role,
  tools,
  summary,
  brief,
  process,
  outcome,
  reflection,
  contentNote,
  sourceUrl,
  gallery[],
  sections[]
}`;

export const portfolioQuery = defineQuery(`{
  "siteSettings": *[_type == "siteSettings"][0]${siteSettingsProjection},
  "profile": *[_type == "profile"][0]${profileProjection},
  "projects": *[_type == "project" && defined(slug.current)] | order(order asc, year desc) ${projectProjection}
}`);

export const projectsQuery = defineQuery(
  `*[_type == "project" && defined(slug.current)] | order(order asc, year desc) ${projectProjection}`,
);

export const projectBySlugQuery = defineQuery(
  `*[_type == "project" && slug.current == $slug][0] ${projectProjection}`,
);
