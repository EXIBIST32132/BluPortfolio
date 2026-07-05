import { Nav } from "@/components/layout/Nav";
import type { DesignSettings, NavigationItem } from "@/types/portfolio";

type SiteShellProps = {
  children: React.ReactNode;
  designSettings?: DesignSettings;
  navItems?: NavigationItem[];
  projectPage?: boolean;
};

export function SiteShell({ children, designSettings, navItems, projectPage = false }: SiteShellProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div
        className="site-shell"
        data-accent-theme={designSettings?.accentTheme ?? "mixed"}
        data-card-density={designSettings?.cardDensity ?? "normal"}
        data-heading-style={designSettings?.headingStyle ?? "getai"}
        data-motion-intensity={designSettings?.motionIntensity ?? "normal"}
        data-text-scale={designSettings?.textScale ?? "normal"}
      >
        <Nav homePrefix={projectPage ? "/" : ""} items={navItems} />
        <main id="main-content">{children}</main>
      </div>
    </>
  );
}
