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

async function expectBlackStageFillsViewport(page: Page) {
  const stage = await page.evaluate(() => {
    const body = getComputedStyle(document.body);
    const shell = document.querySelector(".site-shell");
    const shellRect = shell?.getBoundingClientRect();

    return {
      bodyBackground: body.backgroundColor,
      bodyMinHeight: body.minHeight,
      shellWidth: shellRect?.width ?? 0,
      viewportWidth: window.innerWidth,
    };
  });

  expect(stage.bodyBackground).toBe("rgb(2, 2, 2)");
  expect(stage.shellWidth).toBeGreaterThanOrEqual(stage.viewportWidth - 1);
}

async function expectNoFrameworkOverlay(page: Page) {
  await expect(page.locator("nextjs-portal")).toHaveCount(0);
  await expect(page.getByText("Unhandled Runtime Error")).toHaveCount(0);
}

async function expectPersistentNav(page: Page) {
  const nav = page.locator(".site-nav");
  await expect(nav).toBeVisible();

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
  expect(beforeScroll.top).toBeGreaterThanOrEqual(0);
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
  expect(afterScroll.top).toBeGreaterThanOrEqual(0);
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
          const targetButton = document.querySelector(
            `[data-project-index-item="${projectSlug}"] .clock-index-button`,
          ) as HTMLElement | null;

          if (!pin || !handTip || !targetButton) {
            return null;
          }

          const pinRect = pin.getBoundingClientRect();
          const tipRect = handTip.getBoundingClientRect();
          const targetRect = targetButton.getBoundingClientRect();
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

test.describe("Blu Belinky portfolio visual audit", () => {
  for (const viewport of viewports) {
    test(`homepage frame and key sections at ${viewport.label}`, async ({ page }, testInfo) => {
      const consoleErrors = watchConsole(page);

      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/");

      await expect(page).toHaveTitle("Blu Belinky - Design Portfolio.");
      await expect(page.getByRole("heading", { name: "Blu Belinky" })).toBeVisible();
      await expect(page.locator("#contents")).toBeVisible();
      await expect(page.locator("#work")).toBeVisible();
      await expect(page.locator("#about")).toBeVisible();
      await expect(page.locator("#contact")).toBeVisible();
      await expectBlackStageFillsViewport(page);
      await expectNoHorizontalOverflow(page);
      await expectNoFrameworkOverlay(page);
      await capture(page, testInfo, `homepage-${viewport.label}`);
      await expectPersistentNav(page);

      await page.goto("/#contents");
      await expect(page.getByRole("heading", { name: "Contents" })).toBeVisible();
      await expect(page.locator(".clock-illustration svg")).toBeVisible();
      await expectNoHorizontalOverflow(page);

      await page.goto("/#work");
      await expect(page.getByRole("heading", { name: "Projects, not categories." })).toBeVisible();
      await expect(page.locator(".project-card-link")).toHaveCount(projects.length);
      await expectNoHorizontalOverflow(page);

      await page.goto("/#contact");
      await expect(page.getByRole("heading", { name: "Email Blu." })).toBeVisible();
      await expect(page.getByRole("link", { name: "blubelinky@gmail.com" })).toBeVisible();
      await expect(page.getByText("CV link placeholder")).toHaveCount(0);
      await expect(page.getByText("Social link placeholder")).toHaveCount(0);
      await expectNoHorizontalOverflow(page);

      expect(consoleErrors).toEqual([]);
    });
  }

  test("contents clock responds to hover, focus, and reduced motion", async ({ page }, testInfo) => {
    const consoleErrors = watchConsole(page);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#contents");

    const longHand = page.locator(".clock-hand-long");
    await expect(longHand).toHaveCount(1);
    const restingTransform = await longHand.evaluate((element) => getComputedStyle(element).transform);

    for (const project of projects) {
      const item = page.locator(`[data-project-index-item="${project.slug}"]`);
      const button = item.getByRole("button");

      await expect(button).toBeVisible();
      await button.hover();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(".clock-caption")).toHaveText(project.title);
      await expect(page.locator(".active-project-ticket h3")).toHaveText(project.title);
    }

    await page.mouse.move(10, 10);
    for (const project of projects) {
      const button = page.locator(`[data-project-index-item="${project.slug}"]`).getByRole("button");

      await button.focus();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(".clock-caption")).toHaveText(project.title);
      await expectLongHandPointsAtProject(page, project.slug, project.title);
    }

    const focusedProject = projects[1];
    const focusedButton = page
      .locator(`[data-project-index-item="${focusedProject.slug}"]`)
      .getByRole("button");

    await focusedButton.focus();
    await expect(focusedButton).toHaveAttribute("aria-pressed", "true");
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

    await capture(page, testInfo, "contents-clock-active-1440x900");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#contents");
    const reducedMotionButton = page
      .locator(`[data-project-index-item="${projects[2].slug}"]`)
      .getByRole("button");

    await reducedMotionButton.focus();
    await expect(reducedMotionButton).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".clock-caption")).toHaveText(projects[2].title);

    const transition = await longHand.evaluate((element) => getComputedStyle(element).transition);
    expect(transition === "none" || transition.includes("0.001ms")).toBe(true);
    expect(consoleErrors).toEqual([]);
  });

  test("project cards and case-study navigation are usable", async ({ page }, testInfo) => {
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
    await expect(page.getByRole("link", { name: "Back to contents" })).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await expectNoFrameworkOverlay(page);
    await expectPersistentNav(page);
    await capture(page, testInfo, `case-study-${firstProject.slug}`);

    expect(consoleErrors).toEqual([]);
  });
});
