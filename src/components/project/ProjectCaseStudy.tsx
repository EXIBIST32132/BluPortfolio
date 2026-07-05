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
          <p className="project-kicker">{project.year}</p>
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

      <div className="case-story">
        <section className="case-copy-block">
          <h2>Overview</h2>
          <p>{project.overview}</p>
        </section>

        <section className="case-copy-block">
          <h2>Process</h2>
          <p>{project.process}</p>
        </section>

        <div className="process-image-composition" aria-label={`${project.title} process images`}>
          <figure className="process-image-main">
            <div className="process-image-frame">
              <Image
                src={project.processImages[0]?.src ?? project.heroImage.src}
                alt={project.processImages[0]?.alt ?? project.heroImage.alt}
                fill
                sizes="(max-width: 900px) 92vw, 620px"
              />
            </div>
            <figcaption>{project.processImages[0]?.caption ?? project.heroImage.caption}</figcaption>
          </figure>
          <div className="process-image-stack">
            {project.processImages.slice(1, 3).map((image, index) => (
              <figure key={`${project.slug}-process-${image.src}-${index}`}>
                <div className="process-image-frame">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 900px) 92vw, 300px"
                  />
                </div>
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <section className="gallery-section" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading">Gallery</h2>
        <div className="case-gallery">
          {project.gallery.map((image, index) => (
            <figure key={`${project.slug}-gallery-${image.src}-${index}`}>
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
