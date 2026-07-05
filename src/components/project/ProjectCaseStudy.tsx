"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Tape } from "@/components/decorative/Tape";
import { Tag } from "@/components/ui/Tag";
import { slowTransition } from "@/lib/motion";
import type { Project, ProjectCaseFeature, ProjectImage } from "@/types/portfolio";

type ProjectCaseStudyProps = {
  nextProject: Project;
  project: Project;
};

type CaseImageProps = {
  image: ProjectImage;
  priority?: boolean;
  sizes?: string;
  variant?: "standard" | "tall" | "wide" | "square" | "poster";
};

function CaseImage({
  image,
  priority,
  sizes = "(max-width: 900px) 92vw, 520px",
  variant = "standard",
}: CaseImageProps) {
  return (
    <figure className={`pdf-image pdf-image-${variant}`}>
      <div className="pdf-image-frame">
        <Image src={image.src} alt={image.alt} fill priority={priority} sizes={sizes} />
      </div>
    </figure>
  );
}

function CopyBlock({ children, heading }: { children: ReactNode; heading: string }) {
  return (
    <section className="pdf-copy-block">
      <h2>{heading}</h2>
      {children}
    </section>
  );
}

function Paragraph({ copy }: { copy: string }) {
  return <p>{copy}</p>;
}

function FeatureRow({ feature, reverse }: { feature: ProjectCaseFeature; reverse?: boolean }) {
  return (
    <section className={`pdf-feature-row${reverse ? " pdf-feature-row-reverse" : ""}`}>
      <CaseImage image={feature.image} variant="wide" />
      <div className="pdf-feature-copy">
        <h2>{feature.heading}</h2>
        {feature.copy ? <p>{feature.copy}</p> : null}
      </div>
    </section>
  );
}

