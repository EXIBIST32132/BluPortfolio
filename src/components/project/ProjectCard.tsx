"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { baseTransition, easeSnap } from "@/lib/motion";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card"
      style={
        {
          "--project-accent": project.accentColor,
          "--card-rotate": `${index % 2 === 0 ? -1.4 : 1.2}deg`,
        } as CSSProperties
      }
      whileHover={reducedMotion ? undefined : { y: -7, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
      transition={reducedMotion ? { duration: 0 } : { ...baseTransition, ease: easeSnap }}
    >
      <Link className="project-card-link" href={`/projects/${project.slug}`}>
        <span className="project-pin" aria-hidden="true" />
        <span className="project-card-number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="project-card-label">Project</span>
        <div className="project-thumb">
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            fill
            sizes="(max-width: 720px) 92vw, (max-width: 1024px) 44vw, 320px"
          />
        </div>
        <div className="project-card-copy">
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
          <div className="tag-row" aria-label={`${project.title} tags`}>
            {project.tags.slice(0, 4).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
