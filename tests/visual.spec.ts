import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { projects } from "../src/content/projects";

const screenshotsDir = join("test-results", "visual-audit");

const viewports = [
  { label: "1920x1080", width: 1920, height: 1080 },
  { label: "1440x900", width: 1440, height: 900 },
  { label: "1024x768", width: 1024, height: 768 },
  { label: "390x844", width: 390, height: 844 },
] as const;

const requiredProjectTitles = [
  "Newspaper Design",
  "Award Presentation Materials",
  "Event Design",
  "NHSJC Competitions",
  "MK Pottery",
];

const removedVisibleCopy = [
  "BB",
  "Project-led graphic design portfolio.",
  "3:30",
  "Projects, not categories.",
  "Public Portfolio item",
  "Email Blu.",
  "Blu's public contact information is intentionally limited to email.",
  "Use email as Blu's only public contact detail.",
  "Each card opens a case study structure that Blu can keep editing as final process notes, screenshots, and project reflections are added.",
  "blah blah",
  "lorem",
  "Lorem",
  "Coming soon",
  "Placeholder",
  "TODO",
  "ASL Robotics Rebrand",
  "A full brand identity for ASL Robotics — colours, guidelines, and logo — designed and directed as team president.",
];

const exactProjectDescriptions = [
  "Publication spreads and feature graphics for The Standard built around pacing, hierarchy, and page rhythm.",
  "Impact presentation design for FRC regionals, built to communicate the team's story clearly to judges.",
  "Pit displays and signage designed to hold up under the noise and pace of live competition.",
  "Advert and logo contest entries exploring compact communication and visual identity.",
  "Branding, advertising, and workshop information design for MK Pottery, spanning identity and print materials.",
];

function watchConsole(page: Page) {
  const messages: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      messages.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    messages.push(error.message);
  });

  return messages;
}

async function expectNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(metrics, JSON.stringify(metrics)).toMatchObject({ overflow: false });
}

async function expectContinuousPaperFlow(page: Page) {
  const flow = await page.evaluate(() => {
    const shell = document.querySelector(".site-shell");
    const main = document.querySelector("main");
    const shellRect = shell?.getBoundingClientRect();
    const mainStyles = main ? getComputedStyle(main) : null;
    const shellStyles = shell ? getComputedStyle(shell) : null;

    return {
      mainGap: mainStyles?.gap ?? "",
      shellBottom: shellRect?.bottom ?? 0,
      shellWidth: shellRect?.width ?? 0,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      paperSurface: shellStyles?.backgroundColor ?? "",
    };
  });

  expect(flow.shellWidth).toBeGreaterThanOrEqual(flow.viewportWidth - 1);
  expect(flow.shellBottom).toBeGreaterThan(flow.viewportHeight - 1);
  expect(flow.mainGap).toBe("0px");
  expect(flow.paperSurface).not.toBe("rgb(2, 2, 2)");
}

async function expectNoFrameworkOverlay(page: Page) {
  await expect(page.locator("nextjs-portal")).toHaveCount(0);
  await expect(page.getByText("Unhandled Runtime Error")).toHaveCount(0);
}

async function expectNoForbiddenPublicCopy(page: Page) {
  for (const removedCopy of removedVisibleCopy) {
    await expect(page.getByText(removedCopy, { exact: true })).toHaveCount(0);
  }

  for (const oldHeading of ["Problem", "Brief", "Final outcome", "Final Outcome", "Reflection"]) {
    await expect(page.getByRole("heading", { name: oldHeading, exact: true })).toHaveCount(0);
  }
}

