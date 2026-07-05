import { createClient, type ClientConfig } from "next-sanity";
import {
  sanityApiVersion,
  sanityConfigured,
  sanityDataset,
  sanityProjectId,
  sanityReadToken,
} from "@/sanity/env";

const baseConfig: ClientConfig = {
  projectId: sanityProjectId ?? "replace-with-sanity-project-id",
  dataset: sanityDataset ?? "production",
  apiVersion: sanityApiVersion,
  useCdn: true,
};

export function getSanityClient(preview = false) {
  if (!sanityConfigured) {
    return null;
  }

  return createClient({
    ...baseConfig,
    useCdn: !preview,
    token: preview ? sanityReadToken : undefined,
    perspective: preview && sanityReadToken ? "previewDrafts" : "published",
  });
}
