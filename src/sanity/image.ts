import imageUrlBuilder from "@sanity/image-url";
import { sanityConfigured, sanityDataset, sanityProjectId } from "@/sanity/env";
import type { ProjectImage } from "@/types/portfolio";

type SanityImageValue = {
  asset?: { _ref?: string; url?: string };
  alt?: string;
  caption?: string;
};

const builder = sanityConfigured
  ? imageUrlBuilder({
      projectId: sanityProjectId ?? "",
      dataset: sanityDataset ?? "production",
    })
  : null;

export function sanityImageToProjectImage(
  image: SanityImageValue | null | undefined,
  fallback: ProjectImage,
  width = 1400,
): ProjectImage {
  if (!image) {
    return fallback;
  }

  const sanityUrl = builder
    ? builder.image(image).width(width).fit("max").auto("format").url()
    : image.asset?.url;

  return {
    src: sanityUrl || fallback.src,
    alt: image.alt || fallback.alt,
    caption: image.caption || fallback.caption,
  };
}