async function expectPersistentNav(page: Page) {
  const nav = page.locator(".site-nav");
  const mark = page.locator(".nav-mark");

  await expect(nav).toBeVisible();
  await expect(mark).toHaveText("Blu Belinky");
  await expect(mark).not.toHaveText("BB");

  const beforeScroll = await nav.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const styles = getComputedStyle(element);

    return {
      bottom: rect.bottom,
      position: styles.position,
      top: rect.top,
      viewportHeight: window.innerHeight,
      width: rect.width,
    };
  });

  expect(beforeScroll.position).toBe("fixed");
  expect(beforeScroll.top).toBeLessThanOrEqual(1);
  expect(beforeScroll.bottom).toBeLessThan(Math.min(beforeScroll.viewportHeight, 180));
  expect(beforeScroll.width).toBeGreaterThan(280);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(nav).toBeVisible();

  const afterScroll = await nav.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const styles = getComputedStyle(element);

    return {
      bottom: rect.bottom,
      position: styles.position,
      top: rect.top,
      viewportHeight: window.innerHeight,
    };
  });

  expect(afterScroll.position).toBe("fixed");
  expect(afterScroll.top).toBeLessThanOrEqual(1);
  expect(Math.abs(afterScroll.top - beforeScroll.top)).toBeLessThanOrEqual(2);
  expect(afterScroll.bottom).toBeLessThan(Math.min(afterScroll.viewportHeight, 180));
}

async function capture(page: Page, testInfo: TestInfo, name: string) {
  mkdirSync(screenshotsDir, { recursive: true });
  await page.screenshot({
    fullPage: false,
    path: join(screenshotsDir, `${testInfo.project.name}-${name}.png`),
  });
}

async function expectLongHandPointsAtProject(page: Page, slug: string, label: string) {
  await expect
    .poll(
      async () => {
        const handToCardAngleDelta = await page.evaluate((projectSlug) => {
          const pin = document.querySelector(".clock-pin");
          const handTip = document.querySelector(".clock-hand-long circle");
          const targetLink = document.querySelector(
            `[data-project-index-item="${projectSlug}"] .clock-index-link`,
          ) as HTMLElement | null;

          if (!pin || !handTip || !targetLink) {
            return null;
          }

          const pinRect = pin.getBoundingClientRect();
          const tipRect = handTip.getBoundingClientRect();
          const targetRect = targetLink.getBoundingClientRect();
          const pinPoint = {
            x: pinRect.left + pinRect.width / 2,
            y: pinRect.top + pinRect.height / 2,
          };
          const tipPoint = {
            x: tipRect.left + tipRect.width / 2,
            y: tipRect.top + tipRect.height / 2,
          };
          const targetPoint = {
            x: targetRect.left + targetRect.width / 2,
            y: targetRect.top + targetRect.height / 2,
          };
          const handAngle = Math.atan2(tipPoint.y - pinPoint.y, tipPoint.x - pinPoint.x);
          const targetAngle = Math.atan2(
            targetPoint.y - pinPoint.y,
            targetPoint.x - pinPoint.x,
          );
          const rawDelta = Math.abs(((handAngle - targetAngle) * 180) / Math.PI);

          return rawDelta > 180 ? 360 - rawDelta : rawDelta;
        }, slug);

        return handToCardAngleDelta ?? 999;
      },
      { message: label, timeout: 4_000 },
    )
    .toBeLessThan(12);
}

async function expectClockLabelsDoNotOverlapFace(page: Page) {
  const overlaps = await page.evaluate(() => {
    const face = document.querySelector(".clock-face");
    const faceRect = face?.getBoundingClientRect();
    const links = Array.from(document.querySelectorAll<HTMLElement>(".clock-index-link"));

    if (!faceRect) {
      return ["missing clock face"];
    }

    const center = {
      x: faceRect.left + faceRect.width / 2,
      y: faceRect.top + faceRect.height / 2,
    };
    const radius = faceRect.width / 2;

    return links
      .map((link) => {
        const rect = link.getBoundingClientRect();
        const closestX = Math.max(rect.left, Math.min(center.x, rect.right));
        const closestY = Math.max(rect.top, Math.min(center.y, rect.bottom));
        const distanceToCircle = Math.hypot(closestX - center.x, closestY - center.y);

        return {
          label: link.textContent?.trim() ?? "",
          overlapsFace: distanceToCircle < radius + 4,
        };
      })
      .filter((item) => item.overlapsFace)
      .map((item) => item.label);
  });

  expect(overlaps).toEqual([]);
}

