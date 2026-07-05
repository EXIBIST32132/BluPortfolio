import { ProjectCard } from "@/components/project/ProjectCard";
import { SectionReveal } from "@/components/motion/SectionReveal";
import type { Project } from "@/types/portfolio";

type SelectedProjectsProps = {
  projects: Project[];
};

export function SelectedProjects({ projects }: SelectedProjectsProps) {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <SectionReveal
      id="work"
      className="editorial-panel selected-projects"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <p>Selected work</p>
        <h2 id="work-title">Projects, not categories.</h2>
      </div>
      <p className="section-intro">
        Each card opens a case study structure that Blu can keep editing as final process notes,
        screenshots, and project reflections are added.
      </p>
      <div className="project-grid">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </SectionReveal>
  );
}
