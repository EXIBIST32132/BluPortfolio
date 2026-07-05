import Link from "next/link";
import { Doodle } from "@/components/decorative/Doodle";
import { PaperScrap } from "@/components/decorative/PaperScrap";
import { Tape } from "@/components/decorative/Tape";
import { SectionReveal } from "@/components/motion/SectionReveal";
import type { NavigationItem, Profile } from "@/types/portfolio";

const fallbackHeroLinks: NavigationItem[] = [
  { href: "#work", label: "Work" },
  { href: "#contents", label: "Contents" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

type HeroCoverProps = {
  navigationItems?: NavigationItem[];
  profile: Profile;
};

export function HeroCover({ navigationItems = fallbackHeroLinks, profile }: HeroCoverProps) {
  return (
    <SectionReveal id="cover" className="hero-cover" aria-labelledby="cover-title">
      <div className="cover-canvas">
        <Tape className="cover-tape-one" />
        <Tape className="cover-tape-two" tone="purple" />
        <PaperScrap className="cover-scrap cover-scrap-blue" tone="blue">
          project led
        </PaperScrap>
        <PaperScrap className="cover-scrap cover-scrap-purple" tone="purple">
          graphic design
        </PaperScrap>
        <Doodle className="cover-doodle-one" variant="flower" />
        <Doodle className="cover-doodle-two" variant="loop" />

        <div className="cover-grid">
          <div className="cover-object" aria-hidden="true">
            <div className="cover-object-screen">
              <span className="screen-line screen-line-one" />
              <span className="screen-line screen-line-two" />
              <span className="screen-dot" />
            </div>
            <div className="cover-object-feet" />
          </div>

          <div className="cover-copy">
            <p className="cover-label">{profile.portfolioTitle}</p>
            <h1 id="cover-title">{profile.name}</h1>
          </div>
        </div>

        <nav className="cover-nav" aria-label="Portfolio sections">
          {navigationItems.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="cover-next">Contents, projects, case studies, notes.</p>
    </SectionReveal>
  );
}
