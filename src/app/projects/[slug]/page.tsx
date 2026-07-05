import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectCaseStudy } from "@/components/project/ProjectCaseStudy";
import { profile, siteSettings } from "@/content/profile";
import { getNextProject, getProject, projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: `Project not found - ${profile.name}`,
    };
  }

  return {
    title: `${project.title} - ${profile.name}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);

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
