"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { cn } from "@/lib/cn";
import type { ProjectImage, ProjectSection } from "@/types/portfolio";

type ProjectContentBlocksProps = {
  sections: ProjectSection[];
};

function Figure({ image, fullBleed = false }: { image: ProjectImage; fullBleed?: boolean }) {
  return (
    <figure className={cn("project-block-figure", fullBleed && "project-block-figure-full")}>
      <div className="project-block-image-frame">
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 92vw, 880px" />
      </div>
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

function blockClass(section: ProjectSection) {
  return cn(
    "project-content-block",
    `project-block-${section._type}`,
    "size" in section && section.size ? `project-block-spacer-${section.size}` : null,
    "sizePreset" in section && section.sizePreset
      ? `project-block-text-${section.sizePreset}`
      : "project-block-text-body",
    "alignment" in section && section.alignment
      ? `project-block-align-${section.alignment}`
      : "project-block-align-left",
    "emphasis" in section && section.emphasis
      ? `project-block-emphasis-${section.emphasis}`
      : "project-block-emphasis-normal",
  );
}

export function ProjectContentBlocks({ sections }: ProjectContentBlocksProps) {
  if (!sections.length) {
    return null;
  }

  return (
    <div className="project-content-blocks" aria-label="Additional project sections">
      {sections.map((section, index) => {
        const key = section._key ?? `${section._type}-${index}`;

        if (section._type === "richTextBlock") {
          return (
            <section className={blockClass(section)} key={key}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              <PortableText value={section.body} />
            </section>
          );
        }

        if (section._type === "imageBlock" || section._type === "fullBleedImageBlock") {
          return (
            <section className={blockClass(section)} key={key}>
              <Figure image={section.image} fullBleed={section._type === "fullBleedImageBlock"} />
            </section>
          );
        }

        if (section._type === "imageGalleryBlock") {
          return (
            <section className={blockClass(section)} key={key}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              <div className="project-block-gallery">
                {section.images.map((image) => (
                  <Figure image={image} key={image.src} />
                ))}
              </div>
            </section>
          );
        }

        if (section._type === "quoteBlock") {
          return (
            <blockquote className={blockClass(section)} key={key}>
              <p>{section.quote}</p>
              {section.attribution ? <cite>{section.attribution}</cite> : null}
            </blockquote>
          );
        }

        if (section._type === "processStepBlock") {
          return (
            <section className={blockClass(section)} key={key}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              <ol className="project-block-steps">
                {section.steps.map((step, stepIndex) => (
                  <li key={step._key ?? `${key}-${stepIndex}`}>
                    <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          );
        }

        if (section._type === "outcomeBlock") {
          return (
            <section className={blockClass(section)} key={key}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              <p>{section.body}</p>
            </section>
          );
        }

        if (section._type === "twoColumnBlock") {
          return (
            <section className={blockClass(section)} key={key}>
              <div>
                <PortableText value={section.left} />
              </div>
              <div>
                <PortableText value={section.right} />
              </div>
            </section>
          );
        }

        return <div aria-hidden="true" className={blockClass(section)} key={key} />;
      })}
    </div>
  );
}