function NewspaperLayout({ project }: { project: Project }) {
  const caseStudy = project.caseStudy;

  return (
    <>
      {caseStudy.overview ? (
        <CopyBlock heading="Overview">
          <Paragraph copy={caseStudy.overview} />
        </CopyBlock>
      ) : null}

      <div className="pdf-feature-stack">
        {caseStudy.featuredSpreads?.map((feature, index) => (
          <FeatureRow
            feature={feature}
            key={`${project.slug}-${feature.heading}`}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      {caseStudy.coverDesign ? (
        <section className="pdf-cover-design">
          <h2>{caseStudy.coverDesign.heading}</h2>
          <div className="pdf-cover-pair">
            {caseStudy.coverDesign.images.map((image) => (
              <CaseImage image={image} key={image.src} variant="poster" />
            ))}
          </div>
          <p>{caseStudy.coverDesign.copy}</p>
        </section>
      ) : null}

      {caseStudy.rangeAcrossVolumes?.length ? (
        <section className="pdf-range-grid" aria-labelledby="range-heading">
          <h2 id="range-heading">Range Across Volumes</h2>
          <div>
            {caseStudy.rangeAcrossVolumes.map((image) => (
              <CaseImage image={image} key={image.src} variant="poster" />
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.bottomFeatures?.length ? (
        <section className="pdf-bottom-features" aria-label="Newspaper Design publication features">
          {caseStudy.bottomFeatures.map((feature) => (
            <article key={feature.heading}>
              <CaseImage image={feature.image} variant="wide" />
              <h2>{feature.heading}</h2>
              {feature.copy ? <p>{feature.copy}</p> : null}
            </article>
          ))}
        </section>
      ) : null}

      {caseStudy.beyondPage ? (
        <section className="pdf-beyond-page">
          <div className="pdf-beyond-images">
            {caseStudy.beyondPage.images.map((image, index) => (
              <CaseImage image={image} key={image.src} variant={index === 0 ? "tall" : "poster"} />
            ))}
          </div>
          <div className="pdf-feature-copy">
            <h2>{caseStudy.beyondPage.heading}</h2>
            <p>{caseStudy.beyondPage.copy}</p>
          </div>
        </section>
      ) : null}

      {caseStudy.outcomes ? (
        <CopyBlock heading={caseStudy.outcomes.heading}>
          <Paragraph copy={caseStudy.outcomes.copy} />
        </CopyBlock>
      ) : null}
    </>
  );
}

function AwardLayout({ project }: { project: Project }) {
  const { impactBoard, impactBook, outcomes, overview } = project.caseStudy;

  return (
    <>
      {overview ? (
        <CopyBlock heading="Overview">
          <Paragraph copy={overview} />
        </CopyBlock>
      ) : null}

      {impactBoard ? (
        <section className="pdf-impact-board">
          <div className="pdf-section-heading-centered">
            <h2>{impactBoard.heading}</h2>
            <p>{impactBoard.copy}</p>
          </div>
          <CaseImage image={impactBoard.largeImage} variant="wide" sizes="(max-width: 900px) 92vw, 900px" />
          <div className="pdf-impact-support">
            {impactBoard.supportImages.map((image) => (
              <CaseImage image={image} key={image.src} variant="wide" />
            ))}
          </div>
        </section>
      ) : null}

      {impactBook ? (
        <section className="pdf-image-text-pair">
          <CaseImage image={impactBook.image} variant="poster" />
          <div className="pdf-feature-copy">
            <h2>{impactBook.heading}</h2>
            <p>{impactBook.copy}</p>
          </div>
        </section>
      ) : null}

      {outcomes ? (
        <CopyBlock heading={outcomes.heading}>
          <Paragraph copy={outcomes.copy} />
        </CopyBlock>
      ) : null}
    </>
  );
}

function EventLayout({ project }: { project: Project }) {
  const { festival, overview, pitSignage } = project.caseStudy;

  return (
    <>
      {overview ? (
        <CopyBlock heading="Overview">
          <Paragraph copy={overview} />
        </CopyBlock>
      ) : null}

      {pitSignage ? (
        <section className="pdf-pit-signage">
          <h2>{pitSignage.heading}</h2>
          <div className="pdf-four-banner-wrap">
            {pitSignage.images.map((image, index) => (
              <CaseImage
                image={image}
                key={`${image.src}-${index}`}
                variant={index === 0 || index === 3 ? "tall" : "wide"}
              />
            ))}
          </div>
          <p>{pitSignage.copy}</p>
          {pitSignage.largeImage ? (
            <CaseImage
              image={pitSignage.largeImage}
              sizes="(max-width: 900px) 92vw, 860px"
              variant="wide"
            />
          ) : null}
        </section>
      ) : null}

      {festival ? (
        <section className="pdf-festival">
          <div className="pdf-feature-copy">
            <h2>{festival.heading}</h2>
            <p>{festival.copy}</p>
          </div>
          <CaseImage image={festival.image} variant="square" />
        </section>
      ) : null}
    </>
  );
}

function NHSJCLayout({ project }: { project: Project }) {
  const { nhsjcEntries, overview } = project.caseStudy;

  return (
    <>
      {overview ? (
        <CopyBlock heading="Overview">
          <Paragraph copy={overview} />
        </CopyBlock>
      ) : null}

      <div className="pdf-nhsjc-entries">
        {nhsjcEntries?.map((entry, index) => (
          <section
            className={`pdf-image-text-pair${index % 2 === 1 ? " pdf-image-text-pair-reverse" : ""}`}
            key={entry.heading}
          >
            <CaseImage image={entry.image} variant={index === 2 ? "wide" : "standard"} />
            <div className="pdf-feature-copy">
              <h2>{entry.heading}</h2>
              <p>{entry.copy}</p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function MKPotteryLayout({ project }: { project: Project }) {
  const { brandIdentity, brochure, overview } = project.caseStudy;

  return (
    <>
      {overview ? (
        <CopyBlock heading="Overview">
          <Paragraph copy={overview} />
        </CopyBlock>
      ) : null}

      {brandIdentity ? (
        <section className="pdf-brand-identity">
          <h2>{brandIdentity.heading}</h2>
          <div className="pdf-brand-row">
            {brandIdentity.images.map((image) => (
              <CaseImage image={image} key={image.src} variant="square" />
            ))}
          </div>
          <p>{brandIdentity.copy}</p>
        </section>
      ) : null}

      {brochure ? (
        <section className="pdf-brochure">
          <h2>{brochure.heading}</h2>
          <div className="pdf-brochure-feature">
            {brochure.featureImages.map((image) => (
              <CaseImage image={image} key={image.src} variant="poster" />
            ))}
          </div>
          <div className="pdf-brochure-support">
            {brochure.supportImages.map((image) => (
              <CaseImage image={image} key={image.src} variant="poster" />
            ))}
          </div>
          <p>{brochure.copy}</p>
        </section>
      ) : null}
    </>
  );
}

function CaseStudyBody({ project }: { project: Project }) {
  if (project.caseStudy.layout === "minimal") {
    return null;
  }

  if (project.caseStudy.layout === "newspaper") {
    return <NewspaperLayout project={project} />;
  }

  if (project.caseStudy.layout === "award") {
    return <AwardLayout project={project} />;
  }

  if (project.caseStudy.layout === "event") {
    return <EventLayout project={project} />;
  }

  if (project.caseStudy.layout === "nhsjc") {
    return <NHSJCLayout project={project} />;
  }

  return <MKPotteryLayout project={project} />;
}

export function ProjectCaseStudy({ nextProject, project }: ProjectCaseStudyProps) {
  const reducedMotion = useReducedMotion();
  const caseStudy = project.caseStudy;
  const title = caseStudy.title ?? project.title;

  return (
    <motion.article
      className={`case-study editorial-panel case-study-${caseStudy.layout}`}
      style={{ "--project-accent": project.accentColor } as CSSProperties}
      initial={reducedMotion ? false : { opacity: 0, y: 26, rotate: -0.18 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={reducedMotion ? { duration: 0 } : slowTransition}
    >
      <Link className="back-link" href="/#contents">
        Back to contents
      </Link>

      <header className="case-hero case-hero-pdf">
        <div className="case-hero-copy">
          <h1>{title}</h1>
          <p>{caseStudy.blurb}</p>
          <div className="tag-row">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className="case-hero-image">
          <Tape tone="purple" />
          <CaseImage
            image={caseStudy.heroImage}
            priority
            sizes="(max-width: 1024px) 92vw, 470px"
            variant="poster"
          />
        </div>
      </header>

      <div className="case-pdf-story">
        <CaseStudyBody project={project} />
      </div>

      <nav className="case-nav" aria-label="Project navigation">
        <Link href="/#contents">Contents</Link>
        <Link href={`/projects/${nextProject.slug}`}>Next: {nextProject.title}</Link>
      </nav>
    </motion.article>
  );
}
