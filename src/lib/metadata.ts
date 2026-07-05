import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const siteMetadata: Metadata = {
  title: `${profile.name} - ${profile.portfolioTitle}`,
  description: profile.positioning,
  metadataBase: new URL("https://blubelinky.carrd.co/"),
  openGraph: {
    title: `${profile.name} - ${profile.portfolioTitle}`,
    description: profile.positioning,
    type: "website",
  },
};
