import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { siteMetadata } from "@/lib/metadata";
import { sanityConfigured } from "@/sanity/env";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draft = await draftMode();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        {draft.isEnabled && sanityConfigured ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
