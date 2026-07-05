import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectCaseStudy } from "@/components/project/ProjectCaseStudy";
import { profile as fallbackProfile } from "@/content/profile";
import {
  getAllProjects,
  getNextProject,
  getPortfolioContent,
  getProjectBySlug,
} from "@/sanity/content";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: `Project not found - ${fallbackProfile.name}`,
    };
  }

  return {
    title: `${project.title} - ${fallbackProfile.name}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [{ project, projects }, { siteSettings }] = await Promise.all([
    getProjectBySlug(slug),
    getPortfolioContent(),
  ]);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(projects, project.slug);

  return (
    <SiteShell
      designSettings={siteSettings.designSettings}
      navItems={siteSettings.navigationItems}
      projectPage
    >
      <ProjectCaseStudy nextProject={nextProject} project={project} />
    </SiteShell>
  );
}
