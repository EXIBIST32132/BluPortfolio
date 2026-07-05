"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Tape } from "@/components/decorative/Tape";
import { Tag } from "@/components/ui/Tag";
import { slowTransition } from "@/lib/motion";
import type { Project } from "@/types/portfolio";

type ProjectCaseStudyProps = {
  nextProject: Project;
  project: Project;
};

export function ProjectCaseStudy({ nextProject, project }: ProjectCaseStudyProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className="case-study editorial-panel"
      style={{ "--project-accent": project.accentColor } as CSSProperties}
      initial={reducedMotion ? false : { opacity: 0, y: 26, rotate: -0.18 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={reducedMotion ? { duration: 0 } : slowTransition}
    >
      <Link className="back-link" href="/#contents">
        Back to contents
      </Link>

      <header className="case-hero">
        <div className="case-hero-copy">
          <p className="project-kicker">
            {project.year} / {project.status}
          </p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="tag-row">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <figure className="case-hero-image">
          <Tape tone="purple" />
          <div className="case-image-frame">
            <Image
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 430px"
            />
          </div>
          <figcaption>{project.heroImage.caption}</figcaption>
        </figure>
      </header>

      {project.contentNote ? <p className="content-note">{project.contentNote}</p> : null}

      <dl className="case-meta">
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Tools</dt>
          <dd>{project.tools.join(", ")}</dd>
        </div>
        {project.sourceUrl ? (
          <div>
            <dt>Source</dt>
            <dd>
              <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                View source item
              </a>
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="case-sections">
        <section>
          <h2>Problem / Brief</h2>
          <p>{project.brief}</p>
        </section>
        <section>
          <h2>Process</h2>
          <p>{project.process}</p>
        </section>
        <section>
          <h2>Final Outcome</h2>
          <p>{project.outcome}</p>
        </section>
        <section>
          <h2>Reflection</h2>
          <p>{project.reflection}</p>
        </section>
      </div>

      <section className="gallery-section" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading">Gallery</h2>
        <div className="case-gallery">
          {project.gallery.map((image) => (
            <figure key={`${project.slug}-${image.src}`}>
              <div className="case-gallery-frame">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 720px) 92vw, 500px"
                />
              </div>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <nav className="case-nav" aria-label="Project navigation">
        <Link href="/#contents">Contents</Link>
        <Link href={`/projects/${nextProject.slug}`}>Next: {nextProject.title}</Link>
      </nav>
    </motion.article>
  );
}
