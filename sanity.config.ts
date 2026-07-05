import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "replace-with-sanity-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default defineConfig({
  name: "blu-belinky-portfolio",
  title: "Blu Belinky Portfolio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: siteUrl,
        previewMode: {
          enable: "/api/draft/enable",
          disable: "/api/draft/disable",
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
