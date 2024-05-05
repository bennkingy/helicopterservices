import { expect, test } from "@playwright/test";
import { trainingUrl, pageLoadTimeout, aboutUsUrl } from "./helpers/test-variables";

// Tests

test("Verify Header Options", async ({ page }) => {
	await page.goto(aboutUsUrl);

	// title
	await page.waitForSelector('[data-id="aboutUsHero"]');
	// await expect('[data-id="aboutUsHero"]').

	// hero image

	// Heading 1 - Making your flying experience outstanding.

	// Verifying Training button
	await page.waitForSelector('[data-id="headerOptionTraining"]');
	await page.click('[data-id="headerOptionTraining"]');
	await page.waitForTimeout(pageLoadTimeout);
	await expect(page).toHaveURL(trainingUrl);
});