test.describe("Blu Belinky portfolio PDF edit audit", () => {
  test("project data keeps the PDF order", () => {
    expect(projects.map((project) => project.title)).toEqual(requiredProjectTitles);
    expect(projects.map((project) => project.subtitle)).toEqual(exactProjectDescriptions);
  });

  for (const viewport of viewports) {
    test(`homepage continuous flow and key sections at ${viewport.label}`, async ({ page }, testInfo) => {
      const consoleErrors = watchConsole(page);

      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/");

      await expect(page).toHaveTitle("Blu Belinky - Design Portfolio.");
      await expect(page.getByRole("heading", { name: "Blu Belinky" })).toBeVisible();
      await expect(page.locator("#contents")).toBeVisible();
      await expect(page.locator("#work")).toBeVisible();
      await expect(page.locator("#about")).toBeVisible();
      await expect(page.locator("#contact")).toBeVisible();
      await expectPersistentNav(page);
      await expectContinuousPaperFlow(page);
      await expectNoHorizontalOverflow(page);
      await expectNoFrameworkOverlay(page);

      await expectNoForbiddenPublicCopy(page);

      await capture(page, testInfo, `homepage-${viewport.label}`);

      await page.goto("/?capture=contents#contents", { waitUntil: "domcontentloaded" });
      await page.locator("#contents").scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await expect(page.getByRole("heading", { name: "Contents" })).toBeVisible();
      await expect(page.getByTestId("contents-clock")).toBeVisible();
      await expect(page.getByTestId("clock-face")).toBeVisible();
      await expectNoHorizontalOverflow(page);
      await capture(page, testInfo, `contents-${viewport.label}`);

      await page.goto("/?capture=work#work", { waitUntil: "domcontentloaded" });
      await page.locator("#work").scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await expect(page.getByRole("heading", { name: "Work", exact: true })).toBeVisible();
      await expect(page.locator(".project-card-link")).toHaveCount(projects.length);
      await expect(page.locator(".project-card-copy h3")).toHaveText(requiredProjectTitles);
      await expect(page.locator(".project-card-copy > p")).toHaveText(exactProjectDescriptions);
      for (const project of projects) {
        const card = page.locator(`.project-card-link[href="/projects/${project.slug}"]`);

        await expect(card).toBeVisible();
        for (const tag of project.tags) {
          await expect(card.getByText(tag, { exact: true })).toBeVisible();
        }
      }
      await expectNoHorizontalOverflow(page);
      await capture(page, testInfo, `work-${viewport.label}`);

      await page.goto(`/projects/${projects[0].slug}`, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { name: projects[0].title })).toBeVisible();
      await expect(page.getByText(projects[0].caseStudy.overview ?? "", { exact: true })).toBeVisible();
      await expectNoHorizontalOverflow(page);
      await capture(page, testInfo, `project-newspaper-${viewport.label}`);

      await page.goto("/?capture=contact#contact", { waitUntil: "domcontentloaded" });
      await page.locator("#contact").scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await expect(page.getByRole("heading", { name: "Contact:" })).toBeVisible();
      await expect(page.getByText("Email Blu.", { exact: true })).toHaveCount(0);
      await expect(
        page.getByText("Blu's public contact information is intentionally limited to email.", {
          exact: true,
        }),
      ).toHaveCount(0);
      await expect(page.getByRole("link", { name: "blubelinky@gmail.com" })).toBeVisible();
      await expect(page.getByText("CV link placeholder")).toHaveCount(0);
      await expect(page.getByText("Social link placeholder")).toHaveCount(0);
      await expectNoHorizontalOverflow(page);
      await expectNoForbiddenPublicCopy(page);

      expect(consoleErrors).toEqual([]);
    });
  }

  test("contents clock links are clickable and respond to hover, focus, and reduced motion", async ({
    page,
  }, testInfo) => {
    const consoleErrors = watchConsole(page);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#contents");

    const longHand = page.getByTestId("clock-hand");
    await expect(longHand).toHaveCount(1);
    const restingTransform = await longHand.evaluate((element) => getComputedStyle(element).transform);

    await expectClockLabelsDoNotOverlapFace(page);

    for (const project of projects) {
      const link = page.getByTestId(`clock-project-${project.slug}`);

      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", `/projects/${project.slug}`);
      await link.hover();
      await expect(link).toHaveAttribute("data-active", "true");
      await expect(page.locator(".clock-caption")).toHaveText(project.title);
      await expect(page.locator(".active-project-ticket h3")).toHaveText(project.title);
    }

    await page.mouse.move(10, 10);
    for (const project of projects) {
      const link = page.getByTestId(`clock-project-${project.slug}`);

      await link.focus();
      await expect(link).toHaveAttribute("data-active", "true");
      await expect(page.locator(".clock-caption")).toHaveText(project.title);
      await expectLongHandPointsAtProject(page, project.slug, project.title);
    }

    const focusedProject = projects[1];
    const focusedLink = page.getByTestId(`clock-project-${focusedProject.slug}`);

    await focusedLink.focus();
    await expect(focusedLink).toHaveAttribute("data-active", "true");
    await expect(page.locator(".clock-caption")).toHaveText(focusedProject.title);

    const activeTransform = await longHand.evaluate((element) => getComputedStyle(element).transform);
    expect(activeTransform).not.toBe(restingTransform);

    const pivotAlignment = await page.evaluate(() => {
      const pin = document.querySelector(".clock-pin") as SVGGraphicsElement | null;
      const hands = Array.from(document.querySelectorAll<SVGGElement>(".clock-hand"));
      const pinMatrix = pin?.getScreenCTM();

      if (!pinMatrix) {
        return [];
      }

      const pinPoint = new DOMPoint(110, 110).matrixTransform(pinMatrix);

      return hands.map((hand) => {
        const matrix = hand.getScreenCTM();
        const handPoint = matrix
          ? new DOMPoint(110, 110).matrixTransform(matrix)
          : { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY };
        const styles = getComputedStyle(hand);

        return {
          className: hand.getAttribute("class") ?? "",
          distanceFromPin: Math.hypot(handPoint.x - pinPoint.x, handPoint.y - pinPoint.y),
          transformBox: styles.getPropertyValue("transform-box"),
          transformOrigin: styles.getPropertyValue("transform-origin"),
        };
      });
    });

    expect(pivotAlignment).toHaveLength(2);
    for (const hand of pivotAlignment) {
      expect(hand.transformBox).toBe("view-box");
      expect(hand.transformOrigin).toBe("110px 110px");
      expect(hand.distanceFromPin, hand.className).toBeLessThan(0.5);
    }

    await page.waitForTimeout(320);
    await capture(page, testInfo, "contents-clock-active-1440x900");

    for (const project of projects) {
      await page.goto("/#contents");
      await page.getByTestId(`clock-project-${project.slug}`).click();
      await expect(page).toHaveURL(`/projects/${project.slug}`);
      await expect(
        page.getByRole("heading", { name: project.caseStudy.title ?? project.title }),
      ).toBeVisible();
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#contents");
    const reducedMotionLink = page.getByTestId(`clock-project-${projects[2].slug}`);

    await expect(reducedMotionLink).toBeVisible();
    await reducedMotionLink.hover();
    await reducedMotionLink.focus();
    await expect(reducedMotionLink).toHaveAttribute("data-active", "true");
    await expect(page.locator(".clock-caption")).toHaveText(projects[2].title);

    const transition = await longHand.evaluate((element) => getComputedStyle(element).transition);
    expect(transition === "none" || transition.includes("0.001ms")).toBe(true);
    expect(consoleErrors).toEqual([]);
  });

  test("project cards and PDF case-study layout are usable", async ({ page }, testInfo) => {
    const consoleErrors = watchConsole(page);
    const firstProject = projects[0];

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#work");

    const card = page.locator(`.project-card-link[href="/projects/${firstProject.slug}"]`);
    await expect(card).toBeVisible();
    await card.focus();
    await expect(card).toBeFocused();
    await card.click();

    await expect(page).toHaveURL(`/projects/${firstProject.slug}`);
    await expect(page.getByRole("heading", { name: firstProject.title })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
    await expect(page.getByText(firstProject.caseStudy.overview ?? "", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Featured: “Core Values”" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Beyond the Page" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Outcomes" })).toBeVisible();
    await expectNoForbiddenPublicCopy(page);
    await expect(page.getByRole("link", { name: "Back to contents" })).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await expectNoFrameworkOverlay(page);
    await expectPersistentNav(page);
    await capture(page, testInfo, `case-study-${firstProject.slug}`);

    expect(consoleErrors).toEqual([]);
  });

  test("all project routes follow the NewPortfolio PDF copy contract", async ({ page }, testInfo) => {
    const consoleErrors = watchConsole(page);
    const checks: Record<string, () => Promise<void>> = {
      "newspaper-design": async () => {
        await expect(page.getByText(projects[0].caseStudy.overview ?? "", { exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Featured: “Language & Culture Special”" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Cover Design" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Beyond the Page" })).toBeVisible();
      },
      "award-presentation-materials": async () => {
        await expect(page.getByRole("heading", { name: "Award Presentation" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "The Impact Board" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "The Impact Book" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Outcomes" })).toBeVisible();
      },
      "event-design": async () => {
        await expect(page.getByRole("heading", { name: "Pit Signage: The Four-Banner Wrap" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Festival of Robotics: Event Branding" })).toBeVisible();
      },
      "nhsjc-competitions": async () => {
        await expect(page.getByRole("heading", { name: "2025 · Logo — Play On Music" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "2024 · Advertisement — The Soup Stop" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "2023 · Logo — Beacon Hill Photography Club" })).toBeVisible();
      },
      "mk-pottery": async () => {
        await expect(page.getByRole("heading", { name: "MK Pottery Studio" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Brand Identity:" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "The Anagama Workshop Brochure" })).toBeVisible();
      },
    };

    await page.setViewportSize({ width: 1440, height: 900 });

    for (const project of projects) {
      await page.goto(`/projects/${project.slug}`);
      await expect(
        page.getByRole("heading", { name: project.caseStudy.title ?? project.title }),
      ).toBeVisible();
      await expectNoForbiddenPublicCopy(page);
      await checks[project.slug]();
      await expectNoHorizontalOverflow(page);
      await capture(page, testInfo, `project-${project.slug}`);
    }

    expect(consoleErrors).toEqual([]);
  });

  test("contact tab lands on the email-only contact panel", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.locator(".site-nav").getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/#contact$/);
    await page.waitForFunction(() => {
      const contact = document.querySelector("#contact");
      const rect = contact?.getBoundingClientRect();

      return rect ? rect.top < window.innerHeight - 220 && rect.bottom > 260 : false;
    });
    await expect(page.getByRole("link", { name: "blubelinky@gmail.com" })).toBeVisible();
    await expect(page.getByText("Email Blu.", { exact: true })).toHaveCount(0);
    await expect(
      page.getByText("Blu's public contact information is intentionally limited to email.", {
        exact: true,
      }),
    ).toHaveCount(0);

    const contactRect = await page.locator("#contact").evaluate((element) => {
      const rect = element.getBoundingClientRect();

      return {
        bottom: rect.bottom,
        top: rect.top,
        viewportHeight: window.innerHeight,
      };
    });

    await expect(page.getByRole("heading", { name: "Contact:" })).toBeVisible();
    expect(contactRect.top).toBeLessThan(contactRect.viewportHeight - 220);
    expect(contactRect.bottom).toBeGreaterThan(260);
    expect(contactRect.bottom - contactRect.top).toBeLessThan(430);
    await expectNoHorizontalOverflow(page);
  });
});
