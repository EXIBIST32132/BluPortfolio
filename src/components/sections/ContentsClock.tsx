"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ClockIllustration } from "@/components/decorative/ClockIllustration";
import { Tag } from "@/components/ui/Tag";
import { slowTransition } from "@/lib/motion";
import type { Project } from "@/types/portfolio";

type ContentsClockProps = {
  projects: Project[];
};

export function ContentsClock({ projects }: ContentsClockProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const activeProject = useMemo(
    () => projects.find((project) => project.slug === activeSlug),
    [activeSlug, projects],
  );
  const clockAngle = activeProject?.clockAngle ?? -34;
  const clockTitle = activeProject?.title ?? "Choose a project";

  return (
    <motion.section
      id="contents"
      className="editorial-panel contents-panel"
      aria-labelledby="contents-title"
      data-testid="contents-clock"
      initial={reducedMotion ? false : { opacity: 0, y: 34, rotate: 0.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -80px 0px" }}
      transition={reducedMotion ? { duration: 0 } : slowTransition}
    >
      <div className="section-heading contents-heading">
        <p>Project index</p>
        <h2 id="contents-title">Contents</h2>
      </div>

      <div className="contents-clock-layout">
        <div className="clock-sticky-wrap">
          <div className="clock-board" aria-label="Project contents clock">
            <ClockIllustration
              angle={clockAngle}
              activeTitle={clockTitle}
              resting={!activeProject}
              reducedMotion={Boolean(reducedMotion)}
            />

            {projects.map((project) => (
              <div
                className="clock-index-item"
                data-project-index-item={project.slug}
                key={project.slug}
                style={
                  {
                    transform: `rotate(${project.clockAngle}deg) translate(var(--clock-radius)) rotate(${-project.clockAngle}deg) translate(-50%, -50%)`,
                    "--project-accent": project.accentColor,
                  } as CSSProperties
                }
              >
                <Link
                  className="clock-index-link"
                  data-active={project.slug === activeProject?.slug ? "true" : "false"}
                  data-testid={`clock-project-${project.slug}`}
                  href={`/projects/${project.slug}`}
                  aria-label={`Open ${project.title} case study`}
                  onClick={() => setActiveSlug(project.slug)}
                  onFocus={() => setActiveSlug(project.slug)}
                  onPointerDown={() => setActiveSlug(project.slug)}
                  onPointerEnter={() => setActiveSlug(project.slug)}
                >
                  <span>{project.title}</span>
                  <small>{project.tags.slice(0, 2).join(" · ")}</small>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <aside
          className={`active-project-ticket${activeProject ? "" : " active-project-ticket-resting"}`}
          aria-live="polite"
        >
          <motion.div
            key={activeProject?.slug ?? "resting"}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : slowTransition}
          >
            {activeProject ? (
              <>
                <p className="project-kicker">Clock points to</p>
                <h3>{activeProject.title}</h3>
                <p>{activeProject.subtitle}</p>
                <div className="tag-row">
                  {activeProject.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <Link className="button-link" href={`/projects/${activeProject.slug}`}>
                  View case study
                </Link>
              </>
            ) : (
              <>
                <p className="project-kicker">Resting state</p>
                <h3>Pick a project.</h3>
                <p>
                  Hover, focus, or tap a project title and the clock hands point to that case
                  study.
                </p>
              </>
            )}
          </motion.div>
        </aside>
      </div>
    </motion.section>
  );
}
