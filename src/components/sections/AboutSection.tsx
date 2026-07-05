import { Doodle } from "@/components/decorative/Doodle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import type { Profile } from "@/types/portfolio";

type AboutSectionProps = {
  profile: Profile;
};

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <SectionReveal id="about" className="editorial-panel about-section" aria-labelledby="about-title">
      <div className="section-heading">
        <p>About</p>
        <h2 id="about-title">A visual storyteller moving between newsroom, print, and team culture.</h2>
      </div>

      <div className="about-grid">
        <div className="about-bio">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="about-notes">
          <Doodle variant="star" />
          <section>
            <h3>Awards</h3>
            <ul>
              {profile.awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Roles</h3>
            <ul>
              {profile.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Courses</h3>
            <ul>
              {profile.courses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </SectionReveal>
  );
}
