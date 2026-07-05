import { SectionReveal } from "@/components/motion/SectionReveal";
import type { Profile, SiteSettings } from "@/types/portfolio";

function ContactItem({ label, href, note }: { label: string; href: string | null; note?: string }) {
  const isExternal = href?.startsWith("http");

  return (
    <li>
      {href ? (
        <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
          {label}
        </a>
      ) : (
        <span>{label}</span>
      )}
      {note ? <small>{note}</small> : null}
    </li>
  );
}

type ContactSectionProps = {
  profile: Profile;
  siteSettings: SiteSettings;
};

export function ContactSection({ profile, siteSettings }: ContactSectionProps) {
  const { contact } = profile;
  const cvHref = siteSettings.cvUrl ?? null;

  return (
    <SectionReveal
      id="contact"
      className="editorial-panel contact-section"
      aria-labelledby="contact-title"
    >
      <div className="section-heading">
        <p>Contact</p>
        <h2 id="contact-title">Email Blu.</h2>
      </div>
      <p className="section-intro">
        Blu&apos;s public contact information is intentionally limited to email.
      </p>
      <ul className="contact-list">
        <ContactItem {...contact.email} />
        {cvHref ? <ContactItem label="CV" href={cvHref} note="Editable in Sanity site settings." /> : null}
        {siteSettings.socialLinks.map((link) => (
          <ContactItem key={link.url} label={link.label} href={link.url} />
        ))}
      </ul>
    </SectionReveal>
  );
}
