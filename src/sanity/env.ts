export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-03";
export const sanityReadToken = process.env.SANITY_API_READ_TOKEN;
export const sanityRevalidateSecret = process.env.SANITY_REVALIDATE_SECRET;
export const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const sanityConfigured = Boolean(sanityProjectId && sanityDataset);
