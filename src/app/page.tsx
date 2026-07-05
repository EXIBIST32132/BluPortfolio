import { SiteShell } from "@/components/layout/SiteShell";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ContentsClock } from "@/components/sections/ContentsClock";
import { HeroCover } from "@/components/sections/HeroCover";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { getPortfolioContent } from "@/sanity/content";

export default async function Home() {
  const { profile, projects, siteSettings } = await getPortfolioContent();
  const visibleSections = siteSettings.sections
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <SiteShell designSettings={siteSettings.designSettings} navItems={siteSettings.navigationItems}>
      {visibleSections.map((section) => {
        if (section.id === "cover") {
          return (
            <HeroCover
              key={section.id}
              navigationItems={siteSettings.navigationItems}
              profile={profile}
            />
          );
        }

        if (section.id === "contents") {
          return <ContentsClock key={section.id} projects={projects} />;
        }

        if (section.id === "work") {
          return <SelectedProjects key={section.id} projects={projects} />;
        }

        if (section.id === "about") {
          return <AboutSection key={section.id} profile={profile} />;
        }

        if (section.id === "contact") {
          return <ContactSection key={section.id} profile={profile} siteSettings={siteSettings} />;
        }

        return null;
      })}
    </SiteShell>
  );
}
